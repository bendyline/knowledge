---

title: Set video constraints in a calling app
titleSuffix: An Azure Communication Services article
description: This article describes how to set video constraints in your existing calling app using Azure Communication Services.
author: sloanster
ms.author: micahvivion
services: azure-communication-services
ms.date: 06/26/2025
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: calling
zone_pivot_groups: acs-plat-web-ios-android-windows
ms.custom: mode-other, devx-track-js
---

# Set video constraints in a calling app


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


**Applies to: platform-windows**


> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> This preview version is provided without a service-level agreement, and we don't recommend it for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


## Overview

The Video Constraints API enables developers to control the video quality from within their video calls. In this quickstart guide, we illustrate how to use the API to set the constraints.

### Prerequisites

Refer to the [Voice Calling Quickstart](getting-started-with-calling.md?pivots=platform-windows) to set up a sample app with voice calling.

### Classes

| Name | Description |
| --- | --- |
| VideoConstraints | Used to hold both incoming video constraints and outgoing video constraints. |
| OutgoingVideoConstraints | Used to specify constraints (`MaxWidth \| MaxHeight \| MaxFrameRate`) for outgoing video streams. |
| IncomingVideoConstraints | Used to specify constraints (`MaxWidth \| MaxHeight`) for incoming video streams. |

### Using video constraints

The following sections explain how the video constraints can be set for incoming and/or outgoing video streams at different times of a call.

#### Set video constraints before starting a call

For *incoming* video streams, an `IncomingVideoConstraints` needs to be added to the `IncomingVideoOptions`.
```csharp
    var IncomingVideoOptions = new IncomingVideoOptions()
    {
        Constraints = new IncomingVideoConstraints() 
        { 
            MaxWidth = /*value*/, 
            MaxHeight = /*value*/ 
        },
        // other options
        // ...
    }
```

For *outgoing* video streams, an `OutgoingVideoConstraints` needs to be added to the `OutgoingVideoOptions`.

```csharp
    var OutgoingVideoOptions = new OutgoingVideoOptions()
    {
        Constraints = new OutgoingVideoConstraints() 
        { 
            MaxWidth = /*value*/, 
            MaxHeight = /*value*/, 
            MaxFrameRate = /*value*/ 
        },
        // other options
        // ...
    }
```

Since the options are used to start/join a call, the constraints can then be applied to the streams automatically. For example:

```csharp
    var joinCallOptions = new JoinCallOptions()
    {
        IncomingVideoOptions = new IncomingVideoOptions()
        {
            Constraints = new IncomingVideoConstraints() 
            { 
                MaxWidth = /*value*/, 
                MaxHeight = /*value*/ 
            },
            // other options
            // ...
        },

        OutgoingVideoOptions = new OutgoingVideoOptions()
        {
            Constraints = new OutgoingVideoConstraints() 
            { 
                MaxWidth = /*value*/, 
                MaxHeight = /*value*/, 
                MaxFrameRate = /*value*/ 
            },
            // other options
            // ...
        }
    };
    await callAgent.JoinAsync(locator, joinCallOptions);
```

#### Set video constraints during a call
Instead of setting the video constraints before starting a call, you can also dynamically adjust the video constraints during a call. You need to call `SetVideoConstraints` on your `Call` type class and provide the constraints.
```csharp

    OutgoingVideoConstraints outgoingVideoConstraints = new OutgoingVideoConstraints()
    {
        outgoingVideoConstraints.MaxWidth = /*value*/ ;
        outgoingVideoConstraints.MaxHeight = /*value*/ ;
        outgoingVideoConstraints.MaxFrameRate = /*value*/ ;
    };
    
    IncomingVideoConstraints incomingVideoConstraints = new IncomingVideoConstraints()
    {
        incomingVideoConstraints.MaxWidth = /*value*/ ;
        incomingVideoConstraints.MaxHeight = /*value*/ ;
    };
  
    VideoConstraints constraints = new VideoConstraints();
    constraints.OutgoingVideoConstraints = outgoingVideoConstraints;
    constraints.IncomingVideoConstraints = incomingVideoConstraints;
    
    call.SetVideoConstraints(constraints);
```

