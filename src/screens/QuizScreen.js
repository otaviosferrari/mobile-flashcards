import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button
} from 'react-native';
import MyButton from '../components/MyButton';
import { black, ghostWhite, red, green } from '../constants/Colors';
import { getDeck } from '../utils/api';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class QuizScreen extends React.Component {
  static navigationOptions = {
      title: 'Quiz',
  };

  state = {
    title: null,
    currentQuestion: 0,
    viewFront: true,
    totalCorrect: 0,
    questions: [],
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const title = navigation.getParam('title');
    const deck = await getDeck(title);

    this.setState({
      title: deck.title,
      questions: deck.questions,
    });

    await clearLocalNotification();
    setLocalNotification();
  }

  flipCard = () => {
    this.setState((prev) => ({
      viewFront: !prev.viewFront
    }));
  };

  correct = () => {
    this.setState((prev) => ({
      totalCorrect: ++prev.totalCorrect,
      currentQuestion: ++prev.currentQuestion,
      viewFront: true,
    }));
  };

  incorrect = () => {
    this.setState((prev) => ({
      currentQuestion: ++prev.currentQuestion,
      viewFront: true,
    }));
  };

  render() {
    const { questions, currentQuestion, viewFront, totalCorrect, title } = this.state;
    const { navigation } = this.props;

    if (questions.length && currentQuestion === questions.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.question}>
            You got {totalCorrect} out of {questions.length} questions right!
          </Text>
          <MyButton 
            color={black} 
            title='Back to Deck' 
            outline
            onPress={() => {
              navigation.navigate('Deck', {
                title,
              });
            }}    
          />
          <MyButton 
            color={black} 
            title='Restart Quiz' 
            onPress={() => {
              this.setState({
                currentQuestion: 0,
                viewFront: true,
                totalCorrect: 0,
              });
            }}    
          />
        </View>
      );
    }

    //display question
    return (
      <View style={styles.container}>
        { questions.length 
          ? (       
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <Text style={styles.count}> {currentQuestion + 1} / {questions.length} </Text>
              <Text style={styles.question}>
                {viewFront
                  ? questions[currentQuestion].question
                  : questions[currentQuestion].answer
                }
              </Text>

              <Button 
                color={red} 
                title={viewFront ? 'Answer' : 'Question'} 
                onPress={this.flipCard}
              />
              <MyButton color={green} title='Correct' onPress={this.correct} />
              <MyButton color={red} title='Incorrect' onPress={this.incorrect} />
            </ScrollView>
            )
          : (
              <Text style={styles.question}> 
                This deck has no questions
              </Text>
            )
        }
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
  contentContainer: {
    alignItems: 'center'
  },
  question: {
    fontSize: 30,
    textAlign: 'center',
    color: black,
    margin: 20,
  },
  count: {
    fontSize: 20,
    textAlign: 'center',
    color: black,
    margin: 20
  },
});

export default QuizScreen;