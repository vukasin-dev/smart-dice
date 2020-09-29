import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Platform, StyleSheet, Text, View ,Image, TouchableOpacity  } from 'react-native';

export default function HomeScreen({navigation, route}) {

  const [max, onChangeMax] = React.useState(0);
  const [fields, onChangeFields] = React.useState(0);
  const [tries, onChangeTries] = React.useState(0);

  React.useEffect(() => {
    onChangeMax(route.params.max)
    onChangeFields(route.params.fields)
    onChangeTries(route.params.tries)
  })

  return (
    <View style={styles.container}>
      <View style={{alignItems:'center'}}><Image style={styles.image} source={require('../assets/images/logo.jpg')}></Image></View>
      <TouchableOpacity
        onPress={()=> navigation.navigate('Game', {max, fields, tries})}
        style={styles.button}
      ><Text style={styles.buttonText}>PLAY</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=> navigation.navigate('Settings', {max, fields, tries})}
        style={styles.button}
        ><Text style={styles.buttonText}>SETTINGS</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        onPress={()=> navigation.navigate('Home')}
        style={styles.button}
        ><Text style={styles.buttonText}>LEADERBOARDS</Text>
      </TouchableOpacity> */}

    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  image:{
    marginTop:50,
    height: 200,
    width: 300
  }
});
