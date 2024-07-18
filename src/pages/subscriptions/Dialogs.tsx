import { Button, useModal } from "@surveying-hub-bv/fe-component-library";


const Loading = (props: {
    text: string,
    onClose?: () => void
}) => {
    const { hideModal } = useModal()
    return <div className="py-6 lg:py-[25px]">
        <p className="mb-6 lg:mb-8 text-center text-[14px] lg:text-[16px] xl:text-[18px]">
            {props.text}
        </p>
        <div className="flex justify-center items-center gap-x-4 mt-3 lg:mt-[20px] xl:mt-[25px]">
            <Button label={"Close"} type="secondary" onClick={() => {
                hideModal();
                props.onClose && props.onClose();
            }} />
        </div>
    </div>
}

export const Confirmation = (props: {
    text: string,
    additionalText?: string,
    loadingText: string,
    confirmAction: () => Promise<void>,
    onClose?: () => void
}) => {
    const { showModal, hideModal } = useModal()
    return <div className="py-6 lg:py-[25px]">

        <p className="mb-6 lg:mb-8 text-center text-[14px] lg:text-[16px] xl:text-[18px]">
            {props.text}
        </p>

        {props.additionalText && <div className="text-center text-[10px] lg:text-[12px] xl:text-[14px]">
            {props.additionalText}
        </div>}

        <div className="flex justify-center items-center gap-x-4 mt-3 lg:mt-[20px] xl:mt-[25px]">
            <Button label={"Confirm"} onClick={() => {
                showModal(<Loading text={props.loadingText} onClose={props.onClose} />);
                props.confirmAction().then(() => {
                    hideModal();
                    props.onClose && props.onClose();
                });

            }} /><Button label={"Cancel"} type="secondary" onClick={() => {
                hideModal();
                props.onClose && props.onClose();
            }} />
        </div>
    </div>
}

