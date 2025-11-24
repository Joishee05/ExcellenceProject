// JavaScript Tutorial Script - Interactive Code Editor with Console Output

let completedLessons = new Set();
const totalLessons = 12;

function loadProgress() {
    const saved = localStorage.getItem('jsProgress');
    if (saved) {
        completedLessons = new Set(JSON.parse(saved));
        updateProgressBar();
        updateCompletedMarkers();
    }
}

function saveProgress() {
    localStorage.setItem('jsProgress', JSON.stringify([...completedLessons]));
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

// Run JavaScript code and capture console output
function runJSCode(lessonNum) {
    const codeInput = document.getElementById(`code-${lessonNum}`);
    const consoleOutput = document.getElementById(`console-${lessonNum}`);
    
    if (!codeInput || !consoleOutput) return;
    
    const code = codeInput.value;
    consoleOutput.innerHTML = '';
    
    // Override console methods to capture output
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    
    const capturedLogs = [];
    
    console.log = function(...args) {
        capturedLogs.push({ type: 'log', message: args.join(' ') });
        originalLog.apply(console, args);
    };
    
    console.error = function(...args) {
        capturedLogs.push({ type: 'error', message: args.join(' ') });
        originalError.apply(console, args);
    };
    
    console.warn = function(...args) {
        capturedLogs.push({ type: 'warning', message: args.join(' ') });
        originalWarn.apply(console, args);
    };
    
    // Override alert to display in console
    const originalAlert = window.alert;
    window.alert = function(message) {
        capturedLogs.push({ type: 'log', message: '🔔 Alert: ' + message });
    };
    
    try {
        // Execute the code
        eval(code);
        
        // Display captured logs
        if (capturedLogs.length === 0) {
            consoleOutput.innerHTML = '<span class="log">Code executed successfully (no output)</span>';
        } else {
            capturedLogs.forEach(log => {
                const logElement = document.createElement('div');
                logElement.className = log.type;
                logElement.textContent = log.message;
                consoleOutput.appendChild(logElement);
            });
        }
    } catch (error) {
        consoleOutput.innerHTML = `<span class="error">❌ Error: ${error.message}</span>`;
    } finally {
        // Restore original console methods
        console.log = originalLog;
        console.error = originalError;
        console.warn = originalWarn;
        window.alert = originalAlert;
    }
    
    // Validate challenge if exists
    validateChallenge(lessonNum, code, capturedLogs);
}

// Challenge validation rules for JavaScript lessons
const challengeValidations = {
    1: {
        requirements: [
            { test: (code) => code.includes('let ') || code.includes('const ') || code.includes('var '), message: 'Declare a variable (let, const, or var)' },
            { test: (code) => code.includes('console.log'), message: 'Use console.log() to display output' }
        ],
        successMessage: 'Perfect! You\'ve declared variables and used console.log().'
    },
    2: {
        requirements: [
            { test: (code) => /typeof\s+\w+/.test(code), message: 'Use typeof to check data types' },
            { test: (code) => code.includes('string') || code.includes('number') || code.includes('boolean'), message: 'Work with different data types' }
        ],
        successMessage: 'Excellent! You understand JavaScript data types.'
    },
    3: {
        requirements: [
            { test: (code) => code.includes('+') || code.includes('-') || code.includes('*') || code.includes('/'), message: 'Use arithmetic operators' },
            { test: (code) => code.includes('===') || code.includes('==') || code.includes('!=='), message: 'Use comparison operators' }
        ],
        successMessage: 'Great work! You\'ve mastered operators.'
    },
    4: {
        requirements: [
            { test: (code) => code.includes('if') && code.includes('{'), message: 'Use an if statement' },
            { test: (code) => code.includes('else'), message: 'Include an else clause' }
        ],
        successMessage: 'Well done! You\'ve implemented conditional logic.'
    },
    5: {
        requirements: [
            { test: (code) => code.includes('for') && code.includes('{'), message: 'Create a for loop' },
            { test: (code) => code.includes('console.log'), message: 'Output something in the loop' }
        ],
        successMessage: 'Excellent! You\'ve mastered loops.'
    },
    6: {
        requirements: [
            { test: (code) => code.includes('function ') || code.includes('=>'), message: 'Define a function' },
            { test: (code) => code.includes('return'), message: 'Use return to send back a value' }
        ],
        successMessage: 'Perfect! You\'ve created a reusable function.'
    },
    7: {
        requirements: [
            { test: (code) => code.includes('[') && code.includes(']'), message: 'Create an array with []' },
            { test: (code) => code.includes('.length') || code.includes('.push') || code.includes('[0]'), message: 'Use array methods or access elements' }
        ],
        successMessage: 'Great! You\'ve worked with arrays successfully.'
    },
    8: {
        requirements: [
            { test: (code) => code.includes('{') && code.includes(':'), message: 'Create an object with properties' },
            { test: (code) => code.includes('.') && !code.includes('console.'), message: 'Access object properties with dot notation' }
        ],
        successMessage: 'Excellent! You understand objects and properties.'
    },
    9: {
        requirements: [
            { test: (code) => code.includes('addEventListener'), message: 'Use addEventListener for events' },
            { test: (code) => code.includes('click') || code.includes('input') || code.includes('change'), message: 'Handle an event type' }
        ],
        successMessage: 'Perfect! You\'ve added event handling.'
    },
    10: {
        requirements: [
            { test: (code) => code.includes('querySelector') || code.includes('getElementById'), message: 'Select a DOM element' },
            { test: (code) => code.includes('.innerHTML') || code.includes('.textContent'), message: 'Modify element content' }
        ],
        successMessage: 'Outstanding! You\'ve manipulated the DOM successfully.'
    },
    11: {
        requirements: [
            { test: (code) => code.includes('.classList') || code.includes('.style'), message: 'Use classList or style to modify CSS' },
            { test: (code) => code.includes('add') || code.includes('remove') || code.includes('toggle'), message: 'Add, remove, or toggle classes' }
        ],
        successMessage: 'Fantastic! You\'ve dynamically styled elements.'
    },
    12: {
        requirements: [
            { test: (code) => code.includes('async') || code.includes('.then'), message: 'Use async/await or promises' },
            { test: (code) => code.includes('fetch') || code.includes('setTimeout'), message: 'Work with asynchronous operations' }
        ],
        successMessage: 'Excellent! You\'ve mastered asynchronous JavaScript.'
    }
};

// Validate challenge requirements
function validateChallenge(lessonNum, code, logs = []) {
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

// Run code with DOM manipulation (for lessons 10, 11, 12)
function runDOMCode(lessonNum) {
    const codeInput = document.getElementById(`code-${lessonNum}`);
    const outputFrame = document.getElementById(`output-${lessonNum}`);
    
    if (codeInput && outputFrame) {
        const code = codeInput.value;
        const iframe = outputFrame;
        
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write(code);
        iframeDoc.close();
    }
}

// Clear console output
function clearConsole(lessonNum) {
    const consoleOutput = document.getElementById(`console-${lessonNum}`);
    if (consoleOutput) {
        consoleOutput.innerHTML = '';
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
    
    // Auto-run first code block
    if (document.querySelector('.lesson.active')) {
        const firstCodeBlock = document.querySelector('.lesson.active .code-input');
        if (firstCodeBlock) {
            const lessonNum = firstCodeBlock.id.split('-')[1];
            // Check if it's a DOM lesson or JS lesson
            if (lessonNum >= 10) {
                setTimeout(() => runDOMCode(lessonNum), 500);
            } else {
                setTimeout(() => runJSCode(lessonNum), 500);
            }
        }
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const activeLesson = document.querySelector('.lesson.active');
            if (activeLesson) {
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

// Export functions to global scope
window.runJSCode = runJSCode;
window.runDOMCode = runDOMCode;
window.clearConsole = clearConsole;
window.nextLesson = nextLesson;
window.prevLesson = prevLesson;
window.showLesson = showLesson;
