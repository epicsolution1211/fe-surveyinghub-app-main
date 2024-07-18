import { AuthContext, Button, useModal } from "@surveying-hub-bv/fe-component-library";
import { useContext, useState } from "react";
import { NtripResponse, SourceService } from "../../services/SourceService";
import { ExtendedAuthContext } from "../../AuthProvider";

type ShowModalProps = {
    token: string
}

const AddNewSourceModal = ({ token }: ShowModalProps) => {
    const modal = useModal()
    const [address, setAddress] = useState("ntrip.gnss.nl")
    const [port, setPort] = useState("2101")
    return <>
        <h2>Add new Source</h2>

        <div className="bg-[rgba(7,100,167,0.18)] p-20 rounded-[24px] flex items-center flex-col gap-5">
            <p>Create a new RTK Feed</p>
            <input autoComplete="off" placeholder="Enter CORS URL or IP Address name" type="text" name="accountName"
                className="w-full border border-[#414141] rounded-[20px] px-[20px] py-[20px]" value={address}
                onChange={(e) => setAddress(e.target.value)} />
            <input autoComplete="off" placeholder="Enter port number" type="text" name="accountName"
                className="w-full border border-[#414141] rounded-[20px] px-[20px] py-[20px]" value={port}
                onChange={(e) => setPort(e.target.value)} />
            <Button label="Check Connections" onClick={() => {
                let shouldOpen = true
                const response = SourceService.getSource(token, address, port)
                response.then((response) => {
                    if (shouldOpen) modal.showModal(<ConnectionSuccessfullModal token={token} ntripResponse={response} />)
                }).catch((error) => {
                    if (shouldOpen) modal.showModal(<ConnectionFailedModal token={token} />)
                })
                modal.showModal(<SearchingNetworkModal token={token} />, () => { shouldOpen = false })
            }
            }></Button>
        </div >
    </>;
}


const SearchingNetworkModal = ({ token }: ShowModalProps) => {
    const modal = useModal()
    return <>
        <h2>Searching for RTK Network</h2>

        <p>This will take a seconds, If nothing happening then
            stop and try again</p>

        <Button label="Stop" type="dangerous" onClick={modal.hideModal}></Button>
    </>;
}


const ConnectionFailedModal = ({ token }: ShowModalProps) => {
    const modal = useModal()
    return <>
        <h2>Connection failed</h2>

        <p>We couldn’t establish a connection. Please make sure you</p>
        <ol>
            <li>are using a working RTK network</li>
            <li>entered the correct IP or DNS</li>
            <li>entered the Correct port</li>
            <li>check for spelling mistakes</li>
        </ol>

        <Button label="Search Again" type="secondary" onClick={() => modal.showModal(<AddNewSourceModal token={token} />)}></Button>
    </>;
}

const ConnectionSuccessfullModal = ({ token, ntripResponse }: ShowModalProps & { ntripResponse: NtripResponse }) => {
    const modal = useModal()
    return <>
        <h2>Connection successful</h2>

        <p>Congratulations! Your We have found your RTK network!</p>

        <Button label="Setup Network" type='secondary' onClick={() => modal.showModal(<ConfigureModal token={token} ntripResponse={ntripResponse} />)}></Button>
    </>;
}

const ConfigureModal = ({ token, ntripResponse }: ShowModalProps & { ntripResponse: NtripResponse }) => {
    const modal = useModal()
    const [lines, setLines] = useState(ntripResponse.sourceTableResponse.lines);

    const handleInputChange = (index:number, value:string) => {
        const updatedLines = lines.map((line, i) => (
            i === index ? { ...line, ggaValues: { ...line.ggaValues, relayMountpoint: value } } : line
        ));
        setLines(updatedLines);
    };

    const handleConfirm = () => {
        // Update ntripResponse with modified lines
        const updatedNtripResponse = { ...ntripResponse, sourceTableResponse: { ...ntripResponse.sourceTableResponse, lines } };
        // Send updatedNtripResponse back to the server or handle it as needed
        console.log(updatedNtripResponse); // Replace with your actual send logic
        SourceService.createSource(token, updatedNtripResponse)
        modal.showModal(<SearchingNetworkModal token={token} />);
    };

    return <>
        <h2>Configure your new RTK Feed</h2>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
            <div className="contents">
                <dt className="font-semibold">DNS:</dt>
                <dd className="ml-2">{ntripResponse.networkEndpoint.dns || "Not available"}</dd>
            </div>
            <div className="contents">
                <dt className="font-semibold">IP:</dt>
                <dd className="ml-2">{ntripResponse.networkEndpoint.ip}</dd>
            </div>
            <div className="contents">
                <dt className="font-semibold">Port:</dt>
                <dd className="ml-2">{ntripResponse.networkEndpoint.port}</dd>
            </div>
        </dl>
        <table>
            <thead>
                <tr>
                    <th>Source Mountpoint</th>
                    <th>Relay Mountpoint</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {ntripResponse.sourceTableResponse.lines.map((sourceTableLine, index) => <tr>
                    <td title={sourceTableLine.originalGGA}>{sourceTableLine.ggaValues.mountpoint}</td>
                    <td><Editable initialValue={sourceTableLine.ggaValues.mountpoint} onChange={(value) => handleInputChange(index, value)} /></td>
                    <td>Remove</td>
                </tr>
                )}
            </tbody>
        </table>
        <Button label="Confirm" onClick={() =>{ handleConfirm()}}></Button>
        <Button label="Back" onClick={() => modal.hideModal()}></Button>
    </>;
}

const MainComponent = () => {
    const modal = useModal()
    const isLoggedIn = useContext(AuthContext) as ExtendedAuthContext

    return <>
        <h2 className="text-[24px] font-semibold">Connect your CORS</h2>
        <h2 className="text-[24px] font-semibold gradient-text">Create an RTK Feed!</h2>
        <p className="lg:max-w-[25%] my-5 text-justify [text-align-last:center] text-white text-opacity-80">Route and rebrand your current cors network and better manage your NTRIP accounts between your customers or inside your business</p>
        <Button label="Create a Feed" onClick={async () => {
            if (isLoggedIn === 'loading' || isLoggedIn === undefined) {
                alert("No user")
                return
            }

            const token = await isLoggedIn.getToken()
            modal.showModal(<AddNewSourceModal token={token} />)
        }} />
        <p className="lg:max-w-[25%] my-5 text-justify [text-align-last:center] text-white text-opacity-60 text-[14px]">Note: You are “rebranding” an existing CORS network, make sure you have permission from the RTK network to do this! </p>

    </>;
    //</div>;
};

export default MainComponent;


type EditableProps = {
    initialValue: string;
    onChange: (value: string) => void;
}
const Editable = ({ initialValue, onChange }: EditableProps) => {
    const [editing, setEditing] = useState(false);
    const [value , setValue] = useState(initialValue);

    return !editing ? <>{initialValue} <button onClick={()=>setEditing(true)}>
        <svg fill="none" height="16" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
    </button></>:<>    <input
                                type="text"
                                value={value}
                                onChange={(e) => {setValue(e.target.value) ;onChange( e.target.value)}}
                            /></>
    
}
