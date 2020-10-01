import React from "react";
import {Button, Container, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {plainAxiosInstance, securedAxiosInstance} from "../../axiosconfig/api";

class People extends React.Component{
    state = {
        people: [],
        modalUpdate: false,
        modalCreate: false,
        form: {
            id: "",
            firstName: "",
            lastName: "",
            aliases: ""
        },
        loading: true
    };

    componentDidMount() {
        plainAxiosInstance.get(`api/v1/people`).then((res) => {
            this.setState({
                loading: false
            });
            const people = res.data;
            this.setState({ movies });
        });
    }

    showModalUpdate = (movie) => {
        this.setState({
            form: movie,
            modalUpdate: true,
        });
    };

    closeModalUpdate = () => {
        this.setState({ modalUpdate: false });
    };

    showModalCreate = () => {
        this.setState({
            modalCreate: true,
        });
    };

    closeModalCreate = () => {
        this.setState({ modalCreate: false });
    };

    editPerson = (person) => {
        let index = 0;
        let list = this.state.people;
        list.map((item) => {
            if (person.id == item.id) {
                list[index].firstName = people.firstName;
                list[index].lastName = people.lastName;
                list[index].aliases = people.aliases;
            }
            index++;
        });
        this.setState({ data: list, modalUpdate: false });
    };

    deletePerson = (person) => {
        let option = window.confirm("Are you sure you want delete it? " + person.id);
        if (option == true) {
            let index = 0;
            let _people = this.state.people;
            _people.map((item) => {
                if (person.id == item.id) {
                    _people.splice(index, 1);
                }
                index++;
            });
            this.setState({ people: _people, modalUpdate: false });
        }
    };

    createPerson = () => {
        let person = { ...this.state.form };
        person.id = this.state.people.length + 1;
        let peopleList = this.state.people;
        securedAxiosInstance.post("api/v1/people", {
            firstName: person.firstName,
            lastName: person.lastName,
            aliases: person.aliases
        });

        peopleList.push(person);
        this.setState({ modalCreate: false, data: peopleList });
    };

    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    render() {
        return (
            <>
                <Container>
                    <br />
                    <Button color="success" onClick={() => this.showModalCreate()}>
                        Create
                    </Button>
                    <br />
                    <br />

                    <Table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Aliases</th>
                        </tr>
                        </thead>

                        <tbody>
                        {this.state.people.map((dato) => (
                            <tr key={dato.id}>
                                <td>{dato.id}</td>
                                <td>{dato.firstName}</td>
                                <td>{dato.lastName}</td>
                                <td>
                                    <Button
                                        color="primary"
                                        onClick={() => this.showModalUpdate(dato)}
                                    >
                                        Edit
                                    </Button>{" "}
                                    <Button
                                        color="danger"
                                        onClick={() => this.deletePerson(dato)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Container>

                <Modal isOpen={this.state.modalUpdate}>
                    <ModalHeader>
                        <div>
                            <h3>Edit Person</h3>
                        </div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>Id:</label>

                            <input
                                className="form-control"
                                readOnly
                                type="text"
                                value={this.state.form.id}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>First Name:</label>
                            <input
                                className="form-control"
                                name="firstName"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.firstName}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Last Name:</label>
                            <input
                                className="form-control"
                                name="lastName"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.lastName}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Aliases:</label>
                            <input
                                className="form-control"
                                name="lastName"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.aliases}
                            />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={() => this.editPerson(this.state.form)}
                        >
                            Edit
                        </Button>
                        <Button color="danger" onClick={() => this.closeModalUpdate()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalCreate}>
                    <ModalHeader>
                        <div>
                            <h3>Create Person</h3>
                        </div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>First Name:</label>
                            <input
                                className="form-control"
                                name="firstName"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Last Name:</label>
                            <input
                                className="form-control"
                                name="lastName"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Aliases:</label>
                            <input
                                className="form-control"
                                name="aliases"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.createPerson()}>
                            Create
                        </Button>
                        <Button
                            className="btn btn-danger"
                            onClick={() => this.closeModalCreate()}
                        >
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default People;