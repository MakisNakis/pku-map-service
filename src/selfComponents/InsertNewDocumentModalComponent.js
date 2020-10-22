import React, { Component } from 'react';
import logo from "../499486.jpg";

// import './css/Template.css';

class InsertNewDocumentModalComponent extends Component {
    constructor() {
        super();

    }


    // https://soundcloud.com/wannalearnguitar/all-star-smash-mouth
    render() {
        return (
            <div align={'center'}>

                <img id="shrek" hidden={false} src={logo} width="1400px"/>
                <audio ref="audio_tag" src="../Smash-Mouth-All-Star.mp3" controls={"controls"} autoPlay={"autoplay"}/>

            </div>
        )
    }
}

export default InsertNewDocumentModalComponent;


