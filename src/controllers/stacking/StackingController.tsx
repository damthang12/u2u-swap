import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useWeb3React } from "@web3-react/core";
import { useStaking } from "../hooks/useStaking";
import web3 from "web3";
import { useBalance } from "../hooks/userBalance";
import Button from "../components/button/button";


function StakingController() {
    const { account } = useWeb3React();
    const { login } = useAuth();
    const { onStake } = useStaking();
    const { balance } = useBalance();

    const [number, setNumber] = useState<string>();

    const handleStaking = () => {
        if (!account || !number) return;
        const convertAmount = web3.utils.toWei(number, "ether");
        onStake(account, convertAmount);
    };

    return (
        <div className="App">
            <header className="App-header">
                <div className="Waraper">
                    <div className="Waraper-container">
                        <div className="Container">
                            <div className="Staking">Staking Calculator</div>
                            <div className="text-container">
                                <div className="text-base">Your Balance:</div>
                                <div className="text-waraper">
                                    <span className="balance">{balance}</span>
                                    <span className="balance">U2U</span>
                                </div>
                            </div>
                            <div>
                                <div className="Staking-amount">
                                    <div className="text-base">
                                        Staking amount
                                    </div>
                                    <input
                                        className="input-container text-black text-base"
                                        placeholder="Ex: 1000"
                                        type="number"
                                        id="number"
                                        name="number"
                                        onChange={(e) =>
                                            setNumber(e.target.value)
                                        }
                                        value={number}
                                    ></input>
                                </div>
                            </div>
                            <div className="percen-container">
                                <button className="button-base bg-slate-100 text-black text-base">
                                    25%
                                </button>
                                <button className="button-base bg-slate-100 text-black text-base">
                                    50%
                                </button>
                                <button className="button-base bg-slate-100 text-black text-base">
                                    75%
                                </button>
                                <button className="button-base bg-slate-100 text-black text-base">
                                    100%
                                </button>
                            </div>
                            <div>
                                <div className="Staking-amount">
                                    <div className="text-base">Validator</div>
                                </div>
                                <div></div>
                            </div>

                            <div className="button-connect-waraper">
                                <Button
                                    onClick={login}
                                    onStake={handleStaking}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default StakingController;
