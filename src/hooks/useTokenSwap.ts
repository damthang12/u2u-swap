import {useTokenSwapContract} from "./useContract";
import {useCallback} from "react";

export const useTokenSwap = () => {
    const tokenSwapContract = useTokenSwapContract();

    const onByTokenA = useCallback(
        async (address: string, amount: number, tokenPriceA: number) => {
            if (!tokenSwapContract) return;
            const buyTokensABC = await tokenSwapContract.buyTokensABC(amount, {
                from: address,
                value: amount * tokenPriceA,
            });
            return buyTokensABC.wait();
        },
        [tokenSwapContract]
    );

    const onByTokenX = useCallback(
        async (address: string, amount: number, tokenPriceX: number) => {
            if (!tokenSwapContract) return;
            const buyTokensABC = await tokenSwapContract.buyTokensABC(amount, {
                from: address,
                value: amount * tokenPriceX,
            });
            return buyTokensABC.wait();
        },
        [tokenSwapContract]
    );


    return {onByTokenA, onByTokenX};

};

