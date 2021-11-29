import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Expense = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.square}></TouchableOpacity>
      </View>
      <View style={styles.textAndCost}>
        <Text style={styles.itemText}>{props.text}</Text>
        <Text style={styles.cost}>${props.cost}</Text>
      </View>

      {/* <View style={styles.circular}></View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#2e64e515",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    height: 24,
    width: 24,
    backgroundColor: "#b69eeb",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: { maxWidth: "80%" },
  circular: {
    height: 12,
    width: 12,
    borderColor: "#b69eeb",
    borderWidth: 2,
    borderRadius: 5,
    marginRight: 20,
  },
  textAndCost: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  cost: { fontWeight: "bold", marginRight: 20 },
});

export default Expense;
