---
title: Structured text phonetic pronunciation data
description: Use phonemes to customize pronunciation of words in Speech to text.
author: PatrickFarley
ms.author: pafarley
ms.service: azure-speech-foundry-tools
ms.topic: concept-article
ms.date: 02/25/2026
ms.custom: template-concept
ai-usage: ai-assisted
---

# Structured text phonetic pronunciation data

You can specify the phonetic pronunciation of words using the Universal Phone Set (UPS) in a [structured text data](how-to-custom-speech-test-and-train.md#structured-text-data-for-training) file. The UPS is a machine-readable phone set that is based on the International Phonetic Set Alphabet (IPA). The IPA is a standard used by linguists worldwide.

UPS pronunciations consist of a string of UPS phonemes, each separated by whitespace. UPS phoneme labels are all defined using ASCII character strings.

For steps on implementing UPS, see [Structured text phonetic pronunciation](how-to-custom-speech-test-and-train.md#structured-text-data-for-training). Structured text phonetic pronunciation data is separate from [pronunciation data](how-to-custom-speech-test-and-train.md#pronunciation-data-for-training), and they can't be used together. The first one is "sounds-like" or spoken-form data, and is input as a separate file, and trains the model what the spoken form sounds like 

[Structured text phonetic pronunciation data](how-to-custom-speech-test-and-train.md#structured-text-data-for-training) is specified per syllable in a markdown file. Separately, [pronunciation data](how-to-custom-speech-test-and-train.md#pronunciation-data-for-training) is input on its own, and trains the model what the spoken form sounds like. You can either use a pronunciation data file on its own, or you can add pronunciation within a structured text data file. The Speech service doesn't support training a model with both of those datasets as input.

See the sections in this article for the Universal Phone Set for each locale.

## en-US


#### Consonants

| UPS Phonemes | IPA | Example |
| --- | --- | --- |
| `B` | b | big |
| `CH` | t.ʃ / ʧ | chin |
| `D` | d | dig |
| `DH` | ð | then |
| `F` | f | fork |
| `G` | g | gut |
| `H` | h | help |
| `JH` | d.ʒ / ʤ | joy |
| `K` | k | cut |
| `L` | l | lid |
| `M` | m | mat |
| `N` | n | no |
| `NG` | ŋ | sing |
| `P` | p | put |
| `R` | ɻ | red |
| `S` | s | sit |
| `SH` | ʃ | she |
| `T` | t | talk |
| `TH` | θ | thin |
| `V` | v | vat |
| `W` | w | with |
| `J` | j | yard |
| `Z` | z | zap |
| `ZH` | ʒ | pleasure |

### Vowels

| UPS Phonemes | IPA | Example |
| --- | --- | --- |
| `AA` | ɑ | father |
| `AE` | æ | cat |
| `AH` | ʌ | cut |
| `AO` | ɔ | dog |
| `AOX` | ɔ.ə | four |
| `AU` | ɑ.ʊ | foul |
| `AX` | ə | ago |
| `AX R` | ɚ | minor |
| `AI` | ɑ.ɪ | bite |
| `EH` | ɛ | pet |
| `EHX` | ɛ.ə | stairs |
| `ER R` | ɝ | urban |
| `EI` | e.ɪ | ate |
| `IH` | ɪ | fill |
| `I` | i | feel |
| `O` | o | go |
| `OI` | ɔ.ɪ | toy |
| `OWX` | o.ə | boa |
| `Q` | ɒ | hot |
| `UH` | ʊ | book |
| `U` | u | too, blue |
| `UWX` | u.ə | lure |


## Next steps

- [Upload your data](how-to-custom-speech-upload-data.md)
- [Test recognition quality](how-to-custom-speech-inspect-data.md)
- [Train your model](how-to-custom-speech-train-model.md)
