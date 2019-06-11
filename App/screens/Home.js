import PropTypes from "prop-types";
import React, { Component } from "react";
import { StatusBar, KeyboardAvoidingView } from "react-native";
import { connect } from "react-redux";
import { Container } from "../components/Container";
import { Logo } from "../components/Logo";
import { InputWithButton } from "../components/TextInput";
import { ClearButton } from "../components/Button";
import { LastConverted } from "../components/Text";
import { Header } from "../components/Header";

const TEMP_LAST_CONVERTED = new Date();

import { swapCurrency, changeCurrencyAmount } from "../Actions/currencies";

class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  handleChangeText = amount => {
    this.props.dispatch(changeCurrencyAmount(amount));
  };

  handlePressBaseCurrency = () => {
    const { navigation } = this.props;
    navigation.navigate("CurrencyList", {
      title: "Base Currency",
      type: "base"
    });
  };

  handlePressQuoteCurrency = () => {
    const { navigation } = this.props;
    navigation.navigate("CurrencyList", {
      title: "Quote Currency",
      type: "quote"
    });
  };

  handleSwapCurrency = () => {
    this.props.dispatch(swapCurrency());
  };

  handleOptionsPress = () => {
    const { navigation } = this.props;
    navigation.navigate("Options");
  };

  render() {
    let quotePrice = (this.props.amount * this.props.conversionRate).toFixed(2);
    if (this.props.isFetching) {
      quotePrice = "...";
    }
    return (
      <Container>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Header onPress={this.handleOptionsPress} />

        <InputWithButton
          buttonText={this.props.baseCurrency}
          onPress={this.handlePressBaseCurrency}
          defaultValue={this.props.amount.toString()}
          keyboardType="numeric"
          onChangeText={this.handleChangeText}
        />
        <InputWithButton
          editable={false}
          buttonText={this.props.quoteCurrency}
          onPress={this.handlePressQuoteCurrency}
          value={quotePrice}
        />
        <LastConverted
          date={this.props.lastConvertedDate}
          base={this.props.baseCurrency}
          quote={this.props.conversionRate}
        />
        <ClearButton
          onPress={this.handleSwapCurrency}
          text="Reverse Currencies"
        />
      </Container>
    );
  }
}

const mapStateToProps = state => {
  const baseCurrency = state.currencies.baseCurrency;
  const quoteCurrency = state.currencies.quoteCurrency;
  const amount = state.currencies.amount;
  const conversionSelector = state.currencies.conversions[baseCurrency] || {};
  const rates = conversionSelector.rates || {};
  const conversionRate = rates[quoteCurrency] || 0;
  const isFetching = conversionSelector.isFetching;
  const lastConvertedDate = conversionSelector.date
    ? new Date(conversionSelector.date)
    : new Date();
  return {
    baseCurrency,
    quoteCurrency,
    amount,
    conversionRate,
    isFetching,
    lastConvertedDate
  };
};

export default connect(mapStateToProps)(Home);
