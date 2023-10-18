import React from 'react';


interface Props {
    value: any | undefined,
    onChange: (e: any) => void;
    onChangeSelect: (e: any) => void;
    balance? : string | undefined,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,


}

export default function Swap(props: Props) {
    const {
        value,balance, onChange,onChangeSelect, onClick = () => {
        }
    } = props;

    return (


        <div className="border rounded-xl shadow-inner bg-[#F3F3F3] p-4">
            <div className="flex justify-between pb-3">
                <span className="text-gray-400">You sell</span>
                <span className="text-gray-400">Balance: {balance}</span>
            </div>
            <div className="flex justify-between pb-3 ">
                <div className="flex">
                    <div className="input-group">
                        <select onChange={onChangeSelect} className="form-select text-center bg-[#F3F3F3]" aria-label="Value">
                            <option value="ABC">ABC</option>
                            <option value="XYZ">XYZ</option>
                        </select>
                    </div>
                </div>

                <div className="">
                    <label htmlFor="number"
                           className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"></label>
                    <input type="text"
                           className="bg-[#F3F3F3] text-right  block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                           pattern="^[0-9]*[.,]?[0-9]*$"
                           placeholder="0.0"
                           id="number"
                           name="number"
                           onChange={(value) => onChange(value)}
                           value={value}
                           required/>

                </div>
            </div>
            <div>
                <div className="flex justify-center  ">
                    <button type="submit" className="border w-full font-bold rounded-lg py-[7px] px-4 hover:bg-[linear-gradient(73.28deg,#20b486,#035663)] text-white bg-[linear-gradient(90deg,#3c9,#035663)] cursor-pointer"
                            onClick={onClick}>SWAP
                    </button>
                </div>
            </div>
        </div>

    );
}


