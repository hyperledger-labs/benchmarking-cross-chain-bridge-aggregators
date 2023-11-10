import { ethers, Contract } from "ethers";
import { get_signer } from "./provider";
import { CHAIN_MAP } from "./constants_global";

import ERC20 from "@openzeppelin/contracts/build/contracts/ERC20.json";
import { tokenToString } from "typescript";

export async function approveAllow(
    chain_name: string,
    from_token: string,
    spender_address: string,
    amount: string = ethers.constants.MaxUint256.toString()
) {
    const signer = get_signer(chain_name);

    const token_address = CHAIN_MAP[chain_name].token_map[from_token];

    const erc20 = new Contract(token_address, ERC20.abi, signer);

    const allowance = await erc20.allowance(
        await signer.getAddress(),
        spender_address
    );

    if (allowance >= amount) {
        return true;
    }

    const tx = await erc20
        .connect(signer)
        .approve(spender_address, amount);
    await tx.wait();

    return true;
}
