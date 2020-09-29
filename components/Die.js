import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

const images = {
    img0: require(`../assets/images/0.png`),
    img1: require(`../assets/images/1.png`),
    img2: require(`../assets/images/2.png`),
    img3: require(`../assets/images/3.png`),
    img4: require(`../assets/images/4.png`),
    img5: require(`../assets/images/5.png`),
    img6: require(`../assets/images/6.png`),
    img7: require(`../assets/images/7.png`),
}

export function Die(props) {
    return (<Image style={styles.image}
        source={images[`img${props.number}`]}
    />);
}

const styles = StyleSheet.create({
    image: {
      height: 50,
      width: 50,
    },
})