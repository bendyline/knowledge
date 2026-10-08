---
title: Azure Communication Services media quality statistics (Android)
titleSuffix: An Azure Communication Services concept article
description: Get usage samples of the media quality statistics feature for Android native.
author: jsaurezle-msft
ms.author: jsaurezlee

services: azure-communication-services
ms.date: 08/09/2023
ms.topic: include
ms.service: azure-communication-services
ms.subservice: calling
---

## Media quality statistics for an ongoing call

Media quality statistics is an extended feature of the core `Call` API. You first need to obtain the `MediaStatisticsCallFeature` API object:

```java
MediaStatisticsCallFeature mediaStatisticsCallFeature = call.feature(Features.MEDIA_STATISTICS);
```

The `MediaStatisticsCallFeature` object has the following API structure:

- The `OnReportReceivedListener` event listens for periodic reports of the media statistics.
- `getReportIntervalInSeconds` gets the interval, in seconds, of the media statistics report generation. The SDK uses `10` second as default.
- `updateReportIntervalInSeconds()` updates the interval, in seconds, of the media statistics report generation. The SDK uses `10` second as default.
- A `MediaStatisticsReport` contains the definition of the outgoing and incoming media statistics, categorized by audio, video, and screen share.
  - `getOutgoingStatistics()`: The list of media statistics for outgoing media.
    - `getAudioStatistics()`: The list of media statistics for outgoing audio.
    - `getVideoStatistics()`: The list of media statistics for outgoing video.
    - `getScreenShareStatistics()`: The list of media statistics for outgoing screen share.
    - `getDataChannelStatistics()`: The list of media statistics for data channel.
  - `getIncomingStatistics()`: The list of media statistics for incoming media.
    - `getAudioStatistics()`: The list of media statistics for incoming audio.
    - `getVideoStatistics()`: The list of media statistics for the incoming video.
    - `getScreenShareStatistics()`: The list of media statistics for incoming screen share.
    - `getDataChannelStatistics()`: The list of media statistics for data channel.
  - `getLastUpdatedAt()`: The date when the report was generated.

Then, subscribe to the `addOnReportReceivedListener` event to get regular updates about the current media quality statistics:

```java
mediaStatisticsCallFeature.addOnReportReceivedListener(handleReportReceivedListener);
// Optionally, set the interval for media statistics report generation
mediaStatisticsCallFeature.updateReportIntervalInSeconds(15);

private void handleReportReceivedListener(MediaStatisticsReportEvent args) {
    // Obtain the media statistics report instance
    MediaStatisticsReport report = args.getReport();

    // Obtain the outgoing media statistics for audio
    List<OutgoingAudioStatistics> outgoingAudioStatistics = report.getOutgoingStatistics().getAudioStatistics();

    // Obtain the outgoing media statistics for video
    List<OutgoingVideoStatistics> outgoingVideoStatistics = report.getOutgoingStatistics().getVideoStatistics();

    // Obtain the outgoing media statistics for screen share
    List<OutgoingScreenShareStatistics> outgoingScreenShareStatistics = report.getOutgoingStatistics().getScreenShareStatistics();

    // Obtain the outgoing media statistics for data channel
    List<OutgoingDataChannelStatistics> outgoingDataChannelStatistics = report.getOutgoingStatistics().getDataChannelStatistics();

    // Obtain the incoming media statistics for audio
    List<IncomingAudioStatistics> incomingAudioStatistics = report.getIncomingStatistics().getAudioStatistics();

    // Obtain the incoming media statistics for video
    List<IncomingVideoStatistics> incomingVideoStatistics = report.getIncomingStatistics().getVideoStatistics();

    // Obtain the incoming media statistics for screen share
    List<IncomingScreenShareStatistics> incomingScreenShareStatistics = report.getIncomingStatistics().getScreenShareStatistics();

    // Obtain the incoming media statistics for data channel
    List<IncomingDataChannelStatistics> incomingDataChannelStatistics = report.getIncomingStatistics().getDataChannelStatistics();
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
