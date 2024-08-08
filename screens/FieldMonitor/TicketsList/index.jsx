import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import React, { useState } from "react";
import HeaderComponent from "../../../components/core/header/HeaderComponent";
import HeaderRightComponent from "../../../components/core/header/HeaderRightComponent";
import { ScreenNames } from "../../../utils/constants";
import { styles } from "./styles";
import { Fonts } from "../../../theme/Typography";
import { CommonStyles } from "../../../theme/CommonStyles";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import Spacing from "../../../components/core/spacing/Spacing";
import SubTabs from "../../../components/core/subTabs/SubTabs";
import TicketItem from "./TicketItem";
import { Colors } from "../../../theme/Colors";
import Button from "../../../components/core/button";
import AddWhite from "../../../assets/svgs/AddWhite.svg";

const TicketsList = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleTab = input => {
    if (input) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <HeaderComponent
        leftIconPress={() => {
          navigation.goBack();
        }}
        title={"Tickets"}
        rightView={
          <HeaderRightComponent
            onPress={() => {
              navigation.navigate(ScreenNames.HomeScreen);
            }}
          />
        }
      />
      <Spacing height={hp(5)} />

      <View style={[CommonStyles.defaultBody, CommonStyles.flex1]}>
        <View style={styles.titleContainer}>
          <Text style={[Fonts.dSmallSemiBold]}>
            Hurrican Ian COJ Debris Monitoring Service
          </Text>
        </View>
        <Spacing height={hp(2)} />
        <SubTabs
          tab1Toggle={() => {
            setIsOpen(true);
          }}
          tab1Title={"Open"}
          tab2Toggle={() => {
            setIsOpen(false);
          }}
          tab2Title={"Close"}
          isTab1Selected={isOpen}
        />
        <Spacing height={hp(2)} />
        <ScrollView contentContainerStyle={CommonStyles.flexGrow}>
          {isOpen ? (
            <>
              <TicketItem
                ticket={{
                  number: "25100001",
                  truckNo: "JBC500",
                  date: "01/23/2023",
                  fieldMonitorName: "John Popvich",
                  status: "open"
                }}
              />
              <TicketItem
                ticket={{
                  number: "25100001",
                  truckNo: "JBC500",
                  date: "01/23/2023",
                  fieldMonitorName: "John Popvich",
                  status: "open"
                }}
              />
              <TicketItem
                ticket={{
                  number: "25100001",
                  truckNo: "JBC500",
                  date: "01/23/2023",
                  fieldMonitorName: "John Popvich",
                  status: "open"
                }}
              />
            </>
          ) : (
            <View style={[CommonStyles.flex1]}>
              <TicketItem
                ticket={{
                  number: "25100001",
                  truckNo: "JBC500",
                  date: "01/23/2023",
                  fieldMonitorName: "John Popvich",
                  status: "close"
                }}
              />
            </View>
          )}
        </ScrollView>
        <View style={{ backgroundColor: Colors.white, paddingTop: hp(3) }}>
          <Button
            leftIconCss={{ width: 100 }}
            customTextStyle={{ marginLeft: 10 }}
            leftIcon={<AddWhite />}
            title={"Create a new ticket"}
            onPress={() => {}}
          />
          <Spacing height={hp(2)} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TicketsList;
