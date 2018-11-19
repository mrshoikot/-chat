import React, {Component} from 'react';
import Axios from 'axios';

import Message from '../../Components/Message/Message';

class Case extends Component {
    state = {
        messages: {}
    }

    updateState = () => {
        Axios.get('https://mr-chatbox.firebaseio.com/messages.json')
            .then((response) => {
                this.setState({messages: response.data});
            })
            .catch(error=>{
                console.log(error)
            })
    }

    componentDidMount(){
        this.updateState();
    }

    messageSubmitHandler = (e) =>  {
        e.preventDefault();

        let message = {
            user: 'jabed',
            text: e.target.text.value,
            time: new Date()
        }
        Axios.post('https://mr-chatbox.firebaseio.com/messages.json', message)
            .then((response) => {
                this.updateState();
            })
            .catch(error=>{
                console.log(error)
            })
    }


    render (){
        let messages = null;
        
        if(this.state.messages){
            const messageArray = Object.keys(this.state.messages).map(i => this.state.messages[i]);
            messages = messageArray.map(messageItem => {
                return (
                    <Message key={messageItem.time} user={messageItem.user}>{messageItem.text}</Message>
                )
            });
        }

        setTimeout(this.updateState, 2000);

        return (
            <div className="case">
                <div className="chatbox">
                    <ul>
                        {messages}
                    </ul>
                </div>
                <div className="input">
                    <form onSubmit={this.messageSubmitHandler}>
                        <input type="text" name="text" />
                        <button type="submit">SEND</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Case;