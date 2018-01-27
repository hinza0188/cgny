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

        let size = 50;
        let purple = ["rgb(191,212,239)", "rgb(171,185,224)", "rgb(134,152,200)", "rgb(43,68,160)", "rgb(56,81,163)", "rgb(84,102,178)"];
        let blue = ["rgb(171,181,183)", "rgb(1,45,116)", "rgb(2,73,129)", "rgb(136,152,169)", "rgb(103,124,155)", "rgb(59,98,141)"];
        let colors = ["rgb(255,229,196)", "rgb(108,194,189)", "rgb(90,129,158)", "rgb(255,193,168)", "rgb(246,127,125)", "rgb(124,122,161)"];

        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 7; j++) {
                Hexagon.drawHexagon(context, i*size*6, j*size*Math.sqrt(3)*2, size);
                Hexagon.drawHexagon(context, (i-1/2)*size*6, (j-1/2)*size*Math.sqrt(3)*2, size);
            }
        }
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
