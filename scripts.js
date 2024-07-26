// Juego 1: Adivina el número
let numeroSecreto = Math.floor(Math.random() * 10) + 1;

function mostrarConfetti() {
    const confetti = document.getElementById('confetti');
    confetti.style.display = 'block';
    setTimeout(() => {
        confetti.style.display = 'none';
    }, 3000);
}

function mostrarBeso() {
    const beso = document.getElementById('beso');
    beso.style.display = 'block';
    setTimeout(() => {
        beso.style.display = 'none';
    }, 1000); // Ajusta el tiempo para que coincida con la animación
}

function adivinaNumero() {
    let inputNum = document.getElementById("inputNum").value;
    let resultado = document.getElementById("resultadoJuego1");

    if (inputNum == numeroSecreto) {
        resultado.textContent = "¡Correcto! El número era " + numeroSecreto;
        mostrarConfetti();
        mostrarBeso();
        numeroSecreto = Math.floor(Math.random() * 10) + 1; // Cambia el número automáticamente
    } else {
        resultado.textContent = "Incorrecto. Inténtalo de nuevo.";
    }
}

// Juego 2: Piedra, Papel o Tijera
const opciones = ["Piedra", "Papel", "Tijera"];
let victorias = 0;
let derrotas = 0;

function jugar(opcionJugador) {
    let opcionComputadora = opciones[Math.floor(Math.random() * 3)];
    let resultado = document.getElementById("resultadoJuego2");
    let contador = document.getElementById("contadorJuego2");

    if (opcionJugador === opcionComputadora) {
        resultado.textContent = "Empate! Ambos eligieron " + opcionJugador;
    } else if (
        (opcionJugador === "Piedra" && opcionComputadora === "Tijera") ||
        (opcionJugador === "Papel" && opcionComputadora === "Piedra") ||
        (opcionJugador === "Tijera" && opcionComputadora === "Papel")
    ) {
        resultado.textContent = "¡Ganaste! " + opcionJugador + " vence a " + opcionComputadora;
        victorias++;
    } else {
        resultado.textContent = "Perdiste. " + opcionComputadora + " vence a " + opcionJugador;
        derrotas++;
    }
    contador.textContent = `Victorias: ${victorias} | Derrotas: ${derrotas}`;
    animarBotones();
}

function jugarPiedra() {
    jugar("Piedra");
}

function jugarPapel() {
    jugar("Papel");
}

function jugarTijera() {
    jugar("Tijera");
}

function animarBotones() {
    const botones = document.querySelectorAll('#opcionesJuego2 button');
    botones.forEach(button => {
        button.classList.add('animate');
        setTimeout(() => {
            button.classList.remove('animate');
        }, 500);
    });
}

// Juego 3: Tic Tac Toe
const tablero = document.getElementById("ticTacToe");
const resultado = document.getElementById("resultadoJuego3");
const contador = document.getElementById("contadorJuego3");
let turno = 'X'; // Empieza con el jugador
let celdas = Array(9).fill(null);
let victorias1 = 0;
let derrotas1 = 0;
let intervaloReinicio;

// Combinaciones ganadoras
const combinacionesGanadoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // filas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columnas
    [0, 4, 8], [2, 4, 6]              // diagonales
];

// Verificar ganador
function verificarGanador() {
    for (let combinacion of combinacionesGanadoras) {
        const [a, b, c] = combinacion;
        if (celdas[a] && celdas[a] === celdas[b] && celdas[a] === celdas[c]) {
            return celdas[a];
        }
    }
    return celdas.includes(null) ? null : 'Empate';
}

// Movimiento de la máquina
function movimientoMaquina() {
    let indicesDisponibles = celdas.map((valor, index) => valor === null ? index : null).filter(index => index !== null);
    if (indicesDisponibles.length > 0) {
        let indice = indicesDisponibles[Math.floor(Math.random() * indicesDisponibles.length)];
        celdas[indice] = 'O';
        document.querySelector(`.celda[data-index="${indice}"]`).classList.add('o');
    }
}

// Manejar clic en celda
function handleClick(e) {
    const index = e.target.dataset.index;
    if (celdas[index] || verificarGanador()) return;
    
    celdas[index] = turno;
    e.target.classList.add(turno.toLowerCase());

    const ganador = verificarGanador();
    if (ganador) {
        resultado.textContent = ganador === 'Empate' ? "¡Es un empate!" : `¡${ganador} gana!`;
        if (ganador === 'X') victorias1++;
        if (ganador === 'O') derrotas1++;
        contador.textContent = `Victorias: ${victorias1} | Derrotas: ${derrotas1}`;
        
        // Reiniciar después de 5 segundos
        clearTimeout(intervaloReinicio);
        intervaloReinicio = setTimeout(reiniciarJuego, 2000);
        return;
    }
    
    turno = 'O';
    movimientoMaquina();
    const ganadorPostMaquina = verificarGanador();
    if (ganadorPostMaquina) {
        resultado.textContent = ganadorPostMaquina === 'Empate' ? "¡Es un empate!" : `¡${ganadorPostMaquina} gana!`;
        if (ganadorPostMaquina === 'X') victorias1++;
        if (ganadorPostMaquina === 'O') derrotas1++;
        contador.textContent = `Victorias: ${victorias1} | Derrotas: ${derrotas1}`;
        
        // Reiniciar después de 5 segundos
        clearTimeout(intervaloReinicio);
        intervaloReinicio = setTimeout(reiniciarJuego, 2000);
    } else {
        turno = 'X';
    }
}

// Reiniciar juego
function reiniciarJuego() {
    celdas = Array(9).fill(null);
    turno = 'X';
    resultado.textContent = '';
    tablero.querySelectorAll('.celda').forEach(celda => {
        celda.classList.remove('x', 'o');
    });
}

// Añadir evento de clic en el tablero
tablero.addEventListener('click', handleClick);
reiniciarJuego();


// Aumentar la velocidad de la ambulancia
const ambulanciaDiv = document.getElementById("ambulanciaDiv");
ambulanciaDiv.style.animationDuration = '2s';
ambulanciaDiv.style.animationIterationCount = 'infinite';
ambulanciaDiv.style.animationName = 'moverAmbulancia';
ambulanciaDiv.style.animationTimingFunction = 'linear';
