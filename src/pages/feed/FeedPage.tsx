import { SharedProps } from "@surveying-hub-bv/fe-component-library";
import { LayoutComponent } from "@surveying-hub-bv/fe-component-library/dist/layout/Layout";
import MainComponent from "./MainComponent";
import Sidebar from "./Sidebar";


export const FeedPage = (props: { shared: SharedProps, Component: LayoutComponent }) => {
    return <props.Component main={<MainComponent/>} sidebar={<Sidebar/>} mobileSidebar={<>mobileSidebar</>} sidebarBg={false} />
}
