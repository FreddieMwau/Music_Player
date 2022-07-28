import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, Image, FlatList, Animated } from 'react-native'
import React, {useEffect, useState, useRef} from 'react'
import IonIcons from 'react-native-vector-icons/Ionicons'
import Slider from '@react-native-community/slider';
import songs from '../model/data';

const {width, height} = Dimensions.get('window');

const MusicPlayer = () => {

  const [songIndex, setSongIndex] = useState(0)

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(()=> {
    scrollX.addListener(({value}) => {
      // console.log(`ScrollX : ${value} | Device width : ${width}`);
      const index = Math.round(value / width)
      setSongIndex(index)
      // console.log(index);
    })
  }, [])

  const renderSongs = ({item, index}) => {
    return (<Animated.View style = {style.mainImageWrapper}>
      <View style={[style.imageWrapper, style.elevation]}>
        <Image
          source={item.artwork}
          style={style.musicImage}
        />
      </View>
    </Animated.View>);
  };
  return (
    <SafeAreaView style={style.container}>
      <View style = {style.maincontainer}>

        {/* image */}
        <Animated.FlatList 
          renderItem={renderSongs}
          data= {songs}
          keyExtractor = {item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator = {false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent : {
                  contentOffset : {x :scrollX},
                }
              }
            ],
            {useNativeDriver: true},
          )}
        />
        

        {/* Song content */}
        <View>
          <Text style={style.songTitle}>{songs[songIndex].title}</Text>
          <Text style={style.songArtist}>{songs[songIndex].artist}</Text>
        </View>

        {/* slider */}
        <View>
          <Slider
            style = {style.progressBar}
            value={10}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor="#FFD369"
            minimumTrackTintColor="#FFD369"
            maximumTrackTintColor="#FFFFFF"
            onSlidingComplete={() => {}}
          />
          {/* progress duration */}
          <View style={style.progressLevelDuration}>
            <Text style={style.progressLabeltText}>00:00</Text>
            <Text style={style.progressLabeltText}>00:00</Text>
          </View>
        </View>
        {/* music controls */}
        <View style={style.musicControlsContainer}>
          <TouchableOpacity onPress={() => { }}>
            <IonIcons name='play-skip-back-outline' size={35} color="#FFD369" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <IonIcons name='ios-pause-circle' size={75} color="#FFD369" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <IonIcons name='play-skip-forward-outline' size={35} color="#FFD369" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.bottomContainer}>
        <View style={style.bottomIconWrapper}>
          <TouchableOpacity onPress={() => { }}>
            <IonIcons name='heart-outline' size={30} color="#888888" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <IonIcons name='repeat' size={30} color="#888888" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <IonIcons name='share-outline' size={30} color="#888888" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { }}>
            <IonIcons name='ellipsis-horizontal' size={30} color="#888888" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default MusicPlayer

const style = StyleSheet.create({
    container: {
        flex : 1,
        backgroundColor: '#222831',
    },

    maincontainer:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },

    bottomContainer: {
      width: width,
      alignItems: 'center',
      paddingVertical: 15,
      borderTopColor: '#393E46',
      borderWidth: 1,
    },

    bottomIconWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%'
    },

    mainImageWrapper: {
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
    },

    imageWrapper: {
      width: 250,
      height: 250,
      marginBottom: 20,
      marginTop: 65
    },

    musicImage: {
      width: '100%',
      height: '100%',
      borderRadius: 15,
    },

    elevation: {
      elevation: 5,
      shadowColor: '#ccc',
      shadowOffset: {
        width: 5,
        height: 5
      }, 
      shadowOpacity: 0.5,
      shadowRadius: 3.84,
    },

    songTitle: {
      fontSize: 26,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#EEEEEE'
    },

    songArtist: {
      fontSize: 18,
      fontWeight: 'normal',
      textAlign: 'center',
      color: '#EEEEEE'
    },
  

    progressBar: {
      width: 350,
      height: 40,
      marginTop: 45,
      flexDirection: 'row'
    },

    progressLevelDuration: {
      width: 340,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },

    progressLabeltText: {
      color: "#fff",
      fontWeight: '500'
    },

    musicControlsContainer: {
      flexDirection : 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '60%',
      marginTop: 20
    }
})