---
title: Azure Communication Services media quality statistics (Windows)
titleSuffix: An Azure Communication Services concept article
description: Get usage samples of the media quality statistics feature for Windows native.
author: jsaurezle-msft
ms.author: jsaurezlee

services: azure-communication-services
ms.date: 08/09/2023
ms.topic: include
ms.service: azure-communication-services
ms.subservice: calling
---

## Media quality statistics for an ongoing call

Media quality statistics is an extended feature of the core `CommunicationCall` API. You first need to obtain the `MediaStatisticsCallFeature` API object:

```csharp
MediaStatisticsCallFeature mediaStatisticsCallFeature = call.Features.MediaStatistics;
```

The `MediaStatisticsCallFeature` feature object has the following API structure:

- The `ReportReceived` event listens for periodic reports of the media statistics.
- `ReportIntervalInSeconds` gets the interval, in seconds, of the media statistics report generation. The SDK uses `10` second as default.
- `UpdateReportIntervalInSeconds()` updates the interval, in seconds, of the media statistics report generation. The SDK uses `10` second as default.
- A `MediaStatisticsReport` object contains the definition of the outgoing and incoming media statistics, categorized by audio, video, and screen share.
  - `OutgoingMediaStatistics`: The list of media statistics for outgoing media.
    - `Audio`: The list of media statistics for the outgoing audio.
    - `Video`: The list of media statistics for the outgoing video.
    - `ScreenShare`: The list of media statistics for the outgoing screen share.
    - `DataChannel`: The list of media statistics for the outgoing data channel.
  - `IncomingMediaStatistics`: The list of media statistics for incoming media.
    - `Audio`: The list of media statistics for the incoming audio.
    - `Video`: The list of media statistics for the incoming video.
    - `ScreenShare`: The list of media statistics for the incoming screen share.
    - `DataChannel`: The list of media statistics for the incoming data channel.
  - `LastUpdateAt`: The date when the report was generated.

Then, subscribe to the `SampleReported` event to get regular updates about the current media quality statistics:

```csharp
mediaStatisticsCallFeature.ReportReceived += MediaStatisticsCallFeature_ReportReceived;
// Optionally, set the interval for media statistics report generation
mediaStatisticsCallFeature.UpdateReportIntervalInSeconds(15);

private void MediaStatisticsCallFeature_ReportReceived(object sender, MediaStatisticsReportReceivedEventArgs args)
    // Obtain the media statistics report instance
    MediaStatisticsReport report = args.Report;

    // Obtain the outgoing media statistics for audio
    IReadOnlyList<OutgoingAudioStatistics> outgoingAudioStatistics = report.OutgoingStatistics.Audio;

    // Obtain the outgoing media statistics for video
    IReadOnlyList<OutgoingVideoStatistics> outgoingVideoStatistics = report.OutgoingStatistics.Video;

    // Obtain the outgoing media statistics for screen share
    IReadOnlyList<OutgoingScreenShareStatistics> outgoingScreenShareStatistics = report.OutgoingStatistics.ScreenShare;

    // Obtain the outgoing media statistics for data channel
    IReadOnlyList<OutgoingDataChannelStatistics> outgoingDataChannelStatistics = report.OutgoingStatistics.DataChannel;

    // Obtain the incoming media statistics for audio
    IReadOnlyList<IncomingAudioStatistics> incomingAudioStatistics = report.IncomingStatistics.Audio;

    // Obtain the incoming media statistics for video
    IReadOnlyList<IncomingVideoStatistics> incomingVideoStatistics = report.IncomingStatistics.Video;

    // Obtain the incoming media statistics for screen share
    IReadOnlyList<IncomingScreenShareStatistics> incomingScreenShareStatistics = report.IncomingStatistics.ScreenShare;

    // Obtain the incoming media statistics for data channel
    IReadOnlyList<IncomingDataChannelStatistics> incomingDataChannelStatistics = report.IncomingStatistics.DataChannel;
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
