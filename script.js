document.addEventListener('DOMContentLoaded', () => {

    // --- Menu Mobile ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    const toggleMenu = () => {
        const isOpen = mainNav.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', isOpen);
        
        const bars = mobileToggle.querySelectorAll('.bar');
        if(isOpen) {
            bars[0].style.transform = 'translateY(7px) rotate(45deg)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    };

    if(mobileToggle) mobileToggle.addEventListener('click', toggleMenu);
    navLinks.forEach(link => link.addEventListener('click', () => {
        if (mainNav.classList.contains('open')) toggleMenu();
    }));


    // --- Filtrage par Catégories (Tabs) ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const courseCards = document.querySelectorAll('.course-card');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const target = btn.getAttribute('data-target');

            courseCards.forEach(card => {
                if (target === 'all' || card.getAttribute('data-category') === target) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    // --- Sélection automatique de la formule ---
    const selectionLinks = document.querySelectorAll('[data-select]');
    const formDropdown = document.getElementById('selectedcourse');

    selectionLinks.forEach(link => {
        link.addEventListener('click', () => {
            const desiredCourse = link.getAttribute('data-select');
            if (formDropdown) formDropdown.value = desiredCourse;
        });
    });


    // --- Animations au défilement (Observer) ---
    const animatedElements = document.querySelectorAll('.reveal');
    
    const elementObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    animatedElements.forEach(el => elementObserver.observe(el));


    // --- Validation et Envoi du formulaire via Web3Forms ---
const bookingForm = document.getElementById('booking-form');
const alertBox = document.getElementById('status-alert');

if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Bloque le rechargement de la page
        let isValid = true;

        const fieldsToValidate = bookingForm.querySelectorAll('[required]');

        // Vérification des champs requis
        fieldsToValidate.forEach(field => {
            const formGroup = field.parentElement;
            if (field.type === 'email') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(field.value)) {
                    formGroup.classList.add('error');
                    isValid = false;
                } else {
                    formGroup.classList.remove('error');
                }
            } else {
                if (!field.value.trim()) {
                    formGroup.classList.add('error');
                    isValid = false;
                } else {
                    formGroup.classList.remove('error');
                }
            }
        });

        // Si le formulaire est valide, on l'envoie à Web3Forms
        if (isValid) {
            const formData = new FormData(bookingForm);
            
            fetch(bookingForm.action, {
                method: bookingForm.method,
                body: formData
            })
            .then(async (response) => {
                let result = await response.json();
                
                if (response.status === 200) {
                    // Message envoyé avec succès
                    alertBox.textContent = "Merci ! Votre message a bien été envoyé.";
                    alertBox.className = "alert-box success";
                    alertBox.style.display = 'block';
                    bookingForm.reset(); // Vide les champs du formulaire
                    setTimeout(() => { alertBox.style.display = 'none'; }, 5000);
                } else {
                    // Erreur retournée par l'API
                    alertBox.textContent = result.message || "Oups ! Un problème est survenu.";
                    alertBox.style.backgroundColor = "#FEE2E2";
                    alertBox.style.color = "#991B1B";
                    alertBox.style.display = 'block';
                }
            })
            .catch(error => {
                // Erreur de connexion / réseau
                alertBox.textContent = "Erreur réseau. Impossible de joindre le serveur.";
                alertBox.style.backgroundColor = "#FEE2E2";
                alertBox.style.color = "#991B1B";
                alertBox.style.display = 'block';
            });
        }
    });

    // Supprime l'état d'erreur rouge dès que l'utilisateur recommence à écrire
    bookingForm.querySelectorAll('input, select, textarea').forEach(element => {
        element.addEventListener('input', () => {
            if (element.value.trim()) element.parentElement.classList.remove('error');
        });
    });
}


    // --- Bouton de retour en haut ---
    const scrollBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollBtn.style.display = 'flex';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});