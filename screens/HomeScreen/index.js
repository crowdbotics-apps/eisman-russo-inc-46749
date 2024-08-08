import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { store } from "../../redux/Store";
import { appActions } from "../../redux/actions/AppAction";
import { ScreenNames, StackNames } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { GET } from "../../services/interceptor/ApiMethod";
import { END_POINTS } from "../../utils/EndPoints";
import {
  checkInternetConnection,
  getDeviceID
} from "../../services/interceptor/Interceptor";
import { styles } from "./styles";
import { Colors } from "../../theme/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Fonts } from "../../theme/Typography";

import UserCard from "../../assets/svgs/UserCard.svg";
import AssesmentIcon from "../../assets/svgs/AssesmentIcon.svg";
import Truck from "../../assets/svgs/Truck.svg";
import HomeItem from "./HomeItem";
import Spacing from "../../components/core/spacing/Spacing";
const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const [user, setUser] = useState({});
  const fetchUserProfile = async () => {
    setUser(store.getState().appReducer?.userProfile);
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.white }}>
      <View
        style={{
          backgroundColor: Colors.primaryBlue,
          height: hp(25),
          paddingTop: insets.top,
          paddingHorizontal: 16
        }}
      >
        <View style={{ height: hp(3) }} />
        <Text style={[Fonts.dSmallRegular, { color: Colors.white }]}>
          Welcome Back
        </Text>
        <Text
          style={[
            Fonts.dMediumBold,
            styles.headingStyle,

            { color: Colors.white }
          ]}
        >
          {user?.name}
        </Text>
        <Text
          style={[
            Fonts.dSmallRegular,
            styles.subHeadingStyle,
            { color: Colors.white }
          ]}
        >
          Select your role based on your task to proceed with your day.
        </Text>
      </View>
      <ScrollView style={{ paddingHorizontal: 16, marginTop: hp(2) }}>
        <HomeItem
          onPress={() => {
            navigation.navigate(ScreenNames.FMTicketList);
          }}
          title={"Field Monitor"}
          icon={<UserCard height={hp(4)} width={wp(8)} />}
        />
        <HomeItem
          title={"Site Monitor"}
          icon={<UserCard height={hp(4)} width={wp(8)} />}
        />
        <HomeItem
          title={"Truck Certification"}
          icon={<Truck height={hp(4)} width={wp(8)} />}
        />
        <HomeItem
          title={"Assessment"}
          icon={<AssesmentIcon height={hp(4)} width={wp(8)} />}
        />
        <Spacing height={hp(1)} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
