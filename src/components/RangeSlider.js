import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {Component} from "react";

class RangeSlider extends Component {
    constructor(props) {
        super(props);

        this.selectionCallback = props.selectionCallback;
        this.ref = props.sliderRef;
        props.maxPromise().then(max => {
            this.setState({
                max: max,
                maxValue: max
            })
        });
        props.minPromise().then(min => {
            this.setState({
                min: min,
                minValue: min
            })
        })

        this.setState({
            min: 20,
            max: 37,
            minValue: 25,
            maxValue: 30
        });
    }

    update(event: Event, newValue: number | number[]) {
        this.setState({
            minValue: newValue[0],
            maxValue: newValue[1]
        })

        if (this.selectionCallback) {
            this.selectionCallback(newValue[0], newValue[1]);
        }
    }

    valuetext(value: number) {
        return `${value}`;
    }

    render() {
        let minValue = this.state !== null ? this.state.minValue : 0;
        let maxValue = this.state !== null ? this.state.maxValue : 10;
        let min = this.state !== null ? this.state.min : 0;
        let max = this.state !== null ? this.state.max : 100;
        return <Slider
                ref={this.sliderRef}
                getAriaLabel={() => 'Temperature range'}
                value={[minValue, maxValue]}
                onChange={(event, newValue) => this.update(event, newValue)}
                valueLabelDisplay="auto"
                getAriaValueText={this.valuetext}
                min={min}
                max={max}
                marks={[{
                    value: min,
                    label: String(min)
                }, {
                    value: max,
                    label: String(max)
                }]}
            />;
    }
}

export default RangeSlider;