import WalletIcon from "../../asset/logo/wallet";
import {useAuth} from "../../hooks/useAuth";
import {useWeb3React} from "@web3-react/core";
import React from "react";

interface Props {
    title: string | React.ReactNode;
    title2: string
}

export default function ButtonBase(props: Props) {
    const {title,} = props;
    const {login} = useAuth();
    const {account} = useWeb3React();

    return (
        <div
            className="mt-5 border rounded-xl py-[10px] px-4 hover:bg-[linear-gradient(73.28deg,#20b486,#035663)] text-white bg-[linear-gradient(90deg,#3c9,#035663)] cursor-pointer ">
            <div className="flex justify-center">
                <div>
                    <WalletIcon width={24} height={24}/>

                </div>
                <div>
                    <button className=" pl-2 font-bold" onClick={login}>
                        {account ? <span>{title}</span> : <span>title2</span>}
                    </button>
                </div>

            </div>
        </div>
    );
}
