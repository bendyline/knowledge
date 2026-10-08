---
title: Device management using direct methods
titleSuffix: Azure IoT Hub
description: How to use Azure IoT Hub direct methods for device management tasks including invoking a remote device reboot.
author: sethmanheim
ms.author: sethm
manager: lizross
ms.service: azure-iot-hub
ms.devlang: csharp
ms.topic: how-to
ms.date: 1/6/2025
zone_pivot_groups: iot-hub-howto-c2d-1
---

# Get started with device management

Back-end apps can use Azure IoT Hub primitives, such as [device twins](iot-hub-devguide-device-twins.md) and [direct methods](iot-hub-devguide-direct-methods.md), to remotely start and monitor device management actions on devices.

Use a direct method from a back-end application to initiate device management actions, such as reboot, factory reset, and firmware update.

The device is responsible for:

* Handling the direct method request sent from IoT Hub
* Initiating the corresponding device-specific action on the device
* Providing status updates through reported properties to IoT Hub

This article shows you how a back-end app and a device app can work together to initiate and monitor a remote device action using a direct method.

* A service app calls a direct method to reboot in a device app through an IoT hub.
* A device app handles a direct method to reboot a device.

>**Note:**
>The features described in this article are available only in the standard tier of IoT Hub. For more information about the basic and standard/free IoT Hub tiers, see [Choose the right IoT Hub tier and size for your solution](iot-hub-scaling.md).


> **Note:**
> This article is meant to complement [Azure IoT SDKs](iot-hub-devguide-sdks.md) samples that are referenced from within this article. You can use SDK tools to build both device and back-end applications.

## Prerequisites

* An IoT hub

* A registered device

