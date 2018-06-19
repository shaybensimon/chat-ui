import React from 'react';
import './Chat.scss';
import ChatItem from '../ChatItem';
import { List } from 'semantic-ui-react';

// Chat - represnting the chat window
// 1. Creating a list of ChatItems - each item with aprropriate background
// 2. Auto scrolls for the last message - using ref
class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sessionId: this.props.sessionId,
      messages: this.props.messages
    };
  }
  
  componentDidUpdate(prevProps) { 
    if(prevProps.messages.length !== this.props.messages.length){
      this.setState(
        { messages: this.props.messages }, 
        () => this.bottom.scrollIntoView({ behavior: 'smooth' }))
    }
  }
  
  render() {
    const { sessionId, messages } = this.state;

    return (
      <div className='chat' id='chat'>
        <List celled={false} verticalAlign='middle'>
          {messages.map((data, index) => {
            return <ChatItem key={index} id={index} dto={data} background={data.sessionid === sessionId}> </ChatItem>
          })}
        </List>
        <div ref={bottom => { this.bottom = bottom; }} />
        </div>
    );
  }
}

export default Chat;