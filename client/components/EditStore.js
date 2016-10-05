import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import TextField from 'material-ui/TextField';

export default class EditStoreInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      hover: 2,
      name: this.props.store.name,
      description: this.props.store.description,
      slogan: this.props.store.slogan,
      picture: this.props.store.picture,
      address: this.props.store.address,
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({ newProps });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleSubmitEdit() {
    this.props.editStore({
      id: this.props.store.id,
      name: this.state.name,
      description: this.state.description,
      slogan: this.state.slogan,
      picture: this.state.picture,
      address: this.state.address,
    });
    this.setState({
      open: false,
    });
  }

  handleStoreNameChange(e) {
    this.setState({
      name: e.currentTarget.value,
    });
  }

  handleStoreDescriptionChange(e) {
    this.setState({
      description: e.currentTarget.value,
    });
  }

  handleStoreSloganChange(e) {
    this.setState({
      slogan: e.currentTarget.value,
    });
  }

  handleStoreAddressChange(e) {
    this.setState({
      address: e.currentTarget.value,
    });
  }

  handleStorePictureChange(e) {
    const reader = new FileReader();
    const file = e.currentTarget.files[0];
    reader.onload = (a) => {
      this.setState({
        picture: a.target.result,
      });
    };
    reader.readAsDataURL(file);
  }

  handleCancelEdit() {
    this.setState({ open: false });
  }

  renderPreview() {
    let divToRender = '';
    const style = {
      imgPrev: {
        float: 'right',
        marginTop: '8%',
        marginRight: '3%',
        height: '25%',
        width: '25%',
      },
      imageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: '35%',
        left: '72%',
        height: '50%',
        width: '25%',
        opacity: 0,
      },
      imgButton: {
        float: 'right',
        marginTop: '8%',
        marginRight: '3%',
        height: '25%',
        width: '25%',
      },
    };
    if (this.state.picture !== false) {
      divToRender = (
        <div>
          <img
            role="presentation"
            src={this.state.picture}
            style={style.imgPrev}
          />
          <input
            title="Drag and drop to replace image or Click to Add new"
            type="file"
            style={style.imageInput}
            onChange={e => this.handleStorePictureChange(e)}
          />
        </div>);
    } else {
      divToRender = (
        <div>
          <input
            type="file"
            style={style.imageInput}
            onChange={e => this.handleStorePictureChange(e)}
          />
          <img
            role="presentation"
            src={this.props.store.picture}
            style={style.imgPrev}
          />
        </div>);
    }
    return divToRender;
  }

  render() {
    const style = {
      floatingActionButton: {
        top: 15,
        right: 20,
        bottom: 20,
        position: 'absolute',
      },
      cardActions: {
        position: 'relative',
        height: 30,
      },
      card: {
        marginBottom: '5%',
      },
      editBtn: {
        position: 'absolute',
        left: '48%',
        marginTop: '-1%',
      },
    };
    // action buttons for Modal
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={e => this.handleCancelEdit(e)}
      />,
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onTouchTap={e => this.handleSubmitEdit(e)}
      />,
    ];
    // This is the actual modal
    return (
      <div style={style.editBtn}>
        <FloatingActionButton
          zDepth={0}
          secondary
          mini
          onTouchTap={() => this.setState({ open: true })}
        >
          <ModeEdit />
        </FloatingActionButton>
        <Dialog
          title="Edit Store Information"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={(e) => this.handleClose(e)}
        >
          <div>
            { this.renderPreview() }
            <TextField
              hintText="Name"
              floatingLabelText="Enter store Name"
              value={this.state.name}
              onChange={e => this.handleStoreNameChange(e)}
            /><br />
            <TextField
              hintText="Description"
              floatingLabelText="Enter Store Description"
              value={this.state.description}
              onChange={e => this.handleStoreDescriptionChange(e)}
            /><br />
            <TextField
              hintText="Slogan"
              floatingLabelText="Enter Store Slogan"
              value={this.state.slogan}
              onChange={e => this.handleStoreSloganChange(e)}
            /><br />
            <TextField
              hintText="Address"
              floatingLabelText="Enter Store Address"
              value={this.state.address}
              onChange={e => this.handleStoreAddressChange(e)}
            /><br />
          </div>
        </Dialog>
      </div>
    );
  }
}
