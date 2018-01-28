export function drawhex(context, x, y, size, color) {
    context.fillStyle = color;

    context.beginPath();
    context.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    for (let side = 0; side < 7; side++) {
        context.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
    }

    context.fill();
};

export function drawHexagon(context, x, y, size, colors=[]) {
  if (!colors || colors.length !== 6) {
    // default background colors
    colors = ['rgb(232,236,237)','rgb(232,236,237)','rgb(232,236,237)','rgb(232,236,237)','rgb(232,236,237)','rgb(232,236,237)'];
  }
  // top3
  drawTriangleU(
    context,
    x - size*2,
    y,
    size,
    colors[0]
  );
  drawTriangleD(
    context,
    x,
    y,
    size,
    colors[1]
  );
  drawTriangleU(
    context,
    x,
    y,
    size,
    colors[2]
  );

  // bottom 3
  drawTriangleD(
    context,
    x - size,
    y + size*Math.sqrt(3),
    size,
    colors[3]
  );
  drawTriangleU(
    context,
    x - size,
    y + size*Math.sqrt(3),
    size,
    colors[4]
  );
  drawTriangleD(
    context,
    x + size,
    y + size*Math.sqrt(3),
    size,
    colors[5]
  );

  drawBorder(context, x,y, size);
};


export function drawTriangleU(context, x, y, size, color) {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x+size, y - Math.sqrt(3)*size);
    context.lineTo(x+(2*size), y);
    context.fill();
}

export function drawTriangleD(context, x, y, size, color) {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(x,y);
    context.lineTo(x-size, y - Math.sqrt(3)*size);
    context.lineTo(x+size, y - Math.sqrt(3)*size);
    context.fill();
}

export function drawBorder(context, x, y, size) {
    context.fillStyle = "white";
    let rectWidth = (size/8);
    let rectHeight = (Math.sqrt(3)*size) + (2*rectWidth);

    //context.fillStyle = "white";
    context.translate(x-size,y-(Math.sqrt(3)*size));
    context.rotate(30 * Math.PI / 180);
    context.fillRect(-1,-1,rectWidth,rectHeight);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(0,0);

    //context.fillStyle = "blue";
    context.translate(x+size,y-(Math.sqrt(3)*size));
    context.rotate(90 * Math.PI / 180);
    context.fillRect(-1,-1,rectWidth,rectHeight);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(0,0);

    //context.fillStyle = "orange";
    context.translate(x+(2*size),y);
    context.rotate(150 * Math.PI / 180);
    context.fillRect(-1,-1,rectWidth,rectHeight);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(0,0);

    //context.fillStyle = "purple";
    context.translate(x-(size*2),y);
    context.rotate(-30 * Math.PI / 180);
    context.fillRect(-1,-1,rectWidth,rectHeight);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(0,0);

    //context.fillStyle = "grey";
    context.translate(x-size,y+(Math.sqrt(3)*size));
    context.rotate(-90 * Math.PI / 180);
    context.fillRect(-1,-1,rectWidth,rectHeight);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(0,0);

    //context.fillStyle = "pink";
    context.translate(x+size,y+(Math.sqrt(3)*size));
    context.rotate(210 * Math.PI / 180);
    context.fillRect(-1,-1,rectWidth,rectHeight);
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.translate(0,0);

}
