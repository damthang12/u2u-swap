import React from "react";

interface Props {
    disabled?: boolean;
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    title : string
}

export default function SwapButton(props: Props) {
    const {
        onClick = () => {
        },
        className = "",
        disabled = false,
        title,
    } = props;

    const disabledClass = disabled
        ? "bg-grey-version-3 hover:bg-grey-version-3 cursor-not-allowed text-[#BBBBBA] hover:text-[#BBBBBA]"
        : "";

    return (

        <button
            className={`button ${disabledClass} ${className}`}
            onClick={onClick}
            disabled={disabled}
            type="button">{title}
        </button>

    );
}
