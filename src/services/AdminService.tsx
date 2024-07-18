import { AxiosService } from "./AxiosService";

export type User = {
    id: string;
    email: string;
    amountSubscriptions:number;
    amountFreeSubscriptions:number;
}

export const AdminService = new (class {
    isAdmin(userToken: string): Promise<void> {
        return AxiosService.getAuth(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/isAdmin`, userToken)
    }

    listUsers(userToken: string): Promise<User[]> {
        return AxiosService.getAuth(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/users`, userToken)
    }
    
    awardFreeSubscription(userToken: string, id:string): Promise<void> {
        return AxiosService.postAuth(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/awardFreeSubscription`, userToken,{
            id
        })
    }
})()
