import 'leaflet/dist/leaflet.css';
import {CircleMarker, MapContainer, Popup, TileLayer, Tooltip, useMap} from 'react-leaflet';
import {useEffect, useState} from 'react';
import {MapService, MarkerConnectionStatus} from '../services/MapService';
import {Layout, SharedProps, SidebarMiniStatsCard} from '@surveying-hub-bv/fe-component-library';
import {useAuth} from '../AuthProvider';

const MapControls = () => {
    const map = useMap()
    const snapToUser = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position: any) => {
                    const latitude = position.coords.latitude
                    const longitude = position.coords.longitude
                    map.setView([latitude, longitude], 12)
                },
                () => {
                    alert('Unable to detect your location')
                }
            )
        } else {
            alert('User geolocation not supported')
        }
    }
    return <div className="flex flex-col gap-y-[22px]  fixed bottom-[25%] lg:bottom-[5%] right-[20px] z-[800]">
        <div
            className="flex items-center justify-center backdrop-blur-[2.76px] bg-[rgba(0,0,0,0.63)] rounded-full shrink-0 h-[52.992px] w-[52.992px] cursor-pointer"
        >
            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_b_1_346)">
                    <circle cx="26.4961" cy="26.4961" r="26.4961" fill="black" fill-opacity="0.63"/>
                    <circle cx="26.4961" cy="26.4961" r="26.0259" stroke="#4E4E4E" stroke-opacity="0.36" stroke-width="0.940389"/>
                </g>
                <defs>
                    <filter id="filter0_b_1_346" x="-5.52003" y="-5.52003" width="64.0322" height="64.0322" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2.76001"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_346"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1_346" result="shape"/>
                    </filter>
                </defs>
            </svg>

        </div>
        <div
            className="flex items-center justify-center backdrop-blur-[2.76px] bg-[rgba(0,0,0,0.63)] rounded-full shrink-0 h-[52.992px] w-[52.992px] cursor-pointer"
        >
            <svg width="53" height="53" viewBox="0 0 53 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_b_1_349)">
                    <circle cx="26.504" cy="26.4961" r="26.4961" fill="black" fill-opacity="0.63"/>
                    <circle cx="26.504" cy="26.4961" r="26.0259" stroke="#4E4E4E" stroke-opacity="0.36" stroke-width="0.940389"/>
                </g>
                <defs>
                    <filter id="filter0_b_1_349" x="-5.51222" y="-5.52003" width="64.0322" height="64.0322" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feGaussianBlur in="BackgroundImageFix" stdDeviation="2.76001"/>
                        <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_1_349"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_1_349" result="shape"/>
                    </filter>
                </defs>
            </svg>
        </div>
        <div
            className="flex items-center justify-center backdrop-blur-[2.76px] bg-[rgba(0,0,0,0.63)] rounded-full shrink-0 h-[52.992px] w-[52.992px] cursor-pointer"
            onClick={() => snapToUser()}>
            <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 27 27" fill="none">
                <g clipPath="url(#clip0_0_80)">
                    <path
                        d="M13.5037 23.3295L18.9685 17.8647C20.0492 16.7839 20.7852 15.4069 21.0833 13.9078C21.3814 12.4087 21.2283 10.8549 20.6434 9.44285C20.0584 8.03078 19.0679 6.82387 17.7971 5.97474C16.5262 5.1256 15.0321 4.67238 13.5037 4.67238C11.9753 4.67238 10.4812 5.1256 9.2103 5.97474C7.93944 6.82387 6.94892 8.03078 6.36398 9.44285C5.77904 10.8549 5.62595 12.4087 5.92408 13.9078C6.2222 15.4069 6.95815 16.7839 8.03886 17.8647L13.5037 23.3295ZM13.5037 26.4517L6.47779 19.4258C5.08822 18.0362 4.14192 16.2657 3.75854 14.3383C3.37517 12.4109 3.57194 10.4131 4.32398 8.59756C5.07602 6.78199 6.34955 5.2302 7.98352 4.13842C9.61749 3.04663 11.5385 2.4639 13.5037 2.4639C15.4688 2.4639 17.3899 3.04663 19.0238 4.13842C20.6578 5.2302 21.9313 6.78199 22.6834 8.59756C23.4354 10.4131 23.6322 12.4109 23.2488 14.3383C22.8655 16.2657 21.9191 18.0362 20.5296 19.4258L13.5037 26.4517V26.4517ZM13.5037 14.6079C14.0893 14.6079 14.6509 14.3752 15.065 13.9612C15.4791 13.5471 15.7117 12.9855 15.7117 12.3999C15.7117 11.8143 15.4791 11.2526 15.065 10.8386C14.6509 10.4245 14.0893 10.1919 13.5037 10.1919C12.9181 10.1919 12.3565 10.4245 11.9424 10.8386C11.5283 11.2526 11.2957 11.8143 11.2957 12.3999C11.2957 12.9855 11.5283 13.5471 11.9424 13.9612C12.3565 14.3752 12.9181 14.6079 13.5037 14.6079ZM13.5037 16.8159C12.3325 16.8159 11.2092 16.3506 10.3811 15.5225C9.55292 14.6943 9.08766 13.5711 9.08766 12.3999C9.08766 11.2287 9.55292 10.1054 10.3811 9.27726C11.2092 8.4491 12.3325 7.98384 13.5037 7.98384C14.6749 7.98384 15.7981 8.4491 16.6263 9.27726C17.4545 10.1054 17.9197 11.2287 17.9197 12.3999C17.9197 13.5711 17.4545 14.6943 16.6263 15.5225C15.7981 16.3506 14.6749 16.8159 13.5037 16.8159Z"
                        fill="url(#paint0_linear_0_80)"></path>
                </g>
                <defs>
                    <linearGradient id="paint0_linear_0_80" x1="5.20708" y1="5.97935" x2="24.6847" y2="7.24163"
                                    gradientUnits="userSpaceOnUse">
                        <stop stopColor="white"></stop>
                        <stop offset="1" stopColor="white"></stop>
                    </linearGradient>
                    <clipPath id="clip0_0_80">
                        <rect width="26.4961" height="26.4961" fill="white"
                              transform="translate(0.255676 0.255798)"></rect>
                    </clipPath>
                </defs>
            </svg>
        </div>
    </div>
}

