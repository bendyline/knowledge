---
title: Create a custom keyword quickstart - Speech service
titleSuffix: Foundry Tools
description: When a user speaks the keyword, your device sends their dictation to the cloud, until the user stops speaking. Customizing your keyword is an effective way to differentiate your device and strengthen your branding.
author: PatrickFarley
manager: mcleans
ms.service: azure-speech-foundry-tools
ms.topic: quickstart
ms.date: 02/25/2026
ms.author: pafarley
ms.devlang: csharp
ms.custom: devx-track-csharp, devx-track-extended-java, devx-track-go, devx-track-js, devx-track-python
zone_pivot_groups: programming-languages-speech-services
---

# Quickstart: Create a custom keyword

**Applies to: programming-language-rest**



[Speech to text REST API reference](rest-speech-to-text.md) | [Speech to text REST API for short audio reference](rest-speech-to-text-short.md) | [Additional samples on GitHub](https://github.com/Azure-Samples/cognitive-services-speech-sdk)


The Speech to text REST API doesn't support keyword recognition. Please select another programming language or the reference and samples linked from the beginning of this article. 



**Applies to: programming-language-python**



[Reference documentation](https://learn.microsoft.com/python/api/azure-cognitiveservices-speech/) | [Package (PyPi)](https://pypi.org/project/azure-cognitiveservices-speech/) | [Additional samples on GitHub](https://aka.ms/speech/github-python)



In this quickstart, you learn the basics of working with custom keywords. A keyword is a word or short phrase, which allows your product to be voice activated. You create keyword models in Speech Studio. Then export a model file that you use with the Speech SDK in your applications.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Create a keyword in Speech Studio


Before you can use a custom keyword, you need to create a keyword using the [Custom Keyword](https://aka.ms/sdsdk-wakewordportal) page on [Speech Studio](https://aka.ms/sdsdk-speechportal). After you provide a keyword, it produces a `.table` file that you can use with the Speech SDK.

> **Important:**
> Custom keyword models, and the resulting `.table` files, can **only** be created in Speech Studio.
> You cannot create custom keywords from the SDK or with REST calls.

1. Go to the [Speech Studio](https://aka.ms/sdsdk-speechportal) and **Sign in**. If you don't have a speech subscription, go to [**Create Speech Services**](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry).

1. On the [Custom Keyword](https://aka.ms/sdsdk-wakewordportal) page, select **Create a new project**. 

1. Enter a **Name**, **Description**, and **Language** for your custom keyword project. You can only choose one language per project, and support is currently limited to English (United States) and Chinese (Mandarin, Simplified). 

    Describe your keyword project

1. Select your project's name from the list. 

    Select your keyword project.

1. To create a custom keyword for your virtual assistant, select **Create a new model**.

1. Enter a **Name** for the model, **Description**, and **Keyword** of your choice, then select **Next**. See the [guidelines](keyword-recognition-guidelines.md#choosing-an-effective-keyword) on choosing an effective keyword.

    Enter your keyword

1. The portal creates candidate pronunciations for your keyword. Listen to each candidate by selecting the play buttons and remove the checks next to any pronunciations that are incorrect.Select all pronunciations that correspond to how you expect your users to say the keyword and then select **Next** to begin generating the keyword model. 

    Screenshot that shows where you choose the correct pronunciations.

1. Select a model type, then select **Create**. You can view a list of regions that support the **Advanced** model type in the [Keyword recognition region support](regions.md#regions) documentation. 

1. Because of high demand, training the basic model might take several hours. Training the advanced model could take up to a day to finish. The status changes from **Processing** to **Succeeded** when the training is complete. 

    Review your keyword.

1. From the collapsible menu on the left, select **Tune** for options to tune and download your model. The downloaded file is a `.zip` archive. Extract the archive, and you see a file with the `.table` extension. You use the `.table` file with the SDK, so make sure to note its path.

    Download your model table.



## Use a keyword model with the Speech SDK

See the [sample on GitHub](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/b4257370e1d799f0b8b64be9bf2a34cad8b1a251/samples/python/console/speech_sample.py#L517) for using your Custom Keyword model with the Python SDK.



**Applies to: programming-language-csharp**



[Reference documentation](https://learn.microsoft.com/dotnet/api/microsoft.cognitiveservices.speech) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-csharp)



In this quickstart, you learn the basics of working with custom keywords. A keyword is a word or short phrase, which allows your product to be voice activated. You create keyword models in Speech Studio. Then export a model file that you use with the Speech SDK in your applications.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Create a keyword in Speech Studio


Before you can use a custom keyword, you need to create a keyword using the [Custom Keyword](https://aka.ms/sdsdk-wakewordportal) page on [Speech Studio](https://aka.ms/sdsdk-speechportal). After you provide a keyword, it produces a `.table` file that you can use with the Speech SDK.

> **Important:**
> Custom keyword models, and the resulting `.table` files, can **only** be created in Speech Studio.
> You cannot create custom keywords from the SDK or with REST calls.

1. Go to the [Speech Studio](https://aka.ms/sdsdk-speechportal) and **Sign in**. If you don't have a speech subscription, go to [**Create Speech Services**](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry).

1. On the [Custom Keyword](https://aka.ms/sdsdk-wakewordportal) page, select **Create a new project**. 

1. Enter a **Name**, **Description**, and **Language** for your custom keyword project. You can only choose one language per project, and support is currently limited to English (United States) and Chinese (Mandarin, Simplified). 

    Describe your keyword project

1. Select your project's name from the list. 

    Select your keyword project.

1. To create a custom keyword for your virtual assistant, select **Create a new model**.

1. Enter a **Name** for the model, **Description**, and **Keyword** of your choice, then select **Next**. See the [guidelines](keyword-recognition-guidelines.md#choosing-an-effective-keyword) on choosing an effective keyword.

    Enter your keyword

1. The portal creates candidate pronunciations for your keyword. Listen to each candidate by selecting the play buttons and remove the checks next to any pronunciations that are incorrect.Select all pronunciations that correspond to how you expect your users to say the keyword and then select **Next** to begin generating the keyword model. 

    Screenshot that shows where you choose the correct pronunciations.

1. Select a model type, then select **Create**. You can view a list of regions that support the **Advanced** model type in the [Keyword recognition region support](regions.md#regions) documentation. 

1. Because of high demand, training the basic model might take several hours. Training the advanced model could take up to a day to finish. The status changes from **Processing** to **Succeeded** when the training is complete. 

    Review your keyword.

1. From the collapsible menu on the left, select **Tune** for options to tune and download your model. The downloaded file is a `.zip` archive. Extract the archive, and you see a file with the `.table` extension. You use the `.table` file with the SDK, so make sure to note its path.

    Download your model table.



## Use a keyword model with the Speech SDK

First, load your keyword model file using the `FromFile()` static function, which returns a `KeywordRecognitionModel`. Use the path to the `.table` file you downloaded from Speech Studio. Additionally, you create an `AudioConfig` using the default microphone, then instantiate a new `KeywordRecognizer` using the audio configuration.

```csharp
using Microsoft.CognitiveServices.Speech;
using Microsoft.CognitiveServices.Speech.Audio;

var keywordModel = KeywordRecognitionModel.FromFile("your/path/to/Activate_device.table");
using var audioConfig = AudioConfig.FromDefaultMicrophoneInput();
using var keywordRecognizer = new KeywordRecognizer(audioConfig);
```
> **Important:**
> If you prefer testing a keyword model directly with audio samples via the `AudioConfig.fromStreamInput()` method, make sure you use samples that have at least 1.5 seconds of silence before the first keyword. This is to provide an adequate time for the Keyword recognition engine to initialize and to get to the listening state prior to detecting the first keyword.

Next, running keyword recognition is done with one call to `RecognizeOnceAsync()` by passing your model object. This method starts a keyword recognition session that lasts until the keyword is recognized. Thus, you generally use this design pattern in multi-threaded applications, or in use cases where you might be waiting for a wake-word indefinitely.

```csharp
KeywordRecognitionResult result = await keywordRecognizer.RecognizeOnceAsync(keywordModel);
```

> **Note:**
> The example shown here uses local keyword recognition, since it doesn't require a `SpeechConfig` 
object for authentication context, and doesn't contact the back-end. 

### Continuous recognition

Other classes in the Speech SDK support continuous recognition (for speech recognition) with keyword recognition. The SDK allows you to use the same code you would normally use for continuous recognition, with the ability to reference a `.table` file for your keyword model.

For speech to text, follow the same design pattern shown in the [recognize speech guide](how-to-recognize-speech.md?pivots=programming-language-csharp#continuous-recognition) to set up continuous recognition. Then, replace the call to `recognizer.StartContinuousRecognitionAsync()` with `recognizer.StartKeywordRecognitionAsync(KeywordRecognitionModel)`, and pass your `KeywordRecognitionModel` object. To stop continuous recognition with keyword recognition, use `recognizer.StopKeywordRecognitionAsync()` instead of `recognizer.StopContinuousRecognitionAsync()`.



**Applies to: programming-language-javascript**



[Reference documentation](https://learn.microsoft.com/javascript/api/microsoft-cognitiveservices-speech-sdk/) | [Package (npm)](https://www.npmjs.com/package/microsoft-cognitiveservices-speech-sdk) | [Additional samples on GitHub](https://aka.ms/speech/github-javascript) | [Library source code](https://github.com/Microsoft/cognitive-services-speech-sdk-js)


The Speech SDK for JavaScript doesn't support keyword recognition. Please select another programming language or the JavaScript reference and samples linked from the beginning of this article. 



**Applies to: programming-language-java**



[Reference documentation](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech) | [Additional samples on GitHub](https://aka.ms/speech/github-java)


## Availability

The Speech SDK for Java does support keyword recognition, but we haven't yet included a guide here. Please select another programming language to get started and learn about the concepts, or see the Java reference and samples linked from the beginning of this article. 



**Applies to: programming-language-cpp**



[Reference documentation](https://learn.microsoft.com/cpp/cognitive-services/speech/) | [Package (NuGet)](https://www.nuget.org/packages/Microsoft.CognitiveServices.Speech) | [Additional samples on GitHub](https://aka.ms/speech/github-cpp)


## Availability

The Speech SDK for C++ does support keyword recognition, but we haven't yet included a guide here. Please select another programming language to get started and learn about the concepts, or see the C++ reference and samples linked from the beginning of this article. 



**Applies to: programming-language-go**



> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Create a keyword in Speech Studio


Before you can use a custom keyword, you need to create a keyword using the [Custom Keyword](https://aka.ms/sdsdk-wakewordportal) page on [Speech Studio](https://aka.ms/sdsdk-speechportal). After you provide a keyword, it produces a `.table` file that you can use with the Speech SDK.

> **Important:**
> Custom keyword models, and the resulting `.table` files, can **only** be created in Speech Studio.
> You cannot create custom keywords from the SDK or with REST calls.

1. Go to the [Speech Studio](https://aka.ms/sdsdk-speechportal) and **Sign in**. If you don't have a speech subscription, go to [**Create Speech Services**](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry).

1. On the [Custom Keyword](https://aka.ms/sdsdk-wakewordportal) page, select **Create a new project**. 

1. Enter a **Name**, **Description**, and **Language** for your custom keyword project. You can only choose one language per project, and support is currently limited to English (United States) and Chinese (Mandarin, Simplified). 

    Describe your keyword project

1. Select your project's name from the list. 

    Select your keyword project.

1. To create a custom keyword for your virtual assistant, select **Create a new model**.

1. Enter a **Name** for the model, **Description**, and **Keyword** of your choice, then select **Next**. See the [guidelines](keyword-recognition-guidelines.md#choosing-an-effective-keyword) on choosing an effective keyword.

    Enter your keyword

1. The portal creates candidate pronunciations for your keyword. Listen to each candidate by selecting the play buttons and remove the checks next to any pronunciations that are incorrect.Select all pronunciations that correspond to how you expect your users to say the keyword and then select **Next** to begin generating the keyword model. 

    Screenshot that shows where you choose the correct pronunciations.

1. Select a model type, then select **Create**. You can view a list of regions that support the **Advanced** model type in the [Keyword recognition region support](regions.md#regions) documentation. 

1. Because of high demand, training the basic model might take several hours. Training the advanced model could take up to a day to finish. The status changes from **Processing** to **Succeeded** when the training is complete. 

    Review your keyword.

1. From the collapsible menu on the left, select **Tune** for options to tune and download your model. The downloaded file is a `.zip` archive. Extract the archive, and you see a file with the `.table` extension. You use the `.table` file with the SDK, so make sure to note its path.

    Download your model table.



## Use a keyword model with the Speech SDK

See the [reference documentation](https://pkg.go.dev/github.com/Microsoft/cognitive-services-speech-sdk-go/speech#KeywordRecognitionModel) for using your Custom Keyword model with the Go SDK.



**Applies to: programming-language-objectivec**



[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)



In this quickstart, you learn the basics of working with custom keywords. A keyword is a word or short phrase, which allows your product to be voice activated. You create keyword models in Speech Studio. Then export a model file that you use with the Speech SDK in your applications.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Create a keyword in Speech Studio


Before you can use a custom keyword, you need to create a keyword using the [Custom Keyword](https://aka.ms/sdsdk-wakewordportal) page on [Speech Studio](https://aka.ms/sdsdk-speechportal). After you provide a keyword, it produces a `.table` file that you can use with the Speech SDK.

> **Important:**
> Custom keyword models, and the resulting `.table` files, can **only** be created in Speech Studio.
> You cannot create custom keywords from the SDK or with REST calls.

1. Go to the [Speech Studio](https://aka.ms/sdsdk-speechportal) and **Sign in**. If you don't have a speech subscription, go to [**Create Speech Services**](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry).

1. On the [Custom Keyword](https://aka.ms/sdsdk-wakewordportal) page, select **Create a new project**. 

1. Enter a **Name**, **Description**, and **Language** for your custom keyword project. You can only choose one language per project, and support is currently limited to English (United States) and Chinese (Mandarin, Simplified). 

    Describe your keyword project

1. Select your project's name from the list. 

    Select your keyword project.

1. To create a custom keyword for your virtual assistant, select **Create a new model**.

1. Enter a **Name** for the model, **Description**, and **Keyword** of your choice, then select **Next**. See the [guidelines](keyword-recognition-guidelines.md#choosing-an-effective-keyword) on choosing an effective keyword.

    Enter your keyword

1. The portal creates candidate pronunciations for your keyword. Listen to each candidate by selecting the play buttons and remove the checks next to any pronunciations that are incorrect.Select all pronunciations that correspond to how you expect your users to say the keyword and then select **Next** to begin generating the keyword model. 

    Screenshot that shows where you choose the correct pronunciations.

1. Select a model type, then select **Create**. You can view a list of regions that support the **Advanced** model type in the [Keyword recognition region support](regions.md#regions) documentation. 

1. Because of high demand, training the basic model might take several hours. Training the advanced model could take up to a day to finish. The status changes from **Processing** to **Succeeded** when the training is complete. 

    Review your keyword.

1. From the collapsible menu on the left, select **Tune** for options to tune and download your model. The downloaded file is a `.zip` archive. Extract the archive, and you see a file with the `.table` extension. You use the `.table` file with the SDK, so make sure to note its path.

    Download your model table.



## Use a keyword model with the Speech SDK

See the [sample on GitHub](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/b4257370e1d799f0b8b64be9bf2a34cad8b1a251/samples/objective-c/ios/speech-samples/speech-samples/ViewController.m#L585) for a complete Objective-C example that demonstrates how to load a custom keyword model (`.table` file), configure the Speech SDK, and start keyword recognition using the device microphone in an iOS application.

> **Note:**
> If you use keyword recognition in an iOS application, newly created keyword models require either the Speech SDK xcframework bundle from [https://aka.ms/csspeech/iosbinaryembedded](https://aka.ms/csspeech/iosbinaryembedded) or the `MicrosoftCognitiveServicesSpeechEmbedded-iOS` pod in your project.


**Applies to: programming-language-cli**


## Availability

The Speech CLI does support keyword recognition, but we haven't yet included a guide here. Please select another programming language to get started and learn about the concepts.



**Applies to: programming-language-swift**



[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)



In this quickstart, you learn the basics of working with custom keywords. A keyword is a word or short phrase, which allows your product to be voice activated. You create keyword models in Speech Studio. Then export a model file that you use with the Speech SDK in your applications.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Create a keyword in Speech Studio


Before you can use a custom keyword, you need to create a keyword using the [Custom Keyword](https://aka.ms/sdsdk-wakewordportal) page on [Speech Studio](https://aka.ms/sdsdk-speechportal). After you provide a keyword, it produces a `.table` file that you can use with the Speech SDK.

> **Important:**
> Custom keyword models, and the resulting `.table` files, can **only** be created in Speech Studio.
> You cannot create custom keywords from the SDK or with REST calls.

1. Go to the [Speech Studio](https://aka.ms/sdsdk-speechportal) and **Sign in**. If you don't have a speech subscription, go to [**Create Speech Services**](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry).

1. On the [Custom Keyword](https://aka.ms/sdsdk-wakewordportal) page, select **Create a new project**. 

1. Enter a **Name**, **Description**, and **Language** for your custom keyword project. You can only choose one language per project, and support is currently limited to English (United States) and Chinese (Mandarin, Simplified). 

    Describe your keyword project

1. Select your project's name from the list. 

    Select your keyword project.

1. To create a custom keyword for your virtual assistant, select **Create a new model**.

1. Enter a **Name** for the model, **Description**, and **Keyword** of your choice, then select **Next**. See the [guidelines](keyword-recognition-guidelines.md#choosing-an-effective-keyword) on choosing an effective keyword.

    Enter your keyword

1. The portal creates candidate pronunciations for your keyword. Listen to each candidate by selecting the play buttons and remove the checks next to any pronunciations that are incorrect.Select all pronunciations that correspond to how you expect your users to say the keyword and then select **Next** to begin generating the keyword model. 

    Screenshot that shows where you choose the correct pronunciations.

1. Select a model type, then select **Create**. You can view a list of regions that support the **Advanced** model type in the [Keyword recognition region support](regions.md#regions) documentation. 

1. Because of high demand, training the basic model might take several hours. Training the advanced model could take up to a day to finish. The status changes from **Processing** to **Succeeded** when the training is complete. 

    Review your keyword.

1. From the collapsible menu on the left, select **Tune** for options to tune and download your model. The downloaded file is a `.zip` archive. Extract the archive, and you see a file with the `.table` extension. You use the `.table` file with the SDK, so make sure to note its path.

    Download your model table.



## Use a keyword model with the Speech SDK

See the [sample on GitHub](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/b4257370e1d799f0b8b64be9bf2a34cad8b1a251/samples/objective-c/ios/speech-samples/speech-samples/ViewController.m#L585) for a complete Objective-C example that demonstrates how to load a custom keyword model (`.table` file) and start keyword recognition on iOS. Although a Swift-specific sample is not currently available, the same workflow and Speech SDK concepts apply when using Swift.

> **Note:**
> If you use keyword recognition in an iOS application, newly created keyword models require either the Speech SDK xcframework bundle from [https://aka.ms/csspeech/iosbinaryembedded](https://aka.ms/csspeech/iosbinaryembedded) or the `MicrosoftCognitiveServicesSpeechEmbedded-iOS` pod in your project.


## Next steps

> 
> [Get the Speech SDK](speech-sdk.md)
