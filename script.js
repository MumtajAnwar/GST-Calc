document.addEventListener('DOMContentLoaded', function () {
  // Create particles
  const particlesContainer = document.getElementById('particles');
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random properties
    const size = Math.random() * 5 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100 + 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 10;
    const opacity = Math.random() * 0.5 + 0.1;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.opacity = opacity;

    const colors = ['rgba(157, 108, 255, 0.7)', 'rgba(255, 108, 157, 0.7)', 'rgba(255, 215, 0, 0.7)'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = randomColor;

    particlesContainer.appendChild(particle);
  }

  // Calculator functionality
  const amountInput = document.getElementById('amount');
  const gstRateInput = document.getElementById('gst-rate');
  const rateButtons = document.querySelectorAll('.rate-btn');
  const calculateBtn = document.getElementById('calculate-btn');
  const originalAmountDisplay = document.getElementById('original-amount');
  const gstAmountDisplay = document.getElementById('gst-amount');
  const totalAmountDisplay = document.getElementById('total-amount');
  const gstTypeRadios = document.querySelectorAll('input[name="gst-type"]');

  gstRateInput.value = '18';

  // Rate button click
  rateButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      const rate = this.getAttribute('data-rate');
      gstRateInput.value = rate;
      rateButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');

      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
      calculateGST();
    });
  });

  amountInput.addEventListener('input', calculateGST);
  gstRateInput.addEventListener('input', calculateGST);
  gstTypeRadios.forEach(radio => {
    radio.addEventListener('change', calculateGST);
  });

  // ✅ Modified Calculate button click
  calculateBtn.addEventListener('click', function () {
    const amount = parseFloat(amountInput.value);
    const rate = parseFloat(gstRateInput.value);

    if (isNaN(amount) || amount <= 0) {
      shakeElement(amountInput);
      return;
    }
    if (isNaN(rate) || rate <= 0) {
      shakeElement(gstRateInput);
      return;
    }

    calculateGST();
    createConfetti();
  });

  function calculateGST() {
    const amount = parseFloat(amountInput.value) || 0;
    const gstRate = parseFloat(gstRateInput.value) || 0;
    const gstType = document.querySelector('input[name="gst-type"]:checked').value;

    let originalAmount, gstAmount, totalAmount;

    if (gstType === 'exclusive') {
      originalAmount = amount;
      gstAmount = (amount * gstRate) / 100;
      totalAmount = originalAmount + gstAmount;
    } else {
      totalAmount = amount;
      originalAmount = (amount * 100) / (100 + gstRate);
      gstAmount = totalAmount - originalAmount;
    }

    originalAmountDisplay.textContent = '₹' + originalAmount.toFixed(2);
    gstAmountDisplay.textContent = '₹' + gstAmount.toFixed(2);
    totalAmountDisplay.textContent = '₹' + totalAmount.toFixed(2);

    const results = document.querySelector('.results');
    results.style.animation = 'none';
    void results.offsetWidth;
    results.style.animation = 'slideUp 0.5s ease forwards';
  }

  amountInput.addEventListener('input', function () {
    if (this.value < 0) this.value = '';
  });

  gstRateInput.addEventListener('input', function () {
    if (this.value < 0) this.value = '';
    if (this.value > 100) this.value = 100;
    if (this.value !== '' && !isNaN(this.value)) {
      rateButtons.forEach(btn => btn.classList.remove('active'));
    }
  });

  const scrollDownBtn = document.getElementById('scrollDown');
  scrollDownBtn.addEventListener('click', function () {
    const parent = document.querySelector('.parent');
    parent.scrollTo({
      top: parent.scrollHeight,
      behavior: 'smooth'
    });
  });

  // ✅ Shake effect
  function shakeElement(element) {
    element.style.animation = 'none';
    void element.offsetWidth;
    element.style.animation = 'shake 0.5s ease';
    setTimeout(() => {
      element.style.animation = 'none';
    }, 500);
  }

  // 🎉 Confetti
  function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '1000';
    document.body.appendChild(confettiContainer);

    const colors = ['#9d6cff', '#ff6c9d', '#ffd700', '#48ffc4', '#ffffff'];

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.top = '-10px';
      confetti.style.opacity = Math.random() + 0.2;
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      const animationDuration = Math.random() * 3 + 2;
      confetti.style.animation = `confetti-fall ${animationDuration}s linear forwards`;
      confettiContainer.appendChild(confetti);

      setTimeout(() => confetti.remove(), animationDuration * 1000);
    }

    setTimeout(() => confettiContainer.remove(), 3000);
  }

  // 👇 Extra animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes confetti-fall {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);

  // Arrow key scroll
  document.addEventListener('keydown', function (e) {
    const parent = document.querySelector('.parent');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      parent.scrollBy({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      parent.scrollBy({
        top: -window.innerHeight,
        behavior: 'smooth'
      });
    }
  });

  restrictTabUntilFilled();
  calculateGST();
});

// Tab restrict
function restrictTabUntilFilled() {
  const inputFields = [
    document.getElementById('amount'),
    document.getElementById('gst-rate')
  ];

  inputFields.forEach((field, index) => {
    field.addEventListener('keydown', function (e) {
      if (e.key === 'Tab' && !e.shiftKey) {
        if (!field.value.trim()) {
          e.preventDefault();
          shakeElement(field);
        } else if (index < inputFields.length - 1) {
          e.preventDefault();
          inputFields[index + 1].focus();
        }
      }
    });
  });
}
