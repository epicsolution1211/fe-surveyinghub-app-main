import { Button, ModalContextProps } from "@surveying-hub-bv/fe-component-library"
import { ExtendedAuthContextInterface } from "../../AuthProvider"
import { AdminService } from "../../services/AdminService"

type ManageUserProps = {
    id: string,
    email: string,
    loggedIn: ExtendedAuthContextInterface,
    modal: ModalContextProps,
    onClose: () => void
}
export const ManageUser = ({ id, email, loggedIn, modal, onClose }: ManageUserProps) => <>
    <p>Managing account: "{email}"</p>
    <Button label="Add Free account" onClick={async () => AdminService.awardFreeSubscription(await loggedIn.getToken(), id).then(() => modal.showModal(<FreeAccountSuccess onClose={onClose} email={email} modal={modal} />))} />
    <Button label="Close" type="secondary" onClick={async () => modal.hideModal()} />
</>

type FreeAccountSuccessProps = {
    email: string,
    modal: ModalContextProps,
    onClose: () => void
}
export const FreeAccountSuccess = ({ email, modal, onClose }: FreeAccountSuccessProps) => <>
    <p>Successfully added a free account to: "{email}".</p>
    <Button label="Close" type="secondary" onClick={async () => modal.hideModal()} />
</>
