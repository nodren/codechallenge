import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import CircularProgress from 'material-ui/CircularProgress';
import { Row, Col } from 'react-flexbox-grid-aphrodite';
import { Link } from 'react-router-dom'
import axios from 'axios';

export default class List extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			records: [],
		}
	}
	componentDidMount() {
		axios.get('/api/bands').then((res) => {
			this.setState({
				records: res.data,
			});
		});
	}
	render() {
		let rows = this.state.records.map((record) => {
			return (
				<TableRow key={`band_${record.id}`}>
					<TableRowColumn><Link to={`/albums/${record.id}`}>{record.name}</Link></TableRowColumn>
					<TableRowColumn>{record.start_date}</TableRowColumn>
					<TableRowColumn>{record.still_active ? 'Yes' : 'No'}</TableRowColumn>
					<TableRowColumn><a href="{record.website}">{record.website}</a></TableRowColumn>
				</TableRow>
			);
		});
		return (
			<div>
				{ this.state.records.length == 0 ?
					<Row center="xs" bottom="xs">
						<Col xs={1}>
							<div style={ {height: '150px' } }></div>
							<CircularProgress size={100} thickness={7} />
						</Col>
					</Row>
					:
					<Table>
						<TableHeader adjustForCheckbox={false} displaySelectAll={false}>
							<TableRow>
								<TableHeaderColumn>Name</TableHeaderColumn>
								<TableHeaderColumn>Start Date</TableHeaderColumn>
								<TableHeaderColumn>Still Active</TableHeaderColumn>
								<TableHeaderColumn>Website</TableHeaderColumn>
							</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={false}>
							{rows}
						</TableBody>
					</Table>
				}
			</div>
		)
	}
}