To reset/remove the video constraints you previously set, you have to follow the preceding pattern and provide `0` as a constraint value. Providing `null` values for either `IncomingVideoConstraints` or `OutgoingVideoConstraints` doesn't reset/remove the constraints and the constraints with a `null` value are ignored. 


### Limitations

> **Note:**
> Be aware of these limitations when using the Video Constraints API. Some of the limitations should be resolved in future releases.

There are some known limitations to the current Video Constraints API. 

* The constraint is a **max** constraint, which means the possible constraint value can be the specified value or smaller. There's no guarantee that the actual value remains the same as user-specified.

* When the user sets a constraint value that is too small, the SDK uses the smallest available value that is supported.

* For setting `OutgoingVideoConstraints` during a call, the current ongoing video stream doesn't automatically pick up the constraints specified. In order to make the constraints take effect, you need to stop and restart the outgoing video.

* `IncomingVideoConstraints` currently is a user-preferred constraint instead of a hard constraint, which means that depending on your network and hardware, the actual value received might still exceed the constraint set.

### Media stats
To evaluate and compare the video quality after applying the video constraints, you can access [MediaStats API](../../concepts/voice-video-calling/media-quality-sdk.md) to get video resolution and bitrate information of the stream. The media stats also include other granular stats related to the streams, such as jitter, packet loss, round trip time, etc.


**Applies to: platform-android**


> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> This preview version is provided without a service-level agreement, and we don't recommend it for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


## Overview

The Video Constraints API enables developers to control the video quality from within their video calls. In this article, we illustrate how to use the API to set the constraints.

### Prerequisites

Refer to the [Voice Calling Quickstart](getting-started-with-calling.md?pivots=platform-android) to set up a sample app with voice calling.

### Classes

| Name | Description |
| --- | --- |
| VideoConstraints | Used to hold both incoming video constraints and outgoing video constraints. |
| OutgoingVideoConstraints | Used to specify constraints (`maxWidth \| maxHeight \| maxFrameRate`) for outgoing video streams. |
| IncomingVideoConstraints | Used to specify constraints (`maxWidth \| maxHeight`) for incoming video streams. |

### Using video constraints

The following sections explain how the video constraints can be set for incoming and/or outgoing video streams at different times of a call.

#### Set video constraints before starting a call

For *incoming* video streams, you need to add an `IncomingVideoConstraints` to the `IncomingVideoOptions`.

```java
    IncomingVideoConstraints incomingVideoConstraints = new IncomingVideoConstraints();
    incomingVideoConstraints.setMaxWidth(/*value*/);
    incomingVideoConstraints.setMaxHeight(/*value*/);

    // ...

    IncomingVideoOptions incomingVideoOptions = new IncomingVideoOptions();
    incomingVideoOptions.setConstraints(incomingVideoConstraints);
```

For *outgoing* video streams, add an `OutgoingVideoConstraints` to the `OutgoingVideoOptions`.

```java
    OutgoingVideoConstraints outgoingVideoConstraints = new OutgoingVideoConstraints() 
    outgoingVideoConstraints.setMaxWidth(/*value*/); 
    outgoingVideoConstraints.setMaxHeight(/*value*/); 
    outgoingVideoConstraints.setMaxFrameRate(/*value*/); 
   
    // ...
    
    OutgoingVideoOptions outgoingVideoOptions = new OutgoingVideoOptions();
    outgoingVideoOptions.setConstraints(outgoingVideoConstraints);
```

Since the options are used to start/join a call, you can apply the constraints to the streams automatically. For example:

