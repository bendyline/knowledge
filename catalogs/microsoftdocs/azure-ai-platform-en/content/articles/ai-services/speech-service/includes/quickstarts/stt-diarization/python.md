---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 7/16/2025
ms.author: pafarley
ai-usage: ai-assisted
---


[Reference documentation](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/) | [Package (PyPi)](https://pypi.org/project/azure-cognitiveservices-speech/) | [Additional samples on GitHub](https://aka.ms/speech/github-python)



In this quickstart, you run an application for speech to text transcription with real-time diarization. Diarization distinguishes between the different speakers who participate in the conversation. The Speech service provides information about which speaker was speaking a particular part of transcribed speech. 

The speaker information is included in the result in the speaker ID field. The speaker ID is a generic identifier assigned to each conversation participant by the service during the recognition as different speakers are being identified from the provided audio content.

> **Tip:**
> For fast transcription of audio files, consider using the [fast transcription API.](https://learn.microsoft.com/azure/ai-services/speech-service/fast-transcription-create) Fast transcription API supports features such as language identification and diarization. 


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create an AI Services resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and endpoint. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Set up the environment

The Speech SDK for Python is available as a [Python Package Index (PyPI) module](https://pypi.org/project/azure-cognitiveservices-speech/). The Speech SDK for Python is compatible with Windows, Linux, and macOS.

- Install the [Microsoft Visual C++ Redistributable for Visual Studio 2015, 2017, 2019, and 2022](https://learn.microsoft.com/cpp/windows/latest-supported-vc-redist?view=msvc-170\&preserve-view=true) for your platform. Restart your machine if this is your first installation of the package.
- Use the x64 target architecture on Linux.

Install a version of [Python from 3.7 or later](https://www.python.org/downloads/). First check the [SDK installation guide](../../../quickstarts/setup-platform.md?pivots=programming-language-python) for any more requirements. 

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/stt-diarization/python.md)

To set the environment variables for your Speech resource key and endpoint, open a console window, and follow the instructions for your operating system and development environment.

- To set the `SPEECH_KEY` environment variable, replace *your-key* with one of the keys for your resource.
- To set the `ENDPOINT` environment variable, replace *your-endpoint* with one of the endpoints for your resource.

#### [Windows](#tab/windows)

```console
setx SPEECH_KEY your-key
setx ENDPOINT your-endpoint
```

> **Note:**
> If you only need to access the environment variables in the current console, you can set the environment variable with `set` instead of `setx`.

After you add the environment variables, you might need to restart any programs that need to read the environment variables, including the console window. For example, if you're using Visual Studio as your editor, restart Visual Studio before you run the example.

#### [Linux](#tab/linux)

##### Bash

Edit your *.bashrc* file, and add the environment variables:

```bash
export SPEECH_KEY=your-key
export ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

#### [macOS](#tab/macos)

##### Bash

Edit your *.bash_profile* file, and add the environment variables:

```bash
export SPEECH_KEY=your-key
export ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bash_profile` from your console window to make the changes effective.

##### Xcode

For iOS and macOS development, you set the environment variables in Xcode. For example, follow these steps to set the environment variable in Xcode 13.4.1.

1. Select **Product** > **Scheme** > **Edit scheme**.
1. Select **Arguments** on the **Run** (Debug Run) page.
1. Under **Environment Variables** select the plus (+) sign to add a new environment variable.
1. Enter `SPEECH_KEY` for the **Name** and enter your Speech resource key for the **Value**.

To set the environment variable for your Speech resource endpoint, follow the same steps. Set `ENDPOINT` to the endpoint of your resource. For example, `https://YourResourceName.cognitiveservices.azure.com`.



For more configuration options, see [the Xcode documentation](https://help.apple.com/xcode/#/dev745c5c974).

---


## Implement diarization from file with conversation transcription

Follow these steps to create a new console application.

1. Open a command prompt window where you want the new project, and create a new file named `conversation_transcription.py`.

1. Run this command to install the Speech SDK:  

    ```console
    pip install azure-cognitiveservices-speech
    ```

1. Copy the following code into `conversation_transcription.py`:

    ```Python
    import os
    import time
    import azure.cognitiveservices.speech as speechsdk

    def conversation_transcriber_recognition_canceled_cb(evt: speechsdk.SessionEventArgs):
        print('Canceled event')

    def conversation_transcriber_session_stopped_cb(evt: speechsdk.SessionEventArgs):
        print('SessionStopped event')

    def conversation_transcriber_transcribed_cb(evt: speechsdk.SpeechRecognitionEventArgs):
        print('\nTRANSCRIBED:')
        if evt.result.reason == speechsdk.ResultReason.RecognizedSpeech:
            print('\tText={}'.format(evt.result.text))
            print('\tSpeaker ID={}\n'.format(evt.result.speaker_id))
        elif evt.result.reason == speechsdk.ResultReason.NoMatch:
            print('\tNOMATCH: Speech could not be TRANSCRIBED: {}'.format(evt.result.no_match_details))

    def conversation_transcriber_transcribing_cb(evt: speechsdk.SpeechRecognitionEventArgs):
        print('TRANSCRIBING:')
        print('\tText={}'.format(evt.result.text))
        print('\tSpeaker ID={}'.format(evt.result.speaker_id))

    def conversation_transcriber_session_started_cb(evt: speechsdk.SessionEventArgs):
        print('SessionStarted event')

    def recognize_from_file():
        # This example requires environment variables named "SPEECH_KEY" and "ENDPOINT"
        # Replace with your own subscription key and endpoint, the endpoint is like : "https://YourResourceName.cognitiveservices.azure.com"
        speech_config = speechsdk.SpeechConfig(subscription=os.environ.get('SPEECH_KEY'), endpoint=os.environ.get('ENDPOINT'))
        speech_config.speech_recognition_language="en-US"
        speech_config.set_property(property_id=speechsdk.PropertyId.SpeechServiceResponse_DiarizeIntermediateResults, value='true')

        audio_config = speechsdk.audio.AudioConfig(filename="katiesteve.wav")
        conversation_transcriber = speechsdk.transcription.ConversationTranscriber(speech_config=speech_config, audio_config=audio_config)

        transcribing_stop = False

        def stop_cb(evt: speechsdk.SessionEventArgs):
            #"""callback that signals to stop continuous recognition upon receiving an event `evt`"""
            print('CLOSING on {}'.format(evt))
            nonlocal transcribing_stop
            transcribing_stop = True

        # Connect callbacks to the events fired by the conversation transcriber
        conversation_transcriber.transcribed.connect(conversation_transcriber_transcribed_cb)
        conversation_transcriber.transcribing.connect(conversation_transcriber_transcribing_cb)
        conversation_transcriber.session_started.connect(conversation_transcriber_session_started_cb)
        conversation_transcriber.session_stopped.connect(conversation_transcriber_session_stopped_cb)
        conversation_transcriber.canceled.connect(conversation_transcriber_recognition_canceled_cb)
        # stop transcribing on either session stopped or canceled events
        conversation_transcriber.session_stopped.connect(stop_cb)
        conversation_transcriber.canceled.connect(stop_cb)

        conversation_transcriber.start_transcribing_async()

        # Waits for completion.
        while not transcribing_stop:
            time.sleep(.5)

        conversation_transcriber.stop_transcribing_async()

    # Main

    try:
        recognize_from_file()
    except Exception as err:
        print("Encountered exception. {}".format(err))
    ```

1. Get the [sample audio file](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/sampledata/audiofiles/katiesteve.wav) or use your own `.wav` file. Replace `katiesteve.wav` with the path and name of your `.wav` file.

   The application recognizes speech from multiple participants in the conversation. Your audio file should contain multiple speakers.

1. To change the speech recognition language, replace `en-US` with another [supported language](https://learn.microsoft.com/azure/cognitive-services/speech-service/supported-languages). For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language. For details about how to identify one of multiple languages that might be spoken, see [language identification](https://learn.microsoft.com/azure/cognitive-services/speech-service/language-identification).

1. Run your new console application to start conversation transcription:

   ```console
   python conversation_transcription.py
   ```

> **Important:**
> Make sure that you set the `SPEECH_KEY` and `ENDPOINT` [environment variables](#set-environment-variables). If you don't set these variables, the sample fails with an error message.

The transcribed conversation should be output as text:

```output
TRANSCRIBING:
        Text=good morning
        Speaker ID=Unknown
TRANSCRIBING:
        Text=good morning steve
        Speaker ID=Unknown
TRANSCRIBING:
        Text=good morning steve how are
        Speaker ID=Guest-1
TRANSCRIBING:
        Text=good morning steve how are you doing today
        Speaker ID=Guest-1

TRANSCRIBED:
        Text=Good morning, Steve. How are you doing today?
        Speaker ID=Guest-1

TRANSCRIBING:
        Text=good morning katie
        Speaker ID=Unknown
TRANSCRIBING:
        Text=good morning katie i hope you're having a
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=good morning katie i hope you're having a great start to
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=good morning katie i hope you're having a great start to your day
        Speaker ID=Guest-2

TRANSCRIBED:
        Text=Good morning, Katie. I hope you're having a great start to your day.
        Speaker ID=Guest-2

TRANSCRIBING:
        Text=have you
        Speaker ID=Unknown
TRANSCRIBING:
        Text=have you tried
        Speaker ID=Unknown
TRANSCRIBING:
        Text=have you tried the latest
        Speaker ID=Unknown
TRANSCRIBING:
        Text=have you tried the latest real
        Speaker ID=Guest-1
TRANSCRIBING:
        Text=have you tried the latest real time
        Speaker ID=Guest-1
TRANSCRIBING:
        Text=have you tried the latest real time diarization
        Speaker ID=Guest-1
TRANSCRIBING:
        Text=have you tried the latest real time diarization in
        Speaker ID=Guest-1
TRANSCRIBING:
        Text=have you tried the latest real time diarization in microsoft
        Speaker ID=Guest-1
TRANSCRIBING:
        Text=have you tried the latest real time diarization in microsoft speech
        Speaker ID=Guest-1
TRANSCRIBING:
        Text=have you tried the latest real time diarization in microsoft speech service
        Speaker ID=Guest-1
TRANSCRIBING:
        Text=have you tried the latest real time diarization in microsoft speech service which
        Speaker ID=Guest-1
TRANSCRIBING:
        Text=have you tried the latest real time diarization in microsoft speech service which can
        Speaker ID=Guest-1
TRANSCRIBING:
        Text=have you tried the latest real time diarization in microsoft speech service which can tell you
        Speaker ID=Guest-1
TRANSCRIBING:
        Text=have you tried the latest real time diarization in microsoft speech service which can tell you who said        
        Speaker ID=Guest-1
TRANSCRIBING:
        Text=have you tried the latest real time diarization in microsoft speech service which can tell you who said what   
        Speaker ID=Guest-1
TRANSCRIBING:
        Text=have you tried the latest real time diarization in microsoft speech service which can tell you who said what in
        Speaker ID=Guest-1
TRANSCRIBING:
        Text=have you tried the latest real time diarization in microsoft speech service which can tell you who said what in real time
        Speaker ID=Guest-1

TRANSCRIBED:
        Text=Have you tried the latest real time diarization in Microsoft Speech Service which can tell you who said what in real time?
        Speaker ID=Guest-1

TRANSCRIBING:
        Text=not yet
        Speaker ID=Unknown
TRANSCRIBING:
        Text=not yet i
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch trans
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization function
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it produces
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it produces di
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization     
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to di
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to diarize in real
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to diarize in real time
        Speaker ID=Guest-2

TRANSCRIBED:
        Text=Not yet. I've been using the batch transcription with diarization functionality, but it produces diarization results after the whole audio is processed. Is the new feature able to diarize in real time?
        Speaker ID=Guest-2

TRANSCRIBING:
        Text=absolutely
        Speaker ID=Unknown
TRANSCRIBING:
        Text=absolutely i
        Speaker ID=Unknown
TRANSCRIBING:
        Text=absolutely i recom
        Speaker ID=Guest-1
TRANSCRIBING:
        Text=absolutely i recommend
        Speaker ID=Guest-1
TRANSCRIBING:
        Text=absolutely i recommend you give it a try
        Speaker ID=Guest-1

TRANSCRIBED:
        Text=Absolutely, I recommend you give it a try.
        Speaker ID=Guest-1

TRANSCRIBING:
        Text=that's exc
        Speaker ID=Unknown
TRANSCRIBING:
        Text=that's exciting
        Speaker ID=Unknown
TRANSCRIBING:
        Text=that's exciting let me
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=that's exciting let me try
        Speaker ID=Guest-2
TRANSCRIBING:
        Text=that's exciting let me try it right now
        Speaker ID=Guest-2

TRANSCRIBED:
        Text=That's exciting. Let me try it right now.
        Speaker ID=Guest-2
```

Speakers are identified as Guest-1, Guest-2, and so on, depending on the number of speakers in the conversation.

> **Note:**
> You might see `Speaker ID=Unknown` in some of the early intermediate results when the speaker isn't yet identified. Without intermediate diarization results (if you don't set the `PropertyId.SpeechServiceResponse_DiarizeIntermediateResults` property to "true"), the speaker ID is always "Unknown."

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.
