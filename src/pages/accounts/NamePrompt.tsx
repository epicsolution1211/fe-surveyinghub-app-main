import { Button, useModal } from "@surveying-hub-bv/fe-component-library";
import { useState } from "react";

const NamePrompt = (props: {
    text: string,
    initialValue?: string,
    action: (name?: string) => Promise<void>,
    buttonName: string,
    onClose: () => void
}) => {
    const { showModal, hideModal } = useModal()
    const [accountName, setAccountName] = useState(props.initialValue || '');
    return <div className="py-6 lg:py-[25px]">

        <p className="mb-6 lg:mb-8 text-center text-[14px] lg:text-[16px] xl:text-[18px]">
            {props.text}
        </p>

        <input autoComplete="off" placeholder="Enter a name" type="text" name="accountName" maxLength={15}
            className="w-full border border-[#414141] rounded-[20px] px-[20px] py-[20px]" value={accountName}
            onChange={(e) => setAccountName(e.target.value)} />

        <div className="flex justify-center items-center gap-x-4 mt-3 lg:mt-[20px] xl:mt-[25px] ">
            <Button label={props.buttonName} onClick={() => {
                showModal("loading");

                props.action(accountName.trim() ? accountName : undefined)
                    .then(() => {
                        hideModal();
                        props.onClose();
                    });
            }} />
            <Button label={"Cancel"} type="secondary" onClick={() => {
                hideModal();
            }} />
        </div>
    </div>
}

export default NamePrompt;