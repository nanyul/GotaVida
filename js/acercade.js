 const slider = document.getElementById("slider");
        const dotsContainer = document.getElementById("dots");
        const wrapper = document.getElementById("slider-wrapper");
        let index = 0;
        let slides = [];
        let auto = null;

        // Cargar JSON (ruta: json/acercade.json)
        fetch("json/acercade.json")
            .then(res => {
                if (!res.ok) throw new Error("HTTP error " + res.status);
                return res.json();
            })
            .then(data => {
                cargarAutores(data.autores || []);
                cargarInfoProyecto(data.info_proyecto || {});
                initSlider();
            })
            .catch(err => {
                console.error("Error cargando JSON:", err);
                // Puedes mostrar un mensaje en la UI si quieres
            });

        function cargarAutores(autores) {
            slider.innerHTML = "";
            dotsContainer.innerHTML = "";

            autores.forEach((autor, i) => {
                const slide = `
                    <div class='min-w-full px-10 flex items-center justify-center gap-12'>
                        <img src="${autor.imagen}" class="w-[420px] h-[420px] object-cover rounded-[35px] shadow-xl transition">
                        <div>
                            <h1 class="text-[60px] text-[var(--burdeos)] mb-4 font-serif">${autor.nombre}</h1>
                            <p class="text-[20px] mb-2 italic font-medium">Carrera: ${autor.carrera || ""}</p>
                            <p class="text-[16px] mt-4 font-semibold">Correo: ${autor.correo }</p>
                            <p class="max-w-[450px] text-[18px] leading-relaxed">${autor.descripcion}</p>
                        </div>
                    </div>`;

                slider.innerHTML += slide;

                dotsContainer.innerHTML += `
                    <div class="dot w-3 h-3 bg-[var(--burdeos)] rounded-full cursor-pointer transition" data-id="${i}"></div>`;
            });

            slides = document.querySelectorAll("#slider > div");
        }

        function cargarInfoProyecto(info) {
            const cont = document.getElementById("info-proyecto");
            cont.innerHTML = `
                <h2 class="text-[36px] text-[var(--burdeos)] font-bold mb-5">Información del Proyecto</h2>
                <p class="text-[18px] my-2"><strong>Proyecto:</strong> ${info.nombre || ""}</p>
                <p class="text-[18px] my-2"><strong>Descripción:</strong> ${info.descripcion || ""}</p>
                <p class="text-[18px] my-2"><strong>Institución:</strong> ${info.institucion || ""}</p>
                <p class="text-[18px] my-2"><strong>Curso:</strong> ${info.curso || ""}</p>
                <p class="text-[18px] my-2"><strong>Año:</strong> ${info.anio || ""}</p>
            `;
        }

        function initSlider() {
            const btnPrev = document.getElementById("btnPrev");
            const btnNext = document.getElementById("btnNext");
            const dots = Array.from(document.querySelectorAll(".dot"));

            if (!slides.length) return;

            function updateSlider() {
                // normalizar índice
                if (index < 0) index = slides.length - 1;
                if (index >= slides.length) index = 0;

                slider.style.transform = `translateX(-${index * 100}%)`;

                // actualizar dots (clases)
                dots.forEach((d, idx) => {
                    if (idx === index) {
                        d.classList.add("active");
                    } else {
                        d.classList.remove("active");
                    }
                });
            }

            function startAuto() {
                // reiniciar si ya existía
                stopAuto();
                auto = setInterval(() => {
                    index = (index + 1) % slides.length;
                    updateSlider();
                }, 4000);
            }

            function stopAuto() {
                if (auto) {
                    clearInterval(auto);
                    auto = null;
                }
            }

            // botones
            btnNext.onclick = () => {
                index = (index + 1) % slides.length;
                updateSlider();
            };

            btnPrev.onclick = () => {
                index = (index - 1 + slides.length) % slides.length;
                updateSlider();
            };

            // dots click
            dots.forEach(dot => {
                dot.onclick = () => {
                    index = parseInt(dot.dataset.id, 10) || 0;
                    updateSlider();
                };
            });

            // pausa en hover sobre todo el wrapper
            wrapper.addEventListener("mouseenter", stopAuto);
            wrapper.addEventListener("mouseleave", startAuto);

            // iniciar
            updateSlider();
            startAuto();

            // HOVER ANIMATION PARA FOTOS (GSAP)
        setTimeout(() => {
                document.querySelectorAll('#slider img').forEach(img => {

                    img.addEventListener('mouseenter', () => {
                        gsap.to(img, { y: -20, filter: "brightness(1.25)", duration: 0.5, ease: "elastic.out(1,0.4)" });
                    });
                    img.addEventListener('mouseleave', () => {
                        gsap.to(img, { y: 0, filter: "brightness(1)", duration: 0.4 
                    });
                });

            });
        }, 300);
        }