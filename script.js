const poomsaeData = {
    wtf: {
        "Blanco": [], // O quizás formas básicas
        "Amarillo": [
            { name: "Taegeuk Il Jang (1)", videoId: "YOUR_YOUTUBE_ID_1" }
        ],
        "Verde": [
            { name: "Taegeuk Ee Jang (2)", videoId: "YOUR_YOUTUBE_ID_2" },
            { name: "Taegeuk Sam Jang (3)", videoId: "YOUR_YOUTUBE_ID_3" }
        ],
        "Azul": [
            { name: "Taegeuk Sa Jang (4)", videoId: "YOUR_YOUTUBE_ID_4" },
            { name: "Taegeuk Oh Jang (5)", videoId: "YOUR_YOUTUBE_ID_5" }
        ],
        "Rojo": [
            { name: "Taegeuk Yuk Jang (6)", videoId: "YOUR_YOUTUBE_ID_6" },
            { name: "Taegeuk Chil Jang (7)", videoId: "YOUR_YOUTUBE_ID_7" }
            // Nota: Taegeuk Pal Jang suele ser para Rojo-Negro o Negro 1er Poom/Dan
        ]
    },
    itf: {
        "Blanco": [ // 10th Gup
            { name: "Saju Jirugi", videoId: "YOUR_YOUTUBE_ID_ITF_A" },
            { name: "Saju Makgi", videoId: "YOUR_YOUTUBE_ID_ITF_B" }
        ],
        "Amarillo": [ // 9th Gup & 8th Gup
            { name: "Chon-Ji Tul", videoId: "YOUR_YOUTUBE_ID_ITF_1" }
            // Dan-Gun Tul a menudo se introduce en Amarillo punta Verde (8th Gup)
        ],
        "Verde": [ // 7th Gup & 6th Gup
            { name: "Dan-Gun Tul", videoId: "YOUR_YOUTUBE_ID_ITF_2" },
            { name: "Do-San Tul", videoId: "YOUR_YOUTUBE_ID_ITF_3" }
        ],
        "Azul": [ // 5th Gup & 4th Gup
            { name: "Won-Hyo Tul", videoId: "YOUR_YOUTUBE_ID_ITF_4" },
            { name: "Yul-Gok Tul", videoId: "YOUR_YOUTUBE_ID_ITF_5" }
        ],
        "Rojo": [ // 3rd Gup & 2nd Gup
            { name: "Joong-Gun Tul", videoId: "YOUR_YOUTUBE_ID_ITF_6" },
            { name: "Toi-Gye Tul", videoId: "YOUR_YOUTUBE_ID_ITF_7" }
            // Hwa-Rang y Choong-Moo suelen ser para Rojo-Negro o 1er Dan
        ]
    }
    // Asegúrate de verificar el orden exacto y los nombres según tu escuela/línea
};

// --- Obtener referencias a elementos del DOM ---
const fedSelection = document.getElementById('federation-selection');
const beltSelection = document.getElementById('belt-selection');
const poomsaeSelection = document.getElementById('poomsae-selection');
const videoPlayerSection = document.getElementById('video-player');

const beltTitle = document.getElementById('belt-title');
const beltListDiv = document.getElementById('belt-list');
const poomsaeTitle = document.getElementById('poomsae-title');
const poomsaeListDiv = document.getElementById('poomsae-list');
const videoTitle = document.getElementById('video-title');
const playerContainer = document.getElementById('player-container');

// --- Variables de estado ---
let currentFederation = null;
let currentBelt = null;

// --- Funciones para mostrar/ocultar secciones ---
function showSection(sectionId) {
    fedSelection.classList.add('hidden');
    beltSelection.classList.add('hidden');
    poomsaeSelection.classList.add('hidden');
    videoPlayerSection.classList.add('hidden'); // Oculta el video por defecto

    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.classList.remove('hidden');
    }
}

// --- Funciones para generar contenido dinámico ---
function displayBelts(federation) {
    currentFederation = federation;
    beltTitle.textContent = `Cinturones ${federation.toUpperCase()}`;
    beltListDiv.innerHTML = ''; // Limpiar lista anterior

    const belts = Object.keys(poomsaeData[federation]);
    belts.forEach(belt => {
        const button = document.createElement('button');
        button.textContent = belt;
        button.dataset.belt = belt;
        button.addEventListener('click', () => displayPoomsae(federation, belt));
        beltListDiv.appendChild(button);
    });
    showSection('belt-selection');
}

function displayPoomsae(federation, belt) {
    currentBelt = belt;
    poomsaeTitle.textContent = `Poomsae ${belt} - ${federation.toUpperCase()}`;
    poomsaeListDiv.innerHTML = ''; // Limpiar lista anterior

    const poomses = poomsaeData[federation][belt];
    if (poomses && poomses.length > 0) {
        poomses.forEach(poomsae => {
            const button = document.createElement('button');
            button.textContent = poomsae.name;
            button.dataset.videoId = poomsae.videoId;
            button.dataset.poomsaeName = poomsae.name;
            button.addEventListener('click', () => playVideo(poomsae.videoId, poomsae.name));
            poomsaeListDiv.appendChild(button);
        });
    } else {
        poomsaeListDiv.innerHTML = '<p>No hay Poomsae definidos para este cinturón.</p>';
    }
    showSection('poomsae-selection');
}

function playVideo(videoId, poomsaeName) {
    videoTitle.textContent = poomsaeName;
    // Usar el código de inserción de YouTube (iframe)
    playerContainer.innerHTML = `
        <iframe width="560" height="315"
                src="https://www.youtube.com/embed/${videoId}?autoplay=1"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
        </iframe>`;
    videoPlayerSection.classList.remove('hidden'); // Mostrar la sección del video
    // Opcional: Desplazar la vista hasta el reproductor
    videoPlayerSection.scrollIntoView({ behavior: 'smooth' });
}

function closeVideo() {
     playerContainer.innerHTML = ''; // Detener y eliminar el iframe
     videoPlayerSection.classList.add('hidden');
     // Volver a mostrar la lista de poomsae si estaba oculta
     showSection('poomsae-selection');
}


// --- Event Listeners para Navegación ---
document.querySelectorAll('#federation-selection button').forEach(button => {
    button.addEventListener('click', () => {
        displayBelts(button.dataset.federation);
    });
});

document.getElementById('back-to-federation').addEventListener('click', () => {
    showSection('federation-selection');
});

document.getElementById('back-to-belts').addEventListener('click', () => {
    if (currentFederation) {
        displayBelts(currentFederation); // Vuelve a mostrar los cinturones de la federación actual
    } else {
        showSection('federation-selection'); // Seguridad por si algo falla
    }
});

 document.getElementById('close-video').addEventListener('click', closeVideo);

// --- Estado Inicial ---
showSection('federation-selection'); // Empezar mostrando la selección de federación
