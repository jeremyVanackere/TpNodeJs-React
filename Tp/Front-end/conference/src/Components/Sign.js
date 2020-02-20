import React, { Component } from 'react'

import API from "../ApiUtils";

class Sign extends Component {

    constructor() {
        super();
        this.textInput = React.createRef();
    }

    handleClick() {
        if(this.textInput.current.value === "") return;
        localStorage.setItem('username', this.textInput.current.value);
        API.get('/sign?name='+this.textInput.current.value)
            .then(function (response) {
                // handle success
                console.log(response);
                localStorage.setItem('token', response.data.token);
                window.location.href = "http://localhost:3000/";
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    render() {
        return (
            <div className="App">
                <input type="text" ref={this.textInput}/>
                <button onClick={() => this.handleClick()}>Connexion</button>
            </div>
        )
    }
}

export default Sign;