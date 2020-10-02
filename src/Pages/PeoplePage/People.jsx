import React from "react";
import {Button, Container, FormGroup, Modal, ModalBody, ModalFooter, ModalHeader, Table} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {plainAxiosInstance, securedAxiosInstance} from "../../_services/axiosService";
import './People.css'
import {authenticationService, peopleService} from "../../_services";

class People extends React.Component{
    state = {
        people: [],
        person: {
            id: "",
            firstName: "",
            lastName: "",
            aliases: "",
            movies_as_actor_or_actress: [],
            movies_as_director: [],
            movies_as_producer: [],
        },
        modalUpdate: false,
        modalCreate: false,
        modalActor: false,
        modalDirector: false,
        modalProducer: false,
        form: {
            id: "",
            firstName: "",
            lastName: "",
            aliases: ""
        },
        formMovie: {
            title: "",
            ReleaseYear: ""
        },
        loading: true
    };

    componentDidMount() {
        authenticationService.currentUser.subscribe( x => this.setState({ currentUser: x }));
        peopleService.all()
            .then( people => {
                this.setState({
                    loading: false
                });
                this.setState({ people });
            });
    }

    showModalUpdate = (person) => {
        this.setState({
            form: person,
            modalUpdate: true,
        });
    };

    showMoviesAsActor(person){
        this.setState({
            person: person,
            modalActor: true
        });
    };

    showMoviesAsDirector(person){
        this.setState({
            person: person,
            modalDirector: true,
        });
    };

    showMoviesAsProducer(person){
        this.setState({
            person: person,
            modalProducer: true,
        })
    };

    showModalCreate = () => {
        this.setState({
            modalCreate: true,
        });
    };

    editPerson = (person) => {
        let index = 0;
        let list = this.state.people;
        list.map((item) => {
            if (person.id === item.id) {
                list[index].firstName = person.firstName;
                list[index].lastName = person.lastName;
                list[index].aliases = person.aliases;
            }
            index++;
        });
        this.setState({ data: list, modalUpdate: false });
    };

    deletePerson = (person) => {
        let option = window.confirm("Are you sure you want delete it? " + person.id);
        if (option === true) {
            let index = 0;
            let _people = this.state.people;
            _people.map((item) => {
                if (person.id === item.id) {
                    _people.splice(index, 1);
                }
                index++;
            });
            this.setState({ people: _people, modalUpdate: false });
        }
    };

    createPerson = () => {
        let person = { ...this.state.form };
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
        const { currentUser } = this.state;
        return (
            <>
                <div className={'mx-2'}>
                    { currentUser &&
                    <div className={'my-1'}>
                        <Button color="success" onClick={() => this.showModalCreate()}>
                            Create
                        </Button>
                    </div>
                    }
                    <div>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Aliases</th>
                                { currentUser && <th>Movies as:</th> }
                                { currentUser && <th>Actions</th> }
                            </tr>
                            </thead>

                            <tbody>
                            {this.state.people.map((dato) => (
                                <tr key={ dato.id }>
                                    <td>{ dato.id }</td>
                                    <td>{ dato.firstName }</td>
                                    <td>{ dato.lastName }</td>
                                    <td>{ dato.aliases }</td>
                                    { currentUser &&
                                    <td>
                                        <div className="d-flex flex-column">
                                            <Button color="secundary" onClick={() => this.showMoviesAsActor(dato)}>
                                                Actor/Actress
                                            </Button>
                                            <Button color="secundary" onClick={() => this.showMoviesAsDirector(dato)}>
                                                Director
                                            </Button>
                                            <Button color="secundary" onClick={() => this.showMoviesAsProducer(dato)}>
                                                Producer
                                            </Button>
                                        </div>
                                    </td>
                                    }

                                    { currentUser &&
                                    <td>
                                        <Button color="primary" onClick={() => this.showModalUpdate(dato)}>Edit</Button>
                                        <Button color="danger" onClick={() => this.deletePerson(dato)}>Delete</Button>
                                    </td>
                                    }

                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                {/*Action modal update data*/}
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
                {/*Action modal create data*/}
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
                {/*Action modal movies as actor/actress data*/}
                <Modal isOpen={this.state.modalActor}>
                    <ModalHeader>
                        <div><h3>Movies as Actor/Actress</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Release Year</th>
                                <th>Actions</th>
                            </tr>
                            </thead>

                            <tbody>{this.state.person.movies_as_actor_or_actress.map((dato) => (
                                <tr key={ 'actor_' + dato.id }>
                                    <td>{ dato.id }</td>
                                    <td>{ dato.title }</td>
                                    <td>{ dato.releaseYear }</td>
                                    <td>
                                        <Button color="primary" onClick={() => this.showModalUpdate(dato)}>Edit</Button>
                                        <Button color="danger" onClick={() => this.deletePerson(dato)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.addMovieAsActor()}>
                            Add movie
                        </Button>
                        <Button className="btn btn-danger" onClick={() => this.setState({ modalActor: false })}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
                {/*Action modal movies as director data*/}
                <Modal isOpen={this.state.modalDirector}>
                    <ModalHeader>
                        <div><h3>Movies as Director</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Release Year</th>
                                <th>Actions</th>
                            </tr>
                            </thead>

                            <tbody>{this.state.person.movies_as_director.map((dato) => (
                                <tr key={ 'director_' + dato.id }>
                                    <td>{ dato.id }</td>
                                    <td>{ dato.title }</td>
                                    <td>{ dato.releaseYear }</td>
                                    <td>
                                        <Button color="primary" onClick={() => this.showModalUpdate(dato)}>Edit</Button>
                                        <Button color="danger" onClick={() => this.deletePerson(dato)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.createPerson()}>
                            Add Movie
                        </Button>
                        <Button className="btn btn-danger" onClick={() => this.setState({ modalDirector: false })}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
                {/*Action modal movies as producer data*/}
                <Modal isOpen={this.state.modalProducer}>
                    <ModalHeader>
                        <div><h3>Movies as Producer</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Release Year</th>
                                <th>Actions</th>
                            </tr>
                            </thead>

                            <tbody>{this.state.person.movies_as_producer.map((dato) => (
                                <tr key={ 'prod_' + dato.id }>
                                    <td>{ dato.id }</td>
                                    <td>{ dato.title }</td>
                                    <td>{ dato.releaseYear }</td>
                                    <td>
                                        <Button color="primary" onClick={() => this.showModalUpdate(dato)}>Edit</Button>
                                        <Button color="danger" onClick={() => this.deletePerson(dato)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.createPerson()}>
                            Create
                        </Button>
                        <Button className="btn btn-danger" onClick={() => this.setState({ modalProducer: false })} >
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default People;