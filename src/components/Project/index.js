import React, {
	Component
} from 'react';
import {
	Card,
	CardHeader,
	CardText,
	CardBody,
  	CardFooter,
	CardSubtitle,
	Button
} from 'reactstrap';

import styles from './Project.module.css';


class Project extends Component {
	handleEditClick = () => {
		const {
			id,
			onEditClick
		} = this.props;

		onEditClick && onEditClick(id);
	};

	render () {
		const {
			title,
			comment,
			result,
			type,
			last_check
		} = this.props;
		let cardProps = {};
		let isErorr = false;
		let status = <span className="text-success">Ok</span>;

		if (type === 'website') {
			if (typeof result == 'string') {
				status = (
					<span className="text-danger">
						{`Error - ${result}`}
					</span>
				);

				isErorr = true;
			}
		} else {
			if (!result) {
				status = (
					<span className="text-danger">
						Error
					</span>
				);

				isErorr = true;
			}
		}

		if (isErorr) {
			cardProps = {
				...cardProps,
				outline: true,
				color: 'danger'
			};
		}

		return (
            <Card
				 className={styles.card}
				 {...cardProps}
			>
				<CardHeader>
					{title}
				</CardHeader>
				<CardBody
					className={styles.body}
				>
					<CardSubtitle>
						<strong>{type}</strong>: {status}
					</CardSubtitle>
					<CardText
						className={styles.description}
					>
						{comment}
					</CardText>
					<CardText>
						<Button
							outline
							color="secondary"
							size="sm"
							onClick={this.handleEditClick}
						>
							Edit
						</Button>
          			</CardText>
					<CardText>
            			<small className="text-muted">
							Last updated: {new Date(last_check).toUTCString()}
						</small>
          			</CardText>
				</CardBody>
            </Card>
        );
	}
}

export default Project;
