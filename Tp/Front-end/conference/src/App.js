import React, { Component } from 'react'
import './App.css'
import './Components/Conference'
import Conference from "./Components/Conference";

import API from "./ApiUtils";
import Sign from "./Components/Sign";

class App extends Component {

    constructor() {
        super();
        this.state = {
            listConference : [
                { _id : "123"},
                { _id : "124"}
            ],
            currentConference: null,
            username: null
        }
    }

    handleCurrentConference (id) {
        this.setState({
            currentConference: id
        })
    }

    createConference(conf) {
        return <li key={conf._id} onClick={(e) => this.handleCurrentConference(conf._id)}>{conf._id}</li>
    }

    addConference() {
        const monToken = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${monToken}` }
        };
        let stock = this;
        API.get('/conference/add',config)
            .then(function (response) {
                // handle success
                window.location.href = "http://localhost:3000/";
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                localStorage.removeItem('token');
            })
    }

    render() {
        if(localStorage.getItem('token') === null) return (<Sign />)
        let li = this.state.listConference.map(elem => this.createConference(elem));
        return (
            <div className="App">
                <div>
                    <button onClick={() => this.addConference()}>Ajouter une conférence</button>
                    <ul style={{height: '200px', overflow: 'auto'}}>
                        {li}
                    </ul>
                </div>
                <Conference
                    idConference={this.state.currentConference}
                    username={this.state.username}
                />
            </div>
        )
    }

    componentDidMount() {
        this.state.username = localStorage.getItem('username');
        const monToken = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${monToken}` }
        };
        let stock = this;
        API.get('/conference',config)
            .then(function (response) {
                // handle success
                console.log(response);
                stock.setState({
                    listConference: response.data
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                localStorage.removeItem('token');
            })
    }
}
export default App;