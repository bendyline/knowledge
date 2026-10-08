---
title: Customize voice prompts to users with Play action
titleSuffix: An Azure Communication Services how-to document
description: Provides a quick start for playing audio to participants as part of a call.
author: kunaal
ms.service: azure-communication-services
ms.topic: how-to
ms.date: 09/06/2022
ms.author: kpunjabi
ms.custom: devx-track-extended-java, devx-track-js, devx-track-python
services: azure-communication-services
zone_pivot_groups: acs-js-csharp-java-python
---

# Customize voice prompts to users with Play action


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This guide helps you get started with playing audio files to participants by using the play action provided through Azure Communication Services Call Automation SDK.

**Applies to: programming-language-csharp**


## Prerequisites

- Azure account with an active subscription, for details see [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp). Save the connection string for this resource. 
- Create a new web service application using the [Call Automation SDK](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md).
- The latest [.NET library](https://dotnet.microsoft.com/download/dotnet-core) for your operating system.
- Obtain the latest [NuGet package](https://www.nuget.org/packages/Azure.Communication.CallAutomation/).

### For AI features
- Create and connect [Foundry Tools to your Azure Communication Services resource](../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md).
- Create a [custom subdomain](https://learn.microsoft.com/azure/ai-services/cognitive-services-custom-subdomains) for your Azure AI services resource. 

## Create a new C# application

In the console window of your operating system, use the `dotnet` command to create a new web application.

```console
dotnet new web -n MyApplication
```

## Install the NuGet package

The NuGet package can be obtained from [here](https://www.nuget.org/packages/Azure.Communication.CallAutomation/), if you haven't already done so. 

## (Optional) Prepare your audio file if you wish to use audio files for playing prompts

Create an audio file, if you don't already have one, to use for playing prompts and messages to participants. The audio file must be hosted in a location that is accessible to Azure Communication Services with support for authentication. Keep a copy of the URL available for you to use when requesting to play the audio file. Azure Communication Services supports both file types of **MP3 files with ID3V2TAG** and **WAV files, mono 16-bit PCM at 16 KHz sample rate**. . 

You can test creating your own audio file using our [Speech synthesis with Audio Content Creation tool](https://learn.microsoft.com/azure/ai-services/speech-service/how-to-audio-content-creation).

## (Optional) Connect your Azure Cognitive Service to your Azure Communication Service

If you would like to use Text-To-Speech capabilities, then it's required for you to connect your [Azure Cognitive Service to your Azure Communication Service](../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md).

## Establish a call

By this point you should be familiar with starting calls, if you need to learn more about making a call, follow our [quickstart](../../quickstarts/call-automation/quickstart-make-an-outbound-call.md). You can also use the code snippet provided here to understand how to answer a call.

```csharp
var callAutomationClient = new CallAutomationClient("<Azure Communication Services connection string>");   

var answerCallOptions = new AnswerCallOptions("<Incoming call context once call is connected>", new Uri("<https://sample-callback-uri>"))  

{  
    CallIntelligenceOptions = new CallIntelligenceOptions() { CognitiveServicesEndpoint = new Uri("<Azure Cognitive Services Endpoint>") } 
};  

var answerCallResult = await callAutomationClient.AnswerCallAsync(answerCallOptions); 
```

## Play audio

Once the call has been established, there are multiple options for how you may wish to play the audio. You can play audio to the participant that has joined the call or play audio to all the participants in the call.

### Play source - Audio file

To play audio to participants using audio files, you need to make sure the audio file is a WAV file, mono and 16 KHz. To play audio files, you need to make sure you provide Azure Communication Services with a uri to a file you host in a location where Azure Communication Services can access it. The FileSource type in our SDK can be used to specify audio files for the play action.

``` csharp
var playSource = new FileSource(new Uri(audioUri));

//Multiple FileSource Prompts, if you want to play multiple audio files in one request you can provide them in a list.
//var playSources = new List<PlaySource>() { new FileSource(new Uri("https://www2.cs.uic.edu/~i101/SoundFiles/StarWars3.wav")), new FileSource(new Uri("https://www2.cs.uic.edu/~i101/SoundFiles/preamble10.wav")) };

```

### Play source - Text-To-Speech

To play audio using Text-To-Speech through Foundry Tools, you need to provide the text you wish to play, as well either the SourceLocale, and VoiceKind or the VoiceName you wish to use. We support all voice names supported by Foundry Tools, full list [here](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts).

``` csharp
String textToPlay = "Welcome to Contoso";

// Provide SourceLocale and VoiceKind to select an appropriate voice. 
var playSource = new TextSource(textToPlay, "en-US", VoiceKind.Female);

//Multiple TextSource prompt, if you want to play multiple text prompts in one request you can provide them in a list.
//var playSources = new List<PlaySource>() { new TextSource("recognize prompt one") { VoiceName = SpeechToTextVoice }, new TextSource("recognize prompt two") { VoiceName = SpeechToTextVoice }, new TextSource(content) { VoiceName = SpeechToTextVoice } };
```

``` csharp
String textToPlay = "Welcome to Contoso"; 
 
// Provide VoiceName to select a specific voice. 
var playSource = new TextSource(textToPlay, "en-US-ElizabethNeural");

//Multiple TextSource prompt, if you want to play multiple text prompts in one request you can provide them in a list.
//var playSources = new List<PlaySource>() { new TextSource("recognize prompt one") { VoiceName = SpeechToTextVoice }, new TextSource("recognize prompt two") { VoiceName = SpeechToTextVoice }, new TextSource(content) { VoiceName = SpeechToTextVoice } };
```

### Play source - Text-To-Speech with SSML

If you want to customize your Text-To-Speech output even more with Foundry Tools you can use [Speech Synthesis Markup Language SSML](https://learn.microsoft.com/azure/ai-services/speech-service/speech-synthesis-markup) when invoking your play action through Call Automation. With SSML you can fine-tune the pitch, pause, improve pronunciation, change speaking rate, adjust volume and attribute multiple voices.

``` csharp
String ssmlToPlay = "<speak version=\"1.0\" xmlns=\"http://www.w3.org/2001/10/synthesis\" xml:lang=\"en-US\"><voice name=\"en-US-JennyNeural\">Hello World!</voice></speak>"; 

var playSource = new SsmlSource(ssmlToPlay);
```

### Custom voice models
If you wish to enhance your prompts more and include custom voice models, the play action Text-To-Speech now supports these custom voices. These are a great option if you are trying to give customers a more local, personalized experience or have situations where the default models may not cover the words and accents you're trying to pronounce. To learn more about creating and deploying custom models you can read this [guide](https://learn.microsoft.com/azure/ai-services/speech-service/how-to-custom-voice).

**Custom voice names regular text example**
``` csharp
String textToPlay = "Welcome to Contoso"; 
 
// Provide VoiceName and CustomVoiceEndpointId to select custom voice. 
var playSource = new TextSource(textToPlay)
    {
        VoiceName = "YourCustomVoiceName",
        CustomVoiceEndpointId = "YourCustomEndpointId"
    };
```
**Custom voice names SSML example**
``` javascriptString ssmlToPlay = "<speak version=\"1.0\" xmlns=\"http://www.w3.org/2001/10/synthesis\" xml:lang=\"en-US\"><voice name=\"YourCustomVoiceName\">Hello World!</voice></speak>"; 

var playSource = new SsmlSource(ssmlToPlay,"YourCustomEndpointId");
```

Once you've decided on which playSource you wish to use for playing audio, you can then choose whether you want to play it to a specific participant or to all participants.

## Play audio to all participants

In this scenario, audio is played to all participants on the call.

``` csharp
var playResponse = await callAutomationClient.GetCallConnection(callConnectionId) 
    .GetCallMedia() 
    .PlayToAllAsync(playSource); 
```

### Support for barge-in
During scenarios where you're playing audio on loop to all participants e.g. waiting lobby you maybe playing audio to the participants in the lobby and keep them updated on their number in the queue. When you use the barge-in support, this will cancel the ongoing audio and play your new message. Then if you wanted to continue playing your original audio you would make another play request.

```csharp
var GoodbyePlaySource = new TextSource("Good bye")
{
    VoiceName = "en-US-NancyNeural"
};

PlayToAllOptions playOptions = new PlayToAllOptions(GoodbyePlaySource)
{
    InterruptCallMediaOperation = false,
    OperationCallbackUri = new Uri(callbackUriHost),
    Loop = true
};

await callConnectionMedia.PlayToAllAsync(playOptions);

// Interrupt media with text source

// Option1:
var interrupt = new TextSource("Interrupt prompt message")
{
    VoiceName = "en-US-NancyNeural"
};

PlayToAllOptions playInterrupt = new PlayToAllOptions(interrupt)
{
    InterruptCallMediaOperation = true,
    OperationCallbackUri = new Uri(callbackUriHost),
    Loop = false
};

await callConnectionMedia.PlayToAllAsync(playInterrupt);

/*
Option2: Interrupt media with file source
var interruptFile = new FileSource(new Uri(<AUDIO URL>));
PlayToAllOptions playFileInterrupt = new PlayToAllOptions(interruptFile)
{
    InterruptCallMediaOperation = true,
    OperationCallbackUri = new Uri(callbackUriHost),
    Loop = false
};
await callConnectionMedia.PlayToAllAsync(playFileInterrupt);
*/
```

## Play audio to a specific participant

In this scenario, audio is played to a specific participant. 

``` csharp
var playTo = new List<CommunicationIdentifier> { targetParticipant }; 
var playResponse = await callAutomationClient.GetCallConnection(callConnectionId) 
    .GetCallMedia() 
    .PlayAsync(playSource, playTo); 
```

## Play multiple audio prompts 

The play actions all supports the ability to send multiple play sources with just one request. This means you send a list of prompts to play in one go instead of individually making these requests.

## Play audio on loop

You can use the loop option to play hold music that loops until your application is ready to accept the caller. Or progress the caller to the next logical step based on your applications business logic.

``` csharp
var playOptions = new PlayToAllOptions(playSource) 
{ 
    Loop = true 
}; 
var playResult = await callAutomationClient.GetCallConnection(callConnectionId) 
    .GetCallMedia() 
    .PlayToAllAsync(playOptions); 
```

## Enhance play with audio file caching

If you're playing the same audio file multiple times, your application can provide Azure Communication Services with the sourceID for the audio file. Azure Communication Services caches this audio file for 1 hour.
> **Note:** 
> Caching audio files isn't suitable for dynamic prompts. If you change the URL provided to Azure Communication Services, it does not update the cached URL straight away. The update will occur after the existing cache expires.

``` csharp
var playTo = new List<CommunicationIdentifier> { targetParticipant }; 
var playSource = new FileSource(new Uri(audioUri)) 
{ 
    PlaySourceCacheId = "<playSourceId>" 
}; 
var playResult = await callAutomationClient.GetCallConnection(callConnectionId) 
    .GetCallMedia() 
    .PlayAsync(playSource, playTo); 
```

## Handle play action event updates 

Your application receives action lifecycle event updates on the callback URL that was provided to Call Automation service at the time of answering the call. An example of a successful play event update.

### Example of how you can deserialize the *PlayCompleted* event:

``` csharp
if (acsEvent is PlayCompleted playCompleted) 
{ 
    logger.LogInformation("Play completed successfully, context={context}", playCompleted.OperationContext); 
} 
```

### Example of how you can deserialize the *PlayStarted* event:

``` csharp
if (acsEvent is PlayStarted playStarted) 
{ 
    logger.LogInformation("Play started successfully, context={context}", playStarted.OperationContext); 
} 
```

### Example of how you can deserialize the *PlayFailed* event:

``` csharp
if (acsEvent is PlayFailed playFailed) 
{ 
    if (MediaEventReasonCode.PlayDownloadFailed.Equals(playFailed.ReasonCode)) 
    { 
        logger.LogInformation("Play failed: download failed, context={context}", playFailed.OperationContext); 
    } 
    else if (MediaEventReasonCode.PlayInvalidFileFormat.Equals(playFailed.ReasonCode)) 
    { 
        logger.LogInformation("Play failed: invalid file format, context={context}", playFailed.OperationContext); 
    } 
    else 
    { 
        logger.LogInformation("Play failed, result={result}, context={context}", playFailed.ResultInformation?.Message, playFailed.OperationContext); 
    } 
} 
```

To learn more about other supported events, visit the [Call Automation overview document](../../concepts/call-automation/call-automation.md#call-automation-webhook-events).

## Cancel play action

Cancel all media operations, all pending media operations are canceled. This action also cancels other queued play actions.

```csharp
var cancelResult = await callAutomationClient.GetCallConnection(callConnectionId) 
    .GetCallMedia() 
    .CancelAllMediaOperationsAsync(); 
```

### Example of how you can deserialize the *PlayCanceled* event:

``` csharp
if (acsEvent is PlayCanceled playCanceled) 
{ 
    logger.LogInformation("Play canceled, context={context}", playCanceled.OperationContext); 
} 
```



**Applies to: programming-language-java**


## Prerequisites

- Azure account with an active subscription, for details see [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp)
- Create a new web service application using the [Call Automation SDK](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md).
- [Java Development Kit](https://learn.microsoft.com/java/azure/jdk/?preserve-view=true\&view=azure-java-stable) version 8 or above.
- [Apache Maven](https://maven.apache.org/download.cgi).
  
### For AI features
- Create and connect [Foundry Tools to your Azure Communication Services resource](../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md).
- Create a [custom subdomain](https://learn.microsoft.com/azure/ai-services/cognitive-services-custom-subdomains) for your Azure AI services resource. 


## Create a new Java application

In your terminal or command window, navigate to the directory where you would like to create your Java application. Run the command shown here to generate the Java project from the maven-archetype-quickstart template. 

```console
mvn archetype:generate -DgroupId=com.communication.quickstart -DartifactId=communication-quickstart -DarchetypeArtifactId=maven-archetype-quickstart -DarchetypeVersion=1.4 -DinteractiveMode=false
```

The previous command creates a directory with the same name as `artifactId` argument. Under this directory, `src/main/java` directory contains the project source code, `src/test/java` directory contains the test source. 

You notice that the 'generate' step created a directory with the same name as the artifactId. Under this directory, `src/main/java` directory contains source code, `src/test/java` directory contains tests, and `pom.xml` file is the project's Project Object Model, or POM.

Update your applications POM file to use Java 8 or higher.

```xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
</properties>
```

## Add package references

In your POM file, add the following reference for the project. 

**azure-communication-callautomation**

Azure Communication Services Call Automation SDK package is retrieved from the Azure SDK Dev Feed.

``` xml 
<dependency>
  <groupId>com.azure</groupId>
  <artifactId>azure-communication-callautomation</artifactId>
  <version>1.0.0</version>
</dependency>
```

## (Optional) Prepare your audio file if you wish to use audio files for playing prompts

Create an audio file, if you don't already have one, to use for playing prompts and messages to participants. The audio file must be hosted in a location that is accessible to Azure Communication Services with support for authentication. Keep a copy of the URL available for you to use when requesting to play the audio file. Azure Communication Services supports both file types of **MP3 files with ID3V2TAG** and **WAV files, mono 16-bit PCM at 16 KHz sample rate**. . 
    
You can test creating your own audio file using our [Speech synthesis with Audio Content Creation tool](https://learn.microsoft.com/azure/ai-services/speech-service/how-to-audio-content-creation).

## (Optional) Connect your Azure Cognitive Service to your Azure Communication Service

If you would like to use Text-To-Speech capabilities, then it's required for you to connect your [Azure Cognitive Service to your Azure Communication Service](../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md).

## Update App.java with code

In your editor of choice, open App.java file and update it with the code provided in [Update app.java with code](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md) section.

## Establish a call

By this point you should be familiar with starting calls, if you need to learn more about making a call, follow our [quickstart](../../quickstarts/call-automation/quickstart-make-an-outbound-call.md).  You can also use the code snippet provided here to understand how to answer a call.

``` java
CallIntelligenceOptions callIntelligenceOptions = new CallIntelligenceOptions().setCognitiveServicesEndpoint("https://sample-cognitive-service-resource.cognitiveservices.azure.com/"); 
answerCallOptions = new AnswerCallOptions("<Incoming call context>", "<https://sample-callback-uri>").setCallIntelligenceOptions(callIntelligenceOptions); 
Response<AnswerCallResult> answerCallResult = callAutomationClient 
    .answerCallWithResponse(answerCallOptions) 
    .block(); 
```

## Play audio

Once the call has been established, there are multiple options for how you may wish to play the audio. You can play audio to the participant that has joined the call or play audio to all the participants in the call.

### Play source - Audio file

To play audio to participants using audio files, you need to make sure the audio file is a WAV file, mono and 16 KHz. To play audio files, you need to make sure you provide Azure Communication Services with a uri to a file you host in a location where Azure Communication Services can access it. The FileSource type in our SDK can be used to specify audio files for the play action.

``` java
var playSource = new FileSource(new Uri(audioUri));

/* Multiple FileSource Prompts
var p1 = new FileSource().setUrl("https://www2.cs.uic.edu/~i101/SoundFiles/StarWars3.wav");
var p2 = new FileSource().setUrl("https://www2.cs.uic.edu/~i101/SoundFiles/preamble10.wav");

var playSources = new ArrayList();
playSources.add(p1);
playSources.add(p2);
*/
```

### Play source - Text-To-Speech

To play audio using Text-To-Speech through Foundry Tools, you need to provide the text you wish to play, as well either the SourceLocale, and VoiceKind or the VoiceName you wish to use. We support all voice names supported by Foundry Tools, full list [here](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts).

``` java
// Provide SourceLocale and VoiceKind to select an appropriate voice.
var playSource = new TextSource() 
    .setText(textToPlay) 
    .setSourceLocale("en-US") 
    .setVoiceKind(VoiceKind.FEMALE);

/* Multiple Prompt list setup: Multiple TextSource prompt

var p1 = new TextSource().setText("recognize prompt one").setSourceLocale("en-US").setVoiceKind(VoiceKind.FEMALE);
var p2 = new TextSource().setText("recognize prompt two").setSourceLocale("en-US").setVoiceKind(VoiceKind.FEMALE);
var p3 = new TextSource().setText(content).setSourceLocale("en-US").setVoiceKind(VoiceKind.FEMALE);

var playSources = new ArrayList();
playSources.add(p1);
playSources.add(p2);
playSources.add(p3);
*/
```

``` java
// Provide VoiceName to select a specific voice.
var playSource = new TextSource() 
    .setText(textToPlay) 
    .setVoiceName("en-US-ElizabethNeural");

/* Multiple Prompt list setup: Multiple TextSource prompt

var p1 = new TextSource().setText("recognize prompt one").setVoiceName("en-US-NancyNeural");
var p2 = new TextSource().setText("recognize prompt two").setVoiceName("en-US-NancyNeural");
var p3 = new TextSource().setText(content).setVoiceName("en-US-NancyNeural");

var playSources = new ArrayList();
playSources.add(p1);
playSources.add(p2);
playSources.add(p3);
*/
```

### Play source - Text-to-Speech SSML

``` java
String ssmlToPlay = "<speak version=\"1.0\" xmlns=\"http://www.w3.org/2001/10/synthesis\" xml:lang=\"en-US\"><voice name=\"en-US-JennyNeural\">Hello World!</voice></speak>"; 
var playSource = new SsmlSource() 
    .setSsmlText(ssmlToPlay);
```
### Custom voice models
If you wish to enhance your prompts more and include custom voice models, the play action Text-To-Speech now supports these custom voices. These are a great option if you are trying to give customers a more local, personalized experience or have situations where the default models may not cover the words and accents you're trying to pronounce. To learn more about creating and deploying custom models you can read this [guide](https://learn.microsoft.com/azure/ai-services/speech-service/how-to-custom-voice).

**Custom voice names regular text example**
``` java
// Provide VoiceName and  to select a specific voice.
var playSource = new TextSource() 
    .setText(textToPlay) 
    .setCustomVoiceName("YourCustomVoiceName")
    .setCustomVoiceEndpointId("YourCustomEndpointId");
```
**Custom voice names SSML example**
``` java
String ssmlToPlay = "<speak version=\"1.0\" xmlns=\"http://www.w3.org/2001/10/synthesis\" xml:lang=\"en-US\"><voice name=\"YourCustomVoiceName\">Hello World!</voice></speak>"; 
var playSource = new SsmlSource() 
    .setSsmlText(ssmlToPlay)
    .setCustomVoiceEndpointId("YourCustomEndpointId");
```

Once you've decided on which playSource you wish to use for playing audio, you can then choose whether you want to play it to a specific participant or to all participants.

## Play audio to all participants

In this scenario, audio is played to all participants on the call.

``` java
var playOptions = new PlayToAllOptions(playSource); 
var playResponse = callAutomationClient.getCallConnectionAsync(callConnectionId) 
    .getCallMediaAsync() 
    .playToAllWithResponse(playOptions) 
    .block(); 
log.info("Play result: " + playResponse.getStatusCode()); 
```

### Support for barge-in
During scenarios where you're playing audio on loop to all participants e.g. waiting lobby you maybe playing audio to the participants in the lobby and keep them updated on their number in the queue. When you use the barge-in support, this will cancel the on-going audio and play your new message. Then if you wanted to continue playing your original audio you would make another play request.

```java
// Option1: Interrupt media with text source
var textPlay = new TextSource()
    .setText("First Interrupt prompt message")
    .setVoiceName("en-US-NancyNeural");

var playToAllOptions = new PlayToAllOptions(textPlay)
    .setLoop(false)
    .setOperationCallbackUrl(appConfig.getBasecallbackuri())
    .setInterruptCallMediaOperation(false);

client.getCallConnection(callConnectionId)
    .getCallMedia()
    .playToAllWithResponse(playToAllOptions, Context.NONE);

/*
Option2: Interrupt media with text source
client.getCallConnection(callConnectionId)
    .getCallMedia()
    .playToAll(textPlay);
*/

/*
Option1: Barge-in with file source
var interruptFile = new FileSource()
    .setUrl("https://www2.cs.uic.edu/~i101/SoundFiles/StarWars3.wav");

var playFileOptions = new PlayToAllOptions(interruptFile)
    .setLoop(false)
    .setOperationCallbackUrl(appConfig.getBasecallbackuri())
    .setInterruptCallMediaOperation(true);

client.getCallConnection(callConnectionId)
    .getCallMedia()
    .playToAllWithResponse(playFileOptions, Context.NONE);

Option2: Barge-in with file source
client.getCallConnection(callConnectionId)
    .getCallMedia()
    .playToAll(interruptFile);
*/
```


## Play audio to a specific participant

In this scenario, audio is played to a specific participant. 

``` java 
var playTo = Arrays.asList(targetParticipant); 
var playOptions = new PlayOptions(playSource, playTo); 
var playResponse = callAutomationClient.getCallConnectionAsync(callConnectionId) 
    .getCallMediaAsync() 
    .playWithResponse(playOptions) 
    .block(); 
```

## Play audio on loop

You can use the loop option to play hold music that loops until your application is ready to accept the caller. Or progress the caller to the next logical step based on your applications business logic.

``` java
var playOptions = new PlayToAllOptions(playSource) 
    .setLoop(true); 
var playResponse = callAutomationClient.getCallConnectionAsync(callConnectionId) 
    .getCallMediaAsync() 
    .playToAllWithResponse(playOptions) 
    .block(); 
```

## Enhance play with audio file caching

If you're playing the same audio file multiple times, your application can provide Azure Communication Services with the sourceID for the audio file. Azure Communication Services caches this audio file for 1 hour.
> **Note:**
> Caching audio files isn't suitable for dynamic prompts. If you change the URL provided to Azure Communication Services, it does not update the cached URL straight away. The update will occur after the existing cache expires.

``` java
var playTo = Arrays.asList(targetParticipant); 
var playSource = new FileSource() 
    .setUrl(audioUri) \
    .setPlaySourceCacheId("<playSourceId>"); 
var playOptions = new PlayOptions(playSource, playTo); 
var playResponse = callAutomationClient.getCallConnectionAsync(callConnectionId) 
    .getCallMediaAsync() 
    .playWithResponse(playOptions) 
    .block(); 
```

## Handle play action event updates 

Your application receives action lifecycle event updates on the callback URL that was provided to Call Automation service at the time of answering the call. An example of a successful play event update.

### Example of how you can deserialize the *PlayCompleted* event:

``` java
if (acsEvent instanceof PlayCompleted) { 
    PlayCompleted event = (PlayCompleted) acsEvent; 
    log.info("Play completed, context=" + event.getOperationContext()); 
} 
```

### Example of how you can deserialize the *PlayStarted* event:

``` java
if (acsEvent instanceof PlayStarted) { 
    PlayStarted event = (PlayStarted) acsEvent; 
    log.info("Play started, context=" + event.getOperationContext()); 
} 
```

### Example of how you can deserialize the *PlayFailed* event:

``` java
if (acsEvent instanceof PlayFailed) { 
    PlayFailed event = (PlayFailed) acsEvent; 
    if (ReasonCode.Play.DOWNLOAD_FAILED.equals(event.getReasonCode())) { 
        log.info("Play failed: download failed, context=" + event.getOperationContext()); 
    } else if (ReasonCode.Play.INVALID_FILE_FORMAT.equals(event.getReasonCode())) { 
        log.info("Play failed: invalid file format, context=" + event.getOperationContext()); 
    } else { 
        log.info("Play failed, result=" + event.getResultInformation().getMessage() + ", context=" + event.getOperationContext()); 
    } 
} 
```

To learn more about other supported events, visit the [Call Automation overview document](../../concepts/call-automation/call-automation.md#call-automation-webhook-events).

## Cancel play action

Cancel all media operations, all pending media operations are canceled. This action also cancels other queued play actions.

```java
var cancelResponse = callAutomationClient.getCallConnectionAsync(callConnectionId) 
    .getCallMediaAsync() 
    .cancelAllMediaOperationsWithResponse() 
    .block(); 
log.info("Cancel result: " + cancelResponse.getStatusCode()); 
```

### Example of how you can deserialize the *PlayCanceled* event:

``` java
if (acsEvent instanceof PlayCanceled) { 
    PlayCanceled event = (PlayCanceled) acsEvent; 
    log.info("Play canceled, context=" + event.getOperationContext()); 
} 
```



**Applies to: programming-language-javascript**


## Prerequisites

- Azure account with an active subscription, for details see [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp). Save the connection string for this resource. 
- Create a new web service application using the [Call Automation SDK](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md).
- Have Node.js installed, you can install it from their [official website](https://nodejs.org).

### For AI features 
- Create and connect [Foundry Tools to your Azure Communication Services resource](../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md).
- Create a [custom subdomain](https://learn.microsoft.com/azure/ai-services/cognitive-services-custom-subdomains) for your Azure AI services resource. 

## Create a new JavaScript application
Create a new JavaScript application in your project directory. Initialize a new Node.js project with the following command. This creates a package.json file for your project, which is used to manage your project's dependencies. 

``` console
npm init -y
```

### Install the Azure Communication Services Call Automation package
``` console
npm install @azure/communication-call-automation
```

Create a new JavaScript file in your project directory, for example, name it app.js. You write your JavaScript code in this file. Run your application using Node.js with the following command. This code executes the JavaScript code you have written. 

``` console
node app.js
```

## (Optional) Prepare your audio file if you wish to use audio files for playing prompts

Create an audio file, if you don't already have one, to use for playing prompts and messages to participants. The audio file must be hosted in a location that is accessible to Azure Communication Services with support for authentication. Keep a copy of the URL available for you to use when requesting to play the audio file. Azure Communication Services supports both file types of **MP3 files with ID3V2TAG** and **WAV files, mono 16-bit PCM at 16 KHz sample rate**. 

You can test creating your own audio file using our [Speech synthesis with Audio Content Creation tool](https://learn.microsoft.com/azure/ai-services/speech-service/how-to-audio-content-creation).

## (Optional) Connect your Azure Cognitive Service to your Azure Communication Service 

If you would like to use Text-To-Speech capabilities, then it's **required** for you to connect your [Azure Cognitive Service to your Azure Communication Service](../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md).

## Establish a call

By this point you should be familiar with starting calls, if you need to learn more about making a call, follow our [quickstart](../../quickstarts/call-automation/quickstart-make-an-outbound-call.md). You can also use the code snippet provided here to understand how to answer a call.

```javascript
const callIntelligenceOptions: CallIntelligenceOptions = { "<https://sample-callback-uri>" }; 
        const answerCallOptions: AnswerCallOptions = { callIntelligenceOptions: callIntelligenceOptions };
  
await acsClient.answerCall("<Incoming call context>", "<https://sample-callback-uri>", answerCallOptions); 
```

## Play audio

Once the call has been established, there are multiple options for how you may wish to play the audio. You can play audio to the participant that has joined the call or play audio to all the participants in the call.

### Play source - Audio file

To play audio to participants using audio files, you need to make sure the audio file is a WAV file, mono and 16 KHz. To play audio files, you need to make sure you provide Azure Communication Services with a uri to a file you host in a location where Azure Communication Services can access it. The FileSource type in our SDK can be used to specify audio files for the play action.

``` javascript
const playSource: FileSource = { url: audioUri, kind: "fileSource" };
```

### Play source - Text-To-Speech

To play audio using Text-To-Speech through Foundry Tools, you need to provide the text you wish to play, as well either the SourceLocale, and VoiceKind or the VoiceName you wish to use. We support all voice names supported by Foundry Tools, full list [here](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts). 

``` javascript
const textToPlay = "Welcome to Contoso"; 
// Provide SourceLocale and VoiceKind to select an appropriate voice. 
const playSource: TextSource = { text: textToPlay, sourceLocale: "en-US", voiceKind: VoiceKind.Female, kind: "textSource" }; 
```

``` javascript
const textToPlay = "Welcome to Contoso"; 
// Provide VoiceName to select a specific voice. 
const playSource: TextSource = { text: textToPlay, voiceName: "en-US-ElizabethNeural", kind: "textSource" }; 
```

### Play source - Text-To-Speech with SSML

If you want to customize your Text-To-Speech output even more with Foundry Tools you can use [Speech Synthesis Markup Language SSML](https://learn.microsoft.com/azure/ai-services/speech-service/speech-synthesis-markup) when invoking your play action through Call Automation. With SSML you can fine-tune the pitch, pause, improve pronunciation, change speaking rate, adjust volume and attribute multiple voices.

``` javascript
const ssmlToPlay = "<speak version=\"1.0\" xmlns=\"http://www.w3.org/2001/10/synthesis\" xml:lang=\"en-US\"><voice name=\"en-US-JennyNeural\">Hello World!</voice></speak>"; 
const playSource: SsmlSource = { ssmlText: ssmlToPlay, kind: "ssmlSource" }; 
```
### Custom voice models
If you wish to enhance your prompts more and include custom voice models, the play action Text-To-Speech now supports these custom voices. These are a great option if you are trying to give customers a more local, personalized experience or have situations where the default models may not cover the words and accents you're trying to pronounce. To learn more about creating and deploying custom models you can read this [guide](https://learn.microsoft.com/azure/ai-services/speech-service/how-to-custom-voice).

**Custom voice names regular text example**
``` javascript
const textToPlay = "Welcome to Contoso";
// Provide VoiceName and CustomVoiceEndpointID to play your custom voice
const playSource: TextSource = { text: textToPlay, voiceName: "YourCustomVoiceName", customVoiceEndpointId: "YourCustomEndpointId"}
```
**Custom voice names SSML example**
``` javascript
const ssmlToPlay = "<speak version=\"1.0\" xmlns=\"http://www.w3.org/2001/10/synthesis\" xml:lang=\"en-US\"><voice name=\"YourCustomVoiceName\">Hello World!</voice></speak>"; 
const playSource: SsmlSource = { ssmlText: ssmlToPlay, kind: "ssmlSource", customVoiceEndpointId: "YourCustomEndpointId"}; 
```

Once you've decided on which playSource you wish to use for playing audio, you can then choose whether you want to play it to a specific participant or to all participants.

## Play audio - All participants

In this scenario, audio is played to all participants on the call. 

``` javascript 
await callAutomationClient.getCallConnection(callConnectionId) 
    .getCallMedia() 
    .playToAll([ playSource ]);
```

### Support for barge-in
During scenarios where you're playing audio on loop to all participants e.g. waiting lobby you maybe playing audio to the participants in the lobby and keep them updated on their number in the queue. When you use the barge-in support, this will cancel the on-going audio and play your new message. Then if you wanted to continue playing your original audio you would make another play request.

```javascript
// Interrupt media with text source 
//Option1:

const playSource: TextSource = { text: "Interrupt prompt", voiceName: "en-US-NancyNeural", kind: "textSource" };

const interruptOption: PlayToAllOptions = { 
loop: false, 
interruptCallMediaOperation: true, 
operationContext: "interruptOperationContext", 
operationCallbackUrl: process.env.CALLBACK_URI + "/api/callbacks" 
}; 

await callConnectionMedia.playToAll([playSource], interruptOption); 

/*
// Interrupt media with file source 

Option2: 

const playSource: FileSource = { 
url: MEDIA_URI + "MainMenu.wav", 
kind: "fileSource" 
}; 

const interruptOption: PlayToAllOptions = { 
loop: false, 
interruptCallMediaOperation: true, 
operationContext: "interruptOperationContext", 
operationCallbackUrl: process.env.CALLBACK_URI + "/api/callbacks" 
}; 

await callConnectionMedia.playToAll([playSource], interruptOption); 
*/
```

## Play audio - Specific participant

In this scenario, audio is played to a specific participant.

``` javascript
await callAutomationClient.getCallConnection(callConnectionId) 
    .getCallMedia() 
    .play([ playSource ], [ targetParticipant ]); 
```

## Play audio on loop

You can use the loop option to play hold music that loops until your application is ready to accept the caller. Or progress the caller to the next logical step based on your applications business logic.

``` javascript
const playOptions: PlayOptions = { loop: true }; 
await callAutomationClient.getCallConnection(callConnectionId) 
    .getCallMedia() 
    .playToAll([ playSource ], playOptions); 
```

## Enhance play with audio file caching

If you're playing the same audio file multiple times, your application can provide Azure Communication Services with the sourceID for the audio file. Azure Communication Services caches this audio file for 1 hour. 
> **Note:**
> Caching audio files isn't suitable for dynamic prompts. If you change the URL provided to Azure Communication Services, it does not update the cached URL straight away. The update will occur after the existing cache expires.

``` javascript
const playSource: FileSource = { url: audioUri, playsourcacheid: "<playSourceId>", kind: "fileSource" }; 
await callAutomationClient.getCallConnection(callConnectionId) 
.getCallMedia() 
.play([ playSource ], [ targetParticipant ]);
```

## Handle play action event updates 

Your application receives action lifecycle event updates on the callback URL that was provided to Call Automation service at the time of answering the call. 

### Example of how you can deserialize the *PlayCompleted* event:

```javascript 
if (event.type === "Microsoft.Communication.PlayCompleted") { 
    console.log("Play completed, context=%s", eventData.operationContext); 
} 
```

### Example of how you can deserialize the *PlayFailed* event:

```javascript
if (event.type === "Microsoft.Communication.PlayFailed") { 
    console.log("Play failed: data=%s", JSON.stringify(eventData)); 
} 
```
### Example of how you can deserialize the *PlayStarted* event:
```javascript
if (event.type === "Microsoft.Communication.PlayStarted") { 
    console.log("Play started: data=%s", JSON.stringify(eventData)); 
} 
```

To learn more about other supported events, visit the [Call Automation overview document](../../concepts/call-automation/call-automation.md#call-automation-webhook-events).

## Cancel play action

Cancel all media operations, all pending media operations are canceled. This action also cancels other queued play actions.

```javascript
await callAutomationClient.getCallConnection(callConnectionId) 
.getCallMedia() 
.cancelAllOperations();
```

### Example of how you can deserialize the *PlayCanceled* event:

```javascript
if (event.type === "Microsoft.Communication.PlayCanceled") {
    console.log("Play canceled, context=%s", eventData.operationContext);
}
```



**Applies to: programming-language-python**


## Prerequisites

- Azure account with an active subscription, for details see [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp). Save the connection string for this resource. 
- Create a new web service application using the [Call Automation SDK](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md).
- Have Python installed, you can install from the [official site](https://www.python.org/).

### For AI features 
- Create and connect [Foundry Tools to your Azure Communication Services resource](../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md).
- Create a [custom subdomain](https://learn.microsoft.com/azure/ai-services/cognitive-services-custom-subdomains) for your Azure AI services resource. 

## Create a new Python application

### Set up a Python virtual environment for your project
``` console
python -m venv play-audio-app
```

### Activate your virtual environment
On windows, use the following command:
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
Create your application file in your project directory, for example, name it app.py. You write your Python code in this file.  

Run your application using Python with the following command to execute code. 

``` console
python app.py
```

## (Optional) Prepare your audio file if you wish to use audio files for playing prompts

Create an audio file, if you don't already have one, to use for playing prompts and messages to participants. The audio file must be hosted in a location that is accessible to Azure Communication Services with support for authentication. Keep a copy of the URL available for you to use when requesting to play the audio file. Azure Communication Services supports both file types of **MP3** and **WAV files, mono 16-bit PCM at 16 KHz sample rate**. . 

You can test creating your own audio file using our [Speech synthesis with Audio Content Creation tool](https://learn.microsoft.com/azure/ai-services/speech-service/how-to-audio-content-creation).

## (Optional) Connect your Azure Cognitive Service to your Azure Communication Service

If you would like to use Text-To-Speech capabilities, then it's required for you to connect your [Azure Cognitive Service to your Azure Communication Service](../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md).

## Establish a call

By this point you should be familiar with starting calls, if you need to learn more about making a call, follow our [quickstart](../../quickstarts/call-automation/quickstart-make-an-outbound-call.md). You can also use the code snippet provided here to understand how to answer a call.

```python
call_automation_client.answer_call(
    incoming_call_context="<Incoming call context>",
    callback_url="<https://sample-callback-uri>",
    cognitive_services_endpoint=COGNITIVE_SERVICE_ENDPOINT,
)
```

## Play audio

Once the call has been established, there are multiple options for how you may wish to play the audio. You can play audio to the participant that has joined the call or play audio to all the participants in the call.

### Play source - Audio file

To play audio to participants using audio files, you need to make sure the audio file is a WAV file, mono and 16 KHz. To play audio files, you need to make sure you provide Azure Communication Services with a uri to a file you host in a location where Azure Communication Services can access it. The FileSource type in our SDK can be used to specify audio files for the play action.

``` python
play_source = FileSource(url=audioUri)

#Play multiple audio files
#file_source1 = FileSource(MAIN_MENU_PROMPT_URI) 
#file_source2 = FileSource(MAIN_MENU_PROMPT_URI) 
#
# play_sources = [file_source1, file_source2]
# 
# call_connection_client.play_media_to_all(
#     play_source=play_sources,
#     interrupt_call_media_operation=False,
#     operation_context="multiplePlayContext",
#     operation_callback_url=CALLBACK_EVENTS_URI,
#     loop=False
# )
```

### Play source - Text-To-Speech 

To play audio using Text-To-Speech through Foundry Tools, you need to provide the text you wish to play, as well either the SourceLocale, and VoiceKind or the VoiceName you wish to use. We support all voice names supported by Foundry Tools, full list [here](https://learn.microsoft.com/azure/ai-services/speech-service/language-support?tabs=tts).

``` python
text_to_play = "Welcome to Contoso"

# Provide SourceLocale and VoiceKind to select an appropriate voice. 
play_source = TextSource(
    text=text_to_play, source_locale="en-US", voice_kind=VoiceKind.FEMALE
)
play_to = [target_participant]
call_automation_client.get_call_connection(call_connection_id).play_media(
    play_source=play_source, play_to=play_to
)

#Multiple text prompts
#play_source1 = TextSource(text="Hi, This is multiple play source one call media test.", source_locale="en-US", voice_kind=VoiceKind.FEMALE) 
#play_source2 = TextSource(text="Hi, This is multiple play source two call media test.", source_locale="en-US", voice_kind=VoiceKind.FEMALE)
#
#play_sources = [play_source1, play_source2]
#
#call_connection_client.play_media_to_all(
#    play_source=play_sources,
#    interrupt_call_media_operation=False,
#    operation_context="multiplePlayContext",
#    operation_callback_url=CALLBACK_EVENTS_URI,
#    loop=False
#)
```

``` python
text_to_play = "Welcome to Contoso"

# Provide VoiceName to select a specific voice. 
play_source = TextSource(text=text_to_play, voice_name="en-US-ElizabethNeural")
play_to = [target_participant]
call_automation_client.get_call_connection(call_connection_id).play_media(
    play_source=play_source, play_to=play_to
)

#Play multiple text prompts
#play_source1 = TextSource(text="Hi, This is multiple play source one call media test.", voice_name=SPEECH_TO_TEXT_VOICE) 
#play_source2 = TextSource(text="Hi, This is multiple play source two call media test.", voice_name=SPEECH_TO_TEXT_VOICE)
#
#play_sources = [play_source1, play_source2]
#
#call_connection_client.play_media_to_all(
#    play_source=play_sources,
#    interrupt_call_media_operation=False,
#    operation_context="multiplePlayContext",
#    operation_callback_url=CALLBACK_EVENTS_URI,
#    loop=False
#)
```

### Play source - Text-To-Speech with SSML 

If you want to customize your Text-To-Speech output even more with Foundry Tools you can use [Speech Synthesis Markup Language SSML](https://learn.microsoft.com/azure/ai-services/speech-service/speech-synthesis-markup) when invoking your play action through Call Automation. With SSML you can fine-tune the pitch, pause, improve pronunciation, change speaking rate, adjust volume and attribute multiple voices.

``` python
ssmlToPlay = '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="en-US-JennyNeural">Hello World!</voice></speak>'

play_source = SsmlSource(ssml_text=ssmlToPlay)

play_to = [target_participant]

call_automation_client.get_call_connection(call_connection_id).play_media(
    play_source=play_source, play_to=play_to
)
```

### Custom voice models
If you wish to enhance your prompts more and include custom voice models, the play action Text-To-Speech now supports these custom voices. These are a great option if you are trying to give customers a more local, personalized experience or have situations where the default models may not cover the words and accents you're trying to pronounce. To learn more about creating and deploying custom models you can read this [guide](https://learn.microsoft.com/azure/ai-services/speech-service/how-to-custom-voice).

**Custom voice names regular text example**
``` python
text_to_play = "Welcome to Contoso"

# Provide VoiceName to select a specific voice. 
play_source = TextSource(text=text_to_play, voice_name="YourCustomVoiceName", custom_voice_endpoint_id = "YourCustomEndpointId")
play_to = [target_participant]
call_automation_client.get_call_connection(call_connection_id).play_media(
    play_source=play_source, play_to=play_to
)
```
**Custom voice names SSML example**
``` python
ssmlToPlay = '<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US"><voice name="YourCustomVoiceName">Hello World!</voice></speak>'

play_source = SsmlSource(ssml_text=ssmlToPlay, custom_voice_endpoint_id="YourCustomEndpointId")

play_to = [target_participant]

call_automation_client.get_call_connection(call_connection_id).play_media(
    play_source=play_source, play_to=play_to
)
```

Once you've decided on which playSource you wish to use for playing audio, you can then choose whether you want to play it to a specific participant or to all participants.

## Play audio - All participants

Play a prerecorded audio file to all participants in the call.

``` python 
text_to_play = "Welcome to Contoso"

play_source = TextSource(text=text_to_play, voice_name="en-US-ElizabethNeural")

call_automation_client.get_call_connection(call_connection_id).play_media(
    play_source=play_source
)
```

### Support for barge-in
During scenarios where you're playing audio on loop to all participants e.g. waiting lobby you maybe playing audio to the participants in the lobby and keep them updated on their number in the queue. When you use the barge-in support, this will cancel the on-going audio and play your new message. Then if you wanted to continue playing your original audio you would make another play request.

```python
# Interrupt media with text source
# Option 1
play_source = TextSource(text="This is interrupt call media test.", voice_name=SPEECH_TO_TEXT_VOICE)
call_connection_client.play_media_to_all(
    play_source, 
    interrupt_call_media_operation=True, 
    operation_context="interruptContext", 
    operation_callback_url=CALLBACK_EVENTS_URI, 
    loop=False
)

# Interrupt media with file source
# Option 2
#play_source = FileSource(MAIN_MENU_PROMPT_URI)
#call_connection_client.play_media_to_all(
#    play_source, 
#    interrupt_call_media_operation=True, 
#    operation_context="interruptContext", 
#    operation_callback_url=CALLBACK_EVENTS_URI, 
#    loop=False
#)
```

## Play audio - Specific participant

Play a prerecorded audio file to a specific participant in the call.

``` python 
play_to = [target_participant]

call_automation_client.get_call_connection(call_connection_id).play_media(
    play_source=play_source, play_to=play_to
)
```

## Play audio on loop

You can use the loop option to play hold music that loops until your application is ready to accept the caller. Or progress the caller to the next logical step based on your applications business logic.

``` python
text_to_play = "Welcome to Contoso"

play_source = TextSource(text=text_to_play, voice_name="en-US-ElizabethNeural")

call_automation_client.get_call_connection(call_connection_id).play_media(
    play_source=play_source, loop=True
)
```

## Enhance play with audio file caching

If you're playing the same audio file multiple times, your application can provide Azure Communication Services with the sourceID for the audio file. Azure Communication Services caches this audio file for 1 hour. 
> **Note:**
> Caching audio files isn't suitable for dynamic prompts. If you change the URL provided to Azure Communication Services, it does not update the cached URL straight away. The update will occur after the existing cache expires.

``` python
play_source = FileSource(url=audioUri, play_source_cache_id="<playSourceId>")

play_to = [target_participant]

call_automation_client.get_call_connection(call_connection_id).play_media(
    play_source=play_source, play_to=play_to
)
```

## Handle play action event updates 

Your application receives action lifecycle event updates on the callback URL that was provided to Call Automation service at the time of answering the call. 

### Example of how you can deserialize the *PlayCompleted* event:

```python 
if event.type == "Microsoft.Communication.PlayCompleted":

    app.logger.info("Play completed, context=%s", event.data.get("operationContext"))
```

### Example of how you can deserialize the *PlayStarted* event:

```python 
if event.type == "Microsoft.Communication.PlayStarted":

    app.logger.info("Play started, context=%s", event.data.get("operationContext"))
```

### Example of how you can deserialize the *PlayFailed* event:

```python
if event.type == "Microsoft.Communication.PlayFailed":

    app.logger.info("Play failed: data=%s", event.data)
```

To learn more about other supported events, visit the [Call Automation overview document](../../concepts/call-automation/call-automation.md#call-automation-webhook-events).

## Cancel play action

Cancel all media operations, all pending media operations are canceled. This action also cancels other queued play actions.

```python
call_automation_client.get_call_connection(
    call_connection_id
).cancel_all_media_operations()
```

### Example of how you can deserialize the *PlayCanceled* event:

```python
if event.type == "Microsoft.Communication.PlayCanceled":

    app.logger.info("Play canceled, context=%s", event.data.get("operationContext"))
```



## Event codes
| Status | Code | Subcode | Message |
| --- | --- | --- | --- |
| PlayCompleted | 200 | 0 | Action completed successfully. |
| PlayCanceled | 400 | 8508 | Action failed, the operation was canceled. |
| PlayFailed | 400 | 8535 | Action failed, file format is invalid. |
| PlayFailed | 400 | 8536 | Action failed, file could not be downloaded. |
| PlayFailed | 400 | 8565 | Action failed, bad request to Azure AI services. Check input parameters. |
| PlayFailed | 401 | 8565 | Action failed, Azure AI services authentication error. |
| PlayFailed | 403 | 8565 | Action failed, forbidden request to Azure AI services, free subscription used by the request ran out of quota. |
| PlayFailed | 429 | 8565 | Action failed, requests exceeded the number of allowed concurrent requests for the Azure AI services subscription. |
| PlayFailed | 408 | 8565 | Action failed, request to Azure AI services timed out. |
| PlayFailed | 500 | 9999 | Unknown internal server error |
| PlayFailed | 500 | 8572 | Action failed due to play service shutdown. |

## Known limitations
- Text-to-Speech prompts support a maximum of 4,000 characters. If your prompt is longer than this limit, we suggest using SSML for Text-to-Speech-based play actions.
- HD Voices from Microsoft Foundry aren't officially supported. These will result in timeouts if used. 
- Speech service quota increases can be requested if you exceed your quota limit. Follow the steps outlined [here](https://learn.microsoft.com/azure/ai-services/speech-service/speech-services-quotas-and-limits) to request an increase.

## Clean up resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it. Learn more about [cleaning up resources](../../quickstarts/create-communication-resource.md#clean-up-resources).

## Next steps

- Learn more about [Call Automation](../../concepts/call-automation/call-automation.md)
- Learn more about [Gathering user input in a call](../../concepts/call-automation/recognize-action.md)
