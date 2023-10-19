import { Server, SocketTx, SocketQuote } from "@socket.tech/socket-v2-sdk";
import { get_signer, get_provider } from "@benchmarking-cross-chain-bridges/helper/provider";
import { CHAIN_ID_MAP } from "@benchmarking-cross-chain-bridges/helper/constants_global";

export async function runRoute(sourceChain: number, destChain: string, quote: SocketQuote) {
    const execute = await Server.getSingleTx({ requestBody: { route: quote?.route, refuel: quote?.refuel } });
    console.log('execute', execute);
    // const execute = await socket.start(quote);
    // await executeRoute(execute);
}

export async function executeRouteRunner(sourceChain: number, destChain: string, execute: AsyncGenerator<SocketTx, void, string>) {
    let next = await execute.next();

    const chain_name = CHAIN_ID_MAP[sourceChain];
    const signer = get_signer(chain_name);

    while (!next.done && next.value) {
        const tx = next.value;
        console.log(`Executing step ${tx.userTxIndex} "${tx.userTxType}" on chain ${tx.chainId}`);
        const provider = get_provider(tx.chainId.toString());
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