```java
    JoinCallOptions joinCallOptions = new JoinCallOptions();
    joinCallOptions.setIncomingVideoOptions(incomingVideoOptions);
    joinCallOptions.setOutgoingVideoOptions(outgoingVideoOptions);
    callAgent.Join(context, locator, joinCallOptions);
```

#### Set video constraints during a call

Instead of setting the video constraints before starting a call, you can also dynamically adjust the video constraints during a call. You need to call `setVideoConstraints` on your `Call` type class and provide the constraints.

```java

    OutgoingVideoConstraints outgoingVideoConstraints = new OutgoingVideoConstraints();
    outgoingVideoConstraints.setMaxWidth(/*value*/); 
    outgoingVideoConstraints.setMaxHeight(/*value*/); 
    outgoingVideoConstraints.setMaxFrameRate(/*value*/); 
    
    IncomingVideoConstraints incomingVideoConstraints = new IncomingVideoConstraints();
    incomingVideoConstraints.setMaxWidth(/*value*/);
    incomingVideoConstraints.setMaxHeight(/*value*/);
  
    VideoConstraints constraints = new VideoConstraints();
    constraints.setOutgoingVideoConstraints(outgoingVideoConstraints);
    constraints.setIncomingVideoConstraints(incomingVideoConstraints);
    
    call.setVideoConstraints(constraints);
```

To reset/remove the video constraints you previously set, follow the preceding pattern and provide `0` as a constraint value. Providing `null` values for either `IncomingVideoConstraints` or `OutgoingVideoConstraints` doesn't reset/remove the constraints and the constraints with a `null` value are ignored. 

### Limitations

> **Note:**
> Be aware of these limitations when using the Video Constraints API. Some of the limitations should be resolved in future releases.

There are some known limitations to the current Video Constraints API. 

* The constraint is a **max** constraint, which means the possible constraint value can be the specified value or smaller. There's no guarantee that the actual value remains the same as user-specified.

* When the user sets a constraint value that is too small, the SDK uses the smallest available value that is supported.

* For setting `OutgoingVideoConstraints` during a call, the current ongoing video stream doesn't automatically pick up the constraints specified. In order to make the constraints take effect, you need to stop and restart the outgoing video.

* `IncomingVideoConstraints` currently is a user-preferred constraint instead of a hard constraint, which means that depending on your network and hardware, the actual value received might still exceed the constraint set.

### Media stats

To evaluate and compare the video quality after applying the video constraints, you can access [MediaStats API](../../concepts/voice-video-calling/media-quality-sdk.md) to get video resolution and bitrate information of the stream. The media stats also include other granular stats related to the streams, such as jitter, packet loss, round trip time, and so on.


**Applies to: platform-ios**


> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> This preview version is provided without a service-level agreement, and we don't recommend it for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


## Overview

The Video Constraints API enables developers to control the video quality from within their video calls. In this quickstart guide, we illustrate how to use the API to set the constraints.

### Prerequisites

Refer to the [Voice Calling Quickstart](getting-started-with-calling.md?pivots=platform-ios) to set up a sample app with voice calling.

### Classes

| Name | Description |
| --- | --- |
| VideoConstraints | Used to hold both incoming video constraints and outgoing video constraints. |
| OutgoingVideoConstraints | Used to specify constraints (`maxWidth \| maxHeight \| maxFrameRate`) for outgoing video streams. |
| IncomingVideoConstraints | Used to specify constraints (`maxWidth \| maxHeight`) for incoming video streams. |

### Using video constraints

The following sections explain how the video constraints can be set for incoming and/or outgoing video streams at different times of a call.

#### Set video constraints before starting a call

For *incoming* video streams, you need to add an `IncomingVideoConstraints` to the `IncomingVideoOptions`.

```swift
    let incomingVideoConstraints = IncomingVideoConstraints()
    incomingVideoConstraints.maxWidth = /*value*/ 
    incomingVideoConstraints.maxHeight = /*value*/ 
    
    // ...
    
    let incomingVideoOptions = IncomingVideoOptions()
    incomingVideoOptions.constraints = incomingVideoConstraints
```

