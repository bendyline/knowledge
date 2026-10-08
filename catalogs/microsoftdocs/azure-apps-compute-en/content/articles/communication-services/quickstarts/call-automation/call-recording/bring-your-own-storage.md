---
ms.author: rahulva
title: Azure Communication Services Call Recording Bring Your Own Storage
titleSuffix: An Azure Communication Services document
description: Quickstart for Bring your own storage
author: dbasantes
services: azure-communication-services
ms.date: 03/17/2023
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: calling
zone_pivot_groups: acs-csharp-java
ms.custom: mode-api, devx-track-extended-java
---
# Call recording: Bring your own Azure storage quickstart


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This quickstart gets you started with Bring your own Azure storage for Call Recording. To start using Bring your own Azure Storage functionality, make sure you're familiar with the [Call Recording APIs](../../voice-video-calling/get-started-call-recording.md).

## Prerequisite: Setting up Managed Identity and Role Based Access Controls(RBAC) role assignments

### 1. Enable system assigned managed identity for Azure Communication Services

Diagram showing a communication service resource with managed identity disabled

1. Open your Azure Communication Services resource. Navigate to *Identity* on the left.
2. Enabled System Assigned Managed Identity and click on *Save*.
3. Once completed, you're able to see the Object principal ID of the newly created identity.

Diagram showing a communication service resource with managed identity enabled

4. Once the identity is successfully created, click on *Azure role assignments* to start adding role assignments.

### 2. Add role assignment

1. Click on *"Add role assignment"*

Diagram showing a communication service resource managed identity adding role assignment

2. On the *"Add role assignment"* panel, select the following values
     1. Scope: **Storage**
     2. Subscription: **Choose your subscription**
     3. Resource: **Choose your storage account**
     4. Role: **Azure Communication Services needs *"Storage Blob Data Contributor"* to be able to write to your storage account.**
    
Diagram showing a communication service resource managed identity adding role assignment details

3. Click on *Save*.
4. Once completed, you see the newly added role assignment in the *"Azure role assignment"* window.

Diagram showing a communication service resource managed identity role assignment success

## Start recording session with external storage specified

Use the server call ID received during initiation of the call.

**Applies to: programming-language-csharp**


## Using Azure blob storage for external storage

```csharp
StartRecordingOptions recordingOptions = new StartRecordingOptions(new ServerCallLocator("<serverCallId>"))
{
    //...
    ExternalStorage = new BlobStorage(new Uri("<Insert Container / Blob Uri>"))
};
               
Response<RecordingStateResult> startRecordingWithResponse = await callAutomationClient.GetCallRecording()
        .StartRecordingAsync(options: recordingOptions);
```



**Applies to: programming-language-java**


## Using Azure blob storage for external storage

```java
StartRecordingOptions recordingOptions = new StartRecordingOptions(new ServerCallLocator("<serverCallId>"))
                .setExternalStorage(new BlobStorage("<Insert Container / Blob Uri>"));

Response<StartCallRecordingResult> response = callAutomationClient.getCallRecording()
.startRecordingWithResponse(recordingOptions, null);
```



### Notification on successful export

To notify your services when the recorded media is ready and exported to the external storage location, use an [Azure Event Grid](../../../../event-grid/overview.md) web hook, or other triggered action.

Refer to this example of the event schema.

```JSON
{
    "id": "string", // Unique guid for event
    "topic": "string", // /subscriptions/{subscription-id}/resourceGroups/{group-name}/providers/Microsoft.Communication/communicationServices/{communication-services-resource-name}
    "subject": "string", // /recording/call/{call-id}/serverCallId/{serverCallId}
    "data": {
        "storageType": "string", // AzureBlob etc.
        "recordingId": "string", // unique ID for recording
        "recordingStorageInfo": {
            "recordingChunks": [
                {
                    "documentId": "string", // Document ID for the recording chunk
                    "contentLocation": "string", //Azure Communication Services URL where the content is located
                    "metadataLocation": "string", // Azure Communication Services URL where the metadata for this chunk is located
                    "deleteLocation": "string", // Azure Communication Services URL to use to delete all content, including recording and metadata.
                    "index": "int", // Index providing ordering for this chunk in the entire recording
                    "endReason": "string", // Reason for chunk ending: "SessionEnded", "ChunkMaximumSizeExceeded”, etc.
                }
            ]
        },
        "recordingStartTime": "string", // ISO 8601 date time for the start of the recording
        "recordingDurationMs": "int", // Duration of recording in milliseconds
        "sessionEndReason": "string" // Reason for call ending: "CallEnded", "InitiatorLeft”, etc.
    },
    "eventType": "string", // "Microsoft.Communication.RecordingFileStatusUpdated"
    "dataVersion": "string", // "1.0"
    "metadataVersion": "string", // "1"
    "eventTime": "string" // ISO 8601 date time for when the event was created
}
```
### Notification and Action for recording export failure.

Failure to export recording file can occur due to incorrect configuration settings or service outages.
In both cases, the failure notification includes the download url to obtain recordings. 
Download recordings from the location in failure notification within 24 hours.

### Folder Structure for Call Recording

Recordings are stored in the following format as shown in the diagram.
-   /YYYYMMDD/callId/first_8_of_recordingId + '-' + unique guid/[chunk-id]-acsmetadata.documentId.json
-   /YYYYMMDD/callId/first_8_of_recordingId + '-' + unique guid/[chunk-id]-audiomp3.documentId.mp3

Diagram showing a Call Recording Folder structure

## Next steps

For more information, see the following articles:

- Download our [Java](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/ServerRecording) call recording sample app
- Learn more about [Call Recording](../../../concepts/voice-video-calling/call-recording.md)
- Learn more about [Call Automation](../../../concepts/call-automation/call-automation.md)
