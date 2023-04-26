import React, { Component, useState } from 'react';
import { View, Text } from 'react-native';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import Categories from './Categories';
import { DateCard } from './DateCard';
import RideOptionsCard from './RideOptionsCard';


class BookingSteps extends Component {
  static navigationOptions = {
    header: null
  };

  defaultScrollViewProps = {
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center'
    }
  };

  onNextStep = () => {
  };

  onPrevStep = () => {
  };

  onSubmitSteps = () => {
    alert('Payment step completed!');
  };

  render() {
    const progressStepsStyle = {
      activeStepIconBorderColor: '#686868',
      activeLabelColor: '#686868',
      activeStepNumColor: 'white',
      activeStepIconColor: '#686868',
      completedStepIconColor: 'black',
      completedProgressBarColor: 'black',
      completedCheckColor: 'white'
    };

    const buttonTextStyle = {
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: "black",
      padding: 10,
      borderRadius: 20
    };
   
    return (
      <View >
        <ProgressSteps {...progressStepsStyle}>
          <ProgressStep
            label="Work"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={buttonTextStyle}
          >
            <Categories/>
          </ProgressStep>

         {/* ==================================================== */}

          <ProgressStep
            label="Schedule"
            onNext={this.onNextStep}
            onPrevious={this.onPrevStep}
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
          >
              <DateCard/>
          </ProgressStep>
         {/* ==================================================== */}
          <ProgressStep
            label="Appoint"
            onPrevious={this.onPrevStep}
            onSubmit={this.onSubmitSteps}
            scrollViewProps={this.defaultScrollViewProps}
            nextBtnTextStyle={buttonTextStyle}
            previousBtnTextStyle={buttonTextStyle}
          >
             <RideOptionsCard/>
          </ProgressStep>
        </ProgressSteps>
      </View>
    );
  }
}

export default BookingSteps;