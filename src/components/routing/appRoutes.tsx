import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PAGE_ROUTES } from "../../constants/pageRoutes";
import App from "../../App";
import TokenSwap from "../../controllers/tokenSwap/TokenSwap";
import StakingController from "../../controllers/stacking/StackingController";

type Props = {};

const AppRoutes = (props: Props) => {
    return (
        <BrowserRouter basename={PAGE_ROUTES.ROOT}>
            <Routes>
                {/*<Route*/}
                {/*    path={PAGE_ROUTES.ADMIN + "/" + PAGE_ROUTES.LOGIN}*/}
                {/*    element={<Login />}*/}
                {/*></Route>*/}
                <Route path={PAGE_ROUTES.ROOT} element={<App />}>
                    <Route path={PAGE_ROUTES.HOME} element={<TokenSwap />} />
                    <Route index element={<TokenSwap />} />
                    <Route
                        path={PAGE_ROUTES.STAKE}
                        element={< StakingController/>}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
