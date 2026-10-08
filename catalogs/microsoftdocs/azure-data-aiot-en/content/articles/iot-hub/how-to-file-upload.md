---
title: Upload files from your device to the cloud with Azure IoT Hub
titleSuffix: Azure IoT Hub
description: How to upload files from a device to the cloud using the Azure IoT SDKs for C#, Python, Java, and Node.js.
author: sethmanheim
ms.author: sethm
manager: lizross
ms.service: azure-iot-hub
ms.topic: how-to
ms.date: 11/11/2025
zone_pivot_groups: iot-hub-howto-c2d-1
ms.custom: [amqp, mqtt, "Role: Cloud Development", "Role: IoT Device"]
---

# Upload files from a device to the cloud with Azure IoT Hub

This article demonstrates how to:

* Use file upload capabilities of IoT Hub to upload a file to Azure Blob Storage, using an Azure IoT device and service SDKs.
* Notify IoT Hub that the file was successfully uploaded and create a backend service to receive file upload notifications from IoT Hub, using the Azure IoT service SDKs.

In some scenarios, you can't easily map the data your devices send into the relatively small device-to-cloud messages that IoT Hub accepts. The file upload capabilities in IoT Hub enable you to move large or complex data to the cloud. For example:

* Videos
* Large files that contain images
* Vibration data sampled at high frequency
* Some form of preprocessed data

These files are typically batch processed in the cloud, using tools such as [Azure Data Factory](../data-factory/introduction.md) or the [Hadoop](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/hdinsight/index.yml) stack. When you need to upload files from a device, you can still use the security and reliability of IoT Hub. This article shows you how.

This article is meant to complement runnable SDK samples that are referenced from within this article.

For more information, see:

* [Overview of file uploads with IoT Hub](iot-hub-devguide-file-upload.md)
* [Introduction to Azure Blob Storage](../storage/blobs/storage-blobs-introduction.md)
* [Azure IoT SDKs](iot-hub-devguide-sdks.md)

## Prerequisites

* **An IoT hub**. Some SDK calls require the IoT Hub primary connection string, so make a note of the connection string.

* **A registered device**. Some SDK calls require the device primary connection string, so make a note of the connection string.

