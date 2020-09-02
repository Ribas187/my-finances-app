import React, { useState, useCallback, useRef } from 'react';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { TextInput, Alert } from 'react-native';
import {
  Container,
  Content,
  Title,
  Input,
  CategoryArea,
  CategoryButton,
  CategoryText,
  AddButton,
  AddButtonText,
} from './styles';
import Header from '../../components/Header';
import { useFinances } from '../../hooks/finances';

const AddFinance: React.FC = () => {
  const [selected, setSelected] = useState<'income' | 'outcome'>('income');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('');

  const priceRef = useRef<TextInput>(null);
  const categoryRef = useRef<TextInput>(null);

  const finances = useFinances();
  const { addFinance } = finances;
  const navigation = useNavigation();

  const handleChangeSelected = useCallback(type => {
    if (type === 'income') {
      setSelected('income');
    }
    if (type === 'outcome') {
      setSelected('outcome');
    }
  }, []);

  const hadleAddFinance = useCallback(async () => {
    const formatted = Number(value.replace(',', '.'));

    if (!description || !category || !value) {
      Alert.alert('Erro', 'Preencha todos os campos', [{ text: 'OK' }]);

      return;
    }

    if (!formatted) {
      Alert.alert('Erro', 'Use somente números e pontuações válidas no valor', [
        { text: 'OK' },
      ]);

      return;
    }

    const finance = {
      description,
      value: formatted,
      category,
      type: selected,
      date: new Date().toISOString(),
    };

    await addFinance(finance);
    navigation.navigate('Dashboard');
  }, [addFinance, category, description, selected, value, navigation]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <Container>
      <Header />

      <Content>
        <Title>Cadastro</Title>

        <Input
          placeholder="Descrição"
          value={description}
          onChangeText={e => setDescription(e)}
          onSubmitEditing={() => priceRef.current?.focus()}
          returnKeyType="next"
        />
        <Input
          ref={priceRef}
          placeholder="Valor (R$)"
          keyboardType="numeric"
          value={value}
          onChangeText={e => setValue(e)}
          onSubmitEditing={() => categoryRef.current?.focus()}
          returnKeyType="next"
        />

        <CategoryArea>
          <CategoryButton
            selected={selected === 'income'}
            onPress={() => handleChangeSelected('income')}
          >
            <Feather name="arrow-up-circle" size={30} color="#12A454" />
            <CategoryText>Entrada</CategoryText>
          </CategoryButton>
          <CategoryButton
            selected={selected === 'outcome'}
            onPress={() => handleChangeSelected('outcome')}
          >
            <Feather name="arrow-down-circle" size={30} color="#E83F5B" />
            <CategoryText>Saída</CategoryText>
          </CategoryButton>
        </CategoryArea>

        <Input
          ref={categoryRef}
          placeholder="Categoria"
          value={category}
          onChangeText={e => setCategory(e)}
          returnKeyType="done"
          onSubmitEditing={hadleAddFinance}
        />

        <AddButton onPress={hadleAddFinance}>
          <AddButtonText>Adicionar</AddButtonText>
        </AddButton>

        <AddButton onPress={handleGoBack}>
          <AddButtonText>Cancelar</AddButtonText>
        </AddButton>
      </Content>
    </Container>
  );
};

export default AddFinance;
