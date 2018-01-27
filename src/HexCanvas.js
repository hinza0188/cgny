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



        /*
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                Hexagon.drawTriangleU(context, (size*2*i) - (size*(j%2)), size*j*Math.sqrt(3), size, "green");
                Hexagon.drawTriangleD(context, (size*2*i+1) - (size*(j%2)), size*j*Math.sqrt(3), size, "black");
            }
        }
        */

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                Hexagon.drawHexagon(context, i*size*6, j*size*Math.sqrt(3)*2, size);
                Hexagon.drawHexagon(context, (i-1/2)*size*6, (j-1/2)*size*Math.sqrt(3)*2, size);
            }
        }
        //Hexagon.drawTriangleU(context, 0, 100, 50, "blue");
        //Hexagon.drawTriangleD(context, 100, 100, 50, "red");

        //Hexagon.drawTriangleU(context, 100,100, 50, "purple");
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
