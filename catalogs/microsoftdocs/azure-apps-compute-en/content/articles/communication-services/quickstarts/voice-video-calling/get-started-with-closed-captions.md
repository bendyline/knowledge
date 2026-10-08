---
title: Enable closed captions 
titleSuffix: An Azure Communication Services article
description: This article describes how to add closed captions to your existing calling app using Azure Communication Services.
author: Kunaal
ms.author: kpunjabi
ms.date: 06/28/2025
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: calling
zone_pivot_groups: acs-plat-web-ios-android-windows
ms.custom: mode-api, devx-track-js
---

# Enable closed captions


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


**Applies to: platform-web**


## Prerequisites

- Azure account with an active subscription, for details see [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../create-communication-resource.md?tabs=windows\&pivots=platform-azp). Save the connection string for this resource. 
- An app with voice and video calling, refer to our [Voice](getting-started-with-calling.md) and [Video](get-started-with-video-calling.md) articles.
 

> **Note:**
> You need to have a voice calling app using Azure Communication Services calling SDKs to access the closed captions feature described here.

## Models

| Name | Description |
| --- | --- |
| CaptionsCallFeature | API for Captions |
| CaptionsCommon | Base class for captions |
| StartCaptionOptions | Closed caption options like spoken language |
| CaptionsHandler | Callback definition for handling CaptionsReceivedEventType event |
| CaptionsInfo | Data structure received for each CaptionsReceivedEventType event |

## Get closed captions feature

``` typescript
let captionsCallFeature: SDK.CaptionsCallFeature = call.feature(SDK.Features.Captions);
```

## Get captions object

You need to get and cast the Captions object to utilize Captions specific features.

``` typescript
let captions: SDK.Captions;
if (captionsCallFeature.captions.kind === 'Captions') {
    captions = captionsCallFeature.captions as SDK.Captions;
}
```

## Subscribe to listeners

### Add a listener to receive captions active/inactive status

```typescript
const captionsActiveChangedHandler = () => {
    if (captions.isCaptionsFeatureActive) {
        /* USER CODE HERE - E.G. RENDER TO DOM */
    }
}
captions.on('CaptionsActiveChanged', captionsActiveChangedHandler);
```

### Add a listener for captions data received

Handle the returned CaptionsInfo data object. 

> **Note:**
> The object contains a `resultType` prop that indicates whether the data is a partial caption or a finalized version of the caption. The `resultType` of `Partial` indicates live unedited caption, while `Final` indicates a finalized interpreted version of the sentence, such as includes punctuation and capitalization.

```typescript
const captionsReceivedHandler : CaptionsHandler = (data: CaptionsInfo) => { 
    /** USER CODE HERE - E.G. RENDER TO DOM 
     * data.resultType
     * data.speaker
     * data.spokenLanguage
     * data.spokenText
     * data.timeStamp
    */
   // Example code:
   // Create a dom element, i.e. div, with id "captionArea" before proceeding with the sample code
    let mri: string;
    switch (data.speaker.identifier.kind) {
        case 'communicationUser': { mri = data.speaker.identifier.communicationUserId; break; }
        case 'phoneNumber': { mri = data.speaker.identifier.phoneNumber; break; }
    }
    const outgoingCaption = `prefix${mri.replace(/:/g, '').replace(/-/g, '')}`;

    let captionArea = document.getElementById("captionArea");
    const captionText = `${data.timestamp.toUTCString()}
        ${data.speaker.displayName}: ${data.spokenText}`;

    let foundCaptionContainer = captionArea.querySelector(`.${outgoingCaption}[isNotFinal='true']`);
    if (!foundCaptionContainer) {
        let captionContainer = document.createElement('div');
        captionContainer.setAttribute('isNotFinal', 'true');
        captionContainer.style['borderBottom'] = '1px solid';
        captionContainer.style['whiteSpace'] = 'pre-line';
        captionContainer.textContent = captionText;
        captionContainer.classList.add(outgoingCaption);

        captionArea.appendChild(captionContainer);
    } else {
        foundCaptionContainer.textContent = captionText;

        if (captionData.resultType === 'Final') {
            foundCaptionContainer.setAttribute('isNotFinal', 'false');
        }
    }
}; 
captions.on('CaptionsReceived', captionsReceivedHandler); 
```

