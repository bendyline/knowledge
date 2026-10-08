---
title: Access raw audio and video
titleSuffix: An Azure Communication Services article
description: This article describes how to add raw media access calling capabilities to your app by using Azure Communication Services.
author: sharifrahaman

ms.author: srahaman
ms.date: 06/24/2025
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: calling
zone_pivot_groups: acs-plat-web-ios-android-windows-unity
ms.custom: mode-other, devx-track-js
---

# Access raw audio and video


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


**Applies to: platform-unity**


This article describes how to implement raw media access by using the Azure Communication Services Calling SDK for Unity.

The Azure Communication Services Calling SDK enables apps to generate their own video frames to send to remote participants in a call.

This article builds on [Add 1\:1 video calling to your app](get-started-with-video-calling.md?pivots=platform-unity) for Unity.

## Raw video access

Because the app generates the video frames, the app must inform the Azure Communication Services Calling SDK about the video formats that the app can generate. This information enables the Azure Communication Services Calling SDK to pick the best video format configuration for the network conditions at that time.

## Virtual video

### Supported video resolutions

| Aspect ratio | Resolution | Maximum FPS |
| --- | --- | --- |
| 16x9 | 1080p | 30 |
| 16x9 | 720p | 30 |
| 16x9 | 540p | 30 |
| 16x9 | 480p | 30 |
| 16x9 | 360p | 30 |
| 16x9 | 270p | 15 |
| 16x9 | 240p | 15 |
| 16x9 | 180p | 15 |
| 4x3 | VGA (640x480) | 30 |
| 4x3 | 424x320 | 15 |
| 4x3 | QVGA (320x240) | 15 |
| 4x3 | 212x160 | 15 |

1. Follow the steps here [Quickstart: Add 1\:1 video calling to your app](get-started-with-video-calling.md?pivots=platform-unity) to create Unity game. The goal is to obtain a `CallAgent` object ready to begin the call.

   Find the finalized code on GitHub at [Raw Video](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/Unity/RawVideo).

2. Create an array of `VideoFormat` using the VideoStreamPixelFormat the SDK supports.
   When multiple formats are available, the order of the formats in the list doesn't influence or prioritize which one is used. The criteria for format selection are based on external factors like network bandwidth.

    ```csharp
    var videoStreamFormat = new VideoStreamFormat
    {
        Resolution = VideoStreamResolution.P360, // For VirtualOutgoingVideoStream the width/height should be set using VideoStreamResolution enum
        PixelFormat = VideoStreamPixelFormat.Rgba,
        FramesPerSecond = 15,
        Stride1 = 640 * 4 // It is times 4 because RGBA is a 32-bit format
    };
    VideoStreamFormat[] videoStreamFormats = { videoStreamFormat };
    ```

3. Create `RawOutgoingVideoStreamOptions`, and set `Formats` with the previously created object.

    ```csharp
    var rawOutgoingVideoStreamOptions = new RawOutgoingVideoStreamOptions
    {
        Formats = videoStreamFormats
    };
    ```

3. Create an instance of `VirtualOutgoingVideoStream` by using the `RawOutgoingVideoStreamOptions` instance that you created previously.

    ```csharp
    var rawOutgoingVideoStream = new VirtualOutgoingVideoStream(rawOutgoingVideoStreamOptions);
    ```

4. Subscribe to the `RawOutgoingVideoStream.FormatChanged` delegate. This event informs whenever the `VideoStreamFormat` changes from one of the video formats provided on the list.

    ```csharp
    rawOutgoingVideoStream.FormatChanged += (object sender, VideoStreamFormatChangedEventArgs args)
    {
        VideoStreamFormat videoStreamFormat = args.Format;
    }
    ```

5. Subscribe to the `RawOutgoingVideoStream.StateChanged` delegate. This event informs whenever the `State` changes.

    ```csharp
    rawOutgoingVideoStream.StateChanged += (object sender, VideoStreamFormatChangedEventArgs args)
    {
        CallVideoStream callVideoStream = e.Stream;

        switch (callVideoStream.Direction)
        {
            case StreamDirection.Outgoing:
                OnRawOutgoingVideoStreamStateChanged(callVideoStream as OutgoingVideoStream);
                break;
            case StreamDirection.Incoming:
                OnRawIncomingVideoStreamStateChanged(callVideoStream as IncomingVideoStream);
                break;
        }
    }
    ```

6. Handle raw outgoing video stream state transactions such as Start and Stop and begin to generate custom video frames. You can also suspend the frame generating algorithm.

    ```csharp
    private async void OnRawOutgoingVideoStreamStateChanged(OutgoingVideoStream outgoingVideoStream)
    {
        switch (outgoingVideoStream.State)
        {
            case VideoStreamState.Started:
                switch (outgoingVideoStream.Kind)
                {
                    case VideoStreamKind.VirtualOutgoing:
                        outgoingVideoPlayer.StartGenerateFrames(outgoingVideoStream); // This is where a background worker thread can be started to feed the outgoing video frames.
                        break;
                }
                break;

            case VideoStreamState.Stopped:
                switch (outgoingVideoStream.Kind)
                {
                    case VideoStreamKind.VirtualOutgoing:
                        break;
                }
                break;
        }
    }
    ```

    Here's a sample of outgoing video frame generator:

    ```csharp
    private unsafe RawVideoFrame GenerateRawVideoFrame(RawOutgoingVideoStream rawOutgoingVideoStream)
    {
        var format = rawOutgoingVideoStream.Format;
        int w = format.Width;
        int h = format.Height;
        int rgbaCapacity = w * h * 4;

        var rgbaBuffer = new NativeBuffer(rgbaCapacity);
        rgbaBuffer.GetData(out IntPtr rgbaArrayBuffer, out rgbaCapacity);

        byte r = (byte)random.Next(1, 255);
        byte g = (byte)random.Next(1, 255);
        byte b = (byte)random.Next(1, 255);

        for (int y = 0; y < h; y++)
        {
            for (int x = 0; x < w*4; x += 4)
            {
                ((byte*)rgbaArrayBuffer)[(w * 4 * y) + x + 0] = (byte)(y % r);
                ((byte*)rgbaArrayBuffer)[(w * 4 * y) + x + 1] = (byte)(y % g);
                ((byte*)rgbaArrayBuffer)[(w * 4 * y) + x + 2] = (byte)(y % b);
                ((byte*)rgbaArrayBuffer)[(w * 4 * y) + x + 3] = 255;
            }
        }

        // Call ACS Unity SDK API to deliver the frame
        rawOutgoingVideoStream.SendRawVideoFrameAsync(new RawVideoFrameBuffer() {
            Buffers = new NativeBuffer[] { rgbaBuffer },
            StreamFormat = rawOutgoingVideoStream.Format,
            TimestampInTicks = rawOutgoingVideoStream.TimestampInTicks
        }).Wait();

        return new RawVideoFrameBuffer()
        {
            Buffers = new NativeBuffer[] { rgbaBuffer },
            StreamFormat = rawOutgoingVideoStream.Format
        };
    }
    ```
    > **Note:**
    > `unsafe` modifier is used on this method since `NativeBuffer` requires access to native memory resources. Therefore, `Allow unsafe` option needs to be enabled in Unity Editor as well.

7. Similarly, we can handle incoming video frames in response to video stream `StateChanged` event.
    ```csharp
    private void OnRawIncomingVideoStreamStateChanged(IncomingVideoStream incomingVideoStream)
    {
        switch (incomingVideoStream.State)
        {
            case VideoStreamState.Available:
                {
                    var rawIncomingVideoStream = incomingVideoStream as RawIncomingVideoStream;
                    rawIncomingVideoStream.RawVideoFrameReceived += OnRawVideoFrameReceived;
                    rawIncomingVideoStream.Start();
                    break;
                }
            case VideoStreamState.Stopped:
                break;
            case VideoStreamState.NotAvailable:
                break;
        }
    }

    private void OnRawVideoFrameReceived(object sender, RawVideoFrameReceivedEventArgs e)
    {
        incomingVideoPlayer.RenderRawVideoFrame(e.Frame);
    }

    public void RenderRawVideoFrame(RawVideoFrame rawVideoFrame)
    {
        var videoFrameBuffer = rawVideoFrame as RawVideoFrameBuffer;
        pendingIncomingFrames.Enqueue(new PendingFrame() {
                frame = rawVideoFrame,
                kind = RawVideoFrameKind.Buffer });
    }
    ```

8. We recommended that you manage both incoming and outgoing video frames through a buffering mechanism to avoid overload the `MonoBehaviour.Update()` callback method. We recommend keeping the workload light for this method to avoid CPU or network heavy duties and ensure a smoother video experience. This optional optimization is left to developers to decide what works best.

    Here's sample of how the incoming frames can be rendered to a Unity `VideoTexture` by calling `Graphics.Blit` out of an internal queue:

    ```csharp
    private void Update()
    {
        if (pendingIncomingFrames.TryDequeue(out PendingFrame pendingFrame))
        {
            switch (pendingFrame.kind)
            {
                case RawVideoFrameKind.Buffer:
                    var videoFrameBuffer = pendingFrame.frame as RawVideoFrameBuffer;
                    VideoStreamFormat videoFormat = videoFrameBuffer.StreamFormat;
                    int width = videoFormat.Width;
                    int height = videoFormat.Height;
                    var texture = new Texture2D(width, height, TextureFormat.RGBA32, mipChain: false);

                    var buffers = videoFrameBuffer.Buffers;
                    NativeBuffer buffer = buffers.Count > 0 ? buffers[0] : null;
                    buffer.GetData(out IntPtr bytes, out int signedSize);

                    texture.LoadRawTextureData(bytes, signedSize);
                    texture.Apply();

                    Graphics.Blit(source: texture, dest: rawIncomingVideoRenderTexture);
                    break;

                case RawVideoFrameKind.Texture:
                    break;
            }
            pendingFrame.frame.Dispose();
        }
    }
    ```



**Applies to: platform-windows**


This article describes how to implement raw media access by using the Azure Communication Services Calling SDK for Windows.

The Azure Communication Services Calling SDK enables apps to generate their own video frames to send to remote participants in a call.

This article builds on [Add 1\:1 video calling to your app](get-started-with-video-calling.md?pivots=platform-windows) for Windows.

## Raw audio access

Processing raw audio media gives you access to the incoming call audio stream, along with the ability to view and send custom outgoing audio streams during a call.

### Send raw outgoing audio

Make an options object specifying the raw stream properties we want to send.

```csharp
    RawOutgoingAudioStreamProperties outgoingAudioProperties = new RawOutgoingAudioStreamProperties()
    {
        Format = ACSAudioStreamFormat.Pcm16Bit,
        SampleRate = AudioStreamSampleRate.Hz48000,
        ChannelMode = AudioStreamChannelMode.Stereo,
        BufferDuration = AudioStreamBufferDuration.InMs20
    };
    RawOutgoingAudioStreamOptions outgoingAudioStreamOptions = new RawOutgoingAudioStreamOptions()
    {
        Properties = outgoingAudioProperties
    };
```

Create a `RawOutgoingAudioStream` and attach it to join call options and the stream automatically starts when call is connected.

```csharp 
    JoinCallOptions options =  JoinCallOptions(); // or StartCallOptions()
    OutgoingAudioOptions outgoingAudioOptions = new OutgoingAudioOptions();
    RawOutgoingAudioStream rawOutgoingAudioStream = new RawOutgoingAudioStream(outgoingAudioStreamOptions);
    outgoingAudioOptions.Stream = rawOutgoingAudioStream;
    options.OutgoingAudioOptions = outgoingAudioOptions;
    // Start or Join call with those call options.
```

