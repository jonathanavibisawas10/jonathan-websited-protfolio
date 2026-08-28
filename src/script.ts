// contact-form.ts

interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

class ContactFormHandler {
    private form: HTMLFormElement | null;
    private statusEl: HTMLParagraphElement | null;
    private statusTimeout: number | undefined;

    constructor(formId: string, statusId: string) {
        this.form = document.getElementById(formId) as HTMLFormElement | null;
        this.statusEl = document.getElementById(statusId) as HTMLParagraphElement | null;

        if (this.form) {
            this.init();
        }
    }

    private init(): void {
        this.form?.addEventListener("submit", (e: SubmitEvent) => this.handleSubmit(e));
    }

    private getFormData(): ContactFormData {
        const formData = new FormData(this.form as HTMLFormElement);

        return {
            name: (formData.get("name") as string) ?? "",
            email: (formData.get("email") as string) ?? "",
            phone: (formData.get("phone") as string) ?? "",
            message: (formData.get("message") as string) ?? "",
        };
    }

    private validate(data: ContactFormData): string | null {
        if (!data.name.trim()) return "Please enter your name.";
        if (!data.email.trim()) return "Please enter your email.";
        if (!this.isValidEmail(data.email)) return "Please enter a valid email address.";
        if (!data.message.trim()) return "Please enter a message.";
        return null;
    }

    private isValidEmail(email: string): boolean {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    private handleSubmit(e: SubmitEvent): void {
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

    private showStatus(message: string, type: "success" | "error"): void {
        if (!this.statusEl) return;

        this.statusEl.textContent = message;
        this.statusEl.dataset.type = type;

        window.clearTimeout(this.statusTimeout);
        this.statusTimeout = window.setTimeout(() => {
            if (this.statusEl) this.statusEl.textContent = "";
        }, 4000);
    }
}

// Initialize once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    new ContactFormHandler("contact-form", "form-status");
});