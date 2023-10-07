import { useState, useEffect, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import web3 from "web3";

export const useBalance = () => {
    const { account } = useWeb3React();
    const [rawBalance, setRawBalance] = useState("");

    // const balance = web3.utils.fromWei(rawBalance, "ether");
    const balance = useMemo(() => {
        return web3.utils.fromWei(rawBalance, "ether");
    }, [rawBalance]);

    useEffect(() => {
        if (!account) return;
        window.ethereum
            .request({ method: "eth_getBalance", params: [account, "latest"] })
            .then((_rawBalance: any) => {
                setRawBalance(_rawBalance);
            });
    }, [account]);
    return { balance, rawBalance };
};
