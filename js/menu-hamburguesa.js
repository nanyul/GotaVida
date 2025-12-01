// Menú Hamburguesa
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mainNav = document.getElementById('main-nav');
    
    if (hamburgerBtn && mainNav) {
        // Toggle menú al hacer click en hamburguesa
        hamburgerBtn.addEventListener('click', function() {
            hamburgerBtn.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Prevenir scroll del body cuando el menú está abierto
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Cerrar menú al hacer click fuera de él
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !hamburgerBtn.contains(e.target)) {
                if (mainNav.classList.contains('active')) {
                    hamburgerBtn.classList.remove('active');
                    mainNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
        
        // Cerrar menú al hacer click en un enlace
        const menuLinks = mainNav.querySelectorAll('a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburgerBtn.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});
