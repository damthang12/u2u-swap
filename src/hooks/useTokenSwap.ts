import {useMemo, useState} from 'react';
import {useTokenAContract, useTokenSwapContract, useTokenXContract} from "./useContract";
import {useCallback, useEffect} from "react";
import {BigNumber} from "ethers";
import web3 from "web3";

export const useTokenSwap = () => {
    const tokenSwapContract = useTokenSwapContract();
    const tokenAContract = useTokenAContract();
    const tokenXContract = useTokenXContract();
    const [fees, setFees] = useState("");
    const [ratio, setRatio] = useState("");


    const convertFees = useMemo(() => {
        return web3.utils.toBN(fees).toString();
    }, [fees]);


    const convertRatio = useMemo(() => {
        return web3.utils.toBN(ratio).toString();
    }, [ratio]);


    useEffect(() => {
        (async () => {
            if (!tokenSwapContract?.address) return;
            const rawFees = await tokenSwapContract.getFees();
            setFees(rawFees);
            const rawRatio = await tokenSwapContract.getRatio();
            setRatio(rawRatio);
        })()
    }, [tokenSwapContract]);


    const onByTokenA = useCallback(
        // Viết try catch ở hàm ngoài cùng. Trong trường hợp này là ở component, chứ ko phải ở đây. Tương tự vs các hàm dưới
        async (address: string, amount: any, tokenPrice : any) => {
            try {
                if (!tokenSwapContract) return;
                const buyTokensABC = await tokenSwapContract.buyTokensABC(amount, {
                    from: address,
                    value: web3.utils.toBN(amount).mul(web3.utils.toBN(tokenPrice)).toString(),
                });
                return buyTokensABC.wait();
            } catch (err) {
                alert("Transaction Failed due to the following Error" + err);
            }
        },
        [tokenSwapContract]
    );

    const onByTokenX = useCallback(
        async (address: string, amount: any, tokenPrice : any) => {

            try {
                if (!tokenSwapContract) return;
                const buyTokensXYZ = await tokenSwapContract.buyTokensXYZ(amount, {
                    from: address,
                    value: web3.utils.toBN(amount).mul(web3.utils.toBN(tokenPrice)).toString(),
                });
                return buyTokensXYZ.wait();
            } catch (err) {
                alert("Transaction Failed due to the following Error" + err);
            }
        },
        [tokenSwapContract]
    );

    const onSwapTokenABC = useCallback(
        async (address: string, switchAmount: any) => {


                if (!tokenSwapContract) return;
                await tokenSwapContract.swapTKA(switchAmount, {
                    from: address,
                    gasLimit: 3000000
                })
        },
        [tokenSwapContract, tokenAContract, tokenXContract]
    );

    const onSwapTokenXYZ = useCallback(
        async (address: string, switchAmount: any, finalAmount: number) => {
            if (finalAmount > 0) {
                if (!tokenSwapContract) return;
                await tokenSwapContract.swapTKX(switchAmount, {
                    from: address,
                    gasLimit: 3000000
                });
            } else {
                alert("Cant switch Tokens with Expected return less then zero")
            }
        },
        [tokenSwapContract]
    );

    return {onByTokenA, onByTokenX, onSwapTokenABC, onSwapTokenXYZ, convertFees, convertRatio};

};

