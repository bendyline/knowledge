---
title: Quickstart - Add emergency calling to your app
titleSuffix: An Azure Communication Services quickstart
description: In this quickstart, you learn how to add emergency calling to your app by using Azure Communication Services.
author: boris-bazilevskiy
ms.author: bobazile
ms.date: 07/20/2023
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: pstn
zone_pivot_groups: acs-plat-web-ios-android
ms.custom: mode-other, devx-track-js
---

# Quickstart: Add emergency calling


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Add emergency calling to your PSTN-enabled application by using the Azure Communication Services Calling SDK.

**Applies to: platform-web**

> **Important:**
> Azure Communication Services supports emergency calling to emergency numbers in the United States, Puerto Rico, Canada, Denmark, United Kingdom and Australia only.
>
> Azure Communication Services voice calling (PSTN) can be used to dial emergency number 911 in the United States, Puerto Rico, and Canada, to dial emergency number 112 in Denmark, to dial 000 in Australia and to dial emergency numbers 999 and 112 in the United Kingdom. Azure Communication Services doesn't currently support dialing those emergency numbers from outside those countries or regions, or dialing emergency services in other countries or regions.


## Prerequisites

- A working [Communication Services calling web app](pstn-call.md)

## Important considerations

- The capability to dial an emergency number and receive a callback might be a requirement for your application. Verify the emergency calling requirements with your legal counsel.
- Microsoft uses country/region codes according to the ISO 3166-1 alpha-2 standard.
- Supported ISO codes are US (United States), PR (Puerto Rico), CA (Canada), GB (United Kingdom), and DK (Denmark) only.
- If you don't provide the country/region ISO code to the Azure Communication Services Calling SDK, Microsoft uses the IP address to determine the country or region of the caller.

  If the IP address can't provide reliable geolocation (for example, the user is on a virtual private network), you must set the ISO code of the calling country or region by using the API in the Calling SDK.
