import {
    Button,
    CardTableSection,
    PromiseLoader,
    rtkMountpointIcon,
    useModal,
    PageTitle,
    usePromiseFunctionalLoader,
    Loader,
    useCopyButton,
    TabSwitch,
    CopyButton,
    AuthContext,
} from "@surveying-hub-bv/fe-component-library"
import { useFirebaseApp } from "../firebase";
import { Account, AccountOverview, AccountService, Connection } from "../services/AccountService";
import { ChangeEvent, ReactNode, useContext, useEffect, useState } from "react";
import { Auth } from "firebase/auth";
import { ConnectionService, SubscriptionOverview } from "../services/ConnectionService";
import { DataType } from "@surveying-hub-bv/fe-component-library/dist/general/gridtable/CardTableSection";
import { TokenService } from "../services/TokenService";
import NamePrompt from "./accounts/NamePrompt";
import Sidebar from "./accounts/Sidebar";
import { InjectableComponent } from "@surveying-hub-bv/fe-component-library/dist/config/ApplicationConfig";
import { ExtendedAuthContext, ExtendedAuthContextInterface, nonLoading } from "../AuthProvider";


type AccountTable = {
    username: ReactNode,
    password: ReactNode,
    dns: ReactNode,
    ip: ReactNode,
    port: ReactNode,
    mountpoints:ReactNode,
    connection: string,
    endDate: string
}

interface SelectSubscriptionProps {
    currentSubscription?: string,
    possibleSubsctiprions: SubscriptionOverview[],
    changeSubscription: (selectedSubscriptionId: string) => Promise<void>,
    disconnectSubscription: (selectedSubscriptionId: string) => Promise<void>,
    showModal: (content: ReactNode) => void
    hideModal: () => void
    onClose: () => void
}

const SelectSubscription: React.FC<SelectSubscriptionProps> = ({ currentSubscription, possibleSubsctiprions, changeSubscription, disconnectSubscription, showModal, hideModal, onClose }) => {
    const defaultSubscriptionId = currentSubscription || '';
    const [selectedSubscriptionId, setSelectedSubscriptionId] = useState(defaultSubscriptionId);

    return <>
        <div className="flex justify-center items-center gap-x-4 mt-3 lg:mt-[20px] xl:mt-[25px]">
            <select
                onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectedSubscriptionId(event.target.value)}
                defaultValue={defaultSubscriptionId}
                className="w-full border border-[#414141] rounded-[20px] p-[20px]">
                <option value="" disabled>Select a subscription</option>
                {possibleSubsctiprions.map((subscription) => (
                    <option key={subscription.subscriptionReference.subscriptionId}
                        value={subscription.subscriptionReference.subscriptionId}>
                        {subscription.subscriptionReference.shortName} {subscription.subscriptionReference.renewal === undefined ? "- unlimited" : new Intl.DateTimeFormat('default', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                        }).format(new Date(subscription.subscriptionReference.renewal * 1000))} - {subscription.coupledAccount === undefined ? "Not connected" : `Already connected to ${currentSubscription === subscription.subscriptionReference.subscriptionId ? "this account" : subscription.coupledAccount}`}
                    </option>
                ))}
            </select>
        </div>

        <div className="flex justify-center items-center gap-x-4 mt-3 lg:mt-[20px] xl:mt-[25px]">
            {!selectedSubscriptionId || selectedSubscriptionId !== defaultSubscriptionId ? (
                <Button label={"Connect"} type={!selectedSubscriptionId ? 'disabled' : 'primary'}
                    onClick={() => {
                        showModal("loading");
                        changeSubscription(selectedSubscriptionId)
                            .then(() => {
                                hideModal();
                                onClose();
                            });
                    }} />
            ) : (
                <Button label={"Disconnect"} type='dangerous' onClick={() => {
                    showModal("loading");
                    disconnectSubscription(selectedSubscriptionId)
                        .then(() => {
                            hideModal();
                            onClose();
                        });
                }} />
            )}
            <Button label={"Cancel"} type="secondary" onClick={() => {
                hideModal();
            }} />
        </div>
    </>
}

