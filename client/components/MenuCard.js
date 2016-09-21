import React, { Component } from 'react';
import Card from 'material-ui/Card';
import CardActions from 'material-ui/Card/CardActions';
import CardHeader from 'material-ui/Card/CardHeader';
import CardText from 'material-ui/Card/CardText';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
// import injectTapEventPlugin from 'react-tap-event-plugin';

// injectTapEventPlugin();

export default class MenuCardExpandable extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: 2,
      style: this.props.style,
      name: this.props.menu.name,
      items: this.props.menu.item,
      description: this.props.menu.description,
    };
  }

  handleOnMouseEnter() {
    this.setState({ hover: 5 });
  }

  handleOnMouseLeave() {
    this.setState({ hover: 2 });
  }

  render() {
    return (
      <div style={this.state.style}>
        <Paper zDepth={this.state.hover}>
          <Card
            onMouseEnter={e => this.handleOnMouseEnter(e)}
            onMouseLeave={e => this.handleOnMouseLeave(e)}
          >
            <CardHeader
              title={this.state.name}
              subtitle={this.state.description}
              avatar="https://ssl.gstatic.com/images/branding/product/1x/avatar_circle_blue_512dp.png"
              actAsExpander
              showExpandableButton
            />
            <CardText expandable>
              <h4>{this.state.items.name}</h4>
              <p>{this.state.items.description}</p>
              <p>{`$${this.state.items.price}`}</p>
            </CardText>
            <CardActions>
              <FlatButton label="Add Me To Order" />
            </CardActions>
          </Card>
        </Paper>
        <br />
      </div>
    );
  }
}

