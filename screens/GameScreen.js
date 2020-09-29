import React, { useEffect, useState } from 'react';
import { Die } from '../components/Die';
import Result from '../components/Result'
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function GameScreen({ route }) {

  const winGameTimeout = 2000
  const loseGameTimeout = 20000

  const [max, setMax] = useState(0)
  const [fields, setFields] = useState(0)
  const [tries, setTries] = useState(0)

  const [maxArr, setMaxArr] = useState([]) // max 7
  const [fieldsArr, setFieldsArr] = useState([]) // len 4-6
  const [totalFieldsArr, setTotalFieldsArr] = useState([]);
  const [colorsArr, setColorsArr] = useState([]);
  const [triesArr, setTriesArr] = useState([]) // max 8

  const [turn, setTurn] = useState(0);

  const [loaded, setLoaded] = useState(false);
  const [loadedParams, setLoadedParams] = useState(false);

  const [gameState, setGameState] = useState(0) // 0-playing; 1-win; 2-loss

  // 1 - Match!
  // 2 - Close!
  useEffect(() => {
    if(turn % fields === 0 && turn > 0){
      const alreadyComparedIndex = []
      const res = []
      const tmpFieldsArr = [...fieldsArr]
      const compareTo = totalFieldsArr.slice(turn-fields, turn)
      for(let i = 0; i < fields; i++){
        if(fieldsArr[i] === compareTo[i]){
          alreadyComparedIndex.push(i)
          tmpFieldsArr[i] = 999
          res.push(1)
        } 
      }
      for(let i = 0; i < fields; i++){
        if (tmpFieldsArr.includes(compareTo[i]) && !alreadyComparedIndex.includes(i)) {
          tmpFieldsArr[tmpFieldsArr.indexOf(compareTo[i])] = 999
          res.push(2)
        } 
      }
      while(res.length < fields){
        res.push(3)
      }
      if(res.every(n => n === 1)){
        setTimeout(() => {
          setGameState(1)
        }, winGameTimeout)
      } else if(fields * tries === turn){
        setGameState(4)
        setTimeout(() => {
          setGameState(2)
        }, loseGameTimeout)
      }
      setColorsArr([...colorsArr, ...res])
    }
  },[turn])

  useEffect(() => {
    setMax(route.params.max);
    setFields(route.params.fields);
    setTries(route.params.tries);
    setLoadedParams(true)
  }, [])

  useEffect(() => {
    generateArrays()
    setLoaded(true)
  }, [loadedParams])

  function generateArrays() {
    const triesArrTmp = []
    const fieldsArrTmp = []
    const maxArrTmp = []
    for(let i = 0; i < tries*(fields); i++){
      if(i < max){
        maxArrTmp.push(0)
      }
      if(i < fields){
        fieldsArrTmp.push(Math.floor(Math.random()*10%max+1))
      }
      if(i < tries){
        triesArrTmp.push(i)
      }
      totalFieldsArr.push(0)
    }
    setFieldsArr(fieldsArrTmp)
    setTriesArr(triesArrTmp)
    setMaxArr(maxArrTmp)
  }

  function play(n) {
    const tmpArr = [...totalFieldsArr]
    tmpArr[turn] = n
    setTotalFieldsArr(tmpArr)
    setTurn(turn+1)
  }

  function undo(n){
    if(turn % fields !== 0 && turn === n){
      const tmpArr = [...totalFieldsArr]
      tmpArr[turn-1] = 0
      setTotalFieldsArr(tmpArr)
      setTurn(turn-1)
    }
  }

  function renderDiceRow(rowIndex) {
    return fieldsArr.map((item, index) => (
      <TouchableOpacity key={index} onPress={() => undo(index+1)}><Die number={totalFieldsArr[index + rowIndex * fields]}></Die><View style={colorsArr[index+(rowIndex*fields)] === 1 ? styles.greenCircle : colorsArr[index+(rowIndex*fields)] === 2 ? styles.yellowCircle : styles.circle}></View></TouchableOpacity>
    ));
  }

  function renderMaxDiceRow() {
    return maxArr.map((item, index) => (
      <TouchableOpacity key={index} onPress={() => play(index+1)}><Die number={index+1}></Die></TouchableOpacity>
    ));
  }

  function renderSolutionDiceRow() {
    return fieldsArr.map((item, index) => (
      <Die key={index} number={fieldsArr[index]}></Die>
    ));
  }

  function renderTries() {
    return triesArr.map((item, index) => (
      <View key={index} style={styles.row}>
        {renderDiceRow(index)}
      </View>
    ));
  }

  return (
    <>
      {!loaded ? <Text>'Loading'</Text> :
        gameState === 0 ?
        <>{renderTries()}
          <View style={styles.horizonalLine} />
          <View style={styles.pickRow}>
            {renderMaxDiceRow()}
          </View>
        </> :
        gameState === 4 ?
        <>
          {renderTries()}
          <Text style={styles.solution}>SOLUTION:</Text>
          <View style={styles.pickRow}>
          {renderSolutionDiceRow()}
          </View>
        </>
        :
        <>
          <Result gameState={gameState}></Result>
        </>
        
      }
    </>
  );
}

const styles = StyleSheet.create({
  solution:{
    textAlign:'center',
    height:20,
    width:100,
    color:'white',
    backgroundColor:'black',
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10
  },
  circle: {
    height: 10,
    width: 10,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 1
  },
  greenCircle: {
    height: 10,
    width: 10,
    backgroundColor: 'green',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 1
  },
  yellowCircle: {
    height: 10,
    width: 10,
    backgroundColor: 'yellow',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 1
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  horizonalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
})