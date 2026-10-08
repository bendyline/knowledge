---
title: Azure Communication Services - known issues for WebJS calling
description: Learn more about Azure Communication Services known issues
author: sloanster
manager: chpalm
services: azure-communication-services

ms.author: micahvivion
ms.date: 02/24/2024
ms.topic: troubleshooting-known-issue
ms.service: azure-communication-services
ms.custom:
zone_pivot_groups: acs-web-safari-chrome-firefox-known-issues
---

# Known issues in  Azure Communication Services calling WebJS SDKs


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**

This article provides known issues related to using the  Azure Communication Services WebJS calling SDK.

**Applies to: all-browsers**


## All Desktop browsers


### It isn't possible to render multiple previews from multiple devices on web
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** It isn't possible to render multiple previews from multiple devices on web. This issue is a known limitation.<br>
**Known issue reference:** For more information, see [Calling SDK overview](calling-sdk-features.md).<br>
  

### Repeatedly switching video devices might cause video streaming to stop temporarily
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** Switching between video devices might cause your video stream to pause while the stream is acquired from the selected device. Switching between devices frequently can cause performance degradation.<br>
**Recommended workaround:** Developers should ensure to stop the stream from one device before starting another to mitigate performance degradation when switching between video devices.<br>

### Video signal problem when the call is in connecting state
**Browser version:** All. <br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:**  If a user turns video on and off quickly while the call is in the *Connecting* state, this action might lead to a problem with the stream acquired for the call. It's best for developers to build their apps in a way that doesn't require video to be turned on and off while the call is in the *Connecting* state. Degraded video performance might occur in the following scenarios:
- If the user starts with audio, and then starts and stops video, while the call is in the *Connecting* state.
- If the user starts with audio, and then starts and stops video, while the call is in the *Lobby* state.
<br>

### Delay in rendering remote participant videos
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** During an ongoing group call, suppose that *User A* sends video, and then *User B* joins the call. Sometimes, User B doesn't see video from User A, or User A's video begins rendering after a long delay. A network environment configuration problem might cause this delay.<br>
**Known issue reference:** For more information [Network recommendations](network-requirements.md).<br>

### Excessive use of certain APIs like mute/unmute results in throttling on Azure Communication Services infrastructure
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** As a result of the mute/unmute API call, Azure Communication Services infrastructure informs other participants in the call about the state of audio of a local participant who invoked mute/unmute, so that participants in the call know who is muted/unmuted.
    
Excessive use of mute/unmute is blocked in Azure Communication Services infrastructure. Throttling happens if the participant (or application on behalf of participant) attempts to mute/unmute continuously, every second, more than 15 times in a 30-second rolling window.
<br>

