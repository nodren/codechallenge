import React from 'react';
import customPropTypes from 'material-ui/utils/customPropTypes';
import { CircularProgress } from 'material-ui/Progress';
import axios from 'axios';
import Text from 'material-ui/Text';
import TextField from 'material-ui/TextField';
import {Input, InputLabel } from 'material-ui/Input';
import FormControl from 'material-ui/Form/FormControl';
import Layout from 'material-ui/Layout';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import CheckIcon from 'material-ui/svg-icons/check';
import SaveIcon from 'material-ui/svg-icons/save';
import { green } from 'material-ui/styles/colors';
import { createStyleSheet } from 'jss-theme-reactor';
import {orderBy} from 'lodash';

const styleSheet = createStyleSheet('CircularFab', () => ({
	successButton: {
		backgroundColor: green[500],
		'&:hover': {
			backgroundColor: green[700],
		},
	},
	progress: {
		color: green[500],
		position: 'absolute',
		top: -2,
		left: -2,
	},
}));

export default class AlbumEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			record: {},
			bands: [],
			saving: false,
			saved: false,
		}
	}
	static contextTypes = {
		styleManager: customPropTypes.muiRequired,
	};
	static propTypes = {
		match: React.PropTypes.object.isRequired,
		history: React.PropTypes.object.isRequired,
	};
	componentDidMount() {
		axios.get(`/api/albums/${this.props.match.params.albumId}`).then((res) => {
			this.setState({
				record: res.data,
			});
		});
		axios.get('/api/bands').then((res) => {
			this.setState({
				bands: orderBy(res.data, 'name', 'asc'),
			});
		});
	}
	updateValue(column) {
		return (e) => {
			let record = this.state.record;
			record[column] = e.target.value;
			this.setState({
				record: record,
			});
		}
	}
	submitForm = () => {
		this.setState({
			saving: true,
		});
		axios.put(`/api/albums/${this.props.match.params.albumId}`, this.state.record).then((res) => {
			this.setState({
				// record: res.data,
				saved: true,
				saving: false,
			});
			setTimeout(() => {
				this.setState({
					saved: false,
				});
			}, 3000)
		});
	};
	render() {
		const classes = this.context.styleManager.render(styleSheet);
		return (
			<div>
				{ !this.state.record.id ?
					<Layout container direction="row" justify="center" align="center" style={ {height: '300px'} }>
						<CircularProgress size={100}/>
					</Layout>
					:
					<Layout container direction="row" justify="flex-start" align="flex-start" style={ {margin: '25px'} }>
						<Layout item xs={6}>
							<Paper style={ {maxWidth: '500px', padding: '25px'} }>
								<Text type="headline">Edit {this.state.record.name}</Text>
								<TextField id="name" label="Name" value={this.state.record.name} onChange={this.updateValue('name')} required={true}/>
								<FormControl id="band_id">
									<InputLabel>Band</InputLabel>
									<Input component="select" type="select" value={this.state.record.band_id} onChange={this.updateValue('band_id')} >
										<option>Select</option>
										{ this.state.bands.map((band) => {
											return <option key={`band_select_${band.id}`} value={band.id}>{band.name}</option>
										})}
									</Input>
								</FormControl>
								<TextField id="recorded_date" label="Recorded Date" value={this.state.record.recorded_date} onChange={this.updateValue('recorded_date')} />
								<TextField id="release_date" label="Release Date" value={this.state.record.release_date} onChange={this.updateValue('release_date')} />
								<TextField id="number_of_tracks" label="# of Tracks" value={this.state.record.number_of_tracks} onChange={this.updateValue('number_of_tracks')} />
								<TextField id="label" label="Label" value={this.state.record.label} onChange={this.updateValue('label')} />
								<TextField id="producer" label="Producer" value={this.state.record.producer} onChange={this.updateValue('producer')} />
								<TextField id="genre" label="Genre" value={this.state.record.genre} onChange={this.updateValue('genre')} />
								<Layout container direction="row" justify="flex-end">
									<div style={ {position:'relative'} }>
										<Button fab primary onClick={this.submitForm} className={ this.state.saved ? classes.successButton : '' }>
											{this.state.saved ? <CheckIcon/> : <SaveIcon/> }
										</Button>
										{ this.state.saving && <CircularProgress size={60} className={classes.progress} />}
									</div>
								</Layout>
							</Paper>
						</Layout>
					</Layout>
				}
			</div>
		)
	}
}