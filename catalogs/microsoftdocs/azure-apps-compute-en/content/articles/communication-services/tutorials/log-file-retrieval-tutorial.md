---
title: Log file retrieval
titleSuffix: An Azure Communication Services tutorial
description: Learn how to retrieve Log Files from the Calling SDK for enhanced supportability.
author: adamhammer
manager: jamcheng
services: azure-communication-services

ms.author: adamhammer
ms.date: 06/30/2021
ms.topic: tutorial
ms.service: azure-communication-services
ms.subservice: identity
ms.custom: devx-track-extended-java
zone_pivot_groups: acs-programming-languages-java-swift-csharp
---

# Log File Access tutorial


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


In this tutorial, you learn how to access the Log Files stored on the device with the Calling SDK.

## Prerequisites

- Access to a `CallClient` instance

**Applies to: programming-language-java**

```java
// Call when a support request is being called
private void onSupportRequest(String userMessage) {
    // Assuming the getSupportFiles method returns a List or similar collection.
    List<File> supportFiles = callClient.getdebugInfo().getSupportFiles();

    // Send the files and any user message to your Ticket System            
    dispatchSupportRequestToBackend(userMessage, supportFiles);
}
```



**Applies to: programming-language-swift**

```swift
// Call when a support request is being called
private func onSupportRequest(userMessage: String) {
    // Assuming the getSupportFiles method returns an array or similar collection.
    let supportFiles = callClient.debugInfo.getSupportFiles()
    
    // Send the files and any user message to your Ticket System            
    dispatchSupportRequestToBackend(userMessage: userMessage, supportFiles: supportFiles)
}
```


**Applies to: programming-language-csharp**

```csharp
// Call when a support request is being called
private void OnSupportRequest(string userMessage) 
{
    // Assuming the GetSupportFiles method returns a List or similar collection.
    IReadOnlyList<string> supportFiles = callClient.DebugDetails.SupportFiles;

    // Send the files and any user message to your Ticket System            
    DispatchSupportRequestToBackend(userMessage, supportFiles);
}
```



## Next steps

Refer to the [integrating support document](../concepts/voice-video-calling/retrieve-support-files.md) for more in depth look at how to structure an end to end support flow. This document helps direct you to the tools available to you in order to create an effective support flow in your Applications.

## You may also like

## Tutorials
- [End of call Survey](end-of-call-survey-tutorial.md)
- [Support form integration with the ACS UI Library](collecting-user-feedback/collecting-user-feedback.md)

## Concept Docs
- [User feedback in native calling scenarios](../concepts/voice-video-calling/retrieve-support-files.md)
- [User Facing Diagnostics](../concepts/voice-video-calling/user-facing-diagnostics.md)
