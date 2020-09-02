import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { IFinance } from './index';

interface CardProps {
  total?: boolean;
}

interface ValueProps {
  type: 'income' | 'outcome';
}

export const Container = styled.View`
  flex: 1;
`;

export const CardsListContainer = styled.View`
  height: 200px;
`;

export const CardsList = styled.ScrollView.attrs({
  showsHorizontalScrollIndicator: false,
})``;

export const Card = styled.View<CardProps>`
  width: 300px;
  height: 200px;
  background: ${props => (props.total ? '#ff872c' : '#fff')};
  border-radius: 5px;
  margin-left: 24px;
  justify-content: space-between;
`;

export const Title = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 18px 24px 0;
`;

export const TitleText = styled.Text<CardProps>`
  font-family: 'Poppins_400Regular';
  font-size: 16px;
  color: ${props => (!props.total ? '#000' : '#fff')};
`;

export const CardInfo = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 24px;
`;

export const CardInfoValue = styled.Text<CardProps>`
  font-family: 'Poppins_400Regular';
  font-size: ${props => (!props.total ? '30' : '40')}px;
  color: ${props => (!props.total ? '#000' : '#fff')};
`;

export const CardInfoLastValue = styled.Text`
  font-family: 'Poppins_400Regular';
  color: #969cb3;
  font-size: 12px;
`;

export const Content = styled.View`
  flex: 1;
  padding: 20px 24px 0 24px;
`;

export const ListTitle = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const ListTitleText = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 28px;
  margin-bottom: 15px;
`;

export const AddButton = styled.TouchableOpacity``;

export const ListFinances = styled(FlatList as new () => FlatList<IFinance>)``;

export const SpentCard = styled.View`
  background: #fff;
  padding: 24px;
  border-radius: 5px;
  margin: 8px 0;
`;

export const MainArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TitleArea = styled.View``;

export const Description = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 16px;
`;

export const Value = styled.Text<ValueProps>`
  font-family: 'Poppins_400Regular';
  font-size: 20px;
  color: ${props => (props.type === 'income' ? '#12a454' : '#E83F5B')};
  line-height: 30px;
`;

export const RemoveButton = styled.TouchableOpacity``;

export const DateCategoryArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CategoryText = styled.Text`
  font-family: 'Poppins_400Regular';
  margin-left: 10px;
  color: #969cb3;
`;

export const DateText = styled.Text`
  font-family: 'Poppins_400Regular';
  color: #969cb3;
`;
