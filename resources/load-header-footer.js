
        // Load header and footer
        document.addEventListener('DOMContentLoaded', function() {
            // Load header
            fetch('https://mozammalhoque-group.com.bd/resources/header.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('header-container').innerHTML = data;
                    // Update navigation as needed
                });
            
            // Load footer
            fetch('https://mozammalhoque-group.com.bd/resources/footer.html')
                .then(response => response.text())
                .then(data => {
                    document.getElementById('footer-container').innerHTML = data;
                });
        });
    
