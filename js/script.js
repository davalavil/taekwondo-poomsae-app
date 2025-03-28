document.addEventListener('DOMContentLoaded', () => {
    const videoTriggers = document.querySelectorAll('.video-trigger');
    const videoPlayerContainer = document.getElementById('video-player-container');
    const videoPlayer = document.getElementById('video-player');
    const closeVideoButton = document.getElementById('close-video');

    videoTriggers.forEach(button => {
        button.addEventListener('click', () => {
            const videoId = button.getAttribute('data-video-id');
            if (videoId) {
                // Construir el iframe de YouTube
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`); // autoplay=1 para iniciar, rel=0 para no mostrar relacionados
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                iframe.setAttribute('allowfullscreen', '');

                // Limpiar el reproductor anterior y añadir el nuevo iframe
                videoPlayer.innerHTML = '';
                videoPlayer.appendChild(iframe);

                // Mostrar el contenedor del vídeo
                videoPlayerContainer.classList.remove('hidden');
            } else {
                console.error('Video ID no encontrado para este botón:', button.textContent);
            }
        });
    });

    // Función para cerrar el vídeo
    const closeVideo = () => {
        videoPlayerContainer.classList.add('hidden');
        // Detener el vídeo eliminando el iframe (o su src)
        videoPlayer.innerHTML = '';
    };

    // Event listener para el botón de cerrar
    closeVideoButton.addEventListener('click', closeVideo);

    // Opcional: Cerrar el vídeo si se hace clic fuera del reproductor (en el fondo oscuro)
    videoPlayerContainer.addEventListener('click', (event) => {
        // Si el clic fue directamente en el contenedor de fondo (no en el vídeo o el botón)
        if (event.target === videoPlayerContainer) {
            closeVideo();
        }
    });
});
