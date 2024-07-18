import {AxiosService} from "./AxiosService";
import {SubscriptionInterval} from "./SubscriptionService";

export type SubscriptionOverview = {
    subscriptionReference: {
        subscriptionId: string,
        shortName: string,
        interval: SubscriptionInterval,
        renewal?: number
    },
    coupledAccount?: string,
}

export const ConnectionService = new (class {
    getConnections(userToken: string): Promise<SubscriptionOverview[]> {
        return AxiosService.getAuth(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/connections`, userToken)
    }

    createConnection(userToken: string, accountId: string, subscriptionId: string): Promise<void> {
        return AxiosService.postAuth(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/connections`, userToken, {
            accountId: accountId,
            subscriptionId: subscriptionId
        })
    }
    
    removeConnection(userToken: string, accountId: string, subscriptionId: string): Promise<void> {
        return AxiosService.deleteAuth(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/connections`, userToken, {
            accountId: accountId,
            subscriptionId: subscriptionId
        })
    }
})()
