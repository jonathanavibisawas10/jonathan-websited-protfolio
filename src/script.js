
// Typing effect for About section
const aboutText = `Hey, I'm Jonathan Avi Biswas, a passionate web developer with a strong foundation in both front-end and back-end technologies. My journey into web development started with curiosity — I wanted to understand how the websites I used every day actually worked, and that curiosity grew into a genuine love for building things from scratch.

I have a keen eye for design and a deep commitment to creating seamless, user-friendly experiences. I enjoy the balance between crafting clean, responsive interfaces and writing solid, efficient code that powers them behind the scenes — whether it's structuring layouts with HTML and CSS, adding interactivity with JavaScript,
 I'm always learning new tools and staying curious about the latest trends, pushing myself to grow with every project.

I'm currently looking for opportunities to contribute as a web developer, collaborate with a team, and keep building innovative solutions that make a difference.`;

function typeText(element, text, speed = 12) {
    let i = 0;
    element.textContent = "";

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Only start typing when the About section scrolls into view
const aboutTextEl = document.getElementById("about-text");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            typeText(aboutTextEl, aboutText, 12);
            observer.unobserve(entry.target); // only type once
        }
    });
}, { threshold: 0.3 });

if (aboutTextEl) {
    observer.observe(aboutTextEl);
}

// Hover glow effect for certification cards
const certItems = document.querySelectorAll(".cert-item");

certItems.forEach((item) => {
    item.addEventListener("mousemove", (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        item.style.setProperty("--x", `${x}px`);
        item.style.setProperty("--y", `${y}px`);
    });
});
// Auto-scrolling projects carousel
const track = document.getElementById("projects-track");
const dotsContainer = document.getElementById("projects-dots");

if (track && dotsContainer) {
    const cards = track.querySelectorAll(".project-card");

    // build dots
    cards.forEach((_, i) => {
        const dot = document.createElement("span");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
            const card = cards[i];
            track.scrollTo({ left: card.offsetLeft - 20, behavior: "smooth" });
        });
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll("span");

    // update active dot on scroll
    track.addEventListener("scroll", () => {
        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, i) => {
            const distance = Math.abs(card.offsetLeft - track.scrollLeft);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === closestIndex);
        });
    });

    // --- Auto-scroll ---
    let autoScroll = true;
    const scrollSpeed = 0.5; // pixels per frame — increase for faster

    function autoScrollStep() {
        if (autoScroll) {
            track.scrollLeft += scrollSpeed;

            // loop back to start when reaching the end
            if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 1) {
                track.scrollLeft = 0;
            }
        }
        requestAnimationFrame(autoScrollStep);
    }

    requestAnimationFrame(autoScrollStep);

    // pause on hover, resume on mouse leave
    track.addEventListener("mouseenter", () => {
        autoScroll = false;
    });

    track.addEventListener("mouseleave", () => {
        autoScroll = true;
    });
}

// Arrow navigation
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

if (prevBtn && nextBtn && track) {
    const cardWidth = 260 + 25; // card width + gap

    prevBtn.addEventListener("click", () => {
        track.scrollBy({ left: -cardWidth, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
        track.scrollBy({ left: cardWidth, behavior: "smooth" });
    });

    // pause auto-scroll briefly when arrows are clicked
    [prevBtn, nextBtn].forEach((btn) => {
        btn.addEventListener("click", () => {
            autoScroll = false;
            setTimeout(() => { autoScroll = true; }, 2000);
        });
    });
}

// Project modal popup
const modal = document.getElementById("project-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalLink = document.getElementById("modal-link");
const modalClose = document.getElementById("modal-close");

if (modal) {
    document.querySelectorAll(".project-card").forEach((card) => {
        card.addEventListener("click", () => {
            modalImg.src = card.dataset.img;
            modalTitle.textContent = card.dataset.title;
            modalDesc.textContent = card.dataset.desc;
            modalLink.href = card.dataset.link;

            modal.classList.add("active");
        });
    });

    modalClose.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    // close when clicking outside the modal content
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

    // close with Escape key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            modal.classList.remove("active");
        }
    });
}
// contact-form.ts
Object.defineProperty(exports, "__esModule", { value: true });
class ContactFormHandler {
    form;
    statusEl;
    statusTimeout;
    constructor(formId, statusId) {
        this.form = document.getElementById(formId);
        this.statusEl = document.getElementById(statusId);
        if (this.form) {
            this.init();
        }
    }
    init() {
        this.form?.addEventListener("submit", (e) => this.handleSubmit(e));
    }
    getFormData() {
        const formData = new FormData(this.form);
        return {
            name: formData.get("name") ?? "",
            email: formData.get("email") ?? "",
            phone: formData.get("phone") ?? "",
            message: formData.get("message") ?? "",
        };
    }
    validate(data) {
        if (!data.name.trim())
            return "Please enter your name.";
        if (!data.email.trim())
            return "Please enter your email.";
        if (!this.isValidEmail(data.email))
            return "Please enter a valid email address.";
        if (!data.message.trim())
            return "Please enter a message.";
        return null;
    }
    isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    handleSubmit(e) {
        e.preventDefault();
        const data = this.getFormData();
        const error = this.validate(data);
        if (error) {
            this.showStatus(error, "error");
            return;
        }
        // Placeholder for real submission logic (API call, EmailJS, Formspree, etc.)
        console.log("Contact form submitted:", data);
        this.showStatus("Thanks! Your message has been noted.", "success");
        this.form?.reset();
    }
    showStatus(message, type) {
        if (!this.statusEl)
            return;
        this.statusEl.textContent = message;
        this.statusEl.dataset.type = type;
        window.clearTimeout(this.statusTimeout);
        this.statusTimeout = window.setTimeout(() => {
            if (this.statusEl)
                this.statusEl.textContent = "";
        }, 4000);
    }
}

// Footer: auto year + back to top
const yearEl = document.getElementById("current-year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
}

const backToTopBtn = document.getElementById("back-to-top");
if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


// Initialize once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    new ContactFormHandler("contact-form", "form-status");
});
//# sourceMappingURL=script.js.map