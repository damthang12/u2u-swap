import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import {getPreOrderContract, getTokenAContract, getTokenXContract, getTokenSwapContract} from "../utils/contract";

export const useStakingContract = () => {
  const { library } = useWeb3React()
  return useMemo( () => {
    return getPreOrderContract(library?.getSigner())}, [library]
  )
}

export const useTokenSwapContract = () => {
    const { library } = useWeb3React()
    return useMemo( () => {
        return getTokenSwapContract(library?.getSigner())}, [library]
    )
}

export const useTokenAContract = () => {
    const { library } = useWeb3React()
    return useMemo( () => {
        return getTokenAContract(library?.getSigner())}, [library]
    )
}

export const useTokenXContract = () => {
    const { library } = useWeb3React()
    return useMemo( () => {
        return getTokenXContract(library?.getSigner())}, [library]
    )
}
