import { AuthContext, SharedProps, usePromiseFunctionalLoader } from "@surveying-hub-bv/fe-component-library";
import { LayoutComponent } from "@surveying-hub-bv/fe-component-library/dist/layout/Layout";
import { ExtendedAuthContext, nonLoading } from "../../AuthProvider";
import { useContext } from "react";
import { AdminService } from "../../services/AdminService";
import MainComponent from "./MainComponent";

export const UserManagementPage = (props: { shared: SharedProps, Component: LayoutComponent }) => {
    const isLoggedIn = nonLoading(useContext(AuthContext) as ExtendedAuthContext)
    const loader  = usePromiseFunctionalLoader(isLoggedIn, async (loggedIn) => {
        const users =await AdminService.listUsers(await loggedIn.getToken())
        return { loggedIn, users }
    });

    return <props.Component main={<MainComponent {...loader} />} sidebar={<>n</>} mobileSidebar={<>mobileSidebar</>} sidebarBg={false} />
}
