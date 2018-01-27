export function drawhex(context, x, y, size, color) {
  context.fillStyle = color;

  context.beginPath();
  context.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

  for (let side = 0; side < 7; side++) {
    context.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
  }

  context.fill();
};

export default {
  drawhex,
};