import React from 'react';
import {StyleSheet, Text, View, Linking} from 'react-native';
import axios from 'axios';
import {FlatList} from 'react-native-gesture-handler';
import {Card} from '@paraboly/react-native-card';

export default class HttpRequestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: null,
    };
    //
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
      // console.log(res.data);
      const people = res.data;
      this.setState({people});
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.people}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => (
            <Card
              style={styles.card}
              iconDisable
              title={item.name}
              content={item.email}
              bottomRightText={item.phone}
              onPress={() => {
                Linking.openURL(`tel:${item.phone}`);
              }}
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: '100%',
    paddingBottom: 10,
    paddingRight: 10,
    paddingLeft: 10,
  },
});
