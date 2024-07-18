import { CardTableSection, Loader, PageTitle, PromiseLoader, rtkMountpointIcon, useModal } from "@surveying-hub-bv/fe-component-library";
import { ExtendedAuthContextInterface, NonLoadingExtendedAuthContext } from "../../AuthProvider";
import {  SubscriptionOverview, SubscriptionInterval, SubscriptionService, SubscriptionStatus } from "../../services/SubscriptionService";
import { Confirmation } from "./Dialogs";
import { ButtonColor, DataType } from "@surveying-hub-bv/fe-component-library/dist/general/gridtable/CardTableSection";
import { ReactNode } from "react";


type MainComponentProps = {
    isLoggedIn: NonLoadingExtendedAuthContext,
    openPriceSelection: (user: { uid: string, getToken: () => Promise<string> }) => void,
    loader:Loader<{
        loggedIn: ExtendedAuthContextInterface;
        subscriptionOverview: SubscriptionOverview;
    }, unknown>,
    getData:(reload?: boolean) => void
}
const MainComponent = ({ isLoggedIn, openPriceSelection, loader, getData }: MainComponentProps) => {
    const { showModal } = useModal()


    const actOnSubscription = async (loggedIn: ExtendedAuthContextInterface, act: (token: string, subscriptionId: string) => Promise<void>, subscriptionId: string) => {
        const token = await loggedIn.getToken()
        await act(token, subscriptionId)
    }

    return <PromiseLoader loader={loader} error={<>error</>} loaded={(response) =>
        <CardTableSection
            header={<button onClick={() => getData(true)}>
                <PageTitle icon={rtkMountpointIcon} title="Subscriptions" />
            </button>}
            headers={{
                renewal: { header: "Renewal date" },
                type: { header: "Type" },
                status: { header: "Status" },
                connection: { header: "NTRIP Account" },
            }}
            data={response.subscriptionOverview.subscriptions.map<DataType<{ renewal: string; type: string; status: string; connection: string }>>((subscription) => {
                const time = subscription.renewal
                const a = (time !== undefined) ? new Intl.DateTimeFormat('default', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(time * 1000)).toString() : ""
                return {
                    name: subscription.name,
                    records: {
                        renewal: (subscription.status === 'CANCELLED' ? "Cancels " : "") + a,
                        type: interval[subscription.interval],
                        status: status[subscription.status],
                        connection: subscription.coupledAccount === undefined ? "Not connected" : subscription.coupledAccount.name
                    },
                    actionButton: subscription.interval === 'FREE' ? {
                        text: "-", action: () => {
                            alert("Not implemented")
                        }, color: "green"
                    } : button[subscription.status]({ showModal, actOnSubscription: (act: (token: string, subscriptionId: string) => Promise<void>) => actOnSubscription(response.loggedIn, act, subscription.id), getData })
                };
            })}
            newAction={isLoggedIn && {
                topText: <p className="text-[16px] lg:text-[20px]"></p>, bottomText: <p className="text-[16px] lg:text-[20px]">Add new License</p>, action: () => openPriceSelection(isLoggedIn)
            }} />
    } />
};

export default MainComponent;

const interval: { [key in SubscriptionInterval]: string } = {
    YEARLY: "Yearly",
    MONTHLY: "Monthly",
    WEEKLY: "Weekly",
    FREE: "Free"
}
const status: { [key in SubscriptionStatus]: string } = {
    ACTIVE: "Active",
    CANCELLED: "Cancellation pending"
}

type ButtonProps = {
    showModal: (content: ReactNode) => void,
    actOnSubscription: (act: (token: string, subscriptionId: string) => Promise<void>) => Promise<void>,
    getData: (reload: boolean) => void
}

const button: {
    [key in SubscriptionStatus]: (parameters: ButtonProps) => {
        text: string,
        action: () => void,
        color: ButtonColor
    }
} = {
    ACTIVE: (parameters: ButtonProps) => ({
        text: "Cancel", action: async () => {
            parameters.showModal(<Confirmation
                text="Are you sure you want to cancel?"
                additionalText="Canceling your subscription will end this particular licence. Your account will autimatically be uncoupled."
                loadingText="Cancelling your subscription..."
                confirmAction={() => parameters.actOnSubscription(SubscriptionService.cancel)}
                onClose={() => parameters.getData(true)} />)
        }, color: "red"
    }),
    CANCELLED: (parameters: ButtonProps) => ({
        text: "Reactivate", action: () => {
            parameters.showModal(<Confirmation
                text="Are you sure you want to resume?"
                loadingText="Resuming your subscription..."
                confirmAction={() => parameters.actOnSubscription(SubscriptionService.resume)}
                onClose={() => parameters.getData(true)} />)
        }, color: "green"
    })
};
