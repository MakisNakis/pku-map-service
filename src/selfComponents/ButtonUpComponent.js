import React, {Component} from 'react';
import img from '../up3.png';
import {Link} from "react-scroll";

import './css/ButtonUpComponent.css';

let appThis;

window.addEventListener('scroll', function() {
    // console.log(window.scrollY, appThis.state.showButtonUp);
    if (window.scrollY > appThis.offset && appThis.state.showButtonUp === false) {
        // console.log(appThis);
        appThis.setState({
            showButtonUp: true
        });
    } else if (window.scrollY <= appThis.offset && appThis.state.showButtonUp === true) {
        appThis.setState({
            showButtonUp: false
        });
    }

    // console.log(typeof(appThis.state.offset), appThis.state.offset);
});

class ButtonUpComponent extends Component {
    constructor() {
        super();

        appThis = this;

        this.state = {
            showButtonUp: false
        }

        this.offset = 150;
    }

    render() {
        return (
            <div>
                {this.state.showButtonUp &&
                <Link
                    // не настраивал
                    to="mainDiv"
                    spy={true}
                    smooth={true}
                    duration={250}
                >
                    <button className={"buttonUp"}>
                        <img src={img}/>
                    </button>
                </Link>
                }
            </div>
        )
    }
}


export default ButtonUpComponent;
