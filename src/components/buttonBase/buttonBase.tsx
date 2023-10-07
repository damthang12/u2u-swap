import React from "react";
import {useWeb3React} from "@web3-react/core";
import WalletIcon from "../../asset/logo/wallet";
import {useAuth} from "../../hooks/useAuth";

interface Props {
    title1 : string,
    title2 :string,

}

export default function ButtonBase(props: Props) {
    const {tile,_tile} = props;
    const { login } = useAuth();
    const { account } = useWeb3React();

    return (
        <div
            className="mt-5 border rounded-xl py-[10px] px-4 hover:bg-[linear-gradient(73.28deg,#20b486,#035663)] text-white bg-[linear-gradient(90deg,#3c9,#035663)] cursor-pointer ">
            <div className="flex justify-center">
                <div>
                    <WalletIcon width={24} height={24}/>
                </div>
                <div>
                                <span className=" pl-2 font-bold" onClick={login}>
                               {account ? {title} : "Connect Wallet"}
                            </span>
                </div>

            </div>
        </div>
    );
};
