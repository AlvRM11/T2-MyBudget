import { Button, Pressable, StyleSheet, Text, View } from 'react-native'

const Transaction = ({ info, removeTransaction }) => {
    const {id, description, amount, date} = info;

    return (
      <View style={styles.container}>
        <Text>{amount} - {description} - {date}</Text>
        <Button title='Delete' onPress={() => removeTransaction(id)} />
      </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 20,
        marginTop: 50,
        padding: 20
    }
});

export default Transaction;