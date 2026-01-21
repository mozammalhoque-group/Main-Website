
        // Load header and footer
        document.addEventListener('DOMContentLoaded', function() {
            // Load header
            fetch('/resources/header-and-footer/header.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('header-container').innerHTML = data;
                    // Update navigation as needed
                });
            
            // Load footer
            fetch('/resources/header-and-footer/footer.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('footer-container').innerHTML = data;
                });
        });
    
