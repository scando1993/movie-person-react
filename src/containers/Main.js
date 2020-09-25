import React from "react";
import logo from "../logo.svg";
import axios from 'axios';
import "./Main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import API, { plainAxiosInstance, securedAxiosInstance } from '../axiosconfig/api';
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

class App extends React.Component {
  state = {
    movies: [],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      title: "",
      releaseYear: "",
    },
  };

  componentDidMount() {
    securedAxiosInstance.get(`api/v1/movies`)
      .then(res => {
        const movies = res.data;
        console.log(movies)
        this.setState({ movies });
      })
  }

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.movies;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].personaje = dato.personaje;
        arreglo[contador].anime = dato.anime;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Are you sure you want delete it? "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.movies;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.movies.length+1;
    var lista= this.state.movies;
    securedAxiosInstance.post('api/v1/movies', {
      title: valorNuevo.title,
      releaseYear: valorNuevo.releaseYear
    });
    
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

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
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Create</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Release Year</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {this.state.movies.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.title}</td>
                  <td>{dato.releaseYear}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Edit
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Edit Movie</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Title: 
              </label>
              <input
                className="form-control"
                name="title"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.title}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Release Year: 
              </label>
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
              onClick={() => this.editar(this.state.form)}
            >
              Edit
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Create Movie</h3></div>
          </ModalHeader>

          <ModalBody>            
            <FormGroup>
              <label>
                Title: 
              </label>
              <input
                className="form-control"
                name="title"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Release Year: 
              </label>
              <input
                className="form-control"
                name="releaseYear"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Create
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
