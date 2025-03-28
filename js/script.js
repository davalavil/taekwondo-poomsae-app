document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los elementos que tienen la clase 'video-trigger' (los botones)
    const videoTriggers = document.querySelectorAll('.video-trigger');
    // Selecciona el contenedor principal del modal de vídeo
    const videoPlayerContainer = document.getElementById('video-player-container');
    // Selecciona el div donde se insertará el iframe del vídeo
    const videoPlayer = document.getElementById('video-player');
    // Selecciona el botón para cerrar el modal
    const closeVideoButton = document.getElementById('close-video');

    // Añade un 'escuchador' de eventos a cada botón encontrado
    videoTriggers.forEach(button => {
        button.addEventListener('click', () => {
            // Obtiene el valor del atributo 'data-video-id' del botón clickeado
            const videoId = button.getAttribute('data-video-id');

            // Verifica si se encontró un videoId
            if (videoId) {
                // Crea un elemento iframe
                const iframe = document.createElement('iframe');
                // Establece la URL del vídeo de YouTube, añadiendo parámetros para autoplay y no mostrar relacionados
                iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`);
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
                iframe.setAttribute('allowfullscreen', '');

                // Limpia cualquier contenido previo del reproductor (por si había otro vídeo)
                videoPlayer.innerHTML = '';
                // Añade el nuevo iframe al div 'video-player'
                videoPlayer.appendChild(iframe);

                // Muestra el contenedor del modal quitando la clase 'hidden'
                videoPlayerContainer.classList.remove('hidden');

            } else {
                // Si no se encuentra un videoId, muestra un error en la consola del navegador
                console.error('Video ID no encontrado para este botón:', button.textContent);
            }
        });
    });

    // Función para cerrar el modal de vídeo
    const closeVideo = () => {
        // Oculta el contenedor del modal añadiendo la clase 'hidden'
        videoPlayerContainer.classList.add('hidden');
        // Detiene la reproducción del vídeo limpiando el contenido del reproductor
        videoPlayer.innerHTML = '';
    };

    // Añade un 'escuchador' de eventos al botón de cerrar
    closeVideoButton.addEventListener('click', closeVideo);

    // Añade un 'escuchador' de eventos al contenedor del modal
    videoPlayerContainer.addEventListener('click', (event) => {
        // Si el clic ocurrió directamente sobre el fondo oscuro (y no sobre el vídeo o el botón de cerrar)
        if (event.target === videoPlayerContainer) {
            // Cierra el vídeo
            closeVideo();
        }
    });

    // Opcional: Escuchar la tecla 'Escape' para cerrar el modal
    document.addEventListener('keydown', (event) => {
        // Si la tecla presionada es 'Escape' y el modal NO está oculto
        if (event.key === 'Escape' && !videoPlayerContainer.classList.contains('hidden')) {
            closeVideo();
        }
    });
});
