import React from 'react';
import { View, Image,Text,ImageBackground } from 'react-native';
// import CardStack, { Card } from 'react-native-card-stack-swiper';
import CardsSwipe from 'react-native-cards-swipe';
import City from '../components/City';
import Filters from '../components/Filters';
// import CardItem from '../components/CardItem';
import styles from '../assets/styles';
import Demo from '../assets/data/demo.js';


const Home = () => {
  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.bg}
    >
      <View style={styles.containerHome}>
        <View style={styles.top}>
          <City />
          <Filters />
        </View>

{/* ========================================================= */}
        <CardsSwipe
        cards={Demo}
        cardContainerStyle={styles.cardContainer}
        renderCard={(card) => (
          <View style={styles.card}>
            <Image
              style={styles.cardImg}
              source={card.src}
            />
            <Text>{card.name}</Text>
            <Text>{card.description}</Text>
          </View>
        )}
      />
{/* ========================================================= */}

        {/* <CardStack
          loop={true}
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          ref={swiper => (this.swiper = swiper)}
        >
          {Demo.map((item, index) => (
            <Card key={index}>
              <CardItem
                image={item.image}
                name={item.name}
                description={item.description}
                matches={item.match}
                actions
                onPressLeft={() => this.swiper.swipeLeft()}
                onPressRight={() => this.swiper.swipeRight()}
              />
            </Card>
          ))}
        </CardStack> */}

      </View>
    </ImageBackground>
  );
};

export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   cardContainer: {
//     width: '92%',
//     height: '70%',
//   },
//   card: {
//     width: '100%',
//     height: '100%',
//     shadowColor: '#000000',
//     shadowOffset: {
//       width: 0,
//       height: 8,
//     },
//     shadowOpacity: 0.07,
//     shadowRadius: 3.3,
//   },
//   cardImg: {
//     width: '100%',
//     height: '100%',
//     borderRadius: 13,
//   },
// });
