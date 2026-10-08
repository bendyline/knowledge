---
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
ms.devlang: java
ms.topic: include
ms.date: 12/19/2024
ms.custom:
  - amqp
  - mqtt
  - devx-track-java
  - devx-track-extended-java
  - sfi-ropc-nochange
---

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
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../articles/iot/iot-overview-security.md#connection-security).


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

For more information about the cloud-to-device message lifecycle and how IoT Hub processes cloud-to-device messages, see [Send cloud-to-device messages from an IoT hub](../articles/iot-hub/iot-hub-devguide-messages-c2d.md).

> **Note:**
> If you use HTTPS instead of MQTT or AMQP as the transport, the **DeviceClient** instance checks for messages from IoT Hub infrequently (a minimum of every 25 minutes). For more information about the differences between MQTT, AMQP, and HTTPS support, see [Cloud-to-device communications guidance](../articles/iot-hub/iot-hub-devguide-c2d-guidance.md) and [Choose a communication protocol](../articles/iot-hub/iot-hub-devguide-protocols.md).

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
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../articles/iot/iot-overview-security.md#cloud-security).


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
