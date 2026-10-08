---
title: Enable closed captions for Teams interop
titleSuffix: An Azure Communication Services article
description: This article describes how to enable closed captions during a call.
author: kunaal
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: include
ms.date: 06/28/2025
ms.author: kpunjabi
ms.custom: private_preview
services: azure-communication-services
zone_pivot_groups: acs-plat-web-ios-android-windows
---

# Enable closed captions for Teams interop


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Provide your users with the option to enable closed captions during a Teams interoperability scenario. If your users are in a meeting between an Azure Communication Services user and a Teams client user, or when your users are using Azure Communication Services calling SDK with their Microsoft 365 identity.

**Applies to: platform-windows**


## Prerequisites

- Azure account with an active subscription, for details see [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp). Save the connection string for this resource. 
- An app with voice and video calling, refer to our [Voice](../../quickstarts/voice-video-calling/getting-started-with-calling.md) and [Video](../../quickstarts/voice-video-calling/get-started-with-video-calling.md) calling articles.
- [Access tokens](../../quickstarts/manage-teams-identity.md) for Microsoft 365 users. 
- [Access tokens](../../quickstarts/identity/access-tokens.md) for External identity users.
- For Translated captions, you need to have a [Teams premium](https://learn.microsoft.com/MicrosoftTeams/teams-add-on-licensing/licensing-enhance-teams#meetings) license.  

> **Note:**
> You need to have a voice calling app using Azure Communication Services calling SDKs to access the closed captions feature that is described in this guide.

## Models

| Name | Description |
| --- | --- |
| CaptionsCallFeature | API for captions call feature |
| TeamsCaptions | API for Teams captions |
| StartCaptionOptions | Closed caption options like spoken language |
| TeamsCaptionsReceivedEventArgs | Data object received for each Teams captions received event |

## Get closed captions feature 

### External Identity users and Microsoft 365 users

If you're building an application that enables Azure Communication Services users to join a Teams meeting, add the following code.

``` cs
CaptionsCallFeature captionsCallFeature = call.Features.Captions;
CallCaptions callCaptions = await captionsCallFeature.GetCaptionsAsync();
if (callCaptions.CaptionsKind == CaptionsKind.TeamsCaptions)
{
    TeamsCaptions teamsCaptions = callCaptions as TeamsCaptions;
} 
```

## Subscribe to listeners

### Add a listener to receive captions enabled/disabled status

``` cs
teamsCaptions.CaptionsEnabledChanged += OnIsCaptionsEnabledChanged;

private void OnIsCaptionsEnabledChanged(object sender, PropertyChangedEventArgs args)
{
    if (teamsCaptions.IsEnabled)
    {
    }
}
```

### Add listener for captions data received

``` cs 
teamsCaptions.CaptionsReceived += OnCaptionsReceived;

private void OnCaptionsReceived(object sender, TeamsCaptionsReceivedEventArgs eventArgs)
{
    // Information about the speaker.
    // eventArgs.Speaker
    // The original text with no transcribed.
    // eventArgs.SpokenText
    // language identifier for the captions text.
    // eventArgs.CaptionLanguage
    // language identifier for the speaker.
    // eventArgs.SpokenLanguage
    // The transcribed text.
    // eventArgs.CaptionText
    // Timestamp denoting the time when the corresponding speech was made.
    // eventArgs.Timestamp
    // CaptionsResultKind is Partial if text contains partially spoken sentence.
    // It is set to Final once the sentence has been completely transcribed.
    // eventArgs.ResultKind
}
```

### Add a listener to receive active spoken language changed status

``` cs
teamsCaptions.ActiveSpokenLanguageChanged += OnIsActiveSpokenLanguageChanged;

private void OnIsActiveSpokenLanguageChanged(object sender, PropertyChangedEventArgs args)
{
    // teamsCaptions.ActiveSpokenLanguage
}
```

### Add a listener to receive active caption language changed status

``` cs
teamsCaptions.ActiveCaptionLanguageChanged += OnIsActiveCaptionLanguageChanged;

private void OnIsActiveCaptionLanguageChanged(object sender, PropertyChangedEventArgs args)
{
    // teamsCaptions.ActiveCaptionLanguage
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
        await teamsCaptions.StartCaptionsAsync(options);
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
        await teamsCaptions.StopCaptionsAsync();
    }
    catch (Exception ex)
    {
    }
}
```

## Remove caption received listener

``` cs
teamsCaptions.CaptionsReceived -= OnCaptionsReceived;
```

## Spoken language support 

### Get list of supported spoken languages

Get a list of supported spoken languages that your users can select from when enabling closed captions. 

``` cs
// bcp 47 formatted language code
IReadOnlyList<string> sLanguages = teamsCaptions.SupportedSpokenLanguages;```

### Set spoken language 
When the user selects the spoken language, your app can set the spoken language that it expects captions to be generated from. 

``` cs 
public async void SetSpokenLanguage()
{
    try
    {
        await teamsCaptions.SetSpokenLanguageAsync("en-us");
    }
    catch (Exception ex)
    {
    }
}
```

## Caption language support 

### Get supported caption language 

If your organization has an active Teams premium license, then your Azure Communication Services users can enable translated captions as long as the organizer of the meeting has a Teams premium license. As for users with Microsoft 365 identities this check is done against their own user account if they meeting organizer doesn't have a Teams premium license.

``` cs
// ISO 639-1 formatted language code
IReadOnlyList<string> cLanguages = teamsCaptions.SupportedCaptionLanguages;
```
### Set caption language 

``` cs
public async void SetCaptionLanguage()
{
    try
    {
        await teamsCaptions.SetCaptionLanguageAsync("en");
    }
    catch (Exception ex)
    {
    }
}
```



**Applies to: platform-web**


## Prerequisites

- Azure account with an active subscription, for details see [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp). Save the connection string for this resource. 
- An app with voice and video calling, refer to our [Voice](../../quickstarts/voice-video-calling/getting-started-with-calling.md) and [Video](../../quickstarts/voice-video-calling/get-started-with-video-calling.md) calling quickstarts.
- [Access tokens](../../quickstarts/manage-teams-identity.md) for Microsoft 365 users. 
- [Access tokens](../../quickstarts/identity/access-tokens.md) for External identity users.
- For Translated captions, you need to have a [Teams premium](https://learn.microsoft.com/MicrosoftTeams/teams-add-on-licensing/licensing-enhance-teams#meetings) license.  

> **Note:**
> You need to have a voice calling app using Azure Communication Services calling SDKs to access the closed captions feature that is described in this guide.

## Models

| Name | Description |
| --- | --- |
| CaptionsCallFeature | API for Captions |
| CaptionsCommon | Base class for captions |
| StartCaptionOptions | Closed caption options like spoken language |
| TeamsCaptionHandler | Callback definition for handling CaptionsReceivedEventType event |
| TeamsCaptionsInfo | Data structure received for each CaptionsReceivedEventType event |

## Get closed captions feature

### External Identity users
If you're building an application that allows Azure Communication Services users to join a Teams meeting.
``` typescript
let captionsCallFeature: SDK.CaptionsCallFeature = call.feature(SDK.Features.Captions);
```

### Microsoft 365 users
``` typescript
let captionsCallFeature: SDK.CaptionsCallFeature = teamsCall.feature(SDK.Features.Captions);
```

## Get teams captions object
You need to get and cast the Teams Captions object to utilize Teams Captions specific features
``` typescript
let teamsCaptions: SDK.TeamsCaptions;
if (captionsCallFeature.captions.kind === 'TeamsCaptions') {
    teamsCaptions = captionsCallFeature.captions as SDK.TeamsCaptions;
}
```

## Subscribe to listeners

### Add a listener to receive captions active/inactive status
```typescript
const captionsActiveChangedHandler = () => {
    if (teamsCaptions.isCaptionsFeatureActive) {
        /* USER CODE HERE - E.G. RENDER TO DOM */
    }
}
teamsCaptions.on('CaptionsActiveChanged', captionsActiveChangedHandler);
```

### Add a listener for captions data received
Handle the returned TeamsCaptionsInfo data object. 

> **Note:**
> The object contains a `resultType` property that indicates whether the data is a partial caption or a finalized version of the caption. A `resultType`of `partial` indicates live unedited caption. While `final` indicates a finalized interpreted version of the sentence, such as includes punctuation and capitalization.

```typescript
let currentCaptionLanguage : string;
const captionsReceivedHandler : TeamsCaptionsHandler = (data: TeamsCaptionsInfo) => { 
    /** USER CODE HERE - E.G. RENDER TO DOM 
     * data.captionLanguage
     * data.captionText
     * data.resultType
     * data.speaker
     * data.spokenText
     * data.timeStamp
    */
   // Example code:
   // Create a dom element, i.e. div, with id "captionArea" before proceeding with the sample code
    if (!this._currentCaptionLanguage || this._currentCaptionLanguage === data.captionLanguage) {
        let mri: string;
        switch (data.speaker.identifier.kind) {
            case 'communicationUser': { mri = data.speaker.identifier.communicationUserId; break; }
            case 'microsoftTeamsUser': { mri = data.speaker.identifier.microsoftTeamsUserId; break; }
            case 'phoneNumber': { mri = data.speaker.identifier.phoneNumber; break; }
        }
        const outgoingCaption = `prefix${mri.replace(/:/g, '').replace(/-/g, '')}`;

        let captionArea = document.getElementById("captionArea");
        const captionText = `${data.timestamp.toUTCString()}
            ${data.speaker.displayName}: ${data.captionText ?? data.spokenText}`;

        let foundCaptionContainer = captionArea.querySelector(`.${outgoingCaption}[isNotFinal='true']`);
        if (!foundCaptionContainer) {
            let captionContainer = document.createElement('div');
            captionContainer.setAttribute('isNotFinal', 'true');
            captionContainer.style['borderBottom'] = '1px solid';
            captionContainer.style['whiteSpace'] = 'pre-line';
            captionContainer.textContent = captionText;
            captionContainer.classList.add(newClassName);

            captionArea.appendChild(captionContainer);
        } else {
            foundCaptionContainer.textContent = captionText;

            if (captionData.resultType === 'Final') {
                foundCaptionContainer.setAttribute('isNotFinal', 'false');
            }
        }
    }
}; 
teamsCaptions.on('CaptionsReceived', captionsReceivedHandler); 
```

### Add a listener to receive spoken language changed status

```typescript
const spokenLanguageChangedHandler = () => {
    if (teamsCaptions.activeSpokenLanguage !== currentSpokenLanguage) {
        /* USER CODE HERE - E.G. RENDER TO DOM */
    }
}
teamsCaptions.on('SpokenLanguageChanged', spokenLanguageChangedHandler)
```

### Add a listener to receive caption language changed status

```typescript
const captionLanguageChangedHandler = () => {
    if (teamsCaptions.activeCaptionLanguage !== currentCaptionLanguage) {
        /* USER CODE HERE - E.G. RENDER TO DOM */
    }
}
teamsCaptions.on('CaptionLanguageChanged', captionLanguageChangedHandler)
```

## Start captions

Once you set up all your listeners, you can start adding captions.

``` typescript
try {
    await teamsCaptions.startCaptions({ spokenLanguage: 'en-us' });
} catch (e) {
    /* USER ERROR HANDLING CODE HERE */
}
```

## Stop captions

``` typescript
try {
    teamsCaptions.stopCaptions(); 
} catch (e) {
    /* USER ERROR HANDLING CODE HERE */
}
```

## Unsubscribe to listeners

```typescript
teamsCaptions.off('CaptionsActiveChanged', captionsActiveChangedHandler);
teamsCaptions.off('CaptionsReceived', captionsReceivedHandler); 
```

## Spoken language support

### Get a list of supported spoken languages

Get a list of supported spoken languages that your users can select from when enabling closed captions.

The property returns an array of languages in BCP 47 format.
 
``` typescript
const spokenLanguages = teamsCaptions.supportedSpokenLanguages; 
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
    teamsCaptions.setSpokenLanguage(language);
} catch (e) {
    /* USER ERROR HANDLING CODE HERE */
}
```

## Caption language support

### Get a list of supported caption languages
If your organization has an active Teams premium license, you can allow your users to use translated captions provided by Teams captions. As for users with a Microsoft 365 identity, if the meeting organizer doesn't have an active Teams premium license, captions language check is done against the Microsoft 365 users account.

The property returns an array of two-letter language codes in `ISO 639-1` standard. 

``` typescript
const captionLanguages = teamsCaptions.supportedCaptionLanguages;
```

## Set caption language
``` typescript
// ISO 639-1 formatted language code
const language = 'en'; 

// Alternatively, pass a value from the supported caption languages array
const language = captionLanguages[0];
try {
    teamsCaptions.setCaptionLanguage(language);
} catch (e) {
    /* USER ERROR HANDLING CODE HERE */
}
```



**Applies to: platform-android**


## Prerequisites

- Azure account with an active subscription, for details see [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp). Save the connection string for this resource. 
- An app with voice and video calling, refer to our [Voice](../../quickstarts/voice-video-calling/getting-started-with-calling.md) and [Video](../../quickstarts/voice-video-calling/get-started-with-video-calling.md) calling quickstarts.
- [Access tokens](../../quickstarts/manage-teams-identity.md) for Microsoft 365 users. 
- [Access tokens](../../quickstarts/identity/access-tokens.md) for External identity users.
- For Translated captions, you need to have a [Teams premium](https://learn.microsoft.com/MicrosoftTeams/teams-add-on-licensing/licensing-enhance-teams#meetings) license.  

> **Note:**
> You need to have a voice calling app using Azure Communication Services calling SDKs to access the closed captions feature that is described in this guide.

## Models

| Name | Description |
| --- | --- |
| CaptionsCallFeature | API for captions call feature |
| TeamsCaptions | API for Teams captions |
| StartCaptionOptions | Closed caption options like spoken language |
| TeamsCaptionsListener | Listener for TeamsCaptions addOnCaptionsReceivedListener |
| TeamsCaptionsReceivedEvent | Data object received for each TeamsCaptionsListener event |

## Get closed captions feature 

### External Identity users and Microsoft 365 users

If you're building an application that allows users to join a Teams meeting 

``` java
CaptionsCallFeature captionsCallFeature = call.feature(Features.CAPTIONS);
captionsCallFeature.getCaptions().whenComplete(
    ((captions, throwable) -> {
        if (throwable == null) {
            CallCaptions callCaptions = captions;
            if (captions.getCaptionsType() == CaptionsType.TEAMS_CAPTIONS) {
            // teams captions
            TeamsCaptions teamsCaptions = (TeamsCaptions) captions;
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
    teamsCaptions.addOnCaptionsEnabledChangedListener( (PropertyChangedEvent args) -> {
        if(teamsCaptions.isEnabled()) {
            // captions enabled
        }
    });
}
```

### Add listener for captions data received

``` java 
TeamsCaptionsListener captionsListener = (TeamsCaptionsReceivedEvent args) -> {
  // Information about the speaker.
  // CallerInfo participantInfo = args.getSpeaker();
  // The original text with no transcribed.
  // args.getSpokenText();
  // language identifier for the captions text.
  // args.getCaptionLanguage();
  // language identifier for the speaker.
  // args.getSpokenLanguage();
  // The transcribed text.
  // args.getCaptionText();
  // Timestamp denoting the time when the corresponding speech was made.
  // args.getTimestamp();
  // CaptionsResultType is Partial if text contains partially spoken sentence.
  // It is set to Final once the sentence has been completely transcribed.
  // args.getResultType() == CaptionsResultType.FINAL;
}; 
public void addOnCaptionsReceivedListener() {
  teamsCaptions.addOnCaptionsReceivedListener(captionsListener); 
}
```

### Add a listener to receive active spoken language changed status

``` java
public void addOnActiveSpokenLanguageChangedListener() {
    teamsCaptions.addOnActiveSpokenLanguageChangedListener( (PropertyChangedEvent args) -> {
       // teamsCaptions.getActiveSpokenLanguage()
    });
}
```

### Add a listener to receive active caption language changed status

``` java
public void addOnActiveCaptionLanguageChangedListener() {
    teamsCaptions.addOnActiveCaptionLanguageChangedListener( (PropertyChangedEvent args) -> {
       // teamsCaptions.getActiveCaptionLanguage()
    });
}
```

## Start captions

Once you set up all your listeners, you can start adding captions.

``` java
public void startCaptions() {
    StartCaptionsOptions startCaptionsOptions = new StartCaptionsOptions();
    startCaptionsOptions.setSpokenLanguage("en-us");
    teamsCaptions.startCaptions(startCaptionsOptions).whenComplete((result, error) -> {
        if (error != null) {
        }
    });
}
```

## Stop captions

``` java
public void stopCaptions() {
    teamsCaptions.stopCaptions().whenComplete((result, error) -> {
        if (error != null) {
        }
    });
}
```

## Remove caption received listener

``` java
public void removeOnCaptionsReceivedListener() {
    teamsCaptions.removeOnCaptionsReceivedListener(captionsListener);
}
```

## Spoken language support 

### Get list of supported spoken languages

Get a list of supported spoken languages that your users can select from when enabling closed captions. 

``` java
// bcp 47 formatted language code
teamsCaptions.getSupportedSpokenLanguages();
```

### Set spoken language

When the user selects the spoken language, your app can set the spoken language that it expects captions to be generated from. 

``` java 
public void setSpokenLanguage() {
    teamsCaptions.setSpokenLanguage("en-us").whenComplete((result, error) -> {
        if (error != null) {
        }
    });
}
```

## Caption language support 

### Get supported caption language 

If your organization has an active Teams premium license, then your Azure Communication Services users can enable translated captions as long as the organizer of the meeting has a Teams premium license. For users with Microsoft 365 identities, this check is done against their own user account if they meeting organizer doesn't have a Teams premium license.

``` java
// ISO 639-1 formatted language code
teamsCaptions.getSupportedCaptionLanguages();
```
### Set caption language 

``` java
public void setCaptionLanguage() {
    teamsCaptions.setCaptionLanguage("en").whenComplete((result, error) -> {
        if (error != null) {
        }
    });
}
```



**Applies to: platform-ios**


## Prerequisites

- Azure account with an active subscription, for details see [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure Communication Services resource. See [Create an Azure Communication Services resource](../../quickstarts/create-communication-resource.md?tabs=windows\&pivots=platform-azp). Save the connection string for this resource. 
- An app with voice and video calling, refer to our [Voice](../../quickstarts/voice-video-calling/getting-started-with-calling.md) and [Video](../../quickstarts/voice-video-calling/get-started-with-video-calling.md) calling quickstarts.
- [Access tokens](../../quickstarts/manage-teams-identity.md) for Microsoft 365 users. 
- [Access tokens](../../quickstarts/identity/access-tokens.md) for External identity users.
- For Translated captions, you need to have a [Teams premium](https://learn.microsoft.com/MicrosoftTeams/teams-add-on-licensing/licensing-enhance-teams#meetings) license.

> **Note:**
> You need to have a voice calling app using Azure Communication Services calling SDKs to access the closed captions feature that is described in this guide.

## Models

| Name | Description |
| --- | --- |
| CaptionsCallFeature | API for captions call feature |
| TeamsCaptions | API for Teams captions |
| StartCaptionOptions | Closed caption options like spoken language |
| TeamsCaptionsDelegate | Delegate for Teams captions |
| TeamsCaptionsReceivedEventArgs | Data object received for each Teams captions received event |

## Get closed captions feature 

### External Identity users and Microsoft 365 users

If you're building an application that allows Azure Communication Services users to join a Teams meeting 

``` swift
if let call = self.call {
    @State var captionsCallFeature = call.feature(Features.captions)
    captionsCallFeature.getCaptions{(value, error) in
        if let error = error {
            // failed to get captions
        } else {
            if (value?.type == CaptionsType.teamsCaptions) {
                // teams captions
                @State var teamsCaptions = value as? TeamsCaptions
            }
        }
    }
}
```

## Subscribe to listeners

### Add a listener to receive captions enabled/disabled, spoken language, caption language status changed, and data received

```swift
extension CallObserver: TeamsCaptionsDelegate {
    // listener for receive captions enabled/disabled status
    public func teamsCaptions(_ teamsCaptions: TeamsCaptions, didChangeCaptionsEnabledState args: PropertyChangedEventArgs) {
        // teamsCaptions.isEnabled
    }
    
    // listener for active spoken language state change
    public func teamsCaptions(_ teamsCaptions: TeamsCaptions, didChangeActiveSpokenLanguageState args: PropertyChangedEventArgs) {
        // teamsCaptions.activeSpokenLanguage
    }
    
    // listener for active caption language state change
    public func teamsCaptions(_ teamsCaptions: TeamsCaptions, didChangeActiveCaptionLanguageState args: PropertyChangedEventArgs) {
        // teamsCaptions.activeCaptionLanguage
    }
    
    // listener for captions data received
    public func teamsCaptions(_ teamsCaptions: TeamsCaptions, didReceiveCaptions:TeamsCaptionsReceivedEventArgs) {
            // Information about the speaker.
            // didReceiveCaptions.speaker
            // The original text with no transcribed.
            // didReceiveCaptions.spokenText
            // language identifier for the captions text.
            // didReceiveCaptions.captionLanguage
            // language identifier for the speaker.
            // didReceiveCaptions.spokenLanguage
            // The transcribed text.
            // didReceiveCaptions.captionText
            // Timestamp denoting the time when the corresponding speech was made.
            // didReceiveCaptions.timestamp
            // CaptionsResultType is Partial if text contains partially spoken sentence.
            // It is set to Final once the sentence has been completely transcribed.
            // didReceiveCaptions.resultType
    }
}

teamsCaptions.delegate = self.callObserver
```

## Start captions

Once you set up all your listeners, you can start adding captions.

``` swift
func startCaptions() {
    guard let teamsCaptions = teamsCaptions else {
        return
    }
    let startCaptionsOptions = StartCaptionsOptions()
    startCaptionsOptions.spokenLanguage = "en-us"
    teamsCaptions.startCaptions(startCaptionsOptions: startCaptionsOptions, completionHandler: { (error) in
        if error != nil {
            
        }
    })
}
```

## Stop captions

``` swift
func stopCaptions() {
    teamsCaptions.stopCaptions(completionHandler: { (error) in
        if error != nil {
            
        }
    })
}
```

## Remove caption received listener

``` swift
teamsCaptions?.delegate = nil
```

## Spoken language support 

### Get list of supported spoken languages

Get a list of supported spoken languages that your users can select from when enabling closed captions. 

``` swift
// bcp 47 formatted language code
let spokenLanguage : String = "en-us"
for language in teamsCaptions?.supportedSpokenLanguages ?? [] {
    // choose required language
    spokenLanguage = language
}
```

### Set spoken language

When the user selects the spoken language, your app can set the spoken language that it expects captions to be generated from. 

``` swift 
func setSpokenLanguage() {
    guard let teamsCaptions = self.teamsCaptions else {
        return
    }

    teamsCaptions.set(spokenLanguage: spokenLanguage, completionHandler: { (error) in
        if let error = error {
        }
    })
}
```

## Caption language support 

### Get supported caption language 

If your organization has an active Teams premium license, then your Azure Communication Services users can enable translated captions as long as the organizer of the meeting has a Teams premium license. As for users with Microsoft 365 identities this check is done against their own user account if they meeting organizer doesn't have a Teams premium license.

``` swift
// ISO 639-1 formatted language code
let captionLanguage : String = "en"
for language in teamsCaptions?.supportedCaptionLanguages ?? [] {
    // choose required language
    captionLanguage = language
}
```
### Set caption language 

``` swift
func setCaptionLanguage() {
    guard let teamsCaptions = self.teamsCaptions else {
        return
    }

    teamsCaptions.set(captionLanguage: captionLanguage, completionHandler: { (error) in
        if let error = error {
        }
    })
}
```



## Clean up resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it. Learn more about [cleaning up resources here](../../quickstarts/create-communication-resource.md#clean-up-resources). 

## Next steps

- Learn about [Voice](manage-calls.md) and [Video calling](manage-video.md).
- Learn about [Teams interoperability](teams-interoperability.md).
- Learn more about Microsoft Teams [live translated captions](https://support.microsoft.com//office/use-live-captions-in-a-teams-meeting-4be2d304-f675-4b57-8347-cbd000a21260).
- Learn more about the [UI Library](../../concepts/ui-library/ui-library-overview.md).
