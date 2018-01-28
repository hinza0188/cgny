import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as Hexagon from './Hexagon';

class HexCanvas extends Component {
    constructor(props) {
        super(props);

        this.purple = ["rgb(191,212,239)", "rgb(171,185,224)", "rgb(134,152,200)", "rgb(43,68,160)", "rgb(56,81,163)", "rgb(84,102,178)"];
        this.blue = ["rgb(171,181,183)", "rgb(1,45,116)", "rgb(2,73,129)", "rgb(136,152,169)", "rgb(103,124,155)", "rgb(59,98,141)"];
        this.colors = ["rgb(255,229,196)", "rgb(108,194,189)", "rgb(90,129,158)", "rgb(255,193,168)", "rgb(246,127,125)", "rgb(124,122,161)"];

        this.state = {
            time: 0,
            background: {
                color: 'rgb(232,236,237)',
                x: 0,
                y: 0,
                width: 800,
                height: 600,
            },
            shapeOrder: [],
            shapes: {},
            x:0,
            y:0,
        };
        this.drawShapes = this.drawShapes.bind(this);
    }

    /*
    _onMouseMove(e) {
        let canvas = ReactDOM.findDOMNode(this.refs.hexCanvas);
        let offset = canvas.getBoundingClientRect();
        this.setState({ x:e.clientX, y:e.clientY-offset.top});
    }
    */

    _onClick(e) {
        let canvas = ReactDOM.findDOMNode(this.refs.hexCanvas);
        let offset = canvas.getBoundingClientRect();
        let x = e.clientX;
        let y = (e.clientY - offset.top);

        this.state.shapeOrder.forEach( k => {
            let s = this.state.shapes[k];
            let dist = Math.sqrt(
                Math.pow((s.x - x),2) +
                Math.pow((s.y - y),2)
            );
            if (dist < this.state.size) {
                let key = ''+s.x+','+s.y;
                this.setState({
                    shapes: {
                        ...this.state.shapes,
                        [key]: {
                            ...this.state.shapes[key],
                            color: this.colors,
                        }
                    }
                });
            }
        });
    }

    componentDidMount() {
        let shapes = {};
        let size = 10;
        let canvasWidth = window.innerWidth;
        let canvasHeight = window.innerHeight;

        for (let i = 0; i < canvasWidth/(size*3); i++) {
            for (let j = 0; j < canvasHeight/(size*3); j++) {
                let n1 = {
                    x: i*size*6,
                    y: j*size*Math.sqrt(3)*2,
                    size: size,
                    color: null,
                };
                let n1key = ''+n1.x+','+n1.y;
                this.state.shapeOrder.push(n1key);
                shapes[n1key] = n1;

                let n2 = {
                    x: (i-1/2)*size*6,
                    y: (j-1/2)*size*Math.sqrt(3)*2,
                    size: size,
                    color: null,
                };
                let n2key = ''+n2.x+','+n2.y;
                this.state.shapeOrder.push(n2key);
                shapes[n2key] = n2;
            }
        }

        this.setState({
            shapes,
            size,
            canvasWidth,
            canvasHeight,
        });

        // initial draw
        setTimeout(this.drawShapes, 10);
        this.timer = setInterval( this.drawShapes, 5000 );
    }

    drawShapes() {
        let canvas = ReactDOM.findDOMNode(this.refs.hexCanvas);
        let context = canvas.getContext('2d');
        // sizing
        
        canvas.width = this.state.canvasWidth;
        canvas.height = this.state.canvasHeight;

        this.setState({
            canvas,
            context,
            time: this.state.time + 1,
        });

        this.state.shapeOrder.forEach( k => {
            let s = this.state.shapes[k];
            Hexagon.drawHexagon(this.state.context, s.x, s.y, s.size, s.color);
        });
    }

    render() {
        const {x, y} = this.state;
        return (
            <div className="hex-canvas">
                <p>Current Stage: {this.state.time} </p>
                <p>Mouse Coordinates: ({x}, {y})</p>
                <canvas id="hex-canvas" ref="hexCanvas" width="100%" height="100%"
                    //onMouseMove={this._onMouseMove.bind(this)}
                    onClick={this._onClick.bind(this)}
                />
            </div>
        );
    }
}

export default HexCanvas;
