import React from 'react';
import { FinancesProvider } from './finances';

const AppProvider: React.FC = ({ children }) => (
  <FinancesProvider>{children}</FinancesProvider>
);

export default AppProvider;
