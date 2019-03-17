
import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import * as StyledText from './StyledText';

export default class HotboardItem extends React.PureComponent {
  render() {
    const {
      nrec,
      artitleTitle,
      author,
      date,
      mark,
      onPress
    } = this.props;
    return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={{
          height:'100%',
          paddingVertical: 12,
          justifyContent:'space-between',
        }}>
          <StyledText.MonoText style={styles.boardName}>{artitleTitle}</StyledText.MonoText>
          <StyledText.MonoText style={styles.boardTitle}>{author}</StyledText.MonoText>
        </View>
        <View style={{
          height: '100%',
          justifyContent:'center',
        }}>
          <StyledText.MonoText style={styles.boardTitle}>{nrec}</StyledText.MonoText>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    height: 80,
    flexDirection:'row',
    paddingHorizontal: 16,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent:'space-between'
  },

  boardName: {
    color: 'white',
    fontWeight:'bold',
    fontSize: 20
  },

  boardTitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14
  }
})