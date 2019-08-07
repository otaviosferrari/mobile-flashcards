import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyButton from '../components/MyButton';
import { ghostWhite, black } from '../constants/Colors';

class DeckScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Deck'),
    };
  };

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam('title');
    const questionsNum = navigation.getParam('questionsNum');

    return (
      <View style={styles.container}>
        <Text style={styles.deckTitle}>
          {title}
        </Text>
        <Text style={styles.deckSubTitle}>
          {questionsNum} {questionsNum === 1 ? 'card' : 'cards'}
        </Text>
        <MyButton
          color={black}
          title='Add Card'
          outline
          onPress={() => {
            this.props.navigation.navigate('AddCard', {
              title,
            });
          }}
        />
        <MyButton
          color={black}
          title='Start Quiz'
          onPress={() => {
            this.props.navigation.navigate('Quiz', {
              title,
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ghostWhite,
    alignItems: 'center',
  },
  deckTitle: {
    fontSize: 30,
    textAlign: 'center',
    color: black,
    paddingTop: 80
  },
  deckSubTitle: {
    fontSize: 20,
    textAlign: 'center',
    color: black,
    paddingBottom: 60
  },
});

export default DeckScreen;