import React, {useContext, useEffect, useState} from 'react';
import { format, isBefore, isPast } from 'date-fns';
import firebase from '../../services/firebaseConnection';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';
import { AuthContext } from '../../contexts/auth';

import {Background, Container, Saldo, Title, Name, List, Area} from './styles';
import { Alert, Platform, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons'
import DatePicker from '../../components/DatePicker'

const Home = () => {
  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);

  const { user } = useContext(AuthContext)
  const uid = user && user.uid;

  const [newDate, setNewDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });

      try {
        await firebase.database().ref('historico')
        .child(uid)
        .orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy'))
        .limitToLast(10).on('value', (snapshot) => {
          setHistorico([]);

          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.'),
              date: childItem.val().date,
            };
            setHistorico(oldArray => [...oldArray, list].reverse());
          })
        })
      } catch (error) {
        console.log('Error:', error)
      }

    }

    loadList()
  }, [newDate])

  function handleDelete(data) {
    //Pegando a data do item:
    const [diaItem, mesItem, anoItem] = data.date.split('/');
    const dateItem = new Date(`${anoItem}/${mesItem}/${diaItem}`);

    //Pegando data hoje:
    const formatDiaHoje = format(new Date(), 'dd/MM/yyyy');
    const [diaHoje, mesHoje, AnoHoje] = formatDiaHoje.split('/');
    const dateHoje = new Date(`${AnoHoje}/${mesHoje}/${diaHoje}`);

    console.log(dateHoje)

    if (isBefore(dateItem, dateHoje)) {
      // Se a data do registro já passou vai entrar aqui!
      alert('Você não pode excluir um registro antigo!')
      return;
    }

    Alert.alert(
      'Cuidado Atenção',
      `Você deseja excluir ${data.tipo} - Valor: ${data.valor}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleDeleteSuccess(data)
        }
      ]
    )
  }

  async function handleDeleteSuccess(data) {
    await firebase.database().ref('historico')
    .child(uid).child(data.key).remove()
    .then( async () => {
      let saldoAtual = saldo;
      data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor) : saldoAtual -= parseFloat(data.valor);

      await firebase.database().ref('users').child(uid)
      .child('saldo').set(saldoAtual);
    })
    .catch((error) => {
      console.log(error)
    })
  }

  function handleShowPicker() {
    setShow(true)
  }

  function handleClose() {
    setShow(false)
  }

  function onChange(date) {
    setShow(Platform.OS === 'ios');
    setNewDate(date);
    console.log(date)
  }

  return (
    <Background>
      <Header />
        <Container>
          <Name>{user && user.nome}</Name>
          <Saldo>R$ {saldo.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}</Saldo>
        </Container>

        <Area>
          <TouchableOpacity onPress={handleShowPicker}>
            <Icon name="event" color="#FFF" size={30} />
          </TouchableOpacity>
          <Title>Últimas movimentações</Title>
        </Area>

        <List 
          showsVerticalScrollIndicator={false}
          data={historico}
          KeyExtractor={ item => item.key}
          renderItem={ ({item}) =>  (<HistoricoList data={item} deleteItem={handleDelete} />)}
        />

        {show && (
          <DatePicker  
            onClose={handleClose}
            date={newDate}
            onChange={onChange}
          />
        )}
    </Background>
  )
}

export default Home;