import React from "react";
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  Container,
  TitleBody,
  Title,
  Body,
  BodyIOS,
  ContainerAndroid,
  TitleAndroid,
  ContainerIOS
} from './styles';

type Props = {
  title: string;
  onChange: any;
  date: Date;
  datePicker: boolean;
  openDatePicker: any;
}

function DatePicker({ title, onChange, date, datePicker, openDatePicker }: Props) {

  function formatDate(inputDate: Date) {
    let date, month, year;

    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();

    date = date
      .toString()
      .padStart(2, '0');

    month = month
      .toString()
      .padStart(2, '0');

    return `${date}/${month}/${year}`;
  }

  return (
    <Container>
      <TitleBody>
        <Title>{title}</Title>
      </TitleBody>
      {Platform.OS === 'ios' ? (
        <BodyIOS onPress={openDatePicker}>
          <ContainerIOS>
            <Icon name='calendar-outline' size={24} color='#676F85' />
            <DateTimePicker
              is24Hour={true}
              value={date}
              mode={'date'}
              onChange={onChange}
              locale='pt-BR'
            />

          </ContainerIOS>
        </BodyIOS>
      ) : (
        <Body onPress={openDatePicker}>
          <ContainerAndroid>
            {datePicker &&
              <DateTimePicker
                is24Hour={true}
                value={date}
                mode={'date'}
                onChange={onChange}
                locale='pt-BR'
              />
            }
            <TitleAndroid>{formatDate(date)}</TitleAndroid>
            <Icon name='calendar-outline' size={24} color='#676F85' />
          </ContainerAndroid>
        </Body>
      )}
    </Container>
  );
}

export default DatePicker;