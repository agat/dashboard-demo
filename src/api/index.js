// @flow

import axios from 'axios';

export const loadProjects = () => axios('https://novaweb.studio/dashboard/_api/projects/');

export const saveProject = (project) => {
	return axios.patch(`https://novaweb.studio/dashboard/_api/projects/${project.id}/`, {
		comment: project.comment
	})
};
