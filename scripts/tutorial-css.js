// CSS Tutorial JavaScript - Interactive Code Editor and Navigation
// Similar to tutorial.js but for CSS course

let completedLessons = new Set();
const totalLessons = 10;

function loadProgress() {
    const saved = localStorage.getItem('cssProgress');
    if (saved) {
        completedLessons = new Set(JSON.parse(saved));
        updateProgressBar();
        updateCompletedMarkers();
    }
}

function saveProgress() {
    localStorage.setItem('cssProgress', JSON.stringify([...completedLessons]));
}

function updateProgressBar() {
    const percentage = (completedLessons.size / totalLessons) * 100;
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    if (progressFill && progressText) {
        progressFill.style.width = percentage + '%';
        progressText.textContent = Math.round(percentage) + '% Complete';
    }
}

function updateCompletedMarkers() {
    completedLessons.forEach(lessonNum => {
        const link = document.querySelector(`[data-lesson="${lessonNum}"]`);
        if (link) {
            link.classList.add('completed');
        }
    });
}

function markLessonComplete(lessonNum) {
    completedLessons.add(lessonNum);
    saveProgress();
    updateProgressBar();
    updateCompletedMarkers();
}

function showLesson(lessonNum) {
    document.querySelectorAll('.lesson').forEach(lesson => {
        lesson.classList.remove('active');
    });
    
    const selectedLesson = document.getElementById(`lesson-${lessonNum}`);
    if (selectedLesson) {
        selectedLesson.classList.add('active');
        
        document.querySelectorAll('.lesson-link').forEach(link => {
            link.classList.remove('active');
        });
        const activeLink = document.querySelector(`[data-lesson="${lessonNum}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        if (lessonNum > 1) {
            markLessonComplete(lessonNum - 1);
        }
    }
}

function nextLesson(lessonNum) {
    showLesson(lessonNum);
}

function prevLesson(lessonNum) {
    showLesson(lessonNum);
}

function runCode(lessonNum) {
    console.log('SIMPLEST VERSION - No event parameter');
    const codeInput = document.getElementById(`code-${lessonNum}`);
    const outputFrame = document.getElementById(`output-${lessonNum}`);
    
    if (codeInput && outputFrame) {
        const code = codeInput.value;
        const iframe = outputFrame;
        
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(code);
        iframeDoc.close();
        
        // Validate challenge if exists
        validateChallenge(lessonNum, code);
    }
}

// Challenge validation rules for CSS lessons
const challengeValidations = {
    1: {
        requirements: [
            { test: (code) => code.includes('color:') || code.includes('color :'), message: 'Set the color property' },
            { test: (code) => code.includes('font-size:') || code.includes('font-size :'), message: 'Set the font-size property' }
        ],
        successMessage: 'Perfect! You\'ve applied CSS styling successfully.'
    },
    2: {
        requirements: [
            { test: (code) => code.includes('.') && code.includes('{'), message: 'Use a class selector (e.g., .classname)' },
            { test: (code) => code.includes('#') && code.includes('{'), message: 'Use an ID selector (e.g., #idname)' }
        ],
        successMessage: 'Excellent! You\'ve mastered CSS selectors.'
    },
    3: {
        requirements: [
            { test: (code) => code.includes('background'), message: 'Use a background property' },
            { test: (code) => code.includes('border'), message: 'Add a border property' },
            { test: (code) => code.includes('padding') || code.includes('margin'), message: 'Use padding or margin' }
        ],
        successMessage: 'Great! You\'ve applied the box model properties.'
    },
    4: {
        requirements: [
            { test: (code) => code.includes('font-family'), message: 'Set the font-family' },
            { test: (code) => code.includes('font-weight') || code.includes('font-style'), message: 'Use font-weight or font-style' }
        ],
        successMessage: 'Well done! You\'ve styled text with various properties.'
    },
    5: {
        requirements: [
            { test: (code) => code.includes('display'), message: 'Use the display property' },
            { test: (code) => code.includes('position') || code.includes('float'), message: 'Use positioning (position or float)' }
        ],
        successMessage: 'Excellent! You\'ve controlled element layout and positioning.'
    },
    6: {
        requirements: [
            { test: (code) => code.includes('display: flex') || code.includes('display:flex'), message: 'Set display: flex' },
            { test: (code) => code.includes('justify-content') || code.includes('align-items'), message: 'Use justify-content or align-items' }
        ],
        successMessage: 'Perfect! You\'ve created a flexbox layout.'
    },
    7: {
        requirements: [
            { test: (code) => code.includes('display: grid') || code.includes('display:grid'), message: 'Set display: grid' },
            { test: (code) => code.includes('grid-template'), message: 'Use grid-template property' }
        ],
        successMessage: 'Outstanding! You\'ve mastered CSS Grid layout.'
    },
    8: {
        requirements: [
            { test: (code) => code.includes(':hover'), message: 'Add a :hover pseudo-class' },
            { test: (code) => code.includes('transition'), message: 'Include a transition property' }
        ],
        successMessage: 'Excellent! You\'ve added interactive hover effects.'
    },
    9: {
        requirements: [
            { test: (code) => code.includes('@media'), message: 'Use a @media query' },
            { test: (code) => code.match(/@media.*\(.*\)/), message: 'Include a media query condition' }
        ],
        successMessage: 'Great work! You\'ve made your design responsive.'
    },
    10: {
        requirements: [
            { test: (code) => code.includes('@keyframes'), message: 'Define @keyframes for animation' },
            { test: (code) => code.includes('animation'), message: 'Apply the animation property' }
        ],
        successMessage: 'Fantastic! You\'ve created a CSS animation.'
    }
};

// Validate challenge requirements
function validateChallenge(lessonNum, code) {
    const validation = challengeValidations[lessonNum];
    if (!validation) return;
    
    const lesson = document.getElementById(`lesson-${lessonNum}`);
    if (!lesson) return;
    
    const existingFeedback = lesson.querySelector('.validation-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
    
    const failedRequirements = [];
    for (const req of validation.requirements) {
        if (!req.test(code)) {
            failedRequirements.push(req.message);
        }
    }
    
    const feedback = document.createElement('div');
    feedback.className = 'validation-feedback';
    
    if (failedRequirements.length === 0) {
        feedback.classList.add('success');
        feedback.textContent = validation.successMessage;
    } else {
        feedback.classList.add('error');
        if (failedRequirements.length === 1) {
            feedback.textContent = failedRequirements[0];
        } else {
            feedback.textContent = 'Missing: ' + failedRequirements.join(', ');
        }
    }
    
    const challengeBox = lesson.querySelector('.challenge-box');
    if (challengeBox) {
        challengeBox.parentNode.insertBefore(feedback, challengeBox.nextSibling);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProgress();
    
    document.querySelectorAll('.lesson-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lessonNum = parseInt(link.getAttribute('data-lesson'));
            showLesson(lessonNum);
        });
    });
    
    if (document.querySelector('.lesson.active')) {
        const firstCodeBlock = document.querySelector('.lesson.active .code-input');
        if (firstCodeBlock) {
            const lessonNum = firstCodeBlock.id.split('-')[1];
            setTimeout(() => runCode(lessonNum), 500);
        }
    }
    
    document.addEventListener('keydown', (e) => {
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
    
    addLineNumbers();
});

function addLineNumbers() {
    document.querySelectorAll('.code-input').forEach(textarea => {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
        
        textarea.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                const value = this.value;
                
                this.value = value.substring(0, start) + '  ' + value.substring(end);
                this.selectionStart = this.selectionEnd = start + 2;
            }
        });
    });
}

window.runCode = runCode;
window.nextLesson = nextLesson;
window.prevLesson = prevLesson;
window.showLesson = showLesson;
