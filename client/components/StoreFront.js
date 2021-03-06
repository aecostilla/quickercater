import React, { Component } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MenuContainer from './MenuContainer';
import Dashboard from './Dashboard';
import PackageContainer from './PackageContainer';
import StoreDescription from './StoreDescription';

import OrderAPI from '../models/orderAPI';
import Owner from '../models/ownerAPI';

export default class StoreFront extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      openItemBank: false,
      store: this.props.store,
      packages: [],
      muiTheme: null,
      colorTheme: null,
    };

    this.toggleEditing = e => this.handleToggleEditing(e);
    this.changeTheme = e => this.handleChangeTheme(e);
  }

  componentWillMount() {
    this.setState({
      muiTheme: getMuiTheme(this.state.colorTheme),
      colorTheme: this.props.store.colors,
    });
  }

  handleToggleEditing() {
    this.setState({
      editing: !this.state.editing,
      openItemBank: !this.state.openItemBank,
    });
  }

  fetchPendingOrders(ownerId) {
    OrderAPI.fetchPendingOrders(ownerId).then(resp => {
      this.setState({ pendingOrders: resp });
    });
  }

  fetchAcceptedOrders(ownerId) {
    OrderAPI.fetchAcceptedOrders(ownerId).then(resp => {
      this.setState({ acceptedOrders: resp });
    });
  }

  handleEditStore(setStore) {
    Owner.updateStore(setStore, this.props.ownerIdOfCurrentStore)
    .then((store) => {
      this.setState({ store });
    });
  }

  updatePackagesByOwner(packages) {
    this.setState({ packages });
  }

  handleChangeTheme(newTheme) {
    Owner.updateStoreColors({
      storeId: this.props.store.id,
      colors: newTheme.palette,
    })
    .then(store => {
      this.setState({
        muiTheme: getMuiTheme(store.colors),
        colorTheme: store.colors,
      });
    });
  }

  render() {
    const style = {
      menuCards: {
        width: '85%',
        flex: '50%',
        marginTop: '2%',
        marginBottom: '2%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      dashboard: {
        width: '80%',
        flex: '50%',
        marginTop: '2%',
        marginBottom: '2%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      paper: {
        width: '80%',
        flex: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingBottom: '2%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
    };

    return (
      <div className="StoreFront" >
        {this.props.showDashboard
        ? <MuiThemeProvider muiTheme={this.props.masterMuiTheme}>
          <Dashboard
            style={style.dashboard}
            ownerId={this.props.ownerIdOfCurrentStore}
            storeName={this.props.store.name}
            toggleEditing={this.toggleEditing}
            colorTheme={this.state.colorTheme}
            masterColorTheme={this.props.colorTheme}
            changeTheme={this.changeTheme}
          />
        </MuiThemeProvider>
        : null
      }
        <MuiThemeProvider muiTheme={getMuiTheme(this.state.colorTheme)}>
          <div>
            <StoreDescription
              style={{ width: '80%', margin: '2% auto', position: 'relative' }}
              ownerId={this.props.ownerId}
              editing={this.state.editing}
              store={this.state.store}
              background={{ height: 180, backgroundImage: `url(${this.state.store.banner})` }}
              handleEditStore={e => this.handleEditStore(e)}
            /><br />
            <Paper zDepth={2} style={style.paper}>
              <Tabs style={style.tabs}>
                <Tab label="Menu"><br />
                  <MenuContainer
                    title={this.props.store.name}
                    style={style.menuCards}
                    ownerId={this.props.ownerIdOfCurrentStore}
                    addItemToOrder={this.props.addItemToOrder}
                    editing={this.state.editing}
                    packages={this.state.packages}
                  />
                </Tab>
                <Tab label="Packages"><br />
                  <PackageContainer
                    ownerId={this.props.ownerIdOfCurrentStore}
                    editing={this.state.editing}
                    updatePackagesByOwner={e => this.updatePackagesByOwner(e)}
                  /><br />
                </Tab>
              </Tabs>
            </Paper>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
