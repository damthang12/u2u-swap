import {Link} from "react-router-dom";
import {PAGE_ROUTES} from "../../constants/pageRoutes";
import Logo from "../../asset/logo/logo";
import "./style.scss";
import LogoBase from "../../asset/logo/logo-base";
import Setting from "../../asset/logo/setting";
import {useAuth} from "../../hooks/useAuth";
import {useWeb3React} from "@web3-react/core";
import WalletIcon from "../../asset/logo/wallet";

type Props = {};

const Header = (props: Props) => {
    const {login} = useAuth();
    const {account} = useWeb3React();

    return (
        <div
            className="flex justify-between items-center px-[32px]  md:px-p_4 h-[6rem] w-full  font-sans fixed top-0 left-0 z-20 bg-[white]">

            <div className="flex">
                <div className="">
                    <Link to={`/`}>
                        <div className="flex items-center gap-1 pl-[100px]">
                            <Logo width={75}/>
                            {/*<span className="font-semibold italic text-[#1EAA7F] text-[27px]">*/}
                            {/*    U2U*/}
                            {/*</span>*/}
                        </div>
                    </Link>
                </div>
                <div className="flex w-[400px] items-center justify-end">
                    <div className="flex items-center gap-9 font-semibold text-[#898988]">
                        <Link to={`${PAGE_ROUTES.ROOT}`}>
                            <span className="text-black hover:text-[#20B486] text-[#20B486] cursor-pointer">
                                Home
                            </span>
                        </Link>
                        <Link to={`/${PAGE_ROUTES.SWAP}`}>
                            <span className="text-black hover:text-[#20B486] nab cursor-pointer">
                                Pool
                            </span>
                        </Link>
                        <Link to={`/${PAGE_ROUTES.SWAP}`}>
                            <span className=" text-black hover:text-[#20B486] nab cursor-pointer">
                                Bridge
                            </span>
                        </Link>
                        <Link to={`/${PAGE_ROUTES.STAKE}`}>
                            <span className="text-black hover:text-[#20B486] nab cursor-pointer">
                                Staking
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="">
                <div className="flex items-center gap-6 font-semibold text-[#898988]">
                    <div
                        className="border rounded-lg py-[7px] px-6 bg-[linear-gradient(73.28deg,#20b486,#035663)] cursor-pointer">
                        <div
                            className="flex items-center">
                            <div>
                                <LogoBase width={24} height={24}/>
                            </div>
                            <div>
                                     <span className="text-white pl-2 ">
                                U2U testnet
                            </span>
                            </div>

                        </div>
                    </div>
                    <div>

                    </div>
                    <div
                        className="border rounded-lg py-[7px] px-4 hover:bg-[linear-gradient(73.28deg,#20b486,#035663)] text-white bg-[linear-gradient(90deg,#3c9,#035663)] cursor-pointer ">
                        <div className="flex">
                            <div>
                                <WalletIcon width={24} height={24}/>
                            </div>
                            <div>
                                <span className=" pl-2" onClick={login}>
                               {account ? account : "Connect Wallet"}
                            </span>
                            </div>

                        </div>
                    </div>

                    <div className="">
                        <Setting width={24} height={24}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
