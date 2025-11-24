#!/usr/bin/env python3
"""
Script to remove all emojis from HTML tutorial files
"""

import re
import os

# Define emoji patterns to remove
EMOJI_PATTERN = re.compile(
    "["
    "\U0001F600-\U0001F64F"  # emoticons
    "\U0001F300-\U0001F5FF"  # symbols & pictographs
    "\U0001F680-\U0001F6FF"  # transport & map symbols
    "\U0001F1E0-\U0001F1FF"  # flags (iOS)
    "\U00002702-\U000027B0"
    "\U000024C2-\U0001F251"
    "\U0001F900-\U0001F9FF"  # Supplemental Symbols and Pictographs
    "\U0001FA70-\U0001FAFF"  # Symbols and Pictographs Extended-A
    "]+", flags=re.UNICODE
)

# Common emoji characters used in the files
SPECIFIC_EMOJIS = ['🎯', '✏️', '💡', '🚀', '👉', '📝', '💻', '🎨', '⚡', '🔥', '📌', '✨', '🌟', '🎓', '🤝', '📧', '🎉']

# Replacement mapping
REPLACEMENTS = {
    '🎯 Challenge:': 'Challenge:',
    '✏️ Try It Yourself!': 'Try It Yourself:',
    '💡 <strong>Tip:</strong>': '<strong>Note:</strong>',
    '💡 <strong>Remember:</strong>': '<strong>Remember:</strong>',
    '💡 <strong>Think of Flexbox as:</strong>': '<strong>Flexbox Concept:</strong>',
    '⚡ <strong>Important:</strong>': '<strong>Important:</strong>',
    '🎨 Basics': 'Basics',
    '🚀 Intermediate': 'Intermediate',
    '⚡ Basics': 'Basics',
    '🎯 Intermediate': 'Intermediate',
    '🎯 Final Challenge:': 'Final Challenge:',
    '🎯 Respond to user actions': 'Respond to user actions',
    '🎨 Create animations': 'Create animations',
    '🎨 Controls colors': 'Controls colors',
    '✨ Adds animations': 'Adds animations',
}

def remove_emojis_from_file(filepath):
    """Remove all emojis from a file"""
    print(f"Processing: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    
    # Apply specific replacements first
    for emoji_text, replacement in REPLACEMENTS.items():
        content = content.replace(emoji_text, replacement)
    
    # Remove any remaining emojis using regex
    content = EMOJI_PATTERN.sub('', content)
    
    # Clean up extra spaces
    content = re.sub(r'  +', ' ', content)
    content = re.sub(r'> +<', '><', content)
    
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Emojis removed from {filepath}")
        return True
    else:
        print(f"  - No emojis found in {filepath}")
        return False

def main():
    """Main function to process all HTML files"""
    html_files = [
        'index.html',
        'html-tutorials.html',
        'css-tutorials.html',
        'js-tutorials.html'
    ]
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    files_processed = 0
    
    for filename in html_files:
        filepath = os.path.join(script_dir, filename)
        if os.path.exists(filepath):
            if remove_emojis_from_file(filepath):
                files_processed += 1
        else:
            print(f"File not found: {filepath}")
    
    print(f"\nComplete! Processed {files_processed} files.")
    print("All emojis have been removed from tutorial pages.")

if __name__ == '__main__':
    main()
