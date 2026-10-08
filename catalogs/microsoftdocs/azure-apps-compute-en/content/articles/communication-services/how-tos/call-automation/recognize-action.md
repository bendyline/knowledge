---
title: Gather user input
titleSuffix: An Azure Communication Services how-to document
description: Provides a how-to guide for gathering user input from participants on a call.
author: kunaal
ms.service: azure-communication-services
ms.topic: how-to
ms.date: 09/16/2022
ms.author: kpunjabi
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
services: azure-communication-services
zone_pivot_groups: acs-js-csharp-java-python
---

# Gather user input with Recognize action


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This guide helps you get started recognizing DTMF input provided by participants through Azure Communication Services Call Automation SDK. 

**Applies to: programming-language-csharp**


## Prerequisites
- Azure account with an active subscription, for details see [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp). Note the connection string for this resource. 
- Create a new web service application using the [Call Automation SDK](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md).
- The latest [.NET library](https://dotnet.microsoft.com/download/dotnet-core) for your operating system.
- The latest [NuGet package](https://www.nuget.org/packages/Azure.Communication.CallAutomation/).

### For AI features 
- Create and connect [Foundry Tools to your Azure Communication Services resource](../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md).
- Create a [custom subdomain](https://learn.microsoft.com/azure/ai-services/cognitive-services-custom-subdomains) for your Azure AI services resource. 


## Technical specifications

The following parameters are available to customize the Recognize function:

| Parameter | Type | Default (if not specified) | Description | Required or Optional |
| --- | --- | --- | --- | --- |
| `Prompt` <br/><br/> *(For details, see [Customize voice prompts to users with Play action](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/how-tos/call-automation/play-ai-action.md))* | FileSource, TextSource | Not set | The message to play before recognizing input. | Optional |
| `InterToneTimeout` | TimeSpan | 2 seconds <br/><br/>**Min:** 1 second <br/>**Max:** 60 seconds | Limit in seconds that Azure Communication Services waits for the caller to press another digit (inter-digit timeout). | Optional |
| `InitialSegmentationSilenceTimeoutInSeconds` | Integer | 0.5 second | How long recognize action waits for input before considering it a timeout. See [How to recognize speech](https://learn.microsoft.com/azure/ai-services/speech-service/how-to-recognize-speech). | Optional |
| `RecognizeInputsType` | Enum | dtmf | Type of input that is recognized. Options are `dtmf`, `choices`, `speech`, and `speechordtmf`. | Required |
| `InitialSilenceTimeout` | TimeSpan | 5 seconds<br/><br/>**Min:** 0 seconds <br/>**Max:** 300 seconds (DTMF) <br/>**Max:** 20 seconds (Choices) <br/>**Max:** 20 seconds (Speech) | Initial silence timeout adjusts how much nonspeech audio is allowed before a phrase before the recognition attempt ends in a "no match" result. See [How to recognize speech](https://learn.microsoft.com/azure/ai-services/speech-service/how-to-recognize-speech). | Optional |
| `MaxTonesToCollect` | Integer | No default<br/><br/>**Min:** 1 | Number of digits a developer expects as input from the participant. | Required |
| `StopTones` | IEnumeration\<DtmfTone\> | Not set | The digit participants can press to escape out of a batch DTMF event. | Optional |
| `InterruptPrompt` | Bool | True | If the participant has the ability to interrupt the playMessage by pressing a digit. | Optional |
| `InterruptCallMediaOperation` | Bool | True | If this flag is set, it interrupts the current call media operation. For example if any audio is being played it interrupts that operation and initiates recognize. | Optional |
| `OperationContext` | String | Not set | String that developers can pass mid action, useful for allowing developers to store context about the events they receive. | Optional |
| `Phrases` | String | Not set | List of phrases that associate to the label. Hearing any of these phrases results in a successful recognition. | Required |
| `Tone` | String | Not set | The tone to recognize if user decides to press a number instead of using speech. | Optional |
| `Label` | String | Not set | The key value for recognition. | Required |
| `Language` | String | En-us | The language that is used for recognizing speech. | Optional |
| `EndSilenceTimeout` | TimeSpan | 0.5 second | The final pause of the speaker used to detect the final result that gets generated as speech. | Optional |

>**Note:** 
>In situations where both DTMF and speech are in the `recognizeInputsType`, the recognize action acts on the first input type received. For example, if the user presses a keypad number first then the recognize action considers it a DTMF event and continues listening for DTMF tones. If the user speaks first then the recognize action considers it a speech recognition event and listens for voice input.  


## Create a new C# application

In the console window of your operating system, use the `dotnet` command to create a new web application.

```console
dotnet new web -n MyApplication
```

## Install the NuGet package

Get the NuGet package from [NuGet Gallery | Azure.Communication.CallAutomation](https://www.nuget.org/packages/Azure.Communication.CallAutomation/). Follow the instructions to install the package.

## Establish a call

By this point you should be familiar with starting calls. For more information about making a call, see [Quickstart: Make and outbound call](../../quickstarts/call-automation/quickstart-make-an-outbound-call.md). You can also use the code snippet provided here to understand how to answer a call.

``` csharp
var callAutomationClient = new CallAutomationClient("<Azure Communication Services connection string>");

var answerCallOptions = new AnswerCallOptions("<Incoming call context once call is connected>", new Uri("<https://sample-callback-uri>"))  
{  
    CallIntelligenceOptions = new CallIntelligenceOptions() { CognitiveServicesEndpoint = new Uri("<Azure Cognitive Services Endpoint>") } 
};  

var answerCallResult = await callAutomationClient.AnswerCallAsync(answerCallOptions); 
```

## Call the recognize action

When your application answers the call, you can provide information about recognizing participant input and playing a prompt.

### DTMF
``` csharp
var maxTonesToCollect = 3;
String textToPlay = "Welcome to Contoso, please enter 3 DTMF.";
var playSource = new TextSource(textToPlay, "en-US-ElizabethNeural");
var recognizeOptions = new CallMediaRecognizeDtmfOptions(targetParticipant, maxTonesToCollect) {
  InitialSilenceTimeout = TimeSpan.FromSeconds(30),
    Prompt = playSource,
    InterToneTimeout = TimeSpan.FromSeconds(5),
    InterruptPrompt = true,
    StopTones = new DtmfTone[] {
      DtmfTone.Pound
    },
};
var recognizeResult = await callAutomationClient.GetCallConnection(callConnectionId)
  .GetCallMedia()
  .StartRecognizingAsync(recognizeOptions);
```

For speech-to-text flows, the Call Automation Recognize action also supports the use of [custom speech models](https://learn.microsoft.com/azure/machine-learning/tutorial-train-model). Features like custom speech models can be useful when you're building an application that needs to listen for complex words that the default speech-to-text models may not understand. One example is when you're building an application for the telemedical industry and your virtual agent needs to be able to recognize medical terms. You can learn more in [Create a custom speech project](https://learn.microsoft.com/azure/ai-services/speech-service/speech-services-quotas-and-limits).

### Speech-to-Text Choices 
``` csharp
var choices = new List < RecognitionChoice > {
  new RecognitionChoice("Confirm", new List < string > {
    "Confirm",
    "First",
    "One"
  }) {
    Tone = DtmfTone.One
  },
  new RecognitionChoice("Cancel", new List < string > {
    "Cancel",
    "Second",
    "Two"
  }) {
    Tone = DtmfTone.Two
  }
};
String textToPlay = "Hello, This is a reminder for your appointment at 2 PM, Say Confirm to confirm your appointment or Cancel to cancel the appointment. Thank you!";

var playSource = new TextSource(textToPlay, "en-US-ElizabethNeural");
var recognizeOptions = new CallMediaRecognizeChoiceOptions(targetParticipant, choices) {
  InterruptPrompt = true,
    InitialSilenceTimeout = TimeSpan.FromSeconds(30),
    Prompt = playSource,
    OperationContext = "AppointmentReminderMenu",
    SpeechLanguages = new List<string> { "en-US", "hi-IN", "fr-FR" },
    //Only add the SpeechModelEndpointId if you have a custom speech model you would like to use
    SpeechModelEndpointId = "YourCustomSpeechModelEndpointId"
};
var recognizeResult = await callAutomationClient.GetCallConnection(callConnectionId)
  .GetCallMedia()
  .StartRecognizingAsync(recognizeOptions);
```

### Speech-to-Text

``` csharp
String textToPlay = "Hi, how can I help you today?";
var playSource = new TextSource(textToPlay, "en-US-ElizabethNeural");
var recognizeOptions = new CallMediaRecognizeSpeechOptions(targetParticipant) {
  Prompt = playSource,
    EndSilenceTimeout = TimeSpan.FromMilliseconds(1000),
    OperationContext = "OpenQuestionSpeech",
    //Only add the SpeechModelEndpointId if you have a custom speech model you would like to use
    SpeechModelEndpointId = "YourCustomSpeechModelEndpointId"
};
var recognizeResult = await callAutomationClient.GetCallConnection(callConnectionId)
  .GetCallMedia()
  .StartRecognizingAsync(recognizeOptions);
```

### Speech-to-Text or DTMF 

``` csharp
var maxTonesToCollect = 1; 
String textToPlay = "Hi, how can I help you today, you can press 0 to speak to an agent?"; 
var playSource = new TextSource(textToPlay, "en-US-ElizabethNeural"); 
var recognizeOptions = new CallMediaRecognizeSpeechOrDtmfOptions(targetParticipant, maxTonesToCollect) 
{ 
    Prompt = playSource, 
    EndSilenceTimeout = TimeSpan.FromMilliseconds(1000), 
    InitialSilenceTimeout = TimeSpan.FromSeconds(30), 
    InterruptPrompt = true, 
    OperationContext = "OpenQuestionSpeechOrDtmf",
    SpeechLanguages = new List<string> { "en-US", "hi-IN", "fr-FR" },
    //Only add the SpeechModelEndpointId if you have a custom speech model you would like to use
    SpeechModelEndpointId = "YourCustomSpeechModelEndpointId" 
}; 
var recognizeResult = await callAutomationClient.GetCallConnection(callConnectionId) 
    .GetCallMedia() 
    .StartRecognizingAsync(recognizeOptions); 
```
> **Note:**
> If parameters aren't set, the defaults are applied where possible.

### Real-time language identification (Preview)

With the additional of real-time language identification, developers can automatically detect spoken languages to enable natural, human-like communications and eliminate manual language selection by the end users. 

``` csharp
string textToPlay = "Hi, how can I help you today?";
var playSource = new TextSource(textToPlay, "en-US-ElizabethNeural");
var recognizeOptions = new CallMediaRecognizeSpeechOptions(targetParticipant: new PhoneNumberIdentifier(targetParticipant))
{
    Prompt = playSource,
    InterruptCallMediaOperation = false,
    InterruptPrompt = false,
    InitialSilenceTimeout = TimeSpan.FromSeconds(10),
    OperationContext = "OpenQuestionSpeech",
    // Enable Language Identification
    SpeechLanguages = new List<string> { "en-US", "hi-IN", "fr-FR" },
    // Only add the SpeechModelEndpointId if you have a custom speech model you would like to use
    SpeechModelEndpointId = "YourCustomSpeechModelEndpointId"
};
var recognizeResult = await callAutomationClient.GetCallConnection(callConnectionId)
    .GetCallMedia()
    .StartRecognizingAsync(recognizeOptions);
```

>**Note:**
> **Language support limits**
>
> When using the `Recognize` API with Speech as the input type:
> - You can specify **up to 10 languages** using `setSpeechLanguages(...)`.
> - Be aware that using more languages may **increase the time** it takes to receive the `RecognizeCompleted` event due to additional processing.
>
> When using the `Recognize` API with **choices**:
> - Only **up to 4 languages** are supported.
> - Specifying more than 4 languages in choices mode may result in errors or degraded performance.

### Sentiment Analysis (Preview)
The Recognize API supports sentiment analysis when using speech input. Track the emotional tone of conversations in real time to support customer and agent interactions, and enable supervisors to intervene when necessary. It can also be useful for routing, personalization or analytics. 

``` csharp
string textToPlay = "Hi, how can I help you today?";
var playSource = new TextSource(textToPlay, "en-US-ElizabethNeural");
var recognizeOptions = new CallMediaRecognizeSpeechOptions(targetParticipant: new PhoneNumberIdentifier(targetParticipant))
{
    Prompt = playSource,
    InterruptCallMediaOperation = false,
    InterruptPrompt = false,
    InitialSilenceTimeout = TimeSpan.FromSeconds(10),
    OperationContext = "OpenQuestionSpeech",
    // Enable Sentiment Analysis
    IsSentimentAnalysisEnabled = true
};
var recognizeResult = await callAutomationClient.GetCallConnection(callConnectionId)
    .GetCallMedia()
    .StartRecognizingAsync(recognizeOptions);
```


## Receiving recognize event updates

Developers can subscribe to `RecognizeCompleted` and `RecognizeFailed` events on the registered webhook callback. Use this callback with business logic in your application to determine next steps when one of the events occurs. 

### Example of how you can deserialize the *RecognizeCompleted* event:
``` csharp
if (parsedEvent is RecognizeCompleted recognizeCompleted)
{
    logger.LogInformation($"Received call event: {recognizeCompleted.GetType()}");

    callConnectionId = recognizeCompleted.CallConnectionId;

    switch (recognizeCompleted.RecognizeResult)
    {
        case DtmfResult dtmfResult:
            var tones = dtmfResult.Tones;
            logger.LogInformation("Recognize completed successfully, tones={tones}", tones);
            break;

        case ChoiceResult choiceResult:
            var labelDetected = choiceResult.Label;
            var phraseDetected = choiceResult.RecognizedPhrase;
            var sentimentAnalysis = choiceResult.SentimentAnalysisResult;

            logger.LogInformation("Recognize completed successfully, labelDetected={labelDetected}, phraseDetected={phraseDetected}", labelDetected, phraseDetected);
            logger.LogInformation("Language Identified: {language}", choiceResult.LanguageIdentified);

            if (sentimentAnalysis != null)
            {
                logger.LogInformation("Sentiment: {sentiment}", sentimentAnalysis.Sentiment);
            }
            break;

        case SpeechResult speechResult:
            var text = speechResult.Speech;
            var speechSentiment = speechResult.SentimentAnalysisResult;

            logger.LogInformation("Recognize completed successfully, text={text}", text);
            logger.LogInformation("Language Identified: {language}", speechResult.LanguageIdentified);

            if (speechSentiment != null)
            {
                logger.LogInformation("Sentiment: {sentiment}", speechSentiment.Sentiment);
            }
            break;

        default:
            logger.LogInformation("Recognize completed successfully, recognizeResult={recognizeResult}", recognizeCompleted.RecognizeResult);
            break;
    }
}
```

### Example of how you can deserialize the *RecognizeFailed* event:

``` csharp
if (acsEvent is RecognizeFailed recognizeFailed) 
{ 
    if (MediaEventReasonCode.RecognizeInitialSilenceTimedOut.Equals(recognizeFailed.ReasonCode)) 
    { 
        // Take action for time out 
        logger.LogInformation("Recognition failed: initial silence time out"); 
    } 
    else if (MediaEventReasonCode.RecognizeSpeechOptionNotMatched.Equals(recognizeFailed.ReasonCode)) 
    { 
        // Take action for option not matched 
        logger.LogInformation("Recognition failed: speech option not matched"); 
    } 
    else if (MediaEventReasonCode.RecognizeIncorrectToneDetected.Equals(recognizeFailed.ReasonCode)) 
    { 
        // Take action for incorrect tone 
        logger.LogInformation("Recognition failed: incorrect tone detected"); 
    } 
    else 
    { 
        logger.LogInformation("Recognition failed, result={result}, context={context}", recognizeFailed.ResultInformation?.Message, recognizeFailed.OperationContext); 
    } 
} 
```

### Example of how you can deserialize the *RecognizeCanceled* event:
``` csharp
if (acsEvent is RecognizeCanceled { OperationContext: "AppointmentReminderMenu" })
        {
            logger.LogInformation($"RecognizeCanceled event received for call connection id: {@event.CallConnectionId}");
            //Take action on recognize canceled operation
           await callConnection.HangUpAsync(forEveryone: true);
        }
```



**Applies to: programming-language-java**


## Prerequisites
- Azure account with an active subscription, for details see [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp)
- Create a new web service application using the [Call Automation SDK](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md).
- [Java Development Kit](https://learn.microsoft.com/java/azure/jdk/?preserve-view=true\&view=azure-java-stable) version 8 or above.
- [Apache Maven](https://maven.apache.org/download.cgi).

### For AI features
- Create and connect [Foundry Tools to your Azure Communication Services resource](../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md).
- Create a [custom subdomain](https://learn.microsoft.com/azure/ai-services/cognitive-services-custom-subdomains) for your Azure AI services resource.


## Technical specifications

The following parameters are available to customize the Recognize function:

| Parameter | Type | Default (if not specified) | Description | Required or Optional |
| --- | --- | --- | --- | --- |
| `Prompt` <br/><br/> *(For details, see [Customize voice prompts to users with Play action](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/how-tos/call-automation/play-ai-action.md))* | FileSource, TextSource | Not set | The message to play before recognizing input. | Optional |
| `InterToneTimeout` | TimeSpan | 2 seconds <br/><br/>**Min:** 1 second <br/>**Max:** 60 seconds | Limit in seconds that Azure Communication Services waits for the caller to press another digit (inter-digit timeout). | Optional |
| `InitialSegmentationSilenceTimeoutInSeconds` | Integer | 0.5 second | How long recognize action waits for input before considering it a timeout. See [How to recognize speech](https://learn.microsoft.com/azure/ai-services/speech-service/how-to-recognize-speech). | Optional |
| `RecognizeInputsType` | Enum | dtmf | Type of input that is recognized. Options are `dtmf`, `choices`, `speech`, and `speechordtmf`. | Required |
| `InitialSilenceTimeout` | TimeSpan | 5 seconds<br/><br/>**Min:** 0 seconds <br/>**Max:** 300 seconds (DTMF) <br/>**Max:** 20 seconds (Choices) <br/>**Max:** 20 seconds (Speech) | Initial silence timeout adjusts how much nonspeech audio is allowed before a phrase before the recognition attempt ends in a "no match" result. See [How to recognize speech](https://learn.microsoft.com/azure/ai-services/speech-service/how-to-recognize-speech). | Optional |
| `MaxTonesToCollect` | Integer | No default<br/><br/>**Min:** 1 | Number of digits a developer expects as input from the participant. | Required |
| `StopTones` | IEnumeration\<DtmfTone\> | Not set | The digit participants can press to escape out of a batch DTMF event. | Optional |
| `InterruptPrompt` | Bool | True | If the participant has the ability to interrupt the playMessage by pressing a digit. | Optional |
| `InterruptCallMediaOperation` | Bool | True | If this flag is set, it interrupts the current call media operation. For example if any audio is being played it interrupts that operation and initiates recognize. | Optional |
| `OperationContext` | String | Not set | String that developers can pass mid action, useful for allowing developers to store context about the events they receive. | Optional |
| `Phrases` | String | Not set | List of phrases that associate to the label. Hearing any of these phrases results in a successful recognition. | Required |
| `Tone` | String | Not set | The tone to recognize if user decides to press a number instead of using speech. | Optional |
| `Label` | String | Not set | The key value for recognition. | Required |
| `Language` | String | En-us | The language that is used for recognizing speech. | Optional |
| `EndSilenceTimeout` | TimeSpan | 0.5 second | The final pause of the speaker used to detect the final result that gets generated as speech. | Optional |

>**Note:** 
>In situations where both DTMF and speech are in the `recognizeInputsType`, the recognize action acts on the first input type received. For example, if the user presses a keypad number first then the recognize action considers it a DTMF event and continues listening for DTMF tones. If the user speaks first then the recognize action considers it a speech recognition event and listens for voice input.  

## Create a new Java application

In your terminal or command window, navigate to the directory where you would like to create your Java application. Run the `mvn` command to generate the Java project from the maven-archetype-quickstart template. 

```console
mvn archetype:generate -DgroupId=com.communication.quickstart -DartifactId=communication-quickstart -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
```

The `mvn` command creates a directory with the same name as the `artifactId` argument. The `src/main/java` directory contains the project source code. The `src/test/java` directory contains the test source. 

Notice that the `generate` step created a directory with the same name as the `artifactId`. The `src/main/java` directory contains source code. The `src/test/java` directory contains tests. The `pom.xml` file is the project's Project Object Model (POM).

Update your applications POM file to use Java 8 or higher.

```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
</properties>
```

## Add package references

In your POM file, add the following reference for the project:

**azure-communication-callautomation**

``` xml
<dependency>
  <groupId>com.azure</groupId>
  <artifactId>azure-communication-callautomation</artifactId>
  <version>1.0.0</version>
</dependency>
```

## Establish a call

By this point you should be familiar with starting calls. For more information about making a call, see [Quickstart: Make and outbound call](../../quickstarts/call-automation/quickstart-make-an-outbound-call.md). You can also use the code snippet provided here to understand how to answer a call.

``` java
CallIntelligenceOptions callIntelligenceOptions = new CallIntelligenceOptions().setCognitiveServicesEndpoint("https://sample-cognitive-service-resource.cognitiveservices.azure.com/"); 
answerCallOptions = new AnswerCallOptions("<Incoming call context>", "<https://sample-callback-uri>").setCallIntelligenceOptions(callIntelligenceOptions); 
Response < AnswerCallResult > answerCallResult = callAutomationClient
  .answerCallWithResponse(answerCallOptions)
  .block();
```

## Call the recognize action

When your application answers the call, you can provide information about recognizing participant input and playing a prompt.

### DTMF
``` java
var maxTonesToCollect = 3;
String textToPlay = "Welcome to Contoso, please enter 3 DTMF.";
var playSource = new TextSource() 
    .setText(textToPlay) 
    .setVoiceName("en-US-ElizabethNeural");

var recognizeOptions = new CallMediaRecognizeDtmfOptions(targetParticipant, maxTonesToCollect) 
    .setInitialSilenceTimeout(Duration.ofSeconds(30)) 
    .setPlayPrompt(playSource) 
    .setInterToneTimeout(Duration.ofSeconds(5)) 
    .setInterruptPrompt(true) 
    .setStopTones(Arrays.asList(DtmfTone.POUND));

var recognizeResponse = callAutomationClient.getCallConnectionAsync(callConnectionId) 
    .getCallMediaAsync() 
    .startRecognizingWithResponse(recognizeOptions) 
    .block(); 

log.info("Start recognizing result: " + recognizeResponse.getStatusCode()); 
```

For speech-to-text flows, the Call Automation Recognize action also supports the use of [custom speech models](https://learn.microsoft.com/azure/machine-learning/tutorial-train-model). Features like custom speech models can be useful when you're building an application that needs to listen for complex words that the default speech-to-text models may not understand. One example is when you're building an application for the telemedical industry and your virtual agent needs to be able to recognize medical terms. You can learn more in [Create a custom speech project](https://learn.microsoft.com/azure/ai-services/speech-service/speech-services-quotas-and-limits).

### Speech-to-Text Choices 
``` java
var choices = Arrays.asList(
  new RecognitionChoice()
  .setLabel("Confirm")
  .setPhrases(Arrays.asList("Confirm", "First", "One"))
  .setTone(DtmfTone.ONE),
  new RecognitionChoice()
  .setLabel("Cancel")
  .setPhrases(Arrays.asList("Cancel", "Second", "Two"))
  .setTone(DtmfTone.TWO)
);

String textToPlay = "Hello, This is a reminder for your appointment at 2 PM, Say Confirm to confirm your appointment or Cancel to cancel the appointment. Thank you!";
var playSource = new TextSource()
  .setText(textToPlay)
  .setVoiceName("en-US-ElizabethNeural");
var recognizeOptions = new CallMediaRecognizeChoiceOptions(targetParticipant, choices)
  .setInterruptPrompt(true)
  .setInitialSilenceTimeout(Duration.ofSeconds(30))
  .setPlayPrompt(playSource)
  .setSpeechLanguages("en-US", "es-ES", "hi-IN")
  .setSentimentAnalysisEnabled(true)
  .setOperationContext("AppointmentReminderMenu")
  //Only add the SpeechRecognitionModelEndpointId if you have a custom speech model you would like to use
  .setSpeechRecognitionModelEndpointId("YourCustomSpeechModelEndpointID"); 
var recognizeResponse = callAutomationClient.getCallConnectionAsync(callConnectionId)
  .getCallMediaAsync()
  .startRecognizingWithResponse(recognizeOptions)
  .block();
```

### Speech-to-Text 

``` java
String textToPlay = "Hi, how can I help you today?"; 
var playSource = new TextSource() 
    .setText(textToPlay) 
    .setVoiceName("en-US-ElizabethNeural"); 
var recognizeOptions = new CallMediaRecognizeSpeechOptions(targetParticipant, Duration.ofMillis(1000)) 
    .setPlayPrompt(playSource) 
    .setOperationContext("OpenQuestionSpeech")
    //Only add the SpeechRecognitionModelEndpointId if you have a custom speech model you would like to use
    .setSpeechRecognitionModelEndpointId("YourCustomSpeechModelEndpointID");  
var recognizeResponse = callAutomationClient.getCallConnectionAsync(callConnectionId) 
    .getCallMediaAsync() 
    .startRecognizingWithResponse(recognizeOptions) 
    .block(); 
```

### Speech-to-Text or DTMF 

``` java
var maxTonesToCollect = 1; 
String textToPlay = "Hi, how can I help you today, you can press 0 to speak to an agent?"; 
var playSource = new TextSource() 
    .setText(textToPlay) 
    .setVoiceName("en-US-ElizabethNeural"); 
var recognizeOptions = new CallMediaRecognizeSpeechOrDtmfOptions(targetParticipant, maxTonesToCollect, Duration.ofMillis(1000)) 
    .setPlayPrompt(playSource) 
    .setInitialSilenceTimeout(Duration.ofSeconds(30)) 
    .setInterruptPrompt(true) 
    .setOperationContext("OpenQuestionSpeechOrDtmf")
    //Only add the SpeechRecognitionModelEndpointId if you have a custom speech model you would like to use
    .setSpeechRecognitionModelEndpointId("YourCustomSpeechModelEndpointID");  
var recognizeResponse = callAutomationClient.getCallConnectionAsync(callConnectionId) 
    .getCallMediaAsync() 
    .startRecognizingWithResponse(recognizeOptions) 
    .block(); 
```
> **Note:**
> If parameters aren't set, the defaults are applied where possible.


### Real-time language identification (Preview)

With the additional of real-time language identification, developers can automatically detect spoken languages to enable natural, human-like communications and eliminate manual language selection by the end users. 

``` java
String textToPlay = "Hi, how can I help you today?";
var playSource = new TextSource()
    .setText(textToPlay)
    .setVoiceName("en-US-ElizabethNeural");

var recognizeOptions = new CallMediaRecognizeSpeechOptions(participant, Duration.ofSeconds(15))
    .setPlayPrompt(playSource)
    .setInterruptPrompt(false)
    .setInitialSilenceTimeout(Duration.ofSeconds(15))
    .setSentimentAnalysisEnabled(true)
    .setSpeechLanguages("en-US", "es-ES", "hi-IN")
    .setOperationContext("OpenQuestionSpeech")
    // Only add the SpeechRecognitionModelEndpointId if you have a custom speech model you would like to use
    .setSpeechRecognitionModelEndpointId("YourCustomSpeechModelEndpointID");

var recognizeResponse = callAutomationClient.getCallConnectionAsync(callConnectionId)
    .getCallMediaAsync()
    .startRecognizingWithResponse(recognizeOptions)
    .block();
```

>**Note:**
> **Language support limits**
>
> When using the `Recognize` API with Speech as the input type:
> - You can specify **up to 10 languages** using `setSpeechLanguages(...)`.
> - Be aware that using more languages may **increase the time** it takes to receive the `RecognizeCompleted` event due to additional processing.
>
> When using the `Recognize` API with **choices**:
> - Only **up to 4 languages** are supported.
> - Specifying more than 4 languages in choices mode may result in errors or degraded performance.

### Sentiment Analysis (Preview)
The Recognize API supports sentiment analysis when using speech input. Track the emotional tone of conversations in real time to support customer and agent interactions, and enable supervisors to intervene when necessary. It can also be useful for routing, personalization or analytics. 

``` java
String textToPlay = "Hi, how can I help you today?";
var playSource = new TextSource()
    .setText(textToPlay)
    .setVoiceName("en-US-ElizabethNeural");

var recognizeOptions = new CallMediaRecognizeSpeechOptions(participant, Duration.ofSeconds(15))
    .setPlayPrompt(playSource)
    .setInterruptPrompt(false)
    .setInitialSilenceTimeout(Duration.ofSeconds(15))
    .setSentimentAnalysisEnabled(true)
    .setSpeechLanguages("en-US", "es-ES", "hi-IN")
    .setOperationContext("SpeechContext");

var recognizeResponse = callAutomationClient.getCallConnectionAsync(callConnectionId)
    .getCallMediaAsync()
    .startRecognizingWithResponse(recognizeOptions)
    .block();
```

## Receiving recognize event updates

Developers can subscribe to `RecognizeCompleted` and `RecognizeFailed` events on the registered webhook callback. Use this callback with business logic in your application to determine next steps when one of the events occurs. 


### Example of how you can deserialize the *RecognizeCompleted* event:
``` java
if (acsEvent instanceof RecognizeCompleted) { 
    RecognizeCompleted event = (RecognizeCompleted) acsEvent; 
    RecognizeResult recognizeResult = event.getRecognizeResult().get(); 
    if (recognizeResult instanceof DtmfResult) { 
        // Take action on collect tones 
        DtmfResult dtmfResult = (DtmfResult) recognizeResult; 
        List<DtmfTone> tones = dtmfResult.getTones(); 
        log.info("Recognition completed, tones=" + tones + ", context=" + event.getOperationContext()); 
    } else if (recognizeResult instanceof ChoiceResult) { 
        ChoiceResult collectChoiceResult = (ChoiceResult) recognizeResult; 
        String labelDetected = collectChoiceResult.getLabel(); 
        String phraseDetected = collectChoiceResult.getRecognizedPhrase();
        String languageIdentified = collectChoiceResult.getLanguageIdentified();
        log.info("Recognition completed, labelDetected=" + labelDetected + ", phraseDetected=" + phraseDetected + ", context=" + event.getOperationContext());
        log.info("Language Identified: " + languageIdentified);
        if (choiceResult.getSentimentAnalysisResult() != null) {
            log.info("Sentiment: " + choiceResult.getSentimentAnalysisResult().getSentiment());
        }
    } else if (recognizeResult instanceof SpeechResult) { 
        SpeechResult speechResult = (SpeechResult) recognizeResult; 
        String text = speechResult.getSpeech();
        String languageIdentified = speechResult.getLanguageIdentified();
        log.info("Recognition completed, text=" + text + ", context=" + event.getOperationContext());
        log.info("Language Identified: " + languageIdentified);
        if (speechResult.getSentimentAnalysisResult() != null) {
            log.info("Sentiment: " + speechResult.getSentimentAnalysisResult().getSentiment());
        }
    } else { 
        log.info("Recognition completed, result=" + recognizeResult + ", context=" + event.getOperationContext()); 
    } 
} 
```

### Example of how you can deserialize the *RecognizeFailed* event:
``` java
if (acsEvent instanceof RecognizeFailed) { 
    RecognizeFailed event = (RecognizeFailed) acsEvent; 
    if (ReasonCode.Recognize.INITIAL_SILENCE_TIMEOUT.equals(event.getReasonCode())) { 
        // Take action for time out 
        log.info("Recognition failed: initial silence time out"); 
    } else if (ReasonCode.Recognize.SPEECH_OPTION_NOT_MATCHED.equals(event.getReasonCode())) { 
        // Take action for option not matched 
        log.info("Recognition failed: speech option not matched"); 
    } else if (ReasonCode.Recognize.DMTF_OPTION_MATCHED.equals(event.getReasonCode())) { 
        // Take action for incorrect tone 
        log.info("Recognition failed: incorrect tone detected"); 
    } else { 
        log.info("Recognition failed, result=" + event.getResultInformation().getMessage() + ", context=" + event.getOperationContext()); 
    } 
} 
```

### Example of how you can deserialize the *RecognizeCanceled* event:
``` java
if (acsEvent instanceof RecognizeCanceled) { 
    RecognizeCanceled event = (RecognizeCanceled) acsEvent; 
    log.info("Recognition canceled, context=" + event.getOperationContext()); 
}
```



**Applies to: programming-language-javascript**


## Prerequisites
- Azure account with an active subscription, for details see [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp). Note the connection string for this resource. 
- Create a new web service application using the [Call Automation SDK](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md).
- Have Node.js installed, you can install it from their [official website](https://nodejs.org).

### For AI features 
- Create and connect [Foundry Tools to your Azure Communication Services resource](../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md).
- Create a [custom subdomain](https://learn.microsoft.com/azure/ai-services/cognitive-services-custom-subdomains) for your Azure AI services resource. 

## Technical specifications

The following parameters are available to customize the Recognize function:

| Parameter | Type | Default (if not specified) | Description | Required or Optional |
| --- | --- | --- | --- | --- |
| `Prompt` <br/><br/> *(For details, see [Customize voice prompts to users with Play action](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/how-tos/call-automation/play-ai-action.md))* | FileSource, TextSource | Not set | The message to play before recognizing input. | Optional |
| `InterToneTimeout` | TimeSpan | 2 seconds <br/><br/>**Min:** 1 second <br/>**Max:** 60 seconds | Limit in seconds that Azure Communication Services waits for the caller to press another digit (inter-digit timeout). | Optional |
| `InitialSegmentationSilenceTimeoutInSeconds` | Integer | 0.5 second | How long recognize action waits for input before considering it a timeout. See [How to recognize speech](https://learn.microsoft.com/azure/ai-services/speech-service/how-to-recognize-speech). | Optional |
| `RecognizeInputsType` | Enum | dtmf | Type of input that is recognized. Options are `dtmf`, `choices`, `speech`, and `speechordtmf`. | Required |
| `InitialSilenceTimeout` | TimeSpan | 5 seconds<br/><br/>**Min:** 0 seconds <br/>**Max:** 300 seconds (DTMF) <br/>**Max:** 20 seconds (Choices) <br/>**Max:** 20 seconds (Speech) | Initial silence timeout adjusts how much nonspeech audio is allowed before a phrase before the recognition attempt ends in a "no match" result. See [How to recognize speech](https://learn.microsoft.com/azure/ai-services/speech-service/how-to-recognize-speech). | Optional |
| `MaxTonesToCollect` | Integer | No default<br/><br/>**Min:** 1 | Number of digits a developer expects as input from the participant. | Required |
| `StopTones` | IEnumeration\<DtmfTone\> | Not set | The digit participants can press to escape out of a batch DTMF event. | Optional |
| `InterruptPrompt` | Bool | True | If the participant has the ability to interrupt the playMessage by pressing a digit. | Optional |
| `InterruptCallMediaOperation` | Bool | True | If this flag is set, it interrupts the current call media operation. For example if any audio is being played it interrupts that operation and initiates recognize. | Optional |
| `OperationContext` | String | Not set | String that developers can pass mid action, useful for allowing developers to store context about the events they receive. | Optional |
| `Phrases` | String | Not set | List of phrases that associate to the label. Hearing any of these phrases results in a successful recognition. | Required |
| `Tone` | String | Not set | The tone to recognize if user decides to press a number instead of using speech. | Optional |
| `Label` | String | Not set | The key value for recognition. | Required |
| `Language` | String | En-us | The language that is used for recognizing speech. | Optional |
| `EndSilenceTimeout` | TimeSpan | 0.5 second | The final pause of the speaker used to detect the final result that gets generated as speech. | Optional |

>**Note:** 
>In situations where both DTMF and speech are in the `recognizeInputsType`, the recognize action acts on the first input type received. For example, if the user presses a keypad number first then the recognize action considers it a DTMF event and continues listening for DTMF tones. If the user speaks first then the recognize action considers it a speech recognition event and listens for voice input.  

## Create a new JavaScript application

Create a new JavaScript application in your project directory. Initialize a new Node.js project with the following command. This creates a package.json file for your project, which manages your project's dependencies. 

``` console
npm init -y
```

### Install the Azure Communication Services Call Automation package

``` console
npm install @azure/communication-call-automation
```

Create a new JavaScript file in your project directory, for example, name it `app.js`. Write your JavaScript code in this file.

Run your application using Node.js with the following command. 

``` console
node app.js
```

## Establish a call

By this point you should be familiar with starting calls. For more information about making a call, see [Quickstart: Make and outbound call](../../quickstarts/call-automation/quickstart-make-an-outbound-call.md).

## Call the recognize action

When your application answers the call, you can provide information about recognizing participant input and playing a prompt.

### DTMF
``` javascript
const maxTonesToCollect = 3; 
const textToPlay = "Welcome to Contoso, please enter 3 DTMF."; 
const playSource: TextSource = { text: textToPlay, voiceName: "en-US-ElizabethNeural", kind: "textSource" }; 
const recognizeOptions: CallMediaRecognizeDtmfOptions = { 
    maxTonesToCollect: maxTonesToCollect, 
    initialSilenceTimeoutInSeconds: 30, 
    playPrompt: playSource, 
    interToneTimeoutInSeconds: 5, 
    interruptPrompt: true, 
    stopDtmfTones: [ DtmfTone.Pound ], 
    kind: "callMediaRecognizeDtmfOptions" 
}; 

await callAutomationClient.getCallConnection(callConnectionId) 
    .getCallMedia() 
    .startRecognizing(targetParticipant, recognizeOptions); 
```

For speech-to-text flows, the Call Automation Recognize action also supports the use of [custom speech models](https://learn.microsoft.com/azure/machine-learning/tutorial-train-model). Features like custom speech models can be useful when you're building an application that needs to listen for complex words that the default speech-to-text models may not understand. One example is when you're building an application for the telemedical industry and your virtual agent needs to be able to recognize medical terms. You can learn more in [Create a custom speech project](https://learn.microsoft.com/azure/ai-services/speech-service/speech-services-quotas-and-limits).

### Speech-to-Text Choices 
``` javascript
const choices = [ 
    {  
        label: "Confirm", 
        phrases: [ "Confirm", "First", "One" ], 
        tone: DtmfTone.One 
    }, 
    { 
        label: "Cancel", 
        phrases: [ "Cancel", "Second", "Two" ], 
        tone: DtmfTone.Two 
    } 
]; 

const textToPlay = "Hello, This is a reminder for your appointment at 2 PM, Say Confirm to confirm your appointment or Cancel to cancel the appointment. Thank you!"; 
const playSource: TextSource = { text: textToPlay, voiceName: "en-US-ElizabethNeural", kind: "textSource" }; 
const recognizeOptions: CallMediaRecognizeChoiceOptions = { 
    choices: choices, 
    interruptPrompt: true, 
    initialSilenceTimeoutInSeconds: 30, 
    playPrompt: playSource, 
    operationContext: "AppointmentReminderMenu", 
    kind: "callMediaRecognizeChoiceOptions",
    //Only add the speechRecognitionModelEndpointId if you have a custom speech model you would like to use
    speechRecognitionModelEndpointId: "YourCustomSpeechEndpointId"
}; 

await callAutomationClient.getCallConnection(callConnectionId) 
    .getCallMedia() 
    .startRecognizing(targetParticipant, recognizeOptions); 
```

### Speech-to-Text 

``` javascript
const textToPlay = "Hi, how can I help you today?"; 
const playSource: TextSource = { text: textToPlay, voiceName: "en-US-ElizabethNeural", kind: "textSource" }; 
const recognizeOptions: CallMediaRecognizeSpeechOptions = { 
    endSilenceTimeoutInSeconds: 1, 
    playPrompt: playSource, 
    operationContext: "OpenQuestionSpeech", 
    kind: "callMediaRecognizeSpeechOptions",
    //Only add the speechRecognitionModelEndpointId if you have a custom speech model you would like to use
    speechRecognitionModelEndpointId: "YourCustomSpeechEndpointId"
}; 

await callAutomationClient.getCallConnection(callConnectionId) 
    .getCallMedia() 
    .startRecognizing(targetParticipant, recognizeOptions); 
```

### Speech-to-Text or DTMF 

``` javascript
const maxTonesToCollect = 1; 
const textToPlay = "Hi, how can I help you today, you can press 0 to speak to an agent?"; 
const playSource: TextSource = { text: textToPlay, voiceName: "en-US-ElizabethNeural", kind: "textSource" }; 
const recognizeOptions: CallMediaRecognizeSpeechOrDtmfOptions = { 
    maxTonesToCollect: maxTonesToCollect, 
    endSilenceTimeoutInSeconds: 1, 
    playPrompt: playSource, 
    initialSilenceTimeoutInSeconds: 30, 
    interruptPrompt: true, 
    operationContext: "OpenQuestionSpeechOrDtmf", 
    kind: "callMediaRecognizeSpeechOrDtmfOptions",
    //Only add the speechRecognitionModelEndpointId if you have a custom speech model you would like to use
    speechRecognitionModelEndpointId: "YourCustomSpeechEndpointId"
}; 

await callAutomationClient.getCallConnection(callConnectionId) 
    .getCallMedia() 
    .startRecognizing(targetParticipant, recognizeOptions); 
```
> **Note:**
> If parameters aren't set, the defaults are applied where possible.

### Real-time language identification (Preview)

With the additional of real-time language identification, developers can automatically detect spoken languages to enable natural, human-like communications and eliminate manual language selection by the end users. 

``` javascript
const textToPlay = "Hi, how can I help you today?";
const playSource: TextSource = {
  text: textToPlay,
  voiceName: "en-US-ElizabethNeural",
  kind: "textSource"
};
const recognizeOptions: CallMediaRecognizeSpeechOptions = {
  endSilenceTimeoutInSeconds: 30,
  playPrompt: playSource,
  operationContext: "speechContext",
  kind: "callMediaRecognizeSpeechOptions",
  // Enable Language Identification
  speechLanguages: ["en-US", "hi-IN", "fr-FR"],
  // Only add the speechRecognitionModelEndpointId if you have a custom speech model you would like to use
  speechRecognitionModelEndpointId: "YourCustomSpeechEndpointId"
};
await callAutomationClient.getCallConnection(callConnectionId)
  .getCallMedia()
  .startRecognizing(targetParticipant, recognizeOptions);
```

>**Note:**
> **Language support limits**
>
> When using the `Recognize` API with Speech as the input type:
> - You can specify **up to 10 languages** using `setSpeechLanguages(...)`.
> - Be aware that using more languages may **increase the time** it takes to receive the `RecognizeCompleted` event due to additional processing.
>
> When using the `Recognize` API with **choices**:
> - Only **up to 4 languages** are supported.
> - Specifying more than 4 languages in choices mode may result in errors or degraded performance.

### Sentiment Analysis (Preview)
The Recognize API supports sentiment analysis when using speech input. Track the emotional tone of conversations in real time to support customer and agent interactions, and enable supervisors to intervene when necessary. It can also be useful for routing, personalization or analytics. 

``` javascript
const textToPlay = "Hi, how can I help you today?";
const playSource: TextSource = {
  text: textToPlay,
  voiceName: "en-US-ElizabethNeural",
  kind: "textSource"
};

const recognizeOptions: CallMediaRecognizeSpeechOptions = {
  endSilenceTimeoutInSeconds: 30,
  playPrompt: playSource,
  operationContext: "speechContext",
  kind: "callMediaRecognizeSpeechOptions",

  // Enable Sentiment Analysis
  enableSentimentAnalysis: true
};

await callAutomationClient.getCallConnection(callConnectionId)
  .getCallMedia()
  .startRecognizing(targetParticipant, recognizeOptions);
```

## Receiving recognize event updates

Developers can subscribe to `RecognizeCompleted` and `RecognizeFailed` events on the registered webhook callback. Use this callback with business logic in your application to determine next steps when one of the events occurs. 

### Example of how you can deserialize the *RecognizeCompleted* event:

``` javascript
if (event.type === "Microsoft.Communication.RecognizeCompleted") {
  console.log("Received RecognizeCompleted event");

  const callConnectionId = eventData.callConnectionId;

  if (eventData.recognitionType === "choices") {
    const labelDetected = eventData.choiceResult.label;
    console.log(`Detected label: ${labelDetected}`);
    console.log("Choice Result:", JSON.stringify(eventData.choiceResult, null, 2));
    console.log(`Language Identified: ${eventData.choiceResult.languageIdentified}`);

    if (eventData.choiceResult?.sentimentAnalysisResult !== undefined) {
      console.log(`Sentiment: ${eventData.choiceResult.sentimentAnalysisResult.sentiment}`);
    }
  }

  if (eventData.recognitionType === "dtmf") {
    const tones = eventData.dtmfResult.tones;
    console.log(`DTMF Tones: ${tones}`);
    console.log(`Current Context: ${eventData.operationContext}`);
  }

  if (eventData.recognitionType === "speech") {
    const text = eventData.speechResult.speech;
    console.log(`Recognition completed, text: ${text}, context: ${eventData.operationContext}`);
    console.log(`Language Identified: ${eventData.speechResult.languageIdentified}`);

    if (eventData.speechResult?.sentimentAnalysisResult !== undefined) {
      console.log(`Sentiment: ${eventData.speechResult.sentimentAnalysisResult.sentiment}`);
    }
  }
}
```

### Example of how you can deserialize the *RecognizeFailed* event:

``` javascript
if (event.type === "Microsoft.Communication.RecognizeFailed") {
    console.log("Recognize failed: data=%s", JSON.stringify(eventData, null, 2));
}
```

### Example of how you can deserialize the *RecognizeCanceled* event:

``` javascript
if (event.type === "Microsoft.Communication.RecognizeCanceled") {
    console.log("Recognize canceled, context=%s", eventData.operationContext);
}
```



**Applies to: programming-language-python**


## Prerequisites
- Azure account with an active subscription, for details see [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp). Note the connection string for this resource. 
- Create a new web service application using the [Call Automation SDK](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md).
- Install Python from [Python.org](https://www.python.org/).

### For AI features
- Create and connect [Foundry Tools to your Azure Communication Services resource](../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md).
- Create a [custom subdomain](https://learn.microsoft.com/azure/ai-services/cognitive-services-custom-subdomains) for your Azure AI services resource. 


## Technical specifications

The following parameters are available to customize the Recognize function:

| Parameter | Type | Default (if not specified) | Description | Required or Optional |
| --- | --- | --- | --- | --- |
| `Prompt` <br/><br/> *(For details, see [Customize voice prompts to users with Play action](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/how-tos/call-automation/play-ai-action.md))* | FileSource, TextSource | Not set | The message to play before recognizing input. | Optional |
| `InterToneTimeout` | TimeSpan | 2 seconds <br/><br/>**Min:** 1 second <br/>**Max:** 60 seconds | Limit in seconds that Azure Communication Services waits for the caller to press another digit (inter-digit timeout). | Optional |
| `InitialSegmentationSilenceTimeoutInSeconds` | Integer | 0.5 second | How long recognize action waits for input before considering it a timeout. See [How to recognize speech](https://learn.microsoft.com/azure/ai-services/speech-service/how-to-recognize-speech). | Optional |
| `RecognizeInputsType` | Enum | dtmf | Type of input that is recognized. Options are `dtmf`, `choices`, `speech`, and `speechordtmf`. | Required |
| `InitialSilenceTimeout` | TimeSpan | 5 seconds<br/><br/>**Min:** 0 seconds <br/>**Max:** 300 seconds (DTMF) <br/>**Max:** 20 seconds (Choices) <br/>**Max:** 20 seconds (Speech) | Initial silence timeout adjusts how much nonspeech audio is allowed before a phrase before the recognition attempt ends in a "no match" result. See [How to recognize speech](https://learn.microsoft.com/azure/ai-services/speech-service/how-to-recognize-speech). | Optional |
| `MaxTonesToCollect` | Integer | No default<br/><br/>**Min:** 1 | Number of digits a developer expects as input from the participant. | Required |
| `StopTones` | IEnumeration\<DtmfTone\> | Not set | The digit participants can press to escape out of a batch DTMF event. | Optional |
| `InterruptPrompt` | Bool | True | If the participant has the ability to interrupt the playMessage by pressing a digit. | Optional |
| `InterruptCallMediaOperation` | Bool | True | If this flag is set, it interrupts the current call media operation. For example if any audio is being played it interrupts that operation and initiates recognize. | Optional |
| `OperationContext` | String | Not set | String that developers can pass mid action, useful for allowing developers to store context about the events they receive. | Optional |
| `Phrases` | String | Not set | List of phrases that associate to the label. Hearing any of these phrases results in a successful recognition. | Required |
| `Tone` | String | Not set | The tone to recognize if user decides to press a number instead of using speech. | Optional |
| `Label` | String | Not set | The key value for recognition. | Required |
| `Language` | String | En-us | The language that is used for recognizing speech. | Optional |
| `EndSilenceTimeout` | TimeSpan | 0.5 second | The final pause of the speaker used to detect the final result that gets generated as speech. | Optional |

>**Note:** 
>In situations where both DTMF and speech are in the `recognizeInputsType`, the recognize action acts on the first input type received. For example, if the user presses a keypad number first then the recognize action considers it a DTMF event and continues listening for DTMF tones. If the user speaks first then the recognize action considers it a speech recognition event and listens for voice input. 

## Create a new Python application

### Set up a Python virtual environment for your project

``` console
python -m venv play-audio-app
```

### Activate your virtual environment

On Windows, use the following command:

``` console
.\ play-audio-quickstart \Scripts\activate
```
On Unix, use the following command:

``` console
source play-audio-quickstart /bin/activate
```

### Install the Azure Communication Services Call Automation package 

``` console
pip install azure-communication-callautomation
```

Create your application file in your project directory, for example, name it `app.py`. Write your Python code in this file.  

Run your application using Python with the following command.

``` console
python app.py
```

## Establish a call

By this point you should be familiar with starting calls. For more information about making a call, see [Quickstart: Make and outbound call](../../quickstarts/call-automation/quickstart-make-an-outbound-call.md).

## Call the recognize action

When your application answers the call, you can provide information about recognizing participant input and playing a prompt.

### DTMF
``` python
max_tones_to_collect = 3 
text_to_play = "Welcome to Contoso, please enter 3 DTMF." 
play_source = TextSource(text=text_to_play, voice_name="en-US-ElizabethNeural") 
call_automation_client.get_call_connection(call_connection_id).start_recognizing_media( 
    dtmf_max_tones_to_collect=max_tones_to_collect, 
    input_type=RecognizeInputType.DTMF, 
    target_participant=target_participant, 
    initial_silence_timeout=30, 
    play_prompt=play_source, 
    dtmf_inter_tone_timeout=5, 
    interrupt_prompt=True, 
    dtmf_stop_tones=[ DtmfTone.Pound ]) 
```

For speech-to-text flows, the Call Automation Recognize action also supports the use of [custom speech models](https://learn.microsoft.com/azure/machine-learning/tutorial-train-model). Features like custom speech models can be useful when you're building an application that needs to listen for complex words that the default speech-to-text models may not understand. One example is when you're building an application for the telemedical industry and your virtual agent needs to be able to recognize medical terms. You can learn more in [Create a custom speech project](https://learn.microsoft.com/azure/ai-services/speech-service/speech-services-quotas-and-limits).

### Speech-to-Text Choices 
``` python
choices = [ 
    RecognitionChoice( 
        label="Confirm", 
        phrases=[ "Confirm", "First", "One" ], 
        tone=DtmfTone.ONE 
    ), 
    RecognitionChoice( 
        label="Cancel", 
        phrases=[ "Cancel", "Second", "Two" ], 
        tone=DtmfTone.TWO 
    ) 
] 
text_to_play = "Hello, This is a reminder for your appointment at 2 PM, Say Confirm to confirm your appointment or Cancel to cancel the appointment. Thank you!" 
play_source = TextSource(text=text_to_play, voice_name="en-US-ElizabethNeural") 
call_automation_client.get_call_connection(call_connection_id).start_recognizing_media( 
    input_type=RecognizeInputType.CHOICES, 
    target_participant=target_participant, 
    choices=choices, 
    interrupt_prompt=True, 
    initial_silence_timeout=30, 
    play_prompt=play_source, 
    operation_context="AppointmentReminderMenu",
    # Only add the speech_recognition_model_endpoint_id if you have a custom speech model you would like to use
    speech_recognition_model_endpoint_id="YourCustomSpeechModelEndpointId")  
```

### Speech-to-Text 

``` python
text_to_play = "Hi, how can I help you today?" 
play_source = TextSource(text=text_to_play, voice_name="en-US-ElizabethNeural") 
call_automation_client.get_call_connection(call_connection_id).start_recognizing_media( 
    input_type=RecognizeInputType.SPEECH, 
    target_participant=target_participant, 
    end_silence_timeout=1, 
    play_prompt=play_source, 
    operation_context="OpenQuestionSpeech",
    # Only add the speech_recognition_model_endpoint_id if you have a custom speech model you would like to use
    speech_recognition_model_endpoint_id="YourCustomSpeechModelEndpointId") 
```

### Speech-to-Text or DTMF 

``` python
max_tones_to_collect = 1 
text_to_play = "Hi, how can I help you today, you can also press 0 to speak to an agent." 
play_source = TextSource(text=text_to_play, voice_name="en-US-ElizabethNeural") 
call_automation_client.get_call_connection(call_connection_id).start_recognizing_media( 
    dtmf_max_tones_to_collect=max_tones_to_collect, 
    input_type=RecognizeInputType.SPEECH_OR_DTMF, 
    target_participant=target_participant, 
    end_silence_timeout=1, 
    play_prompt=play_source, 
    initial_silence_timeout=30, 
    interrupt_prompt=True, 
    operation_context="OpenQuestionSpeechOrDtmf",
    # Only add the speech_recognition_model_endpoint_id if you have a custom speech model you would like to use
    speech_recognition_model_endpoint_id="YourCustomSpeechModelEndpointId")  
app.logger.info("Start recognizing") 
```
> **Note:**
> If parameters aren't set, the defaults are applied where possible.

### Real-time language identification (Preview)

With the additional of real-time language identification, developers can automatically detect spoken languages to enable natural, human-like communications and eliminate manual language selection by the end users. 

``` python
text_to_play = "Hi, how can I help you today?"
play_source = TextSource(text=text_to_play, voice_name="en-US-ElizabethNeural")

connection_client = call_automation_client.get_call_connection(call_connection_id)

recognize_result = await connection_client.start_recognizing_media(
    input_type=RecognizeInputType.SPEECH,
    target_participant=PhoneNumberIdentifier(caller_id),
    end_silence_timeout=15,
    play_prompt=play_source,
    operation_context="OpenQuestionSpeech",

    # Enable language identification
    speech_language=["en-US", "es-ES", "hi-IN"],

    # Only add the speech_recognition_model_endpoint_id if you have a custom speech model you would like to use
    speech_recognition_model_endpoint_id="YourCustomSpeechModelEndpointId"
)
```

>**Note:**
> **Language support limits**
>
> When using the `Recognize` API with Speech as the input type:
> - You can specify **up to 10 languages** using `setSpeechLanguages(...)`.
> - Be aware that using more languages may **increase the time** it takes to receive the `RecognizeCompleted` event due to additional processing.
>
> When using the `Recognize` API with **choices**:
> - Only **up to 4 languages** are supported.
> - Specifying more than 4 languages in choices mode may result in errors or degraded performance.

### Sentiment Analysis (Preview)
The Recognize API supports sentiment analysis when using speech input. Track the emotional tone of conversations in real time to support customer and agent interactions, and enable supervisors to intervene when necessary. It can also be useful for routing, personalization or analytics. 

``` python
text_to_play = "Hi, how can I help you today?"
play_source = TextSource(text=text_to_play, voice_name="en-US-ElizabethNeural")

connection_client = call_automation_client.get_call_connection(call_connection_id)

recognize_result = await connection_client.start_recognizing_media(
    input_type=RecognizeInputType.SPEECH,
    target_participant=PhoneNumberIdentifier(caller_id),
    end_silence_timeout=15,
    play_prompt=play_source,
    operation_context="OpenQuestionSpeech",
    
    # Enable sentiment analysis
    IsSentimentAnalysisEnabled = true,

    # Only add the speech_recognition_model_endpoint_id if you have a custom speech model you would like to use
    speech_recognition_model_endpoint_id="YourCustomSpeechModelEndpointId"
)
```

## Receiving recognize event updates

Developers can subscribe to `RecognizeCompleted` and `RecognizeFailed` events on the registered webhook callback. Use this callback with business logic in your application to determine next steps when one of the events occurs. 

### Example of how you can deserialize the *RecognizeCompleted* event:

``` python
if event.type == "Microsoft.Communication.RecognizeCompleted":
    print(f"Received RecognizeCompleted event for connection id: {call_connection_id}")

    recognition_type = event.data.get("recognitionType")

    if recognition_type == "dtmf":
        tones = event.data["dtmfResult"]["tones"]
        context = event.data["operationContext"]
        print(f"Recognition completed, tones={tones}, context={context}")

    elif recognition_type == "choices":
        choice_result = event.data["choiceResult"]
        label_detected = choice_result["label"]
        phrase_detected = choice_result["recognizedPhrase"]
        language_identified = choice_result.get("languageIdentified")
        sentiment = choice_result.get("sentimentAnalysisResult", {}).get("sentiment")

        print(f"Recognition completed, labelDetected={label_detected}, phraseDetected={phrase_detected}, context={event.data['operationContext']}")
        print(f"Language Identified: {language_identified}")
        print(f"Sentiment: {sentiment}")

    elif recognition_type == "speech":
        speech_result = event.data["speechResult"]
        text = speech_result["speech"]
        language_identified = speech_result.get("languageIdentified")
        sentiment = speech_result.get("sentimentAnalysisResult", {}).get("sentiment")

        print(f"Recognition completed, text={text}, context={event.data['operationContext']}")
        print(f"Language Identified: {language_identified}")
        print(f"Sentiment: {sentiment}")

    else:
        print(f"Recognition completed: data={event.data}")
```

### Example of how you can deserialize the *RecognizeFailed* event:

``` python
if event.type == "Microsoft.Communication.RecognizeFailed": 
    app.logger.info("Recognize failed: data=%s", event.data); 
```

### Example of how you can deserialize the *RecognizeCanceled* event:

```python
if event.type == "Microsoft.Communication.RecognizeCanceled":
    # Handle the RecognizeCanceled event according to your application logic
```



## Event codes

| Status | Code | Subcode | Message |
| --- | --- | --- | --- |
| `RecognizeCompleted` | 200 | 8531 | Action completed, max digits received. |
| `RecognizeCompleted` | 200 | 8514 | Action completed as stop tone was detected. |
| `RecognizeCompleted` | 400 | 8508 | Action failed, the operation was canceled. |
| `RecognizeCompleted` | 400 | 8532 | Action failed, inter-digit silence timeout reached. |
| `RecognizeCanceled` | 400 | 8508 | Action failed, the operation was canceled. |
| `RecognizeFailed` | 400 | 8510 | Action failed, initial silence timeout reached. |
| `RecognizeFailed` | 500 | 8511 | Action failed, encountered failure while trying to play the prompt. |
| `RecognizeFailed` | 500 | 8512 | Unknown internal server error. |
| `RecognizeFailed` | 400 | 8510 | Action failed, initial silence timeout reached |
| `RecognizeFailed` | 400 | 8532 | Action failed, inter-digit silence timeout reached. |
| `RecognizeFailed` | 400 | 8565 | Action failed, bad request to Azure AI services. Check input parameters. |
| `RecognizeFailed` | 400 | 8565 | Action failed, bad request to Azure AI services. Unable to process payload provided, check the play source input. |
| `RecognizeFailed` | 401 | 8565 | Action failed, Azure AI services authentication error. |
| `RecognizeFailed` | 403 | 8565 | Action failed, forbidden request to Azure AI services, free subscription used by the request ran out of quota. |
| `RecognizeFailed` | 429 | 8565 | Action failed, requests exceeded the number of allowed concurrent requests for the Azure AI services subscription. |
| `RecognizeFailed` | 408 | 8565 | Action failed, request to Azure AI services timed out. |
| `RecognizeFailed` | 500 | 8511 | Action failed, encountered failure while trying to play the prompt. |
| `RecognizeFailed` | 500 | 8512 | Unknown internal server error. |

## Known limitations
- In-band DTMF isn't supported. Use RFC 2833 DTMF instead.
- Text-to-Speech prompts support a maximum of 4,000 characters. If your prompt is longer than this limit, we suggest using SSML for Text-to-Speech-based play actions.
- Speech input for recordings is captured for 1:1 calls but not recorded in group calls when recording is enabled.
- Speech service quota increases can be requested if you exceed your quota limit. Follow the steps outlined [here](https://learn.microsoft.com/azure/ai-services/speech-service/speech-services-quotas-and-limits) to request an increase.

## Clean up resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it. Learn more about [cleaning up resources](../../quickstarts/create-communication-resource.md#clean-up-resources).

## Next Steps

- Learn more about [Gathering user input](../../concepts/call-automation/recognize-action.md)
- Learn more about [Playing audio in call](../../concepts/call-automation/play-action.md)
- Learn more about [Call Automation](../../concepts/call-automation/call-automation.md)
