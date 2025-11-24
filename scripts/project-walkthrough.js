// Project Walkthrough JavaScript
// Handles sidebar navigation, smooth scrolling, and active link highlighting

document.addEventListener('DOMContentLoaded', () => {
    // Initialize sidebar navigation
    initializeSidebarNavigation();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize active section tracking
    initializeSectionTracking();
});

/**
 * Initialize sidebar navigation functionality
 */
function initializeSidebarNavigation() {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only handle internal links
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Smooth scroll to target
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active state
                    updateActiveLink(link);
                    
                    // Update URL without scrolling
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

/**
 * Initialize smooth scrolling for all anchor links
 */
function initializeSmoothScrolling() {
    // Handle all links that point to sections
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return; // Skip empty anchors
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL
                history.pushState(null, null, href);
            }
        });
    });
}

/**
 * Track which section is currently visible and update sidebar
 */
function initializeSectionTracking() {
    const sections = document.querySelectorAll('.content-section');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    // Create intersection observer
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const correspondingLink = document.querySelector(`.sidebar-link[href="#${id}"]`);
                
                if (correspondingLink) {
                    updateActiveLink(correspondingLink);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Update active link in sidebar
 * @param {HTMLElement} activeLink - The link to make active
 */
function updateActiveLink(activeLink) {
    // Remove active class from all links
    const allLinks = document.querySelectorAll('.sidebar-link');
    allLinks.forEach(link => link.classList.remove('active'));
    
    // Add active class to clicked link
    activeLink.classList.add('active');
}

/**
 * Handle initial page load with hash
 */
window.addEventListener('load', () => {
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Small delay to ensure page is fully rendered
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active link
                const correspondingLink = document.querySelector(`.sidebar-link[href="#${targetId}"]`);
                if (correspondingLink) {
                    updateActiveLink(correspondingLink);
                }
            }, 100);
        }
    }
});

/**
 * Mobile sidebar toggle (for responsive design)
 */
function toggleMobileSidebar() {
    const sidebar = document.querySelector('.walkthrough-sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}

// Add mobile menu button if on small screen
if (window.innerWidth <= 768) {
    // Create mobile toggle button
    const mobileToggle = document.createElement('button');
    mobileToggle.className = 'mobile-sidebar-toggle';
    mobileToggle.innerHTML = 'Menu';
    mobileToggle.style.cssText = `
        position: fixed;
        top: 80px;
        left: 16px;
        z-index: 999;
        padding: 12px 20px;
        background: linear-gradient(135deg, var(--primary-color) 0%, #1e4a72 100%);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 700;
        font-size: 0.9rem;
        letter-spacing: 0.025em;
        box-shadow: 0 4px 12px rgba(0, 51, 102, 0.3);
        transition: all 0.25s ease;
    `;
    
    mobileToggle.addEventListener('mouseenter', () => {
        mobileToggle.style.transform = 'translateY(-2px)';
        mobileToggle.style.boxShadow = '0 6px 16px rgba(0, 51, 102, 0.4)';
    });
    
    mobileToggle.addEventListener('mouseleave', () => {
        mobileToggle.style.transform = 'translateY(0)';
        mobileToggle.style.boxShadow = '0 4px 12px rgba(0, 51, 102, 0.3)';
    });
    
    mobileToggle.addEventListener('click', toggleMobileSidebar);
    document.body.appendChild(mobileToggle);
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        const sidebar = document.querySelector('.walkthrough-sidebar');
        const toggle = document.querySelector('.mobile-sidebar-toggle');
        
        if (sidebar && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !toggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });
}
