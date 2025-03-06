document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", () => {
            alert("Card clicked!");
        });
    });

    const sections = document.querySelectorAll(".section");

    sections.forEach(section => {
        section.addEventListener("mouseenter", () => {
            const qrcode = section.getAttribute("data-qrcode");
            section.style.backgroundImage = `url(images/${qrcode})`;
        });

        section.addEventListener("mouseleave", () => {
            section.style.backgroundImage = "none";
        });
    });
});


