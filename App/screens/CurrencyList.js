import PropTypes from "prop-types";
import React, { Component } from "react";
import { FlatList, StatusBar, View } from "react-native";
import { connect } from "react-redux";

import { ListItem, Separator } from "../components/List";
import { changeBaseCurrency, changeQuoteCurrency } from "../Actions/currencies";

let data = [
  "AUD",
  "BGN",
  "BRL",
  "CAD",
  "CHF",
  "CNY",
  "CZK",
  "DKK",
  "EUR",
  "GBP",
  "HKD",
  "HRK",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "JPY",
  "KRW",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PHP",
  "PLN",
  "RON",
  "RUB",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "USD",
  "ZAR"
];

class CurrencyList extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    dispatch: PropTypes.func,
    baseCurrency: PropTypes.string,
    quoteCurrency: PropTypes.string
  };

  handlePress = currency => {
    const { navigation, dispatch } = this.props;
    const { type } = navigation.state.params;
    if (type === "base") {
      dispatch(changeBaseCurrency(currency));
    } else if (type === "quote") {
      dispatch(changeQuoteCurrency(currency));
    }

    navigation.goBack(null);
  };

  render() {
    const { baseCurrency, quoteCurrency, navigation } = this.props;
    let comparisonCurrency = baseCurrency;
    if (navigation.state.params.type === "quote") {
      comparisonCurrency = quoteCurrency;
    }

    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent={false} barStyle="default" />
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ListItem
              text={item}
              selected={item === comparisonCurrency}
              onPress={() => this.handlePress(item)}
            />
          )}
          keyExtractor={item => item}
          ItemSeparatorComponent={Separator}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  baseCurrency: state.currencies.baseCurrency,
  quoteCurrency: state.currencies.quoteCurrency
});

export default connect(mapStateToProps)(CurrencyList);
