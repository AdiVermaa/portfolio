document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initSmoothScroll();
  initMobileMenu();
  initScrollAnimations();
  initTypewriter();
});

function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const htmlElement = document.documentElement;
  
  if (!themeToggle) return; 

  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  });

  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (!icon) return;

    icon.classList.remove('fa-sun', 'fa-moon');
    
    if (theme === 'light') {
      icon.classList.add('fa-moon');
    } else {
      icon.classList.add('fa-sun');
    }
  }
}
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              targetElement.scrollIntoView({
                  behavior: 'smooth'
              });
              
              const navLinks = document.querySelector('.nav-links');
              if (navLinks.classList.contains('active')) {
                  toggleMobileMenu();
              }
          }
      });
  });
}

function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger-menu');
  const navLinks = document.querySelector('.nav-links');
  let isMenuOpen = false;

  function toggleMobileMenu() {
      isMenuOpen = !isMenuOpen;
      navLinks.classList.toggle('active');
      hamburger.classList.toggle('active');
      hamburger.setAttribute('aria-expanded', isMenuOpen);
      
      document.body.style.overflow = isMenuOpen ? 'hidden' : '';
      
      const spans = hamburger.querySelectorAll('span');
      if (isMenuOpen) {
          spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
          spans[1].style.opacity = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
      }
  }

  if (hamburger && navLinks) {
      hamburger.addEventListener('click', toggleMobileMenu);
  }
}

function initScrollAnimations() {
  const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px'
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
          }
      });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(element => {
      if (element) {
          observer.observe(element);
      }
  });
}

function initTypewriter() {
  const typewriter = document.querySelector('.typewriter');
  if (typewriter) {
      const text = typewriter.textContent;
      typewriter.textContent = '';
      let i = 0;

      function type() {
          if (i < text.length) {
              typewriter.textContent += text.charAt(i);
              i++;
              setTimeout(type, 100);
          }
      }

      type();
  }
}