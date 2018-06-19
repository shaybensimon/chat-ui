import React from 'react';
import './ChatItem.scss';
import { List, Image } from 'semantic-ui-react'

// ChatItem - represting single message
// props.background ? current session user's message : other users message 
class ChatItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      avatar: this.props.dto.avatar,
      username: this.props.dto.username,
      msg: this.props.dto.text,
      background: this.props.background
    };
  }

  render() {
    const { username, avatar, msg } = this.state;

    return (
      <List.Item style={{ background: this.props.background ? '#f7f7f7' : '' }}>
        <List.Content>
          <Image style={{ float: 'left' }} avatar src={avatar} />
          <div className='chat-item'>
            <b>{username}:</b> {msg}
          </div>
        </List.Content>
      </List.Item>
    );
  }
}

export default ChatItem;