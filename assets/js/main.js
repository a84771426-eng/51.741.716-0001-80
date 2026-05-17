(function () {
  "use strict";

  const config = window.SITE_CONFIG || {};

  function whatsappUrl(number) {
    const n = String(number).replace(/\D/g, "");
    if (!n) return "#contato";
    return (
      "https://wa.me/" +
      n +
      "?text=" +
      encodeURIComponent(
        "Olá! Gostaria de solicitar um orçamento para mudança/transporte."
      )
    );
  }

  function formatAddress(addr) {
    if (!addr) return "";
    const lines = [
      addr.street,
      addr.complement,
      addr.neighborhood,
      "CEP " + addr.cep,
      addr.city + " — " + addr.state,
    ].filter(Boolean);
    return lines;
  }

  function applyConfig() {
    const waDisplay = config.phone || config.whatsapp;
    const phoneTel = config.phoneTel || config.whatsapp;

    const fields = {
      whatsapp: {
        el: document.getElementById("contact-whatsapp"),
        value: waDisplay,
        href: whatsappUrl(config.whatsapp),
        actionLabel: "WhatsApp",
        external: true,
      },
      phone: {
        el: document.getElementById("contact-phone"),
        value: config.phone,
        href: "tel:+" + String(phoneTel).replace(/\D/g, ""),
        actionLabel: "Ligar",
      },
      email: {
        el: document.getElementById("contact-email"),
        value: config.email,
        href: "mailto:" + config.email,
        actionLabel: "Enviar e-mail",
      },
      location: {
        el: document.getElementById("contact-location"),
        value: config.location,
        href: null,
      },
    };

    function setContactField(field) {
      if (!field.el || !field.value) return;
      field.el.classList.remove("placeholder");
      field.el.innerHTML = "";

      if (!field.href) {
        field.el.textContent = field.value;
        return;
      }

      const main = document.createElement("a");
      main.href = field.href;
      main.textContent = field.value;
      if (field.external) {
        main.target = "_blank";
        main.rel = "noopener noreferrer";
      }
      field.el.appendChild(main);

      if (field.actionLabel) {
        const action = document.createElement("a");
        action.href = field.href;
        action.textContent = "(" + field.actionLabel + ")";
        action.className = "contact-item__action";
        if (field.external) {
          action.target = "_blank";
          action.rel = "noopener noreferrer";
        }
        field.el.appendChild(document.createTextNode(" "));
        field.el.appendChild(action);
      }
    }

    setContactField(fields.whatsapp);
    setContactField(fields.phone);
    setContactField(fields.email);
    setContactField(fields.location);

    const addressEl = document.getElementById("contact-address");
    if (addressEl && config.address) {
      addressEl.classList.remove("placeholder");
      const lines = formatAddress(config.address);
      addressEl.innerHTML = lines
        .map(function (line) {
          return "<span>" + line + "</span>";
        })
        .join("");
    }

    const waLinks = document.querySelectorAll(
      "#btn-whatsapp-header, #btn-whatsapp-hero, #btn-whatsapp-cta, #footer-whatsapp"
    );
    const waHref = whatsappUrl(config.whatsapp);
    waLinks.forEach(function (el) {
      if (config.whatsapp) {
        el.href = waHref;
        el.target = "_blank";
        el.rel = "noopener noreferrer";
        if (el.id === "footer-whatsapp" && waDisplay) {
          el.textContent = "WhatsApp " + waDisplay;
        }
      } else {
        el.href = "#contato";
      }
    });

    const footerPhone = document.getElementById("footer-phone");
    if (footerPhone && config.phone) {
      footerPhone.href = "tel:+" + String(phoneTel).replace(/\D/g, "");
      footerPhone.textContent = config.phone;
    }

    const footerEmail = document.getElementById("footer-email");
    if (footerEmail && config.email) {
      footerEmail.href = "mailto:" + config.email;
      footerEmail.textContent = config.email;
    }

    const legalEl = document.getElementById("footer-legal");
    if (legalEl && config.legalName) {
      legalEl.textContent = config.legalName;
    }

    const cnpjEl = document.getElementById("footer-cnpj");
    if (cnpjEl && config.cnpj) {
      cnpjEl.textContent = "CNPJ: " + config.cnpj;
    }

    const cidadeInput = document.getElementById("cidade");
    const estadoSelect = document.getElementById("estado");
    if (config.address) {
      if (cidadeInput && config.address.city) {
        cidadeInput.placeholder = config.address.city;
      }
      if (estadoSelect && config.address.stateCode) {
        const opt = estadoSelect.querySelector(
          'option[value="' + config.address.stateCode + '"]'
        );
        if (opt) opt.selected = true;
      }
    }
  }

  applyConfig();

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("is-open");
    });

    nav.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        menuToggle.setAttribute("aria-expanded", "false");
        nav.classList.remove("is-open");
      });
    });
  }

  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const message = document.getElementById("form-message");
      if (message) {
        message.hidden = false;
        message.classList.add("form-message--success");
        message.textContent =
          "Solicitação registrada! Em breve nossa equipe entrará em contato.";
        form.reset();
        applyConfig();
        message.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }

  const header = document.querySelector(".header");
  if (header) {
    let lastScroll = 0;
    window.addEventListener(
      "scroll",
      function () {
        const current = window.scrollY;
        if (current > 80 && current > lastScroll) {
          header.style.transform = "translateY(-100%)";
        } else {
          header.style.transform = "translateY(0)";
        }
        lastScroll = current;
      },
      { passive: true }
    );
    header.style.transition = "transform 0.3s ease";
  }
})();
