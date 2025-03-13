const canvas = document.createElement('canvas');
document.querySelector('.home').appendChild(canvas);
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = document.querySelector('.home').offsetWidth;
    canvas.height = document.querySelector('.home').offsetHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const points = [];
for (let i = 0; i < 70; i++) {
    points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
        ctx.fill();
    });

    for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
            const dx = points[i].x - points[j].x;
            const dy = points[i].y - points[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(points[i].x, points[i].y);
                ctx.lineTo(points[j].x, points[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 100})`;
                ctx.stroke();
            }
        }
    }
}

function update() {
    points.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;

        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
    });
}

function loop() {
    draw();
    update();
    requestAnimationFrame(loop);
}

loop();

window.addEventListener('scroll', function() {
    var header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navbar.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function() {
    const link = document.querySelector('.footer-iconTop a');

    link.addEventListener('click', function(event) {
        event.preventDefault();
        document.body.classList.add('fade-out');

        setTimeout(function() {
            window.location.href = link.href;
        }, 100); // يطابق مدة الانتقال في CSS
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .highlight, .zoom-in');
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 300); // تأخير تدريجي لكل عنصر
    });
});

// تحديد العناصر التي تريد تطبيق التأثير عليها
const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');

// إعداد الـ IntersectionObserver
const observerOptions = {
  threshold: 0.5  // التأثير يحدث عندما يكون العنصر مرئي بنسبة 50% من الصفحة
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // إضافة الفئة التي تظهر التأثير عندما يكون العنصر مرئياً
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// مراقبة العناصر
elements.forEach(element => {
  observer.observe(element);
});

// إضافة وظيفة لمسح بيانات النموذج بعد إرساله
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // منع إرسال النموذج بشكل تقليدي

        const formData = new FormData(form);

        fetch(form.action, {
            method: form.method,
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(response => {
            if (response.ok) {
                form.reset(); // إعادة تعيين النموذج
                formMessage.style.display = 'block';
                formMessage.textContent = 'Message sent successfully!';
            } else {
                formMessage.style.display = 'block';
                formMessage.textContent = 'Failed to send message. Please try again later.';
            }
        })
        .catch(error => {
            formMessage.style.display = 'block';
            formMessage.textContent = 'Failed to send message. Please try again later.';
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let audio = document.getElementById("background-music");
    audio.volume = 0.1; // تقليل مستوى الصوت إلى 5%

    // محاولة تشغيل الصوت بعد تحميل الصفحة مباشرة
    let playPromise = audio.play();
    
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log("تم تشغيل الموسيقى تلقائيًا مع مستوى صوت منخفض.");
      }).catch(() => {
        console.log("المتصفح منع التشغيل التلقائي. في انتظار تفاعل المستخدم.");
        document.addEventListener("click", function () {
          audio.play();
        }, { once: true }); // يتم التشغيل عند أول نقرة على الصفحة
      });
    }
  });