* IoT Hub **Service Connect** permission - To receive file upload notification messages, your backend service needs the **Service Connect** permission. By default, every IoT Hub is created with a shared access policy named **service** that grants this permission. For more information, see [Connect to an IoT hub](https://learn.microsoft.com/azure/iot-hub/create-hub?\&tabs=portal#connect-to-an-iot-hub).

* Configure file upload in your IoT hub by linking an **Azure Storage account** and **Azure Blob Storage container**. You can configure these using the [Azure portal](https://learn.microsoft.com/azure/iot-hub/iot-hub-configure-file-upload), [Azure CLI](https://learn.microsoft.com/azure/iot-hub/iot-hub-configure-file-upload-cli), or [Azure PowerShell](https://learn.microsoft.com/azure/iot-hub/iot-hub-configure-file-upload-powershell).

**Applies to: programming-language-csharp**



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
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


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




**Applies to: programming-language-java**



## Overview

This how-to contains two sections:

* Upload a file from a device application
* Receive file upload notification in a backend application

## Upload a file from a device application

This section describes how to upload a file from a device to an IoT hub using the [DeviceClient](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.deviceclient) class from the Azure IoT SDK for Java.

Follow this procedure to upload a file from a device to IoT hub:

1. Connect the device to IoT Hub
1. Get a SAS URI from IoT hub
1. Upload the file to Azure Storage
1. Send file upload status notification to IoT hub

### Connect a device to IoT Hub

A device app can authenticate with IoT Hub using the following methods:

* X.509 certificate
* Shared access key

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


#### Authenticate using a shared access key

File upload operations always use HTTPS, but [DeviceClient](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.deviceclient) can define the [IotHubClientProtocol](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.iothubclientprotocol) for other services like telemetry, device method, and device twin.

```java
IotHubClientProtocol protocol = IotHubClientProtocol.MQTT;
```

Instantiate the `DeviceClient` to connect to the device using the device primary connection string.

```java
String connString = "{IoT hub connection string}";
DeviceClient client = new DeviceClient(connString, protocol);
```

### Get a SAS URI from IoT hub

Call [getFileUploadSasUri](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.deviceclient?#com-microsoft-azure-sdk-iot-device-deviceclient-getfileuploadsasuri\(com-microsoft-azure-sdk-iot-deps-serializer-fileuploadsasurirequest\)) to obtain a [FileUploadSasUriResponse](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.deps.serializer.fileuploadsasuriresponse) object.

`FileUploadSasUriResponse` includes these methods and return values. The return values can be passed to file upload methods.

| Method | Return value |
| --- | --- |
| `getCorrelationId()` | Correlation ID |
| `getContainerName()` | Container name |
| `getBlobName()` | Blob name |
| `getBlobUri()` | Blob URI |

For example:

```java
FileUploadSasUriResponse sasUriResponse = client.getFileUploadSasUri(new FileUploadSasUriRequest(file.getName()));

System.out.println("Successfully got SAS URI from IoT hub");
System.out.println("Correlation Id: " + sasUriResponse.getCorrelationId());
System.out.println("Container name: " + sasUriResponse.getContainerName());
System.out.println("Blob name: " + sasUriResponse.getBlobName());
System.out.println("Blob Uri: " + sasUriResponse.getBlobUri());
```

### Upload the file to Azure Storage

Pass the blob URI endpoint to [BlobClientBuilder.buildclient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobclientbuilder?#com-azure-storage-blob-blobclientbuilder-buildclient\(\)) to create the [BlobClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobclient) object.

```java
BlobClient blobClient =
    new BlobClientBuilder()
        .endpoint(sasUriResponse.getBlobUri().toString())
        .buildClient();
```

Call [uploadFromFile](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobclient?#com-azure-storage-blob-blobclient-uploadfromfile\(java-lang-string\)) to upload the file to Blob Storage.

```java
String fullFileName = "Path of the file to upload";
blobClient.uploadFromFile(fullFileName);
```

### Send file upload status notification to IoT hub

Send an upload status notification to IoT hub after a file upload attempt.

Create a [FileUploadCompletionNotification](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.deps.serializer.fileuploadcompletionnotification?#com-microsoft-azure-sdk-iot-deps-serializer-fileuploadcompletionnotification-fileuploadcompletionnotification\(java-lang-string-java-lang-boolean\)) object. Pass the `correlationId` and `isSuccess` file upload success status. Pass an `isSuccess` `true` value when file upload was successful, `false` when not.

`FileUploadCompletionNotification` must be called even when the file upload fails. IoT hub has a fixed number of SAS URI allowed to be active at any given time. Once you're done with the file upload, you should free your SAS URI so that other SAS URI can be generated. If a SAS URI isn't freed through this API, then it frees itself eventually based on how long SAS URIs are configured to live on an IoT hub.

This example passes a successful status.

```java
FileUploadCompletionNotification completionNotification = new FileUploadCompletionNotification(sasUriResponse.getCorrelationId(), true);
client.completeFileUpload(completionNotification);
```

### Close the client

Free the `client` resources.

```java
client.closeNow();
```

## Create a backend application

This section describes how to receive a file upload notification in a backend application.

The [ServiceClient](https://learn.microsoft.com/java/api/com.azure.core.annotation.serviceclient) class contains methods that services can use to receive file upload notifications.

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
private static final IotHubServiceClientProtocol protocol =    
    IotHubServiceClientProtocol.AMQPS;
```

##### Create the ServiceClient object

Create the [ServiceClient](https://learn.microsoft.com/java/api/com.azure.core.annotation.serviceclient) object, supplying the IoT Hub connection string and protocol.

To upload a file on a device to IoT Hub, your service needs the **service connect** permission. By default, every IoT Hub is created with a shared access policy named **service** that grants this permission.

As a parameter to the `ServiceClient` constructor, supply the **service** shared access policy. For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

```java
String iotHubConnectionString = "HostName=xxxxx.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey=xxxxxxxxxxxxxxxxxxxxxxxx";
private static final ServiceClient serviceClient (iotHubConnectionString, protocol);
```

##### Open the connection between application and IoT Hub

[Open](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.serviceclient?#com-microsoft-azure-sdk-iot-service-serviceclient-open\(\)) the AMQP sender connection. This method creates the connection between the application and IoT Hub.

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


### Check for file upload status

To check for file upload status:

1. Create a [getFileUploadNotificationReceiver](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.fileuploadnotificationreceiver) object.
1. Use [open](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.fileuploadnotificationreceiver?#com-microsoft-azure-sdk-iot-service-fileuploadnotificationreceiver-open\(\)) to connect to IoT hub.
1. Call [receive](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.fileuploadnotificationreceiver?#com-microsoft-azure-sdk-iot-service-fileuploadnotificationreceiver-receive\(\)) to check for the file upload status. This method returns a [fileUploadNotification](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.fileuploadnotification) object. If an upload notice is received, you can view upload status fields using [fileUploadNotification](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.fileuploadnotification) methods.

For example:

```java
FileUploadNotificationReceiver receiver = serviceClient.getFileUploadNotificationReceiver();
receiver.open();
FileUploadNotification fileUploadNotification = receiver.receive(2000);

if (fileUploadNotification != null)
{
    System.out.println("File Upload notification received");
    System.out.println("Device Id : " + fileUploadNotification.getDeviceId());
    System.out.println("Blob Uri: " + fileUploadNotification.getBlobUri());
    System.out.println("Blob Name: " + fileUploadNotification.getBlobName());
    System.out.println("Last Updated : " + fileUploadNotification.getLastUpdatedTimeDate());
    System.out.println("Blob Size (Bytes): " + fileUploadNotification.getBlobSizeInBytes());
    System.out.println("Enqueued Time: " + fileUploadNotification.getEnqueuedTimeUtcDate());
}
else
{
    System.out.println("No file upload notification");
}

// Close the receiver object
receiver.close();
```

### SDK file upload samples

There are two Java file upload [samples](https://github.com/Azure/azure-iot-sdk-java/tree/main/iothub/device/iot-device-samples/file-upload-sample/src/main/java/samples/com/microsoft/azure/sdk/iot).




**Applies to: programming-language-python**



## Install packages

The azure-iot-device library must be installed before calling any related code.

```cmd/sh
pip install azure-iot-device
```

The [azure.storage.blob](https://pypi.org/project/azure-storage-blob/) package is used to perform the file upload.

```cmd/sh
pip install azure.storage.blob
```

## Upload file from a device application

This section describes how to upload a file from a device to an IoT hub using the [IoTHubDeviceClient](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient) class from the Azure IoT SDK for Python.

### Import libraries

```python
import os
from azure.iot.device import IoTHubDeviceClient
from azure.core.exceptions import AzureError
from azure.storage.blob import BlobClient
```

### Connect a device to IoT Hub

A device app can authenticate with IoT Hub using the following methods:

* X.509 certificate
* Shared access key

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

### Get Blob Storage information

Call [get_storage_info_for_blob](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient?#azure-iot-device-iothubdeviceclient-get-storage-info-for-blob) to get information from an IoT hub about a linked Azure Storage account. This information includes the hostname, container name, blob name, and a SAS token. The `get_storage_info_for_blob` method also returns a `correlation_id`, which is used in the `notify_blob_upload_status` method. The `correlation_id` is IoT Hub's way of marking which Blob you're working on.

```python
# Get the storage info for the blob
PATH_TO_FILE = "{Full path to local file}"
blob_name = os.path.basename(PATH_TO_FILE)
blob_info = device_client.get_storage_info_for_blob(blob_name)
```

### Upload a file into Blob Storage

To upload a file into Blob Storage:

1. Use [from_blob_url](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient?#azure-storage-blob-blobclient-from-blob-url) to create a [BlobClient](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient?#azure-storage-blob-blobclient-from-blob-url) object from a blob URL.
1. Call [upload_blob](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient?#azure-storage-blob-blobclient-upload-blob) to upload the file into the Blob Storage.

This example parses the `blob_info` structure to create a URL that it uses to initialize an [BlobClient](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient). Then it calls `upload_blob` to upload the file into Blob Storage.

```python
try:
    sas_url = "https://{}/{}/{}{}".format(
        blob_info["hostName"],
        blob_info["containerName"],
        blob_info["blobName"],
        blob_info["sasToken"]
    )

    print("\nUploading file: {} to Azure Storage as blob: {} in container {}\n".format(file_name, blob_info["blobName"], blob_info["containerName"]))

    # Upload the specified file
    with BlobClient.from_blob_url(sas_url) as blob_client:
        with open(file_name, "rb") as f:
            result = blob_client.upload_blob(f, overwrite=True)
            return (True, result)

except FileNotFoundError as ex:
    # catch file not found and add an HTTP status code to return in notification to IoT hub
    ex.status_code = 404
    return (False, ex)

except AzureError as ex:
    # catch Azure errors that might result from the upload operation
    return (False, ex)
```

### Notify IoT hub of upload status

Use [notify_blob_upload_status](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient?#azure-iot-device-iothubdeviceclient-notify-blob-upload-status) to notify IoT hub of the status of the Blob Storage operation. Pass the `correlation_id` obtained by the `get_storage_info_for_blob` method. The `correlation_id` is used by IoT hub to notify any service that might be listening for a notification regarding the status of the file upload task.

This example notifies IoT hub of a successful file upload:

```python
device_client.notify_blob_upload_status(storage_info["correlationId"], True, 200, "OK: {}".format(PATH_TO_FILE)
```

### Shut down the device client

Shut down the client. Once this method is called, any attempt at further client calls result in a [ClientError](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.exceptions.clienterror) being raised.

```python
device_client.shutdown()
```

### SDK file upload samples

The SDK includes two file upload samples:

* [Upload to blob](https://github.com/Azure/azure-iot-sdk-python/blob/main/samples/async-hub-scenarios/upload_to_blob.py)
* [Upload to blob using an X.509 certificate](https://github.com/Azure/azure-iot-sdk-python/blob/main/samples/async-hub-scenarios/upload_to_blob_x509.py)




**Applies to: programming-language-node**



## Overview

This article describes how to use the [Azure IoT SDK for Node.js](https://github.com/Azure/azure-iot-sdk-node) to create a device app to upload a file and backend service application receive file upload notification.

## Create a device application

This section describes how to upload a file from a device to an IoT hub using the [azure-iot-device](https://learn.microsoft.com/javascript/api/azure-iot-device) package in the Azure IoT SDK for Node.js.

### Install SDK packages

Run this command to install the **azure-iot-device** device SDK, the **azure-iot-device-mqtt**, and the **@azure/storage-blob** packages on your development machine:

```cmd/sh
npm install azure-iot-device azure-iot-device-mqtt @azure/storage-blob --save
```

The [azure-iot-device](https://learn.microsoft.com/javascript/api/azure-iot-device) package contains objects that interface with IoT devices.

Follow this procedure to upload a file from a device to IoT hub:

1. Connect the device to IoT Hub
1. Get a Blob shared access signature (SAS) token from IoT Hub
1. Upload the file to Azure Storage
1. Send file upload status notification to IoT hub

### Create modules

Create Client, Protocol, errors, and path modules using the installed packages.

```javascript
const Protocol = require('azure-iot-device-mqtt').Mqtt;
const errors = require('azure-iot-common').errors;
const path = require('path');
```

### Connect a device to IoT Hub

A device app can authenticate with IoT Hub using the following methods:

* X.509 certificate
* Shared access key

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

#### Get a SAS token from IoT hub

Use [getBlobSharedAccessSignature](https://learn.microsoft.com/javascript/api/azure-iot-device/client?#azure-iot-device-client-getblobsharedaccesssignature) to get the linked storage account SAS token from IoT hub.

For example:

```javascript
// make sure you set these environment variables prior to running the sample.
const localFilePath = process.env.PATH_TO_FILE;
const storageBlobName = path.basename(localFilePath);
const blobInfo = await client.getBlobSharedAccessSignature(storageBlobName);
if (!blobInfo) {
throw new errors.ArgumentError('Invalid upload parameters');
}
```

#### Upload the file to IoT hub

To upload a file from a device to IoT hub:

1. Create a stream pipeline
2. Construct the blob URL
3. Create a [BlockBlobClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobclient) for file upload to Blob Storage
4. Call [uploadFile](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobclient?#@azure-storage-blob-blockblobclient-uploadfile) to upload the file to Blob Storage
5. Call [notifyBlobUploadStatus](https://learn.microsoft.com/javascript/api/azure-iot-device/client?#azure-iot-device-client-notifyblobuploadstatus) to notify IoT hub that the upload succeeded or failed

For example:

```javascript
// Open the pipeline
const pipeline = newPipeline(new AnonymousCredential(), {
retryOptions: { maxTries: 4 },
telemetry: { value: 'HighLevelSample V1.0.0' }, // Customized telemetry string
keepAliveOptions: { enable: false }
});

// Construct the blob URL
const { hostName, containerName, blobName, sasToken } = blobInfo;
const blobUrl = `https://${hostName}/${containerName}/${blobName}${sasToken}`;

// Create the BlockBlobClient for file upload to Blob Storage
const blobClient = new BlockBlobClient(blobUrl, pipeline);

// Setup blank status notification arguments to be filled in on success/failure
let isSuccess;
let statusCode;
let statusDescription;

const uploadStatus = await blobClient.uploadFile(localFilePath);
console.log('uploadStreamToBlockBlob success');

  try {
    const uploadStatus = await blobClient.uploadFile(localFilePath);
    console.log('uploadStreamToBlockBlob success');

    // Save successful status notification arguments
    isSuccess = true;
    statusCode = uploadStatus._response.status;
    statusDescription = uploadStatus._response.bodyAsText;

    // Notify IoT hub of upload to blob status (success)
    console.log('notifyBlobUploadStatus success');
  }
  catch (err) {
    isSuccess = false;
    statusCode = err.code;
    statusDescription = err.message;

    console.log('notifyBlobUploadStatus failed');
    console.log(err);
  }

// Send file upload status notification to IoT hub
await client.notifyBlobUploadStatus(blobInfo.correlationId, isSuccess, statusCode, statusDescription);
```

### Upload the local file to blob storage

You can upload a local file to blob storage from a computer

```javascript
const deviceClient = Client.fromConnectionString(deviceConnectionString, Protocol);
uploadToBlob(localFilePath, deviceClient)
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    process.exit();
  });

```

#### SDK file upload sample

The SDK includes an [upload to blob advanced](https://github.com/Azure/azure-iot-sdk-node/blob/main/device/samples/javascript/upload_to_blob_advanced.js) sample.

## Create a backend application

This section describes how to receive file upload notifications in a backend application.

The [ServiceClient](https://learn.microsoft.com/javascript/api/azure-iothub/client) class contains methods that services can use to receive file upload notifications.

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

To upload a file from a device, your service needs the **service connect** permission. By default, every IoT Hub is created with a shared access policy named **service** that grants this permission.

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


### Create a file upload notification callback receiver

To create a file upload notification callback receiver:

1. Call [getFileNotificationReceiver](https://learn.microsoft.com/javascript/api/azure-iothub/client?#azure-iothub-client-getfilenotificationreceiver). Supply the name of a file upload callback method that is called when notification messages are received.
1. Process file upload notifications in the callback method.

This example sets up a `receiveFileUploadNotification` notification  callback receiver. The receiver interprets the file upload status information and prints a status message to the console.

```javascript
//Set up the receiveFileUploadNotification notification message callback receiver
serviceClient.getFileNotificationReceiver(function receiveFileUploadNotification(err, receiver){
if (err) {
  console.error('error getting the file notification receiver: ' + err.toString());
} else {
  receiver.on('message', function (msg) {
    console.log('File upload from device:')
    console.log(msg.getData().toString('utf-8'));
    receiver.complete(msg, function (err) {
      if (err) {
        console.error('Could not finish the upload: ' + err.message);
      } else {
        console.log('Upload complete');
      }
    });
  });
}
```

#### SDK file upload notification sample

The SDK includes a [file upload](https://github.com/Azure/azure-iot-sdk-node/blob/main/e2etests/test/file_upload.js) sample.
