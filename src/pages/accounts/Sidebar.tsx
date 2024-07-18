import { Button, Loader, SidebarMiniStatsCard, rtkConnectivityIcon, rtkMountpointIcon, useModal } from "@surveying-hub-bv/fe-component-library";
import { Auth } from "firebase/auth";
import { SubscriptionService } from "../../services/SubscriptionService";
import PricingPage from "../PricingPage";
import { AxiosError } from "axios";
import { AccountOverview } from "../../services/AccountService";
import { ReactNode } from "react";
import { NonLoadingExtendedAuthContext } from "../../AuthProvider";

const Sidebar = (props: { isLoggedIn:NonLoadingExtendedAuthContext, auth: Auth, loader: Loader<AccountOverview, unknown>, openCreateAccount: () => void }) => {
    const { showModal } = useModal()

    function openPriceSelectionModal() {
        openTokenTable(props.isLoggedIn, showModal)
    }

    return <div className="flex flex-col gap-8 ">
        <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-[10px] lg:gap-[10px] mt-[30px] mb-[15px]">
            <SidebarMiniStatsCard bg="rgba(7, 100, 167, 0.18)" title="Total NTRIP Accounts" value={props.loader.map("...", "x", (accountOverview) => accountOverview.accounts.length.toString())} />
            <SidebarMiniStatsCard bg="rgba(7, 100, 167, 0.18)" title="Credits Balance" value={props.loader.map("...", "x", (accountOverview) => accountOverview.tokenAmount.toString())} />
            <Button label="Add NTRIP Account" padding="big" onClick={props.openCreateAccount} />
            <Button label="Buy Credits" padding="big" type="secondary" onClick={openPriceSelectionModal} />
        </div>
    </div>
}

export default Sidebar;

export async function openTokenTable(user: NonLoadingExtendedAuthContext, showModal: (content: ReactNode, onClose?: () => void) => void) {
    if (user === undefined)
        alert("No user")
    else {
        try {
            const token = await user.getToken();
            const session = await SubscriptionService.getCustomerSession(token)
            console.log("existing customer")
            showModal(<PricingPage clientRefId={user.uid} customerSessionSecret={session.secret}
                table="token" />)
            return
        } catch (error) {
            if (!(error instanceof AxiosError && error.code === "ERR_BAD_REQUEST" && error.response?.status === 404)) {
                throw error
            }
        }
        console.log("new customer")
        showModal(<PricingPage clientRefId={user.uid} table="token"
            customerEmail={user.email || undefined} />)
    }
}
