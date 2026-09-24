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
    # Ninki Nanka story
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

    # Griot / Jali tradition
    r'\bgriot\b': 'gree-oh',
    r'\bgriots\b': 'gree-ohs',
    r'\bjali\b': 'jah-lee',
    r'\bjalolu\b': 'jah-loh-loo',
    r'\bjelilu\b': 'jeh-lee-loo',
    r'\bJali\b': 'Jah-lee',
    r'\bJalolu\b': 'Jah-loh-loo',
    r'\bDjeli\b': 'Jeh-lee',

    # Kelefa Saane / Kaabu story
    r'\bKelefa Saane\b': 'Keh-leh-fah Sah-neh',
    r'\bKelefa\b': 'Keh-leh-fah',
    r'\bKelefaba\b': 'Keh-leh-fah-bah',
    r'\bKaabu\b': 'Kah-boo',
    r'\bKabu\b': 'Kah-boo',
    r'\bSenegambia\b': 'Sen-eh-gam-bee-ah',
    r'\bSenegambian\b': 'Sen-eh-gam-bee-an',
    r'\bBamba Suso\b': 'Bahm-bah Soo-so',
    r'\bDembo Kanute\b': 'Dem-boh Kah-noo-teh',
    r'\bBansang\b': 'Bahn-sang',
    r'\bBrikama\b': 'Bree-kah-mah',
    r'\bZiguinchor\b': 'Zig-in-shor',

    # Sundiata / Mali Empire story
    r'\bSundiata\b': 'Soon-jah-tah',
    r'\bSunjata\b': 'Soon-jah-tah',
    r'\bSogolon\b': 'Soh-goh-lon',
    r'\bNiani\b': 'Nee-ah-nee',
    r'\bSoumaoro\b': 'Soo-mah-oh-ro',
    r'\bKant[eé]\b': 'Kahn-teh',
    r'\bKirina\b': 'Kee-ree-nah',
    r'\bDjeli Mamoudou Kouyat[eé]\b': 'Jeh-lee Mah-moo-doo Koo-yah-teh',
    r'\bNare Maghan\b': 'Nah-reh Mah-gahn',

    # Two Kumbas story
    r'\bKumba Am Ndey\b': 'Koom-bah Ahm Ndey',
    r'\bKumba Amul Ndey\b': 'Koom-bah Ah-mool Ndey',
    r'\bKumba\b': 'Koom-bah',
    r'\bDaayaan\b': 'Dah-yahn',

    # Mande / Mali Empire terms
    r'\bMande\b': 'Mahn-day',


    # Kankurang story
    r'\bKankurang\b': 'Kahn-koo-rang',
    r'\bManding\b': 'Mahn-ding',
    r'\bKuyang-Manso\b': 'Koo-yang Mahn-so',

    # Fula herdsman story
    r'\bPulaaku\b': 'Poo-lah-koo',
    r'\bFulani\b': 'Foo-lah-nee',
    r'\bFula\b': 'Foo-lah',
    r'\bPeul\b': 'Puh-ool',
    r'\bmunyal\b': 'moon-yahl',
    r'\bMunyal\b': 'Moon-yahl',
    r'\bsemteende\b': 'sem-ten-deh',
    r'\bneddaaku\b': 'ned-dah-koo',
    r'\bKeba Kunda\b': 'Keh-bah Koon-dah',

    # Griot under the Baobab
    r'\bnyanyero\b': 'nyahn-yeh-ro',
    r'\bKaddy\b': 'Kah-dee',
    r'\bAlieu\b': 'Ah-lee-oo',

    # Stone Circles of Wassu
    r'\bWassu\b': 'Wah-soo',
    r'\btumuli\b': 'too-myoo-lee',
    r'\blaterite\b': 'lat-uh-ryte',

    # First Kora / Legends
    r'\bKoriang\b': 'Koh-ree-ahng',

    # Anansi spider story
    r'\bAnansi\b': 'Ah-nahn-see',
    r'\bNtikuma\b': 'N-tee-koo-mah',
    r'\bAkan\b': 'Ah-kahn',

    # General Mandinka / Gambian terms
    r'\bAbuko\b': 'Ah-boo-ko',
    r'\bGambia\b': 'Gam-bee-ah',
    r'\bBanjul\b': 'Bahn-jool',
    r'\bDakar\b': 'Dah-kar',
    r'\bCasamance\b': 'Kah-sah-mahns',
    r'\bpangolin\b': 'pang-oh-lin',
    r'\bSaloum\b': 'Sah-loom',
    r'\bLeuk\b': 'Lek',
    r'\bBouki\b': 'Boo-kee',
    r'\bMusa\b': 'Moo-sah',
    r'\bLevtzion\b': 'Lev-tzee-on',

    # ── New Stories Cultural Terms ──
    # Massaneh Ceesay
    r'\bMassaneh Ceesay\b': 'Mah-sah-neh Seh-say',
    r'\bMassaneh\b': 'Mah-sah-neh',
    r'\bCeesay\b': 'Seh-say',
    r'\bBakary Niuminko\b': 'Bah-kah-ree Nyoo-meen-koh',
    r'\bNiuminko\b': 'Nyoo-meen-koh',
    r'\bFoni Bondali\b': 'Foh-nee Bon-dah-lee',
    r'\bBondali\b': 'Bon-dah-lee',
    r'\bBintang Bolong\b': 'Been-tahng Boh-long',
    r'\bBintang\b': 'Been-tahng',

    # Boppi Jerreh
    r'\bBoppi Jerreh\b': 'Boh-pee Jeh-reh',
    r'\bSita Nunku\b': 'See-tah Noon-koo',
    r'\bBarra\b': 'Bah-rah',
    r'\bBaboucar\b': 'Bah-boo-kahr',

    # Fari Queen of Donkeys
    r'\bFari\b': 'Fah-ree',
    r'\bsabar\b': 'sah-bahr',
    r'\bkinkeliba\b': 'keen-keh-lee-bah',
    r'\bbenachin\b': 'beh-nah-cheen',

    # Cow, Hyena & Granary
    r'\bkafo\b': 'kah-foh',
    r'\bKafo\b': 'Kah-foh',
    r'\bbenteng\b': 'ben-teng',

    # Mai\'s Stolen Nianyaa
    r'\bnianyaa\b': 'nyahn-yah',
    r'\bNianyaa\b': 'Nyahn-yah',
    r'\bBinta\b': 'Been-tah',

    # Kansala (Kaabu)
    r'\bKansala\b': 'Kahn-sah-lah',
    r'\bDianke Wali\b': 'Jahn-keh Wah-lee',
    r'\bDianke\b': 'Jahn-keh',
    r'\bNyancho\b': 'Nyahn-choh',
    r'\bNyanchos\b': 'Nyahn-chohs',
    r'\bAlmamy Alpha\b': 'Ahl-mah-mee Ahl-fah',
    r'\bAlmamy\b': 'Ahl-mah-mee',
    r'\bTimbo\b': 'Teem-boh',
    r'\bTomora\b': 'Toh-moh-rah',

    # Foday Kaba
    r'\bFoday Kaba\b': 'Foh-day Kah-bah',
    r'\bFoday\b': 'Foh-day',
    r'\bDumbuya\b': 'Doom-boo-yah',
    r'\bMedina\b': 'Meh-dee-nah',
    r'\btata\b': 'tah-tah',
    r'\btatolu\b': 'tah-toh-loo',

    # Queen Yanmey
    r'\bYanmey\b': 'Yahn-may',
    r'\bNuimi\b': 'Nwee-mee',
    r'\bBurungai Sonko\b': 'Boo-roon-guy Sohn-koh',
    r'\bBurungai\b': 'Boo-roon-guy',

    # Koochi Barama
    r'\bKoochi Barama\b': 'Koo-chee Bah-rah-mah',
    r'\bKoochi\b': 'Koo-chee',
    r'\bBarama\b': 'Bah-rah-mah',
    r'\bKassumay\b': 'Kah-soo-my',
    r'\bFogny\b': 'Foh-nyee',
    r'\bkajando\b': 'kah-jahn-doh',

    # Bone of Mor Lam
    r'\bMor Lam\b': 'Mor Lahm',
    r'\bTeranga\b': 'Teh-rahn-gah',
    r'\bteranga\b': 'teh-rahn-gah',
    r'\bkadd\b': 'kahd',

    # Magic Calabash
    r'\bErubami\b': 'Eh-roo-bah-mee',
    r'\bModupeh\b': 'Moh-doo-peh',

    # Kumpo
    r'\bKumpo\b': 'Koom-poh',
    r'\bfromager\b': 'froh-mah-zhay',
    r'\bBrefet\b': 'Breh-fet',
    r'\bArfang\b': 'Ahr-fahng',

    # Golden Palm
    r'\bSerahule\b': 'Seh-rah-hoo-leh',
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
    sample = 'Along the bolongs of Kiang West, Samba whispered of Ninki Nanka near the ancient baobabs. Kelefa Saane crossed the Gambia River. Sundiata stood before the griots of Kaabu.'
    result, substitutions = preprocess_text(sample)
    print('Original:', sample)
    print('Processed:', result)
    print('Substitutions:', substitutions)