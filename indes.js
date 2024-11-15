let hour = document.getElementById('hora');
let min = document.getElementById('minuto');
let sec = document.getElementById('segundo');

setInterval(() => {
    let date = new Date();

    //obtener hora, min y seg
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    //calcular la hora
    let hRotation = 30*hh + mm/2;
    let mRotation = 6*mm;
    let sRotation = 6*ss;   

    //estilo para las agujas
    hour.style.transform = `rotate(${hRotation}deg)`;
    min.style.transform = `rotate(${mRotation}deg)`;
    sec.style.transform = `rotate(${sRotation}deg)`;

}, 1000);

