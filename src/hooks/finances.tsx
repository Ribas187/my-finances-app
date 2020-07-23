import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { parseISO } from 'date-fns';

interface IFinance {
  id: number;
  value: number;
  type: 'income' | 'outcome';
  date: string;
  description: string;
  category: string;
}

interface FinancesContextData {
  finances: IFinance[];
  loading: boolean;
  addFinance(finance: Omit<IFinance, 'id'>): Promise<IFinance[]>;
  removeFinance(id: number): Promise<IFinance[]>;
  removeAll(): Promise<IFinance[]>;
  total: number;
  income: number;
  outcome: number;
}

const FinancesContext = createContext<FinancesContextData>(
  {} as FinancesContextData,
);

export const FinancesProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<IFinance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const financesData = await AsyncStorage.getItem('@financesApp:finances');

      if (financesData) {
        setData(JSON.parse(financesData));
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const addFinance = useCallback(
    async (finance: Omit<IFinance, 'id'>) => {
      let newData = [] as IFinance[];
      const id = parseISO(finance.date).getTime();

      if (finance.type === 'outcome') {
        const value = finance.value * -1;
        newData = [
          ...data,
          {
            ...finance,
            id,
            value,
          },
        ];
      } else {
        newData = [
          ...data,
          {
            ...finance,
            id,
          },
        ];
      }

      await AsyncStorage.setItem(
        '@financesApp:finances',
        JSON.stringify(newData),
      );

      setData(newData);

      return data;
    },
    [data],
  );

  const removeFinance = useCallback(
    async (id: number) => {
      const newData = data.filter(finance => finance.id !== id);

      await AsyncStorage.setItem(
        '@financesApp:finances',
        JSON.stringify(newData),
      );

      setData(newData);

      return data;
    },
    [data],
  );

  const removeAll = useCallback(async () => {
    await AsyncStorage.setItem('@financesApp:finances', JSON.stringify([]));

    setData([]);

    return data;
  }, [data]);

  const total = useMemo(() => {
    const totalValue = data.reduce((sum, finance) => {
      const sumTotal = sum + finance.value;
      return sumTotal;
    }, 0);

    return totalValue;
  }, [data]);

  const income = useMemo(() => {
    const totalValue = data.reduce((sum, finance) => {
      let sumTotal = sum;
      if (finance.type === 'income') {
        sumTotal += finance.value;
      }

      return sumTotal;
    }, 0);

    return totalValue;
  }, [data]);

  const outcome = useMemo(() => {
    const totalValue = data.reduce((sum, finance) => {
      let sumTotal = sum;
      if (finance.type === 'outcome') {
        sumTotal += finance.value;
      }

      return sumTotal;
    }, 0);

    return totalValue;
  }, [data]);

  return (
    <FinancesContext.Provider
      value={{
        finances: data,
        loading,
        addFinance,
        removeFinance,
        removeAll,
        total,
        income,
        outcome,
      }}
    >
      {children}
    </FinancesContext.Provider>
  );
};

export function useFinances(): FinancesContextData {
  const context = useContext(FinancesContext);

  if (!context) {
    throw new Error('usefinances must be used within a FinancesProvider');
  }

  return context;
}
