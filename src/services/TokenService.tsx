import { AxiosService } from "./AxiosService";


export const TokenService = new (class {
    activateTokens(userToken: string, accountId: string, network: string, days: number): Promise<void> {
        return AxiosService.postAuth(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/tokens`, userToken, {
            accountId: accountId,
            network: network,
            days: days,
        })
    }

    tokenCost = (process.env.REACT_APP_TOKENAMOUNT_PER_DAY && parseInt(process.env.REACT_APP_TOKENAMOUNT_PER_DAY)) || 290
})()
