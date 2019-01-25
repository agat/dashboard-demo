import React, {
    Component
} from 'react';
import {
    confirmable,
    createConfirmation
} from 'react-confirm';
import {
	Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Spinner
} from 'reactstrap';

import {
	saveProject
} from '../../../api/';

class ModalComponent extends Component {
    state = {
        isProcessing: false
    };

    commentInput = React.createRef();

    handleSubmit = (ev) => {
        const {
            options,
            proceed
        } = this.props;

        ev.preventDefault();

        const project = options.project;

        project.comment = this.commentInput.current.value;

        this.setState({
            isProcessing: true
        });

        saveProject(project).then(result => {
            if (result.status === 200) {
                proceed(result.data);
            }

            this.setState({
                isProcessing: false
            });
        });
    }

    render () {
        const {
            show,
            options,
            dismiss
        } = this.props;
        const {
            isProcessing
        } = this.state;
        const project = options.project;

        console.log('project', options.project);

        return (
            <Modal
                isOpen={show}
                toggle={dismiss}
            >
                <Form
                    onSubmit={this.handleSubmit}
                >
                    <ModalHeader
                        toggle={dismiss}
                    >
                        Edit {project.title}
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label
                                for="comment"
                            >
                                Comment
                            </Label>
                            <Input
                                type="textarea"
                                name="comment"
                                id="comment"
                                defaultValue={project.comment}
                                autoFocus
                                innerRef={this.commentInput}
                            />
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        {isProcessing &&
                            <Spinner />
                        }
                        {!isProcessing &&
                            <Button
                                color="primary"
                                type="submit"
                            >
                                Save
                            </Button>
                        }
                    </ModalFooter>
                </Form>
            </Modal>
        );
    }
}

// props.proceed

const ConfirmableModal = (props) => (
    <ModalComponent
        {...props}
    />
);

const confirm = createConfirmation(
    confirmable(ConfirmableModal)
);

export default (project) => confirm({
    options: {
        project
    }
});
