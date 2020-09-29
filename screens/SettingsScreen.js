import * as React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity  } from 'react-native';

// max, fields, tries && easy, medium, hard

export default function SettingsScreen({ route, navigation }) {
  const [max, setMax] = React.useState('' + route.params.max);
  const [fields, setFields] = React.useState('' + route.params.fields);
  const [tries, setTries] = React.useState('' + route.params.tries);

  const [maxError, setMaxError] = React.useState('')
  const [fieldsError, setFieldsError] = React.useState('')
  const [triesError, setTriesError] = React.useState('')

  React.useEffect(() => {
    setMax(max.toString().replace(/[A-Za-z]/g, ''))
    if(max > 7 || max < 2){
      setMaxError('Value can only be greater then 1 and less then 8')
    } else if (maxError.length > 0) {
      setMaxError('')
    }
  }, [max])

  React.useEffect(() => {
    setFields(fields.toString().replace(/[A-Za-z]/g, ''))
    if(fields > 7 || fields < 2){
      setFieldsError('Value can only be greater then 1 and less then 8')
    } else if (fieldsError.length > 0) {
      setFieldsError('')
    }
  }, [fields])

  React.useEffect(() => {
    setTries(tries.toString().replace(/[A-Za-z]/g, ''))
    if(tries > 9 || tries < 2){
      setTriesError('Value can only be greater then 1 and less then 10')
    } else if (triesError.length > 0) {
      setTriesError('')
    }
  }, [tries])

  function hasError(){
    if(maxError.length > 0 || fieldsError.length > 0 || triesError.length > 0){
      return true
    }
    return false
  }

  return (
    <View style={styles.container}>
      <View style={{height:20}}></View>
      <Text style={styles.text}>Max die:</Text>
      <TextInput
        style={styles.input}
        onChangeText={max => setMax(max)}
        value={max}
      />
      {maxError.length > 1 ? <Text style={styles.error}>{maxError}</Text> : <></>}
      <Text style={styles.text}>Number of fields:</Text>
      <TextInput
        style={styles.input}
        onChangeText={fields => setFields(fields)}
        value={fields}
      />
      {fieldsError.length > 1 ? <Text style={styles.error}>{fieldsError}</Text> : <></>}
      <Text style={styles.text}>Number of tries:</Text>
      <TextInput
        style={styles.input}
        onChangeText={tries => setTries(tries)}
        value={tries}
      />
      {triesError.length > 1 ? <Text style={styles.error}>{triesError}</Text> : <></>}
      <TouchableOpacity
      disabled={hasError()}
        onPress={()=> navigation.navigate('Home', {max, fields, tries})}
        style={styles.button}
        ><Text style={styles.buttonText}>SAVE</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    error:{
      color: 'red',
      marginLeft:12,
      fontWeight: "300"
    },
    button:{
      marginTop:40,
      marginLeft: 20,
      marginRight: 20,
      padding:20,
      borderRadius: 15,
      backgroundColor: '#0f262c'
    },
    buttonText:{
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#fff'
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      margin: 10,
      paddingLeft: 10,
      paddingRight: 10
    },
    text: {
      marginTop:10,
      marginLeft:12,
      fontWeight: "500"
    },
})