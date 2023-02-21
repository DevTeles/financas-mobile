import React from 'react';
import Icon from 'react-native-vector-icons/Feather'

import { Container, Tipo, IconView, TipoText, ValorText } from './styles';

const HistoricoList = ({ data }) => {
  return (
    <Container>
        <Tipo>
            <IconView tipo={data.tipo}>
                <Icon 
                 name={data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up'}
                 color="#FFF"
                 size={20}
                />
                <TipoText>receita</TipoText>
            </IconView>
        </Tipo>
        <ValorText>R$ {data.valor}</ValorText>
    </Container>
  )
}

export default HistoricoList;