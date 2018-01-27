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


        for(var i = 0; i<=15; i++){
            for(var j=0; j<=15; j++){
                if (j%2 === 1) {
                    Hexagon.drawTriangleU(context, (size*2*i), size*j*Math.sqrt(3), size, "blue");
                    Hexagon.drawTriangleD(context, (size*2*i+1), size*j*Math.sqrt(3), size, "red");
                } else {
                    Hexagon.drawTriangleU(context, (size*2*i) - (size), size*j*Math.sqrt(3), size, "blue");
                    Hexagon.drawTriangleD(context, (size*2*i+1) - (size), size*j*Math.sqrt(3), size, "red");
                }
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