### Add a listener to receive spoken language changed status
```typescript
// set a local variable currentSpokenLanguage to track the current spoken language in the call
let currentSpokenLanguage = ''
const spokenLanguageChangedHandler = () => {
    if (captions.activeSpokenLanguage !== currentSpokenLanguage) {
        /* USER CODE HERE - E.G. RENDER TO DOM */
    }
}
captions.on('SpokenLanguageChanged', spokenLanguageChangedHandler)
```

## Start captions

Once you set up all your listeners, you can now start adding captions.

``` typescript
try {
    await captions.startCaptions({ spokenLanguage: 'en-us' });
} catch (e) {
    /* USER ERROR HANDLING CODE HERE */
}
```

## Stop captions

``` typescript
try {
    captions.stopCaptions(); 
} catch (e) {
    /* USER ERROR HANDLING CODE HERE */
}
```

## Unsubscribe to listeners

```typescript
captions.off('CaptionsActiveChanged', captionsActiveChangedHandler);
captions.off('CaptionsReceived', captionsReceivedHandler); 
```

## Spoken language support

### Get a list of supported spoken languages

Get a list of supported spoken languages that your users can select from when enabling closed captions.

The property returns an array of languages in bcp 47 format.

``` typescript
const spokenLanguages = captions.supportedSpokenLanguages; 
```

## Set spoken language

Pass a value in from the supported spoken languages array to ensure that the requested language is supported.

By default, if contoso provides no language or an unsupported language, the spoken language defaults to `en-us`.

``` typescript
// bcp 47 formatted language code
const language = 'en-us'; 

// Alternatively, pass a value from the supported spoken languages array
const language = spokenLanguages[0]; 

try {
    captions.setSpokenLanguage(language);
} catch (e) {
    /* USER ERROR HANDLING CODE HERE */
}
```

### Add a listener to receive captions kind changed status

Captions kind can change from Captions to TeamsCaptions if a Teams/CTE user joins the call or if the call changes to an interop call type. Resubscription to [Teams Captions listeners](../../how-tos/calling-sdk/closed-captions-teams-interop-how-to.md) is required to continue the Captions experience. TeamsCaptions kind can’t be switched or changed back to Captions kind in a call once TeamsCaptions is used in the call.

```typescript
const captionsKindChangedHandler = () => {
    /* USER CODE HERE - E.G. SUBSCRIBE TO TEAMS CAPTIONS */
}
captions.on('CaptionsKindChanged', captionsKindChangedHandler)
```



**Applies to: platform-windows**


## Prerequisites

- Azure account with an active subscription, for details see [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../create-communication-resource.md?tabs=windows\&pivots=platform-azp). Save the connection string for this resource. 
- An app with voice and video calling, refer to our [Voice](getting-started-with-calling.md) and [Video](get-started-with-video-calling.md) calling quickstarts.

> **Note:**
> You need to have a voice calling app using Azure Communication Services calling SDKs to access the closed captions feature that is described here.

## Models

| Name | Description |
| --- | --- |
| CaptionsCallFeature | API for captions call feature |
| CommunicationCaptions | API for communication captions |
| StartCaptionOptions | Closed caption options like spoken language |
| CommunicationCaptionsReceivedEventArgs | Data object received for each communication captions received event |

## Get closed captions feature

You need to get and cast the Captions object to utilize Captions specific features.

``` cs
CaptionsCallFeature captionsCallFeature = call.Features.Captions;
CallCaptions callCaptions = await captionsCallFeature.GetCaptionsAsync();
if (callCaptions.CaptionsKind == CaptionsKind.CommunicationCaptions)
{
 CommunicationCaptions communicationCaptions = callCaptions as CommunicationCaptions;
} 
```

## Subscribe to listeners

### Add a listener to receive captions enabled/disabled status

``` cs
communicationCaptions.CaptionsEnabledChanged += OnIsCaptionsEnabledChanged;

private void OnIsCaptionsEnabledChanged(object sender, PropertyChangedEventArgs args)
{
 if (communicationCaptions.IsEnabled)
 {
 }
}
```

### Add a listener to receive captions type changed

This event is triggered when the caption type changes from `CommunicationCaptions` to `TeamsCaptions` upon inviting Microsoft 365 users to Azure Communication Services-only call.