### Attach stream to a call

Or you can also attach the stream to an existing `Call` instance instead:

```csharp
    await call.StartAudio(rawOutgoingAudioStream);
```
### Start sending raw samples

We can only start sending data once the stream state is `AudioStreamState.Started`. 
To observe the audio stream state change, add a listener to the `OnStateChangedListener` event.

```csharp
    unsafe private void AudioStateChanged(object sender, AudioStreamStateChanged args)
    {
        if (args.AudioStreamState == AudioStreamState.Started)
        {
            // We can now start sending samples.
        }
    }
    outgoingAudioStream.StateChanged += AudioStateChanged;
```

When the stream started, we can start sending [`MemoryBuffer`](https://learn.microsoft.com/uwp/api/windows.foundation.memorybuffer) audio samples to the call.

The audio buffer format should match the specified stream properties.

```csharp
    void Start()
    {
        RawOutgoingAudioStreamProperties properties = outgoingAudioStream.Properties;
        RawAudioBuffer buffer;
        new Thread(() =>
        {
            DateTime nextDeliverTime = DateTime.Now;
            while (true)
            {
                MemoryBuffer memoryBuffer = new MemoryBuffer((uint)outgoingAudioStream.ExpectedBufferSizeInBytes);
                using (IMemoryBufferReference reference = memoryBuffer.CreateReference())
                {
                    byte* dataInBytes;
                    uint capacityInBytes;
                    ((IMemoryBufferByteAccess)reference).GetBuffer(out dataInBytes, out capacityInBytes);
                    // Use AudioGraph here to grab data from microphone if you want microphone data
                }
                nextDeliverTime = nextDeliverTime.AddMilliseconds(20);
                buffer = new RawAudioBuffer(memoryBuffer);
                outgoingAudioStream.SendOutgoingAudioBuffer(buffer);
                TimeSpan wait = nextDeliverTime - DateTime.Now;
                if (wait > TimeSpan.Zero)
                {
                    Thread.Sleep(wait);
                }
            }
        }).Start();
    }
```

### Receive raw incoming audio

We can also receive the call audio stream samples as [`MemoryBuffer`](https://learn.microsoft.com/uwp/api/windows.foundation.memorybuffer) if we want to process the call audio stream before playback.
Create a `RawIncomingAudioStreamOptions` object specifying the raw stream properties we want to receive.

```csharp
    RawIncomingAudioStreamProperties properties = new RawIncomingAudioStreamProperties()
    {
        Format = AudioStreamFormat.Pcm16Bit,
        SampleRate = AudioStreamSampleRate.Hz44100,
        ChannelMode = AudioStreamChannelMode.Stereo
    };
    RawIncomingAudioStreamOptions options = new RawIncomingAudioStreamOptions()
    {
        Properties = properties
    };
```

Create a `RawIncomingAudioStream` and attach it to join call options.

```csharp
    JoinCallOptions options =  JoinCallOptions(); // or StartCallOptions()
    RawIncomingAudioStream rawIncomingAudioStream = new RawIncomingAudioStream(audioStreamOptions);
    IncomingAudioOptions incomingAudioOptions = new IncomingAudioOptions()
    {
        Stream = rawIncomingAudioStream
    };
    options.IncomingAudioOptions = incomingAudioOptions;
```

Or we can also attach the stream to an existing `Call` instance instead:

```csharp
    await call.startAudio(context, rawIncomingAudioStream);
```

For starting to receive raw audio buffers from the incoming stream add listeners to the incoming stream state and buffer received events.

```csharp
    unsafe private void OnAudioStateChanged(object sender, AudioStreamStateChanged args)
    {
        if (args.AudioStreamState == AudioStreamState.Started)
        {
            // When value is `AudioStreamState.STARTED` we'll be able to receive samples.
        }
    }
    private void OnRawIncomingMixedAudioBufferAvailable(object sender, IncomingMixedAudioEventArgs args)
    {
        // Received a raw audio buffers(MemoryBuffer).
        using (IMemoryBufferReference reference = args.IncomingAudioBuffer.Buffer.CreateReference())
        {
            byte* dataInBytes;
            uint capacityInBytes;
            ((IMemoryBufferByteAccess)reference).GetBuffer(out dataInBytes, out capacityInBytes);
            // Process the data using AudioGraph class
        }
    }
    rawIncomingAudioStream.StateChanged += OnAudioStateChanged;
    rawIncomingAudioStream.MixedAudioBufferReceived += OnRawIncomingMixedAudioBufferAvailable;
```

## Raw video access

Because the app generates the video frames, the app must inform the Azure Communication Services Calling SDK about the video formats that the app can generate. This information enables the Calling SDK to pick the best video format configuration for the network conditions at that time.

## Virtual video

### Supported video resolutions

| Aspect ratio | Resolution | Maximum FPS |
| --- | --- | --- |
| 16x9 | 1080p | 30 |
| 16x9 | 720p | 30 |
| 16x9 | 540p | 30 |
| 16x9 | 480p | 30 |
| 16x9 | 360p | 30 |
| 16x9 | 270p | 15 |
| 16x9 | 240p | 15 |
| 16x9 | 180p | 15 |
| 4x3 | VGA (640x480) | 30 |
| 4x3 | 424x320 | 15 |
| 4x3 | QVGA (320x240) | 15 |
| 4x3 | 212x160 | 15 |

1. Create an array of `VideoFormat` using the VideoStreamPixelFormat the SDK supports.
   When multiple formats are available, the order of the formats in the list doesn't influence or prioritize which one is used. The criteria for format selection are based on external factors like network bandwidth.

    ```csharp
    var videoStreamFormat = new VideoStreamFormat
    {
        Resolution = VideoStreamResolution.P720, // For VirtualOutgoingVideoStream the width/height should be set using VideoStreamResolution enum
        PixelFormat = VideoStreamPixelFormat.Rgba,
        FramesPerSecond = 30,
        Stride1 = 1280 * 4 // It is times 4 because RGBA is a 32-bit format
    };
    VideoStreamFormat[] videoStreamFormats = { videoStreamFormat };
    ```

2. Create `RawOutgoingVideoStreamOptions`, and set `Formats` with the previously created object.

    ```csharp
    var rawOutgoingVideoStreamOptions = new RawOutgoingVideoStreamOptions
    {
        Formats = videoStreamFormats
    };
    ```
3. Create an instance of `VirtualOutgoingVideoStream` by using the `RawOutgoingVideoStreamOptions` instance that you created previously.

    ```csharp
    var rawOutgoingVideoStream = new VirtualOutgoingVideoStream(rawOutgoingVideoStreamOptions);
    ```

4. Subscribe to the `RawOutgoingVideoStream.FormatChanged` delegate. This event informs whenever the `VideoStreamFormat` changed from one of the video formats provided on the list.

    ```csharp
    rawOutgoingVideoStream.FormatChanged += (object sender, VideoStreamFormatChangedEventArgs args)
    {
        VideoStreamFormat videoStreamFormat = args.Format;
    }
    ```

6. Create an instance of the following helper class to access the buffer data.

    ```csharp
    [ComImport]
    [Guid("5B0D3235-4DBA-4D44-865E-8F1D0E4FD04D")]
    [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    unsafe interface IMemoryBufferByteAccess
    {
        void GetBuffer(out byte* buffer, out uint capacity);
    }
    [ComImport]
    [Guid("905A0FEF-BC53-11DF-8C49-001E4FC686DA")]
    [InterfaceType(ComInterfaceType.InterfaceIsIUnknown)]
    unsafe interface IBufferByteAccess
    {
        void Buffer(out byte* buffer);
    }
    internal static class BufferExtensions
    {
        // For accessing MemoryBuffer
        public static unsafe byte* GetArrayBuffer(IMemoryBuffer memoryBuffer)
        {
            IMemoryBufferReference memoryBufferReference = memoryBuffer.CreateReference();
            var memoryBufferByteAccess = memoryBufferReference as IMemoryBufferByteAccess;
            memoryBufferByteAccess.GetBuffer(out byte* arrayBuffer, out uint arrayBufferCapacity);
            GC.AddMemoryPressure(arrayBufferCapacity);
            return arrayBuffer;
        }
        // For accessing MediaStreamSample
        public static unsafe byte* GetArrayBuffer(IBuffer buffer)
        {
            var bufferByteAccess = buffer as IBufferByteAccess;
            bufferByteAccess.Buffer(out byte* arrayBuffer);
            uint arrayBufferCapacity = buffer.Capacity;
            GC.AddMemoryPressure(arrayBufferCapacity);
            return arrayBuffer;
        }
    }
    ```

7. Create an instance of the following helper class to generate random `RawVideoFrame` using `VideoStreamPixelFormat.Rgba`.

    ```csharp
    public class VideoFrameSender
    {
        private RawOutgoingVideoStream rawOutgoingVideoStream;
        private RawVideoFrameKind rawVideoFrameKind;
        private Thread frameIteratorThread;
        private Random random = new Random();
        private volatile bool stopFrameIterator = false;
        public VideoFrameSender(RawVideoFrameKind rawVideoFrameKind, RawOutgoingVideoStream rawOutgoingVideoStream)
        {
            this.rawVideoFrameKind = rawVideoFrameKind;
            this.rawOutgoingVideoStream = rawOutgoingVideoStream;
        }
        public async void VideoFrameIterator()
        {
            while (!stopFrameIterator)
            {
                if (rawOutgoingVideoStream != null &&
                    rawOutgoingVideoStream.Format != null &&
                    rawOutgoingVideoStream.State == VideoStreamState.Started)
                {
                    await SendRandomVideoFrameRGBA();
                }
            }
        }
        private async Task SendRandomVideoFrameRGBA()
        {
            uint rgbaCapacity = (uint)(rawOutgoingVideoStream.Format.Width * rawOutgoingVideoStream.Format.Height * 4);
            RawVideoFrame videoFrame = null;
            switch (rawVideoFrameKind)
            {
                case RawVideoFrameKind.Buffer:
                    videoFrame = 
                        GenerateRandomVideoFrameBuffer(rawOutgoingVideoStream.Format, rgbaCapacity);
                    break;
                case RawVideoFrameKind.Texture:
                    videoFrame = 
                        GenerateRandomVideoFrameTexture(rawOutgoingVideoStream.Format, rgbaCapacity);
                    break;
            }
            try
            {
                using (videoFrame)
                {
                    await rawOutgoingVideoStream.SendRawVideoFrameAsync(videoFrame);
                }
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
            }
            try
            {
                int delayBetweenFrames = (int)(1000.0 / rawOutgoingVideoStream.Format.FramesPerSecond);
                await Task.Delay(delayBetweenFrames);
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
            }
        }
        private unsafe RawVideoFrame GenerateRandomVideoFrameBuffer(VideoStreamFormat videoFormat, uint rgbaCapacity)
        {
            var rgbaBuffer = new MemoryBuffer(rgbaCapacity);
            byte* rgbaArrayBuffer = BufferExtensions.GetArrayBuffer(rgbaBuffer);
            GenerateRandomVideoFrame(&rgbaArrayBuffer);
            return new RawVideoFrameBuffer()
            {
                Buffers = new MemoryBuffer[] { rgbaBuffer },
                StreamFormat = videoFormat
            };
        }
        private unsafe RawVideoFrame GenerateRandomVideoFrameTexture(VideoStreamFormat videoFormat, uint rgbaCapacity)
        {
            var timeSpan = new TimeSpan(rawOutgoingVideoStream.TimestampInTicks);
            var rgbaBuffer = new Buffer(rgbaCapacity)
            {
                Length = rgbaCapacity
            };
            byte* rgbaArrayBuffer = BufferExtensions.GetArrayBuffer(rgbaBuffer);
            GenerateRandomVideoFrame(&rgbaArrayBuffer);
            var mediaStreamSample = MediaStreamSample.CreateFromBuffer(rgbaBuffer, timeSpan);
            return new RawVideoFrameTexture()
            {
                Texture = mediaStreamSample,
                StreamFormat = videoFormat
            };
        }
        private unsafe void GenerateRandomVideoFrame(byte** rgbaArrayBuffer)
        {
            int w = rawOutgoingVideoStream.Format.Width;
            int h = rawOutgoingVideoStream.Format.Height;
            byte r = (byte)random.Next(1, 255);
            byte g = (byte)random.Next(1, 255);
            byte b = (byte)random.Next(1, 255);
            int rgbaStride = w * 4;
            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < rgbaStride; x += 4)
                {
                    (*rgbaArrayBuffer)[(w * 4 * y) + x + 0] = (byte)(y % r);
                    (*rgbaArrayBuffer)[(w * 4 * y) + x + 1] = (byte)(y % g);
                    (*rgbaArrayBuffer)[(w * 4 * y) + x + 2] = (byte)(y % b);
                    (*rgbaArrayBuffer)[(w * 4 * y) + x + 3] = 255;
                }
            }
        }
        public void Start()
        {
            frameIteratorThread = new Thread(VideoFrameIterator);
            frameIteratorThread.Start();
        }
        public void Stop()
        {
            try
            {
                if (frameIteratorThread != null)
                {
                    stopFrameIterator = true;
                    frameIteratorThread.Join();
                    frameIteratorThread = null;
                    stopFrameIterator = false;
                }
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
            }
        }
    }
    ```

8. Subscribe to the `VideoStream.StateChanged` delegate. This event informs the state of the current stream. Don't send frames if the state isn't equal to `VideoStreamState.Started`.

    ```csharp
    private VideoFrameSender videoFrameSender;
    rawOutgoingVideoStream.StateChanged += (object sender, VideoStreamStateChangedEventArgs args) =>
    {
        CallVideoStream callVideoStream = args.Stream;
        switch (callVideoStream.State)
            {
                case VideoStreamState.Available:
                    // VideoStream has been attached to the call
                    var frameKind = RawVideoFrameKind.Buffer; // Use the frameKind you prefer
                    //var frameKind = RawVideoFrameKind.Texture;
                    videoFrameSender = new VideoFrameSender(frameKind, rawOutgoingVideoStream);
                    break;
                case VideoStreamState.Started:
                    // Start sending frames
                    videoFrameSender.Start();
                    break;
                case VideoStreamState.Stopped:
                    // Stop sending frames
                    videoFrameSender.Stop();
                    break;
            }
    };
    ```

## Screen share video

Because the Windows system generates the frames, you must implement your own foreground service to capture the frames and send them by using the Azure Communication Services Calling API.

### Supported video resolutions

| Aspect ratio | Resolution | Maximum FPS |
| --- | --- | --- |
| Anything | Anything up to 1080p | 30 |

### Steps to create a screen share video stream

1. Create an array of `VideoFormat` using the VideoStreamPixelFormat the SDK supports.
   When multiple formats are available, the order of the formats in the list doesn't influence or prioritize which one you can use. The criteria for format selection are based on external factors like network bandwidth.

    ```csharp
    var videoStreamFormat = new VideoStreamFormat
    {
        Width = 1280, // Width and height can be used for ScreenShareOutgoingVideoStream for custom resolutions or use one of the predefined values inside VideoStreamResolution
        Height = 720,
        //Resolution = VideoStreamResolution.P720,
        PixelFormat = VideoStreamPixelFormat.Rgba,
        FramesPerSecond = 30,
        Stride1 = 1280 * 4 // It is times 4 because RGBA is a 32-bit format.
    };
    VideoStreamFormat[] videoStreamFormats = { videoStreamFormat };
    ```

1. Create `RawOutgoingVideoStreamOptions`, and set `VideoFormats` with the previously created object.

    ```csharp
    var rawOutgoingVideoStreamOptions = new RawOutgoingVideoStreamOptions
    {
        Formats = videoStreamFormats
    };
    ```

1. Create an instance of `VirtualOutgoingVideoStream` by using the `RawOutgoingVideoStreamOptions` instance that you created previously.

    ```csharp
    var rawOutgoingVideoStream = new ScreenShareOutgoingVideoStream(rawOutgoingVideoStreamOptions);
    ```

1. Capture and send the video frame in the following way.

    ```csharp
    private async Task SendRawVideoFrame()
    {
        RawVideoFrame videoFrame = null;
        switch (rawVideoFrameKind) //it depends on the frame kind you want to send
        {
            case RawVideoFrameKind.Buffer:
                MemoryBuffer memoryBuffer = // Fill it with the content you got from the Windows APIs
                videoFrame = new RawVideoFrameBuffer()
                {
                    Buffers = memoryBuffer // The number of buffers depends on the VideoStreamPixelFormat
                    StreamFormat = rawOutgoingVideoStream.Format
                };
                break;
            case RawVideoFrameKind.Texture:
                MediaStreamSample mediaStreamSample = // Fill it with the content you got from the Windows APIs
                videoFrame = new RawVideoFrameTexture()
                {
                    Texture = mediaStreamSample, // Texture only receive planar buffers
                    StreamFormat = rawOutgoingVideoStream.Format
                };
                break;
        }

        try
        {
            using (videoFrame)
            {
                await rawOutgoingVideoStream.SendRawVideoFrameAsync(videoFrame);
            }
        }
        catch (Exception ex)
        {
            string msg = ex.Message;
        }

        try
        {
            int delayBetweenFrames = (int)(1000.0 / rawOutgoingVideoStream.Format.FramesPerSecond);
            await Task.Delay(delayBetweenFrames);
        }
        catch (Exception ex)
        {
            string msg = ex.Message;
        }
    }
    ```

## Raw incoming video

This feature gives you access the video frames inside the `IncomingVideoStream` to manipulate those streams locally.

1. Create an instance of `IncomingVideoOptions` that sets through `JoinCallOptions` setting `VideoStreamKind.RawIncoming`.

    ```csharp
    var frameKind = RawVideoFrameKind.Buffer;  // Use the frameKind you prefer to receive
    var incomingVideoOptions = new IncomingVideoOptions
    {
        StreamKind = VideoStreamKind.RawIncoming,
        FrameKind = frameKind
    };
    var joinCallOptions = new JoinCallOptions
    {
        IncomingVideoOptions = incomingVideoOptions
    };
    ```

2. Once you receive a `ParticipantsUpdatedEventArgs` event attach `RemoteParticipant.VideoStreamStateChanged` delegate. This event informs the state of the `IncomingVideoStream` objects.

    ```csharp
    private List<RemoteParticipant> remoteParticipantList;
    private void OnRemoteParticipantsUpdated(object sender, ParticipantsUpdatedEventArgs args)
    {
        foreach (RemoteParticipant remoteParticipant in args.AddedParticipants)
        {
            IReadOnlyList<IncomingVideoStream> incomingVideoStreamList = remoteParticipant.IncomingVideoStreams; // Check if there are IncomingVideoStreams already before attaching the delegate
            foreach (IncomingVideoStream incomingVideoStream in incomingVideoStreamList)
            {
                OnRawIncomingVideoStreamStateChanged(incomingVideoStream);
            }
            remoteParticipant.VideoStreamStateChanged += OnVideoStreamStateChanged;
            remoteParticipantList.Add(remoteParticipant); // If the RemoteParticipant ref is not kept alive the VideoStreamStateChanged events are going to be missed
        }
        foreach (RemoteParticipant remoteParticipant in args.RemovedParticipants)
        {
            remoteParticipant.VideoStreamStateChanged -= OnVideoStreamStateChanged;
            remoteParticipantList.Remove(remoteParticipant);
        }
    }
    private void OnVideoStreamStateChanged(object sender, VideoStreamStateChangedEventArgs args)
    {
        CallVideoStream callVideoStream = args.Stream;
        OnRawIncomingVideoStreamStateChanged(callVideoStream as RawIncomingVideoStream);
    }
    private void OnRawIncomingVideoStreamStateChanged(RawIncomingVideoStream rawIncomingVideoStream)
    {
        switch (incomingVideoStream.State)
        {
            case VideoStreamState.Available:
                // There is a new IncomingVideoStream
                rawIncomingVideoStream.RawVideoFrameReceived += OnVideoFrameReceived;
                rawIncomingVideoStream.Start();
                break;
            case VideoStreamState.Started:
                // Will start receiving video frames
                break;
            case VideoStreamState.Stopped:
                // Will stop receiving video frames
                break;
            case VideoStreamState.NotAvailable:
                // The IncomingVideoStream should not be used anymore
                rawIncomingVideoStream.RawVideoFrameReceived -= OnVideoFrameReceived;
                break;
        }
    }
    ```

3. At the time, the `IncomingVideoStream` has `VideoStreamState.Available` state attach `RawIncomingVideoStream.RawVideoFrameReceived` delegate as shown on the previous step. That provides the new `RawVideoFrame` objects.

    ```csharp
    private async void OnVideoFrameReceived(object sender, RawVideoFrameReceivedEventArgs args)
    {
        RawVideoFrame videoFrame = args.Frame;
        switch (videoFrame.Kind) // The type will be whatever was configured on the IncomingVideoOptions
        {
            case RawVideoFrameKind.Buffer:
                // Render/Modify/Save the video frame
                break;
            case RawVideoFrameKind.Texture:
                // Render/Modify/Save the video frame
                break;
        }
    }
    ```

## Sample code

- Use the sample app on GitHub at [Raw Video](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/RawVideo).



**Applies to: platform-android**


This article describes how to implement raw media access by using the Azure Communication Services Calling SDK for Android.

The Azure Communication Services Calling SDK enables apps to generate their own video frames to send to remote participants in a call.

This article builds on [Add 1\:1 video calling to your app](get-started-with-video-calling.md?pivots=platform-android) for Android.

## RawAudio access

Processing raw audio media gives you access to the incoming audio stream of the call, along with the ability to view and send custom outgoing audio streams during a call.

### Send Raw Outgoing audio

Make an options object specifying the raw stream properties we want to send. 

```java
    RawOutgoingAudioStreamProperties outgoingAudioProperties = new RawOutgoingAudioStreamProperties()
                .setAudioFormat(AudioStreamFormat.PCM16_BIT)
                .setSampleRate(AudioStreamSampleRate.HZ44100)
                .setChannelMode(AudioStreamChannelMode.STEREO)
                .setBufferDuration(AudioStreamBufferDuration.IN_MS20);

    RawOutgoingAudioStreamOptions outgoingAudioStreamOptions = new RawOutgoingAudioStreamOptions()
                .setProperties(outgoingAudioProperties);
```

Create a `RawOutgoingAudioStream` and attach it to join call options and the stream automatically starts when call is connected.

```java 
    JoinCallOptions options = JoinCallOptions() // or StartCallOptions()

    OutgoingAudioOptions outgoingAudioOptions = new OutgoingAudioOptions();
    RawOutgoingAudioStream rawOutgoingAudioStream = new RawOutgoingAudioStream(outgoingAudioStreamOptions);

    outgoingAudioOptions.setStream(rawOutgoingAudioStream);
    options.setOutgoingAudioOptions(outgoingAudioOptions);

    // Start or Join call with those call options.

```

### Attach stream to a call

Or you can also attach the stream to an existing `Call` instance instead:

```java
    CompletableFuture<Void> result = call.startAudio(context, rawOutgoingAudioStream);
```

### Start sending raw samples

We can only start sending data once the stream state is `AudioStreamState.STARTED`. 
To observe the audio stream state change, add a listener to the `OnStateChangedListener` event.

```java
    private void onStateChanged(PropertyChangedEvent propertyChangedEvent) {
        // When value is `AudioStreamState.STARTED` we'll be able to send audio samples.
    }

    rawOutgoingAudioStream.addOnStateChangedListener(this::onStateChanged)
```

When the stream started, we can start sending [`java.nio.ByteBuffer`](https://docs.oracle.com/javase/7/docs/api/java/nio/ByteBuffer.html) audio samples to the call.

The audio buffer format should match the specified stream properties.

```java
    Thread thread = new Thread(){
        public void run() {
            RawAudioBuffer buffer;
            Calendar nextDeliverTime = Calendar.getInstance();
            while (true)
            {
                nextDeliverTime.add(Calendar.MILLISECOND, 20);
                byte data[] = new byte[outgoingAudioStream.getExpectedBufferSizeInBytes()];
                //can grab microphone data from AudioRecord
                ByteBuffer dataBuffer = ByteBuffer.allocateDirect(outgoingAudioStream.getExpectedBufferSizeInBytes());
                dataBuffer.rewind();
                buffer = new RawAudioBuffer(dataBuffer);
                outgoingAudioStream.sendOutgoingAudioBuffer(buffer);
                long wait = nextDeliverTime.getTimeInMillis() - Calendar.getInstance().getTimeInMillis();
                if (wait > 0)
                {
                    try {
                        Thread.sleep(wait);
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    };
    thread.start();
```

### Receive Raw Incoming audio

We can also receive the call audio stream samples as [`java.nio.ByteBuffer`](https://docs.oracle.com/javase/7/docs/api/java/nio/ByteBuffer.html) if we want to process the audio before playback.


Create a `RawIncomingAudioStreamOptions` object specifying the raw stream properties we want to receive.

```java
    RawIncomingAudioStreamOptions options = new RawIncomingAudioStreamOptions();
    RawIncomingAudioStreamProperties properties = new RawIncomingAudioStreamProperties()
                .setAudioFormat(AudioStreamFormat.PCM16_BIT)
                .setSampleRate(AudioStreamSampleRate.HZ44100)
                .setChannelMode(AudioStreamChannelMode.STEREO);
    options.setProperties(properties);
```

Create a `RawIncomingAudioStream` and attach it to join call options

```java
    JoinCallOptions options =  JoinCallOptions() // or StartCallOptions()
    IncomingAudioOptions incomingAudioOptions = new IncomingAudioOptions();

    RawIncomingAudioStream rawIncomingAudioStream = new RawIncomingAudioStream(audioStreamOptions);
    incomingAudioOptions.setStream(rawIncomingAudioStream);
    options.setIncomingAudioOptions(incomingAudioOptions);
```

Or we can also attach the stream to an existing `Call` instance instead:

```java

    CompletableFuture<Void> result = call.startAudio(context, rawIncomingAudioStream);
```

For starting to receive raw audio buffers from the incoming stream add listeners to the incoming stream state and
buffer received events.

```java
    private void onStateChanged(PropertyChangedEvent propertyChangedEvent) {
        // When value is `AudioStreamState.STARTED` we'll be able to receive samples.
    }

    private void onMixedAudioBufferReceived(IncomingMixedAudioEvent incomingMixedAudioEvent) {
        // Received a raw audio buffers(java.nio.ByteBuffer).
    }

    rawIncomingAudioStream.addOnStateChangedListener(this::onStateChanged);
    rawIncomingAudioStream.addMixedAudioBufferReceivedListener(this::onMixedAudioBufferReceived);
```

Remember to stop the audio stream in the current `Call` instance:

```java

    CompletableFuture<Void> result = call.stopAudio(context, rawIncomingAudioStream);
```

## RawVideo access

Because the app generates the video frames, the app must inform the Azure Communication Services Calling SDK about the video formats that the app can generate. This information enables the Azure Communication Services Calling SDK to pick the best video format configuration for the network conditions at that time.

## Virtual video

### Supported video resolutions

| Aspect ratio | Resolution | Maximum FPS |
| --- | --- | --- |
| 16x9 | 1080p | 30 |
| 16x9 | 720p | 30 |
| 16x9 | 540p | 30 |
| 16x9 | 480p | 30 |
| 16x9 | 360p | 30 |
| 16x9 | 270p | 15 |
| 16x9 | 240p | 15 |
| 16x9 | 180p | 15 |
| 4x3 | VGA (640x480) | 30 |
| 4x3 | 424x320 | 15 |
| 4x3 | QVGA (320x240) | 15 |
| 4x3 | 212x160 | 15 |

1. Create an array of `VideoFormat` using the VideoStreamPixelFormat the SDK supports.

   When multiple formats are available, the order of the formats in the list doesn't influence or prioritize which one is used. The criteria for format selection are based on external factors like network bandwidth.

    ```java
    VideoStreamFormat videoStreamFormat = new VideoStreamFormat();
    videoStreamFormat.setResolution(VideoStreamResolution.P360);
    videoStreamFormat.setPixelFormat(VideoStreamPixelFormat.RGBA);
    videoStreamFormat.setFramesPerSecond(framerate);
    videoStreamFormat.setStride1(w * 4); // It is times 4 because RGBA is a 32-bit format

    List<VideoStreamFormat> videoStreamFormats = new ArrayList<>();
    videoStreamFormats.add(videoStreamFormat);
    ```

2. Create `RawOutgoingVideoStreamOptions`, and set `Formats` with the previously created object.

    ```java
    RawOutgoingVideoStreamOptions rawOutgoingVideoStreamOptions = new RawOutgoingVideoStreamOptions();
    rawOutgoingVideoStreamOptions.setFormats(videoStreamFormats);
    ```

3. Create an instance of `VirtualOutgoingVideoStream` by using the `RawOutgoingVideoStreamOptions` instance that you created previously.

    ```java
    VirtualOutgoingVideoStream rawOutgoingVideoStream = new VirtualOutgoingVideoStream(rawOutgoingVideoStreamOptions);
    ```

4. Subscribe to the `RawOutgoingVideoStream.addOnFormatChangedListener` delegate. This event informs whenever the `VideoStreamFormat` has been changed from one of the video formats provided on the list.

    ```java
    virtualOutgoingVideoStream.addOnFormatChangedListener((VideoStreamFormatChangedEvent args) -> 
    {
        VideoStreamFormat videoStreamFormat = args.Format;
    });
    ```

6. Create an instance of the following helper class to generate random `RawVideoFrame` using `VideoStreamPixelFormat.RGBA`.

    ```java
    public class VideoFrameSender
    {
        private RawOutgoingVideoStream rawOutgoingVideoStream;
        private Thread frameIteratorThread;
        private Random random = new Random();
        private volatile boolean stopFrameIterator = false;

        public VideoFrameSender(RawOutgoingVideoStream rawOutgoingVideoStream)
        {
            this.rawOutgoingVideoStream = rawOutgoingVideoStream;
        }

        public void VideoFrameIterator()
        {
            while (!stopFrameIterator)
            {
                if (rawOutgoingVideoStream != null && 
                    rawOutgoingVideoStream.getFormat() != null && 
                    rawOutgoingVideoStream.getState() == VideoStreamState.STARTED)
                {
                    SendRandomVideoFrameRGBA();
                }
            }
        }

        private void SendRandomVideoFrameRGBA()
        {
            int rgbaCapacity = rawOutgoingVideoStream.getFormat().getWidth() * rawOutgoingVideoStream.getFormat().getHeight() * 4;

            RawVideoFrame videoFrame = GenerateRandomVideoFrameBuffer(rawOutgoingVideoStream.getFormat(), rgbaCapacity);

            try
            {
                rawOutgoingVideoStream.sendRawVideoFrame(videoFrame).get();

                int delayBetweenFrames = (int)(1000.0 / rawOutgoingVideoStream.getFormat().getFramesPerSecond());
                Thread.sleep(delayBetweenFrames);
            }
            catch (Exception ex)
            {
                String msg = ex.getMessage();
            }
            finally
            {
                videoFrame.close();
            }
        }

        private RawVideoFrame GenerateRandomVideoFrameBuffer(VideoStreamFormat videoStreamFormat, int rgbaCapacity)
        {
            ByteBuffer rgbaBuffer = ByteBuffer.allocateDirect(rgbaCapacity); // Only allocateDirect ByteBuffers are allowed
            rgbaBuffer.order(ByteOrder.nativeOrder());

            GenerateRandomVideoFrame(rgbaBuffer, rgbaCapacity);

            RawVideoFrameBuffer videoFrameBuffer = new RawVideoFrameBuffer();
            videoFrameBuffer.setBuffers(Arrays.asList(rgbaBuffer));
            videoFrameBuffer.setStreamFormat(videoStreamFormat);

            return videoFrameBuffer;
        }

        private void GenerateRandomVideoFrame(ByteBuffer rgbaBuffer, int rgbaCapacity)
        {
            int w = rawOutgoingVideoStream.getFormat().getWidth();
            int h = rawOutgoingVideoStream.getFormat().getHeight();

            byte rVal = (byte)random.nextInt(255);
            byte gVal = (byte)random.nextInt(255);
            byte bVal = (byte)random.nextInt(255);
            byte aVal = (byte)255;

            byte[] rgbaArrayBuffer = new byte[rgbaCapacity];

            int rgbaStride = w * 4;

            for (int y = 0; y < h; y++)
            {
                for (int x = 0; x < rgbaStride; x += 4)
                {
                    rgbaArrayBuffer[(w * 4 * y) + x + 0] = rVal;
                    rgbaArrayBuffer[(w * 4 * y) + x + 1] = gVal;
                    rgbaArrayBuffer[(w * 4 * y) + x + 2] = bVal;
                    rgbaArrayBuffer[(w * 4 * y) + x + 3] = aVal;
                }
            }

            rgbaBuffer.put(rgbaArrayBuffer);
            rgbaBuffer.rewind();
        }

        public void Start()
        {
            frameIteratorThread = new Thread(this::VideoFrameIterator);
            frameIteratorThread.start();
        }

        public void Stop()
        {
            try
            {
                if (frameIteratorThread != null)
                {
                    stopFrameIterator = true;

                    frameIteratorThread.join();
                    frameIteratorThread = null;

                    stopFrameIterator = false;
                }
            }
            catch (InterruptedException ex)
            {
                String msg = ex.getMessage();
            }
        }
    }
    ```

7. Subscribe to the `VideoStream.addOnStateChangedListener` delegate. This delegate informs the state of the current stream. Don't send frames if the state isn't equal to `VideoStreamState.STARTED`.

    ```java
    private VideoFrameSender videoFrameSender;

    rawOutgoingVideoStream.addOnStateChangedListener((VideoStreamStateChangedEvent args) ->
    {
        CallVideoStream callVideoStream = args.getStream();

        switch (callVideoStream.getState())
        {
            case AVAILABLE:
                videoFrameSender = new VideoFrameSender(rawOutgoingVideoStream);
                break;
            case STARTED:
                // Start sending frames
                videoFrameSender.Start();
                break;
            case STOPPED:
                // Stop sending frames
                videoFrameSender.Stop();
                break;
        }
    });
    ```

## ScreenShare Video

Because the Windows system generates the frames, you must implement your own foreground service to capture the frames and send them by using the Azure Communication Services Calling API.

### Supported video resolutions

| Aspect ratio | Resolution | Maximum FPS |
| --- | --- | --- |
| Anything | Anything up to 1080p | 30 |

### Steps to create a screen share video stream

1. Create an array of `VideoFormat` using the VideoStreamPixelFormat the SDK supports.

   When multiple formats are available, the order of the formats in the list doesn't influence or prioritize which one is used. The criteria for format selection are based on external factors like network bandwidth.

    ```java
    VideoStreamFormat videoStreamFormat = new VideoStreamFormat();
    videoStreamFormat.setWidth(1280); // Width and height can be used for ScreenShareOutgoingVideoStream for custom resolutions or use one of the predefined values inside VideoStreamResolution
    videoStreamFormat.setHeight(720);
    //videoStreamFormat.setResolution(VideoStreamResolution.P360);
    videoStreamFormat.setPixelFormat(VideoStreamPixelFormat.RGBA);
    videoStreamFormat.setFramesPerSecond(framerate);
    videoStreamFormat.setStride1(w * 4); // It is times 4 because RGBA is a 32-bit format

    List<VideoStreamFormat> videoStreamFormats = new ArrayList<>();
    videoStreamFormats.add(videoStreamFormat);
    ```

2. Create `RawOutgoingVideoStreamOptions`, and set `VideoFormats` with the previously created object.

    ```java
    RawOutgoingVideoStreamOptions rawOutgoingVideoStreamOptions = new RawOutgoingVideoStreamOptions();
    rawOutgoingVideoStreamOptions.setFormats(videoStreamFormats);
    ```

3. Create an instance of `VirtualOutgoingVideoStream` by using the `RawOutgoingVideoStreamOptions` instance that you created previously.

    ```java
    ScreenShareOutgoingVideoStream rawOutgoingVideoStream = new ScreenShareOutgoingVideoStream(rawOutgoingVideoStreamOptions);
    ```

4. Capture and send the video frame as follows:

    ```java
    private void SendRawVideoFrame()
    {
        ByteBuffer byteBuffer = // Fill it with the content you got from the Windows APIs
        RawVideoFrameBuffer videoFrame = new RawVideoFrameBuffer();
        videoFrame.setBuffers(Arrays.asList(byteBuffer)); // The number of buffers depends on the VideoStreamPixelFormat
        videoFrame.setStreamFormat(rawOutgoingVideoStream.getFormat());

        try
        {
            rawOutgoingVideoStream.sendRawVideoFrame(videoFrame).get();
        }
        catch (Exception ex)
        {
            String msg = ex.getMessage();
        }
        finally
        {
            videoFrame.close();
        }
    }
    ```

## Raw incoming video

This feature gives you access the video frames inside the `IncomingVideoStream` objects to manipulate those frames locally

1. Create an instance of `IncomingVideoOptions` that sets through `JoinCallOptions` setting `VideoStreamKind.RawIncoming`.

    ```java
    IncomingVideoOptions incomingVideoOptions = new IncomingVideoOptions()
            .setStreamType(VideoStreamKind.RAW_INCOMING);

    JoinCallOptions joinCallOptions = new JoinCallOptions()
            .setIncomingVideoOptions(incomingVideoOptions);
    ```

2. Once you receive a `ParticipantsUpdatedEventArgs` event attach `RemoteParticipant.VideoStreamStateChanged` delegate. This event informs the state of the `IncomingVideoStream` object.

    ```java
    private List<RemoteParticipant> remoteParticipantList;

    private void OnRemoteParticipantsUpdated(ParticipantsUpdatedEventArgs args)
    {
        for (RemoteParticipant remoteParticipant : args.getAddedParticipants())
        {
            List<IncomingVideoStream> incomingVideoStreamList = remoteParticipant.getIncomingVideoStreams(); // Check if there are IncomingVideoStreams already before attaching the delegate
            for (IncomingVideoStream incomingVideoStream : incomingVideoStreamList)
            {
                OnRawIncomingVideoStreamStateChanged(incomingVideoStream);
            }

            remoteParticipant.addOnVideoStreamStateChanged(this::OnVideoStreamStateChanged);
            remoteParticipantList.add(remoteParticipant); // If the RemoteParticipant ref is not kept alive the VideoStreamStateChanged events are going to be missed
        }

        for (RemoteParticipant remoteParticipant : args.getRemovedParticipants())
        {
            remoteParticipant.removeOnVideoStreamStateChanged(this::OnVideoStreamStateChanged);
            remoteParticipantList.remove(remoteParticipant);
        }
    }

    private void OnVideoStreamStateChanged(object sender, VideoStreamStateChangedEventArgs args)
    {
        CallVideoStream callVideoStream = args.getStream();

        OnRawIncomingVideoStreamStateChanged((RawIncomingVideoStream) callVideoStream);
    }

    private void OnRawIncomingVideoStreamStateChanged(RawIncomingVideoStream rawIncomingVideoStream)
    {
        switch (incomingVideoStream.State)
        {
            case AVAILABLE:
                // There is a new IncomingvideoStream
                rawIncomingVideoStream.addOnRawVideoFrameReceived(this::OnVideoFrameReceived);
                rawIncomingVideoStream.Start();

                break;
            case STARTED:
                // Will start receiving video frames
                break;
            case STOPPED:
                // Will stop receiving video frames
                break;
            case NOT_AVAILABLE:
                // The IncomingvideoStream should not be used anymore
                rawIncomingVideoStream.removeOnRawVideoFrameReceived(this::OnVideoFrameReceived);

                break;
        }
    }
    ```

3. At the time, the `IncomingVideoStream` has `VideoStreamState.Available` state attach `RawIncomingVideoStream.RawVideoFrameReceived` delegate as shown on the previous step. That delegate provides the new `RawVideoFrame` objects.

    ```java
    private void OnVideoFrameReceived(RawVideoFrameReceivedEventArgs args)
    {
        // Render/Modify/Save the video frame
        RawVideoFrameBuffer videoFrame = (RawVideoFrameBuffer) args.getFrame();
    }
    ```

## Sample code

- Use the sample app on GitHub at [Raw Video](https://github.com/Azure-Samples/communication-services-android-quickstarts/tree/main/RawVideo).



**Applies to: platform-ios**


This article describes how to implement raw media access by using the Azure Communication Services Calling SDK for iOS.

The Azure Communication Services Calling SDK enables apps to generate their own video frames to send to remote participants in a call.

This article builds on [Add 1\:1 video calling to your app](get-started-with-video-calling.md?pivots=platform-ios) for iOS.


## Raw audio access 

Processing raw audio media gives you access to the incoming call audio stream, along with the ability to view and send custom outgoing audio streams during a call.

### Send raw outgoing audio

Make an options object specifying the raw stream properties we want to send. 

```swift
    let outgoingAudioStreamOptions = RawOutgoingAudioStreamOptions()
    let properties = RawOutgoingAudioStreamProperties()
    properties.sampleRate = .hz44100
    properties.bufferDuration = .inMs20
    properties.channelMode = .mono
    properties.format = .pcm16Bit
    outgoingAudioStreamOptions.properties = properties
```

Create a `RawOutgoingAudioStream` and attach it to join call options and the stream automatically starts when call is connected.

```swift 
    let options = JoinCallOptions() // or StartCallOptions()

    let outgoingAudioOptions = OutgoingAudioOptions()
    self.rawOutgoingAudioStream = RawOutgoingAudioStream(rawOutgoingAudioStreamOptions: outgoingAudioStreamOptions)
    outgoingAudioOptions.stream = self.rawOutgoingAudioStream
    options.outgoingAudioOptions = outgoingAudioOptions

    // Start or Join call passing the options instance.

```

### Attach stream to a call

Or you can also attach the stream to an existing `Call` instance instead:

```swift

    call.startAudio(stream: self.rawOutgoingAudioStream) { error in 
        // Stream attached to `Call`.
    }
```
### Start sending Raw Samples

We can only start sending data once the stream state is `AudioStreamState.started`. 
To observe the audio stream state change, we implement the `RawOutgoingAudioStreamDelegate`. And set it as the stream delegate.

```swift
    func rawOutgoingAudioStream(_ rawOutgoingAudioStream: RawOutgoingAudioStream,
                                didChangeState args: AudioStreamStateChangedEventArgs) {
        // When value is `AudioStreamState.started` we will be able to send audio samples.
    }

    self.rawOutgoingAudioStream.delegate = DelegateImplementer()
```

Or use closure based:

```swift
    self.rawOutgoingAudioStream.events.onStateChanged = { args in
        // When value is `AudioStreamState.started` we will be able to send audio samples.
    }
```

When the stream starts, we can send [`AVAudioPCMBuffer`](https://developer.apple.com/documentation/avfaudio/avaudiopcmbuffer) audio samples to the call. 

The audio buffer format must match the specified stream properties.

```swift
    protocol SamplesProducer {
        func produceSample(_ currentSample: Int, 
                           options: RawOutgoingAudioStreamOptions) -> AVAudioPCMBuffer
    }

    // Let's use a simple Tone data producer as example.
    // Producing PCM buffers.
    func produceSamples(_ currentSample: Int,
                        stream: RawOutgoingAudioStream,
                        options: RawOutgoingAudioStreamOptions) -> AVAudioPCMBuffer {
        let sampleRate = options.properties.sampleRate
        let channelMode = options.properties.channelMode
        let bufferDuration = options.properties.bufferDuration
        let numberOfChunks = UInt32(1000 / bufferDuration.value)
        let bufferFrameSize = UInt32(sampleRate.valueInHz) / numberOfChunks
        let frequency = 400

        guard let format = AVAudioFormat(commonFormat: .pcmFormatInt16,
                                         sampleRate: sampleRate.valueInHz,
                                         channels: channelMode.channelCount,
                                         interleaved: channelMode == .stereo) else {
            fatalError("Failed to create PCM Format")
        }

        guard let buffer = AVAudioPCMBuffer(pcmFormat: format, frameCapacity: bufferFrameSize) else {
            fatalError("Failed to create PCM buffer")
        }

        buffer.frameLength = bufferFrameSize

        let factor: Double = ((2 as Double) * Double.pi) / (sampleRate.valueInHz/Double(frequency))
        var interval = 0
        for sampleIdx in 0..<Int(buffer.frameCapacity * channelMode.channelCount) {
            let sample = sin(factor * Double(currentSample + interval))
            // Scale to maximum amplitude. Int16.max is 37,767.
            let value = Int16(sample * Double(Int16.max))
            
            guard let underlyingByteBuffer = buffer.mutableAudioBufferList.pointee.mBuffers.mData else {
                continue
            }
            underlyingByteBuffer.assumingMemoryBound(to: Int16.self).advanced(by: sampleIdx).pointee = value
            interval += channelMode == .mono ? 2 : 1
        }

        return buffer
    }

    final class RawOutgoingAudioSender {
        let stream: RawOutgoingAudioStream
        let options: RawOutgoingAudioStreamOptions
        let producer: SamplesProducer

        private var timer: Timer?
        private var currentSample: Int = 0
        private var currentTimestamp: Int64 = 0

        init(stream: RawOutgoingAudioStream,
             options: RawOutgoingAudioStreamOptions,
             producer: SamplesProducer) {
            self.stream = stream
            self.options = options
            self.producer = producer
        }

        func start() {
            let properties = self.options.properties
            let interval = properties.bufferDuration.timeInterval

            let channelCount = AVAudioChannelCount(properties.channelMode.channelCount)
            let format = AVAudioFormat(commonFormat: .pcmFormatInt16,
                                       sampleRate: properties.sampleRate.valueInHz,
                                       channels: channelCount,
                                       interleaved: channelCount > 1)!
            self.timer = Timer.scheduledTimer(withTimeInterval: interval, repeats: true) { [weak self] _ in
                guard let self = self else { return }
                let sample = self.producer.produceSamples(self.currentSample, options: self.options)
                let rawBuffer = RawAudioBuffer()
                rawBuffer.buffer = sample
                rawBuffer.timestampInTicks = self.currentTimestamp
                self.stream.send(buffer: rawBuffer, completionHandler: { error in
                    if let error = error {
                        // Handle possible error.
                    }
                })

                self.currentTimestamp += Int64(properties.bufferDuration.value)
                self.currentSample += 1
            }
        }

        func stop() {
            self.timer?.invalidate()
            self.timer = nil
        }

        deinit {
            stop()
        }
    }
```

It's also important to remember to stop the audio stream in the current `Call` instance:

```swift

    call.stopAudio(stream: self.rawOutgoingAudioStream) { error in 
        // Stream detached from `Call` and stopped.
    }
```

### Capturing microphone samples

Using Apple's [`AVAudioEngine`](https://developer.apple.com/documentation/avfaudio/avaudioengine) we can capture microphone frames by tapping into the audio engine [input node](https://developer.apple.com/documentation/avfaudio/avaudioengine/1386063-inputnode). And capture the microphone data to use raw audio functionality. Use this method to process the audio before sending it to a call.

```swift 
    import AVFoundation
    import AzureCommunicationCalling

    enum MicrophoneSenderError: Error {
        case notMatchingFormat
    }

    final class MicrophoneDataSender {
        private let stream: RawOutgoingAudioStream
        private let properties: RawOutgoingAudioStreamProperties
        private let format: AVAudioFormat
        private let audioEngine: AVAudioEngine = AVAudioEngine()

        init(properties: RawOutgoingAudioStreamProperties) throws {
            // This can be different depending on which device we are running or value set for
            // `try AVAudioSession.sharedInstance().setPreferredSampleRate(...)`.
            let nodeFormat = self.audioEngine.inputNode.outputFormat(forBus: 0)
            let matchingSampleRate = AudioSampleRate.allCases.first(where: { $0.valueInHz == nodeFormat.sampleRate })
            guard let inputNodeSampleRate = matchingSampleRate else {
                throw MicrophoneSenderError.notMatchingFormat
            }

            // Override the sample rate to one that matches audio session (Audio engine input node frequency).
            properties.sampleRate = inputNodeSampleRate

            let options = RawOutgoingAudioStreamOptions()
            options.properties = properties

            self.stream = RawOutgoingAudioStream(rawOutgoingAudioStreamOptions: options)
            let channelCount = AVAudioChannelCount(properties.channelMode.channelCount)
            self.format = AVAudioFormat(commonFormat: .pcmFormatInt16,
                                        sampleRate: properties.sampleRate.valueInHz,
                                        channels: channelCount,
                                        interleaved: channelCount > 1)!
            self.properties = properties
        }

        func start() throws {
            guard !self.audioEngine.isRunning else {
                return
            }

            // Install tap documentations states that we can get between 100 and 400 ms of data.
            let framesFor100ms = AVAudioFrameCount(self.format.sampleRate * 0.1)

            // Note that some formats may not be allowed by `installTap`, so we have to specify the 
            // correct properties.
            self.audioEngine.inputNode.installTap(onBus: 0, bufferSize: framesFor100ms, 
                                                  format: self.format) { [weak self] buffer, _ in
                guard let self = self else { return }
                
                let rawBuffer = RawAudioBuffer()
                rawBuffer.buffer = buffer
                // Although we specified either 10ms or 20ms, we allow sending up to 100ms of data
                // as long as it can be evenly divided by the specified size.
                self.stream.send(buffer: rawBuffer) { error in
                    if let error = error {
                        // Handle error
                    }
                }
            }

            try audioEngine.start()
        }

        func stop() {
            audioEngine.stop()
        }
    }
```

> **Note:**
> The sample rate of the audio engine [input node](https://developer.apple.com/documentation/avfaudio/avaudioengine/1386063-inputnode) defaults to a >value of the preferred sample rate for the shared audio session. So we can't install tap in that node using a different value. 
> You need to ensure that the `RawOutgoingStream` properties sample rate matches the one received from tap into microphone samples or convert the tap buffers to the format that matches what is expected on the outgoing stream.

With this small sample, we learned how to capture the microphone [`AVAudioEngine`](https://developer.apple.com/documentation/avfaudio/avaudioengine) data and send those samples to a call using raw outgoing audio feature.

### Receive Raw Incoming audio

We can also receive the call audio stream samples as [`AVAudioPCMBuffer`](https://developer.apple.com/documentation/avfaudio/avaudiopcmbuffer) if we want to process the audio before playback.

Create a `RawIncomingAudioStreamOptions` object specifying the raw stream properties we want to receive.

```swift
    let options = RawIncomingAudioStreamOptions()
    let properties = RawIncomingAudioStreamProperties()
    properties.format = .pcm16Bit
    properties.sampleRate = .hz44100
    properties.channelMode = .stereo
    options.properties = properties
```

Create a `RawOutgoingAudioStream` and attach it to join call options.

```swift 
    let options =  JoinCallOptions() // or StartCallOptions()
    let incomingAudioOptions = IncomingAudioOptions()

    self.rawIncomingStream = RawIncomingAudioStream(rawIncomingAudioStreamOptions: audioStreamOptions)
    incomingAudioOptions.stream = self.rawIncomingStream
    options.incomingAudioOptions = incomingAudioOptions
```

Or we can attach the stream to an existing `Call` instance instead:

```swift

    call.startAudio(stream: self.rawIncomingStream) { error in 
        // Stream attached to `Call`.
    }
```

To receive raw audio buffer from the incoming stream, implement the `RawIncomingAudioStreamDelegate`:

```swift
    class RawIncomingReceiver: NSObject, RawIncomingAudioStreamDelegate {
        func rawIncomingAudioStream(_ rawIncomingAudioStream: RawIncomingAudioStream,
                                    didChangeState args: AudioStreamStateChangedEventArgs) {
            // To be notified when stream started and stopped.
        }
        
        func rawIncomingAudioStream(_ rawIncomingAudioStream: RawIncomingAudioStream,
                                    mixedAudioBufferReceived args: IncomingMixedAudioEventArgs) {
            // Receive raw audio buffers(AVAudioPCMBuffer) and process using AVAudioEngine API's.
        }
    }

    self.rawIncomingStream.delegate = RawIncomingReceiver()
```

Or:

```swift
    rawIncomingAudioStream.events.mixedAudioBufferReceived = { args in
        // Receive raw audio buffers(AVAudioPCMBuffer) and process them using AVAudioEngine API's.
    }

    rawIncomingAudioStream.events.onStateChanged = { args in
        // To be notified when stream started and stopped.
    }
```

## RawVideo access

Because the app generates the video frames, the app must inform the Azure Communication Services Calling SDK about the video formats that the app can generate. This information enables the Calling SDK to pick the best video format configuration for the network conditions at that time.

## Virtual Video

### Supported video resolutions

| Aspect ratio | Resolution | Maximum FPS |
| --- | --- | --- |
| 16x9 | 1080p | 30 |
| 16x9 | 720p | 30 |
| 16x9 | 540p | 30 |
| 16x9 | 480p | 30 |
| 16x9 | 360p | 30 |
| 16x9 | 270p | 15 |
| 16x9 | 240p | 15 |
| 16x9 | 180p | 15 |
| 4x3 | VGA (640x480) | 30 |
| 4x3 | 424x320 | 15 |
| 4x3 | QVGA (320x240) | 15 |
| 4x3 | 212x160 | 15 |

1. Create an array of `VideoFormat` using the VideoStreamPixelFormat the SDK supports.
   When multiple formats are available, the order of the formats in the list doesn't influence or prioritize which one is used. The criteria for format selection are based on external factors like network bandwidth.

    ```swift
    var videoStreamFormat = VideoStreamFormat()
    videoStreamFormat.resolution = VideoStreamResolution.p360
    videoStreamFormat.pixelFormat = VideoStreamPixelFormat.nv12
    videoStreamFormat.framesPerSecond = framerate
    videoStreamFormat.stride1 = w // w is the resolution width
    videoStreamFormat.stride2 = w / 2 // w is the resolution width

    var videoStreamFormats: [VideoStreamFormat] = [VideoStreamFormat]()
    videoStreamFormats.append(videoStreamFormat)
    ```

2. Create `RawOutgoingVideoStreamOptions`, and set formats with the previously created object.

    ```swift
    var rawOutgoingVideoStreamOptions = RawOutgoingVideoStreamOptions()
    rawOutgoingVideoStreamOptions.formats = videoStreamFormats
    ```

3. Create an instance of `VirtualOutgoingVideoStream` by using the `RawOutgoingVideoStreamOptions` instance that you created previously.

    ```swift
    var rawOutgoingVideoStream = VirtualOutgoingVideoStream(videoStreamOptions: rawOutgoingVideoStreamOptions)
    ```

4. Implement to the `VirtualOutgoingVideoStreamDelegate` delegate. The `didChangeFormat` event informs whenever the `VideoStreamFormat` changed from one of the video formats provided on the list.

    ```swift
    virtualOutgoingVideoStream.delegate = /* Attach delegate and implement didChangeFormat */
    ```

5. Create an instance of the following helper class to access `CVPixelBuffer` data.

    ```swift
    final class BufferExtensions: NSObject {
        public static func getArrayBuffersUnsafe(cvPixelBuffer: CVPixelBuffer) -> Array<UnsafeMutableRawPointer?>
        {
            var bufferArrayList: Array<UnsafeMutableRawPointer?> = [UnsafeMutableRawPointer?]()
                
            let cvStatus: CVReturn = CVPixelBufferLockBaseAddress(cvPixelBuffer, .readOnly)
            
            if cvStatus == kCVReturnSuccess {
                let bufferListSize = CVPixelBufferGetPlaneCount(cvPixelBuffer);
                for i in 0...bufferListSize {
                    let bufferRef = CVPixelBufferGetBaseAddressOfPlane(cvPixelBuffer, i)
                    bufferArrayList.append(bufferRef)
                }
            }
    
            return bufferArrayList
        }
    }
    ```

6. Create an instance of the following helper class to generate random `RawVideoFrameBuffer` using `VideoStreamPixelFormat.rgba`.

    ```swift
    final class VideoFrameSender : NSObject
    {
        private var rawOutgoingVideoStream: RawOutgoingVideoStream
        private var frameIteratorThread: Thread
        private var stopFrameIterator: Bool = false

        public VideoFrameSender(rawOutgoingVideoStream: RawOutgoingVideoStream)
        {
            self.rawOutgoingVideoStream = rawOutgoingVideoStream
        }

        @objc private func VideoFrameIterator()
        {
            while !stopFrameIterator {
                if rawOutgoingVideoStream != nil &&
                   rawOutgoingVideoStream.format != nil &&
                   rawOutgoingVideoStream.state == .started {
                    SendRandomVideoFrameNV12()
                }
           }
        }

        public func SendRandomVideoFrameNV12() -> Void
        {
            let videoFrameBuffer = GenerateRandomVideoFrameBuffer()
            
            rawOutgoingVideoStream.send(frame: videoFrameBuffer) { error in
                /*Handle error if non-nil*/
            }
            
            let rate = 0.1 / rawOutgoingVideoStream.format.framesPerSecond
            let second: Float = 1000000
            usleep(useconds_t(rate * second))
        }

        private func GenerateRandomVideoFrameBuffer() -> RawVideoFrame
        {
            var cvPixelBuffer: CVPixelBuffer? = nil
            guard CVPixelBufferCreate(kCFAllocatorDefault,
                                    rawOutgoingVideoStream.format.width,
                                    rawOutgoingVideoStream.format.height,
                                    kCVPixelFormatType_420YpCbCr8BiPlanarFullRange,
                                    nil,
                                    &cvPixelBuffer) == kCVReturnSuccess else {
                fatalError()
            }
            
            GenerateRandomVideoFrameNV12(cvPixelBuffer: cvPixelBuffer!)
            
            CVPixelBufferUnlockBaseAddress(cvPixelBuffer!, .readOnly)
            
            let videoFrameBuffer = RawVideoFrameBuffer()
            videoFrameBuffer.buffer = cvPixelBuffer!
            videoFrameBuffer.streamFormat = rawOutgoingVideoStream.format
            
            return videoFrameBuffer
        }
        
       private func GenerateRandomVideoFrameNV12(cvPixelBuffer: CVPixelBuffer) {
            let w = rawOutgoingVideoStream.format.width
            let h = rawOutgoingVideoStream.format.height

            let bufferArrayList = BufferExtensions.getArrayBuffersUnsafe(cvPixelBuffer: cvPixelBuffer)
        
            guard bufferArrayList.count >= 2, let yArrayBuffer = bufferArrayList[0], let uvArrayBuffer = bufferArrayList[1] else {
                return
            }

            let yVal = Int32.random(in: 1..<255)
            let uvVal = Int32.random(in: 1..<255)

            for y in 0...h
            {
                for x in 0...w
                {
                    yArrayBuffer.storeBytes(of: yVal, toByteOffset: Int((y * w) + x), as: Int32.self)
                }
            }

            for y in 0...(h/2)
            {
                for x in 0...(w/2)
                {
                    uvArrayBuffer.storeBytes(of: uvVal, toByteOffset: Int((y * w) + x), as: Int32.self)
                }
            }
        }
        
        public func Start() {
            stopFrameIterator = false
            frameIteratorThread = Thread(target: self, selector: #selector(VideoFrameIterator), object: "VideoFrameSender")
            frameIteratorThread?.start()
        }
        
        public func Stop() {
            if frameIteratorThread != nil {
                stopFrameIterator = true
                frameIteratorThread?.cancel()
                frameIteratorThread = nil
            }
        }
    }
    ```

7. Implement to the `VirtualOutgoingVideoStreamDelegate`. The `didChangeState` event informs the state of the current stream.

   Don't send frames if the state isn't equal to `VideoStreamState.started`.

    ```swift
    /*Delegate Implementer*/ 
    private var videoFrameSender: VideoFrameSender
    func virtualOutgoingVideoStream(
        _ virtualOutgoingVideoStream: VirtualOutgoingVideoStream,
        didChangeState args: VideoStreamStateChangedEventArgs) {
        switch args.stream.state {
            case .available:
                videoFrameSender = VideoFrameSender(rawOutgoingVideoStream)
                break
            case .started:
                /* Start sending frames */
                videoFrameSender.Start()
                break
            case .stopped:
                /* Stop sending frames */
                videoFrameSender.Stop()
                break
        }
    }
    ```

## ScreenShare Video

Because the Windows system generates the frames, you must implement your own foreground service to capture the frames and send them by using the Azure Communication Services Calling API.

### Supported video resolutions

| Aspect ratio | Resolution | Maximum FPS |
| --- | --- | --- |
| Anything | Anything up to 1080p | 30 |

### Steps to create a screen share video stream

1. Create an array of `VideoFormat` using the VideoStreamPixelFormat the SDK supports.
   When multiple formats are available, the order of the formats in the list doesn't influence or prioritize which one is used. The criteria for format selection are based on external factors like network bandwidth.

    ```swift
    let videoStreamFormat = VideoStreamFormat()
    videoStreamFormat.width = 1280 /* Width and height can be used for ScreenShareOutgoingVideoStream for custom resolutions or use one of the predefined values inside VideoStreamResolution */
    videoStreamFormat.height = 720
    /*videoStreamFormat.resolution = VideoStreamResolution.p360*/
    videoStreamFormat.pixelFormat = VideoStreamPixelFormat.rgba
    videoStreamFormat.framesPerSecond = framerate
    videoStreamFormat.stride1 = w * 4 /* It is times 4 because RGBA is a 32-bit format */
    
    var videoStreamFormats: [VideoStreamFormat] = []
    videoStreamFormats.append(videoStreamFormat)
    ```

2. Create `RawOutgoingVideoStreamOptions`, and set `VideoFormats` with the previously created object.

    ```swift
    var rawOutgoingVideoStreamOptions = RawOutgoingVideoStreamOptions()
    rawOutgoingVideoStreamOptions.formats = videoStreamFormats
    ```

3. Create an instance of `VirtualOutgoingVideoStream` by using the `RawOutgoingVideoStreamOptions` instance that you created previously.

    ```swift
    var rawOutgoingVideoStream = ScreenShareOutgoingVideoStream(rawOutgoingVideoStreamOptions)
    ```

4. Capture and send the video frame in the following way.

    ```swift
    private func SendRawVideoFrame() -> Void
    {
        CVPixelBuffer cvPixelBuffer = /* Fill it with the content you got from the Windows APIs, The number of buffers depends on the VideoStreamPixelFormat */
        let videoFrameBuffer = RawVideoFrameBuffer()
        videoFrameBuffer.buffer = cvPixelBuffer!
        videoFrameBuffer.streamFormat = rawOutgoingVideoStream.format

        rawOutgoingVideoStream.send(frame: videoFrame) { error in
            /*Handle error if not nil*/
        }
    }
    ```

## Raw Incoming Video

This feature gives you access the video frames inside `IncomingVideoStream` to manipulate those stream objects locally.

1. Create an instance of `IncomingVideoOptions` that sets through `JoinCallOptions` setting `VideoStreamKind.RawIncoming`.

    ```swift
    var incomingVideoOptions = IncomingVideoOptions()
    incomingVideoOptions.streamType = VideoStreamKind.rawIncoming
    var joinCallOptions = JoinCallOptions()
    joinCallOptions.incomingVideoOptions = incomingVideoOptions
    ```

2. Once you receive a `ParticipantsUpdatedEventArgs` event attach `RemoteParticipant.delegate.didChangedVideoStreamState` delegate. This event informs the state of the `IncomingVideoStream` objects.

    ```swift
    private var remoteParticipantList: [RemoteParticipant] = []

    func call(_ call: Call, didUpdateRemoteParticipant args: ParticipantsUpdatedEventArgs) {
        args.addedParticipants.forEach { remoteParticipant in
            remoteParticipant.incomingVideoStreams.forEach { incomingVideoStream in
                OnRawIncomingVideoStreamStateChanged(incomingVideoStream: incomingVideoStream)
            }
            remoteParticipant.delegate = /* Attach delegate OnVideoStreamStateChanged*/
        }
            
        args.removedParticipants.forEach { remoteParticipant in
            remoteParticipant.delegate = nil
        }
    }

    func remoteParticipant(_ remoteParticipant: RemoteParticipant, 
                           didVideoStreamStateChanged args: VideoStreamStateChangedEventArgs) {
        OnRawIncomingVideoStreamStateChanged(rawIncomingVideoStream: args.stream)
    }

    func OnRawIncomingVideoStreamStateChanged(rawIncomingVideoStream: RawIncomingVideoStream) {
        switch incomingVideoStream.state {
            case .available:
                /* There is a new IncomingVideoStream */
                rawIncomingVideoStream.delegate /* Attach delegate OnVideoFrameReceived*/
                rawIncomingVideoStream.start()
                break;
            case .started:
                /* Will start receiving video frames */
                break
            case .stopped:
                /* Will stop receiving video frames */
                break
            case .notAvailable:
                /* The IncomingVideoStream should not be used anymore */
                rawIncomingVideoStream.delegate = nil
                break
        }
    }
    ```

3. At the time, the `IncomingVideoStream` has `VideoStreamState.available` state attach `RawIncomingVideoStream.delegate.didReceivedRawVideoFrame` delegate as shown on the previous step. That event provides the new `RawVideoFrame` objects.

    ```swift
    func rawIncomingVideoStream(_ rawIncomingVideoStream: RawIncomingVideoStream, 
                                didRawVideoFrameReceived args: RawVideoFrameReceivedEventArgs) {
        /* Render/Modify/Save the video frame */
        let videoFrame = args.frame as! RawVideoFrameBuffer
    }
    ```

## Sample code

- Use the sample app on GitHub at [Raw Video](https://github.com/Azure-Samples/communication-services-ios-quickstarts/tree/main/raw-video).



**Applies to: platform-web**


As a developer, you can access the raw media for incoming and outgoing audio, video, and screen sharing content during a call so that you can capture, analyze, and process audio/video content. Access to Azure Communication Services client-side raw audio, raw video, and raw screen share, gives developers an almost unlimited ability to view and edit audio, video, and screen share content that happens within the Azure Communication Services Calling SDK.

This article describes how to implement raw media access by using the Azure Communication Services Calling SDK for JavaScript.

For example:
- You can access the call's audio/video stream directly on the call object and send custom outgoing audio/video streams during the call.
- You can inspect audio and video streams to run custom AI models for analysis. Such models might include natural language processing to analyze conversations or to provide real-time insights and suggestions to boost agent productivity.
- You can use audio and video media streams to analyze sentiment when providing virtual care for patients or to provide remote assistance during video calls that use mixed reality. This capability opens a path for developers to apply innovations to enhance interaction experiences.

## Prerequisites

>**Important:**
> The examples here are available in [1.13.1](https://www.npmjs.com/package/@azure/communication-calling/v/1.13.1) of the Calling SDK for JavaScript. Be sure to use that version or newer when you're trying this quickstart.

## Access raw audio

Accessing raw audio media gives you access to the incoming call's audio stream, along with the ability to view and send custom outgoing audio streams during a call.

### Access an incoming raw audio stream

Use the following code to access an incoming call audio stream.

```js
const userId = 'acs_user_id';
const call = callAgent.startCall(userId);
const callStateChangedHandler = async () => {
    if (call.state === "Connected") {
        const remoteAudioStream = call.remoteAudioStreams[0];
        const mediaStream = await remoteAudioStream.getMediaStream();
	// process the incoming call's audio media stream track
    }
};

callStateChangedHandler();
call.on("stateChanged", callStateChangedHandler);
```

### Place a call with a custom audio stream

Use the following code to start a call with a custom audio stream instead of using a participant's microphone device.

```js
const createBeepAudioStreamToSend = () => {
    const context = new AudioContext();
    const dest = context.createMediaStreamDestination();
    const os = context.createOscillator();
    os.type = 'sine';
    os.frequency.value = 500;
    os.connect(dest);
    os.start();
    const { stream } = dest;
    return stream;
};

...
const userId = 'acs_user_id';
const mediaStream = createBeepAudioStreamToSend();
const localAudioStream = new LocalAudioStream(mediaStream);
const callOptions = {
    audioOptions: {
        localAudioStreams: [localAudioStream]
    }
};
callAgent.startCall(userId, callOptions);
```

### Switch to a custom audio stream during a call

Use the following code to switch an input device to a custom audio stream instead of using a participant's microphone device during a call.

```js
const createBeepAudioStreamToSend = () => {
    const context = new AudioContext();
    const dest = context.createMediaStreamDestination();
    const os = context.createOscillator();
    os.type = 'sine';
    os.frequency.value = 500;
    os.connect(dest);
    os.start();
    const { stream } = dest;
    return stream;
};

...

const userId = 'acs_user_id';
const mediaStream = createBeepAudioStreamToSend();
const localAudioStream = new LocalAudioStream(mediaStream);
const call = callAgent.startCall(userId);
const callStateChangedHandler = async () => {
    if (call.state === 'Connected') {
        await call.startAudio(localAudioStream);
    }
};

callStateChangedHandler();
call.on('stateChanged', callStateChangedHandler);
```

### Stop a custom audio stream

Use the following code to stop sending a custom audio stream if set during a call.

```js
call.stopAudio();
```

## Access raw video

Raw video media gives you the instance of a `MediaStream` object. Raw video media gives access specifically to the `MediaStream` object for incoming and outgoing calls. For raw video, you can use that object to apply filters by using machine learning to process frames of the video.

Processed raw outgoing video frames can be sent as an outgoing video of the sender. Processed raw incoming video frames can be rendered on the receiver side.

### Place a call with a custom video stream

You can access the raw video stream for an outgoing call. You use `MediaStream` for the outgoing raw video stream to process frames by using machine learning and to apply filters. The processed outgoing video can then be sent as a sender video stream.

This example sends canvas data to a user as outgoing video.

```js
const createVideoMediaStreamToSend = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 845;
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const colors = ['red', 'yellow', 'green'];
    window.setInterval(() => {
        if (ctx) {
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            const x = Math.floor(Math.random() * canvas.width);
            const y = Math.floor(Math.random() * canvas.height);
            const size = 100;
            ctx.fillRect(x, y, size, size);
        }
    }, 1000 / 30);

    return canvas.captureStream(30);
};

...
const userId = 'acs_user_id';
const mediaStream = createVideoMediaStreamToSend();
const localVideoStream = new LocalVideoStream(mediaStream);
const callOptions = {
    videoOptions: {
        localVideoStreams: [localVideoStream]
    }
};
callAgent.startCall(userId, callOptions);
```

### Switch to a custom video stream during a call

Use the following code to switch an input device to a custom video stream instead of using a participant's camera device during a call.

```js
const createVideoMediaStreamToSend = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 845;
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const colors = ['red', 'yellow', 'green'];
    window.setInterval(() => {
        if (ctx) {
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            const x = Math.floor(Math.random() * canvas.width);
            const y = Math.floor(Math.random() * canvas.height);
            const size = 100;
            ctx.fillRect(x, y, size, size);
	 }
    }, 1000 / 30);

    return canvas.captureStream(30);
};

...

const userId = 'acs_user_id';
const call = callAgent.startCall(userId);
const callStateChangedHandler = async () => {
    if (call.state === 'Connected') {    	
        const mediaStream = createVideoMediaStreamToSend();
        const localVideoStream = this.call.localVideoStreams.find((stream) => { return stream.mediaStreamType === 'Video' });
        await localVideoStream.setMediaStream(mediaStream);
    }
};

callStateChangedHandler();
call.on('stateChanged', callStateChangedHandler);
```

### Stop a custom video stream

Use the following code to stop sending a custom video stream if set during a call.

```js
// Stop video by passing the same `localVideoStream` instance that was used to start video
await call.stopVideo(localVideoStream);
```

When switching from a camera that has custom effects applied to another camera device, first stop the video, switch the source on the `LocalVideoStream`, and the start video again.
```js
const cameras = await this.deviceManager.getCameras();
const newCameraDeviceInfo = cameras.find(cameraDeviceInfo => { return cameraDeviceInfo.id === '<another camera that you want to switch to>' });
// If current camera is using custom raw media stream and video is on
if (this.localVideoStream.mediaStreamType === 'RawMedia' && this.state.videoOn) {
	// Stop raw custom video first
	await this.call.stopVideo(this.localVideoStream);
	// Switch the local video stream's source to the new camera to use
	this.localVideoStream?.switchSource(newCameraDeviceInfo);
	// Start video with the new camera device
	await this.call.startVideo(this.localVideoStream);

// Else if current camera is using normal stream from camera device and video is on
} else if (this.localVideoStream.mediaStreamType === 'Video' && this.state.videoOn) {
	// You can just switch the source, no need to stop and start again. Sent video will automatically switch to the new camera to use
	this.localVideoStream?.switchSource(newCameraDeviceInfo);
}

```

### Access incoming video stream from a remote participant

You can access the raw video stream for an incoming call. You use `MediaStream` for the incoming raw video stream to process frames by using machine learning and to apply filters. The processed incoming video can then be rendered on the receiver side.

```js
const remoteVideoStream = remoteParticipants[0].videoStreams.find((stream) => { return stream.mediaStreamType === 'Video'});
const processMediaStream = async () => {
    if (remoteVideoStream.isAvailable) {
	// remote video stream is turned on, process the video's raw media stream.
	const mediaStream = await remoteVideoStream.getMediaStream();
    } else {
	// remote video stream is turned off, handle it
    }
};

remoteVideoStream.on('isAvailableChanged', async () => {
    await processMediaStream();
});

await processMediaStream();
```

> **Important:**
> This feature of Azure Communication Services is currently in preview. Features in preview are publicly available and can be used by all new and existing Microsoft customers.
>
> Preview APIs and SDKs are provided without a service-level agreement. We recommend that you don't use them for production workloads. Certain features might not be supported or capabilities might be constrained.
>
> For more information, see [Supplemental Terms of Use for Microsoft Azure Previews](https://azure.microsoft.com/support/legal/preview-supplemental-terms/).


Raw screen sharing access is in public preview and available as part of version 1.15.1-beta.1+.

## Access raw screen sharing

Raw screen share media gives access specifically to the `MediaStream` object for incoming and outgoing screen share streams. For raw screen sharing, you can use that object to apply filters by using machine learning to process frames of the screen share.

Processed raw screen share frames can be sent as an outgoing screen share of the sender. Processed raw incoming screen share frames can be rendered on the receiver side.

> **Note:**
> Sending screenshare is only supported on desktop browser.

### Start screen sharing with a custom screen share stream

```js
const createVideoMediaStreamToSend = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1500;
    canvas.height = 845;
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const colors = ['red', 'yellow', 'green'];
    window.setInterval(() => {
        if (ctx) {
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            const x = Math.floor(Math.random() * canvas.width);
            const y = Math.floor(Math.random() * canvas.height);
            const size = 100;
            ctx.fillRect(x, y, size, size);
        }
    }, 1000 / 30);

    return canvas.captureStream(30);
};

...
const mediaStream = createVideoMediaStreamToSend();
const localScreenSharingStream = new LocalVideoStream(mediaStream);
// Will start screen sharing with custom raw media stream
await call.startScreenSharing(localScreenSharingStream);
console.log(localScreenSharingStream.mediaStreamType) // 'RawMedia'
```

### Access the raw screen share stream from a screen, browser tab, or app, and apply effects to the stream

The following example shows how to apply a black and white effect on the raw screen sharing stream from a screen, browser tab, or app.

> **Note:**
> The Canvas context `filter = "grayscale(1)"` isn't supported on Safari.

```js
let bwTimeout;
let bwVideoElem;

const applyBlackAndWhiteEffect = function (stream) {
	let width = 1280, height = 720;
	bwVideoElem = document.createElement("video");
	bwVideoElem.srcObject = stream;
	bwVideoElem.height = height;
	bwVideoElem.width = width;
	bwVideoElem.play();
	const canvas = document.createElement('canvas');
	const bwCtx = canvas.getContext('2d', { willReadFrequently: true });
	canvas.width = width;
	canvas.height = height;
	
	const FPS = 30;
	const processVideo = function () {
	    try {
		let begin = Date.now();
		// start processing.
		// NOTE: The Canvas context filter API is not supported in Safari
		bwCtx.filter = "grayscale(1)";
		bwCtx.drawImage(bwVideoElem, 0, 0, width, height);
		const imageData = bwCtx.getImageData(0, 0, width, height);
		bwCtx.putImageData(imageData, 0, 0);
		// schedule the next one.
		let delay = Math.abs(1000/FPS - (Date.now() - begin));
		bwTimeout = setTimeout(processVideo, delay);
	    } catch (err) {
		console.error(err);
	    }
	}
	
	// schedule the first one.
	bwTimeout = setTimeout(processVideo, 0);
	return canvas.captureStream(FPS);
}

// Call startScreenSharing API without passing any stream parameter. Browser will prompt the user to select the screen, browser tab, or app to share in the call.
await call.startScreenSharing();
const localScreenSharingStream = call.localVideoStreams.find( (stream) => { return stream.mediaStreamType === 'ScreenSharing' });
console.log(localScreenSharingStream.mediaStreamType); // 'ScreenSharing'
// Get the raw media stream from the screen, browser tab, or application
const rawMediaStream = await localScreenSharingStream.getMediaStream();
// Apply effects to the media stream as you wish
const blackAndWhiteMediaStream = applyBlackAndWhiteEffect(rawMediaStream);
// Set the media stream with effects no the local screen sharing stream
await localScreenSharingStream.setMediaStream(blackAndWhiteMediaStream);

// Stop screen sharing and clean up the black and white video filter
await call.stopScreenSharing();
clearTimeout(bwTimeout);
bwVideoElem.srcObject.getVideoTracks().forEach((track) => { track.stop(); });
bwVideoElem.srcObject = null;
```

### Stop sending screen share stream

Use the following code to stop sending a custom screen share stream if it was set during a call.

```js
// Stop sending raw screen sharing stream
await call.stopScreenSharing(localScreenSharingStream);
```

### Access incoming screen share stream from a remote participant

You can access the raw screen share stream from a remote participant. Use `MediaStream` for the incoming raw screen share stream to process frames by using machine learning and to apply filters. The processed incoming screen share stream can then be rendered on the receiver side.

```js
const remoteScreenSharingStream = remoteParticipants[0].videoStreams.find((stream) => { return stream.mediaStreamType === 'ScreenSharing'});
const processMediaStream = async () => {
    if (remoteScreenSharingStream.isAvailable) {
	// remote screen sharing stream is turned on, process the stream's raw media stream.
	const mediaStream = await remoteScreenSharingStream.getMediaStream();
    } else {
	// remote video stream is turned off, handle it
    }
};

remoteScreenSharingStream.on('isAvailableChanged', async () => {
    await processMediaStream();
});

await processMediaStream();
```



## Next steps

- [Check your network condition with the diagnostics tool](../../concepts/developer-tools/network-diagnostic.md).
- [Explore User-Facing Diagnostic APIs](../../concepts/voice-video-calling/user-facing-diagnostics.md).
- [Enable Media Quality Statistics in your application](../../concepts/voice-video-calling/media-quality-sdk.md).
- [Consume call logs with Azure Monitor](../../concepts/analytics/logs/voice-and-video-logs.md).

## Related articles

- Check out the [calling hero sample](../../samples/calling-hero-sample.md).
- Get started with the [UI Library](../../concepts/ui-library/ui-library-overview.md).
- Learn about [Calling SDK capabilities](getting-started-with-calling.md?pivots=platform-web).
- Learn more about [how calling works](../../concepts/voice-video-calling/about-call-types.md).
