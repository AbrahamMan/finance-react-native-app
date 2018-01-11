import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Card, CardSection } from '../layouts';
import DEFAULT_FONT_BOLD from '../../helpers/constants';

class Single extends Component {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <CardSection>
        	<Image
				source={{ uri: 'https://reactjs.org/logo-og.png' }}
				style={{
					height: 50,
					width: 50,
					resizeMode: 'cover',
					borderRadius: 25,
					margin: 6,
					marginRight: 10,
				}}
			/>

            <Text style={{ fontFamily: DEFAULT_FONT_BOLD }}>
              {this.props.description}
            </Text>
        </CardSection>
      </TouchableOpacity>
    );
  }
}

export default Single;