type MarkerColor = 'red' | 'blue' | 'green';
const MarkerColorRGB: { [key in MarkerColor]: string } = {
    red: 'rgb(200, 0, 0)',
    blue: 'rgb(36, 156, 243)',
    green: 'rgb(74, 252, 45)',
};


interface Marker {
    name: string;
    pos: [number, number];
    color: MarkerColor;
    status: MarkerConnectionStatus,
}

const MarkerStatusToColor: { [status in MarkerConnectionStatus]: MarkerColor } = {
    RTKFloat: 'blue',
    RTKFixed: 'green',
    Single: 'red',
};

const MarkerStatusToName: { [status in MarkerConnectionStatus]: string } = {
    RTKFloat: 'Float',
    RTKFixed: 'Fixed',
    Single: 'Single',
};


type GeneralInfo = {
    type: 'GeneralInfo',
    total: string, online: string, fixed: string, percentage: string
}

type RoverInfo = {
    type: 'RoverInfo',
    name: string,
    stats?: {
        status: string,
        mountpoint: string,
        sat: number,
        hdop: number,
        location: { lat: number; long: number; alt: number; }
    }
}

const Sidebar = (props: { info: GeneralInfo | 'loading' | RoverInfo }) => {
    if (props.info === 'loading') return <div className="loader"/>
    else if (props.info.type === 'RoverInfo') return <>
        <div className="flex items-center gap-x-[10px]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="24"
                viewBox="0 0 23 24"
                fill="none">
                <g clipPath="url(#clip0_1_19069)">
                    <path
                        d="M11.3516 19.6369C13.3586 19.6369 15.2834 18.8396 16.7026 17.4204C18.1218 16.0012 18.9191 14.0764 18.9191 12.0693C18.9191 10.0623 18.1218 8.13744 16.7026 6.71825C15.2834 5.29905 13.3586 4.50176 11.3516 4.50176C9.34451 4.50176 7.41967 5.29905 6.00047 6.71825C4.58128 8.13744 3.78398 10.0623 3.78398 12.0693C3.78398 14.0764 4.58128 16.0012 6.00047 17.4204C7.41967 18.8396 9.34451 19.6369 11.3516 19.6369ZM11.3516 21.5288C6.12709 21.5288 1.89209 17.2938 1.89209 12.0693C1.89209 6.84487 6.12709 2.60986 11.3516 2.60986C16.576 2.60986 20.811 6.84487 20.811 12.0693C20.811 17.2938 16.576 21.5288 11.3516 21.5288ZM11.3516 13.9612C10.8498 13.9612 10.3686 13.7619 10.0138 13.4071C9.65898 13.0523 9.45966 12.5711 9.45966 12.0693C9.45966 11.5676 9.65898 11.0864 10.0138 10.7316C10.3686 10.3768 10.8498 10.1774 11.3516 10.1774C11.8533 10.1774 12.3345 10.3768 12.6893 10.7316C13.0441 11.0864 13.2434 11.5676 13.2434 12.0693C13.2434 12.5711 13.0441 13.0523 12.6893 13.4071C12.3345 13.7619 11.8533 13.9612 11.3516 13.9612Z"
                        fill="#249CF3"/>
                </g>
                <defs>
                    <clipPath id="clip0_1_19069">
                        <rect
                            width="22.7027"
                            height="22.7027"
                            fill="white"
                            transform="translate(0 0.717773)"/>
                    </clipPath>
                </defs>
            </svg>
            <p className="text-[15px] xl:text-[16px] 2xl:text-[17px] text-white uppercase">
                RTK ACCOUNT - {props.info.name}
            </p>
        </div>
        <div className="h-[1px] w-full mx-auto mt-[25px] bg-[#424242]"></div>
        <div className="mt-[25px] mb-[18px] flex justify-between items-center lg:gap-x-3 px-[10px] xl:px-[20px]">
            <p className="text-[15px] lg:text-[13px] xl:text-[15px] text-lightest-gray2">
                Status
            </p>
            <div className="flex items-center gap-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="url(#paint0_linear_1_18597)"/>
                    <defs>
                        <linearGradient
                            id="paint0_linear_1_18597"
                            x1="1.32" y1="2.34483" x2="16.9724" y2="3.5693"
                            gradientUnits="userSpaceOnUse">
                            <stop stopColor={props.info.stats ? "#4AFC2D" : "#FD0303"}/>
                            <stop stopColor={props.info.stats ? "#1EA707" : "#F31A1A"} offset="1"/>
                        </linearGradient>
                    </defs>
                </svg>
                <p className="text-[15px] lg:text-[13px] xl:text-[15px] text-white">
                    {props.info.stats ? "Online" : "Offline"}
                </p>
            </div>
        </div>

        {(props.info.stats) && <>
            <div
                className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-[10px] lg:gap-[10px] mt-[30px] mb-[15px]">
                <SidebarMiniStatsCard bg="rgba(7, 100, 167, 0.18)" title="Status" value={props.info.stats.status}/>
                <SidebarMiniStatsCard bg="rgba(167, 93, 7, 0.18)" title="Mountpoint"
                                      value={props.info.stats.mountpoint}/>
                <SidebarMiniStatsCard bg="rgba(7, 167, 100, 0.18)" title="SAT Number"
                                      value={props.info.stats.sat.toString()}/>
                <SidebarMiniStatsCard bg="rgba(	60, 60, 60, 0.18)" title="HDOP"
                                      value={props.info.stats.hdop.toString()}/>
            </div>
            <div className="mb-[30px]">
                <p className="ml-2 text-white lg:text-light-gray text-[15px] lg:text-[14px] mb-[10px]">
                    Location
                </p>
                <div
                    className="bg-[#0764a72e] px-[5px] lg:px-[10px] 2xl:px-[20px] py-[12px] flex lg:flex-col gap-y-[10px] gap-x-[8px] xl:flex-row justify-between items-center">
                    <div className="text-center w-[33%] lg:w-[100%] xl:w-[33%]">
                        <p className="text-[12px] lg:text-[13px] xl:text-[13px] text-white whitespace-nowrap">
                            {props.info.stats.location.lat}
                        </p>
                        <p className="text-[12px] text-[#898989]">
                            ± 0.001 m
                        </p>
                        <p className="text-[12px] text-[#D7D7D7]">
                            Latitude
                        </p>
                    </div>
                    <div className="text-center w-[33%] lg:w-[100%] xl:w-[33%]">
                        <p className="text-[12px] lg:text-[13px] xl:text-[13px] text-white whitespace-nowrap">
                            {props.info.stats.location.long}
                        </p>
                        <p className="text-[12px] text-[#898989]">
                            ± 0.001 m
                        </p>
                        <p className="text-[12px] text-[#D7D7D7]">
                            Longitude
                        </p>
                    </div>
                    <div className="text-center w-[33%] lg:w-[100%] xl:w-[33%]">
                        <p className="text-[12px] lg:text-[13px] xl:text-[13px] text-white whitespace-nowrap">
                            {props.info.stats.location.alt}
                        </p>
                        <p className="text-[12px] text-[#898989]">
                            ± 0.001 m
                        </p>
                        <p className="text-[12px] text-[#D7D7D7]">
                            Altitude
                        </p>
                    </div>
                </div>
            </div>
        </>}
    </>

    else return <div
            className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-[10px] lg:gap-[10px] mt-[30px] mb-[15px]">
            <SidebarMiniStatsCard bg="rgba(7, 100, 167, 0.18)" title="Total Users" value={props.info.total}/>
            <SidebarMiniStatsCard bg="rgba(167, 93, 7, 0.18)" title="Users Online" value={props.info.online}/>
            <SidebarMiniStatsCard bg="rgba(7, 167, 100, 0.18)" title="Total Fixed" value={props.info.fixed}/>
            <SidebarMiniStatsCard bg="rgba(	60, 60, 60, 0.18)" title="% Online" value={props.info.percentage}/>
        </div>
}

export const MapPage = (props: { shared: SharedProps }) => {
    const {isLoggedIn} = useAuth()
    const [markers, setMarkers] = useState<(Marker & RoverInfo)[]>([]);
    const [info, setInfo] = useState<'loading' | GeneralInfo>('loading');
    const [selected, setSelected] = useState<string | undefined>()

    useEffect(() => {
        const fetchCoordinates = async () => {
            if (isLoggedIn === undefined || isLoggedIn === 'loading') {
                return
            }
            try {
                const token = await isLoggedIn.getIdToken();
                const data = await MapService.getMarkers(token);
                setMarkers(data.markers.map(marker => ({
                    name: marker.name,
                    pos: [marker.location.lat, marker.location.long],
                    type: 'RoverInfo',
                    status: marker.connectionStatus,
                    color: MarkerStatusToColor[marker.connectionStatus],
                    stats: {
                        status: marker.connectionStatus,
                        mountpoint: marker.mountpoint,
                        sat: marker.sat,
                        hdop: marker.hdop,
                        location: marker.location
                    }
                })));
                setInfo({
                    type: 'GeneralInfo',
                    total: data.total.toString(),
                    online: data.online.toString(),
                    fixed: data.fixed.toString(),
                    percentage: data.percentage.toFixed(2) + "%"
                })
            } catch (error) {
                console.error("Error fetching coordinates:", error);
            }
        };

        fetchCoordinates();
        const interval = setInterval(fetchCoordinates, 5000);
        return () => clearInterval(interval);
    }, [isLoggedIn]);

    const markerSelected = selected && (markers.find(marker => marker.name === selected) || {
        type: 'RoverInfo',
        name: selected
    })

    return <Layout
        sidebarBg={false} shared={props.shared} sidebar={<Sidebar info={markerSelected || info}/>}
        mobileSidebar={<>main mobileSidebar</>}
        main={<MapContainer
            center={[25, 10]}
            zoom={window.innerWidth <= 768 ? 3 : 2}
            minZoom={2}
            maxZoom={18} //Limit = 18
            style={{width: '100%', height: '100%'}}
            zoomControl={false}
            attributionControl={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            <MapControls/>
            {markers.map((el, index) => <CircleMarker
                key={index}
                center={el.pos}
                radius={5}
                eventHandlers={{
                    click: () => {
                        setSelected(el.name)
                    }, popupclose: () => {
                        setSelected(undefined)
                    }
                }}
                pathOptions={{
                    color: MarkerColorRGB[el.color],
                    fill: true,
                }}>
                <Tooltip direction="bottom" offset={[0, 20]} opacity={1} permanent className=" r5">
                    <div className="m-[12px] flex items-center justify-between uppercase text-[16px]">
                        <p className="flex items-center justify-center gap-x-[5px]">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                 viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M10.3516 17.6369C12.3586 17.6369 14.2834 16.8396 15.7026 15.4204C17.1218 14.0012 17.9191 12.0764 17.9191 10.0693C17.9191 8.06228 17.1218 6.13744 15.7026 4.71825C14.2834 3.29905 12.3586 2.50176 10.3516 2.50176C8.34451 2.50176 6.41967 3.29905 5.00047 4.71825C3.58128 6.13744 2.78398 8.06228 2.78398 10.0693C2.78398 12.0764 3.58128 14.0012 5.00047 15.4204C6.41967 16.8396 8.34451 17.6369 10.3516 17.6369ZM10.3516 19.5288C5.12709 19.5288 0.89209 15.2938 0.89209 10.0693C0.89209 4.84487 5.12709 0.609863 10.3516 0.609863C15.576 0.609863 19.811 4.84487 19.811 10.0693C19.811 15.2938 15.576 19.5288 10.3516 19.5288ZM10.3516 11.9612C9.84979 11.9612 9.36858 11.7619 9.01378 11.4071C8.65898 11.0523 8.45966 10.5711 8.45966 10.0693C8.45966 9.56757 8.65898 9.08636 9.01378 8.73156C9.36858 8.37676 9.84979 8.17743 10.3516 8.17743C10.8533 8.17743 11.3345 8.37676 11.6893 8.73156C12.0441 9.08636 12.2434 9.56757 12.2434 10.0693C12.2434 10.5711 12.0441 11.0523 11.6893 11.4071C11.3345 11.7619 10.8533 11.9612 10.3516 11.9612Z"
                                    fill="#249CF3"></path>
                            </svg>
                            {el.name}
                        </p>
                        <span
                            style={{color: MarkerColorRGB[MarkerStatusToColor[el.status]]}}>{MarkerStatusToName[el.status]}</span>
                    </div>
                    <Popup></Popup> {/*Tover popup om naar cicle image ding*/}
                </Tooltip>
            </CircleMarker>)}
        </MapContainer>}
        fullScreen/>
}
