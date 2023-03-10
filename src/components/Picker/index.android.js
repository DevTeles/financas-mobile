import React from 'react';
import { Picker as RNPickerSelect } from '@react-native-community/picker'
import { PickerView } from './styles';

const Picker = ({ onChange, tipo }) => {
  return (
    <PickerView>
        <RNPickerSelect
          style={{
            width: '100%'
          }}        
          selectedValue={tipo}
          onValueChange={ (valor) => onChange(valor)}
        >
          <RNPickerSelect.Item label="Receita" value="receita" />  
          <RNPickerSelect.Item label="Despesa" value="despesa" />  
        </RNPickerSelect>
    </PickerView>
  )
}

export default Picker;