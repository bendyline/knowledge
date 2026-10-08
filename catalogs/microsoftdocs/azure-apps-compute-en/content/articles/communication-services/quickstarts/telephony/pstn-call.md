---
title: Quickstart - Call to a telephone number
titleSuffix: An Azure Communication Services quickstart
description: In this quickstart, you learn how to add PSTN calling capabilities to your app using Azure Communication Services.
author: nikuklic
ms.author: nikuklic
ms.date: 06/30/2021
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: pstn
zone_pivot_groups: acs-plat-web-ios-android
ms.custom: mode-other, devx-track-js
---

# Quickstart: Outbound call to a telephone number


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Get started with Azure Communication Services by using the Communication Services Calling SDK to add PSTN calling to your app.

**Applies to: platform-web**

> **Important:**
> Azure Communication Services supports emergency calling to emergency numbers in the United States, Puerto Rico, Canada, Denmark, United Kingdom and Australia only.
>
> Azure Communication Services voice calling (PSTN) can be used to dial emergency number 911 in the United States, Puerto Rico, and Canada, to dial emergency number 112 in Denmark, to dial 000 in Australia and to dial emergency numbers 999 and 112 in the United Kingdom. Azure Communication Services doesn't currently support dialing those emergency numbers from outside those countries or regions, or dialing emergency services in other countries or regions.


## Sample Code
Find the finalized code for this quickstart on [GitHub](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/add-1-on-1-phone-calling)

