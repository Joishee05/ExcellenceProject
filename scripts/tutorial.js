// Tutorial JavaScript - Interactive Code Editor and Navigation

// Track completed lessons
let completedLessons = new Set();
const totalLessons = 15;

// Load progress from localStorage
function loadProgress() {
    const saved = localStorage.getItem('htmlProgress');
    if (saved) {
        completedLessons = new Set(JSON.parse(saved));
        updateProgressBar();
        updateCompletedMarkers();
    }
}

// Save progress to localStorage
function saveProgress() {
    localStorage.setItem('htmlProgress', JSON.stringify([...completedLessons]));
}

// Update progress bar
function updateProgressBar() {
    const percentage = (completedLessons.size / totalLessons) * 100;
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressFill && progressText) {
        progressFill.style.width = percentage + '%';
        progressText.textContent = Math.round(percentage) + '% Complete';
    }
}

// Add completed markers to sidebar
function updateCompletedMarkers() {
    completedLessons.forEach(lessonNum => {
        const link = document.querySelector(`[data-lesson="${lessonNum}"]`);
        if (link) {
            link.classList.add('completed');
        }
    });
}

// Mark lesson as completed
function markLessonComplete(lessonNum) {
    completedLessons.add(lessonNum);
    saveProgress();
    updateProgressBar();
    updateCompletedMarkers();
}

