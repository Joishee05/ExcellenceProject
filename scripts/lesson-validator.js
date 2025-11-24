/**
 * Lesson Validator - Challenge Validation System
 * Provides real-time feedback on student challenges
 */

// Base validation function
function showFeedback(message, isSuccess) {
    const feedback = document.getElementById('challenge-feedback');
    if (!feedback) return;
    
    feedback.innerHTML = message;
    feedback.className = 'challenge-feedback ' + (isSuccess ? 'success' : 'incomplete');
    feedback.style.display = 'block';
}

// HTML Validation Helpers
const HTMLValidators = {
    hasTag: (code, tag) => {
        const regex = new RegExp(`<${tag}[^>]*>.*</${tag}>`, 'is');
        return regex.test(code);
    },
    
    hasOpenTag: (code, tag) => {
        const regex = new RegExp(`<${tag}[^>]*>`, 'i');
        return regex.test(code);
    },
    
    countTag: (code, tag) => {
        const regex = new RegExp(`<${tag}[^>]*>`, 'gi');
        const matches = code.match(regex);
        return matches ? matches.length : 0;
    },
    
    hasAttribute: (code, tag, attr) => {
        const regex = new RegExp(`<${tag}[^>]*\\s${attr}=`, 'i');
        return regex.test(code);
    },
    
    getTagContent: (code, tag) => {
        const regex = new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`, 'is');
        const match = code.match(regex);
        return match ? match[1].trim() : '';
    },
    
    hasClass: (code, className) => {
        const regex = new RegExp(`class=["'][^"']*${className}[^"']*["']`, 'i');
        return regex.test(code);
    },
    
    hasId: (code, idName) => {
        const regex = new RegExp(`id=["']${idName}["']`, 'i');
        return regex.test(code);
    }
};

// CSS Validation Helpers
const CSSValidators = {
    hasSelector: (code, selector) => {
        const regex = new RegExp(`${selector}\\s*\\{`, 'i');
        return regex.test(code);
    },
    
    hasProperty: (code, property) => {
        const regex = new RegExp(`${property}\\s*:`, 'i');
        return regex.test(code);
    },
    
    hasSelectorWithProperty: (code, selector, property) => {
        // Find selector block
        const selectorRegex = new RegExp(`${selector}\\s*\\{([^}]+)\\}`, 'is');
        const match = code.match(selectorRegex);
        if (!match) return false;
        
        // Check if property exists in that block
        const propertyRegex = new RegExp(`${property}\\s*:`, 'i');
        return propertyRegex.test(match[1]);
    },
    
    getPropertyValue: (code, selector, property) => {
        const selectorRegex = new RegExp(`${selector}\\s*\\{([^}]+)\\}`, 'is');
        const match = code.match(selectorRegex);
        if (!match) return null;
        
        const propertyRegex = new RegExp(`${property}\\s*:\\s*([^;]+);`, 'i');
        const propMatch = match[1].match(propertyRegex);
        return propMatch ? propMatch[1].trim() : null;
    }
};

// JavaScript Validation Helpers
const JSValidators = {
    hasFunction: (code, functionName) => {
        const regex = new RegExp(`function\\s+${functionName}\\s*\\(`, 'i');
        return regex.test(code);
    },
    
    hasVariable: (code, varName) => {
        const regex = new RegExp(`(let|const|var)\\s+${varName}\\s*=`, 'i');
        return regex.test(code);
    },
    
    hasConsoleLog: (code) => {
        return /console\.log\s*\(/i.test(code);
    },
    
    hasLoop: (code, type = 'for|while') => {
        const regex = new RegExp(`\\b(${type})\\s*\\(`, 'i');
        return regex.test(code);
    },
    
    hasConditional: (code) => {
        return /\bif\s*\(/i.test(code);
    },
    
    hasArrowFunction: (code) => {
        return /=>\s*\{?/.test(code);
    }
};

// Export validators
window.HTMLValidators = HTMLValidators;
window.CSSValidators = CSSValidators;
window.JSValidators = JSValidators;
window.showFeedback = showFeedback;
