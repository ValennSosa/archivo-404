(function () {
    var fotos = document.querySelectorAll("main figure img, .carousel-item img");
    if (!fotos.length) return;

    var dialogo = document.createElement("dialog");
    dialogo.className = "visor";
    dialogo.setAttribute("aria-label", "Imagen completa");

    var cerrar = document.createElement("button");
    cerrar.type = "button";
    cerrar.className = "visor-cerrar";
    cerrar.setAttribute("aria-label", "Cerrar imagen");
    cerrar.textContent = "×";

    var grande = document.createElement("img");
    grande.alt = "";

    var pie = document.createElement("p");
    pie.className = "visor-pie";
    pie.hidden = true;

    dialogo.append(cerrar, grande, pie);
    document.body.appendChild(dialogo);

    var scrollGuardado = 0;

    function congelarScroll() {
        scrollGuardado = window.scrollY || document.documentElement.scrollTop || 0;
        document.body.style.position = "fixed";
        document.body.style.top = "-" + scrollGuardado + "px";
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
    }

    function soltarScroll() {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollGuardado);
        requestAnimationFrame(function () {
            window.scrollTo(0, scrollGuardado);
        });
    }

    dialogo.addEventListener("close", soltarScroll);

    function textoPie(boton) {
        var figura = boton.closest("figure");
        if (figura) {
            var epigrafe = figura.querySelector("figcaption");
            if (epigrafe) return epigrafe.textContent.trim();
        }
        var diapositiva = boton.closest(".carousel-item");
        if (diapositiva) {
            var nota = diapositiva.querySelector(".carousel-caption p");
            if (nota) return nota.textContent.trim();
        }
        return "";
    }

    fotos.forEach(function (img) {
        if (img.closest("a")) return;

        var boton = document.createElement("button");
        boton.type = "button";
        boton.className = "visor-disparador";
        boton.setAttribute("aria-label", "Ver la imagen completa: " + (img.getAttribute("alt") || "fotografía"));
        img.parentNode.insertBefore(boton, img);
        boton.appendChild(img);

        boton.addEventListener("click", function (evento) {
            evento.preventDefault();
            evento.stopPropagation();
            grande.src = img.currentSrc || img.src;
            grande.alt = img.alt || "";
            pie.textContent = textoPie(boton);
            pie.hidden = pie.textContent === "";

            var carrusel = boton.closest(".carousel");
            if (carrusel && window.bootstrap) {
                var instancia = bootstrap.Carousel.getOrCreateInstance(carrusel);
                instancia.pause();
                dialogo.addEventListener("close", function reanudar() {
                    dialogo.removeEventListener("close", reanudar);
                    instancia.cycle();
                });
            }

            if (dialogo.open) return;
            congelarScroll();
            dialogo.showModal();
        });
    });

    cerrar.addEventListener("click", function () {
        dialogo.close();
    });

    dialogo.addEventListener("click", function (evento) {
        if (evento.target === dialogo) dialogo.close();
    });
})();
