import {Dimensions} from 'react-native'

const params = {
    blocksize: 30,
    borderSize: 5,
    fontSize: 15,
    headerRadio: 0.15,
    difficultLevel: 0.01,
    getColumnsAmount(){
        const width = Dimensions.get('window').width
        return Math.floor(width / this.blocksize)
    },
    getRowsAmount(){
        const totalHeight = Dimensions.get('window').height
        const boardHeight = totalHeight * (1 - this.headerRadio)
        return Math.floor(boardHeight / this.blocksize)
    }
}

export default params