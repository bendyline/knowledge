---
title: Azure Communication Services media quality statistics
titleSuffix: An Azure Communication Services concept article
description: Get an overview of the Azure Communication Services media quality statics SDK.
author: sloanster
ms.author: micahvivion
manager: nmurav

services: azure-communication-services
ms.date: 11/30/2022
ms.topic: concept-article
ms.service: azure-communication-services
ms.subservice: calling
zone_pivot_groups: acs-plat-web-ios-android-windows
---

# Media quality statistics


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


To help you better understand media quality in VoIP and video calls that use Azure Communication Services, there's a feature called *media quality statistics*. Use it to examine the low-level audio, video, and screen-sharing quality metrics for incoming and outgoing call metrics.

**Applies to: platform-web**


## Media quality statistics for an ongoing call

> **Important:**
> There's an interface update on media quality statistics in the SDK, beginning with the SDK version 1.20.1

Media quality statistics is an extended feature of the core `Call` API. You first need to obtain the `mediaStatsFeature` API object:

```js
const mediaStatsFeature = call.feature(Features.MediaStats);
```

To receive the media statistics data, you can subscribe to the `sampleReported` event or the `summaryReported` event.

The `sampleReported` event triggers every second. It's suitable as a data source for UI display or your own data pipeline.

The `summaryReported` event contains the aggregated values of the data over intervals, which is useful when you just need a summary.

If you want control over the interval of the `summaryReported` event, you need to define `mediaStatsCollectorOptions` of type `MediaStatsCollectorOptions`. Otherwise, the SDK uses default values.


```js
const mediaStatsCollectorOptions: SDK.MediaStatsCollectorOptions = {
    aggregationInterval: 10,
    dataPointsPerAggregation: 6
};

const mediaStatsCollector = mediaStatsFeature.createCollector(mediaStatsSubscriptionOptions);

mediaStatsCollector.on('sampleReported', (sample) => {
    console.log('media stats sample', sample);
});

mediaStatsCollector.on('summaryReported', (summary) => {
    console.log('media stats summary', summary);
});
```

If you don't need to use the media statistics collector, you can call `dispose` method of `mediaStatsCollector`.

```js
mediaStatsCollector.dispose();
```

You don't need to call `dispose` method of `mediaStatsCollector` every time when the call ends, because the collectors are reclaimed internally when the call ends.

### MediaStatsCollectorOptions

The `MediaStatsCollectorOptions` is optional, and there are two optional fields in `MediaStatsCollectorOptions`.

- `aggregationInterval` is the interval, in seconds, that the statistics are aggregated. The default value is 10.
- `dataPointsPerAggregation` defines how many data points each aggregation event has. The default value is 6.

These two values determine the frequency at which the SDK emits `summaryReported` event and the number of aggregated data points included in the report.

The `summaryReported` event raised every `aggregationInterval * dataPointsPerAggregation` seconds.

For example, if you set the following values:

- `aggregationInterval` = 1
- `dataPointsPerAggregation` = 60

The `summaryReported` event is raised every 60 seconds and contains 60 unique units for each statistic recorded.

If you set the following values:

- `aggregatinInterval` = 60
- `dataPointsPerAggregation` = 1

The `summaryReported` event is raised every 60 seconds and contains one (1) unique unit for each statistic recorded.

## Best practices

If you want to collect the data for offline inspection, we recommend that you collect the data and send it to your pipeline ingestion after your call ends. If you transmit the data during a call, it could use internet bandwidth needed to continue an Azure Communication Services call (especially when available bandwidth is low).

In either `sampleReported` event or `summaryReported` event, the media statistics data aren't just a simple key-value mapping.

Here's the type declaration of the event data reported by `sampleReported` event.

```typescript
export interface MediaStatsReportSample {
    audio: {
        send: OutgoingAudioMediaStats<number, string>[];
        receive: IncomingAudioMediaStats<number, string>[];
    };
    video: {
        send: OutgoingVideoMediaStats<number, string>[];
        receive: IncomingVideoMediaStats<number, string>[];
    };
    screenShare: {
        send: OutgoingScreenShareMediaStats<number, string>[];
        receive: IncomingScreenShareMediaStats<number, string>[];
    };
    transports: TransportMediaStats<number>[];
}
```

The event data provide the statistics data for each media stream in the call, including both send and receive directions.

We recommended that you print the event using the `console.log` to observe its layout and value changes, so you can find a proper way to display or process the data according to your usage scenario.

