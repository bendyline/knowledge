---
description: The APIs in the Windows.Media.Editing namespace allow you to quickly develop apps that enable users to create media compositions from audio and video source files.
title: Media compositions and editing
ms.date: 05/13/2026
ms.topic: how-to
dev_langs:
- csharp
keywords: windows, winui, media composition, editing, video
ms.localizationpriority: medium
---

# Media compositions and editing

This article shows you how to use the APIs in the [**Windows.Media.Editing**](https://learn.microsoft.com/uwp/api/Windows.Media.Editing) namespace to quickly develop apps that enable users to create media compositions from audio and video source files. Features of the framework include the ability to programmatically append multiple video clips together, add video and image overlays, add background audio, and apply both audio and video effects. Once created, media compositions can be rendered into a flat media file for playback or sharing, but compositions can also be serialized to and deserialized from disk, allowing the user to load and modify compositions that they have previously created. All of this functionality is provided in an easy-to-use Windows Runtime interface that dramatically reduces the amount and complexity of code required to perform these tasks when compared to the low-level [Microsoft Media Foundation](https://learn.microsoft.com/windows/desktop/medfound/microsoft-media-foundation-sdk) API.

## Create a new media composition

The [**MediaComposition**](https://learn.microsoft.com/uwp/api/Windows.Media.Editing.MediaComposition) class is the container for all of the media clips that make up the composition and is responsible for rendering the final composition, loading and saving compositions to disk, and providing a preview stream of the composition so that the user can view it in the UI. To use **MediaComposition** in your app, include the [**Windows.Media.Editing**](https://learn.microsoft.com/uwp/api/Windows.Media.Editing) namespace as well as the [**Windows.Media.Core**](https://learn.microsoft.com/uwp/api/Windows.Media.Core) namespace that provides related APIs that you will need.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/media-editing-winui/cs/MediaEditingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/media-compositions-and-editing.md)

The **MediaComposition** object will be accessed from multiple points in your code, so typically you will declare a member variable in which to store it.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/media-editing-winui/cs/MediaEditingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/media-compositions-and-editing.md)

The constructor for **MediaComposition** takes no arguments.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/media-editing-winui/cs/MediaEditingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/media-compositions-and-editing.md)

## Add media clips to a composition

