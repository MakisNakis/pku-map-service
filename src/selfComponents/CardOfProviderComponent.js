import React, { Component } from 'react';

// import './css/CardOfProviderComponent.css';

class CardOfProviderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <h1>Provider ID: {this.props.selectedProviderId}</h1>

                <button onClick={() => this.props.closeWindowPortal()} >
                    Close me!
                </button>
            </div>
        )
    }
}

export default CardOfProviderComponent;