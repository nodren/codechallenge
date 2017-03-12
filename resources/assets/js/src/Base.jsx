import React from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import {List, ListItem} from 'material-ui/List';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { Grid } from 'react-flexbox-grid-aphrodite';
import BandList from 'src/pages/bands/List';
import AlbumList from 'src/pages/albums/List';

export default class Base extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}
	toggleMenu = () => {
		this.setState({
			open: !this.state.open,
		});
	};
	closeMenu = () => {
		this.setState({
			open: false,
		});
	};
	render() {
		return (
			<MuiThemeProvider>
				<div>
					<AppBar title="LiteracyPro Coding Challenge" onLeftIconButtonTouchTap={this.toggleMenu}/>
					<Drawer open={this.state.open}>
						<AppBar onLeftIconButtonTouchTap={this.toggleMenu} />
						<List>
							<ListItem><Link to="/" onClick={this.closeMenu}>Bands</Link></ListItem>
							<ListItem><Link to="/albums" onClick={this.closeMenu}>Albums</Link></ListItem>
						</List>
					</Drawer>
					<Grid fluid>
						<Switch>
							<Route path="/" exact component={BandList}/>
							<Route path="/band/:bandId/albums" component={AlbumList}/>
							<Route path="/albums/:bandId" component={AlbumList}/>
							<Route path="/albums" component={AlbumList}/>
							<Route component={() => (
								<div>
									Page Not Found
								</div>
							)}/>
						</Switch>
					</Grid>
				</div>
			</MuiThemeProvider>
		)
	}
}