> **Note:** 
> Outbound calling to a telephone number can be accessed using the [Azure Communication Services UI Library](https://azure.github.io/communication-ui-library/?path=/docs/composites-callcomposite-pstn-docs--docs). The UI Library enables developers to add a call client that is PSTN enabled into their application with only a couple lines of code.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../create-communication-resource.md).
- A [phone number acquired](get-phone-number.md) in your Communication Services resource, or Azure Communication Services [Direct routing configured](../../concepts/telephony/direct-routing-provisioning.md). If you have a free subscription, you can [get a trial phone number](get-trial-phone-number.md).
- A `User Access Token` to enable the call client. For more information on [how to get a `User Access Token`](../identity/access-tokens.md)


## Set up

### Create a new Node.js application

Open your terminal or command window create a new directory for your app, and navigate to it.

```console
mkdir calling-quickstart
cd calling-quickstart
```

Run `npm init -y` to create a **package.json** file with default settings.

```console
npm init -y
```

### Install the package

Use the `npm install` command to install the Azure Communication Services Calling SDK for JavaScript.

```console
npm install @azure/communication-common --save
npm install @azure/communication-calling --save
```

The `--save` option lists the library as a dependency in your **package.json** file.

### Set up the app framework

This article uses parcel to bundle the application assets. Run the following command to install it and list it as a development dependency in your **package.json**:

```console
npm install parcel --save-dev
```

Create an **index.html** file in the root directory of your project. We use this file to configure a basic layout that enables the user to place a call.

Here's the code:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Communication Client - Calling Sample</title>
  </head>
  <body>
    <h4>Azure Communication Services</h4>
    <h1>Calling Quickstart</h1>
    <input 
      id="callee-phone-input"
      type="text"
      placeholder="Who would you like to call?"
      style="margin-bottom:1em; width: 230px;"
    />
    <div>
      <button id="call-phone-button" type="button">
        Start Call
      </button>
      &nbsp;
      <button id="hang-up-phone-button" type="button" disabled="true">
        Hang Up
      </button>
    </div>
    <script src="./app.js" type="module"></script>
  </body>
</html>
```

Create a file in the root directory of your project called **app.js** to contain the application logic for this quickstart. Add the following code to import the calling client and get references to the DOM elements so we can attach our business logic.

```javascript
import { CallClient, CallAgent } from "@azure/communication-calling";
import { AzureCommunicationTokenCredential } from '@azure/communication-common';

let call;
let callAgent;

const calleePhoneInput = document.getElementById("callee-phone-input");
const callPhoneButton = document.getElementById("call-phone-button");
const hangUpPhoneButton = document.getElementById("hang-up-phone-button");

async function init() {
    const callClient = new CallClient();
    const tokenCredential = new AzureCommunicationTokenCredential('<USER ACCESS TOKEN with VoIP scope>');
    callAgent = await callClient.createCallAgent(tokenCredential);
    //callPhoneButton.disabled = false;
}

init();
```

## Start a call to phone

Specify phone number you acquired in Communication Services resource that is used to start the call:
> **Warning:**
> Phone numbers should be provided in E.164 international standard format. (e.g.: +12223334444)

Add an event handler to initiate a call to the phone number you provided when the `callPhoneButton` is clicked:

```javascript
callPhoneButton.addEventListener("click", () => {
  // start a call to phone
  const phoneToCall = calleePhoneInput.value;
  call = callAgent.startCall(
    [{phoneNumber: phoneToCall}], { alternateCallerId: {phoneNumber: 'YOUR AZURE REGISTERED PHONE NUMBER HERE: +12223334444'}
  });
  // toggle button states
  hangUpPhoneButton.disabled = false;
  callPhoneButton.disabled = true;
});
```

## End a call to phone

Add an event listener to end the current call when the `hangUpPhoneButton` is clicked:

```javascript
hangUpPhoneButton.addEventListener("click", () => {
  // end the current call
  call.hangUp({
    forEveryone: true
  });

  // toggle button states
  hangUpPhoneButton.disabled = true;
  callPhoneButton.disabled = false;
});
```

The `forEveryone` property ends the call for all call participants.

## Run the code

Use the command `npx parcel index.html` to build and run your app.

Open your browser and navigate to `http://localhost:1234/`. You should see the following web application:

Screenshot of the completed JavaScript Application.

You can place a call to a real phone number by providing a phone number in the added text field and clicking the **Start Phone Call** button.


**Applies to: platform-android**

> **Important:**
> Azure Communication Services supports emergency calling to emergency numbers in the United States, Puerto Rico, Canada, Denmark, United Kingdom and Australia only.
>
> Azure Communication Services voice calling (PSTN) can be used to dial emergency number 911 in the United States, Puerto Rico, and Canada, to dial emergency number 112 in Denmark, to dial 000 in Australia and to dial emergency numbers 999 and 112 in the United Kingdom. Azure Communication Services doesn't currently support dialing those emergency numbers from outside those countries or regions, or dialing emergency services in other countries or regions.


## Sample Code

Find the finalized code for this quickstart on [GitHub](https://github.com/Azure-Samples/communication-services-android-quickstarts/tree/main/Add%20Telephone%20Calling)

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../create-communication-resource.md).
- A [phone number acquired](get-phone-number.md) in your Communication Services resource, or Azure Communication Services [Direct Routing configured](../../concepts/telephony/direct-routing-provisioning.md). If you have a free subscription, you can [get a trial phone number](get-trial-phone-number.md).
- A `User Access Token` to enable the call client. For more information on [how to get a `User Access Token`](../identity/access-tokens.md)
- Complete the quickstart for [getting started with adding calling to your application](../voice-video-calling/getting-started-with-calling.md)

### Prerequisite check

- To view the phone numbers associated with your Communication Services resource, sign in to the [Azure portal](https://portal.azure.com/), locate your Communication Services resource and open the **phone numbers** tab from the left navigation pane.

## Setting up

### Add PSTN functionality to your app

Add the `PhoneNumber` type to your app by modifying **MainActivity.java**:

```java
import com.azure.android.communication.common.PhoneNumberIdentifier;
```

## Start a call to phone

Specify the phone number you acquired from within your Communication Services resource. This number is used as a caller ID to start the call:

> **Warning:**
> Note that phone numbers should be provided in E.164 international standard format. (e.g.: +12223334444)

Modify `startCall()` event handler in **MainActivity.java**, so that it handles phone calls:

```java
    private void startCall() {
        EditText calleePhoneView = findViewById(R.id.callee_id);
        String calleePhone = calleePhoneView.getText().toString();
        PhoneNumberIdentifier callerPhone = new PhoneNumberIdentifier("+12223334444");
        StartCallOptions options = new StartCallOptions();
        options.setAlternateCallerId(callerPhone);
        options.setVideoOptions(new VideoOptions(null));
        call = agent.startCall(
                getApplicationContext(),
                new PhoneNumberIdentifier[] {new PhoneNumberIdentifier(calleePhone)},
                options);
    }
```

## Launch the app and call the echo bot

The app can now be launched using the "Run App" button on the toolbar (Shift+F10). To make a call, provide a phone number in the added text field and select the **CALL** button.
> **Warning:**
> Note that phone numbers should be provided in E.164 international standard format. (e.g.: +12223334444)

Screenshot showing the completed application.



**Applies to: platform-ios**

> **Important:**
> Azure Communication Services supports emergency calling to emergency numbers in the United States, Puerto Rico, Canada, Denmark, United Kingdom and Australia only.
>
> Azure Communication Services voice calling (PSTN) can be used to dial emergency number 911 in the United States, Puerto Rico, and Canada, to dial emergency number 112 in Denmark, to dial 000 in Australia and to dial emergency numbers 999 and 112 in the United Kingdom. Azure Communication Services doesn't currently support dialing those emergency numbers from outside those countries or regions, or dialing emergency services in other countries or regions.


## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- A deployed Communication Services resource. [Create a Communication Services resource](../create-communication-resource.md).
- A [phone number acquired](get-phone-number.md) in your Communication Services resource, or Azure Communication Services [Direct routing configured](../../concepts/telephony/direct-routing-provisioning.md). If you have a free subscription, you can [get a trial phone number](get-trial-phone-number.md).
- A `User Access Token` to enable the call client. For more information on [how to get a `User Access Token`](../identity/access-tokens.md)
- Complete the quickstart for [getting started with adding calling to your application](../voice-video-calling/getting-started-with-calling.md)

### Prerequisite check

- To view the phone numbers associated with your Communication Services resource, sign in to the [Azure portal](https://portal.azure.com/), locate your Communication Services resource and open the **phone numbers** tab from the left navigation pane.
- You can build and run your app with Azure Communication Services Calling SDK for iOS:

## Setting up

## Start a call to phone

Specify phone number you acquired in Communication Services resource that is used to start the call:
> **Warning:**
> Note that phone numbers should be provided in E.164 international standard format. (e.g.: +12223334444)

Modify `startCall` event handler that is performed when the *Start Call* button is tapped:

```swift
func startCall() {
        // Ask permissions
        AVAudioSession.sharedInstance().requestRecordPermission { (granted) in
            if granted {
                let startCallOptions = StartCallOptions()
                startCallOptions.alternateCallerId = PhoneNumberIdentifier(phoneNumber: "<YOUR AZURE REGISTERED PHONE NUMBER>")
                self.callAgent!.startCall(participants: [PhoneNumberIdentifier(phoneNumber: self.callee)], options: startCallOptions) { (call, error) in
                    if (error == nil) {
                        self.call = call
                    } else {
                        print("Failed to get call object")
                    }
                }
            }
        }
    }
```

## Run the code

You can build and run your app on iOS simulator by selecting **Product** > **Run** or by using the (&#8984;-R) keyboard shortcut.

Final look and feel of the quick start app

You can make a call to phone by providing a phone number in the added text field and clicking the **Start Call** button.
> **Warning:**
> Note that phone numbers should be provided in E.164 international standard format. (e.g.: +12223334444)

> **Note:**
> The first time you make a call, the system will prompt you for access to the microphone. In a production application, you should use the `AVAudioSession` API [check the permission status](https://developer.apple.com/documentation/uikit/protecting_the_user_s_privacy/requesting_access_to_protected_resources) and gracefully update your application's behavior when permission is not granted.



## Clean up resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it. Learn more about [cleaning up resources](../create-communication-resource.md#clean-up-resources).

## Next steps

For more information, see the following articles:

- Learn about [Calling SDK capabilities](../voice-video-calling/getting-started-with-calling.md)
- Learn more about [how calling works](../../concepts/voice-video-calling/about-call-types.md)
- Learn about [Number lookup capabilities](number-lookup.md)
