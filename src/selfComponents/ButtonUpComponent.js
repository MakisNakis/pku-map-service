import React, {Component} from 'react';
import img from '../up3.png';
import {Link} from "react-scroll";



class ButtonUpComponent extends Component {
    constructor() {
        super();
    }



    render() {
        return (
            <div>
                    <Link
                    // не настраивал
                    to="mainDiv"
                    spy={true}
                    smooth={true}
                    duration={250}
                >
                    <button className={"buttonUp"}>
                        {/*<img src="/003 Лого Без фона.png" />*/}
                    </button>
                </Link>
            </div>
        )
    }
}


export default ButtonUpComponent;