### Siri activation during WebRTC call doesn't automatically mute microphone on macOS
**Operating system:** macOS.<br>
**Browsers:** All browsers and versions.<br>
**Azure Communication Services calling SDK version:** All.<br>
**Description:** WebRTC call isn't automatically muted when a user starts talking with Siri in the middle of the call. During such instances, other participants can hear either the user giving commands to Siri or both the given command and Siri's response.<br>
**Known issue reference:** This is a known issue on [macOS](https://bugs.webkit.org/show_bug.cgi?id=247897).<br>
**Recommended workaround:** Currently, no workaround is available. Users need to manually mute their microphone when activating Siri during a call.<br>

### Overlapping audio in ACS WebJS call and FaceTime calls on macOS
**Operating system:** macOS.<br>
**Browsers:** All browsers and versions.<br>
**Azure Communication Services calling SDK version:** All.<br>
**Description:** When a macOS user engaged in a ACS WebJS call call receives a FaceTime call and accepts it, audio from both the ACS WebJS call and FaceTime calls is transmitted and received simultaneously. This results in overlapping audio streams where the user can hear and be heard on both calls at the same time.<br>
**Known issue reference:** This is a known issue on [macOS](https://bugs.webkit.org/show_bug.cgi?id=255986).<br>
**Recommended workaround:** Currently, no workaround is available. Users can proactively mute their microphone in the WebRTC call or exit the WebRTC call before taking the FaceTime call.<br>



## All mobile browsers


### It isn't possible to render multiple previews from multiple devices on web
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** It isn't possible to render multiple previews from multiple devices on web. This issue is a known limitation.<br>
**Known issue reference:** For more information, see [Calling SDK overview](calling-sdk-features.md).<br>

### Repeatedly switching video devices might cause video streaming to stop temporarily
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** Switching between video devices might cause your video stream to pause while the stream is acquired from the selected device. Switching between devices frequently can cause performance degradation.<br>
**Recommended workaround:** Developers should ensure to stop the stream from one device before starting another to mitigate performance degradation when switching between video devices.<br>

### Video signal problem when the call is in connecting state
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:**  If a user turns video on and off quickly while the call is in the *Connecting* state, this action might lead to a problem with the stream acquired for the call. It's best for developers to build their apps in a way that doesn't require video to be turned on and off while the call is in the *Connecting* state. Degraded video performance might occur in the following scenarios:
  - If the user starts with audio, and then starts and stops video, while the call is in the *Connecting* state.
  - If the user starts with audio, and then starts and stops video, while the call is in the *Lobby* state.
  

 ### Delay in rendering remote participant videos
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** During an ongoing group call, suppose that *User A* sends video, and then *User B* joins the call. Sometimes, User B doesn't see video from User A, or User A's video begins rendering after a long delay. A network environment configuration problem might cause this delay.<br>
**Known issue reference:** For more information [Network recommendations](network-requirements.md). <br>

 ### Excessive use of certain APIs like mute/unmute results in throttling on Azure Communication Services infrastructure
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All<br>
**Description:** As a result of the mute/unmute API call, Azure Communication Services infrastructure informs other participants in the call about the state of audio of a local participant who invoked mute/unmute, so that participants in the call know who is muted/unmuted.<br>
   
Excessive use of mute/unmute is blocked in Azure Communication Services infrastructure. Throttling happens if the participant (or application on behalf of participant) attempts to mute/unmute continuously, every second, more than 15 times in a 30-second rolling window.
    
### Refreshing a page doesn't immediately remove the user from their call
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** If a user is in a call and decides to refresh the page, the Communication Services media service doesn't remove this user immediately from the call. It waits for the user to rejoin. The user is removed from the call after the media service times out.
  
  If a user is in a call and decides to refresh the page, the Communication Services media service doesn't remove this user immediately from the call. It waits for the user to rejoin. The user is removed from the call after the media service times out.

  It's best to build user experiences that don't require end users to refresh the page of your application while in a call. If a user refreshes the page, reuse the same Communication Services user ID after that user returns back to the application. By rejoining with the same user ID, the user is represented as the same, existing object in the `remoteParticipants` collection. From the perspective of other participants in the call, the user remains in the call during the time it takes to refresh the page, up to a minute or two.
   
  If the user was sending video before refreshing, the `videoStreams` collection keeps the previous stream information until the service times out and removes it. In this scenario, the application might decide to observe any new streams added to the collection, and render one with the highest `id`.



**Applies to: safari-browser**


## Safari Desktop
___

### On macOS Safari 18 and up, the user is unable to share the screen for ~1 minute after canceling the action in a call. During this time, some of the options do not work while screen share recovers

**Browser version:** Safari 18 and up. <br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** After canceling a screen sharing attempt, the user is unable to start sharing the screen again for approximately 1 minute. During this period, some options become unresponsive, such as the ability to turn the camera on/off. After ~1 minute, the user is able to start screen sharing and use all available options in the call again.<br>
**Known issue reference:** This regression is a known issue introduced on [Safari](https://bugs.webkit.org/show_bug.cgi?id=278915).<br>
**Recommended workaround:**  It is recommended to avoid using the “Cancel” option during screen sharing to prevent delays in restarting screen sharing. If sharing needs to be stopped, it’s advised to either complete the sharing action or wait for the recovery time before trying again.<br>

### On macOS Safari 17 and up, audio could become broken if macOS users connects Bluetooth headphones for during a call

**Browser version:** Safari 17 and up. <br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** When macOS users connect Bluetooth headphones to a MacBook during a call using Safari, they can experience issues with audio. In both use cases where users connect Bluetooth headphones before or during the call, the incoming and outgoing audio could become unavailable or broken. It is noted that waiting at least 30 seconds might resolve incoming audio issue, but outgoing audio often fails to recover automatically.<br>
**Known issue reference:** This regression is a known issue introduced on [Safari](https://bugs.webkit.org/show_bug.cgi?id=259777).<br>
**Recommended workaround:** As a temporary solution, users may need to reconnect their Bluetooth device or refresh the call to attempt audio recovery. Upgrading to the latest version of macOS and Safari might also help, as it could include potential fixes for such issues.<br>

### On macOS Safari 17 and up, video background effects might cause video flashing, both in local preview and on the remote side

**Browser version:** Safari 17 and up. <br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** A bug was found in one of the updates of the macOS Safari 17 that is causing our background effects implementation frame capture to skip frames and hence might cause video flashing both in the local preview and the remote side.<br>
- A fix is available starting from Safari version 17.5 (macOS Sonoma 14.5).<br>

**Recommended workaround:** Users are advised to update to the latest macOS and Safari version (at least v17.5) where this issue has been resolved.<br>

### Incoming and outgoing video blinking issue on macOS Sonoma with Safari versions up to 17.1

**Browser version:** Safari v17.0, v17.1 (macOS Sonoma 14).<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** Users on macOS Sonoma 14.0 experience a video blinking issue in Safari versions 17.0 and 17.1 when joining a call with video turned on. The incoming video blinks when a Safari user joins a call, affecting what is received from other call participants. Additionally, the outgoing video from the Safari user blinks for remote participants already in the call. This issue disrupts the visual quality of the call.
- A fix is available starting from Safari version 17.2.<br>

**Recommended workaround:** Users are advised to update to the latest macOS and Safari version (at least v17.2) where this issue has been resolved.


### Other call participant unable to start screen share concurrently with macOS Safari user in Azure Communication Services 1:1 video calls
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** In Azure Communication Services 1:1 video calls, when a macOS Safari user shares their screen, another participant using a different browser cannot start screen sharing until the first participant stops their screen share. This limitation is observed across various combinations of browsers and operating systems but is specific to 1:1 calls. The issue does not occur in calls where both participants are using Safari on macOS.<br>
**Known issue reference:** This regression is a known issue introduced on [Safari](https://bugs.webkit.org/show_bug.cgi?id=262791).<br>
**Recommended workaround:** A temporary workaround is to ensure that only one participant shares their screen at a time in Azure Communication Services 1:1 video calls, when one of the participants is using macOS Safari.<br>

### Screen sharing does not work on macOS Ventura with Safari versions up to 16.3
**Browser version:** Safari v16.1, v16.2, v16.3 (macOS Ventura 13.0).<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** The issue was introduced in macOS Ventura 13.0 when using the Safari browser (v16.1, v16.2, and v16.3), and a fix has been available starting from Safari version 16.4.<br>
**Known issue reference:** This regression is a known issue introduced on [Safari](https://bugs.webkit.org/show_bug.cgi?id=247883).<br>
**Recommended workaround:** Users are advised to update to the latest macOS and Safari version (at least v16.4) where this issue has been resolved.<br>

### Web calling participants hearing PSTN call audio when answered on macOS with iPhone integration
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** When a macOS user, who is in an active ACS call using a browser, accepts an incoming PSTN call on their MacBook that is linked to their iPhone (using the same iCloud account), audio from the PSTN call is shared among web call participants. This results in participants of the call hearing the PSTN call audio.<br>
**Known issue reference:** This is a known issue on [macOS](https://bugs.webkit.org/show_bug.cgi?id=256593).<br>
**Recommended workaround:** Currently, no direct workaround is available. Users are advised to use separate devices for PSTN and web calls to prevent that audio shared with other call participants in a separate call.<br>


## Safari iOS Mobile
___

### Video recovery issues on iOS 17+ when an iOS user receives incoming PSTN or Third-party app call or enables Siri during a ACS web based call
**iOS version:** iOS versions 17 and up.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** When an iOS user in a web call and receives and either declines or accepts a PSTN/Third-party app call, the user will encounter video issues. The incoming video can appear frozen or no incoming video might be displayed.This will require a user re-enabling of the camera. The video preview and the outgoing video similarly fails to recover unless the user reactivates their camera.

### Video issues on iOS 17+ when an iOS user tries to use Siri during a call
**iOS version:** iOS versions 17 and up.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:**  When an iOS user tries to enable Siri in the middle of the web mobile call can cause the the incoming video could become frozen and take a few seconds to recovers.<br>

### Camera preview resolution issue in web calls when using iOS 16.3 to 17.3.1
**iOS version:** iOS versions from 16.3 up to 17.3.1.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** Users may experience an issue where the camera preview is shown in an incorrect resolution and appears cropped when iOS user joins a call using iOS Safari mobile  with the camera enabled. The issue is not observed anymore if user re-enables camera during the call. The issue has been fixed with iOS 17.4+.<br>
**Recommended workaround:** Users are advised to update to the latest iOS and Safari version (at least iOS 17.4) where this issue has been resolved.<br>

### Telemetry data for *audioInputLevel* and *frameRateInput* missing in video calls on iOS 16 to iOS 17.4
**iOS version:** iOS versions from 16.0 up to 17.4.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** `audioInputLevel` and `frameRateInput` telemetry data are not captured during video calls on iOS versions 16 to 17.4, affecting the ability to monitor and optimize audio and video settings in real-time. This issue has been fixed with iOS 17.5+.<br>
**Recommended workaround:** Users are advised to update to the latest iOS and Safari version (at least iOS 17.5) where this issue has been resolved.<br>

### Audio and video recovery issue on iOS 16 to 16.3.1 during web calls with incoming Third-party or PSTN calls
**iOS version:** iOS versions 16 up to 16.3.1.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** When an iOS user in on a web call and receives a PSTN/Third-party app call,the incoming and outgoing audio and outgoing video do not automatically recover call after the phone call ends. The iOS User has to unmute the call on web again. The end usermust to disable and enable back the "Microphone" button to be able get audio and video.<br>
**Known issue reference:** Related WebKit bug [here](https://bugs.webkit.org/show_bug.cgi?id=247818).<br>
**Recommended workaround:** Users are advised to update to the latest iOS and Safari version (at least iOS 16.4) where this issue has been resolved.<br>

### iOS 16 introduced bugs when putting browser in the background during a call
**iOS version:** iOS versions 16 to 16.1.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** The iOS 16 release introduced a bug that can stop the Azure Communication Services audio\video call when using Safari mobile browser. The impact could be that an Azure Communication Services call might stop working during a call and the only resolution to get it working again is to have the end customer restart their phone. 
To reproduce this bug: 
- Have a user using an iPhone running iOS 16.
- Join Azure Communication Services call (with audio only or with audio and video) using Safari iOS mobile browser.
If during a call someone puts the Safari browser in the background and views YouTube OR receives a FaceTime\phone call while connected via a Bluetooth device
Results:
- After a few minutes of this situation, the incoming and outgoing video may stop working.
- The only way to get Azure Communication Services calling to work again is to have the end user restart their phone.
Bug was fixed with iOS 16.2.<br>

**Known issue reference:** Related WebKit bugs [here](https://bugs.webkit.org/show_bug.cgi?id=243982) and [here](https://bugs.webkit.org/show_bug.cgi?id=244505).<br>
**Recommended workaround:** Consider updating to the latest iOS version.<br>
  
### Video and audio issues on iPhone X, occurring to the user being in a call for more than 30 minutes with the camera turned on
**Devices affected:** iPhone X (iOS 16.7.x).<br>
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** During Azure Communication Service calls on iPhone X with iOS 16.7.x, users experience the disappearance of both their local video preview and incoming video after more than 30 minutes of being in a call with video enabled, which may appear blank or empty to the user. For other users, the video from the iPhone X user appears frozen at the moment it is lost on the iPhone X device. Along with the disappearance of the video, a pronounced echo can occur. The video restores when the iPhone X user turns the camera off and then on again.
- This issue has been observed only on the iPhone X device with iOS versions 16.7.5 and 16.7.7.<br>

### Bluetooth headset microphone isn't detected or audible during the call on Safari on iOS
**iOS version:** All<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** Bluetooth headsets aren't supported by Safari on iOS. Your Bluetooth device isn't listed in available microphone options, and other participants aren't able to hear you if you try using Bluetooth over Safari. This regression is a known operating system limitation. With Safari on macOS and iOS/iPadOS, it isn't possible to enumerate or select speaker devices through Communication Services device manager. This is because Safari doesn't support the enumeration or selection of speakers.<br>
**Recommended workaround:** In this scenario, use the operating system to update your device selection.<br>

### Using third-party libraries during the call might result in audio loss

**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** If you use `getUserMedia` separately inside the application, the audio stream is lost. Audio stream is lost because a third-party library takes over device access from the Azure Communication Services library.
  - Don't use third-party libraries that are using the  `getUserMedia` API internally during the call.
  - If you still need to use a third-party library, the only way to recover the audio stream is to change the selected device (if the user has more than one), or to restart the call.
 The cause of this problem might be that acquiring your own stream from the same device has a side effect of running into race conditions. Acquiring streams from other devices might lead the user into insufficient USB/IO bandwidth, and the `sourceUnavailableError` rate skyrockets. 
  

### Enumerating or accessing devices for Safari on iOS
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** In certain environments, you might notice that device permissions are reset after some period of time. On macOS and iOS, Safari doesn't keep permissions for a long time unless there's a stream acquired. The simplest way to work around this limitation is to call the `DeviceManager.askDevicePermission()` API, before calling the device manager's device enumeration APIs. These enumeration APIs include `DeviceManager.getCameras()`, `DeviceManager.getSpeakers()`, and `DeviceManager.getMicrophones()`. If the permissions are there, the user doesn't see anything. If the permissions aren't there, the user is prompted for the permissions again.<br>

### Local microphone/camera mutes when certain interruptions occur on iOS Safari
**Description:** This problem can occur if another application or the operating system takes over the control of the microphone or camera. Here are a few examples that might happen while a user is in the call:
  - An incoming call arrives via PSTN (Public Switched Telephone Network), and it captures the microphone device access.
  - A user plays a YouTube video, for example, or starts a FaceTime call. Switching to another native application can capture access to the microphone or camera.
  - A user enables Siri, which captures access to the microphone.

On iOS, for example, while on an Azure Communication Services call, if a PSTN call comes in, then a microphoneMutedUnexepectedly bad UFD is raised and audio stops flowing in the Azure Communication Services call and the call is marked as muted. Once the PSTN call is over, the user has to unmute the Azure Communication Services call for audio to start flowing again in the Azure Communication Services call.

In case camera is on and an interruption occurs, Azure Communication Services call may or may not lose the camera. If lost then camera is marked as off and user has to go turn it back on after the interruption  released the camera.

Occasionally, microphone or camera devices aren't released on time, and that can cause issues with the original call. For example, if the user tries to unmute while watching a YouTube video, or if a PSTN call is active simultaneously.

- Incoming video streams don't stop rendering if the user is on iOS 15.2+ and is using SDK version 1.4.1-beta.1+, the unmute/start video steps are still required to restart outgoing audio and video.
- For iOS 15.4+, audio and video should be able to auto recover on most of the cases. On some edge cases, to unmute, application must call an API to 'unmute' (can be as a result of user action) to recover the outgoing audio.

### iOS Safari refreshes the page if the user goes to another app and returns back to the browser

**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** The problem can occur if a user in an Azure Communication Services call with iOS Safari, and switches to other app for a while. After the user returns back to the browser, the browser page may refresh. This is because OS kills the browser. One way to mitigate this issue is to keep some states and recover after page refreshes.<br>

### A mobile iOS user has dropped the call but is still showing up on the participant list

**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** The problem can occur if a mobile user leaves the Azure Communication Services group call without using the Call.hangUp() API. When a mobile user closes the browser or refreshes the webpage without hang up, other participants in the group call can still see this mobile user on the participant list for about 60 seconds.<br>

### Safari freezing issue on iOS 15
**Browser version:** iOS versions 15 to 15.1.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** Users may experience Safari freezing when navigating to YouTube, enabling Siri, receiving incoming PSTN calls, or during other interruption scenarios while in a web call. This is a known issue introduced with iOS 15 and observed in iOS versions 15.0, 15.0.2, and 15.1.
- It has been fixed with iOS 15.2+.<br>

**Known issue reference:** Related WebKit bugs [here](https://bugs.webkit.org/show_bug.cgi?id=233707) and [here](https://bugs.webkit.org/show_bug.cgi?id=233708).<br>
**Recommended workaround:** Consider updating to the latest iOS version.<br>


## Safari iPadOS Tablet
___

### Rotation of a device can create poor video quality - Apple iPad 8 and Apple iPad X
**Devices affected:** Apple iPad 8 and Apple iPad X.<br>
**Description:** When users rotate a device, this movement can degrade the quality of video that is streaming.<br>



**Applies to: chrome-browser**


## Chrome Desktop

### Call disconnection issues on macOS 15.0, Build: 24A335

**OS version:** macOS 15.0, build: 24A335.<br>
**Browser version:** Google Chrome - all versions.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** When initiating a 1:1 call on macOS 15.0, if the callee accepts the call, it sometimes disconnects automatically after a few seconds. Additional delays in receiving and joining calls are observed, which can also lead to disconnections. Disabling the Firewall temporarily resolves these issues, suggesting interference from macOS firewall settings is the root cause. This issue has been addressed in macOS 15.0.1, which enhances compatibility with third-party security software, as detailed [here in the macOS 15.0.1 release notes](https://support.apple.com/en-us/121011).<br>
**Recommended workaround:** Users experiencing this issue should consider disabling the Firewall temporarily or update to macOS 15.0.1 to resolve these call connectivity problems permanently.<br>

### Chrome M98 - a regression that degrades video resolution and increases keyframe generation for devices that do not have an NVIDIA card
**Browser version:** Google Chrome version 98 (Feb 2022)<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** Chrome version 98 introduced a regression with abnormal generation of video keyframes that impacts resolution of a sent video stream negatively for the majority (70%+) of users.<br>
**Known issue reference:** This regression is a known issue introduced on [Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=1295815).<br>
**Recommended workaround:** Updating Google Chrome to the latest version.<br>
  
## Chrome Mobile Android

### Chrome M125 - No outgoing video in Group and Azure Communication Services-Microsoft Teams calls on some Android devices
**Browser version:** Google Chrome version 125 (May 2024) installed on Android devices.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** Chrome version 125 for Android introduced a regression when making video calls - the result of this bug is a user making a call on Azure Communication Services with this version of Chrome has no outgoing video in Group and Azure Communication Services-Microsoft Teams calls.
This behavior is observed on Huawei, OnePlus, Poco and Xiaomi Android devices. The behaviour is not observed on Samsung, Google Pixel and Motorola Android devices.
- A fix is available starting from Google Chrome version 125.0.6422.146/147.<br>

**Devices affected:** 
- Huawei P30 Lite
- OnePlus Nord N10
- OnePlus 7T
- Poco X3 Pro
- Xiaomi Redmi 8T
and possibly other similar models/devices.<br>

**Recommended workaround:** Users are advised to update to Google Chrome version 125.0.6422.146/147 or later, where this issue has been resolved.<br>

### Outgoing audio issue on Android 14 when browser is in background or device screen is locked
**Android version:** Android 14.<br>
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** On Android 14, when the browser is put in the background or the device screen is locked, the outgoing audio disappears after approximately 5 seconds. This issue affects user experience as it interrupts the audio transmission during calls. Issue is not observed on Android 13 or other versions of Android.<br>
**Recommended workaround:** Users are advised to keep the browser active in the foreground during calls.<br>

### Incoming and outgoing audio issue on Android when browser is in background or device screen is locked with Power Saving mode enabled
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** On Android mobile phones when Power Saving mode enabled, incoming and outgoing audio stops immediately when the browser hosting the ACS call is put in the background or the device screen is locked. Additionally, because of the action of putting the browser is backgrounded under Power Saving mode the user will be disconnected and removed from the call after approximately one minute after the device screen is locked or the browser goes into the background.<br>
**Known issue reference:** This is a known issue on [Chromium](https://issues.chromium.org/issues/40282141?pli=1).<br>
**Recommended workaround:** To avoid this issue, users are advised to either keep the browser active in the foreground during calls or disable Power Saving mode while on WebRTC calls.<br>

### Incoming video sometimes blinks and duplicates with another incoming video or is applied with a green overlay for a short moment on some Android devices
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** When more than three users are in a video call with a user who has an Android device, the Android user can sometimes observe that the incoming video is blinking and sometimes duplicates with another incoming video. Another behavior users sometimes experience in the same use case is that the incoming video may appear with a green tint or green overlay for a short moment, and at other times it lasts longer. This behavior is especially noticeable when another user re-enables their camera or joins the call with their video turned on. This behavior is observed on Samsung Galaxy S10, S20, S21, and Google Pixel 6, 8.<br>
**Devices affected:** 
- Samsung Galaxy S10
- Samsung Galaxy S20
- Samsung Galaxy S21
- Google Pixel 6
- Google Pixel 8<br>

**Known issue reference:** This regression is a known issue on [Chromium](https://issues.chromium.org/issues/343086045).<br>

### Chrome M115 - No outgoing video in Group and Azure Communication Services-Microsoft Teams calls
**Browser version:** Google Chrome version 115 (Jul 2023) installed on Android devices.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** Chrome version 115 for Android introduced a regression when making video calls - the result of this bug is a user making a call on Azure Communication Services with this version of Chrome has no outgoing video in Group and  Azure Communication Services-Microsoft Teams calls.<br>
**Known issue reference:** This regression is a known issue introduced on [Chromium](https://bugs.chromium.org/p/chromium/issues/detail?id=1469318). <br>
**Recommended workaround:** As a short term mitigation, instruct users to use Microsoft Edge or Firefox on Android, or avoid using Google Chrome 115/116 on Android.<br>

### Android user can still hear audio from the "Azure Communication Services" call while on a PSTN call
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
  **Description:** This issue happens when an Android Chrome user experiences an incoming PSTN call.
    After answering the PSTN call, the microphone in the "Azure Communication Services" call becomes muted.
    The outgoing audio of the "Azure Communication Services" call is muted, so other participants can't hear the user who is the PSTN call.
    It's worth noting that the user's incoming audio isn't muted, and this behavior is inherent to the browser.
<br>
**Recommended workaround:** Await a forthcoming update or patch from Google.<br>

### Incoming audio is noticeably quieter in Azure Communication Services call after Third-party app call on Android devices
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** Users experience noticeably quieter incoming audio after receiving and accepting a call from a third-party app (e.g., WhatsApp, Viber) during an Azure Communication Services call. 
This issue occurs on Android devices using the mobile browser. Additionally, volume controls indicate maximum levels, although the audio remains quieter than before the third-party call.<br>
**Known issue reference:** This is a known issue on [Chromium](https://bugs.chromium.org/p/webrtc/issues/detail?id=14986). <br>
**Recommended workaround:** Users are advised to either rejoin the Azure Communication Services call or handle third-party app calls separately.<br>

### Android Chrome mutes the call after browser goes to background for one minute
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** On Android Chrome, if a user is on an Azure Communication Services call and puts the browser into background for one minute. The microphone loses access and the other participants in the call can't hear the audio from the user. Once the user brings the browser to foreground, microphone is available again.<br>
**Known issue reference:** Related chromium bugs [here](https://bugs.chromium.org/p/chromium/issues/detail?id=1027446) and [here](https://bugs.chromium.org/p/webrtc/issues/detail?id=10940). <br>
    
### Local microphone/camera mutes when certain interruptions occur on Android Chrome
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** This problem can occur if another application or the operating system takes over the control of the microphone or camera. Here are a few examples that might happen while a user is in the call:
  - An incoming call arrives via PSTN (Public Switched Telephone Network), and it captures the microphone device access.
  - A user plays a YouTube video, for example, or starts a Third-party app call. Switching to another native application can capture access to the microphone or camera.
    
On Android Chrome, when a PSTN call comes in, audio stops flowing in the Azure Communication Services call and the Azure Communication Services call isn't marked as muted. In this case, there's no microphoneMutedUnexepectedly UFD event. Once the PSTN call is finished, Android Chrome regains audio automatically and audio starts flowing normally again in the Azure Communication Services call.

In case camera is on and an interruption occurs, Azure Communication Services call may or may not lose the camera. If lost then camera is marked as off and user has to go turn it back on after the interruption  released the camera.

Occasionally, microphone or camera devices aren't released on time, and that can cause issues with the original call. For example, if the user tries to unmute while watching a YouTube video, or if a PSTN call is active simultaneously.
<br>

### Automatic microphone selection fails for wired headphones in WebRTC Calls on Android devices
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** When users connect wired headphones to their Android device and join a WebRTC call, the microphone option does not default to the wired headphones. This issue is consistently reproducible across different Android devices and Google Chrome versions. Similar behavior has been noted in other services like Twilio and Google's WebRTC sample.<br>
**Known issue reference:** This is a known issue on [Chromium](https://issues.chromium.org/issues/40282142). <br>
**Recommended workaround:** Users should manually select the wired headphones as the microphone option in the call settings after joining the WebRTC call.<br>

### A mobile Android user has dropped the call but is still showing up on the participant list
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** The problem can occur if a mobile user leaves the Azure Communication Services group call without using the Call.hangUp() API. When a mobile user closes the browser or refreshes the webpage without hang up, other participants in the group call can still see this mobile user on the participant list for about 60 seconds.
<br>

### Some Android devices (A326U, A125U and A215U) failing call scenarios except for group calls
**Devices affected:** 
- Samsung Galaxy A32 (Model A326U)
- Samsung Galaxy A12 (Model A125U)
- Samsung Galaxy A21 (Model A215U)<br>

**Description:**  Many specific Android devices fail to start, accept calls, and meetings. The devices that run into this issue, can't recover and fails on every attempt. These are mostly Samsung model A devices, particularly models A326U, A125U and A215U.<br>
    
### Rotation of a device can create poor video quality - Google Pixel 3a, Google Pixel 5

**Devices affected:** Google Pixel 3a, Google Pixel 5.<br>
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:**  When users rotate a device, this movement can degrade the quality of video that is streaming.<br>

### Camera switching makes the screen freeze - Google Pixel 4a
**Device affected:** Google Pixel 4a.<br>
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** When a Communication Services user joins a call by using the JavaScript calling SDK, and then selects the camera switch button, the UI might become unresponsive. The user must then refresh the application, or push the browser to the background.<br>


## Chrome Mobile iOS

### No outgoing and incoming audio when switching browser to background or locking the device - fixed in iOS version 16.4+
**iOS version:** All iOS versions up to iOS 16.3.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** The issue of no outgoing or incoming audio when switching the browser to the background or locking the device was present up to and including iOS version 16.3, and was fixed starting with iOS 16.4.<br>
**Known issue reference:** Related [WebKit](https://bugs.webkit.org/show_bug.cgi?id=241480) bug. <br>
**Recommended workaround:** Consider updating to the latest iOS version.<br>
  
### No incoming/outgoing audio coming from bluetooth headset - iOS 15
**iOS version:** We have seen this issue on iOS versions - 15.6, 15.7.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** When a user connects bluetooth headset in the middle of Azure Communication Services call, the audio still comes out from the speaker until the user locks and unlocks the phone.
Issue isn't reproducible on iOS 16.<br>
**Recommended workaround:** Consider updating to the latest iOS version.<br>
  
### A mobile iOS user has dropped the call but is still showing up on the participant list
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** The problem can occur if a mobile user leaves the Azure Communication Services group call without using the Call.hangUp() API. When a mobile user closes the browser or refreshes the webpage without hang up, other participants in the group call can still see this mobile user on the participant list for about 60 seconds.



**Applies to: firefox-browser**


## Firefox Desktop

### Speaker enumeration and selection unavailable in Firefox through Communication Services device manager
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** If you're using Firefox, your app can't enumerate or select speakers through the Communication Services device manager.<br>
**Workaround:** In this scenario, you must select devices via the operating system.<br>

### Virtual cameras aren't currently supported
**Browser version:** All.<br>
**Azure Communication Service calling SDK version:** All.<br>
**Description:** Virtual cameras aren't currently supported when making Firefox desktop audio\video calls.<br>

---
