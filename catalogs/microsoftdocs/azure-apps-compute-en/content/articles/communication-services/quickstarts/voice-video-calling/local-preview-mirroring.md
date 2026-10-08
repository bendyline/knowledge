---
title: Turn off local preview mirroring
titleSuffix: An Azure Communication Services article
description: This article describes how to turn off local preview mirroring.
author: yassirbisteni
manager: gaobob
ms.author: yassirb
ms.date: 6/26/2025
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: calling
ms.custom: mode-other, devx-track-js
zone_pivot_groups: acs-plat-windows-android-ios
---

# Local preview mirroring


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Meeting participants can now choose to stop mirroring their video preview—the small window showing how they appear during meetings.

This ability is especially useful for situations like:
<br/>✅ Virtual backgrounds with text – ensuring words appear correctly in your preview.
<br/>✅ Teaching and presenting – making it easier to align your view with what participants see, reducing distractions when writing on a whiteboard or sharing content.
 
## Frequently asked questions

### What is the default setting?

By default, your video is mirrored to you. This mirroring matches the familiar experience of front-facing smartphone cameras. However, you can easily toggle mirroring off when joining a meeting.

### Does lack of mirroring affect my outgoing video?

No, this setting only changes your personal view. Others always see your video as intended, regardless of whether mirroring is on or off.

### When it most useful to turn off mirroring?

This feature is helpful in:
- Gallery & Large Gallery views
- Preview videos
- PowerPoint content sharing & PowerPoint Live <br/>
  \* These views mirror your self-view, but others still see your actual video.

## Turn off local preview mirroring

**Applies to: platform-windows**


### Code to turn off local preview mirroring

````csharp
var uri = await localOutgoingVideoStream.StartPreviewAsync();
mediaPlayerElement.Source = MediaSource.CreateFromUri(uri);

var mediaPlayer = mediaPlayerElement.MediaPlayer;
var playbackSession = mediaPlayer.PlaybackSession;
playbackSession.IsMirroring = true;
````


**Applies to: platform-android**


### Code to turn off local preview mirroring

````java
VideoStreamRenderer renderer = new VideoStreamRenderer(localVideoStream, this);
VideoStreamRendererView view = renderer.createView(new CreateViewOptions(scalingMode));
view.setRotationY(view.getRotationY() + 180f);
````


**Applies to: platform-ios**


### Code to turn off local preview mirroring

````swift
var renderer = try VideoStreamRenderer(localVideoStream: localVideoStream)
var view = try renderer?.createView(withOptions: CreateViewOptions(scalingMode: scalingMode))
var view?.layer.transform = CATransform3DMakeAffineTransform(CGAffineTransformMakeScale(-1.0, 1.0))
````


## Next steps

- [Consume call logs with Azure Monitor](../../concepts/analytics/logs/voice-and-video-logs.md).

## Related articles

- Check out the [calling hero sample](../../samples/calling-hero-sample.md).
- Get started with the [UI Library](../../concepts/ui-library/ui-library-overview.md).
- Learn about [Calling SDK capabilities](getting-started-with-calling.md?pivots=platform-web).
- Learn more about [how calling works](../../concepts/voice-video-calling/about-call-types.md).
