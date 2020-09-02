import styled from 'styled-components/native';

interface ICategoryProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 24px;
`;

export const Title = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 25px;
  margin-bottom: 12px;
`;

export const Input = styled.TextInput`
  font-family: 'Poppins_400Regular';
  background: #fff;
  border-radius: 5px;
  height: 50px;
  margin: 12px 0;
  padding: 0 16px;
`;

export const CategoryArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 12px 0;
`;

export const CategoryButton = styled.TouchableOpacity<ICategoryProps>`
  width: 48%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border: 2px solid ${props => (props.selected ? '#ff872c' : '#969cb2')};
  border-radius: 5px;
  padding: 5px 5px;
`;

export const CategoryText = styled.Text`
  font-family: 'Poppins_400Regular';
  font-size: 16px;
`;

export const AddButton = styled.TouchableOpacity`
  margin-top: 12px;

  flex: 1;
  justify-content: center;
  align-items: center;
  background: #ff872c;
  border-radius: 5px;
  height: 50px;
`;

export const AddButtonText = styled.Text`
  font-family: 'Poppins_500Medium';
  font-size: 18px;
  color: #fff;
`;
