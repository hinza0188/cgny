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
    colors = ["green","black","red","red","black","green"];
  }

  drawTriangleU(
    context,
    x,
    y + size*Math.sqrt(3),
    size,
    colors[0]
  );
  drawTriangleD(
    context,
    x + size*2,
    y + size*Math.sqrt(3),
    size,
    colors[1]
  );
  drawTriangleU(
    context,
    x + size*2,
    y + size*Math.sqrt(3),
    size,
    colors[2]
  );

  // bottom 3
  drawTriangleD(
    context,
    x + size,
    y + (2)*size*Math.sqrt(3),
    size,
    colors[3]
  );
  drawTriangleU(
    context,
    x + size,
    y + (2)*size*Math.sqrt(3),
    size,
    colors[4]
  );
  drawTriangleD(
    context,
    x + size*3,
    y + (2)*size*Math.sqrt(3),
    size,
    colors[5]
  );

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