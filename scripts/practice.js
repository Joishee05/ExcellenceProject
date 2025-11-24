/**
 * Practice Code Editor - Enhanced Interactive Learning
 * Provides code execution on demand, validation, and challenge checking
 */

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupCodeValidation();
    clearPreviewOnLoad();
});

/**
 * Clear any auto-rendered preview on page load
 */
function clearPreviewOnLoad() {
    const iframes = document.querySelectorAll('.output-frame');
    iframes.forEach(iframe => {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        if (iframeDoc) {
            iframeDoc.open();
            iframeDoc.write('');
            iframeDoc.close();
        }
    });
}

/**
 * Setup code validation and keyboard support
 */
function setupCodeValidation() {
    const codeInputs = document.querySelectorAll('.code-input');
    codeInputs.forEach(input => {
        // Tab support in textarea
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = this.selectionStart;
                const end = this.selectionEnd;
                this.value = this.value.substring(0, start) + '\t' + this.value.substring(end);
                this.selectionStart = this.selectionEnd = start + 1;
            }
        });
    });
}

/**
 * Execute user code and display results - ONLY called when user clicks Run
 */
function runCode() {
    const codeInput = document.getElementById('code-input');
    if (!codeInput) return;
    
    const code = codeInput.value;
    const iframe = document.getElementById('output-frame');
    
    if (!iframe) return;
    
    try {
        // For HTML/CSS code
        if (code.includes('<') && code.includes('>')) {
            executeHTMLCode(code, iframe);
        } else {
            // For JavaScript code
            executeJavaScriptCode(code, iframe);
        }
        
        // Show success message
        showExecutionFeedback('success', '✓ Code executed successfully!');
        
        // Validate challenges
        validateChallenge(code);
    } catch (error) {
        showExecutionFeedback('error', '✗ Error: ' + error.message);
    }
}

/**
 * Execute HTML/CSS code in iframe
 */
