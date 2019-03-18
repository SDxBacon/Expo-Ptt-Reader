
import React from 'react';
import {
  View,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
import { ArticleListItem } from '../components';
import { ptt } from '../utils';

export default class ReadArticleScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const title = navigation.getParam('articleTitle');
    return {
      title,
      headerStyle: {
        backgroundColor: Colors.Surface
      }
    }
  };

  state = {
    isLoad : false
  }
  componentWillMount() {
    this._readArticle();
  }

  async _readArticle() {
    const href = this.props.navigation.getParam('href');
    const data = await ptt.readArticle(href);
    console.log(data);
    this.setState({data, isLoad: true});
  }

  _renderOnLoading() {
    return null;
  }

  render() {

    if ( !this.state.isLoad )
      return this._renderOnLoading();

    return (
      <View style={styles.container}>
        <ScrollView>
          <MonoText style={styles.title}>{this.state.data.articleTitle}</MonoText>
          <MonoText style={{color:'white'}}>{this.state.data.author}</MonoText>
          <MonoText style={{color:'white'}}>{this.state.data.articlePostTime}</MonoText>
          <MonoText style={{color:'white'}}>{this.state.data.content}</MonoText>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
  },
  
  title : {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
