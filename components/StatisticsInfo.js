import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import InfoCard from "./InfoCard";

function StatisticsInfo() {
  const words = useSelector((state) => state.wordsLearning.words);
  const isDark = useSelector((state) => state.theme.isDark);

  const toLearn = words.filter((item) => item.status === 0).length;
  const inProcess = words.filter((item) => item.status === 1).length;
  const learned = words.filter((item) => item.status === 2).length;

  return (
    <View style={styles.container}>
      <InfoCard
        caption={"To learn"}
        number={toLearn}
        color={isDark ? "hotpink" : "mediumvioletred"}
      />
      <InfoCard
        caption={"In process"}
        number={inProcess}
        color={isDark ? "lightgreen" : "green"}
      />
      <InfoCard
        caption={"Learned"}
        number={learned}
        color={isDark ? "lightblue" : "mediumblue"}
      />
    </View>
  );
}

export default StatisticsInfo;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "20%",
  },
});