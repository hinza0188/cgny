export function drawhex(context, x, y, size, color) {
    context.fillStyle = color;

    context.beginPath();
    context.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    for (let side = 0; side < 7; side++) {
        context.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
    }

    context.fill();
};

export function drawHexagon(context, x, y, size) {
  drawTriangleU(
    context,
    x,
    y + size*Math.sqrt(3),
    size,
    "green"
  );
  drawTriangleD(
    context,
    x + size*2,
    y + size*Math.sqrt(3),
    size,
    "black"
  );
  drawTriangleU(
    context,
    x + size*2,
    y + size*Math.sqrt(3),
    size,
    "red"
  );

  // bottom 3
  drawTriangleD(
    context,
    x + size,
    y + (2)*size*Math.sqrt(3),
    size,
    "red"
  );
  drawTriangleU(
    context,
    x + size,
    y + (2)*size*Math.sqrt(3),
    size,
    "black"
  );
  drawTriangleD(
    context,
    x + size*3,
    y + (2)*size*Math.sqrt(3),
    size,
    "green"
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