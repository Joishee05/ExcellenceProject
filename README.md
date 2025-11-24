# SLU LearnCode - Interactive Web Development Tutorials

An interactive learning platform designed for Saint Louis University students that teaches HTML, CSS, and JavaScript from basics to intermediate level. Perfect for absolute beginners with no prior coding experience!

## Features

### Interactive Code Editors
- **Live Preview**: See your HTML and CSS changes instantly
- **Console Output**: Run JavaScript code and see output in real-time
- **Syntax Highlighting**: Code editors with proper formatting
- **Run Code Button**: Execute code with a single click
- **Keyboard Shortcuts**: Ctrl/Cmd + Enter to run code
- **Automated Validation**: Get instant feedback on coding challenges

### Comprehensive Curriculum

#### HTML Course (10 Lessons)
1. What is HTML?
2. HTML Structure
3. Headings & Paragraphs
4. Text Formatting
5. Links
6. Images
7. Lists
8. Tables
9. Forms
10. Semantic HTML

#### CSS Course (10 Lessons)
1. What is CSS?
2. Selectors
3. Colors & Backgrounds
4. Text Styling
5. The Box Model
6. Borders & Spacing
7. Flexbox
8. Grid Layout
9. Positioning
10. Transitions & Animations

#### JavaScript Course (12 Lessons)
1. What is JavaScript?
2. Variables
3. Data Types
4. Operators
5. Functions
6. Conditionals
7. Loops
8. Arrays
9. Objects
10. DOM Manipulation
11. Events
12. Async JavaScript

### Learning Features
- Progress tracking with localStorage
- Interactive coding challenges for each lesson
- Automated validation with instant feedback
- Step-by-step navigation
- Clear explanations with examples
- Visual feedback and animations
- Mobile responsive design
- No signup required - start learning immediately

