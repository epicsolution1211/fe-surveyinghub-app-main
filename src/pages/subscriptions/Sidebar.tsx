import { BarsSVG, Button, ICircleSVG, Loader, SidebarMiniStatsCard, rtkSendIcon, rtkGroupIcon, useModal } from "@surveying-hub-bv/fe-component-library"
import {  ExtendedAuthContextInterface, NonLoadingExtendedAuthContext } from "../../AuthProvider";
import { openTokenTable } from "../accounts/Sidebar";
import { SubscriptionOverview } from "../../services/SubscriptionService";

type SidebarProps = {
    isLoggedIn: NonLoadingExtendedAuthContext,
    openPriceSelection: (user: { uid: string, getToken: () => Promise<string> }) => void,   
    loader:Loader<{
        loggedIn: ExtendedAuthContextInterface;
        subscriptionOverview: SubscriptionOverview;
    }, unknown>
}

const Sidebar = ({ isLoggedIn, openPriceSelection, loader }: SidebarProps) => {
    const { showModal } = useModal()

    function openTokenTableModal() {
        openTokenTable(isLoggedIn, showModal)
    }


    return <div className="flex flex-col gap-8 ">
        {isLoggedIn &&
            <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-[10px] lg:gap-[10px] mt-[30px] mb-[15px]">
                <SidebarMiniStatsCard bg="rgba(7, 100, 167, 0.18)" title="Total Subscriptions" value={loader.map("...", "x", (response) => response.subscriptionOverview.subscriptions.length.toString())} />
                <SidebarMiniStatsCard bg="rgba(7, 100, 167, 0.18)" title="Credits Balance" value={loader.map("...", "x", (response) => response.subscriptionOverview.tokenAmount.toString())} />
                <Button label="Add Subscription" padding="big" onClick={() => openPriceSelection(isLoggedIn)} />
                <Button label="Buy Credits" padding="big" type="secondary" onClick={openTokenTableModal} />
            </div>}

        <div className="flex flex-col items-center rounded-[7px] bg-[rgba(7,100,167,0.18)] p-8">
            <div className="px-10 flex flex-col items-center">
                <p className="font-semibold text-[18px]">
                    <i className="bg-[#343434] bg-opacity-40 rounded-[11px] h-[40px] w-[40px] inline-flex justify-center items-center align-middle p-1.5 mr-4"><BarsSVG /></i>
                    Need <span className="gradient-text"> RTK </span> for 1 day?</p>
                <p className="flex items-center mr-auto my-[13px]">
                    <img className="w-[58px] h-[58px] cxl:w-[40px] cxl:h-[40px] mr-[29px] clg1450:mr-0" src={rtkGroupIcon} alt="icon" />
                    <img className="cxl:w-[70px] cxl:h-[79px]" src={rtkSendIcon} alt="icon" />
                </p>
                <p className="text-[16px] mb-6 text-center"> Activate your <span className="gradient-text">NTRIP Account</span> with Credits!</p>
                <Button label="Buy Credits" padding="default" onClick={openTokenTableModal}/>
            </div>

            <div className="w-full flex flex-col gap-2 mt-6 text-[14px]">
                <p className="align-middle text-gray-400"> <i className="inline-block h-[20px] w-[20px] mr-2"><ICircleSVG /></i> Activate an NTRIP account with Credits</p>
                <p className="align-middle text-gray-400"> <i className="inline-block h-[20px] w-[20px] mr-2"><ICircleSVG /></i> Credits can be used at any time</p>
                <p className="align-middle text-gray-400"> <i className="inline-block h-[20px] w-[20px] mr-2"><ICircleSVG /></i> Credits never expire</p>
                <p className="align-middle text-gray-400"> <i className="inline-block h-[20px] w-[20px] mr-2"><ICircleSVG /></i> You can activate multiple days in a row</p>
            </div>
        </div>
    </div>
}

export default Sidebar;
