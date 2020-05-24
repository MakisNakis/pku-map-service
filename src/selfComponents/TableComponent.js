import React, {Component} from 'react';


class TableComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
        this.props = {
            requestAddress: '/api/pkuDataServer',
        };
    }


    loadData() {
        fetch(this.props.requestAddress).then(results => {
            return results.json()
        }).then(data => {
            this.setState({users: data});
        }).catch(() => {
            alert('Ошибка!');
        });
    }

    refreshData() {
        this.loadData();
    }

    componentWillMount() {
        this.loadData();
    }

    render() {
        return (
            <div>
                <a className="btn btn-success" onClick={() => this.refreshData()}>Обновить</a>
                <table className="table">
                    <thead>
                    <tr>
                        <th>
                            Имя пользователя
                        </th>
                        <th>
                            Ф.И.О.
                        </th>
                        <th>
                            Роль
                        </th>
                        <th>
                            Заблокирован
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map(item => {
                        return (
                            <tr key={item.id}>
                                <td>{item.Login}</td>
                                <td>{item.FIO}</td>
                                <td>{item.UserRole}</td>
                                {/*<td dangerouslySetInnerHTML={{__html: item.Ban ? '<input checked="checked" class="check-box" disabled="disabled" type="checkbox">' : '<input class="check-box" disabled="disabled" type="checkbox">'}}></td>*/}
                            </tr>
                        );
                    })
                    }
                    </tbody>
                </table>
            </div>);

    }
}

export default TableComponent;
