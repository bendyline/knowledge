---
title: "Real-time diarization quickstart - Speech service"
titleSuffix: Foundry Tools
description: In this quickstart, you convert speech to text continuously from a file. The Speech service transcribes the speech and identifies one or more speakers.
author: PatrickFarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.custom: devx-track-extended-java, devx-track-go, devx-track-js, devx-track-python
ms.topic: quickstart
ms.date: 01/30/2026
ms.author: pafarley
zone_pivot_groups: programming-languages-speech-diarization
keywords: speech to text, speech to text software
#customer intent: As a developer, I want to create speech to text applications that use diarization to identify speakers in multiple person conversations.
---

# Quickstart: Create real-time diarization

**Applies to: programming-language-rest**



[Speech to text REST API reference](rest-speech-to-text.md) | [Speech to text REST API for short audio reference](rest-speech-to-text-short.md) | [Additional samples on GitHub](https://github.com/Azure-Samples/cognitive-services-speech-sdk)


The speech to text REST API for short audio doesn't support real-time diarization. 

> **Tip:**
> For fast transcription of audio files, consider using the [fast transcription API.](https://learn.microsoft.com/azure/ai-services/speech-service/fast-transcription-create) Fast transcription API supports features such as language identification and diarization. 



**Applies to: programming-language-python**



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

Install a version of [Python from 3.7 or later](https://www.python.org/downloads/). First check the [SDK installation guide](quickstarts/setup-platform.md?pivots=programming-language-python) for any more requirements. 

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/get-started-stt-diarization.md)

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




**Applies to: programming-language-csharp**



[Reference documentation](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-csharp)



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

The Speech SDK is available as a [NuGet package](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) and implements .NET Standard 2.0. You install the Speech SDK later in this guide, but first check the [SDK installation guide](quickstarts/setup-platform.md?pivots=programming-language-csharp) for any more requirements.

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/get-started-stt-diarization.md)

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

Follow these steps to create a console application and install the Speech SDK.

1. Open a command prompt window in the folder where you want the new project. Run this command to create a console application with the .NET CLI.

    ```dotnetcli
    dotnet new console
    ```

   This command creates the *Program.cs* file in your project directory.

1. Install the Speech SDK in your new project with the .NET CLI.

    ```dotnetcli
    dotnet add package Microsoft.CognitiveServices.Speech
    ```

1. Replace the contents of `Program.cs` with the following code.

    ```csharp
    using Microsoft.CognitiveServices.Speech;
    using Microsoft.CognitiveServices.Speech.Audio;
    using Microsoft.CognitiveServices.Speech.Transcription;
    
    class Program 
    {
        // This example requires environment variables named "SPEECH_KEY" and "ENDPOINT"
        static string speechKey = Environment.GetEnvironmentVariable("SPEECH_KEY");
        static string endpoint = Environment.GetEnvironmentVariable("ENDPOINT");
    
        async static Task Main(string[] args)
        {
            var filepath = "katiesteve.wav";
            var speechConfig = SpeechConfig.FromEndpoint(new Uri(endpoint), speechKey);        
            speechConfig.SpeechRecognitionLanguage = "en-US";
            speechConfig.SetProperty(PropertyId.SpeechServiceResponse_DiarizeIntermediateResults, "true"); 
    
            var stopRecognition = new TaskCompletionSource<int>(TaskCreationOptions.RunContinuationsAsynchronously);
    
            // Create an audio stream from a wav file or from the default microphone
            using (var audioConfig = AudioConfig.FromWavFileInput(filepath))
            {
                // Create a conversation transcriber using audio stream input
                using (var conversationTranscriber = new ConversationTranscriber(speechConfig, audioConfig))
                {
                    conversationTranscriber.Transcribing += (s, e) =>
                    {
                        Console.WriteLine($"TRANSCRIBING: Text={e.Result.Text} Speaker ID={e.Result.SpeakerId}");
                    };
    
                    conversationTranscriber.Transcribed += (s, e) =>
                    {
                        if (e.Result.Reason == ResultReason.RecognizedSpeech)
                        {
                            Console.WriteLine();
                            Console.WriteLine($"TRANSCRIBED: Text={e.Result.Text} Speaker ID={e.Result.SpeakerId}");
                            Console.WriteLine();
                        }
                        else if (e.Result.Reason == ResultReason.NoMatch)
                        {
                            Console.WriteLine($"NOMATCH: Speech could not be transcribed.");
                        }
                    };
    
                    conversationTranscriber.Canceled += (s, e) =>
                    {
                        Console.WriteLine($"CANCELED: Reason={e.Reason}");
    
                        if (e.Reason == CancellationReason.Error)
                        {
                            Console.WriteLine($"CANCELED: ErrorCode={e.ErrorCode}");
                            Console.WriteLine($"CANCELED: ErrorDetails={e.ErrorDetails}");
                            Console.WriteLine($"CANCELED: Did you set the speech resource key and endpoint values?");
                            stopRecognition.TrySetResult(0);
                        }
    
                        stopRecognition.TrySetResult(0);
                    };
    
                    conversationTranscriber.SessionStopped += (s, e) =>
                    {
                        Console.WriteLine("\n    Session stopped event.");
                        stopRecognition.TrySetResult(0);
                    };
    
                    await conversationTranscriber.StartTranscribingAsync();
    
                    // Waits for completion. Use Task.WaitAny to keep the task rooted.
                    Task.WaitAny(new[] { stopRecognition.Task });
    
                    await conversationTranscriber.StopTranscribingAsync();
                }
            }
        }
    }
    ```

1. Get the [sample audio file](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/sampledata/audiofiles/katiesteve.wav) or use your own `.wav` file. Replace `katiesteve.wav` with the path and name of your `.wav` file.

   The application recognizes speech from multiple participants in the conversation. Your audio file should contain multiple speakers.

1. To change the speech recognition language, replace `en-US` with another [supported language](https://learn.microsoft.com/azure/cognitive-services/speech-service/supported-languages). For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language. For details about how to identify one of multiple languages that might be spoken, see [language identification](https://learn.microsoft.com/azure/cognitive-services/speech-service/language-identification).

1. Run your console application to start conversation transcription:

   ```dotnetcli
   dotnet run
   ```

> **Important:**
> Make sure that you set the `SPEECH_KEY` and `ENDPOINT` [environment variables](#set-environment-variables). If you don't set these variables, the sample fails with an error message.

The transcribed conversation should be output as text:

```output
TRANSCRIBING: Text=good morning steve Speaker ID=Unknown
TRANSCRIBING: Text=good morning steve how are Speaker ID=Guest-1
TRANSCRIBING: Text=good morning steve how are you doing today Speaker ID=Guest-1

TRANSCRIBED: Text=Good morning, Steve. How are you doing today? Speaker ID=Guest-1

TRANSCRIBING: Text=good morning katie Speaker ID=Unknown
TRANSCRIBING: Text=good morning katie i hope Speaker ID=Guest-2
TRANSCRIBING: Text=good morning katie i hope you're having a great Speaker ID=Guest-2
TRANSCRIBING: Text=good morning katie i hope you're having a great start to Speaker ID=Guest-2
TRANSCRIBING: Text=good morning katie i hope you're having a great start to your day Speaker ID=Guest-2

TRANSCRIBED: Text=Good morning, Katie. I hope you're having a great start to your day. Speaker ID=Guest-2

TRANSCRIBING: Text=have you tried Speaker ID=Unknown
TRANSCRIBING: Text=have you tried the latest Speaker ID=Unknown
TRANSCRIBING: Text=have you tried the latest real time Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can tell you Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can tell you who said Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can tell you who said what Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can tell you who said what in Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can tell you who said what in real time Speaker ID=Guest-1

TRANSCRIBED: Text=Have you tried the latest real time diarization in Microsoft Speech Service which can tell you who said what in real time? Speaker ID=Guest-1

TRANSCRIBING: Text=not yet Speaker ID=Unknown
TRANSCRIBING: Text=not yet i Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch trans Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization Speaker ID=Guest-2  
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization function Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produc Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces di Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature Speaker ID=Guest-2  
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to di Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to diarize Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to diarize in real Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to diarize in real time Speaker ID=Guest-2

TRANSCRIBED: Text=Not yet. I've been using the batch transcription with diarization functionality, but it produces diarization results after the whole audio is processed. Is the new feature able to diarize in real time? Speaker ID=Guest-2

TRANSCRIBING: Text=absolutely Speaker ID=Unknown
TRANSCRIBING: Text=absolutely i Speaker ID=Unknown
TRANSCRIBING: Text=absolutely i recom Speaker ID=Guest-1
TRANSCRIBING: Text=absolutely i recommend Speaker ID=Guest-1
TRANSCRIBING: Text=absolutely i recommend you give it a try Speaker ID=Guest-1

TRANSCRIBED: Text=Absolutely, I recommend you give it a try. Speaker ID=Guest-1

TRANSCRIBING: Text=that's exc Speaker ID=Unknown
TRANSCRIBING: Text=that's exciting Speaker ID=Unknown
TRANSCRIBING: Text=that's exciting let me try Speaker ID=Guest-2
TRANSCRIBING: Text=that's exciting let me try it right now Speaker ID=Guest-2

TRANSCRIBED: Text=That's exciting. Let me try it right now. Speaker ID=Guest-2
```

Speakers are identified as Guest-1, Guest-2, and so on, depending on the number of speakers in the conversation. 

> **Note:**
> You might see `Speaker ID=Unknown` in some of the early intermediate results when the speaker isn't yet identified. Without intermediate diarization results (if you don't set the `PropertyId.SpeechServiceResponse_DiarizeIntermediateResults` property to "true"), the speaker ID is always "Unknown."

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.




**Applies to: programming-language-javascript**



[Reference documentation](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/) | [Package (npm)](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk) | [Additional samples on GitHub](https://aka.ms/speech/github-javascript) | [Library source code](https://github.com/Microsoft/cognitive-services-speech-sdk-js)



In this quickstart, you run an application for speech to text transcription with real-time diarization. Diarization distinguishes between the different speakers who participate in the conversation. The Speech service provides information about which speaker was speaking a particular part of transcribed speech. 

The speaker information is included in the result in the speaker ID field. The speaker ID is a generic identifier assigned to each conversation participant by the service during the recognition as different speakers are being identified from the provided audio content.

> **Tip:**
> For fast transcription of audio files, consider using the [fast transcription API.](https://learn.microsoft.com/azure/ai-services/speech-service/fast-transcription-create) Fast transcription API supports features such as language identification and diarization. 


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Setup

1. Create a new folder `transcription-quickstart` and go to the quickstart folder with the following command:

    ```shell
    mkdir transcription-quickstart && cd transcription-quickstart
    ```
    
1. Create the `package.json` with the following command:

    ```shell
    npm init -y
    ```

1. Install the Speech SDK for JavaScript with:

    ```console
    npm install microsoft-cognitiveservices-speech-sdk
    ```

### Retrieve resource information


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/get-started-stt-diarization.md)

To set the environment variables for your Speech resource key and region, open a console window, and follow the instructions for your operating system and development environment.

- To set the `SPEECH_KEY` environment variable, replace *your-key* with one of the keys for your resource.
- To set the `SPEECH_REGION` environment variable, replace *your-region* with one of the regions for your resource.
- To set the `ENDPOINT` environment variable, replace `your-endpoint` with the actual endpoint of your Speech resource.

#### [Windows](#tab/windows)

```console
setx SPEECH_KEY your-key
setx SPEECH_REGION your-region
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
export SPEECH_REGION=your-region
export ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

#### [macOS](#tab/macos)

##### Bash

Edit your *.bash_profile* file, and add the environment variables:

```bash
export SPEECH_KEY=your-key
export SPEECH_REGION=your-region
export ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bash_profile` from your console window to make the changes effective.

##### Xcode

For iOS and macOS development, you set the environment variables in Xcode. For example, follow these steps to set the environment variable in Xcode 13.4.1.

1. Select **Product** > **Scheme** > **Edit scheme**.
1. Select **Arguments** on the **Run** (Debug Run) page.
1. Under **Environment Variables** select the plus (+) sign to add a new environment variable.
1. Enter `SPEECH_KEY` for the **Name** and enter your Speech resource key for the **Value**.

To set the environment variable for your Speech resource region, follow the same steps. Set `SPEECH_REGION` to the region of your resource. For example, `westus`. Set `ENDPOINT` to the endpoint of your resource

For more configuration options, see [the Xcode documentation](https://help.apple.com/xcode/#/dev745c5c974).

---


## Implement diarization from file with conversation transcription

Follow these steps to create a new console application for conversation transcription.

1. Create a new file named *transcription.js* with the following content:

    ```javascript
    const fs = require("fs");
    const sdk = require("microsoft-cognitiveservices-speech-sdk");
    
    // This example requires environment variables named "ENDPOINT" and "SPEECH_KEY"
    const speechConfig = sdk.SpeechConfig.fromEndpoint(new URL(process.env.ENDPOINT), process.env.SPEECH_KEY);
    
    function fromFile() {
        const filename = "katiesteve.wav";
    
        let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(filename));
        let conversationTranscriber = new sdk.ConversationTranscriber(speechConfig, audioConfig);
    
        var pushStream = sdk.AudioInputStream.createPushStream();
    
        fs.createReadStream(filename).on('data', function(arrayBuffer) {
            pushStream.write(arrayBuffer.slice());
        }).on('end', function() {
            pushStream.close();
        });
    
        console.log("Transcribing from: " + filename);
    
        conversationTranscriber.sessionStarted = function(s, e) {
            console.log("SessionStarted event");
            console.log("SessionId:" + e.sessionId);
        };
        conversationTranscriber.sessionStopped = function(s, e) {
            console.log("SessionStopped event");
            console.log("SessionId:" + e.sessionId);
            conversationTranscriber.stopTranscribingAsync();
        };
        conversationTranscriber.canceled = function(s, e) {
            console.log("Canceled event");
            console.log(e.errorDetails);
            conversationTranscriber.stopTranscribingAsync();
        };
        conversationTranscriber.transcribed = function(s, e) {
            console.log("TRANSCRIBED: Text=" + e.result.text + " Speaker ID=" + e.result.speakerId);
        };
    
        // Start conversation transcription
        conversationTranscriber.startTranscribingAsync(
            function () {},
            function (err) {
                console.trace("err - starting transcription: " + err);
            }
        );
    
    }
    fromFile();
    ```

1. Get the [sample audio file](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/sampledata/audiofiles/katiesteve.wav) or use your own `.wav` file. Replace `katiesteve.wav` with the path and name of your `.wav` file.

   The application recognizes speech from multiple participants in the conversation. Your audio file should contain multiple speakers.

1. To change the speech recognition language, replace `en-US` with another [supported language](https://learn.microsoft.com/azure/cognitive-services/speech-service/supported-languages). For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language. For details about how to identify one of multiple languages that might be spoken, see [language identification](https://learn.microsoft.com/azure/cognitive-services/speech-service/language-identification).

1. Run your new console application to start speech recognition from a file:

   ```console
   node transcription.js
   ```

Wait a few moments to get the response.

## Output

The transcribed conversation should be output as text:

```output
SessionStarted event
SessionId:E87AFBA483C2481985F6C9AF719F616B
TRANSCRIBED: Text=Good morning, Steve. Speaker ID=Unknown
TRANSCRIBED: Text=Good morning, Katie. Speaker ID=Unknown
TRANSCRIBED: Text=Have you tried the latest real time diarization in Microsoft Speech Service which can tell you who said what in real time? Speaker ID=Guest-1
TRANSCRIBED: Text=Not yet. I've been using the batch transcription with diarization functionality, but it produces diarization result until whole audio get processed. Speaker ID=Guest-2
TRANSCRIBED: Text=Is the new feature can diarize in real time? Speaker ID=Guest-2
TRANSCRIBED: Text=Absolutely. Speaker ID=Guest-1
TRANSCRIBED: Text=That's exciting. Let me try it right now. Speaker ID=Guest-2
Canceled event
undefined
SessionStopped event
SessionId:E87AFBA483C2481985F6C9AF719F616B
```

Speakers are identified as Guest-1, Guest-2, and so on, depending on the number of speakers in the conversation.

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.





**Applies to: programming-language-java**



[Reference documentation](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech) | [Additional samples on GitHub](https://aka.ms/speech/github-java)



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

To set up your environment, [install the Speech SDK](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/stt-diarization/~/articles/ai-services/speech-service/quickstarts/setup-platform.md?pivots=programming-language-java\&tabs=jre). The sample in this quickstart works with the [Java Runtime](https://learn.microsoft.com/azure/cognitive-services/speech-service/quickstarts/setup-platform?pivots=programming-language-java\&tabs=jre).

1. Install [Apache Maven](https://maven.apache.org/install.html). Then run `mvn -v` to confirm successful installation.

1. Create a new `pom.xml` file in the root of your project, and copy the following into it:

    ```xml
    <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
        <modelVersion>4.0.0</modelVersion>
        <groupId>com.microsoft.cognitiveservices.speech.samples</groupId>
        <artifactId>quickstart-eclipse</artifactId>
        <version>1.0.0-SNAPSHOT</version>
        <build>
            <sourceDirectory>src</sourceDirectory>
            <plugins>
            <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.7.0</version>
                <configuration>
                <source>1.8</source>
                <target>1.8</target>
                </configuration>
            </plugin>
            </plugins>
        </build>
        <dependencies>
            <dependency>
            <groupId>com.microsoft.cognitiveservices.speech</groupId>
            <artifactId>client-sdk</artifactId>
            <version>1.43.0</version>
            </dependency>
        </dependencies>
    </project>
    ```

1. Install the Speech SDK and dependencies.

    ```console
    mvn clean dependency:copy-dependencies
    ```

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/get-started-stt-diarization.md)

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

Follow these steps to create a console application for conversation transcription.

1. Create a new file named `ConversationTranscription.java` in the same project root directory.

1. Copy the following code into `ConversationTranscription.java`:

    ```java
    import com.microsoft.cognitiveservices.speech.*;
    import com.microsoft.cognitiveservices.speech.audio.AudioConfig;
    import com.microsoft.cognitiveservices.speech.transcription.*;
    
    import java.net.URI;
    import java.net.URISyntaxException;
    import java.util.concurrent.Semaphore;
    import java.util.concurrent.ExecutionException;
    import java.util.concurrent.Future;
    
    public class ConversationTranscription {
        // This example requires environment variables named "SPEECH_KEY" and "ENDPOINT"
        private static String speechKey = System.getenv("SPEECH_KEY");
        private static String endpoint = System.getenv("ENDPOINT");
    
        public static void main(String[] args) throws InterruptedException, ExecutionException, URISyntaxException {
            
            SpeechConfig speechConfig = SpeechConfig.fromEndpoint(new URI(endpoint), speechKey);
            speechConfig.setSpeechRecognitionLanguage("en-US");
            AudioConfig audioInput = AudioConfig.fromWavFileInput("katiesteve.wav");
            speechConfig.setProperty(PropertyId.SpeechServiceResponse_DiarizeIntermediateResults, "true");
            
            Semaphore stopRecognitionSemaphore = new Semaphore(0);
    
            ConversationTranscriber conversationTranscriber = new ConversationTranscriber(speechConfig, audioInput);
            {
                // Subscribes to events.
                conversationTranscriber.transcribing.addEventListener((s, e) -> {
                    System.out.println("TRANSCRIBING: Text=" + e.getResult().getText() + " Speaker ID=" + e.getResult().getSpeakerId() );
                });
    
                conversationTranscriber.transcribed.addEventListener((s, e) -> {
                    if (e.getResult().getReason() == ResultReason.RecognizedSpeech) {
                        System.out.println();
                        System.out.println("TRANSCRIBED: Text=" + e.getResult().getText() + " Speaker ID=" + e.getResult().getSpeakerId() );
                        System.out.println();
                    }
                    else if (e.getResult().getReason() == ResultReason.NoMatch) {
                        System.out.println("NOMATCH: Speech could not be transcribed.");
                    }
                });
    
                conversationTranscriber.canceled.addEventListener((s, e) -> {
                    System.out.println("CANCELED: Reason=" + e.getReason());
    
                    if (e.getReason() == CancellationReason.Error) {
                        System.out.println("CANCELED: ErrorCode=" + e.getErrorCode());
                        System.out.println("CANCELED: ErrorDetails=" + e.getErrorDetails());
                        System.out.println("CANCELED: Did you update the Speech resource info?");
                    }
    
                    stopRecognitionSemaphore.release();
                });
    
                conversationTranscriber.sessionStarted.addEventListener((s, e) -> {
                    System.out.println("\n    Session started event.");
                });
    
                conversationTranscriber.sessionStopped.addEventListener((s, e) -> {
                    System.out.println("\n    Session stopped event.");
                });
    
                conversationTranscriber.startTranscribingAsync().get();
    
                // Waits for completion.
                stopRecognitionSemaphore.acquire();
    
                conversationTranscriber.stopTranscribingAsync().get();
            }
    
            speechConfig.close();
            audioInput.close();
            conversationTranscriber.close();
    
            System.exit(0);
        }
    }
    ```

1. Get the [sample audio file](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/sampledata/audiofiles/katiesteve.wav) or use your own `.wav` file. Replace `katiesteve.wav` with the path and name of your `.wav` file.

   The application recognizes speech from multiple participants in the conversation. Your audio file should contain multiple speakers.

1. To change the speech recognition language, replace `en-US` with another [supported language](https://learn.microsoft.com/azure/cognitive-services/speech-service/supported-languages). For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language. For details about how to identify one of multiple languages that might be spoken, see [language identification](https://learn.microsoft.com/azure/cognitive-services/speech-service/language-identification).

1. Run your new console application to start conversation transcription:

   ```console
   javac ConversationTranscription.java -cp ".;target\dependency\*"
   java -cp ".;target\dependency\*" ConversationTranscription
   ```

> **Important:**
> Make sure that you set the `SPEECH_KEY` and `ENDPOINT` [environment variables](#set-environment-variables). If you don't set these variables, the sample fails with an error message.

The transcribed conversation should be output as text:

```output
TRANSCRIBING: Text=good morning Speaker ID=Unknown
TRANSCRIBING: Text=good morning steve Speaker ID=Unknown
TRANSCRIBING: Text=good morning steve how Speaker ID=Guest-1
TRANSCRIBING: Text=good morning steve how are you doing Speaker ID=Guest-1
TRANSCRIBING: Text=good morning steve how are you doing today Speaker ID=Guest-1

TRANSCRIBED: Text=Good morning, Steve. How are you doing today? Speaker ID=Guest-1

TRANSCRIBING: Text=good morning katie i hope Speaker ID=Guest-2
TRANSCRIBING: Text=good morning katie i hope you're having a Speaker ID=Guest-2
TRANSCRIBING: Text=good morning katie i hope you're having a great Speaker ID=Guest-2
TRANSCRIBING: Text=good morning katie i hope you're having a great start to Speaker ID=Guest-2
TRANSCRIBING: Text=good morning katie i hope you're having a great start to your day Speaker ID=Guest-2

TRANSCRIBED: Text=Good morning, Katie. I hope you're having a great start to your day. Speaker ID=Guest-2

TRANSCRIBING: Text=have you tried Speaker ID=Unknown
TRANSCRIBING: Text=have you tried the latest Speaker ID=Unknown
TRANSCRIBING: Text=have you tried the latest real Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can tell you Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can tell you who said Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can tell you who said what Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can tell you who said what in Speaker ID=Guest-1
TRANSCRIBING: Text=have you tried the latest real time diarization in microsoft speech service which can tell you who said what in real time Speaker ID=Guest-1

TRANSCRIBED: Text=Have you tried the latest real time diarization in Microsoft Speech Service which can tell you who said what in real time? Speaker ID=Guest-1

TRANSCRIBING: Text=not yet Speaker ID=Unknown
TRANSCRIBING: Text=not yet i Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch trans Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization function Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces di Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to di Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to diarize in real Speaker ID=Guest-2
TRANSCRIBING: Text=not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to diarize in real time Speaker ID=Guest-2

TRANSCRIBED: Text=Not yet. I've been using the batch transcription with diarization functionality, but it produces diarization results after the whole audio is processed. Is the new feature able to diarize in real time? Speaker ID=Guest-2

TRANSCRIBING: Text=absolutely Speaker ID=Unknown
TRANSCRIBING: Text=absolutely i recom Speaker ID=Guest-1
TRANSCRIBING: Text=absolutely i recommend Speaker ID=Guest-1
TRANSCRIBING: Text=absolutely i recommend you Speaker ID=Guest-1
TRANSCRIBING: Text=absolutely i recommend you give it a try Speaker ID=Guest-1

TRANSCRIBED: Text=Absolutely, I recommend you give it a try. Speaker ID=Guest-1

TRANSCRIBING: Text=that's exc Speaker ID=Unknown
TRANSCRIBING: Text=that's exciting Speaker ID=Unknown
TRANSCRIBING: Text=that's exciting let me try Speaker ID=Guest-2
TRANSCRIBING: Text=that's exciting let me try it right now Speaker ID=Guest-2

TRANSCRIBED: Text=That's exciting. Let me try it right now. Speaker ID=Guest-2
```

Speakers are identified as Guest-1, Guest-2, and so on, depending on the number of speakers in the conversation.

> **Note:**
> You might see `Speaker ID=Unknown` in some of the early intermediate results when the speaker isn't yet identified. Without intermediate diarization results (if you don't set the `PropertyId.SpeechServiceResponse_DiarizeIntermediateResults` property to "true"), the speaker ID is always "Unknown."

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.





**Applies to: programming-language-cpp**



[Reference documentation](https://learn.microsoft.com/cpp/cognitive-services/speech/) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-cpp)



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

The Speech SDK is available as a [NuGet package](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) and implements .NET Standard 2.0. You install the Speech SDK later in this guide, but first check the [SDK installation guide](quickstarts/setup-platform.md?pivots=programming-language-cpp) for any more requirements.

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/get-started-stt-diarization.md)

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

Follow these steps to create a console application and install the Speech SDK.

1. Create a new C++ console project in [Visual Studio Community 2022](https://visualstudio.microsoft.com/downloads/) named `ConversationTranscription`.

1. Select **Tools** > **Nuget Package Manager** > **Package Manager Console**. In the **Package Manager Console**, run this command:

    ```console
    Install-Package Microsoft.CognitiveServices.Speech
    ```

1. Replace the contents of `ConversationTranscription.cpp` with the following code.

    ```cpp
    #include <iostream> 
    #include <stdlib.h>
    #include <speechapi_cxx.h>
    #include <future>

    using namespace Microsoft::CognitiveServices::Speech;
    using namespace Microsoft::CognitiveServices::Speech::Audio;
    using namespace Microsoft::CognitiveServices::Speech::Transcription;

    std::string GetEnvironmentVariable(const char* name);

    int main()
    {
        // This example requires environment variables named "SPEECH_KEY" and "ENDPOINT"
        auto speechKey = GetEnvironmentVariable("SPEECH_KEY");
        auto endpoint = GetEnvironmentVariable("ENDPOINT");

        if (std::string(speechKey).empty() || std::string(endpoint).empty()) {
            std::cout << "Please set both SPEECH_KEY and ENDPOINT environment variables." << std::endl;
            return -1;
        }

        auto speechConfig = SpeechConfig::FromEndpoint(endpoint, speechKey);
        speechConfig->SetProperty(PropertyId::SpeechServiceResponse_DiarizeIntermediateResults, "true"); 

        speechConfig->SetSpeechRecognitionLanguage("en-US");

        auto audioConfig = AudioConfig::FromWavFileInput("katiesteve.wav");
        auto conversationTranscriber = ConversationTranscriber::FromConfig(speechConfig, audioConfig);

        // promise for synchronization of recognition end.
        std::promise<void> recognitionEnd;

        // Subscribes to events.
        conversationTranscriber->Transcribing.Connect([](const ConversationTranscriptionEventArgs& e)
            {
                std::cout << "TRANSCRIBING:" << e.Result->Text << std::endl;
                std::cout << "Speaker ID=" << e.Result->SpeakerId << std::endl;
            });

        conversationTranscriber->Transcribed.Connect([](const ConversationTranscriptionEventArgs& e)
            {
                if (e.Result->Reason == ResultReason::RecognizedSpeech)
                {
                    std::cout << "\n" << "TRANSCRIBED: Text=" << e.Result->Text << std::endl;
                    std::cout << "Speaker ID=" << e.Result->SpeakerId << "\n" << std::endl;
                }
                else if (e.Result->Reason == ResultReason::NoMatch)
                {
                    std::cout << "NOMATCH: Speech could not be transcribed." << std::endl;
                }
            });

        conversationTranscriber->Canceled.Connect([&recognitionEnd](const ConversationTranscriptionCanceledEventArgs& e)
            {
                auto cancellation = CancellationDetails::FromResult(e.Result);
                std::cout << "CANCELED: Reason=" << (int)cancellation->Reason << std::endl;

                if (cancellation->Reason == CancellationReason::Error)
                {
                    std::cout << "CANCELED: ErrorCode=" << (int)cancellation->ErrorCode << std::endl;
                    std::cout << "CANCELED: ErrorDetails=" << cancellation->ErrorDetails << std::endl;
                    std::cout << "CANCELED: Did you set the speech resource key and endpoint values?" << std::endl;
                }
                else if (cancellation->Reason == CancellationReason::EndOfStream)
                {
                    std::cout << "CANCELED: Reach the end of the file." << std::endl;
                }
            });

        conversationTranscriber->SessionStopped.Connect([&recognitionEnd](const SessionEventArgs& e)
            {
                std::cout << "Session stopped.";
                recognitionEnd.set_value(); // Notify to stop recognition.
            });

        conversationTranscriber->StartTranscribingAsync().wait();

        // Waits for recognition end.
        recognitionEnd.get_future().wait();

        conversationTranscriber->StopTranscribingAsync().wait();
    }

    std::string GetEnvironmentVariable(const char* name)
    {
    #if defined(_MSC_VER)
        size_t requiredSize = 0;
        (void)getenv_s(&requiredSize, nullptr, 0, name);
        if (requiredSize == 0)
        {
            return "";
        }
        auto buffer = std::make_unique<char[]>(requiredSize);
        (void)getenv_s(&requiredSize, buffer.get(), requiredSize, name);
        return buffer.get();
    #else
        auto value = getenv(name);
        return value ? value : "";
    #endif
    }
    ```

1. Get the [sample audio file](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/sampledata/audiofiles/katiesteve.wav) or use your own `.wav` file. Replace `katiesteve.wav` with the path and name of your `.wav` file.

   The application recognizes speech from multiple participants in the conversation. Your audio file should contain multiple speakers.

1. To change the speech recognition language, replace `en-US` with another [supported language](https://learn.microsoft.com/azure/cognitive-services/speech-service/supported-languages). For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language. For details about how to identify one of multiple languages that might be spoken, see [language identification](https://learn.microsoft.com/azure/cognitive-services/speech-service/language-identification).

1. To start conversation transcription, [Build and run](https://learn.microsoft.com/cpp/build/vscpp-step-2-build) your application:

   > **Important:**
   > Make sure that you set the `SPEECH_KEY` and `ENDPOINT` [environment variables](#set-environment-variables). If you don't set these variables, the sample fails with an error message.

The transcribed conversation should be output as text:

```output
TRANSCRIBING:good morning
Speaker ID=Unknown
TRANSCRIBING:good morning steve
Speaker ID=Unknown
TRANSCRIBING:good morning steve how are you doing
Speaker ID=Guest-1
TRANSCRIBING:good morning steve how are you doing today
Speaker ID=Guest-1

TRANSCRIBED: Text=Good morning, Steve. How are you doing today?
Speaker ID=Guest-1

TRANSCRIBING:good
Speaker ID=Unknown
TRANSCRIBING:good morning
Speaker ID=Unknown
TRANSCRIBING:good morning kat
Speaker ID=Unknown
TRANSCRIBING:good morning katie i hope you're having a
Speaker ID=Guest-2
TRANSCRIBING:good morning katie i hope you're having a great start to your day
Speaker ID=Guest-2

TRANSCRIBED: Text=Good morning, Katie. I hope you're having a great start to your day.
Speaker ID=Guest-2

TRANSCRIBING:have you
Speaker ID=Unknown
TRANSCRIBING:have you tried
Speaker ID=Unknown
TRANSCRIBING:have you tried the latest
Speaker ID=Unknown
TRANSCRIBING:have you tried the latest real
Speaker ID=Guest-1
TRANSCRIBING:have you tried the latest real time
Speaker ID=Guest-1
TRANSCRIBING:have you tried the latest real time diarization
Speaker ID=Guest-1
TRANSCRIBING:have you tried the latest real time diarization in
Speaker ID=Guest-1
TRANSCRIBING:have you tried the latest real time diarization in microsoft
Speaker ID=Guest-1
TRANSCRIBING:have you tried the latest real time diarization in microsoft speech
Speaker ID=Guest-1
TRANSCRIBING:have you tried the latest real time diarization in microsoft speech service
Speaker ID=Guest-1
TRANSCRIBING:have you tried the latest real time diarization in microsoft speech service which
Speaker ID=Guest-1
TRANSCRIBING:have you tried the latest real time diarization in microsoft speech service which can
Speaker ID=Guest-1
TRANSCRIBING:have you tried the latest real time diarization in microsoft speech service which can tell you
Speaker ID=Guest-1
TRANSCRIBING:have you tried the latest real time diarization in microsoft speech service which can tell you who said
Speaker ID=Guest-1
TRANSCRIBING:have you tried the latest real time diarization in microsoft speech service which can tell you who said what
Speaker ID=Guest-1
TRANSCRIBING:have you tried the latest real time diarization in microsoft speech service which can tell you who said what in
Speaker ID=Guest-1
TRANSCRIBING:have you tried the latest real time diarization in microsoft speech service which can tell you who said what in real time
Speaker ID=Guest-1

TRANSCRIBED: Text=Have you tried the latest real time diarization in Microsoft Speech Service which can tell you who said what in real time?
Speaker ID=Guest-1

TRANSCRIBING:not yet
Speaker ID=Unknown
TRANSCRIBING:not yet i
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch trans
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization function
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces di
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces diarization
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces diarization results
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces diarization results after
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to di
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to diarize
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to diarize in real
Speaker ID=Guest-2
TRANSCRIBING:not yet i've been using the batch transcription with diarization functionality but it produces diarization results after the whole audio is processed is the new feature able to diarize in real time
Speaker ID=Guest-2

TRANSCRIBED: Text=Not yet. I've been using the batch transcription with diarization functionality, but it produces diarization results after the whole audio is processed. Is the new feature able to diarize in real time?
Speaker ID=Guest-2

TRANSCRIBING:absolutely
Speaker ID=Unknown
TRANSCRIBING:absolutely i
Speaker ID=Unknown
TRANSCRIBING:absolutely i recom
Speaker ID=Guest-1
TRANSCRIBING:absolutely i recommend
Speaker ID=Guest-1
TRANSCRIBING:absolutely i recommend you
Speaker ID=Guest-1
TRANSCRIBING:absolutely i recommend you give it a try
Speaker ID=Guest-1

TRANSCRIBED: Text=Absolutely, I recommend you give it a try.
Speaker ID=Guest-1

TRANSCRIBING:that's exc
Speaker ID=Unknown
TRANSCRIBING:that's exciting
Speaker ID=Unknown
TRANSCRIBING:that's exciting let me
Speaker ID=Guest-2
TRANSCRIBING:that's exciting let me try
Speaker ID=Guest-2
TRANSCRIBING:that's exciting let me try it right now
Speaker ID=Guest-2

TRANSCRIBED: Text=That's exciting. Let me try it right now.
Speaker ID=Guest-2
```

Speakers are identified as Guest-1, Guest-2, and so on, depending on the number of speakers in the conversation.

> **Note:**
> You might see `Speaker ID=Unknown` in some of the early intermediate results when the speaker isn't yet identified. Without intermediate diarization results (if you don't set the `PropertyId::SpeechServiceResponse_DiarizeIntermediateResults` property to "true"), the speaker ID is always "Unknown."

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.





**Applies to: programming-language-go**



[Reference documentation](https://aka.ms/csspeech/goref) | [Package (Go)](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go) | [Additional samples on GitHub](https://github.com/microsoft/cognitive-services-speech-sdk-go/tree/master/samples/)



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

The Speech SDK for Go is available as a module. For more information, see the [Speech SDK for Go on pkg.go.dev](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go).

Before you can use the Speech SDK for Go, install the Speech SDK native library. See the [installation guide](quickstarts/setup-platform.md?pivots=programming-language-go) for more information.

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/get-started-stt-diarization.md)

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

1. Create a new directory for your project and create a file named `conversation_transcription.go`.

1. Install the Speech SDK module:

    ```console
    go get github.com/Microsoft/cognitive-services-speech-sdk-go
    ```

1. Copy the following code into `conversation_transcription.go`:

    ```go
    package main

    import (
        "bufio"
        "fmt"
        "os"
        "time"

        "github.com/Microsoft/cognitive-services-speech-sdk-go/audio"
        "github.com/Microsoft/cognitive-services-speech-sdk-go/common"
        "github.com/Microsoft/cognitive-services-speech-sdk-go/speech"
        "github.com/Microsoft/cognitive-services-speech-sdk-go/transcription"
    )

    func main() {
        // This example requires environment variables named "SPEECH_KEY" and "ENDPOINT"
        // Replace with your own subscription key and endpoint
        // The endpoint is like: "https://YourResourceName.cognitiveservices.azure.com"
        speechKey := os.Getenv("SPEECH_KEY")
        endpoint := os.Getenv("ENDPOINT")

        speechConfig, err := speech.NewSpeechConfigFromEndpoint(endpoint)
        if err != nil {
            fmt.Println("Error creating speech config:", err)
            return
        }
        defer speechConfig.Close()

        err = speechConfig.SetProperty(common.SpeechServiceAuthorization, speechKey)
        if err != nil {
            fmt.Println("Error setting authorization:", err)
            return
        }

        err = speechConfig.SetSpeechRecognitionLanguage("en-US")
        if err != nil {
            fmt.Println("Error setting language:", err)
            return
        }

        // Enable intermediate diarization results
        err = speechConfig.SetProperty(common.SpeechServiceResponseDiarizeIntermediateResults, "true")
        if err != nil {
            fmt.Println("Error setting diarization property:", err)
            return
        }

        audioConfig, err := audio.NewAudioConfigFromWavFileInput("katiesteve.wav")
        if err != nil {
            fmt.Println("Error creating audio config:", err)
            return
        }
        defer audioConfig.Close()

        conversationTranscriber, err := transcription.NewConversationTranscriberFromConfig(speechConfig, audioConfig)
        if err != nil {
            fmt.Println("Error creating conversation transcriber:", err)
            return
        }
        defer conversationTranscriber.Close()

        transcribingStop := false

        // Connect callbacks to the events
        conversationTranscriber.Transcribing(func(event transcription.ConversationTranscriptionEventArgs) {
            fmt.Println("TRANSCRIBING:")
            fmt.Printf("\tText=%s\n", event.Result.Text)
            fmt.Printf("\tSpeaker ID=%s\n", event.Result.SpeakerID)
        })

        conversationTranscriber.Transcribed(func(event transcription.ConversationTranscriptionEventArgs) {
            fmt.Println("\nTRANSCRIBED:")
            if event.Result.Reason == common.RecognizedSpeech {
                fmt.Printf("\tText=%s\n", event.Result.Text)
                fmt.Printf("\tSpeaker ID=%s\n\n", event.Result.SpeakerID)
            } else if event.Result.Reason == common.NoMatch {
                fmt.Println("\tNOMATCH: Speech could not be transcribed.")
            }
        })

        conversationTranscriber.Canceled(func(event transcription.ConversationTranscriptionCanceledEventArgs) {
            fmt.Println("CANCELED:", event.Reason)
            if event.Reason == common.Error {
                fmt.Println("Error details:", event.ErrorDetails)
            }
            transcribingStop = true
        })

        conversationTranscriber.SessionStarted(func(event speech.SessionEventArgs) {
            fmt.Println("SessionStarted event")
        })

        conversationTranscriber.SessionStopped(func(event speech.SessionEventArgs) {
            fmt.Println("SessionStopped event")
            fmt.Println("CLOSING on session stopped event")
            transcribingStop = true
        })

        // Start transcription
        err = <-conversationTranscriber.StartTranscribingAsync()
        if err != nil {
            fmt.Println("Error starting transcription:", err)
            return
        }

        // Wait for completion
        for !transcribingStop {
            time.Sleep(500 * time.Millisecond)
        }

        // Stop transcription
        err = <-conversationTranscriber.StopTranscribingAsync()
        if err != nil {
            fmt.Println("Error stopping transcription:", err)
            return
        }
    }
    ```

1. Get the [sample audio file](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/sampledata/audiofiles/katiesteve.wav) or use your own `.wav` file. Replace `katiesteve.wav` with the path and name of your `.wav` file.

   The application recognizes speech from multiple participants in the conversation. Your audio file should contain multiple speakers.

1. To change the speech recognition language, replace `en-US` with another [supported language](https://learn.microsoft.com/azure/cognitive-services/speech-service/supported-languages). For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language. For details about how to identify one of multiple languages that might be spoken, see [language identification](https://learn.microsoft.com/azure/cognitive-services/speech-service/language-identification).

1. Run your console application to start conversation transcription:

   ```console
   go run conversation_transcription.go
   ```

> **Important:**
> Make sure that you set the `SPEECH_KEY` and `ENDPOINT` [environment variables](#set-environment-variables). If you don't set these variables, the sample fails with an error message.

The transcribed conversation should be output as text:

```output
SessionStarted event
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

SessionStopped event
CLOSING on session stopped event
```

Speakers are identified as Guest-1, Guest-2, and so on, depending on the number of speakers in the conversation.

> **Note:**
> You might see `Speaker ID=Unknown` in some of the early intermediate results when the speaker isn't yet identified. Without intermediate diarization results (if you don't set the `SpeechServiceResponse_DiarizeIntermediateResults` property to "true"), the speaker ID is always "Unknown."

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.




**Applies to: programming-language-objectivec**



[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)


## Availability

The Speech SDK for Objective-C does support conversation transcription, but we haven't yet included a guide here. Please select another programming language to get started and learn about the concepts, or see the Objective-C reference and samples linked from the beginning of this article. 



**Applies to: programming-language-swift**



[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)


## Availability

The Speech SDK for Swift does support conversation transcription, but we haven't yet included a guide here. Please select another programming language to get started and learn about the concepts, or see the Swift reference and samples linked from the beginning of this article. 



**Applies to: programming-language-typescript**



[Reference documentation](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/) | [Package (npm)](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk) | [Additional samples on GitHub](https://aka.ms/speech/github-javascript) | [Library source code](https://github.com/Microsoft/cognitive-services-speech-sdk-js)



In this quickstart, you run an application for speech to text transcription with real-time diarization. Diarization distinguishes between the different speakers who participate in the conversation. The Speech service provides information about which speaker was speaking a particular part of transcribed speech. 

The speaker information is included in the result in the speaker ID field. The speaker ID is a generic identifier assigned to each conversation participant by the service during the recognition as different speakers are being identified from the provided audio content.

> **Tip:**
> For fast transcription of audio files, consider using the [fast transcription API.](https://learn.microsoft.com/azure/ai-services/speech-service/fast-transcription-create) Fast transcription API supports features such as language identification and diarization. 


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Setup

1. Create a new folder `transcription-quickstart` and go to the quickstart folder with the following command:

    ```shell
    mkdir transcription-quickstart && cd transcription-quickstart
    ```
    
1. Create the `package.json` with the following command:

    ```shell
    npm init -y
    ```

1. Update the `package.json` to ECMAScript with the following command:
    ```shell
    npm pkg set type=module
    ```

1. Install the Speech SDK for JavaScript with:

    ```console
    npm install microsoft-cognitiveservices-speech-sdk
    ```

1. You need to install the Node.js type definitions to avoid TypeScript errors. Run the following command:

    ```shell
    npm install --save-dev @types/node
    ```

### Retrieve resource information


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/get-started-stt-diarization.md)

To set the environment variables for your Speech resource key and region, open a console window, and follow the instructions for your operating system and development environment.

- To set the `SPEECH_KEY` environment variable, replace *your-key* with one of the keys for your resource.
- To set the `SPEECH_REGION` environment variable, replace *your-region* with one of the regions for your resource.
- To set the `ENDPOINT` environment variable, replace `your-endpoint` with the actual endpoint of your Speech resource.

#### [Windows](#tab/windows)

```console
setx SPEECH_KEY your-key
setx SPEECH_REGION your-region
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
export SPEECH_REGION=your-region
export ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bashrc` from your console window to make the changes effective.

#### [macOS](#tab/macos)

##### Bash

Edit your *.bash_profile* file, and add the environment variables:

```bash
export SPEECH_KEY=your-key
export SPEECH_REGION=your-region
export ENDPOINT=your-endpoint
```

After you add the environment variables, run `source ~/.bash_profile` from your console window to make the changes effective.

##### Xcode

For iOS and macOS development, you set the environment variables in Xcode. For example, follow these steps to set the environment variable in Xcode 13.4.1.

1. Select **Product** > **Scheme** > **Edit scheme**.
1. Select **Arguments** on the **Run** (Debug Run) page.
1. Under **Environment Variables** select the plus (+) sign to add a new environment variable.
1. Enter `SPEECH_KEY` for the **Name** and enter your Speech resource key for the **Value**.

To set the environment variable for your Speech resource region, follow the same steps. Set `SPEECH_REGION` to the region of your resource. For example, `westus`. Set `ENDPOINT` to the endpoint of your resource

For more configuration options, see [the Xcode documentation](https://help.apple.com/xcode/#/dev745c5c974).

---


## Implement diarization from file with conversation transcription

Follow these steps to create a new console application for conversation transcription.

1. Create a new file named *transcription.ts* with the following content:

    ```typescript
    import { readFileSync, createReadStream } from "fs";
    import { 
        SpeechConfig, 
        AudioConfig, 
        ConversationTranscriber,
        AudioInputStream 
    } from "microsoft-cognitiveservices-speech-sdk";
    
    // This example requires environment variables named "ENDPOINT" and "SPEECH_KEY"
    const speechConfig: SpeechConfig = SpeechConfig.fromEndpoint(new URL(process.env.ENDPOINT!), process.env.SPEECH_KEY!);
    
    function fromFile(): void {
        const filename = "katiesteve.wav";
    
        const audioConfig: AudioConfig = AudioConfig.fromWavFileInput(readFileSync(filename));
        const conversationTranscriber: ConversationTranscriber = new ConversationTranscriber(speechConfig, audioConfig);
    
        const pushStream = AudioInputStream.createPushStream();
    
        createReadStream(filename).on('data', function(chunk: string | Buffer) {
            pushStream.write((chunk as Buffer).slice());
        }).on('end', function() {
            pushStream.close();
        });
    
        console.log("Transcribing from: " + filename);
    
        conversationTranscriber.sessionStarted = function(s, e) {
            console.log("SessionStarted event");
            console.log("SessionId:" + e.sessionId);
        };
        conversationTranscriber.sessionStopped = function(s, e) {
            console.log("SessionStopped event");
            console.log("SessionId:" + e.sessionId);
            conversationTranscriber.stopTranscribingAsync();
        };
        conversationTranscriber.canceled = function(s, e) {
            console.log("Canceled event");
            console.log(e.errorDetails);
            conversationTranscriber.stopTranscribingAsync();
        };
        conversationTranscriber.transcribed = function(s, e) {
            console.log("TRANSCRIBED: Text=" + e.result.text + " Speaker ID=" + e.result.speakerId);
        };
    
        // Start conversation transcription
        conversationTranscriber.startTranscribingAsync(
            function () {},
            function (err) {
                console.trace("err - starting transcription: " + err);
            }
        );
    
    }
    fromFile();
    ```

1. Get the [sample audio file](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/sampledata/audiofiles/katiesteve.wav) or use your own `.wav` file. Replace `katiesteve.wav` with the path and name of your `.wav` file.

   The application recognizes speech from multiple participants in the conversation. Your audio file should contain multiple speakers.

1. To change the speech recognition language, replace `en-US` with another [supported language](https://learn.microsoft.com/azure/cognitive-services/speech-service/supported-languages). For example, `es-ES` for Spanish (Spain). The default language is `en-US` if you don't specify a language. For details about how to identify one of multiple languages that might be spoken, see [language identification](https://learn.microsoft.com/azure/cognitive-services/speech-service/language-identification).

1. Create the `tsconfig.json` file to transpile the TypeScript code and copy the following code for ECMAScript.

    ```json
    {
        "compilerOptions": {
          "module": "NodeNext",
          "target": "ES2022", // Supports top-level await
          "moduleResolution": "NodeNext",
          "skipLibCheck": true, // Avoid type errors from node_modules
          "strict": true // Enable strict type-checking options
        },
        "include": ["*.ts"]
    }
    ```

1. Transpile from TypeScript to JavaScript.

    ```shell
    tsc
    ```

    This command should produce no output if successful.

1. Run your new console application to start speech recognition from a file:

   ```console
   node transcription.js
   ```

Wait a few moments to get the response.

## Output

The transcribed conversation should be output as text:

```output
SessionStarted event
SessionId:E87AFBA483C2481985F6C9AF719F616B
TRANSCRIBED: Text=Good morning, Steve. Speaker ID=Unknown
TRANSCRIBED: Text=Good morning, Katie. Speaker ID=Unknown
TRANSCRIBED: Text=Have you tried the latest real time diarization in Microsoft Speech Service which can tell you who said what in real time? Speaker ID=Guest-1
TRANSCRIBED: Text=Not yet. I've been using the batch transcription with diarization functionality, but it produces diarization result until whole audio get processed. Speaker ID=Guest-2
TRANSCRIBED: Text=Is the new feature can diarize in real time? Speaker ID=Guest-2
TRANSCRIBED: Text=Absolutely. Speaker ID=Guest-1
TRANSCRIBED: Text=That's exciting. Let me try it right now. Speaker ID=Guest-2
Canceled event
undefined
SessionStopped event
SessionId:E87AFBA483C2481985F6C9AF719F616B
```

Speakers are identified as Guest-1, Guest-2, and so on, depending on the number of speakers in the conversation.

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.





## Next step

> 
> [Learn more about speech recognition](how-to-recognize-speech.md)
