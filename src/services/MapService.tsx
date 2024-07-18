import {AxiosService} from './AxiosService';

export type MarkerConnectionStatus = "RTKFixed" | "RTKFloat"| "Single";
type MapInfo = {
    total: number;
    online: number;
    fixed: number;
    percentage: number;
    markers: MapMarker[];
}
type MapMarker = {
    name: string;
    connectionStatus: MarkerConnectionStatus;
    mountpoint: string;
    sat: number;
    hdop: number;
    location: {
        lat: number;
        long: number;
        alt: number;
    }
}

export const MapService = new (class {
    getMarkers(userToken: string): Promise<MapInfo> {
        return AxiosService.getAuth(`${process.env.REACT_APP_MIDDLEWARE_ENDPOINT}/markers`, userToken)
    }
})()