interface SelectCreditsProps {
    tokenAmount: number,
    activateTokens: (network: string, amount: number) => Promise<void>,
    showModal: (content: ReactNode) => void,
    hideModal: () => void,
    onClose: () => void,
}
const SelectCredits: React.FC<SelectCreditsProps> = ({ tokenAmount, activateTokens, showModal, hideModal, onClose }) => {
    const [selectedNetwork, setSelectedNetworkSelected] = useState<string>("1");
    const [selectedAmount, setSelectedAmount] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);
    const getDayName = (date: Date): string => {
        const options = { weekday: 'short' } as const;
        return new Intl.DateTimeFormat('en-US', options).format(date);
    };
    const nextFiveDays = Array.from({ length: 7 }, (_, i) => new Date(currentTime.getTime() + (i + 1) * 24 * 60 * 60 * 1000));

    return <>
        <div className="flex justify-center items-center gap-x-4 mt-3 lg:mt-[20px] xl:mt-[25px]">
            <select
                onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectedNetworkSelected(event.target.value)}
                className="w-full border border-[#414141] rounded-[20px] p-[20px]" defaultValue={selectedNetwork}>
                <option value="" disabled>Select a Network</option>
                <option value="1">
                    GNSS
                </option>
            </select>

        </div>
        <div className="flex justify-center items-center gap-x-4 mt-3 lg:mt-[20px] xl:mt-[25px]">
            {nextFiveDays.map((date, i) =>
                <label key={i} className={`flex flex-col items-center border cursor-pointer bg-[#121212] rounded-[20px] p-[5px] w-[50px] select-none ${selectedAmount >= i + 1 ? "border-[#4AFC2D]" : "border-[#414141]"}`}>
                    <div>{getDayName(date)}</div><div> {date.getDate()} </div>
                    <input
                        className="hidden"
                        type="radio"
                        name="date"
                        value={i + 1}
                        checked={selectedAmount === i + 1}
                        onChange={(eveny) => setSelectedAmount(parseInt(eveny.target.value))} />
                </label>)}
        </div>

        <div className="flex justify-between items-center gap-x-4 mt-3 lg:mt-[20px] xl:mt-[25px]">

            <table className="w-full">
                <tr><td className="p-1">Credits:</td> <td className="p-1 text-right">{tokenAmount}</td></tr>
                <tr><td className="p-1">Usage:</td> <td className="p-1 text-right">{TokenService.tokenCost * selectedAmount}</td></tr>
                <tr><td className="p-1">Balance:</td> <td className="p-1 text-right">{tokenAmount - TokenService.tokenCost * selectedAmount}</td></tr>
                <tr><td className="p-1">Starts:</td> <td className="p-1 text-right">{new Intl.DateTimeFormat('default', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }).format(currentTime)}</td></tr>
                <tr><td className="p-1">Ends:</td> <td className="p-1 text-right">{new Intl.DateTimeFormat('default', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }).format(new Date(currentTime.getTime() + selectedAmount * 24 * 60 * 60 * 1000))}</td></tr>
            </table>
        </div>

        <div className="flex justify-center items-center gap-x-4 mt-3 lg:mt-[20px] xl:mt-[25px]">
            <Button label={"Activate"} style={(!selectedNetwork || !selectedAmount || selectedAmount * TokenService.tokenCost > tokenAmount) ? { type: 'disabled' } : {
                type: 'primary', onClick: () => {
                    showModal("loading");
                    activateTokens(selectedNetwork, selectedAmount)
                        .then(() => {
                            hideModal();
                            onClose();
                        });
                }
            }} />
            <Button label={"Cancel"} type="secondary" onClick={() => {
                hideModal();
            }} />
        </div>
    </>
}



