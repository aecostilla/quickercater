import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';

export default class ToolbarExamplesSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange(event, index, value) {
    this.setState({ value });
  }

  handleBackClick() {
    this.props.goBack();
  }

  signInWithGoogle() {
    window.location.href = '/api/auth/google';
  }

  handleViewCart() {
    this.props.viewCart();
  }

  render() {
    return (
      <div id="Toolbar">
        <Toolbar>
          <ToolbarGroup>
            <ToolbarTitle text={this.props.title} />
          </ToolbarGroup>
          <ToolbarGroup>
            {this.props.inStore
              ? <RaisedButton
                label="Back to Lobby"
                primary onClick={e => this.handleBackClick(e)}
              />
              : null
            }
            <RaisedButton label="View Cart" primary onClick={e => this.handleViewCart(e)} />
            <RaisedButton label="Login" primary onClick={e => this.signInWithGoogle(e)} />
          </ToolbarGroup>
        </Toolbar>
        <br />
      </div>
    );
  }
}
