import React, { Component } from 'react'
import socketIOClient from "socket.io-client";
import API from "../ApiUtils";

class Conference extends Component {

    constructor(props) {
        super(props);
        this.state = {
            idConference : this.props.idConference,
            endpoint: "http://127.0.0.1:3020",
            con: null,
            messages: [],
            tempsArrive: Date.now(),
            name: this.props.username
        }
        this.inputElement = React.createRef()
    }

    createListMessage(message) {
        return <li key={Date.now()+Math.random(10000000000)}>{message}</li>
    }

    render() {
        if(this.props.idConference === null) return (<div></div>)
        const mess = this.state.messages.map(message => this.createListMessage(message)).reverse();
        return (
            <div className="App">
                <h1>Conférence selectionné : {this.state.idConference}</h1>
                    <ul style={{maxHeight: '300px', overflow: 'auto'}}>
                        {mess}
                    </ul>
                <input type="text"
                    ref={this.inputElement}
                />
                <button onClick={this.sendMessage}>Envoyer</button>
            </div>
        )
    }

    /**
     * Envoie un message au bon format du protocol du serveur
     * @param msg
     */
     sendMessage = () => {
        let msg = this.inputElement.current.value;
        if(msg != "") {
            let res = this.state.idConference + " " + msg;
            this.state.con.emit('chat message', res);
            this.inputElement.current.value = "";
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.state.idConference != nextProps.idConference) { // QUAND ON A CHANGER DE CONFERENCE
            this.state.messages = [];
            this.disonnectUser();
            this.state.tempsArrive = Date.now();
        }
        this.state.idConference = nextProps.idConference;
        this.state.username = nextProps.username;

        return true;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.state.con.off(''+prevProps.idConference);
        this.state.con.on(this.state.idConference, data =>{
            const mess = [...this.state.messages, data]
            this.setState({
                messages : mess
            })
        });
    }

    disonnectUser() {
        const monToken = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${monToken}` }
        };
        let stock = this;
        console.log(Date.now() - this.state.tempsArrive);
        API.post('/user', {
            name: this.props.username,
            idConference: this.state.idConference,
            tempsConnexion: ""+(Date.now() - this.state.tempsArrive)
        },config)
            .then(function (response) {
                // handle success
            })
            .catch(function (error) {
                // handle error
                console.log(error);
                localStorage.removeItem('token');
            })
    }

    componentDidMount() {
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        this.state.con = socket;
        this.setState({
            con : socket
        })
        socket.on(this.state.idConference, data =>{
            console.log(data);
            const mess = [...this.state.messages, data]
            this.setState({
                messages : mess
            })
        });
    }
}
export default Conference;