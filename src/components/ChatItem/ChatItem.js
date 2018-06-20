import React from 'react';
import './ChatItem.scss';
import { List, Image } from 'semantic-ui-react'

// ChatItem - represting single message
// props.background ? current session user's message : other users message 

const ChatItem = (props) => {
  return (<List.Item style={{ background: props.background ? '#f7f7f7' : '' }}>
    <List.Content>
    <div className='chat-item'>
    <Image style={{ float: 'left' }} avatar src={props.dto.avatar} />
        <b>{props.dto.username}:</b> {props.dto.text}
      </div>
    </List.Content>
  </List.Item>
);}

export default ChatItem;