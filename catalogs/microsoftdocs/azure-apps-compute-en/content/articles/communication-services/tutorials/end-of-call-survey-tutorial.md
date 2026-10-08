---
title: Azure Communication Services End of Call Survey
titleSuffix: An Azure Communication Services tutorial document
description: Learn how to use the End of Call Survey to collect user feedback.
author: amagginetti
ms.author: amagginetti
manager: mvivion
services: azure-communication-services
ms.date: 4/03/2023
ms.topic: tutorial
ms.service: azure-communication-services
ms.subservice: calling
zone_pivot_groups: acs-plat-web-ios-android-windows
---

# Use the End of Call Survey to collect user feedback


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


This tutorial shows you how to use the Azure Communication Services End of Call Survey.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- An active Communication Services resource. [Create a Communication Services resource](../quickstarts/create-communication-resource.md). Survey results are tied to single Communication Services resources.
- An active Log Analytics Workspace, also known as Azure Monitor Logs. See [End of Call Survey Logs](../concepts/analytics/logs/end-of-call-survey-logs.md).
- To conduct a survey with custom questions using free form text, you need an [App Insight resource](https://learn.microsoft.com/azure/azure-monitor/app/create-workspace-resource#create-a-workspace-based-resource).

**Applies to: platform-web**


> **Important:**
> End of Call Survey is available starting on the version [1.13.1](https://www.npmjs.com/package/@azure/communication-calling/v/1.13.1) of the Calling SDK. Make sure to use that version or later when trying the instructions.

- [Node.js](https://nodejs.org/) active Long Term Support(LTS) versions are recommended.

## Sample of API usage

The End of Call Survey feature should be used after the call ends. Users can rate any kind of VoIP call, 1:1, group, meeting, outgoing and incoming. Once a user's call ends, your application can show a UI to the end user allowing them to choose a rating score, and if needed, pick issues they’ve encountered during the call from our predefined list.

The following code snips show an example of one-to-one call. After the end of the call, your application can show a survey UI and once the user chooses a rating, your application should call the feature API to submit the survey with the user choices.

We encourage you to use the default rating scale. However, you can submit a survey with custom rating scale. You can check out the [sample application](https://github.com/Azure-Samples/communication-services-web-calling-tutorial/blob/main/Project/src/MakeCall/CallSurvey.js) for the sample API usage.


### Rate call only - no custom scale

```javascript
call.feature(Features.CallSurvey).submitSurvey({
    overallRating: { score: 5 }, // issues are optional
}).then(() => console.log('survey submitted successfully'));
```

OverallRating is a required category for all surveys.


### Rate call only - with custom scale and issues

```javascript
call.feature(Features.CallSurvey).submitSurvey({
    overallRating: {
        score: 1, // my score
        scale: { // my custom scale
            lowerBound: 0,
            upperBound: 1,
            lowScoreThreshold: 0
        },
        issues: ['HadToRejoin'] // my issues, check the table below for all available issues
    }
}).then(() => console.log('survey submitted successfully'));
```

### Rate overall, audio, and video with a sample issue

```javascript
call.feature(Features.CallSurvey).submitSurvey({
    overallRating: { score: 3 },
    audioRating: { score: 4 },
    videoRating: { score: 3, issues: ['Freezes'] }
}).then(() => console.log('survey submitted successfully'))
```

### Handle errors the SDK can send

```javascript
call.feature(Features.CallSurvey).submitSurvey({
    overallRating: { score: 3 }
}).catch((e) => console.log('error when submitting survey: ' + e))
```

## Find different types of errors

### Failures while submitting survey

The API returns the following error messages if data validation fails or the survey can't be submitted.

- At least one survey rating is required.

- In default scale X should be 1 to 5. - where X is either of:
  - overallRating.score
  - audioRating.score
  - videoRating.score
  - ScreenshareRating.score

- \{propertyName\}: \{rating.score\} should be between \{rating.scale?.lowerBound\} and \{rating.scale?.upperBound\}.

- \{propertyName\}: \{rating.scale?.lowScoreThreshold\} should be between \{rating.scale?.lowerBound\} and \{rating.scale?.upperBound\}.

- \{propertyName\} lowerBound: \{rating.scale?.lowerBound\} and upperBound: \{rating.scale?.upperBound\} should be between 0 and 100.

- Please try again [ACS failed to submit survey, due to network or other error].

### We'll return any error codes with a message.

- Error code 400 (bad request) for all the error messages except one.

```
{ message: validationErrorMessage, code: 400 }
```

- One 408 (timeout) when event discarded:

```
{ message: "Please try again.", code: 408 }
```


## All possible values

### Default survey API configuration

| API Rating Categories | Cutoff Value* | Input Range | Comments |
| --- | --- | --- | --- |
| Overall Call | 2 | 1 - 5 | Surveys a calling participant’s overall quality experience on a scale of 1-5. A response of 1 indicates an imperfect call experience and 5 indicates a perfect call. The cutoff value of 2 means that a customer response of 1 or 2 indicates a less than perfect call experience. |
| Audio | 2 | 1 - 5 | A response of 1 indicates an imperfect audio experience and 5 indicates no audio issues were experienced. |
| Video | 2 | 1 - 5 | A response of 1 indicates an imperfect video experience and 5 indicates no video issues were experienced. |
| Screenshare | 2 | 1 - 5 | A response of 1 indicates an imperfect screen share experience and 5 indicates no screen share issues were experienced. |



> **Note:**
>A question’s indicated cutoff value in the API is the threshold that Microsoft uses when analyzing your survey data. When you customize the cutoff value or Input Range, Microsoft analyzes your survey data according to your customization.


### More survey tags

| Rating Categories | Optional Tags |
| --- | --- |
| Overall Call | `CallCannotJoin` `CallCannotInvite` `HadToRejoin` `CallEndedUnexpectedly`  `OtherIssues` |
| Audio | `NoLocalAudio` `NoRemoteAudio` `Echo` `AudioNoise`  `LowVolume`  `AudioStoppedUnexpectedly` `DistortedSpeech` `AudioInterruption`  `OtherIssues` |
| Video | `NoVideoReceived` `NoVideoSent` `LowQuality` `Freezes` `StoppedUnexpectedly` `DarkVideoReceived` `AudioVideoOutOfSync` `OtherIssues` |
| Screenshare | `NoContentLocal` `NoContentRemote` `CannotPresent` `LowQuality` `Freezes` `StoppedUnexpectedly` `LargeDelay` `OtherIssues` |


### Customization options

You can choose to collect each of the four API values or only the ones
you find most important. For example, you can choose to only ask
customers about their overall call experience instead of asking them
about their audio, video, and screen share experience. You can also
customize input ranges to suit your needs. The default input range is 1
to 5 for Overall Call, Audio, Video, and
Screenshare. However, each API value can be customized from a minimum of
0 to maximum of 100.

### Customization examples

| API Rating Categories | Cutoff Value* | Input Range |
| --- | --- | --- |
| Overall Call | 0 - 100 | 0 - 100 |
| Audio | 0 - 100 | 0 - 100 |
| Video | 0 - 100 | 0 - 100 |
| Screenshare | 0 - 100 | 0 - 100 |

   > **Note:**
   > A question’s indicated cutoff value in the API is the threshold that Microsoft uses when analyzing your survey data. When you customize the cutoff value or Input Range, Microsoft analyzes your survey data according to your customization.

## Custom questions
In addition to using the End of Call Survey API, you can create your own survey questions and incorporate them with the End of Call Survey results. Below you find steps to incorporate your own customer questions into a survey and query the results of the End of Call Survey API and your own survey questions.
-  [Create App Insight resource](https://learn.microsoft.com/azure/azure-monitor/app/create-workspace-resource#create-a-workspace-based-resource).
-  Embed Azure AppInsights into your application [Click here to know more about App Insight initialization using plain JavaScript](https://learn.microsoft.com/azure/azure-monitor/app/javascript-sdk). Alternatively, you can use NPM to get the App Insights dependencies. [Click here to know more about App Insight initialization using NPM](https://learn.microsoft.com/azure/azure-monitor/app/javascript-sdk-configuration).
-  Build a UI in your application that serves custom questions to the user and gather their input, lets assume that your application gathered responses as a string in the `improvementSuggestion` variable

-  Submit survey results to ACS and send user response using App Insights:
    ``` javascript
    currentCall.feature(SDK.Features.CallSurvey).submitSurvey(survey).then(res => {
    // `improvementSuggestion` contains custom, user response
        if (improvementSuggestion !== '') {
            appInsights.trackEvent({
                    name: "CallSurvey", properties: {
                        // Survey ID to correlate the survey
                        id: res.id,
                        // Other custom properties as key value pair
                        improvementSuggestion: improvementSuggestion
                    }
                });
         }
    });
    appInsights.flush();
    ```
User responses that were sent using AppInsights are available under your App Insights workspace. You can use [Workbooks](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/update-center/workbooks.md) to query between multiple resources, correlate call ratings and custom survey data. Steps to correlate the call ratings and custom survey data:
-  Create new [Workbooks](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/update-center/workbooks.md) (Your ACS Resource -> Monitoring -> Workbooks -> New) and query Call Survey data from your ACS resource.
-  Add new query (+Add -> Add query)
-  Make sure `Data source` is `Logs` and `Resource type` is `Communication`
-  You can rename the query (Advanced Settings -> Step name [example: call-survey])
-  Be aware that it could require a maximum of **2 hours** before the survey data becomes visible in the Azure portal. Query the call rating data-
   ```KQL
   ACSCallSurvey
   | where TimeGenerated > now(-24h)
   ```
-  Add another query to get data from App Insights (+Add -> Add query)
-  Make sure `Data source` is `Logs` and `Resource type` is `Application Insights`
-  Query the custom events-
   ```KQL
   customEvents
   | where timestamp > now(-24h)
   | where name == 'CallSurvey'
   | extend d=parse_json(customDimensions)
   | project SurveyId = d.id, ImprovementSuggestion = d.improvementSuggestion
   ```
-  You can rename the query (Advanced Settings -> Step name [example: custom-call-survey])
-  Finally merge these two queries by surveyId. Create new query (+Add -> Add query).
-  Make sure the `Data source` is Merge and select `Merge type` as needed



**Applies to: platform-android**


---
title: Azure Communication Services End of Call Survey
titleSuffix: An Azure Communication Services tutorial document
description: Learn how to use the End of Call Survey to collect user feedback.
author: viniciusl-msft
ms.author: viniciusl
manager: gaobob
services: azure-communication-services
ms.date: 7/30/2024
ms.topic: tutorial
ms.service: azure-communication-services
ms.subservice: calling
---

> **Important:**
> End of Call Survey is available starting on the version [2.10.0](https://central.sonatype.com/artifact/com.azure.android/azure-communication-calling/2.10.0) of the Android Calling SDK. Make sure to use that version or later when trying the instructions.

## Sample of API usage

The End of Call Survey feature should be used after the call ends. Users can rate any kind of VoIP call, 1:1, group, meeting, outgoing and incoming. Once a user's call ends, your application can show a UI to the end user allowing them to choose a rating score, and if needed, pick issues they’ve encountered during the call from our predefined list.

The following code snips show an example of one-to-one call. After the end of the call, your application can show a survey UI and once the user chooses a rating, your application should call the feature API to submit the survey with the user choices.

We encourage you to use the default rating scale, which is the five star rating (between 1-5). However, you can submit a survey with custom rating scale.

### Start a survey

You create a `CallSurvey` object by starting a survey. This records a survey intent. In case this particular `CallSurvey` object isn't submitted afterwards, it means that the survey was skipped or ignored by the end customer.

```java
SurveyCallFeature surveyCallFeature = call.feature(Features.SURVEY);
try {
    CallSurvey survey = surveyCallFeature.startSurvey().get();
} catch (InterruptedException | ExecutionException e) {
    // failure to start survey
}
```

### General usage

When rating calls, you must respect values defined on the scale field. The lowerBound value denotes the worst experience possible, while the upperBound value means the perfect experience. Both values are inclusive. 

OverallRating is a required category for all surveys.

> **Note:**
>A question’s indicated cutoff value in the API is the threshold that Microsoft uses when analyzing your survey data. When you customize the cutoff value or Input Range, Microsoft analyzes your survey data according to your customization.

For more information on suggested survey use, see [Survey Concepts](../concepts/voice-video-calling/end-of-call-survey-concept.md)

### Rate call only - no custom scale

```java
SurveyScore overall = new SurveyScore();
overall.setScore(5);
callSurvey.setOverallScore(overall);
```

### Rate call only - with custom scale and issues

```java
// configuring scale
CallSurveyRatingScale ratingScale = new CallSurveyRatingScale();
ratingScale.setLowerBound(0);
ratingScale.setLowerBound(1);
ratingScale.setLowScoreThreshold(0);
SurveyScore overall = new SurveyScore();
overall.setScale(ratingScale);

// setting score according to scale
overall.setScore(1);
callSurvey.setOverallScore(overall);
// reporting one or more issues
callSurvey.setCallIssues(CallIssues.HAD_TO_REJOIN);
```

### Rate overall, audio, and video with a sample issue

```java
SurveyScore overall = new SurveyScore();
overall.setScore(3);
SurveyScore audio = new SurveyScore();
audio.setScore(4);
SurveyScore video = new SurveyScore();
video.setScore(3);
callSurvey.setOverallScore(overall);
callSurvey.setAudioScore(audio);
callSurvey.setVideoScore(video);
callSurvey.setVideoIssues(VideoIssues.FREEZES);
```

### Submit Survey and handle errors the SDK can send

``` java
try {
    CallSurveyResult survey = surveyCallFeature.submitSurvey(survey).get();
} catch (InterruptedException e) {
    // Threading error
} catch (ExecutionException e) {
    Log.e("SURVEY", e.getCause().getMessage());
}
```

## Find different types of errors

### Failures while submitting survey:

The submitSurvey API can return an error in the following scenarios:

- Overall survey rating is required.

- `CallSurveyRatingScale` bounds must be within 0 and 100. LowerBound should be less than UpperBound. LowScoreThreshold should be within bounds.

- Any of the scores must respect the bounds defined by the `CallSurveyRatingScale`. All values in the `CallSurveyRatingScale` object are inclusive. Using the default scale, the score value should be between 1 and 5.

- Survey can't be submitted because of network/service error.

### Available survey tags

### Overall call

| Tag | Description |
| --- | --- |
| `CannotJoin` | Customer wasn't able to join a call |
| `CannotInvite` | Customer wasn't able to add a new participant on call |
| `HadToRejoin` | Customer left and joined again the call as a workaround for an issue |
| `CallEndedUnexpectedly` | Customer's call ended with no apparent reason |
| `OtherIssues` | Any issue that doesn't fit previous descriptions |

### Audio issues

| Tag | Description |
| --- | --- |
| `NoLocalAudio` | No Audio on the customer machine from the call, inability to hear anyone in the call |
| `NoRemoteAudio` | Missing audio from a specific participant |
| `Echo` | Echo being perceived in the call |
| `AudioNoise` | Audio received with unintended noise |
| `LowVolume` | Audio too low |
| `AudioStoppedUnexpectedly` | Audio stopped with no clear reason (e.g. no one is muted) |
| `DistortedSpeech` | A participant's voice is distorted, different from their expected voice |
| `AudioInterruption` | Customer experiences audio interruptions, voice cuts, etc. |
| `OtherIssues` | Any issue that doesn't fit previous descriptions |

###  Video issues    

| Tag | Description |
| --- | --- |
| `NoVideoReceived` | Customer doesn't receive video from a participant |
| `NoVideoSent` | Customer starts video but no one in the call is able to see it |
| `LowQuality` | Low quality video |
| `Freezes` | Video Freezes |
| `StoppedUnexpectedly` | Screen Share stops with no clear reason (e.g camera is on and video calling is on) |
| `DarkVideoReceived` | Video is being sent but participant sees only a dark box (or another single color) |
| `AudioVideoOutOfSync` | Video and Audio don't seem to be in sync |
| `OtherIssues` | Any issue that doesn't fit previous descriptions |

### Screen share issues    

| Tag | Description |
| --- | --- |
| `NoContentLocal` | Customer doesn't receive screen share from a participant that is sharing |
| `NoContentRemote` | Customer is sharing screen, but other one or more participants are unable to see it |
| `CannotPresent` | Unable to start screen share |
| `LowQuality` | Low quality on screen share video, e.g unable to read |
| `Freezes` | Screen Share freezes during presentation |
| `StoppedUnexpectedly` | Screen Share stops with no clear reason (e.g screen share wasn't stopped by customer) |
| `LargeDelay` | Perceived delay between what is being shown and what is seen |
| `OtherIssues` | Any issue that doesn't fit previous descriptions |


### Customization options

You can choose to collect each of the four API values or only the ones
you find most important. For example, you can choose to only ask
customers about their overall call experience instead of asking them
about their audio, video, and screen share experience. You can also
customize input ranges to suit your needs. The default input range is 1
to 5 for Overall Call, Audio, Video, and
Screen share. However, each API value can be customized from a minimum of
0 to maximum of 100.

   > **Note:**
   > A question’s indicated cutoff value in the API is the threshold that Microsoft uses when analyzing your survey data. When you customize the cutoff value or Input Range, Microsoft analyzes your survey data according to your customization.

## Custom questions

In addition to using the End of Call Survey API, you can create your own survey questions and incorporate them with the End of Call Survey results. 

The result payload of `SubmitSurvey` operation provides data that you can use to correlate ACS Survey data with your own custom data and storage. `CallSurveyResult` class have the `SurveyId` field that denotes a unique identifier for the survey and `CallId` denotes an identifier for the call where the survey was generated. Saving these identifiers along with your customized data allow data to be associated uniquely.




**Applies to: platform-ios**


> **Important:**
> End of Call Survey is available starting on the version [2.10.0](https://github.com/Azure/Communication/releases/tag/v2.12.0) of the iOS Calling SDK. Make sure to use that version or later when trying the instructions.

## Sample of API usage

The End of Call Survey feature should be used after the call ends. Users can rate any kind of VoIP call, 1:1, group, meeting, outgoing and incoming. Once a user's call ends, your application can show a UI to the end user allowing them to choose a rating score, and if needed, pick issues they’ve encountered during the call from our predefined list.

The following code snips show an example of one-to-one call. After the end of the call, your application can show a survey UI and once the user chooses a rating, your application should call the feature API to submit the survey with the user choices.

We encourage you to use the default rating scale, which is the five star rating (between 1-5). However, you can submit a survey with custom rating scale.

### Start a survey

You create a `CallSurvey` object by starting a survey. This records a survey intent. In case this particular `CallSurvey` object isn't submitted afterwards, it means that the survey was skipped or ignored by the end customer.

```swift
var surveyCallFeature = self.call.feature(Features.survey)
do {
    try self.callSurvey = await surveyFeature.startSurvey()
} catch {
    print("Failure to start survey")
}
```

### General usage

When rating calls, you must respect values defined on the scale field. The lowerBound value denotes the worst experience possible, while the upperBound value means the perfect experience. Both values are inclusive. 

OverallRating is a required category for all surveys.

For more information on suggested survey use, see [Survey Concepts](../concepts/voice-video-calling/end-of-call-survey-concept.md)

> **Note:**
>A question’s indicated cutoff value in the API is the threshold that Microsoft uses when analyzing your survey data. When you customize the cutoff value or Input Range, Microsoft analyzes your survey data according to your customization.

### Rate call only - no custom scale

```swift
let overallScore = SurveyScore()
overallScore.score = Int32(5)
callSurvey.overallScore = overallScore
```

### Rate call only - with custom scale and issues

```java
// configuring scale
var ratingScale = new CallSurveyRatingScale()
ratingScale.lowerBound = 0;
ratingScale.upperBound = 1;
ratingScale.lowScoreThreshold = 0;
SurveyScore overall = new SurveyScore();
overall.scale = ratingScale;
// setting score according to scale
overall.score = 1;

callSurvey.overallScore = overall;

// reporting one or more issues
callSurvey.callIssues = [ CallIssues.hadToRejoin ];
```

### Rate overall, audio, and video with a sample issue

```swift
let overall = SurveyScore();
overall.score  = 3;

let audio = SurveyScore();
audio.score = 4;

let video = SurveyScore();
video.score = 3;

callSurvey.overallScore = overall;
callSurvey.audioScore = audio;
callSurvey.videoScore = video;
callSurvey.videoIssues = [ VideoIssues.freezes ];
```

### Submit Survey and handle errors the SDK can send

```swift
do {
    var result =  try await self.surveyFeature!.submit(survey: callSurvey)
} catch let error as NSError {
    print("==> Survey Not Submitted " + error.localizedDescription)
}
```

## Find different types of errors

### Failures while submitting survey:

The submitSurvey API can return an error in the following scenarios:

- Overall survey rating is required.

- `CallSurveyRatingScale` bounds must be within 0 and 100. LowerBound should be less than UpperBound. LowScoreThreshold should be within bounds.

- Any of the scores must respect the bounds defined by the `CallSurveyRatingScale`. All values in the `CallSurveyRatingScale` object are inclusive. Using the default scale, the score value should be between 1 and 5.

- Survey can't be submitted because of network/service error.

### Available Survey tags

### Overall Call

| Tag | Description |
| --- | --- |
| `CannotJoin` | Customer wasn't able to join a call |
| `CannotInvite` | Customer wasn't able to add a new participant on call |
| `HadToRejoin` | Customer left and joined again the call as a workaround for an issue |
| `CallEndedUnexpectedly` | Customer's call ended with no apparent reason |
| `OtherIssues` | Any issue that does not fit previous descriptions |

### Audio issues

| Tag | Description |
| --- | --- |
| `NoLocalAudio` | No Audio on the customer machine from the call, inability to hear anyone in the call |
| `NoRemoteAudio` | Missing audio from a specific participant |
| `Echo` | Echo being perceived in the call |
| `AudioNoise` | Audio received with unintended noise |
| `LowVolume` | Audio too low |
| `AudioStoppedUnexpectedly` | Audio stopped with no clear reason (e.g. no one is muted) |
| `DistortedSpeech` | A participant's voice is distorted, different from their expected voice |
| `AudioInterruption` | Customer experiences audio interruptions, voice cuts, etc. |
| `OtherIssues` | Any issue that does not fit previous descriptions |

###  Video issues

| Tag | Description |
| --- | --- |
| `NoVideoReceived` | Customer doesn't receive video from a participant |
| `NoVideoSent` | Customer starts video but no one in the call is able to see it |
| `LowQuality` | Low quality video |
| `Freezes` | Video Freezes |
| `StoppedUnexpectedly` | Screen Share stops with no clear reason (e.g camera is on and video calling is on) |
| `DarkVideoReceived` | Video is being sent but participant sees only a dark box (or another single color) |
| `AudioVideoOutOfSync` | Video and Audio do not seem to be in sync |
| `OtherIssues` | Any issue that does not fit previous descriptions |

### Screen share issues    
| Tag | Description |
| --- | --- |
| `NoContentLocal` | Customer doesn't receive screen share from a participant that is sharing |
| `NoContentRemote` | Customer is sharing screen, but other one or more participants are unable to see it |
| `CannotPresent` | Unable to start screen share |
| `LowQuality` | Low quality on screen share video, e.g unable to read |
| `Freezes` | Screen Share freezes during presentation |
| `StoppedUnexpectedly` | Screen Share stops with no clear reason (e.g screen share was not stopped by customer) |
| `LargeDelay` | Perceived delay between what is being shown and what is seen |
| `OtherIssues` | Any issue that does not fit previous descriptions |


### Customization options

You can choose to collect each of the four API values or only the ones
you find most important. For example, you can choose to only ask
customers about their overall call experience instead of asking them
about their audio, video, and screen share experience. You can also
customize input ranges to suit your needs. The default input range is 1
to 5 for Overall Call, Audio, Video, and
Screen share. However, each API value can be customized from a minimum of
0 to maximum of 100.

   > **Note:**
   > A question’s indicated cutoff value in the API is the threshold that Microsoft uses when analyzing your survey data. When you customize the cutoff value or Input Range, Microsoft analyzes your survey data according to your customization.

## Custom questions

In addition to using the End of Call Survey API, you can create your own survey questions and incorporate them with the End of Call Survey results. 

However, the result payload of `SubmitSurvey` operation provides data that you can use to correlate ACS Survey data with your own custom data and storage. `CallSurveyResult` class have the `SurveyId` field that denotes a unique identifier for the survey and `CallId` denotes an identifier for the call where the survey was generated. Saving these identifiers along with your customized data allows data to be associated uniquely.




**Applies to: platform-windows**


> **Important:**
> End of Call Survey is available starting on the version [1.8.0](https://www.nuget.org/packages/Azure.Communication.Calling.WindowsClient/1.8.0) of the Windows Calling SDK. Make sure to use that version or later when trying the instructions.

## Sample of API usage

The End of Call Survey feature should be used after the call ends. Users can rate any kind of VoIP call, 1:1, group, meeting, outgoing and incoming. Once a user's call ends, your application can show a UI to the end user allowing them to choose a rating score, and if needed, pick issues they’ve encountered during the call from our predefined list.

The following code snips show an example of one-to-one call. After the end of the call, your application can show a survey UI and once the user chooses a rating, your application should call the feature API to submit the survey with the user choices.

We encourage you to use the default rating scale, which is the five star rating (between 1-5). However, you can submit a survey with custom rating scale.

### Start a survey

You create a `CallSurvey` object by starting a survey. This records a survey intent. In case this particular `CallSurvey` object isn't submitted afterwards, it means that the survey was skipped or ignored by the end customer.

```csharp
var surveyCallFeature = call.Features.Survey;
var survey = await surveyCallFeature.StartSurveyAsync();
```

### General usage

When rating calls, you must respect values defined on the scale field. The lowerBound value denotes the worst experience possible, while the upperBound value means the perfect experience. Both values are inclusive. 

OverallRating is a required category for all surveys.

For more information on suggested survey use, see [Survey Concepts](../concepts/voice-video-calling/end-of-call-survey-concept.md)

> **Note:**
>A question’s indicated cutoff value in the API is the threshold that Microsoft uses when analyzing your survey data. When you customize the cutoff value or Input Range, Microsoft analyzes your survey data according to your customization.

### Rate call only - no custom scale

```csharp
survey.OverallScore = new CallSurveyScore() { Score = 5 };
```

### Rate call only - with custom scale and issues

```csharp
// configuring scale and score
survey.OverallScore = new CallSurveyScore() { 
    Scale = new CallSurveyRatingScale() { 
                LowerBound = 0,
                UpperBound = 1,
                LowScoreThreshold = 1,
            }, 
            Score = 1 
};

// reporting one or more issues
survey.OverallIssues = CallIssues.HadToRejoin;
```

### Rate overall, audio, and video with a sample issue

```csharp
survey.OverallScore = new CallSurveyScore() { 
    Score = 5 
};
survey.AudioScore = new CallSurveyScore() { 
    Score = 4
};
survey.VideoScore = new CallSurveyScore() { 
    Score = 3
};

survey.videoIssues = VideoIssues.Freezes;
```

### Submit Survey and handle errors the SDK can send

```csharp 
try
{
    CallSurveyResult result = await surveyCallFeature.SubmitSurveyAsync(survey);
    Console.WriteLine("Survey submitted" + result.SurveyId);
} catch (Exception ex)
{
   Console.WriteLine(ex.Message);
}
```

## Find different types of errors

### Failures while submitting survey:

The submitSurvey API can return an error in the following scenarios:

- Overall survey rating is required.

- `CallSurveyRatingScale` bounds must be within 0 and 100. LowerBound should be less than UpperBound. LowScoreThreshold should be within bounds.

- Any of the scores must respect the bounds defined by the `CallSurveyRatingScale`. All values in the `CallSurveyRatingScale` object are inclusive. Using the default scale, the score value should be between 1 and 5.

- Survey can't be submitted because of network/service error.

### Available Survey tags

### Overall Call

| Tag | Description |
| --- | --- |
| `CannotJoin` | Customer wasn't able to join a call |
| `CannotInvite` | Customer wasn't able to add a new participant on call |
| `HadToRejoin` | Customer left and joined again the call as a workaround for an issue |
| `EndedUnexpectedly` | Customer's call ended with no apparent reason |
| `OtherIssues` | Any issue that doesn't fit previous descriptions |

### Audio Issues

| Tag | Description |
| --- | --- |
| `NoLocalAudio` | No Audio on the customer machine from the call, inability to hear anyone in the call |
| `NoRemoteAudio` | Missing audio from a specific participant |
| `Echo` | Echo being perceived in the call |
| `AudioNoise` | Audio received with unintended noise |
| `LowVolume` | Audio too low |
| `AudioStoppedUnexpectedly` | Audio stopped with no clear reason (e.g. no one is muted) |
| `DistortedSpeech` | A participant's voice is distorted, different from their expected voice |
| `AudioInterruption` | Customer experiences audio interruptions, voice cuts, etc. |
| `OtherIssues` | Any issue that doesn't fit previous descriptions |

###  Video Issues    

| Tag | Description |
| --- | --- |
| `NoVideoReceived` | Customer doesn't receive video from a participant |
| `NoVideoSent` | Customer starts video but no one in the call is able to see it |
| `LowQuality` | Low quality video |
| `Freezes` | Video Freezes |
| `StoppedUnexpectedly` | Screen Share stops with no clear reason (e.g camera is on and video calling is on) |
| `DarkVideoReceived` | Video is being sent but participant sees only a dark box (or another single color) |
| `AudioVideoOutOfSync` | Video and Audio do not seem to be in sync |
| `OtherIssues` | Any issue that doesn't fit previous descriptions |

### Screen share Issues    

| Tag | Description |
| --- | --- |
| `NoContentLocal` | Customer doesn't receive screen share from a participant that is sharing |
| `NoContentRemote` | Customer is sharing screen, but other one or more participants are unable to see it |
| `CannotPresent` | Unable to start screen share |
| `LowQuality` | Low quality on screen share video, e.g unable to read |
| `Freezes` | Screen Share freezes during presentation |
| `StoppedUnexpectedly` | Screen Share stops with no clear reason (e.g screen share wasn't stopped by customer) |
| `LargeDelay` | Perceived delay between what is being shown and what is seen |
| `OtherIssues` | Any issue that doesn't fit previous descriptions |

### Customization options

You can choose to collect each of the four API values or only the ones
you find most important. For example, you can choose to only ask
customers about their overall call experience instead of asking them
about their audio, video, and screen share experience. You can also
customize input ranges to suit your needs. The default input range is 1
to 5 for Overall Call, Audio, Video, and
Screen share. However, each API value can be customized from a minimum of
0 to maximum of 100.

   > **Note:**
   > A question’s indicated cutoff value in the API is the threshold that Microsoft uses when analyzing your survey data. When you customize the cutoff value or Input Range, Microsoft analyzes your survey data according to your customization.

## Custom questions

In addition to using the End of Call Survey API, you can create your own survey questions and incorporate them with the End of Call Survey results. 

However, the result payload of `SubmitSurvey` operation provides data that you can use to correlate ACS Survey data with your own custom data and storage. `CallSurveyResult` class have the `SurveyId` field that denotes a unique identifier for the survey and `CallId` denotes an identifier for the call where the survey was generated. Saving these identifiers along with your customized data allow data to be associated uniquely.



## Collect survey data

> **Important:**
> You must enable a Diagnostic Setting in Azure Monitor to send the log data of your surveys to a Log Analytics workspace, Event Hubs, or an Azure storage account to receive and analyze your survey data. If you do not send survey data to one of these options your survey data will not be stored and will be lost. To enable these logs for your Communications Services, see: [End of Call Survey Logs](../concepts/analytics/logs/end-of-call-survey-logs.md)

### View survey data with a Log Analytics workspace

You need to enable a Log Analytics Workspace to both store the log data of your surveys and access survey results. To enable these logs for your Communications Service, see: [End of Call Survey Logs](../concepts/analytics/logs/end-of-call-survey-logs.md).

- You can also integrate your Log Analytics workspace with Power BI, see: [Integrate Log Analytics with Power BI](https://learn.microsoft.com/azure/azure-monitor/logs/log-powerbi).

## Best practices
Here are our recommended survey flows and suggested question prompts for consideration. Your development can use our recommendation or use customized question prompts and flows for your visual interface.

**Question 1:** How did the users perceive their overall call quality experience?
We recommend you start the survey by only asking about the participants’ overall quality. If you separate the first and second questions, it helps to only collect responses to Audio, Video, and Screen Share issues if a survey participant indicates they experienced call quality issues.


- Suggested prompt: “How was the call quality?”
- API Question Values: Overall Call

**Question 2:** Did the user perceive any Audio, Video, or Screen Sharing issues in the call?
If a survey participant responded to Question 1 with a score at or below the cutoff value for the overall call, then present the second question.

- Suggested prompt: “What could have been better?”
- API Question Values: Audio, Video, and Screenshare

### Surveying Guidelines
- Avoid survey burnout, don’t survey all call participants.
- The order of your questions matters. We recommend you randomize the sequence of optional tags in Question 2 in case respondents focus most of their feedback on the first prompt they visually see.
- Consider using surveys for separate Azure Communication Services Resources in controlled experiments to identify release impacts.


## Next steps

- Analyze your survey data, see: [End of Call Survey Logs](../concepts/analytics/logs/end-of-call-survey-logs.md)

- Learn more about the End of Call Survey, see: [End of Call Survey overview](../concepts/voice-video-calling/end-of-call-survey-concept.md)

- Learn how to use the Log Analytics workspace, see: [Log Analytics Tutorial](https://learn.microsoft.com/azure/azure-monitor/logs/log-analytics-tutorial)

- Create your own queries in Log Analytics, see: [Get Started Queries](https://learn.microsoft.com/azure/azure-monitor/logs/get-started-queries)
