import React, {
	Component
} from 'react';
import {
	Row,
	Col
} from 'reactstrap';
import {
	SortableContainer,
	SortableElement,
	arrayMove
} from 'react-sortable-hoc';

import Project from '../../components/Project';
import projectEditModal from '../../components/Modals/ProjectEditModal';

import {
	loadProjectsSortIndexes,
	updateProjectsSortIndex
} from '../../utils/projects';
import {
	loadProjects
} from '../../api';


const SortableProject = SortableElement(({ project, onEditClick }) => (
	<Col
		xs={6}
		lg={4}
	>
		<Project
			{...project}
			onEditClick={onEditClick}
		/>
	</Col>
));

const SortableProjects = SortableContainer(({ projects, onEditClick }) => {
	return (
		<Row>
			{projects.map((project, index) => (
				<SortableProject
					key={`item-${index}`}
					index={index}
					project={project}
					onEditClick={onEditClick}
				/>
			))}
		</Row>
	);
});

class Projects extends Component {
	state = {
		projects: []
	};

	constructor (props) {
		super(props);

		setTimeout(() => this.processProjects(props.projects), 100);

		setInterval(this.refreshProjects, 20 * 1000);
	};

	refreshProjects = () => {
		loadProjects().then(({ data }) => {
			if (data) {
				this.processProjects(data);
			}
		});
	};

	processProjects = (projects) => {
		projects = loadProjectsSortIndexes(projects);

		projects.sort((a, b) => a.sortIndex - b.sortIndex);

		this.setState({
			projects
		});
	}

	handleSortEnd = ({ oldIndex, newIndex }) => {
		this.setState(({ projects }) => ({
			projects: updateProjectsSortIndex(arrayMove(projects, oldIndex, newIndex)),
		}));
	};

	handleEdit = (id) => {
		const {
			projects
		} = this.state;

		projectEditModal(
			projects.find((project) => project.id === id)
		).then((project) => {
			this.setState({
				projects: projects.map(p => {
					if (p.id === project.id) {
						return project;
					}

					return p;
				})
			});
		});
	}

	render () {
		const {
			projects
		} = this.state;

		return (
			<SortableProjects
				axis="xy"
				projects={projects}
				onSortEnd={this.handleSortEnd}
				onEditClick={this.handleEdit}
			/>
		);
	};
}

export default Projects;
