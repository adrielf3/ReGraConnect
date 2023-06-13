import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import styles, { Container, TitleBody, Title } from './styles';

type Props = {
  search: boolean;
  title: string;
  onChange: any;
  data: Array<{}>;
  value: number | null;
}

function DropDown({ search, title, onChange, data, value }: Props) {

  const [isFocus, setIsFocus] = useState(false);

  return (
    <Container>
      <TitleBody>
        <Title>{title}</Title>
      </TitleBody>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={search}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Selecione um item' : '...'}
        searchPlaceholder="Pesquisar..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={onChange}
      />
    </Container>
  );
};

export default DropDown;