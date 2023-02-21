import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import Header from '../../components/Header';
import { AuthContext } from '../../contexts/auth';

import { Container, Name, NewLink, NewText, Logout, LogoutText } from './styles';

const Profile = () => {
  const { user, signOut } = useContext(AuthContext)
  const navigation = useNavigation();

  return (
    <Container>
      <Header />
      <Name>
        {user && user.nome}
      </Name>
      <NewLink onPress={() => navigation.navigate('Registrar')}>
        <NewText>Registrar gastos</NewText>
      </NewLink>

      <Logout onPress={() => signOut()}>
        <LogoutText>Sair</LogoutText>
      </Logout>
    </Container>
  )
}

export default Profile;