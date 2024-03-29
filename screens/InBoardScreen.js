
import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
} from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from '../components/StyledText';
import { ArticleListItem } from '../components';
import { ptt } from '../utils';

export default class InBoardScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const boardName = navigation.getParam('boardName');
    return {
      title: boardName,
      headerStyle: {
        backgroundColor: Colors.Surface
      }
    }
  };

  state = {
    data: []
  }

  componentWillMount() {
    this._getArticlesWithHref();
  }

  async _getArticlesWithHref() {
    const href = this.props.navigation.getParam('href');
    const data = await ptt.getArticlesWithHref(href);
    this.setState({data, isLoad: true});
  }


  _keyExtractor = (item, index) => `article-${index}`;
  _renderItem( {item} ) {
    return (
      <ArticleListItem 
        {...item} 
        onPress={ async _ => {
          this.props.navigation.navigate('ReadArticle', {...item} );
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
