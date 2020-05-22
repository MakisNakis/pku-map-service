import React, {Component} from 'react';
import {
    Map as LeafletMap,
    Marker,
    Popup,
    TileLayer,
    LayersControl,
    LayerGroup,
    FeatureGroup,
    Circle
} from "react-leaflet";
// import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
// import 'leaflet-defaulticon-compatibility';

import {Icon} from "leaflet";
import * as pkuDataKarabash from "../data/tRouteTrackPointsKarabash.json"
import * as pkuDataUfa from "../data/tRouteTrackPointsUfa.json"
// import {LayerGroup} from "leaflet/dist/leaflet-src.esm";
import {render} from 'react-dom'

// console.log(pkuData);


class MapComponent extends React.Component {



    constructor() {
        super();
        this.state = {
            zoom: 3,
            radius: 0,
        };

        this.pkuMarkerIcon = {
            iconUrl: '/markers/rgM.png',
            iconSize: [30, 50],
            shadowSize: [15, 15],
            iconAnchor: [15, 50],
            popupAnchor: [0, 0]
        }

    }

    setMarkerIcon(routeId) {
        switch (routeId) {
            case 1:
                this.pkuMarkerIcon.iconUrl = '/markers/redM.png';
                break;
            case 2:
                this.pkuMarkerIcon.iconUrl = '/markers/greenM.png';
                break;
            case 3:
                this.pkuMarkerIcon.iconUrl = '/markers/blueM.png';
                break;
            default:
                break;
        }
        return new Icon(this.pkuMarkerIcon)
    }


    renderMarkersLayer(pkuData) {
        var result = [];
        for (var i = 0; i < pkuData.default.pkuInfo.length; i++) {
            result.push(
                <Marker key={i} position={[pkuData.default.pkuInfo[i].Latitude, pkuData.default.pkuInfo[i].Longitude]}
                        icon={this.setMarkerIcon(pkuData.default.pkuInfo[i].RouteID)}
                >
                    <Popup>
                        <div>
                            <h2>{pkuData.default.pkuInfo[i].City}</h2>
                            <h3>Зона обслуживания УС: {pkuData.default.pkuInfo[i].Zone}</h3>
                        </div>
                    </Popup>
                </Marker>
            );
        }
        return result;
    }

    // renderSecond() {
    //     return <MyLayer latlng={[1, 10]} radius={this.state.radius}/>
    // }

    render() {
        return (
            <div>
                <LeafletMap center={[54.730922, 55.962198]} zoom={this.state.zoom}>
                    <LayersControl position='topright'>

                        <LayersControl.BaseLayer checked name="Гибрид">
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                        </LayersControl.BaseLayer>

                        <LayersControl.Overlay checked name="Карабаш">
                            <LayerGroup name="pkuMarkersKarabash">
                                {this.renderMarkersLayer(pkuDataKarabash)}
                            </LayerGroup>
                        </LayersControl.Overlay>

                        <LayersControl.Overlay checked name="Уфа">
                            <LayerGroup name="pkuMarkersUfa">
                                {this.renderMarkersLayer(pkuDataUfa)}
                            </LayerGroup>
                        </LayersControl.Overlay>

                    </LayersControl>
                </LeafletMap>
            </div>
        );
    }
}

export default MapComponent


{/*                    // class MyLayer extends Component {*/
}
{/*//     constructor(props) {*/
}
{/*//         super(props);*/
}
{/*//     }*/
}
{/*//*/
}
{/*//*/
}
{/*//     render() {*/
}
{/*//         if (this.props.radius === 0) {*/
}
{/*//             return <LayerGroup/>;*/
}
{/*//         }*/
}
{/*//         return (<LayerGroup>*/
}
{/*//             <Circle center={this.props.latlng} fillColor="red" radius={this.props.radius}/>*/
}
{/*//         </LayerGroup>);*/
}
{/*//     }*/
}
{/*//*/
}
{/*// }*/
}
{/*// render(<MapComponent />, document.getElementById('container'));*/
}
{/*//*/
}
{/*                    export default MapComponent;*/
}