const CoupleSelection = (props: {
    tokenAmount: number,
    account: Account,
    connections: SubscriptionOverview[],
    updateAction: (accountId: string, subscriptionId: string) => Promise<void>,
    removeAction: (accountId: string, subscriptionId: string) => Promise<void>,
    tokenAction: (network: string, days: number) => Promise<void>,
    onClose: () => void
}) => {
    const { showModal, hideModal } = useModal()
    const coupledSubscription = props.account.connection?.type === 'Subscription' ? props.account.connection.subscriptionId : undefined
    const startingTab = props.account.connection?.type === 'Token' ? 'credits' : 'subscription'
    const [tab, setTab] = useState(startingTab);
    const commonActions = {
        showModal: showModal,
        hideModal: hideModal,
        onClose: props.onClose
    }

    const renderContent = () => {
        switch (tab) {
            case 'subscription':
                return <SelectSubscription
                    currentSubscription={coupledSubscription}
                    possibleSubsctiprions={props.connections}
                    changeSubscription={(selectedSubscriptionId) => props.updateAction(props.account.id, selectedSubscriptionId)}
                    disconnectSubscription={(selectedSubscriptionId) => props.removeAction(props.account.id, selectedSubscriptionId)}
                    {...commonActions}
                />;
            case 'credits':
                return <SelectCredits tokenAmount={props.tokenAmount} activateTokens={props.tokenAction} {...commonActions} />;
        }
    };

    return (
        <>
            <p className="mb-6 lg:mb-8 text-center text-[14px] lg:text-[16px] xl:text-[18px]">
                Account: "{props.account.name}"
            </p>

            <TabSwitch
                options={[
                    { label: 'Subscription', value: 'subscription' },
                    { label: 'Credits', value: 'credits' }
                ]}
                onSelect={(tab) => setTab(tab)}
                initialSelected={startingTab} />
            {renderContent()}
        </>
    );
}