Media compositions typically contain one or more video clips. You can use a [**FileOpenPicker**](https://learn.microsoft.com/uwp/api/Windows.Storage.Pickers.FileOpenPicker) to allow the user to select a video file. Once the file has been selected, create a new [**MediaClip**](https://learn.microsoft.com/uwp/api/Windows.Media.Editing.MediaClip) object to contain the video clip by calling [**MediaClip.CreateFromFileAsync**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediaclip.createfromfileasync). Then you add the clip to the **MediaComposition** object's [**Clips**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediacomposition.clips) list.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/media-editing-winui/cs/MediaEditingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/media-compositions-and-editing.md)

- Media clips appear in the **MediaComposition** in the same order as they appear in [**Clips**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediacomposition.clips) list.

- A **MediaClip** can only be included in a composition once. Attempting to add a **MediaClip** that is already being used by the composition will result in an error. To reuse a video clip multiple times in a composition, call [**Clone**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediaclip.clone) to create new **MediaClip** objects which can then be added to the composition.

- A **MediaComposition** supports video clips in MP4 format.

- If a video file contains multiple embedded audio tracks, you can select which audio track is used in the composition by setting the [**SelectedEmbeddedAudioTrackIndex**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediaclip.selectedembeddedaudiotrackindex) property.

- Create a **MediaClip** with a single color filling the entire frame by calling [**CreateFromColor**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediaclip.createfromcolor) and specifying a color and a duration for the clip.

- Create a **MediaClip** from an image file by calling [**CreateFromImageFileAsync**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediaclip.createfromimagefileasync) and specifying an image file and a duration for the clip.

- Create a **MediaClip** from an [**IDirect3DSurface**](https://learn.microsoft.com/uwp/api/Windows.Graphics.DirectX.Direct3D11.IDirect3DSurface) by calling [**CreateFromSurface**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediaclip.createfromsurface) and specifying a surface and a duration from the clip.

## Preview the composition in a MediaPlayerElement

To enable the user to view the media composition, add a [**MediaPlayerElement**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mediaplayerelement) to the XAML file that defines your UI.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/media-editing-winui/cs/MediaEditingWinUI/MainWindow.xaml](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/media-compositions-and-editing.md)

Declare a member variable of type [**MediaStreamSource**](https://learn.microsoft.com/uwp/api/Windows.Media.Core.MediaStreamSource).

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/media-editing-winui/cs/MediaEditingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/media-compositions-and-editing.md)

Call the **MediaComposition** object's [**GeneratePreviewMediaStreamSource**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediacomposition.generatepreviewmediastreamsource) method to create a **MediaStreamSource** for the composition. Create a [**MediaSource**](https://learn.microsoft.com/uwp/api/Windows.Media.Core.MediaSource) object by calling the factory method [**CreateFromMediaStreamSource**](https://learn.microsoft.com/uwp/api/windows.media.core.mediasource.createfrommediastreamsource) and assign it to the [**Source**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mediaplayerelement.source) property of the **MediaPlayerElement**. Now the composition can be viewed in the UI.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/media-editing-winui/cs/MediaEditingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/media-compositions-and-editing.md)

- The **MediaComposition** must contain at least one media clip before calling [**GeneratePreviewMediaStreamSource**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediacomposition.generatepreviewmediastreamsource), or the returned object will be null.

- The **MediaPlayerElement** timeline is not automatically updated to reflect changes in the composition. It's recommended that you call both **GeneratePreviewMediaStreamSource** and set the **MediaPlayerElement** **Source** property every time you make a set of changes to the composition and want to update the UI.

It's recommended that you set the **MediaStreamSource** object and the **Source** property of the **MediaPlayerElement** to null when the window is closed in order to release associated resources.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/media-editing-winui/cs/MediaEditingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/media-compositions-and-editing.md)

## Render the composition to a video file

To render a media composition to a flat video file so that it can be shared and viewed on other devices, you will need to use APIs from the [**Windows.Media.Transcoding**](https://learn.microsoft.com/uwp/api/Windows.Media.Transcoding) namespace.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/media-editing-winui/cs/MediaEditingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/media-compositions-and-editing.md)

After allowing the user to select an output file with a [**FileSavePicker**](https://learn.microsoft.com/uwp/api/Windows.Storage.Pickers.FileSavePicker), render the composition to the selected file by calling the **MediaComposition** object's [**RenderToFileAsync**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediacomposition.rendertofileasync). The rest of the code in the following example simply follows the pattern of handling an [**AsyncOperationWithProgress**](https://learn.microsoft.com/previous-versions/br205807\(v=vs.85\)).

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/media-editing-winui/cs/MediaEditingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/media-compositions-and-editing.md)

- The [**MediaTrimmingPreference**](https://learn.microsoft.com/uwp/api/Windows.Media.Editing.MediaTrimmingPreference) allows you to prioritize speed of the transcoding operation versus the precision of trimming of adjacent media clips. **Fast** causes transcoding to be faster with lower-precision trimming, **Precise** causes transcoding to be slower but with more precise trimming.

## Trim a video clip

Trim the duration of a video clip in a composition by setting the [**MediaClip**](https://learn.microsoft.com/uwp/api/Windows.Media.Editing.MediaClip) objects [**TrimTimeFromStart**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediaclip.trimtimefromstart) property, the [**TrimTimeFromEnd**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediaclip.trimtimefromend) property, or both.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/media-editing-winui/cs/MediaEditingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/media-compositions-and-editing.md)

- You can use any UI that you want to let the user specify the start and end trim values. The example above uses the [**Position**](https://learn.microsoft.com/uwp/api/windows.media.playback.mediaplaybacksession.position) property of the [**MediaPlaybackSession**](https://learn.microsoft.com/uwp/api/Windows.Media.Playback.MediaPlaybackSession) associated with the **MediaPlayerElement** to first determine which **MediaClip** is playing back at the current position in the composition by checking the [**StartTimeInComposition**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediaclip.starttimeincomposition) and [**EndTimeInComposition**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediaclip.endtimeincomposition). Then the **Position** and **StartTimeInComposition** properties are used again to calculate the amount of time to trim from the beginning of the clip. The **FirstOrDefault** method is an extension method from the **System.Linq** namespace that simplifies the code for selecting items from a list.
- The [**OriginalDuration**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediaclip.originalduration) property of the **MediaClip** object lets you know the duration of the media clip without any clipping applied.
- The [**TrimmedDuration**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediaclip.trimmedduration) property lets you know the duration of the media clip after trimming is applied.
- Specifying a trimming value that is larger than the original duration of the clip does not throw an error. However, if a composition contains only a single clip and that is trimmed to zero length by specifying a large trimming value, a subsequent call to [**GeneratePreviewMediaStreamSource**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediacomposition.generatepreviewmediastreamsource) will return null, as if the composition has no clips.

## Add a background audio track to a composition

To add a background track to a composition, load an audio file and then create a [**BackgroundAudioTrack**](https://learn.microsoft.com/uwp/api/Windows.Media.Editing.BackgroundAudioTrack) object by calling the factory method [**BackgroundAudioTrack.CreateFromFileAsync**](https://learn.microsoft.com/uwp/api/windows.media.editing.backgroundaudiotrack.createfromfileasync). Then, add the **BackgroundAudioTrack** to the composition's [**BackgroundAudioTracks**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediacomposition.backgroundaudiotracks) property.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/media-editing-winui/cs/MediaEditingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/media-compositions-and-editing.md)

- A **MediaComposition** supports background audio tracks in the following formats: MP3, WAV, FLAC

- A background audio track

- As with **MediaClip**, a **BackgroundAudioTrack** can only be included in a composition once. Attempting to add a **BackgroundAudioTrack** that is already being used by the composition will result in an error. To reuse an audio track multiple times in a composition, call [**Clone**](https://learn.microsoft.com/uwp/api/windows.media.editing.backgroundaudiotrack.clone) to create new **BackgroundAudioTrack** objects which can then be added to the composition.

- By default, background audio tracks begin playing at the start of the composition. If multiple background tracks are present, all of the tracks will begin playing at the start of the composition. To cause a background audio track to begin playback at another time, set the [**Delay**](https://learn.microsoft.com/uwp/api/windows.media.editing.backgroundaudiotrack.delay) property to the desired time offset.

## Add an overlay to a composition

Overlays allow you to stack multiple layers of video on top of each other in a composition. A composition can contain multiple overlay layers, each of which can include multiple overlays. Create a [**MediaOverlay**](https://learn.microsoft.com/uwp/api/Windows.Media.Editing.MediaOverlay) object by passing a **MediaClip** into its constructor. Set the position and opacity of the overlay, then create a new [**MediaOverlayLayer**](https://learn.microsoft.com/uwp/api/Windows.Media.Editing.MediaOverlayLayer) and add the **MediaOverlay** to its [**Overlays**](https://learn.microsoft.com/windows/desktop/api/dxgi1_3/nf-dxgi1_3-idxgioutput2-supportsoverlays) list. Finally, add the **MediaOverlayLayer** to the composition's [**OverlayLayers**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediacomposition.overlaylayers) list.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/media-editing-winui/cs/MediaEditingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/media-compositions-and-editing.md)

- Overlays within a layer are z-ordered based on their order in their containing layer's **Overlays** list. Higher indices within the list are rendered on top of lower indices. The same is true of overlay layers within a composition. A layer with higher index in the composition's **OverlayLayers** list will be rendered on top of lower indices.

- Because overlays are stacked on top of each other instead of being played sequentially, all overlays start playback at the beginning of the composition by default. To cause an overlay to begin playback at another time, set the [**Delay**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediaoverlay.delay) property to the desired time offset.

## Add effects to a media clip

Each **MediaClip** in a composition has a list of audio and video effects to which multiple effects can be added. The effects must implement [**IAudioEffectDefinition**](https://learn.microsoft.com/uwp/api/Windows.Media.Effects.IAudioEffectDefinition) and [**IVideoEffectDefinition**](https://learn.microsoft.com/uwp/api/Windows.Media.Effects.IVideoEffectDefinition) respectively. The following example uses the current **MediaPlayerElement** position to choose the currently viewed **MediaClip** and then creates a new instance of the [**VideoStabilizationEffectDefinition**](https://learn.microsoft.com/uwp/api/Windows.Media.Core.VideoStabilizationEffectDefinition) and appends it to the media clip's [**VideoEffectDefinitions**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediaclip.videoeffectdefinitions) list.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/media-editing-winui/cs/MediaEditingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/media-compositions-and-editing.md)

## Save a composition to a file

Media compositions can be serialized to a file to be modified at a later time. Pick an output file and then call the [**MediaComposition**](https://learn.microsoft.com/uwp/api/Windows.Media.Editing.MediaComposition) method [**SaveAsync**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediacomposition.saveasync) to save the composition.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/media-editing-winui/cs/MediaEditingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/media-compositions-and-editing.md)

## Load a composition from a file

Media compositions can be deserialized from a file to allow the user to view and modify the composition. Pick a composition file and then call the [**MediaComposition**](https://learn.microsoft.com/uwp/api/Windows.Media.Editing.MediaComposition) method [**LoadAsync**](https://learn.microsoft.com/uwp/api/windows.media.editing.mediacomposition.loadasync) to load the composition.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/media-editing-winui/cs/MediaEditingWinUI/MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-authoring-processing/media-compositions-and-editing.md)

- If a media file in the composition is not in a location that can be accessed by your app, an error will be thrown when loading the composition.

## See also

- [Windows.Media.Editing namespace](https://learn.microsoft.com/uwp/api/windows.media.editing)
