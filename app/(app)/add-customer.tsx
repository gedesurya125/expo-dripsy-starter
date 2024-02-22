import { useSession } from "components/ctx";
import React from "react";
import { ScrollView, Text, TextInput, View, useSx } from "dripsy";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "ui";
import { InputField } from "components/forms/InputField";
import { StyledDateTimePicker, StyledIcons } from "theme/components";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddCustomerPage() {
  return (
    <ScrollView
      sx={{
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: "$background",
      }}
    >
      <Text
        sx={{
          fontSize: 30,
          fontWeight: "bold",
          color: "$text",
          mt: "$5",
        }}
      >
        New Customer
      </Text>
      <Text
        sx={{
          fontSize: 14,
          color: "$text",
        }}
      >
        This is the first page of your app.
      </Text>
      <InputField
        label="Name"
        sx={{
          mt: "$4",
        }}
      />
      <InputField
        label="Address"
        sx={{
          mt: "$4",
        }}
      />
      <InputField
        label="City"
        sx={{
          mt: "$4",
        }}
      />
      <InputField
        label="State"
        sx={{
          mt: "$4",
        }}
      />
      <DateInput />
      <Button
        sx={{
          mt: "$5",
          mb: "$5",
        }}
      >
        Add Customer
      </Button>
    </ScrollView>
  );
}

const DateInput = ({}) => {
  const [date, setDate] = React.useState(new Date(1598051730000));

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const sx = useSx();

  return (
    <View
      sx={{
        mt: "$4",
      }}
    >
      <Text
        sx={{
          color: "$text",
        }}
      >
        Date Of Birth
      </Text>
      <View
        sx={{
          position: "relative",
          alignItems: "center",
          justifyContent: "flex-end",
          flexDirection: "row",
          mt: "$2",
        }}
      >
        <TextInput
          variant="input"
          sx={{
            flexGrow: 1,
          }}
          value={date.toLocaleDateString()}
        />
        <Button variant="iconButtonPrimary" onPress={() => {}}>
          <StyledIcons
            name="calendar"
            size={24}
            sx={{
              color: "white",
              fontSize: 14,
            }}
          />
        </Button>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
          style={sx({
            position: "absolute",
            opacity: 0.04,
          })}
        />
      </View>
    </View>
  );
};
