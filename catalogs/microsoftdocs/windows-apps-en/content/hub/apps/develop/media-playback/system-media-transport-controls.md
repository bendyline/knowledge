---
description: The SystemMediaTransportControls class enables your app to use the system media transport controls that are built into Windows and to update the metadata that the controls display about the media your app is currently playing.
title: Manual control of the System Media Transport Controls
ms.date: 02/08/2017
ms.topic: article
keywords: windows 10, WinUI
ms.localizationpriority: medium
---

# Manual control of the System Media Transport Controls

WinUI apps that use the [**MediaPlayer**](https://learn.microsoft.com/uwp/api/Windows.Media.Playback.MediaPlayer) class to play media are automatically integrated with the System Media Transport Controls (SMTC) by default. This is the recommended way of interacting with the SMTC for most scenarios. For more information on customizing the SMTC's default integration with **MediaPlayer**, see [Integrate with the System Media Transport Controls](integrate-with-systemmediatransportcontrols.md).

There are a few scenarios where you may need to implement manual control of the SMTC. These include if you are using a [**MediaTimelineController**](https://learn.microsoft.com/uwp/api/Windows.Media.MediaTimelineController) to control playback of one or more media players. Or if you are using multiple media players and only want to have one instance of SMTC for your app.

## Set up transport controls

If you are using **MediaPlayer** to play media, you can get an instance of the [**SystemMediaTransportControls**](https://learn.microsoft.com/uwp/api/Windows.Media.SystemMediaTransportControls) class by accessing the [**MediaPlayer.SystemMediaTransportControls**](https://learn.microsoft.com/uwp/api/windows.media.playback.mediaplayer.systemmediatransportcontrols) property. If you are going to manually control the SMTC, you should disable the automatic integration provided by **MediaPlayer** by setting the [**CommandManager.IsEnabled**](https://learn.microsoft.com/uwp/api/windows.media.playback.mediaplaybackcommandmanager.isenabled) property to false.

> **Note:** 
> If you disable the [**MediaPlaybackCommandManager**](https://learn.microsoft.com/uwp/api/Windows.Media.Playback.MediaPlaybackCommandManager) of the [**MediaPlayer**](https://learn.microsoft.com/uwp/api/Windows.Media.Playback.MediaPlayer) by setting [**IsEnabled**](https://learn.microsoft.com/uwp/api/windows.media.playback.mediaplaybackcommandmanager.isenabled) to false, it will break the link between the **MediaPlayer** the [**TransportControls**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mediaplayerelement.transportcontrols) provided by the **MediaPlayerElement**, so the built-in transport controls will no longer automatically control the playback of the player. Instead, you must implement your own controls to control the **MediaPlayer**.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/smtc-winui/cs/SMTC-WinUI\\MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-playback/system-media-transport-controls.md)


l

Enable the buttons that your app will use by setting the corresponding "is enabled" property of the **SystemMediaTransportControls** object, such as [**IsPlayEnabled**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.isplayenabled), [**IsPauseEnabled**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.ispauseenabled), [**IsNextEnabled**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.isnextenabled), and [**IsPreviousEnabled**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.ispreviousenabled). See the **SystemMediaTransportControls** reference documentation for a complete list of available controls.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/smtc-winui/cs/SMTC-WinUI\\MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-playback/system-media-transport-controls.md)

Register a handler for the [**ButtonPressed**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.buttonpressed) event to receive notifications when the user presses a button.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/smtc-winui/cs/SMTC-WinUI\\MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-playback/system-media-transport-controls.md)

## Handle system media transport controls button presses

The [**ButtonPressed**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.buttonpressed) event is raised by the system transport controls when one of the enabled buttons is pressed. The [**Button**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrolsbuttonpressedeventargs.button) property of the [**SystemMediaTransportControlsButtonPressedEventArgs**](https://learn.microsoft.com/uwp/api/Windows.Media.SystemMediaTransportControlsButtonPressedEventArgs) passed into the event handler is a member of the [**SystemMediaTransportControlsButton**](https://learn.microsoft.com/uwp/api/Windows.Media.SystemMediaTransportControlsButton) enumeration that indicates which of the enabled buttons was pressed.

In order to update objects on the UI thread from the [**ButtonPressed**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.buttonpressed) event handler, such as a [**MediaPlayerElement**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.xaml.controls.mediaplayerelement) object, you must marshal the calls through the [**DispatcherQueue**](https://learn.microsoft.com/windows/windows-app-sdk/api/winrt/microsoft.ui.dispatching.dispatcherqueue.tryenqueue). This is because the **ButtonPressed** event handler is not called from the UI thread and therefore an exception will be thrown if you attempt to modify the UI directly.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/smtc-winui/cs/SMTC-WinUI\\MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-playback/system-media-transport-controls.md)

## Update the system media transport controls with the current media status

You should notify the [**SystemMediaTransportControls**](https://learn.microsoft.com/uwp/api/Windows.Media.SystemMediaTransportControls) when the state of the media has changed so that the system can update the controls to reflect the current state. To do this, set the [**PlaybackStatus**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.playbackstatus) property to the appropriate [**MediaPlaybackStatus**](https://learn.microsoft.com/uwp/api/Windows.Media.MediaPlaybackStatus) value from within the [**CurrentStateChanged**](https://learn.microsoft.com/uwp/api/windows.media.playback.mediaplayer.currentstatechanged) event of the [**MediaPlayer**](https://learn.microsoft.com/uwp/api/windows.media.playback.mediaplayer), which is raised when the media state changes.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/smtc-winui/cs/SMTC-WinUI\\MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-playback/system-media-transport-controls.md)

## Update the system media transport controls with media info and thumbnails

Use the [**SystemMediaTransportControlsDisplayUpdater**](https://learn.microsoft.com/uwp/api/Windows.Media.SystemMediaTransportControlsDisplayUpdater) class to update the media info that is displayed by the transport controls, such as the song title or the album art for the currently playing media item. Get an instance of this class with the [**SystemMediaTransportControls.DisplayUpdater**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.displayupdater) property. For typical scenarios, the recommended way to pass the metadata is to call [**CopyFromFileAsync**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrolsdisplayupdater.copyfromfileasync), passing in the currently playing media file. The display updater will automatically extract the metadata and thumbnail image from the file.

Call the [**Update**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrolsdisplayupdater.update) to cause the system media transport controls to update its UI with the new metadata and thumbnail.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/smtc-winui/cs/SMTC-WinUI\\MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-playback/system-media-transport-controls.md)

If your scenario requires it, you can update the metadata displayed by the system media transport controls manually by setting the values of the [**MusicProperties**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrolsdisplayupdater.musicproperties), [**ImageProperties**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrolsdisplayupdater.imageproperties), or [**VideoProperties**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrolsdisplayupdater.videoproperties) objects exposed by the [**DisplayUpdater**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.displayupdater) class.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/smtc-winui/cs/SMTC-WinUI\\MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-playback/system-media-transport-controls.md)

> **Note:**
> Apps should set a value for the [SystemMediaTransportControlsDisplayUpdater.Type](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrolsdisplayupdater.type#Windows_Media_SystemMediaTransportControlsDisplayUpdater_Type) property even if they aren't supplying other media metadata to be displayed by the System Media Transport Controls. 
This value helps the system handle your media content correctly, including preventing the screen saver from activating during playback.


## Update the system media transport controls timeline properties

The system transport controls display information about the timeline of the currently playing media item, including the current playback position, the start time, and the end time of the media item. To update the system transport controls timeline properties, create a new [**SystemMediaTransportControlsTimelineProperties**](https://learn.microsoft.com/uwp/api/Windows.Media.SystemMediaTransportControlsTimelineProperties) object. Set the properties of the object to reflect the current state of the playing media item. Call [**SystemMediaTransportControls.UpdateTimelineProperties**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.updatetimelineproperties) to cause the controls to update the timeline.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/smtc-winui/cs/SMTC-WinUI\\MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-playback/system-media-transport-controls.md)

-   You must provide a value for the [**StartTime**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrolstimelineproperties.starttime), [**EndTime**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrolstimelineproperties.endtime) and [**Position**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.playbackpositionchangerequested) in order for the system controls to display a timeline for your playing item.

-   [**MinSeekTime**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrolstimelineproperties.minseektime) and [**MaxSeekTime**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrolstimelineproperties.maxseektime) allow you to specify the range within the timeline that the user can seek. A typical scenario for this is to allow content providers to include advertisement breaks in their media.

    You must set [**MinSeekTime**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrolstimelineproperties.minseektime) and [**MaxSeekTime**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrolstimelineproperties.maxseektime) in order for the [**PositionChangeRequest**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.playbackpositionchangerequested) to be raised.

-   It is recommended that you keep the system controls in sync with your media playback by updating these properties approximately every 5 seconds during playback and again whenever the state of playback changes, such as pausing or seeking to a new position.

## Respond to player property changes

There is a set of system transport controls properties that relate to the current state of the media player itself, rather than the state of the playing media item. Each of these properties is matched with an event that is raised when the user adjusts the associated control. These properties and events include:

| Property | Event |
| --- | --- |
| [**AutoRepeatMode**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.autorepeatmode) | [**AutoRepeatModeChangeRequested**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.autorepeatmodechangerequested) |
| [**PlaybackRate**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.playbackrate) | [**PlaybackRateChangeRequested**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.playbackratechangerequested) |
| [**ShuffleEnabled**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.shuffleenabled) | [**ShuffleEnabledChangeRequested**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.shuffleenabledchangerequested) |

 
To handle user interaction with one of these controls, first register a handler for the associated event.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/smtc-winui/cs/SMTC-WinUI\\MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-playback/system-media-transport-controls.md)

In the handler for the event, first make sure that the requested value is within a valid and expected range. If it is, set the corresponding property on [**MediaPlayer**](https://learn.microsoft.com/uwp/api/windows.media.playback.mediaplayer) and then set the corresponding property on the [**SystemMediaTransportControls**](https://learn.microsoft.com/uwp/api/Windows.Media.SystemMediaTransportControls) object.

[Code reference unavailable in this source snapshot: ~/../snippets-windows/winappsdk/audio-video-camera/smtc-winui/cs/SMTC-WinUI\\MainWindow.xaml.cs](https://github.com/MicrosoftDocs/windows-dev-docs/blob/aabd22a9113af71e56bd6f5af8fde06df68162e0/hub/apps/develop/media-playback/system-media-transport-controls.md)

-   In order for one of these player property events to be raised, you must set an initial value for the property. For example, [**PlaybackRateChangeRequested**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.playbackratechangerequested) will not be raised until after you have set a value for the [**PlaybackRate**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.playbackrate) property at least one time.

## Use the system media transport controls for background audio

If you are not using the automatic SMTC integration provided by **MediaPlayer** you must manually integrate with the SMTC to enable background audio. At a minimum, your app must enable the play and pause buttons by setting [**IsPlayEnabled**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.isplayenabled) and [**IsPauseEnabled**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.ispauseenabled) to true. Your app must also handle the [**ButtonPressed**](https://learn.microsoft.com/uwp/api/windows.media.systemmediatransportcontrols.buttonpressed) event. If your app does not meet these requirements, audio playback will stop when your app moves to the background.



## Related topics

* [Media playback](media-playback.md)
* [Integrate with the System Media Transport Controls](integrate-with-systemmediatransportcontrols.md) 
* [System Media Transport sample](https://github.com/Microsoft/Windows-universal-samples/tree/dev/Samples/SystemMediaTransportControls)
