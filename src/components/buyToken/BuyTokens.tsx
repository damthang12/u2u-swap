import React from 'react';


interface Props {
    tokenName: string,
    tokenPrice: string,
    value: string | undefined,
    onChange: (e: any) => void;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    disabled?: boolean;
    error: boolean;
}

export default function BuyTokens(props: Props) {
    const {
        tokenName, value, tokenPrice, error,
        onClick = () => {
        },
        onChange,
        disabled = false,
    } = props;

    const disabledClass = disabled
        ? "bg-grey-version-3 hover:bg-grey-version-3 cursor-not-allowed text-[#BBBBBA] hover:text-[#BBBBBA]"
        : "";


    return (

        <div
            className="min-w-[500px] flex border rounded-xl bg-white shadow-xl">
            <div className="p-4 w-full">
                <div className=" flex justify-between pb-6">
                    <text className="font-bold">{tokenName}</text>
                </div>
                <div className="border rounded-xl shadow-inner bg-[#F3F3F3] p-4">
                    <div className="flex pb-2 justify-between">
                        <span>Token Price:</span>
                        <span> {tokenPrice}</span>
                    </div>
                    <div>
                        <div className="flex justify-between items-end">
                            <div className="">
                                <span>Token number:</span>
                            </div>

                            <div className="">
                                <label htmlFor="number"
                                       className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"></label>
                                <input type="text"
                                       className={`bg-[#F3F3F3] text-right  block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 ${error ? 'border-red-500' : ''}`}
                                       placeholder="0.0"
                                       id="number"
                                       name="number"
                                       onChange={(value) => onChange(value)}
                                       value={value}
                                       required
                                />
                                {error &&
                                    <div className="text-red-500 font-medium  pt-[5px] pl-[13px] text-sm">Please input
                                        amount.</div>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="w-full mt-4">
                        <button type="submit"
                                className={`"border w-full font-bold rounded-lg py-[7px] px-4 hover:bg-[linear-gradient(73.28deg,#20b486,#035663)] text-white bg-[linear-gradient(90deg,#3c9,#035663)] cursor-pointer ${disabledClass} `}
                                onClick={onClick}
                                disabled={disabled}
                        >BUY
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}


