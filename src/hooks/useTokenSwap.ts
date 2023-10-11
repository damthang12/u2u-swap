import {useTokenSwapContract} from "./useContract";
import {useCallback, useState} from "react";

export const useToken = () => {
    const tokenSwapContract = useTokenSwapContract();
    const [tokenAddressABC, setTokenAddressABC] = useState("");

    const onToken = useCallback(
        async () => {
            if (!tokenSwapContract) return;
            const tx = await tokenSwapContract.tokenABC();
            return setTokenAddressABC(tx);
        },
        [tokenSwapContract]
    );
    return {onToken, tokenAddressABC};


    // useEffect( () => {
    //     if (!account) return;
    //     window.ethereum
    //         .request({ method: "eth_getBalance", params: [account, "latest"] })
    //         .then((_rawBalance: any) => {
    //             setRawBalance(_rawBalance);
    //         });
    // }, [account]);
    // return { balance, rawBalance };
};

