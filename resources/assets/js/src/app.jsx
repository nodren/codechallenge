import React from 'react';
import ReactDOM from 'react-dom';
import Base from 'src/Base';
import { BrowserRouter } from 'react-router-dom';

import axios from 'axios';

axios.defaults.headers.common = {
	'X-CSRF-TOKEN': window.Laravel.csrfToken,
	'X-Requested-With': 'XMLHttpRequest'
};


setImmediate(() => {
	ReactDOM.render((
		<BrowserRouter>
			<Base />
		</BrowserRouter>
	), document.getElementById('app'));
});