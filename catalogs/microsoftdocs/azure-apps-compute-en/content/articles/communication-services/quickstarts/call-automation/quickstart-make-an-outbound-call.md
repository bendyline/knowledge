---
title: Quickstart - Make an outbound call using Call Automation
titleSuffix: An Azure Communication Services quickstart
description: In this quickstart, you learn how to make an outbound PSTN call using Azure Communication Services using Call Automation
author: anujbh
ms.author: anujbh
ms.date: 06/19/2023
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: call-automation
ms.custom: mode-other, devx-track-extended-java, devx-track-js, devx-track-python
zone_pivot_groups: acs-js-csharp-java-python
---

# Quickstart: Make an outbound call using Call Automation


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Azure Communication Services Call Automation APIs are a powerful way to create interactive calling experiences. In this quick start, we cover a way to make an outbound call and recognize various events in the call.

**Applies to: programming-language-csharp**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../create-communication-resource.md).
- A [phone number](../telephony/get-phone-number.md) in your Azure Communication Services resource that can make outbound calls. If you have a free subscription, you can [get a trial phone number](../telephony/get-trial-phone-number.md).
- Create and host an Azure Dev Tunnel. Instructions [here](https://learn.microsoft.com/azure/developer/dev-tunnels/get-started).
- Create and connect [Multi-service Foundry Tools to your Azure Communication Services resource](../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md).
- Create a [custom subdomain](https://learn.microsoft.com/azure/ai-services/cognitive-services-custom-subdomains) for your Azure AI services resource. 
- (Optional) A Microsoft Teams user with a phone license that is `voice` enabled. Teams phone license is required to add Teams users to the call. Learn more about Teams licenses [here](https://www.microsoft.com/microsoft-teams/compare-microsoft-teams-bundle-options).  Learn about enabling phone system with `voice` [here](https://learn.microsoft.com/microsoftteams/setting-up-your-phone-system).

## Sample code

Download or clone quickstart sample code from [GitHub](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/CallAutomation_OutboundCalling).

Navigate to `CallAutomation_OutboundCalling` folder and open the solution in a code editor.

## Setup and host your Azure DevTunnel

[Azure DevTunnels](https://learn.microsoft.com/azure/developer/dev-tunnels/overview) is an Azure service that enables you to share local web services hosted on the internet. Run the commands to connect your local development environment to the public internet. DevTunnels creates a persistent endpoint URL and which allows anonymous access. We use this endpoint to notify your application of calling events from the Azure Communication Services Call Automation service.

```bash
devtunnel create --allow-anonymous
devtunnel port create -p 8080
devtunnel host
```
Alternatively, follow instructions to set up your Azure DevTunnel in [Visual Studio](https://learn.microsoft.com/aspnet/core/test/dev-tunnels)

## Update your application configuration

Next update your `Program.cs` file with the following values:

- `acsConnectionString`: The connection string for your Azure Communication Services resource. You can find your Azure Communication Services connection string using the instructions [here](../create-communication-resource.md). 
- `callbackUriHost`: Once you have your DevTunnel host initialized, update this field with that URI.
- `acsPhonenumber`: update this field with the Azure Communication Services phone number you have acquired. This phone number should use the [E164](https://en.wikipedia.org/wiki/E.164) phone number format (e.g +18881234567)
- `targetPhonenumber`: update field with the phone number you would like your application to call. This phone number should use the [E164](https://en.wikipedia.org/wiki/E.164) phone number format (e.g +18881234567)
- `cognitiveServiceEndpoint`: update field with your Azure AI Services endpoint.
- `targetTeamsUserId`: (Optional) update field with the Microsoft Teams user Id you would like to add to the call. See [Use Graph API to get Teams user Id](../../how-tos/call-automation/teams-interop-call-automation.md#step-2-use-the-graph-api-to-get-microsoft-entra-object-id-for-teams-users-and-optionally-check-their-presence).

```csharp
// Your ACS resource connection string 
var acsConnectionString = "<ACS_CONNECTION_STRING>"; 

// Your ACS resource phone number will act as source number to start outbound call 
var acsPhonenumber = "<ACS_PHONE_NUMBER>"; 
 
// Target phone number you want to receive the call. 
var targetPhonenumber = "<TARGET_PHONE_NUMBER>";

// Base url of the app 
var callbackUriHost = "<CALLBACK_URI_HOST_WITH_PROTOCOL>"; 

// Your cognitive service endpoint 
var cognitiveServiceEndpoint = "<COGNITIVE_SERVICE_ENDPOINT>";

// (Optional) User Id of the target teams user you want to receive the call.
var targetTeamsUserId = "<TARGET_TEAMS_USER_ID>";
```

## Make an outbound call

To make the outbound call from Azure Communication Services, this sample uses the `targetPhonenumber` you defined earlier in the application to create the call using the `CreateCallAsync` API. This code will make an outbound call using the target phone number.

```csharp
PhoneNumberIdentifier target = new PhoneNumberIdentifier(targetPhonenumber);
PhoneNumberIdentifier caller = new PhoneNumberIdentifier(acsPhonenumber);
var callbackUri = new Uri(callbackUriHost + "/api/callbacks");
CallInvite callInvite = new CallInvite(target, caller);
var createCallOptions = new CreateCallOptions(callInvite, callbackUri) {
  CallIntelligenceOptions = new CallIntelligenceOptions() {
    CognitiveServicesEndpoint = new Uri(cognitiveServiceEndpoint)
  }
};
CreateCallResult createCallResult = await callAutomationClient.CreateCallAsync(createCallOptions);
```

## Handle call automation events

Earlier in our application, we registered the `callbackUriHost` to the Call Automation Service. The host indicates the endpoint the service requires to notify us of calling events that happen. We can then iterate through the events and detect specific events our application wants to understand. In the code be below we respond to the `CallConnected` event.

```csharp
app.MapPost("/api/callbacks", async (CloudEvent[] cloudEvents, ILogger < Program > logger) => {
  foreach(var cloudEvent in cloudEvents) {
    logger.LogInformation($"Event received: {JsonConvert.SerializeObject(cloudEvent)}");
    CallAutomationEventBase parsedEvent = CallAutomationEventParser.Parse(cloudEvent);
    logger.LogInformation($"{parsedEvent?.GetType().Name} parsedEvent received for call connection id: {parsedEvent?.CallConnectionId}");
    var callConnection = callAutomationClient.GetCallConnection(parsedEvent.CallConnectionId);
    var callMedia = callConnection.GetCallMedia();
    if (parsedEvent is CallConnected) {
      //Handle Call Connected Event
    }
  }
});
```

## (Optional) Add a Microsoft Teams user to the call

You can add a Microsoft Teams user to the call using the `AddParticipantAsync` method with a `MicrosoftTeamsUserIdentifier` and the Teams user's Id. You first need to complete the prerequisite step [Authorization for your Azure Communication Services Resource to enable calling to Microsoft Teams users](../../how-tos/call-automation/teams-interop-call-automation.md#step-1-authorization-for-your-azure-communication-services-resource-to-enable-calling-to-microsoft-teams-users). Optionally, you can also pass in a `SourceDisplayName` to control the text displayed in the toast notification for the Teams user.

```csharp
await callConnection.AddParticipantAsync(
    new CallInvite(new MicrosoftTeamsUserIdentifier(targetTeamsUserId))
    {
        SourceDisplayName = "Jack (Contoso Tech Support)"
    });
```

## Start recording a call

The Call Automation service also enables the capability to start recording and store recordings of voice and video calls. You can learn more about the various capabilities in the Call Recording APIs [here](../voice-video-calling/get-started-call-recording.md).

```csharp
CallLocator callLocator = new ServerCallLocator(parsedEvent.ServerCallId);
var recordingResult = await callAutomationClient.GetCallRecording().StartAsync(new StartRecordingOptions(callLocator));
recordingId = recordingResult.Value.RecordingId;
```

## Play welcome message and recognize

Using the `TextSource`, you can provide the service with the text you want synthesized and used for your welcome message. The Azure Communication Services Call Automation service plays this message upon the `CallConnected` event.

Next, we pass the text into the `CallMediaRecognizeChoiceOptions` and then call `StartRecognizingAsync`. This allows your application to recognize the option the caller chooses.

```csharp
if (parsedEvent is CallConnected callConnected) {
  logger.LogInformation($"Start Recording...");
  CallLocator callLocator = new ServerCallLocator(parsedEvent.ServerCallId);
  var recordingResult = await callAutomationClient.GetCallRecording().StartAsync(new StartRecordingOptions(callLocator));
  recordingId = recordingResult.Value.RecordingId;

  var choices = GetChoices();

  // prepare recognize tones 
  var recognizeOptions = GetMediaRecognizeChoiceOptions(mainMenu, targetPhonenumber, choices);

  // Send request to recognize tones 
  await callMedia.StartRecognizingAsync(recognizeOptions);
}

CallMediaRecognizeChoiceOptions GetMediaRecognizeChoiceOptions(string content, string targetParticipant, List < RecognitionChoice > choices, string context = "") {
  var playSource = new TextSource(content) {
    VoiceName = SpeechToTextVoice
  };

  var recognizeOptions = new CallMediaRecognizeChoiceOptions(targetParticipant: new PhoneNumberIdentifier(targetParticipant), choices) {
    InterruptCallMediaOperation = false,
      InterruptPrompt = false,
      InitialSilenceTimeout = TimeSpan.FromSeconds(10),
      Prompt = playSource,
      OperationContext = context
  };
  return recognizeOptions;
}

List < RecognitionChoice > GetChoices() {
  return new List < RecognitionChoice > {
    new RecognitionChoice("Confirm", new List < string > {
      "Confirm",
      "First",
      "One"
    }) {
      Tone = DtmfTone.One
    },
    new RecognitionChoice("Cancel", new List < string > {
      "Cancel",
      "Second",
      "Two"
    }) {
      Tone = DtmfTone.Two
    }
  };
}
```

## Handle Choice Events

Azure Communication Services Call Automation triggers the `api/callbacks` to the webhook we have setup and will notify us with the `RecognizeCompleted` event. The event gives us the ability to respond to input received and trigger an action. The application then plays a message to the caller based on the specific input received.

```csharp
if (parsedEvent is RecognizeCompleted recognizeCompleted) {
  var choiceResult = recognizeCompleted.RecognizeResult as ChoiceResult;
  var labelDetected = choiceResult?.Label;
  var phraseDetected = choiceResult?.RecognizedPhrase;

  // If choice is detected by phrase, choiceResult.RecognizedPhrase will have the phrase detected,  
  // If choice is detected using dtmf tone, phrase will be null  
  logger.LogInformation("Recognize completed successfully, labelDetected={labelDetected}, phraseDetected={phraseDetected}", labelDetected, phraseDetected);

  var textToPlay = labelDetected.Equals(ConfirmChoiceLabel, StringComparison.OrdinalIgnoreCase) ? ConfirmedText : CancelText;

  await HandlePlayAsync(callMedia, textToPlay);
}

async Task HandlePlayAsync(CallMedia callConnectionMedia, string text) {
  // Play goodbye message 
  var GoodbyePlaySource = new TextSource(text) {
    VoiceName = "en-US-NancyNeural"
  };
  await callConnectionMedia.PlayToAllAsync(GoodbyePlaySource);
}
```

## Hang up and stop recording

Finally, when we detect a condition that makes sense for us to terminate the call, we can use the `HangUpAsync` method to hang up the call.

```csharp
if ((parsedEvent is PlayCompleted) || (parsedEvent is PlayFailed))
{
    logger.LogInformation($"Stop recording and terminating call.");
    callAutomationClient.GetCallRecording().Stop(recordingId);
    await callConnection.HangUpAsync(true);
}
```

## Run the code

# [Visual Studio Code](#tab/visual-studio-code)

To run the application with VS Code, open a Terminal window and run the following command

```bash
dotnet run
```
Open `http://localhost:8080/swagger/index.html` or your dev tunnel URL in browser. The tunnel URL looks like: `<YOUR DEV TUNNEL ENDPOINT>/swagger/index.html`
# [Visual Studio](#tab/visual-studio)

Press Ctrl+F5 to run the web application without the debugger. The web browser automatically opens to a tunnel URL. The tunnel URL looks like: `<YOUR DEV TUNNEL ENDPOINT>/swagger/index.html`



**Applies to: programming-language-java**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../create-communication-resource.md).
- A [phone number](../telephony/get-phone-number.md) in your Azure Communication Services resource that can make outbound calls. If you have a free subscription, you can [get a trial phone number](../telephony/get-trial-phone-number.md).
- Create and host an Azure Dev Tunnel. Instructions [here](https://learn.microsoft.com/azure/developer/dev-tunnels/get-started).
- Create and connect [Multi-service Foundry Tools to your Azure Communication Services resource](../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md).
- Create a [custom subdomain](https://learn.microsoft.com/azure/ai-services/cognitive-services-custom-subdomains) for your Azure AI services resource. 
- [Java Development Kit (JDK) version 11 or above](https://learn.microsoft.com/azure/developer/java/fundamentals/java-jdk-install).
- [Apache Maven](https://maven.apache.org/download.cgi).
- (Optional) A Microsoft Teams user with a phone license that is `voice` enabled. Teams phone license is required to add Teams users to the call. Learn more about Teams licenses [here](https://www.microsoft.com/microsoft-teams/compare-microsoft-teams-bundle-options). For more information to enable `voice` on your phone system, see [setting up your phone system](https://learn.microsoft.com/microsoftteams/setting-up-your-phone-system).

## Sample code

Download or clone quickstart sample code from [GitHub](https://github.com/Azure-Samples/communication-services-java-quickstarts/tree/main/CallAutomation_OutboundCalling).

Navigate to `CallAutomation_OutboundCalling` folder and open the solution in a code editor.

## Setup and host your Azure DevTunnel

[Azure DevTunnels](https://learn.microsoft.com/azure/developer/dev-tunnels/overview) is an Azure service that enables you to share local web services hosted on the internet. Run the DevTunnel commands to connect your local development environment to the public internet. DevTunnels then creates a tunnel with a persistent endpoint URL and which allows anonymous access. Azure Communication Services uses this endpoint to notify your application of calling events from the Azure Communication Services Call Automation service.

```bash
devtunnel create --allow-anonymous
devtunnel port create -p MY_SPRINGAPP_PORT
devtunnel host
```

## Update your application configuration

Then open the `application.yml` file in the `/resources` folder to configure the following values:

- `connectionstring`: The connection string for your Azure Communication Services resource. You can find your Azure Communication Services connection string using the instructions [here](../create-communication-resource.md). 
- `basecallbackuri`: Once you have your DevTunnel host initialized, update this field with that URI.
- `callerphonenumber`: update this field with the Azure Communication Services phone number you have acquired. This phone number should use the [E164](https://en.wikipedia.org/wiki/E.164) phone number format (e.g +18881234567)
- `targetphonenumber`: update field with the phone number you would like your application to call. This phone number should use the [E164](https://en.wikipedia.org/wiki/E.164) phone number format (e.g +18881234567)
- `cognitiveServiceEndpoint`: update field with your Azure AI Services endpoint.
- `targetTeamsUserId`: (Optional) update field with the Microsoft Teams user Id you would like to add to the call. See [Use Graph API to get Teams user Id](../../how-tos/call-automation/teams-interop-call-automation.md#step-2-use-the-graph-api-to-get-microsoft-entra-object-id-for-teams-users-and-optionally-check-their-presence).

```yaml
acs:
  connectionstring: <YOUR ACS CONNECTION STRING> 
  basecallbackuri: <YOUR DEV TUNNEL ENDPOINT> 
  callerphonenumber: <YOUR ACS PHONE NUMBER ex. "+1425XXXAAAA"> 
  targetphonenumber: <YOUR TARGET PHONE NUMBER ex. "+1425XXXAAAA"> 
  cognitiveServiceEndpoint: <YOUR COGNITIVE SERVICE ENDPOINT>
  targetTeamsUserId: <(OPTIONAL) YOUR TARGET TEAMS USER ID ex. "00aa00aa-bb11-cc22-dd33-44ee44ee44ee">
```


## Make an outbound call and play media

To make the outbound call from Azure Communication Services, this sample uses the `targetphonenumber` you defined in the `application.yml` file to create the call using the `createCallWithResponse` API.

```java
PhoneNumberIdentifier caller = new PhoneNumberIdentifier(appConfig.getCallerphonenumber());
PhoneNumberIdentifier target = new PhoneNumberIdentifier(appConfig.getTargetphonenumber());
CallInvite callInvite = new CallInvite(target, caller);
CreateCallOptions createCallOptions = new CreateCallOptions(callInvite, appConfig.getCallBackUri());
CallIntelligenceOptions callIntelligenceOptions = new CallIntelligenceOptions().setCognitiveServicesEndpoint(appConfig.getCognitiveServiceEndpoint());
createCallOptions = createCallOptions.setCallIntelligenceOptions(callIntelligenceOptions);
Response<CreateCallResult> result = client.createCallWithResponse(createCallOptions, Context.NONE);
```

## (Optional) Add a Microsoft Teams user to the call

You can add a Microsoft Teams user to the call using the `addParticipant` method with a `MicrosoftTeamsUserIdentifier` and the Teams user's Id.  You first need to complete the prerequisite step [Authorization for your Azure Communication Services Resource to enable calling to Microsoft Teams users](../../how-tos/call-automation/teams-interop-call-automation.md#step-1-authorization-for-your-azure-communication-services-resource-to-enable-calling-to-microsoft-teams-users).  Optionally, you can also pass in a `SourceDisplayName` to control the text displayed in the toast notification for the Teams user.

```java
client.getCallConnection(callConnectionId).addParticipant(
    new CallInvite(new MicrosoftTeamsUserIdentifier(targetTeamsUserId))
        .setSourceDisplayName("Jack (Contoso Tech Support)"));
```

## Start recording a call

The Call Automation service also enables the capability to start recording and store recordings of voice and video calls. You can learn more about the various capabilities in the Call Recording APIs [here](../voice-video-calling/get-started-call-recording.md).


```java
ServerCallLocator serverCallLocator = new ServerCallLocator(
    client.getCallConnection(callConnectionId)
        .getCallProperties()
        .getServerCallId());
        
StartRecordingOptions startRecordingOptions = new StartRecordingOptions(serverCallLocator);

Response<RecordingStateResult> response = client.getCallRecording()
    .startWithResponse(startRecordingOptions, Context.NONE);

recordingId = response.getValue().getRecordingId();
```

## Respond to calling events

Earlier in our application, we registered the `basecallbackuri` to the Call Automation Service. The URI indicates endpoint the service will use to notify us of calling events that happen. We can then iterate through the events and detect specific events our application wants to understand. In the code be below we respond to the `CallConnected` event.

```java
List<CallAutomationEventBase> events = CallAutomationEventParser.parseEvents(reqBody);
for (CallAutomationEventBase event : events) {
    String callConnectionId = event.getCallConnectionId();
    if (event instanceof CallConnected) {
        log.info("CallConnected event received");
    }
    else if (event instanceof RecognizeCompleted) {
        log.info("Recognize Completed event received");
    }
}
```

## Play welcome message and recognize 

Using the `TextSource`, you can provide the service with the text you want synthesized and used for your welcome message. The Azure Communication Services Call Automation service plays this message upon the `CallConnected` event. 

Next, we pass the text into the `CallMediaRecognizeChoiceOptions` and then call `StartRecognizingAsync`. This allows your application to recognize the option the caller chooses.

```java
var playSource = new TextSource().setText(content).setVoiceName("en-US-NancyNeural");

var recognizeOptions = new CallMediaRecognizeChoiceOptions(new PhoneNumberIdentifier(targetParticipant), getChoices())
  .setInterruptCallMediaOperation(false)
  .setInterruptPrompt(false)
  .setInitialSilenceTimeout(Duration.ofSeconds(10))
  .setPlayPrompt(playSource)
  .setOperationContext(context);

client.getCallConnection(callConnectionId)
  .getCallMedia()
  .startRecognizing(recognizeOptions);

private List < RecognitionChoice > getChoices() {
  var choices = Arrays.asList(
    new RecognitionChoice().setLabel(confirmLabel).setPhrases(Arrays.asList("Confirm", "First", "One")).setTone(DtmfTone.ONE),
    new RecognitionChoice().setLabel(cancelLabel).setPhrases(Arrays.asList("Cancel", "Second", "Two")).setTone(DtmfTone.TWO)
  );

  return choices;
}
```

## Handle Choice Events

Azure Communication Services Call Automation triggers the `api/callbacks` to the webhook we have setup and will notify us with the `RecognizeCompleted` event. The event gives us the ability to respond to input received and trigger an action. The application then plays a message to the caller based on the specific input received.

```java
else if (event instanceof RecognizeCompleted) {
  log.info("Recognize Completed event received");

  RecognizeCompleted acsEvent = (RecognizeCompleted) event;

  var choiceResult = (ChoiceResult) acsEvent.getRecognizeResult().get();

  String labelDetected = choiceResult.getLabel();

  String phraseDetected = choiceResult.getRecognizedPhrase();

  log.info("Recognition completed, labelDetected=" + labelDetected + ", phraseDetected=" + phraseDetected + ", context=" + event.getOperationContext());

  String textToPlay = labelDetected.equals(confirmLabel) ? confirmedText : cancelText;

  handlePlay(callConnectionId, textToPlay);
}

private void handlePlay(final String callConnectionId, String textToPlay) {
  var textPlay = new TextSource()
    .setText(textToPlay)
    .setVoiceName("en-US-NancyNeural");

  client.getCallConnection(callConnectionId)
    .getCallMedia()
    .playToAll(textPlay);
}
```

## Hang up the call

Finally, when we detect a condition that makes sense for us to terminate the call, we can use the `hangUp` method to hang up the call.

```java
client.getCallConnection(callConnectionId).hangUp(true);
```

## Run the code

Navigate to the directory containing the pom.xml file and use the following mvn commands:
- Compile the application: `mvn compile`
- Build the package: `mvn package`
- Execute the app: `mvn exec:java`



**Applies to: programming-language-javascript**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../create-communication-resource.md).
- A [phone number](../telephony/get-phone-number.md) in your Azure Communication Services resource that can make outbound calls. If you have a free subscription, you can [get a trial phone number](../telephony/get-trial-phone-number.md).
- Create and host an Azure Dev Tunnel. Instructions [here](https://learn.microsoft.com/azure/developer/dev-tunnels/get-started).
- - Create and connect [Multi-service Foundry Tools to your Azure Communication Services resource](../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md).
- Create a [custom subdomain](https://learn.microsoft.com/azure/ai-services/cognitive-services-custom-subdomains) for your Azure AI services resource. 
- [Node.js](https://nodejs.org/en/) LTS installation.
- [Visual Studio Code](https://code.visualstudio.com/download) installed.
- (Optional) A Microsoft Teams user with a phone license that is `voice` enabled. Teams phone license is required to add Teams users to the call. Learn more about Teams licenses [here](https://www.microsoft.com/microsoft-teams/compare-microsoft-teams-bundle-options). For more information to enable `voice` on your phone system, see [setting up your phone system](https://learn.microsoft.com/microsoftteams/setting-up-your-phone-system).

## Sample code

Download or clone quickstart sample code from [GitHub](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/CallAutomation_OutboundCalling).

Navigate to `CallAutomation_OutboundCalling` folder and open the solution in a code editor.

## Set up the environment

Download the sample code and navigate to the project directory and run the `npm` command that installs the necessary dependencies and set up your developer environment.

```bash
npm install
```

## Set up and host your Azure DevTunnel

[Azure DevTunnels](https://learn.microsoft.com/azure/developer/dev-tunnels/overview) is an Azure service that enables you to share local web services hosted on the internet. Use the DevTunnel CLI commands to connect your local development environment to the public internet. We use this endpoint to notify your application of calling events from the Azure Communication Services Call Automation service.

```bash
devtunnel create --allow-anonymous
devtunnel port create -p 8080
devtunnel host
```

## Update your application configuration

Then update your `.env` file with following values:

- `CONNECTION_STRING`: The connection string for your Azure Communication Services resource. You can find your Azure Communication Services connection string using the instructions [here](../create-communication-resource.md). 
- `CALLBACK_URI`: Once you have your DevTunnel host initialized, update this field with that URI.
- `TARGET_PHONE_NUMBER`: update field with the phone number you would like your application to call. This phone number should use the [E164](https://en.wikipedia.org/wiki/E.164) phone number format (e.g +18881234567)
- `ACS_RESOURCE_PHONE_NUMBER`: update this field with the Azure Communication Services phone number you have acquired. This phone number should use the [E164](https://en.wikipedia.org/wiki/E.164) phone number format (e.g +18881234567)
- `COGNITIVE_SERVICES_ENDPOINT`: update field with your Azure AI Services endpoint.
- `TARGET_TEAMS_USER_ID`: (Optional) update field with the Microsoft Teams user Id you would like to add to the call. See [Use Graph API to get Teams user Id](../../how-tos/call-automation/teams-interop-call-automation.md#step-2-use-the-graph-api-to-get-microsoft-entra-object-id-for-teams-users-and-optionally-check-their-presence).

```dosini
CONNECTION_STRING="<YOUR_CONNECTION_STRING>" 
ACS_RESOURCE_PHONE_NUMBER ="<YOUR_ACS_NUMBER>" 
TARGET_PHONE_NUMBER="<+1XXXXXXXXXX>" 
CALLBACK_URI="<VS_TUNNEL_URL>" 
COGNITIVE_SERVICES_ENDPOINT="<COGNITIVE_SERVICES_ENDPOINT>" 
TARGET_TEAMS_USER_ID="<TARGET_TEAMS_USER_ID>"
```

## Make an outbound call and play media

To make the outbound call from Azure Communication Services, you use the phone number you provided to the environment. Ensure that the phone number is in the [E164](https://en.wikipedia.org/wiki/E.164) phone number format (e.g +18881234567)

The code makes an outbound call using the target_phone_number you've provided and place an outbound call to that number: 

```typescript
const callInvite: CallInvite = {
	targetParticipant: callee,
	sourceCallIdNumber: {
		phoneNumber: process.env.ACS_RESOURCE_PHONE_NUMBER || "",
	},
};

const options: CreateCallOptions = {
	cognitiveServicesEndpoint: process.env.COGNITIVE_SERVICES_ENDPOINT
};

console.log("Placing outbound call...");
acsClient.createCall(callInvite, process.env.CALLBACK_URI + "/api/callbacks", options);
```

## (Optional) Add a Microsoft Teams user to the call

You can add a Microsoft Teams user to the call using the `addParticipant` method with the `microsoftTeamsUserId` property. You first need to complete the prerequisite step [Authorization for your Azure Communication Services Resource to enable calling to Microsoft Teams users](../../how-tos/call-automation/teams-interop-call-automation.md#step-1-authorization-for-your-azure-communication-services-resource-to-enable-calling-to-microsoft-teams-users).  Optionally, you can also pass in a `sourceDisplayName` to control the text displayed in the toast notification for the Teams user.

```typescript
await acsClient.getCallConnection(callConnectionId).addParticipant({
    targetParticipant: { microsoftTeamsUserId: process.env.TARGET_TEAMS_USER_ID },
    sourceDisplayName: "Jack (Contoso Tech Support)"
});
```

## Start recording a call

The Call Automation service also enables the capability to start recording and store recordings of voice and video calls. You can learn more about the various capabilities in the Call Recording APIs [here](../voice-video-calling/get-started-call-recording.md).

```typescript
const callLocator: CallLocator = {
    id: serverCallId,
    kind: "serverCallLocator",
};

const recordingOptions: StartRecordingOptions = {
    callLocator: callLocator,
};

const response = await acsClient.getCallRecording().start(recordingOptions);

recordingId = response.recordingId;
```


## Respond to calling events

Earlier in our application, we registered the `CALLBACK_URI` to the Call Automation Service. The URI indicates the endpoint the service uses to notify us of calling events that happen. We can then iterate through the events and detect specific events our application wants to understand. We respond to the `CallConnected` event to get notified and initiate downstream operations. Using the `TextSource`, you can provide the service with the text you want synthesized and used for your welcome message. The Azure Communication Services Call Automation service plays this message upon the `CallConnected` event. 

Next, we pass the text into the `CallMediaRecognizeChoiceOptions` and then call `StartRecognizingAsync`. This allows your application to recognize the option the caller chooses.

```typescript
callConnectionId = eventData.callConnectionId;
serverCallId = eventData.serverCallId;
console.log("Call back event received, callConnectionId=%s, serverCallId=%s, eventType=%s", callConnectionId, serverCallId, event.type);
callConnection = acsClient.getCallConnection(callConnectionId);
const callMedia = callConnection.getCallMedia();

if (event.type === "Microsoft.Communication.CallConnected") {
 	console.log("Received CallConnected event");
 	await startRecording();
	await startRecognizing(callMedia, mainMenu, "");
}

async function startRecognizing(callMedia: CallMedia, textToPlay: string, context: string) {
	const playSource: TextSource = {
 		text: textToPlay,
 		voiceName: "en-US-NancyNeural",
 		kind: "textSource"
 	};

 	const recognizeOptions: CallMediaRecognizeChoiceOptions = {
 		choices: await getChoices(),
 		interruptPrompt: false,
 		initialSilenceTimeoutInSeconds: 10,
 		playPrompt: playSource,
 		operationContext: context,
 		kind: "callMediaRecognizeChoiceOptions"
 	};

 	await callMedia.startRecognizing(callee, recognizeOptions)
 }
```

## Handle Choice Events

Azure Communication Services Call Automation triggers the `api/callbacks` to the webhook we have setup and will notify us with the `RecognizeCompleted` event. The event gives us the ability to respond to input received and trigger an action. The application then plays a message to the caller based on the specific input received.

```typescript
else if (event.type === "Microsoft.Communication.RecognizeCompleted") { 
	if(eventData.recognitionType === "choices"){ 
        	console.log("Recognition completed, event=%s, resultInformation=%s",eventData, eventData.resultInformation); 
        	var context = eventData.operationContext; 
            	const labelDetected = eventData.choiceResult.label;  
            	const phraseDetected = eventData.choiceResult.recognizedPhrase; 
            	console.log("Recognition completed, labelDetected=%s, phraseDetected=%s, context=%s", labelDetected, phraseDetected, eventData.operationContext); 
            	const textToPlay = labelDetected === confirmLabel ? confirmText : cancelText;            
            	await handlePlay(callMedia, textToPlay); 
        } 
}  
 
async function handlePlay(callConnectionMedia:CallMedia, textContent:string){ 
	const play : TextSource = { text:textContent , voiceName: "en-US-NancyNeural", kind: "textSource"} 
	await callConnectionMedia.playToAll([play]); 
} 
```

## Hang up the call

Finally, when we detect a condition that makes sense for us to terminate the call, we can use the `hangUp()` method to hang up the call.

```typescript
  await acsClient.getCallRecording().stop(recordingId);
  callConnection.hangUp(true);
```

## Run the code

To run the application, open a Terminal window and run the following command:

```bash
  npm run dev
```





**Applies to: programming-language-python**


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../create-communication-resource.md).
- A [phone number](../telephony/get-phone-number.md) in your Azure Communication Services resource that can make outbound calls. If you have a free subscription, you can [get a trial phone number](../telephony/get-trial-phone-number.md).
- Create and host an Azure Dev Tunnel. Instructions [here](https://learn.microsoft.com/azure/developer/dev-tunnels/get-started).
- Create and connect [Multi-service Foundry Tools to your Azure Communication Services resource](../../concepts/call-automation/azure-communication-services-azure-cognitive-services-integration.md).
- Create a [custom subdomain](https://learn.microsoft.com/azure/ai-services/cognitive-services-custom-subdomains) for your Azure AI services resource. 
- [Python](https://www.python.org/downloads/) 3.7+.
- (Optional) A Microsoft Teams user with a phone license that is `voice` enabled. Teams phone license is required to add Teams users to the call. Learn more about Teams licenses [here](https://www.microsoft.com/microsoft-teams/compare-microsoft-teams-bundle-options).  For more information to enable `voice` on your phone system, see [setting up your phone system](https://learn.microsoft.com/microsoftteams/setting-up-your-phone-system).

## Sample code

Download or clone quickstart sample code from [GitHub](https://github.com/Azure-Samples/communication-services-python-quickstarts/tree/main/callautomation-outboundcalling).

Navigate to `CallAutomation_OutboundCalling` folder and open the solution in a code editor.

## Set up the Python environment

Create and activate python environment and install required packages using following command. You can learn more about managing packages [here](https://code.visualstudio.com/docs/python/python-tutorial#_install-and-use-packages)

```bash
pip install -r requirements.txt
```

## Set up and host your Azure DevTunnel

[Azure DevTunnels](https://learn.microsoft.com/azure/developer/dev-tunnels/overview) is an Azure service that enables you to share local web services hosted on the internet. Use the commands to connect your local development environment to the public internet. DevTunnels creates a tunnel with a persistent endpoint URL and which allows anonymous access. We use this endpoint to notify your application of calling events from the Azure Communication Services Call Automation service.

```bash
devtunnel create --allow-anonymous
devtunnel port create -p 8080
devtunnel host
```

## Update your application configuration

Then update your `main.py` file with the following values:

- `ACS_CONNECTION_STRING`: The connection string for your Azure Communication Services resource. You can find your Azure Communication Services connection string using the instructions [here](../create-communication-resource.md). 
- `CALLBACK_URI_HOST`: Once you have your DevTunnel host initialized, update this field with that URI.
- `TARGET_PHONE_NUMBER`: update field with the phone number you would like your application to call. This phone number should use the [E164](https://en.wikipedia.org/wiki/E.164) phone number format (e.g +18881234567)
- `ACS_PHONE_NUMBER`: update this field with the Azure Communication Services phone number you have acquired. This phone number should use the [E164](https://en.wikipedia.org/wiki/E.164) phone number format (e.g +18881234567)
- `COGNITIVE_SERVICES_ENDPOINT`: update field with your Azure AI Services endpoint.
- `TARGET_TEAMS_USER_ID`: (Optional) update field with the Microsoft Teams user Id you would like to add to the call. See [Use Graph API to get Teams user Id](../../how-tos/call-automation/teams-interop-call-automation.md#step-2-use-the-graph-api-to-get-microsoft-entra-object-id-for-teams-users-and-optionally-check-their-presence).

```python
# Your ACS resource connection string 
ACS_CONNECTION_STRING = "<ACS_CONNECTION_STRING>" 

# Your ACS resource phone number will act as source number to start outbound call 
ACS_PHONE_NUMBER = "<ACS_PHONE_NUMBER>" 

# Target phone number you want to receive the call. 
TARGET_PHONE_NUMBER = "<TARGET_PHONE_NUMBER>" 

# Callback events URI to handle callback events. 
CALLBACK_URI_HOST = "<CALLBACK_URI_HOST_WITH_PROTOCOL>" 
CALLBACK_EVENTS_URI = CALLBACK_URI_HOST + "/api/callbacks" 

#Your Cognitive service endpoint 
COGNITIVE_SERVICES_ENDPOINT = "<COGNITIVE_SERVICES_ENDPOINT>" 

#(OPTIONAL) Your target Microsoft Teams user Id ex. "00aa00aa-bb11-cc22-dd33-44ee44ee44ee"
TARGET_TEAMS_USER_ID = "<TARGET_TEAMS_USER_ID>"
```

## Make an outbound call

To make the outbound call from Azure Communication Services, first you provide the phone number you want to receive the call. To make it simple, you can update the `target_phone_number` with a phone number in the [E164](https://en.wikipedia.org/wiki/E.164) phone number format (e.g +18881234567)

Make an outbound call using the target_phone_number you've provided: 

```python
target_participant = PhoneNumberIdentifier(TARGET_PHONE_NUMBER) 
source_caller = PhoneNumberIdentifier(ACS_PHONE_NUMBER) 
call_invite = CallInvite(target=target_participant, source_caller_id_number=source_caller) 
call_connection_properties = call_automation_client.create_call(call_invite, CALLBACK_EVENTS_URI, 
cognitive_services_endpoint=COGNITIVE_SERVICES_ENDPOINT) 
    app.logger.info("Created call with connection id: %s",
call_connection_properties.call_connection_id) 
return redirect("/") 
```

## (Optional) Add a Microsoft Teams user to the call

You can add a Microsoft Teams user to the call using the `add_participant` method with a `MicrosoftTeamsUserIdentifier` and the Teams user's Id. You first need to complete the prerequisite step [Authorization for your Azure Communication Services Resource to enable calling to Microsoft Teams users](../../how-tos/call-automation/teams-interop-call-automation.md#step-1-authorization-for-your-azure-communication-services-resource-to-enable-calling-to-microsoft-teams-users).  Optionally, you can also pass in a `source_display_name` to control the text displayed in the toast notification for the Teams user.

```python
call_connection_client.add_participant(target_participant = CallInvite(
    target = MicrosoftTeamsUserIdentifier(user_id=TARGET_TEAMS_USER_ID),
    source_display_name = "Jack (Contoso Tech Support)"))
```

## Start recording a call

The Call Automation service also enables the capability to start recording and store recordings of voice and video calls. You can learn more about the various capabilities in the Call Recording APIs [here](../voice-video-calling/get-started-call-recording.md).

```python
recording_properties = call_automation_client.start_recording(ServerCallLocator(event.data['serverCallId']))
recording_id = recording_properties.recording_id
```

## Respond to calling events

Earlier in our application, we registered the `CALLBACK_URI_HOST` to the Call Automation Service. The URI indicates the endpoint the service uses to notify us of calling events that happen. We can then iterate through the events and detect specific events our application wants to understand. In the code be below we respond to the `CallConnected` event.

```python
@app.route('/api/callbacks', methods=['POST'])
def callback_events_handler():
    for event_dict in request.json:
        event = CloudEvent.from_dict(event_dict)
        if event.type == "Microsoft.Communication.CallConnected":
            # Handle Call Connected Event
            ...
            return Response(status=200)
```

## Play welcome message and recognize 

Using the `TextSource`, you can provide the service with the text you want synthesized and used for your welcome message. The Azure Communication Services Call Automation service plays this message upon the `CallConnected` event. 

Next, we pass the text into the `CallMediaRecognizeChoiceOptions` and then call `StartRecognizingAsync`. This allows your application to recognize the option the caller chooses.

```python

get_media_recognize_choice_options( 
    call_connection_client=call_connection_client, 
    text_to_play=MainMenu,  
    target_participant=target_participant, 
    choices=get_choices(),context="") 

def get_media_recognize_choice_options(call_connection_client: CallConnectionClient, text_to_play: str, target_participant:str, choices: any, context: str): 
    play_source =  TextSource (text= text_to_play, voice_name= SpeechToTextVoice) 
    call_connection_client.start_recognizing_media( 
        input_type=RecognizeInputType.CHOICES, 

        target_participant=target_participant,
        choices=choices, 
        play_prompt=play_source, 
        interrupt_prompt=False, 
        initial_silence_timeout=10, 
        operation_context=context 
    ) 

def get_choices(): 
    choices = [ 
        RecognitionChoice(label = ConfirmChoiceLabel, phrases= ["Confirm", "First", "One"], tone = DtmfTone.ONE), 
        RecognitionChoice(label = CancelChoiceLabel, phrases= ["Cancel", "Second", "Two"], tone = DtmfTone.TWO) 
    ] 
return choices 
```

## Handle Choice Events

Azure Communication Services Call Automation triggers the `api/callbacks` to the webhook we have setup and will notify us with the `RecognizeCompleted` event. The event gives us the ability to respond to input received and trigger an action. The application then plays a message to the caller based on the specific input received.

```python
elif event.type == "Microsoft.Communication.RecognizeCompleted":
	app.logger.info("Recognize completed: data=%s", event.data)
if event.data['recognitionType'] == "choices":
	labelDetected = event.data['choiceResult']['label'];
phraseDetected = event.data['choiceResult']['recognizedPhrase'];
app.logger.info("Recognition completed, labelDetected=%s, phraseDetected=%s, context=%s", labelDetected, phraseDetected, event.data.get('operationContext'))
if labelDetected == ConfirmChoiceLabel:
	textToPlay = ConfirmedText
else:
	textToPlay = CancelText
handle_play(call_connection_client = call_connection_client, text_to_play = textToPlay)
def handle_play(call_connection_client: CallConnectionClient, text_to_play: str):
	play_source = TextSource(text = text_to_play, voice_name = SpeechToTextVoice)
call_connection_client.play_media_to_all(play_source)
```

## Hang up the call

Finally, when we detect a condition that makes sense for us to terminate the call, we can use the `hang_up()` method to hang up the call. Finally, we can also safely stop the call recording operation.

```python
call_automation_client.stop_recording(recording_id)
call_connection_client.hang_up(is_for_everyone=True)
```

## Run the code

# [Visual Studio Code](#tab/visual-studio-code)

To run the application with VS Code, open a Terminal window and run the following command

```bash
python main.py
```

# [Visual Studio](#tab/visual-studio)

Press Ctrl+F5 to run without the debugger.
