import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { useQuery, gql } from "@apollo/client";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Animated,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import BudgetCalculator from "./component/BudgetCalculator";
import { useState } from "react";
import Expense from "./component/Expense";

export default function App() {
  const [expensesArray, setExpensesArray] = useState(null);
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState("");
  const [allCost, setAllCost] = useState([cost]);

  // const { error, loading, data } = useQuery(LOAD_USERS);

  // const link = from([
  //   errorLink,
  //   new HttpLink({ uri: "http://localhost:1337/graphql" }),
  // ]);

  // const client = new ApolloClient({
  //   link: link,
  //   cache: new InMemoryCache(),
  // });

  const handleAddExpense = () => {
    Keyboard.dismiss();
    setExpensesArray(
      expensesArray
        ? [...expensesArray, { category, cost }]
        : [{ category, cost }]
    );
    setCategory("");
    setCost("");
    Number(setAllCost(allCost !== "" ? [...allCost, cost] : [cost]));
    console.log("allCost:", allCost);
  };

  const RemoveExpense = (index) => {
    let expensesCopy = [...expensesArray];
    console.log("expensesCopy:", expensesCopy);
    expensesCopy.splice(index, 1);
    setExpensesArray(expensesCopy);
    let costCopy = [...allCost];
    console.log("allCost:", allCost);
    costCopy.filter((elem) => elem !== cost);
    setAllCost(costCopy);
    console.log("costCopy:", costCopy);
  };

  const sumAllCost = (arr) => {
    const sum = arr.reduce((x, y) => Number(x) + Number(y));
    return sum;
    console.log("sum:", sum);
  };

  // const scrollY = new Animated.View(100);
  return (
    // <ApolloProvider client={client}>
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Ionicons
          style={styles.wallet}
          name="wallet"
          size={25}
          color="#7354b6"
        />
        <Text style={styles.title}>Budget the Pocket</Text>
      </View>
      <View style={styles.divider}></View>
      <BudgetCalculator sumOfAllExpenses={Number(sumAllCost(allCost))} index />
      <View style={styles.divider}></View>
      <View style={styles.subTitleWrapper}>
        <Text style={styles.subTitle}>Expenses:</Text>
      </View>

      {/* Expenses Details */}
      <ScrollView style={styles.scrollExpenses}>
        {expensesArray &&
          expensesArray.map((expense, index) => {
            return (
              <View style={styles.expensesStrips}>
                <TouchableOpacity
                  key={index}
                  onPress={() => RemoveExpense(index)}
                >
                  <Expense text={expense.category} cost={expense.cost} />
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>

      {/* Make this new component */}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <View style={styles.ExpenseInputWrapper}>
          <TextInput
            style={styles.ExpenseInputOne}
            placeholder="category of your expense."
            value={category}
            onChangeText={(text) => setCategory(text)}
            placeholderTextColor="#b69eeb"
          ></TextInput>
          <TextInput
            style={styles.ExpenseInputTwo}
            placeholder="$"
            keyboardType="numeric"
            value={cost}
            onChangeText={(text) => setCost(text)}
            placeholderTextColor="#b69eeb"
          ></TextInput>
          <Ionicons
            style={styles.wallet}
            name="add-circle"
            style={styles.submitPlusButton}
            onPress={() => handleAddExpense()}
            size={40}
            color="#7354b6"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
    // </ApolloProvider>`
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7354b6",
  },
  wallet: {
    marginRight: 10,
  },
  titleWrapper: {
    marginTop: 80,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#b69eeb",
    marginHorizontal: 20,
    marginTop: 16,
  },
  subTitleWrapper: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#7354b6",
  },
  ExpenseInputWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginHorizontal: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    width: "100%",

    backgroundColor: "#fff",
  },
  ExpenseInputOne: {
    // marginTop: 10,
    marginVertical: 10,
    height: 40,
    borderColor: "#b69eeb",
    borderWidth: 0.3,
    paddingHorizontal: 20,
    // marginHorizontal: 20,
    borderRadius: 10,
    fontSize: 16,
    flex: 0.92,
  },
  ExpenseInputTwo: {
    marginVertical: 10,
    height: 40,
    borderColor: "#b69eeb",
    borderWidth: 0.3,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    fontSize: 16,
    flex: 0.08,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  // scrollExpenses: { paddingBottom: 60, overflowY: "scroll" },
  "expensesStrips:last-child": {
    paddingBottom: "4rem",
  },
});