``` cs
captionsCallFeature.ActiveCaptionsTypeChanged += OnIsCaptionsTypeChanged;

private void OnIsCaptionsTypeChanged(object sender, PropertyChangedEventArgs args)
{
 // get captions
}
```

### Add listener for captions data received

``` cs 
communicationCaptions.CaptionsReceived += OnCaptionsReceived;

private void OnCaptionsReceived(object sender, CommunicationCaptionsReceivedEventArgs eventArgs)
{
 // Information about the speaker.
 // eventArgs.Speaker
 // The original text with no transcribed.
 // eventArgs.SpokenText
 // language identifier for the speaker.
 // eventArgs.SpokenLanguage
 // Timestamp denoting the time when the corresponding speech was made.
 // eventArgs.Timestamp
 // CaptionsResultKind is Partial if text contains partially spoken sentence.
 // It is set to Final once the sentence has been completely transcribed.
 // eventArgs.ResultKind
}
```

### Add a listener to receive active spoken language changed status

``` cs
communicationCaptions.ActiveSpokenLanguageChanged += OnIsActiveSpokenLanguageChanged;

private void OnIsActiveSpokenLanguageChanged(object sender, PropertyChangedEventArgs args)
{
 // communicationCaptions.ActiveSpokenLanguage
}
```

## Start captions

Once you set up all your listeners, you can start adding captions.

``` cs

private async void StartCaptions()
{
 var options = new StartCaptionsOptions
 {
 SpokenLanguage = "en-us"
 };
 try
 {
 await communicationCaptions.StartCaptionsAsync(options);
 }
 catch (Exception ex)
 {
 }
}
```

## Stop captions

``` cs
private async void StopCaptions()
{
 try
 {
 await communicationCaptions.StopCaptionsAsync();
 }
 catch (Exception ex)
 {
 }
}
```

## Remove caption received listener

``` cs
communicationCaptions.CaptionsReceived -= OnCaptionsReceived;
```

## Spoken language support 

### Get list of supported spoken languages
Get a list of supported spoken languages that your users can select from when enabling closed captions. 

``` cs
// bcp 47 formatted language code
IReadOnlyList<string> sLanguages = communicationCaptions.SupportedSpokenLanguages;```

### Set spoken language 
When the user selects the spoken language, your app can set the spoken language that it expects captions to be generated from. 

``` cs 
public async void SetSpokenLanguage()
{
 try
 {
 await communicationCaptions.SetSpokenLanguageAsync("en-us");
 }
 catch (Exception ex)
 {
 }
}
```

## Clean up

