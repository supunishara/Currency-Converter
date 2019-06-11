import { createStackNavigator, createAppContainer } from "react-navigation";
import { StatusBar } from "react-native";
import Home from "../screens/Home";
import CurrencyList from "../screens/CurrencyList";

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: () => null,
        headerTitle: "Home"
      }
    }
  },
  {
    headerMode: "screen"
  }
);

const CurrencyListStack = createStackNavigator({
  CurrencyList: {
    screen: CurrencyList,
    navigationOptions: ({ navigation }) => ({
      headerTitle: navigation.state.params.title
    })
  }
});

const App = createStackNavigator(
  {
    Home: {
      screen: HomeStack
    },
    CurrencyList: {
      screen: CurrencyListStack
    }
  },
  {
    mode: "modal",
    headerMode: "none",
    cardStyle: { paddingTop: StatusBar.currentHeight }
  }
);

const AppContainer = createAppContainer(App);

export default AppContainer;
