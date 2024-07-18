import React from 'react';
import './index.css';
import './App.css';
import '@surveying-hub-bv/fe-component-library/dist/App.css';
import { ApplicationConfig, Button } from '@surveying-hub-bv/fe-component-library';

import AuthProvider, { useAuth } from './AuthProvider';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import { BrowserRouter } from 'react-router-dom';
import { SubscriptionsPage } from './pages/subscriptions/SubscriptionsPage';
import { AccountsPage } from './pages/accounts';
import { MapPage } from './pages/map';
import { AxiosService } from './services/AxiosService';
import { MapSVG, RinexSVG } from './SVG';
import { FeedPage } from './pages/feed/FeedPage';
import { UserManagementPage } from './pages/usermanagement/UserManagementPage';

import { Analytics } from '@vercel/analytics/react';


const topLogo =
    <a href="/" className="flex flex-row justify-center items-center gap-x-6 text-white hover:text-white">
        <p className="uppercase text-[20px] lg:text-[30px] text-white font-normal">
            <span className="gradient-text font-medium">SURVEYING HUB</span> Cloud
        </p>
    </a>

const App: React.FC = () => {
    return (<>
        <React.StrictMode>
            <AuthProvider>
                <BrowserRouter>
                    <ApplicationConfig
                        main={{
                            name: "Map",
                            url: "/map",
                            activeSVG: MapSVG.active,
                            passiveSVG: MapSVG.passive,
                            content: MapPage
                        }}
                        accountUrl="/basic-info"
                        login={{ url: "/login", content: <Login accountLink="/signup" /> }}
                        createAccount={{ url: "/signup", content: <CreateAccount signinLink="/login" /> }}
                        topLogo={topLogo}
                        pages={[
                            {
                                name: "NTRIP Accounts",
                                url: "/ntrip-accounts",
                                activeSVG: RinexSVG.active,
                                passiveSVG: RinexSVG.passive,
                                content: AccountsPage
                            },
                            {
                                name: "Subscriptions",
                                url: "/subscriptions",
                                activeSVG: RinexSVG.active,
                                passiveSVG: RinexSVG.passive,
                                content: SubscriptionsPage
                            }
                        ]}
                        adminPages={[
                            {
                                name: "Feed",
                                url: "/feed",
                                activeSVG: RinexSVG.active,
                                passiveSVG: RinexSVG.passive,
                                content: FeedPage
                            },
                            {
                                name: "Users",
                                url: "/users",
                                activeSVG: RinexSVG.active,
                                passiveSVG: RinexSVG.passive,
                                content: UserManagementPage
                            }
                        ]}
                        userInfoMain={<ManageBilling />} />
                </BrowserRouter>
            </AuthProvider>
        </React.StrictMode>
        <Analytics /></>
    );
};

export default App;

const ManageBilling = () => {
    const auth = useAuth()

    return <div className="mt-[100px] lg:mt-[150px] lg:ml-[1%] xl:ml-[1%]">
        <Button label={'Manage Billing in Stripe'} onClick={() => {
            if (auth.isLoggedIn !== 'loading' && auth.isLoggedIn !== undefined)
                auth.isLoggedIn.getIdToken()
                    .then((token) => AxiosService.getAuth<string>(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/getInvoicePortal`, token))
                    .then((response) => {
                        window.location.assign(response)
                    })
        }} />
        <Button label={'See Invoices in Stripe'} onClick={() => {
            if (auth.isLoggedIn !== 'loading' && auth.isLoggedIn !== undefined)
                auth.isLoggedIn.getIdToken()
                    .then((token) => AxiosService.getAuth<string>(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/getInvoicePortal`, token))
                    .then((response) => {
                        window.location.assign(response)
                    })
        }} />
    </div>
}
