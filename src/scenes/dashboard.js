import React, { Component } from 'react';
import { View, Text, WebView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Header } from '../components/layouts';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './styles';
import { ENTRIES } from './example/';
import SliderEntry from '../components/carousel';

class Dashboard extends Component {

	static navigationOptions = {
	    tabBarLabel: "Dashboard",
	    swipeEnabled: false,
	    tabBarIcon: () => <Icon size={24} name="dashboard" color="#616161" />
	}

	_renderItem ({item, index}) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
            />
        );
    }

	render() {
		const { params } = this.props.navigation.state;
		return (
			<View style={styles.container}>
				<Carousel
	              ref={(c) => { this._carousel = c; }}
	              data={ENTRIES}
	              renderItem={this._renderItem}
	              sliderWidth={sliderWidth}
	              itemWidth={itemWidth}
	            />
            </View>
		);
	}
}

const styles = {
	container: {
        flex: 1,
        paddingTop: 20,
    },
};

export default Dashboard;
