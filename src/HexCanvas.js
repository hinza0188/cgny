import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as Hexagon from './Hexagon';

class HexCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = this.initializeState();
    }

    initializeState() {
        return {
            time: 0,
            background: {
                color: 'rgb(232,236,237)',
                x: 0,
                y: 0,
                width: 1000,
                height: 800,
            },
            shapes: [
                {
                    name: "Rectangle 1",
                    color: 'rgb(100,0,0)',
                    x: 100,
                    y: 100,
                    width: 120,
                    height: 80,
                },
                {
                    name: "Rectangle 2",
                    color: 'rgb(0,100,0)',
                    x: 300,
                    y: 200,
                    width: 80,
                    height: 120,
                },
            ],
        };
    }

    componentDidMount() {
        let canvas = ReactDOM.findDOMNode(this.refs.hexCanvas);
        let context = canvas.getContext('2d');

        // background
        let bg = this.state.background;
        context.fillStyle = bg.color;
        context.fillRect(bg.x, bg.y, bg.width, bg.height);

        this.state.shapes.forEach( s => {
            context.fillStyle = s.color;
            context.fillRect(s.x, s.y, s.width, s.height);
        });
        context.fillStyle = 'rgb(100,0,0)';
        context.fillRect(100,100,120,80);

        Hexagon.drawhex(context);
    }

    render() {
        return (
            <div className="hex-canvas">
                <canvas id="hex-canvas" ref="hexCanvas" width="1000" height="800">


                </canvas>
            </div>
        );
    }
}

export default HexCanvas;
