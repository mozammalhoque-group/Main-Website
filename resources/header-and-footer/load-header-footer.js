document.addEventListener('DOMContentLoaded', function() {

        // গ্লোবাল ফিক্সড CSS ইনজেকশন (এটিই সব পেজে Sticky কাজ করাবে)
    const fixStickyCSS = document.createElement('style');
    fixStickyCSS.innerHTML = `
        #header-container { 
            display: contents; 
        }
        body { 
            overflow-x: clip; /* sticky পজিশন সচল রাখার জন্য */
        }
        .main-nav {
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            z-index: 9999 !important;
        }
    `;
    document.head.appendChild(fixStickyCSS);
    
    // ১. হেডার লোড করা
    fetch('/resources/header-and-footer/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
            // হেডার লোড হওয়ার পর মেনু ফাংশন চালু করা
            initHeaderFunctions();
        });
    
    // ২. ফুটার লোড করা
    fetch('/resources/header-and-footer/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
            // ফুটার লোড হওয়ার পর সাল আপডেট করা
            initFooterFunctions();
        });
});

// হেডারের মেনু কাজ করার জন্য ফাংশন
function initHeaderFunctions() {
    const dropdownBtn = document.getElementById('dropdown-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    
    if (dropdownBtn && dropdownMenu) {
        // মেনু বাটন ক্লিক
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        // সাব-মেনু টগল (About, Member, etc.)
        const submenuItems = document.querySelectorAll('.has-submenu');
        submenuItems.forEach(item => {
            const link = item.querySelector('.dropdown-item');
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // অন্য সব সাব-মেনু বন্ধ করা
                submenuItems.forEach(i => {
                    if(i !== item) {
                        i.classList.remove('active');
                        i.querySelector('.sub-menu').classList.remove('show');
                    }
                });

                item.classList.toggle('active');
                item.querySelector('.sub-menu').classList.toggle('show');
            });
        });

        // স্ক্রিনের কোথাও ক্লিক করলে মেনু বন্ধ করা
        document.addEventListener('click', () => {
            dropdownMenu.classList.remove('show');
            submenuItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.sub-menu').classList.remove('show');
            });
        });
    }
}

// ফুটারের সাল আপডেট করার ফাংশন
function initFooterFunctions() {
    const yearSpan = document.getElementById("copyright-year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}