### Saint Louis University Theme
- Professional blue and gold color scheme
- SLU Blue (#0033A0) primary color
- Gold (#FFD700) accent for CTAs and highlights
- Clean, modern design suitable for academic use

## Getting Started

### Option 1: Open Locally
1. Open `index.html` in your web browser
2. Click on any course to start learning
3. Follow the lessons in order or jump to any topic

### Option 2: Use a Local Server (Recommended)
```bash
# Using Python 3
python3 -m http.server 3000

# Using Node.js
npx serve -p 3000

# Then open http://localhost:3000 in your browser
```

## Project Structure

```
LearnHTMLCssJS/
├── index.html              # Homepage with SLU theme
├── html-tutorials.html     # HTML lessons
├── css-tutorials.html      # CSS lessons
├── js-tutorials.html       # JavaScript lessons
├── styles/
│   ├── main.css           # Main styles with SLU theme
│   ├── tutorial.css       # Shared tutorial page styles
│   └── js-tutorial.css    # JavaScript console styles
├── scripts/
│   ├── main.js            # Homepage animations
│   ├── tutorial.js        # HTML tutorial + validation
│   ├── tutorial-css.js    # CSS tutorial + validation
│   └── tutorial-js.js     # JavaScript tutorial + validation
└── README.md              # This file
```

## How to Use

### For Learners
1. **Start with HTML**: Build a foundation by learning page structure
2. **Move to CSS**: Learn to style and design beautiful pages
3. **Master JavaScript**: Add interactivity and dynamic behavior
4. **Practice**: Complete the challenges at the end of each lesson
5. **Get Feedback**: Run your code to see instant validation results
6. **Experiment**: Modify the code examples to see what happens

### Tips for Success
- Complete lessons in order for best learning progression
- Try modifying the code examples to deepen understanding
- Complete all challenges to master each concept
- Review lessons you find difficult
- Practice regularly to build muscle memory
- Build your own projects using what you learned

## Customization

### Change SLU Theme Colors
Edit the CSS variables in `styles/main.css`:
```css
:root {
    --primary-color: #0033A0;  /* SLU Blue */
    --secondary-color: #003876;
    --accent-color: #FFD700;    /* Gold */
}
```

### Add More Lessons
1. Add new lesson HTML in the tutorial page
2. Update the sidebar navigation
3. Increment `totalLessons` in the JavaScript file
4. Add lesson link with `data-lesson` attribute

## 🛠️ Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling, animations, flexbox, grid
- **JavaScript ES6+**: Interactivity, code execution
- **LocalStorage**: Progress tracking
- **iframe**: Live code preview
- **Fetch API**: Async examples

## 📱 Browser Support

Works on all modern browsers:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
## Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

## Learning Path

### Beginner (Start Here)
- Complete HTML lessons 1-6 (Basic structure and elements)
- Complete CSS lessons 1-4 (Styling fundamentals)
- Complete JavaScript lessons 1-4 (Variables and basics)

### Intermediate
- Complete HTML lessons 7-10 (Forms and semantic HTML)
- Complete CSS lessons 5-10 (Layouts and responsive design)
- Complete JavaScript lessons 5-9 (Functions, arrays, and objects)

### Advanced Practice
- Complete JavaScript lessons 10-12 (DOM manipulation and async)
- Build a complete website project combining all skills
- Create your own portfolio using HTML, CSS, and JavaScript

## Validation SystemThe platform includes automated validation for all coding challenges:

- **Instant Feedback**: Get immediate results when you run code
- **Specific Guidance**: Error messages tell you exactly what's missing
- **Success Messages**: Encouraging feedback when you complete challenges correctly
- **Visual Indicators**: Green for success, red for errors

Each lesson validates specific requirements. For example:
- HTML lessons check for proper tags and structure
- CSS lessons verify property usage and selectors
- JavaScript lessons validate syntax, methods, and logic

### Progress Tracking
- Progress automatically saved to browser
- See completion percentage for each course
- Completed lessons marked with gold checkmark
- Pick up where you left off anytime

### Interactive Challenges
- Hands-on exercises after each lesson
- Apply what you just learned immediately
- Build confidence through practice
- Get validated feedback on your solutions

### Real-Time Code Execution
- Run HTML/CSS code with live preview
- Execute JavaScript with console output
- See errors and results immediately
- Learn from mistakes in real-time

## Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Grid and Flexbox
- **JavaScript (ES6+)**: Interactive functionality
- **LocalStorage**: Progress persistence
- **No frameworks**: Pure vanilla JavaScript for learning

## Contributing

Saint Louis University students and faculty can contribute:
1. Fork the repository
2. Create your feature branch
3. Add new lessons or improvements
4. Test validation system
5. Submit a pull request

## License

This project is created for Saint Louis University educational purposes. Free to use and modify for learning.

## Acknowledgments

- Inspired by interactive learning platforms like CodeAcademy and freeCodeCamp
- Designed specifically for Saint Louis University students
- Built with SLU's signature blue and gold colors## Support

Questions or issues? Here are some tips:

**Code not running?**
- Click the "Run Code" or "Execute Code" button
- Check for syntax errors highlighted in red
- Try the example code first to understand the pattern

**Validation not working?**
- Ensure you've included all required elements
- Check spelling and syntax carefully
- Read the error message for specific guidance

**Progress not saving?**
- Enable cookies/localStorage in browser settings
- Avoid incognito/private mode
- Progress saves automatically when navigating

**Something not working?**
- Refresh the page and try again
- Use Chrome or Firefox (recommended browsers)
- Clear browser cache if needed

---

**Made for Saint Louis University Students**  
SLU LearnCode - Interactive Web Development Learning Platform  
&copy; 2025 Saint Louis University


## 🚀 Quick Start Example

Here's what you'll build by the end:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: linear-gradient(135deg, #667eea, #764ba2);
        }
        button {
            padding: 20px 40px;
            font-size: 20px;
            border: none;
            border-radius: 10px;
            background: white;
            color: #667eea;
            cursor: pointer;
            transition: all 0.3s;
        }
        button:hover {
            transform: scale(1.1);
        }
    </style>
</head>
<body>
    <button onclick="alert('You did it! 🎉')">
        Click Me!
    </button>
</body>
</html>
```

**Happy Learning! 🎓✨**

Start your web development journey today and build amazing websites!
