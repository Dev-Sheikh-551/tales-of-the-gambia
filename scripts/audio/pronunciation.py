"""
Pronunciation preprocessing layer for Tales of The Gambia narration generation.
Translates Gambian/Senegambian cultural, geographical, and indigenous terms
into phonetic approximations tailored for Kokoro TTS phonemizer without modifying
the canonical story text.
"""

import re

# Word-boundary mapped pronunciation dictionary
# Key: original canonical spelling (case-insensitive regex)
# Value: phonetic replacement for Kokoro TTS synthesis
PRONUNCIATION_MAP = {
    r'\bNinki Nanka\b': 'Neen-kee Nahn-kah',
    r'\bNinki-Nanka\b': 'Neen-kee Nahn-kah',
    r'\bbolong\b': 'boh-long',
    r'\bbolongs\b': 'boh-longs',
    r'\bKiang West\b': 'Kee-ahng West',
    r'\bKiang\b': 'Kee-ahng',
    r'\bJanjanbureh\b': 'Jahn-jahn-boo-ray',
    r'\bMandinka\b': 'Mahn-deen-kah',
    r'\bWolof\b': 'Woh-loff',
    r'\bJola\b': 'Joh-lah',
    r'\bbaobab\b': 'bah-oh-bahb',
    r'\bbaobabs\b': 'bah-oh-bahbs',
    r'\bcalabash\b': 'kal-uh-bash',
    r'\bkora\b': 'koh-rah',
    r'\bharmattan\b': 'har-mah-tahn',
    r'\bBantaba\b': 'Bahn-tah-bah',
    r'\bSamba\b': 'Sahm-bah',
    r'\bTaal bu daan\b': 'Tahl boo dahn',
    r'\bTe yen la taal bi daan doore\b': 'Teh yen lah tahl bee dahn doh-reh',
    r'\bMansa-baa baa kono\b': 'Mahn-sah-bah bah koh-noh',
}

def preprocess_text(text: str):
    applied = []
    processed = text
    for pattern, replacement in PRONUNCIATION_MAP.items():
        matches = list(re.finditer(pattern, processed, flags=re.IGNORECASE))
        if matches:
            for m in matches:
                applied.append({
                    'original': m.group(0),
                    'replacement': replacement
                })
            processed = re.sub(pattern, replacement, processed, flags=re.IGNORECASE)
    return processed, applied

if __name__ == '__main__':
    sample = 'Along the bolongs of Kiang West, Samba whispered of Ninki Nanka near the ancient baobabs.'
    result, substitutions = preprocess_text(sample)
    print('Original:', sample)
    print('Processed:', result)
    print('Substitutions:', substitutions)