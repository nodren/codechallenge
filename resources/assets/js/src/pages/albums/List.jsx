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
	static propTypes = {
		match: React.PropTypes.object.isRequired,
	};
	componentDidMount() {
		let params = {};
		if (this.props.match.params.bandId) {
			params.bandId = this.props.match.params.bandId;
		}
		axios.get('/api/albums', {params}).then((res) => {
			this.setState({
				records: res.data,
			});
		});
	}
	render() {
		let rows = this.state.records.map((record) => {
			return (
				<TableRow key={`album_${record.id}`}>
					<TableRowColumn>{record.name}</TableRowColumn>
					<TableRowColumn>{record.band.name}</TableRowColumn>
					<TableRowColumn>{record.recorded_date}</TableRowColumn>
					<TableRowColumn>{record.release_date}</TableRowColumn>
					<TableRowColumn>{record.number_of_tracks}</TableRowColumn>
					<TableRowColumn>{record.label}</TableRowColumn>
					<TableRowColumn>{record.producer}</TableRowColumn>
					<TableRowColumn>{record.genre}</TableRowColumn>
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
								<TableHeaderColumn>Album Name</TableHeaderColumn>
								<TableHeaderColumn>Band Name Name</TableHeaderColumn>
								<TableHeaderColumn>Recorded Date</TableHeaderColumn>
								<TableHeaderColumn>Release Date</TableHeaderColumn>
								<TableHeaderColumn># of Tracks</TableHeaderColumn>
								<TableHeaderColumn>Label</TableHeaderColumn>
								<TableHeaderColumn>Producer</TableHeaderColumn>
								<TableHeaderColumn>Genre</TableHeaderColumn>
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