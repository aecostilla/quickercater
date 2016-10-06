import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import EditStore from './EditStore';

export default class StoreDescription extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleStoreLogo() {
    const style = {
      position: 'relative',
      top: 25,
      left: 25,
      height: 100,
      width: 100,
      letter: {
        position: 'relative',
        left: 15,
        top: 15,
        height: 100,
        width: 100,
        display: 'inline-block',
      },
      char: {
        height: 100,
        width: 100,
        fontSize: 50,
      },
    };
    let logo = this.props.store.picture;
    if (logo === '' || logo === false) {
      logo = (
        <div style={style.letter}>
          <Avatar style={style.char}children={this.props.store.name.charAt(0)} />
        </div>
      );
    } else {
      logo = (<img alt="logo" style={style} src={this.props.store.picture} />);
    }
    return logo;
  }

  render() {
    const style = {
      width: '80%',
      height: 150,
      paddingTop: '0%',
      paddingBottom: 0,
      marginTop: '2%',
      marginRight: 'auto',
      marginBottom: '2%',
      marginLeft: 'auto',
      alignItems: 'center',
      postion: 'absoulte',
      left: '10%',
      overflowY: 'auto',
      wordWrap: 'break-word',
      img: {
        position: 'relative',
        right: 15,
        top: 15,
        height: 100,
        width: 100,
        display: 'inline-block',
      },
      name: {
        display: 'inline-block',
        margin: 40,
      },
      desc: {
        display: 'inline-block',
        width: '49%',
        textAlign: 'left',
      },
    };
    return (
      <div>
        <Paper style={style} zDepth={1} rounded={false}>
          {this.handleStoreLogo()}
          <h1 style={style.name}>{this.props.store.name}</h1>
          <p style={style.desc}>{this.props.store.description}</p>
          {this.props.editing ?
            <EditStore
              edit={this.props.editing}
              store={this.props.store}
              editStore={e => this.props.handleEditStore(e)}
            />
            : null
          }
        </Paper>
      </div>
    );
  }

}
