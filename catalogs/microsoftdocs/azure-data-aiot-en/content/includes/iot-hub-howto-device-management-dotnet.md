---
title: Device management using direct methods (.NET)
titleSuffix: Azure IoT Hub
description: How to use Azure IoT Hub direct methods with the Azure IoT SDK for .NET for device management tasks including invoking a remote device reboot.
author: SoniaLopezBravo
ms.author: sonialopez
ms.service: iot-hub
ms.devlang: csharp
ms.topic: include
ms.date: 1/6/2025
ms.custom:
  - mqtt
  - devx-track-csharp
  - devx-track-dotnet
  - sfi-ropc-nochange
---

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
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../articles/iot/iot-overview-security.md#connection-security).


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
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../articles/iot/iot-overview-security.md#cloud-security).


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
