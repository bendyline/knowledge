---
title: Train your professional voice model - Speech service
titleSuffix: Foundry Tools
description: Learn about how to train your professional voice model. 
author: PatrickFarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: how-to
ms.date: 12/19/2025
ms.author: pafarley
ms.custom: references_regions
zone_pivot_groups: foundry-speech-studio-rest
#Customer intent: As a developer, I want to learn how to train my professional voice model.
---

# Train your professional voice model

**Applies to: ai-foundry-portal**


In this article, you learn how to fine-tune a professional voice through the Microsoft Foundry portal.

> **Important:**
> Professional voice fine-tuning is currently only available in some regions. After your voice model is trained in a supported region, you can [copy the professional voice model](#copy-your-voice-model-to-another-project) to a Microsoft Foundry resource in another region as needed. For supported training locations, check the **Custom voice training** column and footnotes in the [Text to speech regions table](regions.md?tabs=tts#regions).

Training duration varies depending on how much data you use. It takes about 10 compute hours on average to fine-tune a professional voice. With a Microsoft Foundry standard (S0) resource, you can train four voices simultaneously. If you reach the limit, wait until at least one of your voice models finishes training, and then try again.

> **Note:**
> Although the total number of hours required per [training method](#choose-a-training-method) varies, the same unit price applies to each. For more information, see the [custom neural training pricing details](https://azure.microsoft.com/pricing/details/cognitive-services/speech-services/).

## Choose a training method

# [Foundry (new)](#tab/foundry-new)

On the **Training data** step of **Customize a model**, select one of these training methods:

- **Neural - HD**: Create an HD voice in the same language as your training data. HD voices are LLM-based and optimized for dynamic conversations. For more information, see [High-definition voices](high-definition-voices.md).
- **Neural - Default**: Create a voice in the same language as your training data.
- **Neural - Multi lingual**: Create a voice that speaks multiple languages from single-language training data.
- **Neural - Multi style**: Create a voice that speaks in multiple styles and emotions.

After you select a method, select a recipe **Version**. The portal evaluates whether your datasets are eligible for that method and version.

# [Foundry (classic)](#tab/foundry-classic)

After you validate your data files, use them to build your custom voice model.
In Foundry (classic), choose one of these training methods:

- [Neural - HD Voice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Chdvoice#train-your-custom-voice-model): Create an HD voice in the same language of your training data. Azure neural HD voices are LLM-based, optimized for dynamic conversations. Learn more about [high-definition voices](high-definition-voices.md).

- [Neural](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Cneural#train-your-custom-voice-model): Create a voice in the same language as your training data.

- [Neural - multilingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Cmultilingual#train-your-custom-voice-model): Create a voice that speaks multiple languages using the single-language training data. For example, with the `en-US` primary training data, you can create a voice that speaks `en-US`, `de-DE`, `zh-CN` and other secondary languages.

  The primary language of the training data and the secondary languages must be in the [languages that are supported](language-support.md?tabs=tts#professional-voice) for multilingual voice training. You don't need to prepare training data in the secondary languages.

- [Neural - multi style](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Cmultistyle#train-your-custom-voice-model): Create a custom voice that speaks in multiple styles and emotions, without adding new training data. Multiple style voices are useful for video game characters, conversational chatbots, audiobooks, content readers, and more.

  To create a multiple style voice, you need to prepare a set of general training data, at least 300 utterances. Select one or more of the preset target speaking styles. You can also create multiple custom styles by providing style samples, of at least 100 utterances per style, as extra training data for the same voice. The supported preset styles vary according to different languages. See [available preset styles across different languages](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Cmultistyle#available-preset-styles-across-different-languages).

> **Note:**
> Neural - cross lingual retires on August 25, 2026. Voice models that you create by using this retired method aren't affected.

The language of the training data must be one of the [languages that are supported](language-support.md?tabs=tts) for custom voice or multiple style training.

---

## Train your custom voice model

To create a custom voice in the Microsoft Foundry portal, follow these steps for one of the following methods:

# [Foundry (new)](#tab/foundry-new)


In the new Microsoft Foundry portal, the **Customize a model** page uses a single **Training method** dropdown that covers all variants. These steps continue from the page you opened in [Set up a professional voice](professional-voice-create-project.md), after you upload training data on the **Training data** step.

If you closed the page, [resume your draft customization](professional-voice-create-project.md?tabs=foundry-new\&pivots=ai-foundry-portal#resume-an-unfinished-customization) before continuing.

1. On the **Training data** step, select the **Training method** that matches your scenario. Options include **Neural - HD**, **Neural - Default**, **Neural - Multi lingual**, and **Neural - Multi style**. For details about each method, see [Choose a training method](#choose-a-training-method).
1. Select the training recipe **Version**. The latest version is selected by default. The supported features and training time can vary by version. In some cases, you can choose an earlier version to reduce training time.
1. Confirm the **Model language**.
1. From the **Select dataset** dropdown, select an eligible dataset that you uploaded. The portal evaluates dataset eligibility for the selected training method and version because data-size and duration requirements vary by recipe.

   Screenshot of the Training data step with Training method, Version, and Select dataset outlined beside the dataset validation summary.

1. Select **Next**.
1. On the **Review** step, review the basic details, voice talent, training configuration, data size, test information, estimated training time, and cost warning.
1. Select the acknowledgment that training incurs account usage.
1. Select the acknowledgment to agree to the terms of use.
1. Select **Submit** to start training the model.


# [Foundry (classic)](#tab/foundry-classic)

In the Microsoft Foundry (classic) portal, select a training method below and follow the corresponding steps.


# [Neural - HD Voice](#tab/hdvoice)

1. Sign in to the [Microsoft Foundry (classic) portal](https://ai.azure.com/?cid=learnDocs).
1. Select **Fine-tuning** from the left pane and then select **AI Service fine-tuning**.
1. Select the professional voice fine-tuning task (by model name) that you [started as described in the create professional voice article](https://learn.microsoft.com/azure/ai-services/speech-service/professional-voice-create-project).
1. Select **Train model** > **+ Train model**. 
1. Select **Neural - HD** as the [training method](#choose-a-training-method) for your model. To use a different training method, see [Neural](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Cneural#train-your-custom-voice-model), [Neural - cross lingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Ccrosslingual#train-your-custom-voice-model), [Neural - multi style](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Cmultistyle#train-your-custom-voice-model), or [Neural - multilingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Cmultilingual#train-your-custom-voice-model).

   Screenshot that shows how to select neural HD training.

1. Select a version of the training recipe for your model. The latest version is selected by default. The supported features and training time can vary by version. Normally, use the latest version. In some cases, choose an earlier version to reduce training time.
1. Select the data that you want to use for training. Duplicate audio names are removed from the training. Make sure that the data you select doesn't contain the same audio names across multiple *.zip* files.

   You can select only successfully processed datasets for training. Check your data processing status if you don't see your training set in the list.

1. Select a speaker file with the voice talent statement that corresponds to the speaker in your training data.
1. Select **Next**.
1. Select a test script and then select **Next**. 
    - Each training generates 100 sample audio files automatically to help you test the model with a default script.
    - Alternatively, you can select **Add my own test script** and provide your own test script with up to 100 utterances to test the model at no extra cost. The generated audio files are a combination of the automatic test scripts and custom test scripts. For more information, see [test script requirements](#test-script-requirements).

1. Enter a **Voice model name**. Choose a name carefully. The model name is used as the voice name in your [speech synthesis request](professional-voice-deploy-endpoint.md#use-your-custom-voice) by the SDK and SSML input. Only letters, numbers, and a few punctuation characters are allowed. Use different names for different neural voice models.
1. Optionally, enter the **Description** to help you identify the model. A common use of the description is to record the names of the data that you used to create the model.
1. Select the checkbox to accept the terms of use and then select **Next**.
1. Review the settings and select the box to accept the terms of use.
1. Select **Train** to start training the model.

# [Neural](#tab/neural)

1. Sign in to the [Microsoft Foundry (classic) portal](https://ai.azure.com/?cid=learnDocs).
1. Select **Fine-tuning** from the left pane and then select **AI Service fine-tuning**.
1. Select the professional voice fine-tuning task (by model name) that you [started as described in the create professional voice article](https://learn.microsoft.com/azure/ai-services/speech-service/professional-voice-create-project).
1. Select **Train model** > **+ Train model**. 
1. Select **Neural** as the [training method](#choose-a-training-method) for your model. To use a different training method, see [Neural - cross lingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Ccrosslingual#train-your-custom-voice-model), [Neural - multi style](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Cmultistyle#train-your-custom-voice-model), [Neural - multilingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Cmultilingual#train-your-custom-voice-model), or [Neural - HD Voice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Chdvoice#train-your-custom-voice-model).

   Screenshot that shows how to select neural training.

1. Select a version of the training recipe for your model. The latest version is selected by default. The supported features and training time can vary by version. Normally, use the latest version. In some cases, choose an earlier version to reduce training time. See [Bilingual training](#bilingual-training) for more information about bilingual training and differences between locales.
   
1. Select **Next**.
1. Select the data that you want to use for training. Duplicate audio names are removed from the training. Make sure that the data you select doesn't contain the same audio names across multiple *.zip* files.

   You can select only successfully processed datasets for training. If you don't see your training set in the list, check your data processing status.

1. Select a speaker file with the voice talent statement that corresponds to the speaker in your training data.
1. Select **Next**.
1. Select a test script and then select **Next**. 
    - Each training generates 100 sample audio files automatically to help you test the model with a default script.
    - Alternatively, you can select **Add my own test script** and provide your own test script with up to 100 utterances to test the model at no extra cost. The generated audio files are a combination of the automatic test scripts and custom test scripts. For more information, see [test script requirements](#test-script-requirements).

1. Enter a **Voice model name**. Choose a name carefully. The model name is used as the voice name in your [speech synthesis request](professional-voice-deploy-endpoint.md#use-your-custom-voice) by the SDK and SSML input. Only letters, numbers, and a few punctuation characters are allowed. Use different names for different neural voice models.
1. Optionally, enter the **Description** to help you identify the model. A common use of the description is to record the names of the data that you used to create the model.
1. Select the checkbox to accept the terms of use and then select **Next**.
1. Review the settings and select the box to accept the terms of use.
1. Select **Train** to start training the model.

### Bilingual training


If you select the **Neural** training type, you can train a voice to speak in multiple languages. The `zh-CN`, `zh-HK`, and `zh-TW` locales support bilingual training for the voice to speak both Chinese and English. Depending in part on your training data, the synthesized voice can speak English with an English native accent or English with the same accent as the training data.

> **Note:**
> To enable a voice in the Chinese locale to speak English with the same accent as the sample data, upload English data that includes at least 100 sentences or 10 minutes of English content and doesn't exceed the amount of Chinese content.


# [Neural - multilingual](#tab/multilingual)

1. Sign in to the [Microsoft Foundry (classic) portal](https://ai.azure.com/?cid=learnDocs).
1. Select **Fine-tuning** from the left pane and then select **AI Service fine-tuning**.
1. Select the professional voice fine-tuning task (by model name) that you [started as described in the create professional voice article](https://learn.microsoft.com/azure/ai-services/speech-service/professional-voice-create-project).
1. Select **Train model** > **+ Train model**. 
1. Select **Neural - multilingual** as the [training method](#choose-a-training-method) for your model. To use a different training method, see [Neural](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Cneural#train-your-custom-voice-model), [Neural - cross lingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Ccrosslingual#train-your-custom-voice-model), [Neural - multi style](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Cmultistyle#train-your-custom-voice-model), or [Neural - HD Voice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Chdvoice#train-your-custom-voice-model).

   Screenshot that shows how to select neural multilingual training.

1. Select a version of the training recipe for your model. The latest version is selected by default. The supported features and training time can vary by version. Normally, we recommend the latest version. In some cases, you can choose an earlier version to reduce training time.
1. Select the **Additional language** that your voice speaks. You can select one or more secondary languages for a voice model and the voice speaks languages you selected from training data.
1. Select the data that you want to use for training. Duplicate audio names are removed from the training. Make sure that the data you select doesn't contain the same audio names across multiple *.zip* files.

   You can select only successfully processed datasets for training. Check your data processing status if you don't see your training set in the list.

1. Select a speaker file with the voice talent statement that corresponds to the speaker in your training data.
1. Select **Next**.
1. Select a test script and then select **Next**. 
    - Each training generates 100 sample audio files automatically to help you test the model with a default script.
    - Alternatively, you can select **Add my own test script** and provide your own test script with up to 100 utterances to test the model at no extra cost. The generated audio files are a combination of the automatic test scripts and custom test scripts. For more information, see [test script requirements](#test-script-requirements).

1. Enter a **Voice model name**. Choose a name carefully. The model name is used as the voice name in your [speech synthesis request](professional-voice-deploy-endpoint.md#use-your-custom-voice) by the SDK and SSML input. Only letters, numbers, and a few punctuation characters are allowed. Use different names for different neural voice models.
1. Optionally, enter the **Description** to help you identify the model. A common use of the description is to record the names of the data that you used to create the model.
1. Select the checkbox to accept the terms of use and then select **Next**.
1. Review the settings and select the box to accept the terms of use.
1. Select **Train** to start training the model.

# [Neural - multi style](#tab/multistyle)

1. Sign in to the [Microsoft Foundry (classic) portal](https://ai.azure.com/?cid=learnDocs).
1. Select **Fine-tuning** from the left pane and then select **AI Service fine-tuning**.
1. Select the professional voice fine-tuning task (by model name) that you [started as described in the create professional voice article](https://learn.microsoft.com/azure/ai-services/speech-service/professional-voice-create-project).
1. Select **Train model** > **+ Train model**. 
1. Select **Neural - multi style** as the [training method](#choose-a-training-method) for your model. To use a different training method, see [Neural](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Cneural#train-your-custom-voice-model), [Neural - cross lingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Ccrosslingual#train-your-custom-voice-model), [Neural - multilingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Cmultilingual#train-your-custom-voice-model), or [Neural - HD Voice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Chdvoice#train-your-custom-voice-model).

   Screenshot that shows how to select neural multi style training.

1. Select a version of the training recipe for your model. The latest version is selected by default. The supported features and training time can vary by version. Normally, we recommend the latest version. In some cases, you can choose an earlier version to reduce training time.
1. Select **Next**.
1. Select one or more preset speaking styles to train.
1. Select the data that you want to use for training. Duplicate audio names are removed from the training. Make sure that the data you select doesn't contain the same audio names across multiple *.zip* files.

   You can select only successfully processed datasets for training. Check your data processing status if you don't see your training set in the list.

1. Select **Next**.

1. Optionally, you can add other custom speaking styles. The maximum number of custom styles varies by languages: `English (United States)` allows up to 10 custom styles, `Chinese (Mandarin, Simplified)` allows up to four custom styles, and `Japanese (Japan)` allows up to five custom styles.

   1. Select **+ Add a custom style** and enter a custom style name of your choice. This name is used by your application within the `style` element of [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup-voice.md#use-speaking-styles-paralinguistics-and-roles). 
   1. Select style samples as training data. Ensure that the training data for custom speaking styles comes from the same speaker as the data used to create the default style.

1. Select **Next**.
1. Select a speaker file with the voice talent statement that corresponds to the speaker in your training data.
1. Select **Next**.
1. Select a test script and then select **Next**. 
    - Each training generates 100 sample audio files automatically to help you test the model with a default script.
    - Alternatively, you can select **Add my own test script** and provide your own test script with up to 100 utterances to test the model at no extra cost. The generated audio files are a combination of the automatic test scripts and custom test scripts. For more information, see [test script requirements](#test-script-requirements).

1. Enter a **Voice model name**. Choose a name carefully. The model name is used as the voice name in your [speech synthesis request](professional-voice-deploy-endpoint.md#use-your-custom-voice) by the SDK and SSML input. Only letters, numbers, and a few punctuation characters are allowed. Use different names for different neural voice models.
1. Optionally, enter the **Description** to help you identify the model. A common use of the description is to record the names of the data that you used to create the model.
1. Select the checkbox to accept the terms of use and then select **Next**.
1. Review the settings and select the box to accept the terms of use.
1. Select **Train** to start training the model.

### Available preset styles across different languages

The following table summarizes the different preset styles according to different languages.


| Speaking style | Language (locale) |
| :--- | :--- |
| angry | English (United States) (`en-US`)<br/>Japanese (Japan) (`ja-JP`) <sup>1</sup><br/>Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| calm | Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| chat | Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| cheerful | English (United States) (`en-US`)<br/>Japanese (Japan) (`ja-JP`) <sup>1</sup><br/>Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| disgruntled | Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| excited | English (United States) (`en-US`) |
| fearful | Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| friendly | English (United States) (`en-US`) |
| hopeful | English (United States) (`en-US`) |
| sad | English (United States) (`en-US`)<br/>Japanese (Japan) (`ja-JP`) <sup>1</sup><br/>Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| shouting | English (United States) (`en-US`) |
| serious | Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| terrified | English (United States) (`en-US`) |
| unfriendly | English (United States) (`en-US`) |
| whispering | English (United States) (`en-US`) |

<sup>1</sup> The neural voice style is available in public preview. For the current list of regions that support styles in public preview, see the [Speech service regions table](regions.md?tabs=tts). 


# [Neural - cross lingual](#tab/crosslingual)

1. Sign in to the [Microsoft Foundry (classic) portal](https://ai.azure.com/?cid=learnDocs).
1. Select **Fine-tuning** from the left pane and then select **AI Service fine-tuning**.
1. Select the professional voice fine-tuning task (by model name) that you [started as described in the create professional voice article](https://learn.microsoft.com/azure/ai-services/speech-service/professional-voice-create-project).
1. Select **Train model** > **+ Train model**. 
1. Select **Neural - Cross lingual** as the [training method](#choose-a-training-method) for your model. To use a different training method, see [Neural](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Cneural#train-your-custom-voice-model), [Neural - multi style](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Cmultistyle#train-your-custom-voice-model), [Neural - multilingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Cmultilingual#train-your-custom-voice-model), or [Neural - HD Voice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Chdvoice#train-your-custom-voice-model).

   Screenshot that shows how to select neural cross lingual training.

1. Select a version of the training recipe for your model. The latest version is selected by default. The supported features and training time can vary by version. Normally, we recommend the latest version. In some cases, you can choose an earlier version to reduce training time.
1. Select the **Primary target language** that your voice speaks. The voice speaks a different language from your training data. You can select only one target language for a voice model.
1. Select **Next**.
1. Select the data that you want to use for training. Duplicate audio names are removed from the training. Make sure that the data you select doesn't contain the same audio names across multiple *.zip* files.

   You can select only successfully processed datasets for training. Check your data processing status if you don't see your training set in the list.

1. Select a speaker file with the voice talent statement that corresponds to the speaker in your training data.
1. Select **Next**.
1. Select a test script and then select **Next**. 
    - Each training generates 100 sample audio files automatically to help you test the model with a default script.
    - Alternatively, you can select **Add my own test script** and provide your own test script with up to 100 utterances to test the model at no extra cost. The generated audio files are a combination of the automatic test scripts and custom test scripts. For more information, see [test script requirements](#test-script-requirements).

1. Enter a **Voice model name**. Choose a name carefully. The model name is used as the voice name in your [speech synthesis request](professional-voice-deploy-endpoint.md#use-your-custom-voice) by the SDK and SSML input. Only letters, numbers, and a few punctuation characters are allowed. Use different names for different neural voice models.
1. Optionally, enter the **Description** to help you identify the model. A common use of the description is to record the names of the data that you used to create the model.
1. Select the checkbox to accept the terms of use and then select **Next**.
1. Review the settings and select the box to accept the terms of use.
1. Select **Train** to start training the model.

---


---

## Monitor the training process

# [Foundry (new)](#tab/foundry-new)

1. 
Sign in to 
[Microsoft Foundry](https://ai.azure.com/?cid=learnDocs)
. Make sure the **New Foundry** toggle is on. These steps refer to **Foundry (new)**.



1. Select **Build** from the upper-right menu.
1. Select **Services** in the left pane.
1. Select the **Customizations** tab to view your Professional Voice customization jobs and their status.

   Screenshot of a succeeded Professional Voice customization job in the new Foundry portal.

1. To stop a model that's still training, select its name, and then select **Cancel training**. You aren't charged for canceled training.
1. After the status changes to **Succeeded**, select the model name to open its **Details** page. The page displays the training and deployment status, task parameters, model attributes, training data, engine version, creation time, and model ID.

### Troubleshoot training

If training fails, review the reported error before starting another job. For data-related errors, [review your dataset's validation results](professional-voice-create-training-set.md?tabs=foundry-new\&pivots=ai-foundry-portal#review-data-issues) and correct the affected recordings or transcripts. If you can't resolve the failure, [contact support](https://learn.microsoft.com/azure/ai-services/cognitive-services-support-options).

# [Foundry (classic)](#tab/foundry-classic)

The **Train model** table displays a new entry that corresponds to this newly created model. The status reflects the process of converting your data to a voice model, as described in this table:

| State | Meaning |
| :--- | :--- |
| Processing | Your voice model is being created. |
| Succeeded | Your voice model has been created and can be deployed. |
| Failed | Your voice model has failed in training. The cause of the failure might be, for example, unseen data problems or network issues. |
| Canceled | The training for your voice model was canceled. |

While the model status is **Processing**, you can select the model and then select **Cancel training** to cancel training. You're not charged for this canceled training.

Screenshot that shows how to cancel training for a model.

After you finish training the model successfully, you can review the model details and [Test your voice model](#test-your-voice-model).

### Rename your model

You have to clone your model to rename it. You can't rename the model directly. 

1. Select the model.
1. Select **Clone model** to create a clone of the model with a new name in the current project.
1. Enter the new name on the **Clone voice model** window.
1. Select **Submit**. The text *Neural* is automatically added as a suffix to your new model name.

### Test your voice model

After your voice model is successfully built, you can use the generated sample audio files to test it before you deploy it.

> **Note:**
> [Neural - multilingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Cmultilingual#train-your-custom-voice-model) and [Neural - HD Voice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=foundry-classic%2Chdvoice#train-your-custom-voice-model) don't support this type of testing.

The quality of the voice depends on many factors, such as:

- The size of the training data.
- The quality of the recording.
- The accuracy of the transcript file.
- How well the recorded voice in the training data matches the personality of the designed voice for your intended use case.

Select **DefaultTests** under **Testing** to listen to the sample audio files. The default test samples include 100 sample audio files generated automatically during training to help you test the model. In addition to these 100 audio files provided by default, your own test script utterances are also added to **DefaultTests** set. This addition is at most 100 utterances. You're not charged for the testing with **DefaultTests**.

If you want to upload your own test scripts to further test your model, select **Add test scripts** to upload your own test script.

Before you upload test script, check the [Test script requirements](#test-script-requirements). You're charged for the extra testing with the batch synthesis based on the number of billable characters. See [Azure Speech in Foundry Tools pricing](https://azure.microsoft.com/pricing/details/cognitive-services/speech-services/).

Under **Add test scripts**, select **Browse for a file** to select your own script, then select **Add** to upload it.

### Test script requirements

The test script must be a *.txt* file that is less than 1 MB. Supported encoding formats include ANSI/ASCII, UTF-8, UTF-8-BOM, UTF-16-LE, or UTF-16-BE.

Unlike the [training transcription files](how-to-custom-voice-training-data.md#transcription-data-for-individual-utterances-and-matching-transcript), the test script should exclude the utterance ID, which is the filename of each utterance. Otherwise, these IDs are spoken.

Here's an example set of utterances in one *.txt* file:

```text
This is the waistline, and it's falling.
We have trouble scoring.
It was Janet Maslin.
```

Each paragraph of the utterance results in a separate audio. If you want to combine all sentences into one audio, make them a single paragraph.

> **Note:**
> The generated audio files are a combination of the automatic test scripts and custom test scripts.

---

## Update engine version for your voice model

Azure text to speech engines are updated from time to time to capture the latest language model that defines the pronunciation of the language. After you train your voice, you can apply your voice to the new language model by updating to the latest engine version.

# [Foundry (new)](#tab/foundry-new)

1. Select **Build** > **Services** > **Customizations**.
1. Select the name of the Professional Voice model.
1. When the model details page indicates that a new engine is available, select **Install the latest engine**.
1. In the **Install the latest engine** dialog, select **Confirm**. The update creates a new engine version at no extra cost and keeps the existing versions.

The new engine version becomes the default version. To use another installed version as the default, select the **Engine version** value on the model details page, select the version, and then select **Done**.

Screenshot of the Engine version dialog in the new Foundry portal.

# [Foundry (classic)](#tab/foundry-classic)

- When a new engine is available, you're prompted to update your neural voice model.
- Go to the model details page and follow the on-screen instructions to install the latest engine.
- Alternatively, select **Install the latest engine** later to update your model to the latest engine version. You're not charged for engine update. The previous versions are still kept.
- You can check all engine versions for the model from the **Engine version** list, or remove one if you don't need it anymore.

The updated version is automatically set as default. But you can change the default version by selecting a version from the drop-down list and selecting **Set as default**.

If you want to test each engine version of your voice model, you can select a version from the list, then select **DefaultTests** under **Testing** to listen to the sample audio files. If you want to upload your own test scripts to further test your current engine version, first make sure the version is set as default, then follow the steps in [Test your voice model](#test-your-voice-model).

---

Updating the engine creates a new version of the model at no extra cost. After you update the engine version for your voice model, you need to deploy the new version to [create a new endpoint](professional-voice-deploy-endpoint.md#add-a-deployment-endpoint). You can only deploy the default version.

After you create a new endpoint, you need to [transfer the traffic to the new endpoint in your product](professional-voice-deploy-endpoint.md#switch-to-a-new-voice-model-in-your-product).

To learn more about the capabilities and limits of this feature, and the best practice to improve your model quality, see [Characteristics and limitations for using custom voice](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/speech-service/text-to-speech/transparency-note).

## Copy your voice model to another project

# [Foundry (new)](#tab/foundry-new)

After training, you can copy your voice model to another Microsoft Foundry project in the same region or another region. For example, you can train a Professional Voice model in a [supported training region](regions.md?tabs=tts#regions) and copy it to a Foundry resource and project in another region.

1. Select **Build** > **Services** > **Customizations**.
1. Select the row for the model that you want to copy. In the model details pane, select **Copy to**.

   Screenshot of the Customizations model list and model details pane, with the selected model name and Copy to action outlined.

1. In the **Copy speech model** dialog, select the **Subscription**, **Resource group**, **Target foundry resource**, and **Target foundry project**.

   Screenshot of the Copy speech model dialog in the new Foundry portal.

1. Select **Copy**. The copied model appears in the target project's **Customizations** list after the copy operation finishes.

# [Foundry (classic)](#tab/foundry-classic)

In Foundry (classic), *project* refers to a fine-tuning task. After training,
you can copy your voice model to another fine-tuning task in the same region or
another region.

1. On the **Train model** tab, select a voice model that you want to copy, and then select **Copy to project**.
1. Select the **Subscription**, **Target region**, **Connected AI Service resource** (Foundry resource), and **Target fine-tuning task** where you want to copy the model. 
1. Select **Copy to** to copy the model.
1. Select **View model** under the notification message for the successful copying.

Navigate to the fine-tuning task where you copied the model to
[deploy the model copy](professional-voice-deploy-endpoint.md).

---

## Next steps

> 
> [Deploy the professional voice endpoint](professional-voice-deploy-endpoint.md)



**Applies to: speech-studio**


In this article, you learn how to fine-tune a professional voice through the Speech Studio portal.

> **Important:**
> Professional voice fine-tuning is currently only available in some regions. After your voice model is trained in a supported region, you can [copy](#copy-your-voice-model-to-another-project) it to a Foundry resource for Speech in another region as needed. For more information, see the footnotes in the [Speech service table](regions.md#regions).

Training duration varies depending on how much data you use. It takes about 10 compute hours on average to fine-tune a professional voice. Standard subscription (S0) users can train four voices simultaneously. If you reach the limit, wait until at least one of your voice models finishes training, and then try again.

> **Note:**
> Although the total number of hours required per [training method](#choose-a-training-method) varies, the same unit price applies to each. For more information, see the [custom neural training pricing details](https://azure.microsoft.com/pricing/details/cognitive-services/speech-services/).

## Choose a training method

After you validate your data files, use them to build your custom voice model. When you create a custom voice, you can choose to train it with one of the following methods:

- [Neural - HD Voice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=hdvoice#train-your-custom-voice-model): Create a HD voice in the same language of your training data. Azure neural HD voices are LLM-based, optimized for dynamic conversations. Learn more about neural HD voices [here](high-definition-voices.md).

- [Neural](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=neural#train-your-custom-voice-model): Create a voice in the same language as your training data.

- [Neural - multilingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=multilingual#train-your-custom-voice-model): Create a voice that speaks multiple languages using the single-language training data. For example, with the `en-US` primary training data, you can create a voice that speaks `en-US`, `de-DE`, `zh-CN` etc. secondary languages.

  The primary language of the training data and the secondary languages must be in the [languages that are supported](language-support.md?tabs=tts#professional-voice) for multilingual voice training. You don't need to prepare training data in the secondary languages.

- [Neural - multi style](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=multistyle#train-your-custom-voice-model): Create a custom voice that speaks in multiple styles and emotions, without adding new training data. Multiple style voices are useful for video game characters, conversational chatbots, audiobooks, content readers, and more.

  To create a multiple style voice, you need to prepare a set of general training data, at least 300 utterances. Select one or more of the preset target speaking styles. You can also create multiple custom styles by providing style samples, of at least 100 utterances per style, as extra training data for the same voice. The supported preset styles vary according to different languages. See [available preset styles across different languages](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=multistyle#available-preset-styles-across-different-languages).

- [Neural - cross lingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=crosslingual#train-your-custom-voice-model): Create a voice that speaks a different language from your training data. For example, with the `zh-CN` training data, you can create a voice that speaks `en-US`.

  The language of the training data and the target language must both be one of the [languages that are supported](language-support.md?tabs=tts#professional-voice) for cross lingual voice training. You don't need to prepare training data in the target language, but your test script must be in the target language.

  > **Note:**
   > Neural - cross lingual retires on August 25, 2026. The voice models you already created by using these retired methods aren't affected.

The language of the training data must be one of the [languages that are supported](language-support.md?tabs=tts) for custom voice, cross-lingual, or multiple style training.

## Train your custom voice model

To create a custom voice in Speech Studio, follow these steps for one of the following methods:

# [Neural - HD Voice](#tab/hdvoice)

1. Sign in to the [Speech Studio](https://aka.ms/speechstudio/customvoice).
1. Select **Custom voice** > *\<Your project name>* > **Train model** > **Train a new model**.
1. Select **Neural - HD Voice** as the [training method](#choose-a-training-method) for your model. To use a different training method, see [Neural](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=neural#train-your-custom-voice-model), [Neural - cross lingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=crosslingual#train-your-custom-voice-model), [Neural - multi style](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=multistyle#train-your-custom-voice-model), or [Neural - multilingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=multilingual#train-your-custom-voice-model).

   Screenshot that shows how to select neural HD voice training.

   > **Note:**
   > HD voices are only available in regions that support *High performance* type. For information about regions where the *High performance* endpoint type is supported, see the *Custom voice high performance endpoint* column in the *Text to speech* tab of the [regions](regions.md#regions) table.

1. Select the data that you want to use for training. Duplicate audio names are removed from the training. Make sure that the data you select doesn't contain the same audio names across multiple *.zip* files.

   You can select only successfully processed datasets for training. Check your data processing status if you don't see your training set in the list.
   Prefer to select training data processed as **Contextual**.

1. Select a speaker file with the voice talent statement that corresponds to the speaker in your training data.
1. Select **Next**.
1. Each training process automatically generates 100 primary language sample audio files to help you test the model with a default script.

Optionally, you can also select **Add my own test script** and provide your own test script with up to 100 utterances to test the default style at no extra cost. The generated audio files are a combination of the automatic test scripts and custom test scripts. For more information, see [test script requirements](#test-script-requirements).

1. Enter a **Name** to help you identify the model. Choose a name carefully. The model name is used as the voice name in your [speech synthesis request](professional-voice-deploy-endpoint.md#use-your-custom-voice) by the SDK and SSML input. Only letters, numbers, and a few punctuation characters are allowed. Use different names for different neural voice models. The Dragon HD suffix is automatically added to your model name.
1. Optionally, enter the **Description** to help you identify the model. A common use of the description is to record the names of the data that you used to create the model.
1. Select **Next**.
1. Review the settings and select the box to accept the terms of use.
1. Select **Submit** to start training the model.

# [Neural](#tab/neural)

1. Sign in to the [Speech Studio](https://aka.ms/speechstudio/customvoice).
1. Select **Custom voice** > *\<Your project name>* > **Train model** > **Train a new model**.
1. Select **Neural** as the [training method](#choose-a-training-method) for your model and then select **Next**. To use a different training method, see [Neural - cross lingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=crosslingual#train-your-custom-voice-model), [Neural - multi style](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=multistyle#train-your-custom-voice-model), [Neural - multilingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=multilingual#train-your-custom-voice-model), or [Neural - HD Voice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=hdvoice#train-your-custom-voice-model).

   Screenshot that shows how to select neural training.

1. Select a version of the training recipe for your model. The latest version is selected by default. The supported features and training time can vary by version. Normally, use the latest version. In some cases, choose an earlier version to reduce training time. See [Bilingual training](#bilingual-training) for more information about bilingual training and differences between locales.

   > **Note:**
   > Model versions `V3.0`, `V7.0`, and `V8.0` retire on July 25, 2025. The voice models already created on these retired versions aren't affected.
   
1. Select the data that you want to use for training. Duplicate audio names are removed from the training. Make sure that the data you select doesn't contain the same audio names across multiple *.zip* files.

   You can select only successfully processed datasets for training. If you don't see your training set in the list, check your data processing status.

1. Select a speaker file with the voice talent statement that corresponds to the speaker in your training data.
1. Select **Next**.
1. Each training process automatically generates 100 sample audio files to help you test the model with a default script.

   Optionally, you can also select **Add my own test script** and provide your own test script with up to 100 utterances to test the model at no extra cost. The generated audio files are a combination of the automatic test scripts and custom test scripts. For more information, see [test script requirements](#test-script-requirements).

1. Enter a **Name** to help you identify the model. Choose a name carefully. The SDK and SSML input use the model name as the voice name in your [speech synthesis request](professional-voice-deploy-endpoint.md#use-your-custom-voice). Only letters, numbers, and a few punctuation characters are allowed. Use different names for different neural voice models.
1. Optionally, enter the **Description** to help you identify the model. A common use of the description is to record the names of the data that you used to create the model.
1. Select **Next**.
1. Review the settings and select the box to accept the terms of use.
1. Select **Submit** to start training the model.

### Bilingual training


If you select the **Neural** training type, you can train a voice to speak in multiple languages. The `zh-CN`, `zh-HK`, and `zh-TW` locales support bilingual training for the voice to speak both Chinese and English. Depending in part on your training data, the synthesized voice can speak English with an English native accent or English with the same accent as the training data.

> **Note:**
> To enable a voice in the Chinese locale to speak English with the same accent as the sample data, upload English data that includes at least 100 sentences or 10 minutes of English content and doesn't exceed the amount of Chinese content.


# [Neural - multilingual](#tab/multilingual)

1. Sign in to the [Speech Studio](https://aka.ms/speechstudio/customvoice).
1. Select **Custom voice** > *\<Your project name>* > **Train model** > **Train a new model**.
1. Select **Neural - multilingual** as the [training method](#choose-a-training-method) for your model. To use a different training method, see [Neural](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=neural#train-your-custom-voice-model) or [Neural - cross lingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=crosslingual#train-your-custom-voice-model) or [Neural - multi style](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=multistyle#train-your-custom-voice-model) or [Neural - HD Voice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=hdvoice#train-your-custom-voice-model).

   Screenshot that shows how to select neural multilingual training.

1. Select the **Secondary language** that your voice speaks. You can select one or more secondary languages for a voice model and the voice speaks languages you selected from training data.
1. Select the data that you want to use for training. Duplicate audio names are removed from the training. Make sure that the data you select doesn't contain the same audio names across multiple *.zip* files.

   You can select only successfully processed datasets for training. Check your data processing status if you don't see your training set in the list.

1. Select a speaker file with the voice talent statement that corresponds to the speaker in your training data.
1. Select **Next**.
1. Each training generates 100 primary language sample audio files automatically to help you test the model with a default script.
1. Enter a **Name** to help you identify the model. Choose a name carefully. The model name is used as the voice name in your [speech synthesis request](professional-voice-deploy-endpoint.md#use-your-custom-voice) by the SDK and SSML input. Only letters, numbers, and a few punctuation characters are allowed. Use different names for different neural voice models.
1. Optionally, enter the **Description** to help you identify the model. A common use of the description is to record the names of the data that you used to create the model.
1. Select **Next**.
1. Review the settings and select the box to accept the terms of use.
1. Select **Submit** to start training the model.
 
# [Neural - multi style](#tab/multistyle)

1. Sign in to the [Speech Studio](https://aka.ms/speechstudio/customvoice).
1. Select **Custom voice** > *\<Your project name>* > **Train model** > **Train a new model**.
1. Select **Neural - multi style** as the [training method](#choose-a-training-method) for your model. To use a different training method, see [Neural](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=neural#train-your-custom-voice-model) or [Neural - cross lingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=crosslingual#train-your-custom-voice-model) or [Neural - multilingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=multilingual#train-your-custom-voice-model) or [Neural - HD Voice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=hdvoice#train-your-custom-voice-model).

   Screenshot that shows how to select neural multi style training.

1. Select one or more preset speaking styles to train.
1. Select the data that you want to use for training. Duplicate audio names are removed from the training. Make sure that the data you select doesn't contain the same audio names across multiple *.zip* files.

   You can select only successfully processed datasets for training. Check your data processing status if you don't see your training set in the list.

1. Select **Next**.

1. Optionally, you can add other custom speaking styles. The maximum number of custom styles varies by languages: `English (United States)` allows up to 10 custom styles, `Chinese (Mandarin, Simplified)` allows up to four custom styles, and `Japanese (Japan)` allows up to five custom styles.

   1. Select **Add a custom style** and enter a custom style name of your choice. This name is used by your application within the `style` element of [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup-voice.md#use-speaking-styles-paralinguistics-and-roles). You can also use the custom style name as SSML by using the [Audio Content Creation](how-to-audio-content-creation.md) tool in [Speech Studio](https://speech.microsoft.com/portal/audiocontentcreation).
   1. Select style samples as training data. Ensure that the training data for custom speaking styles comes from the same speaker as the data used to create the default style.

1. Select **Next**.
1. Select a speaker file with the voice talent statement that corresponds to the speaker in your training data.
1. Select **Next**.
1. Each training automatically generates 100 sample audio files for the default style and 20 for each preset style to help you test the model with a default script.

Optionally, you can also select **Add my own test script** and provide your own test script with up to 100 utterances to test the default style at no extra cost. The generated audio files are a combination of the automatic test scripts and custom test scripts. For more information, see [test script requirements](#test-script-requirements).

1. Enter a **Name** to help you identify the model. Choose a name carefully. The model name is used as the voice name in your [speech synthesis request](professional-voice-deploy-endpoint.md#use-your-custom-voice) by the SDK and SSML input. Only letters, numbers, and a few punctuation characters are allowed. Use different names for different neural voice models.
1. Optionally, enter the **Description** to help you identify the model. A common use of the description is to record the names of the data that you used to create the model.
1. Select **Next**.
1. Review the settings and select the box to accept the terms of use.
1. Select **Submit** to start training the model.

### Available preset styles across different languages

The following table summarizes the different preset styles according to different languages.


| Speaking style | Language (locale) |
| :--- | :--- |
| angry | English (United States) (`en-US`)<br/>Japanese (Japan) (`ja-JP`) <sup>1</sup><br/>Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| calm | Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| chat | Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| cheerful | English (United States) (`en-US`)<br/>Japanese (Japan) (`ja-JP`) <sup>1</sup><br/>Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| disgruntled | Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| excited | English (United States) (`en-US`) |
| fearful | Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| friendly | English (United States) (`en-US`) |
| hopeful | English (United States) (`en-US`) |
| sad | English (United States) (`en-US`)<br/>Japanese (Japan) (`ja-JP`) <sup>1</sup><br/>Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| shouting | English (United States) (`en-US`) |
| serious | Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| terrified | English (United States) (`en-US`) |
| unfriendly | English (United States) (`en-US`) |
| whispering | English (United States) (`en-US`) |

<sup>1</sup> The neural voice style is available in public preview. For the current list of regions that support styles in public preview, see the [Speech service regions table](regions.md?tabs=tts). 


# [Neural - cross lingual](#tab/crosslingual)

1. Sign in to the [Speech Studio](https://aka.ms/speechstudio/customvoice).
1. Select **Custom voice** > *\<Your project name>* > **Train model** > **Train a new model**.
1. Select **Neural - cross lingual** as the [training method](#choose-a-training-method) for your model. To use a different training method, see [Neural](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=neural#train-your-custom-voice-model) or [Neural - multi style](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=multistyle#train-your-custom-voice-model) or [Neural - multilingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=multilingual#train-your-custom-voice-model) or [Neural - HD Voice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=hdvoice#train-your-custom-voice-model).

   Screenshot that shows how to select neural cross lingual training.

1. Select a version of the training recipe for your model. The latest version is selected by default. The supported features and training time can vary by version. Normally, we recommend the latest version.

   > **Note:**
   > Model version `V3.0` was retired on July 25, 2025. The voice models already created on these retired versions aren't affected.

1. Select the **Target language** that your voice speaks. The voice speaks a different language from your training data. You can select only one target language for a voice model.
1. Select the data that you want to use for training. Duplicate audio names are removed from the training. Make sure that the data you select doesn't contain the same audio names across multiple *.zip* files.

   You can select only successfully processed datasets for training. Check your data processing status if you don't see your training set in the list.

1. Select a speaker file with the voice talent statement that corresponds to the speaker in your training data.
1. Select **Next**.
1. Each training generates 100 sample audio files automatically to help you test the model with a default script.

   Optionally, you can also select **Add my own test script** and provide your own test script with up to 100 utterances to test the model at no extra cost. The generated audio files are a combination of the automatic test scripts and custom test scripts. For more information, see [Test script requirements](#test-script-requirements).

1. Enter a **Name** to help you identify the model. Choose a name carefully. The model name is used as the voice name in your [speech synthesis request](professional-voice-deploy-endpoint.md#use-your-custom-voice) by the SDK and SSML input. Only letters, numbers, and a few punctuation characters are allowed. Use different names for different neural voice models.
1. Optionally, enter the **Description** to help you identify the model. A common use of the description is to record the names of the data that you used to create the model.
1. Select **Next**.
1. Review the settings and select the box to accept the terms of use.
1. Select **Submit** to start training the model.

---

## Monitor the training process

The **Train model** table displays a new entry that corresponds to this newly created model. The status reflects the process of converting your data to a voice model, as described in this table:

| State | Meaning |
| :--- | :--- |
| Processing | Your voice model is being created. |
| Succeeded | Your voice model has been created and can be deployed. |
| Failed | Your voice model has failed in training. The cause of the failure might be, for example, unseen data problems or network issues. |
| Canceled | The training for your voice model was canceled. |

While the model status is **Processing**, you can select **Cancel training** to cancel your voice model. You're not charged for this canceled training.

Screenshot that shows how to cancel training for a model.

After you finish training the model successfully, you can review the model details and [Test your voice model](#test-your-voice-model).

You can use the [Audio Content Creation](how-to-audio-content-creation.md) tool in Speech Studio to create audio and fine-tune your deployed voice. If applicable for your voice, you can select one of multiple styles.

## Rename your model

1. If you want to rename the model you built, select **Clone model** to create a clone of the model with a new name in the current project.

   Screenshot of selecting the Clone model button.

1. Enter the new name on the **Clone voice model** window, then select **Submit**. The text *Neural* is automatically added as a suffix to your new model name.

   Screenshot of cloning a model with a new name.

## Test your voice model

After your voice model is successfully built, you can use the generated sample audio files to test it before you deploy it.

> **Note:**
> [Neural - multilingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=multilingual#train-your-custom-voice-model) and [Neural - HD Voice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=hdvoice#train-your-custom-voice-model) do not support this type of testing.

The quality of the voice depends on many factors, such as:

- The size of the training data.
- The quality of the recording.
- The accuracy of the transcript file.
- How well the recorded voice in the training data matches the personality of the designed voice for your intended use case.

Select **DefaultTests** under **Testing** to listen to the sample audio files. The default test samples include 100 sample audio files generated automatically during training to help you test the model. In addition to these 100 audio files provided by default, your own test script utterances are also added to **DefaultTests** set. This addition is at most 100 utterances. You're not charged for the testing with **DefaultTests**.

Screenshot of selecting DefaultTests under Testing.

If you want to upload your own test scripts to further test your model, select **Add test scripts** to upload your own test script.

Screenshot of adding model test scripts.

Before you upload test script, check the [Test script requirements](#test-script-requirements). You're charged for the extra testing with the batch synthesis based on the number of billable characters. See [Azure Speech in Foundry Tools pricing](https://azure.microsoft.com/pricing/details/cognitive-services/speech-services/).

Under **Add test scripts**, select **Browse for a file** to select your own script, then select **Add** to upload it.

Screenshot of uploading model test scripts.

### Test script requirements

The test script must be a *.txt* file that is less than 1 MB. Supported encoding formats include ANSI/ASCII, UTF-8, UTF-8-BOM, UTF-16-LE, or UTF-16-BE.

Unlike the [training transcription files](how-to-custom-voice-training-data.md#transcription-data-for-individual-utterances-and-matching-transcript), the test script should exclude the utterance ID, which is the filename of each utterance. Otherwise, these IDs are spoken.

Here's an example set of utterances in one *.txt* file:

```text
This is the waistline, and it's falling.
We have trouble scoring.
It was Janet Maslin.
```

Each paragraph of the utterance results in a separate audio. If you want to combine all sentences into one audio, make them a single paragraph.

> **Note:**
> The generated audio files are a combination of the automatic test scripts and custom test scripts.

## Update engine version for your voice model

Azure text to speech engines are updated from time to time to capture the latest language model that defines the pronunciation of the language. After you train your voice, you can apply your voice to the new language model by updating to the latest engine version.

1. When a new engine is available, you're prompted to update your neural voice model.

   Screenshot of displaying engine update message.

1. Go to the model details page and follow the on-screen instructions to install the latest engine.

   Screenshot of following on-screen instructions to install the new engine.

   Alternatively, select **Install the latest engine** later to update your model to the latest engine version.

   Screenshot of selecting Install the latest engine button to update engine.

   You're not charged for engine update. The previous versions are still kept.

1. You can check all engine versions for the model from the **Engine version** list, or remove one if you don't need it anymore.

   Screenshot of displaying Engine version drop-down list.

   The updated version is automatically set as default. But you can change the default version by selecting a version from the drop-down list and selecting **Set as default**.

   Screenshot that shows how to set a version as default.

If you want to test each engine version of your voice model, you can select a version from the list, then select **DefaultTests** under **Testing** to listen to the sample audio files. If you want to upload your own test scripts to further test your current engine version, first make sure the version is set as default, then follow the steps in [Test your voice model](#test-your-voice-model).

Updating the engine creates a new version of the model at no extra cost. After you update the engine version for your voice model, you need to deploy the new version to [create a new endpoint](professional-voice-deploy-endpoint.md#add-a-deployment-endpoint). You can only deploy the default version.

Screenshot that shows how to redeploy a new version of your voice model.

After you create a new endpoint, you need to [transfer the traffic to the new endpoint in your product](professional-voice-deploy-endpoint.md#switch-to-a-new-voice-model-in-your-product).

To learn more about the capabilities and limits of this feature, and the best practice to improve your model quality, see [Characteristics and limitations for using custom voice](https://learn.microsoft.com/azure/ai-foundry/responsible-ai/speech-service/text-to-speech/transparency-note).

## Copy your voice model to another project

You can copy your voice model to another project for the same region or another region. For example, you can copy a neural voice model that was trained in one region, to a project for another region.

> **Note:**
> Professional voice fine-tuning is currently only available in some regions. You can copy a neural voice model from those regions to other regions. For more information, see the [regions for custom voice](regions.md#regions).

To copy your custom voice model to another project:

1. On the **Train model** tab, select a voice model that you want to copy, and then select **Copy to project**.

   Screenshot of the copy to project option.

1. Select the **Subscription**, **Region**, **Speech resource**, and **Project** where you want to copy the model. You must have a speech resource and project in the target region, otherwise you need to create them first.

    Screenshot of the copy voice model dialog.

1. Select **Submit** to copy the model.
1. Select **View model** under the notification message for the successful copying.

Navigate to the project where you copied the model to [deploy the model copy](professional-voice-deploy-endpoint.md).

## Next steps

> 
> [Deploy the professional voice endpoint](professional-voice-deploy-endpoint.md)




**Applies to: rest-api**



In this article, you learn how to fine-tune a professional voice through the custom voice API.

> **Important:**
> Professional voice fine-tuning is currently only available in some regions. After your voice model is trained in a supported region, you can copy it to a Foundry resource in another region as needed. For more information, see the footnotes in the [Speech service table](regions.md#regions).

Training duration varies depending on how much data you use. It takes about 10 compute hours on average to fine-tune a professional voice. Standard subscription (S0) users can train four voices simultaneously. If you reach the limit, wait until at least one of your voice models finishes training, and then try again.

> **Note:**
> Although the total number of hours required per [training method](#choose-a-training-method) varies, the same unit price applies to each. For more information, see the [custom neural training pricing details](https://azure.microsoft.com/pricing/details/cognitive-services/speech-services/).

## Choose a training method

After you validate your data files, use them to build your custom voice model. When you create a custom voice, you can choose to train it with one of the following methods:

- [Neural - HD Voice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=hdvoice#create-a-voice-model): Create a HD voice in the same language of your training data. Azure neural HD voices are LLM-based, optimized for dynamic conversations. Learn more about neural HD voices [here](high-definition-voices.md).

- [Neural](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=neural#create-a-voice-model): Create a voice in the same language as your training data.

- [Neural - multi style](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=multistyle#create-a-voice-model): Create a custom voice that speaks in multiple styles and emotions, without adding new training data. Multiple style voices are useful for video game characters, conversational chatbots, audiobooks, content readers, and more.

  To create a multiple style voice, you need to prepare a set of general training data, at least 300 utterances. Select one or more of the preset target speaking styles. You can also create multiple custom styles by providing style samples, of at least 100 utterances per style, as extra training data for the same voice. The supported preset styles vary according to different languages. See [available preset styles across different languages](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=multistyle#available-preset-styles-across-different-languages).

- [Neural - cross lingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=crosslingual#create-a-voice-model): Create a voice that speaks a different language from your training data. For example, with the `fr-FR` training data, you can create a voice that speaks `en-US`.

  The language of the training data and the target language must both be one of the [languages that are supported](language-support.md?tabs=tts#professional-voice) for cross lingual voice training. You don't need to prepare training data in the target language, but your test script must be in the target language.

  > **Note:**
   > Neural - cross lingual retires on August 25, 2026. The voice models you already created by using these retired methods aren't affected.

The language of the training data must be one of the [languages that are supported](language-support.md?tabs=tts) for custom voice, cross lingual, or multiple style or HD voice training.

## Create a voice model

# [Neural - HD Voice](#tab/hdvoice)

To create an HD voice, use the [Models_Create](https://learn.microsoft.com/rest/api/aiservices/speechapi/models/create) operation of the custom voice API. Construct the request body according to the following instructions:

- Set the required `projectId` property. See [create a project](professional-voice-create-project.md).
- Set the required `consentId` property. See [add voice talent consent](professional-voice-create-consent.md).
- Set the required `trainingSetId` property. See [create a training set](professional-voice-create-training-set.md).
- Set the required recipe `kind` property to `HD` for neural voice training. The recipe kind indicates the training method and can't be changed later. To use a different training method, see [Neural](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=neural#create-a-voice-model), [Neural - cross lingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=crosslingual#create-a-voice-model), or [Neural - multi style](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=multistyle#create-a-voice-model). See [Bilingual training](#bilingual-training) for more information about bilingual training and differences between locales.
- Set the required `voiceName` property. The voice name automatically adds the Dragon HD suffix and can't be changed later. Choose a name carefully. The SDK and SSML input use the voice name in your [speech synthesis request](professional-voice-deploy-endpoint.md#use-your-custom-voice). Only letters, numbers, and a few punctuation characters are allowed before the specific suffix. Use different names for different neural voice models.
- Optionally, set the `description` property for the voice description. The voice description can be changed later.

Make an HTTP PUT request using the URI as shown in the following [Models_Create](https://learn.microsoft.com/rest/api/aiservices/speechapi/models/create) example. 
- Replace `YourResourceKey` with your Speech resource key.
- Replace `YourResourceName` with your Speech resource name.
- Replace `JessicaModelId` with a model ID of your choice. The case sensitive ID will be used in the model's URI and can't be changed later. 

```azurecli-interactive
curl -v -X PUT -H "Ocp-Apim-Subscription-Key: YourResourceKey" -H "Content-Type: application/json" -d '{
  "voiceName": "Jessica",
  "description": "Jessica HD voice",
  "recipe": {
    "kind": "HD"
  },
  "projectId": "ProjectId",
  "consentId": "JessicaConsentId",
  "trainingSetId": "JessicaTrainingSetId"
} '  "https://YourResourceName.cognitiveservices.azure.com/customvoice/models/JessicaModelId?api-version=2026-01-01"
```

You should receive a response body in the following format:

```json
{
  "id": "JessicaModelId",
  "voiceName": "Jessica:DragonHDLatestNeural",
  "description": "Jessica HD voice",
  "recipe": {
    "kind": "HD",
    "version": "V1.0"
  },
  "projectId": "ProjectId",
  "consentId": "JessicaConsentId",
  "trainingSetId": "JessicaTrainingSetId",
  "locale": "en-US",
  "engineVersion": "2023.07.04.0",
  "status": "NotStarted",
  "createdDateTime": "2023-04-01T05:30:00.000Z",
  "lastActionDateTime": "2023-04-02T10:15:30.000Z"
}
```

# [Neural](#tab/neural)

To create a neural voice, use the [Models_Create](https://learn.microsoft.com/rest/api/aiservices/speechapi/models/create) operation of the custom voice API. Construct the request body according to the following instructions:

- Set the required `projectId` property. See [create a project](professional-voice-create-project.md).
- Set the required `consentId` property. See [add voice talent consent](professional-voice-create-consent.md).
- Set the required `trainingSetId` property. See [create a training set](professional-voice-create-training-set.md).
- Set the required recipe `kind` property to `Default` for neural voice training. The recipe kind indicates the training method and can't be changed later. To use a different training method, see [Neural - cross lingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=crosslingual#create-a-voice-model), [Neural - multi style](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=multistyle#create-a-voice-model), or [Neural - HD Voice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=hdvoice#create-a-voice-model). See [Bilingual training](#bilingual-training) for more information about bilingual training and differences between locales.
- Set the required `voiceName` property. Choose a name carefully. The voice name is used in your [speech synthesis request](professional-voice-deploy-endpoint.md#use-your-custom-voice) by the SDK and SSML input. Only letters, numbers, and a few punctuation characters are allowed. Use different names for different neural voice models.
- Optionally, set the `description` property for the voice description. The voice description can be changed later.

Make an HTTP PUT request using the URI as shown in the following [Models_Create](https://learn.microsoft.com/rest/api/aiservices/speechapi/models/create) example. 
- Replace `YourResourceKey` with your Speech resource key.
- Replace `YourResourceName` with your Speech resource name.
- Replace `JessicaModelId` with a model ID of your choice. The case sensitive ID will be used in the model's URI and can't be changed later. 

```azurecli-interactive
curl -v -X PUT -H "Ocp-Apim-Subscription-Key: YourResourceKey" -H "Content-Type: application/json" -d '{
  "voiceName": "Jessica",
  "description": "Jessica voice",
  "recipe": {
    "kind": "Default"
  },
  "projectId": "ProjectId",
  "consentId": "JessicaConsentId",
  "trainingSetId": "JessicaTrainingSetId"
} '  "https://YourResourceName.cognitiveservices.azure.com/customvoice/models/JessicaModelId?api-version=2026-01-01"
```

You should receive a response body in the following format:

```json
{
  "id": "JessicaModelId",
  "voiceName": "Jessica",
  "description": "Jessica voice",
  "recipe": {
    "kind": "Default",
    "version": "V10.0"
  },
  "projectId": "ProjectId",
  "consentId": "JessicaConsentId",
  "trainingSetId": "JessicaTrainingSetId",
  "locale": "en-US",
  "engineVersion": "2023.07.04.0",
  "status": "NotStarted",
  "createdDateTime": "2023-04-01T05:30:00.000Z",
  "lastActionDateTime": "2023-04-02T10:15:30.000Z"
}
```

# [Neural - multi style](#tab/multistyle)

To create a multi-style neural voice, use the [Models_Create](https://learn.microsoft.com/rest/api/aiservices/speechapi/models/create) operation of the custom voice API. Construct the request body according to the following instructions:

- Set the required `projectId` property. See [create a project](professional-voice-create-project.md).
- Set the required `consentId` property. See [add voice talent consent](professional-voice-create-consent.md).
- Set the required `trainingSetId` property. See [create a training set](professional-voice-create-training-set.md).
- Set the required recipe `kind` property to `MultiStyle` for multiple style voice training. The recipe kind indicates the training method and can't be changed later. To use a different training method, see [Neural](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=neural#create-a-voice-model) or [Neural - cross lingual](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=crosslingual#create-a-voice-model) or [Neural - HD Voice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=hdvoice#create-a-voice-model).
- Set the required `voiceName` property. Choose a name carefully. The voice name is used in your [speech synthesis request](professional-voice-deploy-endpoint.md#use-your-custom-voice) by the SDK and SSML input. Only letters, numbers, and a few punctuation characters are allowed. Use different names for different neural voice models.
- Set the required `locale` property for the language for your voice model. 
- Set the required `presetStyles` property to one or more of the [available preset styles](#available-preset-styles-across-different-languages) for the target language. 
- Optionally, set the `styleTrainingSetIds` property to provide training data for your custom speaking styles. The maximum number of custom styles varies by languages: English (United States) allows up to 10 custom styles, Chinese (Mandarin, Simplified) allows up to four custom styles, and Japanese (Japan) allows up to five custom styles. 
    The `styleTrainingSetIds` property is a dictionary of style names and training set IDs. 
    - For each dictionary key, specify a custom style name of your choice. This name is used by your application within the `style` element of [Speech Synthesis Markup Language (SSML)](speech-synthesis-markup-voice.md#use-speaking-styles-paralinguistics-and-roles).
    - For each dictionary value, specify the ID of a training set that you [already created](professional-voice-create-training-set.md#add-a-professional-voice-training-dataset) for the same voice model. The training set must contain at least 100 utterances for each style.
- Optionally, set the `description` property for the voice description. The voice description can be changed later.

Make an HTTP PUT request using the URI as shown in the following [Models_Create](https://learn.microsoft.com/rest/api/aiservices/speechapi/models/create) example. 
- Replace `YourResourceKey` with your Speech resource key.
- Replace `YourResourceName` with your Speech resource name.
- Replace `JessicaModelId` with a model ID of your choice. The case sensitive ID will be used in the model's URI and can't be changed later. 

```azurecli-interactive
curl -v -X PUT -H "Ocp-Apim-Subscription-Key: YourResourceKey" -H "Content-Type: application/json" -d '{
  "voiceName": "JessicaNeuralMultiStyle",
  "description": "Jessica multi-style voice",
  "recipe": {
    "kind": "MultiStyle"
  },
  "projectId": "ProjectId",
  "consentId": "JessicaConsentId",
  "trainingSetId": "JessicaTrainingSetId",
  "locale": "en-US",
  "properties": {
    "presetStyles": [
      "cheerful",
      "sad"
    ],
    "styleTrainingSetIds": {
      "happyJessica": "JessicaHappyTrainingSetId",
      "myStyle2": "JessicaStyle2TrainingSetId"
    }
  }
} '  "https://YourResourceName.cognitiveservices.azure.com/customvoice/models/JessicaModelId?api-version=2026-01-01"
```

You should receive a response body in the following format:

```json
{
  "id": "JessicaModelId",
  "voiceName": "JessicaNeuralMultiStyle",
  "description": "Jessica multi-style voice",
  "recipe": {
    "kind": "MultiStyle",
    "version": "V1.0"
  },
  "projectId": "ProjectId",
  "consentId": "JessicaConsentId",
  "trainingSetId": "JessicaTrainingSetId",
  "locale": "en-US",
  "engineVersion": "2023.07.04.0","properties": {
    "presetStyles": [
      "cheerful",
      "sad"
    ],
    "styleTrainingSetIds": {
      "happyJessica": "JessicaHappyTrainingSetId",
      "myStyle2": "JessicaStyle2TrainingSetId"
    },
    "voiceStyles": [
      "cheerful",
      "sad",
      "happyJessica",
      "myStyle2"
    ]
  }
  "status": "NotStarted",
  "createdDateTime": "2023-04-01T05:30:00.000Z",
  "lastActionDateTime": "2023-04-02T10:15:30.000Z"
}
```

# [Neural - cross lingual](#tab/crosslingual)

To create a cross lingual neural voice, use the [Models_Create](https://learn.microsoft.com/rest/api/aiservices/speechapi/models/create) operation of the custom voice API. Construct the request body according to the following instructions:

- Set the required `projectId` property. See [create a project](professional-voice-create-project.md).
- Set the required `consentId` property. See [add voice talent consent](professional-voice-create-consent.md).
- Set the required `trainingSetId` property. See [create a training set](professional-voice-create-training-set.md).
- Set the required recipe `kind` property to `CrossLingual` for cross lingual voice training. The recipe kind indicates the training method and can't be changed later. To use a different training method, see [Neural](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=neural#create-a-voice-model) or [Neural - multi style](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=multistyle#create-a-voice-model) or [Neural - HD Voice](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/how-to/professional-voice/train-voice?tabs=hdvoice#create-a-voice-model).
- Set the required `voiceName` property. Choose a name carefully. The voice name is used in your [speech synthesis request](professional-voice-deploy-endpoint.md#use-your-custom-voice) by the SDK and SSML input. Only letters, numbers, and a few punctuation characters are allowed. Use different names for different neural voice models.
- Set the required `locale` property for the language that your voice speaks. The voice speaks a different language from your training data. You can specify only one target language for a voice model.
- Optionally, set the `description` property for the voice description. The voice description can be changed later.

Make an HTTP PUT request using the URI as shown in the following [Models_Create](https://learn.microsoft.com/rest/api/aiservices/speechapi/models/create) example. 
- Replace `YourResourceKey` with your Speech resource key.
- Replace `YourResourceName` with your Speech resource name.
- Replace `JessicaModelId` with a model ID of your choice. The case sensitive ID will be used in the model's URI and can't be changed later. 

```azurecli-interactive
curl -v -X PUT -H "Ocp-Apim-Subscription-Key: YourResourceKey" -H "Content-Type: application/json" -d '{
  "voiceName": "JessicaCrossLingualNeural",
  "description": "Jessica cross lingual voice",
  "recipe": {
    "kind": "CrossLingual"
  },
  "projectId": "ProjectId",
  "consentId": "JessicaConsentId",
  "trainingSetId": "Jessica-en-US-TrainingSetId",
  "locale": "fr-FR"
} '  "https://YourResourceName.cognitiveservices.azure.com/customvoice/models/JessicaModelId?api-version=2026-01-01"
```

You should receive a response body in the following format:

```json
{
  "id": "JessicaModelId",
  "voiceName": "JessicaNeuralCrossLingual",
  "description": "Jessica cross lingual voice",
  "recipe": {
    "kind": "CrossLingual",
    "version": "V5.0"
  },
  "projectId": "ProjectId",
  "consentId": "JessicaConsentId",
  "trainingSetId": "Jessica-en-US-TrainingSetId",
  "locale": "fr-FR",
  "engineVersion": "2023.11.14.0",
  "status": "NotStarted",
  "createdDateTime": "2023-04-01T05:30:00.000Z",
  "lastActionDateTime": "2023-04-02T10:15:30.000Z"
}
```

# [Neural - multi lingual](#tab/multilingual)

Not currently supported via the REST API.

---

### Bilingual training


If you select the **Neural** training type, you can train a voice to speak in multiple languages. The `zh-CN`, `zh-HK`, and `zh-TW` locales support bilingual training for the voice to speak both Chinese and English. Depending in part on your training data, the synthesized voice can speak English with an English native accent or English with the same accent as the training data.

> **Note:**
> To enable a voice in the Chinese locale to speak English with the same accent as the sample data, upload English data that includes at least 100 sentences or 10 minutes of English content and doesn't exceed the amount of Chinese content.


## Available preset styles across different languages

The following table summarizes the different preset styles according to different languages.


| Speaking style | Language (locale) |
| :--- | :--- |
| angry | English (United States) (`en-US`)<br/>Japanese (Japan) (`ja-JP`) <sup>1</sup><br/>Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| calm | Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| chat | Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| cheerful | English (United States) (`en-US`)<br/>Japanese (Japan) (`ja-JP`) <sup>1</sup><br/>Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| disgruntled | Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| excited | English (United States) (`en-US`) |
| fearful | Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| friendly | English (United States) (`en-US`) |
| hopeful | English (United States) (`en-US`) |
| sad | English (United States) (`en-US`)<br/>Japanese (Japan) (`ja-JP`) <sup>1</sup><br/>Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| shouting | English (United States) (`en-US`) |
| serious | Chinese (Mandarin, Simplified) (`zh-CN`) <sup>1</sup> |
| terrified | English (United States) (`en-US`) |
| unfriendly | English (United States) (`en-US`) |
| whispering | English (United States) (`en-US`) |

<sup>1</sup> The neural voice style is available in public preview. For the current list of regions that support styles in public preview, see the [Speech service regions table](regions.md?tabs=tts). 


---

## Get training status

To get the training status of a voice model, use the [Models_Get](https://learn.microsoft.com/rest/api/aiservices/speechapi/models/get) operation of the custom voice API. Construct the request URI according to the following instructions:

Make an HTTP GET request using the URI as shown in the following [Models_Get](https://learn.microsoft.com/rest/api/aiservices/speechapi/models/get) example. 
- Replace `YourResourceKey` with your Speech resource key.
- Replace `YourResourceName` with your Speech resource name.
- Replace `JessicaModelId` if you specified a different model ID in the previous step.

```azurecli-interactive
curl -v -X GET "https://YourResourceName.cognitiveservices.azure.com/customvoice/models/JessicaModelId?api-version=2026-01-01" -H "Ocp-Apim-Subscription-Key: YourResourceKey"
```

You should receive a response body in the following format. 

> **Note:**
> The recipe `kind` and other properties depend on how you [trained the voice](#choose-a-training-method). In this example, the recipe kind is `Default` for neural voice training.

```json
{
  "id": "JessicaModelId",
  "voiceName": "Jessica",
  "description": "Jessica voice",
  "recipe": {
    "kind": "Default",
    "version": "V9.0"
  },
  "projectId": "ProjectId",
  "consentId": "JessicaConsentId",
  "trainingSetId": "JessicaTrainingSetId",
  "locale": "en-US",
  "engineVersion": "2023.07.04.0",
  "status": "Succeeded",
  "createdDateTime": "2023-04-01T05:30:00.000Z",
  "lastActionDateTime": "2023-04-02T10:15:30.000Z"
}
```

You might need to wait for several minutes before the training is completed. Eventually the status will change to either `Succeeded` or `Failed`.

## Next steps

> 
> [Deploy the professional voice endpoint](professional-voice-deploy-endpoint.md)
