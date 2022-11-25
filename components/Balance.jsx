import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import { palette } from '../themes/colors';

const Balance = ({ transactions }) => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        let counter = 0;

        transactions.forEach((transaction) => {
            counter += Number(transaction.amount);
        })

        setBalance(counter);
    }, [balance, transactions]);

    const isPositiveBalance = () => {
        if (balance < 0) {
            return false;
        }

        return true;
    }

    return (
      <View style={styles.container}>
        <Text style={isPositiveBalance() ? styles.greenBalance : styles.redBalance}>
            {balance}€
        </Text>
      </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        borderWidth: 2,
        borderRadius: 20,
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: palette.light.darkBackground
    },
    redBalance: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 35
    },
    greenBalance: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 35
    }
});

export default Balance;