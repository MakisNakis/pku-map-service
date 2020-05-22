import React, {Component} from 'react';


class PkuDataFromServer extends Component {

    constructor() {
        super();
        this.state = {
            pkuData: []
        }
    }

    componentDidMount() {
        fetch('/api/test')
            .then(res => res.json())
            .then(pkuDataServer => this.setState({pkuData: pkuDataServer}, () => console.log('We fetched..',
                pkuDataServer)))
    }

    render() {
        return (
            <div>
                {this.pkuData}
            </div>
        );
    }
}

export default PkuDataFromServer;
