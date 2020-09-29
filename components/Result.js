import * as React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { lossJokes } from '../constants/LossJokes';

// 1-win; 2-lose
export default function Result(props) {

    function randomLossJoke(){
        return lossJokes[Math.floor(Math.random()*10)%lossJokes.length]
    }

    return (
        <View style={styles.container}>
            {props.gameState === 1 ?
                <Text style={styles.text}>Congrats you won!</Text>
                :
                <>
                    <Text style={styles.text}>You Lose!</Text>
                    <View style={{height:20}}></View>
                    <Text style={{fontSize:16}}>{randomLossJoke()}</Text>
                </>
            }
        </View> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize:25
    }
})