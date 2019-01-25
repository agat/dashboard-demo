import React, {
	Component
} from 'react';
import Async from 'react-async';
import {
	Container,
	Spinner
} from 'reactstrap';

import Projects from '../../components/Projects';

import {
	loadProjects
} from '../../api';


class Dashboard extends Component {
	render () {
		return (
			<Container>
				<Async
					promiseFn={loadProjects}
				>
					{({ data, error, isLoading }) => {
						if (isLoading) {
							return <Spinner />;
						}

						if (data) {
							return (
								<Projects
									projects={data.data}
								/>
							);
						}
					}}
				</Async>
			</Container>
		);
	}
}

export default Dashboard;
