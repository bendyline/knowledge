---
title: Quickstart - Add voice & video calling as a Teams user to an app 
titleSuffix: An Azure Communication Services quickstart
description: In this quickstart, you'll learn how to add voice & video-calling capabilities as a Teams user to your app using Azure Communication Services.
author: sundiraman
ms.author: sundraman
ms.date: 12/1/2021
ms.topic: quickstart
ms.service: azure-communication-services
ms.subservice: teams-interop
zone_pivot_groups: acs-plat-web-ios-android-windows
ms.custom: mode-other, devx-track-js, devx-track-extended-java
---

# QuickStart: Add 1:1 video calling as a Teams user to your application


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


**Applies to: platform-web**


Get started with Azure Communication Services by using the Communication Services calling SDK to add 1:1 voice & video calling to your app. You'll learn how to start and answer a call using the Azure Communication Services Calling SDK for JavaScript.

## Sample Code

If you'd like to skip ahead to the end, you can download this quickstart as a sample on [GitHub](https://github.com/Azure-Samples/communication-services-javascript-quickstarts/tree/main/add-1-on-1-cte-video-calling).

## Prerequisites
- Obtain an Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- You need to have [Node.js 18](https://nodejs.org/dist/v18.18.0/). You can use the msi installer to install it.
- Create an active Communication Services resource. [Create a Communication Services resource](../create-communication-resource.md?pivots=platform-azp\&tabs=windows).
- Create a User Access Token to instantiate the call client. [Learn how to create and manage user access tokens](../manage-teams-identity.md?pivots=programming-language-javascript).
- Obtain Teams thread ID to for call operations using [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer). Read more about [how to create chat thread ID](https://learn.microsoft.com/graph/api/chat-post?preserve-view=true\&tabs=javascript\&view=graph-rest-1.0#example-2-create-a-group-chat).

## Setting up
### Create a new Node.js application
Open your terminal or command window create a new directory for your app, and navigate to the directory.
```console
mkdir calling-quickstart && cd calling-quickstart
```


Run `npm init -y` to create a **package.json** file with default settings.

```console
npm init -y
```
### Install the package
Use the `npm install` command to install the Azure Communication Services Calling SDK for JavaScript.
> **Important:**
> This quickstart uses the latest Azure Communication Services Calling SDK version.
```console
npm install @azure/communication-common --save
npm install @azure/communication-calling --save
```
### Set up the app framework
This quickstart uses webpack to bundle the application assets. Run the following command to install the `webpack`, `webpack-cli` and `webpack-dev-server` npm packages and list them as development dependencies in your `package.json`:

```console
npm install copy-webpack-plugin@^11.0.0 webpack@^5.88.2 webpack-cli@^5.1.4 webpack-dev-server@^4.15.1 --save-dev
```
Create an `index.html` file in the root directory of your project. We'll use this file to configure a basic layout that will allow the user to place a 1:1 video call.

Here's the code:
```html
<!-- index.html -->
<!DOCTYPE html>
<html>
    <head>
        <title>Azure Communication Services - Teams Calling Web Application</title>
    </head>
    <body>
        <h4>Azure Communication Services - Teams Calling Web Application</h4>
        <input id="user-access-token"
            type="text"
            placeholder="User access token"
            style="margin-bottom:1em; width: 500px;"/>
        <button id="initialize-teams-call-agent" type="button">Login</button>
        <br>
        <br>
        <input id="callee-teams-user-id"
            type="text"
            placeholder="Microsoft Teams callee's id (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)"
            style="margin-bottom:1em; width: 500px; display: block;"/>
        <button id="start-call-button" type="button" disabled="true">Start Call</button>
        <button id="hangup-call-button" type="button" disabled="true">Hang up Call</button>
        <button id="accept-call-button" type="button" disabled="true">Accept Call</button>
        <button id="start-video-button" type="button" disabled="true">Start Video</button>
        <button id="stop-video-button" type="button" disabled="true">Stop Video</button>
        <br>
        <br>
        <div id="connectedLabel" style="color: #13bb13;" hidden>Call is connected!</div>
        <br>
        <div id="remoteVideoContainer" style="width: 40%;" hidden>Remote participants' video streams:</div>
        <br>
        <div id="localVideoContainer" style="width: 30%;" hidden>Local video stream:</div>
        <!-- points to the bundle generated from client.js -->
        <script src="./main.js"></script>
    </body>
</html>
```

## Azure Communication Services Calling Web SDK Object model

The following classes and interfaces handle some of the main features of the Azure Communication Services Calling SDK:

| Name | Description |
| --- | --- |
| `CallClient` | The main entry point to the Calling SDK. |
| `AzureCommunicationTokenCredential` | Implements the `CommunicationTokenCredential` interface, which is used to instantiate `teamsCallAgent`. |
| `TeamsCallAgent` | Used to start and manage Teams calls. |
| `DeviceManager` | Used to manage media devices. |
| `TeamsCall` | Used for representing a Teams Call |
| `LocalVideoStream` | Used for creating a local video stream for a camera device on the local system. |
| `RemoteParticipant` | Used for representing a remote participant in the Call |
| `RemoteVideoStream` | Used for representing a remote video stream from a Remote Participant. |

Create a file in the root directory of your project called `index.js` to contain the application logic for this quickstart. Add the following code to index.js:
```JavaScript
// Make sure to install the necessary dependencies
const { CallClient, VideoStreamRenderer, LocalVideoStream } = require('@azure/communication-calling');
const { AzureCommunicationTokenCredential } = require('@azure/communication-common');
const { AzureLogger, setLogLevel } = require("@azure/logger");
// Set the log level and output
setLogLevel('verbose');
AzureLogger.log = (...args) => {
    console.log(...args);
};
// Calling web sdk objects
let teamsCallAgent;
let deviceManager;
let call;
let incomingCall;
let localVideoStream;
let localVideoStreamRenderer;
// UI widgets
let userAccessToken = document.getElementById('user-access-token');
let calleeTeamsUserId = document.getElementById('callee-teams-user-id');
let initializeCallAgentButton = document.getElementById('initialize-teams-call-agent');
let startCallButton = document.getElementById('start-call-button');
let hangUpCallButton = document.getElementById('hangup-call-button');
let acceptCallButton = document.getElementById('accept-call-button');
let startVideoButton = document.getElementById('start-video-button');
let stopVideoButton = document.getElementById('stop-video-button');
let connectedLabel = document.getElementById('connectedLabel');
let remoteVideoContainer = document.getElementById('remoteVideoContainer');
let localVideoContainer = document.getElementById('localVideoContainer');
/**
 * Create an instance of CallClient. Initialize a TeamsCallAgent instance with a CommunicationUserCredential via created CallClient. TeamsCallAgent enables us to make outgoing calls and receive incoming calls. 
 * You can then use the CallClient.getDeviceManager() API instance to get the DeviceManager.
 */
initializeCallAgentButton.onclick = async () => {
    try {
        const callClient = new CallClient(); 
        tokenCredential = new AzureCommunicationTokenCredential(userAccessToken.value.trim());
        teamsCallAgent = await callClient.createTeamsCallAgent(tokenCredential)
        // Set up a camera device to use.
        deviceManager = await callClient.getDeviceManager();
        await deviceManager.askDevicePermission({ video: true });
        await deviceManager.askDevicePermission({ audio: true });
        // Listen for an incoming call to accept.
        teamsCallAgent.on('incomingCall', async (args) => {
            try {
                incomingCall = args.incomingCall;
                acceptCallButton.disabled = false;
                startCallButton.disabled = true;
            } catch (error) {
                console.error(error);
            }
        });
        startCallButton.disabled = false;
        initializeCallAgentButton.disabled = true;
    } catch(error) {
        console.error(error);
    }
}
/**
 * Place a 1:1 outgoing video call to a user
 * Add an event listener to initiate a call when the `startCallButton` is selected.
 * Enumerate local cameras using the deviceManager `getCameraList` API.
 * In this quickstart, we're using the first camera in the collection. Once the desired camera is selected, a
 * LocalVideoStream instance will be constructed and passed within `videoOptions` as an item within the
 * localVideoStream array to the call method. When the call connects, your application will be sending a video stream to the other participant. 
 */
startCallButton.onclick = async () => {
    try {
        const localVideoStream = await createLocalVideoStream();
        const videoOptions = localVideoStream ? { localVideoStreams: [localVideoStream] } : undefined;
        call = teamsCallAgent.startCall({ microsoftTeamsUserId: calleeTeamsUserId.value.trim() }, { videoOptions: videoOptions });
        // Subscribe to the call's properties and events.
        subscribeToCall(call);
    } catch (error) {
        console.error(error);
    }
}
/**
 * Accepting an incoming call with a video
 * Add an event listener to accept a call when the `acceptCallButton` is selected.
 * You can accept incoming calls after subscribing to the `TeamsCallAgent.on('incomingCall')` event.
 * You can pass the local video stream to accept the call with the following code.
 */
acceptCallButton.onclick = async () => {
    try {
        const localVideoStream = await createLocalVideoStream();
        const videoOptions = localVideoStream ? { localVideoStreams: [localVideoStream] } : undefined;
        call = await incomingCall.accept({ videoOptions });
        // Subscribe to the call's properties and events.
        subscribeToCall(call);
    } catch (error) {
        console.error(error);
    }
}
// Subscribe to a call obj.
// Listen for property changes and collection updates.
subscribeToCall = (call) => {
    try {
        // Inspect the initial call.id value.
        console.log(`Call Id: ${call.id}`);
        //Subscribe to call's 'idChanged' event for value changes.
        call.on('idChanged', () => {
            console.log(`Call ID changed: ${call.id}`); 
        });
        // Inspect the initial call.state value.
        console.log(`Call state: ${call.state}`);
        // Subscribe to call's 'stateChanged' event for value changes.
        call.on('stateChanged', async () => {
            console.log(`Call state changed: ${call.state}`);
            if(call.state === 'Connected') {
                connectedLabel.hidden = false;
                acceptCallButton.disabled = true;
                startCallButton.disabled = true;
                hangUpCallButton.disabled = false;
                startVideoButton.disabled = false;
                stopVideoButton.disabled = false;
            } else if (call.state === 'Disconnected') {
                connectedLabel.hidden = true;
                startCallButton.disabled = false;
                hangUpCallButton.disabled = true;
                startVideoButton.disabled = true;
                stopVideoButton.disabled = true;
                console.log(`Call ended, call end reason={code=${call.callEndReason.code}, subCode=${call.callEndReason.subCode}}`);
            }   
        });
        call.on('isLocalVideoStartedChanged', () => {
            console.log(`isLocalVideoStarted changed: ${call.isLocalVideoStarted}`);
        });
        console.log(`isLocalVideoStarted: ${call.isLocalVideoStarted}`);
        call.localVideoStreams.forEach(async (lvs) => {
            localVideoStream = lvs;
            await displayLocalVideoStream();
        });
        call.on('localVideoStreamsUpdated', e => {
            e.added.forEach(async (lvs) => {
                localVideoStream = lvs;
                await displayLocalVideoStream();
            });
            e.removed.forEach(lvs => {
               removeLocalVideoStream();
            });
        });
        
        // Inspect the call's current remote participants and subscribe to them.
        call.remoteParticipants.forEach(remoteParticipant => {
            subscribeToRemoteParticipant(remoteParticipant);
        });
        // Subscribe to the call's 'remoteParticipantsUpdated' event to be
        // notified when new participants are added to the call or removed from the call.
        call.on('remoteParticipantsUpdated', e => {
            // Subscribe to new remote participants that are added to the call.
            e.added.forEach(remoteParticipant => {
                subscribeToRemoteParticipant(remoteParticipant)
            });
            // Unsubscribe from participants that are removed from the call
            e.removed.forEach(remoteParticipant => {
                console.log('Remote participant removed from the call.');
            });
        });
    } catch (error) {
        console.error(error);
    }
}
// Subscribe to a remote participant obj.
// Listen for property changes and collection updates.
subscribeToRemoteParticipant = (remoteParticipant) => {
    try {
        // Inspect the initial remoteParticipant.state value.
        console.log(`Remote participant state: ${remoteParticipant.state}`);
        // Subscribe to remoteParticipant's 'stateChanged' event for value changes.
        remoteParticipant.on('stateChanged', () => {
            console.log(`Remote participant state changed: ${remoteParticipant.state}`);
        });
        // Inspect the remoteParticipants's current videoStreams and subscribe to them.
        remoteParticipant.videoStreams.forEach(remoteVideoStream => {
            subscribeToRemoteVideoStream(remoteVideoStream)
        });
        // Subscribe to the remoteParticipant's 'videoStreamsUpdated' event to be
        // notified when the remoteParticipant adds new videoStreams and removes video streams.
        remoteParticipant.on('videoStreamsUpdated', e => {
            // Subscribe to newly added remote participant's video streams.
            e.added.forEach(remoteVideoStream => {
                subscribeToRemoteVideoStream(remoteVideoStream)
            });
            // Unsubscribe from newly removed remote participants' video streams.
            e.removed.forEach(remoteVideoStream => {
                console.log('Remote participant video stream was removed.');
            })
        });
    } catch (error) {
        console.error(error);
    }
}
/**
 * Subscribe to a remote participant's remote video stream obj.
 * You have to subscribe to the 'isAvailableChanged' event to render the remoteVideoStream. If the 'isAvailable' property
 * changes to 'true' a remote participant is sending a stream. Whenever the availability of a remote stream changes
 * you can choose to destroy the whole 'Renderer' a specific 'RendererView' or keep them. Displaying RendererView without a video stream will result in a blank video frame. 
 */
subscribeToRemoteVideoStream = async (remoteVideoStream) => {
    // Create a video stream renderer for the remote video stream.
    let videoStreamRenderer = new VideoStreamRenderer(remoteVideoStream);
    let view;
    const renderVideo = async () => {
        try {
            // Create a renderer view for the remote video stream.
            view = await videoStreamRenderer.createView();
            // Attach the renderer view to the UI.
            remoteVideoContainer.hidden = false;
            remoteVideoContainer.appendChild(view.target);
        } catch (e) {
            console.warn(`Failed to createView, reason=${e.message}, code=${e.code}`);
        }	
    }
    
    remoteVideoStream.on('isAvailableChanged', async () => {
        // Participant has switched video on.
        if (remoteVideoStream.isAvailable) {
            await renderVideo();
        // Participant has switched video off.
        } else {
            if (view) {
                view.dispose();
                view = undefined;
            }
        }
    });
    // Participant has video on initially.
    if (remoteVideoStream.isAvailable) {
        await renderVideo();
    }
}
// Start your local video stream.
// This will send your local video stream to remote participants so they can view it.
startVideoButton.onclick = async () => {
    try {
        const localVideoStream = await createLocalVideoStream();
        await call.startVideo(localVideoStream);
    } catch (error) {
        console.error(error);
    }
}
// Stop your local video stream.
// This will stop your local video stream from being sent to remote participants.
stopVideoButton.onclick = async () => {
    try {
        await call.stopVideo(localVideoStream);
    } catch (error) {
        console.error(error);
    }
}
/**
 * To render a LocalVideoStream, you need to create a new instance of VideoStreamRenderer, and then
 * create a new VideoStreamRendererView instance using the asynchronous createView() method.
 * You may then attach view.target to any UI element. 
 */
// Create a local video stream for your camera device
createLocalVideoStream = async () => {
    const camera = (await deviceManager.getCameras())[0];
    if (camera) {
        return new LocalVideoStream(camera);
    } else {
        console.error(`No camera device found on the system`);
    }
}
// Display your local video stream preview in your UI
displayLocalVideoStream = async () => {
    try {
        localVideoStreamRenderer = new VideoStreamRenderer(localVideoStream);
        const view = await localVideoStreamRenderer.createView();
        localVideoContainer.hidden = false;
        localVideoContainer.appendChild(view.target);
    } catch (error) {
        console.error(error);
    } 
}
// Remove your local video stream preview from your UI
removeLocalVideoStream = async() => {
    try {
        localVideoStreamRenderer.dispose();
        localVideoContainer.hidden = true;
    } catch (error) {
        console.error(error);
    } 
}
// End the current call
hangUpCallButton.addEventListener("click", async () => {
    // end the current call
    await call.hangUp();
});
```


## Add the webpack local server code

Create a file in the root directory of your project called **webpack.config.js** to contain the local server logic for this quickstart. Add the following code to **webpack.config.js**:
```javascript
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        static: {
            directory: path.join(__dirname, './')
        },
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                './index.html'
            ]
        }),
    ]
};
```

## Run the code
Use the `webpack-dev-server` to build and run your app. Run the following command to bundle the application host in a local webserver:

```console
`npx webpack serve --config webpack.config.js`
```
Open your browser and on two tabs navigate to http://localhost:8080/. Tabs should show the similar result like the following image:
Screenshot is showing two tabs in default view. Each tab will be used for different Teams user.

On the first tab, enter a valid user access token. On the second tab, enter another different valid user access token. Refer to the [user access token documentation](../manage-teams-identity.md) if you don't already have access tokens available to use.
On both tabs, click on the "Initialize Call Agent" buttons. Tabs should show the similar result like the following image:
Screenshot is showing steps to initialize each Teams user in the browser tab.

On the first tab, enter the Azure Communication Services user identity of the second tab, and select the "Start Call" button. The first tab will start the outgoing call to the second tab, and the second tab's "Accept Call" button becomes enabled:
Screenshot is showing experience when Teams users initialize the SDK and shows steps to start a call to second user and way how to accept the call.

From the second tab, select the "Accept Call" button. The call will be answered and connected. Tabs should show the similar result like the following image:
Screenshot is showing two tabs, with ongoing call between two Teams users, each logged in the individual tab.

Both tabs are now successfully in a 1:1 video call. Both users can hear each other's audio and see each other video stream.



**Applies to: platform-windows**


Get started with Azure Communication Services by using the Communication Services calling SDK to add 1:1 voice & video calling to your app. You learn how to start and answer a call using the Azure Communication Services Calling SDK for Windows.

## [UWP](#tab/uwp)

## Sample Code

If you'd like to skip ahead to the end, you can download this quickstart as a sample on [GitHub](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/Calling).

### Prerequisites

To complete this tutorial, you need the following prerequisites:

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Install [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) with Universal Windows Platform development workload.
- A deployed Communication Services resource. [Create a Communication Services resource](../create-communication-resource.md). You need to **record your connection string** for this quickstart.
- A [User Access Token](../manage-teams-identity.md?pivots=programming-language-csharp) for your Azure Communication Service.
- Obtain Teams thread ID to for call operations using [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer). Read more about [how to create chat thread ID](https://learn.microsoft.com/graph/api/chat-post?preserve-view=true\&tabs=javascript\&view=graph-rest-1.0#example-2-create-a-group-chat).
  
### Setting up

#### Creating the project

In Visual Studio, create a new project with the **Blank App (Universal Windows)** template to set up a single-page Universal Windows Platform (UWP) app.

Screenshot showing the New UWP Project window within Visual Studio.

#### Install the package

Right select your project and go to `Manage Nuget Packages` to install `Azure.Communication.Calling.WindowsClient` [1.2.0-beta.1](https://www.nuget.org/packages/Azure.Communication.Calling.WindowsClient/1.2.0-beta.1) or superior. Make sure Include Preleased is checked.

#### Request access

Go to `Package.appxmanifest` and select `Capabilities`.
Check `Internet (Client)` and `Internet (Client & Server)` to gain inbound and outbound access to the Internet. Check `Microphone` to access the audio feed of the microphone, and `Webcam` to access the video feed of the camera.

Screenshot showing requesting access to Internet and Microphone in Visual Studio.

#### Set up the app framework

We need to configure a basic layout to attach our logic. In order to place an outbound call, we need a `TextBox` to provide the User ID of the callee. We also need a `Start/Join call` button and a `Hang up` button. A `Mute` and a `BackgroundBlur` checkboxes are also included in this sample to demonstrate the features of toggling audio states and video effects.

Open the `MainPage.xaml` of your project and add the `Grid` node to your `Page`:

```C#
<Page
    x:Class="CallingQuickstart.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:CallingQuickstart"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    mc:Ignorable="d"
    Background="{ThemeResource ApplicationPageBackgroundThemeBrush}" Width="800" Height="600">

    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="16*"/>
            <RowDefinition Height="30*"/>
            <RowDefinition Height="200*"/>
            <RowDefinition Height="60*"/>
            <RowDefinition Height="16*"/>
        </Grid.RowDefinitions>
        <TextBox Grid.Row="1" x:Name="CalleeTextBox" PlaceholderText="Who would you like to call?" TextWrapping="Wrap" VerticalAlignment="Center" Height="30" Margin="10,10,10,10" />

        <Grid x:Name="AppTitleBar" Background="LightSeaGreen">
            <TextBlock x:Name="QuickstartTitle" Text="Calling Quickstart sample title bar" Style="{StaticResource CaptionTextBlockStyle}" Padding="7,7,0,0"/>
        </Grid>

        <Grid Grid.Row="2">
            <Grid.RowDefinitions>
                <RowDefinition/>
            </Grid.RowDefinitions>
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="*"/>
                <ColumnDefinition Width="*"/>
            </Grid.ColumnDefinitions>
            <MediaPlayerElement x:Name="LocalVideo" HorizontalAlignment="Center" Stretch="UniformToFill" Grid.Column="0" VerticalAlignment="Center" AutoPlay="True" />
            <MediaPlayerElement x:Name="RemoteVideo" HorizontalAlignment="Center" Stretch="UniformToFill" Grid.Column="1" VerticalAlignment="Center" AutoPlay="True" />
        </Grid>
        <StackPanel Grid.Row="3" Orientation="Vertical" Grid.RowSpan="2">
            <StackPanel Orientation="Horizontal">
                <Button x:Name="CallButton" Content="Start/Join call" Click="CallButton_Click" VerticalAlignment="Center" Margin="10,0,0,0" Height="40" Width="123"/>
                <Button x:Name="HangupButton" Content="Hang up" Click="HangupButton_Click" VerticalAlignment="Center" Margin="10,0,0,0" Height="40" Width="123"/>
                <CheckBox x:Name="MuteLocal" Content="Mute" Margin="10,0,0,0" Click="MuteLocal_Click" Width="74"/>
            </StackPanel>
        </StackPanel>
        <TextBox Grid.Row="5" x:Name="Stats" Text="" TextWrapping="Wrap" VerticalAlignment="Center" Height="30" Margin="0,2,0,0" BorderThickness="2" IsReadOnly="True" Foreground="LightSlateGray" />
    </Grid>
</Page>
```

Open the `MainPage.xaml.cs` and replace the content with following implementation: 
```C#
using Azure.Communication.Calling.WindowsClient;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Windows.ApplicationModel;
using Windows.ApplicationModel.Core;
using Windows.Media.Core;
using Windows.Networking.PushNotifications;
using Windows.UI;
using Windows.UI.ViewManagement;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

namespace CallingQuickstart
{
    public sealed partial class MainPage : Page
    {
        private const string authToken = "<AUTHENTICATION_TOKEN>";

        private CallClient callClient;
        private CallTokenRefreshOptions callTokenRefreshOptions = new CallTokenRefreshOptions(false);
        private TeamsCallAgent teamsCallAgent;
        private TeamsCommunicationCall teamsCall;

        private LocalOutgoingAudioStream micStream;
        private LocalOutgoingVideoStream cameraStream;

        #region Page initialization
        public MainPage()
        {
            this.InitializeComponent();
            // Additional UI customization code goes here
        }

        protected override async void OnNavigatedTo(NavigationEventArgs e)
        {
            base.OnNavigatedTo(e);
        }
        #endregion

        #region UI event handlers
        private async void CallButton_Click(object sender, RoutedEventArgs e)
        {
            // Start a call
        }

        private async void HangupButton_Click(object sender, RoutedEventArgs e)
        {
            // Hang up a call
        }

        private async void MuteLocal_Click(object sender, RoutedEventArgs e)
        {
            // Toggle mute/unmute audio state of a call
        }
        #endregion

        #region API event handlers
        private async void OnIncomingCallAsync(object sender, TeamsIncomingCallReceivedEventArgs args)
        {
            // Handle incoming call event
        }

        private async void OnStateChangedAsync(object sender, PropertyChangedEventArgs args)
        {
            // Handle connected and disconnected state change of a call
        }
        #endregion
    }
}
```

### Object model

The next table listed the classes and interfaces handle some of the major features of the Azure Communication Services Calling SDK:

| Name | Description |
| --- | --- |
| `CallClient` | The `CallClient` is the main entry point to the Calling SDK. |
| `TeamsCallAgent` | The `TeamsCallAgent` is used to start and manage calls. |
| `TeamsCommunicationCall` | The `TeamsCommunicationCall` is used to manage an ongoing call. |
| `CallTokenCredential` | The `CallTokenCredential` is used as the token credential to instantiate the `TeamsCallAgent`. |
| ` CallIdentifier` | The `CallIdentifier` is used to represent the identity of the user, which can be one of the following options: `MicrosoftTeamsUserCallIdentifier`, `UserCallIdentifier`, `PhoneNumberCallIdentifier` etc. |

### Authenticate the client

Initialize a `TeamsCallAgent` instance with a User Access Token that enables us to make and receive calls, and optionally obtain a DeviceManager instance to query for client device configurations.

In the code, replace `<AUTHENTICATION_TOKEN>` with a User Access Token. Refer to the [user access token](../manage-teams-identity.md?pivots=programming-language-csharp) documentation if you don't already have a token available.

Add `InitCallAgentAndDeviceManagerAsync` function, which bootstraps the SDK. This helper can be customized to meet the requirements of your application.

```C#
        private async Task InitCallAgentAndDeviceManagerAsync()
        {
            this.callClient = new CallClient(new CallClientOptions() {
                Diagnostics = new CallDiagnosticsOptions() { 
                    AppName = "CallingQuickstart",
                    AppVersion="1.0",
                    Tags = new[] { "Calling", "CTE", "Windows" }
                    }
                });

            // Set up local video stream using the first camera enumerated
            var deviceManager = await this.callClient.GetDeviceManagerAsync();
            var camera = deviceManager?.Cameras?.FirstOrDefault();
            var mic = deviceManager?.Microphones?.FirstOrDefault();
            micStream = new LocalOutgoingAudioStream();

            var tokenCredential = new CallTokenCredential(authToken, callTokenRefreshOptions);

            this.teamsCallAgent = await this.callClient.CreateTeamsCallAgentAsync(tokenCredential);
            this.teamsCallAgent.IncomingCallReceived += OnIncomingCallAsync;
        }
```

### Start a call

Add the implementation to the `CallButton_Click` to start various kinds of calls with the `teamsCallAgent` object we created, and hook up `RemoteParticipantsUpdated` and `StateChanged` event handlers on `TeamsCommunicationCall` object.

```C#
        private async void CallButton_Click(object sender, RoutedEventArgs e)
        {
            var callString = CalleeTextBox.Text.Trim();

            teamsCall = await StartCteCallAsync(callString);
            if (teamsCall != null)
            {
                teamsCall.StateChanged += OnStateChangedAsync;
            }
        }
```

### End a call

End the current call when the `Hang up` button is clicked. Add the implementation to the HangupButton_Click to end a call, and stop the preview and video streams.

```C#
        private async void HangupButton_Click(object sender, RoutedEventArgs e)
        {
            var teamsCall = this.teamsCallAgent?.Calls?.FirstOrDefault();
            if (teamsCall != null)
            {
                await teamsCall.HangUpAsync(new HangUpOptions() { ForEveryone = false });
            }
        }
```

### Toggle mute/unmute on audio

Mute the outgoing audio when the `Mute` button is clicked. Add the implementation to the MuteLocal_Click to mute the call.

```C#
        private async void MuteLocal_Click(object sender, RoutedEventArgs e)
        {
            var muteCheckbox = sender as CheckBox;

            if (muteCheckbox != null)
            {
                var teamsCall = this.teamsCallAgent?.Calls?.FirstOrDefault();
                if (teamsCall != null)
                {
                    if ((bool)muteCheckbox.IsChecked)
                    {
                        await teamsCall.MuteOutgoingAudioAsync();
                    }
                    else
                    {
                        await teamsCall.UnmuteOutgoingAudioAsync();
                    }
                }

                // Update the UI to reflect the state
            }
        }
```

### Start the call

Once a `StartTeamsCallOptions` object is obtained, `TeamsCallAgent` can be used to initiate the Teams call:

```C#
        private async Task<TeamsCommunicationCall> StartCteCallAsync(string cteCallee)
        {
            var options = new StartTeamsCallOptions();
            var teamsCall = await this.teamsCallAgent.StartCallAsync( new MicrosoftTeamsUserCallIdentifier(cteCallee), options);
            return call;
        }
```

### Accept an incoming call

`TeamsIncomingCallReceived` event sink is set up in the SDK bootstrap helper `InitCallAgentAndDeviceManagerAsync`.

```C#
    this.teamsCallAgent.IncomingCallReceived += OnIncomingCallAsync;
```

Application has an opportunity to configure how the incoming call should be accepted, such as video and audio stream kinds.
```C#
        private async void OnIncomingCallAsync(object sender, TeamsIncomingCallReceivedEventArgs args)
        {
            var teamsIncomingCall = args.IncomingCall;

            var acceptteamsCallOptions = new AcceptTeamsCallOptions() { };

            teamsCall = await teamsIncomingCall.AcceptAsync(acceptteamsCallOptions);
            teamsCall.StateChanged += OnStateChangedAsync;
        }
```

## Join a Teams Call

User can also join an existing call by passing a link

```c#
TeamsMeetingLinkLocator link = new TeamsMeetingLinkLocator("meetingLink");
JoinTeamsCallOptions options = new JoinTeamsCallOptions();
TeamsCall call = await teamsCallAgent.JoinAsync(link, options);
```

### Monitor and respond to call state change event

`StateChanged` event on `TeamsCommunicationCall` object is fired when an in progress call transactions from one state to another. Application is offered the opportunities to reflect the state changes on UI or insert business logics.

```C#
        private async void OnStateChangedAsync(object sender, PropertyChangedEventArgs args)
        {
            var teamsCall = sender as TeamsCommunicationCall;

            if (teamsCall != null)
            {
                var state = teamsCall.State;

                // Update the UI

                switch (state)
                {
                    case CallState.Connected:
                        {
                            await teamsCall.StartAudioAsync(micStream);

                            break;
                        }
                    case CallState.Disconnected:
                        {
                            teamsCall.StateChanged -= OnStateChangedAsync;

                            teamsCall.Dispose();

                            break;
                        }
                    default: break;
                }
            }
        }
```

### Run the code

You can build and run the code on Visual Studio. For solution platforms, we support `ARM64`, `x64` and `x86`. 

You can make an outbound call by providing a user ID in the text field and clicking the `Start Call/Join` button. Calling `8:echo123` connects you with an echo bot, this feature is great for getting started and verifying your audio devices are working.

Screenshot showing running the UWP quickstart app

## [WinUI 3](#tab/WinUI3)

## Sample Code

If you'd like to skip ahead to the end, you can download this quickstart as a sample on [GitHub](https://github.com/Azure-Samples/communication-services-dotnet-quickstarts/tree/main/CallingWinUI).

### Prerequisites

To complete this tutorial, you need the following prerequisites:

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 
- Install [Visual Studio 2022](https://visualstudio.microsoft.com/downloads/) and [Windows App SDK version 1.3](https://learn.microsoft.com/windows/apps/windows-app-sdk/stable-channel#version-13).
- Basic understanding of how to create a WinUI 3 app. [Create your first WinUI 3 (Windows App SDK) project](https://learn.microsoft.com/windows/apps/winui/winui3/create-your-first-winui3-app?pivots=winui3-packaged-csharp) is a good resource to start with.
- A deployed Communication Services resource. [Create a Communication Services resource](../create-communication-resource.md). You need to **record your connection string** for this quickstart.
- A [User Access Token](../manage-teams-identity.md?pivots=programming-language-csharp) for your Azure Communication Service.
- Obtain Teams thread ID to for call operations using [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer). Read more about [how to create chat thread ID](https://learn.microsoft.com/graph/api/chat-post?preserve-view=true\&tabs=javascript\&view=graph-rest-1.0#example-2-create-a-group-chat).
  
### Setting up

#### Creating the project

In Visual Studio, create a new project with the **Blank App, Packaged (WinUI 3 in Desktop)** template to set up a single-page WinUI 3 app.

Screenshot showing the New WinUI Project window within Visual Studio.

#### Install the package

Right select your project and go to `Manage Nuget Packages` to install `Azure.Communication.Calling.WindowsClient` [1.2.0-beta.1](https://www.nuget.org/packages/Azure.Communication.Calling.WindowsClient/1.2.0-beta.1) or superior. Make sure Include Preleased is checked.

#### Request access

Screenshot showing requesting access to Internet and Microphone in Visual Studio.

#### Set up the app framework

We need to configure a basic layout to attach our logic. In order to place an outbound call, we need a `TextBox` to provide the User ID of the callee. We also need a `Start/Join call` button and a `Hang up` button. A `Mute` and a `BackgroundBlur` checkboxes are also included in this sample to demonstrate the features of toggling audio states and video effects.

Open the `MainPage.xaml` of your project and add the `Grid` node to your `Page`:

We need to configure a basic layout to attach our logic. In order to place an outbound call, we need a `TextBox` to provide the User ID of the callee. We also need a `Start Call` button and a `Hang Up` button.
Open the `MainPage.xaml` of your project and add the `Grid` node to your `Page`:

```C#
<Page
    x:Class="CallingQuickstart.MainPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:CallingQuickstart"
    xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
    mc:Ignorable="d">
    <Grid>
        <Grid.RowDefinitions>
            <RowDefinition Height="16*"/>
            <RowDefinition Height="30*"/>
            <RowDefinition Height="200*"/>
            <RowDefinition Height="60*"/>
            <RowDefinition Height="16*"/>
        </Grid.RowDefinitions>
        <TextBox Grid.Row="1" x:Name="CalleeTextBox" PlaceholderText="Who would you like to call?" TextWrapping="Wrap" VerticalAlignment="Center" Height="30" Margin="10,10,10,10" />

        <Grid Grid.Row="2">
            <Grid.RowDefinitions>
                <RowDefinition/>
            </Grid.RowDefinitions>
            <Grid.ColumnDefinitions>
                <ColumnDefinition Width="*"/>
                <ColumnDefinition Width="*"/>
            </Grid.ColumnDefinitions>
            <MediaPlayerElement x:Name="LocalVideo" HorizontalAlignment="Center" Stretch="UniformToFill" Grid.Column="0" VerticalAlignment="Center" AutoPlay="True" />
            <MediaPlayerElement x:Name="RemoteVideo" HorizontalAlignment="Center" Stretch="UniformToFill" Grid.Column="1" VerticalAlignment="Center" AutoPlay="True" />
        </Grid>
        <StackPanel Grid.Row="3" Orientation="Vertical" Grid.RowSpan="2">
            <StackPanel Orientation="Horizontal">
                <Button x:Name="CallButton" Content="Start/Join call" Click="CallButton_Click" VerticalAlignment="Center" Margin="10,0,0,0" Height="40" Width="123"/>
                <Button x:Name="HangupButton" Content="Hang up" Click="HangupButton_Click" VerticalAlignment="Center" Margin="10,0,0,0" Height="40" Width="123"/>
                <CheckBox x:Name="MuteLocal" Content="Mute" Margin="10,0,0,0" Click="MuteLocal_Click" Width="74"/>
            </StackPanel>
        </StackPanel>
        <TextBox Grid.Row="5" x:Name="Stats" Text="" TextWrapping="Wrap" VerticalAlignment="Center" Height="30" Margin="0,2,0,0" BorderThickness="2" IsReadOnly="True" Foreground="LightSlateGray" />
    </Grid>
</Page>
```

Open the `MainPage.xaml.cs` and replace the content with following implementation: 
```C#
using Azure.Communication.Calling.WindowsClient;
using Microsoft.UI;
using Microsoft.UI.Windowing;
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Microsoft.UI.Xaml.Navigation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Windows.ApplicationModel;
using Windows.Media.Core;
using WinRT.Interop;

namespace CallingQuickstart
{
    public sealed partial class MainPage : Page
    {
        private const string authToken = "<AUTHENTICATION_TOKEN>";

        private CallClient callClient;
        private CallTokenRefreshOptions callTokenRefreshOptions = new CallTokenRefreshOptions(false);
        private TeamsCallAgent teamsCallAgent;
        private TeamsCommunicationCall teamsCall;

        private LocalOutgoingAudioStream micStream;
        private LocalOutgoingVideoStream cameraStream;

        #region Page initialization
        public MainPage()
        {
            this.InitializeComponent();
            // Additional UI customization code goes here
        }

        protected override async void OnNavigatedTo(NavigationEventArgs e)
        {
            base.OnNavigatedTo(e);
        }
        #endregion

        #region UI event handlers
        private async void CallButton_Click(object sender, RoutedEventArgs e)
        {
            // Start a call
        }

        private async void HangupButton_Click(object sender, RoutedEventArgs e)
        {
            // Hang up a call
        }

        private async void MuteLocal_Click(object sender, RoutedEventArgs e)
        {
            // Toggle mute/unmute audio state of a call
        }
        #endregion

        #region API event handlers
        private async void OnIncomingCallAsync(object sender, TeamsIncomingCallReceivedEventArgs args)
        {
            // Handle incoming call event
        }

        private async void OnStateChangedAsync(object sender, PropertyChangedEventArgs args)
        {
            // Handle connected and disconnected state change of a call
        }
        #endregion
    }
}
```

### Object model

The next table listed the classes and interfaces handle some of the major features of the Azure Communication Services Calling SDK:

| Name | Description |
| --- | --- |
| `CallClient` | The `CallClient` is the main entry point to the Calling SDK. |
| `TeamsCallAgent` | The `TeamsCallAgent` is used to start and manage calls. |
| `TeamsCommunicationCall` | The `TeamsCommunicationCall` is used to manage an ongoing call. |
| `CallTokenCredential` | The `CallTokenCredential` is used as the token credential to instantiate the `TeamsCallAgent`. |
| ` CallIdentifier` | The `CallIdentifier` is used to represent the identity of the user, which can be one of the following options: `MicrosoftTeamsUserCallIdentifier`, `UserCallIdentifier`, `PhoneNumberCallIdentifier` etc. |

### Authenticate the client

Initialize a `TeamsCallAgent` instance with a User Access Token that enables us to make and receive calls, and optionally obtain a DeviceManager instance to query for client device configurations.

In the code, replace `<AUTHENTICATION_TOKEN>` with a User Access Token. Refer to the [user access token](../manage-teams-identity.md?pivots=programming-language-csharp) documentation if you don't already have a token available.

Add `InitCallAgentAndDeviceManagerAsync` function, which bootstraps the SDK. This helper can be customized to meet the requirements of your application.

```C#
        private async Task InitCallAgentAndDeviceManagerAsync()
        {
            this.callClient = new CallClient(new CallClientOptions() {
                Diagnostics = new CallDiagnosticsOptions() { 
                    AppName = "CallingQuickstart",
                    AppVersion="1.0",
                    Tags = new[] { "Calling", "CTE", "Windows" }
                    }
                });

            // Set up local video stream using the first camera enumerated
            var deviceManager = await this.callClient.GetDeviceManagerAsync();
            var camera = deviceManager?.Cameras?.FirstOrDefault();
            var mic = deviceManager?.Microphones?.FirstOrDefault();
            micStream = new LocalOutgoingAudioStream();

            var tokenCredential = new CallTokenCredential(authToken, callTokenRefreshOptions);

            var teamsCallAgentOptions = new TeamsCallAgentOptions();

            this.teamsCallAgent = await this.callClient.CreateTeamsCallAgentAsync(tokenCredential, teamsCallAgentOptions);
            this.teamsCallAgent.IncomingCallReceived += OnIncomingCallAsync;
        }
```

### Start a call

Add the implementation to the `CallButton_Click` to start various kinds of calls with the `teamsCallAgent` object we created, and hook up `RemoteParticipantsUpdated` and `StateChanged` event handlers on `TeamsCommunicationCall` object.

```C#
        private async void CallButton_Click(object sender, RoutedEventArgs e)
        {
            var callString = CalleeTextBox.Text.Trim();

            teamsCall = await StartCteCallAsync(callString);
            if (teamsCall != null)
            {
                teamsCall.StateChanged += OnStateChangedAsync;
            }
        }
```

### End a call

End the current call when the `Hang up` button is clicked. Add the implementation to the HangupButton_Click to end a call, and stop the preview and video streams.

```C#
        private async void HangupButton_Click(object sender, RoutedEventArgs e)
        {
            var teamsCall = this.teamsCallAgent?.Calls?.FirstOrDefault();
            if (teamsCall != null)
            {
                await teamsCall.HangUpAsync(new HangUpOptions() { ForEveryone = false });
            }
        }
```

### Toggle mute/unmute on audio

Mute the outgoing audio when the `Mute` button is clicked. Add the implementation to the MuteLocal_Click to mute the call.

```C#
        private async void MuteLocal_Click(object sender, RoutedEventArgs e)
        {
            var muteCheckbox = sender as CheckBox;

            if (muteCheckbox != null)
            {
                var teamsCall = this.teamsCallAgent?.Calls?.FirstOrDefault();
                if (teamsCall != null)
                {
                    if ((bool)muteCheckbox.IsChecked)
                    {
                        await teamsCall.MuteOutgoingAudioAsync();
                    }
                    else
                    {
                        await teamsCall.UnmuteOutgoingAudioAsync();
                    }
                }

                // Update the UI to reflect the state
            }
        }
```

### Customize the call

`StartTeamsCallOptions` provides options to configure audio and video to fit the requirements of the calling scenarios.

```C#
        private StartTeamsCallOptions GetStartTeamsCallOptions()
        {
            var startTeamsCallOptions = new StartTeamsCallOptions() {
                    OutgoingAudioOptions = new OutgoingAudioOptions() { IsMuted = true, Stream = micStream  },
                    OutgoingVideoOptions = new OutgoingVideoOptions() { Streams = new OutgoingVideoStream[] { cameraStream } }
                };
            
            return startTeamsCallOptions;
        }

```
In the meeting join scenario, `JoinCallOptions` is made available to customize the audio and video calling experience.
```C#
        private JoinCallOptions GetJoinCallOptions()
        {
            return new JoinCallOptions() {
                OutgoingAudioOptions = new OutgoingAudioOptions() { IsMuted = true },
                OutgoingVideoOptions = new OutgoingVideoOptions() { Streams = new OutgoingVideoStream[] { cameraStream } }
            };
        }

```

### Start the call

Once a `StartTeamsCallOptions` object is obtained, `TeamsCallAgent` can be used to initiate the Teams call:

```C#
        private async Task<TeamsCommunicationCall> StartCteCallAsync(string cteCallee)
        {
            var options = new StartTeamsCallOptions();
            var teamsCall = await this.teamsCallAgent.StartCallAsync( new MicrosoftTeamsUserCallIdentifier(cteCallee), options);
            return teamsCall;
        }
```

### Accept an incoming call

`TeamsIncomingCallReceived` event sink is set up in the SDK bootstrap helper `InitCallAgentAndDeviceManagerAsync`.

```C#
    this.teamsCallAgent.IncomingCallReceived += OnIncomingCallAsync;
```

Application has an opportunity to configure how the incoming call should be accepted, such as video and audio stream kinds.
```C#
        private async void OnIncomingCallAsync(object sender, TeamsIncomingCallReceivedEventArgs args)
        {
            var teamsIncomingCall = args.IncomingCall;

            var acceptCallOptions = new AcceptCallOptions() { };

            teamsCall = await teamsIncomingCall.AcceptAsync(acceptCallOptions);
            teamsCall.StateChanged += OnStateChangedAsync;
        }
```

### Monitor and respond to call state change event

`StateChanged` event on `TeamsCommunicationCall` object is fired when an in progress call transactions from one state to another. Application is offered the opportunities to reflect the state changes on UI or insert business logics.

```C#
        private async void OnStateChangedAsync(object sender, PropertyChangedEventArgs args)
        {
            var teamsCall = sender as TeamsCommunicationCall;

            if (teamsCall != null)
            {
                var state = teamsCall.State;

                // Update the UI

                switch (state)
                {
                    case CallState.Connected:
                        {
                            await teamsCall.StartAudioAsync(micStream);

                            break;
                        }
                    case CallState.Disconnected:
                        {
                            teamsCall.StateChanged -= OnStateChangedAsync;

                            teamsCall.Dispose();

                            break;
                        }
                    default: break;
                }
            }
        }
```

### Run the code

You can build and run the code on Visual Studio. For solution platforms, we support `ARM64`, `x64` and `x86`. 

You can make an outbound call by providing a user ID in the text field and clicking the `Start Call` button. Calling `8:echo123` connects you with an echo bot, this feature is great for getting started and verifying your audio devices are working.

Screenshot showing running the WinUI quickstart app.



**Applies to: platform-android**


Get started with Azure Communication Services by using the Communication Services calling SDK to add 1:1 voice & video calling to your app. You'll learn how to start and answer a call using the Azure Communication Services Calling SDK for Java.

## Sample Code

If you'd like to skip ahead to the end, you can download this quickstart as a sample on [GitHub](https://github.com/Azure-Samples/communication-services-android-quickstarts/tree/main/videoCallingQuickstart).

## Prerequisites

- An Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Android Studio](https://developer.android.com/studio), for creating your Android application.
- A deployed Communication Services resource. [Create a Communication Services resource](../create-communication-resource.md). You need to **record your connection string** for this quickstart.
- A [User Access Token](../manage-teams-identity.md?pivots=programming-language-java) for your Azure Communication Service.
- Obtain Teams thread ID to for call operations using [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer). Read more about [how to create chat thread ID](https://learn.microsoft.com/graph/api/chat-post?preserve-view=true\&tabs=javascript\&view=graph-rest-1.0#example-2-create-a-group-chat).
  
## Setting up

### Create an Android app with an empty activity

From Android Studio, select Start a new Android Studio project.

Screenshot showing the 'Start a new Android Studio Project' button selected in Android Studio.

Select "Empty Activity" project template under "Phone and Tablet".

Screenshot showing the 'Empty Activity' option selected in the Project Template Screen.

Select Minimum SDK of "API 26: Android 8.0 (Oreo)" or greater.

Screenshot showing the 'Empty Activity' option selected in the Project Template Screen 2.


### Install the package

<!-- TODO: update with instructions on how to download, install and add package to project -->
Locate your project level build.gradle and make sure to add `mavenCentral()` to the list of repositories under `buildscript` and `allprojects`
```groovy
buildscript {
    repositories {
    ...
        mavenCentral()
    ...
    }
}
```

```groovy
allprojects {
    repositories {
    ...
        mavenCentral()
    ...
    }
}
```
Then, in your module level build.gradle add the following lines to the dependencies and android sections

```groovy
android {
    ...
    packagingOptions {
        pickFirst  'META-INF/*'
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}

dependencies {
    ...
    implementation 'com.azure.android:azure-communication-calling:1.0.0-beta.8'
    ...
}
```

### Add permissions to application manifest

In order to request permissions required to make a call, they must be declared in the Application Manifest (`app/src/main/AndroidManifest.xml`). Replace the content of file with the following code:

```xml
    <?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.contoso.ctequickstart">

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_PHONE_STATE" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <!--Our Calling SDK depends on the Apache HTTP SDK.
When targeting Android SDK 28+, this library needs to be explicitly referenced.
See https://developer.android.com/about/versions/pie/android-9.0-changes-28#apache-p-->
        <uses-library android:name="org.apache.http.legacy" android:required="false"/>
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
    
```

### Set up the layout for the app

Two inputs are needed: a text input for the callee ID, and a button for placing the call. These inputs can be added through the designer or by editing the layout xml. Create a button with an ID of `call_button` and a text input of `callee_id`. Navigate to (`app/src/main/res/layout/activity_main.xml`) and replace the content of file with the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/call_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginBottom="16dp"
        android:text="Call"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent" />

    <EditText
        android:id="@+id/callee_id"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:ems="10"
        android:hint="Callee Id"
        android:inputType="textPersonName"
        app:layout_constraintBottom_toTopOf="@+id/call_button"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

### Create the main activity scaffolding and bindings

With the layout created the bindings can be added as well as the basic scaffolding of the activity. The activity handles requesting runtime permissions, creating the teams call agent, and placing the call when the button is pressed. Each is covered in its own section. The `onCreate` method is overridden to invoke `getAllPermissions` and `createTeamsAgent` and to add the bindings for the call button. This event occurs only once when the activity is created. For more information, on `onCreate`, see the guide [Understand the Activity Lifecycle](https://developer.android.com/guide/components/activities/activity-lifecycle).

Navigate to **MainActivity.java** and replace the content with the following code:

```java
package com.contoso.ctequickstart;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import android.media.AudioManager;
import android.Manifest;
import android.content.pm.PackageManager;

import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.azure.android.communication.common.CommunicationUserIdentifier;
import com.azure.android.communication.common.CommunicationTokenCredential;
import com.azure.android.communication.calling.TeamsCallAgent;
import com.azure.android.communication.calling.CallClient;
import com.azure.android.communication.calling.StartTeamsCallOptions;


import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {
    
    private TeamsCallAgent teamsCallAgent;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        getAllPermissions();
        createTeamsAgent();
        
        // Bind call button to call `startCall`
        Button callButton = findViewById(R.id.call_button);
        callButton.setOnClickListener(l -> startCall());
        
        setVolumeControlStream(AudioManager.STREAM_VOICE_CALL);
    }

    /**
     * Request each required permission if the app doesn't already have it.
     */
    private void getAllPermissions() {
        // See section on requesting permissions
    }

    /**
      * Create the call agent for placing calls
      */
    private void createTeamsAgent() {
        // See section on creating the call agent
    }

    /**
     * Place a call to the callee id provided in `callee_id` text input.
     */
    private void startCall() {
        // See section on starting the call
    }
}

```

### Request permissions at runtime

For Android 6.0 and higher (API level 23) and `targetSdkVersion` 23 or higher, permissions are granted at runtime instead of when the app is installed. In order to support it, `getAllPermissions` can be implemented to call `ActivityCompat.checkSelfPermission` and `ActivityCompat.requestPermissions` for each required permission.

```java
/**
 * Request each required permission if the app doesn't already have it.
 */
private void getAllPermissions() {
    String[] requiredPermissions = new String[]{Manifest.permission.RECORD_AUDIO, Manifest.permission.CAMERA, Manifest.permission.WRITE_EXTERNAL_STORAGE, Manifest.permission.READ_PHONE_STATE};
    ArrayList<String> permissionsToAskFor = new ArrayList<>();
    for (String permission : requiredPermissions) {
        if (ActivityCompat.checkSelfPermission(this, permission) != PackageManager.PERMISSION_GRANTED) {
            permissionsToAskFor.add(permission);
        }
    }
    if (!permissionsToAskFor.isEmpty()) {
        ActivityCompat.requestPermissions(this, permissionsToAskFor.toArray(new String[0]), 1);
    }
}
```

> **Note:**
> When designing your app, consider when these permissions should be requested. Permissions should be requested as they are needed, not ahead of time. For more information, see, the [Android Permissions Guide.](https://developer.android.com/training/permissions/requesting)

## Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Calling SDK:

| Name | Description |
| --- | --- |
| `CallClient` | The `CallClient` is the main entry point to the Calling SDK. |
| `TeamsCallAgent` | The `TeamsCallAgent` is used to start and manage calls. |
| `TeamsCall` | The `TeamsCall` used for representing a Teams Call. |
| `CommunicationTokenCredential` | The `CommunicationTokenCredential` is used as the token credential to instantiate the `TeamsCallAgent`. |
| `CommunicationIdentifier` | The `CommunicationIdentifier` is used as different type of participant that could be part of a call. |

## Create an agent from the user access token

With a user token, an authenticated call agent can be instantiated. Generally this token is generated from a service with authentication specific to the application. For more information on user access tokens, check the [User Access Tokens](../manage-teams-identity.md?pivots=programming-language-java) guide.

For the quickstart, replace `<User_Access_Token>` with a user access token generated for your Azure Communication Service resource.

```java

/**
 * Create the teams call agent for placing calls
 */
private void createAgent() {
    String userToken = "<User_Access_Token>";

    try {
        CommunicationTokenCredential credential = new CommunicationTokenCredential(userToken);
        teamsCallAgent = new CallClient().createTeamsCallAgent(getApplicationContext(), credential).get();
    } catch (Exception ex) {
        Toast.makeText(getApplicationContext(), "Failed to create teams call agent.", Toast.LENGTH_SHORT).show();
    }
}

```

## Start a call using the call agent

Placing the call can be done via the teams call agent, and just requires providing a list of callee IDs and the call options. For the quickstart, the default call options without video and a single callee ID from the text input are used.

```java
/**
 * Place a call to the callee id provided in `callee_id` text input.
 */
private void startCall() {
    EditText calleeIdView = findViewById(R.id.callee_id);
    String calleeId = calleeIdView.getText().toString();
    
    StartTeamsCallOptions options = new StartTeamsCallOptions();

    teamsCallAgent.startCall(
        getApplicationContext(),
        new MicrosoftTeamsUserCallIdentifier(calleeId),
        options);
}
```

## Answer a Call

Accepting a call can be done using the teams call agent using only a reference to the current context.

```java
public void acceptACall(TeamsIncomingCall teamsIncomingCall){
	teamsIncomingCall.accept(this);
}
```

## Join a Teams Call

A user can join an existing call by passing a link.

```java
/**
 * Join a call using a teams meeting link.
 */
public TeamsCall joinTeamsCall(TeamsCallAgent teamsCallAgent){
	TeamsMeetingLinkLocator link = new TeamsMeetingLinkLocator("meetingLink");
	TeamsCall call = teamsCallAgent.join(this, link);
}
```

## Join a Teams Call with options

We can also join an existing call with preset options, such as being muted.

```java
/**
 * Join a call using a teams meeting link while muted.
 */
public TeamsCall joinTeamsCall(TeamsCallAgent teamsCallAgent){
	TeamsMeetingLinkLocator link = new TeamsMeetingLinkLocator("meetingLink");
	OutgoingAudioOptions audioOptions = new OutgoingAudioOptions().setMuted(true);
	JoinTeamsCallOptions options = new JoinTeamsCallOptions().setAudioOptions(audioOptions);
	TeamsCall call = teamsCallAgent.join(this, link, options);
}
```

## Setup Incoming Call Listener

To be able to detect incoming calls and other actions not done by this user, listeners must be setup.

```java
private TeamsIncomingCall teamsincomingCall;
teamsCallAgent.addOnIncomingCallListener(this::handleIncomingCall);

private void handleIncomingCall(TeamsIncomingCall incomingCall) {
	this.teamsincomingCall = incomingCall;
}
```

## Launch the app and call the echo bot

The app can now be launched using the "Run App" button on the toolbar (Shift+F10). Verify you're able to place calls by calling `8:echo123`. A pre-recorded message plays then repeat your message back to you.

Screenshot showing the completed application.



**Applies to: platform-ios**


Get started with Azure Communication Services by using the Communication Services calling SDK to add one on one video calling to your app. You learn how to start and answer a video call using the Azure Communication Services Calling SDK for iOS using Teams identity.

## Sample Code

If you'd like to skip ahead to the end, you can download this quickstart as a sample on [GitHub](https://github.com/Azure-Samples/communication-services-ios-quickstarts/tree/main/add-video-calling-callkit).

## Prerequisites

- Obtain an Azure account with an active subscription. [Create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- A Mac running [Xcode](https://developer.apple.com/xcode/), along with a valid developer certificate installed into your Keychain.
- Create an active Communication Services resource. [Create a Communication Services resource](../create-communication-resource.md?tabs=windows\&pivots=platform-azp). You need to **record your connection string** for this quickstart.
- A [User Access Token](../manage-teams-identity.md) for your Azure Communication Service.
- Obtain Teams thread ID to for call operations using [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer). Read more about [how to create chat thread ID](https://learn.microsoft.com/graph/api/chat-post?preserve-view=true\&tabs=javascript\&view=graph-rest-1.0#example-2-create-a-group-chat)

## Setting up

### Creating the Xcode project

In Xcode, create a new iOS project and select the Single View App template. This tutorial uses the [SwiftUI framework](https://developer.apple.com/xcode/swiftui/), so you should set the Language to Swift and the User Interface to SwiftUI. You're not going to create tests during this quick start. Feel free to uncheck Include Tests.

Screenshot showing the New Project window within Xcode.

### Installing CocoaPods

Use this guide to [install CocoaPods](https://guides.cocoapods.org/using/getting-started.html) on your Mac.

### Install the package and dependencies with CocoaPods

1. To create a `Podfile` for your application, open the terminal and navigate to the project folder and run pod init.

2. Add the following code to the `Podfile` and save. [See SDK support versions](../../concepts/voice-video-calling/calling-sdk-features.md?#ios-calling-sdk-support).

```
platform :ios, '13.0'
use_frameworks!

target 'VideoCallingQuickstart' do
  pod 'AzureCommunicationCalling', '~> 2.10.0'
end
```

3. Run pod install.

4. Open the `.xcworkspace` with Xcode.

### Request access to the microphone and camera

To access the device's microphone and camera, you need to update your app's Information Property List with an `NSMicrophoneUsageDescription` and `NSCameraUsageDescription`. You set the associated value to a string that includes the dialog the system uses to request access from the user.

Right-click the `Info.plist` entry of the project tree and select Open As > Source Code. Add the following lines the top level `<dict>` section, and then save the file.

```xml
<key>NSMicrophoneUsageDescription</key>
<string>Need microphone access for VOIP calling.</string>
<key>NSCameraUsageDescription</key>
<string>Need camera access for video calling</string>
```

### Set up the app framework

Open your project's `ContentView.swift` file and add an import declaration to the top of the file to import the `AzureCommunicationCalling` library and `AVFoundation`. AVFoundation is used to capture audio permission from code.

```Swift
import AzureCommunicationCalling
import AVFoundation
```

## Object model

The following classes and interfaces handle some of the major features of the Azure Communication Services Calling SDK for iOS.

| Name | Description |
| :--- | :--- |
| `CallClient` | The `CallClient` is the main entry point to the Calling SDK. |
| `TeamsCallAgent` | The `TeamsCallAgent` is used to start and manage calls. |
| `TeamsIncomingCall` | The `TeamsIncomingCall` is used to accept or reject incoming teams call. |
| `CommunicationTokenCredential` | The `CommunicationTokenCredential` is used as the token credential to instantiate the `TeamsCallAgent`. |
| `CommunicationIdentifier` | The `CommunicationIdentifier` is used to represent the identity of the user, which can be one of the following options: `CommunicationUserIdentifier`, `PhoneNumberIdentifier` or `CallingApplication`. |

## Create the Teams Call Agent

Replace the implementation of the ContentView `struct` with some simple UI controls that enable a user to initiate and end a call. We add business logic to these controls in this quickstart.

```Swift
struct ContentView: View {
    @State var callee: String = ""
    @State var callClient: CallClient?
    @State var teamsCallAgent: TeamsCallAgent?
    @State var teamsCall: TeamsCall?
    @State var deviceManager: DeviceManager?
    @State var localVideoStream:[LocalVideoStream]?
    @State var teamsIncomingCall: TeamsIncomingCall?
    @State var sendingVideo:Bool = false
    @State var errorMessage:String = "Unknown"

    @State var remoteVideoStreamData:[Int32:RemoteVideoStreamData] = [:]
    @State var previewRenderer:VideoStreamRenderer? = nil
    @State var previewView:RendererView? = nil
    @State var remoteRenderer:VideoStreamRenderer? = nil
    @State var remoteViews:[RendererView] = []
    @State var remoteParticipant: RemoteParticipant?
    @State var remoteVideoSize:String = "Unknown"
    @State var isIncomingCall:Bool = false
    
    @State var callObserver:CallObserver?
    @State var remoteParticipantObserver:RemoteParticipantObserver?

    var body: some View {
        NavigationView {
            ZStack{
                Form {
                    Section {
                        TextField("Who would you like to call?", text: $callee)
                        Button(action: startCall) {
                            Text("Start Teams Call")
                        }.disabled(teamsCallAgent == nil)
                        Button(action: endCall) {
                            Text("End Teams Call")
                        }.disabled(teamsCall == nil)
                        Button(action: toggleLocalVideo) {
                            HStack {
                                Text(sendingVideo ? "Turn Off Video" : "Turn On Video")
                            }
                        }
                    }
                }
                // Show incoming call banner
                if (isIncomingCall) {
                    HStack() {
                        VStack {
                            Text("Incoming call")
                                .padding(10)
                                .frame(maxWidth: .infinity, alignment: .topLeading)
                        }
                        Button(action: answerIncomingCall) {
                            HStack {
                                Text("Answer")
                            }
                            .frame(width:80)
                            .padding(.vertical, 10)
                            .background(Color(.green))
                        }
                        Button(action: declineIncomingCall) {
                            HStack {
                                Text("Decline")
                            }
                            .frame(width:80)
                            .padding(.vertical, 10)
                            .background(Color(.red))
                        }
                    }
                    .frame(maxWidth: .infinity, alignment: .topLeading)
                    .padding(10)
                    .background(Color.gray)
                }
                ZStack{
                    VStack{
                        ForEach(remoteViews, id:\.self) { renderer in
                            ZStack{
                                VStack{
                                    RemoteVideoView(view: renderer)
                                        .frame(width: .infinity, height: .infinity)
                                        .background(Color(.lightGray))
                                }
                            }
                            Button(action: endCall) {
                                Text("End Call")
                            }.disabled(teamsCall == nil)
                            Button(action: toggleLocalVideo) {
                                HStack {
                                    Text(sendingVideo ? "Turn Off Video" : "Turn On Video")
                                }
                            }
                        }
                        
                    }.frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
                    VStack{
                        if(sendingVideo)
                        {
                            VStack{
                                PreviewVideoStream(view: previewView!)
                                    .frame(width: 135, height: 240)
                                    .background(Color(.lightGray))
                            }
                        }
                    }.frame(maxWidth:.infinity, maxHeight:.infinity,alignment: .bottomTrailing)
                }
            }
     .navigationBarTitle("Video Calling Quickstart")
        }.onAppear{
            // Authenticate the client
            
            // Initialize the TeamsCallAgent and access Device Manager
            
            // Ask for permissions
        }
    }
}

//Functions and Observers

struct PreviewVideoStream: UIViewRepresentable {
    let view:RendererView
    func makeUIView(context: Context) -> UIView {
        return view
    }
    func updateUIView(_ uiView: UIView, context: Context) {}
}

struct RemoteVideoView: UIViewRepresentable {
    let view:RendererView
    func makeUIView(context: Context) -> UIView {
        return view
    }
    func updateUIView(_ uiView: UIView, context: Context) {}
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```

### Authenticate the client

In order to initialize a `TeamsCallAgent` instance, you need a User Access Token which enables it to make, and receive calls. Refer to the [user access token](../manage-teams-identity.md) documentation, if you don't have a token available.

Once you have a token, Add the following code to the `onAppear` callback in `ContentView.swift`. You need to replace `<USER ACCESS TOKEN>` with a valid **user access token** for your resource:

```Swift
var userCredential: CommunicationTokenCredential?
do {
    userCredential = try CommunicationTokenCredential(token: "<USER ACCESS TOKEN>")
} catch {
    print("ERROR: It was not possible to create user credential.")
    return
}
```

### Initialize the Teams CallAgent and access Device Manager

To create a `TeamsCallAgent` instance from a `CallClient`, use the `callClient.createTeamsCallAgent` method that asynchronously returns a `TeamsCallAgent` object once it's initialized. `DeviceManager` lets you enumerate local devices that can be used in a call to transmit audio/video streams. It also allows you to request permission from a user to access microphone/camera.

```Swift
self.callClient = CallClient()
let options = TeamsCallAgentOptions()
// Enable CallKit in the SDK
options.callKitOptions = CallKitOptions(with: createCXProvideConfiguration())
self.callClient?.createTeamsCallAgent(userCredential: userCredential, options: options) { (agent, error) in
    if error != nil {
        print("ERROR: It was not possible to create a Teams call agent.")
        return
    } else {
        self.teamsCallAgent = agent
        print("Teams Call agent successfully created.")
        self.teamsCallAgent!.delegate = teamsIncomingCallHandler
        self.callClient?.getDeviceManager { (deviceManager, error) in
            if (error == nil) {
                print("Got device manager instance")
                self.deviceManager = deviceManager
            } else {
                print("Failed to get device manager instance")
            }
        }
    }
}
```

### Ask for permissions

We need to add the following code to the `onAppear` callback to ask for permissions for audio and video.

```Swift
AVAudioSession.sharedInstance().requestRecordPermission { (granted) in
    if granted {
        AVCaptureDevice.requestAccess(for: .video) { (videoGranted) in
            /* NO OPERATION */
        }
    }
}
```

## Place an outgoing call

The `startCall` method is set as the action that is performed when the Start Call button is tapped. In this quickstart, outgoing calls are audio only by default. To start a call with video, we need to set `VideoOptions` with `LocalVideoStream` and pass it with `startCallOptions` to set initial options for the call.

```Swift
let startTeamsCallOptions = StartTeamsCallOptions()
if sendingVideo  {
    if self.localVideoStream == nil  {
        self.localVideoStream = [LocalVideoStream]()
    }
    let videoOptions = VideoOptions(localVideoStreams: localVideoStream!)
    startTeamsCallOptions.videoOptions = videoOptions
}
let callees: [CommunicationIdentifier] = [CommunicationUserIdentifier(self.callee)]
self.teamsCallAgent?.startCall(participants: callees, options: startTeamsCallOptions) { (call, error) in
    // Handle call object if successful or an error.
}
```
## Join a Teams meeting

The `join` method allows user to join a teams meeting.

```Swift
let joinTeamsCallOptions = JoinTeamsCallOptions()
if sendingVideo
{
    if self.localVideoStream == nil {
        self.localVideoStream = [LocalVideoStream]()
    }
    let videoOptions = VideoOptions(localVideoStreams: localVideoStream!)
    joinTeamsCallOptions.videoOptions = videoOptions
}

// Join the Teams meeting muted
if isMuted
{
    let outgoingAudioOptions = OutgoingAudioOptions()
    outgoingAudioOptions.muted = true
    joinTeamsCallOptions.outgoingAudioOptions = outgoingAudioOptions
}

let teamsMeetingLinkLocator = TeamsMeetingLinkLocator(meetingLink: "https://meeting_link")

self.teamsCallAgent?.join(with: teamsMeetingLinkLocator, options: joinTeamsCallOptions) { (call, error) in
    // Handle call object if successful or an error.
}
```

`TeamsCallObserver` and `RemoteParticipantObserver` are used to manage mid-call events and remote participants. We set the observers in the `setTeamsCallAndObserver` function.

```Swift
func setTeamsCallAndObserver(call:TeamsCall, error:Error?) {
    if (error == nil) {
        self.teamsCall = call
        self.teamsCallObserver = TeamsCallObserver(self)
        self.teamsCall!.delegate = self.teamsCallObserver
        // Attach a RemoteParticipant observer
        self.remoteParticipantObserver = RemoteParticipantObserver(self)
    } else {
        print("Failed to get teams call object")
    }
}
```

## Answer an incoming call

To answer an incoming call, implement an `TeamsIncomingCallHandler` to display the incoming call banner in order to answer or decline the call. Put the following implementation in `TeamsIncomingCallHandler.swift`.

```Swift
final class TeamsIncomingCallHandler: NSObject, TeamsCallAgentDelegate, TeamsIncomingCallDelegate {
    public var contentView: ContentView?
    private var teamsIncomingCall: TeamsIncomingCall?

    private static var instance: TeamsIncomingCallHandler?
    static func getOrCreateInstance() -> TeamsIncomingCallHandler {
        if let c = instance {
            return c
        }
        instance = TeamsIncomingCallHandler()
        return instance!
    }

    private override init() {}
    
    func teamsCallAgent(_ teamsCallAgent: TeamsCallAgent, didReceiveIncomingCall incomingCall: TeamsIncomingCall) {
        self.teamsIncomingCall = incomingCall
        self.teamsIncomingCall.delegate = self
        contentView?.showIncomingCallBanner(self.teamsIncomingCall!)
    }
    
    func teamsCallAgent(_ teamsCallAgent: TeamsCallAgent, didUpdateCalls args: TeamsCallsUpdatedEventArgs) {
        if let removedCall = args.removedCalls.first {
            contentView?.callRemoved(removedCall)
            self.teamsIncomingCall = nil
        }
    }
}
```

We need to create an instance of `TeamsIncomingCallHandler` by adding the following code to the `onAppear` callback in `ContentView.swift`:

Set a delegate to the `TeamsCallAgent` after the `TeamsCallAgent` being successfully created:

```Swift
self.teamsCallAgent!.delegate = incomingCallHandler
```

Once there's an incoming call, the `TeamsIncomingCallHandler` calls the function `showIncomingCallBanner` to display `answer` and `decline` button.

```Swift
func showIncomingCallBanner(_ incomingCall: TeamsIncomingCall) {
    self.teamsIncomingCall = incomingCall
}
```

The actions attached to `answer` and `decline` are implemented as the following code. In order to answer the call with video, we need to turn on the local video and set the options of `AcceptCallOptions` with `localVideoStream`.

```Swift
func answerIncomingCall() {
    let options = AcceptTeamsCallOptions()
    guard let teamsIncomingCall = self.teamsIncomingCall else {
      print("No active incoming call")
      return
    }

    guard let deviceManager = deviceManager else {
      print("No device manager instance")
      return
    }

    if self.localVideoStreams == nil {
        self.localVideoStreams = [LocalVideoStream]()
    }

    if sendingVideo
    {
        guard let camera = deviceManager.cameras.first else {
            // Handle failure
            return
        }
        self.localVideoStreams?.append( LocalVideoStream(camera: camera))
        let videoOptions = VideoOptions(localVideoStreams: localVideosStreams!)
        options.videoOptions = videoOptions
    }

    teamsIncomingCall.accept(options: options) { (call, error) in
        // Handle call object if successful or an error.
    }
}

func declineIncomingCall() {
    self.teamsIncomingCall?.reject { (error) in 
        // Handle if rejection was successfully or not.
    }
}
```

## Subscribe to events

We can implement a `TeamsCallObserver` class to subscribe to a collection of events to be notified when values change during the call.

```Swift
public class TeamsCallObserver: NSObject, TeamsCallDelegate, TeamsIncomingCallDelegate {
    private var owner: ContentView
    init(_ view:ContentView) {
            owner = view
    }
        
    public func teamsCall(_ teamsCall: TeamsCall, didChangeState args: PropertyChangedEventArgs) {
        if(teamsCall.state == CallState.connected) {
            initialCallParticipant()
        }
    }

    // render remote video streams when remote participant changes
    public func teamsCall(_ teamsCall: TeamsCall, didUpdateRemoteParticipant args: ParticipantsUpdatedEventArgs) {
        for participant in args.addedParticipants {
            participant.delegate = self.remoteParticipantObserver
        }
    }

    // Handle remote video streams when the call is connected
    public func initialCallParticipant() {
        for participant in owner.teamsCall.remoteParticipants {
            participant.delegate = self.remoteParticipantObserver
            for stream in participant.videoStreams {
                renderRemoteStream(stream)
            }
            owner.remoteParticipant = participant
        }
    }
}
```

## Run the code

You can build and run your app on iOS simulator by selecting Product > Run or by using the (⌘-R) keyboard shortcut.



## Clean up resources
If you want to clean up and remove a Communication Services subscription, you can delete the resource or resource group. Deleting the resource group also deletes any other resources associated with it. Learn more about [cleaning up resources](../create-communication-resource.md?pivots=platform-azp&tabs=windows#clean-up-resources).

## Next steps
For more information, see the following articles:

- Check out our [web calling sample](../../samples/web-calling-sample.md)
- Learn about [Calling SDK capabilities](getting-started-with-calling.md?pivots=platform-web)
- Learn more about [how calling works](../../concepts/voice-video-calling/about-call-types.md)
