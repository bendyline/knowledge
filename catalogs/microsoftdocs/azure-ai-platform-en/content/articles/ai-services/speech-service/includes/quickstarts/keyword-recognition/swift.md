---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 3/10/2025
ms.author: pafarley
---


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

1. Enter a **Name** for the model, **Description**, and **Keyword** of your choice, then select **Next**. See the [guidelines](../../../keyword-recognition-guidelines.md#choosing-an-effective-keyword) on choosing an effective keyword.

    Enter your keyword

1. The portal creates candidate pronunciations for your keyword. Listen to each candidate by selecting the play buttons and remove the checks next to any pronunciations that are incorrect.Select all pronunciations that correspond to how you expect your users to say the keyword and then select **Next** to begin generating the keyword model. 

    Screenshot that shows where you choose the correct pronunciations.

1. Select a model type, then select **Create**. You can view a list of regions that support the **Advanced** model type in the [Keyword recognition region support](../../../regions.md#regions) documentation. 

1. Because of high demand, training the basic model might take several hours. Training the advanced model could take up to a day to finish. The status changes from **Processing** to **Succeeded** when the training is complete. 

    Review your keyword.

1. From the collapsible menu on the left, select **Tune** for options to tune and download your model. The downloaded file is a `.zip` archive. Extract the archive, and you see a file with the `.table` extension. You use the `.table` file with the SDK, so make sure to note its path.

    Download your model table.



## Use a keyword model with the Speech SDK

See the [sample on GitHub](https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/b4257370e1d799f0b8b64be9bf2a34cad8b1a251/samples/objective-c/ios/speech-samples/speech-samples/ViewController.m#L585) for a complete Objective-C example that demonstrates how to load a custom keyword model (`.table` file) and start keyword recognition on iOS. Although a Swift-specific sample is not currently available, the same workflow and Speech SDK concepts apply when using Swift.

> **Note:**
> If you use keyword recognition in an iOS application, newly created keyword models require either the Speech SDK xcframework bundle from [https://aka.ms/csspeech/iosbinaryembedded](https://aka.ms/csspeech/iosbinaryembedded) or the `MicrosoftCognitiveServicesSpeechEmbedded-iOS` pod in your project.
