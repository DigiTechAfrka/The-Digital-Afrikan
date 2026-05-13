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
const teamModal = document.getElementById("teamModal");
const teamModalPanel = teamModal?.querySelector(".team-modal-panel");
const teamModalClose = teamModal?.querySelector(".modal-close");
const teamModalTriggers = document.querySelectorAll(".team-modal-trigger");
const detailModal = document.getElementById("detailModal");
const detailModalPanel = detailModal?.querySelector(".team-modal-panel");
const detailModalClose = detailModal?.querySelector(".modal-close");
const detailModalTriggers = document.querySelectorAll(".detail-modal-trigger");
let lastFocusedTeamCard = null;
let lastFocusedDetailCard = null;

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
        const href = link.getAttribute("href");
        if (!href || href === "#") {
            return;
        }

        const target = document.querySelector(href);
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

const hashNavLinks = Array.from(navLinks).filter((link) => link.getAttribute("href")?.startsWith("#"));

if (hashNavLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            hashNavLinks.forEach((link) => {
                link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
            });
        });
    }, {
        rootMargin: "-35% 0px -55% 0px"
    });

    sections.forEach((section) => sectionObserver.observe(section));
}

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

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const fields = Array.from(contactForm.querySelectorAll("input, select, textarea"));
        const isValid = fields.map(validateField).every(Boolean);

        if (!isValid) {
            formStatus.textContent = "Please complete the highlighted fields.";
            return;
        }

        const endpoint = contactForm.getAttribute("action");
        const submitButton = contactForm.querySelector(".form-submit");

        if (!endpoint || endpoint.includes("YOUR_FORM_ID")) {
            formStatus.textContent = "Formspree is not connected yet. Add your Formspree endpoint to the form action.";
            return;
        }

        submitButton.disabled = true;
        formStatus.textContent = "Sending your enquiry...";

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Form submission failed");
            }

            formStatus.textContent = "Thank you. Your enquiry has been sent.";
            contactForm.reset();
        } catch (error) {
            formStatus.textContent = "Sorry, something went wrong. Please try again or email us directly.";
        } finally {
            submitButton.disabled = false;
        }
    });
}

const closeTeamModal = () => {
    if (!teamModal) {
        return;
    }

    teamModal.classList.remove("open");
    teamModal.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");

    if (lastFocusedTeamCard) {
        lastFocusedTeamCard.focus();
        lastFocusedTeamCard = null;
    }
};

if (teamModal) {
    const modalName = document.getElementById("teamModalName");
    const modalRole = document.getElementById("teamModalRole");
    const modalBio = document.getElementById("teamModalBio");
    const modalFocus = document.getElementById("teamModalFocus");
    const modalIcon = document.getElementById("teamModalIcon");
    const modalImage = document.getElementById("teamModalImage");

    teamModalTriggers.forEach((card) => {
        card.addEventListener("click", () => {
            lastFocusedTeamCard = card;
            modalName.textContent = card.dataset.name || "Team Member";
            modalRole.textContent = card.dataset.role || "Team";
            modalBio.textContent = card.dataset.bio || "";
            modalFocus.textContent = card.dataset.focus || "";
            if (modalIcon) {
                modalIcon.className = `fa-solid ${card.dataset.icon || "fa-user"}`;
            }
            if (modalImage) {
                modalImage.src = card.dataset.image || "images/team-member-placeholder.svg";
                modalImage.alt = `${card.dataset.name || "Team member"} portrait`;
            }

            teamModal.classList.add("open");
            teamModal.setAttribute("aria-hidden", "false");
            body.classList.add("modal-open");
            teamModalPanel.focus();
        });
    });

    teamModalClose.addEventListener("click", closeTeamModal);

    teamModal.addEventListener("click", (event) => {
        if (event.target === teamModal) {
            closeTeamModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && teamModal.classList.contains("open")) {
            closeTeamModal();
        }
    });
}

const closeDetailModal = () => {
    if (!detailModal) {
        return;
    }

    detailModal.classList.remove("open");
    detailModal.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");

    if (lastFocusedDetailCard) {
        lastFocusedDetailCard.focus();
        lastFocusedDetailCard = null;
    }
};

if (detailModal) {
    const modalTitle = document.getElementById("detailModalTitle");
    const modalKicker = document.getElementById("detailModalKicker");
    const modalBody = document.getElementById("detailModalBody");
    const modalFocus = document.getElementById("detailModalFocus");
    const modalIcon = document.getElementById("detailModalIcon");

    detailModalTriggers.forEach((card) => {
        card.addEventListener("click", () => {
            lastFocusedDetailCard = card;
            modalTitle.textContent = card.dataset.title || "Details";
            modalKicker.textContent = card.dataset.kicker || "Details";
            modalBody.textContent = card.dataset.body || "";
            modalFocus.textContent = card.dataset.focus || "";
            modalIcon.className = `fa-solid ${card.dataset.icon || "fa-layer-group"}`;

            detailModal.classList.add("open");
            detailModal.setAttribute("aria-hidden", "false");
            body.classList.add("modal-open");
            detailModalPanel.focus();
        });
    });

    detailModalClose.addEventListener("click", closeDetailModal);

    detailModal.addEventListener("click", (event) => {
        if (event.target === detailModal) {
            closeDetailModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && detailModal.classList.contains("open")) {
            closeDetailModal();
        }
    });
}

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
