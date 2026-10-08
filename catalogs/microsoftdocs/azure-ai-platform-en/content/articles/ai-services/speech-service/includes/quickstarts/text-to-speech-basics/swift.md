---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 7/17/2025
ms.author: pafarley
---


[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)



With Azure Speech in Foundry Tools, you can run an application that synthesizes a human-like voice to read text. You can change the voice, enter text to be spoken, and listen to the output on your computer's speaker.

> **Tip:**
> You can try text to speech in the [Speech Studio Voice Gallery](https://aka.ms/speechstudio/voicegallery) without signing up or writing any code.

> **Tip:**
> Try out the [Azure Speech Toolkit](https://marketplace.visualstudio.com/items?itemName=ms-azureaispeech.azure-ai-speech-toolkit) to easily build and run samples on Visual Studio Code.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create a Foundry resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and region. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Set up the environment

The Speech SDK for Swift is distributed as a framework bundle. The framework supports both Objective-C and Swift on both iOS and macOS.

The Speech SDK can be used in Xcode projects as a [CocoaPod](https://cocoapods.org/), or [downloaded directly](https://aka.ms/csspeech/macosbinary) and linked manually. This guide uses a CocoaPod. Install the CocoaPod dependency manager as described in its [installation instructions](https://guides.cocoapods.org/using/getting-started.html).

### Set environment variables


You need to authenticate your application to access Foundry Tools. This article shows you how to use environment variables to store your credentials. You can then access the environment variables from your code to authenticate your application. For production, use a more secure way to store and access your credentials. 

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/text-to-speech-basics/swift.md)

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


## Create the application

Follow these steps to synthesize speech in a macOS application.

1. Clone the [Azure-Samples/cognitive-services-speech-sdk](https://github.com/Azure-Samples/cognitive-services-speech-sdk) repository to get the [Synthesize audio in Swift on macOS using the Speech SDK](https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/quickstart/swift/macos/text-to-speech) sample project. The repository also has iOS samples.
1. Navigate to the directory of the downloaded sample app (`helloworld`) in a terminal.
1. Run the command `pod install`. This command generates a `helloworld.xcworkspace` Xcode workspace that contains both the sample app and the Speech SDK as a dependency.
1. Open the `helloworld.xcworkspace` workspace in Xcode.
1. Open the file named *AppDelegate.swift* and locate the `applicationDidFinishLaunching` and `synthesize` methods as shown here.

   ```swift
   import Cocoa

   @NSApplicationMain
   class AppDelegate: NSObject, NSApplicationDelegate, NSTextFieldDelegate {
       var textField: NSTextField!
       var synthesisButton: NSButton!

       var inputText: String!

       var sub: String!
       var region: String!

       @IBOutlet weak var window: NSWindow!

       func applicationDidFinishLaunching(_ aNotification: Notification) {
           print("loading")
           // load subscription information
           sub = ProcessInfo.processInfo.environment["SPEECH_KEY"]
           region = ProcessInfo.processInfo.environment["SPEECH_REGION"]

           inputText = ""

           textField = NSTextField(frame: NSRect(x: 100, y: 200, width: 200, height: 50))
           textField.textColor = NSColor.black
           textField.lineBreakMode = .byWordWrapping

           textField.placeholderString = "Type something to synthesize."
           textField.delegate = self

           self.window.contentView?.addSubview(textField)

           synthesisButton = NSButton(frame: NSRect(x: 100, y: 100, width: 200, height: 30))
           synthesisButton.title = "Synthesize"
           synthesisButton.target = self
           synthesisButton.action = #selector(synthesisButtonClicked)
           self.window.contentView?.addSubview(synthesisButton)
       }

       @objc func synthesisButtonClicked() {
           DispatchQueue.global(qos: .userInitiated).async {
               self.synthesize()
           }
       }

       func synthesize() {
           var speechConfig: SPXSpeechConfiguration?
           do {
               try speechConfig = SPXSpeechConfiguration(subscription: sub, region: region)
           } catch {
               print("error \(error) happened")
               speechConfig = nil
           }

           speechConfig?.speechSynthesisVoiceName = "en-US-Ava:DragonHDLatestNeural";

           let synthesizer = try! SPXSpeechSynthesizer(speechConfig!)
           let result = try! synthesizer.speakText(inputText)
           if result.reason == SPXResultReason.canceled
           {
               let cancellationDetails = try! SPXSpeechSynthesisCancellationDetails(fromCanceledSynthesisResult: result)
               print("cancelled, error code: \(cancellationDetails.errorCode) detail: \(cancellationDetails.errorDetails!) ")
               print("Did you set the speech resource key and region values?");
               return
           }
       }

       func controlTextDidChange(_ obj: Notification) {
           let textFiled = obj.object as! NSTextField
           inputText = textFiled.stringValue
       }
   }
   ```

1. In *AppDelegate.m*, use the [environment variables that you previously set](#set-environment-variables) for your Speech resource key and region.

   ```swift
   sub = ProcessInfo.processInfo.environment["SPEECH_KEY"]
   region = ProcessInfo.processInfo.environment["SPEECH_REGION"]
   ```

1. Optionally in *AppDelegate.m*, include a speech synthesis voice name as shown here:

   ```swift
   speechConfig?.speechSynthesisVoiceName = "en-US-Ava:DragonHDLatestNeural";
   ```

1. To change the speech synthesis language, replace `en-US-Ava:DragonHDLatestNeural` with another [supported voice](../../../language-support.md#standard-voices).

   All neural voices are multilingual and fluent in their own language and English. For example, if the input text in English is *I'm excited to try text to speech* and you set `es-ES-Ximena:DragonHDLatestNeural`, the text is spoken in English with a Spanish accent. If the voice doesn't speak the language of the input text, the Speech service doesn't output synthesized audio.

1. To make the debug output visible, select **View** > **Debug Area** > **Activate Console**.
1. To build and run the example code, select **Product** > **Run** from the menu or select the **Play** button.

> **Important:**
> Make sure that you set the `SPEECH_KEY` and `SPEECH_REGION` [environment variables](#set-environment-variables). If you don't set these variables, the sample fails with an error message.

After you input some text and select the button in the app, you should hear the synthesized audio played.

## Remarks

### More speech synthesis options

This quickstart uses the `SpeakText` operation to synthesize a short block of text that you enter. You can also use long-form text from a file and get finer control over voice styles, prosody, and other settings.

- See [how to synthesize speech](../../../how-to-speech-synthesis.md) and [Speech Synthesis Markup Language (SSML) overview](../../../speech-synthesis-markup.md) for information about speech synthesis from a file and finer control over voice styles, prosody, and other settings.
- See [batch synthesis API for text to speech](../../../batch-synthesis.md) for information about synthesizing long-form text to speech.

### OpenAI text to speech voices in Azure Speech in Foundry Tools

OpenAI text to speech voices are also supported. See [OpenAI text to speech voices in Azure Speech](../../../openai-voices.md) and [multilingual voices](../../../language-support.md?tabs=tts#multilingual-voices). You can replace `en-US-Ava:DragonHDLatestNeural` with a supported OpenAI voice name such as `en-US-FableMultilingualNeural`.

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.
