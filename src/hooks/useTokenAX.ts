import {useTokenAContract} from "./useContract";
import {useCallback, useEffect, useMemo, useState} from "react";
import web3 from "web3";

export const useTokenABC = () => {
    const tokenAContract = useTokenAContract();
    const [rawTokenSoldA, setRawTokenSoldA] = useState("");
    const [tokenPriceA, setTokenPriceA] = useState("");


    const tokenSoldA = useMemo(() => {
        return web3.utils.fromWei(rawTokenSoldA, "ether");
    }, [rawTokenSoldA]);


    const onByTokenA = useCallback(
        async (address: string, amount: string | number) => {
            if (!tokenAContract) return;
            const tx = await tokenAContract.buyTokens(amount, {
                from: address,
                value: amount,
            });

            const tokenPrice = await tokenAContract.tokenPrice({from: address});
            setTokenPriceA(tokenPrice)
            return tx.wait();
        },
        [tokenAContract]
    );


    useEffect(() => {
        if (!tokenAContract?.address) return;
        tokenAContract.tokensSold({from: tokenAContract?.address})
            .then((_rawBalance: any) => {
                setRawTokenSoldA(_rawBalance);
            });

        tokenAContract.tokenPrice({from: tokenAContract?.address})
            .then((_rawPrice: any) => {
                setTokenPriceA(_rawPrice);
            });

    }, [tokenAContract, tokenAContract?.address]);


    return {onByTokenA, tokenSoldA, tokenPriceA};


};