const mobileSidebar = <>accounts mobileSidebar</>
const MainComponent = (props: { auth: Auth, loader: Loader<AccountOverview, unknown>, getData: (reload?: boolean) => void, openCreateAccount: () => void }) => {
    const { showModal } = useModal()

    async function openEditName(accountId: string, accountName: string) {
        if (props.auth.currentUser === null) {
            alert("No user");
            return;
        }
        const user = props.auth.currentUser

        showModal(<NamePrompt
            text={`Change the name of "${accountName}"`} onClose={props.getData} initialValue={accountName}
            buttonName="Change"
            action={
                async (name) => {
                    const token = await user.getIdToken()
                    await AccountService.updateAccountName(token, accountId, name)
                }
            } />)
    }

    async function openManagementDialog(account: Account, tokenAmount: number) {
        if (props.auth.currentUser === null) {
            alert("No user");
            return;
        }
        const user = props.auth.currentUser
        showModal("loading");
        const token = await user.getIdToken()
        const connections = await ConnectionService.getConnections(token)
        showModal(<CoupleSelection
            tokenAmount={tokenAmount}
            account={account} connections={connections} onClose={props.getData}
            updateAction={(accountId: string, subscriptionId: string) => ConnectionService.createConnection(token, accountId, subscriptionId)}
            removeAction={(accountId: string, subscriptionId: string) => ConnectionService.removeConnection(token, accountId, subscriptionId)}
            tokenAction={(network: string, days: number) => TokenService.activateTokens(token, account.id, network, days)} />)
    }
    const copy = useCopyButton();

    return <PromiseLoader loader={props.loader} error={<>error</>} loaded={(accountOverview) =>
        <CardTableSection
            header={<button onClick={() => props.getData(true)}> <PageTitle icon={rtkMountpointIcon} title="NTRIP Accounts" /> </button>}
            headers={{
                username: { header: "Username", colored: true },
                password: { header: "Password"},
                dns: { header: "DNS" },
                ip: { header: "IP" },
                port: { header: "Port" },
                mountpoints: { header: "Mountpoints"},
                connection: { header: "Connection" },
                endDate: { header: "Date" }
            }}
            data={accountOverview.accounts.map<DataType<AccountTable>>((account) => {
                console.log(account)
                return {
                    name: account.name,
                    editAction: () => {
                        openEditName(account.id, account.name);
                    },
                    records: {
                        username: <WithCopyButton label={account.username} type={'username'} copy={copy} />,
                        password: <WithCopyButton label={account.password} type={'password'} copy={copy} />,
                        dns: <WithCopyButton label={account.connection?.dns || process.env.REACT_APP_RELAY_DNS} type={'dnsCopy'} copy={copy} />,
                        ip: <WithCopyButton label={account.connection?.ip || process.env.REACT_APP_RELAY_IP} type={'ipCopy'} copy={copy} />,
                        port: <WithCopyButton label={account.connection?.port || process.env.REACT_APP_RELAY_PORT} type={'portCopy'} copy={copy} />,
                        mountpoints:<button className="
                        text-[#0D0D0D] 
                        bg-gradient-to-r 
                        from-bg-green1 
                        to-bg-green2 
                        hover:text-white 
                        hover:bg-none 
                        border 
                        border-transparent 
                        hover:border-solid 
                        hover:border-bg-green1 
                        rounded-[15.31px] 
                        text-[14px] 
                        lg:text-[16px] 
                        py-[6px]
                        px-[23px]"
                        >View List</button>,
                        connection: formatConnection(account.connection),
                        endDate: formatDate(account.connection)
                    },
                    actionButton: {
                        text: "Manage", action: () => {
                            openManagementDialog(account, accountOverview.tokenAmount);
                        }, color: "green"
                    }
                };
            })}
            newAction={{
                topText: <p className="text-[16px] lg:text-[20px]">Need new <span className="gradient-text">NTRIP</span> logins?</p>, bottomText: <p className="text-[16px] lg:text-[20px]">Add NTRIP Account</p>, action: props.openCreateAccount
            }}
            filter={(datum, searchTerm) => datum.name.toLowerCase().includes(searchTerm.toLowerCase())} />} />
}



export const AccountsPage: InjectableComponent = ({ Component }) => {
    const auth = useFirebaseApp()

    const isLoggedIn = nonLoading(useContext(AuthContext) as ExtendedAuthContext)
    const { showModal } = useModal()

    async function fetchAccountData(user: ExtendedAuthContextInterface) {
        const token = await user.getToken();
        return await AccountService.getAccounts(token);
    }

    const { loader, getData } = usePromiseFunctionalLoader(isLoggedIn, fetchAccountData);

    async function openCreateAccount() {
        if (auth.currentUser === null) {
            alert("No user");
            return;
        }
        const user = auth.currentUser

        showModal(<NamePrompt
            text="Create a new Account" onClose={getData}
            buttonName="Create"
            action={
                async (name) => {
                    const token = await user.getIdToken()
                    await AccountService.createAccount(token, name)
                }
            } />)
    }

    return <Component
        main={<MainComponent auth={auth} loader={loader} getData={getData} openCreateAccount={openCreateAccount} />}
        sidebar={<Sidebar auth={auth} loader={loader} openCreateAccount={openCreateAccount} isLoggedIn={isLoggedIn} />} hideTitle={false}
        mobileSidebar={mobileSidebar} />
}

function formatConnection(connection?: Connection): string {
    if (!connection) {
        return "Not connected";
    }

    switch (connection.type) {
        case 'Subscription':
            return connection.shortName;
        case 'Token':
            return "Credits";
        default:
            return "Unknown connection type";
    }
}


function formatDate(connection?: Connection): string {
    if (!connection) {
        return "-";
    }

    if (connection.renewal === undefined) {
        return "Free"
    }

    switch (connection.type) {
        case 'Subscription':
            return `${new Intl.DateTimeFormat('default', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(new Date(connection.renewal * 1000))}`; // TODO use same timestamp standard.
        case 'Token':
            return `${new Intl.DateTimeFormat('default', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(new Date(connection.renewal))}`;
        default:
            return "Unknown connection type";
    }
}

type CopyType = 'username' | 'password' | 'ipCopy' | 'dnsCopy' | 'portCopy'

const WithCopyButton = ({ label, type, copy }: { label: string | undefined, type: CopyType, copy: { checkCopied: (type: CopyType) => boolean, copyToClipboard: (value: string, type: CopyType) => void } }) => {
    if (label === undefined)
        return <>-</>
    return <>{label} </>
}
