import React, { useMemo, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { View, ActivityIndicator } from 'react-native';
import { parseISO } from 'date-fns/esm/fp';
import {
  Container,
  Content,
  CardsListContainer,
  CardsList,
  Card,
  Title,
  TitleText,
  CardInfo,
  CardInfoValue,
  // CardInfoLastValue,
  ListTitle,
  ListTitleText,
  AddButton,
  ListFinances,
  SpentCard,
  MainArea,
  TitleArea,
  RemoveButton,
  Description,
  Value,
  DateCategoryArea,
  Category,
  CategoryText,
  DateText,
} from './styles';
import Header from '../../components/Header';
import { useFinances } from '../../hooks/finances';
import formatValue from '../../utils/formatValue';

export interface IFinance {
  id: number;
  value: number;
  type: 'income' | 'outcome';
  date: string;
  description: string;
  category: string;
  formattedValue: string;
  formattedDate: string;
}

const Dashboard: React.FC = () => {
  const finance = useFinances();
  const navigation = useNavigation();

  const { total, income, outcome, finances, loading, removeFinance } = finance;

  const totalFormatted = useMemo(() => {
    return formatValue(total);
  }, [total]);
  const incomeFormatted = useMemo(() => {
    return {
      value: formatValue(income),
    };
  }, [income]);
  const outcomeFormatted = useMemo(() => {
    return {
      value: formatValue(outcome),
    };
  }, [outcome]);

  const financesFormatted = useMemo((): IFinance[] => {
    return finances
      .map(spent => {
        const formattedValue = formatValue(spent.value);
        const formattedDate = format(
          parseISO(spent.date),
          "dd/MM/yyyy 'às' HH:mm",
          {
            locale: ptBR,
          },
        );

        return {
          ...spent,
          formattedValue,
          formattedDate,
        };
      })
      .reverse();
  }, [finances]);

  const handleGoToAddPage = useCallback(() => {
    navigation.navigate('AddFinance');
  }, [navigation]);

  return (
    <Container>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <Header isBigger />

          <CardsListContainer>
            <CardsList horizontal>
              <Card>
                <Title>
                  <TitleText>Entradas</TitleText>
                  <Feather name="arrow-up-circle" size={34} color="#12A454" />
                </Title>

                <CardInfo>
                  <CardInfoValue>{incomeFormatted.value}</CardInfoValue>
                </CardInfo>
              </Card>
              <Card>
                <Title>
                  <TitleText>Saídas</TitleText>
                  <Feather name="arrow-down-circle" size={34} color="#E83F5B" />
                </Title>

                <CardInfo>
                  <CardInfoValue>{outcomeFormatted.value}</CardInfoValue>
                </CardInfo>
              </Card>
              <Card total style={{ marginRight: 24 }}>
                <Title>
                  <TitleText total>Total</TitleText>
                  <Feather name="dollar-sign" size={34} color="#FFF" />
                </Title>

                <CardInfo>
                  <CardInfoValue total>{totalFormatted}</CardInfoValue>
                </CardInfo>
              </Card>
            </CardsList>
          </CardsListContainer>
          <Content>
            <ListTitle>
              <ListTitleText>Listagem</ListTitleText>
              <AddButton onPress={handleGoToAddPage}>
                <Feather name="plus" size={25} color="#666" />
              </AddButton>
            </ListTitle>

            <ListFinances
              showsVerticalScrollIndicator={false}
              data={financesFormatted}
              keyExtractor={e => String(e.id)}
              renderItem={({ item }) => (
                <SpentCard>
                  <MainArea>
                    <TitleArea>
                      <Description>{item.description}</Description>
                      <Value type={item.type}>{item.formattedValue}</Value>
                    </TitleArea>
                    <RemoveButton onPress={() => removeFinance(item.id)}>
                      <Feather name="trash-2" size={24} color="#E83F5B" />
                    </RemoveButton>
                  </MainArea>
                  <DateCategoryArea>
                    <Category>
                      <Feather name="info" size={20} color="#969cb3" />
                      <CategoryText>{item.category}</CategoryText>
                    </Category>
                    <DateText>{item.formattedDate}</DateText>
                  </DateCategoryArea>
                </SpentCard>
              )}
            />
          </Content>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
