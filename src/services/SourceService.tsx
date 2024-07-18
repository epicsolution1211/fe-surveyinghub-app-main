import { AxiosService } from "./AxiosService";

export type NtripResponse = {
    networkEndpoint: NetworkEndpoint;
    sourceTableResponse: SourceTableResponse;
}

export type NetworkEndpoint = {
    dns?: string;
    ip: string;
    port: number;
}

export type SourceTableResponse = {
    protocol: string;
    status: number;
    statusText: string;
    headers: string[];
    lines: SourceTableLine[];
}

export type SourceTableLine = {
    originalGGA: string;
    ggaValues: SourceTableGGA;
}

export type SourceTableGGA = {
    type: string;
    mountpoint: string;
    identifier: string;
    format: string;
    formatDetail: string;
    carrier: number;
    navSystem: string;
    network: string;
    country: string;
    latitude: number;
    longitude: number;
    nmea: number;
    solution: number;
    generator: string;
    comprEncrypt: string;
    authentication: string;
    fee: string;
    bitrate: string;
    relayMountpoint:string;
}


export const SourceService = new (class {
    getSource(userToken: string, address: string, port: string): Promise<NtripResponse> {
        return AxiosService.getAuth(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/sources`, userToken, {
            address: address,
            port: port
        })
    }

    createSource(userToken: string, body: NtripResponse): Promise<NtripResponse> {
        return AxiosService.postAuth(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/sources`, userToken, undefined, body)
    }
})()
