import { StyleSheet, Text, View, SafeAreaView,TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";
import { Fonts } from "../../theme/Typography";
import { CommonStyles } from "../../theme/CommonStyles";
import Spacing from "../../components/core/spacing/Spacing";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { store } from "../../redux/Store";
import { Colors } from "../../theme/Colors";
import Lock from "../../assets/svgs/Lock.svg";
import ArrowForward from "../../assets/svgs/ArrowForward.svg";
import { appActions } from "../../redux/actions/AppAction";
import { StackNames } from "../../utils/constants";

const ProfileScreen = ({navigation}) => {
  return (
    <SafeAreaView
      style={styles.mainContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={CommonStyles.p8}>
        <Text style={[Fonts.h6SemiBold]}>{"Profile"}</Text>
        <Spacing height={hp(3)} />
        <View style={CommonStyles.VerticalCenter}>
          <Text style={[Fonts.dLargeSemiBold]}>
            {store.getState().appReducer?.userProfile?.name}
          </Text>
          <Text style={[Fonts.dxSmallRegular, { color: Colors.secondary200 }]}>
            {store.getState().appReducer?.userProfile?.email}
          </Text>
        </View>
        <Spacing height={hp(5)} />

        <View
          style={[
            CommonStyles.card,
            {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: hp(2)
            }
          ]}
        >
          <View style={[CommonStyles.row, { alignItems: "center" }]}>
            <Lock />
            <Spacing width={wp(2)} />
            <Text style={[Fonts.dSmallMedium, { color: Colors.grey700 }]}>
              Change Password
            </Text>
          </View>
          <ArrowForward />
        </View>
        <Spacing height={hp(3)} />
        <TouchableOpacity
          onPress={() => {
            store.dispatch(
              appActions.setAccessToken({
                accessToken: null
              })
            );
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: StackNames.AuthStack
                }
              ]
            });
          }}
          style={[styles.logoutItem, { paddingVertical: hp(1.5) }]}
        >
          <Text
            style={[
              Fonts.dSmallMedium,
              { color: Colors.grey700, alignSelf: "center" }
            ]}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
