import React from 'react';


interface Props {
    tokenName: string,
    tokenSold: string,
    tokenPrice: string,
    value: number | undefined,
    onChange: (e: any) => void;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export default function ByTokens(props: Props) {
    const {
        tokenName, tokenSold, value, tokenPrice,
        onClick = () => {
        },
        onChange
    } = props;

    return (
        <div
            className="min-w-[500px] flex border rounded-3xl bg-white ">
            <div className="p-4 w-full">
                <div className=" flex justify-between pb-6">
                    <text className="font-bold">{tokenName}</text>
                </div>
                <div className="border rounded-xl shadow-lg bg-[#F3F3F3] p-4">
                    <div className="flex pb-2 justify-between">
                        <span>Balance:</span>
                        <span>{tokenSold}</span>
                    </div>
                    <div className="flex pb-2 justify-between">
                        <span>Token Price:</span>
                        <span> {tokenPrice}</span>
                    </div>
                    <div>
                        <div className="flex justify-between">
                            <div className="">
                                <span>Token number:</span>
                            </div>
                            <div className="">
                                <input type="text" className="bg-[#F3F3F3] text-right"
                                       pattern="^[0-9]*[.,]?[0-9]*$"
                                       placeholder="0.0"
                                       id="number"
                                       name="number"
                                       onChange={(value) => onChange(value)}
                                       value={value}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="border rounded-xl shadow-lg hover:bg-[linear-gradient(73.28deg,#20b486,#035663)] text-white bg-[linear-gradient(90deg,#3c9,#035663)] p-2.5 mt-6 mb-4 cursor-pointer">
                    <div className="flex justify-center  ">
                        <button className="text-white font-bold focus:ring-4 focus:outline-none" onClick={onClick}>BUY</button>
                    </div>
                </div>
            </div>
        </div>
    );
}


