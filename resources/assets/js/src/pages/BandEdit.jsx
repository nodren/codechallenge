import React from 'react';
import customPropTypes from 'material-ui/utils/customPropTypes';
import { CircularProgress } from 'material-ui/Progress';
import axios from 'axios';
import Text from 'material-ui/Text';
import TextField from 'material-ui/TextField';
import { LabelSwitch } from 'material-ui/Switch';
import Layout from 'material-ui/Layout';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import CheckIcon from 'material-ui/svg-icons/check';
import SaveIcon from 'material-ui/svg-icons/save';
import { green } from 'material-ui/styles/colors';
import { createStyleSheet } from 'jss-theme-reactor';

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

export default class BandEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			record: {},
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
		axios.get(`/api/bands/${this.props.match.params.bandId}`).then((res) => {
			this.setState({
				record: res.data,
			});
		});
	}
	updateValue(column) {
		return (e, checked) => {
			let record = this.state.record;
			if (column == 'still_active') {
				record[column] = checked;
			} else {
				record[column] = e.target.value;
			}
			this.setState({
				record: record,
			});
		}
	}
	submitForm = () => {
		this.setState({
			saving: true,
		});
		axios.put(`/api/bands/${this.props.match.params.bandId}`, this.state.record).then((res) => {
			this.setState({
				record: res.data,
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
								<TextField id="start_date" label="Start Date" value={this.state.record.start_date} onChange={this.updateValue('start_date')} />
								<TextField id="website" label="Website" value={this.state.record.website} onChange={this.updateValue('website')} />
								<LabelSwitch checked={ !!this.state.record.still_active } label="Still Active" onChange={this.updateValue('still_active')} />
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