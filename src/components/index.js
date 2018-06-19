
//This is your top level React component, you may change everything

import React from 'react'
import logo from '../assets/spotim-logo.jpg'
import spotimAvatar from '../assets/spotim-avatar.png'
import { Header, Container, Image } from 'semantic-ui-react'
import styled from 'styled-components';
import Chat from './Chat';
import Settings from './Settings';
import InputBox from './InputBox';
import io from "socket.io-client";

const Logo = styled.div`
      img{
        margin-left: auto;
        margin-right: auto;
        margin-top: 15px;      
      }
      
`;

class App extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      sessionId: this.generateId(),
      username: 'IM.Spoty',
      avatar: spotimAvatar,
      messages: [],
      chatWidth: 1.7 * (window.innerHeight / 2),
      chatHeight: window.innerHeight / 2,
      openModal: false,
      avatarList: this.generateAvatars()
    };

    this.openAndConnect();

    this.event_name = 'spotim/chat';
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.welcomeUser();
  }

  openAndConnect() {
    //connecting to Socket.IO chat server
    this.socket = io("https://spotim-demo-chat-server.herokuapp.com");

    this.socket.on("connect", function () {
      console.log("connected to chat server!");
    });

    this.socket.on("disconnect", function () {
      console.log("disconnected from chat server!");
    });

    // Listen to new income messages - on income add to state.messages
    this.socket.on('spotim/chat', (data) => {
      this.setState({
        messages: [...this.state.messages, data]
      })
      console.log('recived new message:');
      console.log(data);
    });
  }

  // Two opening messages - invoked on mounting
  welcomeUser() {
    let welcomeMsg = {
      avatar: spotimAvatar,
      username: 'Bot.IM',
      text: 'Welcome to Spot.IM chat!',
      sessionid: this.state.sessionId,
      timestamp: new Date().toLocaleTimeString('it-IT')
    };
    let setMsg = {
      avatar: spotimAvatar,
      username: 'Bot.IM',
      text: 'Please choose Username and Avatar by clicking the ticket above the \'New Message\' field.',
      sessionid: this.state.sessionId,
      timestamp: new Date().toLocaleTimeString('it-IT')
    };
    this.setState({ messages: [...this.state.messages, welcomeMsg, setMsg] });
  }

  sendMessage(msg) {
    if (msg !== '') {
      console.log(`send message:  ${msg}`);
      let name = this.event_name;
      this.socket.emit(name,
        {
          avatar: this.state.avatar,
          username: this.state.username,
          text: msg,
          sessionid: this.state.sessionId,
          timestamp: new Date().toLocaleTimeString('it-IT')
        }
      );
    }
  }

  // Generate unique id for session - for highlighting user messages
  generateId = () => Math.floor(Math.random() * 899999 + 100000);

  generateAvatars = () => 
    [
      'http://react.semantic-ui.com/assets/images/avatar/large/jenny.jpg',
      'http://react.semantic-ui.com/assets/images/avatar/large/helen.jpg',
      'http://react.semantic-ui.com/assets/images/avatar/large/christian.jpg',
      'http://react.semantic-ui.com/assets/images/avatar/large/daniel.jpg',
      'http://react.semantic-ui.com/assets/images/avatar/large/stevie.jpg',
      'http://react.semantic-ui.com/assets/images/avatar/large/elliot.jpg',
    ]

  setUserValues = (username, avatar) => 
    this.setState({ 
      username: username.length > 0 ? username : this.state.username, 
      avatar: avatar 
    })

  openModal = () => this.setState({ openModal: true })

  closeModal = () => this.setState({ openModal: false })

  render() {
    const { chatWidth, chatHeight, openModal, username, avatar, sessionId, avatarList } = this.state;

    return (
      <div>
        {openModal && 
          (<Settings setUserValues={(username, avatar) => this.setUserValues(username, avatar)}
                      closeModal={() => this.closeModal()} avatarList={avatarList}
                      username={username} avatar={avatar} />)}
        <div id='app' className='site' style={{ width: chatWidth }}>
          <Container className='spotim-header'>
            <Header size='huge' className='spotim-title'>Welcome to the Spot.IM Chat app</Header>
              <Logo> <Image size={'tiny'} src={logo} /> </Logo>
          </Container>
          <div className={'main-content'} id='main-content' style={{ height: chatHeight }}>
            <Chat messages={this.state.messages} sessionId={sessionId} />
          </div>
          <footer className='footer' id='footer'>
            <InputBox onSend={this.sendMessage} avatar={avatar} username={username} openModal={() => this.openModal()} />
          </footer>
        </div>
      </div>
    );
  }
}

export default App;