See [cleaning up resources](../create-communication-resource.md?pivots=platform-azp\&tabs=windows#clean-up-resources).



**Applies to: platform-android**


## Prerequisites

- Azure account with an active subscription, for details see [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../create-communication-resource.md?tabs=windows\&pivots=platform-azp). Save the connection string for this resource. 
- An app with voice and video calling, refer to our [Voice](getting-started-with-calling.md) and [Video](get-started-with-video-calling.md) articles.

> **Note:**
> You need to have a voice calling app using Azure Communication Services calling SDKs to access the closed captions feature described here.

## Models

| Name | Description |
| --- | --- |
| CaptionsCallFeature | API for captions call feature |
| CommunicationCaptions | API for communication captions |
| StartCaptionOptions | Closed caption options like spoken language |
| CommunicationCaptionsListener | Listener for CommunicationCaptions addOnCaptionsReceivedListener |
| CommunicationCaptionsReceivedEvent | Data object received for each CommunicationCaptionsListener event |

## Get closed captions feature

You need to get and cast the captions object to use captions specific features.

``` java
CaptionsCallFeature captionsCallFeature = call.feature(Features.CAPTIONS);
captionsCallFeature.getCaptions().whenComplete(
 ((captions, throwable) -> {
 if (throwable == null) {
 CallCaptions callCaptions = captions;
 if (captions.getCaptionsType() == CaptionsType.COMMUNICATION_CAPTIONS) {
 // communication captions
 CommunicationCaptions communicationCaptions = (CommunicationCaptions) captions;
 }
 } else {
 // get captions failed
 // throwable is the exception/cause
 }
 }));
```

## Subscribe to listeners

### Add a listener to receive captions enabled/disabled status

``` java
public void addOnIsCaptionsEnabledChangedListener() {
 communicationCaptions.addOnCaptionsEnabledChangedListener( (PropertyChangedEvent args) -> {
 if(communicationCaptions.isEnabled()) {
 // captions enabled
 }
 });
}
```

### Add a listener to receive captions type changed

This event triggers when the caption type changes from `CommunicationCaptions` to `TeamsCaptions` upon inviting Microsoft 365 users to Azure Communication Services-only calls.

``` java
public void addOnIsCaptionsTypeChangedListener() {
 captionsCallFeature.addOnActiveCaptionsTypeChangedListener( (PropertyChangedEvent args) -> {
 if(communicationCaptions.isEnabled()) {
 // captionsCallFeature.getCaptions();
 }
 });
}
```

### Add listener for captions data received

``` java 
CommunicationCaptionsListener captionsListener = (CommunicationCaptionsReceivedEvent args) -> {
 // Information about the speaker.
 // CallerInfo participantInfo = args.getSpeaker();
 // The original text with no transcribed.
 // args.getSpokenText();
 // language identifier for the speaker.
 // args.getSpokenLanguage();
 // Timestamp denoting the time when the corresponding speech was made.
 // args.getTimestamp();
 // CaptionsResultType is Partial if text contains partially spoken sentence.
 // It is set to Final once the sentence has been completely transcribed.
 // args.getResultType() == CaptionsResultType.FINAL;
}; 
public void addOnCaptionsReceivedListener() {
 communicationCaptions.addOnCaptionsReceivedListener(captionsListener); 
}
```

### Add a listener to receive active spoken language changed status

``` java
public void addOnActiveSpokenLanguageChangedListener() {
 communicationCaptions.addOnActiveSpokenLanguageChangedListener( (PropertyChangedEvent args) -> {
 // communicationCaptions.getActiveSpokenLanguage()
 });
}
```

## Start captions

Once you set up all your listeners, you can start adding captions.

``` java
public void startCaptions() {
 StartCaptionsOptions startCaptionsOptions = new StartCaptionsOptions();
 startCaptionsOptions.setSpokenLanguage("en-us");
 communicationCaptions.startCaptions(startCaptionsOptions).whenComplete((result, error) -> {
 if (error != null) {
 }
 });
}
```

## Stop captions

``` java
public void stopCaptions() {
 communicationCaptions.stopCaptions().whenComplete((result, error) -> {
 if (error != null) {
 }
 });
}
```

## Remove caption received listener

``` java
public void removeOnCaptionsReceivedListener() {
 communicationCaptions.removeOnCaptionsReceivedListener(captionsListener);
}
```

## Spoken language support 

### Get list of supported spoken languages

Get a list of supported spoken languages that your users can select from when enabling closed captions. 

``` java
// bcp 47 formatted language code
communicationCaptions.getSupportedSpokenLanguages();
```

### Set spoken language

When the user selects the spoken language, your app can set the spoken language that it expects captions to be generated from. 

``` java 
public void setSpokenLanguage() {
 communicationCaptions.setSpokenLanguage("en-us").whenComplete((result, error) -> {
 if (error != null) {
 }
 });
}
```

## Clean up

See [cleaning up resources](../create-communication-resource.md?pivots=platform-azp\&tabs=windows#clean-up-resources).



**Applies to: platform-ios**


## Prerequisites
- Azure account with an active subscription, for details see [Create an account for free.](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../create-communication-resource.md?tabs=windows\&pivots=platform-azp). Save the connection string for this resource. 
- An app with voice and video calling, refer to our [Voice](getting-started-with-calling.md) and [Video](get-started-with-video-calling.md) calling quickstarts.

> **Note:**
> You need to have a voice calling app using Azure Communication Services calling SDKs to access the closed captions feature that is described in this guide.

## Models

| Name | Description |
| --- | --- |
| CaptionsCallFeature | API for captions call feature |
| CommunicationCaptions | API for communication captions |
| StartCaptionOptions | Closed caption options like spoken language |
| CommunicationCaptionsDelegate | Delegate for communication captions |
| CommunicationCaptionsReceivedEventArgs | Data object received for each communication captions received event |

## Get closed captions feature 

You need to get and cast the captions object to use captions specific features.

``` swift
if let call = self.call {
 @State var captionsCallFeature = call.feature(Features.captions)
 captionsCallFeature.getCaptions{(value, error) in
 if let error = error {
 // failed to get captions
 } else {
 if (value?.type == CaptionsType.communicationCaptions) {
 // communication captions
 @State var communicationCaptions = value as? CommunicationCaptions
 }
 }
 }
}
```

## Subscribe to listeners

### Add a listener to receive captions enabled/disabled, type, spoken language, caption language status changed, and data received

The event `didChangeActiveCaptionsType` triggers when the caption type changes from `CommunicationCaptions` to `TeamsCaptions` upon inviting Microsoft 365 users to ACS-only calls.

```swift
extension CallObserver: CommunicationCaptionsDelegate {
 // listener for receive captions enabled/disabled status
 public func communicationCaptions(_ communicationCaptions: CommunicationCaptions, didChangeCaptionsEnabledState args: PropertyChangedEventArgs) {
 // communicationCaptions.isEnabled
 }
 
 // listener for active spoken language state change
 public func communicationCaptions(_ communicationCaptions: CommunicationCaptions, didChangeActiveSpokenLanguageState args: PropertyChangedEventArgs) {
 // communicationCaptions.activeSpokenLanguage
 }
 
 // listener for captions data received
 public func communicationCaptions(_ communicationCaptions: CommunicationCaptions, didReceiveCaptions:CommunicationCaptionsReceivedEventArgs) {
 // Information about the speaker.
 // didReceiveCaptions.speaker
 // The original text with no transcribed.
 // didReceiveCaptions.spokenText
 // language identifier for the speaker.
 // didReceiveCaptions.spokenLanguage
 // Timestamp denoting the time when the corresponding speech was made.
 // didReceiveCaptions.timestamp
 // CaptionsResultType is Partial if text contains partially spoken sentence.
 // It is set to Final once the sentence has been completely transcribed.
 // didReceiveCaptions.resultType
 }
}

communicationCaptions.delegate = self.callObserver

extension CallObserver: CaptionsCallFeatureDelegate {
 // captions type changed
 public func captionsCallFeature(_ captionsCallFeature: CaptionsCallFeature, didChangeActiveCaptionsType args: PropertyChangedEventArgs) {
 // captionsCallFeature.getCaptions to get captions
 }
}

captionsCallFeature.delegate = self.callObserver
```

## Start captions

Once you set up all your listeners, you can start adding captions.

``` swift
func startCaptions() {
 guard let communicationCaptions = communicationCaptions else {
 return
 }
 let startCaptionsOptions = StartCaptionsOptions()
 startCaptionsOptions.spokenLanguage = "en-us"
 communicationCaptions.startCaptions(startCaptionsOptions: startCaptionsOptions, completionHandler: { (error) in
 if error != nil {
 
 }
 })
}
```

## Stop captions

``` swift
func stopCaptions() {
 communicationCaptions.stopCaptions(completionHandler: { (error) in
 if error != nil {
 
 }
 })
}
```

## Remove caption received listener

``` swift
communicationCaptions?.delegate = nil
```

## Spoken language support 

### Get list of supported spoken languages

Get a list of supported spoken languages that your users can select from when enabling closed captions. 

``` swift
// bcp 47 formatted language code
let spokenLanguage : String = "en-us"
for language in communicationCaptions?.supportedSpokenLanguages ?? [] {
 // choose required language
 spokenLanguage = language
}
```

### Set spoken language

When the user selects the spoken language, your app can set the spoken language that it expects captions to be generated from. 

``` swift 
func setSpokenLanguage() {
 guard let communicationCaptions = self.communicationCaptions else {
 return
 }

 communicationCaptions.set(spokenLanguage: spokenLanguage, completionHandler: { (error) in
 if let error = error {
 }
 })
}
```

## Clean up

See [cleaning up resources](../create-communication-resource.md?pivots=platform-azp\&tabs=windows#clean-up-resources).



## Clean up resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it. Learn more about [cleaning up resources](../create-communication-resource.md?pivots=platform-azp&tabs=windows#clean-up-resources).

## Next steps

- Learn more about using closed captions in [Teams interop](../../concepts/interop/enable-closed-captions.md) scenarios. 
- Check out our [web calling sample](../../samples/web-calling-sample.md).
- Learn about [Calling SDK capabilities](getting-started-with-calling.md?pivots=platform-web).
- Learn more about [how calling works](../../concepts/voice-video-calling/about-call-types.md).
