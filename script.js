document.querySelectorAll('.clickable-image').forEach(image => {
    image.addEventListener('click', (event) => {
        const clickedImageText = event.target.getAttribute('data-text');
        setCarouselText([clickedImageText]);
        document.getElementById('dialog').style.display = 'block';
        startFireworks();  
    });
});

function setCarouselText(items) {
    carouselItems = items;
    carouselIndex = 0;
    updateCarouselText();
}


function closeDialog() {
    document.getElementById('dialog').style.display = 'none';
}

function changeText() {
    const button = document.querySelector('button[onclick="changeText()"]');
    button.textContent = "Thank you🥺🥰";
}

let carouselIndex = 0;
let carouselItems = [];

function setCarouselText(items) {
    carouselItems = items;
    carouselIndex = 0;
    updateCarouselText();
}

function updateCarouselText() {
    const carouselText = document.getElementById('carousel-text');
    if (carouselItems.length > 0) {
        carouselText.textContent = carouselItems[carouselIndex];
    }
}

document.getElementById('prev-btn').addEventListener('click', () => {
    carouselIndex = (carouselIndex > 0) ? carouselIndex - 1 : carouselItems.length - 1;
    updateCarouselText();
});

document.getElementById('next-btn').addEventListener('click', () => {
    carouselIndex = (carouselIndex < carouselItems.length - 1) ? carouselIndex + 1 : 0;
    updateCarouselText();
});

function startFireworks() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    resizeCanvas(canvas, ctx);

    let particles = [];
    const probability = 0.04;

    function resizeCanvas() {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }

    function updateWorld() {
        update();
        paint();
        requestAnimationFrame(updateWorld);
    }

    function update() {
        if (particles.length < 500 && Math.random() < probability) {
            createFirework();
        }
        particles = particles.filter(particle => particle.move());
    }

    function paint() {
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        particles.forEach(particle => particle.draw(ctx));
    }

    function createFirework() {
        const xPoint = Math.random() * canvas.width;
        const yPoint = Math.random() * canvas.height;
        const nFire = Math.random() * 50 + 100;
        const color = `rgb(${~~(Math.random() * 200 + 55)},${~~(Math.random() * 200 + 55)},${~~(Math.random() * 200 + 55)})`;
        for (let i = 0; i < nFire; i++) {
            const particle = new Particle(xPoint, yPoint, color);
            particles.push(particle);
        }
    }

    function Particle(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 10;
        this.vy = (Math.random() - 0.5) * 10;
        this.alpha = Math.random() * 0.5 + 0.5;
        this.size = Math.random() * 4 + 1;
    }

    Particle.prototype = {
        gravity: 0.01,
        move: function () {
            this.x += this.vx;
            this.vy += this.gravity;
            this.y += this.vy;
            this.alpha -= 0.01;
            return this.alpha > 0 && this.x > 0 && this.x < canvas.width && this.y < canvas.height;
        },
        draw: function (ctx) {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }
    
    particles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    window.addEventListener('resize', () => resizeCanvas(canvas, ctx));
    requestAnimationFrame(updateWorld);
}