// Show specific lesson
function showLesson(lessonNum) {
    // Hide all lessons
    document.querySelectorAll('.lesson').forEach(lesson => {
        lesson.classList.remove('active');
    });
    
    // Show selected lesson
    const selectedLesson = document.getElementById(`lesson-${lessonNum}`);
    if (selectedLesson) {
        selectedLesson.classList.add('active');
        
        // Update sidebar active state
        document.querySelectorAll('.lesson-link').forEach(link => {
            link.classList.remove('active');
        });
        const activeLink = document.querySelector(`[data-lesson="${lessonNum}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Mark previous lesson as completed
        if (lessonNum > 1) {
            markLessonComplete(lessonNum - 1);
        }
    }
}

// Navigate to next lesson
function nextLesson(lessonNum) {
    showLesson(lessonNum);
}

// Navigate to previous lesson
function prevLesson(lessonNum) {
    showLesson(lessonNum);
}

// Run code in iframe
function runCode(lessonNum) {
    const codeInput = document.getElementById(`code-${lessonNum}`);
    const outputFrame = document.getElementById(`output-${lessonNum}`);
    
    if (codeInput && outputFrame) {
        const code = codeInput.value;
        const iframe = outputFrame;
        
        // Write code to iframe
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(code);
        iframeDoc.close();
        
        // Validate challenge if exists
        validateChallenge(lessonNum, code);
    }
}

// Challenge validation rules for each lesson
const challengeValidations = {
    1: {
        originalCode: `<h1>My First Webpage</h1>
<p>This is my first paragraph in HTML!</p>`,
        requirements: [
            { test: (code, original) => {
                // Must change the h1 content
                const originalH1 = original.match(/<h1>(.*?)<\/h1>/);
                const newH1 = code.match(/<h1>(.*?)<\/h1>/);
                return newH1 && originalH1 && newH1[1] !== originalH1[1];
            }, message: 'Change the heading text (challenge requirement 1)' },
            { test: (code, original) => {
                // Must change the p content
                const originalP = original.match(/<p>(.*?)<\/p>/);
                const newP = code.match(/<p>(.*?)<\/p>/);
                return newP && originalP && newP[1] !== originalP[1];
            }, message: 'Change the paragraph text to describe yourself (challenge requirement 2)' },
            { test: (code) => code.includes('<h1>') && code.includes('</h1>'), message: 'Keep the <h1> heading tag' },
            { test: (code) => code.includes('<p>') && code.includes('</p>'), message: 'Keep the <p> paragraph tag' }
        ],
        successMessage: 'Excellent! You\'ve completed the challenge by personalizing the content with your name and description.'
    },
    2: {
        originalCode: `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>`,
        requirements: [
            { test: (code) => code.includes('<!DOCTYPE html>'), message: 'Include <!DOCTYPE html>' },
            { test: (code) => code.includes('<html>') && code.includes('</html>'), message: 'Include <html> tags' },
            { test: (code) => code.includes('<head>') && code.includes('</head>'), message: 'Include <head> tags' },
            { test: (code) => code.includes('<body>') && code.includes('</body>'), message: 'Include <body> tags' },
            { test: (code, original) => {
                // Check if title was changed
                const originalTitle = original.match(/<title>(.*?)<\/title>/);
                const newTitle = code.match(/<title>(.*?)<\/title>/);
                return newTitle && originalTitle && newTitle[1] !== originalTitle[1];
            }, message: 'Change the page title to something meaningful' }
        ],
        successMessage: 'Perfect! You\'ve created a complete HTML document structure with your own title.'
    },
    3: {
        originalCode: `<h1>Main Heading</h1>
<h2>Subheading</h2>
<p>First paragraph.</p>
<p>Second paragraph.</p>`,
        requirements: [
            { test: (code) => code.includes('<h1>'), message: 'Include an <h1> heading tag' },
            { test: (code) => code.includes('<h2>') || code.includes('<h3>'), message: 'Include a subheading (h2 or h3)' },
            { test: (code) => code.match(/<p>/g) && code.match(/<p>/g).length >= 2, message: 'Include at least two paragraphs' },
            { test: (code, original) => {
                // Check if content was meaningfully changed
                return code !== original && code.trim().replace(/\s+/g, ' ') !== original.trim().replace(/\s+/g, ' ');
            }, message: 'Modify the headings and paragraphs with your own content' }
        ],
        successMessage: 'Great work! You\'ve organized content with proper heading hierarchy and your own text.'
    },
    4: {
        originalCode: `<p>This is <strong>bold</strong> text.</p>
<p>This is <em>italic</em> text.</p>`,
        requirements: [
            { test: (code) => code.includes('<strong>') && code.includes('</strong>'), message: 'Use <strong> for important text' },
            { test: (code) => code.includes('<em>') && code.includes('</em>'), message: 'Use <em> for emphasized text' },
            { test: (code, original) => {
                // Check if they added their own content with formatting
                const originalStrong = original.match(/<strong>(.*?)<\/strong>/);
                const newStrong = code.match(/<strong>(.*?)<\/strong>/);
                return newStrong && originalStrong && newStrong[1] !== originalStrong[1];
            }, message: 'Change the bold text to your own words' },
            { test: (code, original) => {
                // Check if they changed the italic content
                const originalEm = original.match(/<em>(.*?)<\/em>/);
                const newEm = code.match(/<em>(.*?)<\/em>/);
                return newEm && originalEm && newEm[1] !== originalEm[1];
            }, message: 'Change the italic text to your own words' }
        ],
        successMessage: 'Well done! You\'ve applied text formatting with your own content.'
    },
    5: {
        originalCode: `<a href="https://www.slu.edu">Visit SLU</a>
<a href="https://www.google.com" target="_blank">Google</a>`,
        requirements: [
            { test: (code) => code.includes('<a href='), message: 'Create at least one link with <a href="">' },
            { test: (code) => code.includes('target="_blank"'), message: 'Add target="_blank" to open in new tab' },
            { test: (code, original) => {
                // Check if they changed the URLs or added new links
                const originalLinks = original.match(/href="([^"]+)"/g) || [];
                const newLinks = code.match(/href="([^"]+)"/g) || [];
                return newLinks.length > originalLinks.length || JSON.stringify(newLinks) !== JSON.stringify(originalLinks);
            }, message: 'Modify the link URLs or add your own links' }
        ],
        successMessage: 'Excellent! You\'ve created and customized hyperlinks.'
    },
    6: {
        originalCode: `<img src="https://via.placeholder.com/300" alt="Placeholder image">`,
        requirements: [
            { test: (code) => code.includes('<img src='), message: 'Include an <img> tag with src attribute' },
            { test: (code) => code.includes('alt='), message: 'Add alt attribute for accessibility' },
            { test: (code, original) => {
                // Check if they changed the alt text
                const originalAlt = original.match(/alt="([^"]+)"/);
                const newAlt = code.match(/alt="([^"]+)"/);
                return newAlt && originalAlt && newAlt[1] !== originalAlt[1];
            }, message: 'Change the alt text to describe the image' }
        ],
        successMessage: 'Perfect! You\'ve added an accessible image with descriptive alt text.'
    },
    7: {
        originalCode: `<ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
</ul>`,
        requirements: [
            { test: (code) => code.includes('<ul>') || code.includes('<ol>'), message: 'Create a list (ul or ol)' },
            { test: (code) => code.match(/<li>/g) && code.match(/<li>/g).length >= 3, message: 'Include at least 3 list items' },
            { test: (code, original) => {
                // Check if list items were changed
                const originalItems = original.match(/<li>(.*?)<\/li>/g) || [];
                const newItems = code.match(/<li>(.*?)<\/li>/g) || [];
                return JSON.stringify(newItems) !== JSON.stringify(originalItems);
            }, message: 'Change the list items to your own content' }
        ],
        successMessage: 'Great! You\'ve created a list with your own items.'
    },
    8: {
        originalCode: `<table>
    <tr>
        <th>Name</th>
        <th>Age</th>
    </tr>
    <tr>
        <td>John</td>
        <td>25</td>
    </tr>
</table>`,
        requirements: [
            { test: (code) => code.includes('<table>') && code.includes('</table>'), message: 'Create a <table> element' },
            { test: (code) => code.match(/<tr>/g) && code.match(/<tr>/g).length >= 2, message: 'Include at least 2 table rows with <tr>' },
            { test: (code) => code.includes('<th>'), message: 'Add table headers with <th>' },
            { test: (code) => code.includes('<td>'), message: 'Add table data cells with <td>' },
            { test: (code, original) => {
                // Check if they changed the table content
                const originalCells = original.match(/<t[hd]>(.*?)<\/t[hd]>/g) || [];
                const newCells = code.match(/<t[hd]>(.*?)<\/t[hd]>/g) || [];
                return JSON.stringify(newCells) !== JSON.stringify(originalCells);
            }, message: 'Change the table content to your own data' }
        ],
        successMessage: 'Excellent! You\'ve built a properly structured table with your own data.'
    },
    9: {
        originalCode: `<form>
    <input type="text" placeholder="Name">
    <button type="submit">Submit</button>
</form>`,
        requirements: [
            { test: (code) => code.includes('<form'), message: 'Create a <form> element' },
            { test: (code) => code.includes('<input'), message: 'Include at least one <input> field' },
            { test: (code) => code.includes('<button') || code.includes('type="submit"'), message: 'Add a submit button' },
            { test: (code, original) => {
                // Check if they added labels or more inputs
                const originalInputs = original.match(/<input/g) || [];
                const newInputs = code.match(/<input/g) || [];
                return newInputs.length > originalInputs.length || code.includes('<label');
            }, message: 'Add more form fields or labels to improve the form' }
        ],
        successMessage: 'Well done! You\'ve created an improved form with proper structure.'
    },
    10: {
        originalCode: `<div>
    <h1>My Website</h1>
    <p>Content here</p>
</div>`,
        requirements: [
            { test: (code) => code.includes('<header>') || code.includes('<nav>'), message: 'Use semantic tags like <header> or <nav>' },
            { test: (code) => code.includes('<section>') || code.includes('<article>'), message: 'Use <section> or <article> for content' },
            { test: (code) => code.includes('<footer>'), message: 'Include a <footer> element' },
            { test: (code) => !code.includes('<div>') || (code.match(/<header>|<nav>|<section>|<article>|<footer>/g) || []).length >= 3, message: 'Replace generic <div> tags with semantic HTML5 elements' }
        ],
        successMessage: 'Outstanding! You\'ve used semantic HTML5 elements to improve structure and accessibility.'
    },
    11: {
        originalCode: `<p>Price: $100</p>
<p>Copyright notice</p>`,
        requirements: [
            { test: (code) => code.includes('&copy;'), message: 'Use &copy; for copyright symbol' },
            { test: (code) => code.includes('&lt;') || code.includes('&gt;'), message: 'Use &lt; or &gt; to display < or > symbols' },
            { test: (code) => code.match(/&[a-z]+;/g) && code.match(/&[a-z]+;/g).length >= 2, message: 'Use at least 2 different HTML entities' }
        ],
        successMessage: 'Excellent! You\'ve mastered HTML entities and special characters.'
    },
    12: {
        originalCode: `<h1>My Code</h1>
<p>First section</p>
<p>Second section</p>`,
        requirements: [
            { test: (code) => code.includes('<!--'), message: 'Add HTML comments using <!-- -->' },
            { test: (code) => code.match(/<!--/g) && code.match(/<!--/g).length >= 3, message: 'Include at least 3 comments to organize your code' },
            { test: (code) => {
                // Check for comments describing sections
                const comments = code.match(/<!--(.*?)-->/g) || [];
                return comments.some(c => c.length > 10); // At least one meaningful comment
            }, message: 'Write descriptive comments that explain your code sections' }
        ],
        successMessage: 'Great! You\'ve organized your code with helpful comments.'
    },
    13: {
        originalCode: `<!DOCTYPE html>
<html>
<head>
    <title>My Site</title>
</head>
<body>
    <h1>Content</h1>
</body>
</html>`,
        requirements: [
            { test: (code) => code.includes('<meta'), message: 'Include <meta> tags in the head section' },
            { test: (code) => code.includes('name="description"'), message: 'Add a meta description tag' },
            { test: (code) => code.includes('name="viewport"'), message: 'Include viewport meta tag for responsive design' },
            { test: (code) => code.includes('charset='), message: 'Add charset meta tag (e.g., UTF-8)' }
        ],
        successMessage: 'Perfect! Your page is now optimized for search engines and mobile devices.'
    },
    14: {
        originalCode: `<audio src="audio.mp3"></audio>`,
        requirements: [
            { test: (code) => code.includes('<video') || code.includes('<audio'), message: 'Include a <video> or <audio> tag' },
            { test: (code) => code.includes('controls'), message: 'Add controls attribute to media elements' },
            { test: (code) => code.includes('<source') || code.includes('src='), message: 'Use <source> tags or src attribute for media files' },
            { test: (code, original) => {
                // Check if they improved it with fallback text or multiple sources
                return code !== original && (code.toLowerCase().includes('your browser') || code.match(/<source/g)?.length > 1);
            }, message: 'Add fallback text or multiple <source> elements for better compatibility' }
        ],
        successMessage: 'Excellent! You\'ve successfully embedded multimedia with proper fallbacks.'
    },
    15: {
        originalCode: `<p>Click to visit a website</p>`,
        requirements: [
            { test: (code) => code.includes('<iframe'), message: 'Create an <iframe> element' },
            { test: (code) => code.includes('src='), message: 'Add src attribute to embed content' },
            { test: (code) => code.includes('title=') || code.includes('width='), message: 'Include title or dimensions for better accessibility' },
            { test: (code) => {
                // Check if they used a real embeddable URL
                return code.includes('youtube.com') || code.includes('maps.google.com') || code.includes('https://');
            }, message: 'Use a real embeddable URL (YouTube, Google Maps, etc.)' }
        ],
        successMessage: 'Outstanding! You\'ve completed all HTML lessons and mastered embedding external content!'
    }
};

// Validate challenge requirements
function validateChallenge(lessonNum, code) {
    const validation = challengeValidations[lessonNum];
    if (!validation) return;
    
    const lesson = document.getElementById(`lesson-${lessonNum}`);
    if (!lesson) return;
    
    // Remove existing feedback
    const existingFeedback = lesson.querySelector('.validation-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    // Check if code was actually modified from the original
    const codeNormalized = code.trim().replace(/\s+/g, ' ');
    const originalNormalized = validation.originalCode ? validation.originalCode.trim().replace(/\s+/g, ' ') : '';
    
    if (validation.originalCode && codeNormalized === originalNormalized) {
        // Code wasn't changed - show a message
        const feedback = document.createElement('div');
        feedback.className = 'validation-feedback error';
        feedback.textContent = 'Please modify the code to complete the challenge. The example code is just a starting point!';
        
        const challengeBox = lesson.querySelector('.challenge-box');
        if (challengeBox) {
            challengeBox.parentNode.insertBefore(feedback, challengeBox.nextSibling);
        }
        return;
    }
    
    // Check all requirements - pass both code and original to test functions
    const failedRequirements = [];
    for (const req of validation.requirements) {
        if (!req.test(code, validation.originalCode || '')) {
            failedRequirements.push(req.message);
        }
    }
    
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = 'validation-feedback';
    
    if (failedRequirements.length === 0) {
        // All requirements met
        feedback.classList.add('success');
        feedback.textContent = validation.successMessage;
    } else {
        // Some requirements failed
        feedback.classList.add('error');
        if (failedRequirements.length === 1) {
            feedback.textContent = failedRequirements[0];
        } else {
            feedback.textContent = 'Missing: ' + failedRequirements.join(', ');
        }
    }
    
    // Insert feedback after challenge box
    const challengeBox = lesson.querySelector('.challenge-box');
    if (challengeBox) {
        challengeBox.parentNode.insertBefore(feedback, challengeBox.nextSibling);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    
    // Add click handlers to sidebar links
    document.querySelectorAll('.lesson-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lessonNum = parseInt(link.getAttribute('data-lesson'));
            showLesson(lessonNum);
        });
    });
    
    // Auto-run code on page load for first lesson
    if (document.querySelector('.lesson.active')) {
        const firstCodeBlock = document.querySelector('.lesson.active .code-input');
        if (firstCodeBlock) {
            const lessonNum = firstCodeBlock.id.split('-')[1];
            setTimeout(() => runCode(lessonNum), 500);
        }
    }
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter to run code
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const activeLesson = document.querySelector('.lesson.active');
            if (activeLesson) {
                const lessonId = activeLesson.id.split('-')[1];
                const runBtn = activeLesson.querySelector('.run-btn');
                if (runBtn) {
                    runBtn.click();
                }
            }
        }
    });
    
    // Add line numbers to code editors (optional enhancement)
    addLineNumbers();
});

// Add line numbers to code editors
function addLineNumbers() {
    document.querySelectorAll('.code-input').forEach(textarea => {
        textarea.addEventListener('input', function() {
            // Auto-resize textarea
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
        
        // Add tab support
        textarea.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                const value = this.value;
                
                // Insert 2 spaces for tab
                this.value = value.substring(0, start) + '  ' + value.substring(end);
                this.selectionStart = this.selectionEnd = start + 2;
            }
        });
    });
}

// Export functions to global scope
window.runCode = runCode;
window.nextLesson = nextLesson;
window.prevLesson = prevLesson;
window.showLesson = showLesson;
