import {useTokenXContract} from "./useContract";
import {useCallback, useEffect, useMemo, useState} from "react";
import web3 from "web3";

export const useTokenXYZ = () => {
    const tokenXContract = useTokenXContract();
    const [rawTokenSoldX, setRawTokenSoldX] = useState("");
    const [tokenPriceX, setTokenPriceX] = useState("");


    const tokenSoldX = useMemo(() => {
        const balance = web3.utils.fromWei(rawTokenSoldX, "ether");
        return balance.replace(/\D/g, "")
    }, [rawTokenSoldX]);


    const onByTokenX = useCallback(
        async (address: number, amount: number, tokenPriceX: number) => {
            if (!tokenXContract) return;
            const tx = await tokenXContract.buyTokens(amount, {
                from: address,
                value: amount * tokenPriceX,
            });
            return tx.wait();
        },
        [tokenXContract]
    );

    useEffect(() => {
        if (!tokenXContract?.address) return;
        tokenXContract.tokensSold({from: tokenXContract?.address})
            .then((_rawBalance: any) => {
                setRawTokenSoldX(_rawBalance);
            });

        tokenXContract.tokenPrice({from: tokenXContract?.address})
            .then((_rawPrice: any) => {
                setTokenPriceX(_rawPrice);
            });

    }, [tokenXContract, tokenXContract?.address]);

    return {onByTokenX, tokenSoldX, tokenPriceX};


};

