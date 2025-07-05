// Loading Screen
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
});

// Typed.js Animation
document.addEventListener('DOMContentLoaded', function() {
    const typed = new Typed('#typed-text', {
        strings: [
            'Bilgisayar Mühendisi',
            'Yapay Zeka Geliştiricisi',
            'Görüntü İşleme Uzmanı',
            'Derin Öğrenme Araştırmacısı'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const navbarHeight = document.getElementById('navbar').offsetHeight;
        
        if (window.scrollY >= (sectionTop - navbarHeight - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Scroll Animation for Timeline Items
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// Skill Bars Animation
const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            });
        }
    });
}, { threshold: 0.5 });

// Observe skills section
const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link
        const mailtoLink = `mailto:yigity4002@gmail.com?subject=Web Sitesi İletişim (${encodeURIComponent(name)})&body=Gönderen: ${encodeURIComponent(name)}%0AEmail: ${encodeURIComponent(email)}%0A%0A${encodeURIComponent(message)}`;
        
        // Open default email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Mesajınız e-posta uygulamanızda açıldı!', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Parallax Effect for Hero Background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const heroParticles = document.querySelector('.hero-particles');
    
    if (heroBackground && heroParticles) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroParticles.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Project Modal System
const projectData = {
    underwater: {
        title: 'Su Altı Simülasyonunda Nesne Tespiti ve Görev Uygulaması',
        content: `
            <h4>Proje Açıklaması</h4>
            <p>Bu proje, bitirme tezi kapsamında geliştirilen kapsamlı bir su altı simülasyonu sistemidir. Antik eser, boru, boru sızıntısı ve mayın tespiti gerçekleştiren bir su altı simülasyonu geliştirildi.</p>
            
            <h4>Teknik Detaylar</h4>
            <ul>
                <li><strong>Nesne Tespiti:</strong> YOLOv8 ve Roboflow teknolojileriyle başarıyla tamamlandı</li>
                <li><strong>Veri İletişimi:</strong> Unity (C#) ve Python arasında TCP tabanlı veri iletişimi sağlandı</li>
                <li><strong>Görev Senaryoları:</strong> Görüntü işleme tabanlı karar mekanizmaları ile hayata geçirildi</li>
                <li><strong>Simülasyon:</strong> Gerçekçi su altı ortamı simülasyonu</li>
            </ul>
            
            <h4>Kullanılan Teknolojiler</h4>
            <ul>
                <li>YOLOv8 - Nesne tespiti</li>
                <li>Roboflow - Veri işleme</li>
                <li>Unity (C#) - Simülasyon motoru</li>
                <li>Python - Backend işlemler</li>
                <li>OpenCV - Görüntü işleme</li>
            </ul>
            
            <h4>Başarılar</h4>
            <p>Proje, akademik jüri tarafından yüksek puanla değerlendirildi ve gelecekteki su altı araştırmaları için temel oluşturdu.</p>
        `
    },
    assistant: {
        title: 'Virtual Assistant - Yapay Zeka Destekli Sanal Asistan',
        content: `
            <h4>Proje Açıklaması</h4>
            <p>Face Recognition yapan, YouTube, Google, Wikipedia, ChatGPT gibi kaynaklardan veri çekerek iletişime geçen ve birçok özellik barındıran yapay zeka destekli sanal asistan sistemi.</p>
            
            <h4>Temel Özellikler</h4>
            <ul>
                <li><strong>Yüz Tanıma:</strong> Derin öğrenme tabanlı yüz tanıma algoritmalarıyla kimlik doğrulaması</li>
                <li><strong>Doğal Dil İşleme:</strong> NLP teknikleriyle farklı veri kaynaklarından gelen bilgileri entegre eder</li>
                <li><strong>Çoklu API Entegrasyonu:</strong> YouTube, Google, Wikipedia, ChatGPT entegrasyonları</li>
                <li><strong>Etkileşimli İletişim:</strong> Kullanıcı ile etkili ve akıcı bir iletişim kurar</li>
            </ul>
            
            <h4>Teknik Detaylar</h4>
            <ul>
                <li>Derin öğrenme tabanlı yüz tanıma</li>
                <li>Doğal dil işleme (NLP) teknikleri</li>
                <li>Çoklu API entegrasyonları</li>
                <li>Gerçek zamanlı veri işleme</li>
                <li>Kullanıcı dostu arayüz</li>
            </ul>
            
            <h4>Kullanım Alanları</h4>
            <p>Bu sistem, bilgiye anlık erişim sağlar ve etkileşimli deneyimi artırır. Ev otomasyonu, eğitim ve iş ortamlarında kullanılabilir.</p>
        `
    },
    football: {
        title: 'Football Analysis - Kapsamlı Futbol Analiz Sistemi',
        content: `
            <h4>Proje Açıklaması</h4>
            <p>LLM tabanlı gelecek maç tahmini yapan, YOLOv8 ile oyuncu ve takım tanımlaması yapan, hakem ve takım bilgilerini gösteren, maç istatistiklerini analiz eden kapsamlı futbol analiz sistemi.</p>
            
            <h4>Ana Özellikler</h4>
            <ul>
                <li><strong>Maç Tahmini:</strong> LLM tabanlı gelecek maç tahmini</li>
                <li><strong>Oyuncu Tanımlama:</strong> YOLOv8 ile oyuncu ve takım tanımlaması</li>
                <li><strong>İstatistik Analizi:</strong> Maç istatistiklerini analiz eder</li>
                <li><strong>Gerçek Zamanlı Takip:</strong> Sahadaki oyuncu ve takım konumlarını gerçek zamanlı takip</li>
            </ul>
            
            <h4>Teknik Detaylar</h4>
            <ul>
                <li>İleri görüntü işleme ve nesne tanıma algoritmaları</li>
                <li>Büyük dil modelleri (LLM) ile maç verilerini analiz</li>
                <li>Geleceğe yönelik skor ve performans tahminleri</li>
                <li>İstatistiksel veri çıkarımı ve makine öğrenmesi tabanlı öngörüler</li>
            </ul>
            
            <h4>Kullanım Alanları</h4>
            <p>Bu analiz sistemi, teknik ekiplerin stratejik planlamalarında veri odaklı kararlar almasını sağlar. Futbol kulüpleri, analistler ve spor medyası için değerli bir araçtır.</p>
            
            <h4>Başarılar</h4>
            <p>Sistem, %85 doğruluk oranıyla maç tahminleri yapabilmekte ve oyuncu performans analizlerinde yüksek başarı göstermektedir.</p>
        `
    }
};