### Audio send metrics

| Metric name | Description | Comments |
| --- | --- | --- |
| `id` | Statistics ID | Used to identify statistics across the events, especially when there are multiple statistics with the same media type and direction in an event. |
| `codecName` | Codec name | OPUS, G722. |
| `bitrate` | Audio send bit rate (bits per second) | General values are in the 24-Kbps range (36-128 Kbps is typical). |
| `jitterInMs` | Packet jitter (milliseconds) | Lower is better. |
| `packets` | The total number of packets sent. |  |
| `packetsPerSecond` | Packet rate (packets per second) |  |
| `packetsLost` | The total number of packets lost reported from the remote end. |  |
| `packetsLostPerSecond` | Packet loss rate (packets per second) | Lower is better. |
| `rttInMs` | Round-trip time (milliseconds) | Lower is better. Calculated from the RTCP receiver report. We recommend a round-trip time of 200 ms or less. |
| `audioInputLevel` | Audio volume level from the microphone | The value ranges from 0 to 65536. A value of 0 represents silence. |
| `transportId` | Transport ID | Used to associate the stats in transports. |

### Audio receive metrics

In the SDK versions earlier than 1.20.1, `jitterBufferDelayInMs` existed as `jitterBufferInMs`.

| Metric name | Description | Comments |
| --- | --- | --- |
| `id` | Statistics ID | Used to identify statistics across the events, especially when there are multiple statistics with the same media type and direction in an event. |
| `codecName` | Codec name | OPUS, G722. |
| `bitrate` | Audio receive bitrate (bits per second) | General values are in the 24-Kbps range (36-128 Kbps is typical). |
| `jitterInMs` | Packet jitter (milliseconds) | Lower is better. |
| `packets` | The total number of packets received. |  |
| `packetsPerSecond` | Packet rate (packets per second) |  |
| `packetsLost` | The total number of packets lost. |  |
| `packetsLostPerSecond` | Packet loss rate (packets per second) | Lower is better. |
| `jitterBufferDelayInMs` | Jitter buffer (milliseconds) | Lower is better. The jitter buffer is used for smooth playout. This value is how long the packets of the samples stay in the jitter buffer. |
| `audioOutputLevel` | Audio volume level from the receiving stream | The value ranges from 0 to 65536. A value of 0 represents silence. |
| `healedRatio` | Ratio of concealed samples (except `silentConcealedSamples`) to total received samples | Information only. |
| `transportId` | Transport ID | Used to associate the stats in transports. |

### Video send metrics

Starting from SDK version 1.20.1, the video send metrics included the `altLayouts` metric field, which enable a better representation of simulcast stream statistics.

| Metric name | Description | Comments |
| --- | --- | --- |
| `id` | Statistics ID | Used to identify statistics across the events, especially when there are multiple statistics with the same media type and direction in an event. |
| `codecName` | Codec name | H264, VP8, VP9. |
| `bitrate` | Video send bitrate (bits per second) |  |
| `jitterInMs` | Packet jitter (milliseconds) | Lower is better. |
| `packets` | The total number of packets sent. |  |
| `packetsPerSecond` | Packet rate (packets per second) |  |
| `packetsLost` | The total number of packets lost reported from the remote end. |  |
| `packetsLostPerSecond` | Packet loss rate (packets per second) | Lower is better. |
| `rttInMs` | Round-trip time (milliseconds) | Lower is better. Calculated from the RTCP receiver report. We recommend a round-trip time of 200 ms or less. |
| `frameRateInput` | Frame rate that originates from the video source (frames per second) |  |
| `frameWidthInput` | Frame width of the last frame that originates from the video source (pixels) |  |
| `frameHeightInput` | Frame height of the last frame that originates from the video source (pixels) |  |
| `framesEncoded` | The number of frames successfully encoded for the RTP stream. |  |
| `frameRateEncoded` | Frame rate successfully encoded for the RTP stream (frames per second) |  |
| `framesSent` | The number of frames sent on the RTP stream |  |
| `frameRateSent` | Frame rate sent on the RTP stream (frames per second) |  |
| `frameWidthSent` | Frame width of the encoded frame (pixel) |  |
| `frameHeightSent` | Frame height of the encoded frame (pixel) |  |
| `keyFramesEncoded` | Key frames successfully encoded for the RTP stream |  |
| `transportId` | Transport ID | Used to associate the stats in transports. |
| `altLayouts` | Simulcast streams | `altLayouts` contains the same metrics to the video send |

