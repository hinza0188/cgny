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
        this.findClosest = this.findClosest.bind(this);
        this.findNeighbors = this.findNeighbors.bind(this);
    }

    _onClick(e) {
        let canvas = ReactDOM.findDOMNode(this.refs.hexCanvas);
        let offset = canvas.getBoundingClientRect();
        let x = e.clientX;
        let y = (e.clientY - offset.top);

        let closest = this.findClosest(x,y);

        if (!!closest) {
            this.setState({
                shapes: {
                    ...this.state.shapes,
                    [closest]: {
                        ...this.state.shapes[closest],
                        color: this.colors,
                    }
                }
            });
        }
    }

    findClosest(x,y) {
        let closest = null;
        let closestDist = null;
        for (let i = Math.floor(x-this.state.size*2); i < Math.floor(x+this.state.size*2); i++) {
            for (let j = Math.floor(y-this.state.size*2); j < Math.floor(y+this.state.size*2); j++) {
                let k = ''+i+','+j;
                let s = this.state.shapes[k];
                if (!!s) {

                    let dist = Math.sqrt(
                        Math.pow((s.x - x),2) +
                        Math.pow((s.y - y),2)
                    );
                    if (dist < this.state.size*3) {
                        if (!closestDist || closestDist > dist) {
                            closest = k;
                            closestDist = dist;
                        };
                    }
                }
            }
        }

        return closest;
    }

    componentDidMount() {
        let shapes = {};
        let size = 12;
        let canvasWidth = window.innerWidth;
        let canvasHeight = window.innerHeight;

        for (let i = 0; i < canvasWidth/(size*2); i++) {
            for (let j = 0; j < canvasHeight/(size*2); j++) {
                let n1 = {
                    x: i*size*6,
                    y: j*size*Math.sqrt(3)*2,
                    size: size,
                    color: null,
                };
                let n1key = ''+Math.floor(n1.x)+','+Math.floor(n1.y);
                this.state.shapeOrder.push(n1key);
                shapes[n1key] = n1;

                let n2 = {
                    x: (i-1/2)*size*6,
                    y: (j-1/2)*size*Math.sqrt(3)*2,
                    size: size,
                    color: null,
                };
                let n2key = ''+Math.floor(n2.x)+','+Math.floor(n2.y);
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
        this.timer = setInterval( this.drawShapes, 50 );
    }

    findNeighbors(shape) {
        let x = shape.x;
        let y = shape.y;

        let size3 = 3*this.state.size;
        let sizeSqrt3 = Math.sqrt(3)*this.state.size;

        let closestNeighbors = [
            this.state.shapes[this.findClosest((x - size3), (y - sizeSqrt3))],
            this.state.shapes[this.findClosest(x, (y - 2*sizeSqrt3))],
            this.state.shapes[this.findClosest((x + size3), (y - sizeSqrt3))],
            this.state.shapes[this.findClosest((x + size3), (y + sizeSqrt3))],
            this.state.shapes[this.findClosest(x, (y + 2*sizeSqrt3))],
            this.state.shapes[this.findClosest((x - size3), (y + sizeSqrt3))],
        ];

        return closestNeighbors;
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

            let n = this.findNeighbors(s);
            //let n = "grey, grey, grey, grey, grey, grey"
            let colorGrey = 0;
            let colorColor = 0;
            
            let grey = 'rgb(232,236,237)';

            (n[0] === grey ) ? colorGrey++ : colorColor++;
            (n[1] === grey ) ? colorGrey++ : colorColor++;
            (n[2] === grey ) ? colorGrey++ : colorColor++;
            (n[3] === grey ) ? colorGrey++ : colorColor++;
            (n[4] === grey ) ? colorGrey++ : colorColor++;
            (n[5] === grey ) ? colorGrey++ : colorColor++;

            if((colorColor >3 || colorColor <2) && s.color !==grey)
            {
                s.color = grey;   
            }            
            
            if((colorColor ===3) && s.color === grey)
            {
                s.color = this.colors;
            }


            /**
            
            if (n[0] == grey && n[1] != grey && n[2] != grey && n[3] != grey && n[4] != grey && n[5] != grey ) //1 grey 5 color, dies from overpopulation
            {
                s.color = grey;    
            }
            else if(n[0] == grey && n[1] == grey && n[2] != grey && n[3] != grey && n[4] != grey && n[5] != grey) //2 grey 4 color, dies from overpopulation
            {
                s.color = grey; 
            }
            else if(n[0] == grey && n[1] != grey && n[2] != grey && n[3] != grey && n[4] != grey && n[5] != grey)
            {

            }
            else if(n[0] == grey && n[1] != grey && n[2] != grey && n[3] != grey && n[4] != grey && n[5] != grey)
            {

            }
            else if (n[0] == grey && n[1] != grey && n[2] != grey && n[3] != grey && n[4] != grey && n[5] != grey)
            {

            }

            **/




            Hexagon.drawHexagon(this.state.context, s.x, s.y, s.size, s.color);
        });
    }

    render() {
        return (
            <div className="hex-canvas">
                <h1>Current Stage: {this.state.time}</h1>
                <canvas id="hex-canvas" ref="hexCanvas" width="100%" height="100%"
                    onClick={this._onClick.bind(this)}
                />
            </div>
        );
    }
}

export default HexCanvas;
