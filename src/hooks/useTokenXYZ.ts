import {useTokenAContract} from "./useContract";
import {useCallback, useEffect, useMemo, useState} from "react";
import web3 from "web3";

export const useTokenSold = () => {
    const tokenAContract = useTokenAContract();
    const [rawTokenSold, setRawTokenSold] = useState("");

    const tokenSold = useMemo(() => {
        return web3.utils.fromWei(rawTokenSold, "ether");
    }, [rawTokenSold]);

    const onTokenSold = useCallback(
        async () => {
            if (!tokenAContract) return;
            const tx = await tokenAContract.tokensSold();
            setRawTokenSold(tx);
            console.log(rawTokenSold + "------------")
            return tx.wait();

        },
        [rawTokenSold, tokenAContract]
    );
    return {onTokenSold, tokenSold}
};

//
// const [rawTokenSold, setRawTokenSold] = useState("");
//
// // const tokenSold = useMemo(() => {
// //     return web3.utils.fromWei(rawTokenSold, "ether");
// // }, [rawTokenSold]);
//
// useEffect(() => {
//     if (!tokenAContract) return;
//     const tx = tokenAContract.tokensSold();
//     setRawTokenSold(tx);
// }, [tokenAContract]);
// return {rawTokenSold};
