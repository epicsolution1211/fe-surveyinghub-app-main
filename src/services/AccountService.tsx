import {AxiosService} from "./AxiosService";

type SubscriptionReference = {
    type: 'Subscription';
    subscriptionId: string;
    shortName: string;
    renewal: number;
};

type TokenReference = {
    type: 'Token';
    renewal: number;
};
export type Connection = (SubscriptionReference | TokenReference) & {
    dns? : string,
    ip? : string,
    port? : string,
};
export type Account = {
    id: string,
    username: string,
    password: string,
    name: string,
    connection?: Connection
}

export type AccountOverview = {
    tokenAmount: number,
    accounts: Account[]
}

export const AccountService = new (class {
    getAccounts(userToken: string): Promise<AccountOverview> {
        return AxiosService.getAuth(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/accounts`, userToken)
    }

    createAccount(userToken: string, name?: string): Promise<void> {
        return AxiosService.postAuth(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/accounts`, userToken, {
            name: name
        })
    }

    updateAccountName(userToken: string, accountId: string, name?: string): Promise<void> {
        return AxiosService.postAuth(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/accounts/name`, userToken, {
            accountId: accountId,
            name: name
        })
    }
})()
