---
title: Speech phonetic alphabets - Speech service
titleSuffix: Foundry Tools
description: This article presents Speech service phonetic alphabet and International Phonetic Alphabet (IPA) examples.
author: PatrickFarley
ms.author: pafarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: concept-article
ms.date: 02/25/2026
ms.reviewer: jiajzhan
#Customer intent: As a developer, I want to learn about the phonetic alphabets used in Speech service.
---

# SSML phonetic alphabets

Phonetic alphabets are used with the [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup.md) to improve the pronunciation of text to speech voices. To learn when and how to use each alphabet, see [Use phonemes to improve pronunciation](speech-synthesis-markup-pronunciation.md#phoneme-element).

Speech service supports the [International Phonetic Alphabet (IPA)](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet) suprasegmentals that are listed here. You set `ipa` as the `alphabet` in [SSML](speech-synthesis-markup-pronunciation.md#phoneme-element). 

| `ipa` | Symbol | Note |
| --- | --- | --- |
| `ˈ` | Primary stress | Don't use single quote (`‘` or `'`) though they look similar. |
| `ˌ` | Secondary stress | Don't use comma (`,`) though it looks similar. |
| `.` | Syllable boundary |  |
| `ː` | Long | Don't use colon (`:` or `：`) though they look similar. |
| `‿` | Linking |  |

> **Tip:**
> You can use [the international phonetic alphabet keyboard](https://www.internationalphoneticalphabet.org/html-ipa-keyboard-v1/keyboard/) to create the correct `ipa` suprasegmentals.

For some locales, Speech service defines its own phonetic alphabets, which ordinarily map to the [International Phonetic Alphabet (IPA)](https://en.wikipedia.org/wiki/International_Phonetic_Alphabet). The locales that support the Microsoft Speech API (SAPI, or `sapi`) are en-US/en-CA, fr-FR/fr-CA/fr-BE/fr-CH, de-DE/de-AT/de-CH, es-ES, ja-JP, zh-CN, zh-HK/yue-CN, and zh-TW. For those locales, you set `sapi` or `ipa` as the `alphabet` in [SSML](speech-synthesis-markup-pronunciation.md#phoneme-element). 

See the sections in this article for the phonemes that are specific to each locale.

> **Note:**
> The following tables list viseme IDs corresponding to phonemes for different locales. When viseme ID is 0, it indicates silence.

## ar-EG/ar-SA

### Vowels for ar-EG

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `a` | 2 |  | **ح**رب | شَرَد**َ** |
| `aː` | 2 |  | لِس**ا**نَهُ | أَدْي**ا**نها |
| `i` | 6 |  | رَجُل**ٍ** | بِه**ِ** |
| `iː` | 6 |  | كَب**ي**رٌ | أُرْدواز**ي** |
| `u` | 7 |  | آج**ُ**رّ | مُنْذ**ُ** |
| `uː` | 7 |  | آخَر**و**نَ | أَعاق**و**ا |

### Consonant for ar-EG

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `b` | 21 | **ب**ازارَ | أَ**ب**َ | أَعْطا**ب** |
| `d` | 19 | **د**ابَّة | أَبا**د**َ | أَفْسَ**د** |
| `g` | 20 | **ج**َمَلٌ | رَ**ج**َبُ | مَرَ**ج** |
| `k` | 20 | **ك**َآخَر | أَ**ك**ْلٌ | أَوْرا**ك** |
| `t` | 19 | ت**َ**آخي | مُرَ**ت**َّبُ | أُخْ**ت** |
| `dˤ` | 19 | **ض**اعِن | مُ**ض**ِرُّ | مَرَ**ض** |
| `q` | 20 | **ق**َمَرٌ | أَتَعا**ق**َد | أَرَ**ق** |
| `tˤ` | 19 | **ط**الِبان | أَحا**ط**وهُ | رَبْ**ط** |
| `ʔ` | 19 | **أ**ُفُقي | فَ**أ**ْرٌ | السَّما**ء** |
| `f` | 18 | **ف**َنٌّ | يَ**ف**ِرُّ | شَرَ**ف** |
| `h` | 12 | **ه**ياجِ | أَحَبَّتْ**هُ** | الْأَبْلَ**ه** |
| `ħ` | 12 | **ح**ُرٌّ | رَ**ح**ِمَ | الْبَلَ**ح** |
| `s` | 15 | **س**ِرٌّ | قِ**س**ْمُ | الْجالِ**س** |
| `θ` | 19 | **ث**َرًى | أَحْدا**ث**ٌ | الْحارِ**ث** |
| `z` | 15 | **ز**ِر | قَ**ز**ْمٌ | الْخُبْ**ز** |
| `ðˤ` | 17 | **ظ**َنَّ | أَ**ظ**ْهَرَ | قَيْ**ظ** |
| `ð` | 17 | **ذ**َلِكَ | أَ**ذ**ًى | اُنْفُ**ذ**ْ |
| `ɣ` | 20 | **غ**ِنًى | أَدْمِغَ**ة**ٌ | دِما**غ** |
| `x` | 12 | **خ**َبَرٌ | رَ**خ**ْوُ | أَ**خ** |
| `ʃ` | 16 | **ش**افَت | خَ**ش**ْيَةُ | وَحْ**ش** |
| `sˤ` | 15 | **ص**ِلَةٌ | وَ**ص**َلَ | غَوْ**ص** |
| `j` | 6 | **ي**َوْمٌ | أَدْو**ي**َةً | بِمُدْبِرَ**ي**ْ |
| `w` | 7 | **و**َلَدٌ | لَ**و**ْنٌ | ماكا**و** |
| `l` | 14 | **ل**َيْسَ | عِ**ل**ْمُ | عَمَ**ل** |
| `m` | 21 | **م**َجْدٌ | ثَ**م**َنُ | قَلَ**م** |
| `n` | 19 | **ن**ائِبٌ | أَدْيا**ن**ًا | أَمْ**ن** |
| `r` | 13 | **ر**َكْبٌ | قَ**ر**ْنُ | بِمُكَرّ**َر** |
| `ʕ` | 12 | **ع**اماً | لَ**ع**ِبُ | بَيْ**ع** |


## bg-BG

### Vowels for bg-BG

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `i` | 6 | **и**скат | сценар**и**стката | лечим**и** |
| `ɛ` | 4 | **е**лен | ц**е**на | оспоренит**е** |
| `ɔ` | 3 | **о**правя | к**о**ето | колел**о** |
| `a` | 2 | **а**нгел | докосв**а**т | цен**а** |
| `u` | 7 | **у**клончивата | х**у**бавичка | таб**у** |
| `j͡a` | 6,2 | **я**бълка | о**я**л | зала**я** |
| `ɤ` | 1 | **ъ**гъл | ъг**ъ**л | имамбаялд**ъ** |
| `j͡u` | 6,7 | **ю**тия | отво**ю**вал | сто**ю** |

### Consonant for bg-BG

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `n` | 19 | **н**еразбираемия | преразпределе**н**ите | иска**н** |
| `ʒ` | 16 | **ж**ълт | тъ**ж**ен | тарале**ж** |
| `k` | 20 | **к**амък | в**к**арвал | петъ**к** |
| `t͡s` | 19,15 | **ц**ар | ме**ц**енат | цареве**ц** |
| `t` | 19 | **т**айна | на**т**ъжени | прос**т** |
| `p` | 21 | **п**риказката | натъ**п**кан | приле**п** |
| `r` | 13 | **р**азлика | прозо**р**ец | хитъ**р** |
| `s` | 15 | **с**ърна | ме**с**ец | проце**с** |
| `d` | 19 | **д**ом | ме**д**ен | джаре**д** |
| `x` | 12 | **х**ора | до**х**од | це**х** |
| `zʲ` | 15 | **з**ян | Замра**з**явайки |  |
| `lʲ` | 14 | **л**юбов | в**л**юбване |  |
| `l` | 14 | **л**ебед | б**л**ед | хме**л** |
| `nʲ` | 19 | **н**якога | по**н**якога |  |
| `v` | 18 | **в**реме | на**в**реме | лъво**в** |
| `m` | 21 | **м**оре | вре**м**е | коре**м** |
| `b` | 21 | **б**аба | ри**б**а | ястре**б** |
| `g` | 20 | **г**арван | нару**г**ан | дра**г** |
| `d͡ʒ` | 19,16 | **Дж**орджева | тютюн**дж**ийския | пле**дж** |
| `f` | 18 | **ф**илм | ре**ф**орма | реле**ф** |
| `mʲ` | 21 | **м**ях | с**м**ях |  |
| `tʲ` | 19 | **т**яхна | с**т**яга |  |
| `rʲ` | 13 | **р**ядка | вп**р**ягайки |  |
| `pʲ` | 21 | **п**яхме | с**п**я |  |
| `dʲ` | 19 | **д**ядовите | за**д**явайки |  |
| `j` | 6 | **й**од | пе**й**о | руче**й** |
| `vʲ` | 18 | **в**яло | поси**в**яло |  |
| `sʲ` | 15 | **с**якаш | в**с**яка |  |
| `bʲ` | 21 | **б**яла | Из**б**ягваме |  |
| `kʲ` | 20 | **к**юпа | про**к**юрдският |  |
| `gʲ` | 20 | **г**юргево | пана**г**юрското |  |
| `fʲ` | 18 | **ф**ючърс | Пар**ф**юмерия |  |
| `z` | 15 | **з**има | изра**з**ходват | разка**з** |
| `ʃ` | 16 | **ш**ума | ма**ш**ина | изпече**ш** |
| `t͡ʃ` | 19,16 | **ч**ак | слу**ч**аи | ме**ч** |
| `d͡z` | 19,15 | **дз**ифт | скрън**дз**а | Ло**дз** |


## ca-ES
---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.author: pafarley
---

### Vowels for ca-ES

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `a` | 2 | **a**men | am**a**ro | est**à** |
| `ɔ` | 3 | **o**dre | ofert**o**ri | microt**ò** |
| `ə` | 1 | **e**stan | s**e**ré | aigu**a** |
| `e` | 4 | **é**rem | f**e**ta | ser**é** |
| `ɛ` | 4 | **e**cosistema | incorr**e**cta | hav**er** |
| `i` | 6 | **i**tinerants | it**i**nerants | zomb**i** |
| `o` | 8 | **o**mbra | ret**o**ndre | omissi**ó** |
| `u` | 7 | **u**niversitaris | candidat**u**res | cron**o** |

### Consonant for ca-ES

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `b` | 21 | **b**aba | do**b**la |  |
| `β` | 21 | **v**ià | ba**b**a |  |
| `t͡ʃ` | 19,16 | **tx**adià | ma**tx**ucs | fa**ig** |
| `d` | 19 | **d**edicada | con**d**uïa | navida**d** |
| `ð` | 17 | **Th**e_Sun | de**d**icada | trinida**d** |
| `f` | 18 | **f**acilitades | a**f**ectarà | àgra**f** |
| `g` | 20 | **g**racia | con**g**ratula |  |
| `ɣ` | 20 |  | ai**g**ua |  |
| `j` | 6 | **hi**ena | espla**i**a | cofo**i** |
| `d͡ʒ` | 19,16 | **dj**akarta | composta**tg**e | geor**ge** |
| `k` | 20 | **c**urós | dode**c**à | doble**c** |
| `l` | 14 | **l**aberint | mio**l**ar | preva**l** |
| `ʎ` | 14 | **ll**igada | mi**ll**orarà | perbu**ll** |
| `m` | 21 | **m**acadàmies | fe**m**ar | subli**m** |
| `n` | 19 | **n**ecessaris | sa**n**itaris | alterame**nt** |
| `ŋ` | 20 |  | algo**n**quí | albe**nc** |
| `ɲ` | 19 | **ny**asa | reme**n**jar | alema**ny** |
| `p` | 21 | **p**egues | este**p**a | ca**p** |
| `ɾ` | 19 |  | ca**r**o | càrte**r** |
| `r` | 13 | **r**abada | ca**rr**o | lofòfo**r** |
| `s` | 15 | **c**eri | cur**s**ar | cu**s** |
| `ʃ` | 16 | **x**acar | micro**x**ip | midra**ix** |
| `t` | 19 | **t**abacaires | es**t**ratifica | debatu**t** |
| `θ` | 19 | **c**eará | ve**c**inos | Álvare**z** |
| `w` | 7 | **w**estfalià | ina**u**gurar | inscri**u** |
| `x` | 12 | **j**uanita | mu**j**eres | heinri**ch** |
| `z` | 15 | **z**elar | bra**s**ils | alian**ze** |
| `ʒ` | 16 | **g**ebrada | asco**g**ènic | oran**ge** |


## cs-CZ

### Vowels for cs-CZ

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `ɪ` | 6 | **i**deální | hand**i**capované | gigant**y** |
| `ɛ` | 4 | **e**fektní | grot**e**sce | hygien**ě** |
| `a` | 2 | **a**gens | inf**a**rktu | extr**a** |
| `o` | 8 | **o**áz | hřbit**o**vy | čist**o** |
| `u` | 7 | **u**brání | kompon**u**je | gril**u** |
| `iː` | 6 | **í**ránské | jedin**ý**mi | generačn**í** |
| `ɛː` | 4 | **é**ry | jednoduch**é**ho | gumov**é** |
| `aː` | 2 | **á**rijské | br**á**n | hořk**á** |
| `oː` | 8 | **ó**du | fam**ó**zního | j**ó** |
| `uː` | 7 | **ú**bočí | pet**ú**nie | gril**ů** |
| `o͡ʊ̯` | 8,4 | **ou**ha | fan**ou**ška | hanb**ou** |
| `a͡ʊ` | 2,4 | **au**to | hydr**au**liky |  |
| `ɛ͡ʊ̯` | 4,4 | **eu**forie | terap**eu**tická |  |
| `ə` | 1 |  |  |  |

### Consonant for cs-CZ

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `p` | 21 | **p**adá | hy**p**eraktivní | handica**p** |
| `b` | 21 | **b**alon | hra**b**ěte |  |
| `t` | 19 | **t**abák | é**t**os | agen**t** |
| `d` | 19 | **d**isco | či**d**el |  |
| `c` | 16 | **ť**uhýk | kandidá**t**i | kapra**ď** |
| `ɟ` | 16 | **ď**ábel | hr**d**iny |  |
| `k` | 20 | **k**aligrafie | dů**k**azní | grafi**k** |
| `g` | 20 | **g**angstera | hy**g**ienici |  |
| `t͡s` | 19,15 | **c**ivilistům | evolu**c**e | klávesni**c** |
| `d͡z` | 19,15 |  | le**c**kde |  |
| `t͡ʃ` | 19,16 | **č**epice | hlída**č**i | klí**č** |
| `d͡ʒ` | 19,16 | **dž**usy | kilo**j**oulů |  |
| `f` | 18 | **f**ádní | gra**f**ice | gra**f** |
| `v` | 18 | **v**abank | exkluzi**v**ita |  |
| `s` | 15 | **s**ekundě | grima**s**ami | impul**s** |
| `z` | 15 | **z**áhadným | gru**z**ínské |  |
| `r̝` | 13 | **ř**ad | ho**ř**ícím |  |
| `ʃ` | 16 | **š**álků | gro**š**ů | ké**ž** |
| `ʒ` | 16 | **ž**ab | loupe**ž**e |  |
| `j` | 6 | **j**á | číha**j**ící | líne**j** |
| `x` | 12 | **ch**lapcem | li**ch**otí | domorodý**ch** |
| `ɦ` | 12 | **h**ektar | historické**h**o |  |
| `r` | 13 | **r**abat | gu**r**u | fakto**r** |
| `l` | 14 | **l**adu | e**l**iminovat | netaji**l** |
| `m` | 21 | **m**acešsky | a**m**atérský | cení**m** |
| `n` | 19 | **n**ásledkům | ce**nn**é | gurmá**n** |
| `ŋ` | 20 |  | kolo**n**ky |  |
| `ɲ` | 19 | **ň**adra | komor**n**ě | kolegy**ň** |
| `ɱ` | 21 |  | ko**m**fort |  |
| `r̝̊` | 13 | t**ř**ída | extrat**ř**ídy | komentá**ř** |


## da-DK

### Vowels for da-DK

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `a` | 2 | **a**bitur | kortf**a**ttet | marin**a** |
| `ɑ` | 2 | **a**bnorme | pic**a**resk | var**er** |
| `ɑː` | 2 | **a**ra | pir**a**t | vandk**ar** |
| `ɛ` | 4 | **e**dderkop | and**æ**gtig | tomatpur**é** |
| `ɛː` | 4 | **e**ventyr | dyrl**æ**ge |  |
| `ɔ` | 3 | **o**nde | dysf**u**nktion | Sus**å** |
| `ɒ` | 2 | **å**nd | abeh**å**nd | akkumulat**or** |
| `ɒː` | 2 | **å**rbog | fyrre**å**rig | ricksh**aw** |
| `ɔː` | 3 | **å**bne | modst**å**ende | husarbl**å** |
| `ɐ` | 4 |  | buntmag**er**e | bortgift**er** |
| `æː` | 1 | **a**begilde | flagd**a**ge | hovedf**ag** |
| `e` | 4 | **e**ditere | klarh**e**den | kanap**é** |
| `ø` | 1 | **ø**dem | mælkeb**ø**tte | milj**ø** |
| `øː` | 1 | **ø**de | bortf**ø**rere | lind**ø** |
| `ə` | 1 | **E**yolf | men**e**ders | æd**e** |
| `eː` | 4 | **e**delweiss | plac**e**bo | Culms**ee** |
| `i` | 6 | **i**aften | l**i**p**i**zzaner | bankkont**i** |
| `iː` | 6 | **i**linger | industr**i**en | bag**i** |
| `o` | 8 | **o**ase | udel**o**d | brav**o** |
| `œ` | 4 | **ø**m | varmer**ø**r | b**øh** |
| `œː` | 4 | **Ear**l | arbejdspr**ø**ves | Edinb**urgh** |
| `oː` | 8 | **o**berst | bevatr**o**ns | cong**o** |
| `u` | 7 | **u**døver | spektak**u**lær | endn**u** |
| `uː` | 7 | **u**ge | spidsb**u**e | eis**uu** |
| `y` | 4 | **y**bsalon | underkr**y**dder | men**u** |
| `yː` | 4 | **y**de | vids**y**n | dødss**yg** |

### Consonant for da-DK

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `b` | 21 | **b**landt | ga**b**ende | då**b** |
| `d` | 19 | **d**å | hæv**d**er | græ**dt** |
| `ð` | 17 | **th**ousand | baa**d**en | gra**d** |
| `f` | 18 | **f**abrik | spøge**f**ugle | boligsto**f** |
| `g` | 20 | **g**aader | fåbor**g**enser | fi**k** |
| `h` | 12 | **h**åb | træg**h**eden |  |
| `j` | 6 | h**j**orte | mil**j**ø | bagtø**j** |
| `kʰ` | 20 | **k**abale | bort**k**omme | Cu**c** |
| `l` | 14 | **l**å | romanb**l**ad | fata**l** |
| `m` | 21 | **m**aya | taxa**m**etret | calciu**m** |
| `n` | 19 | **n**å | toge**n**e | bredde**n** |
| `ŋ` | 20 |  | fu**n**ktion | klareri**ng** |
| `pʰ` | 21 | **p**a | cul**p**a |  |
| `ʔ` | 19 |  | aff**y**re | bortg**å** |
| `ʁ` | 13 | **r**å | a**r**eal |  |
| `ɐ̯` | 4 |  | jonglø**r**kunst | bjørnebæ**r** |
| `s` | 15 | **s**å | per**s**on | belønne**s** |
| `ɕ` | 16 | **Sj**ælland | benzinsta**ti**on | affi**che** |
| `t` | 19 | **t**oge | side**t**al | administrationsappara**t** |
| `v` | 18 | **v**aagner | e**v**aluere | dåkal**v** |
| `w` | 7 | **w**alkman | prø**v**e | meterlo**v** |


## de-DE/de-CH/de-AT

#### Suprasegmentals for German

| Example&nbsp;1 (Onset for consonant, word-initial for vowel) | Example&nbsp;2 (Intervocalic for consonant, word-medial nucleus for vowel) | Example&nbsp;3 (Coda for consonant, word-final for vowel) | Comments |
| --- | --- | --- | --- |
| anders /a **1** n - d ax r s/ | Multiplikationszeichen /m uh l - t iy - p l iy - k a - ts y ow **1** n s - ts ay - c n/ | Biologie /b iy - ow - l ow - g iy **1**/ | Speech service phone set put stress after the vowel of the stressed  syllable |
| Allgemeinwissen /a **2** l - g ax - m ay 1 n - v ih - s n/ | Abfallentsorgungsfirma /a 1 p - f a l - ^ eh n t - z oh **2** ax r - g uh ng s - f ih ax r - m  a/ | Computertomographie /k oh m - p y uw 1 - t ax r - t ow - m ow - g r a - f iy **2**/ | The Speech service phone set puts stress after the vowel of the sub-stressed syllable |

#### Vowels for German

| `sapi` | `ipa` | VisemeID | Example&nbsp;1 | Example&nbsp;2 | Example&nbsp;3 |
| --- | --- | --- | --- | --- | --- |
| a: | `aː` | 2 | **A**ber | Maßst**a**b | Schem**a** |
| a | `a` | 2 | **A**bfall | B**a**ch | Agath**a** |
| oh | `ɔ` | 3 | **O**sten | Pf**o**sten |  |
| eh: | `ɛː` | 4 | **Ä**hnlichkeit | B**ä**r | Fasci**ae**[<sup>1</sup>](#de-v-1) |
| eh | `ɛ` | 4 | **ä**ndern | Proz**e**nt | Amygdal**ae** |
| ax | `ə` | 1 | 'v**e**rstauen[<sup>2</sup>](#de-v-2) | Aach**e**n | Frag**e** |
| iy | `iː` | 6 | **I**ran | abb**ie**gt | Relativitätstheor**ie** |
| ih | `ɪ` | 6 | **I**nnung | s**i**ngen | Wood**y** |
| eu | `øː` | 1 | **Ö**sen | abl**ö**sten | Malm**ö** |
| ow | `o`, `oː` | 8 | **o**hne | Balk**o**n | Trept**ow** |
| oe | `œ` | 4 | **Ö**ffnung | bef**ö**rdern |  |
| ey | `e`, `eː` | 4 | **E**berhard | abf**e**gt | b |
| uw | `uː` | 7 | **U**do | H**u**t | Akk**u** |
| uh | `ʊ` | 4 | **U**nterschiedes | b**u**nt |  |
| ue | `yː` | 4 | **Ü**bermut | pfl**ü**gt | Men**ü** |
| uy | `ʏ` | 7 | **ü**ppig | S**y**stem |  |

<a id="de-v-1"></a>
**1** *Only in words of foreign origin, such as Fasci**ae***.<br>
<a id="de-v-2"></a>
**2** *Word-initial only in words of foreign origin, such as **A**ppointment. Syllable-initial in 'v**e**rstauen*.

#### Diphthong for German

| `sapi` | `ipa` | VisemeID | Example&nbsp;1 | Example&nbsp;2 | Example&nbsp;3 |
| --- | --- | --- | --- | --- | --- |
| ay | `ai` | 2,6 | **ei**nsam | Unabhängigk**ei**t | Abt**ei** |
| aw | `au` | 2,7 | **au**ßen | abb**au**st | St**au** |
| oy | `ɔy`, `ɔʏ̯` | 3,4 | **Eu**phorie | tr**äu**mt | sch**eu** |

#### Semivowels for German

| `sapi` | `ipa` | VisemeID | Example&nbsp;1 | Example&nbsp;2 | Example&nbsp;3 |
| --- | --- | --- | --- | --- | --- |
| ax r | `ɐ` | 4 |  | abänd**er**n | lock**er** |

#### Consonants for German

| `sapi` | `ipa` | VisemeID | Example&nbsp;1 | Example&nbsp;2 | Example&nbsp;3 |
| --- | --- | --- | --- | --- | --- |
| b | `b` | 21 | **B**ank |  | Pu**b**[<sup>1</sup>](#de-c-1) |
| d | `d` | 19 | **d**anken | Len**d**l[<sup>2</sup>](#de-c-2) | Clau**d**e[<sup>3</sup>](#de-c-3) |
| jh | `ʤ` | 16 | **J**eff | gemana**g**t | Chan**g**e[<sup>4</sup>](#de-c-4) |
| f | `f` | 18 | **F**ahrtdauer | angri**ff**slustig | abbruchrei**f** |
| g | `g` | 20 | **g**ut | Gre**g**[<sup>5</sup>](#de-c-5) |  |
| h | `h` | 12 | **H**ausanbau |  |  |
| y | `j` | 6 | **J**od | Reakt**i**on | hu**i** |
| k | `k` | 20 | **K**oma | Aspe**k**t | Flec**k** |
| l | `l` | 14 | **l**au | ähne**l**n | zuvie**l** |
| m | `m` | 21 | **M**ut | A**m**t | Leh**m** |
| n | `n` | 19 | **n**un | u**n**d | Huh**n** |
| ng | `ŋ` | 20 | **Ng**uyen[<sup>6</sup>](#de-c-6) | Schwa**nk** | R**ing** |
| p | `p` | 21 | **P**artner | abru**p**t | Ti**p** |
| pf | `pf` | 21,18 | **Pf**erd | dam**pf**t | To**pf** |
| r | `ʀ`, `r`, `ʁ` | 13 | **R**eise | knu**rr**t | Haa**r** |
| s | `s` | 15 | **S**taccato[<sup>7</sup>](#de-c-7) | bi**s**t | mie**s** |
| sh | `ʃ` | 16 | **Sch**ule | mi**sch**t | lappi**sch** |
| t | `t` | 19 | **T**raum | S**t**raße | Mu**t** |
| ts | `ts` | 19,15 | **Z**ug | Ar**z**t | Wit**z** |
| ch | `tʃ` | 19,16 | **Tsch**echien | aufgepu**tsch**t | bundesdeu**tsch** |
| v | `v` | 18 | **w**inken | Q**u**alle | Gr**oo**ve[<sup>8</sup>](#de-c-8) |
| x | `x`[<sup>9</sup>](#de-c-9), `ç`[<sup>10</sup>](#de-c-10) | 12 | Ba**ch**erach[<sup>11</sup>](#de-c-11) | Ma**ch**t mögli**ch**st | Schma**ch** 'i**ch** |
| z | `z` | 15 | **s**uper |  |  |
| zh | `ʒ` | 16 | **G**enre | B**re**ezinski | Edvi**g**e |

<a id="de-c-1"></a>
**1** *Only in words of foreign origin, such as Pu**b***.<br>
<a id="de-c-2"></a>
**2** *Only in words of foreign origin, such as Len**d**l*.<br>
<a id="de-c-3"></a>
**3** *Only in words of foreign origin, such as Clau**d**e*.<br>
<a id="de-c-4"></a>
**4** *Only in words of foreign origin, such as Chan**g**e*.<br>
<a id="de-c-5"></a>
**5** *Word-terminally only in words of foreign origin, such as Gre**g***.<br>
<a id="de-c-6"></a>
**6** *Only in words of  foreign origin, such as **Ng**uyen*.<br>
<a id="de-c-7"></a>
**7** *Only in words of foreign origin, such as **S**taccato*.<br>
<a id="de-c-8"></a>
**8** *Only in words of foreign origin, such as Gr**oo**ve*.<br>
<a id="de-c-9"></a>
**9** *The IPA `x` is a hard "ch" after all non-front vowels (a, aa, oh, ow, uh, uw, and the diphthong aw)*.<br>
<a id="de-c-10"></a>
**10** *The IPA `ç` is a soft "ch" after front vowels (ih, iy, eh, ae, uy, ue, oe, eu, and diphthongs ay, oy) and consonants*.<br>
<a id="de-c-11"></a>
**11** *Word-initial only in words of foreign origin, such as **J**uan. Syllable-initial also in words such as Ba**ch**erach*.<br>

#### Oral consonants for German

| `sapi` | `ipa` | VisemeID | Example |
| --- | --- | --- | --- |
| ^ | `ʔ` | 19 | beachtlich     /b ax - ^ a 1 x t - l ih c/ |

> **Note:**
> We need to add a [gs\] phone between two distinct vowels, except when the two vowels are a genuine diphthong. This oral consonant is a glottal stop. For more information, see [glottal stop](http://en.wikipedia.org/wiki/Glottal_stop).
> Besides, `de-CH`,`de-AT` locales don't support SAPI phones now.


## el-GR

### Vowels for el-GR

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `a` | 2 | **ά**κουσμα | μ**α**γ**α**ζ**ά**κι | ουδέτερ**α** |
| `e` | 4 | **αί**τιο | κατ**έ**χω | ουδέποτ**ε** |
| `i` | 6 | **ει**σπνοή | ξ**υ**ρ**ι**σμένο | εαριν**ή** |
| `o` | 8 | **ό**αση | δ**ώ**ρο | δυ**ο |
| `u` | 7 | **ου**γγρικό | παπ**ού**τσι | μαϊμ**ού** |

### Consonant for el-GR

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `b` | 21 | **μπ**ορώ | φά**μπ**ρικα | πα**μπ** |
| `c` | 16 | **κ**αι | σα**κ**ί |  |
| `ç` | 12 | **χ**έρι | μονα**χ**ή |  |
| `d` | 19 | **ντ**ύνει | πέ**ντ**ε | οφ-σάι**ντ** |
| `ð` | 17 | **δ**ρόμος | κρα**δ**ασμοί |  |
| `d͡z` | 19,15 | **τζ**άμι | φλάν**τζ**α |  |
| `f` | 18 | **φ**εύγω | κα**φ**ετέρια | ου**φ** |
| `g` | 20 | **γκ**ρέμισε | ό**γκ**ος | πιν**γκ**-πον**γκ** |
| `ɣ` | 20 | **γ**αστρονομική | με**γ**αλόπνοα |  |
| `ɟ` | 16 | **γκ**ισέ | φαρά**γγ**ι |  |
| `j` | 6 |  |  |  |
| `ʝ` | 12 | **γ**έρος | κρα**γ**ιόν |  |
| `k` | 20 | **κ**άρτα | ιππι**κ**ό | κρα**κ** |
| `l` | 14 | **λ**όγος | μι**λ**ώ | προφί**λ** |
| `m` | 21 | **μ**ιλώ | δρα**μ**ατική | πρι**μ** |
| `n` | 19 | **ν**όμιμο | Δα**ν**έζα | πρι**ν** |
| `p` | 21 | **π**ίνω | α**π**έτυχαν | σελοτέι**π** |
| `ɾ` | 19 | **ρ**ούχα | εα**ρ**ινή | σέντε**ρ** |
| `s` | 15 | **σ**ελίδα | μέ**σ**ο | πλάτο**ς** |
| `t` | 19 | **τ**ότε | τό**τ**ε | κι**τ** |
| `θ` | 19 | **θ**έλω | φορολογη**θ**είς | μαμού**θ** |
| `t͡s` | 19,15 | **τσ**άγια | χαρά**τσ**ι | μα**τς** |
| `v` | 18 | **β**ράδυ | δια**β**άζω | μο**β** |
| `x` | 12 | **χ**ρόνος | μονά**χ**α | α**χ** |
| `z` | 15 | **ζ**έστη | χιονί**ζ**ει | πλα**ζ** |


## en-GB/en-IE/en-AU

### Vowels for en-GB

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `ɑː` | 2 |  | f**a**st | br**a** |
| `æ` | 1 |  | f**a**t |  |
| `ʌ` | 1 |  | b**u**g |  |
| `ɛə` | 4,1 |  |  | h**air** |
| `aʊ` | 2,4 | **ou**t | m**ou**th | h**ow** |
| `ə` | 1 | **a** |  | driv**er** |
| `aɪ` | 2,6 |  | f**i**ve |  |
| `ɛ` | 4 | **e**gg | dr**e**ss |  |
| `ɜː` | 5 | **er**nest | sh**ir**t | f**ur** |
| `eɪ` | 4,6 | **ai**lment | l**a**ke | p**ay** |
| `ɪ` | 6 |  | add**i**ng |  |
| `ɪə` | 6,1 |  | b**ear**d | h**ear** |
| `iː` | 6 | **ea**t | s**ee**d | s**ee** |
| `ɒ` | 2 |  | p**o**d |  |
| `ɔː` | 3 |  | d**aw**n |  |
| `əʊ` | 1,4 |  | c**o**de | pill**ow** |
| `ɔɪ` | 3,6 |  | p**oi**nt | b**oy** |
| `ʊ` | 4 |  | l**oo**k |  |
| `ʊə` | 4,1 |  |  | t**our** |
| `uː` | 7 |  | f**oo**d | t**wo** |

### Consonant for en-GB

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `b` | 21 | **b**ike | ri**bb**on | ri**b** |
| `tʃ` | 19,16 | **ch**allenge | na**t**ure | ri**ch** |
| `d` | 19 | **d**ate | ca**dd**y | sli**d** |
| `ð` | 17 | **th**is | fa**th**er | brea**the** |
| `f` | 18 | **f**ace | lau**gh**ing | enou**gh** |
| `g` | 20 | **g**old | bra**gg**ing | be**g** |
| `h` | 12 | **h**urry | a**h**ead |  |
| `j` | 6 | **y**es |  |  |
| `dʒ` | 19,16 | **g**in | ba**dg**er | bri**dge** |
| `k` | 20 | **c**at | lu**ck**y | tru**ck** |
| `l` | 14 | **l**eft | ga**ll**on | fi**ll** |
| `m` | 21 | **m**ile | li**m**it | ha**m** |
| `n` | 19 | **n**ose | pho**n**etic | ti**n** |
| `ŋ` | 20 |  | si**ng**er | lo**ng** |
| `p` | 21 | **p**rice | su**p**er | ti**p** |
| `ɹ` | 13 | **r**ate | ve**r**y |  |
| `s` | 15 | **s**ay | si**ss**y | pa**ss** |
| `ʃ` | 16 | **sh**op | ca**sh**ier | lea**sh** |
| `t` | 19 | **t**op | ki**tt**en | be**t** |
| `θ` | 19 | **th**eatre | ma**the**matics | brea**th** |
| `v` | 18 | **v**ery | li**v**er | ha**ve** |
| `w` | 7 | **w**ill |  |  |
| `z` | 15 | **z**ero | bli**zz**ard | ro**se** |
| `ʒ` | 16 |  | vi**s**ion | bei**ge** |


## en-US/en-CA

#### Suprasegmentals for English

| Example&nbsp;1 (onset for consonant, word-initial for vowel) | Example&nbsp;2 (intervocalic for consonant, word-medial nucleus for vowel) | Example&nbsp;3 (coda for consonant, word-final for vowel) | Comments |
| --- | --- | --- | --- |
| burger  /b er **1** r - g ax r/ | falafel  /f ax - l aa **1** - f ax  l/ | guitar  /g ih - t aa **1** r/ | The Speech service phone set puts stress after the vowel of the stressed syllable. |
| inopportune /ih **2** - n aa - p ax r - t uw 1 n/ | dissimilarity  /d ih - s ih **2**- m ax -  l eh 1 - r ax - t iy/ | workforce /w er 1 r k - f ao **2** r s/ | The Speech service phone set puts stress after the vowel of the sub-stressed syllable. |

#### Vowels for English

| `sapi` | `ipa` | VisemeID | Example&nbsp;1 | Example&nbsp;2 | Example&nbsp;3 |
| --- | --- | --- | --- | --- | --- |
| iy | `i` | 6 | **ea**t | f**ee**l | vall**ey** |
| ih | `ɪ` | 6 | **i**f | f**i**ll |  |
| ey | `eɪ` | 4,6 | **a**te | g**a**te | d**ay** |
| eh | `ɛ` | 4 | **e**very | p**e**t | m**eh** (rare word-final) |
| ae | `æ` | 1 | **a**ctive | c**a**t | n**ah** (rare word-final) |
| aa | `ɑ` | 2 | **o**bstinate | p**o**ppy | r**ah** (rare word-final) |
| ao | `ɔ` | 3 | **o**range | c**au**se | Ut**ah** |
| uh | `ʊ` | 4 | b**oo**k |  |  |
| ow | `oʊ` | 8,4 | **o**ld | cl**o**ne | g**o** |
| uw | `u` | 7 | **U**ber | b**oo**st | t**oo** |
| ah | `ʌ` | 1 | **u**ncle | c**u**t |  |
| ay | `aɪ` | 11 | **i**ce | b**i**te | fl**y** |
| aw | `aʊ` | 9 | **ou**t | s**ou**th | c**ow** |
| oy | `ɔɪ` | 10 | **oi**l | j**oi**n | t**oy** |
| y uw | `ju` | 6,7 | **Yu**ma | h**u**man | f**ew** |
| ax | `ə` | 1 | **a**go | wom**a**n | are**a** |

#### R-colored vowels for English

| `sapi` | `ipa` | VisemeID | Example&nbsp;1 | Example&nbsp;2 | Example&nbsp;3 |
| --- | --- | --- | --- | --- | --- |
| ih r | `ɪɹ` | 6,13 | **ear**s | t**ir**amisu | n**ear** |
| eh r | `ɛɹ` | 4,13 | **air**plane | app**ar**ently | sc**ar**e |
| uh r | `ʊɹ` | 4,13 |  |  | c**ur**e |
| ay r | `aɪɹ` | 11,13 | **Ire**land | f**ir**eplace | ch**oir** |
| aw r | `aʊɹ` | 9,13 | **hour**s | p**ower**ful | s**our** |
| ao r | `ɔɹ` | 3,13 | **or**ange | m**or**al | s**oar** |
| aa r | `ɑɹ` | 2,13 | **ar**tist | st**ar**t | c**ar** |
| er r | `ɝ` | 5 | **ear**th | b**ir**d | f**ur** |
| ax r | `ɚ` | 1 |  | all**er**gy | supp**er** |

#### Semivowels for English

| `sapi` | `ipa` | VisemeID | Example&nbsp;1 | Example&nbsp;2 | Example&nbsp;3 |
| --- | --- | --- | --- | --- | --- |
| w | `w` | 7 | **w**ith, s**ue**de | al**w**ays |  |
| y | `j` | 6 | **y**ard, f**e**w | on**i**on |  |

#### Aspirated oral stops for English

| `sapi` | `ipa` | VisemeID | Example&nbsp;1 | Example&nbsp;2 | Example&nbsp;3 |
| --- | --- | --- | --- | --- | --- |
| p | `p` | 21 | **p**ut | ha**pp**en | fla**p** |
| b | `b` | 21 | **b**ig | num**b**er | cra**b** |
| t | `t` | 19 | **t**alk | capi**t**al | sough**t** |
| d | `d` | 19 | **d**ig | ran**d**om | ro**d** |
| k | `k` | 20 | **c**ut | sla**ck**er | Ira**q** |
| g | `g` | 20 | **g**o | a**g**o | dra**g** |

#### Nasal stops for English

| `sapi` | `ipa` | VisemeID | Example&nbsp;1 | Example&nbsp;2 | Example&nbsp;3 |
| --- | --- | --- | --- | --- | --- |
| m | `m` | 21 | **m**at, s**m**ash | ca**m**era | roo**m** |
| n | `n` | 19 | **n**o, s**n**ow | te**n**t | chicke**n** |
| ng | `ŋ` | 20 |  | li**n**k | si**ng** |

#### Fricatives for English

| `sapi` | `ipa` | VisemeID | Example&nbsp;1 | Example&nbsp;2 | Example&nbsp;3 |
| --- | --- | --- | --- | --- | --- |
| f | `f` | 18 | **f**ork | le**f**t | hal**f** |
| v | `v` | 18 | **v**alue | e**v**ent | lo**v**e |
| th | `θ` | 19 | **th**in | empa**th**y | mon**th** |
| dh | `ð` | 17 | **th**en | mo**th**er | smoo**th** |
| s | `s` | 15 | **s**it | ri**s**k | fact**s** |
| z | `z` | 15 | **z**ap | bu**s**y | kid**s** |
| sh | `ʃ` | 16 | **sh**e | abbrevia**ti**on | ru**sh** |
| zh | `ʒ` | 16 | **J**acques | plea**s**ure | gara**g**e |
| h | `h` | 12 | **h**elp | en**h**ance | a-**h**a! |

#### Affricates for English

| `sapi` | `ipa` | VisemeID | Example&nbsp;1 | Example&nbsp;2 | Example&nbsp;3 |
| --- | --- | --- | --- | --- | --- |
| ch | `tʃ` | 19,16 | **ch**in | fu**t**ure | atta**ch** |
| jh | `dʒ` | 19,16 | **j**oy | ori**g**inal | oran**g**e |

#### Approximants for English

| `sapi` | `ipa` | VisemeID | Example&nbsp;1 | Example&nbsp;2 | Example&nbsp;3 |
| --- | --- | --- | --- | --- | --- |
| l | `l` | 14 | **l**id, g**l**ad | pa**l**ace | chi**ll** |
| r | `ɹ` | 13 | **r**ed, b**r**ing | bo**rr**ow | ta**r** |

> **Note:**
> `en-CA` locale doesn't support SAPI phones.


## es-ES

### Vowels for es-ES

| `sapi` | `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- | --- |
| a | `a` | 2 | **a**lto | c**a**ntar | cas**a** |
| i | `i` | 6 | **i**bérica | av**i**spa | tax**i** |
| e | `e` | 4 | **e**lefante | at**e**nto | elefant**e** |
| o | `o` | 8 | **o**caso | enc**o**ntrar | ocas**o** |
| u | `u` | 7 | **u**sted | p**u**nta | Juanl**u** |

### Consonant for es-ES

| `sapi` | `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- | --- |
| b | `b` | 21 | **b**aobab | cam**b**io | am**b** |
|  | `β` | 21 |  | bao**b**ab | baoba**b** |
| ch | `t͡ʃ` | 19,16 | **ch**eque | co**ch**e | Marraque**ch** |
| d | `d` | 19 | **d**edo | can**d**ado | portlan**d** |
|  | `ð` | 17 |  | de**d**o | verda**d** |
| f | `f` | 18 | **f**ácil | ele**f**ante | pu**f** |
| g | `g` | 20 | **g**anga | gan**g**a | dópin**g** |
|  | `ɣ` | 20 |  | a**g**ua | tuare**g** |
| j | `j` | 6 | **i**odo | cal**i**ente | re**y** |
| jj | `j͡j` | 6,6 |  | vi**ll**a |  |
| k | `k` | 20 | **c**oche | bo**c**a | titáni**c** |
| l | `l` | 14 | **l**ápiz | a**l**a | corde**l** |
| ll | `ʎ` | 14 | **ll**ave | con**ll**evar |  |
| m | `m` | 21 | **m**order | a**m**ar | álbu**m** |
| n | `n` | 19 | **n**ada | ce**n**a | rató**n** |
| nj | `ɲ` | 19 | **ñ**aña | ara**ñ**azo |  |
| p | `p` | 21 | **p**oca | to**p**o | sto**p** |
| r | `ɾ` | 19 |  | ca**r**a | abri**r** |
| rr | `r` | 13 | **r**adio | co**rr**e | pu**rr** |
| s | `s` | 15 | **s**aco | va**s**o | pelo**s** |
| t | `t` | 19 | **t**oldo | a**t**ar | disque**t** |
| th | `θ` | 19 | **z**ebra | a**z**ul | lápi**z** |
| w | `w` | 7 | h**u**eso | ag**u**a | gua**u** |
| x | `x` | 12 | **j**ota | a**j**o | relo**j** |

> **Tip:**
> The `es-ES` Speech service phone set doesn't support the following Spanish IPA: `β`, `ð`, and `ɣ`. If they're needed, consider using the IPA directly.


## es-MX

#### Vowels for es-MX

| `ipa` | VisemeID | Example&nbsp;1 | Example&nbsp;2 | Example&nbsp;3 |
| --- | --- | --- | --- | --- |
| `ɑ` | 2 | **a**zúcar | tom**a**te | rop**a** |
| `e` | 4 | **e**so | rem**e**ro | am**é** |
| `i` | 6 | h**i**lo | liqu**i**do | ol**í** |
| `o` | 8 | h**o**gar | ol**o**te | cas**o** |
| `u` | 7 | **u**no | ning**u**no | tab**ú** |

#### Consonants for es-MX

| `ipa` | VisemeID | Example&nbsp;1 | Example&nbsp;2 | Example&nbsp;3 |
| --- | --- | --- | --- | --- |
| `b` | 21 | **b**ote |  |  |
| `β` | 21 | ór**b**ita | envol**v**ente |  |
| `t͡ʃ` | 19,16 | **ch**ico | ha**ch**a |  |
| `d` | 19 | **d**átil |  |  |
| `ð` | 17 | or**d**en | o**d**a |  |
| `f` | 18 | **f**oco | o**f**icina |  |
| `g` | 20 | **g**ajo |  |  |
| `ɣ` | 20 | a**g**ua | ho**gu**era |  |
| `j` | 6 | **i**odo | cal**i**ente | re**y** |
| `j͡j` | 6,6 |  | o**ll**a |  |
| `k` | 20 | **c**asa | á**c**aro |  |
| `l` | 14 | **l**oco | a**l**a |  |
| `ʎ` | 14 | **ll**ave | en**y**ugo |  |
| `m` | 21 | **m**ata | a**m**ar |  |
| `n` | 19 | **n**ada | a**n**o |  |
| `ɲ` | 19 | **ñ**oño | a**ñ**o |  |
| `p` | 21 | **p**apa | pa**p**a |  |
| `ɾ` | 19 |  | a**r**o |  |
| `r` | 13 | **r**ojo | pe**rr**o |  |
| `s` | 15 | **s**illa | a**s**a |  |
| `t` | 19 | **t**omate |  | sof**t** |
| `w` | 7 | h**u**evo |  |  |
| `x` | 12 | **j**arra | ho**j**a |  |


## fi-FI

### Vowels for fi-FI

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `ɑ` | 2 | **a**vautuu | vaihtuv**a**n | pout**a** |
| `ɑ͡i` | 2,6 | **ai**ka | v**ai**htuu | lauant**ai** |
| `ɑ͡u` | 2,7 | **au**ra | uloskirj**au**du | Pass**au** |
| `ɑː` | 2 | **ay**-väen | neutr**aa**li | pout**aa** |
| `æ` | 1 | **ä**veriäs | öljyj**ä**tin | pöyt**ä** |
| `æ͡i` | 1,6 | **äi**ti | iäkk**äi**den | t**äi** |
| `æ͡y` | 1,4 | **äy**rin | t**äy**tyy | k**äy** |
| `æː` | 1 | **ää**riryhmiä | h**ää**det**ää**n | päiv**ää** |
| `e` | 4 | **e**nköhän | t**e**rve | m**e** |
| `e͡i` | 4,6 | **ei** | vaiht**ei**ta | h**ei** |
| `ø` | 1 | **ö**ljyalan | ulkonä**ö**n | tiedänk**ö** |
| `ø͡i` | 1,6 | **öi**sin | t**öi**tä | viittil**öi** |
| `ø͡y` | 1,4 | **öy**lätti | p**öy**tä |  |
| `øː` | 1 | **Öö**lanti | ulkoministeri**öö**n | Bod**ø** |
| `e͡u` | 4,7 | **eu**rot | kyläs**eu**ra | l**eu** |
| `e͡y` | 4,4 | **Ey**sturoy | kesk**ey**tyä |  |
| `eː` | 4 | **ee**sti | kyljell**ee**n | aiheuttan**ee** |
| `i` | 6 | **i**äkästä | v**i**ha | Berliin**i** |
| `i͡e` | 6,4 | **ie**ntaskun | k**ie**li | l**ie** |
| `i͡u` | 6,7 |  | v**iu**lu |  |
| `i͡y` | 6,4 |  | vihk**iy**tynyt |  |
| `iː` | 6 | **Ii**da | s**ii**ka | solm**ii** |
| `o` | 8 | **o**ksa | asuintal**o**ja | spekulaati**o** |
| `o͡i` | 8,6 | **oi**via | k**oi**ttaa | spekul**oi** |
| `o͡u` | 8,7 | **ou**to | autok**ou**lu | wind**ow** |
| `oː` | 8 | **o**k | k**oo**staa | y**o** |
| `u` | 7 | **u**foista | Bärl**u**nd | jätemaks**u** |
| `u͡i` | 7,6 | **ui** | m**ui**ta | epäonnist**ui** |
| `u͡o` | 7,8 | **Uo**levi | S**uo**mi | Hilav**uo** |
| `uː` | 7 | **u**rl | innokk**uu**s | kiikk**uu** |
| `y` | 4 | **y**din | ök**y**rikas | kes**y** |
| `y͡ø` | 4,1 | **yö** | t**yö**tä | järjestöt**yö** |
| `y͡i` | 4,6 | **Yi**changin | s**yi**tä | järjestäyt**yi** |
| `yː` | 4 | **y**o | r**yy**ppy | iskeyt**yy** |

### Consonant for fi-FI

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `b` | 21 | **b**aareissa | Ur**b**an | Jako**b** |
| `d` | 19 | **d**ementia | la**d**ot | jugen**d** |
| `f` | 18 | **f**ace | a**f**gaani | Al**f** |
| `g` | 20 | **g**aalassa | fa**g**otti | Aslö**g** |
| `h` | 12 | **h**a | astuma**h**an | Dietri**ch** |
| `j` | 6 | **j**ää | öl**j**yä | Ka**j** |
| `k` | 20 | **K**ajaanin | epätar**k**at | idylli**c** |
| `l` | 14 | **L**yytikäinen | eurosete**l**eiden | mai**l** |
| `m` | 21 | **m**ä | roi**m**at | spä**m** |
| `n` | 19 | **n**ää | baa**n**alle | iäkkää**n** |
| `ŋ` | 20 |  | nähdää**nk**in | planni**ng** |
| `p` | 21 | **p**a | e**p**äsuoria | backu**p** |
| `r` | 13 | **r**isteilyn | baa**r**i | Playe**r** |
| `s` | 15 | **s**ä | öljyi**s**iä | Bärnä**s** |
| `ʃ` | 16 | **Sch**auman | Banglade**sh**in | ca**sh** |
| `t` | 19 | **t**ä | euros**t**a | epäsuora**t** |
| `ʋ` | 18 | **v**aadi | innosta**v**a | Kie**v** |


## fr-FR/fr-CA/fr-CH/fr-BE

### Suprasegmentals for French

The Speech service phone set puts stress after the vowel of the stressed syllable. However, the `fr-FR` Speech service phone set doesn't support the IPA substress 'ˌ'. If the IPA substress is needed, you should use the IPA directly.

### Vowels for French

| `sapi` | `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- | --- |
| ae | `a` | 2 | **a**rbre | p**a**tte | ir**a** |
| af | `ɑ` | 2 |  | p**â**te | p**a**s |
| an | `ɑ̃` | 2 | **en**fant | enf**an**t | t**em**ps |
| ax | `ə` | 1 |  | p**e**tite | l**e** |
| eh | `ɛ` | 4 | **e**lle | p**e**rdu | ét**ai**t |
| eu | `ø` | 1 | **œu**fs | cr**eu**ser | qu**eu** |
| ey | `e` | 4 | **é**mu | cr**é**tin | ôt**é** |
| in | `ɛ̃` | 4 | **im**portant | pe**in**ture | mat**in** |
| iy | `i` | 6 | **i**dée | pet**i**te | am**i** |
| oe | `œ` | 4 | **œu**f | p**eu**r |  |
| oh | `ɔ` | 3 | **o**bstacle | c**o**rps |  |
| on | `ɔ̃` | 3 | **on**ze | r**on**deur | b**on** |
| ow | `o` | 8 | **au**diteur | b**eau**coup | p**ô** |
| un | `œ̃` | 4 | **un** | l**un**di | br**un** |
| uw | `u` | 7 | **ou**trage | intr**ou**vable | **ou** |
| uy | `y` | 4 | **u**ne | p**u**nir | él**u** |

### Consonant for French

| `sapi` | `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- | --- |
| b | `b` | 21 | **b**ête | ha**b**ille | ro**b**e |
| d | `d` | 19 | **d**ire | ron**d**eur | chau**d**e |
| f | `f` | 18 | **f**emme | su**ff**ixe | bo**f** |
| g | `g` | 20 | **g**auche | é**g**ale | ba**gu**e |
| gn | `ɲ` | 19 |  |  | pei**gn**e |
| hw | `ɥ` | 7 | **hu**ile | n**u**ire |  |
| k | `k` | 20 | **c**arte | é**c**aille | be**c** |
| l | `l` | 14 | **l**ong | é**l**ire | ba**l** |
| m | `m` | 21 | **m**adame | ai**m**er | po**mm**e |
| n | `n` | 19 | **n**ous | te**n**ir | bo**nn**e |
| ng | `ŋ` | 20 |  |  | parki**ng** |
| p | `p` | 21 | **p**atte | re**p**as | ca**p** |
| r | `ʁ` | 13 | **r**at | cha**r**iot | senti**r** |
| s | `s` | 15 | **s**ourir | a**ss**ez | pa**ss**e |
| sh | `ʃ` | 16 | **ch**anter | ma**ch**ine | po**ch**e |
| t | `t` | 19 | **t**ête | ô**t**er | ne**t** |
| v | `v` | 18 | **v**ent | in**v**enter | rê**v**e |
| w | `w` | 7 | **ou**i | f**ou**ine |  |
| y | `j` | 6 | **y**od | p**i**étiner | Marse**ille** |
| z | `z` | 15 | **z**éro | rai**s**onner | ro**s**e |
|  | `n‿` | 19 |  |  | u**n** arbre |
|  | `t‿` | 19 |  |  | quan**d** |
|  | `z‿` | 15 |  |  | corp**s** |

<a id="fr-1"></a>
**1** *Only for some foreign words*.

> **Tip:**
> The `fr-FR` Speech service phone set doesn't support the following French liasions, `n‿`, `t‿`, and `z‿`. If they are needed, you should consider using the IPA directly.

> **Note:**
> `fr-CA`, `fr-CH` locales don't support SAPI phones now.


## he-IL

### Vowels for he-IL

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `i` | 6 | איש | סיר | כלי |
| `e` | 4 | אש | כן | פה |
| `a` | 2 | אף | קו | מה |
| `o` | 8 | אות | יום | לא |
| `u` | 7 | עוגה | כרוב | הגיעו |

### Consonant for he-IL

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `p` | 21 | **פ**ס | קלי**פ**ה | טי**פ** |
| `b` | 21 | **ב**ד | ס**ב**א | פא**ב** |
| `t` | 19 | **ט**יפה | מ**ת**נה | חו**ט** |
| `d` | 19 | **ד**בר | א**ד**ום | תמי**ד** |
| `k` | 20 | **כ**תב | בו**ק**ר | חל**ק** |
| `g` | 20 | **ג**דול | א**ג**ף | ד**ג** |
| `ʔ` | 19 | **אָ**בִיב | שי**ע**ור |  |
| `f` | 18 | **פ**ילטר | סו**פ**ר | סו**ף** |
| `v` | 18 | **ו**ילון | כ**ב**ד | ל**ב** |
| `s` | 15 | **שׂ**מלה | כ**ס**ף | פנ**ס** |
| `z` | 15 | **ז**אב | מ**ז**ל | אגו**ז** |
| `ʃ` | 16 | **ש**ולחן | פ**ש**וט | כבי**ש** |
| `x` | 12 | **ח**תול | או**כ**ל | פר**ח** |
| `h` | 12 | **ה**ולך | ז**ה**ב | ב**הּ** |
| `t͡s` | 19,15 | **צ**ד | ע**צ**ם | מומל**ץ** |
| `m` | 21 | **מ**אוד | סי**מ**ן | חלו**ם** |
| `n` | 19 | **נ**פש | תי**נ**וק | אב**ן** |
| `l` | 14 | **ל**שון | מי**ל**ה | דג**ל** |
| `ʁ` | 13 | **ר**אשון | מו**ר**ה | חיבו**ר** |
| `j` | 6 | **י**לד | מצו**י**ן | כדא**י** |
| `ʒ` | 16 | <strong>ז'</strong>אנר | מ<strong>ִז'</strong>וֹר | ב<strong>ז'</strong> |
| `tʃ` | 19,16 | <strong>צָ'</strong>יפּ | קפו<strong>צ'</strong>ון | סנדווי<strong>ץ'</strong> |
| `dʒ` | 19,16 | <strong>ג'</strong>ונגל | פי<strong>ג'</strong>מה | קוט<strong>ג'</strong> |


## hr-HR

### Vowels for hr-HR

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `e` | 4 | **E**gipat | G**a**mes | drveć**e** |
| `eː` | 4 | **e**ri | brij**e**gom | de1taljn**e** |
| `i` | 6 | **i**spada | žel**i**mo | javnost**i** |
| `iː` | 6 | **i**ako | l**i**st | kompletn**i** |
| `u` | 7 | **u**bacio | konk**u**rentne | jedn**u** |
| `uː` | 7 | **U**na | f**u**nta | Y**u** |
| `a` | 2 | **a**meričke | kov**a**čić | kredit**a** |
| `aː` | 2 | **a**nđela | gr**a**dila | Divulj**a** |
| `o` | 8 | **o**aza | nan**o**si | d**o** |
| `oː` | 8 | **O**lgu | kisel**o**g | t**o** |

### Consonant for hr-HR

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `d` | 19 | **d**akle | evi**d**enciji | ko**d** |
| `v` | 18 | **v**olja | građe**v**inskog | imperati**v** |
| `s` | 15 | **s**abor | informi**s**anja | intere**s** |
| `t` | 19 | **t**ad | informira**t**i | ispi**t** |
| `n` | 19 | **n**a | že**n**e | jefti**n** |
| `l` | 14 | **l**ogor | konstatira**l**i | kapita**l** |
| `ʎ` | 14 | **lj**udski | košu**lj**u | kra**lj** |
| `t͡s` | 19,15 | **c**arina | krivi**c**e | prava**c** |
| `t͡ʃ` | 19,16 | **č**etvorica | kriti**č**an | osniva**č** |
| `j` | 6 | **j**ednostavan | ku**j**u | ova**j** |
| `x` | 12 | **h**rvatskog | ma**h**ala | ovakvi**h** |
| `z` | 15 | **z**nanstvenom | mehani**z**acije | prijela**z** |
| `ʒ` | 16 | **ž**albu | mlade**ž**i | crte**ž** |
| `r` | 13 | **r**ed | mo**r**aju | da**r** |
| `k` | 20 | **k**ažu | na**k**ani | dnevni**k** |
| `m` | 21 | **M**ađara | napadi**m**a | dobri**m** |
| `p` | 21 | **P**oljska | na**p**adnut | kam**p** |
| `g` | 20 | **g**ore | ne**g**ativna | kazneno**g** |
| `ʨ` | 16 | **ć**elija | neispla**ć**ene | mladi**ć** |
| `f` | 18 | **f**abula | nostri**f**ikaciji | še**f** |
| `b` | 21 | **B**elgija | o**b**a | suko**b** |
| `d͡ʒ` | 19,16 | **dž**empera | Ili**dž**e | Geor**ge** |
| `ɲ` | 19 | **nj**e | emitira**nj**a | stupa**nj** |
| `ʥ` | 16 | **đ**akovačkim | ga**đ**ati | vo**đ** |
| `ʃ` | 16 | **š**ef | sti**š**ati | Glava**š** |


## hu-HU

### Vowels for hu-HU

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `ø` | 1 | **ö**rdög | örd**ö**g | huszonkett**ö** |
| `øː` | 1 | **ő**k | önműköd**ő**en | öntöz**ő** |
| `a` | 2 |  | Schum**a**cher |  |
| `aː` | 2 | **á**rut | bizony**á**ra | burzsu**á** |
| `ɛ` | 4 | **e**lõzni | kisbér**e**sn**e**k | hogyn**e** |
| `eː` | 4 | **É**des | kom**é**dia | fölfel**é** |
| `i` | 6 | **i**degen | omn**i**buszok | kollégium**i** |
| `iː` | 6 | **í**gyen | áh**í**tat |  |
| `o` | 8 | **o**ldali | k**o**m**o**r | Fig**o** |
| `ɒ` | 2 | **a**tyját | olv**a**sni | Olg**a** |
| `oː` | 8 | **ó**lmot | hist**ó**riát | fénymásol**ó** |
| `u` | 7 | **u**gyanis | ez**u**tán | fal**u** |
| `uː` | 7 | **ú**rrá | fék**ú**t | szám**ú** |
| `y` | 4 | **ü**dítõt | áts**ü**tve | alsóbbrend**ü** |
| `yː` | 4 | **ű**rállomás | gépjárm**ű**vek | idej**ű** |

### Consonant for hu-HU

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `b` | 21 | **b**usz | hiá**b**a |  |
| `bː` | 21 |  | hasá**bb**urgonya | rövide**bb** |
| `d` | 19 | **d**évédé | fapa**d**os | szaporítaná**d** |
| `ɟ` | 16 | **gy**ártó | franciaá**gy**as | huszone**gy** |
| `dː` | 19 |  | Go**dd**ess | ha**dd** |
| `ɟː` | 16 |  | ebé**dj**én | ha**gyj** |
| `d͡ʒ` | 19,16 | **Dzs**ó | mene**dzs**elési | colle**ge** |
| `d͡ʒː` | 19,16 |  | Ba**ggi**o |  |
| `dz` | 19,15 | **dz**émsz | e**dz**õ | McDonal**ds** |
| `dzː` | 19,15 |  | e**ddz**eni |  |
| `f` | 18 | **f**igura | ko**f**a | gol**f** |
| `fː` | 18 |  | ko**ff**er | seri**ff** |
| `g` | 20 | **g**ondolom | számító**g**ép | rú**g** |
| `gː` | 20 |  | fa**gg**atta | fü**gg** |
| `h` | 12 | **h**it | ru**h**ában | a**h** |
| `hː` | 12 |  | e**hh**ez |  |
| `j` | 6 | **J**ános | o**ly**an | karé**j** |
| `ɲ` | 19 | **ny**akán | pecse**ny**ét | példá**ny** |
| `jː` | 6 | **Lj**eszkovai | majmo**lj**ák | á**llj** |
| `ɲː` | 19 |  | pihe**nj**en |  |
| `k` | 20 | **k**ofa | ruhá**k**at | ruhá**k** |
| `kː` | 20 |  | me**gk**ondult | ma**kk** |
| `l` | 14 | **l**ent | rú**l**a | evve**l** |
| `lː` | 14 |  | ko**ll**éga | á**ll** |
| `m` | 21 | **m**agyar | szá**m**ít | órá**m** |
| `mː` | 21 |  | anyá**mm**al | kilogra**mm** |
| `n` | 19 | **n**épies | szótla**n**ul | hisze**n** |
| `ŋ` | 20 |  | a**n**gel |  |
| `nː` | 19 |  | o**nn**an | fe**nn** |
| `p` | 21 | **P**ál | ta**p**ogatódzó | számítógé**p** |
| `pː` | 21 |  | berö**pp**ent | befejezéseké**pp** |
| `r` | 13 | **r**ág | ó**r**aá**r**a | órako**r** |
| `rː` | 13 |  | ame**rr**e | fo**rr** |
| `s` | 15 | **sz**ámára | fölve**sz**i | fõlmé**sz** |
| `ʃ` | 16 | **s**aját | förtelme**s**en | fõorvo**s** |
| `sː` | 15 |  | hala**ssz**uk | hazajö**ssz** |
| `ʃː` | 16 |  | háza**ss**ága | kere**ss** |
| `t` | 19 | **T**ata | rú**t**ak | hi**t** |
| `c` | 16 |  | e**gy**házmegye | dir**ty** |
| `tː` | 19 |  | hi**tt**e | vágodo**tt** |
| `cː` | 16 |  | bá**tyj**a | Pre**tty** |
| `t͡s` | 19,15 | **c**íme | bi**c**iklis | huszonnyol**c** |
| `t͡ʃ` | 19,16 | **cs**igán | húgo**cs**kám | Gregori**cs** |
| `t͡sː` | 19,15 |  | já**tsz**ad | já**tsz** |
| `t͡ʃː` | 19,16 |  | bará**ts**ágos | futballme**ccs** |
| `v` | 18 | **v**arr | Olí**v**ia | Dönö**v** |
| `vː` | 18 |  | e**vv**el |  |
| `x` | 12 | **h**rabovszki | i**h**letével |  |
| `ɰ` | 20 |  | alap**j**án | Kap**j** |
| `z` | 15 | **z**úgást | csi**z**mám | csimpán**z** |
| `ʒ` | 16 | **zs**ûrivel | félmá**zs**ás | Balá**zs** |
| `zː` | 15 |  | hú**zz**a | féke**zz** |
| `ʒː` | 16 |  | gará**zzs**al |  |


## id-ID

### Vowels for id-ID

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `ə` | 1 |  | b**e**nar | komit**e** |
| `a` | 2 |  | b**a**b**a**t | engg**a** |
| `a͡i` | 2,6 | **ai**r | r**ai**kage | pant**ai** |
| `a͡ʊ` | 2,4 | **au**rat | at**au**pun | pis**au** |
| `e` | 4 | **e**nergi | f**e**ri | temp**e** |
| `ɛ` | 4 | **e**nrique | nen**e**k |  |
| `ɪ` | 6 | **i**ndah | yak**i**n | k**ey** |
| `i` | 6 | **i**rama | b**i**ar | deflas**i** |
| `ɔ` | 3 | **o**ff | es**o**k | l**aw** |
| `o` | 8 | **o**bat | b**o**bot | domin**o** |
| `ɔ͡i` | 3,6 |  | reb**oi**sasi | sepoi-sep**oi** |
| `u` | 7 | **u**mur | b**u**ah | lin**u** |
| `ʊ` | 4 |  | dud**u**k |  |

### Consonant for id-ID

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `ʔ` | 19 | **a**mores | m**aa**f | penc**a**k |
| `b` | 21 | **b**abat | ne**b**ak | dishu**b** |
| `d` | 19 | **d**eder | pe**d**ang | clou**d** |
| `d͡ʒ` | 19,16 | **ja**rum | pen**ja**jah | buru**j** |
| `f` | 18 | **f**lat | a**v**ersi | geniti**f** |
| `g` | 20 | **g**abus | da**g**el | hambur**g** |
| `h` | 12 | **h**ama | tu**h**an | enta**h** |
| `ɲ` | 19 | **ny**aman | me**ny**uci |  |
| `j` | 6 | **y**akin | **j**aya | badu**y** |
| `k` | 20 | **k**etan | a**k**u | polse**k** |
| `l` | 14 | **l**abu | ta**l**enta | vita**l** |
| `m` | 21 | **m**asuk | na**m**anya | sino**m** |
| `n` | 19 | **n**ada | seku**n**ar | proto**n** |
| `ŋ` | 20 | **ng**engat | kena**ng**a | aba**ng** |
| `p` | 21 | **p**acar | ham**p**a | caka**p** |
| `r` | 13 | **r**abu | diku**r**ang | nasa**r** |
| `s` | 15 | **s**abuk | tete**s**an | jeniu**s** |
| `ʃ` | 16 | **sy**arat | i**sy**arat | briti**sh** |
| `t` | 19 | **t**abir | adap**t**asi | dura**t** |
| `t͡ʃ` | 19,16 | **c**akap | di**c**ari |  |
| `w` | 7 | **w**ajah | yu**w**ana |  |
| `x` | 12 | **kh**usuk | a**kh**irnya | barza**kh** |
| `z` | 15 | **z**akat | pe**z**ina | mahfu**z** |


## it-IT

### Vowels for it-IT

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `a` | 2 | **a**mo | s**a**no | scort**a** |
| `ai` | 2,6 | **ai**cs | abb**ai**no | m**ai** |
| `au` | 2,7 | **au**dio | r**au**co | b**au** |
| `e` | 4 | **e**roico | v**e**nti | sapor**e** |
| `ɛ` | 4 | **e**lle | avv**e**nto | lacch**è** |
| `ɛj` | 4,6 | **ei**ra | em**ai**l | l**ei** |
| `ɛu` | 4,7 | **eu**ro | n**eu**ro |  |
| `ei` | 4,6 |  | as**ei**tà | scultor**ei** |
| `eu` | 4,7 | **eu**ropeo | f**eu**dale |  |
| `i` | 6 | **i**taliano | v**i**no | sol**i** |
| `u` | 7 | **u**nico | l**u**na | zeb**ù** |
| `o` | 8 | **o**besità | stra**o**rdinari | amic**o** |
| `ɔ` | 3 | **o**tto | b**o**tte | per**ò** |
| `ɔj` | 3,6 |  | oppi**oi**di |  |
| `oi` | 8,6 | **oi**bò | intellettual**oi**de | Gameb**oy** |
| `ou` | 8,7 |  | sh**ow** | talksh**ow** |

### Consonant for it-IT

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `b` | 21 | **b**ene | e**b**anista | Euroclu**b** |
| `bː` | 21 |  | go**bb**a |  |
| `ʧ` | 16 | **c**enare | a**c**ido | fren**ch** |
| `tʃː` | 19,16 |  | bra**cc**io |  |
| `kː` | 20 |  | pa**cc**o | Innsbru**ck** |
| `d` | 19 | **d**ente | a**d**orare | interlan**d** |
| `dː` | 19 |  | ca**dd**e |  |
| `ʣ` | 15 | **z**ero | or**z**o |  |
| `ʣː` | 15 |  | me**zz**o |  |
| `f` | 18 | **f**ame | a**f**a | ale**f** |
| `fː` | 18 |  | be**ff**a | blu**ff** |
| `ʤ` | 16 | **g**ente | a**g**ire | bei**ge** |
| `ʤː` | 16 |  | o**gg**i |  |
| `g` | 20 | **g**ara | al**gh**e | smo**g** |
| `gː` | 20 |  | fu**gg**a | Zue**gg** |
| `ʎ` | 14 | **gl**i | ammira**gl**i |  |
| `ʎː` | 14 |  | fo**gl**ia |  |
| `ɲː` | 19 |  | ba**gn**o |  |
| `ɲ` | 19 | **gn**occo | padri**gn**o | Montai**gne** |
| `j` | 6 | **i**eri | p**i**ede | freewif**i** |
| `k` | 20 | **c**aro | an**ch**e | ti**c** |
| `l` | 14 | **l**ana | a**l**ato | co**l** |
| `lː` | 14 |  | co**ll**a | fu**ll** |
| `m` | 21 | **m**ano | a**m**are | Ada**m** |
| `mː` | 21 |  | gra**mm**o |  |
| `n` | 19 | **n**aso | la**n**a | no**n** |
| `nː` | 19 |  | pa**nn**a |  |
| `p` | 21 | **p**ane | e**p**ico | sto**p** |
| `pː` | 21 |  | co**pp**a |  |
| `ɾ` | 19 | **r**ana | moto**r**e | pe**r** |
| `rː` | 13 |  | ca**rr**o | Sta**rr** |
| `s` | 15 | **s**ano | ca**s**cata | lapi**s** |
| `sː` | 15 |  | ca**ss**a | cordle**ss** |
| `ʃ` | 16 | **sc**emo | Gram**sc**i | sla**sh** |
| `ʃː` | 16 |  | a**sc**ia | fich**es** |
| `t` | 19 | **t**ana | e**t**erno | al**t** |
| `tː` | 19 |  | zi**tt**o |  |
| `ʦ` | 15 | **ts**unami | turbolen**z**a | subtes**ts** |
| `ʦː` | 15 |  | bo**zz**a |  |
| `v` | 18 | **v**ento | a**v**aro | Asimo**v** |
| `vː` | 18 |  | be**vv**i |  |
| `w` | 7 | **u**ovo | d**u**omo | Marlo**we** |
| `z` | 15 | **s**modato | ca**s**a | election**s** |


## ja-JP

The Speech service phone set for `ja-JP` is based on the native phone [Kana](https://en.wikipedia.org/wiki/Kana) set.

Please see the following tables for kana and corresponding viseme in parentheses.

### Katakana for ja-JP

| Katakana | ア | イ | ウ | エ | オ |
| --- | --- | --- | --- | --- | --- |
| **ア** | ア (19,2) | イ (6,6) | ウ (7,6) | エ (19,4) | オ (19,8) |
| **カ** | カ (20,2) | キ (20,6) | ク (20,6) | ケ (20,4) | コ (20,8) |
| **サ** | サ (15,2) | シ (16,6) | ス (15,6) | セ (15,4) | ソ (15,8) |
| **タ** | タ (19,2) | チ (16,6) | ツ (19,15,6) | テ (19,4) | ト (19,8) |
| **ナ** | ナ (19,2) | ニ (19,6) | ヌ (19,6) | ネ (19,4) | ノ (19,8) |
| **ハ** | ハ (12,2) | ヒ (12,6) | フ (12,6) | ヘ (12,4) | ホ (12,8) |
| **マ** | マ (21,2) | ミ (21,6) | ム (21,6) | メ (21,4) | モ (21,8) |
| **ヤ** | ヤ (6,2) | n/a | ユ (6,6) | n/a | ヨ (6,8) |
| **ラ** | ラ (19,2) | リ (19,6) | ル (19,6) | レ (19,4) | ロ (19,8) |
| **ワ** | ワ (7,2) | n/a | n/a | n/a | ヲ (19,8) |
|  | ン (19) | n/a | n/a | n/a | n/a |

### Katakana diacritics for ja-JP

| Katakana diacritics | ア | イ | ウ | エ | オ |
| --- | --- | --- | --- | --- | --- |
| **ガ** | ガ (20,2) | ギ (20,6) | グ (20,6) | ゲ (20,4) | ゴ (20,8) |
| **ザ** | ザ (15,2) | ジ (16,6) | ズ (15,6) | ゼ (15,4) | ゾ (15,8) |
| **ダ** | ダ (19,2) | ヂ (16,6) | ヅ (15,6) | デ (19,4) | ド (19,8) |
| **バ** | バ (21,2) | ビ (21,6) | ブ (21,6) | ベ (21,4) | ボ (21,8) |
| **パ** | パ (21,2) | ピ (21,6) | プ (21,6) | ペ (21,4) | ポ (21,8) |

### Katakana Yōon for ja-JP

| Katakana Yōon | ャ | ュ | ョ |
| --- | :---: | --- | --- |
| **キ** | キャ(20,6,2) | キュ(20,6,6) | キョ(20,6,8) |
| **シ** | シャ(16,6,2) | シュ(16,6,6) | ショ(16,6,8) |
| **チ** | チャ(16,6,2) | チュ(16,6,6) | チョ(16,6,8) |
| **ニ** | ニャ(19,6,2) | ニュ(19,6,6) | ニョ(19,6,8) |
| **ヒ** | ヒャ(12,6,2) | ヒュ(12,6,6) | ヒョ(12,6,8) |
| **ミ** | ミャ(21,6,2) | ミュ(21,6,6) | ミョ(21,6,8) |
| **リ** | リャ(19,6,2) | リュ(19,6,6) | リョ(19,6,8) |
| **ギ** | ギャ(20,6,2) | ギュ(20,6,6) | ギョ(20,6,8) |
| **ジ** | ジャ(16,6,2) | ジュ(16,6,6) | ジョ(16,6,8) |
| **ヂ** | ヂャ(16,6,2) | ヂュ(16,6,6) | ヂョ(16,6,8) |
| **ビ** | ビャ(21,6,2) | ビュ(21,6,6) | ビョ(21,6,8) |
| **ピ** | ピャ(21,6,2) | ピュ(21,6,6) | ピョ(21,6,8) |

#### Examples for ja-JP

| Character | `sapi` | `ipa` |
| --- | --- | --- |
| 合成 | ゴ'ウセ | goˈwɯseji |
| 所有者 | ショュ'ウ?ャ | ɕjojɯˈwɯɕja |
| 最適化 | サィテキカ+ | sajitecikaˌ |


## ko-KR

### Vowels for ko-KR

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `a` | 2 | 아가씨 | 강 | 하다 |
| `ɛ` | 4 | 애국가 | 백 | 세번째 |
| `e` | 4 | 에너지 | 가겠구나 | 가게 |
| `ɯ` | 6 | 으레 | 으쓱해 | 가스 |
| `i` | 6 | 이거 | 아직까지 | 어미 |
| `ʌ` | 1 | 어미 | 차선변경 | 가시겠어 |
| `o` | 8 | 오래 | 의혹을 | 차고 |
| `u` | 7 | 우간다 | 은둔자의 | 가시나무 |
| `ɰ͡i` | 20,6 | 의자 | 배추흰나비가 | 가요계의 |
| `ø` | 1 | 외가댁 | 배치된다 | 하되 |
| `w͡a` | 7,2 | 와글와글 | 가치관과 | 가지와 |
| `w͡ɛ` | 7,4 | 왜관 | 호쾌가 | 안돼 |
| `w͡e` | 7,4 | 웨딩드레스 |  |  |
| `w͡i` | 7,6 | 위계적 | 구조위원회가 | 한가위 |
| `w͡ʌ` | 7,1 | 워낙 | 가까워서 | 가까워 |
| `j͡a` | 6,2 | 야구 | 기술집약도가 | 끌려가야 |
| `j͡ɛ` | 6,4 | 얘가 | 가수얘기에요 |  |
| `j͡e` | 6,4 | 예감 | 적대관계가 | 의례 |
| `j͡ʌ` | 6,1 | 여가 | 감정평가사 | 이리하여 |
| `j͡o` | 6,8 | 요구가 | 사용중지 | 가거든요 |
| `j͡u` | 6,7 | 유가적 | 경제교류가 | 소유 |

### Consonant for ko-KR

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `b̥` | 21 | 바가 |  | 밥 |
| `p` | 21 | 빠른가 | 막부정부가 |  |
| `b` | 21 |  | 사범학교가 |  |
| `t͡ɕʰ` | 19,16 | 참가비는 | 아침과 |  |
| `d̥` | 19 | 동네가 |  | 바깥 |
| `t` | 19 | 따라가지 | 깍두기가 |  |
| `d` | 19 |  | 산도가 |  |
| `g̥` | 20 | 가죠 |  | 각 |
| `k` | 20 | 까마귀가 | 젖가락으로 |  |
| `g` | 20 |  | 단추가 |  |
| `h` | 12 |  | 손가락질하거나 |  |
| `ɦ` | 12 | 하기가 | 손가락질하며 |  |
| `d͡ʑ` | 19,16 |  | 손잡이가 |  |
| `d͡ʑ̥` | 19,16 | 자유가 |  |  |
| `t͡ɕ` | 19,16 | 짜가면서 | 손가락질할 |  |
| `kʰ` | 20 | 키가 | 아킬레스건 |  |
| `l` | 14 |  |  | 국가체제를 |
| `m` | 21 | 마다가스카르 | 통나무가 | 기침 |
| `n` | 19 | 나가서는 | 아느냐 | 따라가다보면 |
| `ŋ` | 20 |  | 강아지 | 한강 |
| `pʰ` | 21 | 파티가 | 아파트 |  |
| `ɾ` | 19 | 라디오가 | 아름답게 |  |
| `sʰ` | 15 | 사고가 | 아스팔트 |  |
| `s` | 15 | 쌍둥이가 | 멕시코가 |  |
| `tʰ` | 19 | 택시가 | 여타의 |  |


## ms-MY

### Vowels for ms-MY

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `i` | 6 | **i**bu | ikl**i**m | ahl**i** |
| `u` | 7 | **u**ang | b**u**ah | bah**u** |
| `ə` | 1 |  | k**e**rja | nasionalism**e** |
| `e` | 4 | **e**dar | aktr**e**s | ku**e** |
| `o` | 8 | **o**rang | angg**o**ta | pidat**o** |
| `a` | 2 | **a**njing | an**a**k | ad**a** |
| `a͡i` | 2,6 |  |  | cer**ai** |
| `au` | 2,7 | **au**to | ak**au**n | bak**au** |
| `oi` | 8,6 |  |  | amb**oi** |

### Consonant for ms-MY

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `p` | 21 | **p**ekat | seke**p**ing | caka**p** |
| `b` | 21 | **b**anjir | le**b**ih | jawa**b** |
| `t` | 19 | **t**idak | pe**t**a | siki**t** |
| `d` | 19 | **d**ekat | a**d**akah | aka**d** |
| `k` | 20 | **k**etat | a**k**ak | boo**k** |
| `g` | 20 | **g**abung | bo**g**el | dialo**g** |
| `ʔ` | 19 | **a**bang | kepercay**aa**n | leta**k** |
| `t͡ʃ` | 19,16 | **c**epat | ba**c**a |  |
| `d͡ʒ` | 19,16 | **j**abatan | a**j**a | kole**j** |
| `m` | 21 | **m**emang | la**m**an | mala**m** |
| `n` | 19 | **n**egeri | ta**n**am | tama**n** |
| `ɲ` | 19 | **ny**anyi | ta**ny**a |  |
| `ŋ` | 20 |  | ma**ng**ga | saya**ng** |
| `f` | 18 | **f**ilem | arti**f**ak | akti**f** |
| `v` | 18 | **v**aksin | akti**v**iti |  |
| `s` | 15 | **s**ahabat | ak**s**es | tumi**s** |
| `z` | 15 | **z**aman | la**z**at |  |
| `ʃ` | 16 | **sy**arikat | ber**sy**arat |  |
| `x` | 12 | **kh**abar | a**kh**ir | tari**kh** |
| `r` | 13 | **r**acun | me**r**ah | leba**r** |
| `h` | 12 | **h**ingga | adu**h**ai | bole**h** |
| `j` | 6 | **y**ang | a**y**ah |  |
| `w` | 7 | **w**alau | ba**w**ah |  |
| `l` | 14 | **l**idah | a**l**am | kati**l** |


## nb-NO

### Vowels for nb-NO

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `ɑ` | 2 | **a**nnonse | betr**a**kte | hopp**a** |
| `æ` | 1 | **e**rgre | Pal**e**rmo |  |
| `æː` | 1 | **æ**rlig | bel**æ**re | b**æ** |
| `ɑː` | 2 | **a**re | bet**a**le | bedr**a** |
| `ɛ` | 4 | **e**nergi | kad**e**tten | hopp**e** |
| `øː` | 1 | **ø**re | beh**ø**ve | adj**ø** |
| `eː` | 4 | **e**ner | ber**e**de | distr**e** |
| `ɪ` | 6 | **i**kke | setn**i**ngen | tax**i** |
| `iː` | 6 | **E**agle | bev**i**se | konditor**i** |
| `ɔ` | 3 | **å**tte | kontr**o**llen | alts**å** |
| `œ` | 4 | **ø**nske | bel**ø**nning | Moss**ø** |
| `oː` | 8 | **å**r | omr**å**de | beg**å** |
| `u` | 7 | **o**kse | øk**o**krim | eg**o** |
| `uː` | 7 | **o**rd | telef**o**nen | bidr**o** |
| `ʏ` | 7 | **y**tterst | ben**y**tte | All**y** |
| `ʉ` | 6 | **u**nder | for**u**ndret | jagg**u** |
| `ʉː` | 6 | **u**le | um**u**lig | intervj**u** |
| `yː` | 4 | **y**te | bel**y**se | parapl**y** |
| `æɪ` | 1,6 | **ei**endom** | utl**ei**de | snarv**ei** |
| `æʉ` | 1,6 | **au**ra | Lit**au**en | fort**au** |
| `ɑɪ` | 2,6 | **ai**bel** | Aserb**aj**dsjan | Dub**ai** |
| `œʏ` | 4,7 | **øy**er | ableg**øy**er | syltet**øy** |
| `ɔʏ` | 3,7 | **Oi**lers | b**oi**kotten | konv**oi** |
| `ʉɪ` | 6,6 |  | Br**ui**ns | Mits**ui** |

### Consonant for nb-NO

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `p` | 21 | **p**il | a**p**e | la**pp** |
| `t` | 19 | **t**all | ma**tt**e | ma**tt** |
| `k` | 20 | **k**all | ja**kk**e | ta**kk** |
| `b` | 21 | **b**il | klu**bb**e | lo**bb** |
| `d` | 19 | **d**al | li**d**e | ga**dd** |
| `g` | 20 | **g**ås | sa**g**en | la**g** |
| `f` | 18 | **f**il | kla**ff**e | kla**ff** |
| `h` | 12 | **h**all | be**h**olde |  |
| `s` | 15 | **s**il | vi**s**e | vi**ss** |
| `ʂ` | 15 | **sj**u | ma**sk**in | du**sj** |
| `ç` | 12 | **tj**ukk | be**kj**enne | Kor**ch** |
| `v` | 18 | **v**år | le**v**e | lo**v** |
| `m` | 21 | **m**il | ko**mm**e | la**m** |
| `n` | 19 | **n**ål | mi**nn**es | søv**n** |
| `ŋ` | 20 |  | pe**ng**er | la**ng** |
| `l` | 14 | **l**øs | må**l**e | ta**l** |
| `r` | 13 | **r**is | ka**rr**e | tø**rr** |
| `j` | 6 | **j**ag | ut**j**evne | detal**j** |
| `ɖ` | 19 |  | bu**rd**e | fe**rd** |
| `ɭ` | 14 |  | fa**rl**ig | ja**rl** |
| `ɳ` | 19 |  | ba**rn**et | je**rn** |
| `ʈ` | 19 |  | skjo**rt**e | gjo**rt** |


## nl-NL/nl-BE

### Vowels for nl-NL

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `ɑ` | 2 | **a**f | b**a**k | bavar**ois** |
| `aː` | 2 | **aa**n | m**aa**l | j**a** |
| `ɑ̃` | 2 | **en**fin | m**an**chet | croiss**ant** |
| `ɑ͡u` | 2,7 | **ou**d | b**ou**t | h**ou** |
| `ɛ` | 4 | **e**n | w**e**g | h**è** |
| `eː` | 4 | **éé**n | h**ee**t | n**ee** |
| `ɛː` | 4 | **ai**rbag | bl**è**r |  |
| `ɛ͡i` | 4,6 | **ei**s | w**ij**n | z**ij** |
| `ɛ̃` | 4 |  | l**in**gerie | elektric**ien** |
| `øː` | 1 | **eu**ro | d**eu**r | mili**eu** |
| `ɪ` | 6 | **i**k | d**i**ng |  |
| `i` | 6 | **ie**ts | sl**ie**p | dr**ie** |
| `ɔ` | 3 | **o**p | sl**o**t | j**oh** |
| `u` | 7 | **oe**fen | h**oe**d | d**oe** |
| `ɔː` | 3 |  | r**o**ze |  |
| `ɔ̃` | 3 |  |  | Macr**on** |
| `oː` | 8 | **oo**k | b**oo**m | z**o** |
| `ʏ` | 7 | **u**rn | d**u**s |  |
| `ə` | 1 | **ee**n | tromm**e**l | d**e** |
| `œ͡y` | 4,4 | **ui**l | j**ui**st | b**ui** |
| `œ` | 4 | **oeu**vre | s**er**vice |  |
| `y` | 4 | **uu**r | t**uu**r | n**u** |

### Consonant for nl-NL

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `b` | 21 | **b**oos | fo**b**ie |  |
| `d` | 19 | **d**at | ku**dd**e |  |
| `f` | 18 | **f**iets | ge**f**eest | bla**f** |
| `χ` | 12 | **g**a | ma**g**ie | hoo**g** |
| `ʔ` | 19 |  | beamen |  |
| `ɦ` | 12 | **h**oek | be**h**aard |  |
| `g` | 20 | **g**ujarati | a**g**ain | dru**g** |
| `j` | 6 | **j**ij | boe**i**en | haa**i** |
| `k` | 20 | **k**at | ha**k**en | zwa**k** |
| `l` | 14 | **l**and | fami**l**ie | koo**l** |
| `m` | 21 | **m**an | de**m**on | raa**m** |
| `n` | 19 | **n**iks | ka**nn**on | pa**n** |
| `ŋ` | 20 |  | bre**ng**en | zi**ng** |
| `p` | 21 | **p**oer | ra**p**en | he**b** |
| `ʀ` | 13 | **r**omp | waa**r**om | kie**r** |
| `s` | 15 | **s**oms | pre**c**ies | heu**s** |
| `ʃ` | 16 | **sj**aal | vaa**sj**e | lun**ch** |
| `t` | 19 | **t**ot | la**t**en | groo**t** |
| `w` | 7 |  | flau**w**e | foll**ow** |
| `v` | 18 | **v**oor | ha**v**en |  |
| `ʋ` | 18 | **w**at | fusie**w**et |  |
| `z` | 15 | **z**al | le**z**en |  |
| `ʒ` | 16 | **j**us | bei**g**e |  |


## pl-PL

### Vowels for pl-PL

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `a` | 2 | **a**utor | kol**a**cję | karasi**a** |
| `ɛ` | 4 | **e**lbląska | refl**e**ktor | osiągnieci**e** |
| `ɛ̃` | 4 |  | niecz**ę**sto | skorup**ę** |
| `i` | 6 | **i**nformatycznym | pow**i**śle | gadal**i** |
| `ɨ` | 6 |  | cudz**y**mi | rodził**y** |
| `ɔ` | 3 | **o**sobniki | ub**o**ju | rogatk**o** |
| `ɔ̃` | 3 |  | m**ą**ż | intelektualist**ą** |
| `u` | 7 | **u**nosimy | ark**u**szy | przeznaczeni**u** |

### Consonant for pl-PL

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `b` | 21 | **b**liska | wyśru**b**owane |  |
| `bʲ` | 21 | **bi**uro | zapo**bi**egać |  |
| `t͡ɕ` | 19,16 | **ci**ągników | uczu**ci**owych | suchoś**ć** |
| `t͡ʂ` | 19,15 | **cz**ąstkowe | odpo**cz**ynek | nisz**cz** |
| `c` | 16 | **ki**je | lisi**ki**ewicz |  |
| `d` | 19 | **d**rogowy | poro**d**ówkę | bastar**d** |
| `d̪ʲ` | 19 | **di**alizy | stu**di**uję |  |
| `d͡z` | 19,15 | **dz**wonnica | wro**dz**ony |  |
| `d͡ʑ` | 19,16 | **dzi**urawe | pocho**dzi**łam |  |
| `f` | 18 | **w**prost | długo**f**alowy | konserwantó**w** |
| `fʲ` | 18 | **fi**lmoteki | gra**fi**ką |  |
| `ɡ` | 20 | **g**eometrią | nawi**g**acja |  |
| `ɟ` | 16 | **gi**tarzysta | reli**gi**jnym |  |
| `d͡ʐ` | 19,15 | **dż**unglę | mene**dż**erskie |  |
| `k` | 20 | **k**rólestwa | nau**k**owo | matematy**k** |
| `l` | 14 | **l**atający | popu**l**acje | hande**l** |
| `l̪ʲ` | 14 | **l**isek | oko**li**ca |  |
| `m` | 21 | **m**ajątkowy | wytłu**m**aczenia | błaga**m** |
| `mʲ` | 21 | **mi**eszkającej | dyna**mi**cznie |  |
| `n` | 19 | **n**apędu | poczy**n**aniach | balko**n** |
| `ŋ` | 20 |  | ci**ąg**łość |  |
| `ɲ` | 19 | **ni**ewidoczna | zmie**ni**ała | pozna**ń** |
| `p` | 21 | **p**otoczne | tera**p**euci | odstę**p** |
| `pʲ` | 21 | **pi**jawek | sku**pi**eniu |  |
| `r` | 13 | **r**egionu | ope**r**ową | administrato**r** |
| `rʲ` | 13 | **ri**postuje | impe**ri**alnej |  |
| `s` | 15 | **s**olone | przeta**s**owania | bioga**z** |
| `ɕ` | 16 | **si**erpień | donie**si**eniem | mogła**ś** |
| `ʃ` | 16 | **sz**anowanych | wpat**rz**eniu | skręca**sz** |
| `t` | 19 | **t**alentom | kwa**t**erze | dowó**d** |
| `t̪ʲ` | 19 | **ti**rami | marke**ti**ngiem |  |
| `t͡s` | 19,15 | **c**yfrą | agen**c**yjne | palą**c** |
| `v` | 18 | **w**ysłaniu | przepro**w**adzają |  |
| `vʲ` | 18 | **wi**niarstwa | buko**wi**anka |  |
| `w` | 7 | **ł**ączenie | pra**ł**ata | drukowa**ł** |
| `x` | 12 | **h**amulcem | zdy**ch**ają | kostiuma**ch** |
| `xʲ` | 12 | **hi**szpańscy | psy**chi**ce |  |
| `j` | 6 | **j**eździła | popi**j**ałam | najważniejsze**j** |
| `z` | 15 | **z**askakują | party**z**anckich | wi**z** |
| `ʑ` | 16 | **zi**emniaki | zgry**zi**enia |  |
| `ʒ` | 16 | **ż**yrandol | nowo**ż**ytnej |  |


## pt-BR

### Vowels for pt-BR

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `i` | 6 | **i**lha | f**i**car | com**i** |
| `ĩ` | 6 | **in**tacto | p**in**tar | aberd**een** |
| `a` | 2 | **á**gua | d**a**da | m**á** |
| `ɔ` | 3 | **o**ra | p**o**rta | cip**ó** |
| `u` | 7 | **u**fanista | m**u**la | per**u** |
| `ũ` | 7 | **un**s | p**un**gente | k**uhn** |
| `o` | 8 | **o**rtopedista | f**o**fo | av**ô** |
| `e` | 4 | **e**lefante | el**e**fante | voc**ê** |
| `ɐ̃` | 4 | **an**ta | c**an**ta | amanh**ã** |
| `ə` | 1 | **a**qui | am**a**ciar | dad**a** |
| `ɛ` | 4 | **e**la | s**e**rra | at**é** |
| `ẽ` | 4 | **en**dorfina | p**en**der |  |
| `õ` | 8 | **on**tologia | c**on**to |  |

### Consonant for pt-BR

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `w̃` | 7 |  |  | atualizaçã**o** |
| `w` | 7 | **w**ashington | ág**u**a | uso**u** |
| `p` | 21 | **p**ato | ca**p**ital |  |
| `b` | 21 | **b**ola | ca**b**eça |  |
| `t` | 19 | **t**ato | ra**t**o |  |
| `d` | 19 | **d**ado | ama**d**o |  |
| `g` | 20 | **g**ato | mara**g**ato |  |
| `m` | 21 | **m**ato | co**m**er |  |
| `n` | 19 | **n**o | a**n**o |  |
| `ɲ` | 19 | **nh**oque | ni**nh**o |  |
| `f` | 18 | **f**aca | a**f**ago |  |
| `v` | 18 | **v**aca | ca**v**ar |  |
| `ɾ` | 19 |  | pa**r**a | ama**r** |
| `s` | 15 | **s**atisfeito | ama**ss**ado | casado**s** |
| `z` | 15 | **z**ebra | a**z**ar |  |
| `ʃ` | 16 | **ch**eirar | ma**ch**ado |  |
| `ʒ` | 16 | **jaca** | in**j**usta |  |
| `x` | 12 | **r**ota | ca**rr**eta |  |
| `tʃ` | 19,16 | **t**irar | a**t**irar |  |
| `dʒ` | 19,16 | **d**ia | a**d**iar |  |
| `l` | 14 | **l**ata | a**l**eto |  |
| `ʎ` | 14 | **lh**ama | ma**lh**ado |  |
| `j̃` | 6 |  | inabalavelme**n**te | hífe**n** |
| `j` | 6 |  | ca**i**xa | sa**i** |
| `k` | 20 | **c**asa | ensa**c**ado |  |


## pt-PT

### Vowels for pt-PT

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `a` | 2 | **á**bdito | consul**a**r | medir**á** |
| `ɐ` | 4 | **a**bacaxi | dom**a**ção | long**a** |
| `ɐj` | 4,6 | **ei**dético | dir**ei**ta | detect**ei** |
| `ɐ̃` | 4 | **an**verso | viaj**an**te | af**ã** |
| `ɐ̃j̃` | 4,6 | **an**gels | viag**en**s | tamb**ém** |
| `ɐ̃w̃` | 4,7 | **hão** | significaç**ão**zinha | gab**ão** |
| `ɐ͡w` | 4,7 |  | s**au**dar | hell**o** |
| `a͡j` | 2,6 | **ai**rosa | cultur**ai**s | v**ai** |
| `ɔ` | 3 | **ho**ra | dep**ó**sito | l**ó** |
| `ɔ͡j` | 3,6 | **ói**s | her**ói**co | d**ói** |
| `a͡w` | 2,7 | **ou**tlook | inc**au**to | p**au** |
| `ə` | 1 | **e**xtremo | sapr**e**mar | noit**e** |
| `e` | 4 | **e**clipse | hav**e**r | buff**et** |
| `ɛ` | 4 | **e**co | hib**é**rnios | pat**é** |
| `ɛ͡w` | 4,7 |  | pirin**éu**s | escarc**éu** |
| `ẽ` | 4 | **em**baçado | dirim**en**te | ám**en** |
| `e͡w` | 4,7 | **eu** | d**eu**s | beb**eu** |
| `i` | 6 | **i**greja | aplaud**i**do | escrev**i** |
| `ĩ` | 6 | **im**paciente | esp**in**çar | manequ**im** |
| `i͡w` | 6,7 |  | n**iu**e | garant**iu** |
| `o` | 8 | **o**fir | consumid**o**r | stacatt**o** |
| `o͡j` | 8,6 | **oi**rar | n**oi**te | f**oi** |
| `õ` | 8 | **om**brão | barr**on**da | d**om** |
| `õj̃` | 8,6 |  | ocupaç**õe**s | exp**õe** |
| `u` | 7 | **u**bi | fac**u**ltativo | fad**o** |
| `u͡j` | 7,6 | **ui**var | arr**ui**vado | f**ui** |
| `ũ` | 7 | **um**bilical | f**un**cionar | fór**um** |
| `ũj̃` | 7,6 |  | m**ui**to |  |

### Consonant for pt-PT

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `b` | 21 | **b**acalhau | ta**b**aco | clu**b** |
| `d` | 19 | **d**ado | da**d**o | ban**d** |
| `ɾ` | 19 | **r**ename | ve**r**ás | chuta**r** |
| `f` | 18 | **f**im | e**f**icácia | gol**f** |
| `g` | 20 | **g**adinho | ape**g**o | blo**g** |
| `j` | 6 | **i**ode | desassoc**i**ado | substitu**i** |
| `k` | 20 | **k**iwi | trafi**c**ado | sna**ck** |
| `l` | 14 | **l**aborar | pe**l**ada | fu**ll** |
| `ɫ` | 14 |  | po**l**vo | brasi**l** |
| `ʎ` | 14 | **lh**anamente | anti**lh**as |  |
| `m` | 21 | **m**aça | ama**nh**ã | mode**m** |
| `n` | 19 | **n**utritivo | campa**n**a | sca**n** |
| `ɲ` | 19 | **nh**ambu-grande | toalhi**nh**a | pe**nh** |
| `p` | 21 | **p**ai | crá**p**ula | lapto**p** |
| `ʀ` | 13 | **r**ecordar | gue**rr**a | chauffeu**r** |
| `s` | 15 | **s**eco | gro**ss**eira | bo**ss** |
| `ʃ` | 16 | **ch**uva | du**ch**ar | médio**s** |
| `t` | 19 | **t**abaco | pelo**t**a | inpu**t** |
| `v` | 18 | **v**aca | combatí**v**el | pavlo**v** |
| `w` | 7 | **w**affle | restit**u**ir | katofi**o** |
| `z` | 15 | **z**âmbia | pra**z**er | ja**zz** |
| `ʒ` | 16 | **g**elada | infli**g**ir | cu**j** |


## ro-RO

### Vowels for ro-RO

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `ə` | 1 | **ă**sta | ab**ă**tut | fizic**ă** |
| `ɨ` | 6 | **î**nspre | hotăr**â**re | îh**î** |
| `a` | 2 | **a**bsolut | prem**a**tur | Prag**a** |
| `e` | 4 | **e**ducație | tabl**e**te | alianț**e** |
| `e̯a` | 4,2 |  | studenț**ea**scă | bad**ea** |
| `e̯o` | 4,8 |  | bl**eu**marin | vr**eo** |
| `i` | 6 | **I**talia | ar**i**pi | aberaț**ii** |
| `o` | 8 | **o**ricum | catac**o**mbe | radi**o** |
| `o̯a` | 8,2 | **oa**ră | închis**oa**re | șam**oa** |
| `u` | 7 | **u**mble | grad**u**l | Alexandr**u** |

### Consonant for ro-RO

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `b` | 21 | **b**ăi | vizi**b**il | ara**b** |
| `bʲ` | 21 |  |  | micro**bi** |
| `d` | 19 | **d**octor | vi**d**eo | miliar**d** |
| `d͡ʒ` | 19,16 | **g**er | ve**g**etație |  |
| `d͡ʒʲ` | 19,16 |  |  | cole**gi** |
| `f` | 18 | **f**urtună | e**f**ort | ecogra**f** |
| `fʲ` | 18 |  |  | filoso**fi** |
| `g` | 20 | **g**aleria | e**g**al | filolo**g** |
| `gʲ` | 20 |  | ne**gh**ină | un**ghi** |
| `h` | 12 | **h**exagon | ar**h**itect | monar**h** |
| `j` | 6 | **i**eri | bă**i**at | dita**i** |
| `k` | 20 | **c**adru | bari**c**adat | piti**c** |
| `kʲ` | 20 |  |  | ure**chi** |
| `l` | 14 | **l**aptop | a**l**int | Pau**l** |
| `lʲ` | 14 |  |  | circu**li** |
| `m` | 21 | **m**andarine | ca**m**era | ato**m** |
| `mʲ` | 21 |  |  | consu**mi** |
| `n` | 19 | **n**epot | Ca**n**ada | Ede**n** |
| `ŋ` | 20 |  | ba**n**ca | plâ**n**g |
| `nʲ` | 19 |  |  | drago**ni** |
| `p` | 21 | **p**ai | o**p**era | Fili**p** |
| `pʲ` | 21 |  |  | ocu**pi** |
| `r` | 13 | **r**eal | me**r**e | distribuito**r** |
| `rʲ` | 13 |  |  | palmie**ri** |
| `s` | 15 | **s**ertar | că**s**ătorit | exclu**s** |
| `ʃ` | 16 | **ș**ine | cu**ș**etă | gre**ș** |
| `ʃʲ` | 16 |  |  | gro**și** |
| `t` | 19 | **t**eracota | ma**t**erial | abonamen**t** |
| `tʲ` | 19 |  |  | foș**ti** |
| `t͡s` | 19,15 | **ț**ar | cu**ț**it | vorbăre**ț** |
| `t͡ʃ` | 19,16 | **c**irca | me**ci**uri |  |
| `t͡sʲ` | 19,15 |  |  | usca**ți** |
| `t͡ʃʲ` | 19,16 |  |  | indi**ci** |
| `v` | 18 | **v**accin | gra**v**idă | fugiti**v** |
| `vʲ` | 18 |  |  | ner**vi** |
| `w` | 7 | **u**au | c**u**antificare | pli**u** |
| `z` | 15 | **z**oologică | fra**z**ă | parbri**z** |
| `ʒ` | 16 | **j**ar | aba**j**ur | pasa**j** |
| `zʲ` | 15 |  |  | semne**zi** |
| `ʒʲ` | 16 |  |  | dâr**ji** |


## ru-RU

### Vowels for ru-RU

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `a` | 2 | **а**дрес | р**а**дость | бед**а** |
| `ʌ` | 1 | **о**блаков | з**а**стенчивость | внучк**а** |
| `ə` | 1 |  | ябл**о**чн**о**го |  |
| `ɛ` | 4 | **э**пос | б**е**лка | каф**е** |
| `i` | 6 | **и**ней | л**и**ст | соловь**и** |
| `ɪ` | 6 | **и**гра | м**е**дведь | мгновень**е** |
| `ɨ` | 6 | **э**нергия | л**ы**с**ы**й | вес**ы** |
| `ɔ` | 3 | **о**крик | м**о**т | весл**о** |
| `u` | 7 | **у**жин | к**у**ст | пойд**у** |

### Consonant for ru-RU

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `p` | 21 | **п**рофессор | по**п**лавок | укро**п** |
| `pʲ` | 21 | **П**етербург | осле**п**ительно | сте**пь** |
| `b` | 21 | **б**ольшой | со**б**ака |  |
| `bʲ` | 21 | **б**елый | у**б**едить |  |
| `t` | 19 | **т**айна | с**т**аренький | тви**д** |
| `tʲ` | 19 | **т**епло | учи**т**ель | сине**ть** |
| `d` | 19 | **д**оверчиво | не**д**алеко |  |
| `dʲ` | 19 | **д**ядя | е**д**иница |  |
| `k` | 20 | **к**рыло | ку**к**уруза | кустарни**к** |
| `kʲ` | 20 | **к**ипяток | неяр**к**ий |  |
| `g` | 20 | **г**роза | немно**г**о |  |
| `gʲ` | 20 | **г**ерань | помо**г**ите |  |
| `x` | 12 | **х**ороший | по**х**од | ду**х** |
| `xʲ` | 12 | **х**илый | хи**х**иканье |  |
| `f` | 18 | **ф**антазия | шка**ф**ах | кро**в** |
| `fʲ` | 18 | **ф**естиваль | ко**ф**е | вер**фь** |
| `v` | 18 | **в**нучка | сине**в**а |  |
| `vʲ` | 18 | **в**ертеть | с**в**ет |  |
| `s` | 15 | **с**казочник | ле**с**ной | карапу**з** |
| `sʲ` | 15 | **с**еять | по**с**ередине | зажгли**сь** |
| `z` | 15 | **з**аяц | зве**з**да |  |
| `zʲ` | 15 | **з**емляника | со**з**ерцал |  |
| `ʂ` | 15 | **ш**уметь | п**ш**ено | мы**шь** |
| `ʐ` | 15 | **ж**илище | кру**ж**евной |  |
| `t͡s` | 19,15 | **ц**елитель | Вене**ц**ия | незнакоме**ц** |
| `t͡ɕ` | 19,16 | **ч**асы | о**ч**арование | мя**ч** |
| `ɕː` | 16 | **щ**елчок | о**щ**у**щ**ать | ле**щ** |
| `m` | 21 | **м**олодежь | нес**м**отря | то**м** |
| `mʲ` | 21 | **м**еч | ды**м**ить | се**мь** |
| `n` | 19 | **н**ачало | око**н**це | со**н** |
| `nʲ` | 19 | **н**ебо | ли**н**ялый | тюле**нь** |
| `l` | 14 | **л**ужа | до**л**гожитель | ме**л** |
| `lʲ` | 14 | **л**ицо | неда**л**еко | со**ль** |
| `r` | 13 | **р**адость | со**р**ока | дво**р** |
| `rʲ` | 13 | **р**ябина | набе**р**ежная | две**рь** |
| `j` | 6 | **е**сть | ма**я**к | игрушечны**й** |


## sk-SK

### Vowels for sk-SK

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `i` | 6 | **i**dea | efekt**i**v**i**ta | ér**y** |
| `e` | 4 | **e**dícia | abs**e**ncia | farm**e** |
| `a` | 2 | **a**bnormálne | esk**a**páda | ári**a** |
| `o` | 8 | **o**ba | bank**o**vá | esperant**o** |
| `u` | 7 | **u**dial | febr**u**ár | bab**u** |
| `ʉ` | 6 |  | m**ä**sité |  |
| `iː` | 6 | **í**lu | ed**í**cii | druh**ý** |
| `eː` | 4 | **é**ra | anamn**é**zy | ázijsk**é** |
| `aː` | 2 | **á**no | anim**á**cia | druhov**á** |
| `oː` | 8 | **ó**dy | bili**ó**n | hal**ó** |
| `uː` | 7 | **ú**bočí | absol**ú**tna | druh**ú** |
| `i͡a` | 6,2 |  | p**ia**tkové | maškrt**ia** |
| `i͡e` | 6,4 |  | domn**ie**nka | námest**ie** |
| `i͡u` | 6,7 |  |  | väčš**iu** |
| `u͡o` | 7,8 | **ô**sma | jah**ô**d | malin**ô** |
| `au` | 2,7 | **au**dio | apl**au**dovalo | sred**au** |
| `ou` | 8,7 |  |  |  |
| `ə` | 1 |  |  |  |

### Consonant for sk-SK

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `p` | 21 | **p**ád | a**p**elu | ca**p** |
| `b` | 21 | **b**abička | a**b**iogenézy | du**b** |
| `t` | 19 | **t**abak | fo**t**o | ar**t** |
| `d` | 19 | **d**elta | e**d**itor | backhan**d** |
| `c` | 16 | **ť**ahač | docen**t**i | farnos**ť** |
| `ɟ` | 16 | **ď**alej | stre**d**e | lo**ď** |
| `k` | 20 | **k**abaret | báb**k**ový | chudáči**k** |
| `g` | 20 | **g**alón | dema**g**ó**g**ia | mozo**g** |
| `t͡s` | 19,15 | **c**ertifikácie | ci**c**av**c**e | bá**c** |
| `d͡z` | 19,15 |  | me**dz**í |  |
| `t͡ʃ` | 19,16 | **č**ajový | fr**č**í | bohá**č** |
| `d͡ʒ` | 19,16 | **dž**úsu | bran**dž**e |  |
| `f` | 18 | **f**abrík | biogra**f**ie | fotogra**f** |
| `v` | 18 | **v**okály | e**v**anjelické |  |
| `s` | 15 | **s**ekunda | e**s**á | algoritmu**s** |
| `z` | 15 | **z**ábal | fa**z**uľu | aní**z** |
| `ʃ` | 16 | **š**abľa | du**š**evná | chápe**š** |
| `ʒ` | 16 | **ž**aba | ve**ž**i | kalu**ž** |
| `x` | 12 | **ch**arakter | bio**ch**émie | bohatý**ch** |
| `ɦ` | 12 | **h**áčik | bo**h**mi |  |
| `r` | 13 | **r**abat | e**r**óziou | éte**r** |
| `r̩` | 13 |  | chat**r**če | leicest**er** |
| `r̩ː` | 13 |  | v**ŕ**tal |  |
| `l` | 14 | **l**ampa | e**l**ektrička | čaka**l** |
| `l̩` | 14 |  | d**l**hý | nób**l** |
| `l̩ː` | 14 |  | jab**ĺ**k |  |
| `ʎ` | 14 | **ľ**ad | cite**ľ**né | by**ľ** |
| `m` | 21 | **m**eter | e**m**isný | akto**m** |
| `ɱ` | 21 |  | a**m**fiteáter |  |
| `n` | 19 | **n**ábeh | col**n**ému | faj**n** |
| `ɴ` | 19 |  | slovi**n**ský |  |
| `ŋ` | 20 |  | ba**n**ket |  |
| `ɲ` | 19 | **ň**om | a**n**i | jačme**ň** |
| `u̯` | 7 |  | cesto**v**ní | aktí**v** |
| `i̯` | 6 |  | fa**j**ka | chatove**j** |
| `j` | 6 | **j**a | ese**j**e |  |
| `w` | 7 | **v**zbudí | kri**v**dí |  |


## sl-SI

### Vowels for sl-SI

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `ə` | 1 | **r**java | pis**e**mski | decemb**e**r |
| `a` | 2 | **a**zilantov | hiš**a**m | delnišk**a** |
| `aː` | 2 | **a**vto | m**a**rketplace | luci**a** |
| `ɛ` | 4 | **e**dicija | prid**e**m | ničl**e** |
| `eː` | 4 | **e**bola | prid**e**vnik | prepov**e** |
| `ɛː` | 4 | **e**na | produc**e**nta | janž**e** |
| `i` | 6 | **i**deja | poudar**i**m | poudarit**i** |
| `iː` | 6 | **i**gla | il**i**rska | jedm**i** |
| `ɔ` | 3 | **o**ba | m**o**rfološke | Mark**o** |
| `ɔː` | 3 | **o**če | črnom**o**rskem |  |
| `oː` | 8 | **o**bčina | ref**o**rmam | sen**o** |
| `u` | 7 | **u**lova | mam**u**t | mandat**u** |
| `uː` | 7 | **u**ra | dramat**u**rgom | intervj**u** |

### Consonant for sl-SI

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `b` | 21 | **b**rez | bo**b**er | le**b**deča |
| `d` | 19 | **d**ajal | degra**d**acija | nave**d**bah |
| `dˡ` | 19 | **d**leto |  | nave**d**la |
| `dn` | 19,19 | **d**na |  | doho**d**ne |
| `d͡ʒ` | 19,16 | **dž**ezovske | bri**dž**a | mene**dž**ment |
| `d͡z` | 19,15 | o**dz**ivajo |  | Ko**c**bek |
| `f` | 18 | **f**agota | fotogra**f**a | gol**f** |
| `ɱ` | 21 |  |  | ni**m**fa |
| `ɣ` | 20 |  |  | a**h**deloja |
| `g` | 20 | **g**aber | la**g**al | ra**g**bi |
| `ɪ` | 6 |  | po**j**di | emisi**j** |
| `j` | 6 | **j**adra | ka**j**ak | na**j**ostreje |
| `k` | 20 | **k**abel | a**k**ademija | alkoholi**k** |
| `l` | 14 | **l**abirint | o**l**ajša | ša**l** |
| `lʲ` | 14 |  |  | po**lj**ski |
| `m` | 21 | **m**aček | o**m**ara | pote**m** |
| `ŋ` | 20 | **N**galiemski_slapovi |  | ba**n**ka |
| `n` | 19 | **n**abave | obarva**n**a | obarva**n** |
| `nʲ` | 19 |  |  | ko**nj**ska |
| `p` | 21 | **p**ada | sa**p**a | sesto**p** |
| `r` | 13 | **r**abila | so**r**azmerna | spo**r** |
| `s` | 15 | **s**rajca | viru**s**a | viru**s** |
| `ʃ` | 16 | **š**ah | su**š**ijo | tovari**š** |
| `t` | 19 | **t**abela | goji**t**i | flavtis**t** |
| `tˡ` | 19 | **t**la | ška**t**la | dese**t**letne |
| `tn` | 19,19 |  |  | deve**t**najst |
| `t͡ʃ` | 19,16 | **č**aj | gne**č**a | hla**č** |
| `t͡s` | 19,15 | **c**ar | ra**c**a | reje**c** |
| `u̯` | 7 |  |  | a**v**to |
| `v` | 18 | **v**eja | a**v**anture |  |
| `w` | 7 | **v**gradila |  | slabokr**v**nost |
| `ʍ` | 7 | **v**stati |  |  |
| `x` | 12 | **h**iša | ja**h**ači | jama**h** |
| `ʒ` | 16 | **ž**aba | je**ž**a | mo**ž**gani |
| `z` | 15 | **z**maj | do**z**a | i**z**voza |


## sv-SE

### Vowels for sv-SE

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `a` | 2 | **a**ndas | betr**a**kta | gryt**a** |
| `æ` | 1 | **ä**rter | sm**ä**rta |  |
| `æː` | 1 | **ä**rliga | besv**ä**ra |  |
| `ɑː` | 2 | **a**vig | bet**a**la | bedr**a** |
| `ɔ` | 3 | **å**tta | kontr**o**llen | jas**å** |
| `a‿u` | 2,7 | **a**ura | p**au**ser | Ol**au** |
| `ə` | 1 |  | äppl**e**na | pojk**e** |
| `e` | 4 | **e**nergi | serv**e**tten | Arjepluovv**e** |
| `ɛ` | 4 | **ä**pple | ber**ä**tta | Sivi**ä** |
| `ɛː` | 4 | **ä**ta | betr**ä**da | tr**ä** |
| `eː` | 4 | **e**ka | konkr**e**ta | caf**é** |
| `ɶ` | 8 | **ö**rt | st**ö**rta |  |
| `œː` | 4 | **ö**ren | ber**ö**ra |  |
| `œ` | 4 | **ö**ppen | Alstr**ö**mer | Päivi**ö** |
| `øː` | 1 | **ö**l | bel**ö**ning | adj**ö** |
| `ɪ` | 6 | **i**dé | vits**i**ppa | kiw**i** |
| `iː` | 6 | **i**vrig | kr**i**s | part**i** |
| `ʊ` | 4 | **o**as | betr**o**dda | kont**o** |
| `uː` | 7 | **o**ro | förtr**o**ende | ber**o** |
| `oː` | 8 | **å**tala | telef**o**nen | niv**å** |
| `ɵ` | 1 | **u**ppenbar | för**u**ndrad | farst**u** |
| `ʉː` | 6 | **u**te | best**u**len | intervj**u** |
| `y` | 4 | **y**tterst | r**y**kte | Tomm**y** |
| `yː` | 4 | **y**ta | fört**y**dliga | parapl**y** |

### Consonant for sv-SE

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `p` | 21 | **p**il | a**p**a | to**pp** |
| `t` | 19 | **t**al | ma**tt**a | aku**t** |
| `k` | 20 | **k**ål | ja**ck**a | ta**k** |
| `b` | 21 | **b**il | klu**bb**a | jo**bb** |
| `d` | 19 | **d**al | li**d**a | sta**d** |
| `g` | 20 | **g**ås | så**g**a | la**g** |
| `f` | 18 | **f**il | kla**ff**a | kla**ff** |
| `h` | 12 | **h**al | be**h**ålla |  |
| `s` | 15 | **s**il | vi**s**a | vi**ss** |
| `ɧ` | 16 | **sj**uk | ma**sk**in | du**sch** |
| `ɕ` | 16 | **tj**ock | åk**k**änslan | coa**ch** |
| `v` | 18 | **v**år | le**v**a | tor**v** |
| `m` | 21 | **m**il | ka**mm**a | ar**m** |
| `n` | 19 | **n**ål | mi**nn**as | söm**n** |
| `ŋ` | 20 |  | ri**ng**a | u**ng** |
| `l` | 14 | **l**ös | må**l**a | ta**l** |
| `r` | 13 | **r**is | kä**rr**a | bo**rr** |
| `j` | 6 | **j**ag | trö**j**a | ha**j** |
| `ɖ` | 19 |  | bo**rd**a | bo**rd** |
| `ɭ` | 14 |  | po**rl**ande | kä**rl** |
| `ɳ` | 19 |  | gä**rn**a | ba**rn** |
| `ʂ` | 15 |  | fo**rs**a | fo**rs** |
| `ʈ` | 19 |  | skjo**rt**a | gjo**rt** |


## th-TH

### Vowels for th-TH

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `a` | 2 |  | น**ะ** |  |
| `aː` | 2 |  | ห**า**ด | ห**า** |
| `e` | 4 |  | **เ**ต**ะ** |  |
| `eː` | 4 |  | **เท** | **เ**ด้ |
| `i` | 6 |  | **ปิ**ด |  |
| `iː` | 6 |  | **ปี**ก | **ปี** |
| `ia` | 6,2 |  | **เงีย**บ |  |
| `o` | 8 |  | **บ**ด |  |
| `oː` | 8 |  | แลก**โ**ตส | ฉาว**โ**ฉ่ |
| `ə` | 1 |  | ใบฝาก**เ**งิน |  |
| `əː` | 1 |  | **เกิ**น | เหม่**อ** |
| `u` | 7 |  | **จุ**ด |  |
| `uː` | 7 |  | **ดู**ด | **ดู** |
| `ua` | 7,2 |  | ก**ว**น | รั**ว** |
| `ɯ` | 6 |  | **ยึ**ด |  |
| `ɯː` | 6 |  | **มื**ด | **มื**อ |
| `ɯa` | 6,2 |  | **เรื**อน | **เรื**อ |
| `ɛ` | 4 |  | คู่**แ**ข่ง |  |
| `ɛː` | 4 |  | **แ**บน | คำ**แ**ปล |
| `ɔ` | 3 |  | **น็อ**ต |  |
| `ɔː` | 3 |  | น**อ**น | เจ็บค**อ** |

### Consonant for th-TH

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `b` | 21 | **บิ**น | กระ**บี่** | ยม**บ** |
| `t͡ɕ` | 19,16 | เ**จ็**ด | กระโ**จ**ม |  |
| `tɕʰ` | 19,16 | เ**ช้**าๆ | วันอาสาฬหบู**ช**า |  |
| `d` | 19 | เ**ด**ช | วิ**ดี**โอ |  |
| `f` | 18 | **ฟ้**า | เ**ฟื่**องฟู |  |
| `h` | 12 | **ห**า | เศษอา**ห**าร |  |
| `j` | 6 | **ย**า | เรือ**ย**นต์ | ยา**ย** |
| `k` | 20 | **ก**า | เนื้อไ**ก่** | มา**ก** |
| `kʰ` | 20 | **ค**า | เล**ข**า |  |
| `l` | 14 | **ล**า | หูฉ**ล**าม |  |
| `m` | 21 | **ม**า | เส**ม**อ | รัดกุ**ม** |
| `n` | 19 | **น**า | แอมโมเ**นี**ย | กา**ล** |
| `ŋ` | 20 | **ง**า | แต่**งง**าน | แหล่**ง** |
| `p` | 21 | **ป**า | โดยทั่วไ**ป**แล้ว | กั**บ** |
| `pʰ` | 21 | **พ**า | ลี้**ภั**ย |  |
| `r` | 13 | **ร**า | ไข้มาลาเ**รี**ย |  |
| `s` | 15 | **ส**าม | ไม่มี**ส**ติ |  |
| `t` | 19 | **ต**า | ก**ติ**กา | อา**จ** |
| `tʰ` | 19 | **ท**า | คุณ**ธ**รรม |  |
| `w` | 7 | **วิ่**ง | ก**วี** | แก้**ว** |
| `ʔ` | 19 | **อ**า | สะ**อ**าด |  |

### Tone for th-TH

| `ipa` | `Description` | Example |
| --- | --- | --- |
| `̄` | Mid | ไป  bpai<sup>M</sup> (to go) |
| `̀` | Low | ไข่  khai<sup>L</sup> (egg) |
| `́̋̀` | Falling | ใช่  chai<sup>F</sup> (yes; agreement) |
| `́` | High | ครับ  khrap<sup>H</sup> ([spoken by a male] yes) |
| `̀̏́` | Rising | หนัง  nang<sup>R</sup> (cinema film) |


## ta-IN

### Vowels for ta-IN

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `aː` | 2 | ஆடு | ரகமான | கூடா |
| `aɪ` | 11 | ஐந்து | அதனுடைய | அமை |
| `a` | 2 | அன்பு | அச்சம் | ரபீந்திர |
| `eː` | 4 | ஏரி | ரமேசு | ரஹானே |
| `e` | 4 | எம்எம் | அலெக்ஸ் | ருபெ |
| `i` | 6 | இனிப்பு | ரெவின்யூ | ஏரி |
| `iː` | 6 | ஈசல் | ரபீந்திர | ராலீ |
| `o` | 8 | ஒளி | அப்பொருளின் | ரோமாக்னொலொ |
| `oː` | 8 | ஓசை | ராத்தோர் | லபோரெயிரோ |
| `aʊ` | 9 | ஔவையார் | ஹெரௌல்ட் | இலக்னௌ |
| `u` | 7 | உழை | ரவுண்ட் | ஆடு |
| `uː` | 7 | ஊர்தி | ரெய்ச்சூர் | ரவூ |

---

### Consonants for ta-IN

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `b` | 21 | பெர்லின் | அன்புடன் | ஜாப் |
| `t͡ɕ` | 19,16 | சென்னையின் | அச்சம் | ரகத்தைச் |
| `d̪` | 19 | திசை | ராமதாஸின் | அரவிந்த் |
| `ɖ` | 19 | டாலராக | ஆடு | ரவுண்ட் |
| `f` | 18 | ஃப்ரண்ட் | ஆஃபர் | ரஹாஃப் |
| `g` | 20 | கயானா | ரகத்தைச் | ரோஸ்பெர்க் |
| `h` | 12 | ஹரல்ட் | ரஹத் | அல்லாஹ் |
| `dʑ` | 19,16 | ஜம்ப் | ரஜப் | ரவிராஜ் |
| `k` | 20 | கூடா | ரபீக்கான் | ரசாக் |
| `l` | 14 | லபோரெயிரோ | பெர்லின் | கடல் |
| `ɭ` | 14 |  | ரசிகர்களில் | ரன்கள் |
| `ɻ` | 13 | ழகரம் | அழற்சி | தமிழ் |
| `m` | 21 | மரம் | அமைதி | செவ்வகம் |
| `n̪` | 19 | நத்தை | ஐந்து | ராஜேந் |
| `ɳ` | 19 | ணகரம் | ரவுண்ட் | கண் |
| `ŋ` | 20 | ஙப்போல் | சிங்கம் | ரங் |
| `n` | 19 | னகரம் | அன்பு | பெர்லின் |
| `ɲ` | 19 | ஞமலி | இஞ்சி | கசன்ஞ் |
| `p` | 21 | பாடல் | இனிப்பு | ரஜப் |
| `ɾ` | 19 | ரபீந்திர | ரசிகர்களில் | உயிர் |
| `r` | 13 | றகரம் | அதற்கு | அதற் |
| `s` | 15 | சர்க்கரை | ரசிகை |  |
| `ʃ` | 16 | ஷேர் | உஷார் | பாலிஷ் |
| `ʂ` | 15 | ஷ்ரமிக் | ரஷித் | ரமேஷ் |
| `t̪` | 19 | தங்கம் | எடுத்தல் | ரஷித் |
| `ʈ` | 19 | ட்ரக் | ஈட்டி | ராபர்ட் |
| `ʋ` | 18 | வௌவ்வால் | ரவுண்ட் | ராஜிவ் |
| `j` | 6 | யானை | ரகசியத்தை | நாய் |
| `aː͡j` | 2,6 | ஆயலூர் | ரசாயன | காய் |
| `e͡j` | 4,6 |  | ரெயில் | அஜெய் |

 
## tr-TR

### Vowels for tr-TR

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `a` | 2 | **a**rmut | f**a**l | elm**a** |
| `ɑː` | 2 | **ağ**rı | k**ağ**nı | d**ağ** |
| `e` | 4 | **e**rik | k**e**l | akid**e** |
| `eː` | 4 | **eğ**ri | d**eğ**nek | y**eğ** |
| `œ` | 4 | **ö**rdek | g**ö**l | banliy**ö** |
| `œ͡ɟ` | 4,16 | **öğ**len | açık**öğ**retim |  |
| `i` | 6 | **i**laç | k**i**l | ked**i** |
| `i͡ɟ` | 6,16 | **iğ**ne | mevk**ii**ne | tebl**iğ** |
| `o` | 8 | **o**rman | k**o**l | vaz**o** |
| `o͡ɟ` | 8,16 | **oğ**lan | d**oğ**ru | d**oğ** |
| `u` | 7 | **u**çak | k**u**ş | kok**u** |
| `u͡ɟ` | 7,16 | **uğ**ur | b**uğ**ra | başb**uğ** |
| `ɯ` | 6 | **ı**hlamur | t**ı**p | kaz**ı** |
| `ɯ͡ɟ` | 6,16 | **ığ**dır | s**ığ**lık | t**ığ** |
| `y` | 4 | **ü**lke | g**ü**l | öyk**ü** |
| `y͡ɟ` | 4,16 |  | d**üğ**me |  |

### Consonant for tr-TR

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `b` | 21 | **b**alık | e**b**e | serta**b** |
| `c` | 16 | **k**eçi | e**k**şi | bölü**k** |
| `t͡ʃ` | 19,16 | **ç**öp | u**ç**ak | ilge**ç** |
| `d` | 19 | **d**ere | ba**d**em | a**d** |
| `f` | 18 | **f**il | ke**f**en | çarşa**f** |
| `ɡ` | 20 | **g**az | yor**g**un | diyalo**g** |
| `ɣ` | 20 |  | a**ğ**ir |  |
| `ɟ` | 16 | **g**avur | kev**g**ir |  |
| `h` | 12 | **h**alat | a**h**ır | küla**h** |
| `j` | 6 | **y**er | a**y**va | ola**y** |
| `d͡ʒ` | 19,16 | **c**ezve | ev**c**imen | ha**c** |
| `k` | 20 | **k**abak | ba**k**la | çocu**k** |
| `l` | 14 | **l**eylek | de**l**ik | ki**l** |
| `ɮ` | 6 | **l**ala | ka**l**ın | pu**l** |
| `m` | 21 | **m**uz | ye**m**ek | kale**m** |
| `n` | 19 | **n**ar | i**n**ek | soru**n** |
| `ŋ` | 20 |  | ma**n**gal | ri**n**g |
| `p` | 21 | **p**ara | kap**ı** | raki**p** |
| `ɾ` | 19 | **r**enk | i**r**i | minde**r** |
| `s` | 15 | **s**al | kı**s**a | bahi**s** |
| `ʃ` | 16 | **ş**ekil | ko**ş**u | afi**ş** |
| `t` | 19 | **t**erlik | ku**t**up | adale**t** |
| `v` | 18 | **v**adi | ta**v**a | e**v** |
| `w` | 7 |  | ta**v**uk |  |
| `z` | 15 | **z**emin | ge**z**i | ka**z** |
| `ʒ` | 16 | **j**öle | anga**j**man | refü**j** |

 
## ur-PK

### Vowels for ur-PK
| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `i` | 6 | ایثار | ابابیل | ژالہ_باری |
| `e` | 4 | ایڑیاں | جیٹھ | چولھے |
| `æ` | 1 | ایراغیرا | لیمپ | ہیں |
| `u` | 7 | اوپر | سونگھ | بابو |
| `o` | 8 | عہدےدار | سوچ | اٹھاؤ |
| `ɔ` | 3 | اولیائے_کرام | بے_ذوق | پیشرو |
| `a` | 2 | آیات | یاترا | پڑھا |
| `ɪ` | 6 | انہماک | منقسم |  |
| `ɛ` | 4 | عہدحاضر | غالب_فہمی |  |
| `ʊ` | 4 | اس | منقسم |  |
| `ə` | 1 | ابابیل | بڑھ |  |
| `ĩ` | 6 |  | زمیں_داروں | عہد_آفریں |
| `ẽ` | 4 |  | گیندے | لائیں |
| `ɛ̃` | 4 |  | سینتیسویں | ہیں |
| `ũ` | 7 |  | خوں_ریز | پاؤں |
| `õ` | 8 |  | بھونڈے | پاؤں |
| `ɑ̃` | 2 |  | بانہیں | ماں |
| `ɔ̃` | 3 |  | چونسٹھ | بھوں |

### Consonants for ur-PK

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `p` | 21 | پاؤں | ماپا | لیمپ |
| `b` | 21 | بابا | بابا | باب |
| `Pʰ` | 21 | پھول | بپھر | بپھرا |
| `bʰ` | 21 | بھول | چبھا | نبھ |
| `m` | 21 | ماں | سماں | کم |
| `t̪` | 19 | تصویر | بچتا | مت |
| `t̪ʰ` | 19 | تھامنا | منتھلی | بوتھ |
| `d̪` | 19 | دودھ | کارندوں | کارآمد |
| `d̪ʰ` | 19 | دھونا | چودھراہٹ | بندھ |
| `n` | 19 | نام | بنانا | آن |
| `ŋ` | 20 |  | اینگری | رنگ |
| `ʈ` | 19 | ٹائم | اینگزائٹی | ٹائٹ |
| `ɖ` | 19 | ڈبوئیں | کبڈی | کارڈ |
| `ʈʰ` | 19 | ٹھیکیدار | ریٹھا | بیٹھ |
| `ɖʰ` | 19 | ڈھل | اوڈھو | ڈھونڈھ |
| `k` | 20 | کارڈ | روکے | رک |
| `g` | 20 | گئیں | آگاہی | بعدازمرگ |
| `kʰ` | 20 | کھپ | انوکھا | پرکھ |
| `gʰ` | 20 | گھبرا | بگھار | سنگھ |
| `q` | 20 | قائدین | آقا | آفاق |
| `ʔ` | 19 |  | اجتماعات |  |
| `f` | 18 | فائدہ_مند | تغافل | اختلاف |
| `v` | 18 | وبا | مواصلات | جزو |
| `s` | 15 | سنگھ | منقسم | منعکس |
| `z` | 15 | ذائقہ | ذخیرہ_اندوزی | ذخیرہ_اندوز |
| `ʃ` | 16 | شائستگی | ذہن_نشین | سٹہ_فروش |
| `ʒ` | 16 | ژالہ_باری | سپرویژن | سبوتاژ |
| `ɣ` | 20 | غائب | تغافل | سراغ |
| `x` | 12 | خیمے | ذخائر | چیخ |
| `h` | 12 | حاسدانہ | دانش_گاہوں | دانشگاہ |
| `ʧ` | 16 | چکھ | خوچہ | خرچ |
| `ʧʰ` | 16 | چھاچھ | ریچھوں | پوچھ |
| `ʤ` | 16 | جیٹھ | زوجہ | زوج |
| `ʤʰ` | 16 | جھکیں | ساجھے | بوجھ |
| `r` | 13 | ریچھوں | آرا | بگھار |
| `ɽ` | 13 |  | آڑا | گیدڑ |
| `j` | 6 | یاترا | آیات | میت |
| `l` | 14 | لائحہ_عمل | امیرالاسلام | ابابیل |


## vi-VN

### Vowels for vi-VN

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `a` | 2 |  | b**a**n | m**a** |
| `ɛ` | 4 |  | h**ẹ**p | m**ẹ** |
| `i` | 6 |  |  | ch**í** |
| `ɔ` | 3 |  | h**ọ**c | t**ò** |
| `u` | 7 |  | h**u**ng | th**ù** |
| `u͡a` | 7,2 |  |  | ch**úa** |
| `a͡j` | 2,6 |  |  | t**ài** |
| `ɛ̆j` | 4,6 |  |  | l**ẫy** |
| `ə͡j` | 1,6 |  |  | ch**ơi** |
| `o` | 8 |  |  | x**ô** |
| `i͡e͡w` | 6,4,7 |  |  | r**iêu** |
| `ɨ͡ə` | 6,1 |  | kh**ướ**t |  |
| `ɔ͡i` | 3,6 |  |  | m**ọi** |
| `ə` | 1 |  | ph**ầ**n |  |
| `ie` | 6,4 |  | b**iể**n |  |
| `u͡j` | 7,6 |  |  | m**ùi** |
| `a͡w` | 2,7 |  |  | b**ảo** |
| `ɨ` | 6 |  | ch**ừ**ng | t**ừ** |
| `ɐ` | 4 |  | nh**ặ**t |  |
| `ăw` | 2,7 |  |  | m**àu** |
| `ăj` | 2,6 |  |  | ng**ày** |
| `ɨ͡ə͡j` | 6,1,6 |  |  | l**ưới** |
| `o͡j` | 8,6 |  |  | h**ồi** |
| `əː` | 1 |  | l**ợ**n | s**ỡ** |
| `e` | 4 |  | s**ê**n | t**ế** |
| `ɔ̆w` | 3,7 |  |  | t**ấu** |
| `ɛ͡w` | 4,7 |  |  | b**éo** |
| `i͡w` | 6,7 |  |  | t**ịu** |
| `ɨ͡w` | 6,7 |  |  | t**ựu** |
| `e͡j` | 4,6 |  |  | b**êu** |
| `ɨ͡ʌ͡w` | 6,1,7 |  |  | b**ươu** |
| `ɨ͡j` | 6,6 |  |  | c**ửi** |
| `ɪ` | 6 | **i**nh | t**i**nh |  |
| `iə` | 6,1 |  |  | k**ìa** |
| `a͡ʲ` | 2 | **a**ch | họ**a**ch |  |

### Consonant for vi-VN

| `ipa` | `viseme` | Example 1 | Example 2 | Example 3 |
| --- | --- | --- | --- | --- |
| `ɓ` | 21 | **b**a |  |  |
| `k` | 20 | **c**anh |  | diệ**c** |
| `z` | 15 | **d**iễn |  |  |
| `j` | 6 | **gi**ặc |  |  |
| `ɹ` | 13 | **r**óc |  |  |
| `f` | 18 | **ph**ụ |  |  |
| `ɣ` | 20 | **g**à |  |  |
| `h` | 12 | **h**oa |  |  |
| `l` | 14 | **l**àm |  |  |
| `m` | 21 | **m**ười |  | nắ**m** |
| `n` | 19 | **n**úi |  | tiề**n** |
| `p` | 21 | **p**in |  | phá**p** |
| `s` | 15 | **x**ào |  |  |
| `ʂ` | 15 | **s**on |  |  |
| `t` | 19 | **t**uổi |  | hế**t** |
| `v` | 18 | **v**àng |  |  |
| `ɗ` | 19 | **đ**ón |  |  |
| `ŋ` | 20 | **ng**ủn |  | lư**ng** |
| `x` | 12 | **kh**ùng |  |  |
| `ɲ` | 19 | **nh**àm |  | sa**nh** |
| `tʰ` | 19 | **th**ông |  |  |
| `ʈ` | 19 | **tr**ùng |  |  |
| `t͡ʃ` | 19,16 | **ch**im |  | **ch**ỉ |
| `w` | 7 |  | h**o**ang |  |

### Tone for vi-VN

| `ipa` | `Description` | Example |
| --- | --- | --- |
| `̄` | tone ngang | xem |
| `̀̏͡` | tone huyền | làm |
| `̄̋͡` | tone sắc | sống |
| `̄̏̄͡͡` | tone hỏi | phải |
| `́̋͡` | tone ngã | cũng |
| `̄̀͡` | tone nặng | một |


## zh-CN

The Speech service phone set `sapi` for `zh-CN` uses notation based on the native <a href="https://en.wikipedia.org/wiki/Pinyin" target="_blank">Pinyin</a> phone set.

> **Important:**
> In SSML, set the `phoneme` element's `alphabet` attribute to `sapi`, not `pinyin`. For example: `<phoneme alphabet="sapi" ph="ni 3 hao 3">你好</phoneme>`.

### Pinyin Initials for zh-CN

| Pinyin | `viseme` | Character example | `sapi` example |
| --- | --- | --- | --- |
| b | 21 | 玻 | **b**o 1 |
| p | 21 | 坡 | **p**o 1 |
| m | 21 | 摸 | **m**o 1 |
| f | 18 | 佛 | **f**o 2 |
| d | 19 | 得 | **d**e 2 |
| t | 19 | 特 | **t**e 4 |
| n | 19 | 呢 | **n**e 5 |
| l | 14 | 乐 | **l**e 4 |
| g | 20 | 哥 | **g**e 1 |
| k | 20 | 科 | **k**e 1 |
| h | 12 | 喝 | **h**e 1 |
| j | 16 | 基 | **j**i 1 |
| q | 16 | 欺 | **q**i 1 |
| x | 16 | 希 | **x**i 1 |
| zh | 19, 15 | 知 | **zh**i 1 |
| ch | 19, 15 | 吃 | **ch**i 1 |
| sh | 15 | 诗 | **sh**i 1 |
| r | 15 | 日 | **r**i 4 |
| z | 15 | 资 | **z**i 1 |
| c | 15 | 此 | **c**i 3 |
| s | 15 | 思 | **s**i 1 |
| y | 6 | 衣 | **y**i 1 |
| w | 7 | 屋 | **w**u 1 |

### Pinyin Finals for zh-CN

| Pinyin | `viseme` | Character example | `sapi` example |
| --- | --- | --- | --- |
| a | 2, 2    (19, 2, 2 for no initials) | 法 | f**a** 3 |
| o | 7, 8, 8  (19, 8, 8 for no initials) | 泼 | p**o** 1 |
| e | 1, 1    (19, 1, 1 for no initials) | 歌 | g**e** 1 |
| i | 6, 6, 6 | 理 | l**i** 3 |
| u | 7, 7, 7 | 步 | b**u** 4 |
| v | 7, 4, 4 | 女 | n**v** 3 |
| ai | 2, 4    (19, 2, 4 for no initials) | 百 | b**ai** 3 |
| ei | 4, 6    (19, 4, 6 for no initials) | 北 | b**ei** 3 |
| ui | 7, 4, 6 | 对 | d**ui** 4 |
| ao | 2, 8    (19, 2, 8 for no initials) | 号 | h**ao** 4 |
| ou | 8, 7    (19, 8, 7 for no initials) | 走 | z**ou** 3 |
| iu | 6, 8, 7 | 牛 | n**iu** 2 |
| ie | 6, 4, 4 | 谢 | x**ie** 4 |
| ue | 7, 4, 4 | 略 | l**ue** 4 |
| er | 19, 1, 1 | 耳 | **er** 3 |
| an | 2, 19   (19, 2, 19 for no initials) | 喊 | h**an** 3 |
| en | 1, 19   (19, 1, 19 for no initials) | 肯 | k**en** 3 |
| in | 6, 6, 19 | 宾 | b**in** 1 |
| un | 7, 1, 19 | 尊 | z**un** 1 |
| ang | 2, 20   (19, 2, 20 for no initials) | 朗 | l**ang** 3 |
| eng | 1, 20 | 恒 | h**eng** 2 |
| ing | 6, 1, 20 | 赢 | y**ing** 2 |
| ong | 7, 7, 20 | 红 | h**ong** 2 |
| ia | 6, 2, 2 | 家 | j**ia** 1 |
| ian | 6, 2, 19 | 面 | m**ian** 4 |
| iang | 6, 2, 20 | 象 | x**iang** 4 |
| iao | 6, 2, 8 | 表 | b**iao** 3 |
| iong | 7, 7, 20 | 兄 | x**iong** 1 |
| ua | 7, 2, 2 | 花 | h**ua** 1 |
| uai | 7, 2, 4 | 帅 | sh**uai** 4 |
| uan | 7, 2, 19 | 短 | d**uan** 3 |
| uang | 7, 2, 20 | 广 | g**uang** 3 |
| uo | 7, 8, 8 | 多 | d**uo** 1 |

### Pinyin Whole syllable for zh-CN

| Pinyin | `viseme` | Character example | `sapi` example |
| --- | --- | --- | --- |
| zhi | 19, 15, 6, 6 | 知 | **zhi** 1 |
| chi | 19, 15, 6, 6 | 吃 | **chi** 1 |
| shi | 15, 6, 6 | 诗 | **shi** 1 |
| ri | 15, 6, 6 | 日 | **ri** 1 |
| zi | 15, 6, 6 | 资 | **zi** 1 |
| ci | 15, 6, 6 | 词 | **ci** 2 |
| si | 15, 6, 6 | 斯 | **si** 1 |
| yi | 6, 6, 6 | 衣 | **yi** 1 |
| wu | 7, 7, 7 | 屋 | **wu** 1 |
| yu | 7, 4, 4 | 鱼 | **yu** 2 |
| ye | 6, 4, 4 | 叶 | **ye** 4 |
| yue | 7, 4, 4 | 月 | **yue** 4 |
| yuan | 7, 2, 19 | 圆 | **yuan** 2 |
| yin | 6, 6, 19 | 音 | **yin** 1 |
| yun | 7, 1, 19 | 云 | **yun** 1 |
| ying | 6, 1, 20 | 英 | **ying** 1 |
| a | 19, 2, 2 | 啊 | **a** 1 |
| o | 19, 8, 8 | 噢 | **o** 1 |
| e | 19, 1, 1 | 鹅 | **e** 2 |
| ai | 19, 2, 4 | 爱 | **ai** 4 |
| ei | 19, 4, 6 | 欸 | **ei** 1 |
| ao | 19, 2, 8 | 奥 | **ao** 4 |
| ou | 19, 8, 7 | 偶 | **ou** 3 |
| an | 19, 2, 19 | 安 | **an** 1 |
| en | 19, 1, 19 | 恩 | **en** 1 |
| ang | 19, 2, 20 | 昂 | **ang** 2 |

### Pinyin Tone for zh-CN

| Pinyin | Character example | `sapi` example |
| --- | --- | --- |
| bā | 八 | ba **1** |
| bá | 拔 | ba **2** |
| bǎ | 把 | ba **3** |
| bà | 坝 | ba **4** |
| ba | 吧 | ba **5** |

#### Example for zh-CN

| Character | Speech service |
| --- | --- |
| 组织关系 | zu 3 - zhi 1 - guan 1 - xi 5 |
| 累进 | lei 3 - jin 4 |
| 西宅巷 | xi 1 - zhai 2 - xiang 4 |
| 一会儿 | yi 2 - hui r 4 |


## zh-HK/yue-CN

The Speech service phone set `sapi` for `zh-HK` uses notation based on the native <a href="https://en.wikipedia.org/wiki/Jyutping" target="_blank">Jyutping</a> phone set.

> **Important:**
> In SSML, set the `phoneme` element's `alphabet` attribute to `sapi`, not `jyutping`. For example: `<phoneme alphabet="sapi" ph="nei 5 hou 2">你好</phoneme>`.

### Jyutping Initials for zh-HK

| Jyutping | Character example | `sapi` example | VisemeID |
| --- | --- | --- | --- |
| p | 怕 | **p**aa 3 | 21 |
| b | 巴 | **b**aa 1 | 21 |
| t | 他 | **t**aa 1 | 19 |
| d | 打 | **d**aa 2 | 19 |
| k | 卡 | **k**aa 1 | 20 |
| g | 家 | **g**aa 1 | 20 |
| f | 花 | **f**aa 1 | 18 |
| s | 沙 | **s**aa 1 | 15 |
| h | 蝦 | **h**aa 1 | 12 |
| m | 媽 | **m**aa 1 | 21 |
| n | 那 | **n**aa 5 | 19 |
| ng | 牙 | **ng**aa 4 | 20 |
| c | 叉 | **c**aa 1 | 19 15 |
| z | 渣 | **z**aa 1 | 19 15 |
| l | 啦 | **l**aa 1 | 14 |
| kw | 誇 | **kw**aa 1 | 20 |
| gw | 瓜 | **gw**aa 1 | 20 |
| w | 蛙 | **w**aa 1 | 7 |
| j | 廿 | **j**aa 6 | 6 |

### Jyutping Middle for zh-HK

| Jyutping | Character example | `sapi` example | VisemeID |
| --- | --- | --- | --- |
| aa | 沙 | s**aa** 1 | 2 |
| e | 些 | s**e** 1 | 4 |
| i | 詩 | s**i** 1 | 6 |
| o | 疏 | s**o** 1 | 3 In [**o**u], [o] corresponding viseme is 8 |
| u | 夫 | f**u** 1 | 7 |
| oe | 鋸 | g**oe** 3 | 4 |
| yu | 書 | s**yu** 1 | 4 |
| a | 新 | s**a**n 1 | 4 |
| eo | 律 | l**eo**t 6 | 1 |

### Jyutping Ending for zh-HK

| Jyutping | Character example | `sapi` example | VisemeID |
| --- | --- | --- | --- |
| i | 西 | sa**i** 1 | 6 (In [eo**i**], [i] corresponding viseme is 4) |
| u | 收 | sa**u** 1 | 7 |
| p | 夾 | ge**p** 6 | 21 |
| t | 不 | ba**t** 1 | 19 |
| k | 策 | caa**k** 3 | 20 |
| m | 心 | sa**m** 1 | 21 |
| n | 新 | sa**n** 1 | 19 |
| ng | 敬 | gi**ng** 3 | 20 |

### Jyutping Tone for zh-HK

| Tone number | Description | Character example | `sapi` example |
| --- | --- | --- | --- |
| 1 | High level/High falling or Entering High Level | 詩 | si **1** |
| 2 | Mid Rising | 史 |  si **2** |
| 3 | Mid Level or Entering Mid Level | 試 |  si **3** |
| 4 | Low Falling | 時 |  si **4** |
| 5 | Low Rising | 市 |  si **5** |
| 6 | Low Level or Entering Low Level | 是 |  si **6** |



## zh-TW

The Speech service phone set `sapi` for `zh-TW` uses notation based on the native <a href="https://zh.wikipedia.org/wiki/%E6%B3%A8%E9%9F%B3%E7%AC%A6%E8%99%9F" target="_blank">Bopomofo</a> phone set.

> **Important:**
> In SSML, set the `phoneme` element's `alphabet` attribute to `sapi`, not `bopomofo`.  For example: `<phoneme alphabet="sapi" ph="ㄋㄧˇ ㄏㄠˇ">你好</phoneme>`.

### Bopomofo Initials for zh-TW

| Bopomofo | Pinyin | `sapi` Example  <br> (Bopomofo, Pinyin) |
| --- | --- | --- |
| ㄅ | b | 玻 (**ㄅ**ㄛ, **b**o 1) |
| ㄆ | p | 坡 (**ㄆ**ㄛ, **p**o 1) |
| ㄇ | m | 摸 (**ㄇ**ㄛ, **m**o 1) |
| ㄈ | f | 佛 (**ㄈ**ㄛˊ, **f**o 2) |
| ㄉ | d | 得 (**ㄉ**ㄜˊ, **d**e 2) |
| ㄊ | t | 特 (**ㄊ**ㄜˋ, **t**e 4) |
| ㄋ | n | 呢 (**ㄋ**ㄜ˙, **n**e 5) |
| ㄌ | l | 樂 (**ㄌ**ㄜˋ, **l**e 4) |
| ㄍ | g | 哥 (**ㄍ**ㄜ, **g**e 1) |
| ㄎ | k | 科 (**ㄎ**ㄜ, **k**e 1) |
| ㄏ | h | 喝 (**ㄏ**ㄜ, **h**e 1) |
| ㄐ | j | 基 (**ㄐ**ㄧ, **j**i 1) |
| ㄑ | q | 欺 (**ㄑ**ㄧ, **q**i 1) |
| ㄒ | x | 希 (**ㄒ**ㄧ, **x**i 1) |
| ㄓ | zh | 知 (**ㄓ**, **zh**i 1) |
| ㄔ | ch | 吃 (**ㄔ**, **ch**i 1) |
| ㄕ | sh | 詩 (**ㄕ**, **sh**i 1) |
| ㄖ | r | 日 (**ㄖ**ˋ, **r**i 4) |
| ㄗ | z | 资 (**ㄗ**, **z**i 1) |
| ㄘ | c | 此 (**ㄘ**ˇ, **c**i 3) |
| ㄙ | s | 思 (**ㄙ**, **s**i 1) |
| ㄧ | y | 衣 (**ㄧ**, **y**i 1) |
| ㄨ | w | 屋 (**ㄨ**, **w**u 1) |

### Bopomofo Finals for zh-TW

| Bopomofo | Pinyin | `sapi` Example  <br> (Bopomofo, Pinyin) |
| --- | --- | --- |
| ㄚ | a | 法 (ㄈ**ㄚ**ˇ, f**a** 3) |
| ㄛ | o | 潑 (ㄆ**ㄛ**, p**o** 1) |
| ㄜ | e | 歌 (ㄍ**ㄜ**, g**e** 1) |
| ㄧ | i | 理 (ㄌ**ㄧ**ˇ, l**i** 3) |
| ㄨ | u | 步 (ㄅ**ㄨ**ˋ, b**u** 4) |
| ㄩ | v | 女 (ㄋ**ㄩ**ˇ, n**v** 3) |
| ㄞ | ai | 百 (ㄅ**ㄞ**ˇ, b**ai** 3) |
| ㄟ | ei | 北 (ㄅ**ㄟ**ˇ, b**ei** 3) |
| ㄨㄟ | ui | 對 (ㄉ**ㄨㄟ**ˋ, d**ui** 4) |
| ㄠ | ao | 號 (ㄏ**ㄠ**ˋ, h**ao** 4) |
| ㄡ | ou | 走 (ㄗ**ㄡ**ˇ, z**ou** 3) |
| ㄧㄡ | iu | 牛 (ㄋ**ㄧㄡ**ˊ, n**iu** 2) |
| ㄧㄝ | ie | 謝 (ㄒ**ㄧㄝ**ˋ, x**ie** 4) |
| ㄩㄝ | ue | 略 (ㄌ**ㄩㄝ**ˋ, l**ue** 4) |
| ㄢ | an | 喊 (ㄏ**ㄢ**ˇ, h**an** 3) |
| ㄣ | en | 肯 (ㄎ**ㄣ**ˇ, k**en** 3) |
| ㄧㄣ | in | 賓 (ㄅ**ㄧㄣ**, b**in** 1) |
| ㄨㄣ | un | 尊 (ㄗ**ㄨㄣ**, z**un** 1) |
| ㄤ | ang | 朗 (ㄌ**ㄤ**ˇ, l**ang** 3) |
| ㄥ | eng | 恆 (ㄏ**ㄥ**ˊ, h**eng** 2) |
| ㄧㄥ | ing | 贏 (**ㄧㄥ**ˊ, y**ing** 2) |
| ㄨㄥ | ong | 紅 (ㄏ**ㄨㄥ**ˊ, h**ong** 2) |
| ㄧㄚ | ia | 家 (ㄐ**ㄧㄚ**, j**ia** 1) |
| ㄧㄢ | ian | 麵 (ㄇ**ㄧㄢ**ˋ, m**ian** 4) |
| ㄧㄤ | iang | 象 (ㄒ**ㄧㄤ**ˋ, x**iang** 4) |
| ㄧㄠ | iao | 表 (ㄅ**ㄧㄠ**ˇ, b**iao** 3) |
| ㄩㄥ | iong | 兄 (ㄒ**ㄩㄥ**, x**iong** 1) |
| ㄨㄚ | ua | 花 (ㄏ**ㄨㄚ**, h**ua** 1) |
| ㄨㄞ | uai | 帥 (ㄕ**ㄨㄞ**ˋ, sh**uai** 4) |
| ㄨㄢ | uan | 短 (ㄉ**ㄨㄢ**ˇ, d**uan** 3) |
| ㄨㄤ | uang | 廣 (ㄍ**ㄨㄤ**ˇ, g**uang** 3) |
| ㄨㄛ | uo | 多 (ㄉ**ㄨㄛ**, d**uo** 1) |

### Bopomofo Whole syllable zh-TW

| Bopomofo | Pinyin | `sapi` Example  <br> (Bopomofo, Pinyin) |
| --- | --- | --- |
| ㄓ | zhi | 知 (**ㄓ**, **zhi** 1) |
| ㄔ | chi | 吃 (**ㄔ**, **chi** 1) |
| ㄕ | shi | 诗 (**ㄕ**, **shi** 1) |
| ㄖ | ri | 日 (**ㄖ**, **ri** 1) |
| ㄗ | zi | 资 (**ㄗ**, **zi** 1) |
| ㄘ | ci | 词 (**ㄘ**ˊ, **ci** 2) |
| ㄙ | si | 斯 (**ㄙ**, **si** 1) |
| ㄧ | yi | 衣 (**ㄧ**, **yi** 1) |
| ㄨㄛ | wo | 我 (**ㄨㄛ**ˇ, **wo** 3) |
| ㄨ | wu | 屋 (**ㄨ**, **wu** 1) |
| ㄩ | yu | 鱼 (**ㄩ**ˊ, **yu** 2) |
| ㄧㄝ | ye | 叶 (**ㄧㄝ**ˋ, **ye** 4) |
| ㄩㄝ | yue | 月 (**ㄩㄝ**ˋ, **yue** 4) |
| ㄦ | er | 耳 (**ㄦ**ˇ, **er** 3) |
| ㄩㄢ | yuan | 圆 (**ㄩㄢ**ˊ, **yuan** 2) |
| ㄧㄣ | yin | 音 (**ㄧㄣ**, **yin** 1) |
| ㄩㄣ | yun | 云 (**ㄩㄣ**, **yun** 1) |
| ㄧㄥ | ying | 英 (**ㄧㄥ**, **ying** 1) |
| ㄩㄥ | yong | 擁 (**ㄩㄥ**, **yong** 1) |
| ㄚ | a | 啊 (**ㄚ**, **a** 1) |
| ㄛ | o | 噢 (**ㄛ**, **o** 1) |
| ㄜ | e | 鹅 (**ㄜ**ˊ, **e** 2) |
| ㄞ | ai | 爱 (**ㄞ**ˋ, **ai** 4) |
| ㄟ | ei | 欸 (**ㄟ**, **ei** 1) |
| ㄠ | ao | 奥 (**ㄠ**ˋ, **ao** 4) |
| ㄡ | ou | 偶 (**ㄡ**ˇ, **ou** 3) |
| ㄢ | an | 安 (**ㄢ**, **an** 1) |
| ㄣ | en | 恩 (**ㄣ**, **en** 1) |
| ㄤ | ang | 昂 (**ㄤ**ˊ, **ang** 2) |
| ㄥ | eng | 鞥 (**ㄥ**, **eng** 1) |
| ㄝ | ê | ㄝ (**ㄝ**, **ê** 1) |

### Bopomofo tone zh-TW

| Bopomofo | Tone number | `sapi` Example <br> (Bopomofo, Pinyin) |
| --- | --- | --- |
| ˉ | 1 | 八 (ㄅㄚ or ㄅㄚ**ˉ**, ba **1**) |
| ˊ | 2 | 拔 (ㄅㄚ**ˊ**, ba **2**) |
| ˇ | 3 | 把 (ㄅㄚ**ˇ**, ba **3**) |
| ˋ | 4 | 坝 (ㄅㄚ**ˋ**, ba **4**) |
| ˙ | 5 | 吧 (ㄅㄚ**˙**, ba **5**) |


## Map X-SAMPA to IPA

When using X-SAMPA phone symbols `'` and `"`, it’s important to avoid conflicts with the wrapper symbol. If the X-SAMPA string contains phone `'`, we recommend using phone `_j` instead. If you don’t want to replace the phone `'`, you need to use double quotes `"` as a wrapper. Similarly, if the X-SAMPA string contains phone `"`, then double quotes shouldn't be used as a wrapper, and you must use the single quote `'` as a wrapper. Otherwise, it will cause an error.

The table below shows a mapping relationship between X-SAMPA (Extended Speech Assessment Methods Phonetic Alphabet) and IPA alphabets. The X-SAMPA symbols are shown at left, with the corresponding IPA symbols to the right.

```txt
x-sampa (L)  ipa (R)
a	           a
b	           b
b_<	           ɓ
c	           c
d	           d
d`	           ɖ
d_<	           ɗ
e	           e
f	           f
g	           ɡ
g_<	           ɠ
h	           h
h\	           ɦ
i	           i
j	           j
j\	           ʝ
k	           k
l	           l
l`	           ɭ
l\	           ɺ
m	           m
n	           n
n`	           ɳ
o	           o
p	           p
p\	           ɸ
q	           q
r	           r
r`	           ɽ
r\	           ɹ
r\`	           ɻ
s	           s
s`	           ʂ
s\	           ɕ
t	           t
t`	           ʈ
u	           u
v	           v
P	           ʋ
v\	           ʋ
w	           w
x	           x
x\	           ɧ
y	           y
z	           z
z`	           ʐ
z\	           ʑ
A	           ɑ
B	           β
B\	           ʙ
C	           ç
D	           ð
E	           ɛ
F	           ɱ
G	           ɣ
G\	           ɢ
G\_<	       ʛ
H	           ɥ
H\	           ʜ
I	           ɪ
I\	           ᵻ
J	           ɲ
J\	           ɟ
J\_<	       ʄ
K	           ɬ
K\	           ɮ
L	           ʎ
L\	           ʟ
M	           ɯ
M\	           ɰ
N	           ŋ
N\	           ɴ
O	           ɔ
O\	           ʘ
Q	           ɒ
R	           ʁ
R\	           ʀ
S	           ʃ
T	           θ
U	           ʊ
U\	           ᵿ
V	           ʌ
W	           ʍ
X	           χ
X\	           ħ
Y	           ʏ
Z	           ʒ
.	           .
"	           ˈ
%	           ˌ
_j	           ʲ
'	           ʲ
:	           ː
:\	           ˑ
@	           ə
@\	           ɘ
@`	           ˞ɚ
{	           æ
}	           ʉ
1	           ɨ
2	           ø
3	           ɜ
3\	           ɞ
4	           ɾ
5	           ɫ
6	           ɐ
7	           ɤ
8	           ɵ
9	           œ
&	           ɶ
?	           ʔ
?\	           ʕ
<\	           ʢ
>\	           ʡ
^	           ꜛ
!	           ꜜ
!\	           ǃ
|	           |
|\	           ǀ
‖	           ‖
|\|\	       ǁ
=\	           ǂ
-\	           ‿
_"             	̈    
_+             	̟ 
_-             	̠  
_/              ̌ 
_0             	̥
=              	̩
_=             	̩  
_>               ʼ
_?\            	ˤ
_\             	̂
_^             	̯ 
_}             	̚
`               ˞
~              	̃  
_~             	̃
_A             	̘
_a             	̺
_B             	̏
_B_L           	᷅
_c             	̜
_d             	̪
_e             	̴
<F>            	↘
_F             	̂
_G             	ˠ
_H             	́
_H_T             ᷄
_h             	ʰ
_k             	̰
_L             	̀`
_l             	ˡ
_M             	̄
_m             	̻
_N             	̼ 
_n             	ⁿ
_O             	̹
_o             	̞
_q             	̙
<R>            	↗
_R             	̌
_R_F           	᷈
_r             	̝
_T             	̋
_t             	̤
_v             	̬
_w             	ʷ
_X             	̆
_x             	̽ 
```
