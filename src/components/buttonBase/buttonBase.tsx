import WalletIcon from "../../asset/logo/wallet";
import {useAuth} from "../../hooks/useAuth";

import React from "react";


export default function ButtonBase() {
    const {login} = useAuth();

    return (
        <div
            className="mt-5 border rounded-xl py-[10px] px-4 hover:bg-[linear-gradient(73.28deg,#20b486,#035663)] text-white bg-[linear-gradient(90deg,#3c9,#035663)] cursor-pointer ">
            <div className="flex justify-center">
                <div>
                    <WalletIcon width={24} height={24}/>

                </div>
                <div>
                    <button className=" pl-2 font-bold" onClick={login}>
                        Connect Wallet
                    </button>
                </div>

            </div>
        </div>
    );
}
