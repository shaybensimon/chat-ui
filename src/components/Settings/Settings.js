import React from 'react';
import { Form, Button, Header, Image, Modal } from 'semantic-ui-react'
import './Settings.scss';

// Settings - representing settings modal
// avatar's list is coming from App class
class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      username: '',
      avatar: this.props.avatar,
      open: true
    };
  }
  handleChange = (event) => this.setState({ username: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.setUserValues(this.state.username, this.state.avatar);
    this.props.closeModal();
  }

  render() {
    const { username, open, avatar } = this.state;
    const { avatarList } = this.props;

    return (
      <Modal open={open} onClose={() => this.props.closeModal()}>
        <Modal.Header >Settings</Modal.Header>
        <Modal.Content image>
          <Image id='img' wrapped size='medium' verticalAlign='middle' circular={true} src={avatar} />
          <Modal.Description >
            <Header>Choose Avatar</Header>
            <div className='avatar-grid'>
              {avatarList.map((url, index) => {
                return <Image key={index} href='#' centered={true}
                  verticalAlign='bottom' avatar src={url}
                  onClick={() => this.setState({ avatar: url })} />
              })}
            </div>
            <Header>Choose Nickname</Header>
            <Form onSubmit={this.handleSubmit} >
              <Form.Field> <input onChange={this.handleChange} value={username} placeholder={this.props.username} /> </Form.Field>
              <Button type='submit' >Set</Button>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
export default Settings;