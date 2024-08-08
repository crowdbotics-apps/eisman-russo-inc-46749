import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Spacing from "../../../components/core/spacing/Spacing";
import { CommonStyles } from "../../../theme/CommonStyles";
import Button from "../../../components/core/button";
import { Fonts } from "../../../theme/Typography";
import { Colors } from "../../../theme/Colors";
import TruckGray from "../../../assets/svgs/TruckGray.svg";
import QRIcon from "../../../assets/svgs/QRIcon.svg";
import FieldMonitorIcon from "../../../assets/svgs/FieldMonitorIcon.svg";
import Calendar from "../../../assets/svgs/Calendar.svg";
import EyeView from "../../../assets/svgs/EyeView.svg";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { capitalizeFirstLetters } from "../../../utils/helperFunctions";
const TicketItem = ({ ticket }) => {
  return (
    <View
      style={{
        backgroundColor: Colors.greyScale50,
        padding: 16,
        borderRadius: 8,
        marginBottom: hp(2)
      }}
    >
      <View style={[CommonStyles.spaceBetweenH]}>
        <Text style={[Fonts.dMediumMedium]}>Ticket # {ticket?.number}</Text>
        {ticket?.status && (
          <View
            style={[
              {
                paddingVertical: 4,
                paddingHorizontal: 12,
                borderRadius: 100
              },
              {
                backgroundColor:
                  ticket?.status?.toLowerCase() === "open"
                    ? Colors.green100
                    : Colors.red100
              }
            ]}
          >
            <Text
              style={[
                Fonts.dxSmallMedium,
                {
                  color:
                    ticket?.status?.toLowerCase() === "open"
                      ? Colors.green
                      : Colors.red
                }
              ]}
            >
              {capitalizeFirstLetters(ticket?.status || "")}
            </Text>
          </View>
        )}
      </View>
      <Spacing height={hp(3)} />
      <View style={CommonStyles.row}>
        <TruckGray />
        <Spacing width={wp(1)} />
        <Text style={[Fonts.dxSmallRegular, { color: Colors.grey500 }]}>
          Truck No:
          <Spacing width={wp(2)} />
          <Text style={[Fonts.dxSmallMedium, { color: Colors.grey700 }]}>
            {ticket?.truckNo}
          </Text>
        </Text>
      </View>
      <Spacing height={hp(1)} />

      <View style={CommonStyles.row}>
        <Calendar />
        <Spacing width={wp(1)} />
        <Text style={[Fonts.dxSmallRegular, { color: Colors.grey500 }]}>
          Date:
          <Spacing width={wp(2)} />
          <Text style={[Fonts.dxSmallMedium, { color: Colors.grey700 }]}>
            {ticket?.date}
          </Text>
        </Text>
      </View>
      <Spacing height={hp(1)} />
      <View style={CommonStyles.row}>
        <FieldMonitorIcon />
        <Spacing width={wp(1)} />
        <Text style={[Fonts.dxSmallRegular, { color: Colors.grey500 }]}>
          Field Monitor:
          <Spacing width={wp(2)} />
          <Text style={[Fonts.dxSmallMedium, { color: Colors.grey700 }]}>
            {ticket?.fieldMonitorName}
          </Text>
        </Text>
      </View>
      <Spacing height={hp(2)} />

      <View style={[CommonStyles.spaceBetweenH]}>
        <Button
          leftIcon={<QRIcon height={20} width={20} />}
          customStyle={{
            backgroundColor: "white",
            borderWidth: 1,
            borderColor: Colors.greyScale300,
            borderRadius: 8,
            height: hp(4)
          }}
          customTextStyle={[
            {
              color: Colors.grey700
            },
            Fonts.dxSmallMedium
          ]}
          smallBtn={true}
          title={"View QR code"}
          onPress={() => {}}
        />
        <Button
          leftIcon={<EyeView height={20} width={20} />}
          customStyle={{
            height: hp(4),
            borderRadius: 8,

          }}
          customTextStyle={[Fonts.dxSmallMedium, { color: Colors.white }]}
          smallBtn={true}
          title={"View Ticket"}
          onPress={() => {}}
        />
      </View>
      {/* <QRIcon /> */}
    </View>
  );
};

export default TicketItem;
