---
title: Send cloud-to-device messages
titleSuffix: Azure IoT Hub
description: How to send cloud-to-device messages from a back-end app and receive them on a device app using the Azure IoT SDKs for C#, Python, Java, and Node.js.
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
ms.topic: how-to
ms.date: 1/6/2025
zone_pivot_groups: iot-hub-howto-c2d-1
ms.custom: [amqp, mqtt, "Role: Cloud Development", "Role: IoT Device"]
---

# Send and receive cloud-to-device messages

Azure IoT Hub is a fully managed service that enables bi-directional communications, including cloud-to-device (C2D) messages from solution back ends to millions of devices.

This article describes how to use the Azure IoT SDKs to build the following types of applications:

* Device applications that receive and handle cloud-to-device messages from an IoT Hub messaging queue.

* Back end applications that send cloud-to-device messages to a single device through an IoT Hub messaging queue.

This article is meant to complement runnable SDK samples that are referenced from within this article.

>**Note:**
>The features described in this article are available only in the standard tier of IoT Hub. For more information about the basic and standard/free IoT Hub tiers, see [Choose the right IoT Hub tier and size for your solution](iot-hub-scaling.md).


## Overview

For a device application to receive cloud-to-device messages, it must connect to IoT Hub and then set up a message handler to process incoming messages. The [Azure IoT Hub device SDKs](iot-hub-devguide-sdks.md#azure-iot-hub-device-sdks) provide classes and methods that a device can use to receive and handle messages from the service. This article discusses key elements of any device application that receives messages, including:

* Declare a device client object
* Connect to IoT Hub
* Retrieve messages from the IoT Hub message queue
* Process the message and send an acknowledgment back to IoT Hub
* Configure a receive message retry policy

For a back end application to send cloud-to-device messages, it must connect to an IoT Hub and send messages through an IoT Hub message queue. The [Azure IoT Hub service SDKs](iot-hub-devguide-sdks.md#azure-iot-hub-service-sdks) provide classes and methods that an application can use to send messages to devices. This article discusses key elements of any application that sends messages to devices, including:

* Declare a service client object
* Connect to IoT Hub
* Build and send the message
* Receive delivery feedback
* Configure a send message retry policy

## Understand the message queue

To understand cloud-to-device messaging, it's important to understand some fundamentals about how IoT Hub device message queues work.

Cloud-to-device messages sent from a solution backend application to an IoT device are routed through IoT Hub. There's no direct peer-to-peer messaging communication between the solution backend application and the target device. IoT Hub places incoming messages into its message queue, ready to be downloaded by target IoT devices.

To guarantee at-least-once message delivery, IoT hub persists cloud-to-device messages in per-device queues. Devices must explicitly acknowledge completion of a message before IoT Hub removes the message from the queue. This approach guarantees resiliency against connectivity and device failures.

When IoT Hub puts a message in a device message queue, it sets the message state to *Enqueued*. When a device thread takes a message from the queue, IoT Hub locks the message by setting the message state to *Invisible*. This state prevents other threads on the device from processing the same message. When a device thread successfully completes the processing of a message, it notifies IoT Hub and then IoT Hub sets the message state to *Completed*.

A device application that successfully receives and processes a message is said to *Complete* the message. However, if necessary a device can also:

* *Reject* the message, which causes IoT Hub to set it to the Dead lettered state. Devices that connect over the Message Queuing Telemetry Transport (MQTT) protocol can't reject cloud-to-device messages.
* *Abandon* the message, which causes IoT Hub to put the message back in the queue, with the message state set to *Enqueued*. Devices that connect over the MQTT protocol can't abandon cloud-to-device messages.

For more information about the cloud-to-device message lifecycle and how IoT Hub processes cloud-to-device messages, see [Send cloud-to-device messages from an IoT hub](iot-hub-devguide-messages-c2d.md).

**Applies to: programming-language-csharp**



## Create a device application

This section describes how to receive cloud-to-device messages.

There are two options that a device client application can use to receive messages:

* **Callback**: The device application sets up an asynchronous message handler method that is called immediately when a message arrives.
* **Polling**: The device application checks for new IoT Hub messages using a code loop (for example, a `while` or `for` loop). The loop executes continually, checking for messages.

### Required device NuGet Package

Device client applications written in C# require the **Microsoft.Azure.Devices.Client** NuGet package.

Add these `using` statements to use the device library.

```csharp
using Microsoft.Azure.Devices.Client;
using Microsoft.Azure.Devices.Shared;
```

### Connect a device to IoT Hub

A device app can authenticate with IoT Hub using the following methods:

* Shared access key
* X.509 certificate


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../iot/iot-overview-security.md#connection-security).


#### Authenticate using a shared access key

The [DeviceClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient) class exposes all the methods required to receive messages on the device.

Supply the IoT Hub primary connection string and Device ID to `DeviceClient` using the [CreateFromConnectionString](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.createfromconnectionstring) method. In addition to the required IoT Hub primary connection string, the `CreateFromConnectionString` method can be overloaded to include these *optional* parameters:

* `transportType` - The transport protocol: variations of HTTP version 1, AMQP, or MQTT. `AMQP` is the default. To see all available values, see [TransportType Enum](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.transporttype).
* `transportSettings` - Interface used to define various transport-specific settings for `DeviceClient` and `ModuleClient`. For more information, see [ITransportSettings Interface](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.itransportsettings).
* `ClientOptions` - Options that allow configuration of the device or module client instance during initialization.

This example connects to a device using the `Mqtt` transport protocol.

```csharp
static string DeviceConnectionString = "{IoT hub device connection string}";
static deviceClient = null;
deviceClient = DeviceClient.CreateFromConnectionString(DeviceConnectionString, 
   TransportType.Mqtt);
```

#### Authenticate using an X.509 certificate


To connect a device to IoT Hub using an X.509 certificate:

1. Use [DeviceAuthenticationWithX509Certificate](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceauthenticationwithx509certificate) to create an object that contains device and certificate information. `DeviceAuthenticationWithX509Certificate` is passed as the second parameter to `DeviceClient.Create` (step 2).

1. Use [DeviceClient.Create](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.create?\&#microsoft-azure-devices-client-deviceclient-create\(system-string-microsoft-azure-devices-client-iauthenticationmethod-microsoft-azure-devices-client-transporttype\)) to connect the device to IoT Hub using an X.509 certificate.

In this example, device and certificate information is populated in the `auth` `DeviceAuthenticationWithX509Certificate` object that is passed to `DeviceClient.Create`.

This example shows certificate input parameter values as local variables for clarity. In a production system, store sensitive input parameters in environment variables or another more secure storage location. For example, use `Environment.GetEnvironmentVariable("HOSTNAME")` to read the host name environment variable.

```csharp
RootCertPath = "~/certificates/certs/sensor-thl-001-device.cert.pem";
Intermediate1CertPath = "~/certificates/certs/sensor-thl-001-device.intermediate1.cert.pem";
Intermediate2CertPath = "~/certificates/certs/sensor-thl-001-device.intermediate2.cert.pem";
DevicePfxPath = "~/certificates/certs/sensor-thl-001-device.cert.pfx";
DevicePfxPassword = "1234";
DeviceName = "MyDevice";
HostName = "xxxxx.azure-devices.net";

var chainCerts = new X509Certificate2Collection();
chainCerts.Add(new X509Certificate2(RootCertPath));
chainCerts.Add(new X509Certificate2(Intermediate1CertPath));
chainCerts.Add(new X509Certificate2(Intermediate2CertPath));
using var deviceCert = new X509Certificate2(DevicePfxPath, DevicePfxPassword);
using var auth = new DeviceAuthenticationWithX509Certificate(DeviceName, deviceCert, chainCerts);

using var deviceClient = DeviceClient.Create(
    HostName,
    auth,
    TransportType.Amqp);
```

For more information about certificate authentication, see:

* [Authenticate identities with X.509 certificates](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-x509)
* [Tutorial: Create and upload certificates for testing](https://learn.microsoft.com/azure/iot-hub/tutorial-x509-test-certs)

##### Code samples

For working samples of device X.509 certificate authentication, see:

* [Connect with X.509 certificate](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/device/samples/how%20to%20guides/X509DeviceCertWithChainSample)
* [DeviceClientX509AuthenticationE2ETests](https://github.com/Azure/azure-iot-sdk-csharp/blob/main/e2e/test/iothub/DeviceClientX509AuthenticationE2ETests.cs)
* [Guided project - Provision IoT devices securely and at scale with IoT Hub Device Provisioning Service](https://learn.microsoft.com/training/modules/provision-iot-devices-secure-scale-with-iot-hub-dps/)


### Callback

To receive callback cloud-to-device messages in the device application, the application must connect to the IoT Hub and set up a callback listener to process incoming messages. Incoming messages to the device are received from the IoT Hub message queue.

Using callback, the device application sets up a message handler method using [SetReceiveMessageHandlerAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.setreceivemessagehandlerasync). The message handler is called then a message is received. Creating a callback method to receive messages removes the need to continuously poll for received messages.

Callback is available only using these protocols:

* `Mqtt`
* `Mqtt_WebSocket_Only`
* `Mqtt_Tcp_Only`
* `Amqp`
* `Amqp_WebSocket_Only`
* `Amqp_Tcp_only`

The `Http1` protocol option does not support callbacks since the SDK methods would need to poll for received messages anyway, which defeats the callback principle.

In this example, `SetReceiveMessageHandlerAsync` sets up a callback handler method named `OnC2dMessageReceivedAsync`, which is called each time a message is received.

```csharp
// Subscribe to receive C2D messages through a callback (which isn't supported over HTTP).
await deviceClient.SetReceiveMessageHandlerAsync(OnC2dMessageReceivedAsync, deviceClient);
Console.WriteLine($"\n{DateTime.Now}> Subscribed to receive C2D messages over callback.");
```

### Polling

Polling uses [ReceiveAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.receiveasync) to check for messages.

A call to `ReceiveAsync` can take these forms:

* `ReceiveAsync()` - Wait for the default timeout period for a message before continuing.
* `ReceiveAsync (Timespan)` - Receive a message from the device queue using a specific timeout.
* `ReceiveAsync (CancellationToken)` - Receive a message from the device queue using a cancellation token. When using a cancellation token, the default timeout period is not used.

When using a transport type of HTTP 1 instead of MQTT or AMQP, the `ReceiveAsync` method returns immediately. The supported pattern for cloud-to-device messages with HTTP 1 is intermittently connected devices that check for messages infrequently (a minimum of every 25 minutes). Issuing more HTTP 1 receives results in IoT Hub throttling the requests. For more information about the differences between MQTT, AMQP, and HTTP 1 support, see [Cloud-to-device communications guidance](iot-hub-devguide-c2d-guidance.md) and [Choose a communication protocol](iot-hub-devguide-protocols.md).

#### CompleteAsync method

After the device receives a message, the device application calls the [CompleteAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.receiver-1.completeasync) method to notify IoT Hub that the message is successfully processed and that the message can be safely removed from the IoT Hub device queue. The device should call this method when its processing successfully completes regardless of the transport protocol it's using.

#### Message abandon, reject, or timeout

With AMQP and HTTP version 1 protocols, but not the [MQTT protocol](iot-mqtt-connect-to-iot-hub.md), the device can also:

* Abandon a message by calling [AbandonAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.abandonasync). This results in IoT Hub retaining the message in the device queue for future consumption.
* Reject a message by calling [RejectAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.rejectasync). This permanently removes the message from the device queue.

If something happens that prevents the device from completing, abandoning, or rejecting the message, IoT Hub will, after a fixed timeout period, queue the message for delivery again. For this reason, the message processing logic in the device app must be *idempotent*, so that receiving the same message multiple times produces the same result.

For more information about the cloud-to-device message lifecycle and how IoT Hub processes cloud-to-device messages, see [Send cloud-to-device messages from an IoT hub](iot-hub-devguide-messages-c2d.md).

#### Polling loop

Using polling, an application uses a code loop that calls the `ReceiveAsync` method repeatedly to check for new messages until stopped.

If using `ReceiveAsync` with a timeout value or the default timeout, in the loop each call to `ReceiveAsync` waits for the specified timeout period. If `ReceiveAsync` times out, a `null` value is returned and the loop continues.

When a message is received, a [Task](https://learn.microsoft.com/dotnet/api/system.threading.tasks.task-1) object is returned by `ReceiveAsync` that should be passed to [CompleteAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.receiver-1.completeasync). A call to `CompleteAsync` notifies IoT Hub to delete the specified message from the message queue based on the `Task` parameter.

In this example, the loop calls `ReceiveAsync` until a message is received or the polling loop is stopped.

```csharp
static bool stopPolling = false;

while (!stopPolling)
{
   // Check for a message. Wait for the default DeviceClient timeout period.
   using Message receivedMessage = await _deviceClient.ReceiveAsync();

   // Continue if no message was received
   if (receivedMessage == null)
   {
      continue;
   }
   else  // A message was received
   {
      // Print the message received
      Console.WriteLine($"{DateTime.Now}> Polling using ReceiveAsync() - received message with Id={receivedMessage.MessageId}");
      PrintMessage(receivedMessage);

      // Notify IoT Hub that the message was received. IoT Hub will delete the message from the message queue.
      await _deviceClient.CompleteAsync(receivedMessage);
      Console.WriteLine($"{DateTime.Now}> Completed C2D message with Id={receivedMessage.MessageId}.");
   }

   // Check to see if polling loop should end
   stopPolling = ShouldPollingstop ();
}
```

### Receive message retry policy

The device client message retry policy can be defined using [DeviceClient.SetRetryPolicy](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.setretrypolicy).

The message retry timeout is stored in the [DeviceClient.OperationTimeoutInMilliseconds](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.operationtimeoutinmilliseconds) property.

### SDK receive message sample

The .NET/C# SDK includes a [Message Receive](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/device/samples/getting%20started/MessageReceiveSample) sample that includes the receive message methods described in this section.

## Create a backend application

This section describes essential code to send a message from a solution backend application to an IoT device using the [ServiceClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.serviceclient) class in the Azure IoT SDK for .NET. As discussed previously, a solution backend application connects to an IoT Hub and messages are sent to IoT Hub encoded with a destination device. IoT Hub stores incoming messages to its message queue, and messages are delivered from the IoT Hub message queue to the target device.

A solution backend application can also request and receive delivery feedback for a message sent to IoT Hub that is destined for device delivery via the message queue.

### Add service NuGet Package

Backend service applications require the **Microsoft.Azure.Devices** NuGet package.

### Connect to IoT hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Connect a backend application to a device using [CreateFromConnectionString](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.serviceclient.createfromconnectionstring). In addition to the required IoT Hub primary connection string, the `CreateFromConnectionString` method can be overloaded to include these *optional* parameters:

* `transportType` - `Amqp` or `Amqp_WebSocket_Only`.
* `transportSettings` - The AMQP and HTTP proxy settings for Service Client.
* `ServiceClientOptions` - Options that allow configuration of the service client instance during initialization. For more information, see [ServiceClientOptions](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.serviceclientoptions).

This example creates the `ServiceClient` object using the IoT Hub connection string and default `Amqp` transport.

``` csharp
static string connectionString = "{your IoT hub connection string}";
serviceClient = ServiceClient.CreateFromConnectionString(connectionString);
```

#### Connect using Microsoft Entra


A backend app that uses Microsoft Entra must successfully authenticate and obtain a security token credential before connecting to IoT Hub. This token is passed to a IoT Hub connection method. For general information about setting up and using Microsoft Entra for IoT Hub, see [Control access to IoT Hub by using Microsoft Entra ID](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-azure-ad).

##### Configure Microsoft Entra app

You must set up a Microsoft Entra app that is configured for your preferred authentication credential. The app contains parameters such as client secret that are used by the backend application to authenticate. The available app authentication configurations are:

* Client secret
* Certificate
* Federated identity credential

Microsoft Entra apps may require specific role permissions depending on operations being performed. For example, [IoT Hub Twin Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/internet-of-things#iot-hub-twin-contributor) is required to enable read and write access to a IoT Hub device and module twins. For more information, see [Manage access to IoT Hub by using Azure RBAC role assignment](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-azure-ad?branch=main#manage-access-to-iot-hub-by-using-azure-rbac-role-assignment).

For more information about setting up a Microsoft Entra app, see [Quickstart: Register an application with the Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app).

##### Authenticate using DefaultAzureCredential

The easiest way to use Microsoft Entra to authenticate a backend application is to use [DefaultAzureCredential](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential), but it's recommended to use a different method in a production environment including a specific `TokenCredential` or pared-down `ChainedTokenCredential`. For simplicity, this section describes authentication using `DefaultAzureCredential` and Client secret. For more information about the pros and cons of using `DefaultAzureCredential`, see [Usage guidance for DefaultAzureCredential](https://learn.microsoft.com/dotnet/azure/sdk/authentication/credential-chains?tabs=dac#usage-guidance-for-defaultazurecredential).

`DefaultAzureCredential` supports different authentication mechanisms and determines the appropriate credential type based on the environment it's executing in. It attempts to use multiple credential types in an order until it finds a working credential.

Microsoft Entra requires these NuGet packages and corresponding `using` statements:

* Azure.Core
* Azure.Identity

```csharp
using Azure.Core;
using Azure.Identity;
```

In this example, Microsoft Entra app registration client secret, client ID, and tenant ID are added to environment variables. These environment variables are used by `DefaultAzureCredential` to authenticate the application. The result of a successful Microsoft Entra authentication is a security token credential that is passed to an IoT Hub connection method.

```csharp
string clientSecretValue = "xxxxxxxxxxxxxxx";
string clientID = "xxxxxxxxxxxxxx";
string tenantID = "xxxxxxxxxxxxx";

Environment.SetEnvironmentVariable("AZURE_CLIENT_SECRET", clientSecretValue);
Environment.SetEnvironmentVariable("AZURE_CLIENT_ID", clientID);
Environment.SetEnvironmentVariable("AZURE_TENANT_ID", tenantID);

TokenCredential tokenCredential = new DefaultAzureCredential();
```

The resulting [TokenCredential](https://learn.microsoft.com/dotnet/api/azure.core.tokencredential) can then be passed to a connect to IoT Hub method for any SDK client that accepts Microsoft Entra credentials:

* [JobClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.jobclient.create?#microsoft-azure-devices-jobclient-create\(system-string-azure-core-tokencredential-microsoft-azure-devices-httptransportsettings\))
* [RegistryManager](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager.create?#microsoft-azure-devices-registrymanager-create\(system-string-azure-core-tokencredential-microsoft-azure-devices-httptransportsettings\))
* [DigitalTwinClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.digitaltwinclient)
* [ServiceClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.serviceclient.create?#microsoft-azure-devices-serviceclient-create\(system-string-azure-core-tokencredential-microsoft-azure-devices-transporttype-microsoft-azure-devices-serviceclienttransportsettings-microsoft-azure-devices-serviceclientoptions\))

In this example, the `TokenCredential` is passed to `ServiceClient.Create` to create a [ServiceClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.serviceclient) connection object.

```csharp
string hostname = "xxxxxxxxxx.azure-devices.net";
using var serviceClient = ServiceClient.Create(hostname, tokenCredential, TransportType.Amqp);
```

In this example, the `TokenCredential` is passed to `RegistryManager.Create` to create a [RegistryManager](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager) object.

```csharp
string hostname = "xxxxxxxxxx.azure-devices.net";
registryManager = RegistryManager.Create(hostname, tokenCredential);
```

##### Code sample

For a working sample of Microsoft Entra service authentication, see [Role based authentication sample](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/service/samples/how%20to%20guides/RoleBasedAuthenticationSample).


### Send an asynchronous cloud-to-device message

Use [sendAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.serviceclient.sendasync) to send an asynchronous message from an application through the cloud (IoT Hub) to the device. The call is made using the AMQP protocol.

`sendAsync` uses these parameters:

* `deviceID` - The string identifier of the target device.
* `message` - The cloud-to-device message. The message is of type [Message](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.message) and can be formatted accordingly.
* `timeout` - An *optional* timeout value. The default is one minute if unspecified.

This example sends a test message to the target device with 10-second timeout value.

``` csharp
string targetDevice = "Device-1";
static readonly TimeSpan operationTimeout = TimeSpan.FromSeconds(10);
var commandMessage = new
Message(Encoding.ASCII.GetBytes("Cloud to device message."));
await serviceClient.SendAsync(targetDevice, commandMessage, operationTimeout);
```

### Receive delivery feedback

A sending program can request delivery (or expiration) acknowledgments from IoT Hub for each cloud-to-device message. This option enables the sending program to use inform, retry, or compensation logic. A complete description of message feedback operations and properties are described at [Message feedback](https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-messages-c2d#message-feedback).

To receive message delivery feedback:

* Create the `feedbackReceiver` object
* Send messages using the `Ack` parameter
* Wait to receive feedback

#### Create the feedbackReceiver object

Call [GetFeedbackReceiver](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.serviceclient.getfeedbackreceiver) to create a [FeedbackReceiver](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.feedbackreceiver-1) object. `FeedbackReceiver` contains methods that services can use to perform feedback receive operations.

``` csharp
var feedbackReceiver = serviceClient.GetFeedbackReceiver();
```

#### Send messages using the Ack parameter

Each message must include a value for the delivery acknowledgment [Ack](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.message.ack) property in order to receive delivery feedback. The `Ack` property can be one of these values:

* none (default): no feedback message is generated.

* `Positive`: receive a feedback message if the message was completed.

* `Negative`: receive a feedback message if the message expired (or maximum delivery count was reached) without being completed by the device.

* `Full`: feedback for both `Positive` and `Negative` results.

In this example, the `Ack` property is set to `Full`, requesting both positive or negative message delivery feedback for one message.

``` csharp
var commandMessage = new
Message(Encoding.ASCII.GetBytes("Cloud to device message."));
commandMessage.Ack = DeliveryAcknowledgement.Full;
await serviceClient.SendAsync(targetDevice, commandMessage);
```

#### Wait to receive feedback

Define a `CancellationToken`. Then in a loop, call [ReceiveAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.receiver-1.receiveasync) repeatedly, checking for delivery feedback messages. Each call to `ReceiveAsync` waits for the timeout period defined for the `ServiceClient` object.

* If a `ReceiveAsync` timeout expires with no message received, `ReceiveAsync` returns `null` and the loop continues.
* If a feedback message is received, a [Task](https://learn.microsoft.com/dotnet/api/system.threading.tasks.task-1) object is returned by `ReceiveAsync` that should be passed to [CompleteAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.receiver-1.completeasync) along with the cancellation token. A call to `CompleteAsync` deletes the specified sent message from the message queue based on the `Task` parameter.
* If needed, the receive code can call [AbandonAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.receiver-1.abandonasync) to put a send message back in the queue.

``` csharp
var feedbackReceiver = serviceClient.GetFeedbackReceiver();
```

``` csharp
// Define the cancellation token.
CancellationTokenSource source = new CancellationTokenSource();
CancellationToken token = source.Token;
// Call ReceiveAsync, passing the token. Wait for the timeout period.
var feedbackBatch = await feedbackReceiver.ReceiveAsync(token);
if (feedbackBatch == null) continue;
```

This example shows a method that includes these steps.

```csharp
private async static void ReceiveFeedbackAsync()
{
      var feedbackReceiver = serviceClient.GetFeedbackReceiver();

      Console.WriteLine("\nReceiving c2d feedback from service");
      while (true)
      {
         // Check for messages, wait for the timeout period.
         var feedbackBatch = await feedbackReceiver.ReceiveAsync();
         // Continue the loop if null is received after a timeout.
         if (feedbackBatch == null) continue;

         Console.ForegroundColor = ConsoleColor.Yellow;
         Console.WriteLine("Received feedback: {0}",
            string.Join(", ", feedbackBatch.Records.Select(f => f.StatusCode)));
         Console.ResetColor();

         await feedbackReceiver.CompleteAsync(feedbackBatch);
      }
   }
   ```

Note this feedback receive pattern is similar to the pattern used to receive cloud-to-device messages in the device application.

### Service client reconnection

On encountering an exception, the service client relays that information to the calling application. At that point, it is recommended that you inspect the exception details and take necessary action.

For example:

* If it a network exception, you can retry the operation.
* If it is a security exception (unauthorized exception), inspect your credentials and make sure they are up-to-date.
* If it is a throttling/quota exceeded exception, monitor and/or modify the frequency of sending requests, or update your hub instance scale unit. See [IoT Hub quotas and throttling](https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-quotas-throttling) for details.

### Send message retry policy

The `ServiceClient` message retry policy can be defined using [ServiceClient.SetRetryPolicy](https://learn.microsoft.com/dotnet/api/microsoft.rest.serviceclient-1.setretrypolicy).

### SDK send message sample

The .NET/C# SDK includes a [Service client sample](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/service/samples/getting%20started/ServiceClientSample) that includes the send message methods described in this section.




**Applies to: programming-language-java**



## Create a device application

This section describes how to receive cloud-to-device messages using the [DeviceClient](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.deviceclient) class from the Azure IoT SDK for Java.

For a Java-based device application to receive cloud-to-device messages, it must connect to IoT Hub, then set up a callback listener and message handler to process incoming messages from IoT Hub.

### Import Azure IoT Java SDK libraries

The code referenced in this article uses these SDK libraries.

```java
import com.microsoft.azure.sdk.iot.device.*;
import com.microsoft.azure.sdk.iot.device.exceptions.IotHubClientException;
import com.microsoft.azure.sdk.iot.device.transport.IotHubConnectionStatus;
```

### Connect a device to IoT Hub

A device app can authenticate with IoT Hub using the following methods:

* Shared access key
* X.509 certificate


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../iot/iot-overview-security.md#connection-security).


#### Authenticate using a shared access key

The [DeviceClient](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.deviceclient?#com-microsoft-azure-sdk-iot-device-deviceclient-deviceclient\(java-lang-string-com-microsoft-azure-sdk-iot-device-iothubclientprotocol\)) object instantiation requires these parameters:

* **connString** - The IoT device connection string. The connection string is a set of key-value pairs that are separated by ';', with the keys and values separated by '='. It should contain values for these keys: `HostName, DeviceId, and SharedAccessKey`.
* **Transport protocol** - The `DeviceClient` connection can use one of the following [IoTHubClientProtocol](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.iothubclientprotocol) transport protocols. `AMQP` is the most versatile, allows for checking messages frequently, and allows for message rejection and cancel. MQTT doesn't support message rejection or abandon methods:
  * `AMQPS`
  * `AMQPS_WS`
  * `HTTPS`
  * `MQTT`
  * `MQTT_WS`

For example:

```java
static string connectionString = "{IOT hub device connection string}";
static protocol = IotHubClientProtocol.AMQPS;
DeviceClient client = new DeviceClient(connectionString, protocol);
```

#### Authenticate using an X.509 certificate


To connect a device to IoT Hub using an X.509 certificate:

1. Build the [SSLContext](https://docs.oracle.com/javase/8/docs/api/javax/net/ssl/SSLContext.html) object using [buildSSLContext](https://hc.apache.org/httpcomponents-core-4.4.x/current/httpcore/apidocs/org/apache/http/ssl/SSLContextBuilder.html).
1. Add the `SSLContext` information to a [ClientOptions](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.clientoptions) object.
1. Call [DeviceClient](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.deviceclient?#com-microsoft-azure-sdk-iot-device-deviceclient-deviceclient\(java-lang-string-com-microsoft-azure-sdk-iot-device-iothubclientprotocol-com-microsoft-azure-sdk-iot-device-clientoptions\)) using the `ClientOptions` information to create the device-to-IoT Hub connection.

This example shows certificate input parameter values as local variables for clarity. In a production system, store sensitive input parameters in environment variables or another more secure storage location. For example, use `Environment.GetEnvironmentVariable("PUBLICKEY")` to read a public key certificate string environment variable.

```java
private static final String publicKeyCertificateString =
        "-----BEGIN CERTIFICATE-----\n" +
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n" +
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n" +
        "-----END CERTIFICATE-----\n";

//PEM encoded representation of the private key
private static final String privateKeyString =
        "-----BEGIN EC PRIVATE KEY-----\n" +
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n" +
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX\n" +
        "-----END EC PRIVATE KEY-----\n";

SSLContext sslContext = SSLContextBuilder.buildSSLContext(publicKeyCertificateString, privateKeyString);
ClientOptions clientOptions = ClientOptions.builder().sslContext(sslContext).build();
DeviceClient client = new DeviceClient(connString, protocol, clientOptions);
```

For more information about certificate authentication, see:

* [Authenticate identities with X.509 certificates](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-x509)
* [Tutorial: Create and upload certificates for testing](https://learn.microsoft.com/azure/iot-hub/tutorial-x509-test-certs)

##### Code samples

For working samples of device X.509 certificate authentication, see:

* [Send-receive x509 sample](https://github.com/Azure/azure-iot-sdk-java/tree/main/iothub/device/iot-device-samples/send-receive-x509-sample)
* [Send event x509](https://github.com/Azure/azure-iot-sdk-java/blob/main/iothub/device/iot-device-samples/send-event-x509/src/main/java/samples/com/microsoft/azure/sdk/iot/SendEventX509.java)


### Set the message callback method

Use the [setMessageCallback](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.deviceclient?com-microsoft-azure-sdk-iot-device-deviceclient-setmessagecallback\(com-microsoft-azure-sdk-iot-device-messagecallback-java-lang-object\)) method to define a message handler method that is notified when a message is received from IoT Hub.

`setMessageCallback` includes these parameters:

* `callback` - The callback method name. Can be `null`.
* `context` - An *optional* context of type `object`. Use `null` if unspecified.

In this example, a `callback` method named `MessageCallback` with no context parameter is passed to `setMessageCallback`.

```java
client.setMessageCallback(new MessageCallback(), null);
```

### Create a message callback handler

A callback message handler receives and processes an incoming message passed from the IoT Hub messages queue.

In this example, the message handler processes an incoming message and then returns [IotHubMessageResult.COMPLETE](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.iothubmessageresult). A `IotHubMessageResult.COMPLETE` return value notifies IoT Hub that the message is successfully processed and that the message can be safely removed from the device queue. The device should return `IotHubMessageResult.COMPLETE` when its processing successfully completes, notifying IoT Hub that the message should be removed from the message queue, regardless of the protocol it's using.

```java
  protected static class MessageCallback implements com.microsoft.azure.sdk.iot.device.MessageCallback
  {
      public IotHubMessageResult onCloudToDeviceMessageReceived(Message msg, Object context)
      {
          System.out.println(
                  "Received message with content: " + new String(msg.getBytes(), Message.DEFAULT_IOTHUB_MESSAGE_CHARSET));
          // Notify IoT Hub that the message
          return IotHubMessageResult.COMPLETE;
      }
  }
```

### Message abandon and rejection options

Though the vast number of incoming messages to a device should be successfully received and result in `IotHubMessageResult.COMPLETE`, it may be necessary to abandon or reject a message.

* With AMQP and HTTPS, but not MQTT, an application can:
  * `IotHubMessageResult.ABANDON` the message. IoT hub requeues it and sends it again later.
  * `IotHubMessageResult.REJECT` the message. IoT hub doesn't requeue the message and permanently removes the message from the message queue.
* Clients using `MQTT` or `MQTT_WS` cannot `ABANDON` or `REJECT` messages.

If something happens that prevents the device from completing, abandoning, or rejecting the message, IoT Hub will, after a fixed timeout period, queue the message for delivery again. For this reason, the message processing logic in the device app must be *idempotent*, so that receiving the same message multiple times produces the same result.

For more information about the cloud-to-device message lifecycle and how IoT Hub processes cloud-to-device messages, see [Send cloud-to-device messages from an IoT hub](iot-hub-devguide-messages-c2d.md).

> **Note:**
> If you use HTTPS instead of MQTT or AMQP as the transport, the **DeviceClient** instance checks for messages from IoT Hub infrequently (a minimum of every 25 minutes). For more information about the differences between MQTT, AMQP, and HTTPS support, see [Cloud-to-device communications guidance](iot-hub-devguide-c2d-guidance.md) and [Choose a communication protocol](iot-hub-devguide-protocols.md).

### Create the message state callback method

An application can use [registerConnectionStatusChangeCallback](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.internalclient?com-microsoft-azure-sdk-iot-device-internalclient-registerconnectionstatuschangecallback\(com-microsoft-azure-sdk-iot-device-iothubconnectionstatuschangecallback-java-lang-object\)) to register a callback method to be executed when the connection status of the device changes. This way the application can detect a downed messages connection and attempt to reconnect.

In this example, `IotHubConnectionStatusChangeCallbackLogger` is registered as the connection status change callback method.

```java
client.registerConnectionStatusChangeCallback(new IotHubConnectionStatusChangeCallbackLogger(), new Object());
```

The callback is fired and passed a `ConnectionStatusChangeContext` object.

Call `connectionStatusChangeContext.getNewStatus()` to get the current connection state.

```java
IotHubConnectionStatus status = connectionStatusChangeContext.getNewStatus();
```

The connection state returned can be one of these values:

* `IotHubConnectionStatus.DISCONNECTED`
* `IotHubConnectionStatus.DISCONNECTED_RETRYING`
* `IotHubConnectionStatus.CONNECTED`

Call `connectionStatusChangeContext.getNewStatusReason()` to get the reason for the connection status change.

```java
IotHubConnectionStatusChangeReason statusChangeReason = connectionStatusChangeContext.getNewStatusReason();
```

Call `connectionStatusChangeContext.getCause()` to find the reason for the connection status change. `getCause()` may return `null` if no information is available.

```java
Throwable throwable = connectionStatusChangeContext.getCause();
if (throwable != null)
    throwable.printStackTrace();
```

See the **HandleMessages** sample listed in the **SDK receive message sample** section of this article for a complete sample showing how to extract the status change callback method connection status change status, reason why the device status changed, and context.

### Open the connection between device and IoT Hub

Use [open](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.deviceclient) to create a connection between the device and IoT Hub. The device can now asynchronously send and receive messages to and from an IoT Hub. If the client is already open, the method does nothing.

```java
client.open(true);
```

### SDK receive message sample

**HandleMessages**: a sample device app included with the [Microsoft Azure IoT SDK for Java](https://github.com/Azure/azure-iot-sdk-java/tree/main/iothub/device/iot-device-samples), which connects to your IoT hub and receives cloud-to-device messages.

## Create a backend application

This section describes how to send a cloud-to-device message using the [ServiceClient](https://learn.microsoft.com/java/api/com.azure.core.annotation.serviceclient) class from the Azure IoT SDK for Java. A solution backend application connects to an IoT Hub and messages are sent to IoT Hub encoded with a destination device. IoT Hub stores incoming messages to its message queue, and messages are delivered from the IoT Hub message queue to the target device.

A solution backend application can also request and receive delivery feedback for a message sent to IoT Hub that is destined for device delivery via the message queue.

### Add the dependency statement

Add the dependency to use the **iothub-java-service-client** package in your application to communicate with your IoT hub service:

```xml
<dependency>
  <groupId>com.microsoft.azure.sdk.iot</groupId>
  <artifactId>iot-service-client</artifactId>
  <version>1.7.23</version>
</dependency>
```

### Add import statements

Add these **import** statements to use the Azure IoT Java SDK and exception handler.

```java
import com.microsoft.azure.sdk.iot.service.*;
import java.io.IOException;
import java.net.URISyntaxException;
```

### Connect to the IoT Hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

##### Define the connection protocol

Use [IotHubServiceClientProtocol](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.iothubserviceclientprotocol) to define the application-layer protocol used by the service client to communicate with an IoT Hub.

`IotHubServiceClientProtocol` only accepts the `AMQPS` or `AMQPS_WS` enum.

```java
IotHubServiceClientProtocol protocol = IotHubServiceClientProtocol.AMQPS;
```

##### Create the ServiceClient object

Create the [ServiceClient](https://learn.microsoft.com/java/api/com.azure.core.annotation.serviceclient) object, supplying the IoT Hub connection string and protocol.

```java
String connectionString = "{yourhubconnectionstring}";
ServiceClient serviceClient (connectionString, protocol);
```

##### Open the connection between application and IoT Hub

[open](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.serviceclient?#com-microsoft-azure-sdk-iot-service-serviceclient-open\(\)) the AMQP sender connection. This method creates the connection between the application and IoT Hub.

```java
serviceClient.open();
```

#### Connect using Microsoft Entra


A backend app that uses Microsoft Entra must successfully authenticate and obtain a security token credential before connecting to IoT Hub. This token is passed to a IoT Hub connection method. For general information about setting up and using Microsoft Entra for IoT Hub, see [Control access to IoT Hub by using Microsoft Entra ID](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-azure-ad).

For an overview of Java SDK authentication, see [Azure authentication with Java and Azure Identity](https://learn.microsoft.com/azure/developer/java/sdk/authentication/overview).

For simplicity, this section focuses on describing authentication using client secret.

##### Configure Microsoft Entra app

You must set up a Microsoft Entra app that is configured for your preferred authentication credential. The app contains parameters such as client secret that are used by the backend application to authenticate. The available app authentication configurations are:

* Client secret
* Certificate
* Federated identity credential

Microsoft Entra apps may require specific role permissions depending on operations being performed. For example, [IoT Hub Twin Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/internet-of-things#iot-hub-twin-contributor) is required to enable read and write access to a IoT Hub device and module twins. For more information, see [Manage access to IoT Hub by using Azure RBAC role assignment](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-azure-ad?#manage-access-to-iot-hub-by-using-azure-rbac-role-assignment).

For more information about setting up a Microsoft Entra app, see [Quickstart: Register an application with the Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app).

##### Authenticate using DefaultAzureCredential

The easiest way to use Microsoft Entra to authenticate a backend application is to use [DefaultAzureCredential](https://learn.microsoft.com/azure/developer/java/sdk/authentication/credential-chains#defaultazurecredential-overview), but it's recommended to use a different method in a production environment including a specific `TokenCredential` or pared-down `ChainedTokenCredential`.
For more information about the pros and cons of using `DefaultAzureCredential`, see
[Credential chains in the Azure Identity client library for Java](https://learn.microsoft.com/azure/developer/java/sdk/authentication/credential-chains).

[DefaultAzureCredential](https://learn.microsoft.com/java/api/com.azure.identity.defaultazurecredential) supports different authentication mechanisms and determines the appropriate credential type based on the environment it's executing in. It attempts to use multiple credential types in an order until it finds a working credential.

You can authenticate Microsoft Entra app credentials using [DefaultAzureCredentialBuilder](https://learn.microsoft.com/java/api/com.azure.identity.defaultazurecredentialbuilder). Save connection parameters such as client secret tenantID, clientID, and client secret values as environmental variables. Once the `TokenCredential` is created, pass it to [ServiceClient](https://learn.microsoft.com/java/api/com.azure.core.annotation.serviceclient) or other builder as the 'credential' parameter.

In this example, `DefaultAzureCredentialBuilder` attempts to authenticate a connection from the list described in [DefaultAzureCredential](https://learn.microsoft.com/java/api/com.azure.identity.defaultazurecredential). The result of a successful Microsoft Entra authentication is a security token credential that is passed to a constructor such as [ServiceClient](https://learn.microsoft.com/java/api/com.azure.core.annotation.serviceclient).

```java
TokenCredential defaultAzureCredential = new DefaultAzureCredentialBuilder().build();
```

##### Authenticate using ClientSecretCredentialBuilder

You can use [ClientSecretCredentialBuilder](https://learn.microsoft.com/java/api/com.azure.identity.clientsecretcredentialbuilder) to create a credential using client secret information. If successful, this method returns a [TokenCredential](https://learn.microsoft.com/java/api/com.azure.core.credential.tokencredential) that can be passed to [ServiceClient](https://learn.microsoft.com/java/api/com.azure.core.annotation.serviceclient) or other builder as the 'credential' parameter.

In this example, Microsoft Entra app registration client secret, client ID, and tenant ID values have been added to environment variables. These environment variables are used by `ClientSecretCredentialBuilder` to build the credential.

```java
string clientSecretValue = System.getenv("AZURE_CLIENT_SECRET");
string clientID = System.getenv("AZURE_CLIENT_ID");
string tenantID = System.getenv("AZURE_TENANT_ID");

TokenCredential credential =
     new ClientSecretCredentialBuilder()
          .tenantId(tenantID)
          .clientId(clientID)
          .clientSecret(clientSecretValue)
          .build();
```

##### Other authentication classes

The Java SDK also includes these classes that authenticate a backend app with Microsoft Entra:

* [AuthorizationCodeCredential](https://learn.microsoft.com/java/api/com.azure.identity.authorizationcodecredential)
* [AzureCliCredential](https://learn.microsoft.com/java/api/com.azure.identity.azureclicredential)
* [AzureDeveloperCliCredential](https://learn.microsoft.com/java/api/com.azure.identity.azuredeveloperclicredential)
* [AzurePipelinesCredential](https://learn.microsoft.com/java/api/com.azure.identity.azurepipelinescredential)
* [ChainedTokenCredential](https://learn.microsoft.com/java/api/com.azure.identity.chainedtokencredential)
* [ClientAssertionCredential](https://learn.microsoft.com/java/api/com.azure.identity.clientassertioncredential)
* [ClientCertificateCredential](https://learn.microsoft.com/java/api/com.azure.identity.clientcertificatecredential)
* [DeviceCodeCredential](https://learn.microsoft.com/java/api/com.azure.identity.devicecodecredential)
* [EnvironmentCredential](https://learn.microsoft.com/java/api/com.azure.identity.environmentcredential)
* [InteractiveBrowserCredential](https://learn.microsoft.com/java/api/com.azure.identity.interactivebrowsercredential)
* [ManagedIdentityCredential](https://learn.microsoft.com/java/api/com.azure.identity.managedidentitycredential)
* [OnBehalfOfCredential](https://learn.microsoft.com/java/api/com.azure.identity.onbehalfofcredential)

##### Code samples

For working samples of Microsoft Entra service authentication, see [Role based authentication sample](https://github.com/Azure/azure-iot-service-sdk-java/tree/main/service/iot-service-samples/role-based-authorization-sample).


### Open a feedback receiver for message delivery feedback

You can use a [FeedbackReceiver](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.feedbackreceiver) to get sent message delivery to IoT Hub feedback. A `FeedbackReceiver` is a specialized receiver whose `Receive` method returns a `FeedbackBatch` instead of a `Message`.

In this example, the `FeedbackReceiver` object is created and the `open()` statement is called to await feedback.

```java
FeedbackReceiver feedbackReceiver = serviceClient
  .getFeedbackReceiver();
if (feedbackReceiver != null) feedbackReceiver.open();
```

### Add message properties

You can optionally use [setProperties](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.messaging.message) to add message properties. These properties are included in the message sent to the device and can be extracted by the device application upon receipt.

```java
Map<String, String> propertiesToSend = new HashMap<String, String>();
propertiesToSend.put(messagePropertyKey,messagePropertyKey);
messageToSend.setProperties(propertiesToSend);
```

### Create and send an asynchronous message

The [Message](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.message) object stores the message to be sent. In this example, a "Cloud to device message" is delivered.

Use [setDeliveryAcknowledgement](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.message?#com-microsoft-azure-sdk-iot-service-message-setdeliveryacknowledgementfinal\(com-microsoft-azure-sdk-iot-service-deliveryacknowledgement\)) to request delivered/not delivered to IoT Hub message queue acknowledgment. In this example, the acknowledgment requested is `Full`, either delivered or not delivered.

Use [SendAsync](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.serviceclient) to send an asynchronous message from the client to the device. Alternatively, you can use the `Send` (not async) method, but this function is synchronized internally so that only one send operation is allowed at a time. The message is delivered from the application to IoT Hub. IoT Hub puts the message into the message queue, ready to be delivered to the target device.

```java
Message messageToSend = new Message("Cloud to device message.");
messageToSend.setDeliveryAcknowledgementFinal(DeliveryAcknowledgement.Full);
serviceClient.sendAsync(deviceId, messageToSend);
```

## Receive message delivery feedback

After a message is sent from the application, the application can call [receive](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.feedbackreceiver?#com-microsoft-azure-sdk-iot-service-feedbackreceiver-receive\(long\)) with or without a timeout value. If a timeout value is not supplied, the default timeout is used. This passes back a [FeedbackBatch](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.messaging.feedbackbatch) object that contains message delivery feedback properties that can be examined.

This example creates the `FeedbackBatch` receiver and calls [getEnqueuedTimeUtc](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.feedbackbatch?com-microsoft-azure-sdk-iot-service-feedbackbatch-getenqueuedtimeutc\(\)), printing the message enqueued time.

```java
FeedbackBatch feedbackBatch = feedbackReceiver.receive(10000);
if (feedbackBatch != null) {
  System.out.println("Message feedback received, feedback time: "
    + feedbackBatch.getEnqueuedTimeUtc().toString());
}
```

### SDK send message samples

There are two send message samples:

* [Service client sample](https://learn.microsoft.com/java/api/overview/azure/iot?example) - Send message example, #1.
* [Service client sample](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/service/samples/getting%20started/ServiceClientSample) - Send message example, #2.




**Applies to: programming-language-python**



## Create a device application

This section describes how to receive cloud-to-device messages.

The [IoTHubDeviceClient](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient) class includes methods to create a synchronous connection from a device to an Azure IoT Hub and receive messages from IoT Hub.

The **azure-iot-device** library must be installed to create device applications.

```cmd/sh
pip install azure-iot-device
```

For a Python-based device application to receive cloud-to-device messages, it must connect to IoT Hub and then set up a callback message handler to process incoming messages from IoT Hub.

### Device import statement

Add this code to import the `IoTHubDeviceClient` functions from the azure.iot.device SDK.

```python
from azure.iot.device import IoTHubDeviceClient
```

### Connect a device to IoT Hub

A device app can authenticate with IoT Hub using the following methods:

* Shared access key
* X.509 certificate


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../iot/iot-overview-security.md#connection-security).


#### Authenticate using a shared access key

To connect a device to IoT Hub:

1. Call [create_from_connection_string](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient?#azure-iot-device-iothubdeviceclient-create-from-connection-string) to add the device primary connection string.
1. Call [connect](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient?#azure-iot-device-iothubdeviceclient-connect) to connect the device client.

For example:

```python
# Add your IoT hub primary connection string
CONNECTION_STRING = "{Device primary connection string}"
device_client = IoTHubDeviceClient.create_from_connection_string(CONNECTION_STRING)

# Connect the client
device_client.connect()
```

#### Authenticate using an X.509 certificate


To connect a device to IoT Hub using an X.509 certificate:

1. Use [create_from_x509_certificate](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient?#azure-iot-device-iothubdeviceclient-create-from-x509-certificate) to add the X.509 certificate parameters
1. Call [connect](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient?#azure-iot-device-iothubdeviceclient-connect) to connect the device client

This example shows certificate input parameter values as local variables for clarity. In a production system, store sensitive input parameters in environment variables or another more secure storage location. For example, use `os.getenv("HOSTNAME")` to read the host name environment variable.

```python
# The Azure IoT hub name
hostname = "xxxxx.azure-devices.net"

# The device that has been created on the portal using X509 CA signing or self-signing capabilities
device_id = "MyDevice"

# The X.509 certificate file name
cert_file = "~/certificates/certs/sensor-thl-001-device.cert.pfx"
key_file = "~/certificates/certs/sensor-thl-001-device.cert.key"
# The optional certificate pass phrase
pass_phrase = "1234"

x509 = X509(
    cert_file,
    key_file,
    pass_phrase,
)

# The client object is used to interact with your Azure IoT hub.
device_client = IoTHubDeviceClient.create_from_x509_certificate(
    hostname=hostname, device_id=device_id, x509=x509
)

# Connect to IoT Hub
await device_client.connect()
```

For more information about certificate authentication, see:

* [Authenticate identities with X.509 certificates](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-x509)
* [Tutorial: Create and upload certificates for testing](https://learn.microsoft.com/azure/iot-hub/tutorial-x509-test-certs)

##### Code samples

For working samples of device X.509 certificate authentication, see the examples whose file names end in x509 at [Async hub scenarios](https://github.com/Azure/azure-iot-sdk-python/tree/main/samples/async-hub-scenarios).


##### Handle reconnection

`IoTHubDeviceClient` will by default attempt to reestablish a dropped connection. Reconnection behavior is governed by the `IoTHubDeviceClient` [connection_retry](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient?#azure-iot-device-iothubdeviceclient-on-message-received) and `connection_retry_interval` parameters.

### Create a message handler

Create a message handler function to process incoming messages to the device. This will be assigned by `on_message_received` (next step) as the callback message handler.

In this example, `message_handler` is called when a message is received. The message properties (`.items`) are printed to the console using a loop.

```python
def message_handler(message):
    global RECEIVED_MESSAGES
    RECEIVED_MESSAGES += 1
    print("")
    print("Message received:")

    # print data from both system and application (custom) properties
    for property in vars(message).items():
        print ("    {}".format(property))

    print("Total calls received: {}".format(RECEIVED_MESSAGES))
```

### Assign the message handler

Use the [on_message_received](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient?azure-iot-device-iothubdeviceclient-on-message-received) method to assign the message handler method.

In this example, a message handler method named `message_handler` is attached to the `IoTHubDeviceClient` `client` object. The `client` object waits to receive a cloud-to-device message from an IoT Hub. This code waits up to 300 seconds (5 minutes) for a message, or exits if a keyboard key is pressed.

```python
try:
    # Attach the handler to the client
    client.on_message_received = message_handler

    while True:
        time.sleep(300)
except KeyboardInterrupt:
    print("IoT Hub C2D Messaging device sample stopped")
finally:
    # Graceful exit
    print("Shutting down IoT Hub Client")
    client.shutdown()
```

### SDK receive message sample

[Receive Message](https://github.com/Azure/azure-iot-sdk-python/tree/main/samples/async-hub-scenarios) - Receive Cloud-to-Device (C2D) messages sent from the Azure IoT Hub to a device.

## Create a backend application

This section describes how to send a cloud-to-device message. A solution backend application connects to an IoT Hub and messages are sent to IoT Hub encoded with a destination device. IoT Hub stores incoming messages to its message queue, and messages are delivered from the IoT Hub message queue to the target device.

The [IoTHubRegistryManager](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager) class exposes all methods required to create a backend application to interact with cloud-to-device messages from the service. The **azure-iot-hub** library must be installed to create backend service applications.

```cmd/sh
pip install azure-iot-hub
```

### Import the IoTHubRegistryManager object

Add the following `import` statement. [IoTHubRegistryManager](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothub_registry_manager.iothubregistrymanager) includes APIs for IoT Hub Registry Manager operations.

```python
from azure.iot.hub import IoTHubRegistryManager
```

### Connect to IoT hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Connect to IoT hub using [from_connection_string](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager?#azure-iot-hub-iothubregistrymanager-from-connection-string).

For example:

```python
IoTHubConnectionString = "{IoT hub service connection string}"
registry_manager = IoTHubRegistryManager.from_connection_string(IoTHubConnectionString)
```

#### Connect using Microsoft Entra


A backend app that uses Microsoft Entra must successfully authenticate and obtain a security token credential before connecting to IoT Hub. This token is passed to a IoT Hub connection method. For general information about setting up and using Microsoft Entra for IoT Hub, see [Control access to IoT Hub by using Microsoft Entra ID](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-azure-ad).

##### Configure Microsoft Entra app

You must set up a Microsoft Entra app that is configured for your preferred authentication credential. The app contains parameters such as client secret that are used by the backend application to authenticate. The available app authentication configurations are:

* Client secret
* Certificate
* Federated identity credential

Microsoft Entra apps may require specific role permissions depending on operations being performed. For example, [IoT Hub Twin Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/internet-of-things#iot-hub-twin-contributor) is required to enable read and write access to a IoT Hub device and module twins. For more information, see [Manage access to IoT Hub by using Azure RBAC role assignment](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-azure-ad?branch=main#manage-access-to-iot-hub-by-using-azure-rbac-role-assignment).

For more information about setting up a Microsoft Entra app, see [Quickstart: Register an application with the Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app).

##### Authenticate using DefaultAzureCredential

The easiest way to use Microsoft Entra to authenticate a backend application is to use [DefaultAzureCredential](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential), but it's recommended to use a different method in a production environment including a specific `TokenCredential` or pared-down `ChainedTokenCredential`. For simplicity, this section describes authentication using `DefaultAzureCredential` and Client secret. For more information about the pros and cons of using `DefaultAzureCredential`, see [Usage guidance for DefaultAzureCredential](https://learn.microsoft.com/dotnet/azure/sdk/authentication/credential-chains?tabs=dac#usage-guidance-for-defaultazurecredential).

`DefaultAzureCredential` supports different authentication mechanisms and determines the appropriate credential type based on the environment it's executing in. It attempts to use multiple credential types in an order until it finds a working credential.

Microsoft Entra requires these NuGet packages and corresponding `using` statements:

* Azure.Core
* Azure.Identity

```csharp
using Azure.Core;
using Azure.Identity;
```

In this example, Microsoft Entra app registration client secret, client ID, and tenant ID are added to environment variables. These environment variables are used by `DefaultAzureCredential` to authenticate the application. The result of a successful Microsoft Entra authentication is a security token credential that is passed to an IoT Hub connection method.

```csharp
string clientSecretValue = "xxxxxxxxxxxxxxx";
string clientID = "xxxxxxxxxxxxxx";
string tenantID = "xxxxxxxxxxxxx";

Environment.SetEnvironmentVariable("AZURE_CLIENT_SECRET", clientSecretValue);
Environment.SetEnvironmentVariable("AZURE_CLIENT_ID", clientID);
Environment.SetEnvironmentVariable("AZURE_TENANT_ID", tenantID);

TokenCredential tokenCredential = new DefaultAzureCredential();
```

The resulting [TokenCredential](https://learn.microsoft.com/dotnet/api/azure.core.tokencredential) can then be passed to a connect to IoT Hub method for any SDK client that accepts Microsoft Entra credentials:

* [JobClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.jobclient.create?#microsoft-azure-devices-jobclient-create\(system-string-azure-core-tokencredential-microsoft-azure-devices-httptransportsettings\))
* [RegistryManager](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager.create?#microsoft-azure-devices-registrymanager-create\(system-string-azure-core-tokencredential-microsoft-azure-devices-httptransportsettings\))
* [DigitalTwinClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.digitaltwinclient)
* [ServiceClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.serviceclient.create?#microsoft-azure-devices-serviceclient-create\(system-string-azure-core-tokencredential-microsoft-azure-devices-transporttype-microsoft-azure-devices-serviceclienttransportsettings-microsoft-azure-devices-serviceclientoptions\))

In this example, the `TokenCredential` is passed to `ServiceClient.Create` to create a [ServiceClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.serviceclient) connection object.

```csharp
string hostname = "xxxxxxxxxx.azure-devices.net";
using var serviceClient = ServiceClient.Create(hostname, tokenCredential, TransportType.Amqp);
```

In this example, the `TokenCredential` is passed to `RegistryManager.Create` to create a [RegistryManager](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager) object.

```csharp
string hostname = "xxxxxxxxxx.azure-devices.net";
registryManager = RegistryManager.Create(hostname, tokenCredential);
```

##### Code sample

For a working sample of Microsoft Entra service authentication, see [Role based authentication sample](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/service/samples/how%20to%20guides/RoleBasedAuthenticationSample).


### Build and send a message

Use [send_c2d_message](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothub_registry_manager.iothubregistrymanager?#azure-iot-hub-iothub-registry-manager-iothubregistrymanager-send-c2d-message) to send a message through the cloud (IoT Hub) to the device.

`send_c2d_message` uses these parameters:

* `deviceID` - The string identifier of the target device.
* `message` - The cloud-to-device message. The message is of type `str` (string).
* `properties` - An *optional* collection of properties of type `dict`. Properties can contain application properties and system properties. The default value is `{}`.

This example sends a test message to the target device.

```python
# define the device ID
deviceID = "Device-1"

# define the message
message = "{\"c2d test message\"}"

# include optional properties
props={}
props.update(messageId = "message1")
props.update(prop1 = "test property-1")
props.update(prop1 = "test property-2")
prop_text = "Test message"
props.update(testProperty = prop_text)

# send the message through the cloud (IoT Hub) to the device
registry_manager.send_c2d_message(deviceID, message, properties=props)
```

### SDK send message sample

The Azure IoT SDK for Python provides a working sample of a service app that demonstrates how to send a cloud-to-device message. For more information, see [send_message.py](https://github.com/Azure/azure-iot-sdk-python/tree/main/samples/async-hub-scenarios) demonstrates how to send a cloud-to-device message.




**Applies to: programming-language-node**



## Create a device application

This section describes how to receive cloud-to-device messages using the [azure-iot-device](https://learn.microsoft.com/javascript/api/azure-iot-device) package in the Azure IoT SDK for Node.js.

For a Node.js-based device application to receive cloud-to-device messages, it must connect to IoT Hub, then set up a callback listener and message handler to process incoming messages from IoT Hub. The device application should also be able to detect and handle disconnects in case the device-to-IoT Hub message connection is broken.

### Install SDK packages

The [azure-iot-device](https://learn.microsoft.com/javascript/api/azure-iot-device) package contains objects that interface with IoT devices. Run this command to install the **azure-iot-device** device SDK on your development machine:

```cmd/sh
npm install azure-iot-device --save
```

### Connect a device to IoT Hub

A device app can authenticate with IoT Hub using the following methods:

* X.509 certificate
* Shared access key


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../iot/iot-overview-security.md#connection-security).


#### Authenticate using an X.509 certificate


The X.509 certificate is attached to the device-to-IoT Hub connection transport.

To configure a device-to-IoT Hub connection using an X.509 certificate:

1. Call [fromConnectionString](https://learn.microsoft.com/javascript/api/azure-iothub/client?#azure-iothub-client-fromconnectionstring) to add the device or identity module connection string, and transport type to the `Client` object. Add `x509=true` to the connection string to indicate that a certificate is added to `DeviceClientOptions`. For example:

   * A **device** connection string:
   
     `HostName=xxxxx.azure-devices.net;DeviceId=Device-1;SharedAccessKey=xxxxxxxxxxxxx;x509=true`
   * An **identity module** connection string:
   
     `HostName=xxxxx.azure-devices.net;DeviceId=Device-1;ModuleId=Module-1;SharedAccessKey=xxxxxxxxxxxxx;x509=true`

1. Configure a JSON variable with certificate details and pass it to [DeviceClientOptions](https://learn.microsoft.com/javascript/api/azure-iot-device/deviceclientoptions).
1. Call [setOptions](https://learn.microsoft.com/javascript/api/azure-iot-device/client?#azure-iot-device-client-setoptions-1) to add an X.509 certificate and key (and optionally, passphrase) to the client transport.
1. Call [open](https://learn.microsoft.com/javascript/api/azure-iothub/client?#azure-iothub-client-open) to open the connection from the device to IoT Hub.

This example shows certificate configuration information within a JSON variable. The certification configuration `clientOptions` are passed to `setOptions`, and the connection is opened using `open`.

```javascript
const Client = require('azure-iot-device').Client;
const Protocol = require('azure-iot-device-mqtt').Mqtt;
// Connection string illustrated for demonstration only. Never hard-code the connection string in production. Instead use an environmental variable or other secure storage.
const connectionString = `HostName=xxxxx.azure-devices.net;DeviceId=Device-1;SharedAccessKey=xxxxxxxxxxxxx;x509=true`
const client = Client.fromConnectionString(connectionString, Protocol);

var clientOptions = {
   cert: myX509Certificate,
   key: myX509Key,
   passphrase: passphrase,
   http: {
     receivePolicy: {
       interval: 10
     }
   }
 }

 client.setOptions(clientOptions);
 client.open(connectCallback);
```

For more information about certificate authentication, see:

* [Authenticate identities with X.509 certificates](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-x509)
* [Create and upload certificates for testing](https://learn.microsoft.com/azure/iot-hub/tutorial-x509-test-certs)

##### Code sample

For a working sample of device X.509 certificate authentication, see [Simple sample device X.509](https://github.com/Azure/azure-iot-sdk-node/blob/main/device/samples/javascript/simple_sample_device_x509.js).


#### Authenticate using a shared access key

##### Choose a transport protocol

The `Client` object supports these protocols:

* `Amqp`
* `Http` - When using `Http`, the `Client` instance checks for messages from IoT Hub infrequently (a minimum of every 25 minutes).
* `Mqtt`
* `MqttWs`
* `AmqpWs`

Install needed transport protocols on your development machine.

For example, this command installs the `Amqp` protocol:

```cmd/sh
npm install azure-iot-device-amqp --save
```

For more information about the differences between MQTT, AMQP, and HTTPS support, see [Cloud-to-device communications guidance](iot-hub-devguide-c2d-guidance.md) and [Choose a communication protocol](iot-hub-devguide-protocols.md).

This example assigns the AMQP protocol to a `Protocol` variable. This Protocol variable is passed to the `Client.fromConnectionString` method in the **Add the connection string** section of this article.

```javascript
const Protocol = require('azure-iot-device-mqtt').Amqp;
```

###### Message completion, rejection, and abandon capabilities

Message completion, rejection, and abandon methods can be used depending on the protocol chosen.

###### AMQP and HTTP

The AMQP and HTTP transports can complete, reject, or abandon a message:

* [Complete](https://learn.microsoft.com/javascript/api/azure-iothub/client.servicereceiver?#azure-iothub-client-servicereceiver-complete) - To complete a message, the service that sent the cloud-to-device message is notified that the message is received. IoT Hub removes the message from the message queue. The method takes the form of `client.complete(message, callback function)`.
* [Reject](https://learn.microsoft.com/javascript/api/azure-iothub/client.servicereceiver?#azure-iothub-client-servicereceiver-reject) - To reject a message, the service that sent the cloud-to-device message is notified that the message is not processed by the device. IoT Hub permanently removes the message from the device queue. The method takes the form of `client.reject(message, callback function)`.
* [Abandon](https://learn.microsoft.com/javascript/api/azure-iothub/client.servicereceiver?#azure-iothub-client-servicereceiver-abandon) - To abandon a message, IoT Hub immediately tries to resend it. IoT Hub retains the message in the device queue for future consumption. The method takes the form of `client.abandon(message, callback function)`.

###### MQTT

MQTT does not support message complete, reject, or abandon functions. Instead, MQTT accepts a message by default and the message is removed from the IoT Hub message queue.

###### Redelivery attempts

If something happens that prevents the device from completing, abandoning, or rejecting the message, IoT Hub will, after a fixed timeout period, queue the message for delivery again. For this reason, the message processing logic in the device app must be *idempotent*, so that receiving the same message multiple times produces the same result.

##### Create a client object

Create a `Client` object using the installed package.

For example:

```javascript
const Client = require('azure-iot-device').Client;
```

##### Create a protocol object

Create a `Protocol` object using an installed transport package.

This example assigns the AMQP protocol:

```javascript
const Protocol = require('azure-iot-device-amqp').Amqp;
```

##### Add the device connection string and transport protocol

Call [fromConnectionString](https://learn.microsoft.com/javascript/api/azure-iot-device/client?#azure-iot-device-client-fromconnectionstring) to supply device connection parameters:

* **connStr** - The device connection string.
* **transportCtor** - The transport protocol.

This example uses the `Amqp` transport protocol:

```javascript
const deviceConnectionString = "{IoT hub device connection string}"
const Protocol = require('azure-iot-device-mqtt').Amqp;
let client = Client.fromConnectionString(deviceConnectionString, Protocol);
```

### Create an incoming message handler

The message handler is called for each incoming message.

After a message is successfully received, if using AMQP or HTTP transport then call the `client.complete` method to inform IoT Hub that the message can be removed from the message queue.

For example, this message handler prints the message ID and message body to the console, then calls `client.complete`  to notify IoT Hub that it processed the message and that it can safely be removed from the device queue. The call to `complete` isn't required if you're using MQTT transport and can be omitted. A call to`complete` is required for AMQP or HTTPS transport.

```javascript
function messageHandler(msg) {
  console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);
  client.complete(msg, printResultFor('completed'));
}
```

### Create a connection disconnect handler

The disconnect handler is called when the connection is disconnected. A disconnect handler is useful for implementing reconnect code.

This example catches and displays the disconnect error message to the console.

```javascript
function disconnectHandler() {
  clearInterval(sendInterval);
  sendInterval = null;
  client.open().catch((err) => {
    console.error(err.message);
  });
}
```

### Add event listeners

You can specify these event listeners using the [.on](https://learn.microsoft.com/javascript/api/azure-iot-device/client?#azure-iot-device-client-on) method.

* Connection handler
* Error handler
* Disconnect handler
* Message handler

This example includes the message and disconnect handlers defined previously.

```javascript
client.on('connect', connectHandler);
client.on('error', errorHandler);
client.on('disconnect', disconnectHandler);
client.on('message', messageHandler);
```

### Open the connection to IoT Hub

Use the [open](https://learn.microsoft.com/javascript/api/azure-iot-device/client?#azure-iot-device-client-open) method to open a connection between an IoT device and IoT Hub.
Use `.catch(err)` to catch an error and call handler code.

For example:

```javascript
client.open()
.catch((err) => {
  console.error('Could not connect: ' + err.message);
});
```

### SDK device samples

The Azure IoT SDK for Node.js provides a working sample of a device app that handles message receive. For more information, see:

[simple_sample_device](https://github.com/Azure/azure-iot-sdk-node/tree/main/device/samples) - A device app that connects to your IoT hub and receives cloud-to-device messages.

## Create a backend application

This section describes how to send a cloud-to-device message. As discussed previously, a solution backend application connects to an IoT Hub and messages are sent to IoT Hub encoded with a destination device. IoT Hub stores incoming messages to its message queue, and messages are delivered from the IoT Hub message queue to the target device.

A solution backend application can also request and receive delivery feedback for a message sent to IoT Hub that is destined for device delivery via the message queue.

### Install service SDK package

The [azure-iothub](https://learn.microsoft.com/javascript/api/azure-iothub) package contains objects that interface with IoT Hub. This article describes `Client` class code that sends a message from an application to a device via IoT Hub.

Run this command to install **azure-iothub** on your development machine:

```cmd/sh
npm install azure-iothub --save
```

### Load the client and message modules

Declare a `Client` object using the `Client` class from the `azure-iothub` package.

Declare a `Message` object using the `Message` class from the `azure-iot-common` package.

```javascript
'use strict';
var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;
```

### Connect to IoT hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Use [fromConnectionString](https://learn.microsoft.com/javascript/api/azure-iothub/client?#azure-iothub-client-fromconnectionstring) to connect to IoT hub.

In this example, the `serviceClient` object is created with the `Amqp` transport type.

  ```javascript
  var connectionString = '{IoT hub device connection string}';
  var serviceClient = Client.fromConnectionString(connectionString,`Amqp`);
  ```

##### Open the Client connection

Call the `Client` [open](https://learn.microsoft.com/javascript/api/azure-iothub/client?#azure-iothub-client-open-1) method to open a connection between an application and IoT Hub.

`open` can be called with or without specifying a callback function that is called when the `open` operation is complete.

In this example, the `open` method includes an optional `err` open connection callback function. If an open error occurs, an error object is returned. If the open connection is successful, a `null` callback value is returned.

```javascript
serviceClient.open(function (err)
if (err)
  console.error('Could not connect: ' + err.message);
```

#### Connect using Microsoft Entra


A backend app that uses Microsoft Entra must successfully authenticate and obtain a security token credential before connecting to IoT Hub. This token is passed to a IoT Hub connection method. For general information about setting up and using Microsoft Entra for IoT Hub, see [Control access to IoT Hub by using Microsoft Entra ID](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-azure-ad).

For an overview of Node.js SDK authentication, see:

* [Getting started with user authentication on Azure](https://learn.microsoft.com/azure/developer/javascript/how-to/with-authentication/getting-started)
* [Azure Identity client library for JavaScript](https://learn.microsoft.com/javascript/api/overview/azure/identity-readme)

##### Configure Microsoft Entra app

You must set up a Microsoft Entra app that is configured for your preferred authentication credential. The app contains parameters such as client secret that are used by the backend application to authenticate. The available app authentication configurations are:

* Client secret
* Certificate
* Federated identity credential

Microsoft Entra apps may require specific role permissions depending on operations being performed. For example, [IoT Hub Twin Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/internet-of-things#iot-hub-twin-contributor) is required to enable read and write access to a IoT Hub device and module twins. For more information, see [Manage access to IoT Hub by using Azure RBAC role assignment](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-azure-ad?#manage-access-to-iot-hub-by-using-azure-rbac-role-assignment).

For more information about setting up a Microsoft Entra app, see [Quickstart: Register an application with the Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app).

##### Authenticate using DefaultAzureCredential

The easiest way to use Microsoft Entra to authenticate a backend application is to use [DefaultAzureCredential](https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential), but it's recommended to use a different method in a production environment including a specific `TokenCredential` or pared-down `ChainedTokenCredential`. For simplicity, this section describes authentication using `DefaultAzureCredential` and Client secret.
For more information about the pros and cons of using `DefaultAzureCredential`, see
[Credential chains in the Azure Identity client library for JavaScript](https://learn.microsoft.com/azure/developer/javascript/sdk/credential-chains#use-defaultazurecredential-for-flexibility)

[DefaultAzureCredential](https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential) supports different authentication mechanisms and determines the appropriate credential type based on the environment it's executing in. It attempts to use multiple credential types in an order until it finds a working credential.

Microsoft Entra requires this package:

```shell
npm install --save @azure/identity
```

In this example, Microsoft Entra app registration client secret, client ID, and tenant ID have been added to environment variables. These environment variables are used by `DefaultAzureCredential` to authenticate the application. The result of a successful Microsoft Entra authentication is a security token credential that is passed to an IoT Hub connection method.

```javascript
import { DefaultAzureCredential } from "@azure/identity";

// Azure SDK clients accept the credential as a parameter
const credential = new DefaultAzureCredential();
```

The resulting credential token can then be passed to [fromTokenCredential](https://learn.microsoft.com/javascript/api/azure-iothub/registry?#azure-iothub-registry-fromtokencredential) to connect to IoT Hub for any SDK client that accepts Microsoft Entra credentials:

* [Registry](https://learn.microsoft.com/javascript/api/azure-iothub/registry?#azure-iothub-registry-fromtokencredential)
* [Client](https://learn.microsoft.com/javascript/api/azure-iothub/client?#azure-iothub-client-fromtokencredential)
* [JobClient](https://learn.microsoft.com/javascript/api/azure-iothub/jobclient?#azure-iothub-jobclient-fromtokencredential)

`fromTokenCredential` requires two parameters:

* The Azure service URL - The Azure service URL should be in the format `{Your Entra domain URL}.azure-devices.net` without a `https://` prefix. For example, `MyAzureDomain.azure-devices.net`.
* The Azure credential token

In this example, the Azure credential is obtained using `DefaultAzureCredential`. The Azure domain URL and credential are then supplied to `Registry.fromTokenCredential` to create the connection to IoT Hub.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");

let Registry = require('azure-iothub').Registry;

// Define the client secret values
clientSecretValue = 'xxxxxxxxxxxxxxx'
clientID = 'xxxxxxxxxxxxxx'
tenantID = 'xxxxxxxxxxxxx'

// Set environment variables
process.env['AZURE_CLIENT_SECRET'] = clientSecretValue;
process.env['AZURE_CLIENT_ID'] = clientID;
process.env['AZURE_TENANT_ID'] = tenantID;

// Acquire a credential object
const credential = new DefaultAzureCredential()

// Create an instance of the IoTHub registry
hostName = 'MyAzureDomain.azure-devices.net';
let registry = Registry.fromTokenCredential(hostName,credential);
```

##### Code samples

For working samples of Microsoft Entra service authentication, see [Azure identity examples](https://github.com/Azure/azure-sdk-for-js/blob/@azure/identity_4.5.0/sdk/identity/identity/samples/AzureIdentityExamples.md).


### Create a message

The [message](https://learn.microsoft.com/javascript/api/azure-iot-common/message) object includes the asynchronous cloud-to-device message. The message functionality works the same way over AMQP, MQTT, and HTTP.

The message object supports several properties, including these properties. See the [message](https://learn.microsoft.com/javascript/api/azure-iot-common/message) properties for a complete list.

* `ack` - Delivery feedback. Described in the next section.
* `properties` - A map containing string keys and values for storing custom message properties.
* [messageId](https://learn.microsoft.com/javascript/api/azure-iot-common/message?#azure-iot-common-message-messageid) - Used to correlate two-way communication.

Add the message body when the message object is instantiated. In this example, a `'Cloud to device message.'` message is added.

```javascript
var message = new Message('Cloud to device message.');
message.ack = 'full';
message.messageId = "My Message ID";
```

#### Delivery acknowledgment

A sending program can request delivery (or expiration) acknowledgments from IoT Hub for each cloud-to-device message. This option enables the sending program to use inform, retry, or compensation logic. A complete description of message feedback operations and properties are described at [Message feedback](https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-messages-c2d#message-feedback).

Each message that is to receive message feedback must include a value for the delivery acknowledgment [ack](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.message.ack) property. The `ack` property can be one of these values:

* none (default): no feedback message is generated.

* `sent`: receive a feedback message if the message was completed.

* : receive a feedback message if the message expired (or maximum delivery count was reached) without being completed by the device.

* `full`: feedback for both sent and not sent results.

In this example, the `ack` property is set to `full`, requesting both sent and not sent message delivery feedback for one message.

```javascript
message.ack = 'full';
```

### Link the message feedback receiver

The message feedback receiver callback function is linked to the `Client` using [getFeedbackReceiver](https://learn.microsoft.com/javascript/api/azure-iothub/client?#azure-iothub-client-getfeedbackreceiver).

The message feedback receiver receives two arguments:

* Error object (can be null)
* AmqpReceiver object - Emits events when new feedback messages are received by the client.

This example function receives and prints a delivery feedback message to the console.

```javascript
function receiveFeedback(err, receiver){
  receiver.on('message', function (msg) {
    console.log('Feedback message:')
    console.log(msg.getData().toString('utf-8'));
  });
}
```

This code links the `receiveFeedback` feedback callback function to the service `Client` object using `getFeedbackReceiver`.

```javascript
serviceClient.getFeedbackReceiver(receiveFeedback);
```

### Define a message completion results handler

The message send completion callback function is called after each message is sent.

This example function prints message `send` operation results to the console. In this example, the `printResultFor` function is supplied as a parameter to the `send` function described in the next section.

```javascript
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) console.log(op + ' error: ' + err.toString());
    if (res) console.log(op + ' status: ' + res.constructor.name);
  };
}
```

### Send a message

Use the [send](https://learn.microsoft.com/javascript/api/azure-iothub/client?#azure-iothub-client-send) function to send an asynchronous cloud-to-device message to the device app through IoT Hub.

`send` supports these parameters:

* **deviceID** - The device ID of the target device.
* **message** - The body of the message to send to the device.
* **done** - The optional function to call when the operation is complete. Done is called with two arguments:
  * Error object (can be null).
  * transport-specific response object useful for logging or debugging.

This code calls `send` to send a cloud-to-device message to the device app through IoT Hub. The callback function `printResultFor` defined in the previous section receives the delivery acknowledgment information.

```javascript
var targetDevice = '{device ID}';
serviceClient.send(targetDevice, message, printResultFor('send'));
```

This example shows how to send a message to your device and handle the feedback message when the device acknowledges the cloud-to-device message:

```javascript
serviceClient.open(function (err) {
  if (err) {
    console.error('Could not connect: ' + err.message);
  } else {
    console.log('Service client connected');
    serviceClient.getFeedbackReceiver(receiveFeedback);
    var message = new Message('Cloud to device message.');
    message.ack = 'full';
    message.messageId = "My Message ID";
    console.log('Sending message: ' + message.getData());
    serviceClient.send(targetDevice, message, printResultFor('send'));
  }
});
```

### SDK send message sample

The Azure IoT SDK for Node.js provides working samples of a service app that handles send message tasks. For more information, see:

[send_c2d_message.js](https://github.com/Azure/azure-iot-hub-node/tree/main/samples) - Send C2D messages to a device through IoT Hub.




## Connection reconnection policy

This article doesn't demonstrate a message retry policy for the device to IoT Hub connection or external application to IoT Hub connection. In production code, you should implement connection retry policies as described in [Manage device reconnections to create resilient applications](concepts-manage-device-reconnections.md).

## Message retention time, retry attempts, and max delivery count

As described in [Send cloud-to-device messages from IoT Hub](https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-messages-c2d#cloud-to-device-configuration-options), you can view and configure defaults for the following message values using portal IoT Hub configuration options or the Azure CLI. These configuration options can affect message delivery and feedback.

* Default TTL (time to live) - The amount of time a message is available for a device to consume before it's expired by IoT Hub.
* Feedback retention time - The amount of time IoT Hub retains the feedback for expiration or delivery of cloud-to-device messages.
* The number of times IoT Hub attempts to deliver a cloud-to-device message to a device.