- If users are dialing from a US territory (for example, Guam, US Virgin Islands, Northern Mariana Islands, or American Samoa), you must set the ISO code to US.
- Emergency dialing is out of scope for Azure Communication Services direct routing.
- For information about billing for the emergency service in Azure Communication Services, see the [pricing page](https://azure.microsoft.com/pricing/details/communication-services/).

## Set up a button for testing

Replace the code in *index.html* with the following snippet. It adds a new button for testing emergency calls.

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
      <button id="emergency-button" type="button">
        933 Test Call
      </button>
    </div>
    <script src="./bundle.js"></script>
  </body>
</html>
```

## Specify the country or region

Specify the ISO code of the country or region where the caller is located. For a list of supported ISO codes, see the [conceptual article about emergency calling](https://learn.microsoft.com/azure/communication-services/concepts/telephony/emergency-calling-concept).

In your *client.js* file, add the following code to retrieve the emergency button that you created in *index.html*:

```javascript
const emergencyButton = document.getElementById("emergency-button");
```

Replace your `init` function to add a field during `callAgent` creation to specify the emergency country or region:

```javascript
async function init() {
    const callClient = new CallClient();
    const tokenCredential = new AzureCommunicationTokenCredential('<USER ACCESS TOKEN with PSTN scope>');
    callAgent = await callClient.createCallAgent(tokenCredential, {
                emergencyCallOptions: {"countryCode": "<COUNTRY CODE>"}
            });
  //  callPhoneButton.disabled = false;
}
```

## Add functionality to the call button

Add functionality to your emergency call button by adding the following code to your *client.js* file. A temporary caller ID is assigned for your emergency call whether or not you provide the `alternateCallerId` parameter.

```javascript
emergencyButton.addEventListener("click", () => {
  const phoneToCall = "933";
  call = callAgent.startCall(
    [{phoneNumber: phoneToCall}]);
  // toggle button states
  hangUpPhoneButton.disabled = false;
  callPhoneButton.disabled = true;
});
```

> **Important:**
> 933 is a test call service. You can use it to test emergency calling services without interrupting live 911 emergency call services. 911 must be dialed in actual emergency situations.

## Run the app and place a call

Use `webpack-dev-server` to build and run your app. Run the following command to bundle the application host on a local web server:

```console
npx webpack-dev-server --entry ./client.js --output bundle.js --debug --devtool inline-source-map
```

Open your browser and go to `http://localhost:8080/`. The completed web app appears.

Screenshot of a completed JavaScript calling application.

You can place a call to 933 by selecting the **933 Test Call** button.



**Applies to: platform-android**

> **Important:**
> Azure Communication Services supports emergency calling to emergency numbers in the United States, Puerto Rico, Canada, Denmark, United Kingdom and Australia only.
>
> Azure Communication Services voice calling (PSTN) can be used to dial emergency number 911 in the United States, Puerto Rico, and Canada, to dial emergency number 112 in Denmark, to dial 000 in Australia and to dial emergency numbers 999 and 112 in the United Kingdom. Azure Communication Services doesn't currently support dialing those emergency numbers from outside those countries or regions, or dialing emergency services in other countries or regions.


## Prerequisites

- A working [Communication Services calling app for Android](pstn-call.md)

## Important considerations

- The capability to dial an emergency number and receive a callback might be a requirement for your application. Verify the emergency calling requirements with your legal counsel.
- Microsoft uses country/region codes according to the ISO 3166-1 alpha-2 standard.
- Supported ISO codes are US (United States), PR (Puerto Rico), CA (Canada), and GB (United Kingdom), and DK (Denmark) only.
- If you don't provide the country/region ISO code to the Azure Communication Services Calling SDK, Microsoft uses the IP address to determine the country or region of the caller.

  If the IP address can't provide reliable geolocation (for example, the user is on a virtual private network), you must set the ISO code of the calling country or region by using the API in the Calling SDK.
- If users are dialing from a US territory (for example, Guam, US Virgin Islands, Northern Mariana Islands, or American Samoa), you must set the ISO code to US.
- Emergency dialing is out of scope for Azure Communication Services direct routing.
- For information about billing for the emergency service in Azure Communication Services, see the [pricing page](https://azure.microsoft.com/pricing/details/communication-services/).

## Set up a button for testing

Replace the code in *app/src/main/res/layout/activity_main.xml* with the following snippet. It adds a new button for testing emergency calls.

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <EditText
        android:id="@+id/callee_id"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:ems="10"
        android:hint="Callee Id"
        android:inputType="textPersonName"
        android:layout_marginTop="100dp"
        android:layout_marginHorizontal="20dp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginBottom="46dp"
        android:gravity="center"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent">

        <Button
            android:id="@+id/call_button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Call" />

        <Button
            android:id="@+id/emergency_button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="933 Test Call" />
    </LinearLayout>
</androidx.constraintlayout.widget.ConstraintLayout>
```

## Specify the country or region

Specify the ISO code of the country or region where the caller is located. For a list of supported ISO codes, see the [conceptual article about emergency calling](https://learn.microsoft.com/azure/communication-services/concepts/telephony/emergency-calling-concept).

In your *MainActivity.java* file, add the following code to your `onCreate` method to retrieve the emergency button that you created in *activity_main.xml*:

```java
Button emergencyButton = findViewById(R.id.emergency_button);
emergencyButton.setOnClickListener(l->emergencyCall());
```

Modify `createAgent` to specify the emergency country or region:

```java
private void createAgent() {
    String userToken = "<User_Access_Token>";

    try {
        CommunicationTokenCredential credential = new CommunicationTokenCredential(userToken);
        EmergencyCallOptions emergencyOptions = new EmergencyCallOptions().setCountryCode("<COUNTRY CODE>");
        CallAgentOptions agentOptions = new CallAgentOptions();
        callAgent = new CallClient().createCallAgent(getApplicationContext(), credential, agentOptions).get();
    } catch (Exception ex) {
        Toast.makeText(getApplicationContext(), "Failed to create call agent.", Toast.LENGTH_SHORT).show();
    }
}
```

## Add functionality to the call button

Add functionality to your emergency call button by adding the following code to your *MainActivity.java* file. A temporary caller ID is assigned for your emergency call whether or not you provide the `alternateCallerId` parameter.

```java
private void emergencyCall() {
    String calleePhone = "933";
    StartCallOptions options = new StartCallOptions();
    ArrayList<CommunicationIdentifier> participants = new ArrayList<>();
    participants.add(new PhoneNumberIdentifier(calleePhone));
    call = agent.startCall(
            getApplicationContext(),
            participants,
            options);
}
```

> **Important:**
> 933 is a test call service. You can use it to test emergency calling services without interrupting live 911 emergency call services. 911 must be dialed in actual emergency situations.

## Run the app and place a call

Screenshot of a completed Android calling application.

You can now run the app by using the **Run App** button on the toolbar (or by selecting Shift+F10). You can place a call to 933 by selecting the **933 Test Call** button.


**Applies to: platform-ios**

> **Important:**
> Azure Communication Services supports emergency calling to emergency numbers in the United States, Puerto Rico, Canada, Denmark, United Kingdom and Australia only.
>
> Azure Communication Services voice calling (PSTN) can be used to dial emergency number 911 in the United States, Puerto Rico, and Canada, to dial emergency number 112 in Denmark, to dial 000 in Australia and to dial emergency numbers 999 and 112 in the United Kingdom. Azure Communication Services doesn't currently support dialing those emergency numbers from outside those countries or regions, or dialing emergency services in other countries or regions.


## Prerequisites

- A working [Communication Services calling app for iOS](pstn-call.md)

## Important considerations

- The capability to dial an emergency number and receive a callback might be a requirement for your application. Verify the emergency calling requirements with your legal counsel.
- Microsoft uses country/region codes according to the ISO 3166-1 alpha-2 standard.
- Supported ISO codes are US (United States), PR (Puerto Rico), CA (Canada), and GB (United Kingdom), and DK (Denmark) only.
- If you don't provide the country/region ISO code to the Azure Communication Services Calling SDK, Microsoft uses the IP address to determine the country or region of the caller.

  If the IP address can't provide reliable geolocation (for example, the user is on a virtual private network), you must set the ISO code of the calling country or region by using the API in the Calling SDK.
- If users are dialing from a US territory (for example, Guam, US Virgin Islands, Northern Mariana Islands, or American Samoa), you must set the ISO code to US.
- Emergency dialing is out of scope for Azure Communication Services direct routing.
- For information about billing for the emergency service in Azure Communication Services, see the [pricing page](https://azure.microsoft.com/pricing/details/communication-services/).

## Set up a button for testing

Replace the code for `NavigationView` in your *ContentView.swift* file with the following snippet. It adds a new button for testing emergency calls.

```swift
NavigationView {
    Form {
        Section {
            TextField("Who would you like to call?", text: $callee)
            Button(action: startCall) {
                Text("Start Call")
            }.disabled(callAgent == nil)
            Button(action: endCall) {
                Text("End Call")
            }.disabled(call == nil)
            Button (action: emergencyCall) {
              Text("933 Test Call")
            }.disabled(callAgent == nil)
            Text(status)
            Text(message)
        }
    }
    .navigationBarTitle("Emergency Calling Quickstart")
}
```

## Specify the country or region

Specify the ISO code of the country or region where the caller is located. For a list of supported ISO codes, see the [conceptual article about emergency calling](https://learn.microsoft.com/azure/communication-services/concepts/telephony/emergency-calling-concept).  

In your *ContentView.swift* file, replace your code with the following snippet in the `onAppear` method for `NavigationView`:

```swift
var userCredential: CommunicationTokenCredential?
do {
    userCredential = try CommunicationTokenCredential(token: "<USER ACCESS TOKEN>")
} catch {
    print("ERROR: It was not possible to create user credential.")
    return
}

self.callClient = CallClient()
let emergencyOptions = EmergencyCallOptions()
emergencyOptions.countryCode = "<COUNTRY CODE>"
let callAgentOptions = CallAgentOptions()
callAgentOptions.emergencyCallOptions= emergencyOptions

// Creates the call agent
self.callClient?.createCallAgent(userCredential: userCredential!, options: callAgentOptions) { (agent, error) in
    if error != nil {
        print("ERROR: It was not possible to create a call agent.")
        return
    }
    else {
        self.callAgent = agent
        print("Call agent successfully created.")
    }
}
```

## Add functionality to the call button

Add functionality to your emergency call button by adding the following code to your *ContentView.swift* file. A temporary caller ID is assigned for your emergency call whether or not you provide the `alternateCallerId` parameter.

```swift
func emergencyCall() {
        // Ask permissions
        AVAudioSession.sharedInstance().requestRecordPermission { (granted) in
            if granted {
                let startCallOptions = StartCallOptions()
                self.callAgent!.startCall(participants: [PhoneNumberIdentifier(phoneNumber: "933")], options: startCallOptions) { (call, error) in
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

> **Important:**
> 933 is a test call service. You can use it to test emergency calling services without interrupting live 911 emergency call services. 911 must be dialed in actual emergency situations.

## Run the app and place a call

Screenshot of a completed iOS calling application.

Build and run your app on the iOS simulator by selecting **Product** > **Run** or by using the &#8984;+R keyboard shortcut. You can place a call to 933 by selecting the **933 Test Call** button.


## Clean up resources

If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any resources that are associated with it. [Learn more about cleaning up resources](../create-communication-resource.md#clean-up-resources).

## Next steps

For more information, see the following articles:

- Learn about [Calling SDK capabilities](../voice-video-calling/getting-started-with-calling.md).
- Learn more about [how calling works](../../concepts/voice-video-calling/about-call-types.md).
