---
title: Quickstart - Add volume indicator to your iOS calling app
titleSuffix: An Azure Communication Services document
description: In this quickstart, you'll learn how to check call volume within your calling app when using Azure Communication Services.
author: sloanster

ms.author: chengyuanlai
ms.date: 03/26/2024
ms.topic: include
ms.service: azure-communication-services
ms.subservice: calling
---

> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> This preview version is provided without a service-level agreement, and we don't recommend it for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


As a developer you can have control over checking microphone volume. This quickstart shows examples of how to accomplish it within the Azure Communication Services Calling SDK.

## Checking the local audio stream volume
As a developer it can be nice to have the ability to check and display to end users the current local microphone volume level. Azure Communication Services calling API exposes this information using `volumeLevel`. The `volumeLevel` value is a float number ranging from 0 to 1 (with 0 noting zero audio detected, 100 as the max level detectable, -1 noting a failed operation).

### Example usage
This example shows how to generate the volume level by accessing `volumeLevel` of the local audio stream.

```swift
//Get the volume of the local audio source
if let volume = call?.activeOutgoingAudioStream.volumeLevel {    
    print("Outgoing audio volume is %d", log:log, volume)
} else {
    print("Get volume error")
}
```
