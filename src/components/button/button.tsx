import { useWeb3React } from "@web3-react/core";
import React from "react";

export default function Button(props: any) {
    const { onClick, onStake } = props;
    const { account } = useWeb3React();
    return (
        <div>
            <button className="button-connect" onClick={onClick}>
                {account ? (
                    <button onClick={onStake}>Delegate</button>
                ) : (
                    "Connect"
                )}
            </button>
        </div>
    );
}
