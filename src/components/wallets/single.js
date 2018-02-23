import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Card, CardSection } from '../layouts';
import { DEFAULT_FONT_BOLD, DEFAULT_FONT_FAMILY } from '../../helpers/constants';

class Single extends Component {
  _onPress = () => {
    this.props.onPressItem(this.props.item);
  };

  render() {
  	const { item } = this.props;
    return (
      <TouchableOpacity onPress={this._onPress}>
        <CardSection>
        	<Image
        		source={require('./../../images/food.png')}
				style={{
					height: 50,
					width: 50,
					resizeMode: 'cover',
					borderRadius: 25,
					margin: 6,
					marginRight: 10,
				}}
			/>
			<View style={{ flex: 4, flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center' }}>
	            <Text style={{ flex: 3, fontFamily: DEFAULT_FONT_BOLD, paddingVertical: 10 }} numberOfLines={1}>
	              {item.description}
	            </Text>
	            <Text style={{ flex: 1, fontFamily: DEFAULT_FONT_FAMILY, paddingVertical: 10, textAlign: 'center', alignSelf: 'center' }}>
	              {item.amount.toFixed(2)}
	            </Text>
            </View>
        </CardSection>
      </TouchableOpacity>
    );
  }
}

export default Single;