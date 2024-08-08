import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
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
import { ScreenNames, StackNames } from "../../utils/constants";

const ProfileScreen = ({ navigation }) => {
  return (
    <SafeAreaView
      style={styles.mainContainer}
      keyboardShouldPersistTaps="handled"
    >
     
      <View
        style={[CommonStyles.p8, CommonStyles.flex1, CommonStyles.spaceBetween]}
      >
        <View>
          <Text style={[Fonts.h6SemiBold]}>{"Profile"}</Text>
          <Spacing height={hp(3)} />
          <View
            style={[
              {
                backgroundColor: Colors.primaryBlue,
                paddingHorizontal: wp(3),
                paddingVertical: wp(6),
                borderRadius: 8
              }
            ]}
          >
            <Text style={[Fonts.dLargeSemiBold, { color: Colors.white }]}>
              {store.getState().appReducer?.userProfile?.name}
            </Text>
            <Spacing height={hp(1)} />
            <Text style={[Fonts.dxSmallRegular, { color: Colors.white }]}>
              {store.getState().appReducer?.userProfile?.email}
            </Text>
          </View>
          <Spacing height={hp(5)} />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate(ScreenNames.ChangePassword);
            }}
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
          </TouchableOpacity>
          <Spacing height={hp(3)} />
        </View>
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
          style={[
            styles.logoutItem,
            { paddingVertical: hp(1.5), marginBottom: hp(3) }
          ]}
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
