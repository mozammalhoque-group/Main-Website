        // Auto-update copyright year
        document.getElementById("copyright-year").textContent = new Date().getFullYear();

        // Data for sister concerns logos
        const sisterConcerns = [
          { 
            name: "Mozammal Hoque Market", 
            logo: "/assets/brand/kit/black.png"
          },
          { 
            name: "Mozammal Hoque Foundation", 
            logo: "/assets/brand/kit/black.png" 
          }
        ];

        // Data for team members
        const teamMembers = [
          { 
            name: "Mozammal Hoque", 
            designation: "Chairman & Founder", 
            image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj7jkoB3WU_s0RUIOzPsDACw3OrLY9yJpr56x1F_0eNeK_C4fKYvuhM69fOpGYQGp4eXVvGxRu1ICpPeJCjzh9X6Z49qNcfNQ9dKCDAa31sglZ3cIlQPiU4bYsKbz-qPsPmAOSw6pNFtiNZPli13DcTbIWLj6u-uGGMSiHGLUepblFiW8Mh30k0kot3/s16000/Mozammal_Hoque%5B1%5D.png"
          },
          { 
            name: "Marium Akter", 
            designation: "Co-Founder", 
            image: "images/team/mozammal-hoque.jpg"
          },
          { 
            name: "Noor Mohammad Siam", 
            designation: "CEO & Managing Director", 
            image: "https://noormohammadsiam.com/me.jpg" 
          }
        ];

        // DOM elements
        const logoSlider = document.getElementById('logo-slider');
        const logoDots = document.getElementById('logo-dots');
        const teamSlider = document.getElementById('team-slider');
        const teamDots = document.getElementById('team-dots');
        
        const dropdownBtn = document.getElementById('dropdown-btn');
        const dropdownMenu = document.getElementById('dropdown-menu');
        const homeBtn = document.getElementById('home-btn');
        const aboutBtn = document.getElementById('about-btn');
        const contactBtn = document.getElementById('contact-btn');
        
        // Slider state
        let logoCurrentSlide = 0;
        let teamCurrentSlide = 0;
        let logoSlidesPerView = 4;
        let teamSlidesPerView = 4;
        let logoAutoSlideInterval;
        let teamAutoSlideInterval;

        // Initialize sliders
        function initSliders() {
            // Set slides per view based on screen width
            // Mobile: 2 logos at a time, Tablet: 3 logos, Desktop: 4-5 logos
            if (window.innerWidth < 480) {
                logoSlidesPerView = 2; // Mobile: 2 logos at a time
                teamSlidesPerView = 1;
            } else if (window.innerWidth < 768) {
                logoSlidesPerView = 2; // Small tablet: 2 logos at a time
                teamSlidesPerView = 2;
            } else if (window.innerWidth < 992) {
                logoSlidesPerView = 3; // Tablet: 3 logos
                teamSlidesPerView = 3;
            } else if (window.innerWidth < 1200) {
                logoSlidesPerView = 4; // Small desktop: 4 logos
                teamSlidesPerView = 4;
            } else {
                logoSlidesPerView = 5; // Large desktop: 5 logos
                teamSlidesPerView = 4;
            }
            
            // Calculate slide width based on slides per view
            const logoSlideWidth = 100 / logoSlidesPerView;
            const teamSlideWidth = 100 / teamSlidesPerView;
            
            // Create logo slides
                logoSlider.innerHTML = '';
                sisterConcerns.forEach((concern, index) => {
                  const slide = document.createElement('div');
                  slide.className = 'slide';
                  slide.innerHTML = `
                    <div class="logo-slide">
                      <!-- Replace div with img -->
                      <img src="${concern.logo}" alt="${concern.name} Logo" style="max-width: 100%; max-height: 80px;">
                    </div>
                    <p style="margin-top: 10px; font-weight: 500;">${concern.name}</p>
                  `;
                  logoSlider.appendChild(slide);
                });
            
            // Calculate number of dots for logo slider
            const logoDotCount = Math.ceil(sisterConcerns.length / logoSlidesPerView);
            createDots(logoDots, logoDotCount);
            
            // Create team slides
                teamSlider.innerHTML = '';
                teamMembers.forEach((member, index) => {
                  const slide = document.createElement('div');
                  slide.className = 'slide';
                  slide.innerHTML = `
                    <div class="team-slide">
                      <!-- Replace div with img -->
                      <img src="${member.image}" alt="${member.name}" class="team-img">
                      <div class="team-info">
                        <h4>${member.name}</h4>
                        <p>${member.designation}</p>
                      </div>
                    </div>
                  `;
                  teamSlider.appendChild(slide);
                });
            
            // Calculate number of dots for team slider
            const teamDotCount = Math.ceil(teamMembers.length / teamSlidesPerView);
            createDots(teamDots, teamDotCount);
            
            // Update slider positions
            updateSliderPosition(logoSlider, logoCurrentSlide, logoSlidesPerView);
            updateSliderPosition(teamSlider, teamCurrentSlide, teamSlidesPerView);
            
            // Start auto sliding
            startAutoSlide();
        }

        // Create dots for slider
        function createDots(dotsContainer, dotCount) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < dotCount; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    if (dotsContainer === logoDots) {
                        logoCurrentSlide = i * logoSlidesPerView;
                        updateSliderPosition(logoSlider, logoCurrentSlide, logoSlidesPerView);
                        updateDots(dotsContainer, i);
                    } else {
                        teamCurrentSlide = i * teamSlidesPerView;
                        updateSliderPosition(teamSlider, teamCurrentSlide, teamSlidesPerView);
                        updateDots(dotsContainer, i);
                    }
                });
                dotsContainer.appendChild(dot);
            }
        }

        // Update slider position
        function updateSliderPosition(slider, currentSlide, slidesPerView) {
            const slideWidth = 100 / slidesPerView;
            const translateX = -currentSlide * slideWidth;
            slider.style.transform = `translateX(${translateX}%)`;
        }

        // Update active dot
        function updateDots(dotsContainer, activeIndex) {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        }

        // Next slide function
        function nextSlide(sliderType) {
            if (sliderType === 'logo') {
                const maxSlide = sisterConcerns.length - logoSlidesPerView;
                if (logoCurrentSlide >= maxSlide) {
                    logoCurrentSlide = 0;
                } else {
                    logoCurrentSlide += logoSlidesPerView;
                }
                updateSliderPosition(logoSlider, logoCurrentSlide, logoSlidesPerView);
                updateDots(logoDots, Math.floor(logoCurrentSlide / logoSlidesPerView));
            } else {
                const maxSlide = teamMembers.length - teamSlidesPerView;
                if (teamCurrentSlide >= maxSlide) {
                    teamCurrentSlide = 0;
                } else {
                    teamCurrentSlide += teamSlidesPerView;
                }
                updateSliderPosition(teamSlider, teamCurrentSlide, teamSlidesPerView);
                updateDots(teamDots, Math.floor(teamCurrentSlide / teamSlidesPerView));
            }
        }

        // Previous slide function
        function prevSlide(sliderType) {
            if (sliderType === 'logo') {
                const maxSlide = sisterConcerns.length - logoSlidesPerView;
                if (logoCurrentSlide <= 0) {
                    logoCurrentSlide = maxSlide;
                } else {
                    logoCurrentSlide -= logoSlidesPerView;
                }
                updateSliderPosition(logoSlider, logoCurrentSlide, logoSlidesPerView);
                updateDots(logoDots, Math.floor(logoCurrentSlide / logoSlidesPerView));
            } else {
                const maxSlide = teamMembers.length - teamSlidesPerView;
                if (teamCurrentSlide <= 0) {
                    teamCurrentSlide = maxSlide;
                } else {
                    teamCurrentSlide -= teamSlidesPerView;
                }
                updateSliderPosition(teamSlider, teamCurrentSlide, teamSlidesPerView);
                updateDots(teamDots, Math.floor(teamCurrentSlide / teamSlidesPerView));
            }
        }

        // Start auto sliding
        function startAutoSlide() {
            clearInterval(logoAutoSlideInterval);
            clearInterval(teamAutoSlideInterval);
            
            logoAutoSlideInterval = setInterval(() => {
                nextSlide('logo');
            }, 4000);
            
            teamAutoSlideInterval = setInterval(() => {
                nextSlide('team');
            }, 4500);
        }

        // Navigation button functionality
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
            // Close all sub-menus when opening main menu
            closeAllSubMenus();
        });

        // Close dropdown when clicking elsewhere
        document.addEventListener('click', (e) => {
            if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove('show');
                // Close all sub-menus when clicking outside
                closeAllSubMenus();
            }
        });

        // Navigation buttons
        homeBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            updateActiveNav(homeBtn);
        });

        aboutBtn.addEventListener('click', () => {
            document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
            updateActiveNav(aboutBtn);
        });

        contactBtn.addEventListener('click', () => {
            document.querySelector('.footer').scrollIntoView({ behavior: 'smooth' });
            updateActiveNav(contactBtn);
        });

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
                item.querySelector('.sub-menu').classList.remove('show');
            });
        }

        // Function to toggle sub-menu
        function toggleSubMenu(clickedItem) {
            const submenu = clickedItem.querySelector('.sub-menu');
            const arrow = clickedItem.querySelector('.submenu-toggle');
            const isActive = clickedItem.classList.contains('active');
            
            // Close all other sub-menus
            document.querySelectorAll('.has-submenu').forEach(item => {
                if (item !== clickedItem) {
                    item.classList.remove('active');
                    item.querySelector('.sub-menu').classList.remove('show');
                }
            });
            
            // Toggle current sub-menu
            if (isActive) {
                clickedItem.classList.remove('active');
                submenu.classList.remove('show');
            } else {
                clickedItem.classList.add('active');
                submenu.classList.add('show');
            }
        }

        // SUB-MENU TOGGLE FUNCTIONALITY - Fixed Version
        // Get all sub-menu items
        const submenuItems = document.querySelectorAll('.has-submenu');
        
        // Add click event to each sub-menu item
        submenuItems.forEach(item => {
            // Add click event to the dropdown item (link)
            item.querySelector('.dropdown-item').addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleSubMenu(item);
            });
        });

        // Close sub-menus when clicking on a sub-menu link
        document.querySelectorAll('.sub-menu a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
                // Close the dropdown menu
                dropdownMenu.classList.remove('show');
                // Close all sub-menus
                closeAllSubMenus();
            });
        });

        // Also handle hover for desktop (for better UX)
        submenuItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                if (window.innerWidth >= 993) {
                    // Close all other sub-menus
                    closeAllSubMenus();
                    
                    // Open this sub-menu
                    this.classList.add('active');
                    this.querySelector('.sub-menu').classList.add('show');
                }
            });
        });

        // Close sub-menus when mouse leaves dropdown menu on desktop
        dropdownMenu.addEventListener('mouseleave', function() {
            if (window.innerWidth >= 993) {
                closeAllSubMenus();
            }
        });

        // Touch events for mobile slider
        let startX = 0;
        let endX = 0;

        function handleTouchStart(e) {
            startX = e.touches[0].clientX;
        }

        function handleTouchMove(e) {
            endX = e.touches[0].clientX;
        }

        function handleTouchEnd(sliderType) {
            const threshold = 50;
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    nextSlide(sliderType);
                } else {
                    // Swipe right - previous slide
                    prevSlide(sliderType);
                }
            }
        }

        logoSlider.addEventListener('touchstart', handleTouchStart);
        logoSlider.addEventListener('touchmove', handleTouchMove);
        logoSlider.addEventListener('touchend', () => handleTouchEnd('logo'));

        teamSlider.addEventListener('touchstart', handleTouchStart);
        teamSlider.addEventListener('touchmove', handleTouchMove);
        teamSlider.addEventListener('touchend', () => handleTouchEnd('team'));

        // Initialize on load
        window.addEventListener('load', initSliders);
        
        // Reinitialize on resize
        window.addEventListener('resize', initSliders);
