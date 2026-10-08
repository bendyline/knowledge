---
ms.author: rahulva
title: Azure Communication Services Call Recording API quickstart
titleSuffix: An Azure Communication Services document
description: Quickstart for Call Recording APIs
author: dbasantes
services: azure-communication-services
ms.date: 06/12/2023
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: calling
zone_pivot_groups: acs-js-csharp-java-python
ms.custom: mode-api, devx-track-extended-java, devx-track-js, devx-track-python
---
# Call recording quickstart


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This article describes call recording for voice and video calls. To start using the Call Recording APIs, you must have a call in place. To build the end-user calling experience, make sure you're familiar with [Calling client SDK](get-started-with-video-calling.md) and [Call Automation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md#build-a-customer-interaction-workflow-using-call-automation).

**Applies to: programming-language-csharp**

## Sample Code

You can download the sample app from [GitHub](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/CallRecording)

## Prerequisites

- You need an Azure account with an active subscription.
- Deploy a Communication Service resource. Record your resource **connection string**.
- Subscribe to events via [Azure Event Grid](../../../event-grid/event-schema-communication-services.md).
- Download the [.NET SDK](https://dotnet.microsoft.com/en-us/download/dotnet)

## Before you start

Call Recording APIs use the `callConnectionId` or `serverCallId`to initiate recording. There are a couple of methods you can use to fetch the these IDs depending on your scenario:

### How to fetch callConnectionId

When using [Call Automation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md), you will receive the `callConnectionId` from the response event from a `createCall`, `answer`, or `connect` requests when initiating the call.

### How to fetch serverCallId

When using [Call Automation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md), you have two options to get the `serverCallId`:

1. When you establish a call, it returns a `serverCallId` as a property of the `CallConnected` event after a call is established. Learn how to [Get CallConnected event](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md?pivots=programming-language-csharp#update-programcs) from Call Automation SDK.

2. When you answer the call or a call is created, it returns the `serverCallId` as a property of the `AnswerCallResult` or `CreateCallResult` API responses respectively.


When using [Calling Client SDK](get-started-with-video-calling.md), you can retrieve the `serverCallId` by using the `getServerCallId` method on the call. 
Use this example to learn how to [Get serverCallId](get-server-call-id.md) from the Calling Client SDK. 

Let's get started with a few simple steps.

## 1. Create a Call Automation client

Call Recording APIs are part of the Azure Communication Services [Call Automation](../../concepts/call-automation/call-automation.md) libraries. So you need to create a Call Automation client.

To create a call automation client, use your Communication Services connection string and pass it to `CallAutomationClient` object.

```csharp
CallAutomationClient callAutomationClient = new CallAutomationClient("<ACSConnectionString>");
```

## 2. Start recording session with StartRecordingOptions using 'StartAsync' API

Use the `callConnectionId` or `serverCallId` received during initiation of the call.
- Use `RecordingContent` to pass the recording content type. Use `AUDIO`.
- Use `RecordingChannel` to pass the recording channel type. Use `MIXED` or `UNMIXED`.
- Use `RecordingFormat` to pass the format of the recording. Use `WAV`.

```csharp
StartRecordingOptions recordingOptions = new StartRecordingOptions(new ServerCallLocator("<callConnectionId> or <ServerCallId>")) 
{
    RecordingContent = RecordingContent.Audio,
    RecordingChannel = RecordingChannel.Unmixed,
    RecordingFormat = RecordingFormat.Wav,
    RecordingStateCallbackUri = new Uri("<CallbackUri>");
};
Response<RecordingStateResult> response = await callAutomationClient.GetCallRecording()
.StartAsync(recordingOptions);
```
### 2.1. Start Recording - Bring Your Own Azure Blob Store

Start recording using your designated Azure Blob Storage to store the recorded file once recording is complete.

```csharp
StartRecordingOptions recordingOptions = new StartRecordingOptions(new ServerCallLocator("<CallConnectionId> or <ServerCallId>"))
{
    RecordingContent = RecordingContent.Audio,
    RecordingChannel = RecordingChannel.Unmixed,
    RecordingFormat = RecordingFormat.Wav,
    RecordingStateCallbackUri = new Uri("<CallbackUri>"),
    RecordingStorage = RecordingStorage.CreateAzureBlobContainerRecordingStorage(new Uri("<YOUR_STORAGE_CONTAINER_URL>"))
};
Response<RecordingStateResult> response = await callAutomationClient.GetCallRecording()
.StartAsync(recordingOptions);
```

## 2.2. Start recording session with Pause mode enabled using 'StartAsync' API

> **Note:**
> **Recordings will need to be resumed for recording file to be generated.**

```csharp
StartRecordingOptions recordingOptions = new StartRecordingOptions(new ServerCallLocator("<CallConnectionId> or <ServerCallId>")) 
{
    RecordingContent = RecordingContent.Audio,
    RecordingChannel = RecordingChannel.Unmixed,
    RecordingFormat = RecordingFormat.Wav,
    PauseOnStart = true,
    RecordingStateCallbackUri = new Uri("<CallbackUri>");
};
Response<RecordingStateResult> response = await callAutomationClient.GetCallRecording()
.StartAsync(recordingOptions);
```

### 2.3. Only for Unmixed - Specify a user on channel 0

To produce unmixed audio recording files, you can use the `AudioChannelParticipantOrdering` functionality to specify which user you want to record on channel 0. The rest of the participants are assigned to a channel as they speak. If you use `RecordingChannel.Unmixed` but don't use `AudioChannelParticipantOrdering`, Call Recording assigns channel 0 to the first participant speaking. 

```csharp
StartRecordingOptions recordingOptions = new StartRecordingOptions(new ServerCallLocator("<CallConnectionId> or <ServerCallId>")) 
{
    RecordingContent = RecordingContent.Audio,
    RecordingChannel = RecordingChannel.Unmixed,
    RecordingFormat = RecordingFormat.Wav,
    RecordingStateCallbackUri = new Uri("<CallbackUri>"),
    AudioChannelParticipantOrdering = { new CommunicationUserIdentifier("<ACS_USER_MRI>") }
    
};
Response<RecordingStateResult> response = await callAutomationClient.GetCallRecording().StartAsync(recordingOptions);
```

### 2.4. Only for Unmixed - Specify channel affinity

```csharp
var channelAffinity = new ChannelAffinity(new CommunicationUserIdentifier("<ACS_USER_MRI>")) { Channel = 0};
StartRecordingOptions recordingOptions = new StartRecordingOptions(new ServerCallLocator("<CallConnectionId> or <ServerCallId>"))
{
   RecordingContent = RecordingContent.Audio,
   RecordingChannel = RecordingChannel.Unmixed,
   RecordingFormat = RecordingFormat.Wav,
   RecordingStateCallbackUri = new Uri("<CallbackUri>"),
   ChannelAffinity = new List<ChannelAffinity>{ channelAffinity }
};
Response<RecordingStateResult> response = await callAutomationClient.GetCallRecording().StartAsync(recordingOptions);
```

The `StartAsync` API response contains the `recordingId` of the recording session.

## 3. Stop recording session using `StopAsync` API

Use the `recordingId` received in response to `StartAsync`.

```csharp
var stopRecording = await callAutomationClient.GetCallRecording().StopAsync(recordingId);
```

## 4. Pause recording session using `PauseAsync` API

Use the `recordingId` received in response to `StartAsync`.

```csharp
var pauseRecording = await callAutomationClient.GetCallRecording ().PauseAsync(recordingId);
```

## 5. Resume recording session using `ResumeAsync` API

Use the `recordingId` received in response to `StartAsync`.

```csharp
var resumeRecording = await callAutomationClient.GetCallRecording().ResumeAsync(recordingId);
```

## 6. Download recording File using `DownloadToAsync` API

Use an [Azure Event Grid](../../../event-grid/event-schema-communication-services.md) web hook or other triggered action to notify your services when the recorded media is ready for download.

An Event Grid notification `Microsoft.Communication.RecordingFileStatusUpdated` is published when a recording is ready for retrieval, typically a few minutes after the recording finishes processing (such as when meeting ends or a recording stops). Recording event notifications include `contentLocation` and `metadataLocation`, which you can use to retrieve both recorded media and a recording metadata file.

Example of the event schema:

```
{
    "id": string, // Unique guid for event
    "topic": string, // /subscriptions/{subscription-id}/resourceGroups/{group-name}/providers/Microsoft.Communication/communicationServices/{communication-services-resource-name}
    "subject": string, // /recording/call/{call-id}/serverCallId/{serverCallId}
    "data": {
        "recordingStorageInfo": {
            "recordingChunks": [
                {
                    "documentId": string, // Document id for the recording chunk
                    "contentLocation": string, //Azure Communication Services URL where the content is located
                    "metadataLocation": string, // Azure Communication Services URL where the metadata for this chunk is located
                    "deleteLocation": string, // Azure Communication Services URL to use to delete all content, including recording and metadata.
                    "index": int, // Index providing ordering for this chunk in the entire recording
                    "endReason": string, // Reason for chunk ending: "SessionEnded", "ChunkMaximumSizeExceeded”, etc.
                }
            ]
        },
        "recordingStartTime": string, // ISO 8601 date time for the start of the recording
        "recordingDurationMs": int, // Duration of recording in milliseconds
        "sessionEndReason": string // Reason for call ending: "CallEnded", "InitiatorLeft”, etc.
    },
    "eventType": string, // "Microsoft.Communication.RecordingFileStatusUpdated"
    "dataVersion": string, // "1.0"
    "metadataVersion": string, // "1"
    "eventTime": string // ISO 8601 date time for when the event was created
}
```

Use `DownloadToAsync` API to download the recorded media.

```csharp
var recordingDownloadUri = new Uri(contentLocation);
var response = await callAutomationClient.GetCallRecording().DownloadToAsync(recordingDownloadUri, fileName);
```

Fetch the `downloadLocation` for the recording from the `contentLocation` attribute of the `recordingChunk`. Use the `DownloadToAsync` method to download the content into a provided filename.

## 7. Delete recording content using `DeleteAsync` API

Use `DeleteAsync` API to delete the recording content (such as recorded media and metadata).

```csharp
var recordingDeleteUri = new Uri(deleteLocation);
var response = await callAutomationClient.GetCallRecording().DeleteAsync(recordingDeleteUri);
```



**Applies to: programming-language-java**


## Sample Code

You can download the sample app from [GitHub](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/CallRecording)

## Prerequisites

- You need an Azure account with an active subscription.
- Deploy a Communication Service resource. Record your resource **connection string**.
- Subscribe to events via [Azure Event Grid](../../../event-grid/event-schema-communication-services.md).
- Download the [Java SDK](https://search.maven.org/artifact/com.azure/azure-communication-callautomation/1.0.0-beta.1/jar)

## Before you start

Call Recording APIs use the `callConnectionId` or `serverCallId`to initiate recording. There are a couple of methods you can use to fetch the these IDs depending on your scenario:

### How to fetch callConnectionId

When using [Call Automation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md), you will receive the `callConnectionId` from the response event from a `createCall`, `answer`, or `connect` requests when initiating the call.

### How to fetch serverCallId

When using [Call Automation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md), you have two options to get the `serverCallId`:

1. When you establish a call, it returns a `serverCallId` as a property of the `CallConnected` event after a call is established. Learn how to [Get CallConnected event](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md?pivots=programming-language-csharp#update-programcs) from Call Automation SDK.

2. When you answer the call or a call is created, it returns the `serverCallId` as a property of the `AnswerCallResult` or `CreateCallResult` API responses respectively.


When using [Calling Client SDK](get-started-with-video-calling.md), you can retrieve the `serverCallId` by using the `getServerCallId` method on the call. 
Use this example to learn how to [Get serverCallId](get-server-call-id.md) from the Calling Client SDK. 

Let's get started with a few simple steps.

## 1. Create a Call Automation client

Call Recording APIs are part of the Azure Communication Services [Call Automation](../../concepts/call-automation/call-automation.md) libraries. So you need to create a Call Automation client.

To create a call automation client, use your Communication Services connection string and pass it to `CallAutomationClient` object.

```java
CallAutomationClient callAutomationClient = new CallAutomationClientBuilder()
            .connectionString("<acsConnectionString>")
            .buildClient();
```

## 2. Start recording session with StartRecordingOptions using `startWithResponse` API

Use the `callConnectionId` or `serverCallId` received during initiation of the call.
- Use `RecordingContent` to pass the recording content type. Use `AUDIO`.
- Use `RecordingChannel` to pass the recording channel type. Use `MIXED` or `UNMIXED`.
- Use `RecordingFormat` to pass the format of the recording. Use `WAV`.

```java
StartRecordingOptions recordingOptions = new StartRecordingOptions(new ServerCallLocator("<callConnectionId> or <serverCallId>"))
                    .setRecordingChannel(RecordingChannel.UNMIXED)
                    .setRecordingFormat(RecordingFormat.WAV)
                    .setRecordingContent(RecordingContent.AUDIO)
                    .setRecordingStateCallbackUrl("<recordingStateCallbackUrl>");

Response<RecordingStateResult> response = callAutomationClient.getCallRecording()
.startWithResponse(recordingOptions, null);

```

### 2.1. Start Recording - Bring Your Own Azure Blob Store

Start recording using your designated Azure Blob Storage to store the recorded file once recording is complete.

```java
        StartRecordingOptions recordingOptions = new StartRecordingOptions(callLocator)
        .setRecordingChannel(RecordingChannel.MIXED)
        .setRecordingContent(RecordingContent.AUDIO_VIDEO)
        .setRecordingFormat(RecordingFormat.MP4)
        .setRecordingStorage(new AzureBlobContainerRecordingStorage("<YOUR_STORAGE_CONTAINER_URL>"));
 
       // //start recording
       RecordingStateResult result = callRecording.start(recordingOptions);
```

### 2.2. Start recording session with Pause mode enabled using `StartAsync` API

> **Note:**
> **Recordings must be resumed for recording file to be generated.**

```java
StartRecordingOptions recordingOptions = new StartRecordingOptions(new ServerCallLocator("<<callConnectionId> or serverCallId>"))
                    .setRecordingChannel(RecordingChannel.UNMIXED)
                    .setRecordingFormat(RecordingFormat.WAV)
                    .setRecordingContent(RecordingContent.AUDIO)
                    .setRecordingStateCallbackUrl("<recordingStateCallbackUrl>")
                    .setPauseOnStart(true)
                    .setAudioChannelParticipantOrdering(List.of(new CommunicationUserIdentifier("<participantMri>")));

Response<RecordingStateResult> response = callAutomationClient.getCallRecording()
.startWithResponse(recordingOptions, null);

```

### 2.3. Only for Unmixed - Specify a user on channel 0

To produce unmixed audio recording files, you can use the `AudioChannelParticipantOrdering` functionality to specify which user you want to record on channel 0. The rest of the participants are assigned to a channel as they speak. If you use `RecordingChannel.Unmixed` but don't use `AudioChannelParticipantOrdering`, Call Recording assigns channel 0 to the first participant speaking. 

```java
StartRecordingOptions recordingOptions = new StartRecordingOptions(new ServerCallLocator("<<callConnectionId> or serverCallId>"))
                    .setRecordingChannel(RecordingChannel.UNMIXED)
                    .setRecordingFormat(RecordingFormat.WAV)
                    .setRecordingContent(RecordingContent.AUDIO)
                    .setRecordingStateCallbackUrl("<recordingStateCallbackUrl>")
                    .setAudioChannelParticipantOrdering(List.of(new CommunicationUserIdentifier("<participantMri>")));

Response<RecordingStateResult> response = callAutomationClient.getCallRecording()
.startWithResponse(recordingOptions, null);

```

### 2.4. Only for Unmixed - Specify channel affinity

```java
ChannelAffinity channelAffinity = new ChannelAffinity()
.setParticipant(new PhoneNumberIdentifier("RECORDING_ID"))
.setChannel(0);
List<ChannelAffinity> channelAffinities = Arrays.asList(channelAffinity);

StartRecordingOptions startRecordingOptions = new StartRecordingOptions(new ServerCallLocator(SERVER_CALL_ID))
   .setRecordingChannel(RecordingChannel.UNMIXED)
   .setRecordingFormat(RecordingFormat.WAV)
   .setRecordingContent(RecordingContent.AUDIO)
   .setRecordingStateCallbackUrl("<recordingStateCallbackUrl>")
   .setChannelAffinity(channelAffinities);
Response<RecordingStateResult> response = callAutomationClient.getCallRecording()
.startRecordingWithResponse(recordingOptions, null);
```
The `startWithResponse` API response contains the `recordingId` of the recording session.

## 3. Stop recording session using `stopWithResponse` API

Use the `recordingId` received in response to `startWithResponse`.

```java
Response<Void> response = callAutomationClient.getCallRecording()
               .stopWithResponse(response.getValue().getRecordingId(), null);
```

## 4. Pause recording session using `pauseWithResponse` API

Use the `recordingId` received in response to `startWithResponse`.

```java
Response<Void> response = callAutomationClient.getCallRecording()
              .pauseWithResponse(response.getValue().getRecordingId(), null);
```

## 5. Resume recording session using `resumeWithResponse` API

Use the `recordingId` received in response to `startWithResponse`.

```java
Response<Void> response = callAutomationClient.getCallRecording()
               .resumeWithResponse(response.getValue().getRecordingId(), null);
```

## 6. Download recording File using `downloadToWithResponse` API

Use an [Azure Event Grid](../../../event-grid/event-schema-communication-services.md) web hook or other triggered action should be used to notify your services when the recorded media is ready for download.

An Event Grid notification `Microsoft.Communication.RecordingFileStatusUpdated` is published when a recording is ready for retrieval, typically a few minutes after the recording process completes (such as meeting ends or recording stops). Recording event notifications include `contentLocation` and `metadataLocation`, which you can use to retrieve both recorded media and a recording metadata file.

The following code is an example of the event schema.

```
{
    "id": string, // Unique guid for event
    "topic": string, // /subscriptions/{subscription-id}/resourceGroups/{group-name}/providers/Microsoft.Communication/communicationServices/{communication-services-resource-name}
    "subject": string, // /recording/call/{call-id}/serverCallId/{serverCallId}
    "data": {
        "recordingStorageInfo": {
            "recordingChunks": [
                {
                    "documentId": string, // Document id for the recording chunk
                    "contentLocation": string, //Azure Communication Services URL where the content is located
                    "metadataLocation": string, // Azure Communication Services URL where the metadata for this chunk is located
                    "deleteLocation": string, // Azure Communication Services URL to use to delete all content, including recording and metadata.
                    "index": int, // Index providing ordering for this chunk in the entire recording
                    "endReason": string, // Reason for chunk ending: "SessionEnded", "ChunkMaximumSizeExceeded”, etc.
                }
            ]
        },
        "recordingStartTime": string, // ISO 8601 date time for the start of the recording
        "recordingDurationMs": int, // Duration of recording in milliseconds
        "sessionEndReason": string // Reason for call ending: "CallEnded", "InitiatorLeft”, etc.
    },
    "eventType": string, // "Microsoft.Communication.RecordingFileStatusUpdated"
    "dataVersion": string, // "1.0"
    "metadataVersion": string, // "1"
    "eventTime": string // ISO 8601 date time for when the event was created
}
```

Use `downloadToWithResponse` method of `CallRecording` class to download the recorded media. Following are the supported parameters for `downloadToWithResponse` method:
- `contentLocation`: Azure Communication Services URL where the content is located.
- `destinationPath` : File location.
- `parallelDownloadOptions`: An optional `ParallelDownloadOptions` object to modify how the parallel download works.
- `overwrite`: True to overwrite the file if it exists.
- `context`: A Context representing the request context.

```java
Boolean overwrite = true;
ParallelDownloadOptions parallelDownloadOptions = null;
Context context = null;

String filePath = String.format(".\\%s.%s", documentId, fileType);
Path destinationPath = Paths.get(filePath);

Response<Void> downloadResponse = callAutomationClient.getCallRecording().downloadToWithResponse(contentLocation, destinationPath, parallelDownloadOptions, overwrite, context);
```

The content location and document IDs for the recording files can be fetched from the `contentLocation` and `documentId` fields respectively, for each `recordingChunk`.

## 7. Delete recording content using `deleteWithResponse` API

Use `deleteWithResponse` method of `CallRecording` class to delete the recorded media. Supported parameters for `deleteWithResponse` method:
- `deleteLocation`: Azure Communication Services URL where the content to delete is located.
- `context`: A Context representing the request context.

```
Response<Void> deleteResponse = callAutomationClient.getCallRecording().deleteWithResponse(deleteLocation, context);
```

The delete location for the recording can be fetched from the `deleteLocation` field of the Event Grid event.



**Applies to: programming-language-python**

## Sample Code

You can download the sample app from [GitHub](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/call-recording)

## Prerequisites

- You need an Azure account with an active subscription.
- Deploy a Communication Service resource. Record your resource **connection string**.
- Subscribe to events via [Azure Event Grid](../../../event-grid/event-schema-communication-services.md).
- [Python](https://www.python.org/downloads/) 3.7+.

## Before you start

Call Recording APIs use the `callConnectionId` or `serverCallId`to initiate recording. There are a couple of methods you can use to fetch the these IDs depending on your scenario:

### How to fetch callConnectionId

When using [Call Automation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md), you will receive the `callConnectionId` from the response event from a `createCall`, `answer`, or `connect` requests when initiating the call.

### How to fetch serverCallId

When using [Call Automation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md), you have two options to get the `serverCallId`:

1. When you establish a call, it returns a `serverCallId` as a property of the `CallConnected` event after a call is established. Learn how to [Get CallConnected event](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md?pivots=programming-language-csharp#update-programcs) from Call Automation SDK.

2. When you answer the call or a call is created, it returns the `serverCallId` as a property of the `AnswerCallResult` or `CreateCallResult` API responses respectively.


When using [Calling Client SDK](get-started-with-video-calling.md), you can retrieve the `serverCallId` by using the `getServerCallId` method on the call. 
Use this example to learn how to [Get serverCallId](get-server-call-id.md) from the Calling Client SDK. 

Let's get started with a few simple steps.


## 1. Create a Call Automation client

Call Recording APIs are part of the Azure Communication Services [Call Automation](../../concepts/call-automation/call-automation.md) libraries. Thus, it's necessary to create a Call Automation client.

To create a call automation client, use your Communication Services connection string and pass it to `CallAutomationClient` object.

```python
call_automation_client = CallAutomationClient.from_connection_string("<ACSConnectionString>")
```

## 2. Start recording session start_recording API

Use the `callConnectionId` or `serverCallId` received during initiation of the call.
- Use `RecordingContent` to pass the recording content type. Use `AUDIO`.
- Use `RecordingChannel` to pass the recording channel type. Use `MIXED` or `UNMIXED`.
- Use `RecordingFormat` to pass the format of the recording. Use `WAV`.

```python
response = call_automation_client.start_recording(call_locator=ServerCallLocator(callConnectionId or server_call_id),
            recording_content_type = RecordingContent.Audio,
            recording_channel_type = RecordingChannel.Unmixed,
            recording_format_type = RecordingFormat.Wav,
            recording_state_callback_url = "<CallbackUri>")
```

### 2.1. Start Recording  - Bring Your Own Azure Blob Store

Start Recording with your own Azure Blob Storage defined to store the recording file once recording is complete.

```python
response = call_automation_client.start_recording(call_locator=ServerCallLocator(callConnectionId or server_call_id),
                   recording_content_type = RecordingContent.Audio,
                   recording_channel_type = RecordingChannel.Unmixed,
                   recording_format_type = RecordingFormat.Wav,
                   recording_state_callback_url = "<CallbackUri>",
                   recording_storage = AzureBlobContainerRecordingStorage(container_url="<YOUR_STORAGE_CONTAINER_URL>"))
```
## 2.2. Start recording session with Pause mode enabled using 'StartAsync' API

> **Note:**
> **Recordings will need to be resumed for recording file to be generated.**

```python
response = call_automation_client.start_recording(call_locator=ServerCallLocator(callConnectionId or server_call_id),
            recording_content_type = RecordingContent.Audio,
            recording_channel_type = RecordingChannel.Unmixed,
            recording_format_type = RecordingFormat.Wav,
            pause_on_start = true,
            recording_state_callback_url = "<CallbackUri>")
```

### 2.3. Only for Unmixed - Specify a user on channel 0

To produce unmixed audio recording files, you can use the `AudioChannelParticipantOrdering` functionality to specify which user you want to record on channel 0. The rest of the participants are assigned to a channel as they speak. If you use `RecordingChannel.Unmixed` but don't use `AudioChannelParticipantOrdering`, Call Recording assigns channel 0 to the first participant speaking.

```python
response =  call_automation_client.start_recording(call_locator=ServerCallLocator(callConnectionId or server_call_id),
            recording_content_type = RecordingContent.Audio,
            recording_channel_type = RecordingChannel.Unmixed,
            recording_format_type = RecordingFormat.Wav,
            recording_state_callback_url = "<CallbackUri>",
            audio_channel_participant_ordering=[CommunicationUserIdentifier(id="<ACS_USER_MRI>")])
```

### 2.4. Only for Unmixed - Specify channel affinity

```python
_channel_affinity = ChannelAffinity(target_participant=CommunicationUserIdentifier("<ACS_USER_MRI>"), channel=0)

response =  call_automation_client.start_recording(call_locator=ServerCallLocator(callConnectionId or server_call_id),
            recording_content_type = RecordingContent.Audio,
            recording_channel_type = RecordingChannel.Unmixed,
            recording_format_type = RecordingFormat.Wav,
            recording_state_callback_url = "<CallbackUri>",
            channel_affinity=[_channel_affinity])
```

The `StartAsync` API response contains the `recordingId` of the recording session.

## 3.	Stop recording session using 'stop_recording' API

Use the `recording_id` received in response to `start_recording`.

```python
stop_recording = call_automation_client.stop_recording(recording_id = recording_id)
```

## 4.	Pause recording session using 'pause_recording' API

Use the `recording_id` received in response to `start_recording`.

```python
pause_recording = call_automation_client.pause_recording(recording_id = recording_id)
```

## 5.	Resume recording session using 'resume_recording' API

Use the `recording_id` received in response to `start_recording`.

```python
resume_recording = call_automation_client.resume_recording(recording_id = recording_id)
```

## 6.	Download recording File using 'download_recording' API

Use an [Azure Event Grid](../../../event-grid/event-schema-communication-services.md) web hook or other triggered action should be used to notify your services when the recorded media is ready for download.

An Event Grid notification `Microsoft.Communication.RecordingFileStatusUpdated` is published when a recording is ready for retrieval, typically a few minutes after the recording process completes (such as the meeting ended or the recording stopped). Recording event notifications include `contentLocation` and `metadataLocation`, which are used to retrieve both recorded media and a recording metadata file.

The following code is an example of the event schema.

```
{
    "id": string, // Unique guid for event
    "topic": string, // /subscriptions/{subscription-id}/resourceGroups/{group-name}/providers/Microsoft.Communication/communicationServices/{communication-services-resource-name}
    "subject": string, // /recording/call/{call-id}/serverCallId/{serverCallId}
    "data": {
        "recordingStorageInfo": {
            "recordingChunks": [
                {
                    "documentId": string, // Document id for the recording chunk
                    "contentLocation": string, //Azure Communication Services URL where the content is located
                    "metadataLocation": string, // Azure Communication Services URL where the metadata for this chunk is located
                    "deleteLocation": string, // Azure Communication Services URL to use to delete all content, including recording and metadata.
                    "index": int, // Index providing ordering for this chunk in the entire recording
                    "endReason": string, // Reason for chunk ending: "SessionEnded", "ChunkMaximumSizeExceeded”, etc.
                }
            ]
        },
        "recordingStartTime": string, // ISO 8601 date time for the start of the recording
        "recordingDurationMs": int, // Duration of recording in milliseconds
        "sessionEndReason": string // Reason for call ending: "CallEnded", "InitiatorLeft”, etc.
    },
    "eventType": string, // "Microsoft.Communication.RecordingFileStatusUpdated"
    "dataVersion": string, // "1.0"
    "metadataVersion": string, // "1"
    "eventTime": string // ISO 8601 date time for when the event was created
}
```

Use `download_recording` API to download the recorded media.

```python
response = recording_data = call_automation_client.download_recording(content_location)

with open("<file_name>", "wb") as binary_file:
    binary_file.write(recording_data.read())
```

The `downloadLocation` for the recording can be fetched from the `contentLocation` attribute of the `recordingChunk`. Use the `download_recording` method to download the content into bytes.

## 7. Delete recording content using 'delete_recording' API

Use `delete_recording` API for deleting the recording content such as recorded media and metadata.

```python
response = call_automation_client.delete_recording(delete_location);
```



**Applies to: programming-language-javascript**

## Sample Code

You can download the sample app from [GitHub](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/call-recording)

## Prerequisites

- You need an Azure account with an active subscription.
- Deploy a Communication Service resource. Record your resource **connection string**.
- Subscribe to events via [Azure Event Grid](../../../event-grid/event-schema-communication-services.md).
- [Node.js](https://nodejs.org/en) Active LTS and Maintenance LTS versions (8.11.1 and 10.14.1 recommended)

## Before you start

Call Recording APIs use the `callConnectionId` or `serverCallId`to initiate recording. There are a couple of methods you can use to fetch the these IDs depending on your scenario:

### How to fetch callConnectionId

When using [Call Automation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md), you will receive the `callConnectionId` from the response event from a `createCall`, `answer`, or `connect` requests when initiating the call.

### How to fetch serverCallId

When using [Call Automation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md), you have two options to get the `serverCallId`:

1. When you establish a call, it returns a `serverCallId` as a property of the `CallConnected` event after a call is established. Learn how to [Get CallConnected event](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/quickstarts/call-automation/callflows-for-customer-interactions.md?pivots=programming-language-csharp#update-programcs) from Call Automation SDK.

2. When you answer the call or a call is created, it returns the `serverCallId` as a property of the `AnswerCallResult` or `CreateCallResult` API responses respectively.


When using [Calling Client SDK](get-started-with-video-calling.md), you can retrieve the `serverCallId` by using the `getServerCallId` method on the call. 
Use this example to learn how to [Get serverCallId](get-server-call-id.md) from the Calling Client SDK. 

Let's get started with a few simple steps.

## 1. Create a Call Automation client

Call Recording APIs are part of the Azure Communication Services [Call Automation](../../concepts/call-automation/call-automation.md) libraries. Thus, it's necessary to create a Call Automation client.

To create a call automation client, use your Communication Services connection string and pass it to `CallAutomationClient` object.

```javascript
const callAutomationClient = new CallAutomationClient.CallAutomationClient("<ACSConnectionString>");
```

## 2. Start recording session with StartRecordingOptions using 'StartAsync' API

Use the `callConnectionId` or `serverCallId` received during initiation of the call.
- Use `RecordingContent` to pass the recording content type. Use `AUDIO`.
- Use `RecordingChannel` to pass the recording channel type. Use `MIXED` or `UNMIXED`.
- Use `RecordingFormat` to pass the format of the recording. Use `WAV`.

```javascript
var locator: CallLocator = { id: "<callConnectionId> or <ServerCallId>", kind: "serverCallLocator" };

var options: StartRecordingOptions =
{
  callLocator: locator,
  recordingContent: "audio",
  recordingChannel:"unmixed",
  recordingFormat: "wav",
  recordingStateCallbackEndpointUrl: "<CallbackUri>"
};
var response = await callAutomationClient.getCallRecording().start(options);
```

### 2.1. Start Recording - Bring Your Own Azure Blob Store

Start recording using your designated Azure Blob Storage to store the recorded file once recording is complete.

```javascript
const recordingStorageKind: RecordingStorageKind = "azureBlobStorage"
const recordingStorage: RecordingStorage = { 
       recordingStorageKind: recordingStorageKind, 
       recordingDestinationContainerUrl: "<YOUR_STORAGE_CONTAINER_URL>"
   }
var options: StartRecordingOptions = {
       callLocator: callLocator,
       recordingContent: "audio",
       recordingChannel:"unmixed",
       recordingFormat: "wav",
       recordingStateCallbackEndpointUrl: "<CallbackUri>",
       recordingStorage: recordingStorage
   };
var response = await callAutomationClient.getCallRecording().start(options);
```
## 2.2. Start recording session with Pause mode enabled using 'StartAsync' API
> **Note:**
> **Recordings will need to be resumed for recording file to be generated.**
```javascript
var locator: CallLocator = { id: "<callConnectionId> or <ServerCallId>", kind: "serverCallLocator" };

var options: StartRecordingOptions =
{
  callLocator: locator,
  recordingContent: "audio",
  recordingChannel:"unmixed",
  recordingFormat: "wav",
  pauseOnStart: true
  recordingStateCallbackEndpointUrl: "<CallbackUri>",
  audioChannelParticipantOrdering:[{communicationUserId: "<ACS_USER_MRI>"}]
};
var response = await callAutomationClient.getCallRecording().start(options);
```

### 2.3. Only for Unmixed - Specify a user on channel 0
To produce unmixed audio recording files, you can use the `AudioChannelParticipantOrdering` functionality to specify which user you want to record on channel 0. The rest of the participants are assigned to a channel as they speak. If you use `RecordingChannel.Unmixed` but don't use `AudioChannelParticipantOrdering`, Call Recording assigns channel 0 to the first participant speaking.

```javascript
var locator: CallLocator = { id: "<callConnectionId> or <ServerCallId>", kind: "serverCallLocator" };

var options: StartRecordingOptions =
{
  callLocator: locator,
  recordingContent: "audio",
  recordingChannel:"unmixed",
  recordingFormat: "wav",
  recordingStateCallbackEndpointUrl: "<CallbackUri>",
  audioChannelParticipantOrdering:[{communicationUserId: "<ACS_USER_MRI>"}]
};
var response = await callAutomationClient.getCallRecording().start(options);
```

### 2.4. Only for Unmixed - Specify channel affinity

```javascript
var options: StartRecordingOptions =
{
  callLocator: locator,
  recordingContent: "audio",
  recordingChannel:"unmixed",
  recordingFormat: "wav",
  recordingStateCallbackEndpointUrl: "<CallbackUri>",
  ChannelAffinity:
  [
    {
      channel:0,
      targetParticipant:{communicationUserId: "<ACS_USER_MRI>"}
    }
  ]
};
var response = await callAutomationClient.getCallRecording().start(options);
```
The `StartAsync` API response contains the `recordingId` of the recording session.

## 3.	Stop recording session using 'stop' API

Use the `recordingId` received in response to `start`.

```javascript
var stopRecording = await callAutomationClient.getCallRecording().stop(recordingId);
```

## 4.	Pause recording session using 'pause' API

Use the `recordingId` received in response to `start`.

```javascript
var pauseRecording = await callAutomationClient.getCallRecording().pause(recordingId);
```

## 5.	Resume recording session using 'ResumeAsync' API

Use the `recordingId` received in response to `start`.

```javascript
var resumeRecording = await callAutomationClient.getCallRecording().resume(recordingId);
```

## 6.	Download recording File using 'DownloadToAsync' API

Use an [Azure Event Grid](../../../event-grid/event-schema-communication-services.md) web hook or other triggered action should be used to notify your services when the recorded media is ready for download.

An Event Grid notification `Microsoft.Communication.RecordingFileStatusUpdated` is published when a recording is ready for retrieval, typically a few minutes after the recording process completes (such as the meeting ended or the recording stopped). Recording event notifications include `contentLocation` and `metadataLocation`, which are used to retrieve both recorded media and a recording metadata file.

The following code is an example of the event schema.

```
{
    "id": string, // Unique guid for event
    "topic": string, // /subscriptions/{subscription-id}/resourceGroups/{group-name}/providers/Microsoft.Communication/communicationServices/{communication-services-resource-name}
    "subject": string, // /recording/call/{call-id}/serverCallId/{serverCallId}
    "data": {
        "recordingStorageInfo": {
            "recordingChunks": [
                {
                    "documentId": string, // Document id for the recording chunk
                    "contentLocation": string, //Azure Communication Services URL where the content is located
                    "metadataLocation": string, // Azure Communication Services URL where the metadata for this chunk is located
                    "deleteLocation": string, // Azure Communication Services URL to use to delete all content, including recording and metadata.
                    "index": int, // Index providing ordering for this chunk in the entire recording
                    "endReason": string, // Reason for chunk ending: "SessionEnded", "ChunkMaximumSizeExceeded”, etc.
                }
            ]
        },
        "recordingStartTime": string, // ISO 8601 date time for the start of the recording
        "recordingDurationMs": int, // Duration of recording in milliseconds
        "sessionEndReason": string // Reason for call ending: "CallEnded", "InitiatorLeft”, etc.
    },
    "eventType": string, // "Microsoft.Communication.RecordingFileStatusUpdated"
    "dataVersion": string, // "1.0"
    "metadataVersion": string, // "1"
    "eventTime": string // ISO 8601 date time for when the event was created
}
```

Use `downloadToPath` API to download the recorded media.

```javascript
var response = await callAutomationClient.getCallRecording().downloadToPath(contentLocation, fileName);
```
The `downloadLocation` for the recording can be fetched from the `contentLocation` attribute of the `recordingChunk`. Use the `DownloadToAsync` method to download the content into a provided filename.

## 7. Delete recording content using 'DeleteAsync' API

Use `delete` API for deleting the recording content (for example, recorded media, metadata)

```javascript
var response = await callAutomationClient.getCallRecording().delete(deleteLocation);
```



## Clean up resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it. Learn more about [cleaning up resources](../create-communication-resource.md#clean-up-resources).

## Next steps

For more information, see the following articles:

- Download our [Java](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/ServerRecording), [Python](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/call-recording), and [JavaScript](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/call-recording) call recording sample apps.
- Learn more about [Call Recording](../../concepts/voice-video-calling/call-recording.md).
- Learn more about [Call Automation](../../concepts/call-automation/call-automation.md).
