import {AxiosService} from "./AxiosService";

type CustomerSession = {
    secret: string;
};
export type SubscriptionInterval = 'YEARLY' | 'MONTHLY' | 'WEEKLY' | 'FREE'
export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED'
type Subscription = {
    id: string,
    name: string,
    interval: SubscriptionInterval;
    status: SubscriptionStatus;
    renewal?: number;
    coupledAccount?: {
        accountId: string,
        name: string
    }
}

export type SubscriptionOverview = {
    tokenAmount: number,
    subscriptions: Subscription[]
}

export const SubscriptionService = new (class {
    getCustomerSession(userToken: string): Promise<CustomerSession> {
        return AxiosService.getAuth(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/getCustomerSecret`, userToken)
    }

    getSubscriptions(userToken: string): Promise<SubscriptionOverview> {
        return AxiosService.getAuth(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/subscriptions`, userToken)
    }

    cancel(userToken: string, subscriptionId: string): Promise<void> {
        return AxiosService.getAuth(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/subscription/cancel`, userToken, {
            subscriptionId: subscriptionId
        })
    }

    resume(userToken: string, subscriptionId: string): Promise<void> {
        return AxiosService.getAuth(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/subscription/resume`, userToken, {
            subscriptionId: subscriptionId
        })
    }
})()
