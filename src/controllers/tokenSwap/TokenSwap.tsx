import React from 'react';
import Refresh from "../../asset/logo/icon-refresh";
import Plus from "../../asset/logo/icon-plus";
import ArrowIcon from "../../asset/logo/arrow-icon";
import WalletIcon from "../../asset/logo/wallet";
import {useAuth} from "../../hooks/useAuth";
import {useWeb3React} from "@web3-react/core";
import ByTokens from "../byToken/byTokens";
import {useBalanceOf} from "../../hooks/useBlanceOf";

const HomePage = () => {
    const {login} = useAuth();
    const {account} = useWeb3React();
    const {onBalanceOf,balanceOf} = useBalanceOf();

    return (
        <div className="flex pt-[200px] pb-[200px] w-full justify-around bg-[#eeeaf4]">
            <div>
                <div>
                    <ByTokens onBalanceOf={onBalanceOf} balanceOf={balanceOf} tokenName="TokenABC"/>
                </div>
                {/*<div className="pt-5">*/}
                {/*    <ByTokens tokenName="TokenXYZ"/>*/}
                {/*</div>*/}

            </div>


            <div
                className="min-w-[400px] flex border rounded-3xl bg-white ">
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
                    <div className="border rounded-xl bg-[#d7caec] p-4">
                        <div className="flex justify-between ">
                            <div>You sell</div>
                            <div>Balance: 0</div>
                        </div>
                        <div className="flex justify-between ">
                            <div className="flex">
                                <div className="pr-1">
                                    <span>logo</span>
                                </div>
                                <div className="pr-1">
                                    <span>logo</span>
                                </div>
                                <div className="pr-1">
                                    <span>logo</span>
                                </div>
                            </div>

                            <div className="">
                                <input type="number" className="bg-[#d7caec]"/>
                            </div>
                        </div>
                        <div>
                            <a> Uniultra Coin </a>
                        </div>
                    </div>

                    <div className="w-full flex pt-10 pb-10 justify-center">
                        <div className=" ">
                            <div className="border rounded-full bg-white">
                                <ArrowIcon width={24} height={24}/>
                            </div>

                        </div>
                    </div>

                    <div className="border rounded-lg p-4 ">
                        <div className="flex justify-between ">
                            <div>You sell</div>
                            <div>Balance: 0</div>
                        </div>
                        <div className="flex justify-between ">
                            <div className="flex">
                                <div className="pr-1">
                                    <span>logo</span>
                                </div>
                                <div className="pr-1">
                                    <span>logo</span>
                                </div>
                                <div className="pr-1">
                                    <span>logo</span>
                                </div>
                            </div>

                            <div className="">
                                <input type="number"/>
                            </div>
                        </div>
                        <div>
                            <a>Uniultra Coin </a>
                        </div>
                    </div>
                    <div
                        className="mt-5 border rounded-xl py-[10px] px-4 hover:bg-[linear-gradient(73.28deg,#20b486,#035663)] text-white bg-[linear-gradient(90deg,#3c9,#035663)] cursor-pointer ">
                        <div className="flex justify-center">
                            <div>
                                <WalletIcon width={24} height={24}/>
                            </div>
                            <div>
                                <span className=" pl-2 font-bold" onClick={login}>
                               {account ? "Connected" : "Connect Wallet"}
                            </span>
                            </div>

                        </div>
                    </div>
                    <div>

                    </div>

                    <div className="flex justify-between">
                        <span>Minimum received</span>

                        <div>
                            <span>0.0000008582</span>
                            <span>BNB</span>
                        </div>
                    </div>


                    <div className="flex justify-between">
                        <span>Price Impact</span>

                        <div>
                            <span>0.0000008582</span>
                            <span>BNB</span>
                        </div>
                    </div>


                    <div className="flex justify-between">
                        <span>Trading Fee</span>

                        <div>
                            <span>0.0000008582</span>
                            <span>BNB</span>
                        </div>
                    </div>


                    <div className="flex justify-between">
                        <span>Route</span>

                        <div>
                            <span>0.0000008582</span>
                            <span>BNB</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
