import { ethers } from 'ethers'
import {
    RPC_URL,
    STAKING_CONTRACT_ADDRESS,
    TOKEN_ABC_CONTRACT_ADDRESS,
    TOKEN_SWAP_CONTRACT_ADDRESS, TOKEN_XYZ_CONTRACT_ADDRESS
} from "../configs/constants";
import contractAbi from "../contractABIs/contractStaking/contractAbi";
import tokenAAbi from "../contractABIs/contractA/tokenAAbi";
import tokenSwapAbi from "../contractABIs/contractSwap/tokenSwapAbi";
import tokenXYZAbi from "../contractABIs/contractX/tokenXYZAbi";

export const getContract = (abi: any, address?: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  if (!address) return undefined
  const signerOrProvider = signer ?? new ethers.providers.JsonRpcProvider(RPC_URL)
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getPreOrderContract = (signer?: ethers.Signer | ethers.providers.Provider) => getContract(contractAbi, STAKING_CONTRACT_ADDRESS, signer)
export const getTokenSwapContract = (signer?: ethers.Signer | ethers.providers.Provider) => getContract(tokenSwapAbi, TOKEN_SWAP_CONTRACT_ADDRESS, signer)
export const getTokenAContract = (signer?: ethers.Signer | ethers.providers.Provider) => getContract(tokenAAbi, TOKEN_ABC_CONTRACT_ADDRESS, signer)
export const getTokenXContract = (signer?: ethers.Signer | ethers.providers.Provider) => getContract(tokenXYZAbi, TOKEN_XYZ_CONTRACT_ADDRESS, signer)