For *outgoing* video streams, an `OutgoingVideoConstraints` needs to be added to the `OutgoingVideoOptions`.
```swift
    let outgoingVideoConstraints = OutgoingVideoConstraints()
    outgoingVideoConstraints.maxWidth = /*value*/ 
    outgoingVideoConstraints.maxHeight = /*value*/
    outgoingVideoConstraint.maxFrameRate = /*value*/ 
    
    // ...

    let outgoingVideoOptions = OutgoingVideoOptions()
    outgoingVideoOptions.constraints = outgoingVideoConstraints
```

Since the options are used to start/join a call, the constraints can then be applied to the streams automatically. For example:

```swift     
    let incomingVideoConstraints = IncomingVideoConstraints()
    incomingVideoConstraints.maxWidth = /*value*/ 
    incomingVideoConstraints.maxHeight = /*value*/ 
    let incomingVideoOptions = IncomingVideoOptions()
    incomingVideoOptions.constraints = incomingVideoConstraints
    
    let outgoingVideoConstraints = OutgoingVideoConstraints()
    outgoingVideoConstraints.maxWidth = /*value*/ 
    outgoingVideoConstraints.maxHeight = /*value*/
    outgoingVideoConstraint.maxFrameRate = /*value*/ 
    let outgoingVideoOptions = OutgoingVideoOptions()
    outgoingVideoOptions.constraints = outgoingVideoConstraints
    
    let joinCallOptions = new JoinCallOptions()
    joinCallOptions.incomingVideoOptions = incomingVideoOptions
    joinCallOptions.outgoingVideoOptions = outgoingVideoOptions

    callAgent.join(with: locator, joinCallOptions: joinCallOptions);
```

#### Set video constraints during a call

Instead of setting the video constraints before starting a call, you can dynamically adjust the video constraints during a call. You need to call `set(videoConstraints)` on your `Call` type class and provide the constraints.

```swift

    let outgoingVideoConstraints = OutgoingVideoConstraints()
    outgoingVideoConstraints.maxWidth = /*value*/ 
    outgoingVideoConstraints.maxHeight = /*value*/
    outgoingVideoConstraint.maxFrameRate = /*value*/ 
    
    let incomingVideoConstraints = IncomingVideoConstraints()
    incomingVideoConstraints.maxWidth = /*value*/ 
    incomingVideoConstraints.maxHeight = /*value*/ 
  
    let videoConstraints = VideoConstraints()
    videoConstraints.outgoingVideoConstraints = outgoingVideoConstraints
    videoConstraints.incomingVideoConstraints = incomingVideoConstraints
    
    call?.set(videoConstraints: videoConstraints)
```

To reset/remove the video constraints you previously set, follow the preceding pattern and provide `0` as a constraint value. Providing `null` values for either `IncomingVideoConstraints` or `OutgoingVideoConstraints` doesn't reset/remove the constraints and the constraints with a `null` value are ignored. 

### Limitations

> **Note:**
> Be aware of these limitations when using the Video Constraints API. Some of the limitations should be resolved in future releases.

There are some known limitations to the current Video Constraints API. 

* The constraint is a **max** constraint, which means the possible constraint value can be the specified value or smaller. There's no guarantee that the actual value remains the same as user-specified.

* When the user sets a constraint value that is too small, the SDK uses the smallest available value that is supported.

* For setting `OutgoingVideoConstraints` during a call, the current ongoing video stream doesn't automatically pick up the constraints specified. In order to make the constraints take effect, you need to stop and restart the outgoing video.

* `IncomingVideoConstraints` currently is a user-preferred constraint instead of a hard constraint, which means that depending on your network and hardware, the actual value received might still exceed the constraint set.

### Media stats

