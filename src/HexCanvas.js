import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as Hexagon from './Hexagon';

class HexCanvas extends Component {

    componentDidMount() {
        let canvas = ReactDOM.findDOMNode(this.refs.hexCanvas);
        let context = canvas.getContext('2d');

        context.fillStyle = 'rgb(100,0,0)';
        context.fillRect(100,100,120,80);

        Hexagon.drawhex(context);
    }

    render() {
        return (
            <div className="hex-canvas">
                <canvas id="hex-canvas" ref="hexCanvas" width="1280" height="800">


                </canvas>
            </div>
        );
    }
}

export default HexCanvas;
