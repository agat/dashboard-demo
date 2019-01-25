const storageProjectsIndexesKey = 'projectsSortIndexes';

export const loadProjectsSortIndexes = (projects) => {
	const projectsSortIndexes = JSON.parse(localStorage.getItem(storageProjectsIndexesKey));

	if (projectsSortIndexes) {
		return projects.map((project, index) => {
			const id = project.id;
			const sortIndex = projectsSortIndexes.indexOf(id);

			if (sortIndex !== -1) {
				return ({
					...project,
					sortIndex
				});
			}

			return ({
				...project,
				sortIndex: index
			});
		});
	}

	return projects
};

export const updateProjectsSortIndex = (projects) => {
	const updatedProjects = projects.map((project, sortIndex) => {
		return ({
			...project,
			sortIndex
		});
	});

	saveProjectsSortIndexes(updatedProjects);

	return updatedProjects;
};

export const saveProjectsSortIndexes = (projects) => {
	const projectsSortIndexes = projects.map((project) => project.id);

	localStorage.setItem(storageProjectsIndexesKey, JSON.stringify(projectsSortIndexes));
};
