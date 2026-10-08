---
title: Schedule and broadcast jobs (.NET)
titleSuffix: Azure IoT Hub
description: How to use the Azure IoT SDK for .NET to create backend service application code for job scheduling.
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
ms.devlang: csharp
ms.topic: include
ms.date: 1/15/2025
ms.custom: [amqp, mqtt, "Role: Cloud Development", "Role: IoT Device", devx-track-csharp, devx-track-dotnet]
---

  * Requires Visual Studio

## Overview

This article describes how to use the [Azure IoT SDK for .NET](https://github.com/Azure/azure-iot-sdk-csharp/blob/main/readme.md) to create backend service application code to a schedule job to invoke a direct method or perform a device twin update on one or more devices.

### Add service NuGet package

Backend service applications require the **Microsoft.Azure.Devices** NuGet package.

### Using statements

Add the following using statements.

```csharp
using Microsoft.Azure.Devices;
using Microsoft.Azure.Devices.Shared;

using System.Threading;
using System.Threading.Tasks;
```

### Connect to IoT hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../articles/iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Connect a backend application to a device using [CreateFromConnectionString](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.jobclient.createfromconnectionstring).

This article describes back-end code that can schedule a job to invoke a direct method, schedule a job to update a device twin, and monitors the progress of a job for one or more devices. To perform these operations, your service needs the **registry read** and **registry write permissions**. By default, every IoT hub is created with a shared access policy named **registryReadWrite** that grants these permissions.

For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

```csharp
static JobClient jobClient;
static string connectionString = "{Shared access policy connection string}";
jobClient = JobClient.CreateFromConnectionString(connString);
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


### Schedule a direct method job

Use [ScheduleDeviceMethodAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.jobclient.scheduledevicemethodasync) to schedule a job to run a direct method on one or multiple devices.

Use the [CloudToDeviceMethod](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.cloudtodevicemethod.-ctor?#microsoft-azure-devices-cloudtodevicemethod-ctor\(system-string-system-timespan-system-timespan\)) object to specify the direct method name and device connection time-out values.

For example:

```csharp
// The CloudToDeviceMethod record specifies the direct method name and device connection time-out
CloudToDeviceMethod directMethod = 
new CloudToDeviceMethod("LockDoor", TimeSpan.FromSeconds(5), 
TimeSpan.FromSeconds(5));
```

This example schedules a job for a direct method named "LockDoor" on one device named "Device-1". The devices included in the scheduled job are contained second parameter as a query condition. For more information about query conditions, see [IoT Hub query language for device and module twins, jobs, and message routing](https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-query-language).

```csharp
string methodJobId = Guid.NewGuid().ToString();  // a unique job ID
static string deviceId = "Device-1";             // In this example, there is only one device affected
JobResponse result = await jobClient.ScheduleDeviceMethodAsync(methodJobId,
   $"DeviceId IN ['{deviceId}']",
   directMethod,
   DateTime.UtcNow,
   (long)TimeSpan.FromMinutes(2).TotalSeconds);
```

### Schedule a device twin update job

Use [ScheduleTwinUpdateAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.jobclient.scheduletwinupdateasync) to schedule a new device twin desired properties and tags update job to run on one or more devices.

First, create and populate a device [Twin](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.shared.twin) object for the update. For example:

```csharp
static string deviceId = "Device-1";

Twin twin = new Twin(deviceId);
twin.Tags = new TwinCollection();
twin.Tags["Building"] = "43";
twin.Tags["Floor"] = "3";
twin.ETag = "*";
twin.Properties.Desired["LocationUpdate"] = DateTime.UtcNow;
```

Next, call `ScheduleTwinUpdateAsync`. Specify the devices to be updated as a query in the second parameter. For more information about query conditions, see [IoT Hub query language for device and module twins, jobs, and message routing](https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-query-language).

```csharp
string twinJobId = Guid.NewGuid().ToString();

JobResponse createJobResponse = jobClient.ScheduleTwinUpdateAsync(
   twinJobId,
   $"DeviceId IN ['{deviceId}']", 
   twin, 
   DateTime.UtcNow, 
   (long)TimeSpan.FromMinutes(2).TotalSeconds).Result;
```

### Monitor a job

Use [GetJobAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.jobclient.getjobasync?#microsoft-azure-devices-jobclient-getjobasync\(system-string\)) to monitor the job status for a specific job ID.

This example checks the job status for a job ID periodically until the job status is complete or failed. For example:

```csharp
JobResponse result;
do
{
   result = await jobClient.GetJobAsync(jobId);
   Console.WriteLine("Job Status : " + result.Status.ToString());
   Thread.Sleep(2000);
} while ((result.Status != JobStatus.Completed) && (result.Status != JobStatus.Failed));
```

### SDK schedule job examples

The Azure IoT SDK for .NET provides working samples of service apps that handle job scheduling tasks. For more information, see:

* [Schedule twin update sample](https://github.com/Azure/azure-iot-sdk-csharp/blob/main/iothub/service/samples/getting%20started/JobsSample/JobsSample.cs)
* [E2E schedule twin update sample](https://github.com/Azure/azure-iot-sdk-csharp/blob/86065001a92fedb42877722c6a57ae37e45eed30/e2e/test/iothub/service/IoTHubCertificateValidationE2ETest.cs).
