import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import cheerio from 'react-native-cheerio';

import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    // header: ,
    title: '熱門看板',
    headerStyle: {
      backgroundColor: Colors.Surface
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoad: false,
      data: []
    }
  }

  async getHotboards() {
    const resp = await fetch('https://www.ptt.cc/bbs/index.html');
    const body = await resp.text();
    const $ = cheerio.load(body);

    let data = [];
    $('.b-ent').each(function(i, elem) {
      const boardName = $(this).find('.board-name').text();
      const boardTitle = $(this).find('.board-title').text().slice(1).trim();
      data.push({i, boardName, boardTitle});
    });

    this.setState({ data, isLoad: true })
  }

  _keyExtractor = (item, index) => `hotboard-${index}`;

  _renderItem( {item} ) {
    const { boardName, boardTitle } = item;
    return (
      <View style={{
        height: 80,
        flexDirection:'row',
        paddingHorizontal: 16,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.85)',
        justifyContent:'space-between'
      }}>
        <View style={{
          height:'100%',
          paddingVertical: 12,
          justifyContent:'space-between',
        }}>
          <Text style={{
            color: 'white',
            fontWeight:'bold',
            fontSize: 20
          }}> {boardName} </Text>
          <Text style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: 14
          }}> {boardTitle} </Text>
        </View>
      </View>
    )
  }

  render() {
    if ( !this.state.isLoad ) {
      this.getHotboards();
      return null;
    }

    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  
});
