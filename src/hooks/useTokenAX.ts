import {useTokenAContract, useTokenXContract} from "./useContract";
import {useCallback, useEffect, useMemo, useState} from "react";
import web3 from "web3";

export const useTokenAX = () => {
    const tokenAContract = useTokenAContract();
    const [rawTokenSoldA, setRawTokenSoldA] = useState("");
    const [tokenPriceA, setTokenPriceA] = useState("");
    const tokenXContract = useTokenXContract();
    const [rawTokenSoldX, setRawTokenSoldX] = useState("");
    const [tokenPriceX, setTokenPriceX] = useState("");


    const tokenSoldA = useMemo(() => {
        return web3.utils.fromWei(rawTokenSoldA, "ether");
    }, [rawTokenSoldA]);

    const tokenSoldX = useMemo(() => {
        return web3.utils.fromWei(rawTokenSoldX, "ether");
    }, [rawTokenSoldX]);


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


        if (!tokenXContract?.address) return;
        tokenXContract.tokensSold({from: tokenXContract?.address})
            .then((_rawBalance: any) => {
                setRawTokenSoldX(_rawBalance);
            });

        tokenXContract.tokenPrice({from: tokenXContract?.address})
            .then((_rawPrice: any) => {
                setTokenPriceX(_rawPrice);
            });

    }, [tokenAContract, tokenAContract?.address, tokenXContract, tokenXContract?.address]);


    return {onByTokenA, tokenSoldA, tokenPriceA, tokenSoldX, tokenPriceX};


};
