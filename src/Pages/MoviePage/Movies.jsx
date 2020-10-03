import React from "react";
import axios from 'axios';
import "./Movies.css";
import "bootstrap/dist/css/bootstrap.min.css";
import API, {plainAxiosInstance, securedAxiosInstance} from '../../_services/axiosService';
import {
    Table,
    Button,
    Container,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";
import {authenticationService, movieService} from "../../_services";

class Movies extends React.Component {
    state = {
        currentUser: null,
        movies: [],
        movie: {
            id: "",
            title: "",
            releaseYear: "",
            casting: [],
            directors: [],
            producers: []
        },
        modalUpdate: false,
        modalCreate: false,
        modalCasting: false,
        modalDirector: false,
        modalProducer: false,
        form: {
            id: "",
            title: "",
            releaseYear: "",
        },
        formPerson: {
            firstName: "",
            lastName: "",
            aliases: ""
        },
        loading: true
    };

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
        movieService.all()
            .then( movies => {
                this.setState({
                    loading: false
                });
                this.setState({movies});
            });
    }

    showModalUpdate = (movie) => {
        this.setState({
            form: movie,
            modalUpdate: true,
        });
    };
    showModalCreate = () => {
        this.setState({
            modalCreate: true,
        });
    };

    showCasting = (movie) => {
        this.setState({
            movie: movie,
            modalCasting: true
        });
    };
    showDirectors = (movie) => {
        this.setState({
            movie: movie,
            modalDirector: true
        });
    };
    showProducers = (movie) => {
        this.setState({
            movie: movie,
            modalProducer: true
        });
    };

    // CRUD for movies operations
    createMovie = () => {
        let movie = { ...this.state.form };
        let movieList = this.state.movies;
        movieService.create(movie)
            .then(_movie => {
                movieList.push(_movie);
                this.setState({ modalCreate: false, movies: movieList });
            });
    };
    editMovie = (movie) => {
        let movies = this.state.movies;
        movieService.update(movie.id, movie)
            .then(_movie => {
                movies[movies.findIndex(x => x.id === movie.id)] = _movie;
                this.setState({ movies: movies, modalUpdate: false });
            })
    };
    deleteMovie = (movie) => {
        let option = window.confirm("Are you sure you want delete it? " + movie.id);
        if (option === true) {
            let movies = this.state.movies;
            movieService._delete(movie.id).then( x => {
                movies.splice(movies.findIndex(x => x.id === movie.id), 1);
                this.setState({movies: movies, modalUpdate: false});
            });
        }
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
                                <th>Title</th>
                                <th>Release Year</th>
                                {
                                    currentUser && <th>Actions</th>
                                }
                            </tr>
                            </thead>

                            <tbody>
                            {this.state.movies.map((dato) => (
                                <tr key={dato.id}>
                                    <td>{dato.id}</td>
                                    <td>{dato.title}</td>
                                    <td>{dato.releaseYear}</td>
                                    { currentUser &&
                                    <td>
                                        <div className="d-flex flex-column">
                                            <Button color="secundary" onClick={() => this.showCasting(dato)}>
                                                Casting
                                            </Button>
                                            <Button color="secundary" onClick={() => this.showDirectors(dato)}>
                                                Directors
                                            </Button>
                                            <Button color="secundary" onClick={() => this.showProducers(dato)}>
                                                Producers
                                            </Button>
                                        </div>
                                    </td>
                                    }
                                    { currentUser &&
                                    <td>
                                        <Button color="primary" onClick={() => this.showModalUpdate(dato)}>
                                            Edit
                                        </Button>{" "}
                                        <Button color="danger" onClick={() => this.deleteMovie(dato)}>
                                            Delete
                                        </Button>
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
                        <div><h3>Edit Movie</h3></div>
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
                            <label>Title:</label>
                            <input
                                className="form-control"
                                name="title"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.title}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Release Year:</label>
                            <input
                                className="form-control"
                                name="releaseYear"
                                type="text"
                                onChange={this.handleChange}
                                value={this.state.form.releaseYear}
                            />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.editMovie(this.state.form)}>
                            Edit
                        </Button>
                        <Button color="danger" onClick={() => this.setState({ modalUpdate: false })}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                {/*Action modal create data*/}
                <Modal isOpen={this.state.modalCreate}>
                    <ModalHeader>
                        <div><h3>Create Movie</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <FormGroup>
                            <label>Title:</label>
                            <input
                                className="form-control"
                                name="title"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>

                        <FormGroup>
                            <label>Release Year:</label>
                            <input
                                className="form-control"
                                name="releaseYear"
                                type="text"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.createMovie()}>
                            Create
                        </Button>
                        <Button className="btn btn-danger" onClick={() => this.setState({modalCreate: false})}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
                {/*Action modal movies as actor/actress data*/}
                <Modal isOpen={this.state.modalCasting}>
                    <ModalHeader>
                        <div><h3>Casting</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Aliases</th>
                                <th>Actions</th>
                            </tr>
                            </thead>

                            <tbody>
                            {this.state.movie.casting.map((person) => (
                                <tr key={ 'casting_' + person.id }>
                                    <td>{ person.id }</td>
                                    <td>{ person.firstName }</td>
                                    <td>{ person.lastName }</td>
                                    <td>{ person.aliases }</td>
                                    { currentUser &&
                                    <td>
                                        <Button className={'mx-1'} color="primary" onClick={() => this.editPersonFromCasting(person)}>Edit</Button>
                                        <Button className={'mx-1'} color="danger" onClick={() => this.deletePersonFromCasting(person)}>Delete</Button>
                                    </td>
                                    }
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.addPersonAsCasting()}>
                            Add person to casting
                        </Button>
                        <Button className="btn btn-danger" onClick={() => this.setState({ modalCasting: false })}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
                {/*Action modal movies as director data*/}
                <Modal isOpen={this.state.modalDirector}>
                    <ModalHeader>
                        <div><h3>Directors</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Aliases</th>
                                { currentUser && <th>Actions</th> }
                            </tr>
                            </thead>

                            <tbody>{this.state.movie.directors.map((person) => (
                                <tr key={ 'director_' + person.id }>
                                    <td>{ person.id }</td>
                                    <td>{ person.firstName }</td>
                                    <td>{ person.lastName }</td>
                                    <td>{ person.aliases }</td>
                                    { currentUser &&
                                    <td>
                                        <Button className={'mx-1'} color="primary" onClick={() => this.editPersonFromDirectors(person)}>Edit</Button>
                                        <Button className={'mx-1'} color="danger" onClick={() => this.deletePersonFromDirectors(person)}>Delete</Button>
                                    </td>
                                    }
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.addPersonAsDirector()}>
                            Add person
                        </Button>
                        <Button className="btn btn-danger" onClick={() => this.setState({ modalDirector: false })}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>
                {/*Action modal movies as producer data*/}
                <Modal isOpen={this.state.modalProducer}>
                    <ModalHeader>
                        <div><h3>Producers</h3></div>
                    </ModalHeader>

                    <ModalBody>
                        <Table>
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Aliases</th>
                                { currentUser && <th>Actions</th> }
                            </tr>
                            </thead>

                            <tbody>{this.state.movie.producers.map((person) => (
                                <tr key={ 'prod_' + person.id }>
                                    <td>{ person.id }</td>
                                    <td>{ person.firstName }</td>
                                    <td>{ person.lastName }</td>
                                    <td>{ person.aliases }</td>
                                    { currentUser &&
                                    <td>
                                        <Button className={'mx-1'} color="primary" onClick={() => this.editPersonFromProducers(person)}>Edit</Button>
                                        <Button className={'mx-1'} color="danger" onClick={() => this.deletePersonFromProducers(person)}>Delete</Button>
                                    </td>
                                    }
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </ModalBody>

                    <ModalFooter>
                        <Button color="primary" onClick={() => this.addPersonAsProducer()}>
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

    addPersonAsCasting() {
        
    }
}

export default Movies;
