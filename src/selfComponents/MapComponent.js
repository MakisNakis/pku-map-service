import React, {Component} from 'react';
import {Map as LeafletMap, Marker, Popup, TileLayer} from "react-leaflet";
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import {Icon} from "leaflet";
import * as pkuData from "../data/tRouteTrackPointsKarabash.json"

console.log(pkuData);

export default function MapComponent() {

    const [activePku, setActivePku] = React.useState(null);

    return (

        <LeafletMap center={[54.730922, 55.962198]} zoom={12}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />

            {pkuData.pkuInfo.map(pku =>
                <Marker key={pku.ID} position={ // строит маркеры на карте
                    [pku.Latitude, pku.Longitude]
                }
                        onClick={() => {
                            setActivePku(pku); // переводит в состояние активного ПКУ, описание которого ниже
                        }
                        }

                />)
            };

            {activePku && <Popup
                position={ // строит маркеры на карте
                    [activePku.Latitude, activePku.Longitude]
                }
                onClose={() =>{
                    setActivePku(null);
                }}
            >

                <div>
                    <h2>Маршрут: {activePku.RouteID}</h2>
                    <p>{activePku.Area}</p>

                </div>
            </Popup>}

        </LeafletMap>
    )

}

// export default MapComponent;