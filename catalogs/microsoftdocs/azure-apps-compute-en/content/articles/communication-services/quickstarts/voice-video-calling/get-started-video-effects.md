---
title: Enable video background effects
titleSuffix: An Azure Communication Services article
description: This article describes how to add video effects in your video calls using Azure Communication Services.
author: sloanster

ms.author: micahvivion
manager: nmurav
ms.date: 06/24/2025
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: calling
zone_pivot_groups: acs-plat-web-ios-android-windows
ms.custom: mode-other, devx-track-js
---

# Enable video background effects


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


**Applies to: platform-web**


The Video effects feature lets users add visual effects to video calls, including background blur and video replacement. This helps eliminate distractions and protect sensitive information, especially in contexts like telehealth, telebanking, and virtual hearings. Background blur enhances privacy and enables custom backgrounds, making calls more engaging and personalized.

> **Note:**
> The [calling effect library](https://www.npmjs.com/package/@azure/communication-calling-effects)is designed to work exclusively with the [Azure Communication Calling client library for WebJS](https://www.npmjs.com/package/@azure/communication-calling) and can't be used independently.

## Implement video effects

### Install the package

> **Important:**
> Background blur and background replacement for **Web Desktop browsers** is in GA availability. This quickstart uses the Azure Communication Services Calling SDK version of `1.13.1` (or greater) and the Azure Communication Services Calling Effects SDK version greater than or equal to `1.0.1`. Currently desktop browser support for creating video background effects is only supported on Chrome and Microsoft Edge Desktop Browser (Windows and Mac) and Mac Safari Desktop.

> **Important:**
> Background blur and background replacement for **Android Chrome and Android Edge mobile browser** is available in General Availability starting in build [1.34.1](https://www.npmjs.com/package/@azure/communication-calling/v/1.34.1) and later WebJS SDK versions. You must use version [1.1.4](https://www.npmjs.com/package/@azure/communication-calling-effects) or higher of the calling effects package to implement background effects on Android mobile browsers.

Use the `npm install` command to install the Azure Communication Services Effects SDK for JavaScript.

```console
npm install @azure/communication-calling-effects --save
```

For more information about the calling communication effects npm package, see [Communication calling effects](https://www.npmjs.com/package/@azure/communication-calling-effects).

> **Note:**
> Currently there are two available video effects:
> - Background blur
> - Background replacement with an image (the aspect ratio should be 16:9 to be compatible)

To use video effects with the Azure Communication Calling SDK, once you create a `LocalVideoStream`, you need to get the `VideoEffects` feature API of the `LocalVideoStream` to start/stop video effects:

```js
import * as AzureCommunicationCallingSDK from '@azure/communication-calling'; 

import { BackgroundBlurEffect, BackgroundReplacementEffect } from '@azure/communication-calling-effects'; 

// Get the video effects feature API on the LocalVideoStream 
// (here, localVideoStream is the LocalVideoStream object you created while setting up video calling)
const videoEffectsFeatureApi = localVideoStream.feature(AzureCommunicationCallingSDK.Features.VideoEffects); 


// Subscribe to useful events 
videoEffectsFeatureApi.on(‘effectsStarted’, () => { 
    // Effects started
});

videoEffectsFeatureApi.on(‘effectsStopped’, () => { 
    // Effects stopped
}); 

videoEffectsFeatureApi.on(‘effectsError’, (error) => { 
    // Effects error
});
```

### Background blur

```js
// Create the effect instance 
const backgroundBlurEffect = new BackgroundBlurEffect(); 

// Recommended: Check support by using the isSupported method on the feature API
const backgroundBlurSupported = await videoEffectsFeatureApi.isSupported(backgroundBlurEffect);

if (backgroundBlurSupported) { 
    // Use the video effects feature API we created to start effects
    await videoEffectsFeatureApi.startEffects(backgroundBlurEffect); 
}
```
### Background replacement with an image

You need to provide the URL of the image you want as the background to this effect.

> **Important:**
> The `startEffects` method fails if the URL isn't of an image or is unreachable/unreadable.

> **Note:**
> Current supported image formats are: png, jpg, jpeg, tiff, bmp.
>
> Current supported aspect ratio is 16:9.

```js
const backgroundImage = 'https://linkToImageFile'; 

// Create the effect instance 
const backgroundReplacementEffect = new BackgroundReplacementEffect({ 
    backgroundImageUrl: backgroundImage
}); 

// Recommended: Check support by using the isSupported method on the feature API
const backgroundReplacementSupported = await videoEffectsFeatureApi.isSupported(backgroundReplacementEffect);

if (backgroundReplacementSupported) { 
    // Use the video effects feature API as before to start/stop effects 
    await videoEffectsFeatureApi.startEffects(backgroundReplacementEffect); 
}
```

Changing the image for this effect can be done by passing it via the configure method:

```js
const newBackgroundImage = 'https://linkToNewImageFile'; 

await backgroundReplacementEffect.configure({ 
    backgroundImageUrl: newBackgroundImage
});
```

Switching effects can be done using the same method on the video effects feature API:

```js
// Switch to background blur 
await videoEffectsFeatureApi.startEffects(backgroundBlurEffect); 

// Switch to background replacement 
await videoEffectsFeatureApi.startEffects(backgroundReplacementEffect);
```

At any time if you want to check what effects are active, you can use the `activeEffects` property.

The `activeEffects` property returns an array with the names of the current active effects, and returns an empty array if there are no effects active.

```js
// Using the video effects feature API
const currentActiveEffects = videoEffectsFeatureApi.activeEffects;
```

To stop effects:

```js
await videoEffectsFeatureApi.stopEffects();
```

### Add a frosted glass background effect

Frosted glass backgrounds combine the privacy of a blurred background with the customization of your selected image to produce a sophisticated effect resembling frosted glass windows. To achieve this effect, upload a transparent PNG image as your custom background. This image could be your company logo or a unique design. The frosted glass effect blurs the transparent areas of your image, while preserving the graphic as part of the background. To use a frosted glass appearance, you must use version `1.1.3` or higher of the [Azure Communication Calling Effects library for JavaScript](https://www.npmjs.com/package/@azure/communication-calling-effects) package.

For best results when preparing the frosted PNG image, keep in mind:

- **Resolution**: Use 1920x1080 pixels for a high-quality background
- **Avoid full opacity**: Colored content such as logos looks best with a little transparency. We recommend 75% opacity
- **Stencil mid-gray foreground**: For grayscale PNG with transparency, we recommend having the full image in mid-gray (value 128) so that the transparency pattern is visible on both light and dark backgrounds.



**Applies to: platform-ios**


> **Note:**
> To use Video Effects on the iOS Calling SDK, Azure Communication Services downloads a machine learning model to the customer's device. We encourage you to review the privacy notes in your application and update them accordingly, if necessary.

You can use the Video Effects feature to add effects to your video in video calls. Background blur provides users with the mechanism to remove distractions behind a participant so that participants can communicate without disruptive activity or confidential information in the background.

This feature is most useful the context of telehealth, where a provider or patient might want to obscure their surroundings to protect sensitive information or personal data. Background blur can be applied across all virtual appointment scenarios, including telebanking and virtual hearings, to protect user privacy.

## Implement video effects

> **Note:**
> Video effects support on iOS is limited to the **two** most recent major versions of iOS. For example, when a new, major version of iOS is released, the iOS requirement is the new version and the most recent versions that preceded it.

Currently there's one available Video Effect: Background Blur.

The `LocalVideoEffectsFeature` object has the following API structure:

- `enable`: Enables a Video Effect on the `LocalVideoStream` instance.
- `disable`: Disables a Video Effect on the `LocalVideoStream` instance.
- `isSupported`: Indicates if a Video Effect is supported on the `LocalVideoStream` instance. 
- `onVideoEffectEnabled`: Event that is triggered when a Video Effect is enabled successfully.
- `onVideoEffectDisabled`: Event that is triggered when a Video Effect is disabled successfully.
- `onVideoEffectError`: Event that is triggered when a Video Effect operation fails.

Once you have the `LocalVideoEffectsFeature` object, you can subscribe to the events, events have the following delegates: `didEnableVideoEffect`, `didDisableVideoEffect`, `didReceiveVideoEffectError`. 

To use Video Effects with the Azure Communication Calling SDK, once you create a `LocalVideoStream`, you need to get the `VideoEffects` feature API of the `LocalVideoStream` to enable/disable Video Effects:

```swift
// Obtain the Video Effects feature from the LocalVideoStream object that is sending the video.
@State var localVideoEffectsFeature: LocalVideoEffectsFeature?
localVideoEffectsFeature = self.localVideoStreams.first.feature(Features.localVideoEffects)
```

```swift
// Subscribe to the events
public func localVideoEffectsFeature(_ videoEffectsLocalVideoStreamFeature: LocalVideoEffectsFeature, didEnableVideoEffect args: VideoEffectEnabledEventArgs) {
        os_log("Video Effect Enabled, VideoEffectName: %s", log:log, args.videoEffectName)
    }
public func localVideoEffectsFeature(_ videoEffectsLocalVideoStreamFeature: LocalVideoEffectsFeature, didDisableVideoEffect args: VideoEffectDisabledEventArgs) {
    os_log("Video Effect Disabled, VideoEffectName: %s", log:log, args.videoEffectName)
}
public func localVideoEffectsFeature(_ videoEffectsLocalVideoStreamFeature: LocalVideoEffectsFeature, didReceiveVideoEffectError args: VideoEffectErrorEventArgs) {
    os_log("Video Effect Error, VideoEffectName: %s, Code: %s, Message: %s", log:log, args.videoEffectName, args.code, args.message)
}
```

Then start using the APIs to enable and disable Video Effects:

```swift
localVideoEffectsFeature.enable(effect: backgroundBlurVideoEffect)
localVideoEffectsFeature.disable(effect: backgroundBlurVideoEffect)
```

### Background blur

Background Blur is a Video Effect that enables the application to blur a person's background. To use Background Video Effect, you need to obtain a `LocalVideoEffectsFeature` feature from a valid `LocalVideoStream`.

- Create a new Background Blur Video Effect object:

  ```swift
  @State var backgroundBlurVideoEffect: BackgroundBlurEffect?
  ```

- Check if `BackgroundBlurEffect` is supported and call `Enable` on the `videoEffectsFeature` object:

  ```swift
  if((localVideoEffectsFeature.isSupported(effect: backgroundBlurVideoEffect)) != nil)
  {
      localVideoEffectsFeature.enable(effect: backgroundBlurVideoEffect)
  }
  ```

To disable Background Blur Video Effect:

```swift
localVideoEffectsFeature.disable(effect: backgroundBlurVideoEffect)
```

### Background Replacement

Background Replacement is a Video Effect that enables a person to set their own custom background. To use Background Replacement Effect, you need to obtain a `LocalVideoEffectsFeature` feature from a valid `LocalVideoStream`.

- Create a new Background Replacement Video Effect object:

  ```swift
  @State var backgroundReplacementVideoEffect: BackgroundReplacementEffect?
  ```

- Set a custom background by passing in the image through a buffer.

  ```swift
  let image = UIImage(named:"image.png")
  guard let imageData = image?.jpegData(compressionQuality: 1.0) else {
  return
  }
  backgroundReplacementVideoEffect.buffer = imageData
  ```

- Check if `BackgroundReplacementEffect` is supported and call `Enable` on the `videoEffectsFeature` object:

  ```swift
  if((localVideoEffectsFeature.isSupported(effect: backgroundReplacementVideoEffect)) != nil)
  {
      localVideoEffectsFeature.enable(effect: backgroundReplacementVideoEffect)
  }
  ```

To disable Background Replacement Video Effect:

```swift
localVideoEffectsFeature.disable(effect: backgroundReplacementVideoEffect)
```



**Applies to: platform-android**


> **Note:**
> In order to use Video Effects on the Android Calling SDK, a machine learning model is downloaded to the customer's device. We encourage you to review the privacy notes in your application and update them accordingly, if necessary.

You can use the Video Effects feature to add effects to your video in video calls. Background blur provides users with the mechanism to remove distractions behind a participant so that participants can communicate without disruptive activity or confidential information in the background. This feature is especially useful the context of telehealth, where a provider or patient might want to obscure their surroundings to protect sensitive information or personal data. Background blur can be applied across all virtual appointment scenarios, including telebanking and virtual hearings, to protect user privacy.

This article builds on [Add 1\:1 video calling to your app](get-started-with-video-calling.md?pivots=platform-android) for Android.

## Using video effects

> **Note:**
> Video effects support on Android is limited to the **last four** major versions of Android. For example, when a new, major version of Android is released, the Android requirement is the new version and the three most recent versions that precede it.

Currently there's one available Video Effect: Background Blur.

The `VideoEffectsLocalVideoStreamFeature` object has the following API structure:

- `enableEffect`: Enables a Video Effect on the `LocalVideoStream` instance.
- `disableEffect`: Disables a Video Effect on the `LocalVideoStream` instance.
- `OnVideoEffectEnabledListener`: Event that is triggered when a Video Effect is enabled successfully.
- `OnVideoEffectDisabledListener`: Event that is triggered when a Video Effect is disabled successfully.
- `OnVideoEffectErrorListener`: Event that is triggered when a Video Effect operation fails.

The `VideoEffectEnabledEvent`, `VideoEffectDisabledEvent`, and `VideoEffectErrorEvent` objects have the following API structure:

- `getVideoEffectName`: Gets the name of the Video Effect that triggered the event.

Once you have the `VideoEffectsLocalVideoStreamFeature` object, you can subscribe to the events:

To use Video Effects with the Azure Communication Calling SDK, once you create a `LocalVideoStream`, you need to get the `VideoEffects` feature API of the `LocalVideoStream` to enable/disable Video Effects:

```java
// Obtain the Video Effects feature from the LocalVideoStream object that is sending the video.
VideoEffectsLocalVideoStreamFeature videoEffectsFeature = currentVideoStream.feature(Features.LOCAL_VIDEO_EFFECTS);
```

```java
// Create event handlers for the events
private void handleOnVideoEffectEnabled(VideoEffectEnabledEvent args) {
}
private void handleOnVideoEffectDisabled(VideoEffectDisabledEvent args) {
}
private void handleOnVideoEffectError(VideoEffectErrorEvent args) {
}
 
// Subscribe to the events
videoEffectsFeature.addOnVideoEffectEnabledListener(this::handleOnVideoEffectEnabled);
videoEffectsFeature.addOnVideoEffectDisabledListener(this::handleOnVideoEffectDisabled);
videoEffectsFeature.addOnVideoEffectErrorListener(this::handleOnVideoEffectError);
```

Then start using the APIs to enable and disable Video Effects:

```java
videoEffectsFeature.enableEffect( {{VIDEO_EFFECT_TO_DISABLE}} );
videoEffectsFeature.disableEffect( {{VIDEO_EFFECT_TO_DISABLE}} );
```

### Background blur

Background Blur is a Video Effect that enables the application to blue a person's background. In order to use Background Video Effect, you need to obtain a `VideoEffectsLocalVideoStreamFeature` feature from a valid `LocalVideoStream`.

To enable Background Blur Video Effect:

- Create a method that obtains the `VideoEFfects` Feature subscribes to the events:

```java
private void handleOnVideoEffectEnabled(VideoEffectEnabledEvent args) {
   Log.i("VideoEffects", "Effect enabled for effect " + args.getVideoEffectName());
}
private void handleOnVideoEffectDisabled(VideoEffectDisabledEvent args) {
   Log.i("VideoEffects", "Effect disabled for effect " + args.getVideoEffectName());
}
private void handleOnVideoEffectError(VideoEffectErrorEvent args) {
   Log.i("VideoEffects", "Error " + args.getCode() + ":" + args.getMessage()
           + " for effect " + args.getVideoEffectName());
}

VideoEffectsLocalVideoStreamFeature videoEffectsFeature;
public void createVideoEffectsFeature() {
    videoEffectsFeature = currentVideoStream.feature(Features.LOCAL_VIDEO_EFFECTS);
    videoEffectsFeature.addOnVideoEffectEnabledListener(this::handleOnVideoEffectEnabled);
    videoEffectsFeature.addOnVideoEffectDisabledListener(this::handleOnVideoEffectDisabled);
    videoEffectsFeature.addOnVideoEffectErrorListener(this::handleOnVideoEffectError);
}

```

- Create a new Background Blur Video Effect object:

```java
BackgroundBlurEffect backgroundBlurVideoEffect = new BackgroundBlurEffect();
```

- Call `EnableEffect` on the `videoEffectsFeature` object:

```java
public void enableBackgroundBlur() {
    videoEffectsFeature.enableEffect(backgroundBlurEffect);
}
```

To disable Background Blur Video Effect:

```java
public void disableBackgroundBlur() {
    videoEffectsFeature.disableEffect(backgroundBlurEffect);
}
```

### Background replacement

Background Replacement is a Video Effect that allows a person's background to be replaced. In order to use Background Video Effect, you need to obtain a `VideoEffectsLocalVideoStreamFeature` feature from a valid `LocalVideoStream`.

To enable Background Replacement Video Effect:

- Create a method that obtains the `VideoEFfects` Feature subscribes to the events:

```java
private void handleOnVideoEffectEnabled(VideoEffectEnabledEvent args) {
   Log.i("VideoEffects", "Effect enabled for effect " + args.getVideoEffectName());
}
private void handleOnVideoEffectDisabled(VideoEffectDisabledEvent args) {
   Log.i("VideoEffects", "Effect disabled for effect " + args.getVideoEffectName());
}
private void handleOnVideoEffectError(VideoEffectErrorEvent args) {
   Log.i("VideoEffects", "Error " + args.getCode() + ":" + args.getMessage()
           + " for effect " + args.getVideoEffectName());
}

VideoEffectsLocalVideoStreamFeature videoEffectsFeature;
public void createVideoEffectsFeature() {
    videoEffectsFeature = currentVideoStream.feature(Features.LOCAL_VIDEO_EFFECTS);
    videoEffectsFeature.addOnVideoEffectEnabledListener(this::handleOnVideoEffectEnabled);
    videoEffectsFeature.addOnVideoEffectDisabledListener(this::handleOnVideoEffectDisabled);
    videoEffectsFeature.addOnVideoEffectErrorListener(this::handleOnVideoEffectError);
}

```

- Create a new Background Replacement Video Effect object:

```java
BackgroundReplacementEffect backgroundReplacementVideoEffect = new BackgroundReplacementEffect();
```

- Set a custom background by passing in the image through a buffer.

```java
//example of where we can get an image from, in this case, this is from assets in Android folder
InputStream inputStream = getAssets().open("image.jpg");
Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
ByteArrayOutputStream stream = new ByteArrayOutputStream();
bitmap.compress(Bitmap.CompressFormat.JPEG, 100, stream);
byte[] data = stream.toByteArray();
ByteBuffer dataBuffer = ByteBuffer.allocateDirect(data.length);
dataBuffer.put(data);
dataBuffer.rewind();
backgroundReplacementVideoEffect.setBuffer(dataBuffer);
```

- Call `EnableEffect` on the `videoEffectsFeature` object:

```java
public void enableBackgroundReplacement() {
    videoEffectsFeature.enableEffect(backgroundReplacementVideoEffect);
}
```

To disable Background Replacement Video Effect:

```java
public void disableBackgroundReplacement() {
    videoEffectsFeature.disableEffect(backgroundReplacementVideoEffect);
}
```



**Applies to: platform-windows**


> **Note:**
> To use Video Effects on the Windows Calling SDK, a machine learning model is downloaded to the customer's device. We encourage you to review the privacy notes in your application and update them accordingly, if necessary.

You can use the Video Effects feature to add effects to your video in video calls. Background blur provides users with the mechanism to remove distractions behind a participant so that participants can communicate without disruptive activity or confidential information in the background.

This feature is most useful the context of telehealth, where a provider or patient might want to obscure their surroundings to protect sensitive information or personal data. Background blur can be applied across all virtual appointment scenarios, including telebanking and virtual hearings, to protect user privacy.

This article builds on [Add 1\:1 video calling to your app](get-started-with-video-calling.md?pivots=platform-windows) for Windows.

## Using video effects

Currently there's one available Video Effect: Background Blur.

The `VideoEffectsLocalVideoStreamFeature` object has the following API structure:

- `EnableEffect`: Enables a Video Effect on the `LocalVideoStream` instance.
- `DisableEffect`: Disables a Video Effect on the `LocalVideoStream` instance.
- `VideoEffectEnabled`: Event that is triggered when a Video Effect is enabled successfully.
- `VideoEffectDisabledListener`: Event that is triggered when a Video Effect is disabled successfully.
- `VideoEffectErrorListener`: Event that is triggered when a Video Effect operation fails.

The `VideoEffectEnabledEvent`, `VideoEffectDisabledEvent`, and `VideoEffectErrorEvent` objects have the following API structure:

- `VideoEffectName`: Gets the name of the Video Effect that triggered the event.

Once you have the `VideoEffectsLocalVideoStreamFeature` object, you can subscribe to the events:

To use Video Effects with the Azure Communication Calling SDK, add the variables to MainPage.

```C#
public sealed partial class MainPage : Page
{
    private LocalVideoEffectsFeature localVideoEffectsFeature;
}
```
Once you create a `LocalVideoStream`, you need to get the `VideoEffects` feature API of the `LocalVideoStream` to enable/disable Video Effects.

```C#
private async void CameraList_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    var selectedCamera = CameraList.SelectedItem as VideoDeviceDetails;
    cameraStream = new LocalOutgoingVideoStream(selectedCamera);
    InitVideoEffectsFeature(cameraStream);
    
    var localUri = await cameraStream.StartPreviewAsync();
    await Dispatcher.RunAsync(Windows.UI.Core.CoreDispatcherPriority.Normal, () =>
    {
        LocalVideo.Source = MediaSource.CreateFromUri(localUri);
    });
}

public void InitVideoEffectsFeature(LocalOutgoingVideoStream videoStream){
    localVideoEffectsFeature = videoStream.Features.VideoEffects;
    localVideoEffectsFeature.VideoEffectEnabled += LocalVideoEffectsFeature_VideoEffectEnabled;
    localVideoEffectsFeature.VideoEffectDisabled += LocalVideoEffectsFeature_VideoEffectDisabled;
    localVideoEffectsFeature.VideoEffectError += LocalVideoEffectsFeature_VideoEffectError;
}

// Create event handlers for the events
private void LocalVideoEffectsFeature_VideoEffectEnabled(object sender, VideoEffectEnabledEventArgs args)
{
}

private void LocalVideoEffectsFeature_VideoEffectDisabled(object sender, VideoEffectDisabledEventArgs args)
{
}

private void LocalVideoEffectsFeature_VideoEffectError(object sender, VideoEffectErrorEventArgs args)
{
}
 
// Subscribe to the events
videoEffectsFeature.VideoEffectEnabled += VideoEffectsFeature_OnVideoEffectEnabled;
videoEffectsFeature.VideoEffectDisabled += VideoEffectsFeature_OnVideoEffectDisabled;
videoEffectsFeature.VideoEffectError += VideoEffectsFeature_OnVideoEffectError;
```

Then start using the APIs to enable and disable Video Effects:

```C#
videoEffectsLocalVideoStreamFeature.EnableEffect( {{VIDEO_EFFECT_TO_ENABLE}} );
videoEffectsLocalVideoStreamFeature.DisableEffect( {{VIDEO_EFFECT_TO_DISABLE}} );
```

### Background blur

Background Blur is a Video Effect that enables the application to blur a person's background. To use Background Video Effect, you need to obtain a `VideoEffectsLocalVideoStreamFeature` feature from a valid `LocalVideoStream`.

To enable Background Blur Video Effect:

- Add the `BackgroundBlurEffect` instance to the MainPage.

```C#
public sealed partial class MainPage : Page
{
    private BackgroundBlurEffect backgroundBlurVideoEffect = new BackgroundBlurEffect();
}
```

- Create a method that obtains the `VideoEFfects` Feature subscribes to the events:

```C#
private async void LocalVideoEffectsFeature_VideoEffectEnabled(object sender, VideoEffectEnabledEventArgs e)
{
    await Dispatcher.RunAsync(Windows.UI.Core.CoreDispatcherPriority.Normal, async () =>
    {
        BackgroundBlur.IsChecked = true;
    });
}

private async void LocalVideoEffectsFeature_VideoEffectDisabled(object sender, VideoEffectDisabledEventArgs e)
{
    await Dispatcher.RunAsync(Windows.UI.Core.CoreDispatcherPriority.Normal, async () =>
    {
        BackgroundBlur.IsChecked = false;
    });
}

private void LocalVideoEffectsFeature_VideoEffectError(object sender, VideoEffectErrorEventArgs e)
{
    String effectName = args.VideoEffectName;
    String errorCode = args.Code;
    String errorMessage = args.Message;

    Trace.WriteLine("VideoEffects VideoEffectError on effect " + effectName + "with code "
        + errorCode + "and error message " + errorMessage);
}
```

- Enable and disable the Background Blur effect:

```C#
private async void BackgroundBlur_Click(object sender, RoutedEventArgs e)
{
    if (localVideoEffectsFeature.IsEffectSupported(backgroundBlurVideoEffect))
    {
        var backgroundBlurCheckbox = sender as CheckBox;
        if (backgroundBlurCheckbox.IsChecked.Value)
        {
            localVideoEffectsFeature.EnableEffect(backgroundBlurVideoEffect);
        }
        else
        {
            localVideoEffectsFeature.DisableEffect(backgroundBlurVideoEffect);
        }
    }
}
```

### Background replacement

Background Replacement is a Video Effect that enables the application to replace a person's background. In order to use Background Video Effect, you need to obtain a `VideoEffectsLocalVideoStreamFeature` feature from a valid `LocalVideoStream`.

To enable Background Replacement Video Effect:

- Add the `BackgroundReplacementEffect` instance to the MainPage.

```C#
public sealed partial class MainPage : Page
{
    private BackgroundReplacementEffect backgroundReplacementVideoEffect = new BackgroundReplacementEffect();
}
```

- Create a method that obtains the `VideoEFfects` Feature subscribes to the events:

```C#
private async void LocalVideoEffectsFeature_VideoEffectEnabled(object sender, VideoEffectEnabledEventArgs e)
{
    await Dispatcher.RunAsync(Windows.UI.Core.CoreDispatcherPriority.Normal, async () =>
    {
        BackgroundReplacement.IsChecked = true;
    });
}

private async void LocalVideoEffectsFeature_VideoEffectDisabled(object sender, VideoEffectDisabledEventArgs e)
{
    await Dispatcher.RunAsync(Windows.UI.Core.CoreDispatcherPriority.Normal, async () =>
    {
        BackgroundReplacement.IsChecked = false;
    });
}

private void LocalVideoEffectsFeature_VideoEffectError(object sender, VideoEffectErrorEventArgs e)
{
    String effectName = args.VideoEffectName;
    String errorCode = args.Code;
    String errorMessage = args.Message;

    Trace.WriteLine("VideoEffects VideoEffectError on effect " + effectName + "with code "
        + errorCode + "and error message " + errorMessage);
}
```

- Set a custom background by passing in the image through a buffer.

```C#
//example of getting the image from storage folder
MemoryBuffer memoryBuffer = new MemoryBuffer(0);
StorageFolder InstallationFolder = Windows.ApplicationModel.Package.Current.InstalledLocation;
StorageFile file = InstallationFolder.GetFileAsync("image.jpg").GetAwaiter().GetResult();
if (File.Exists(file.Path))
{
    byte[] imageBytes = File.ReadAllBytes(file.Path);
    memoryBuffer = new MemoryBuffer((uint)imageBytes.Length);
    using (IMemoryBufferReference reference = memoryBuffer.CreateReference())
    {
        byte* dataInBytes;
        uint capacityInBytes;

        (reference.As<IMemoryBufferByteAccess>()).GetBuffer(out dataInBytes, out capacityInBytes);
        for (int i = 0; i < imageBytes.Length; i++)
        {
            dataInBytes[i] = imageBytes[i];
        }
    }
    return memoryBuffer;
}
backgroundReplacementVideoEffect.Buffer = memoryBuffer;
```


- Enable and disable the Background Replacement effect:

```C#
private async void BackgroundReplacement_Click(object sender, RoutedEventArgs e)
{
    if (localVideoEffectsFeature.IsEffectSupported(backgroundReplacementVideoEffect))
    {
        var backgroundReplacementCheckbox = sender as CheckBox;
        if (backgroundReplacementCheckbox.IsChecked.Value)
        {
            localVideoEffectsFeature.EnableEffect(backgroundReplacementVideoEffect);
        }
        else
        {
            localVideoEffectsFeature.DisableEffect(backgroundReplacementVideoEffect);
        }
    }
}
```



## Next steps

- Check out our [calling hero sample](../../samples/calling-hero-sample.md).
- Get started with the [UI Library](../../concepts/ui-library/ui-library-overview.md).
- Learn about [Calling SDK capabilities](getting-started-with-calling.md?pivots=platform-web).
- Learn more about [how calling works](../../concepts/voice-video-calling/about-call-types.md).
