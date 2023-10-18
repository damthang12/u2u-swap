import React, {useEffect, useState} from 'react';
import Refresh from "../../asset/logo/icon-refresh";
import Plus from "../../asset/logo/icon-plus";
import ArrowIcon from "../../asset/logo/arrow-icon";
import {useWeb3React} from "@web3-react/core";
import {useTokenAX} from "../../hooks/useTokenAX";
import {useTokenSwap} from "../../hooks/useTokenSwap";
import BuyTokens from "../../components/buyToken/BuyTokens";
import web3 from "web3";
import Swap from "../../components/swap/Swap";
import AutoApprove from "../../components/autoApprove/AutoApprove";
import ButtonBase from "../../components/buttonBase/buttonBase";


const TokenSwap = () => {
    const {balanceA, tokenPriceA, balanceX, tokenPriceX, onApprove, allowanceTokenA, allowanceTokenX} = useTokenAX();
    const {onByTokenA, onByTokenX, convertFees, onSwapTokenABC, onSwapTokenXYZ, convertRatio} = useTokenSwap();
    const [tokenNumberA, setTokenNumberA] = useState("");
    const [tokenNumberX, setTokenNumberX] = useState("");
    const {account} = useWeb3React();
    const [tokenSelected, setTokenSelected] = useState("ABC");
    const [swapAmountA, setSwapAmountA] = useState<number>(0);
    const [swapAmountX, setSwapAmountX] = useState<number>(0);
    const [finalAmount, setFinalAmount] = useState(0);
    const [tokenNumberXError, setNumberXError] = useState(false);
    const [tokenNumberAError, setNumberAError] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [allowanceA, setAllowanceA] = useState<any>();
    const [allowanceX, setAllowanceX] = useState<any>();


    const handleBuyTokenA = (evt: React.FormEvent) => {
        evt.preventDefault();
        if (tokenNumberA.trim() === '') {
            setNumberAError(true);
        }
        if (!account || !tokenNumberA) return;
        onByTokenA(account, tokenNumberA, tokenPriceA).then(r => console.log(r));
    };
    const handleBuyTokenX = (evt: React.FormEvent) => {
        evt.preventDefault();
        if (tokenNumberX.trim() === '') {
            setNumberXError(true);
        }
        if (!account || !tokenNumberX) return;
        onByTokenX(account, tokenNumberX, tokenPriceX).then(r => console.log(r));
    };
    const handleOnSwapABC = () => {
        if (!account || !swapAmountA || !finalAmount) return;
        const convertSwapAmount = web3.utils.toBN(swapAmountA).toString()
        onSwapTokenABC(account, convertSwapAmount, finalAmount).then(r => console.log(r));
    };

    const handleOnSwapXYZ = () => {
        if (!account || !swapAmountX || !finalAmount) return;
        const convertSwapAmount = web3.utils.toBN(swapAmountX).toString()
        onSwapTokenXYZ(account, convertSwapAmount, finalAmount).then(r => console.log(r));
    };

    const handleAutoApprove = (evt: React.FormEvent) => {
        evt.preventDefault();
        setAllowanceA(allowanceTokenA)
        setAllowanceX(allowanceTokenX)
        if (allowanceA > 0 && allowanceX > 0) {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
        // if (!account) return;
        // onApprove(tokenAContract?.address).then(r => console.log(r));
    };
    console.log(isDisable)

    useEffect(() => {
        calculateSwap();
    }, [swapAmountX, swapAmountA])


    const validateInputTokenA = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const {value}: any = evt.target;
        if (value >= 1 || value.trim() === '') {
            setTokenNumberA(value);
            setNumberAError(false);

        } else {
            setNumberAError(true);
        }
    };

    const validateInputTokenX = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const {value}: any = evt.target;
        if (value >= 1 || value.trim() === '') {
            setTokenNumberX(value);
            setNumberXError(false);

        } else {
            setNumberXError(true);
        }
    };


    const calculateSwap = () => {
        let Final;
        if (tokenSelected === "ABC") {
            const exchangeA = swapAmountA * parseInt(convertRatio);
            Final = exchangeA - ((exchangeA * parseInt(convertFees)) / 100);
        } else {
            const exchangeA = swapAmountX / parseInt(convertRatio);
            Final = exchangeA - ((exchangeA * parseInt(convertFees)) / 100);
        }
        if (isNaN(Final)) {
            setFinalAmount(0);
        } else {
            setFinalAmount(Math.ceil(Final));
        }
    }

    return (
        <div className="flex justify-around bg-[#eeeaf4] pt-[100px] pb-[200px]">
            <div>
                <div className="">
                    <BuyTokens
                        onClick={handleBuyTokenA}
                        tokenPrice={tokenPriceA.toString()}
                        onChange={validateInputTokenA}
                        value={tokenNumberA}
                        tokenName="TokenABC"
                        error={tokenNumberAError}/>
                </div>
                <div className="pt-5">
                    <BuyTokens
                        onClick={handleBuyTokenX}
                        tokenPrice={tokenPriceX.toString()}
                        onChange={validateInputTokenX}
                        value={tokenNumberX}
                        tokenName="TokenXYZ"
                        error={tokenNumberXError}
                    />
                </div>
            </div>
            <div className="">
                <div
                    className=" shadow-xl  min-w-[480px] flex border rounded-xl bg-white">
                    <div className="p-4 w-full">
                        <div className=" flex justify-between pb-6">
                            <span className="font-bold">Swap</span>
                            <div className="flex">
                                <div className="pr-5">
                                    <Refresh width={24} height={24}/>
                                </div>
                                <div className="">
                                    <Plus width={24} height={24}/>
                                </div>
                            </div>
                        </div>


                        <div className="flex relative flex-col justify-center gap-3">
                            <Swap
                                value={swapAmountA}
                                onChange={(e) =>
                                    setSwapAmountA(e.target?.value)}
                                onChangeSelect={(evt) => {
                                    setTokenSelected(evt.target.value)
                                }}
                                onClick={handleOnSwapABC}
                                balance={balanceA}/>
                            <div className="w-full flex justify-center absolute ">
                                <div className="flex ">
                                    <button
                                        className="border rounded-full bg-white hover:bg-[linear-gradient(73.28deg,#20b486,#035663)]">
                                        <ArrowIcon width={24} height={24}/>
                                    </button>

                                </div>
                            </div>
                            <Swap
                                value={swapAmountX}
                                onChange={(e) =>
                                    setSwapAmountX(e.target?.value)}
                                onChangeSelect={(evt) => {
                                    setTokenSelected(evt.target.value)
                                }}
                                onClick={handleOnSwapXYZ}
                                balance={balanceX}/>

                        </div>
                        <div
                            className="mt-4 ">
                            {account ? (
                                    <AutoApprove onClick={handleAutoApprove} error={isDisable} disabled={isDisable}/>) :
                                <ButtonBase/>}

                        </div>
                        <div className="w-full mt-[20px] ">
                            <div className="border border-t-1">
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-sm">Route</span>
                                <div>
                                    <span className="text-gray-400 text-sm">1 ABC =</span>
                                    <span className="text-gray-400 text-sm"> 2 XYZ</span>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-sm">Expected Output</span>
                                <div>
                                    <span className="text-gray-400 text-sm">0.0000008582</span>
                                    <span className="text-gray-400 text-sm">BNB</span>
                                </div>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400 text-sm">Minimum received after slippage (0.5%)</span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    );
};

export default TokenSwap;
