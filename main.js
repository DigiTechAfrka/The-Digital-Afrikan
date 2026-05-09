const body = document.body;
const header = document.getElementById("siteHeader");
const toggle = document.getElementById("mobileToggle");
const navLinks = document.querySelectorAll(".nav-link");
const dropdownItems = document.querySelectorAll(".has-dropdown");
const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const closeMenu = () => {
    body.classList.remove("nav-open");
    toggle.classList.remove("active");
    toggle.setAttribute("aria-expanded", "false");
};

const updateHeader = () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
};

toggle.addEventListener("click", () => {
    const isOpen = body.classList.toggle("nav-open");
    toggle.classList.toggle("active", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
});

dropdownToggles.forEach((button) => {
    button.addEventListener("click", () => {
        const parent = button.closest(".has-dropdown");
        const isOpen = parent.classList.toggle("open");
        button.setAttribute("aria-expanded", String(isOpen));
    });
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".has-dropdown")) {
        dropdownItems.forEach((item) => {
            item.classList.remove("open");
            const button = item.querySelector(".dropdown-toggle");
            if (button) {
                button.setAttribute("aria-expanded", "false");
            }
        });
    }

    if (body.classList.contains("nav-open") && !event.target.closest(".site-nav") && !event.target.closest(".mobile-toggle")) {
        closeMenu();
    }
});

document.querySelectorAll("a[href^='#']").forEach((link) => {
    link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        closeMenu();
    });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.14
});

revealItems.forEach((item) => {
    revealObserver.observe(item);
});

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
        }

        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
    });
}, {
    rootMargin: "-35% 0px -55% 0px"
});

sections.forEach((section) => sectionObserver.observe(section));

const validateField = (field) => {
    const row = field.closest(".form-row");
    const isValid = field.checkValidity();
    row.classList.toggle("invalid", !isValid);
    return isValid;
};

if (contactForm) {
    contactForm.querySelectorAll("input, select, textarea").forEach((field) => {
        field.addEventListener("blur", () => validateField(field));
        field.addEventListener("input", () => {
            if (field.closest(".form-row").classList.contains("invalid")) {
                validateField(field);
            }
        });
    });

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const fields = Array.from(contactForm.querySelectorAll("input, select, textarea"));
        const isValid = fields.map(validateField).every(Boolean);

        if (!isValid) {
            formStatus.textContent = "Please complete the highlighted fields.";
            return;
        }

        formStatus.textContent = "Thank you. Your enquiry is ready to send once a form service is connected.";
        contactForm.reset();
    });
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
