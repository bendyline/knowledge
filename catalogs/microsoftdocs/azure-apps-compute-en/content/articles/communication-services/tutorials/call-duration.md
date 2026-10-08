---
title: Manage the call duration events using Calling SDKs
titleSuffix: An Azure Communication Services how-to guide
description: Use Azure Communication Services Calling SDKs to handle call duration events
author: garchiro7

ms.author: jorgegarc
ms.service: azure-communication-services
ms.subservice: calling
ms.topic: how-to 
ms.date: 09/01/2024
ms.custom: template-how-to
zone_pivot_groups: acs-plat-ios-android-windows
---

# Manage call duration


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


Provides developers with the capability to programmatically trigger and track events when a call starts. Capturing the initiation of a call enables businesses to execute crucial workflows, including logging call metadata, initiating timers for duration tracking, or triggering user interface updates to reflect the real-time call status.

## Start time

The ability to use **call start time events** allows developers to capture and utilize the exact time a call is initiated. By subscribing to these events, developers gain valuable insights that can be applied in various use cases, such as performance tracking and user experience enhancements, among other uses.

### Use cases

#### Enhanced user experience
Developers can use the call start time to display call duration to users in real time, improving the user experience by providing transparency on how long the user has been in the call.

**Example:** In a video conferencing app, the UI can display an active call timer showing how long the participants have been in the meeting, increasing user engagement.

By utilizing the call start time API events, developers can build more robust, feature-rich applications that improve the user experience, ensure compliance, and support detailed performance monitoring.

#### Performance and monitoring analytics
By retrieving the call start time, developers can measure call duration and integrate with monitoring systems to analyze the performance of calls. This information is crucial for identifying call quality issues, optimizing network performance, and understanding user behavior.

**Example:** A customer support center can track how long agents stay on calls and identify trends related to call durations, improving resource management.

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- A deployed Communication Services resource. [Create a Communication Services resource](../quickstarts/create-communication-resource.md)
- A user access token to enable the calling client. For more information, see [Create and manage access tokens](../quickstarts/identity/access-tokens.md).
- Optional: Complete the quickstart to [add voice calling to your application](../quickstarts/voice-video-calling/getting-started-with-calling.md)

**Applies to: platform-android**


## Get call start time 
To retrieve the call start time, subscribe to the `addOnStartTimeUpdatedListener` on the `CommonCall` object. The start time is returned as a `Date` object, indicating when the call was bootstrapped.

``` java
CommonCall call;
PropertyChangedListener onStartTimeUpdated = this::OnStartTimeUpdated;

// subscribe to start time updated
call.addOnStartTimeUpdatedListener(onStartTimeUpdated);

// get start time
private void OnStartTimeUpdated(PropertyChangedEvent propertyChangedEvent) {
    SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    dateFormatter.setTimeZone(TimeZone.getDefault());
    String dateString = dateFormatter.format(call.getStartTime());
    // dateString with dateFormatter
}

// unsubscribe to start time updated
call.removeOnStartTimeUpdatedListener(onStartTimeUpdated);
```


**Applies to: platform-ios**


## Get call start time 
To retrieve the call start time, set the `didUpdateStartTime` on the `CallDelegate`. The start time is returned as a `Date` object, indicating when the indicating when the call was bootstrapped.

``` swift
class CallObserver : NSObject, CallDelegate
{
    // subscribe to didUpdateStartTime
    public func call(_ call: Call, didUpdateStartTime args: PropertyChangedEventArgs) {
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd HH:mm:ss"
        dateFormatter.timeZone = TimeZone.current
        let dateString = dateFormatter.string(from: call.startTime)
        print("==> didUpdateStartTime for call: \(dateString)")
    }
}

// set call delegate
call.delegate = CallObserver()
```


**Applies to: platform-windows**


## Get call start time  
To retrieve the call start time, subscribe to the `StartTimeUpdated` on the `CommonCommunicationCall` object. The start time is returned as a `DateTimeOffset` object, indicating when the call was bootstrapped.

``` cs
CommonCommunicationCall call;

// subscribe to start time updated
call.StartTimeUpdated += Call_OnStartTimeUpdated;

private async void Call_OnStartTimeUpdated(object sender, PropertyChangedEventArgs args)
{
    // call.StartTime
}

// unsubscribe to start time updated
call.StartTimeUpdated -= Call_OnStartTimeUpdated;
```


## Next steps

- [Learn how to manage calls](../how-tos/calling-sdk/manage-calls.md)
- [Learn about the UI Library](../concepts/ui-library/ui-library-overview.md)
