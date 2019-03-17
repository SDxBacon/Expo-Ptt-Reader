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
import { HotboardItem } from '../components';
import { ptt } from '../utils';

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

  componentWillMount() {
    this._getHotboardData();
  }

  async _getHotboardData() {
    const data = await ptt.getHotboardData();
    this.setState({ data, isLoad: true });
  }

  _keyExtractor = (item, index) => `hotboard-${index}`;
  _renderItem( {item} ) {
    return (
      <HotboardItem 
        {...item} 
        onPress={ _ => {
          // console.log( this instanceof HomeScreen);
          this.props.navigation.navigate('InBoard', item);
        }}
      />
    )
  }

  _renderOnLoading() {
    return null;
  }

  render() {

    if ( !this.state.isLoad )
      return this._renderOnLoading();

    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.data}
          renderItem={this._renderItem.bind(this)}
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
