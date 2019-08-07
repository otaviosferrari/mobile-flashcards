import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import DecksScreen from '../screens/DecksScreen';
import DeckScreen from '../screens/DeckScreen';
import QuizScreen from '../screens/QuizScreen';
import NewDeckScreen from '../screens/NewDeckScreen';
import NewCardScreen from '../screens/NewCardScreen';
import { black } from '../constants/Colors';

const DecksStack = createStackNavigator(
  {
    Decks: { screen: DecksScreen },
    Deck: { screen: DeckScreen },
    Quiz: { screen: QuizScreen },
    AddCard: { screen: NewCardScreen },
  },
  {
    initialRouteName: 'Decks'
  }
);

DecksStack.navigationOptions = {
  tabBarLabel: 'Decks',
  tabBarOptions: {
    activeTintColor: black,
  }
};

const NewDeckStack = createStackNavigator({
  NewDeck: NewDeckScreen,
});

NewDeckStack.navigationOptions = {
  tabBarLabel: 'New Deck',
  tabBarOptions: {
    activeTintColor: black,
  }
};


export default createBottomTabNavigator({
  DecksStack,
  NewDeckStack,
});