function executeHTMLCode(code, iframe) {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    
    // Add minimal base styles if needed
    let wrappedCode = code;
    if (!code.includes('<html') && !code.includes('<!DOCTYPE')) {
        wrappedCode = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
    </style>
</head>
<body>
    ${code}
</body>
</html>`;
    }
    
    iframeDoc.write(wrappedCode);
    iframeDoc.close();
}

/**
 * Execute JavaScript code with console capture
 */
function executeJavaScriptCode(code, iframe) {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    
    // Create output container for console logs
    const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Monaco', 'Courier New', monospace; margin: 0; padding: 20px; background: #1e1e1e; color: #d4d4d4; }
        .console-output { background: #252526; border: 1px solid #404040; border-radius: 4px; padding: 15px; }
        .console-line { margin: 5px 0; white-space: pre-wrap; word-break: break-word; font-size: 13px; }
        .console-log { color: #d4d4d4; }
        .console-error { color: #f48771; font-weight: bold; }
        .console-warn { color: #dcdcaa; }
        h3 { margin-top: 0; color: #4ec9b0; }
    </style>
</head>
<body>
    <div class="console-output">
        <h3>Console Output:</h3>
        <div id="console-output"></div>
    </div>
    <script>
        const logs = [];
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;
        
        console.log = function(...args) {
            const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ');
            logs.push({ type: 'log', message });
            renderLogs();
        };
        
        console.error = function(...args) {
            const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ');
            logs.push({ type: 'error', message });
            renderLogs();
        };
        
        console.warn = function(...args) {
            const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ');
            logs.push({ type: 'warn', message });
            renderLogs();
        };
        
        function renderLogs() {
            const output = document.getElementById('console-output');
            output.innerHTML = logs.map(log => {
                const className = 'console-' + log.type;
                return '<div class="console-line ' + className + '">' + escapeHtml(log.message) + '</div>';
            }).join('');
        }
        
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        // Run user code
        try {
            ${code}
        } catch (e) {
            console.error('Error: ' + e.message);
        }
    </script>
</body>
</html>`;
    
    iframeDoc.write(html);
    iframeDoc.close();
}

/**
 * Show feedback messages for code execution
 */
function showExecutionFeedback(type, message) {
    let feedback = document.getElementById('execution-feedback');
    if (!feedback) {
        const container = document.querySelector('.interactive-section');
        if (container) {
            const div = document.createElement('div');
            div.id = 'execution-feedback';
            div.className = 'execution-feedback';
            container.insertBefore(div, container.firstChild);
            feedback = div;
        }
    }
    
    if (feedback) {
        feedback.className = 'execution-feedback ' + type;
        feedback.textContent = message;
        feedback.style.display = 'block';
    }
}

/**
 * Validate user code against challenge requirements
 */
function validateChallenge(code) {
    const feedback = document.getElementById('challenge-feedback');
    if (!feedback) return;
    
    const lessonTitle = document.querySelector('.lesson-header h1');
    if (!lessonTitle) return;
    
    const title = lessonTitle.textContent;
    let result = checkChallengeRequirements(title, code);
    
    if (result) {
        feedback.innerHTML = result.message;
        feedback.className = 'challenge-feedback ' + (result.success ? 'success' : 'incomplete');
        feedback.style.display = 'block';
    }
}

/**
 * Check specific challenge requirements based on lesson
 */
function checkChallengeRequirements(lessonTitle, code) {
    // HTML Challenges
    if (lessonTitle.includes('What is HTML?')) {
        const hasH1 = /<h1[^>]*>(.+?)<\/h1>/i.test(code);
        const hasParagraph = /<p[^>]*>(.+?)<\/p>/i.test(code);
        const pCount = (code.match(/<p[^>]*>/gi) || []).length;
        const h1Match = code.match(/<h1[^>]*>([^<]+)<\/h1>/i);
        const isCustomH1 = h1Match && h1Match[1] !== 'Hello, World!';
        
        if (!hasH1) return { success: false, message: '❌ Step 1: Need an &lt;h1&gt; heading tag' };
        if (!isCustomH1) return { success: false, message: '⚠️ Step 1: Try changing "Hello, World!" in your &lt;h1&gt; to your name!' };
        if (!hasParagraph) return { success: false, message: '❌ Step 2: Need at least one &lt;p&gt; paragraph tag' };
        if (pCount < 2) return { success: false, message: '⚠️ Step 3: Need 2 paragraphs! Add another &lt;p&gt; tag with your favorite hobby.' };
        return { success: true, message: '🎉 Perfect! You completed the challenge!' };
    }
    
    // HTML Structure
    if (lessonTitle.includes('HTML Structure')) {
        const hasDoctype = /<!DOCTYPE\s+html>/i.test(code);
        const hasHtml = /<html[^>]*>/i.test(code);
        const hasHead = /<head[^>]*>/i.test(code);
        const hasBody = /<body[^>]*>/i.test(code);
        const hasClosingTags = /<\/html>|<\/head>|<\/body>/i.test(code);
        
        if (!hasDoctype) return { success: false, message: '❌ Need &lt;!DOCTYPE html&gt; at the top' };
        if (!hasHtml) return { success: false, message: '❌ Need &lt;html&gt; tag' };
        if (!hasHead) return { success: false, message: '❌ Need &lt;head&gt; tag for metadata' };
        if (!hasBody) return { success: false, message: '❌ Need &lt;body&gt; tag for content' };
        if (!hasClosingTags) return { success: false, message: '⚠️ Remember to close your tags!' };
        return { success: true, message: '🎉 Great! You have the basic HTML structure!' };
    }
    
    // Headings & Paragraphs
    if (lessonTitle.includes('Headings & Paragraphs')) {
        const h1Count = (code.match(/<h1[^>]*>/gi) || []).length;
        const h2Count = (code.match(/<h2[^>]*>/gi) || []).length;
        const pCount = (code.match(/<p[^>]*>/gi) || []).length;
        
        if (h1Count === 0) return { success: false, message: '❌ Add at least one &lt;h1&gt; heading' };
        if (h2Count === 0) return { success: false, message: '⚠️ Try adding an &lt;h2&gt; subheading' };
        if (pCount < 2) return { success: false, message: '⚠️ Add multiple &lt;p&gt; paragraphs' };
        return { success: true, message: '🎉 Excellent heading and paragraph structure!' };
    }
    
    // Text Formatting
    if (lessonTitle.includes('Text Formatting')) {
        const hasBold = /<(b|strong)[^>]*>.*?<\/(b|strong)>/i.test(code);
        const hasItalic = /<(i|em)[^>]*>.*?<\/(i|em)>/i.test(code);
        
        if (!hasBold) return { success: false, message: '❌ Add &lt;strong&gt; or &lt;b&gt; for bold text' };
        if (!hasItalic) return { success: false, message: '⚠️ Try adding &lt;em&gt; or &lt;i&gt; for italic text' };
        return { success: true, message: '🎉 Nice text formatting!' };
    }
    
    // Links
    if (lessonTitle.includes('Links')) {
        const hasLink = /<a[^>]+href[^>]*>.*?<\/a>/i.test(code);
        const hasHref = /href\s*=\s*["'][^"']*["']/i.test(code);
        
        if (!hasLink) return { success: false, message: '❌ Add an &lt;a&gt; link with href attribute' };
        if (!hasHref) return { success: false, message: '⚠️ Make sure your link has an href attribute' };
        return { success: true, message: '🎉 Links working great!' };
    }
    
    // Images
    if (lessonTitle.includes('Images')) {
        const hasImg = /<img[^>]*>/i.test(code);
        const hasSrc = /src\s*=\s*["'][^"']*["']/i.test(code);
        const hasAlt = /alt\s*=\s*["'][^"']*["']/i.test(code);
        
        if (!hasImg) return { success: false, message: '❌ Add an &lt;img&gt; image tag' };
        if (!hasSrc) return { success: false, message: '⚠️ Your image needs a src attribute' };
        if (!hasAlt) return { success: false, message: '⚠️ Always add an alt attribute for accessibility!' };
        return { success: true, message: '🎉 Perfect image implementation!' };
    }
    
    // Lists
    if (lessonTitle.includes('Lists')) {
        const hasUl = /<ul[^>]*>/i.test(code);
        const hasOl = /<ol[^>]*>/i.test(code);
        const hasLi = /<li[^>]*>.*?<\/li>/i.test(code);
        
        if (!hasUl && !hasOl) return { success: false, message: '❌ Add a &lt;ul&gt; or &lt;ol&gt; list' };
        if (!hasLi) return { success: false, message: '⚠️ Add &lt;li&gt; list items inside your list' };
        return { success: true, message: '🎉 Great list structure!' };
    }
    
    // CSS Challenges
    if (lessonTitle.includes('What is CSS?')) {
        const hasStyle = /<style>[\s\S]*?<\/style>/i.test(code);
        const hasColor = /color\s*:\s*\w+|color\s*:\s*#[0-9a-f]{3,6}|color\s*:\s*rgb/i.test(code);
        const hasFontSize = /font-size\s*:\s*[\d.]+/i.test(code);
        
        if (!hasStyle) return { success: false, message: '❌ Add a &lt;style&gt; tag with CSS rules' };
        if (!hasColor) return { success: false, message: '⚠️ Add a color property in your CSS!' };
        if (!hasFontSize) return { success: false, message: '⚠️ Try changing the font-size!' };
        return { success: true, message: '🎉 CSS is working beautifully!' };
    }
    
    // Selectors
    if (lessonTitle.includes('Selectors')) {
        const hasSelector = /\w+\s*\{[\s\S]*?\}|\.[\w-]+\s*\{[\s\S]*?\}|#[\w-]+\s*\{[\s\S]*?\}/i.test(code);
        const hasClass = /\.\w+\s*\{|class\s*=\s*["']/i.test(code);
        
        if (!hasSelector) return { success: false, message: '❌ Add CSS selectors with rules' };
        if (!hasClass) return { success: false, message: '⚠️ Try using class selectors!' };
        return { success: true, message: '🎉 Selectors look great!' };
    }
    
    // Colors & Backgrounds
    if (lessonTitle.includes('Colors & Backgrounds')) {
        const hasColor = /color\s*:\s*/i.test(code);
        const hasBackground = /background|background-color/i.test(code);
        
        if (!hasColor) return { success: false, message: '❌ Add a color property' };
        if (!hasBackground) return { success: false, message: '⚠️ Try adding a background or background-color!' };
        return { success: true, message: '🎉 Great color styling!' };
    }
    
    // JavaScript Challenges
    if (lessonTitle.includes('What is JavaScript?')) {
        const hasConsole = /console\.log\s*\(/i.test(code);
        const hasVariable = /let\s+\w+|const\s+\w+|var\s+\w+/i.test(code);
        
        if (!hasConsole) return { success: false, message: '❌ Use console.log() to print output' };
        if (!hasVariable) return { success: false, message: '⚠️ Create a variable with let, const, or var!' };
        return { success: true, message: '🎉 JavaScript is running perfectly!' };
    }
    
    // Variables & Data Types
    if (lessonTitle.includes('Variables') || lessonTitle.includes('Data Types')) {
        const hasVariable = /let\s+\w+\s*=|const\s+\w+\s*=|var\s+\w+\s*/i.test(code);
        const hasConsole = /console\.log/i.test(code);
        
        if (!hasVariable) return { success: false, message: '❌ Declare a variable with let, const, or var' };
        if (!hasConsole) return { success: false, message: '⚠️ Log your variables with console.log()' };
        return { success: true, message: '🎉 Variables working great!' };
    }
    
    // Operators
    if (lessonTitle.includes('Operators')) {
        const hasOperator = /[\+\-\*\/\%\&\|]|\s(and|or)\s/i.test(code);
        const hasOutput = /console\.log|alert/i.test(code);
        
        if (!hasOperator) return { success: false, message: '❌ Use mathematical or logical operators (+, -, *, /, etc.)' };
        if (!hasOutput) return { success: false, message: '⚠️ Display the result with console.log() or alert()' };
        return { success: true, message: '🎉 Operators working perfectly!' };
    }
    
    // Conditionals
    if (lessonTitle.includes('Conditionals')) {
        const hasIf = /if\s*\(/i.test(code);
        const hasComparison = /===|==|!=|!==|>|<|>=|<=/i.test(code);
        
        if (!hasIf) return { success: false, message: '❌ Use if statements' };
        if (!hasComparison) return { success: false, message: '⚠️ Add comparison operators (===, >, <, etc.)' };
        return { success: true, message: '🎉 Conditionals working great!' };
    }
    
    // Loops
    if (lessonTitle.includes('Loops')) {
        const hasFor = /for\s*\(/i.test(code);
        const hasWhile = /while\s*\(/i.test(code);
        
        if (!hasFor && !hasWhile) return { success: false, message: '❌ Use a for or while loop' };
        return { success: true, message: '🎉 Loops working perfectly!' };
    }
    
    // Functions
    if (lessonTitle.includes('Functions')) {
        const hasFunction = /function\s+\w+|const\s+\w+\s*=\s*\(|let\s+\w+\s*=\s*\(/i.test(code);
        
        if (!hasFunction) return { success: false, message: '❌ Define a function' };
        return { success: true, message: '🎉 Functions working great!' };
    }
    
    // Arrays
    if (lessonTitle.includes('Arrays')) {
        const hasArray = /\[\s*\]|\[.*\]/i.test(code);
        const hasArrayMethod = /\.push|\.pop|\.slice|\.map|\.filter|\.length/i.test(code);
        
        if (!hasArray) return { success: false, message: '❌ Create an array with []' };
        if (!hasArrayMethod) return { success: false, message: '⚠️ Try using array methods!' };
        return { success: true, message: '🎉 Arrays working perfectly!' };
    }
    
    // Objects
    if (lessonTitle.includes('Objects')) {
        const hasObject = /\{\s*[^}]*\}/i.test(code);
        const hasProperty = /\.\w+|[\w]+\s*:/i.test(code);
        
        if (!hasObject) return { success: false, message: '❌ Create an object with {}' };
        if (!hasProperty) return { success: false, message: '⚠️ Add properties to your object' };
        return { success: true, message: '🎉 Objects working great!' };
    }
    
    // Default: no specific challenge
    return null;
}

/**
 * Reset code to initial example
 */
function resetCode() {
    const input = document.getElementById('code-input');
    const initial = input.getAttribute('data-initial');
    
    if (initial) {
        // Decode HTML entities
        const textarea = document.createElement('textarea');
        textarea.innerHTML = initial;
        input.value = textarea.value;
        
        // Clear preview
        clearPreviewOnLoad();
        
        // Clear feedback
        const feedback = document.getElementById('challenge-feedback');
        if (feedback) feedback.style.display = 'none';
        
        const exFeedback = document.getElementById('execution-feedback');
        if (exFeedback) exFeedback.style.display = 'none';
    }
}

/**
 * Copy code to clipboard
 */
function copyCode() {
    const code = document.getElementById('code-input');
    code.select();
    document.execCommand('copy');
    
    const btn = event.target;
    const original = btn.textContent;
    btn.textContent = '✓ Copied!';
    setTimeout(() => {
        btn.textContent = original;
    }, 2000);
}

/**
 * Show hints for challenges
 */
function showHint() {
    const lessonTitle = document.querySelector('.lesson-header h1');
    if (!lessonTitle) return;
    
    const title = lessonTitle.textContent;
    const hints = {
        'What is HTML?': '💡 Hint: Use &lt;h1&gt;Your Name&lt;/h1&gt; and add at least 2 &lt;p&gt; paragraphs describing yourself and your hobbies.',
        'HTML Structure': '💡 Hint: Structure: &lt;!DOCTYPE html&gt; → &lt;html&gt; → &lt;head&gt; & &lt;body&gt;',
        'Headings & Paragraphs': '💡 Hint: &lt;h1&gt; for main title, &lt;h2&gt; for subtitles, &lt;p&gt; for paragraphs',
        'Text Formatting': '💡 Hint: Use &lt;strong&gt; or &lt;b&gt; for bold, &lt;em&gt; or &lt;i&gt; for italic',
        'Links': '💡 Hint: Format: &lt;a href="url"&gt;Link text&lt;/a&gt;',
        'Images': '💡 Hint: &lt;img src="url" alt="description"&gt; - alt is important!',
        'Lists': '💡 Hint: &lt;ul&gt; for unordered or &lt;ol&gt; for ordered, with &lt;li&gt; items inside',
        'Tables': '💡 Hint: &lt;table&gt; with &lt;tr&gt; rows, &lt;td&gt; cells, and &lt;th&gt; headers',
        'Forms': '💡 Hint: Use &lt;form&gt;, &lt;input&gt;, &lt;textarea&gt;, and &lt;button&gt;',
        'Semantic HTML': '💡 Hint: Use &lt;header&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;article&gt;, &lt;footer&gt;',
        'What is CSS?': '💡 Hint: Rules go in &lt;style&gt; tag: selector { property: value; }',
        'Selectors': '💡 Hint: Elements (h1), classes (.classname), IDs (#id), or combinations',
        'Colors & Backgrounds': '💡 Hint: color for text, background-color for background. Use color names, hex, or rgb()',
        'Text Styling': '💡 Hint: font-size, font-family, font-weight, text-align, line-height',
        'Box Model': '💡 Hint: margin (outside), padding (inside), border, width, height',
        'Borders & Spacing': '💡 Hint: border, border-radius, padding, margin for spacing',
        'Flexbox': '💡 Hint: display: flex on parent, then use justify-content, align-items, flex properties',
        'Grid Layout': '💡 Hint: display: grid with grid-template-columns, grid-template-rows',
        'Positioning': '💡 Hint: position: static, relative, absolute, fixed, or sticky',
        'Transitions & Animations': '💡 Hint: transition for smooth changes, @keyframes for animations',
        'What is JavaScript?': '💡 Hint: console.log("message") prints output, let myVar = value creates variables',
        'Variables & Data Types': '💡 Hint: let name = "text", let num = 42, let bool = true',
        'Operators': '💡 Hint: + - * / for math, === for comparison, && and || for logic',
        'Conditionals': '💡 Hint: if (condition) { } else if { } else { }',
        'Loops': '💡 Hint: for (let i = 0; i < 10; i++) or while (condition) { }',
        'Functions': '💡 Hint: function myFunc() { } or const myFunc = () => { }',
        'Arrays': '💡 Hint: let arr = [1, 2, 3], access with arr[0], use .push(), .pop(), .map()',
        'Objects': '💡 Hint: let obj = { name: "value" }, access with obj.name or obj["name"]',
        'DOM Manipulation': '💡 Hint: document.getElementById(), .querySelector(), .textContent, .innerHTML',
        'Events': '💡 Hint: addEventListener("click", function() { }), event handlers',
        'ES6 Features': '💡 Hint: const/let, arrow functions =>, destructuring, spread operator ...',
        'Async & Promises': '💡 Hint: Promise, .then(), async/await, .catch() for errors'
    };
    
    for (let lesson in hints) {
        if (title.includes(lesson)) {
            alert(hints[lesson]);
            return;
        }
    }
}
