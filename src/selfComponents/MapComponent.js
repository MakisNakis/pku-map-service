import React, {Component} from 'react';
import {Map as LeafletMap, Marker, Popup, TileLayer, LayersControl, LayerGroup, FeatureGroup, Circle} from "react-leaflet";
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import {Icon} from "leaflet";
import * as pkuData from "../data/tRouteTrackPointsKarabash.json"
// import {LayerGroup} from "leaflet/dist/leaflet-src.esm";

console.log(pkuData);

const pkuMarkerIcon = new Icon({
    iconUrl: '/markers/greenM.png',
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
                <LayersControl.Overlay checked name="Объекты">
                    <LayerGroup name = "pkuMarkers" >
                    {pkuData.pkuInfo.map(pku =>
                        <Marker key={pku.ID} position={ // строит маркеры на карте
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
                            <h2>Маршрут: {activePku.RouteID}</h2>
                            <p>{activePku.Area}</p>

                        </div>
                    </Popup>}
                    </LayerGroup>
                </LayersControl.Overlay>
                <LayersControl.Overlay name="Feature group">
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