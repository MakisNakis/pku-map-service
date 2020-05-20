import React, {Component} from 'react';
import {Map as LeafletMap, Marker, Popup, TileLayer, LayersControl, LayerGroup, FeatureGroup, Circle} from "react-leaflet";
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import {Icon} from "leaflet";
import * as pkuData from "../data/tRouteTrackPointsKarabash.json"
import * as pkuDataUfa from "../data/tRouteTrackPointsUfa.json"
// import {LayerGroup} from "leaflet/dist/leaflet-src.esm";

console.log(pkuData);

const pkuMarkerIcon = new Icon({
    iconUrl: '/markers/greenM.png',
    iconSize: [30, 50],
    shadowSize: [15, 15],
    iconAnchor: [15, 50],
    popupAnchor: [0, 0]
});

const pkuMarkerIcon2 = new Icon({
    iconUrl: '/markers/redM.png',
    iconSize: [30, 50],
    shadowSize: [15, 15],
    iconAnchor: [15, 50],
    popupAnchor: [0, 0]
});

export default function MapComponent() {

    const [activePku, setActivePku] = React.useState(null);

    return (

        <LeafletMap center={[54.730922, 55.962198]} zoom={7}>
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Схема">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Гибрид" >
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                </LayersControl.BaseLayer>
                <LayersControl.Overlay checked name="Уфа">
                    <LayerGroup name = "pkuMarkersUfa" >
                    {pkuDataUfa.pkuInfo.map(pku =>
                        <Marker key={pku.Id} position={ // строит маркеры на карте
                            [pku.Latitude, pku.Longitude]
                        }
                                onClick={() => {
                                    setActivePku(pku); // переводит в состояние активного ПКУ, описание которого ниже
                                }
                                }
                                icon={pkuMarkerIcon}
                        />)
                    };

                    {activePku && <Popup
                        position={ // строит маркеры на карте
                            [activePku.Latitude, activePku.Longitude]
                        }
                        onClose={() => {
                            setActivePku(null);
                        }}
                    >

                        <div>
                            <h2>{activePku.City}</h2>
                            <h3>Зона обслуживания УС: {activePku.Zone}</h3>

                        </div>
                    </Popup>}
                    </LayerGroup>
                </LayersControl.Overlay>

            <LayersControl.Overlay checked name = "Карабаш">
                    <LayerGroup name = "pkuMarkersKarabash" >
                        {pkuData.pkuInfo.map(pku =>
                            <Marker key={pku.ID} position={ // строит маркеры на карте
                                [pku.Latitude, pku.Longitude]
                            }
                                    onClick={() => {
                                        setActivePku(pku); // переводит в состояние активного ПКУ, описание которого ниже
                                    }
                                    }
                                    icon={pkuMarkerIcon2}
                            />)
                        };

                        {activePku && <Popup
                            position={ // строит маркеры на карте
                                [activePku.Latitude, activePku.Longitude]
                            }
                            onClose={() => {
                                setActivePku(null);
                            }}
                        >

                            <div>
                                <h2>{activePku.RouteId}</h2>
                                <h3>Зона обслуживания УС: {activePku.Area}</h3>

                            </div>
                        </Popup>}
                    </LayerGroup>
                </LayersControl.Overlay>

                <LayersControl.Overlay name="Области городов">
                    <FeatureGroup color="purple">
                        <Popup>
                            <span>Popup in FeatureGroup</span>
                        </Popup>
                        <Circle center={[54.730922, 55.962198]} radius={20000} />
                    </FeatureGroup>
                </LayersControl.Overlay>
            </LayersControl>

        </LeafletMap>
    )

}

// export default MapComponent;