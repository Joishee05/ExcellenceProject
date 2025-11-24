import re
import os

# Read the original html-tutorials.html file
with open('html-tutorials.html', 'r') as f:
    content = f.content()

# Extract lessons using regex
lessons = re.findall(r'<article id="lesson-(\d+)".*?</article>', content, re.DOTALL)

print(f"Found {len(lessons)} lessons")

# Create template for each lesson
for i, lesson_content in enumerate(lessons, 1):
    lesson_num = str(i).zfill(2)
    
    # Extract title
    title_match = re.search(r'<h1>(.*?)</h1>', lesson_content)
    title = title_match.group(1) if title_match else f"Lesson {i}"
    
    # Create file
    filename = f"Lessons/lesson-html-{lesson_num}.html"
    print(f"Creating {filename}")
    
