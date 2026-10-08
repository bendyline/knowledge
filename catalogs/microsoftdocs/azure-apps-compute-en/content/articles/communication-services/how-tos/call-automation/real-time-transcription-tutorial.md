---
title: Add real-time transcription into your applications
titleSuffix: An Azure Communication Services how-to document
description: Provides a how-to guide for adding real-time transcription
author: kunaal
ms.service: azure-communication-services
ms.subservice: call-automation
ms.topic: include
ms.date: 07/16/2024
ms.author: kpunjabi
services: azure-communication-services
zone_pivot_groups: acs-js-csharp-java-python
---

# Add real-time transcription into your application


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This guide helps you better understand the different ways you can use Azure Communication Services offering of real-time transcription through Call Automation SDKs.

### Prerequisites
- Azure account with an active subscription, for details see [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure Communication Services resource, see [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows&pivots=platform-azp)
- Create and connect [Foundry Tools to your Azure Communication Services resource](../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md).
- Create a [custom subdomain](https://learn.microsoft.com/azure/ai-services/cognitive-services-custom-subdomains) for your Azure AI services resource.
- Create a new web service application using the [Call Automation SDK](../../quickstarts/call-automation/quickstart-make-an-outbound-call.md).

## Set up a WebSocket Server 
Azure Communication Services requires your server application to set up a WebSocket server to stream transcription in real-time. WebSocket is a standardized protocol that provides a full-duplex communication channel over a single TCP connection. You can optionally use Azure services Azure WebApps that allows you to create an application to receive transcripts over a websocket connection. Follow this [quickstart](https://azure.microsoft.com/blog/introduction-to-websockets-on-windows-azure-web-sites/).

## Establish a call 
In this quickstart, we assume that you're already familiar with starting calls. If you need to learn more about starting and establishing calls, you can follow our [quickstart](../../quickstarts/call-automation/quickstart-make-an-outbound-call.md). For the purposes of this quickstart, we're going through the process of starting transcription for both incoming calls and outbound calls. 

When working with real-time transcription, you have a few of options on when and how to start transcription:

**Option 1 -** Starting at time of answering or creating a call

**Option 2 -** Starting transcription during an ongoing call 

**Option 3 -** Starting transcription when connecting to an Azure Communication Services Rooms call

In this tutorial, we're demonstrating option 2 and 3, starting transcription during an ongoing call or when connecting to a Rooms call. By default the 'startTranscription' is set to false at time of answering or creating a call.

**Applies to: programming-language-csharp**


## Create a call and provide the transcription details
Define the TranscriptionOptions for ACS to specify when to start the transcription, specify the locale for transcription, and the web socket connection for sending the transcript.

```csharp
var createCallOptions = new CreateCallOptions(callInvite, callbackUri)
{
    CallIntelligenceOptions = new CallIntelligenceOptions() { CognitiveServicesEndpoint = new Uri(cognitiveServiceEndpoint) },
    TranscriptionOptions = new TranscriptionOptions(new Uri(""), "en-US", false, TranscriptionTransport.Websocket)
};
CreateCallResult createCallResult = await callAutomationClient.CreateCallAsync(createCallOptions);
```

## Sentiment Analysis (Preview)
Track the emotional tone of conversations in real time to support customer and agent interactions, and enable supervisors to intervene when necessary. Available in public preview through `createCall`, `answerCall` and `startTranscription`.
### Create a call with Sentiment Analysis enabled 

``` csharp
// Define transcription options with sentiment analysis enabled
var transcriptionOptions = new TranscriptionOptions
{
    IsSentimentAnalysisEnabled = true
};

var callIntelligenceOptions = new CallIntelligenceOptions
{
    CognitiveServicesEndpoint = new Uri(cognitiveServiceEndpoint)
};

var createCallOptions = new CreateCallOptions(callInvite, new Uri("https://test"))
{
    CallIntelligenceOptions = callIntelligenceOptions,
    TranscriptionOptions = transcriptionOptions
};

CreateCallResult createCallResult = await callAutomationClient.CreateCallAsync(createCallOptions);
```

### Answer a call with Sentiment Analysis enabled 
``` csharp
// Define transcription options with sentiment analysis enabled
var transcriptionOptions = new TranscriptionOptions
{
    IsSentimentAnalysisEnabled = true
};

var answerCallOptions = new AnswerCallOptions(incomingCallContext, callbackUri)
{
    TranscriptionOptions = transcriptionOptions
};

var answerCallResult = await client.AnswerCallAsync(answerCallOptions);
```

## PII Redaction (Preview)
Automatically identify and mask sensitive information—such as names, addresses, or identification numbers—to ensure privacy and regulatory compliance. Available in `createCall`, `answerCall` and `startTranscription`.

### Answer a call with PII Redaction enabled 
``` csharp
var transcriptionOptions = new TranscriptionOptions 
{ 
   PiiRedactionOptions = new PiiRedactionOptions 
   { 
       IsEnabled = true, 
       RedactionType = RedactionType.MaskWithCharacter 
   },  
}; 
 
var options = new AnswerCallOptions(incomingCallContext, callbackUri) 
{ 
   TranscriptionOptions = transcriptionOptions, 
}; 
 
//Answer call request 
var answerCallResult = await client.AnswerCallAsync(options); 
```
>**Note:**
> With PII redaction enabled you’ll only receive the redacted text.  

## Real-time language detection (Preview)
Automatically detect spoken languages to enable natural, human-like communication and eliminate manual language selection. Available in `createCall`, `answerCall` and `startTranscription`.

### Create a call with Real-time language detection enabled
``` csharp
var transcriptionOptions = new TranscriptionOptions 
{ 
   Locales = new List<string> { "en-US", "fr-FR", "hi-IN" }
};

var createCallOptions = new CreateCallOptions(callInviteOption, new Uri("https://test")) 
{ 
    TranscriptionOptions = transcriptionOptions 
}; 
 
//CreateCall request 
var createCallRequest = await client.CreateCallAsync(createCallOptions);
```

> **Note:**
> To stop language identification after it has started, use the `updateTranscription` API and explicitly set the language you want to use for the transcript. This disables automatic language detection and locks transcription to the specified language.


## Connect to a Rooms call and provide transcription details
If you're connecting to an ACS room and want to use transcription, configure the transcription options as follows:

```csharp
var transcriptionOptions = new TranscriptionOptions(
    transportUri: new Uri(""),
    locale: "en-US", 
    startTranscription: false,
    transcriptionTransport: TranscriptionTransport.Websocket,
    //Only add the SpeechRecognitionModelEndpointId if you have a custom speech model you would like to use
    SpeechRecognitionModelEndpointId = "YourCustomSpeechRecognitionModelEndpointId"
);

var connectCallOptions = new ConnectCallOptions(new RoomCallLocator("roomId"), callbackUri)
{
    CallIntelligenceOptions = new CallIntelligenceOptions() 
    { 
        CognitiveServicesEndpoint = new Uri(cognitiveServiceEndpoint) 
    },
    TranscriptionOptions = transcriptionOptions
};

var connectResult = await client.ConnectCallAsync(connectCallOptions);
```

## Start Transcription
Once you're ready to start the transcription, you can make an explicit call to Call Automation to start transcribing the call.

```csharp
// Start transcription with options
var transcriptionOptions = new StartTranscriptionOptions
{
    OperationContext = "startMediaStreamingContext",
    IsSentimentAnalysisEnabled = true,

    // Only add the SpeechRecognitionModelEndpointId if you have a custom speech model you would like to use
    SpeechRecognitionModelEndpointId = "YourCustomSpeechRecognitionModelEndpointId"
};

// Start transcription
await callMedia.StartTranscriptionAsync(transcriptionOptions);

// Alternative: Start transcription without options
// await callMedia.StartTranscriptionAsync();
```

## Get mid call summaries (Preview)
Enhance your call workflows with real-time summarization. By enabling summarization in your transcription options, ACS can automatically generate concise mid-call recaps—including decisions, action items, and key discussion points—without waiting for the call to end. This helps teams stay aligned and enables faster follow-ups during live conversations.

``` csharp
// Define transcription options with call summarization enabled
var transcriptionOptions = new TranscriptionOptions
{
    SummarizationOptions = new SummarizationOptions
    {
        Locale = "en-US"
    }
};

// Answer call with transcription options
var answerCallOptions = new AnswerCallOptions(incomingCallContext, callbackUri)
{
    TranscriptionOptions = transcriptionOptions
};

var answerCallResult = await client.AnswerCallAsync(answerCallOptions);
```
### Additional Headers:
The Correlation ID and Call Connection ID are now included in the WebSocket headers for improved traceability `x-ms-call-correlation-id` and `x-ms-call-connection-id`.

## Receiving Transcription Stream
When transcription starts, your websocket receives the transcription metadata payload as the first packet.

```json
{
    "kind": "TranscriptionMetadata",
    "transcriptionMetadata": {
        "subscriptionId": "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e",
        "locale": "en-us",
        "callConnectionId": "65c57654=f12c-4975-92a4-21668e61dd98",
        "correlationId": "65c57654=f12c-4975-92a4-21668e61dd98"
    }
}
```

## Receiving Transcription data
After the metadata, the next packets your web socket receives will be TranscriptionData for the transcribed audio.

```json
{
    "kind": "TranscriptionData",
    "transcriptionData": {
        "text": "Testing transcription.",
        "format": "display",
        "confidence": 0.695223331451416,
        "offset": 2516998782481234400,
        "words": [
            {
                "text": "testing",
                "offset": 2516998782481234400
            },
            {
                "text": "testing",
                "offset": 2516998782481234400
            }
        ],
        "participantRawID": "8:acs:",
        "resultStatus": "Final"
    }
}
```

## Receiving Transcription Stream with AI capabilities enabled (Preview)
When transcription is enabled during a call, Azure Communication Services emits metadata that describes the configuration and context of the transcription session. This includes details such as the locale, call connection ID, sentiment analysis settings, and PII redaction preferences. Developers can use this payload to verify transcription setup, audit configurations, or troubleshoot issues related to real-time transcription features enhanced by AI.

``` json
{
  "kind": "TranscriptionMetadata",
  "transcriptionMetadata": {
    "subscriptionId": "863b5e55-de0d-4fc3-8e58-2d68e976b5ad",
    "locale": "en-US",
    "callConnectionId": "02009180-9dc2-429b-a3eb-d544b7b6a0e1",
    "correlationId": "62c8215b-5276-4d3c-bb6d-06a1b114651b",
    "speechModelEndpointId": null,
    "locales": [],
    "enableSentimentAnalysis": true,
    "piiRedactionOptions": {
      "enable": true,
      "redactionType": "MaskWithCharacter"
    }
  }
}
```

## Receiving Transcription data with AI capabilities enabled (Preview)
After the initial metadata packet, your WebSocket connection will begin receiving `TranscriptionData` events for each segment of transcribed audio. These packets include the transcribed text, confidence score, timing information, and—if enabled—sentiment analysis and PII redaction. This data can be used to build real-time dashboards, trigger workflows, or analyze conversation dynamics during the call.

```json
{
  "kind": "TranscriptionData",
  "transcriptionData": {
    "text": "My date of birth is *********.",
    "format": "display",
    "confidence": 0.8726407289505005,
    "offset": 309058340,
    "duration": 31600000,
    "words": [],
    "participantRawID": "4:+917020276722",
    "resultStatus": "Final",
    "sentimentAnalysisResult": {
      "sentiment": "neutral"
    }
  }
}
```

## Handling transcription stream in the web socket server
```csharp
using WebServerApi;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseWebSockets();
app.Map("/ws", async context =>
{
    if (context.WebSockets.IsWebSocketRequest)
    {
        using var webSocket = await context.WebSockets.AcceptWebSocketAsync();
        await HandleWebSocket.Echo(webSocket);
    }
    else
    {
        context.Response.StatusCode = StatusCodes.Status400BadRequest;
    }
});

app.Run();
```

### Updates to your code for the websocket handler
```csharp
using Azure.Communication.CallAutomation;
using System.Net.WebSockets;
using System.Text;

namespace WebServerApi
{
    public class HandleWebSocket
    {
        public static async Task Echo(WebSocket webSocket)
        {
            var buffer = new byte[1024 * 4];
            var receiveResult = await webSocket.ReceiveAsync(
                new ArraySegment(buffer), CancellationToken.None);

            while (!receiveResult.CloseStatus.HasValue)
            {
                string msg = Encoding.UTF8.GetString(buffer, 0, receiveResult.Count);
                var response = StreamingDataParser.Parse(msg);

                if (response != null)
                {
                    if (response is AudioMetadata audioMetadata)
                    {
                        Console.WriteLine("***************************************************************************************");
                        Console.WriteLine("MEDIA SUBSCRIPTION ID-->"+audioMetadata.MediaSubscriptionId);
                        Console.WriteLine("ENCODING-->"+audioMetadata.Encoding);
                        Console.WriteLine("SAMPLE RATE-->"+audioMetadata.SampleRate);
                        Console.WriteLine("CHANNELS-->"+audioMetadata.Channels);
                        Console.WriteLine("LENGTH-->"+audioMetadata.Length);
                        Console.WriteLine("***************************************************************************************");
                    }
                    if (response is AudioData audioData)
                    {
                        Console.WriteLine("***************************************************************************************");
                        Console.WriteLine("DATA-->"+audioData.Data);
                        Console.WriteLine("TIMESTAMP-->"+audioData.Timestamp);
                        Console.WriteLine("IS SILENT-->"+audioData.IsSilent);
                        Console.WriteLine("***************************************************************************************");
                    }

                    if (response is TranscriptionMetadata transcriptionMetadata)
                    {
                        Console.WriteLine("***************************************************************************************");
                        Console.WriteLine("TRANSCRIPTION SUBSCRIPTION ID-->"+transcriptionMetadata.TranscriptionSubscriptionId);
                        Console.WriteLine("LOCALE-->"+transcriptionMetadata.Locale);
                        Console.WriteLine("CALL CONNECTION ID--?"+transcriptionMetadata.CallConnectionId);
                        Console.WriteLine("CORRELATION ID-->"+transcriptionMetadata.CorrelationId);
                        Console.WriteLine("LOCALES-->" + transcriptionMetadata.Locales);  
                        Console.WriteLine("PII REDACTION OPTIONS ISENABLED-->" + transcriptionMetadata.PiiRedactionOptions?.IsEnabled);  
                        Console.WriteLine("PII REDACTION OPTIONS - REDACTION TYPE-->" + transcriptionMetadata.PiiRedactionOptions?.RedactionType); 
                        Console.WriteLine("***************************************************************************************");
                    }
                    if (response is TranscriptionData transcriptionData)
                    {
                        Console.WriteLine("***************************************************************************************");
                        Console.WriteLine("TEXT-->"+transcriptionData.Text);
                        Console.WriteLine("FORMAT-->"+transcriptionData.Format);
                        Console.WriteLine("OFFSET-->"+transcriptionData.Offset);
                        Console.WriteLine("DURATION-->"+transcriptionData.Duration);
                        Console.WriteLine("PARTICIPANT-->"+transcriptionData.Participant.RawId);
                        Console.WriteLine("CONFIDENCE-->"+transcriptionData.Confidence);
                        Console.WriteLine("SENTIMENT ANALYSIS RESULT-->" + transcriptionData.SentimentAnalysisResult?.Sentiment);

                        foreach (var word in transcriptionData.Words)
                        {
                            Console.WriteLine("TEXT-->"+word.Text);
                            Console.WriteLine("OFFSET-->"+word.Offset);
                            Console.WriteLine("DURATION-->"+word.Duration);
                        }
                        Console.WriteLine("***************************************************************************************");
                    }
                }

                await webSocket.SendAsync(
                    new ArraySegment(buffer, 0, receiveResult.Count),
                    receiveResult.MessageType,
                    receiveResult.EndOfMessage,
                    CancellationToken.None);

                receiveResult = await webSocket.ReceiveAsync(
                    new ArraySegment(buffer), CancellationToken.None);
            }

            await webSocket.CloseAsync(
                receiveResult.CloseStatus.Value,
                receiveResult.CloseStatusDescription,
                CancellationToken.None);
        }
    }
}
```

## Update Transcription
For situations where your application allows users to select their preferred language you may also want to capture the transcription in that language. To do this, Call Automation SDK allows you to update the transcription locale.

```csharp
UpdateTranscriptionOptions updateTranscriptionOptions = new UpdateTranscriptionOptions(locale)
{
OperationContext = "UpdateTranscriptionContext",
//Only add the SpeechRecognitionModelEndpointId if you have a custom speech model you would like to use
SpeechRecognitionModelEndpointId = "YourCustomSpeechRecognitionModelEndpointId"
};

await client.GetCallConnection(callConnectionId).GetCallMedia().UpdateTranscriptionAsync(updateTranscriptionOptions);
```

## Stop Transcription
When your application needs to stop listening for the transcription, you can use the StopTranscription request to let Call Automation know to stop sending transcript data to your web socket.

```csharp
StopTranscriptionOptions stopOptions = new StopTranscriptionOptions()
{
    OperationContext = "stopTranscription"
};

await callMedia.StopTranscriptionAsync(stopOptions);
```



**Applies to: programming-language-java**


## Create a call and provide the transcription details
Define the TranscriptionOptions for ACS to specify when to start the transcription, the locale for transcription, and the web socket connection for sending the transcript.

```java
CallInvite callInvite = new CallInvite(target, caller); 

CallIntelligenceOptions callIntelligenceOptions = new CallIntelligenceOptions()
    .setCognitiveServicesEndpoint(appConfig.getCognitiveServiceEndpoint()); 

TranscriptionOptions transcriptionOptions = new TranscriptionOptions(
    appConfig.getWebSocketUrl(), 
    TranscriptionTransport.WEBSOCKET, 
    "en-US", 
    false,
    "your-endpoint-id-here" // speechRecognitionEndpointId
); 

CreateCallOptions createCallOptions = new CreateCallOptions(callInvite, appConfig.getCallBackUri());
createCallOptions.setCallIntelligenceOptions(callIntelligenceOptions); 
createCallOptions.setTranscriptionOptions(transcriptionOptions); 

Response result = client.createCallWithResponse(createCallOptions, Context.NONE); 
return result.getValue().getCallConnectionProperties().getCallConnectionId(); 
```

## Sentiment Analysis (Preview)
Track the emotional tone of conversations in real time to support customer and agent interactions, and enable supervisors to intervene when necessary. Available in public preview through `createCall`, `answerCall` and `startTranscription`.

### Create a call with Sentiment Analysis enabled 

``` java
CallInvite callInvite = new CallInvite(target, caller);

CallIntelligenceOptions callIntelligenceOptions = new CallIntelligenceOptions()
    .setCognitiveServicesEndpoint(cognitiveServicesEndpoint);

TranscriptionOptions transcriptionOptions = new TranscriptionOptions("en-ES")
    .setTransportUrl(websocketUriHost)
    .setEnableSentimentAnalysis(true) // Enable sentiment analysis
    .setLocales(locales);

CreateCallOptions createCallOptions = new CreateCallOptions(callInvite, callbackUri.toString())
    .setCallIntelligenceOptions(callIntelligenceOptions)
    .setTranscriptionOptions(transcriptionOptions);

// Create call request
Response<CreateCallResult> result = client.createCallWithResponse(createCallOptions, Context.NONE);
```

### Answer a call with Sentiment Analysis enabled 

``` java
TranscriptionOptions transcriptionOptions = new TranscriptionOptions("en-ES")
    .setTransportUrl(websocketUriHost)
    .setEnableSentimentAnalysis(true) // Enable sentiment analysis
    .setLocales(locales);

AnswerCallOptions answerCallOptions = new AnswerCallOptions(data.getString("incomingCallContext"), callbackUri)
    .setCallIntelligenceOptions(callIntelligenceOptions)
    .setTranscriptionOptions(transcriptionOptions);

// Answer call request
Response<AnswerCallResult> answerCallResponse = client.answerCallWithResponse(answerCallOptions, Context.NONE);
```

## PII Redaction (Preview)
Automatically identify and mask sensitive information—such as names, addresses, or identification numbers—to ensure privacy and regulatory compliance. Available in `createCall`, `answerCall` and `startTranscription`.

### Answer a call with PII Redaction enabled 
``` java
PiiRedactionOptions piiRedactionOptions = new PiiRedactionOptions()
    .setEnabled(true)
    .setRedactionType(RedactionType.MASK_WITH_CHARACTER);

TranscriptionOptions transcriptionOptions = new TranscriptionOptions("en-ES")
    .setTransportUrl(websocketUriHost)
    .setPiiRedactionOptions(piiRedactionOptions)
    .setLocales(locales);

AnswerCallOptions answerCallOptions = new AnswerCallOptions(data.getString("incomingCallContext"), callbackUri)
    .setCallIntelligenceOptions(callIntelligenceOptions)
    .setTranscriptionOptions(transcriptionOptions);

// Answer call request
Response<AnswerCallResult> answerCallResponse = client.answerCallWithResponse(answerCallOptions, Context.NONE);
```
>**Note:**
> With PII redaction enabled you’ll only receive the redacted text.  

## Real-time language detection (Preview)
Automatically detect spoken languages to enable natural, human-like communication and eliminate manual language selection. Available in `createCall`, `answerCall` and `startTranscription`.

### Create a call with Real-time language detection enabled

``` java
var transcriptionOptions = new TranscriptionOptions
{
    Locales = new List<string> { "en-US", "fr-FR", "hi-IN" },
};

var createCallOptions = new CreateCallOptions(callInviteOption, new Uri("https://test"))
{
    TranscriptionOptions = transcriptionOptions
};

var createCallResult = await client.CreateCallAsync(createCallOptions);
```

> **Note:**
> To stop language identification after it has started, use the `updateTranscription` API and explicitly set the language you want to use for the transcript. This disables automatic language detection and locks transcription to the specified language.

## Connect to a Rooms call and provide transcription details
If you're connecting to an ACS room and want to use transcription, configure the transcription options as follows:

```java
TranscriptionOptions transcriptionOptions = new TranscriptionOptions(
    appConfig.getWebSocketUrl(), 
    TranscriptionTransport.WEBSOCKET, 
    "en-US", 
    false,
    "your-endpoint-id-here" // speechRecognitionEndpointId
);

ConnectCallOptions connectCallOptions = new ConnectCallOptions(new RoomCallLocator("roomId"), appConfig.getCallBackUri())
    .setCallIntelligenceOptions(
        new CallIntelligenceOptions()
            .setCognitiveServicesEndpoint(appConfig.getCognitiveServiceEndpoint())
    )
    .setTranscriptionOptions(transcriptionOptions);

ConnectCallResult connectCallResult = Objects.requireNonNull(client
    .connectCallWithResponse(connectCallOptions)
    .block())
    .getValue();
```

## Start Transcription
Once you're ready to start the transcription, you can make an explicit call to Call Automation to start transcribing the call.

```java
//Option 1: Start transcription with options
StartTranscriptionOptions transcriptionOptions = new StartTranscriptionOptions()
    .setOperationContext("startMediaStreamingContext"); 

client.getCallConnection(callConnectionId)
    .getCallMedia()
    .startTranscriptionWithResponse(transcriptionOptions, Context.NONE); 

// Alternative: Start transcription without options
// client.getCallConnection(callConnectionId)
//     .getCallMedia()
//     .startTranscription();
```

## Get mid call summaries (Preview)
Enhance your call workflows with real-time summarization. By enabling summarization in your transcription options, ACS can automatically generate concise mid-call recaps—including decisions, action items, and key discussion points—without waiting for the call to end. This helps teams stay aligned and enables faster follow-ups during live conversations.

``` java
SummarizationOptions summarizationOptions = new SummarizationOptions()
    .setEnableEndCallSummary(true)
    .setLocale("en-US");

TranscriptionOptions transcriptionOptions = new TranscriptionOptions("en-ES")
    .setTransportUrl(websocketUriHost)
    .setSummarizationOptions(summarizationOptions)
    .setLocales(locales);

AnswerCallOptions answerCallOptions = new AnswerCallOptions(data.getString("incomingCallContext"), callbackUri)
    .setCallIntelligenceOptions(callIntelligenceOptions)
    .setTranscriptionOptions(transcriptionOptions);

// Answer call request
Response<AnswerCallResult> answerCallResponse = client.answerCallWithResponse(answerCallOptions, Context.NONE);
```

### Additional Headers:
The Correlation ID and Call Connection ID are now included in the WebSocket headers for improved traceability `x-ms-call-correlation-id` and `x-ms-call-connection-id`.

## Receiving Transcription Stream
When transcription starts, your websocket receives the transcription metadata payload as the first packet.

```json
{
    "kind": "TranscriptionMetadata",
    "transcriptionMetadata": {
        "subscriptionId": "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e",
        "locale": "en-us",
        "callConnectionId": "65c57654=f12c-4975-92a4-21668e61dd98",
        "correlationId": "65c57654=f12c-4975-92a4-21668e61dd98"
    }
}
```

## Receiving Transcription data
After the metadata, the next packets your web socket receives will be TranscriptionData for the transcribed audio.

```json
{
    "kind": "TranscriptionData",
    "transcriptionData": {
        "text": "Testing transcription.",
        "format": "display",
        "confidence": 0.695223331451416,
        "offset": 2516998782481234400,
        "words": [
            {
                "text": "testing",
                "offset": 2516998782481234400
            },
            {
                "text": "testing",
                "offset": 2516998782481234400
            }
        ],
        "participantRawID": "8:acs:",
        "resultStatus": "Final"
    }
}
```

## Receiving Transcription Stream with AI capabilities enabled (Preview)
When transcription is enabled during a call, Azure Communication Services emits metadata that describes the configuration and context of the transcription session. This includes details such as the locale, call connection ID, sentiment analysis settings, and PII redaction preferences. Developers can use this payload to verify transcription setup, audit configurations, or troubleshoot issues related to real-time transcription features enhanced by AI.

``` json
{
  "kind": "TranscriptionMetadata",
  "transcriptionMetadata": {
    "subscriptionId": "863b5e55-de0d-4fc3-8e58-2d68e976b5ad",
    "locale": "en-US",
    "callConnectionId": "02009180-9dc2-429b-a3eb-d544b7b6a0e1",
    "correlationId": "62c8215b-5276-4d3c-bb6d-06a1b114651b",
    "speechModelEndpointId": null,
    "locales": [],
    "enableSentimentAnalysis": true,
    "piiRedactionOptions": {
      "enable": true,
      "redactionType": "MaskWithCharacter"
    }
  }
}
```

## Receiving Transcription data with AI capabilities enabled (Preview)
After the initial metadata packet, your WebSocket connection will begin receiving `TranscriptionData` events for each segment of transcribed audio. These packets include the transcribed text, confidence score, timing information, and—if enabled—sentiment analysis and PII redaction. This data can be used to build real-time dashboards, trigger workflows, or analyze conversation dynamics during the call.

```json
{
  "kind": "TranscriptionData",
  "transcriptionData": {
    "text": "My date of birth is *********.",
    "format": "display",
    "confidence": 0.8726407289505005,
    "offset": 309058340,
    "duration": 31600000,
    "words": [],
    "participantRawID": "4:+917020276722",
    "resultStatus": "Final",
    "sentimentAnalysisResult": {
      "sentiment": "neutral"
    }
  }
}
```

## Handling transcription stream in the web socket server
```java
package com.example;

import org.glassfish.tyrus.server.Server;

import java.io.BufferedReader;
import java.io.InputStreamReader;

public class App {
    public static void main(String[] args) {
        Server server = new Server("localhost", 8081, "/ws", null, WebSocketServer.class);

        try {
            server.start();
            System.out.println("Web socket running on port 8081...");
            System.out.println("wss://localhost:8081/ws/server");
            BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
            reader.readLine();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            server.stop();
        }
    }
}
```

### Updates to your code for the websocket handler
```java
package com.example;

import javax.websocket.OnMessage;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.azure.communication.callautomation.models.streaming.StreamingData;
import com.azure.communication.callautomation.models.streaming.StreamingDataParser;
import com.azure.communication.callautomation.models.streaming.media.AudioData;
import com.azure.communication.callautomation.models.streaming.media.AudioMetadata;
import com.azure.communication.callautomation.models.streaming.transcription.TranscriptionData;
import com.azure.communication.callautomation.models.streaming.transcription.TranscriptionMetadata;
import com.azure.communication.callautomation.models.streaming.transcription.Word;

@ServerEndpoint("/server")
public class WebSocketServer {
    @OnMessage
    public void onMessage(String message, Session session) {
        StreamingData data = StreamingDataParser.parse(message);

        if (data instanceof AudioMetadata) {
            AudioMetadata audioMetaData = (AudioMetadata) data;
            System.out.println("----------------------------------------------------------------");
            System.out.println("SUBSCRIPTION ID: --> " + audioMetaData.getMediaSubscriptionId());
            System.out.println("ENCODING: --> " + audioMetaData.getEncoding());
            System.out.println("SAMPLE RATE: --> " + audioMetaData.getSampleRate());
            System.out.println("CHANNELS: --> " + audioMetaData.getChannels());
            System.out.println("LENGTH: --> " + audioMetaData.getLength());
            System.out.println("----------------------------------------------------------------");
        }

        if (data instanceof AudioData) {
            AudioData audioData = (AudioData) data;
            System.out.println("----------------------------------------------------------------");
            System.out.println("DATA: --> " + audioData.getData());
            System.out.println("TIMESTAMP: --> " + audioData.getTimestamp());
            System.out.println("IS SILENT: --> " + audioData.isSilent());
            System.out.println("----------------------------------------------------------------");
        }

        if (data instanceof TranscriptionMetadata) {
            TranscriptionMetadata transcriptionMetadata = (TranscriptionMetadata) data;
        
            System.out.println("----------------------------------------------------------------");
            System.out.println("TRANSCRIPTION SUBSCRIPTION ID: --> " + transcriptionMetadata.getTranscriptionSubscriptionId());
            System.out.println("LOCALE: --> " + transcriptionMetadata.getLocale());
            System.out.println("CALL CONNECTION ID: --> " + transcriptionMetadata.getCallConnectionId());
            System.out.println("CORRELATION ID: --> " + transcriptionMetadata.getCorrelationId());
        
            // Check for PII Redaction Options locale
            if (transcriptionMetadata.getPiiRedactionOptions() != null &&
                transcriptionMetadata.getPiiRedactionOptions().getLocale() != null) {
                System.out.println("PII Redaction Locale: --> " + transcriptionMetadata.getPiiRedactionOptions().getLocale());
            }
        
            // Check for detected locales
            if (transcriptionMetadata.getLocales() != null) {
                System.out.println("Detected Locales: --> " + transcriptionMetadata.getLocales());
            }
        
            System.out.println("----------------------------------------------------------------");
        }

        if (data instanceof TranscriptionData) {
            TranscriptionData transcriptionData = (TranscriptionData) data;
            System.out.println("----------------------------------------------------------------");
            System.out.println("TEXT: --> " + transcriptionData.getText());
            System.out.println("FORMAT: --> " + transcriptionData.getFormat());
            System.out.println("CONFIDENCE: --> " + transcriptionData.getConfidence());
            System.out.println("OFFSET: --> " + transcriptionData.getOffset());
            System.out.println("DURATION: --> " + transcriptionData.getDuration());
            System.out.println("RESULT STATUS: --> " + transcriptionData.getResultStatus());
            for (Word word : transcriptionData.getWords()) {
                System.out.println("Text: --> " + word.getText());
                System.out.println("Offset: --> " + word.getOffset());
                System.out.println("Duration: --> " + word.getDuration());
            }
            System.out.println("SENTIMENT:-->" + transcriptionData.getSentimentAnalysisResult().getSentiment()); 
            System.out.println("LANGUAGE IDENTIFIED:-->" + transcriptionData.getLanguageIdentified()); 
            System.out.println("----------------------------------------------------------------");
        }
    }
}
```

## Update Transcription
For situations where your application allows users to select their preferred language you may also want to capture the transcription in that language. To do this, Call Automation SDK allows you to update the transcription locale.

```java
UpdateTranscriptionOptions transcriptionOptions = new UpdateTranscriptionOptions()
    .setLocale(newLocale)
    .setOperationContext("transcriptionContext")
    .setSpeechRecognitionEndpointId("your-endpoint-id-here");

client.getCallConnection(callConnectionId)
    .getCallMedia()
    .updateTranscriptionWithResponse(transcriptionOptions, Context.NONE);
```

## Stop Transcription
When your application needs to stop listening for the transcription, you can use the StopTranscription request to let Call Automation know to stop sending transcript data to your web socket.

```java
// Option 1: Stop transcription with options
StopTranscriptionOptions stopTranscriptionOptions = new StopTranscriptionOptions()
    .setOperationContext("stopTranscription");

client.getCallConnection(callConnectionId)
    .getCallMedia()
    .stopTranscriptionWithResponse(stopTranscriptionOptions, Context.NONE);

// Alternative: Stop transcription without options
// client.getCallConnection(callConnectionId)
//     .getCallMedia()
//     .stopTranscription();
```



**Applies to: programming-language-javascript**


## Create a call and provide the transcription details
Define the TranscriptionOptions for ACS to specify when to start the transcription, the locale for transcription, and the web socket connection for sending the transcript.

```javascript
const transcriptionOptions = {
    transportUrl: "",
    transportType: "websocket",
    locale: "en-US",
    startTranscription: false,
    speechRecognitionModelEndpointId: "YOUR_CUSTOM_SPEECH_RECOGNITION_MODEL_ID"
};

const options = {
    callIntelligenceOptions: {
        cognitiveServicesEndpoint: process.env.COGNITIVE_SERVICES_ENDPOINT
    },
    transcriptionOptions: transcriptionOptions
};

console.log("Placing outbound call...");
acsClient.createCall(callInvite, process.env.CALLBACK_URI + "/api/callbacks", options);
```

## Sentiment Analysis (Preview)
Track the emotional tone of conversations in real time to support customer and agent interactions, and enable supervisors to intervene when necessary. Available in public preview through `createCall`, `answerCall` and `startTranscription`.

### Create a call with Sentiment Analysis enabled 

``` javascript
const transcriptionOptions = {
    transportUrl: "",
    transportType: "websocket",
    locale: "en-US",
    startTranscription: false,
    enableSentimentAnalysis: true,
    speechRecognitionModelEndpointId: "YOUR_CUSTOM_SPEECH_RECOGNITION_MODEL_ID"
};

const options = {
    callIntelligenceOptions: {
        cognitiveServicesEndpoint: process.env.COGNITIVE_SERVICES_ENDPOINT
    },
    transcriptionOptions: transcriptionOptions
};

console.log("Placing outbound call...");
acsClient.createCall(callInvite, process.env.CALLBACK_URI + "/api/callbacks", options);
```

### Answer a call with Sentiment Analysis enabled 
``` javascript
const transcriptionOptions: TranscriptionOptions = {
  transportUrl: transportUrl,
  transportType: "websocket",
  startTranscription: true,
  enableSentimentAnalysis: true
};

const answerCallOptions: AnswerCallOptions = {
  callIntelligenceOptions: {
    cognitiveServicesEndpoint: process.env.COGNITIVE_SERVICES_ENDPOINT
  },
  transcriptionOptions: transcriptionOptions,
  enableLoopbackAudio: true
};

await acsClient.answerCall(incomingCallContext, callbackUri, answerCallOptions);
```

## PII Redaction (Preview)
Automatically identify and mask sensitive information—such as names, addresses, or identification numbers—to ensure privacy and regulatory compliance. Available in `createCall`, `answerCall` and `startTranscription`.

### Answer a call with PII Redaction enabled 
``` javascript
const transcriptionOptions: TranscriptionOptions = {
  transportUrl: transportUrl,
  transportType: "websocket",
  startTranscription: true,
  piiRedactionOptions: {
    enable: true,
    redactionType: "maskWithCharacter"
  }
};

const answerCallOptions: AnswerCallOptions = {
  callIntelligenceOptions: {
    cognitiveServicesEndpoint: process.env.COGNITIVE_SERVICES_ENDPOINT
  },
  transcriptionOptions: transcriptionOptions,
  enableLoopbackAudio: true
};

await acsClient.answerCall(incomingCallContext, callbackUri, answerCallOptions);
```
>**Note:**
> With PII redaction enabled you’ll only receive the redacted text.  

## Real-time language detection (Preview)
Automatically detect spoken languages to enable natural, human-like communication and eliminate manual language selection. Available in `createCall`, `answerCall` and `startTranscription`.

### Create a call with Real-time language detection enabled
``` javascript
const transcriptionOptions: TranscriptionOptions = {
  transportUrl: transportUrl,
  transportType: "websocket",
  startTranscription: true,
  locales: ["es-ES", "en-US"]
};

const createCallOptions: CreateCallOptions = {
  callIntelligenceOptions: {
    cognitiveServicesEndpoint: process.env.COGNITIVE_SERVICES_ENDPOINT
  },
  transcriptionOptions: transcriptionOptions,
  operationContext: "CreatPSTNCallContext",
  enableLoopbackAudio: true
};
```

> **Note:**
> To stop language identification after it has started, use the `updateTranscription` API and explicitly set the language you want to use for the transcript. This disables automatic language detection and locks transcription to the specified language.



## Connect to a Rooms call and provide transcription details
If you're connecting to an ACS room and want to use transcription, configure the transcription options as follows:

```javascript
const transcriptionOptions = {
    transportUri: "",
    locale: "en-US",
    transcriptionTransport: "websocket",
    startTranscription: false,
    speechRecognitionModelEndpointId: "YOUR_CUSTOM_SPEECH_RECOGNITION_MODEL_ID"
};

const callIntelligenceOptions = {
    cognitiveServicesEndpoint: process.env.COGNITIVE_SERVICES_ENDPOINT
};

const connectCallOptions = {
    callIntelligenceOptions: callIntelligenceOptions,
    transcriptionOptions: transcriptionOptions
};

const callLocator = {
    id: roomId,
    kind: "roomCallLocator"
};

const connectResult = await client.connectCall(callLocator, callBackUri, connectCallOptions);
```

## Start Transcription
Once you're ready to start the transcription, you can make an explicit call to Call Automation to start transcribing the call.

```javascript
const startTranscriptionOptions = {
    locale: "en-AU",
    operationContext: "startTranscriptionContext"
};

// Start transcription with options
await callMedia.startTranscription(startTranscriptionOptions);

// Alternative: Start transcription without options
// await callMedia.startTranscription();
```

## Get mid call summaries (Preview)
Enhance your call workflows with real-time summarization. By enabling summarization in your transcription options, ACS can automatically generate concise mid-call recaps—including decisions, action items, and key discussion points—without waiting for the call to end. This helps teams stay aligned and enables faster follow-ups during live conversations.

``` javascript
const transcriptionOptions: TranscriptionOptions = {
  transportUrl: transportUrl,
  transportType: "websocket",
  startTranscription: true,
  summarizationOptions: {
    enableEndCallSummary: true,
    locale: "es-ES"
  }
};

const answerCallOptions: AnswerCallOptions = {
  callIntelligenceOptions: {
    cognitiveServicesEndpoint: process.env.COGNITIVE_SERVICES_ENDPOINT
  },
  transcriptionOptions: transcriptionOptions,
  enableLoopbackAudio: true
};

await acsClient.answerCall(incomingCallContext, callbackUri, answerCallOptions);
```

### Additional Headers:
The Correlation ID and Call Connection ID are now included in the WebSocket headers for improved traceability `x-ms-call-correlation-id` and `x-ms-call-connection-id`.

## Receiving Transcription Stream
When transcription starts, your websocket receives the transcription metadata payload as the first packet.

```json
{
    "kind": "TranscriptionMetadata",
    "transcriptionMetadata": {
        "subscriptionId": "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e",
        "locale": "en-us",
        "callConnectionId": "65c57654=f12c-4975-92a4-21668e61dd98",
        "correlationId": "65c57654=f12c-4975-92a4-21668e61dd98"
    }
}
```

## Receiving Transcription Data
After the metadata, the next packets your web socket receives will be TranscriptionData for the transcribed audio.

```json
{
    "kind": "TranscriptionData",
    "transcriptionData": {
        "text": "Testing transcription.",
        "format": "display",
        "confidence": 0.695223331451416,
        "offset": 2516998782481234400,
        "words": [
            {
                "text": "testing",
                "offset": 2516998782481234400
            },
            {
                "text": "testing",
                "offset": 2516998782481234400
            }
        ],
        "participantRawID": "8:acs:",
        "resultStatus": "Final"
    }
}
```

## Receiving Transcription Stream with AI capabilities enabled (Preview)
When transcription is enabled during a call, Azure Communication Services emits metadata that describes the configuration and context of the transcription session. This includes details such as the locale, call connection ID, sentiment analysis settings, and PII redaction preferences. Developers can use this payload to verify transcription setup, audit configurations, or troubleshoot issues related to real-time transcription features enhanced by AI.

``` json
{
  "kind": "TranscriptionMetadata",
  "transcriptionMetadata": {
    "subscriptionId": "863b5e55-de0d-4fc3-8e58-2d68e976b5ad",
    "locale": "en-US",
    "callConnectionId": "02009180-9dc2-429b-a3eb-d544b7b6a0e1",
    "correlationId": "62c8215b-5276-4d3c-bb6d-06a1b114651b",
    "speechModelEndpointId": null,
    "locales": [],
    "enableSentimentAnalysis": true,
    "piiRedactionOptions": {
      "enable": true,
      "redactionType": "MaskWithCharacter"
    }
  }
}
```

## Receiving Transcription data with AI capabilities enabled (Preview)
After the initial metadata packet, your WebSocket connection will begin receiving `TranscriptionData` events for each segment of transcribed audio. These packets include the transcribed text, confidence score, timing information, and—if enabled—sentiment analysis and PII redaction. This data can be used to build real-time dashboards, trigger workflows, or analyze conversation dynamics during the call.

```json
{
  "kind": "TranscriptionData",
  "transcriptionData": {
    "text": "My date of birth is *********.",
    "format": "display",
    "confidence": 0.8726407289505005,
    "offset": 309058340,
    "duration": 31600000,
    "words": [],
    "participantRawID": "4:+917020276722",
    "resultStatus": "Final",
    "sentimentAnalysisResult": {
      "sentiment": "neutral"
    }
  }
}
```


## Handling transcription stream in the web socket server

```javascript
import WebSocket from 'ws';
import { streamingData } from '@azure/communication-call-automation/src/util/streamingDataParser';

const wss = new WebSocket.Server({ port: 8081 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (packetData) => {
    const decoder = new TextDecoder();
    const stringJson = decoder.decode(packetData);
    console.log("STRING JSON =>", stringJson);

    const response = streamingData(packetData);
    const kind = response?.kind;

    if (kind === "TranscriptionMetadata") {
      console.log("--------------------------------------------");
      console.log("Transcription Metadata");
      console.log("CALL CONNECTION ID: -->", response.callConnectionId);
      console.log("CORRELATION ID: -->", response.correlationId);
      console.log("LOCALE: -->", response.locale);
      console.log("SUBSCRIPTION ID: -->", response.subscriptionId);
      console.log("SPEECH MODEL ENDPOINT: -->", response.speechRecognitionModelEndpointId);
      console.log("IS SENTIMENT ANALYSIS ENABLED: -->", response.enableSentimentAnalysis);

      if (response.piiRedactionOptions) {
        console.log("PII REDACTION ENABLED: -->", response.piiRedactionOptions.enable);
        console.log("PII REDACTION TYPE: -->", response.piiRedactionOptions.redactionType);
      }

      if (response.locales) {
        response.locales.forEach((language) => {
          console.log("LOCALE DETECTED: -->", language);
        });
      }

      console.log("--------------------------------------------");
    } else if (kind === "TranscriptionData") {
      console.log("--------------------------------------------");
      console.log("Transcription Data");
      console.log("TEXT: -->", response.text);
      console.log("FORMAT: -->", response.format);
      console.log("CONFIDENCE: -->", response.confidence);
      console.log("OFFSET IN TICKS: -->", response.offsetInTicks);
      console.log("DURATION IN TICKS: -->", response.durationInTicks);
      console.log("RESULT STATE: -->", response.resultState);

      if (response.participant?.phoneNumber) {
        console.log("PARTICIPANT PHONE NUMBER: -->", response.participant.phoneNumber);
      }

      if (response.participant?.communicationUserId) {
        console.log("PARTICIPANT USER ID: -->", response.participant.communicationUserId);
      }

      if (response.words?.length) {
        response.words.forEach((word) => {
          console.log("WORD TEXT: -->", word.text);
          console.log("WORD DURATION IN TICKS: -->", word.durationInTicks);
          console.log("WORD OFFSET IN TICKS: -->", word.offsetInTicks);
        });
      }

      if (response.sentimentAnalysisResult) {
        console.log("SENTIMENT: -->", response.sentimentAnalysisResult.sentiment);
      }

      console.log("LANGUAGE IDENTIFIED: -->", response.languageIdentified);
      console.log("--------------------------------------------");
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running on port 8081');
```

## Update Transcription
For situations where your application allows users to select their preferred language, you may also want to capture the transcription in that language. To do this task, the Call Automation SDK allows you to update the transcription locale.

```javascript
async function updateTranscriptionAsync() {
  const options: UpdateTranscriptionOptions = {
operationContext: "updateTranscriptionContext",
speechRecognitionModelEndpointId: "YOUR_CUSTOM_SPEECH_RECOGNITION_MODEL_ID"
  };
  await acsClient
.getCallConnection(callConnectionId)
.getCallMedia()
.updateTranscription("en-au", options);
}
```

## Stop Transcription
When your application needs to stop listening for the transcription, you can use the StopTranscription request to let Call Automation know to stop sending transcript data to your web socket.

```javascript
const stopTranscriptionOptions = {
    operationContext: "stopTranscriptionContext"
};

// Stop transcription with options
await callMedia.stopTranscription(stopTranscriptionOptions);

// Alternative: Stop transcription without options
// await callMedia.stopTranscription();
```



**Applies to: programming-language-python**


## Create a call and provide the transcription details
Define the TranscriptionOptions for ACS to specify when to start the transcription, the locale for transcription, and the web socket connection for sending the transcript.

```python
transcription_options = TranscriptionOptions(
    transport_url="WEBSOCKET_URI_HOST",
    transport_type=TranscriptionTransportType.WEBSOCKET,
    locale="en-US",
    start_transcription=False,
    #Only add the SpeechRecognitionModelEndpointId if you have a custom speech model you would like to use
    speech_recognition_model_endpoint_id = "YourCustomSpeechRecognitionModelEndpointId"
);
)

call_connection_properties = call_automation_client.create_call(
    target_participant,
    CALLBACK_EVENTS_URI,
    cognitive_services_endpoint=COGNITIVE_SERVICES_ENDPOINT,
    source_caller_id_number=source_caller,
    transcription=transcription_options
)
```

## Sentiment Analysis (Preview)
Track the emotional tone of conversations in real time to support customer and agent interactions, and enable supervisors to intervene when necessary. Available in public preview through `createCall`, `answerCall` and `startTranscription`.

### Create a call with Sentiment Analysis enabled 

``` python
transcription_options = TranscriptionOptions(
    transport_url=self.transport_url,
    transport_type=StreamingTransportType.WEBSOCKET,
    locale="en-US",
    start_transcription=False,
    enable_sentiment_analysis=True
)

call_connection_properties = await call_automation_client.create_call(
    target_participant=[target_participant],
    callback_url=CALLBACK_EVENTS_URI,
    cognitive_services_endpoint=COGNITIVE_SERVICES_ENDPOINT,
    source_caller_id_number=source_caller,
    transcription=transcription_options
)

```

### Answer a call with Sentiment Analysis enabled 
``` python
transcription_options = TranscriptionOptions(
    transport_url=self.transport_url,
    transport_type=StreamingTransportType.WEBSOCKET,
    locale="en-US",
    start_transcription=False,
    enable_sentiment_analysis=True
)

answer_call_result = await call_automation_client.answer_call(
    incoming_call_context=incoming_call_context,
    transcription=transcription_options,
    cognitive_services_endpoint=COGNITIVE_SERVICES_ENDPOINT,
    callback_url=callback_uri,
    enable_loopback_audio=True,
    operation_context="answerCallContext"
)
```

## PII Redaction (Preview)
Automatically identify and mask sensitive information—such as names, addresses, or identification numbers—to ensure privacy and regulatory compliance. Available in `createCall`, `answerCall` and `startTranscription`.

### Answer a call with PII Redaction enabled 
``` python
transcription_options = TranscriptionOptions(
    transport_url=self.transport_url,
    transport_type=StreamingTransportType.WEBSOCKET,
    locale=["en-US", "es-ES"],
    start_transcription=False,
    pii_redaction=PiiRedactionOptions(
        enable=True,
        redaction_type=RedactionType.MASK_WITH_CHARACTER
    )
)

answer_call_result = await call_automation_client.answer_call(
    incoming_call_context=incoming_call_context,
    transcription=transcription_options,
    cognitive_services_endpoint=COGNITIVE_SERVICES_ENDPOINT,
    callback_url=callback_uri,
    enable_loopback_audio=True,
    operation_context="answerCallContext"
)
```
>**Note:**
> With PII redaction enabled you’ll only receive the redacted text.  

## Real-time language detection (Preview)
Automatically detect spoken languages to enable natural, human-like communication and eliminate manual language selection. Available in `createCall`, `answerCall` and `startTranscription`.

### Create a call with Real-time language detection enabled
``` python
transcription_options = TranscriptionOptions(
    transport_url=self.transport_url,
    transport_type=StreamingTransportType.WEBSOCKET,
    locale=["en-US", "es-ES","hi-IN"],
    start_transcription=False,
    enable_sentiment_analysis=True,
)

call_connection_properties = await call_automation_client.create_call(
    target_participant=[target_participant],
    callback_url=CALLBACK_EVENTS_URI,
    cognitive_services_endpoint=COGNITIVE_SERVICES_ENDPOINT,
    source_caller_id_number=source_caller,
    transcription=transcription_options
)
```

> **Note:**
> To stop language identification after it has started, use the `updateTranscription` API and explicitly set the language you want to use for the transcript. This disables automatic language detection and locks transcription to the specified language.


## Connect to a Rooms call and provide transcription details
If you're connecting to an ACS room and want to use transcription, configure the transcription options as follows:

```python
transcription_options = TranscriptionOptions(
    transport_url="",
    transport_type=TranscriptionTransportType.WEBSOCKET,
    locale="en-US",
    start_transcription=False,
    #Only add the SpeechRecognitionModelEndpointId if you have a custom speech model you would like to use
    speech_recognition_model_endpoint_id = "YourCustomSpeechRecognitionModelEndpointId"
)

connect_result = client.connect_call(
    room_id="roomid",
    CALLBACK_EVENTS_URI,
    cognitive_services_endpoint=COGNITIVE_SERVICES_ENDPOINT,
    operation_context="connectCallContext",
    transcription=transcription_options
)
```

## Start Transcription
Once you're ready to start the transcription, you can make an explicit call to Call Automation to start transcribing the call.

```python
# Start transcription without options
call_connection_client.start_transcription()

# Option 1: Start transcription with locale and operation context
# call_connection_client.start_transcription(locale="en-AU", operation_context="startTranscriptionContext")

# Option 2: Start transcription with operation context
# call_connection_client.start_transcription(operation_context="startTranscriptionContext")
```

## Get mid call summaries (Preview)
Enhance your call workflows with real-time summarization. By enabling summarization in your transcription options, ACS can automatically generate concise mid-call recaps—including decisions, action items, and key discussion points—without waiting for the call to end. This helps teams stay aligned and enables faster follow-ups during live conversations.

``` python
transcription_options = TranscriptionOptions(
    transport_url=self.transport_url,
    transport_type=StreamingTransportType.WEBSOCKET,
    locale="en-US",
    start_transcription=False,
    summarization=SummarizationOptions(
        enable_end_call_summary=True,
        locale="en-US"
    )
)

answer_call_result = await call_automation_client.answer_call(
    incoming_call_context=incoming_call_context,
    transcription=transcription_options,
    cognitive_services_endpoint=COGNITIVE_SERVICES_ENDPOINT,
    callback_url=callback_uri,
    enable_loopback_audio=True,
    operation_context="answerCallContext"
)


await call_connection_client.summarize_call(
    operation_context=self.operation_context,
    operation_callback_url=self.operation_callback_url,
    summarization=transcription_options.summarization
)

```

### Additional Headers:
The Correlation ID and Call Connection ID are now included in the WebSocket headers for improved traceability `x-ms-call-correlation-id` and `x-ms-call-connection-id`.

## Receiving Transcription Stream
When transcription starts, your websocket receives the transcription metadata payload as the first packet.

```json
{
    "kind": "TranscriptionMetadata",
    "transcriptionMetadata": {
        "subscriptionId": "aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e",
        "locale": "en-us",
        "callConnectionId": "65c57654=f12c-4975-92a4-21668e61dd98",
        "correlationId": "65c57654=f12c-4975-92a4-21668e61dd98"
    }
}
```

## Receiving Transcription Data
After the metadata, the next packets your websocket receives will be TranscriptionData for the transcribed audio.

```json
{
    "kind": "TranscriptionData",
    "transcriptionData": {
        "text": "Testing transcription.",
        "format": "display",
        "confidence": 0.695223331451416,
        "offset": 2516998782481234400,
        "words": [
            {
                "text": "testing",
                "offset": 2516998782481234400
            },
            {
                "text": "testing",
                "offset": 2516998782481234400
            }
        ],
        "participantRawID": "8:acs:",
        "resultStatus": "Final"
    }
}
```

## Receiving Transcription Stream with AI capabilities enabled (Preview)
When transcription is enabled during a call, Azure Communication Services emits metadata that describes the configuration and context of the transcription session. This includes details such as the locale, call connection ID, sentiment analysis settings, and PII redaction preferences. Developers can use this payload to verify transcription setup, audit configurations, or troubleshoot issues related to real-time transcription features enhanced by AI.

``` json
{
  "kind": "TranscriptionMetadata",
  "transcriptionMetadata": {
    "subscriptionId": "863b5e55-de0d-4fc3-8e58-2d68e976b5ad",
    "locale": "en-US",
    "callConnectionId": "02009180-9dc2-429b-a3eb-d544b7b6a0e1",
    "correlationId": "62c8215b-5276-4d3c-bb6d-06a1b114651b",
    "speechModelEndpointId": null,
    "locales": [],
    "enableSentimentAnalysis": true,
    "piiRedactionOptions": {
      "enable": true,
      "redactionType": "MaskWithCharacter"
    }
  }
}
```

## Receiving Transcription data with AI capabilities enabled (Preview)
After the initial metadata packet, your WebSocket connection will begin receiving `TranscriptionData` events for each segment of transcribed audio. These packets include the transcribed text, confidence score, timing information, and—if enabled—sentiment analysis and PII redaction. This data can be used to build real-time dashboards, trigger workflows, or analyze conversation dynamics during the call.

```json
{
  "kind": "TranscriptionData",
  "transcriptionData": {
    "text": "My date of birth is *********.",
    "format": "display",
    "confidence": 0.8726407289505005,
    "offset": 309058340,
    "duration": 31600000,
    "words": [],
    "participantRawID": "4:+917020276722",
    "resultStatus": "Final",
    "sentimentAnalysisResult": {
      "sentiment": "neutral"
    }
  }
}
```

## Handling transcription stream in the web socket server

```python
import asyncio
import json
import websockets
from azure.communication.callautomation._shared.models import identifier_from_raw_id

async def handle_client(websocket, path):
    print("Client connected")
    try:
        async for message in websocket:
            json_object = json.loads(message)
            kind = json_object['kind']
            if kind == 'TranscriptionMetadata':
                print("Transcription metadata")
                print("-------------------------")
                print("Subscription ID:", json_object['transcriptionMetadata']['subscriptionId'])
                print("Locale:", json_object['transcriptionMetadata']['locale'])
                print("Call Connection ID:", json_object['transcriptionMetadata']['callConnectionId'])
                print("Correlation ID:", json_object['transcriptionMetadata']['correlationId'])
                print("Locales:", json_object['transcriptionMetadata']['locales']) 
                print("PII Redaction Options:", json_object['transcriptionMetadata']['piiRedactionOptions']) 
            if kind == 'TranscriptionData':
                participant = identifier_from_raw_id(json_object['transcriptionData']['participantRawID'])
                word_data_list = json_object['transcriptionData']['words']
                print("Transcription data")
                print("-------------------------")
                print("Text:", json_object['transcriptionData']['text'])
                print("Format:", json_object['transcriptionData']['format'])
                print("Confidence:", json_object['transcriptionData']['confidence'])
                print("Offset:", json_object['transcriptionData']['offset'])
                print("Duration:", json_object['transcriptionData']['duration'])
                print("Participant:", participant.raw_id)
                print("Result Status:", json_object['transcriptionData']['resultStatus']) 
                print("Sentiment Analysis Result:", json_object['transcriptionData']['sentimentAnalysisResult']) 
                print("Result Status:", json_object['transcriptionData']['resultStatus'])
                for word in word_data_list:
                    print("Word:", word['text'])
                    print("Offset:", word['offset'])
                    print("Duration:", word['duration'])
            
    except websockets.exceptions.ConnectionClosedOK:
        print("Client disconnected")
    except websockets.exceptions.ConnectionClosedError as e:
        print("Connection closed with error: %s", e)
    except Exception as e:
        print("Unexpected error: %s", e)

start_server = websockets.serve(handle_client, "localhost", 8081)

print('WebSocket server running on port 8081')

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
```

## Update Transcription
For situations where your application allows users to select their preferred language, you may also want to capture the transcription in that language. To do this task, the Call Automation SDK allows you to update the transcription locale.

```python
await call_automation_client.get_call_connection(
    call_connection_id=call_connection_id
).update_transcription(
    operation_context="UpdateTranscriptionContext",
    locale="en-au",
    #Only add the SpeechRecognitionModelEndpointId if you have a custom speech model you would like to use
    speech_recognition_model_endpoint_id = "YourCustomSpeechRecognitionModelEndpointId"
)
```

## Stop Transcription
When your application needs to stop listening for the transcription, you can use the StopTranscription request to let Call Automation know to stop sending transcript data to your web socket.

```python
# Stop transcription without options
call_connection_client.stop_transcription()

# Alternative: Stop transcription with operation context
# call_connection_client.stop_transcription(operation_context="stopTranscriptionContext")
```



## Event codes

| Event | code | subcode | Message |
| --- | --- | --- | --- |
| TranscriptionStarted | 200 | 0 | Action completed successfully. |
| TranscriptionStopped | 200 | 0 | Action completed successfully. |
| TranscriptionUpdated | 200 | 0 | Action completed successfully. |
| TranscriptionFailed | 400 | 8581 | Action failed, StreamUrl isn't valid. |
| TranscriptionFailed | 400 | 8565 | Action failed due to a bad request to Cognitive Services. Check your input parameters. |
| TranscriptionFailed | 400 | 8565 | Action failed due to a request to Cognitive Services timing out. Try again later or check for any issues with the service. |
| TranscriptionFailed | 400 | 8605 | Custom speech recognition model for Transcription is not supported. |
| TranscriptionFailed | 400 | 8523 | Invalid Request, locale is missing. |
| TranscriptionFailed | 400 | 8523 | Invalid Request, only locales that contain region information are supported. |
| TranscriptionFailed | 405 | 8520 | Transcription functionality is not supported at this time. |
| TranscriptionFailed | 405 | 8520 | UpdateTranscription is not supported for connection created with Connect interface. |
| TranscriptionFailed | 400 | 8528 | Action is invalid, call already terminated. |
| TranscriptionFailed | 405 | 8520 | Update transcription functionality is not supported at this time. |
| TranscriptionFailed | 405 | 8522 | Request not allowed when Transcription url not set during call setup. |
| TranscriptionFailed | 405 | 8522 | Request not allowed when Cognitive Service Configuration not set during call setup. |
| TranscriptionFailed | 400 | 8501 | Action is invalid when call is not in Established state. |
| TranscriptionFailed | 401 | 8565 | Action failed due to a Cognitive Services authentication error. Check your authorization input and ensure it's correct. |
| TranscriptionFailed | 403 | 8565 | Action failed due to a forbidden request to Cognitive Services. Check your subscription status and ensure it's active. |
| TranscriptionFailed | 429 | 8565 | Action failed, requests exceeded the number of allowed concurrent requests for the cognitive services subscription. |
| TranscriptionFailed | 500 | 8578 | Action failed, not able to establish WebSocket connection. |
| TranscriptionFailed | 500 | 8580 | Action failed, transcription service was shut down. |
| TranscriptionFailed | 500 | 8579 | Action failed, transcription was canceled. |
| TranscriptionFailed | 500 | 9999 | Unknown internal server error. |


## Known issues
* For 1:1 calls with ACS users using Client SDKs startTranscription = True isn't currently supported.
