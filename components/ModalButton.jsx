import { 
    Modal, 
    StyleSheet, 
    Text, 
    Pressable,
    TextInput, 
    View } from 'react-native';

import { useState } from 'react';
import { palette } from '../themes/colors';
import SelectDropdown from 'react-native-select-dropdown';

const ModalButton = ({ onTransactionAdd }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState('');
    const [type, setType] = useState('');

    const registerTypes = ['Deposit', 'Spent'];

    const changeTypeHandler = (value) => {
        setType(value);
    }

    const changeDescHandler = (value) => {
        setDescription(value);
    };

    const changeAmountHandler = (value) => {
        setAmount(value);
    };

    const changeDateHandler = (value) => {
        setDate(value);
    };

    const addTransactionHandler = () => {

        description.length > 50
            ? alert('Your description exceeds the supported character length limit')
            : onTransactionAdd(description, amount, date, type);

        if (description.length > 50) {
            alert('Your description exceeds the supported character length limit')
        }
        else if (type === 'Spent') {
            onTransactionAdd(description, amount*(-1), date, type);
        }
        else {
            onTransactionAdd(description, amount, date, type);
        }

        setDescription('');
        setAmount(0);
        setDate('');
        setType('');
    };

    const handleOnPressAdd = () => {
        addTransactionHandler()
        setModalVisible(!modalVisible)
    }

    const isDisabled = () => {

        const sanitizedDesc = description.trim();

        if (sanitizedDesc !== '' && !isNaN(amount) && date !== '' && type !== '') {
            return false;
        }

        return true;
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType='slide'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TextInput
                        placeholder='Introduce an amount'
                        style={styles.modalInput}
                        keyboardType="numeric"
                        onChangeText={changeAmountHandler}
                        value={amount}
                    />
                    <SelectDropdown
                        data={registerTypes}
                        onSelect={(selectedItem) => {
                            changeTypeHandler(selectedItem);
                        }}
                        defaultButtonText={'Category...'}
                        buttonTextAfterSelection={() => {
                            return type;
                        }}
                        rowTextForSelection={(item) => {
                            return item;
                        }}
                        buttonStyle={styles.dropdownBtnStyle}
                        buttonTextStyle={styles.dropdownBtnTxtStyle}
                        dropdownStyle={styles.dropdownDropdownStyle}
                        rowStyle={styles.dropdownRowStyle}/>
                    <TextInput
                        placeholder='Introduce a Description'
                        style={styles.modalInput}
                        keyboardType='default'
                        onChangeText={changeDescHandler}
                        value={description}
                    />
                    <TextInput
                        placeholder='Introduce a date'
                        style={styles.modalInput}
                        keyboardType="numeric"
                        onChangeText={changeDateHandler}
                        value={date}
                    />
                    <View style={{flexDirection: 'row'}}>
                        <Pressable
                            style={[styles.button, styles.buttonCloseAdd, {marginRight: 10}]}
                            onPress={() => handleOnPressAdd()}
                            disabled={isDisabled()}
                        >
                            <Text style={styles.textStyle}>+</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonCloseExit, {marginLeft: 10}]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>x</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
            <Text style={styles.textStyle}>+</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      backgroundColor: palette.light.darkBackground,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4
    },
    button: {
      borderRadius: 50,
      padding: 15
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonCloseAdd: {
      backgroundColor: "#2196F3",
    },
    buttonCloseExit: {
        backgroundColor: "#FF0000",
      },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
    modalInput: {
        padding: 4,
        margin: 10,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "white",
        borderStyle: "solid"
    },
    dropdownBtnStyle: {
        width: '100%',
        height: 50,
        backgroundColor: palette.light.primaryLight,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdownBtnTxtStyle: {
        color: palette.light.textPrimary, 
        textAlign: 'left'
    },
    dropdownDropdownStyle: {
        backgroundColor: '#EFEFEF'
    },
    dropdownRowStyle: {
        backgroundColor: '#EFEFEF', 
        borderBottomColor: '#C5C5C5'
    },
    dropdownRowTxtStyle: {
        color: '#444',
        textAlign: 'left'
    }
});

export default ModalButton;