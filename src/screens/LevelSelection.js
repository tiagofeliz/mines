import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Modal} from 'react-native'

const Button = props => {
    const buttonStyle = [styles.button, styles.props.bg]
    return(
        <TouchableOpacity
            style={buttonStyle}
            onPress={() => props.onLevelSelected(props.level)}>
            Fácil>
        </TouchableOpacity>
    )
}

export default props => {
    return(
        <Modal onRequestClose={props.onCancel}
            visible={props.isVisible}
            animationType="slide"
            transparent={true}>

            <View style={styles.frame}>
                <View style={styles.container}>
                    <Text style={styles.title}>Selecione o nível do jogo: </Text>
                    <Button bg="bgEasy" onLevelSelected={props.onLevelSelected} level={0.1} />
                    <Button bg="bgNormal" level={0.2} />
                    <Button bg="bgHard" level={0.3} />
                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .6)'
    },
    container: {
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    button: {
        marginTop: 10,
        padding: 5
    },
    buttonLabel: {
        fontSize: 20,
        color: '#eee',
        fontWeight: 'bold'
    },
    bgEasy: {
        backgroundColor: '#49b65d'
    },
    bgNormal: {
        backgroundColor: '#2765f7'
    },
    bgHard: {
        backgroundColor: '#f26337'
    }
})