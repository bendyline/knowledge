---
author: PatrickFarley
ms.service: azure-speech-foundry-tools
ms.topic: include
ms.date: 1/29/2026
ms.author: pafarley
ai-usage: ai-assisted
---


[Reference documentation](https://learn.microsoft.com/java/api/com.microsoft.cognitiveservices.speech) | [Additional samples on GitHub](https://aka.ms/speech/github-java)



With Azure Speech in Foundry Tools, you can run an application that synthesizes a human-like voice to read text. You can change the voice, enter text to be spoken, and listen to the output on your computer's speaker.

> **Tip:**
> You can try text to speech in the [Speech Studio Voice Gallery](https://aka.ms/speechstudio/voicegallery) without signing up or writing any code.

> **Tip:**
> Try out the [Azure Speech Toolkit](https://marketplace.visualstudio.com/items?itemName=ms-azureaispeech.azure-ai-speech-toolkit) to easily build and run samples on Visual Studio Code.


## Prerequisites


> 
> - An Azure subscription. You can [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
> - [Create an AI Services resource for Speech](https://portal.azure.com/#create/Microsoft.CognitiveServicesAIFoundry) in the Azure portal.
> - Get the Speech resource key and endpoint. After your Speech resource is deployed, select **Go to resource** to view and manage keys.


## Set up the environment

To set up your environment, [install the Speech SDK](../../../quickstarts/setup-platform.md?pivots=programming-language-java\&tabs=jre). The sample in this quickstart works with the Java Runtime.

1. Install [Apache Maven](https://maven.apache.org/install.html). Then run `mvn -v` to confirm successful installation.
1. Create a *pom.xml* file in the root of your project, and copy the following code into it:

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

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/ai-services/security/microsoft-entra-id-akv-expanded.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/quickstarts/text-to-speech-basics/java.md)

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


## Create the application

Follow these steps to create a console application for speech recognition.

1. Create a file named *SpeechSynthesis.java* in the same project root directory.
1. Copy the following code into *SpeechSynthesis.java*:

   ```java
   import com.microsoft.cognitiveservices.speech.*;
   import com.microsoft.cognitiveservices.speech.audio.*;

   import java.net.URI;
   import java.net.URISyntaxException;
   import java.util.Scanner;
   import java.util.concurrent.ExecutionException;
    
   public class SpeechSynthesis {
       // This example requires environment variables named "SPEECH_KEY" and "ENDPOINT"
       private static String speechKey = System.getenv("SPEECH_KEY");
       private static String endpoint = System.getenv("ENDPOINT");
    
       public static void main(String[] args) throws InterruptedException, ExecutionException, URISyntaxException {
           SpeechConfig speechConfig = SpeechConfig.fromEndpoint(new URI(endpoint), speechKey);
           
           speechConfig.setSpeechSynthesisVoiceName("en-US-Ava:DragonHDLatestNeural"); 
    
           SpeechSynthesizer speechSynthesizer = new SpeechSynthesizer(speechConfig);
    
           // Get text from the console and synthesize to the default speaker.
           System.out.println("Enter some text that you want to speak >");
           String text = new Scanner(System.in).nextLine();
           if (text.isEmpty())
           {
               return;
           }
    
           SpeechSynthesisResult speechSynthesisResult = speechSynthesizer.SpeakTextAsync(text).get();
    
           if (speechSynthesisResult.getReason() == ResultReason.SynthesizingAudioCompleted) {
               System.out.println("Speech synthesized to speaker for text [" + text + "]");
           }
           else if (speechSynthesisResult.getReason() == ResultReason.Canceled) {
               SpeechSynthesisCancellationDetails cancellation = SpeechSynthesisCancellationDetails.fromResult(speechSynthesisResult);
               System.out.println("CANCELED: Reason=" + cancellation.getReason());
    
               if (cancellation.getReason() == CancellationReason.Error) {
                   System.out.println("CANCELED: ErrorCode=" + cancellation.getErrorCode());
                   System.out.println("CANCELED: ErrorDetails=" + cancellation.getErrorDetails());
                   System.out.println("CANCELED: Did you set the speech resource key and endpoint values?");
               }
           }
    
           System.exit(0);
       }
   }
   ```

1. To change the speech synthesis language, replace `en-US-Ava:DragonHDLatestNeural` with another [supported voice](../../../language-support.md#standard-voices).

   All neural voices are multilingual and fluent in their own language and English. For example, if the input text in English is *I'm excited to try text to speech* and you set `es-ES-Ximena:DragonHDLatestNeural`, the text is spoken in English with a Spanish accent. If the voice doesn't speak the language of the input text, the Speech service doesn't output synthesized audio.

1. Run your console application to output speech synthesis to the default speaker.

   ```console
   javac SpeechSynthesis.java -cp ".;target\dependency\*"
   java -cp ".;target\dependency\*" SpeechSynthesis
   ```

   > **Important:**
   > Make sure that you set the `SPEECH_KEY` and `ENDPOINT` [environment variables](#set-environment-variables). If you don't set these variables, the sample fails with an error message.

1. Enter some text that you want to speak. For example, type *I'm excited to try text to speech*. Select the **Enter** key to hear the synthesized speech.

   ```console
   Enter some text that you want to speak >
   I'm excited to try text to speech
   ```

## Remarks

### More speech synthesis options

This quickstart uses the `SpeakTextAsync` operation to synthesize a short block of text that you enter. You can also use long-form text from a file and get finer control over voice styles, prosody, and other settings.

- See [how to synthesize speech](../../../how-to-speech-synthesis.md) and [Speech Synthesis Markup Language (SSML) overview](../../../speech-synthesis-markup.md) for information about speech synthesis from a file and finer control over voice styles, prosody, and other settings.
- See [batch synthesis API for text to speech](../../../batch-synthesis.md) for information about synthesizing long-form text to speech.

### OpenAI text to speech voices in Azure Speech in Foundry Tools

OpenAI text to speech voices are also supported. See [OpenAI text to speech voices in Azure Speech](../../../openai-voices.md) and [multilingual voices](../../../language-support.md?tabs=tts#multilingual-voices). You can replace `en-US-Ava:DragonHDLatestNeural` with a supported OpenAI voice name such as `en-US-FableMultilingualNeural`.

## Clean up resources


You can use the [Azure portal](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azportal#clean-up-resources) or [Azure Command Line Interface (CLI)](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/speech-service/includes/common/~/articles/ai-services/multi-service-resource.md?pivots=azcli#clean-up-resources) to remove the Speech resource you created.