// Project Cards Hover Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Project Modal Functionality
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openModal(projectId) {
    const project = projectData[projectId];
    if (project) {
        modalTitle.textContent = project.title;
        modalBody.innerHTML = project.content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Event listeners for project links
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const projectId = this.getAttribute('data-project');
        openModal(projectId);
    });
});

// Close modal events
modalClose.addEventListener('click', closeModal);
modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Skill Cards Hover Effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        const progressBar = this.querySelector('.skill-progress');
        if (progressBar) {
            progressBar.style.transform = 'scaleX(1.05)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const progressBar = this.querySelector('.skill-progress');
        if (progressBar) {
            progressBar.style.transform = 'scaleX(1)';
        }
    });
});

// Contact Form Input Focus Effects
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});

// Social Links Hover Effects
document.querySelectorAll('.footer-social a, .contact-item a').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Scroll to Top Button (Optional Enhancement)
function createScrollToTopButton() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(scrollButton);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollButton.style.opacity = '1';
            scrollButton.style.visibility = 'visible';
        } else {
            scrollButton.style.opacity = '0';
            scrollButton.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effects
    scrollButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });
    
    scrollButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// Performance Optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize all animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Trigger initial animations
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1000);
    
    // Add loading animation class to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 1500);
}); 