import { Server, SocketTx, SocketQuote, Socket, SingleTxOutputDTO } from "@socket.tech/socket-v2-sdk";
import { get_signer, get_provider } from "@benchmarking-cross-chain-bridges/helper/provider";
import { CHAIN_ID_MAP } from "@benchmarking-cross-chain-bridges/helper/constants_global";
import { approveAllow } from "@benchmarking-cross-chain-bridges/helper/token-misc";
import { validate_api_key } from "@benchmarking-cross-chain-bridges/helper/inp_validator";

export async function execute_route(sourceChain: number, fromToken: string, quote: SocketQuote, multiTx: boolean) {

    if (multiTx) {
        const socket = new Socket({
            apiKey: validate_api_key('SOCKET'),
            defaultQuotePreferences: {
                singleTxOnly: !multiTx,
            }
        });

        const executeRoute = await socket.start(quote);
        await executeRouteRunnerMulti(sourceChain, executeRoute);

    } else {
        const txData = await Server.getSingleTx({ requestBody: { route: quote?.route, refuel: quote?.refuel } });
        await executeRouteRunnerSingle(sourceChain, fromToken, txData);
    }
}

async function executeRouteRunnerSingle(sourceChain: number, fromToken: string, txData: SingleTxOutputDTO) {
    const chain_name = CHAIN_ID_MAP[sourceChain];
    const signer = get_signer(chain_name);

    const tx_callData = txData.result.txData;
    const tx_value = txData.result.value;
    const spender_address = txData.result.approvalData?.allowanceTarget;

    if (spender_address) {
        approveAllow(chain_name, fromToken, spender_address);
    } else {
        throw Error('spender_address is undefined');
    }

    const transactionRequest = {
        to: spender_address,
        data: tx_callData,
        value: tx_value,
        from: signer.address
    };

    const tx = await signer.sendTransaction(transactionRequest);
    await tx.wait();
    return tx.hash;
}

async function executeRouteRunnerMulti(sourceChain: number, execute: AsyncGenerator<SocketTx, void, string>) {
    let next = await execute.next();

    const chain_name = CHAIN_ID_MAP[sourceChain];
    const signer = get_signer(chain_name);

    while (!next.done && next.value) {
        const tx = next.value;
        console.log(`Executing step ${tx.userTxIndex} "${tx.userTxType}" on chain ${tx.chainId}`);
        const provider = get_provider(chain_name);
        const approvalTxData = await tx.getApproveTransaction();
        if (approvalTxData) {
            const approvalTx = await signer.connect(provider).sendTransaction({
                ...approvalTxData,
            });
            console.log(`Approving: ${approvalTx.hash}`);
            await approvalTx.wait();
        }
        const sendTxData = await tx.getSendTransaction();
        const sendTx = await signer.connect(provider).sendTransaction({
            ...sendTxData,
        });
        console.log(`Sending: ${sendTx.hash}`);
        await sendTx.wait();
        next = await execute.next(sendTx.hash);
    }
}