---
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
ms.devlang: csharp
ms.topic: include
ms.date: 1/6/2025
ms.custom:
  - amqp
  - mqtt
  - "Role: Cloud Development"
  - "Role: IoT Device"
  - devx-track-csharp
  - devx-track-dotnet
  - sfi-ropc-nochange
---

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
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot/iot-overview-security.md#connection-security).


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

When using a transport type of HTTP 1 instead of MQTT or AMQP, the `ReceiveAsync` method returns immediately. The supported pattern for cloud-to-device messages with HTTP 1 is intermittently connected devices that check for messages infrequently (a minimum of every 25 minutes). Issuing more HTTP 1 receives results in IoT Hub throttling the requests. For more information about the differences between MQTT, AMQP, and HTTP 1 support, see [Cloud-to-device communications guidance](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-devguide-c2d-guidance.md) and [Choose a communication protocol](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-devguide-protocols.md).

#### CompleteAsync method

After the device receives a message, the device application calls the [CompleteAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.receiver-1.completeasync) method to notify IoT Hub that the message is successfully processed and that the message can be safely removed from the IoT Hub device queue. The device should call this method when its processing successfully completes regardless of the transport protocol it's using.

#### Message abandon, reject, or timeout

With AMQP and HTTP version 1 protocols, but not the [MQTT protocol](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-mqtt-connect-to-iot-hub.md), the device can also:

* Abandon a message by calling [AbandonAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.abandonasync). This results in IoT Hub retaining the message in the device queue for future consumption.
* Reject a message by calling [RejectAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.rejectasync). This permanently removes the message from the device queue.

If something happens that prevents the device from completing, abandoning, or rejecting the message, IoT Hub will, after a fixed timeout period, queue the message for delivery again. For this reason, the message processing logic in the device app must be *idempotent*, so that receiving the same message multiple times produces the same result.

For more information about the cloud-to-device message lifecycle and how IoT Hub processes cloud-to-device messages, see [Send cloud-to-device messages from an IoT hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-devguide-messages-c2d.md).

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
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot/iot-overview-security.md#cloud-security).


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
