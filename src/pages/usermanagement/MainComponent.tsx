import { Loader, PromiseLoader, useModal } from "@surveying-hub-bv/fe-component-library";
import { User } from "../../services/AdminService";
import { ManageUser } from "./Dialogs";
import { ExtendedAuthContextInterface } from "../../AuthProvider";

type MainComponentProps = {
    loader: Loader<{ loggedIn: ExtendedAuthContextInterface, users: User[] }, unknown>

    getData: (reload?: boolean) => void;
}
const MainComponent = (props: MainComponentProps) => {
    const modal = useModal()
    return <PromiseLoader loading={<>loading</>} loader={props.loader} error={<>error</>} loaded={(da) =>
        <table className="w-full border-separate border-spacing-y-2 px-[20px] xl:px-[30px] ">
            <thead>
                <tr>
                    <td className="text-[14px] lg:text-[15px] ntrip-account-table-header text-[rgba(255,255,255,0.39)] px-[20px] py-[15px]">
                        User email
                    </td>
                    <td className="text-[14px] lg:text-[15px] ntrip-account-table-header text-[rgba(255,255,255,0.39)] px-[20px] py-[15px]">
                        Amount of Subscriptions
                    </td>
                    <td className="text-[14px] lg:text-[15px] ntrip-account-table-header text-[rgba(255,255,255,0.39)] px-[20px] py-[15px]">
                        Amount of Accounts
                    </td>
                    <td className="text-[14px] lg:text-[15px] ntrip-account-table-header text-[rgba(255,255,255,0.39)] px-[20px] py-[15px]">
                        Action
                    </td>
                </tr>
            </thead>
            <tbody>
                {da.users.map((user, id) =>
                    <tr key={id} className="odd:bg-[rgba(52,52,52,0.22)]">
                        <td className="text-[14px] text-white p-[9px] pl-[20px]">
                            {user.email}
                        </td>
                        <td className="text-[14px] text-white p-[9px] pl-[20px]">
                            {user.amountSubscriptions}
                        </td>
                        <td className="text-[14px] text-white p-[9px] pl-[20px]">
                            {user.amountFreeSubscriptions}
                        </td>
                        <td className="text-[14px] text-white p-[9px] pl-[20px]">
                            <button onClick={() => modal.showModal(<ManageUser loggedIn={da.loggedIn} id={user.id} email={user.email} modal={modal} onClose={props.getData}/>,  props.getData)} className="gradient-text">Manage</button>
                        </td>
                    </tr>
                )}

            </tbody>
        </table>
    } />
};

export default MainComponent;
