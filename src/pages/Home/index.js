import React, {useContext, useState} from 'react';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';
import { AuthContext } from '../../contexts/auth';

import {Background, Container, Saldo, Title, Name, List} from './styles';

const Home = () => {
  const [historico, setHistorico] = useState([
    {key: '1', tipo: 'receita', valor: 1200},
    {key: '2', tipo: 'despesa', valor: 120},
    {key: '3', tipo: 'despesa', valor: 12},
    {key: '4', tipo: 'receita', valor: 20.40},
    {key: '5', tipo: 'receita', valor: 20.40},
    {key: '6', tipo: 'despesa', valor: 20.40},
    {key: '7', tipo: 'receita', valor: 20.40},
    {key: '8', tipo: 'receita', valor: 20.40},
  ])

  const { user } = useContext(AuthContext)

  return (
    <Background>
      <Header />
        <Container>
          <Name>{user.nome}</Name>
          <Saldo>R$ 123,00</Saldo>
        </Container>

        <Title>Últimas movimentações</Title>

        <List 
          showsVerticalScrollIndicator={false}
          data={historico}
          KeyExtractor={ item => item.key}
          renderItem={ ({item}) =>  (<HistoricoList data={item} />)}
        />
    </Background>
  )
}

export default Home;