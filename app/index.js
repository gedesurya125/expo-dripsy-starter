import React from "react";
// import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../ui";
import { Text, View } from "dripsy";

import { Platform } from "react-native";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

export default function Page() {
  const insets = useSafeAreaInsets();
  return (
    <View
      sx={{
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: insets.top,
        backgroundColor: "$background",
      }}
    >
      <View
        sx={{
          flex: 1,
          justifyContent: "center",
          maxWidth: 960,
          mx: "auto",
        }}
      >
        <Text
          sx={{
            fontSize: 64,
            fontWeight: "bold",
            color: "$text",
          }}
        >
          Home Page
        </Text>
        <Text
          sx={{
            fontSize: 36,
            color: "$primary",
          }}
        >
          This is the Home Page
        </Text>
        <Button
          sx={{
            mt: "$3",
          }}
        >
          PrimaryButton
        </Button>
        <Button
          variant="secondary"
          sx={{
            mt: "$3",
          }}
        >
          SecondaryButton
        </Button>
        <Button
          variant="destructive"
          sx={{
            mt: "$3",
          }}
        >
          SecondaryButton
        </Button>
        <SelectExample />
      </View>
    </View>
  );
}

const VALUES = {
  apple: "Apple",
  banana: "Banana",
  blueberry: "Blueberry",
  grapes: "Grapes",
  pineapple: "Pineapple",
};

const SelectExample = () => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState();
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  function onValueChange(val) {
    // prevent unselecting on native to replicate web behavior
    if (val) {
      // On web, the label and the value are the same.
      // Ex: { label: 'apple', value: 'apple' }
      // To replicate the native behavior, we need to set the proper label
      if (Platform.OS === "web") {
        val.label = val.label in VALUES ? VALUES[val.label] : val.label;
      }
      setValue(val);
    }
  }

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={onValueChange}
    >
      <SelectTrigger className="w-[250px]">
        <SelectValue
          className="text-foreground text-sm native:text-lg"
          placeholder="Select a fruit"
        />
      </SelectTrigger>
      <SelectContent insets={contentInsets} className="w-[250px]">
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem label="Apple" value="apple">
            Apple
          </SelectItem>
          <SelectItem label="Banana" value="banana">
            Banana
          </SelectItem>
          <SelectItem label="Blueberry" value="blueberry">
            Blueberry
          </SelectItem>
          <SelectItem label="Grapes" value="grapes">
            Grapes
          </SelectItem>
          <SelectItem label="Pineapple" value="pineapple">
            Pineapple
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
