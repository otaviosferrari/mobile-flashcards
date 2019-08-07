import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './src/navigation/AppNavigator';
import { ghostWhite } from './src/constants/Colors';
import { getDecks } from './src/utils/api';
import { setLocalNotification } from './src/utils/helpers'

class App extends React.Component {
  state = {
    decks: {}
  }

  async componentDidMount () {
    const data = await getDecks();
    this.setState({
      decks: data,
    });
    setLocalNotification();
  }

  handleSaveDeckTitle = (title) => {
    this.setState({
      decks: {
        ...this.state.decks,
        [title]: {
          title,
          questions: []
        }
      }
    });
  }

  handleAddCardToDeck = (title, card) => {
    const updatedQuestions = [...this.state.decks[title].questions, card];
    
    this.setState({
      decks: {
        ...this.state.decks,
        [title]: {
          title,
          questions: updatedQuestions,
        }
      }
    });
  }
  

  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator 
          screenProps={{
            decks: this.state.decks,
            handleSaveDeckTitle: this.handleSaveDeckTitle,
            handleAddCardToDeck: this.handleAddCardToDeck,
          }} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;