import React from "react";

interface Props {
    disabled?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    error: boolean;
}


export default function AutoApprove(props: Props) {
    const {
        onClick = () => {
        },
        disabled = false,
        error = false,
        className = "",
    } = props;

    const disabledClass = disabled
        ? "border w-full font-bold rounded-lg py-[7px] px-4 bg-grey-version-3 hover:bg-grey-version-3 cursor-not-allowed text-[#BBBBBA] hover:text-[#BBBBBA]"
        : "border w-full font-bold rounded-lg py-[7px] px-4 hover:bg-[linear-gradient(73.28deg,#20b486,#035663)] text-white bg-[linear-gradient(90deg,#3c9,#035663)] cursor-pointer";
    return (
        <div>
            <button
                className={`${disabledClass} ${className}`}
                onClick={onClick} disabled={disabled}>
                Auto Approve
            </button>
            {error &&
                <div className=" mt-1 flex justify-center text-red-500 font-medium  pt-[5px] pl-[13px] text-sm">Please approve Token.</div>}
        </div>
    );
}
