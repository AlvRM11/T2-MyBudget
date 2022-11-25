import { useState } from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import uuid from 'react-native-uuid';
import Balance from './components/Balance.jsx';
import ModalButton from './components/ModalButton.jsx';
import Transaction from './components/Transaction.jsx';

export default function App() {
  const [ transactions, setTransactions ] = useState([]);

  const addTransactionHandler = (transDesc, transAmount, transDate, transType) => {

    const newTransaction = {
      id: uuid.v4(),
      description: transDesc,
      amount: transAmount,
      date: transDate,
      type: transType
    };

    setTransactions(() => [...transactions, newTransaction]);
  };

  const removeTransactionHandler = (id) => {
    setTransactions(() => transactions.filter( transaction => transaction.id !== id ));
  }

  return (
    <View style={styles.container}>
      <Balance transactions={ transactions } />
      {
        !transactions.length
          ?
            <View style={styles.noTransactions}><Text>No transactions yet</Text></View>
          :
            <FlatList
              data={ transactions }
              keyExtractor={ (item) => item.id }
              renderItem={ ({ item }) => <Transaction info={item} removeTransaction={ removeTransactionHandler }/>} 
              style={styles.flatListStyles}
            />
      }
      <ModalButton onTransactionAdd={ addTransactionHandler } />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noTransactions: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 20,
    marginTop: 50,
    padding: 20
  },
  flatListStyles: {
    flex: 2,
    width: '100%',
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10
  }
});
