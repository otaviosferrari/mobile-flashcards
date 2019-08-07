import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { black, ghostWhite } from '../constants/Colors';
import MyButton from '../components/MyButton';
import { addCardToDeck } from '../utils/api';


class NewCardScreen extends React.Component {
  static navigationOptions = {
    title: 'Add Card',
  };

  state = {
    question: '',
    answer: '',
  }

  handleSubmit = () => {
    const { navigation } = this.props;
    const { handleAddCardToDeck } = this.props.screenProps;
    const title = navigation.getParam('title');

    addCardToDeck(title, this.state);
    handleAddCardToDeck(title, this.state);
    this.setState({
      question: '',
      answer: '',
    });
    navigation.navigate('Decks');
  }

  render() {
    const isEnabled = this.state.question.length > 0 && this.state.answer.length > 0;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Enter the Question
        </Text> 
        <TextInput
          style={styles.textInput}
          onChangeText={(question) => this.setState({ question })}
          value={this.state.question}
        />
        <Text style={styles.text}>
          Enter the Answer
        </Text> 
        <TextInput
          style={styles.textInput}
          onChangeText={(answer) => this.setState({ answer })}
          value={this.state.answer}
        />

        <MyButton 
          title='Submit' 
          color={black}
          disabled={!isEnabled}
          onPress={this.handleSubmit}  
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: ghostWhite,
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    color: black,
  },
  textInput: {
    height: 40, 
    borderColor: black, 
    backgroundColor: 'white',
    borderWidth: 1,
    margin: 20,
    alignSelf: 'stretch',
  }
});

export default NewCardScreen;