To evaluate and compare the video quality after applying the video constraints, you can access [MediaStats API](../../concepts/voice-video-calling/media-quality-sdk.md) to get video resolution and bitrate information of the stream. The media stats also include other granular stats related to the streams, such as jitter, packet loss, round trip time, and so on.


**Applies to: platform-web**


You can set video constraints in your calls to control the video quality based on resolution or frameRate or bitrate in your video calls. In this quickstart guide, we illustrate how to set video constraints at the start of a call and how to use our `setConstraints` method on the call object to set video constraints dynamically during the call.

## Send video constraints

Azure Communication Services Web Calling SDK supports setting the maximum video resolution, framerate, or bitrate that a client sends. The sender video constraints are supported on Desktop browsers (Chrome, Microsoft Edge, Firefox) and when using iOS Safari mobile browser or Android Chrome mobile browser.

| Supported Constraints |
| --- |
| **Incoming video**: resolution<br />**Outgoing video**: resolution, framerate, bitrate |

### Set video constraints at the start of a call - outgoing (send) video

The video constraints setting is implemented on the `Call` interface. To use the Video Constraints, you can specify the constraints from within `CallOptions` when you make a call, accept a call, or join a call. You must specify `localVideoStreams` in `videoOptions`.

Constraints don't work if you join a call with audio only option and turn on the camera later. In this case, you can set video constraints dynamically using the `setConstraints` method on the `Call` interface.

```javascript
const callOptions = {
    videoOptions: {
        localVideoStreams: [...],
        constraints: {
            send: {
                bitrate: {
                    max: 575000
                },
                frameHeight: {
                    max: 240
                },
                frameRate: {
                    max: 20
                }
            }
        }
    },
    audioOptions: {
        muted: false
    }
};
// make a call
this.callAgent.startCall(identitiesToCall, callOptions);
// join a group call
this.callAgent.join({ groupId }, callOptions);
// accept an incoming call
this.incomingCall.accept(callOptions)
```

Video constraints types are described as follows:
```javascript
export declare interface VideoOptions {
    localVideoStreams?: LocalVideoStream[];
    //video constraint when call starts
    constraints?: VideoConstraints;
};

export declare type VideoConstraints = {
    send?: VideoSendConstraints;
};

export type VideoSendConstraints = {
    /**
     * Resolution constraint
     */
    frameHeight?: MediaConstraintRange;

    /**
     * FrameRate constraint
     */
    frameRate?: MediaConstraintRange;

    /**
     * Bitrate constraint
     */
    bitrate?: MediaConstraintRange;
};

export declare type MediaConstraintRange = {
    max?: number;
};
```

When setting video constraints, the SDK chooses the nearest value that falls within the constraint set to prevent the values for resolution, frameRate, and bitrate to not exceed the maximum constraint values set. Also, when the resolution constraint value is too small, the SDK chooses the smallest available resolution. In this case, the height of chosen resolution can be larger than the constraint value.

> **Note:**
> For all `bitrate`, `frameHeight` and `frameRate`, the constraint value is a `max` constraint, which means the actual value in the call can be the specified value or smaller.
> There's no guarantee that the sent video resolution remains at the specified resolution.

The `frameHeight` in `VideoSendConstraints` has a different meaning when a mobile device is in portrait mode. In portrait mode, this value indicates the shorter side of the device. For example, specifying `frameHeight.max` value with 240 on a 1080(W) x 1920(H) device in portrait mode, the constraint height is on the 1080(W) side. When the same device is in landscape mode (1920(W) x 1080(H)), the constraint is on the 1080(H) side.

If you use MediaStats API to track the sent video resolution, you might find out that the sent resolution can change during the call. It can go up and down, but should be equal or smaller than the constraint value you provide. This resolution change is an expected behavior. The browser also has some degradation rule to adjust sent resolution based on cpu or network conditions.

### Setting video constraints during the call - outgoing (send) video

You can set video constraints during the call by using the `setConstraints` method on the `Call` object.

