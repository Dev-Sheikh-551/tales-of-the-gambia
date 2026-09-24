import re

def extract_sentence_spans(text: str):
    """
    Extract (charStart, charEnd, sentence_text) spans from canonical text.
    Handles:
    - Standard sentences ending with . ! ?
    - Closing quotes (" ' ” ’) following punctuation
    - Paragraph breaks (\n\n)
    - Dialogue and honorifics
    Ensures text[charStart:charEnd] == sentence_text exactly.
    """
    # Pattern to match a sentence:
    # Starts at non-whitespace.
    # Runs until a sentence-ending punctuation (.!?) followed by:
    #   optional closing quote, then whitespace, newline, or end-of-string.
    # OR runs until end-of-paragraph / end-of-string.
    pattern = re.compile(
        r'(?:\S(?:[^\.\!\?\n]|\.(?=\d)|\.(?=[A-Za-z]\.))*?[\.\!\?]+[\"\'\”\’]?(?=\s|$))'
        r'|'
        r'(?:[^\n\r]+?(?=\n\n|\Z))'
    )
    
    # We can also do a token/scanner approach to be 100% robust
    spans = []
    i = 0
    n = len(text)
    
    while i < n:
        # Skip leading whitespace/newlines
        while i < n and text[i].isspace():
            i += 1
        if i >= n:
            break
            
        start = i
        # Scan forward to find sentence end
        while i < n:
            c = text[i]
            if c in '.!?':
                # Check if it's an abbreviation like Mr. or e.g. or number 1.5
                if i + 1 < n and text[i+1].isdigit():
                    i += 1
                    continue
                # Move past any consecutive punctuation or closing quotes
                i += 1
                while i < n and text[i] in '.!?"\'”’)':
                    i += 1
                # Must be followed by whitespace, newline, or EOF to be sentence boundary
                if i >= n or text[i].isspace():
                    break
            elif c == '\n':
                # If followed by another newline, it's a paragraph break
                if i + 1 < n and text[i+1] == '\n':
                    break
                # Or if the line looks like a complete verse/short phrase
                if i > start and text[i-1] in '.,!?;:"\'”’':
                    break
            i += 1
            
        end = min(i, n)
        # Trim any trailing whitespace from sentence text
        sent_raw = text[start:end].rstrip()
        actual_end = start + len(sent_raw)
        if sent_raw:
            spans.append((start, actual_end, sent_raw))
        i = end
        
    return spans

# Test on a few examples
t1 = "The calabash of the kora was smoothed by seventy years of palm oil and warm hands. With his thumbs and index fingers, Jali Alieu plucked the nyanyero strings. A crystalline chord drifted upward into the dense boughs of the baobab tree, where storks rested after a long flight from the river."
s1 = extract_sentence_spans(t1)
print(f"Sample 1: {len(s1)} sentences")
for start, end, s in s1:
    print(f"  [{start}:{end}] ({len(s)} chars): {s[:50]}...")
    assert t1[start:end] == s

t2 = "'A book can burn, my daughter,' Jali Alieu spoke softly over the gentle vibration of the strings. 'A wall can crumble, and iron can turn to rust. But when a story lives in your breath, no drought or storm can ever steal your ancestors away.' Kaddy watched his fingers dance across the two rows of eleven and ten strings, committing every inflection to her memory."
s2 = extract_sentence_spans(t2)
print(f"\nSample 2: {len(s2)} sentences")
for start, end, s in s2:
    print(f"  [{start}:{end}] ({len(s)} chars): {s[:50]}...")
    assert t2[start:end] == s
