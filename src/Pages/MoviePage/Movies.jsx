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

    closeModalUpdate = () => {
        this.setState({modalUpdate: false});
    };

    showModalCreate = () => {
        this.setState({
            modalCreate: true,
        });
    };

    closeModalCreate = () => {
        this.setState({modalCreate: false});
    };

    editMovie = (movie) => {
        let index = 0;
        let list = this.state.movies;
        list.map((item) => {
            if (movie.id === item.id) {
                list[index].title = movie.title;
                list[index].releaseYear = movie.releaseYear;
            }
            index++;
        });
        this.setState({data: list, modalUpdate: false});
    };

    deleteMovie = (movie) => {
        let opcion = window.confirm("Are you sure you want delete it? " + movie.id);
        if (opcion === true) {
            let index = 0;
            let tmpMovies = this.state.movies;
            tmpMovies.map((item) => {
                if (movie.id === item.id) {
                    tmpMovies.splice(index, 1);
                }
                index++;
            });
            this.setState({movies: tmpMovies, modalUpdate: false});
        }
    };

    createMovie = () => {
        let movie = {...this.state.form};
        movie.id = this.state.movies.length + 1;
        let movieList = this.state.movies;
        securedAxiosInstance.post("api/v1/movies", {
            title: movie.title,
            releaseYear: movie.releaseYear,
        });

        movieList.push(movie);
        this.setState({modalCreate: false, data: movieList});
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

                <Modal isOpen={this.state.modalUpdate}>
                    <ModalHeader>
                        <div>
                            <h3>Edit Movie</h3>
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
                        <Button
                            color="primary"
                            onClick={() => this.editMovie(this.state.form)}
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
                            <h3>Create Movie</h3>
                        </div>
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

export default Movies;
