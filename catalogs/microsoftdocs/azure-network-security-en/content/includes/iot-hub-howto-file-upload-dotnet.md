---
title: Upload files from devices to Azure IoT Hub (.NET)
titleSuffix: Azure IoT Hub
description: How to upload files from a device to the cloud using Azure IoT device SDK for .NET. Uploaded files are stored in an Azure storage blob container.
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
ms.devlang: csharp
ms.topic: include
ms.date: 12/12/2024
ms.custom:
  - mqtt
  - devx-track-csharp
  - devx-track-dotnet
  - sfi-ropc-nochange
---

## Overview

This how-to contains two sections:

* Upload a file from a device application
* Receive file upload notification in a backend application

## Upload a file from a device application

This section describes how to upload a file from a device to an IoT hub using the [DeviceClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient) class in the Azure IoT SDK for .NET.

Follow this procedure to upload a file from a device to IoT hub:

1. Connect to IoT hub
1. Get a SAS URI from IoT hub
1. Upload the file to Azure storage
1. Notify IoT hub of the file upload status

### Connect a device to IoT Hub

A device app can authenticate with IoT Hub using the following methods:

* X.509 certificate
* Shared access key

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


#### Authenticate using a shared access key

Call [CreateFromConnectionString](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.createfromconnectionstring?#microsoft-azure-devices-client-deviceclient-createfromconnectionstring\(system-string\)) to connect to the device. Pass the device primary connection string.

`AMQP` is the default transport protocol.

``` csharp
static string connectionString = "{device primary connection string}";
deviceClient = DeviceClient.CreateFromConnectionString(connectionString);
```

### Get a SAS URI from IoT hub

Call [GetFileUploadSasUriAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.getfileuploadsasuriasync) to get file upload details. The SAS URI is used in the next step to upload a file from a device to Blob Storage.

```csharp
const string filePath = "TestPayload.txt";
using var fileStreamSource = new FileStream(filePath, FileMode.Open);
var fileName = Path.GetFileName(fileStreamSource.Name);
var fileUploadSasUriRequest = new FileUploadSasUriRequest
{
    BlobName = fileName
};

FileUploadSasUriResponse sasUri = await _deviceClient.GetFileUploadSasUriAsync(fileUploadSasUriRequest, System.Threading.CancellationToken cancellationToken = default);
Uri uploadUri = sasUri.GetBlobUri();
```

### Upload a file to Azure storage

To upload a file to Azure storage:

1. Create a [blockBlobClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blockblobclient) object, passing a file upload URI.

1. Use the [UploadAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blockblobclient.uploadasync?#azure-storage-blobs-specialized-blockblobclient-uploadasync\(system-io-stream-azure-storage-blobs-models-blobuploadoptions-system-threading-cancellationtoken\)) method to upload a file to Blob Storage, passing the SAS URI. You can optionally add Blob upload options and cancellation token parameters.

The Azure Blob client always uses HTTPS as the protocol to upload the file to Azure Storage.

In this example, `BlockBlobClient` is passed the SAS URI to create an Azure Storage block Blob client and uploads the file:

```csharp
var blockBlobClient = new BlockBlobClient(uploadUri);
await blockBlobClient.UploadAsync(fileStreamSource, null, null);
```

### Notify IoT hub of the file upload status

Use [CompleteFileUploadAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.completefileuploadasync) to notify IoT hub that the device client completed the upload, passing a [FileUploadCompletionNotification](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.transport.fileuploadcompletionnotification) object. The `IsSuccess` flag indicates whether or not the upload was successful. After being notified, IoT hub will release resources associated with the upload (the SAS URI).

If file upload notifications are enabled, IoT hub sends a file upload notification message to backend services that are configured for file upload notification.

```csharp
var successfulFileUploadCompletionNotification = new FileUploadCompletionNotification
{
    // Mandatory. Must be the same value as the correlation id returned in the sas uri response
    CorrelationId = sasUri.CorrelationId,

    // Mandatory. Will be present when service client receives this file upload notification
    IsSuccess = true,

    // Optional, user defined status code. Will be present when service client receives this file upload notification
    StatusCode = 200,

    // Optional, user-defined status description. Will be present when service client receives this file upload notification
    StatusDescription = "Success"
};

await _deviceClient.CompleteFileUploadAsync(successfulFileUploadCompletionNotification);
```

### SDK file upload sample

The SDK includes this [file upload sample](https://github.com/Azure/azure-iot-sdk-csharp/blob/main/iothub/device/samples/getting%20started/FileUploadSample/FileUploadSample.cs).

## Receive a file upload notification in a backend application

You can create a backend service to receive file upload notification messages from IoT hub.

The [ServiceClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.serviceclient) class contains methods that services can use to receive file upload notifications.

### Add service NuGet Package

Backend service applications require the **Microsoft.Azure.Devices** NuGet package.

### Connect to IoT hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Connect a backend application to a device using [CreateFromConnectionString](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager.createfromconnectionstring). Your application needs **service connect** permission. Supply this shared access policy connection string as a parameter to `fromConnectionString`. For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

For example:

```csharp
using Microsoft.Azure.Devices;
static ServiceClient serviceClient;
static string connectionString = "{Shared access policy connection string}";
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


### Receive file upload notification

To receive file upload notification:

1. Create a [CancellationToken](https://learn.microsoft.com/dotnet/api/azure.core.httpmessage.cancellationtoken?#azure-core-httpmessage-cancellationtoken).
1. Call [GetFileNotificationReceiver](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.serviceclient.getfilenotificationreceiver?#microsoft-azure-devices-serviceclient-getfilenotificationreceiver) to create a notification receiver.
1. Use a loop with [ReceiveAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.receiver-1.receiveasync?#microsoft-azure-devices-receiver-1-receiveasync\(system-threading-cancellationtoken\)) to wait for the file upload notification.

For example:

```csharp
// Define the cancellation token
CancellationTokenSource source = new CancellationTokenSource();
CancellationToken token = source.Token;

// Create a notification receiver
var notificationReceiver = serviceClient.GetFileNotificationReceiver();
Console.WriteLine("\nReceiving file upload notification from service");

// Check for file upload notifications
while (true)
{
    var fileUploadNotification = await notificationReceiver.ReceiveAsync(token);
    if (fileUploadNotification == null) continue;
    Console.ForegroundColor = ConsoleColor.Yellow;
    Console.WriteLine("Received file upload notification: {0}", 
        string.Join(", ", fileUploadNotification.BlobName));
    Console.ResetColor();
    await notificationReceiver.CompleteAsync(fileUploadNotification);
}
```

### SDK file upload receiver sample

The SDK includes this [file upload receiver sample](https://github.com/Azure/azure-iot-sdk-csharp/blob/86065001a92fedb42877722c6a57ae37e45eed30/iothub/service/samples/getting%20started/FileUploadNotificationReceiverSample/FileUploadNotificationReceiverSample.cs).
