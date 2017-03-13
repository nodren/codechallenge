import React from 'react';
import { Route, Link, Switch, withRouter } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/menu';
import Text from 'material-ui/Text';
import Drawer from 'material-ui/Drawer';
import { List, ListItem, ListItemText } from 'material-ui/List';

import BandList from 'src/pages/BandList';
import BandEdit from 'src/pages/BandEdit';
import AlbumList from 'src/pages/AlbumList';
import AlbumEdit from 'src/pages/AlbumEdit';

class Base extends React.Component {

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
					<AppBar style={ {position: 'relative'} }>
						<Toolbar>
							<IconButton contrast onClick={this.toggleMenu}>
								<MenuIcon />
							</IconButton>
							<Text type="title" colorInherit>LiteracyPro Coding Challenge</Text>
						</Toolbar>
					</AppBar>
					<Drawer open={this.state.open} onClick={this.toggleMenu} onRequestClose={this.closeMenu}>
						<List style={ {width:250, flex: 'initial'} } padding={false}>
							<ListItem button onClick={this.closeMenu} to="/" component={Link}>
								<ListItemText primary="Bands" />
							</ListItem>
							<ListItem button onClick={this.closeMenu} to="/albums" component={Link}>
								<ListItemText primary="Albums" />
							</ListItem>
						</List>
					</Drawer>
					<Switch>
						<Route path="/" exact component={BandList}/>
						<Route path="/bands/:bandId/albums" component={AlbumList}/>
						<Route path="/bands/:bandId/edit" component={BandEdit}/>
						<Route path="/albums/:albumId/edit" component={AlbumEdit}/>
						<Route path="/albums" component={AlbumList}/>
						<Route component={() => (
							<div>
								Page Not Found
							</div>
						)}/>
					</Switch>
				</div>
			</MuiThemeProvider>
		)
	}
}
export default withRouter(Base);