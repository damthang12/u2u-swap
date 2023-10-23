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
import {useTokenSwapContract} from "../../hooks/useContract";


const TokenSwap = () => {

    const tokenSwapContract = useTokenSwapContract();
    const {
        balanceA,
        tokenPriceA,
        balanceX,
        tokenPriceX,
        onApproveTokenX,
        onApproveTokenA,
        allowanceTokenA,
        allowanceTokenX
    } = useTokenAX();
    const {onByTokenA, onByTokenX, convertFees, onSwapTokenABC, onSwapTokenXYZ, convertRatio} = useTokenSwap();
    // const [tokenNumberA, setTokenNumberA] = useState("");
    // const [tokenNumberX, setTokenNumberX] = useState("");
    const {account} = useWeb3React();
    const [tokenSelected, setTokenSelected] = useState("ABC");
    const [swapAmountA, setSwapAmountA] = useState<number>(0);
    const [swapAmountX, setSwapAmountX] = useState<number>(0);
    const [finalAmount, setFinalAmount] = useState(0);
    // const [tokenNumberXError, setNumberXError] = useState(false);
    // const [tokenNumberAError, setNumberAError] = useState(false);
    const [isDisable, setIsDisable] = useState(false);
    const [allowanceA, setAllowanceA] = useState<any>();
    const [allowanceX, setAllowanceX] = useState<any>();

    // Ở đây mình ko cần quan tâm đến click event param truyền lên từ hàm click, tương tự đối vs các hàm ở dưới
    // Các hàm ở trong hook sẽ chỉ liên quan đến các tính năng của nó. Còn tất cả những params nào liên quan đến UI/UX (nếu cần
    // phải xử lý), VD như cái event click em viết ở dưới thì mình nên xử lý nó ở trong component

    // const handleBuyTokenA = (evt: React.FormEvent) => {
    const handleBuyTokenA = (value: string) => {
        // evt.preventDefault();
        // if (tokenNumberA.trim() === '') {
        //     setNumberAError(true);
        // }
        // if (!account || !tokenNumberA) return;
        // onByTokenA(account, tokenNumberA, tokenPriceA).then(r => console.log(r));

        if (!account) return; // Chuyển cái check account này vào trong hook
        onByTokenA(account, value, tokenPriceA).then(r => console.log(r));
    };

    // const handleBuyTokenX = (evt: React.FormEvent) => {
    const handleBuyTokenX = (value: string) => {
        // evt.preventDefault();
        // if (tokenNumberX.trim() === '') {
        //     setNumberXError(true);
        // }
        // if (!account || !tokenNumberX) return;
        // onByTokenX(account, tokenNumberX, tokenPriceX).then(r => console.log(r));
        if (!account) return;
        onByTokenX(account, value, tokenPriceX).then(r => console.log(r));
    };
    const handleOnSwapABC = () => {
        if (!account || !swapAmountA) return;
        const convertSwapAmount = web3.utils.toBN(swapAmountA).toString()
        onSwapTokenABC(account, convertSwapAmount).then(r => console.log(r));
    };

    const handleOnSwapXYZ = () => {
        if (!account || !swapAmountX || !finalAmount) return;
        const convertSwapAmount = web3.utils.toBN(swapAmountX).toString()
        onSwapTokenXYZ(account, convertSwapAmount, finalAmount).then(r => console.log(r));
    };



    // Ở đây mình ko làm auto approve. Vì như vậy vừa connect ví xong nó sẽ gửi 1 cái request lên metamask để bắt user
    // approve. Như thế user sẽ ko biết nó là cái gì. Em cứ để nút approve để user tự click approve. Như vậy user sẽ hiểu
    // là mình cần phải approve trước
    //
    // error state tương tự như các chỗ khác, dùng useMemo để check. Ví dụ Swap A => X thì cần check allowance của A > 0, và ngược lại
    //   => cần tạo 2 biến isApproved cho 2 chiều swap. Khi swap chiều nào thì mình chỉ cần check approved chiều đó thôi
    // VD: const isTokenAApproved = useMemo(() => allowanceA > 0, [allowanceA])

      // const handleAutoApprove = (evt: React.FormEvent) => {
    const handleAutoApprove = () => {
        // evt.preventDefault();
        setAllowanceA(allowanceTokenA)
        setAllowanceX(allowanceTokenX)
        if (allowanceA > 0 && allowanceX > 0) {
            setIsDisable(true)
        } else {
            setIsDisable(false)
        }
        if (!account) return;
        onApproveTokenA(tokenSwapContract?.address).then(r => console.log(r));
    };
    console.log(isDisable)

    useEffect(() => {
        calculateSwap();
    }, [swapAmountX, swapAmountA])


    // 2 Hàm này chỉ validate value từ cái input, ko liên quan đến token A hay X, nên xử lý nó ở trong component BuyToken
    // const validateInputTokenA = (evt: React.ChangeEvent<HTMLInputElement>) => {
    //     const {value}: any = evt.target;
    //     if (value >= 1 || value.trim() === '') {
    //         setTokenNumberA(value);
    //         setNumberAError(false);
    //
    //     } else {
    //         setNumberAError(true);
    //     }
    // };
    //
    // const validateInputTokenX = (evt: React.ChangeEvent<HTMLInputElement>) => {
    //     const {value}: any = evt.target;
    //     if (value >= 1 || value.trim() === '') {
    //         setTokenNumberX(value);
    //         setNumberXError(false);
    //
    //     } else {
    //         setNumberXError(true);
    //     }
    // };


    // Sửa lại dùng hàm useMemo để calculate Swap amount
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
    // Ko console log ở đây. Muốn console log để check value thì cho vào trong useEffect
    // console.log(isDisable)

    return (
        <div className="flex justify-around bg-[#eeeaf4] pt-[100px] pb-[200px]">
            <div>
                <div className="">
                    <BuyTokens
                        onBuyToken={handleBuyTokenA}
                        tokenPrice={tokenPriceA.toString()}
                        // onChange={validateInputTokenA}
                        // value={tokenNumberA}
                        tokenName="TokenABC"
                        // error={tokenNumberAError}
                    />
                </div>
                <div className="pt-5">
                    <BuyTokens
                        onBuyToken={handleBuyTokenX}
                        tokenPrice={tokenPriceX.toString()}
                        // onChange={validateInputTokenX}
                        // value={tokenNumberX}
                        tokenName="TokenXYZ"
                        // error={tokenNumberXError}
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

                         {/*Ở đây mình ko làm auto approve. Vì như vậy vừa connect ví xong nó sẽ gửi 1 cái request lên metamask để bắt user*/}
                         {/*approve. Như thế user sẽ ko biết nó là cái gì. Em cứ để nút approve để user tự click approve. Như vậy user sẽ hiểu*/}
                         {/*là mình cần phải approve trước*/}

                         {/*error state tương tự như các chỗ khác, dùng useMemo để check. Ví dụ Swap A => X thì cần check allowance của A > 0, và ngược lại */}
                         {/*=> cần tạo 2 biến isApproved cho 2 chiều swap. */}
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
