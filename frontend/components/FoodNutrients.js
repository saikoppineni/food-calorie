import React from "react";
import { Table, Row, Rows } from "react-native-table-component";
const FoodNutrients = (props) => {
  return (
    <Table>
      <Row data={["Nutrient", "Amount"]} />
      <Rows
        data={[
          ["Calories", props.nf_calories],
          ["Protein", props.nf_protein],
          ["Fat", props.nf_fat],
          ["Carbs", props.nf_carbohydrates],
        ]}
      />
    </Table>
  );
};

export default FoodNutrients;
