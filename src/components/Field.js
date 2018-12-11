import React from 'react'
import {View, Text, TouchableWithoutFeedback} from 'react-native'
import Params from '../params'
import Mine from './Mine'
import Flag from './Flag'

export default props => {
    const {mined, opened, nearMines, exploded, flagged} = props

    const styleField = [styles.field]
    
    if(opened) styleField.push(styles.opened)

    if(exploded) styleField.push(styles.exploded)

    if(flagged) styleField.push(styles.flagged)

    if(!opened && !exploded) styleField.push(styles.regular)

    let colorLabel = null

    switch (nearMines) {
        case 1:
            colorLabel = '#5ac8fa'
            break;
        case 2:
            colorLabel = '#27ae60'
            break;
        case 3:
            colorLabel = '#e74c3c'
            break;
        case 4:
            colorLabel = '#EA2027'
            break;
        case 5:
            colorLabel = '#EE5A24'
            break;
        case 6:
            colorLabel = '#0652DD'
            break;
        case 7:
            colorLabel = '#30336b'
            break;
        case 8:
            colorLabel = '#130f40'
            break;
    
        default:
            break;
    }

    return(
        <TouchableWithoutFeedback onPress={props.onOpen} onLongPress={props.onHold}>
            <View style={styleField}>
                {
                    !mined && opened && nearMines > 0
                    ?<Text style={[styles.label, {color: colorLabel}]}>{nearMines}</Text>
                    :false
                }

                {
                    mined && opened
                    ?<Mine />
                    :false
                }

                {
                    flagged && !opened
                    ?<Flag />
                    :false
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = {
    field: {
        height: Params.blocksize,
        width: Params.blocksize,
        borderWidth: Params.borderSize
    },
    regular: {
        backgroundColor: '#999',
        borderLeftColor: '#CCC',
        borderTopColor: '#CCC',
        borderRightColor: '#333',
        borderBottomColor: '#333'
    },
    opened: {
        backgroundColor: '#999',
        borderColor: '#777',
        alignItems: 'center',
        justifyContent: 'center'
    },
    exploded: {
        backgroundColor: '#f00',
        borderColor: '#f00',
    },
    label: {
        fontWeight: 'bold',
        fontSize: Params.fontSize
    }
}