export function drawhex(context) {
        let side = 0;
        let size = 100;
        let x = 500;
        let y = 200;
       
        context.fillStyle = "#333333";
        console.log(context);

        context.beginPath();
        context.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));
    
        for (side; side < 7; side++) {
          context.lineTo(x + size * Math.cos(side * 2 * Math.PI / 6), y + size * Math.sin(side * 2 * Math.PI / 6));
        }

        context.fill();   
};

export default {
    drawhex,
};