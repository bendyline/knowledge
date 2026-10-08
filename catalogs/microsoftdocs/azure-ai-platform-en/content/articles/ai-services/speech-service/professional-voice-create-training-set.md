---
title: Add a professional voice training dataset - Speech service
titleSuffix: Foundry Tools
description: Learn about how to upload a training dataset for professional voice. 
author: PatrickFarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: how-to
ms.date: 12/29/2025
ms.author: pafarley
zone_pivot_groups: foundry-speech-studio-rest
#Customer intent: As a developer, I want to learn how to upload a training dataset for professional voice.
---

# Add a professional voice training dataset

**Applies to: ai-foundry-portal**


When you're ready to create a custom text-to-speech voice for your application, start by gathering audio recordings and associated scripts to train the voice model. For details on recording voice samples, see [the tutorial](record-custom-voice-samples.md). The Speech service uses this data to create a unique voice tuned to match the voice in the recordings. After you train the voice, you can start synthesizing speech in your applications.

All data you upload must meet the requirements for the data type that you choose. It's important to correctly format your data before it's uploaded, which ensures the data is accurately processed by the Speech service. To confirm that your data is correctly formatted, see [Training data types](how-to-custom-voice-training-data.md).

> **Note:**
> - Standard subscription (S0) users can upload five data files simultaneously. If you reach the limit, wait until at least one of your data files finishes importing. Then try again.
> - The maximum number of data files that standard subscription (S0) users can import per subscription is 500 .zip files. For more details, see [Speech service quotas and limits](speech-services-quotas-and-limits.md#custom-voice---professional).

## Upload your data

> **Tip:**
> For a sample consent statement and training data, see the [GitHub repository](https://github.com/Azure-Samples/Cognitive-Speech-TTS/tree/master/CustomVoice/Sample%20Data). 

To upload training data, follow these steps:

# [Foundry (new)](#tab/foundry-new)

These steps continue from the **Customize a model** page you opened in [Set up a professional voice](professional-voice-create-project.md).

If you closed the page, [resume your draft customization](professional-voice-create-project.md?tabs=foundry-new\&pivots=ai-foundry-portal#resume-an-unfinished-customization) before continuing.

In Foundry (new), organize your training data in datasets. You can create multiple datasets, upload data to each one, and select eligible datasets when you configure training.

1. On the **Training data** step, select **Create new dataset**.
1. In the **Create new dataset** pane, enter a **Dataset name**, and then select **Create**.
1. Select the new dataset from the **Select dataset** dropdown, and then select **Add data**.
1. In the **Add data** pane, choose a [data type](how-to-custom-voice-training-data.md). If you're using the sample data, select **Individual utterances + matching transcript**.
1. For **Processed as**, choose a mode supported by your data type:

   - **Segmented**: Use this mode for **Individual utterances + matching transcript**. You can also use it for **Long audio + transcript** or **Audio only** to split recordings into utterances.
   - **Contextual**: Available for **Long audio + transcript** and **Audio only** in supported languages. This mode preserves contextual information and natural intonation. You can't combine contextual data with segmented data.

   See [Training data types](how-to-custom-voice-training-data.md#types-of-data-for-professional-voice-fine-tuning) for supported combinations and language restrictions.

1. Upload the data by using one of these methods:

   - **Local files**: Select the **Recording file** from your computer. For data types with a transcript, also select the **Script file**.
   - **Azure Blob**: Enter the **Recording blob URL**. For data types with a transcript, also enter the **Script blob URL**.

   For **Audio only**, don't provide a script. The service generates the transcript during processing.

1. Select **Upload**. The **Data preview** section displays the validation results after processing finishes.

If your dataset isn't ready for training, review **Data preview** and [resolve data issues](#review-data-issues). Then check eligibility for the selected [training method and version](professional-voice-train-voice.md?tabs=foundry-new\&pivots=ai-foundry-portal#choose-a-training-method) before continuing.

### View or delete an existing dataset

If you uploaded the wrong training data, find the dataset on the **Data** tab under **Services**. This tab is separate from **Data** in the left navigation.

1. Open the Foundry project that contains the dataset.
1. Select **Build** > **Services**, and then select the **Data** tab.
1. Find the dataset with the **Text to Speech** and **Professional voice** tags. Select its name to review the details, including **Accepted data** and **Rejected data**.

To delete an unwanted dataset:

1. Return to **Services** > **Data**.
1. In the dataset's row, open the **Actions** menu (three dots), and then select **Delete**.

   Screenshot of Build Services showing datasets and voice talents, with the Data tab and a dataset Actions menu outlined.

1. In the **Delete AI service resource** dialog, confirm that the displayed name matches the dataset you want to remove.
1. Select **Delete** to confirm, or **Cancel** to keep the dataset.

> **Important:**
> Deletion can't be undone. Confirm that you selected the unwanted dataset before deleting it.

To create a replacement dataset, return to **Training data** in your customization and follow [Upload your data](#upload-your-data).

# [Foundry (classic)](#tab/foundry-classic)

In Foundry (classic), organize your audio utterances and mapping scripts in
training sets. The service checks data readiness for each training set, and you
can import multiple data files into a training set.

1. Sign in to the [Microsoft Foundry (classic) portal](https://ai.azure.com/?cid=learnDocs).
1. Select **Fine-tuning** from the left pane and then select **AI Service fine-tuning**.
1. Select the professional voice fine-tuning task (by model name) that you [started as described in the create professional voice article](https://learn.microsoft.com/azure/ai-services/speech-service/professional-voice-create-project).
1. Select **Prepare training data** > **Upload data**. 
1. In the **Upload data** wizard, choose a [data type](how-to-custom-voice-training-data.md). If you're using the sample data, select **Individual utterances + matching transcript**. 

    Screenshot of the page to select the training data type.

1. Select **Next**.
1. On the **Specify the target training set** page, select **Create new**. 
1. Enter a training set name and then select **Create**.

    Screenshot of the page to create a new training set.

1. Select **Next**.
1. On the **Data upload** page, select a **Recording file** and **Script file** in the respective tiles. You can select local files from your computer or enter the Azure Blob storage URL to upload data.
1. Select **Next**.
1. Enter a name and description for your data and then select **Next**.
1. Review the upload details, and select **Upload data**.

---

> **Note:**
> Duplicate IDs aren't accepted. Utterances with the same ID are removed.
> 
> Duplicate audio names are removed from the training. Make sure the data you select don't contain the same audio names within the .zip file or across multiple .zip files. If utterance IDs (either in audio or script files) are duplicates, they're rejected.

The service automatically validates uploaded data. Validation checks the audio files for requirements such as file format, size, and sampling rate. If there are errors, fix them and upload the data again.

Review the validation results before you train the model. You can review pronunciation issues and the noise level for each utterance. The pronunciation score at the sentence level ranges from 0 through 100. A score below 70 normally indicates a speech error or script mismatch. Utterances with an overall score lower than 70 are rejected. A heavy accent can reduce your pronunciation score and affect the generated digital voice.

## Review data issues

Before you continue to [train your voice model](professional-voice-train-voice.md), review the validation results and resolve any data problems.

### Typical data issues

The following tables describe common data problems. 

**Auto-rejected**

The training process excludes data with these problems. The import process ignores them, so you don't need to delete them. Address the issues in the source files, and then upload the corrected data for training.

| Category | Name | Description |
| --- | --- | --- |
| Script | Invalid separator | You must separate the utterance ID and the script content with a Tab character. |
| Script | Invalid script ID | The script line ID must be numeric. |
| Script | Duplicated script | Each line of the script content must be unique. The line is duplicated with {}. |
| Script | Script too long | The script must be less than 1,000 characters. |
| Script | No matching audio | The ID of each utterance (each line of the script file) must match the audio ID. |
| Script | No valid script | No valid script is found in this dataset. Fix the script lines that appear in the detailed problem list. |
| Audio | No matching script | No audio files match the script ID. The name of the .wav files must match with the IDs in the script file. |
| Audio | Invalid audio format | The audio format of the .wav files is invalid. Check the .wav file format by using an audio tool like [SoX](http://sox.sourceforge.net/). |
| Audio | Low sampling rate | The sampling rate of the .wav files can't be lower than 16 KHz. |
| Audio | Too long audio | Audio duration is longer than 30 seconds. Split the long audio into multiple files. It's a good idea to make utterances shorter than 15 seconds. |
| Audio | No valid audio | No valid audio is found in this dataset. Check your audio data and upload again. |
| Mismatch | Low scored utterance | Sentence-level pronunciation score is lower than 70. Review the script and the audio content to make sure they match. |

**Auto-fixed**

The system automatically fixes the following problems, but you should review and confirm the fixes are correct.

| Category | Name | Description |
| --- | --- | --- |
| Mismatch | Silence auto fixed | The start silence is detected to be shorter than 100 ms, and is extended to 100 ms automatically. Download the normalized dataset and review it. |
| Mismatch | Silence auto fixed | The end silence is detected to be shorter than 100 ms, and is extended to 100 ms automatically. Download the normalized dataset and review it. |
| Script | Text auto normalized | Text is automatically normalized for digits, symbols, and abbreviations. Review the script and audio to make sure they match. |

**Manual check required**

Unresolved problems listed in the next table affect the quality of training, but the training process doesn't exclude data with these problems. For higher-quality training, fix these problems manually. 

| Category | Name | Description |
| --- | --- | --- |
| Script | Non-normalized text | This script contains symbols. Normalize the symbols to match the audio. For example, normalize */* to *slash*. |
| Script | Not enough question utterances | At least 10 percent of the total utterances should be question sentences. This helps the voice model properly express a questioning tone. |
| Script | Not enough exclamation utterances | At least 10 percent of the total utterances should be exclamation sentences. This helps the voice model properly express an excited tone. |
| Script | No valid end punctuation | Add one of the following at the end of the line: full stop (half-width '.' or full-width '。'), exclamation point (half-width '!' or full-width '！' ), or question mark (half-width '?' or full-width '？'). |
| Audio | Low sampling rate for neural voice | It's recommended that the sampling rate of your .wav files be 24 KHz or higher for creating neural voices. If it's lower, the system automatically raises it to 24 KHz. |
| Volume | Overall volume too low | Volume shouldn't be lower than -18 dB (10 percent of max volume). Control the volume average level within proper range during the sample recording or data preparation. |
| Volume | Volume overflow | Overflowing volume is detected at {}s. Adjust the recording equipment to avoid the volume overflow at its peak value. |
| Volume | Start silence problem | The first 100 ms of silence isn't clean. Reduce the recording noise floor level, and leave the first 100 ms at the start silent. |
| Volume | End silence problem | The last 100 ms of silence isn't clean. Reduce the recording noise floor level, and leave the last 100 ms at the end silent. |
| Mismatch | Low scored words | Review the script and the audio content to make sure they match, and control the noise floor level. Reduce the length of long silence, or split the audio into multiple utterances if it's too long. |
| Mismatch | Start silence problem | Extra audio was heard before the first word. Review the script and the audio content to make sure they match, control the noise floor level, and make the first 100 ms silent. |
| Mismatch | End silence problem | Extra audio was heard after the last word. Review the script and the audio content to make sure they match, control the noise floor level, and make the last 100 ms silent. |
| Mismatch | Low signal-noise ratio | Audio SNR level is lower than 20 dB. At least 35 dB is recommended. |
| Mismatch | No score available | Failed to recognize speech content in this audio. Check the audio and the script content to make sure the audio is valid, and matches the script. |

## Next step

> 
> [Train the professional voice](professional-voice-train-voice.md)



**Applies to: speech-studio**


When you're ready to create a custom text to speech voice for your application, the first step is to gather audio recordings and associated scripts to start training the voice model. For details on recording voice samples, see [the tutorial](record-custom-voice-samples.md). The Speech service uses this data to create a unique voice tuned to match the voice in the recordings. After you've trained the voice, you can start synthesizing speech in your applications.

All data you upload must meet the requirements for the data type that you choose. It's important to correctly format your data before it's uploaded, which ensures the data will be accurately processed by the Speech service. To confirm that your data is correctly formatted, see [Training data types](how-to-custom-voice-training-data.md).

> **Note:**
> - Standard subscription (S0) users can upload five data files simultaneously. If you reach the limit, wait until at least one of your data files finishes importing. Then try again.
> - The maximum number of data files allowed to be imported per subscription is 500 .zip files for standard subscription (S0) users. Please see out [Speech service quotas and limits](speech-services-quotas-and-limits.md#custom-voice---professional) for more details.

## Upload your data

When you're ready to upload your data, go to the **Prepare training data** tab to add your first training set and upload data. A *training set* is a set of audio utterances and their mapping scripts used for training a voice model. You can use a training set to organize your training data. The service checks data readiness per each training set. You can import multiple data to a training set.

To upload training data, follow these steps:

1. Sign in to the [Speech Studio](https://aka.ms/speechstudio/customvoice).
1. Select **Custom voice** > Your project name > **Prepare training data** > **Upload data**.
1. In the **Upload data** wizard, choose a [data type](how-to-custom-voice-training-data.md) and then select **Next**.
1. Select local files from your computer or enter the Azure Blob storage URL to upload data.
1. If you selected **Long audio + transcript** or **Audio only** data types in contextual support projects, you'll see an option to choose the processing mode:
   - **Processed as Contextual**: Processes audio while preserving contextual information for enhanced conversational abilities and more natural speech patterns.
   - **Segmented**: Processes audio and transcript into individual utterances using standard segmentation.
1. Under **Specify the target training set**, select an existing training set or create a new one. If you created a new training set, make sure it's selected in the drop-down list before you continue.
1. Select **Next**.
1. Enter a name and description for your data and then select **Next**.
1. Review the upload details, and select **Submit**.

> **Note:**
> Duplicate IDs are not accepted. Utterances with the same ID will be removed.
> 
> Duplicate audio names are removed from the training. Make sure the data you select don't contain the same audio names within the .zip file or across multiple .zip files. If utterance IDs (either in audio or script files) are duplicates, they're rejected.
>
> A training set can only contain data processed in the same mode. For example, if you upload data with **Processed as Contextual** mode to a training set, all subsequent uploads to that same training set must also use the **Processed as Contextual** mode.

Data files are automatically validated when you select **Submit**. Data validation includes series of checks on the audio files to verify their file format, size, and sampling rate. If there are any errors, fix them and submit again. 

After you upload the data, you can check the details in the training set detail view. On the detail page, you can further check the pronunciation issue and the noise level for each of your data. The pronunciation score at the sentence level ranges from 0-100. A score below 70 normally indicates a speech error or script mismatch. Utterances with an overall score lower than 70 will be rejected. A heavy accent can reduce your pronunciation score and affect the generated digital voice.

## Resolve data issues online

After upload, you can check the data details of the training set. Before continuing to [train your voice model](professional-voice-train-voice.md), you should try to resolve any data issues.

You can identify and resolve data issues per utterance in [Speech Studio](https://aka.ms/custom-voice-portal).

#### Processed as Segmented

1. On the detail page, go to the **Accepted data** or **Rejected data** page. Select individual utterances you want to change, then select **Edit**.

   Screenshot of selecting edit button on the accepted data or rejected data details page.

   You can choose which data issues to be displayed based on your criteria.
   
    Screenshot of choosing which data issues to be displayed.

1. Edit window will be displayed.

   Screenshot of displaying Edit transcript and recording file window.

1. Update transcript or recording file according to issue description on the edit window.

   You can edit transcript in the text box, then select **Done**

   Screenshot of selecting Done button on the Edit transcript and recording file window.

   If you need to update recording file, select **Update recording file**, then upload the fixed recording file (.wav).
 
   Screenshot that shows how to upload recording file on the Edit transcript and recording file window.

1. After you've made changes to your data, you need to check the data quality by clicking **Analyze data** before using this dataset for training.

   You can't select this training set for training model before the analysis is complete. 

   Screenshot of selecting Analyze data on Data details page.

   You can also delete utterances with issues by selecting them and clicking **Delete**.


#### Processed as Contextual

Unlike processed as segmented, **Processed as Contextual** preserves the original audio files and generates corresponding contextual information.

1. On the detail page, click on individual utterances with "Number Of issues".

   Screenshot of contextual utterances details page.

   Contextual information is presented as segments. Select the segment you want to modify, then click the **Edit** button.
   
   Screenshot of contextual segments to be displayed.

   You can choose which data issues to be displayed based on your criteria.
   
   Screenshot of choosing which data issues to be displayed.

1. Edit the transcript in the text box according to the issue description, then select Done.

   Screenshot of selecting Done button after editing transcript.

1. After you've made changes to your data, you need to check the data quality by clicking Analyze data before using this dataset for training.

   You can't select this training set for training model before the analysis is complete.

   Screenshot of selecting Analyze data on Data details page.

> **Note:**
> Deleting a segment of contextual information will not exclude that content from training. Only delete segments when their information is already included or will be included in adjacent segments.
>
> Rejected segments will not be used for training.

### Typical data issues

The issues are divided into three types. Refer to the following tables to check the respective types of errors. 

**Auto-rejected**

Data with these errors won't be used for training. Imported data with errors will be ignored, so you don't need to delete them. You can [fix these data errors online](#resolve-data-issues-online) or upload the corrected data again for training.  

| Category | Name | Description |
| --- | --- | --- |
| Script | Invalid separator | You must separate the utterance ID and the script content with a Tab character. |
| Script | Invalid script ID | The script line ID must be numeric. |
| Script | Duplicated script | Each line of the script content must be unique. The line is duplicated with {}. |
| Script | Script too long | The script must be less than 1,000 characters. |
| Script | No matching audio | The ID of each utterance (each line of the script file) must match the audio ID. |
| Script | No valid script | No valid script is found in this dataset. Fix the script lines that appear in the detailed issue list. |
| Audio | No matching script | No audio files match the script ID. The name of the .wav files must match with the IDs in the script file. |
| Audio | Invalid audio format | The audio format of the .wav files is invalid. Check the .wav file format by using an audio tool like [SoX](http://sox.sourceforge.net/). |
| Audio | Low sampling rate | The sampling rate of the .wav files can't be lower than 16 KHz. |
| Audio | Too long audio | Audio duration is longer than 30 seconds. Split the long audio into multiple files. It's a good idea to make utterances shorter than 15 seconds. |
| Audio | No valid audio | No valid audio is found in this dataset. Check your audio data and upload again. |
| Mismatch | Low scored utterance | Sentence-level pronunciation score is lower than 70. Review the script and the audio content to make sure they match. |

**Auto-fixed**

The following errors are fixed automatically, but you should review and confirm the fixes are made correctly.

| Category | Name | Description |
| --- | --- | --- |
| Mismatch | Silence auto fixed | The start silence is detected to be shorter than 100 ms, and has been extended to 100 ms automatically. Download the normalized dataset and review it. |
| Mismatch | Silence auto fixed | The end silence is detected to be shorter than 100 ms, and has been extended to 100 ms automatically. Download the normalized dataset and review it. |
| Script | Text auto normalized | Text is automatically normalized for digits, symbols, and abbreviations. Review the script and audio to make sure they match. |

**Manual check required**

Unresolved errors listed in the next table affect the quality of training, but data with these errors won't be excluded during training. For higher-quality training, it's a good idea to fix these errors manually. 

| Category | Name | Description |
| --- | --- | --- |
| Script | Non-normalized text | This script contains symbols. Normalize the symbols to match the audio. For example, normalize */* to *slash*. |
| Script | Not enough question utterances | At least 10 percent of the total utterances should be question sentences. This helps the voice model properly express a questioning tone. |
| Script | Not enough exclamation utterances | At least 10 percent of the total utterances should be exclamation sentences. This helps the voice model properly express an excited tone. |
| Script | No valid end punctuation | Add one of the following at the end of the line: full stop (half-width '.' or full-width '。'), exclamation point (half-width '!' or full-width '！' ), or question mark ( half-width '?' or full-width '？'). |
| Audio | Low sampling rate for neural voice | It's recommended that the sampling rate of your .wav files should be 24 KHz or higher for creating neural voices. If it's lower, it will be automatically raised to 24 KHz. |
| Volume | Overall volume too low | Volume shouldn't be lower than -18 dB (10 percent of max volume). Control the volume average level within proper range during the sample recording or data preparation. |
| Volume | Volume overflow | Overflowing volume is detected at {}s. Adjust the recording equipment to avoid the volume overflow at its peak value. |
| Volume | Start silence issue | The first 100 ms of silence isn't clean. Reduce the recording noise floor level, and leave the first 100 ms at the start silent. |
| Volume | End silence issue | The last 100 ms of silence isn't clean. Reduce the recording noise floor level, and leave the last 100 ms at the end silent. |
| Mismatch | Low scored words | Review the script and the audio content to make sure they match, and control the noise floor level. Reduce the length of long silence, or split the audio into multiple utterances if it's too long. |
| Mismatch | Start silence issue | Extra audio was heard before the first word. Review the script and the audio content to make sure they match, control the noise floor level, and make the first 100 ms silent. |
| Mismatch | End silence issue | Extra audio was heard after the last word. Review the script and the audio content to make sure they match, control the noise floor level, and make the last 100 ms silent. |
| Mismatch | Low signal-noise ratio | Audio SNR level is lower than 20 dB. At least 35 dB is recommended. |
| Mismatch | No score available | Failed to recognize speech content in this audio. Check the audio and the script content to make sure the audio is valid, and matches the script. |

## Next steps

> 
> [Train the professional voice](professional-voice-train-voice.md)




**Applies to: rest-api**


You need a training dataset to create a professional voice. A training dataset includes audio and script files. The audio files are recordings of the voice talent reading the script files. The script files are the text of the audio files. 

In this article, you [create a training set](#create-a-training-set) and get its resource ID. Then, using the resource ID, you can [upload a set of audio and script files](#upload-training-set-data).

## Create a training set

To create a training set, use the [TrainingSets_Create](https://learn.microsoft.com/rest/api/aiservices/speechapi/training-sets/create) operation of the custom voice API. Construct the request body according to the following instructions:

- Set the required `projectId` property. See [create a project](professional-voice-create-project.md).
- Set the required `voiceKind` property to `Male` or `Female`. The kind can't be changed later. 
- Set the required `locale` property. This should be the locale of the training set data. The locale of the training set should be the same as the locale of the [consent statement](professional-voice-create-consent.md). The locale can't be changed later. You can find the text to speech locale list [here](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts).
- Optionally, set the `description` property for the training set description. The training set description can be changed later.

Make an HTTP PUT request using the URI as shown in the following [TrainingSets_Create](https://learn.microsoft.com/rest/api/aiservices/speechapi/training-sets/create) example. 
- Replace `YourResourceKey` with your Speech resource key.
- Replace `YourResourceName` with your Speech resource name.
- Replace `JessicaTrainingSetId` with a training set ID of your choice. The case sensitive ID will be used in the training set's URI and can't be changed later. 

```azurecli-interactive
curl -v -X PUT -H "Ocp-Apim-Subscription-Key: YourResourceKey" -H "Content-Type: application/json" -d '{
  "description": "300 sentences Jessica data in general style.",
  "projectId": "ProjectId",
  "locale": "en-US",
  "voiceKind": "Female"
} '  "https://YourResourceName.cognitiveservices.azure.com/customvoice/trainingsets/JessicaTrainingSetId?api-version=2026-01-01"
```

You should receive a response body in the following format:

```json
{
  "id": "JessicaTrainingSetId",
  "description": "300 sentences Jessica data in general style.",
  "projectId": "ProjectId",
  "locale": "en-US",
  "voiceKind": "Female",
  "status": "Succeeded",
  "createdDateTime": "2023-04-01T05:30:00.000Z",
  "lastActionDateTime": "2023-04-02T10:15:30.000Z"
}
```

## Upload training set data

To upload a training set of audio and scripts, use the [TrainingSets_UploadData](https://learn.microsoft.com/rest/api/aiservices/speechapi/training-sets/upload-data) operation of the custom voice API.

Before calling this API, please store recording and script files in Azure Blob. In the following example, recording files are https://contoso.blob.core.windows.net/voicecontainer/jessica300/*.wav, script files are
https://contoso.blob.core.windows.net/voicecontainer/jessica300/*.txt. 

Construct the request body according to the following instructions:

- Set the required `kind` property to `AudioAndScript`, `LongAudio`, or `AudioOnly`. The kind determines the type of training set.
- Optionally, set the `processAs` property to specify the processing method. Supported values are `Segmented` (default) and `Contextual`. `Contextual` is an enhanced mode that retains the audio as a whole to keep the contextual information for more natural intonations. The `Contextual` mode is only available when `kind` is set to `LongAudio` or `AudioOnly`. If not specified, the default `Segmented` mode is used. For more information, see [training data types](how-to-custom-voice-training-data.md).
- Set the required `audios` property. Within the `audios` property, set the following properties:
  - Set the required `containerUrl` property to the URL of the Azure Blob Storage container that contains the audio files. Use [shared access signatures (SAS) for a container](https://learn.microsoft.com/azure/storage/blobs/sas-service-create-dotnet-container#create-a-service-sas-for-a-container) with both read and list permissions.
  - Set the required `extensions` property to the extensions of the audio files. 
  - Optionally, set the `prefix` property to set a prefix for the blob name. 
- Set the required `scripts` property. Within the `scripts` property, set the following properties:
  - Set the required `containerUrl` property to the URL of the Azure Blob Storage container that contains the script files. Use [shared access signatures (SAS) for a container](https://learn.microsoft.com/azure/storage/blobs/sas-service-create-dotnet-container#create-a-service-sas-for-a-container) with both read and list permissions.
  - Set the required `extensions` property to the extensions of the script files.
  - Optionally, set the `prefix` property to set a prefix for the blob name.

Make an HTTP POST request using the URI as shown in the following [TrainingSets_UploadData](https://learn.microsoft.com/rest/api/aiservices/speechapi/training-sets/upload-data) example. 
- Replace `YourResourceKey` with your Speech resource key.
- Replace `YourResourceName` with your Speech resource name.
- Replace `JessicaTrainingSetId` if you specified a different training set ID in the previous step.

```azurecli-interactive
curl -v -X POST -H "Ocp-Apim-Subscription-Key: YourResourceKey" -H "Content-Type: application/json" -d '{
  "kind": "AudioAndScript",
  "audios": {
    "containerUrl": "https://contoso.blob.core.windows.net/voicecontainer?mySasToken",
    "prefix": "jessica300/",
    "extensions": [
      ".wav"
    ]
  },
  "scripts": {
    "containerUrl": "https://contoso.blob.core.windows.net/voicecontainer?mySasToken",
    "prefix": "jessica300/",
    "extensions": [
      ".txt"
    ]
  }
} '  "https://YourResourceName.cognitiveservices.azure.com/customvoice/trainingsets/JessicaTrainingSetId:upload?api-version=2026-01-01"
```

The following example uploads long audio data with contextual processing:

```azurecli-interactive
curl -v -X POST -H "Ocp-Apim-Subscription-Key: YourResourceKey" -H "Content-Type: application/json" -d '{
  "kind": "LongAudio",
  "processAs": "Contextual",
  "audios": {
    "containerUrl": "https://contoso.blob.core.windows.net/voicecontainer?mySasToken",
    "prefix": "jessica-long/",
    "extensions": [
      ".wav"
    ]
  },
  "scripts": {
    "containerUrl": "https://contoso.blob.core.windows.net/voicecontainer?mySasToken",
    "prefix": "jessica-long/",
    "extensions": [
      ".txt"
    ]
  }
} '  "https://YourResourceName.cognitiveservices.azure.com/customvoice/trainingsets/JessicaTrainingSetId:upload?api-version=2026-01-01"
```

The response header contains the `Operation-Location` property. Use this URI to get details about the [TrainingSets_UploadData](https://learn.microsoft.com/rest/api/aiservices/speechapi/training-sets/upload-data) operation. Here's an example of the response header:

```HTTP 201
Operation-Location: https://YourResourceName.cognitiveservices.azure.com/customvoice/operations/aaaabbbb-0000-cccc-1111-dddd2222eeee?api-version=2026-01-01
Operation-Id: aaaabbbb-0000-cccc-1111-dddd2222eeee
```

## Next steps

> 
> [Train the professional voice](professional-voice-train-voice.md)
