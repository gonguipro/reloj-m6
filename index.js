let hour = document.getElementById('hora');
let min = document.getElementById('minuto');
let sec = document.getElementById('segundo');

setInterval(() => {
    let date = new Date();

    // Obtener hora, minuto y segundo
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();

    // Normalizamos la hora para que esté entre 0 y 12 (12 horas)
    hh = hh % 12;

    // Calcular las rotaciones de las agujas
    // 30 grados por hora + (minutos / 2) para ajustar la aguja de la hora
    let hRotation = (30 * hh) + (mm / 2);
    let mRotation = 6 * mm; // 6 grados por cada minuto
    let sRotation = 6 * ss; // 6 grados por cada segundo

    // Aplicar las rotaciones a las agujas
    hour.style.transform = `rotate(${hRotation}deg)`;
    min.style.transform = `rotate(${mRotation}deg)`;
    sec.style.transform = `rotate(${sRotation}deg)`;

}, 1000); // Actualiza cada segundo
