import {useTokenAContract, useTokenSwapContract, useTokenXContract} from "./useContract";
import {useCallback, useEffect, useMemo, useState} from "react";
import web3 from "web3";
import {useWeb3React} from "@web3-react/core";
import {BigNumber} from "ethers";

export const useTokenAX = () => {
    const {account} = useWeb3React();
    const tokenAContract = useTokenAContract();
    const [balanceTokenA, setBalanceTokenA] = useState("");
    const [tokenPriceA, setTokenPriceA] = useState(0);
    const tokenXContract = useTokenXContract();
    const tokenSwapContract = useTokenSwapContract();
    const [balanceTokenX, setBalanceTokenX] = useState("");
    const [tokenPriceX, setTokenPriceX] = useState(0);
    const [allowanceA, setAllowanceA] = useState(0);
    const [allowanceX, setAllowanceX] = useState(0);


    const balanceA = useMemo(() => {
        return web3.utils.toBN(balanceTokenA).toString();
    }, [balanceTokenA]);

    const balanceX = useMemo(() => {
        return web3.utils.toBN(balanceTokenX).toString();
    }, [balanceTokenX]);

    const allowanceTokenA = useMemo(() => {
        return web3.utils.toBN(allowanceA).toString();
    }, [allowanceA]);

    const allowanceTokenX = useMemo(() => {
        return web3.utils.toBN(allowanceX).toString();
    }, [allowanceX]);


    useEffect(() => {
        (async () => {
            if (!tokenAContract?.address) return;
            const tokenBalanceA = await tokenAContract.balanceOf(tokenSwapContract?.address);
            setBalanceTokenA(tokenBalanceA);
            const abcPrice = await tokenAContract.tokenPrice();
            setTokenPriceA(abcPrice)
            const allowanceTokenA = await tokenAContract.allowance(account, tokenSwapContract?.address);
            setAllowanceA(allowanceTokenA)

            if (!tokenXContract?.address) return;
            const tokenBalanceX = await tokenXContract.balanceOf(tokenSwapContract?.address);
            setBalanceTokenX(tokenBalanceX);
            const xyzPrice = await tokenXContract.tokenPrice();
            setTokenPriceX(xyzPrice);
            const allowanceTokenX = await tokenXContract.allowance(account, tokenSwapContract?.address);
            setAllowanceX(allowanceTokenX)


        })()
    }, [account, tokenAContract, tokenAContract?.address, tokenXContract, tokenXContract?.address]);


    const onApprove = useCallback(
        async (tokenAddress : any) => {
            try {
                if (!tokenAContract) return;
                await tokenAContract.approve(tokenAddress,BigNumber.from(50).div(100).mul(944));
                console.log(BigNumber.from(50).div(100).mul(944) + " ---------")
            } catch (err) {
                alert("Cant approve Tokens " + err);
            }
            try {
                if (!tokenXContract) return;
                await tokenXContract.approve(tokenAddress,BigNumber.from(50).div(100).mul(944));

            } catch (err) {
                alert("Cant approve Tokens " + err);
            }
        },
        [tokenAContract, tokenXContract]
    );

    // const onApproveTokenX = useCallback(
    //     async (address: string, amount: number) => {
    //
    //         if (amount > 0) {
    //             if (!tokenXContract) return;
    //             await tokenXContract.approve(tokenSwapContract?.address, 3).send({from: address});
    //         } else {
    //             alert("Cant approve Tokens with Expected return less then zero")
    //         }
    //     },
    //     [tokenAContract, tokenXContract]
    // );


    return {
        balanceA,
        tokenPriceA,
        balanceX,
        tokenPriceX,
        allowanceTokenA,
        allowanceTokenX,
        onApprove,
    };


};
