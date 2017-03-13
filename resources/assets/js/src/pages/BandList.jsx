import React from 'react';
import {Table, TableBody, TableHead, TableRow, TableCell, TableSortLabel} from 'material-ui/Table';
import { CircularProgress } from 'material-ui/Progress';
import { Link } from 'react-router-dom'
import axios from 'axios';
import moment from 'moment';
import Button from 'material-ui/Button';
import Layout from 'material-ui/Layout';
import Paper from 'material-ui/Paper';
import Text from 'material-ui/Text';
import {orderBy} from 'lodash';

export default class BandList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			records: [],
			sortDirection: 'asc',
			sortColumn: 'name',
		}
	}
	componentDidMount() {
		axios.get('/api/bands').then((res) => {
			this.setState({
				records: this.sort(res.data),
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
	deleteRecord(id) {
		return () => {
			axios.delete(`/api/bands/${id}`).then((res) => {
				this.setState({
					records: this.sort(res.data),
				});
			});
		};
	}
	render() {
		let rows = this.state.records.map((record) => {
			return (
				<TableRow key={`band_${record.id}`}>
					<TableCell><Link to={`/bands/${record.id}/albums`}>{record.name}</Link></TableCell>
					<TableCell>{record.start_date ? moment(record.start_date).format('MMMM Do, YYYY') : 'n.a.'}</TableCell>
					<TableCell>{record.still_active ? 'Yes' : 'No'}</TableCell>
					<TableCell><a href={record.website}>{record.website}</a></TableCell>
					<TableCell>
						<Button raised primary component={Link} to={`/bands/${record.id}/edit`}>Edit</Button>
						<Button raised accent onClick={this.deleteRecord(record.id)}>Delete</Button>
					</TableCell>
				</TableRow>
			);
		});
		return (
			<Paper style={ {margin: '25px', padding: '25px'} }>
				<Text type="headline">Bands</Text>
				{ this.state.records.length == 0 ?
					<Layout container direction="row" justify="center" align="center" style={ {height: '300px'} }>
						<CircularProgress size={100}/>
					</Layout>
					:
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>
									<TableSortLabel active={this.state.sortColumn == 'name'} direction={this.state.sortDirection} onClick={this.sortBy('name')}>Name</TableSortLabel>
								</TableCell>
								<TableCell>
									<TableSortLabel active={this.state.sortColumn == 'start_date'} direction={this.state.sortDirection} onClick={this.sortBy('start_date')}>Start Date</TableSortLabel>
								</TableCell>
								<TableCell>
									<TableSortLabel active={this.state.sortColumn == 'still_active'} direction={this.state.sortDirection} onClick={this.sortBy('still_active')}>Still Active</TableSortLabel>
								</TableCell>
								<TableCell>
									<TableSortLabel active={this.state.sortColumn == 'website'} direction={this.state.sortDirection} onClick={this.sortBy('website')}>Website</TableSortLabel>
								</TableCell>
								<TableCell>Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{rows}
						</TableBody>
					</Table>
				}
			</Paper>
		)
	}
}