{/*// class MyLayer extends Component {*/
}
{/*//     constructor(props) {*/
}
{/*//         super(props);*/
}
{/*//     }*/
}
{/*//*/
}
{/*//*/
}
{/*//     render() {*/
}
{/*//         if (this.props.radius === 0) {*/
}
{/*//             return <LayerGroup/>;*/
}
{/*//         }*/
}
{/*//         return (<LayerGroup>*/
}
{/*//             <Circle center={this.props.latlng} fillColor="red" radius={this.props.radius}/>*/
}
{/*//         </LayerGroup>);*/
}
{/*//     }*/
}
{/*//*/
}
{/*// }*/
}
{/*//*/
}
{/*//*/
}
{/*// render(<SimpleExample />, document.getElementById('container'))*/
}


{/*//*/
}
{/*// export default function MapComponent() {*/
}
{/*//*/
}
{/*//     const [activePku, setActivePku] = React.useState(null);*/
}
{/*//*/
}
{/*//     return (*/
}
{/*//*/
}
{/*//         <LeafletMap center={[54.730922, 55.962198]} zoom={7}>*/
}
{/*//             <LayersControl position="topright">*/
}
{/*//                 <LayersControl.BaseLayer checked name="Схема">*/
}
{/*//                     <TileLayer*/
}
{/*//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/
}
{/*//                         attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"*/
}
{/*//                     />*/
}
{/*//                 </LayersControl.BaseLayer>*/
}
{/*//                 <LayersControl.BaseLayer name="Гибрид" >*/
}
{/*//                     <TileLayer*/
}
{/*//                         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'*/
}
{/*//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"*/
}
{/*//                     />*/
}
{/*//*/
}
{/*//                 </LayersControl.BaseLayer>*/
}
{/*//                 <LayersControl.Overlay checked name="Объекты">*/
}
{/*//                     <LayerGroup name = "pkuMarkers" >*/
}
{/*//                         {renderMarkersLayer(pkuData)}*/
}
{/*//                     {pkuDataUfa.pkuInfo.map(pku =>*/
}
{/*//                         <Marker key={pku.Id} position={ // строит маркеры на карте*/
}
{/*//                             [pku.Longitude, pku.Latitude]*/
}
{/*//                         }*/
}
{/*//                                 onClick={() => {*/
}
{/*//                                     setActivePku(pku); // переводит в состояние активного ПКУ, описание которого ниже*/
}
{/*//                                 }*/
}
{/*//                                 }*/
}
{/*//                                 icon={pkuMarkerIcon}*/
}
{/*//                         />)*/
}
{/*//                     };*/
}
{/*//*/
}
{/*//                     {activePku && <Popup*/
}
{/*//                         position={ // строит маркеры на карте*/
}
{/*//                             [activePku.Latitude, activePku.Longitude]*/
}
{/*//                         }*/
}
{/*//                         onClose={() => {*/
}
{/*//                             setActivePku(null);*/
}
{/*//                         }}*/
}
{/*//                     >*/
}
{/*//*/
}
{/*//                         <div>*/
}
{/*//                             <h2>{activePku.City}</h2>*/
}
{/*//                             <h3>Зона обслуживания УС: {activePku.Zone}</h3>*/
}
{/*//*/
}
{/*//                         </div>*/
}
{/*//                     </Popup>}*/
}
{/*//                     </LayerGroup>*/
}
{/*//                 </LayersControl.Overlay>*/
}
{/*//                 <LayersControl.Overlay name="Области городов">*/
}
{/*//                     <FeatureGroup color="purple">*/
}
{/*//                         <Popup>*/
}
{/*//                             <span>Popup in FeatureGroup</span>*/
}
{/*//                         </Popup>*/
}
{/*//                         <Circle center={[54.730922, 55.962198]} radius={20000} />*/
}
{/*//                     </FeatureGroup>*/
}
{/*//                 </LayersControl.Overlay>*/
}
{/*//             </LayersControl>*/
}
{/*//*/
}
{/*//         </LeafletMap>*/
}
{/*//     )*/
}
{/*//*/
}
{/*// }*/
}

{/*// export default MapComponent;*/
}