* If your application uses the MQTT protocol, make sure that port 8883 is open in your firewall. The MQTT protocol communicates over port 8883. This port may be blocked in some corporate and educational network environments. For more information and ways to work around this issue, see [Connecting to IoT Hub (MQTT)](iot-mqtt-connect-to-iot-hub.md#connect-to-iot-hub).

**Applies to: programming-language-csharp**



  * Requires Visual Studio

## Overview

This article describes how to use the [Azure IoT SDK for .NET](https://github.com/Azure/azure-iot-sdk-csharp) to create device and backend service application code for device direct messages.

## Create a device application

This section describes how to use device application code to create a direct method callback listener.

### Required device NuGet packages

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

The [DeviceClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient) class exposes all the methods required to interact with device messages from the device.

Connect to the device using the [CreateFromConnectionString](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.createfromconnectionstring?#microsoft-azure-devices-client-deviceclient-createfromconnectionstring\(system-string-microsoft-azure-devices-client-transporttype\)) method along with device connection string and the connection transport protocol.

The `CreateFromConnectionString` [TransportType](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.transporttype) transport protocol parameter supports the following transport protocols:

* `Mqtt`
* `Mqtt_WebSocket_Only`
* `Mqtt_Tcp_Only`
* `Amqp`
* `Amqp_WebSocket_Only`
* `Amqp_Tcp_Only`
* `Http1`

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


### Create a direct method callback listener

Use [SetMethodHandlerAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.setmethodhandlerasync) to initialize a direct method callback listener. The listener is associated with a method name keyword, such as "reboot". The method name can be used in an IoT Hub or backend application to trigger the callback method on the device.

This example sets up a callback listener named `onReboot` that will trigger when the "reboot" direct method name is called.

```csharp
try
{
      // setup callback for "reboot" method
      deviceClient.SetMethodHandlerAsync("reboot", onReboot, null).Wait();
      Console.WriteLine("Waiting for reboot method\n Press enter to exit.");
      Console.ReadLine();

      Console.WriteLine("Exiting...");

      // as a good practice, remove the "reboot" handler
      deviceClient.SetMethodHandlerAsync("reboot", null, null).Wait();
      deviceClient.CloseAsync().Wait();
}
catch (Exception ex)
{
      Console.WriteLine();
      Console.WriteLine("Error in sample: {0}", ex.Message);
}
```

Continuing the example, the `onReboot` callback method implements the direct method on the device.

The handler function calls [MethodResponse](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.methodresponse) to send a response acknowledgment to the calling application.

```csharp
static Task<MethodResponse> onReboot(MethodRequest methodRequest, object userContext)
{
      // In a production device, you would trigger a reboot 
      // scheduled to start after this method returns.
      // For this sample, we simulate the reboot by writing to the console
      // and updating the reported properties.
      try
      {
         Console.WriteLine("Rebooting!");
      }
      catch (Exception ex)
      {
         Console.WriteLine();
         Console.WriteLine("Error in sample: {0}", ex.Message);
      }

      string result = @"{""result"":""Reboot started.""}";
      return Task.FromResult(new MethodResponse(Encoding.UTF8.GetBytes(result), 200));
}
```

> **Note:**
> To keep things simple, this article does not implement any retry policy. In production code, you should implement retry policies (such as an exponential backoff), as suggested in [Transient fault handling](https://learn.microsoft.com/azure/architecture/best-practices/transient-faults).

### SDK device samples

The Azure IoT SDK for .NET provides working samples of device apps that handle direct method tasks. For more information, see:

* [Method Sample](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/device/samples/getting%20started/MethodSample)
* [Simulated Device with Command](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/device/samples/getting%20started/SimulatedDeviceWithCommand)
* [Temperature Controller](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/device/samples/solutions/PnpDeviceSamples/TemperatureController)
* [Thermostat Sample](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/device/samples/solutions/PnpDeviceSamples/Thermostat)

## Create a backend application

This section describes how to trigger a direct method on a device.

The [ServiceClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.serviceclient) class exposes all methods required to create a backend application to send direct method calls to devices.

### Required service NuGet package

Backend service applications require the **Microsoft.Azure.Devices** NuGet package.

Add these `using` statements to use the service library.

```csharp
using Microsoft.Azure.Devices;
using Microsoft.Azure.Devices.Shared;
```

### Connect to IoT hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Connect a backend application using [CreateFromConnectionString](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.serviceclient.createfromconnectionstring?#microsoft-azure-devices-serviceclient-createfromconnectionstring\(system-string-microsoft-azure-devices-serviceclientoptions\)).

To invoke a direct method on a device through IoT Hub, your service needs the **service connect** permission. By default, every IoT Hub is created with a shared access policy named **service** that grants this permission.

As a parameter to `CreateFromConnectionString`, supply the **service** shared access policy. For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

```csharp
ServiceClient serviceClient;
string connectionString = "{IoT hub service shared access policy connection string}";
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


### Invoke a method on a device

To invoke a method on a device:

1. Create a [CloudToDeviceMethod](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.cloudtodevicemethod) object. Pass the device direct method name as a parameter.
1. Call [InvokeDeviceMethodAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.serviceclient.invokedevicemethodasync?#microsoft-azure-devices-serviceclient-invokedevicemethodasync\(system-string-microsoft-azure-devices-cloudtodevicemethod-system-threading-cancellationtoken\)) to invoke the method on the device.

This example calls the "reboot" method to initiate a reboot on the device. The "reboot" method is mapped to a listener on the device as described in the [Create a direct method callback listener](#create-a-direct-method-callback-listener) section of this article.

```csharp
string targetDevice = "myDeviceId";
CloudToDeviceMethod method = new CloudToDeviceMethod("reboot");
method.ResponseTimeout = TimeSpan.FromSeconds(30);

CloudToDeviceMethodResult response = await serviceClient.InvokeDeviceMethodAsync(targetDevice, method);

Console.WriteLine("Invoked firmware update on device.");
```

### SDK service samples

The Azure IoT SDK for .NET provides working samples of service apps that handle message tasks. For more information, see:

* [Invoke Device Method](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/service/samples/getting%20started/InvokeDeviceMethod)
* [Method E2E Tests](https://github.com/Azure/azure-iot-sdk-csharp/blob/main/e2e/test/iothub/method/MethodE2ETests.cs)
* [Temperature Controller](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/device/samples/solutions/PnpDeviceSamples/TemperatureController)
* [Thermostat Sample](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/device/samples/solutions/PnpDeviceSamples/Thermostat)




**Applies to: programming-language-java**



  * Requires [Java SE Development Kit 8](https://learn.microsoft.com/azure/developer/java/fundamentals/). Make sure you select **Java 8** under **Long-term support** to navigate to downloads for JDK 8.

## Overview

This article describes how to use the [Azure IoT SDK for Java](https://github.com/Azure/azure-iot-sdk-java) to create device and backend service application code for device direct methods.

## Create a device application

This section describes how to use device application code to create a direct method callback listener.

The [DeviceClient](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.deviceclient) class exposes all the methods you require to interact with direct methods on the device.


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../iot/iot-overview-security.md#connection-security).


### Device import statements

Use the following device import statements to access the Azure IoT SDK for Java.

```java
import com.microsoft.azure.sdk.iot.device.*;
import com.microsoft.azure.sdk.iot.device.exceptions.IotHubClientException;
import com.microsoft.azure.sdk.iot.device.twin.DirectMethodPayload;
import com.microsoft.azure.sdk.iot.device.twin.DirectMethodResponse;
import com.microsoft.azure.sdk.iot.device.twin.MethodCallback;
import com.microsoft.azure.sdk.iot.device.transport.IotHubConnectionStatus;
import com.microsoft.azure.sdk.iot.device.twin.SubscriptionAcknowledgedCallback;
```

### Connect a device to IoT Hub

A device app can authenticate with IoT Hub using the following methods:

* Shared access key
* X.509 certificate


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../iot/iot-overview-security.md#connection-security).


#### Authenticate using a shared access key

To connect to a device:

1. Use [IotHubClientProtocol](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.iothubclientprotocol) to choose a transport protocol. For example:

    ```java
    IotHubClientProtocol protocol = IotHubClientProtocol.MQTT;
    ```

1. Use the `DeviceClient` constructor to add the device primary connection string and protocol.

    ```java
    String connString = "{IoT hub device connection string}";
    DeviceClient client = new DeviceClient(connString, protocol);
    ```

1. Use [open](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.deviceclient?#com-microsoft-azure-sdk-iot-device-deviceclient-open\(\)) to connect the device to IoT hub. If the client is already open, the method does nothing.

    ```java
    client.open(true);
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


### Create a direct method callback listener

Use [subscribeToMethods](https://azure.github.io/azure-iot-sdk-java/master/device/com/microsoft/azure/sdk/iot/device/InternalClient.html#subscribeToMethods-com.microsoft.azure.sdk.iot.device.twin.MethodCallback-java.lang.Object-int-) to initialize a direct method callback listener. `subscribeToMethods` listens for incoming direct methods until the connection is terminated. The method name and payload is received for each direct method call.

The listener should call [DirectMethodResponse](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.twin.directmethodresponse) to send a method response acknowledgment to the calling application.

For example:

```java
client.subscribeToMethods(
    (methodName, methodData, context) ->
    {
        System.out.println("Received a direct method invocation with name " + methodName + " and payload " + methodData.getPayloadAsJsonString());
        return new DirectMethodResponse(200, methodData);
    },
    null);
System.out.println("Successfully subscribed to direct methods");
```

> **Note:**
> To keep things simple, this article does not implement any retry policy. In production code, you should implement retry policies (such as an exponential backoff), as suggested in [Transient fault handling](https://learn.microsoft.com/azure/architecture/best-practices/transient-faults).

### SDK device samples

The Azure IoT SDK for Java includes a working sample to test the device app concepts described in this article. For more information, see [Direct Method Sample](https://github.com/Azure/azure-iot-sdk-java/tree/main/iothub/device/iot-device-samples/direct-method-sample).

## Create a backend application

This section describes how to initiate a remote reboot on a device using a direct method.

The `ServiceClient` [DeviceMethod](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicemethod) class contains methods that services can use to access direct methods.

### Service import statements

Use the following service import statements to access the Azure IoT SDK for Java.

```java
import com.microsoft.azure.sdk.iot.service.methods.DirectMethodRequestOptions;
import com.microsoft.azure.sdk.iot.service.methods.DirectMethodsClient;
import com.microsoft.azure.sdk.iot.service.methods.DirectMethodResponse;
```

### Connect to IoT hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Use the [DeviceMethod](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicemethod?#com-microsoft-azure-sdk-iot-service-devicetwin-devicemethod-devicemethod\(java-lang-string\)) constructor to add the service primary connection string and connect to IoT Hub.

To invoke a direct method on a device through IoT Hub, your service needs the **service connect** permission. By default, every IoT Hub is created with a shared access policy named **service** that grants this permission.

As a parameter to the `DeviceMethod` constructor, supply the **service** shared access policy. For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

For example:

```java
String iotHubConnectionString = "HostName=xxxxx.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=xxxxxxxxxxxxxxxxxxxxxxxx";
DeviceMethod methodClient = new DeviceMethod(iotHubConnectionString);
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


### Invoke a method on a device

Call [DeviceMethod.invoke](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicemethod?#method-details) to invoke a method on a device and return the result status.

The `invoke` payload parameter is optional. Use `null` if there is no payload supplied. The payload parameter can take different data forms including string, byte array, and HashMap. For examples, see [Direct Method Tests](https://github.com/Azure/azure-iot-sdk-java/blob/main/iot-e2e-tests/common/src/test/java/tests/integration/com/microsoft/azure/sdk/iot/iothub/methods/DirectMethodsTests.java).

This example calls the "reboot" method to initiate a reboot on the device. The "reboot" method is mapped to a listener on the device as described in the **Create a direct method callback listener** section of this article.

For example:

```java
String deviceId = "myFirstDevice";
String methodName = "reboot";
String payload = "Test payload";
Long responseTimeout = TimeUnit.SECONDS.toSeconds(30);
Long connectTimeout = TimeUnit.SECONDS.toSeconds(5);

MethodResult result = methodClient.invoke(deviceId, methodName, responseTimeout, connectTimeout, payload);
if (result == null)
{
    throw new IOException("Method invoke returns null");
}
System.out.println("Status=" + result.getStatus());
```

### SDK service samples

The Azure IoT SDK for Java provides a working sample of service apps that handle direct method tasks. For more information, see:

* [Direct method sample](https://github.com/Azure/azure-iot-service-sdk-java/tree/main/service/iot-service-samples/direct-method-sample)
* [Thermostat service sample](https://github.com/Azure/azure-iot-service-sdk-java/blob/aeea7806be7e894d8a977c16b7e6618728267a94/service/iot-service-samples/pnp-service-sample/thermostat-service-sample/src/main/java/samples/com/microsoft/azure/sdk/iot/service/Thermostat.java)




**Applies to: programming-language-python**



  * Python SDK - [Python version 3.7 or later](https://www.python.org/downloads/) is recommended. Make sure to use the 32-bit or 64-bit installation as required by your setup. When prompted during the installation, make sure to add Python to your platform-specific environment variable.

## Overview

This article describes how to use the [Azure IoT SDK for Python](https://github.com/Azure/azure-iot-sdk-python) to create device and backend service application code for device direct methods.

## Install packages

The **azure-iot-device** library must be installed to create device applications.

```cmd/sh
pip install azure-iot-device
```

The **azure-iot-hub** library must be installed to create backend service applications.

```cmd/sh
pip install azure-iot-hub
```

## Create a device application

This section describes how to use device application code to create a direct method callback listener.

The [IoTHubDeviceClient](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient) class contains methods that can be used to work with direct methods.

### Device import statement

Add this import statement to access `IoTHubDeviceClient` and `MethodResponse`.

```python
# import the device client library
from azure.iot.device import IoTHubDeviceClient, MethodResponse
```

### Connect to a device

A device app can authenticate with IoT Hub using the following methods:

* Shared access key
* X.509 certificate


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../iot/iot-overview-security.md#connection-security).


#### Authenticate using a shared access key

Use [create_from_connection_string](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient?#azure-iot-device-iothubdeviceclient-create-from-connection-string) to connect an application to a device using a device connection string.

```python
# substitute the device connection string in conn_str
# and add it to the IoTHubDeviceClient object
conn_str = "{IoT hub device connection string}"
device_client = IoTHubDeviceClient.create_from_connection_string(conn_str)
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


### Create a direct method callback

Use [on_method_request_received](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient?#azure-iot-device-iothubdeviceclient-on-method-request-received) to create a handler function or coroutine that is called when a direct method is received. The listener is associated with a method name keyword, such as "reboot". The method name can be used in an IoT Hub or backend application to trigger the callback method on the device.

The handler function should create a [MethodResponse](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.methodresponse) and pass it to [send_method_response](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient?#azure-iot-device-iothubdeviceclient-send-method-response) to send a direct method response acknowledgment to the calling application.

This example sets up a direct method handler named `method_request_handler`.

```python
try:
    # Attach the handler to the client
    client.on_method_request_received = method_request_handler
except:
    # In the event of failure, clean up
    client.shutdown()
```

In this example, the `method_request_handler` callback method implements the direct method on the device. The code is executed when the "rebootDevice" direct method is called from a service application. The method calls `send_method_response` to send a direct method response acknowledgment to the calling application.

```python
# Define the handler for method requests
def method_request_handler(method_request):
    if method_request.name == "rebootDevice":
        # Act on the method by rebooting the device
        print("Rebooting device")
        time.sleep(20)
        print("Device rebooted")
        # Create a method response indicating the method request was resolved
        resp_status = 200
        resp_payload = {"Response": "This is the response from the device"}
        method_response = MethodResponse(method_request.request_id, resp_status, resp_payload)
    else:
        # Create a method response indicating the method request was for an unknown method
        resp_status = 404
        resp_payload = {"Response": "Unknown method"}
        method_response = MethodResponse(method_request.request_id, resp_status, resp_payload)

    # Send the method response
    client.send_method_response(method_response)
```

### SDK device samples

The Azure IoT SDK for Python provides a working sample of a device app that handles direct method tasks. For more information, see [Receive direct method](https://github.com/Azure/azure-iot-sdk-python/blob/main/samples/async-hub-scenarios/receive_direct_method.py).

## Create a backend application

This section describes how to use a backend service application to call a direct method on a device.

The [IoTHubRegistryManager](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager) class exposes all methods required to create a backend application to send messages to a device.

### Service import statements

Add these import statements to connect to IoT Hub, send cloud-to-device direct methods, and receive device direct method responses.

```python
from azure.iot.hub import IoTHubRegistryManager
from azure.iot.hub.models import CloudToDeviceMethod, CloudToDeviceMethodResult
```

### Connect to IoT hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Connect to IoT hub using [from_connection_string](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager?#azure-iot-hub-iothubregistrymanager-from-connection-string).

To invoke a direct method on a device through IoT Hub, your service needs the **service connect** permission. By default, every IoT Hub is created with a shared access policy named **service** that grants this permission.

As a parameter to `from_connection_string`, supply the **service** shared access policy. For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

For example:

```python
# Connect to IoT hub
IOTHUB_CONNECTION_STRING = "{IoT hub service connection string}"
iothub_registry_manager = IoTHubRegistryManager.from_connection_string(IOTHUB_CONNECTION_STRING)
```

#### Connect using Microsoft Entra


A backend app that uses Microsoft Entra must successfully authenticate and obtain a security token credential before connecting to IoT Hub. This token is passed to a IoT Hub connection method. For general information about setting up and using Microsoft Entra for IoT Hub, see [Control access to IoT Hub by using Microsoft Entra ID](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-azure-ad).

For an overview of Python SDK authentication, see [Authenticate Python apps to Azure services by using the Azure SDK for Python](https://learn.microsoft.com/azure/developer/python/sdk/authentication/overview)

##### Configure Microsoft Entra app

You must set up a Microsoft Entra app that is configured for your preferred authentication credential. The app contains parameters such as client secret that are used by the backend application to authenticate. The available app authentication configurations are:

* Client secret
* Certificate
* Federated identity credential

Microsoft Entra apps may require specific role permissions depending on operations being performed. For example, [IoT Hub Twin Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/internet-of-things#iot-hub-twin-contributor) is required to enable read and write access to a IoT Hub device and module twins. For more information, see [Manage access to IoT Hub by using Azure RBAC role assignment](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-azure-ad?#manage-access-to-iot-hub-by-using-azure-rbac-role-assignment).

For more information about setting up a Microsoft Entra app, see [Quickstart: Register an application with the Microsoft identity platform](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app).

##### Authenticate using DefaultAzureCredential

The easiest way to use Microsoft Entra to authenticate a backend application is to use [DefaultAzureCredential](https://learn.microsoft.com/azure/developer/python/sdk/authentication/overview#use-defaultazurecredential-in-an-application), but it's recommended to use a different method in a production environment including a specific `TokenCredential` or pared-down `ChainedTokenCredential`. For simplicity, this section describes authentication using `DefaultAzureCredential` and Client secret. For more information about the pros and cons of using `DefaultAzureCredential`, see [Credential chains in the Azure Identity client library for Python](https://learn.microsoft.com/azure/developer/python/sdk/authentication/credential-chains).

[DefaultAzureCredential](https://learn.microsoft.com/python/api/azure-identity/azure.identity.defaultazurecredential) supports different authentication mechanisms and determines the appropriate credential type based on the environment it's executing in. It attempts to use multiple credential types in an order until it finds a working credential.

Microsoft Entra requires this import package and corresponding `import` statement:

```shell
pip install azure-identity
```

```python
from azure.identity import DefaultAzureCredential
```

In this example, Microsoft Entra app registration client secret, client ID, and tenant ID have been added to environment variables. These environment variables are used by `DefaultAzureCredential` to authenticate the application. The result of a successful Microsoft Entra authentication is a security token credential that is passed to an IoT Hub connection method.

```python
from azure.identity import DefaultAzureCredential
credential = DefaultAzureCredential()
```

The resulting [AccessToken](https://learn.microsoft.com/python/api/azure-core/azure.core.credentials.accesstoken) can then be passed to `from_token_credential` to connect to IoT Hub for any SDK client that accepts Microsoft Entra credentials:

* [IoTHubRegistryManager](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager?#azure-iot-hub-iothubregistrymanager-from-token-credential) to create a service connection to IoT Hub using an Entra token credential.
* [IoTHubJobManager](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubjobmanager?#azure-iot-hub-iothubjobmanager-from-token-credential)
* [DigitalTwinClient](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.digitaltwinclient?#azure-iot-hub-digitaltwinclient-from-token-credential)
* [IoTHubHttpRuntimeManager](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubhttpruntimemanager?#azure-iot-hub-iothubhttpruntimemanager-from-token-credential)
* [IoTHubConfigurationManager](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubconfigurationmanager?#azure-iot-hub-iothubconfigurationmanager-from-token-credential)

`from_token_credential` requires two parameters:

* The Azure service URL - The Azure service URL should be in the format `{Your Entra domain URL}.azure-devices.net` without a `https://` prefix. For example, `MyAzureDomain.azure-devices.net`.
* The Azure credential token

In this example, the Azure credential is obtained using `DefaultAzureCredential`. The Azure service URL and credential are then supplied to `IoTHubRegistryManager.from_token_credential` to create the connection to IoT Hub.

```python
import sys
import os

from azure.identity import DefaultAzureCredential
from azure.iot.hub import IoTHubRegistryManager

# Define the client secret values
clientSecretValue = 'xxxxxxxxxxxxxxx'
clientID = 'xxxxxxxxxxxxxx'
tenantID = 'xxxxxxxxxxxxx'

# Set environment variables
os.environ['AZURE_CLIENT_SECRET'] = clientSecretValue
os.environ['AZURE_CLIENT_ID'] = clientID
os.environ['AZURE_TENANT_ID'] = tenantID

# Acquire a credential object
credential = DefaultAzureCredential()

# Use Entra to authorize IoT Hub service
print("Connecting to IoTHubRegistryManager...")
iothub_registry_manager = IoTHubRegistryManager.from_token_credential(
url="MyAzureDomain.azure-devices.net",
token_credential=credential)
```

##### Code samples

For working samples of Microsoft Entra service authentication, see [Microsoft Authentication Library (MSAL) for Python](https://github.com/AzureAD/microsoft-authentication-library-for-python/blob/1.22.0/README.md).


### Invoke a method on a device

You can invoke a direct method by name on a device. The method name identifies the method. In the following and previous device example shown in **Create a direct method callback**, the direct method name is "rebootDevice".

To invoke a direct method on a device:

1. Create a [CloudToDeviceMethod](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.protocol.models.cloudtodevicemethod) object. Supply the method name and payload as parameters.
1. Call [invoke_device_method](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothub_registry_manager.iothubregistrymanager?#azure-iot-hub-iothub-registry-manager-iothubregistrymanager-invoke-device-method) to invoke a direct method on a device. Supply the device ID and `CloudToDeviceMethod` payload object as parameters.

This example calls `CloudToDeviceMethod` to invoke a direct method named "rebootDevice" on a device. After the direct method is successfully invoked, the direct method response payload is displayed.

```python
CONNECTION_STRING = "{IoTHubConnectionString}"
DEVICE_ID = "{deviceId}"

METHOD_NAME = "rebootDevice"
METHOD_PAYLOAD = "{\"method_number\":\"42\"}"
TIMEOUT = 60
WAIT_COUNT = 10

try:
    print ( "" )
    print ( "Invoking device to reboot..." )

    # Call the direct method.
    deviceMethod = CloudToDeviceMethod(method_name=METHOD_NAME, payload=METHOD_PAYLOAD)
    response = registry_manager.invoke_device_method(DEVICE_ID, deviceMethod)

    print ( "Successfully invoked the device to reboot." )

    print ( "The device has returned this payload:" )
    print ( response.payload )

except Exception as ex:
    print ( "" )
    print ( "Unexpected error {0}".format(ex) )
    return
```

### SDK service samples

The Azure IoT SDK for Python provides working samples of service apps that handle direct method tasks. For more information, see:

* [Service helper sync](https://github.com/Azure/azure-iot-sdk-python/blob/e75d1c2026eab939d5d31097fd0c22924c53abf8/dev_utils/dev_utils/service_helper_sync.py)
* [Service operations](https://github.com/Azure/azure-iot-sdk-python/blob/e75d1c2026eab939d5d31097fd0c22924c53abf8/tests/e2e/provisioning_e2e/iothubservice20180630/operations/service_operations.py)




**Applies to: programming-language-node**



  *  Requires Node.js version 10.0.x or later

## Overview

This article describes how to use the [Azure IoT SDK for Node.js](https://github.com/Azure/azure-iot-sdk-node) to create device and backend service application code for device direct methods.

## Create a device application

This section describes how to use device application code to create a direct method callback.

### Install SDK package

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

##### Open the connection to IoT Hub

Use the [open](https://learn.microsoft.com/javascript/api/azure-iot-device/client?#azure-iot-device-client-open) method to open connection between an IoT device and IoT Hub.

For example:

```javascript
client.open(function(err) {
  if (err) {
    console.error('error connecting to hub: ' + err);
    process.exit(1);
  }
})
```

### Create a direct method callback

Call [onDeviceMethod](https://learn.microsoft.com/javascript/api/azure-iot-device/client?#azure-iot-device-client-ondevicemethod) to create a callback handler function or coroutine that is called when a direct method is received. The listener is associated with a method name keyword, such as "reboot". The method name can be used in an IoT Hub or backend application to trigger the callback method on the device.

The callback handler function should call `response.send` to send a response acknowledgment message to the calling application.

This example sets up a direct method handler named `onReboot` that is called when the "reboot" direct method name is used.

```javascript
client.onDeviceMethod('reboot', onReboot);
```

In this example, the `onReboot` callback method implements the direct method on the device. The code is executed when the "reboot" direct method is called from a service application. The function calls `response.send` to send a response acknowledgment message to the calling application.

```javascript
var onReboot = function(request, response) {

    // Respond the cloud app for the direct method
    response.send(200, 'Reboot started', function(err) {
        if (err) {
            console.error('An error occurred when sending a method response:\n' + err.toString());
        } else {
            console.log('Response to method \'' + request.methodName + '\' sent successfully.');
        }
    });

    // Add your device's reboot API for physical restart.
    console.log('Rebooting!');
};
```

### SDK device samples

The Azure IoT SDK for Node.js provides working samples of device apps that handle device management tasks. For more information, see:

* [Device method sample](https://github.com/Azure/azure-iot-sdk-node/blob/a85e280350a12954f46672761b0b516d08d374b5/device/samples/javascript/device_methods.js)
* [Device methods E2E test](https://github.com/Azure/azure-iot-sdk-node/blob/a85e280350a12954f46672761b0b516d08d374b5/e2etests/test/device_method.js)
* [DM patterns reboot device](https://github.com/Azure/azure-iot-sdk-node/blob/a85e280350a12954f46672761b0b516d08d374b5/device/samples/javascript/dmpatterns_reboot_device.js)

## Create a backend application

This section describes how to invoke a direct method on a device.

### Install service SDK package

Run this command to install **azure-iothub** on your development machine:

```cmd/sh
npm install azure-iothub --save
```

### Connect to IoT hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Use [fromConnectionString](https://learn.microsoft.com/javascript/api/azure-iothub/client?#azure-iothub-client-fromconnectionstring) to connect to IoT hub.

To invoke a direct method on a device through IoT Hub, your service needs the **service connect** permission. By default, every IoT Hub is created with a shared access policy named **service** that grants this permission.

As a parameter to `CreateFromConnectionString`, supply the **service** shared access policy connection string. For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

```javascript
var Client = require('azure-iothub').Client;
var connectionString = '{IoT hub shared access policy connection string}';
var client = Client.fromConnectionString(connectionString);
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


### Invoke a method on a device

Use [invokeDeviceMethod](https://learn.microsoft.com/javascript/api/azure-iothub/client?#azure-iothub-client-invokedevicemethod) to invoke a direct method by name on a device. The method name parameter identifies the direct method.

This example calls the "reboot" method to initiate a reboot on the device. The "reboot" method is mapped to a callback handler function on the device as described in the **Create a direct method callback** section of this article.

```javascript
var startRebootDevice = function(deviceToReboot) {

    var methodName = "reboot";

    var methodParams = {
        methodName: methodName,
        payload: null,
        timeoutInSeconds: 30
    };

    client.invokeDeviceMethod(deviceToReboot, methodParams, function(err, result) {
        if (err) {
            console.error("Direct method error: "+err.message);
        } else {
            console.log("Successfully invoked the device to reboot.");  
        }
    });
};
```

### SDK service samples

The Azure IoT SDK for Node.js provides working samples of service apps that handle device management tasks. For more information, see:

* [Module methods](https://github.com/Azure/azure-iot-sdk-node/blob/a85e280350a12954f46672761b0b516d08d374b5/e2etests/test/module_methods.js)
* [Device method tests](https://github.com/Azure/azure-iot-sdk-node/blob/a85e280350a12954f46672761b0b516d08d374b5/ts-e2e/src/device_methods.tests.ts)
* [Device method E2E tests](https://github.com/Azure/azure-iot-sdk-node/blob/a85e280350a12954f46672761b0b516d08d374b5/e2etests/test/device_method.js)
* [Method disconnect](https://github.com/Azure/azure-iot-sdk-node/blob/a85e280350a12954f46672761b0b516d08d374b5/e2etests/test/method_disconnect.js)
