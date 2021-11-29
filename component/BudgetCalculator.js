import React, { useState } from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";

const BudgetCalculator = (props) => {
  console.log("props.sumOfAllExpenses:", props.sumOfAllExpenses);
  const [budget, setBudget] = useState(null);
  return (
    <View>
      <TextInput
        style={styles.BudgetInput}
        placeholder="Please type your month's budget here."
        keyboardType="numeric"
        onChangeText={(income) => setBudget(Number(income))}
        placeholderTextColor="#b69eeb"
      ></TextInput>
      <View style={styles.budgetIncomeWrapper}>
        <Text style={styles.budgetIncome}>
          Cash in wallet: ${Number(budget)}
        </Text>
        <Text style={styles.budgetIncome}>
          Remaining Budget: ${Number(budget) - Number(props.sumOfAllExpenses)}
        </Text>
        {Math.round(Number(props.sumOfAllExpenses) / Number(budget)) !== NaN ? (
          <Text style={styles.budgetIncome}>
            Consumed:{" "}
            {Math.round(Number(props.sumOfAllExpenses) / Number(budget)) * 100}%
          </Text>
        ) : (
          <Text style={styles.budgetSpendingMessage}>
            Please spend your money wisely 🙂
          </Text>
        )}
      </View>
    </View>
  );
};

export default BudgetCalculator;

const styles = StyleSheet.create({
  BudgetInput: {
    marginTop: 10,
    height: 30,
    borderColor: "#b69eeb",
    borderWidth: 0.3,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    fontSize: 16,
  },
  budgetIncomeWrapper: {
    marginTop: 20,
    borderRadius: 50,
    // borderStyle: "solid",
    // borderWidth: 2,
    // borderColor: "#7354b6",
    width: "90%",
    height: 200,
    backgroundColor: "#b69eeb",
    alignSelf: "center",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  budgetIncome: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  budgetSpendingMessage: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
