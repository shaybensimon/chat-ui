import React from 'react';
import { Form, Input, Label } from 'semantic-ui-react'
import './InputBox.scss';

// InputBox - representing user input box and user ticket for chosing nick and avatar
class InputBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      avatar: this.props.avatar,
      username: this.props.username
    };
  }

  componentDidUpdate(prevProps) {
    // update states if props changed
    if (prevProps.avatar !== this.props.avatar || prevProps.username !== this.props.username)
      this.setState({
        avatar: this.props.avatar,
        username: this.props.username
      })
  }

  handleChange = (event) => this.setState({ value: event.target.value })

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSend(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    const { value, avatar, username } = this.state;
    return (
      <div className='input-box'>
        <Label className='label' as='a' image onClick={() => this.props.openModal()}>
          <img alt='avatar' href='#' src={avatar} />
          <b>{username}</b>
        </Label>
        <Form size='large' onSubmit={this.handleSubmit} className={`ui form input-box`}>
          <Input fluid={true} onChange={this.handleChange} value={value} action='Send Message' placeholder='Type new message. Press Enter to send' />
        </Form>
      </div>
    );
  }
}

export default InputBox;