```javascript
// For eg, when you've started a call,
const currentCall = this.callAgent.startCall(identitiesToCall, callOptions);

// To set constraints during the call,
await currentCall.setConstraints({
    video: {
        send: {
            frameHeight: {
                max: 360
            },
            frameRate: {
                max: 15
            }
        }
    }
});

// To set only a particular constraint (the others will stay as what they were set before, if they were set)
await currentCall.setConstraints({
    video: {
        send: {
            bitrate: {
                max: 400000
            }
        }
    }
});

// To unset any constraint,
await currentCall.setConstraints({
    video: {
        send: {
            frameHeight: {
                max: 0
            }
        }
    }
});
```

> **Note:**
> Setting constraint value as `0` unsets any previously set constraints. You can use this way to reset or remove constraints.

## Receive video constraints

Managing video quality for incoming streams involves understanding the Azure Communication Services resolution ladder, which is a predefined list of video resolutions with estimated upper and lower bitrate boundaries. When a client requests a specific resolution, the WebJS and backend server consults the resolution ladder to allocate the appropriate video bitrate, considering both network conditions and device capabilities.

Defining the video render size is a crucial step for developers aiming to control the bitrate and frame rate of an incoming video stream. The initial quality and resolution of a video stream is determined by the size of the renderer created and placed on a web page. For instance, if the renderer is small, the WebJS SDK requests a smaller resolution. Conversely, if the renderer is large, the ACS SDK aims for the best possible resolution from the server. This process ensures that the video quality is optimized based on the client's requirements and capabilities. When a client requests a specific resolution, the server consults the resolution ladder to allocate the appropriate video bitrate, considering both network conditions and device capabilities.

The resolution ladder table provides what the WebJS calling SDK resolution ladder consists of with the estimated incoming video bitrates for various resolutions. These details help developers understand the relationship between resolution, bit rate, and frame rate and the approximate amount of bandwidth a specific incoming video stream uses. For example, a resolution of 1280x720 streams at 30 FPS with the client using an approximate minimum bitrate of one (1) MBPS and an approximate maximum bitrate of two and one half (2.5) MBPS.

The Azure Communication Services WebJS Calling SDK adjusts video size based on available bandwidth to ensure a consistent communication experience. WebJS Calling SDK adjusts the video size based on algorithms that monitor network conditions. When network bandwidth is sufficient, the SDK increases video resolution to its maximum level based on the render size defined on the web page. Conversely, when bandwidth is limited, it reduces video resolution to prevent buffering and maintain a stable connection. 

The following table provides the resolution ladder and estimated bitrates for each resolution and associated FPS delivered at that resolution.

| Height | Width | FPS | Min Bitrate (MBps) | Max Bitrate (MBps) |
| --- | --- | --- | --- | --- |
| 1080 | 1920 | 30 | 1.75 | 10 |
| 720 | 1280 | 30 | 1 | 2.5 |
| 540 | 960 | 30 | 0.5 | 1.125 |
| 360 | 640 | 30 | 0.4 | 0.57 |
| 240 | 426 | 15 | 0.125 | 0.5 |
| 240 | 320 | 15 | 0.2 | 0.175 |

## Using Media statics to understand video constraints impact

To evaluate and compare the video quality after applying the video constraints, you can access [MediaStats API](../../concepts/voice-video-calling/media-quality-sdk.md) to get video resolution and bitrate information of the sending stream. The media stats also include other granular stats related to the streams, such as jitter, packet loss, round trip time, and so on.

```javascript
const mediaStatsFeature = call.feature(Features.MediaStats);
const mediaStatsCollector = mediaStatsFeature.createCollector();

mediaStatsCollector.on('sampleReported', (sample: SDK.MediaStatsReportSample) => {
    // process the stats for the call.
    console.log(sample);
});
```




## Next steps

- Learn about [Video Constraints concept document](../../concepts/voice-video-calling/video-constraints.md)
- Learn more about [Calling SDK capabilities](getting-started-with-calling.md)
