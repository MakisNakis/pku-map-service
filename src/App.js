import React, {Component} from 'react';
import MapComponent from './selfComponents/MapComponent';


export default function App() {
    return (
        <div>
            <div className="mainHeader"><h1>Карта объектов для монтажа оборудования</h1></div>
            <MapComponent/>
        </div>
    );

}

