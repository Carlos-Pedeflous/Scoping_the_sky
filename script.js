console.log("SCRIPT CARGADO");

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play-btn");
const progressBar = document.getElementById("progress-bar");

const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

const muteBtn = document.getElementById("mute-btn");
const volumeBar = document.getElementById("volume-bar");


// ========================================
// ICONOS SVG
// ========================================

const playIcon = `
<svg class="play-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5.5L18 12L8 18.5Z"></path>
</svg>
`;

const pauseIcon = `
<svg class="pause-icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5V19"></path>
    <path d="M16 5V19"></path>
</svg>
`;

const volumeIcon = `
<svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 9v6h4l5 4V5L8 9H4z"></path>
    <path d="M16 9.5c1 .8 1.5 1.8 1.5 2.5s-.5 1.7-1.5 2.5"></path>
    <path d="M18.5 7c1.5 1.3 2.5 3 2.5 5s-1 3.7-2.5 5"></path>
</svg>
`;

const muteIcon = `
<svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 9v6h4l5 4V5L8 9H4z"></path>
    <path d="M17 9l4 6"></path>
    <path d="M21 9l-4 6"></path>
</svg>
`;


// ========================================
// FUNCIONES PARA CAMBIAR ICONOS
// ========================================

function setPlayIcon() {
    playBtn.innerHTML = playIcon;
}

function setPauseIcon() {
    playBtn.innerHTML = pauseIcon;
}

function updateVolumeIcon() {

    if (audio.muted || audio.volume === 0) {
        muteBtn.innerHTML = muteIcon;
    } else {
        muteBtn.innerHTML = volumeIcon;
    }

}


// ========================================
// ICONOS INICIALES
// ========================================

setPlayIcon();
updateVolumeIcon();


// ========================================
// PLAY / PAUSE
// ========================================

playBtn.addEventListener("click", () => {

    if (audio.paused) {

        audio.play()
            .then(() => {
                setPauseIcon();
            })
            .catch(error => {
                console.error("No se pudo reproducir el audio:", error);
            });

    } else {

        audio.pause();

        setPlayIcon();

    }

});


// ========================================
// DURACIÓN
// ========================================

audio.addEventListener("loadedmetadata", () => {

    progressBar.max = audio.duration;

    duration.textContent = formatTime(audio.duration);

});


// ========================================
// PROGRESO
// ========================================

audio.addEventListener("timeupdate", () => {

    progressBar.value = audio.currentTime;

    currentTime.textContent = formatTime(audio.currentTime);

});


// ========================================
// BARRA DE PROGRESO
// ========================================

progressBar.addEventListener("input", () => {

    audio.currentTime = progressBar.value;

});


// ========================================
// VOLUMEN
// ========================================

volumeBar.addEventListener("input", () => {

    audio.volume = Number(volumeBar.value);

    // Si subimos el volumen desde 0,
    // quitamos el estado muteado.
    if (audio.volume > 0) {
        audio.muted = false;
    }

    updateVolumeIcon();

});


// ========================================
// MUTE
// ========================================

muteBtn.addEventListener("click", () => {

    audio.muted = !audio.muted;

    updateVolumeIcon();

});


// ========================================
// CUANDO TERMINA LA CANCIÓN
// ========================================

audio.addEventListener("ended", () => {

    setPlayIcon();

});


// ========================================
// ERROR DE AUDIO
// ========================================

audio.addEventListener("error", () => {

    console.error("ERROR: No se pudo cargar el archivo de audio.");

});


// ========================================
// FORMATO DEL TIEMPO
// ========================================

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60)
        .toString()
        .padStart(2, "0");

    return `${minutes}:${secs}`;

}