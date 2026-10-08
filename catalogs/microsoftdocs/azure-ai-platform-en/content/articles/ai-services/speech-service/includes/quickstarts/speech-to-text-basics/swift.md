---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.custom:
  - build-2024
ms.topic: include
ms.date: 7/16/2025
ms.author: pafarley
---


[Reference documentation](https://learn.microsoft.com/objectivec/cognitive-services/speech/) | [Package (download)](https://aka.ms/csspeech/macosbinary) | [Additional samples on GitHub](https://aka.ms/speech/github-objective-c)



In this quickstart, you create and run an application to recognize and transcribe speech to text in real-time. 

> **Tip:**
> For fast transcription of audio files, consider using the [fast transcription API.](https://learn.microsoft.com/azure/ai-services/speech-service/fast-transcription-create) Fast transcription API supports features such as language identification and diarization. 

To instead transcribe audio files asynchronously, see [What is batch transcription](../../../batch-transcription.md). If you're not sure which speech to text solution is right for you, see [What is speech to text?](../../../speech-to-text.md)


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

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/speech-to-text-basics/swift.md)

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


## Recognize speech from a microphone

Follow these steps to recognize speech in a macOS application.

1. Clone the [Azure-Samples/cognitive-services-speech-sdk](https://github.com/Azure-Samples/cognitive-services-speech-sdk) repository to get the [Recognize speech from a microphone in Swift on macOS](https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/quickstart/swift/macos/from-microphone) sample project. The repository also has iOS samples.
1. Navigate to the directory of the downloaded sample app (`helloworld`) in a terminal.
1. Run the command `pod install`. This command generates a `helloworld.xcworkspace` Xcode workspace containing both the sample app and the Speech SDK as a dependency.
1. Open the `helloworld.xcworkspace` workspace in Xcode.
1. Open the file named *AppDelegate.swift* and locate the `applicationDidFinishLaunching` and `recognizeFromMic` methods as shown here.

   ```swift
   import Cocoa

   @NSApplicationMain
   class AppDelegate: NSObject, NSApplicationDelegate {
       var label: NSTextField!
       var fromMicButton: NSButton!

       var sub: String!
       var region: String!

       @IBOutlet weak var window: NSWindow!

       func applicationDidFinishLaunching(_ aNotification: Notification) {
           print("loading")
           // load subscription information
           sub = ProcessInfo.processInfo.environment["SPEECH_KEY"]
           region = ProcessInfo.processInfo.environment["SPEECH_REGION"]

           label = NSTextField(frame: NSRect(x: 100, y: 50, width: 200, height: 200))
           label.textColor = NSColor.black
           label.lineBreakMode = .byWordWrapping

           label.stringValue = "Recognition Result"
           label.isEditable = false

           self.window.contentView?.addSubview(label)

           fromMicButton = NSButton(frame: NSRect(x: 100, y: 300, width: 200, height: 30))
           fromMicButton.title = "Recognize"
           fromMicButton.target = self
           fromMicButton.action = #selector(fromMicButtonClicked)
           self.window.contentView?.addSubview(fromMicButton)
       }

       @objc func fromMicButtonClicked() {
           DispatchQueue.global(qos: .userInitiated).async {
               self.recognizeFromMic()
           }
       }

       func recognizeFromMic() {
           var speechConfig: SPXSpeechConfiguration?
           do {
               try speechConfig = SPXSpeechConfiguration(subscription: sub, region: region)
           } catch {
               print("error \(error) happened")
               speechConfig = nil
           }
           speechConfig?.speechRecognitionLanguage = "en-US"

           let audioConfig = SPXAudioConfiguration()

           let reco = try! SPXSpeechRecognizer(speechConfiguration: speechConfig!, audioConfiguration: audioConfig)

           reco.addRecognizingEventHandler() {reco, evt in
               print("intermediate recognition result: \(evt.result.text ?? "(no result)")")
               self.updateLabel(text: evt.result.text, color: .gray)
           }

           updateLabel(text: "Listening ...", color: .gray)
           print("Listening...")

           let result = try! reco.recognizeOnce()
           print("recognition result: \(result.text ?? "(no result)"), reason: \(result.reason.rawValue)")
           updateLabel(text: result.text, color: .black)

           if result.reason != SPXResultReason.recognizedSpeech {
               let cancellationDetails = try! SPXCancellationDetails(fromCanceledRecognitionResult: result)
               print("cancelled: \(result.reason), \(cancellationDetails.errorDetails)")
               print("Did you set the speech resource key and region values?")
               updateLabel(text: "Error: \(cancellationDetails.errorDetails)", color: .red)
           }
       }

       func updateLabel(text: String?, color: NSColor) {
           DispatchQueue.main.async {
               self.label.stringValue = text!
               self.label.textColor = color
           }
       }
   }
   ```

1. In *AppDelegate.m*, use the [environment variables that you previously set](#set-environment-variables) for your Speech resource key and region.

   ```swift
   sub = ProcessInfo.processInfo.environment["SPEECH_KEY"]
   region = ProcessInfo.processInfo.environment["SPEECH_REGION"]
   ```

1. To change the speech recognition language, replace `en-US` with another [supported language](../../../language-support.md). For example, use `es-ES` for Spanish (Spain). If you don't specify a language, the default is `en-US`. For details about how to identify one of multiple languages that might be spoken, see [Language identification](../../../language-identification.md).
1. To make the debug output visible, select **View** > **Debug Area** > **Activate Console**.
1. Build and run the example code by selecting **Product** > **Run** from the menu or selecting the **Play** button.

   > **Important:**
   > Make sure that you set the `SPEECH_KEY` and `SPEECH_REGION` [environment variables](#set-environment-variables). If you don't set these variables, the sample fails with an error message.

After you select the button in the app and say a few words, you should see the text that you spoke on the lower part of the screen. When you run the app for the first time, it prompts you to give the app access to your computer's microphone.

## Remarks

This example uses the `recognizeOnce` operation to transcribe utterances of up to 30 seconds, or until silence is detected. For information about continuous recognition for longer audio, including multi-lingual conversations, see [How to recognize speech](../../../how-to-recognize-speech.md).

## Objective-C

The Speech SDK for Objective-C shares client libraries and reference documentation with the Speech SDK for Swift. For Objective-C code examples, see the [recognize speech from a microphone in Objective-C on macOS](https://github.com/Azure-Samples/cognitive-services-speech-sdk/tree/master/quickstart/objectivec/macos/from-microphone) sample project in GitHub.

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.
