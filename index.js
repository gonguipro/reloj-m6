// Reloj Analógico
var second = 0;
var minute = 0;
var hour = 0;
var d = new Date();

setInterval(function() {
    d = new Date();
    second = d.getSeconds() * 6;
    minute = d.getMinutes() * 6;
    hour = d.getHours() * 30 + Math.round(minute / 12);
    document.getElementById("second-hand").style.transform = "rotate(" + second + "deg)";
    document.getElementById("minute-hand").style.transform = "rotate(" + minute + "deg)";
    document.getElementById("hour-hand").style.transform = "rotate(" + hour + "deg)";
}, 1000);

// Inicializa is24HourFormat como true (24 horas por defecto)
let is24HourFormat = true;

// Reloj digital 12/24h
const displayTime = () => {
    d = new Date();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();
    let time = null;

    // Asegurarse de que las horas, minutos y segundos tengan 2 dígitos
    hour = (hour < 10) ? "0" + hour : hour;
    minute = (minute < 10) ? "0" + minute : minute;
    second = (second < 10) ? "0" + second : second;

    let timeCategory = "";

    // Si no es formato 24h, convertir a formato 12h
    if (!is24HourFormat) {
        if (hour === "00") hour = "12";  // Medianoche a 12
        if (hour > 12) {
            hour = hour - 12;  // Convertir a formato 12 horas
            timeCategory = "P.M";
        } else {
            timeCategory = "A.M";  // Si es menor que 12, A.M.
        }
    }

    // Formatear la hora
    time = hour + ":" + minute + ":" + second + " " + timeCategory;

    // Mostrar la hora en el HTML
    document.getElementById("clock-text").innerText = time;
}

// Llamar a displayTime cada segundo
setInterval(displayTime, 1000);

// Cambiar el formato de la hora entre 12h y 24h
document.getElementById("btn-toggle").addEventListener("click", () => {
    is24HourFormat = !is24HourFormat;  // Alternar entre 12h y 24h

    // Cambiar el texto del botón para mostrar el formato actual
    const hrFormatText = is24HourFormat ? "12H" : "24H";
    document.getElementById("hrFormat").innerText = hrFormatText;  
    
    // Asegurarnos de que la hora se actualice inmediatamente
    displayTime();
});

// Fecha
const shortDateClass = document.querySelector(".short-date");
const longDateClass = document.querySelector(".long-date");
const simplifiedLongDateClass = document.querySelector(".simplified-long-date");

// Fechas largas cortas e ISO
const fechas = () => {
    let dates = new Date();
    let day = dates.getDate();
    let dayOfWeek = dates.getDay();
    let month = dates.getMonth();
    let year = dates.getFullYear();

    // Definir los nombres de los días y meses
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const abbreviatedDays = ['Dom', 'Lun', 'Mar', 'Mier', 'Jue', 'Vie', 'Sáb'];
    const abbreviateMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    // Fecha day/month/year
    let longDate = `${daysOfWeek[dayOfWeek]}, ${day} de ${months[month]} de ${year}`;
    
    // Fecha dd/mm/yyyy
    let shortDate = `${day < 10 ? '0' + day : day} / ${month + 1 < 10 ? '0' + (month + 1) : month + 1} / ${year}`;

    // Fecha XYZ 00 / XYZ / 0000
    let simplifiedLongDate = `${abbreviatedDays[dayOfWeek]} ${day < 10 ?  '0' + day : day} / ${abbreviateMonths[month]} / ${year}`;

    shortDateClass.textContent = shortDate;
    longDateClass.textContent = longDate;
    simplifiedLongDateClass.textContent = simplifiedLongDate;
}

// Zona horaria
const cityImg = document.getElementById("city-img");
const clockDisplay = document.getElementById("clock");

const madridBtn = document.getElementById("madrid");
const nycBtn = document.getElementById("nyc");
const pekinBtn = document.getElementById("pekin");

// Función para cambiar la imagen y la hora de la ciudad seleccionada
const setCityDetails = (city) => {
    let selectedTimezone = "";
    switch (city) {
        case 'madrid':
            cityImg.src = "../fotos/madrid.jpg"; 
            selectedTimezone = "Europe/Madrid";
            break;
        case 'nyc':
            cityImg.src = "../fotos/nyc.jpg"; 
            selectedTimezone = "America/New_York";
            break;
        case 'pekin':
            cityImg.src = "../fotos/pekin.jpg"; 
            selectedTimezone = "Asia/Shanghai";
            break;
        default:
            cityImg.src = ""; 
            clockDisplay.textContent = ""; 
            return;
    }

    // Llamar a updateCityTime una sola vez al cambiar la ciudad
    updateCityTime(selectedTimezone);

    // Llamar a updateCityTime cada segundo
    clearInterval(window.cityTimeInterval); // Limpiar cualquier intervalo previo
    window.cityTimeInterval = setInterval(() => updateCityTime(selectedTimezone), 1000);
};

// Función para actualizar la hora de la ciudad
const updateCityTime = (timezone) => {
    const now = new Date();
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    // Usar Intl.DateTimeFormat con la zona horaria seleccionada
    const cityTime = new Intl.DateTimeFormat('default', {
        ...options,
        timeZone: timezone,
    }).format(now);

    // Mostrar la hora en el formato deseado
    clockDisplay.textContent = `${timezone} : ${cityTime}`;
};

// Asignar eventos a los botones
madridBtn.addEventListener('click', () => setCityDetails('madrid'));
nycBtn.addEventListener('click', () => setCityDetails('nyc'));
pekinBtn.addEventListener('click', () => setCityDetails('pekin'));

// Llamar a una ciudad por defecto, por ejemplo, Madrid, al cargar la página
setCityDetails('madrid');

window.onload = fechas;
