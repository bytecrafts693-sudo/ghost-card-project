document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('.card-container');
    const card = document.querySelector('.card');
    const ghostImage = document.querySelector('.ghost-image');

    card.addEventListener('click', () => {
        card.classList.toggle('flipped');
    });

    cardContainer.addEventListener('mousemove', (e) => {
        if (!card.classList.contains('flipped')) {
            const rect = cardContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateX = -y / 15;
            const rotateY = x / 15;

            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            const hue = (x + y) / 10;
            ghostImage.style.filter = `drop-shadow(0 0 15px var(--ghost-glow-color)) hue-rotate(${hue}deg)`;
        }
    });

    cardContainer.addEventListener('mouseleave', () => {
        if (!card.classList.contains('flipped')) {
            card.style.transform = 'rotateX(0) rotateY(0)';
            ghostImage.style.filter = 'drop-shadow(0 0 15px var(--ghost-glow-color)) hue-rotate(0deg)';
        }
    });

    // PARTICLES
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3,
            speedY: Math.random() * 1 + 0.5,
            alpha: Math.random(),
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            ctx.fillStyle = `rgba(255, 0, 255, ${p.alpha})`;
            ctx.shadowColor = 'rgba(255, 0, 255, 1)';
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            p.y -= p.speedY;
            if (p.y < -10) {
                p.y = canvas.height + 10;
                p.x = Math.random() * canvas.width;
            }
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();
});
