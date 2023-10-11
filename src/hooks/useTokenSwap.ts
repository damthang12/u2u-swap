import {useTokenSwapContract} from "./useContract";
import {useCallback, useState} from "react";

export const useToken = () => {
    const tokenSwapContract = useTokenSwapContract();
    const [tokenAddressABC] = useState("");

    const onToken = useCallback(
        async (address: string, amount: string | number) => {
            if (!tokenSwapContract) return;
            const buyTokensABC = await tokenSwapContract.buyTokensABC(amount, {
                from: address,
                value: amount,
            });

            return buyTokensABC.wait();
        },
        [tokenSwapContract]
    );
    return {onToken, tokenAddressABC};

};

