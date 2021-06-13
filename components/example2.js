import React from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import { View, Text } from 'react-native'

export default class example2 extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            value: null,
            items: [
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' }
            ]
        };

        this.setValue = this.setValue.bind(this);
    }

    setOpen = (open) => {
        this.setState({
            open
        });
    }

    setValue = (callback) => {
        this.setState(state => ({
            value: callback(state.value)
        }));
    }

    setItems = (callback) => {
        this.setState(state => ({
            items: callback(state.items)
        }));
    }

    render() {
        const { open, value, items } = this.state;

        return (
            <View style={{marginTop:50}}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={this.setOpen}
                    setValue={this.setValue}
                    setItems={this.setItems}

                />
            </View>

        );
    }
}

