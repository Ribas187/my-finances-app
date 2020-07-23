import React, { useState, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
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
    const finance = {
      description,
      value: Number(value),
      category,
      type: selected,
      date: new Date().toISOString(),
    };

    await addFinance(finance);
    navigation.navigate('Dashboard');
  }, [addFinance, category, description, selected, value, navigation]);

  return (
    <Container>
      <Header />

      <Content>
        <Title>Cadastro</Title>

        <Input
          placeholder="Descrição"
          value={description}
          onChangeText={e => setDescription(e)}
        />
        <Input
          placeholder="Preço"
          keyboardType="numeric"
          value={value}
          onChangeText={e => setValue(e)}
        />

        <CategoryArea>
          <CategoryButton
            selected={selected === 'income'}
            onPress={() => handleChangeSelected('income')}
          >
            <Feather name="arrow-up-circle" size={30} color="#12A454" />
            <CategoryText>Income</CategoryText>
          </CategoryButton>
          <CategoryButton
            selected={selected === 'outcome'}
            onPress={() => handleChangeSelected('outcome')}
          >
            <Feather name="arrow-down-circle" size={30} color="#E83F5B" />
            <CategoryText>Outcome</CategoryText>
          </CategoryButton>
        </CategoryArea>

        <Input
          placeholder="Categoria"
          value={category}
          onChangeText={e => setCategory(e)}
        />

        <AddButton onPress={hadleAddFinance}>
          <AddButtonText>Adicionar</AddButtonText>
        </AddButton>
      </Content>
    </Container>
  );
};

export default AddFinance;
