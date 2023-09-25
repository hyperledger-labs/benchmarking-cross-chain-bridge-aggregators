import { ethers, Contract } from "ethers";
import { get_signer } from "./provider";

import ERC20 from "@openzeppelin/contracts/build/contracts/ERC20.json";

export async function approveAllow(
    chain_name: string,
    token_address: string,
    spender_address: string,
    amount: string = ethers.constants.MaxUint256.toString()
) {
    const signer = get_signer(chain_name);
    const erc20 = new Contract(token_address, ERC20.abi, signer);

    const allowance = await erc20.allowance(
        await signer.getAddress(),
        spender_address
    );

    if (allowance >= amount) {
        return;
    }

    const tx = await erc20
        .connect(signer)
        .approve(spender_address, amount);
    await tx.wait();

    return tx;
}