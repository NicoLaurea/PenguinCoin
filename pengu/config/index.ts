import { Contract, ContractRunner } from "ethers";
import abi from "./abi.json";

export function getContract(signer: ContractRunner) {
    return new Contract(
        "0x1bB0E82A07A7187175A60c96749AB00f33c5856E", //contract add
        abi as any,
        signer
    );
}