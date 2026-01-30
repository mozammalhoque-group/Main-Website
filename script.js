        // Auto-update copyright year
        document.getElementById("copyright-year").textContent = new Date().getFullYear();
        
        // Data for sister concerns logos
        const sisterConcerns = [
            { 
                name: "Mozammal Hoque Market", 
                logo: "/assets/brand/logo/sister-concerns/market.png"
            },
            { 
                name: "Mozammal Hoque Foundation", 
                logo: "/assets/brand/logo/sister-concerns/foundation.png" 
            },
        ];
        
        // DOM elements
        const logoSlider = document.getElementById('logo-slider');
        const logoDots = document.getElementById('logo-dots');
        
        const dropdownBtn = document.getElementById('dropdown-btn');
        const dropdownMenu = document.getElementById('dropdown-menu');
        const homeBtn = document.getElementById('home-btn');
        const aboutBtn = document.getElementById('about-btn');
        const contactBtn = document.getElementById('contact-btn');
        
        // Slider state
        let logoCurrentSlide = 0;
        let logoSlidesPerView = 1; // সবসময় ১টি লোগো দেখাবে
        let logoAutoSlideInterval;
        
        // Initialize sliders
        function initSliders() {
            // স্লাইডার ক্লিয়ার করা
            logoSlider.innerHTML = '';
            logoSlidesPerView = 1;
            
            // Create logo slides
            sisterConcerns.forEach((concern) => {
                const slide = document.createElement('div');
                slide.className = 'slide';
                slide.innerHTML = `
                    <div class="logo-slide">
                        <img src="${concern.logo}" alt="${concern.name} Logo">
                    </div>
                    <p class="logo-slide-name">${concern.name}</p>
                `;
                logoSlider.appendChild(slide);
            });
            
            // ডট তৈরি করা
            const logoDotCount = Math.ceil(sisterConcerns.length / logoSlidesPerView);
            createDots(logoDots, logoDotCount);
            
            // স্লাইডারের পজিশন সেট করা
            updateSliderPosition(logoSlider, logoCurrentSlide);
            
            // অটো স্লাইড শুরু করা
            startAutoSlide();
        }
        
        // Create dots for slider
        function createDots(dotsContainer, dotCount) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                // প্রথম ডটটি অ্যাক্টিভ করা
                if (i === 0) dot.classList.add('active');
                
                // ডট ক্লিক ইভেন্ট
                dot.addEventListener('click', () => {
                    logoCurrentSlide = i * logoSlidesPerView;
                    updateSliderPosition(logoSlider, logoCurrentSlide);
                    updateDots(dotsContainer, i);
                    
                    // ম্যানুয়ালি ক্লিক করলে টাইমার রিসেট হবে
                    startAutoSlide();
                });
                dotsContainer.appendChild(dot);
            }
        }
        
        // Update slider position
        function updateSliderPosition(slider, currentSlide) {
            const slideWidth = 100 / logoSlidesPerView;
            const translateX = -currentSlide * slideWidth;
            slider.style.transform = `translateX(${translateX}%)`;
        }
        
        // Update active dot class
        function updateDots(dotsContainer, activeIndex) {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                // CSS এ transition থাকায় ক্লাস চেঞ্জ হলেই অ্যানিমেশন হবে
                dot.classList.toggle('active', index === activeIndex);
            });
        }
        
        // Next slide function
        function nextSlide() {
            const maxSlide = sisterConcerns.length - logoSlidesPerView;
            
            if (logoCurrentSlide >= maxSlide) {
                logoCurrentSlide = 0; // শেষে গেলে শুরুতে ফিরে আসবে
            } else {
                logoCurrentSlide += logoSlidesPerView;
            }
            
            updateSliderPosition(logoSlider, logoCurrentSlide);
            updateDots(logoDots, Math.floor(logoCurrentSlide / logoSlidesPerView));
        }
        
        // Previous slide function
        function prevSlide() {
            const maxSlide = sisterConcerns.length - logoSlidesPerView;
            
            if (logoCurrentSlide <= 0) {
                logoCurrentSlide = maxSlide; // শুরুতে থাকলে শেষে যাবে
            } else {
                logoCurrentSlide -= logoSlidesPerView;
            }
            
            updateSliderPosition(logoSlider, logoCurrentSlide);
            updateDots(logoDots, Math.floor(logoCurrentSlide / logoSlidesPerView));
        }
        
        // Start auto sliding
        function startAutoSlide() {
            clearInterval(logoAutoSlideInterval);
            
            // ৪ সেকেন্ড পর পর স্লাইড চেঞ্জ হবে
            logoAutoSlideInterval = setInterval(() => {
                nextSlide();
            }, 4000);
        }
        
        // Navigation button functionality
        if(dropdownBtn) {
            dropdownBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdownMenu.classList.toggle('show');
                closeAllSubMenus();
            });
        }
        
        // Close dropdown when clicking elsewhere
        document.addEventListener('click', (e) => {
            if (dropdownBtn && dropdownMenu) {
                if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                    dropdownMenu.classList.remove('show');
                    closeAllSubMenus();
                }
            }
        });
        
        // Navigation buttons logic
        if(homeBtn) {
            homeBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                updateActiveNav(homeBtn);
            });
        }
        
        if(aboutBtn) {
            aboutBtn.addEventListener('click', () => {
                const aboutSection = document.getElementById('about');
                if(aboutSection) aboutSection.scrollIntoView({ behavior: 'smooth' });
                updateActiveNav(aboutBtn);
            });
        }
        
        if(contactBtn) {
            contactBtn.addEventListener('click', () => {
                const footer = document.querySelector('.footer');
                if(footer) footer.scrollIntoView({ behavior: 'smooth' });
                updateActiveNav(contactBtn);
            });
        }
        
        // Update active navigation button
        function updateActiveNav(activeBtn) {
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            activeBtn.classList.add('active');
        }
        
        // Function to close all sub-menus
        function closeAllSubMenus() {
            document.querySelectorAll('.has-submenu').forEach(item => {
                item.classList.remove('active');
                const subMenu = item.querySelector('.sub-menu');
                if(subMenu) subMenu.classList.remove('show');
            });
        }
        
        // Function to toggle sub-menu
        function toggleSubMenu(clickedItem) {
            const submenu = clickedItem.querySelector('.sub-menu');
            const isActive = clickedItem.classList.contains('active');
            
            // Close all other sub-menus first
            document.querySelectorAll('.has-submenu').forEach(item => {
                if (item !== clickedItem) {
                    item.classList.remove('active');
                    const otherSub = item.querySelector('.sub-menu');
                    if(otherSub) otherSub.classList.remove('show');
                }
            });
            
            // Toggle current sub-menu
            if (isActive) {
                clickedItem.classList.remove('active');
                if(submenu) submenu.classList.remove('show');
            } else {
                clickedItem.classList.add('active');
                if(submenu) submenu.classList.add('show');
            }
        }
        
        // Sub-menu Event Listeners
        const submenuItems = document.querySelectorAll('.has-submenu');
        submenuItems.forEach(item => {
            const link = item.querySelector('.dropdown-item');
            if(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSubMenu(item);
                });
            }
        
            // Hover effect for desktop
            item.addEventListener('mouseenter', function() {
                if (window.innerWidth >= 993) {
                    closeAllSubMenus();
                    this.classList.add('active');
                    const sub = this.querySelector('.sub-menu');
                    if(sub) sub.classList.add('show');
                }
            });
        });
        
        // Close sub-menus when clicking inside links
        document.querySelectorAll('.sub-menu a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
                if(dropdownMenu) dropdownMenu.classList.remove('show');
                closeAllSubMenus();
            });
        });
        
        if(dropdownMenu) {
            dropdownMenu.addEventListener('mouseleave', function() {
                if (window.innerWidth >= 993) {
                    closeAllSubMenus();
                }
            });
        }
        
        // Touch events for mobile slider (Swipe Support)
        let startX = 0;
        let endX = 0;
        
        function handleTouchStart(e) {
            startX = e.touches[0].clientX;
        }
        
        function handleTouchMove(e) {
            endX = e.touches[0].clientX;
        }
        
        function handleTouchEnd() {
            const threshold = 50; // Minimum swipe distance
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe Left -> Next
                    nextSlide();
                } else {
                    // Swipe Right -> Prev
                    prevSlide();
                }
                // Reset timer on manual swipe
                startAutoSlide();
            }
            // Reset coordinates
            startX = 0;
            endX = 0;
        }
        
        if(logoSlider) {
            logoSlider.addEventListener('touchstart', handleTouchStart, {passive: true});
            logoSlider.addEventListener('touchmove', handleTouchMove, {passive: true});
            logoSlider.addEventListener('touchend', handleTouchEnd);
        }
        
        // Initialize on load
        window.addEventListener('load', initSliders);
        
        // Reinitialize on resize (to fix layout if needed)
        window.addEventListener('resize', () => {
            // Optional: Debounce resize if performance is an issue
            initSliders();
        });
