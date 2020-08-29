import React, { useMemo } from 'react';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { Container, Content, LogoImg, DateText, Complement } from './styles';

import logo from '../../assets/Logo.png';

interface Props {
  isBigger?: boolean;
}

const Header: React.FC<Props> = props => {
  const { isBigger } = props;

  const dateFormatted = useMemo(() => {
    return format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  }, []);

  return (
    <Container>
      <Content>
        <LogoImg resizeMode="contain" source={logo} />
        <DateText>{dateFormatted}</DateText>
      </Content>

      {isBigger && <Complement />}
    </Container>
  );
};

export default Header;