### Video receive metrics

In the SDK versions earlier than 1.20.1, `jitterBufferDelayInMs` existed as `jitterBufferInMs`.

| Metric name | Description | Comments |
| --- | --- | --- |
| `id` | Statistics ID | Used to identify statistics across the events, especially when there are multiple statistics with the same media type and direction in an event. |
| `codecName` | Codec name | H264, VP8, VP9. |
| `bitrate` | Video receive bitrate (bits per second) |  |
| `jitterInMs` | Packet jitter (milliseconds) | Lower is better. |
| `packets` | The total number of packets received. |  |
| `packetsPerSecond` | Packet rate (packets per second) |  |
| `packetsLost` | The total number of packets lost. |  |
| `packetsLostPerSecond` | Packet loss rate (packets per second) | Lower is better. |
| `rttInMs` | Round-trip time (milliseconds) | Lower is better. Calculated from the RTCP sender report. We recommend a round-trip time of 200 ms or less. |
| `streamId` | Stream ID | The `streamId` value corresponds to `id` in `VideoStreamCommon`. It can be used to match the sender. |
| `jitterBufferDelayInMs` | Jitter buffer (milliseconds) | Lower is better. The jitter buffer is used for smooth playout. This value is how long the packets of the frames stay in the jitter buffer. |
| `frameRateDecoded` | Frame rate correctly decoded for the RTP stream (frames per second) |  |
| `frameRateReceived` | Frame rate received on the RTP stream (frames per second) |  |
| `frameWidthReceived` | Frame width of the decoded frame (pixel) |  |
| `frameHeightReceived` | Frame height of the decoded frame (pixel) |  |
| `longestFreezeDurationInMs` | Longest freeze duration (milliseconds) |  |
| `totalFreezeDurationInMs` | Total freeze duration (milliseconds) |  |
| `framesReceived` | Total number of frames received on the RTP stream |  |
| `framesDecoded` | Total number of frames correctly decoded for the RTP stream |  |
| `framesDropped` | Total number of frames dropped |  |
| `keyFramesDecoded` | Total number of key frames correctly decoded for the RTP stream |  |
| `transportId` | Transport ID | Used to associate the stats in transports. |

### Screen-share send metrics

Currently, statistics fields are the same as *video send metrics*.

### Screen-share receive metrics

Currently, statistics fields are the same as *video receive metrics*.

### Transport metrics

The transport related metrics were separated out after ACS Web SDK 1.20.1.

In earlier versions, `rttInMs` existed as `pairRttInMs` in the stats for audio, video, and screenShare.

`availableIncomingBitrate` was `availableBitrate` in the receive stats for audio, video, and screenShare.

`availableOutgoingBitrate` was `availableBitrate` in the send stats for audio, video, and screenShare.

| Metric name | Description | Comments |
| --- | --- | --- |
| `id` | Transport ID | Used to associate with the transportId in other stats |
| `rttInMs` | Round-trip time (milliseconds) | The value is calculated from the STUN connectivity check. We recommend a round-trip time of 200 ms or less. |
| `availableIncomingBitrate` | Bandwidth estimation (bits per second) | The value may not be available depending on the bandwidth estimation algorithm used in the WebRTC session |
| `availableOutgoingBitrate` | Bandwidth estimation (bits per second) | The value may not be available depending on the bandwidth estimation algorithm used in the WebRTC session |

## What are changed in SDK version 1.20.1 (GA)

We now support MediaStats feature API in 1.20.1 (GA).

Compared to the previous beta versions, we also made some minor changes to the API interface in this GA version.

In the previous beta versions, `pairRttInMs`, `availableBitrate` were included in audio, video, and screenShare statistics. Now these metrics are separated into transport metrics.

We introduced `packets` and `packetsLost` metric fields in audio, video, screenShare statistics. These metrics are useful for calculating the total number of packets sent or received between two different time points.

The `frameRateOutput` in video and screenShare statistics is removed. You can use `frameRateDecoded` instead.

The metric field `jitterBufferInMs` is renamed to `jitterBufferDelayInMs` to provide a clearer description, because this metric indicates the duration of a packet stay in the jitter buffer.



**Applies to: platform-android**


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




**Applies to: platform-ios**


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




**Applies to: platform-windows**


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
