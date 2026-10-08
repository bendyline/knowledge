---
title: Audio streaming quickstart
titleSuffix: An Azure Communication Services quickstart document
description: Provides a quick start for developers to get audio streams through audio streaming APIs from Azure Communication Services calls.
author: henikaraa
ms.service: azure-communication-services
ms.topic: include
ms.date: 7/15/2024
ms.author: henikaraa
ms.custom: 
services: azure-communication-services
zone_pivot_groups: acs-js-csharp-java-python
---

# Quickstart: Server-side Audio Streaming


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Get started with using audio streams through Azure Communication Services Audio Streaming API. This quickstart assumes you're already familiar with Call Automation APIs to build an automated call routing solution. 

**Applies to: programming-language-csharp**


## Prerequisites
- An Azure account with an active subscription, for details see [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- An Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp).
- A new web service application created using the [Call Automation SDK](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md).
- The latest [.NET library](https://dotnet.microsoft.com/download/dotnet-core) for your operating system.
- A websocket server that can send and receive media streams.

## Set up a websocket server
Azure Communication Services requires your server application to set up a WebSocket server to stream audio in real-time. WebSocket is a standardized protocol that provides a full-duplex communication channel over a single TCP connection. 

You can review documentation [here](https://azure.microsoft.com/blog/introduction-to-websockets-on-windows-azure-web-sites/) to learn more about WebSockets and how to use them.

## Receiving and sending audio streaming data
There are multiple ways to start receiving audio stream, which can be configured using the `startMediaStreaming` flag in the `mediaStreamingOptions` setup. You can also specify the desired sample rate used for receiving or sending audio data using the `audioFormat` parameter. Currently supported formats are PCM 24K mono and PCM 16K mono, with the default being PCM 16K mono.

To enable bidirectional audio streaming, where you're sending audio data into the call, you can enable the `EnableBidirectional` flag. For more details, refer to the [API specifications](https://learn.microsoft.com/rest/api/communication/callautomation/answer-call/answer-call?view=rest-communication-callautomation-2024-06-15-preview\&preserve-view=true\&tabs=HTTP#mediastreamingoptions).

### Start streaming audio to your webserver at time of answering the call
Enable automatic audio streaming when the call is established by setting the flag `startMediaStreaming: true`.
 
This setting ensures that audio streaming starts automatically as soon as the call is connected.

``` C#
MediaStreamingOptions mediaStreamingOptions = new MediaStreamingOptions(MediaStreamingAudioChannel.Unmixed);
 mediaStreamingOptions.TransportUri = new Uri(websocketUri);
 mediaStreamingOptions.EnableBidirectional = true;
 mediaStreamingOptions.AudioFormat = AudioFormat.Pcm24KMono;
 mediaStreamingOptions.EnableDtmfTones = true;
  
var options = new AnswerCallOptions(incomingCallContext, callbackUri) {
  MediaStreamingOptions = mediaStreamingOptions,
};

AnswerCallResult answerCallResult = await client.AnswerCallAsync(options);
```

When Azure Communication Services receives the URL for your WebSocket server, it establishes a connection to it. Once the connection is successfully made, streaming is initiated.


### Start streaming audio to your webserver while a call is in progress
To start media streaming during the call, you can use the API. To do so, set the `startMediaStreaming` parameter to `false` (which is the default), and later in the call, you can use the start API to enable media streaming.

``` C#
MediaStreamingOptions mediaStreamingOptions = new MediaStreamingOptions(MediaStreamingAudioChannel.Unmixed);
 mediaStreamingOptions.TransportUri = new Uri(websocketUri);
 mediaStreamingOptions.EnableBidirectional = true;
 mediaStreamingOptions.AudioFormat = AudioFormat.Pcm24KMono;
 mediaStreamingOptions.EnableDtmfTones = true;

var options = new AnswerCallOptions(incomingCallContext, callbackUri) {
  MediaStreamingOptions = mediaStreamingOptions,
};

AnswerCallResult answerCallResult = await client.AnswerCallAsync(options);

Start media streaming via API call
StartMediaStreamingOptions options = new StartMediaStreamingOptions() {
  OperationContext = "startMediaStreamingContext",
  OperationCallbackUri = eventCallbackUri
};

await callMedia.StartMediaStreamingAsync(options);
```


## Stop audio streaming
To stop receiving audio streams during a call, you can use the **Stop streaming API**. This allows you to stop the audio streaming at any point in the call. There are two ways that audio streaming can be stopped;
- **Triggering the Stop streaming API:** Use the API to stop receiving audio streaming data while the call is still active.
- **Automatic stop on call disconnect:** Audio streaming automatically stops when the call is disconnected.

``` C#
StopMediaStreamingOptions options = new StopMediaStreamingOptions() {
  OperationContext = "stopMediaStreamingContext",
  OperationCallbackUri = eventCallbackUri
};

await callMedia.StopMediaStreamingAsync(options);
```

## Handling audio streams in your websocket server
This sample demonstrates how to listen to audio streams using your websocket server.

``` C#
private async Task StartReceivingFromAcsMediaWebSocket(Websocket websocket) {

  while (webSocket.State == WebSocketState.Open || webSocket.State == WebSocketState.Closed) {
    byte[] receiveBuffer = new byte[2048];
    WebSocketReceiveResult receiveResult = await webSocket.ReceiveAsync(
      new ArraySegment < byte > (receiveBuffer));

    if (receiveResult.MessageType != WebSocketMessageType.Close) {
      string data = Encoding.UTF8.GetString(receiveBuffer).TrimEnd('\0');
      var input = StreamingData.Parse(data);
      if (input is AudioData audioData) {
        // Add your code here to process the received audio chunk
      }
    }
  }
}
```

The first packet you receive contains metadata about the stream, including audio settings such as encoding, sample rate, and other configuration details.

### Additional Headers
The Correlation ID and Call Connection ID are now included in the WebSocket headers for improved traceability `x-ms-call-correlation-id` and `x-ms-call-connection-id`. These are sent when Azure Communication Services tries to connect to your endpoint.

``` json
{
  "kind": "AudioMetadata",
  "audioMetadata": {
    "subscriptionId": "89e8cb59-b991-48b0-b154-1db84f16a077",
    "encoding": "PCM",
    "sampleRate": 16000,
    "channels": 1,
    "length": 640
  }
}
```

After sending the metadata packet, Azure Communication Services (ACS) will begin streaming audio media to your WebSocket server.

``` json
{
  "kind": "AudioData",
  "audioData": {
    "timestamp": "2024-11-15T19:16:12.925Z",
    "participantRawID": "8:acs:3d20e1de-0f28-41c5…",
    "data": "5ADwAOMA6AD0A…",
    "silent": false
  }
}
```

#### DTMF example 
When DTMF is enabled Azure Communication Services sends a `DtmfData` type.

``` json
{
  "kind": "DtmfData",
  "dtmfData": {
    "data": "3"
  }
}
```

## Sending audio streaming data to Azure Communication Services
If bidirectional streaming is enabled using the `EnableBidirectional` flag in the `MediaStreamingOptions`, you can stream audio data back to Azure Communication Services, which plays the audio into the call.

Once Azure Communication Services begins streaming audio to your WebSocket server, you can relay the audio to your AI services. After your AI service processes the audio content, you can stream the audio back to the ongoing call in Azure Communication Services.

The example demonstrates how another service, such as Azure OpenAI or other voice-based Large Language Models, processes and transmits the audio data back into the call.

``` C#
var audioData = OutStreamingData.GetAudioDataForOutbound(audioData)),
byte[] jsonBytes = Encoding.UTF8.GetBytes(audioData);

// Write your logic to send the PCM audio chunk over the WebSocket
// Example of how to send audio data over the WebSocket
await m_webSocket.SendAsync(new ArraySegment < byte > (jsonBytes), WebSocketMessageType.Text, endOfMessage: true, CancellationToken.None);
```

You can also control the playback of audio in the call when streaming back to Azure Communication Services, based on your logic or business flow. For example, when voice activity is detected and you want to stop the queued up audio, you can send a stop message via the WebSocket to stop the audio from playing in the call.

``` C#
var stopData = OutStreamingData.GetStopAudioForOutbound();
byte[] jsonBytes = Encoding.UTF8.GetBytes(stopData);

// Write your logic to send stop data to ACS over the WebSocket
// Example of how to send stop data over the WebSocket
await m_webSocket.SendAsync(new ArraySegment < byte > (jsonBytes), WebSocketMessageType.Text, endOfMessage: true, CancellationToken.None);
```








**Applies to: programming-language-java**


## Prerequisites

- Azure account with an active subscription, for details see [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- An Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp).
- A new web service application created using the [Call Automation SDK](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md).
- [Java Development Kit](https://learn.microsoft.com/java/azure/jdk/?preserve-view=true\&view=azure-java-stable) version 17 or above.
- [Apache Maven](https://maven.apache.org/download.cgi).

## Set up a websocket server
Azure Communication Services requires your server application to set up a WebSocket server to stream audio in real-time. WebSocket is a standardized protocol that provides a full-duplex communication channel over a single TCP connection. 

You can review documentation [here](https://azure.microsoft.com/blog/introduction-to-websockets-on-windows-azure-web-sites/) to learn more about WebSockets and how to use them.

## Receiving and sending audio streaming data
There are multiple ways to start receiving audio stream, which can be configured using the `startMediaStreaming` flag in the `mediaStreamingOptions` setup. You can also specify the desired sample rate used for receiving or sending audio data using the `audioFormat` parameter. Currently supported formats are PCM 24K mono and PCM 16K mono, with the default being PCM 16K mono.

To enable bidirectional audio streaming, where you're sending audio data into the call, you can enable the `EnableBidirectional` flag. For more details, refer to the [API specifications](https://learn.microsoft.com/rest/api/communication/callautomation/answer-call/answer-call?view=rest-communication-callautomation-2024-06-15-preview\&preserve-view=true\&tabs=HTTP#mediastreamingoptions).

### Start streaming audio to your webserver at time of answering the call
Enable automatic audio streaming when the call is established by setting the flag `startMediaStreaming: true`.
 
This setting ensures that audio streaming starts automatically as soon as the call is connected.

``` Java
MediaStreamingOptions mediaStreamingOptions = new MediaStreamingOptions(appConfig.getTransportUrl(), MediaStreamingTransport.WEBSOCKET, MediaStreamingContent.AUDIO, MediaStreamingAudioChannel.MIXED, true).setEnableBidirectional(true).setAudioFormat(AudioFormat.PCM_24K_MONO);
options = new AnswerCallOptions(data.getString(INCOMING_CALL_CONTEXT), callbackUri).setCallIntelligenceOptions(callIntelligenceOptions).setMediaStreamingOptions(mediaStreamingOptions);
Response answerCallResponse = client.answerCallWithResponse(options, Context.NONE);
```
When Azure Communication Services receives the URL for your WebSocket server, it establishes a connection to it. Once the connection is successfully made, streaming is initiated.


### Start streaming audio to your webserver while a call is in progress
To start media streaming during the call, you can use the API. To do so, set the `startMediaStreaming` parameter to `false` (which is the default), and later in the call, you can use the start API to enable media streaming.

``` Java 
MediaStreamingOptions mediaStreamingOptions = new MediaStreamingOptions(MediaStreamingAudioChannel.UNMIXED);
mediaStreamingOptions.setTransportUrl(appConfig.getTransportUrl());
mediaStreamingOptions.setStartMediaStreaming(true);
mediaStreamingOptions.setEnableDtmfTones(true); // Allow receiving DTMF tones
mediaStreamingOptions.setEnableBidirectional(true);
mediaStreamingOptions.setAudioFormat(AudioFormat.PCM_24K_MONO);

options = new AnswerCallOptions(data.getString(INCOMING_CALL_CONTEXT), callbackUri)
    .setCallIntelligenceOptions(callIntelligenceOptions)
    .setMediaStreamingOptions(mediaStreamingOptions);

Response answerCallResponse = client.answerCallWithResponse(options, Context.NONE);

StartMediaStreamingOptions mediaStreamingOptions = new StartMediaStreamingOptions();
mediaStreamingOptions.setOperationContext("StartMediaStreamingContext");

client.getCallConnection(callConnectionId)
      .getCallMedia()
      .startMediaStreamingWithResponse(mediaStreamingOptions, Context.NONE);    
```

## Stop audio streaming
To stop receiving audio streams during a call, you can use the **Stop streaming API**. This allows you to stop the audio streaming at any point in the call. There are two ways that audio streaming can be stopped;
- **Triggering the Stop streaming API:** Use the API to stop receiving audio streaming data while the call is still active.
- **Automatic stop on call disconnect:** Audio streaming automatically stops when the call is disconnected.

``` Java
StopMediaStreamingOptions stopOptions = new StopMediaStreamingOptions();
stopOptions.setOperationContext("StopMediaStreamingContext");

client.getCallConnection(callConnectionId)
      .getCallMedia()
      .stopMediaStreamingWithResponse(stopOptions, Context.NONE);
```

## Handling audio streams in your websocket server
This sample demonstrates how to listen to audio streams using your websocket server.

``` Java
@OnMessage
public void onMessage(String message, Session session) {
  System.out.println("Received message: " + message);
  var parsedData = StreamingData.parse(message);
  if (parsedData instanceof AudioData) {
    var audioData = (AudioData) parsedData;
    sendAudioData(session, audioData.getData());
  }
}
```

The first packet you receive contains metadata about the stream, including audio settings such as encoding, sample rate, and other configuration details.

### Additional Headers
The Correlation ID and Call Connection ID are now included in the WebSocket headers for improved traceability `x-ms-call-correlation-id` and `x-ms-call-connection-id`. These are sent when Azure Communication Services tries to connect to your endpoint.

``` json
{
  "kind": "AudioMetadata",
  "audioMetadata": {
    "subscriptionId": "89e8cb59-b991-48b0-b154-1db84f16a077",
    "encoding": "PCM",
    "sampleRate": 16000,
    "channels": 1,
    "length": 640
  }
}
```

After sending the metadata packet, Azure Communication Services (ACS) will begin streaming audio media to your WebSocket server.

``` json
{
  "kind": "AudioData",
  "audioData": {
    "timestamp": "2024-11-15T19:16:12.925Z",
    "participantRawID": "8:acs:3d20e1de-0f28-41c5…",
    "data": "5ADwAOMA6AD0A…",
    "silent": false
  }
}
```

#### DTMF example 
When DTMF is enabled Azure Communication Services sends a `DtmfData` type.

``` json
{
  "kind": "DtmfData",
  "dtmfData": {
    "data": "3"
  }
}
```

## Sending audio streaming data to Azure Communication Services
If bidirectional streaming is enabled using the `EnableBidirectional` flag in the `MediaStreamingOptions`, you can stream audio data back to Azure Communication Services, which plays the audio into the call.

Once Azure Communication Services begins streaming audio to your WebSocket server, you can relay the audio to your AI services. After your AI service processes the audio content, you can stream the audio back to the ongoing call in Azure Communication Services.

The example demonstrates how another service, such as Azure OpenAI or other voice-based Large Language Models, processes and transmits the audio data back into the call.

``` Java
private void sendAudioData(Session session, byte[] binaryData) {
    System.out.println("Data buffer---> " + binaryData.getClass().getName());
    if (session.isOpen()) {
        try {
            var serializedData = OutStreamingData.getStreamingDataForOutbound(binaryData);
            session.getAsyncRemote().sendText(serializedData);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

You can also control the playback of audio in the call when streaming back to Azure Communication Services, based on your logic or business flow. For example, when voice activity is detected and you want to stop the queued up audio, you can send a stop message via the WebSocket to stop the audio from playing in the call.

``` Java
private void stopAudio(Session session) {
    if (session.isOpen()) {
        try {
            var serializedData = OutStreamingData.getStopAudioForOutbound();
            session.getAsyncRemote().sendText(serializedData);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```



**Applies to: programming-language-javascript**


## Prerequisites 
- Azure account with an active subscription, for details see [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- An Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp).
- A new web service application created using the [Call Automation SDK](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md).
- [Node.js](https://nodejs.org/en/) LTS installation
- A websocket server that can send and receive media streams.

## Set up a websocket server
Azure Communication Services requires your server application to set up a WebSocket server to stream audio in real-time. WebSocket is a standardized protocol that provides a full-duplex communication channel over a single TCP connection. 

You can review documentation [here](https://azure.microsoft.com/blog/introduction-to-websockets-on-windows-azure-web-sites/) to learn more about WebSockets and how to use them.

## Receiving and sending audio streaming data
There are multiple ways to start receiving audio stream, which can be configured using the `startMediaStreaming` flag in the `mediaStreamingOptions` setup. You can also specify the desired sample rate used for receiving or sending audio data using the `audioFormat` parameter. Currently supported formats are PCM 24K mono and PCM 16K mono, with the default being PCM 16K mono.

To enable bidirectional audio streaming, where you're sending audio data into the call, you can enable the `EnableBidirectional` flag. For more details, refer to the [API specifications](https://learn.microsoft.com/rest/api/communication/callautomation/answer-call/answer-call?view=rest-communication-callautomation-2024-06-15-preview\&preserve-view=true\&tabs=HTTP#mediastreamingoptions).

### Start streaming audio to your webserver at time of answering the call
Enable automatic audio streaming when the call is established by setting the flag `startMediaStreaming: true`.
 
This setting ensures that audio streaming starts automatically as soon as the call is connected.

``` JS
const mediaStreamingOptions = {
    transportUrl: "wss://YOUR_WEBSOCKET_URL", 
    transportType: "websocket",               
    contentType: "audio",                     
    audioChannelType: "mixed",                
    startMediaStreaming: true,
    enableDtmfTones: true,           
    enableBidirectional: true,                
    audioFormat: "Pcm24KMono"                 
};

const answerCallOptions = {
    mediaStreamingOptions: mediaStreamingOptions
};

answerCallResult = await acsClient.answerCall(
    incomingCallContext,
    callbackUri,
    answerCallOptions
);
```

When Azure Communication Services receives the URL for your WebSocket server, it establishes a connection to it. Once the connection is successfully made, streaming is initiated.

### Start streaming audio to your webserver while a call is in progress
To start media streaming during the call, you can use the API. To do so, set the `startMediaStreaming` parameter to `false` (which is the default), and later in the call, you can use the start API to enable media streaming.

``` JS
const mediaStreamingOptions: MediaStreamingOptions = {
	transportUrl:  "wss://YOUR_WEBSOCKET_URL",
	transportType: "websocket",
	contentType: "audio",
	audioChannelType: "unmixed",
	startMediaStreaming: false,
	enableDtmfTones: true,
	enableBidirectional: true,
	audioFormat: "Pcm24KMono"
}
const answerCallOptions: AnswerCallOptions = {
	mediaStreamingOptions: mediaStreamingOptions
};

answerCallResult = await acsClient.answerCall(
	incomingCallContext,
	callbackUri,
	answerCallOptions
);

const startMediaStreamingOptions: StartMediaStreamingOptions = {
	operationContext: "startMediaStreaming"
}

await answerCallResult.callConnection.getCallMedia().startMediaStreaming(startMediaStreamingOptions);
```


## Stop audio streaming
To stop receiving audio streams during a call, you can use the **Stop streaming API**. This allows you to stop the audio streaming at any point in the call. There are two ways that audio streaming can be stopped;
- **Triggering the Stop streaming API:** Use the API to stop receiving audio streaming data while the call is still active.
- **Automatic stop on call disconnect:** Audio streaming automatically stops when the call is disconnected.

``` JS
const stopMediaStreamingOptions: StopMediaStreamingOptions = {
	operationContext: "stopMediaStreaming"
}
await answerCallResult.callConnection.getCallMedia().stopMediaStreaming(stopMediaStreamingOptions);
```

## Handling audio streams in your websocket server
This sample demonstrates how to listen to audio streams using your websocket server.

``` JS
wss.on('connection', async (ws: WebSocket) => {
	console.log('Client connected');
	await initWebsocket(ws);
	await startConversation();
	ws.on('message', async (packetData: ArrayBuffer) => {
		try {
			if (ws.readyState === WebSocket.OPEN) {
				await processWebsocketMessageAsync(packetData);
			} else {
				console.warn(`ReadyState: ${ws.readyState}`);
			}
		} catch (error) {
			console.error('Error processing WebSocket message:', error);
		}
	});
	ws.on('close', () => {
		console.log('Client disconnected');
	});
});

async function processWebsocketMessageAsync(receivedBuffer: ArrayBuffer) {
	const result = StreamingData.parse(receivedBuffer);
	const kind = StreamingData.getStreamingKind();

	// Get the streaming data kind  
	if (kind === StreamingDataKind.AudioData) {
		const audioData = (result as AudioData);
		// process your audio data  
	}
}
```

The first packet you receive contains metadata about the stream, including audio settings such as encoding, sample rate, and other configuration details.

### Additional Headers
The Correlation ID and Call Connection ID are now included in the WebSocket headers for improved traceability `x-ms-call-correlation-id` and `x-ms-call-connection-id`. These are sent when Azure Communication Services tries to connect to your endpoint.

``` json
{
  "kind": "AudioMetadata",
  "audioMetadata": {
    "subscriptionId": "89e8cb59-b991-48b0-b154-1db84f16a077",
    "encoding": "PCM",
    "sampleRate": 16000,
    "channels": 1,
    "length": 640
  }
}
```

After sending the metadata packet, Azure Communication Services (ACS) will begin streaming audio media to your WebSocket server.

``` json
{
  "kind": "AudioData",
  "audioData": {
    "timestamp": "2024-11-15T19:16:12.925Z",
    "participantRawID": "8:acs:3d20e1de-0f28-41c5…",
    "data": "5ADwAOMA6AD0A…",
    "silent": false
  }
}
```
#### DTMF example 
When DTMF is enabled Azure Communication Services sends a `DtmfData` type.

``` json
{
  "kind": "DtmfData",
  "dtmfData": {
    "data": "3"
  }
}
```

## Sending audio streaming data to Azure Communication Services
If bidirectional streaming is enabled using the `EnableBidirectional` flag in the `MediaStreamingOptions`, you can stream audio data back to Azure Communication Services, which plays the audio into the call.

Once Azure Communication Services begins streaming audio to your WebSocket server, you can relay the audio to your AI services. After your AI service processes the audio content, you can stream the audio back to the ongoing call in Azure Communication Services.

The example demonstrates how another service, such as Azure OpenAI or other voice-based Large Language Models, processes and transmits the audio data back into the call.

``` JS
async function receiveAudioForOutbound(data: string) { 
    try {
        const jsonData = OutStreamingData.getStreamingDataForOutbound(data);
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(jsonData);
        } else {
            console.log("socket connection is not open.");
        }
    } catch (e) {
        console.log(e);
    }
}
```

You can also control the playback of audio in the call when streaming back to Azure Communication Services, based on your logic or business flow. For example, when voice activity is detected and you want to stop the queued up audio, you can send a stop message via the WebSocket to stop the audio from playing in the call.

``` JS
async function stopAudio() {
	try {
		const jsonData = OutStreamingData.getStopAudioForOutbound();
		if (ws.readyState === WebSocket.OPEN) {
			ws.send(jsonData);
		} else {
			console.log("socket connection is not open.");
		}
	} catch (e) {
		console.log(e);
	}
}
```



**Applies to: programming-language-python**


## Prerequisites 
- Azure account with an active subscription, for details see [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- An Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp).
- A new web service application created using the [Call Automation SDK](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md).
- [Python](https://www.python.org/downloads/) 3.7+.
- A websocket server that can send and receive media streams.

## Set up a websocket server
Azure Communication Services requires your server application to set up a WebSocket server to stream audio in real-time. WebSocket is a standardized protocol that provides a full-duplex communication channel over a single TCP connection. 

You can review documentation [here](https://azure.microsoft.com/blog/introduction-to-websockets-on-windows-azure-web-sites/) to learn more about WebSockets and how to use them.

## Receiving and sending audio streaming data
There are multiple ways to start receiving audio stream, which can be configured using the `startMediaStreaming` flag in the `mediaStreamingOptions` setup. You can also specify the desired sample rate used for receiving or sending audio data using the `audioFormat` parameter. Currently supported formats are PCM 24K mono and PCM 16K mono, with the default being PCM 16K mono.

To enable bidirectional audio streaming, where you're sending audio data into the call, you can enable the `EnableBidirectional` flag. For more details, refer to the [API specifications](https://learn.microsoft.com/rest/api/communication/callautomation/answer-call/answer-call?view=rest-communication-callautomation-2024-06-15-preview\&preserve-view=true\&tabs=HTTP#mediastreamingoptions).

### Start streaming audio to your webserver at time of answering the call
Enable automatic audio streaming when the call is established by setting the flag `startMediaStreaming: true`.
 
This setting ensures that audio streaming starts automatically as soon as the call is connected.

``` python
media_streaming_options = MediaStreamingOptions(
    transport_url=WEBSOCKET_URI_HOST,
    transport_type=StreamingTransportType.WEBSOCKET,
    content_type=MediaStreamingContentType.AUDIO,
    audio_channel_type=MediaStreamingAudioChannelType.MIXED,
    start_media_streaming=True,
    enable_bidirectional=True,
    enable_dtmf_tones=True,
    audio_format=AudioFormat.PCM24_K_MONO
)
answer_call_result = call_automation_client.answer_call(
    incoming_call_context=incoming_call_context,
    media_streaming=media_streaming_configuration,
    callback_url=callback_uri,
)
```

When Azure Communication Services receives the URL for your WebSocket server, it establishes a connection to it. Once the connection is successfully made, streaming is initiated.

### Start streaming audio to your webserver while a call is in progress
To start media streaming during the call, you can use the API. To do so, set the `startMediaStreaming` parameter to `false` (which is the default), and later in the call, you can use the start API to enable media streaming.

``` python
media_streaming_options = MediaStreamingOptions(
    transport_url=WEBSOCKET_URI_HOST,
    transport_type=StreamingTransportType.WEBSOCKET,
    content_type=MediaStreamingContentType.AUDIO,
    audio_channel_type=MediaStreamingAudioChannelType.MIXED,
    start_media_streaming=True,
    enable_bidirectional=True,
    enable_dtmf_tones=True,
    audio_format=AudioFormat.PCM24_K_MONO
)

answer_call_result = call_automation_client.answer_call(
    incoming_call_context=incoming_call_context,
    media_streaming=media_streaming_configuration,
    callback_url=callback_uri
)

call_automation_client.get_call_connection(call_connection_id).start_media_streaming(
    operation_context="startMediaStreamingContext"
)
```

## Stop audio streaming
To stop receiving audio streams during a call, you can use the **Stop streaming API**. This allows you to stop the audio streaming at any point in the call. There are two ways that audio streaming can be stopped;
- **Triggering the Stop streaming API:** Use the API to stop receiving audio streaming data while the call is still active.
- **Automatic stop on call disconnect:** Audio streaming automatically stops when the call is disconnected.

``` python
call_automation_client.get_call_connection(call_connection_id).stop_media_streaming(operation_context="stopMediaStreamingContext") 
```

## Handling audio streams in your websocket server
This sample demonstrates how to listen to audio streams using your websocket server.

``` python
async def handle_client(websocket):
    print("Client connected")
    try:
        async for message in websocket:
            json_object = json.loads(message)
            kind = json_object["kind"]
            if kind == "AudioData":
                audio_data = json_object["audioData"]["data"]
                # process your audio data
    except websockets.exceptions.ConnectionClosedOK:
        print("Client disconnected")
    except websockets.exceptions.ConnectionClosedError as e:
        print(f"Connection closed with error: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
```

The first packet you receive contains metadata about the stream, including audio settings such as encoding, sample rate, and other configuration details.

### Additional Headers
The Correlation ID and Call Connection ID are now included in the WebSocket headers for improved traceability `x-ms-call-correlation-id` and `x-ms-call-connection-id`. These are sent when Azure Communication Services tries to connect to your endpoint.

``` json
{
  "kind": "AudioMetadata",
  "audioMetadata": {
    "subscriptionId": "89e8cb59-b991-48b0-b154-1db84f16a077",
    "encoding": "PCM",
    "sampleRate": 16000,
    "channels": 1,
    "length": 640
  }
}
```

After sending the metadata packet, Azure Communication Services (ACS) will begin streaming audio media to your WebSocket server.

``` json
{
  "kind": "AudioData",
  "audioData": {
    "timestamp": "2024-11-15T19:16:12.925Z",
    "participantRawID": "8:acs:3d20e1de-0f28-41c5…",
    "data": "5ADwAOMA6AD0A…",
    "silent": false
  }
}
```

#### DTMF example 
When DTMF is enabled Azure Communication Services sends a `DtmfData` type.

``` json
{
  "kind": "DtmfData",
  "dtmfData": {
    "data": "3"
  }
}
```

## Sending audio streaming data to Azure Communication Services
If bidirectional streaming is enabled using the `EnableBidirectional` flag in the `MediaStreamingOptions`, you can stream audio data back to Azure Communication Services, which plays the audio into the call.

Once Azure Communication Services begins streaming audio to your WebSocket server, you can relay the audio to your AI services. After your AI service processes the audio content, you can stream the audio back to the ongoing call in Azure Communication Services.

The example demonstrates how another service, such as Azure OpenAI or other voice-based Large Language Models, processes and transmits the audio data back into the call.

``` python
async def send_data(websocket, buffer):
    if websocket.open:
        data = {
            "Kind": "AudioData",
            "AudioData": {
                "Data": buffer
            },
            "StopAudio": None
        }
        # Serialize the server streaming data
        serialized_data = json.dumps(data)
        print(f"Out Streaming Data ---> {serialized_data}")
        # Send the chunk over the WebSocket
        await websocket.send(serialized_data)
```

You can also control the playback of audio in the call when streaming back to Azure Communication Services, based on your logic or business flow. For example, when voice activity is detected and you want to stop the queued up audio, you can send a stop message via the WebSocket to stop the audio from playing in the call.

``` python
async def stop_audio(websocket):
    if websocket.open:
        data = {
            "Kind": "StopAudio",
            "AudioData": None,
            "StopAudio": {}
        }
        # Serialize the server streaming data
        serialized_data = json.dumps(data)
        print(f"Out Streaming Data ---> {serialized_data}")
        # Send the chunk over the WebSocket
        await websocket.send(serialized_data)
```




## Clean up resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it. Learn more about [cleaning up resources](../../quickstarts/create-communication-resource.md#clean-up-resources).

## Next steps
- Learn more about [Audio Streaming](../../concepts/call-automation/audio-streaming-concept.md).
- Learn more about [Call Automation](../../concepts/call-automation/call-automation.md) and its features. 
- Learn more about [Play action](../../concepts/call-automation/play-action.md).
- Learn more about [Recognize action](../../concepts/call-automation/recognize-action.md).
