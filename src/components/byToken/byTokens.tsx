import React from 'react';
import Refresh from "../../asset/logo/icon-refresh";
import Plus from "../../asset/logo/icon-plus";

interface Props{
    tokenName : string
}

export default function ByToken(props: Props) {
    const { tokenName } = props;

    return (
        <div
            className="min-w-[500px] flex border rounded-3xl bg-white ">
            <div className="p-4 w-full">
                <div className=" flex justify-between pb-6">
                    <text className="font-bold">{tokenName}</text>
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
                    <div className="flex ">

                        <div>Balance: 0</div>
                    </div>
                    <div className="flex items-center">
                        <div className="flex">
                            <div className="pr-1">
                                <span>Address:</span>
                            </div>
                        </div>

                        <div className="w-full flex justify-end">
                            <input type="number" className="bg-[#d7caec] " placeholder="Please input Address:"/>
                        </div>
                    </div>
                </div>
                <div className="border rounded-xl hover:bg-[linear-gradient(73.28deg,#20b486,#035663)] text-white bg-[linear-gradient(90deg,#3c9,#035663)] p-2.5 mt-2 cursor-pointer">
                    <div className="flex justify-center ">
                        <button className="text-white font-bold">BUY</button>
                    </div>

                </div>

            </div>
        </div>
    );
}
