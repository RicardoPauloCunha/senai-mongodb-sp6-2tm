import React, { Component } from 'react';
import firebase from '../../services/firebaseConfig';

import '../../assents/css/evento.css';
import { parse } from 'url';

export default class EventosIndex extends Component {
    constructor() {
        super();

        this.state = {
            idEvento: "",
            titulo: "",
            descricao: "",
            data: "",
            hora: "",
            acessoLivre: false,
            ativo: false,
            listaEventos: []
        }
    }

    _listarEventosRealTime() {
        firebase.firestore().collection("Eventos")
            .where("Ativo", "==", true)
            .onSnapshot((eventos) => {
                let eventosArray = [];
                // Percorre os eventos retornado em um arry
                eventos.forEach((evento) => {
                    // Preenche a lista de array
                    eventosArray.push({
                        id: evento.id,
                        titulo: evento.data().Titulo,
                        descricao: evento.data().Descricao,
                        data: evento.data().Data.toDate().toLocaleString('pt-br'),
                        acessoLivre: evento.data().AcessoLivre,
                        ativo: evento.data().Ativo
                    })
                })
                this.setState({ listaEventos: eventosArray });
            })
    }

    componentDidMount() {
        this._listarEventos();
        this._listarEventosRealTime();
    }

    _listarEventos() {
        firebase.firestore().collection("Eventos")
            .where("Ativo", "==", true)
            .get()
            .then(resposta => {
                // console.log(resposta)
                let eventosArray = [];
                // Percorre os eventos retornado em um arry
                resposta.forEach((evento) => {
                    // Preenche a lista de array
                    eventosArray.push({
                        id: evento.id,
                        titulo: evento.data().Titulo,
                        descricao: evento.data().Descricao,
                        data: evento.data().Data.toDate().toLocaleString('pt-br'),
                        acessoLivre: evento.data().AcessoLivre,
                        ativo: evento.data().Ativo
                    })
                })
                this.setState({ listaEventos: eventosArray });
            })
            .catch(erro => { console.log(erro) })
    }

    _atualizaEstado(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    _cadastrarEvento(event) {
        event.preventDefault();

        firebase.firestore().collection("Eventos").add({
            Titulo: this.state.titulo,
            Descricao: this.state.descricao,
            Data: firebase.firestore.Timestamp.fromDate(new Date(this.state.data + " " + this.state.hora)),
            AcessoLivre: Boolean(this.state.acessoLivre),
            Ativo: Boolean(this.state.ativo),
        })
            .then(resultado => {
                alert("Cadastrado com sucesso")
            })
            .catch(erro => {
                console.log(erro)
            })
    }

    _buscarPorId(event) {
        event.preventDefault();

        firebase.firestore().collection("Eventos")
            .doc(event.target.id)
            .get()
            .then((evento) => {
                this.setState({
                    idEvento: evento.id,
                    titulo: evento.data().titulo,
                    descricao: evento.data().descricao,
                    ativo: Boolean(evento.data().ativo),
                    acessoLivre: Boolean(evento.data().acessoLivre),
                    // data: evento.data().data.toDate().toISOString().split("T")[0],
                    // hora: evento.data().data.toDate().toTimeString().slice(0, 5)
                })
            })
    }

    _limparFormulario() {
        this.setState({
            idEvento: 0,
            titulo: "",
            descricao: "",
            acessoLivre: true,
            ativo: true,
            data: "",
            hora: ""
        })
    }

    _deletarEvento(event) {
        if(window.confirm("Excluir")){
            firebase.firestore().collection("Eventos")
            .doc(event.target.id)
            .delete()
            .then(function () {
                console.log("Deletado")
            })
            .catch(function (error) {
                console.log("erro" + error)
            })
        }
    }

    _deletarTodosEvento(event) {
        this.state.listaEventos.forEach(element => {
            firebase.firestore().collection("Eventos")
                .doc(element.id)
                .delete()
                .then(function () {
                    console.log(`${element.titulo} Deletados`)
                })
        });
    }

    render() {
        return (
            <div className="main">
                <div className="conteudo">
                    <h3 className="titulo">Lista Eventos</h3>
                    <ul className="lista">
                        {
                            this.state.listaEventos.map((evento, key) => {
                                return (
                                    <li key={evento.id}>
                                        {evento.id} - {evento.titulo} - {evento.descricao} - {evento.acessoLivre.toString()}}
                                        <button id={evento.id} onClick={this._buscarPorId.bind(this)}>Editar</button>
                                        <button id={evento.id} onClick={this._deletarEvento.bind(this)}>deletar</button>
                                    </li>
                                )
                            })
                        }
                    </ul>
                    <button onClick={this._deletarTodosEvento.bind(this)}>deletar todos</button>
                </div>
                <div className="conteudo">
                    <h3 className="titulo">Cadastrar Eventos</h3>
                    <form className="form" onSubmit={this._cadastrarEvento.bind(this)}>
                        <input
                            name="titulo"
                            className="input"
                            type="text"
                            placeholder="Titulo"
                            value={this.state.titulo}
                            onChange={this._atualizaEstado.bind(this)}
                        />
                        <input
                            name="descricao"
                            className="input"
                            type="text"
                            placeholder="Descricao"
                            value={this.state.descricao}
                            onChange={this._atualizaEstado.bind(this)}
                        />
                        <input
                            name="data"
                            className="input"
                            type="date"
                            placeholder="Data"
                            value={this.state.data}
                            onChange={this._atualizaEstado.bind(this)}
                        />
                        <input
                            name="hora"
                            className="input"
                            type="time"
                            placeholder="Hora"
                            value={this.state.hora}
                            onChange={this._atualizaEstado.bind(this)}
                        />
                        <div>
                            <label>Ativo</label>
                            <input
                                name="ativo"
                                type="checkbox"
                                placeholder="Ativo"
                                value={this.state.ativo}
                                onChange={this._atualizaEstado.bind(this)}
                            />
                            <label>AcessoLivre</label>
                            <input
                                name="AcessoLivre"
                                type="checkbox"
                                placeholder="AcessoLivre"
                                value={this.state.acessoLivre}
                                onChange={this._atualizaEstado.bind(this)}
                            ></input>
                        </div>
                        <button type="submit">Cadastrar</button>
                    </form>
                </div>
            </div>
        )
    }
}