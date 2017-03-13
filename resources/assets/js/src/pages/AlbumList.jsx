import React from 'react';
import { Link } from 'react-router-dom'
import {Table, TableBody, TableHead, TableRow, TableCell, TableSortLabel} from 'material-ui/Table';
import { CircularProgress } from 'material-ui/Progress';
import axios from 'axios';
import moment from 'moment';
import Button from 'material-ui/Button';
import { Menu, MenuItem } from 'material-ui/Menu';
import Layout from 'material-ui/Layout';
import Paper from 'material-ui/Paper';
import Text from 'material-ui/Text';
import {orderBy} from 'lodash';

export default class AlbumList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			records: [],
			bands: [],
			reload: false,
			filtersOpen: false,
			anchorEl: null,
			sortDirection: 'asc',
			sortColumn: 'name',
		}
	}
	static propTypes = {
		match: React.PropTypes.object.isRequired,
	};
	componentDidUpdate() {
		if (this.state.reload) {
			this.setState({
				reload: false,
			});
			this.populateTable();
		}
	}
	componentWillReceiveProps(newProps) {
		if (this.props.match.params != newProps.match.params) {
			this.setState({
				reload: true,
			});
		}
	}
	populateTable() {
		let params = {};
		if (this.props.match.params.bandId) {
			params.bandId = this.props.match.params.bandId;
		}
		axios.get('/api/albums', {params}).then((res) => {
			this.setState({
				records: this.sort(res.data),
			});
		});
	}
	componentDidMount() {
		this.populateTable();
		axios.get('/api/bands').then((res) => {
			this.setState({
				bands: orderBy(res.data, 'name', 'asc'),
			});
		});
	}
	sortBy(column) {
		return () => {
			let direction = 'asc';
			if (this.state.sortColumn == column) {
				direction = this.state.sortDirection == 'asc' ? 'desc' : 'asc';
			}
			this.setState({
				sortDirection: direction,
				sortColumn: column,
			}, () => {
				this.setState({
					records: this.sort(this.state.records),
				});
			});
		}
	}
	sort(data) {
		return orderBy(data, this.state.sortColumn, this.state.sortDirection);
	}
	toggleFilterMenu = (e) => {
		this.setState({
			filtersOpen: !this.state.filtersOpen,
			anchorEl: e.currentTarget,
		});
	};
	closeMenu = () => {
		this.setState({
			filtersOpen: false,
		});
	};
	deleteRecord(id) {
		return () => {
			axios.delete(`/api/albums/${id}`).then((res) => {
				this.setState({
					records: this.sort(res.data),
				});
			});
		};
	}
	render() {
		let rows = this.state.records.map((record) => {
			return (
				<TableRow key={`album_${record.id}`}>
					<TableCell>{record.name}</TableCell>
					<TableCell>{record.band.name}</TableCell>
					<TableCell>{moment(record.release_date).format('MMMM Do, YYYY')}</TableCell>
					<TableCell>{record.genre}</TableCell>
					<TableCell>
						<Button raised primary component={Link} to={`/albums/${record.id}/edit`}>Edit</Button>
						<Button raised accent onClick={this.deleteRecord(record.id)}>Delete</Button>
					</TableCell>
				</TableRow>
			);
		});
		let popupRows = this.state.bands.map((band) => {
			let attrs = {};
			if (band.id == this.props.match.params.bandId) {
				attrs.selected = true;
			}
			return <MenuItem key={`band_popup_${band.id}`} onClick={this.closeMenu} component={Link} to={`/bands/${band.id}/albums`} {...attrs}>{band.name}</MenuItem>;
		});
		return (
			<Paper style={ {margin: '25px', padding: '25px'} }>
				<Text type="headline">Albums</Text>
				{ this.state.records.length == 0 ?
				<Layout container direction="row" justify="center" align="center" style={ {height: '300px'} }>
					<CircularProgress size={100}/>
				</Layout>
				:
				<div>
					<Button raised onClick={this.toggleFilterMenu} aria-owns="filter-menu" aria-haspopup="true">Filter by band...</Button>
					<Menu id="filter-menu" open={this.state.filtersOpen} anchorEl={this.state.anchorEl} onRequestClose={this.closeMenu} style={ {paddingTop: '5px', paddingBottom: '5px'} }>
						<MenuItem onClick={this.closeMenu} component={Link} to="/albums">All Bands</MenuItem>
						{popupRows}
					</Menu>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									<TableSortLabel active={this.state.sortColumn == 'name'} direction={this.state.sortDirection} onClick={this.sortBy('name')}>
										Album Name
									</TableSortLabel>
								</TableCell>
								<TableCell>
									<TableSortLabel active={this.state.sortColumn == 'band.name'} direction={this.state.sortDirection} onClick={this.sortBy('band.name')}>
										Band Name
									</TableSortLabel>
								</TableCell>
								<TableCell>
									<TableSortLabel active={this.state.sortColumn == 'release_date'} direction={this.state.sortDirection} onClick={this.sortBy('release_date')}>
										Release Date
									</TableSortLabel>
								</TableCell>
								<TableCell>
									<TableSortLabel active={this.state.sortColumn == 'genre'} direction={this.state.sortDirection} onClick={this.sortBy('genre')}>
										Genre
									</TableSortLabel>
								</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows}
						</TableBody>
					</Table>
				</div>
				}
			</Paper>
		);
	}
}