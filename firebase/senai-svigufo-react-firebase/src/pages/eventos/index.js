import React, { Component } from 'react';
import firebase from '../../services/firebaseConfig';

export default class EventosIndex extends Component {
    constructor() {
        super();

        this.state = {
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

    render() {
        return (
            <div>
                <h3>Eventos - Index</h3>
                <ul>
                    {
                        this.state.listaEventos.map((evento) => {
                            return (
                                <li key={evento.id}>
                                    {evento.id} - {evento.titulo} - {evento.descricao} - {evento.data} - {evento.AcessoLivre} - {evento.Ativo}
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}