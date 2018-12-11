import React, {Component} from 'react'
import {StyleSheet, View, Alert} from 'react-native'
import Minefield from '../components/Minefield'
import Params from '../Params'
import { createMinedBoarded, cloneBoard, openField, hadExplosion, wonGame, showMines, flagUsed } from '../Functions'
import Header from '../components/Header';
import LevelSelection from '../components/LevelSelection';

export default class App extends Component {

	constructor(props){
		super(props)
		this.state = this.createState()
	}

	minesAmount = () => {
		const cols = Params.getColumnsAmount()
		const rows = Params.getRowsAmount()
		return Math.ceil(cols * rows * Params.difficultLevel)
	}
	
	createState = () => {
		const cols = Params.getColumnsAmount()
		const rows = Params.getRowsAmount()
		return {
			board: createMinedBoarded(rows, cols, this.minesAmount()),
			won: false,
			lost: false,
			showLevelSelection: false
		}
	}

	onOpenField = (row, column) => {
		const board = cloneBoard(this.state.board)
		if(board[row][column].flagged){
			board[row][column].flagged = false
		}else{
			openField(board, row, column)
		}

		const lost = hadExplosion(board)
		const won = wonGame(board)

		if(lost){
			showMines(board)
			Alert.alert('Ops!', 'Fim de jogo!')
		}

		if(won){
			Alert.alert('Parabéns!', 'Você venceu o jogo!')
		}

		this.setState({board, lost, won})
	}

	onHoldField = (row, column) => {
		const board = cloneBoard(this.state.board)
		if(!board[row][column].opened){
			board[row][column].flagged = true
			const won = wonGame(board)

			if(won){
				Alert.alert('Parabéns!', 'Você venceu o jogo!')
			}

			this.setState({board, won})
		}
	}

	onLevelSelected = level => {
		Params.difficultLevel = level
		this.setState(this.createState())
	}

	render() {
		return (
			<View style={styles.container}>
			<LevelSelection isVisible={this.state.showLevelSelection}
				onLevelSelected={this.onLevelSelected}
				onCancel={() => this.setState({showLevelSelection: false})} />
				<Header flagsLeft={this.minesAmount() - flagUsed(this.state.board)}
					onNewGame={() => this.setState(this.createState())}
					onFlagPress={() => this.setState({showLevelSelection: true})} />
				<Minefield onHoldField={this.onHoldField} onOpenField={this.onOpenField} board={this.state.board} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
  container: {
	flex: 1,
	justifyContent: 'flex-end'
  },
  board: {
	  alignItems: 'center',
	  backgroundColor: '#aaa' 
  }
})