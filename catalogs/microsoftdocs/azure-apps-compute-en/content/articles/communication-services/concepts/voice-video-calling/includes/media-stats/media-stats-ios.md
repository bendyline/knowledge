---
title: Azure Communication Services media quality statistics (iOS)
titleSuffix: An Azure Communication Services concept document
description: Get usage samples of the media quality statistics feature for iOS native.
author: jsaurezle-msft
ms.author: jsaurezlee

services: azure-communication-services
ms.date: 08/09/2023
ms.topic: include
ms.service: azure-communication-services
ms.subservice: calling
---

## Media quality statistics for an ongoing call

Media quality statistics is an extended feature of the core `Call` API. You first need to obtain the `mediaStatisticsCallFeature` API object:

```swift
var mediaStatisticsCallFeature = self.call.feature(Features.mediaStatistics)
```

The `mediaStatisticsCallFeature` object has the following API structure:

- The `didReceiveReport` delegate method listens for periodic reports of the media statistics.
- `reportIntervalInSeconds` gets the interval, in seconds, of the media statistics report generation. The SDK uses `10` second as default.
- `updateReportInterval(inSeconds)` updates the interval, in seconds, of the media statistics report generation. The SDK uses `10` second as default.
- A `MediaStatisticsReport` object contains the definition of the outgoing and incoming media statistics, categorized by audio, video, and screen share.
  - `outgoingMediaStatistics`: The list of media statistics for outgoing media.
    - `audio`: The list of media statistics for the outgoing audio.
    - `video`: The list of media statistics for the outgoing video.
    - `screenShare`: The list of media statistics for the outgoing screen share.
    - `dataChannel`: The list of media statistics for the outgoing data channel.
  - `incomingMediaStatistics`: The list of media statistics for incoming media.
    - `audio`: The list of media statistics for the incoming audio.
    - `video`: The list of media statistics for the incoming video.
    - `screenShare`: The list of media statistics for the incoming screen share.
    - `dataChannel`: The list of media statistics for the incoming data channel.
  - `lastUpdated`: The date when the report was generated.

Then, implement the `didReceiveReport` delegate to get regular updates about the current media quality statistics:

```swift
// Optionally, set the interval for media statistics report generation
mediaStatisticsCallFeature.updateReportInterval(inSeconds: 15)
mediaStatisticsCallFeature.delegate = MediaStatisticsDelegate()


public class MediaStatisticsDelegate : MediaStatisticsCallFeatureDelegate
{
    public func mediaStatisticsCallFeature(_ mediaStatisticsCallFeature: MediaStatisticsCallFeature,
                                      didReceiveReport args: MediaStatisticsReportReceivedEventArgs) {
        let report = args.report

        // Obtain the outgoing media statistics for audio
        let outgoingAudioStatistics = report.outgoingStatistics.audio
    
        // Obtain the outgoing media statistics for video
        let outgoingVideoStatistics = report.outgoingStatistics.video
    
        // Obtain the outgoing media statistics for screen share
        let outgoingScreenShareStatistics = report.outgoingStatistics.screenShare

        // Obtain the outgoing media statistics for data channel
        let outgoingDataChannelStatistics = report.outgoingStatistics.dataChannel
    
        // Obtain the incoming media statistics for audio
        let incomingAudioStatistics = report.incomingStatistics.audio
    
        // Obtain the incoming media statistics for video
        let incomingVideoStatistics = report.incomingStatistics.video
    
        // Obtain the incoming media statistics for screen share
        let incomingScreenShareStatistics = report.incomingStatistics.screenShare

        // Obtain the incoming media statistics for data channel
        let incomingDataChannelStatistics = report.incomingStatistics.dataChannel
    }
}
```


## Best practices

If you want to collect the data for offline inspection, we recommend that you collect the data and send it to your pipeline ingestion after your call ends. If you transmit the data during a call, it could use internet bandwidth needed to continue an Azure Communication Services call (especially when available bandwidth is low).

### Outgoing audio metrics

| Metric name | Description | Comments |
| --- | --- | --- |
| `CodecName` | Codec name |  |
| `BitrateInBps` | Audio send bitrate (bits per second) | General values are in the 24-Kbps range (36-128 Kbps is typical). |
| `JitterInMs` | Packet jitter (milliseconds) | Lower is better. |
| `PacketCount` | The total number of packets sent. |  |

### Incoming audio metrics

| Metric name | Description | Comments |
| --- | --- | --- |
| `CodecName` | Codec name |  |
| `JitterInMs` | Packet jitter (milliseconds) | Lower is better. |
| `PacketCount` | The total number of packets sent. |  |
| `PacketsLostPerSecond` | Packet loss rate (packets per second) | Lower is better. |

### Outgoing video metrics

| Metric name | Description | Comments |
| --- | --- | --- |
| `CodecName` | Codec name |  |
| `BitrateInBps` | Video send bitrate (bits per second) |  |
| `PacketCount` | The total number of packets sent. |  |
| `FrameRate` | Frame rate sent on the RTP stream (frames per second) |  |
| `FrameWidth` | Frame width of the encoded frame (pixels) |  |
| `FrameHeight` | Frame height of the encoded frame (pixels) |  |

### Incoming video metrics

| Metric name | Description | Comments |
| --- | --- | --- |
| `CodecName` | Codec name |  |
| `BitrateInBps` | Video receive bitrate (bits per second) |  |
| `JitterInMs` | Packet jitter (milliseconds) | Lower is better. |
| `PacketCount` | The total number of packets sent. |  |
| `PacketsLostPerSecond` | Packet loss rate (packets per second) | Lower is better. |
| `StreamId` | Stream ID | The `streamId` value corresponds to the ID of the video of the remote participant. It can be used to match the sender. |
| `FrameRate` | Frame rate received on the RTP stream (frames per second) |  |
| `FrameWidth` | Frame width of the decoded frame (pixels) |  |
| `FrameHeight` | Frame height of the decoded frame (pixels) |  |
| `TotalFreezeDurationInMs` | Total freeze duration (milliseconds) |  |

### Outgoing screen share metrics

Currently, statistics fields are the same as *Outgoing video metrics*.

### Incoming screen share metrics

Currently, statistics fields are the same as *Incoming video metrics*.

### Outgoing data channel metrics

| Metric name | Description | Comments |
| --- | --- | --- |
| `PacketCount` | The total number of packets sent. |  |

### Incoming data channel metrics

| Metric name | Description | Comments |
| --- | --- | --- |
| `JitterInMs` | Packet jitter (milliseconds) | Lower is better. |
| `PacketCount` | The total number of packets sent. |  |
