import React, { useEffect, useState } from "react";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Icon } from "react-native-elements";
import { StyleSheet, Text, TextInput ,ScrollView,TouchableOpacity, Button,View } from "react-native";

export const DateCard = () => {
  const [date, setDate] = useState(new Date(1598051730000));

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
  
<ScrollView>
      <TouchableOpacity className="flex-row item-center space-x-2 pb-2 mx-4" onPress={showDatepicker}>
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3"  >
          <Icon name="calendar" type="font-awesome" color="white" size={16} />
          <TextInput
            placeholder="Select date"
            keyboardType="default"
            
            selectTextOnFocus={false}
            value={date}

          />
        </View>
      </TouchableOpacity>

    

      <TouchableOpacity className="flex-row item-center space-x-2 pb-2 mx-4" onPress={showTimepicker}>
          <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3" >
            <Icon name="calendar" type="font-awesome" color="white" size={16} />
            <TextInput
              placeholder="Select time"
              keyboardType="default"
              editable={false}
              selectTextOnFocus={false}
            />
          </View>
      </TouchableOpacity>

      
</ScrollView>
  );
};


