---
ms.author: chengyuanlai
title: Quickstart - Get audio stream volume in your calling app
titleSuffix: An Azure Communication Services quickstart
description: In this quickstart, you'll learn how to check call volume within your Calling app when using Azure Communication Services.
author: sloanster
services: azure-communication-services
ms.date: 07/28/2025
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: calling
zone_pivot_groups: acs-plat-web-ios-android-windows
ms.custom: mode-other
---

# Quickstart: Access call volume level in your calling app


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


**Applies to: platform-windows**


> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> This preview version is provided without a service-level agreement, and we don't recommend it for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


As a developer you can have control over checking microphone volume. This quickstart shows examples of how to accomplish it within the Azure Communication Services Calling SDK.

## Checking the local audio stream volume
As a developer it can be nice to have the ability to check and display to end users the current local microphone volume level. Azure Communication Services calling API exposes this information using `VolumeLevel`. The `VolumeLevel` value is a float number ranging from 0 to 1 (with 0 noting zero audio detected, 100 as the max level detectable, -1 noting a failed operation).

### Example usage
This example shows how to generate the volume level by accessing `VolumeLevel` of the local audio stream.

```csharp
//Get the volume of the local audio source
OutgoingAudioStream stream = call.ActiveOutgoingAudioStream;

if (stream != null)
{
    try
    {
        Trace.WriteLine("Current volume is: " + stream.VolumeLevel.ToString());
    }
    catch (Exception ex)
    {
        Trace.WriteLine("Failed to get volume for this audio stream");
    }
}
```




**Applies to: platform-android**


> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> This preview version is provided without a service-level agreement, and we don't recommend it for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


As a developer you can have control over checking microphone volume. This quickstart shows examples of how to accomplish it within the Azure Communication Services Calling SDK.

## Checking the local audio stream volume
As a developer it can be nice to have the ability to check and display to end users the current local microphone volume level. Azure Communication Services calling API exposes this information using `getVolumeLevel`. The `getVolumeLevel` value is a float number ranging from 0 to 1 (with 0 noting zero audio detected, 100 as the max level detectable, -1 noting a failed operation).

### Example usage
This example shows how to generate the volume level by accessing `getVolumeLevel` of the local audio stream.

```java
//Get the volume of the local audio source
OutgoingAudioStream stream = call.getActiveOutgoingAudioStream();
try{
    float volume = stream.getVolumeLevel();
}catch (Exception e) {
    e.printStackTrace();
}
```




**Applies to: platform-ios**


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




**Applies to: platform-web**


As a developer you can have control over checking microphone volume in JavaScript. This quickstart shows examples of how to accomplish it within the Azure Communication Services WebJS.

## Checking the audio stream volume
Developers may need to check and display the current local microphone volume or incoming microphone level to end users. The Azure Communication Services calling API provides access to this information through `getVolume`. The `getVolume` value is a number from 0 to 100, where 0 represents no audio detected and 100 is the maximum detectable level. This value is sampled every 200 ms to provide a near real-time measurement of the volume level. Microphone hardware can vary in sensitivity, which may result in different volume readings under similar environmental conditions.

### Example usage
This example shows how to generate the volume level by accessing `getVolume` of the local audio stream and of the remote incoming audio stream.

```javascript
//Get the volume of the local audio source
const volumeIndicator = await new SDK.LocalAudioStream(deviceManager.selectedMicrophone).getVolume();
volumeIndicator.on('levelChanged', ()=>{
    console.log(`Volume is ${volumeIndicator.level}`)
})

//Get the volume level of the remote incoming audio source
const remoteAudioStream = call.remoteAudioStreams[0];
const volumeIndicator = await remoteAudioStream.getVolume();
volumeIndicator.on('levelChanged', ()=>{
    console.log(`Volume is ${volumeIndicator.level}`)
})
```

For a more detailed code sample on how to create a UI display to show the local and current incoming audio level, see [here](https://github.com/Azure-Samples/communication-services-web-calling-tutorial/blob/2a3548dd4446fa2e06f5f5b2c2096174500397c9/Project/src/MakeCall/VolumeVisualizer.js).



## Next steps

For more information, see the following article:

- Learn more about [Calling SDK capabilities](getting-started-with-calling.md)
