import { useModal, AuthContext, usePromiseFunctionalLoader } from "@surveying-hub-bv/fe-component-library"
import { useContext } from "react";
import { SubscriptionService } from "../../services/SubscriptionService";
import Sidebar from "./Sidebar";
import PricingPage from "../PricingPage";
import { AxiosError } from "axios";
import { ExtendedAuthContext, ExtendedAuthContextInterface, nonLoading } from "../../AuthProvider";
import MainComponent from "./MainComponent";
import { InjectableComponent } from "@surveying-hub-bv/fe-component-library/dist/config/ApplicationConfig";

const mobileSidebar = <>subscriptions mobileSidebar</>

export const SubscriptionsPage: InjectableComponent = ({  Component }) => {
    const { showModal } = useModal()
    const isLoggedIn = nonLoading(useContext(AuthContext) as ExtendedAuthContext)

    async function fetchAccountData(user: ExtendedAuthContextInterface) {
        const token = await user.getToken();
        const subscriptionOverview = await SubscriptionService.getSubscriptions(token);
        return { loggedIn: user, subscriptionOverview }
    }

    const { loader, getData } = usePromiseFunctionalLoader(isLoggedIn, fetchAccountData);

    async function openPriceSelection(user: { uid: string, getToken: () => Promise<string> }) {
        try {
            const token = await user.getToken();
            const session = await SubscriptionService.getCustomerSession(token)
            console.log("existing customer")
            showModal(<PricingPage clientRefId={user.uid} customerSessionSecret={session.secret} table="subscription" />)
            return
        } catch (error) {
            if (!(error instanceof AxiosError && error.code === "ERR_BAD_REQUEST" && error.response?.status === 404)) {
                throw error
            }
        }
        console.log("new customer")
        showModal(<PricingPage clientRefId={user.uid} table="subscription"
            customerEmail={user.uid || undefined} />)

    }
    return <Component
        main={<MainComponent isLoggedIn={isLoggedIn} openPriceSelection={openPriceSelection} loader={loader} getData={getData} />}
        sidebar={<Sidebar isLoggedIn={isLoggedIn} openPriceSelection={openPriceSelection} loader={loader} />} hideTitle={false}
        mobileSidebar={mobileSidebar} />
}
