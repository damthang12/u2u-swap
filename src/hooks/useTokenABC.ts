import {useTokenAContract, useTokenBContract} from "./useContract";
import {useCallback, useEffect, useMemo, useState} from "react";
import web3 from "web3";

export const useByToken = () => {
    const tokenAContract = useTokenAContract();
    const [rawTokenSold, setRawTokenSold] = useState("");

    const tokenSold = useMemo(() => {
        return web3.utils.fromWei(rawTokenSold, "ether");
    }, [rawTokenSold]);


    const onByTokenA = useCallback(
        async (address: string,amount: string | number) => {
            if (!tokenAContract) return;
            const tx = await tokenAContract.buyTokens(amount, {
                from: address,
                value: amount,
            });

            const result = await tokenAContract.totalSupply({from:address});

            console.log(result + "2222222222222222")

            return tx.wait();
        },
        [tokenAContract]
    );

    return { onByTokenA,tokenSold };


};
