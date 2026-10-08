---
title: Use jobs to schedule tasks for groups of devices
titleSuffix: Azure IoT Hub
description: How to use the service SDK to schedule a job that invokes a device direct method and updates desired device twin properties.
author: sethmanheim
ms.author: sethm
manager: lizross
ms.service: azure-iot-hub
ms.devlang: csharp
ms.topic: how-to
ms.date: 1/15/2025
zone_pivot_groups: iot-hub-howto-c2d-1
---

# How to schedule and broadcast jobs

This article shows you how to create back-end app code to schedule and broadcast jobs.

Use Azure IoT Hub to schedule and track jobs that update up to millions of devices for these operations:

* Invoke direct methods
* Updated device twins

A job wraps one of these actions and tracks the execution against a set of devices that is defined by a device twin query. For example, a back-end app can use a job to invoke a direct method on 10,000 devices that reboots the devices. You specify the set of devices with a device twin query and schedule the job to run at a future time. The job monitors progress as each of the devices receives and executes the reboot direct method.

To learn more about each of these capabilities, see:

* Device twin and properties: [Get started with device twins](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/device-twins-dotnet.md) and [Understand and use device twins in IoT Hub](iot-hub-devguide-device-twins.md)
* Direct methods: [IoT Hub developer guide - direct methods](iot-hub-devguide-direct-methods.md)

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
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


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




**Applies to: programming-language-java**



  * Requires [Java SE Development Kit 8](https://learn.microsoft.com/azure/developer/java/fundamentals/). Make sure you select **Java 8** under **Long-term support** to navigate to downloads for JDK 8.

## Overview

This article describes how to use the [Azure IoT SDK for Java](https://github.com/Azure/azure-iot-sdk-java) to create backend service application code to schedule job to invoke a direct method or perform a device twin update on one or more devices.

### Service import statements

The [JobClient](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.jobs.jobclient) class contains methods that services can use to schedule jobs.

Use the following service import statements to access the Azure IoT SDK for Java.

```java
import com.microsoft.azure.sdk.iot.service.devicetwin.DeviceTwinDevice;
import com.microsoft.azure.sdk.iot.service.devicetwin.Pair;
import com.microsoft.azure.sdk.iot.service.devicetwin.Query;
import com.microsoft.azure.sdk.iot.service.devicetwin.SqlQuery;
import com.microsoft.azure.sdk.iot.service.jobs.JobClient;
import com.microsoft.azure.sdk.iot.service.jobs.JobResult;
import com.microsoft.azure.sdk.iot.service.jobs.JobStatus;

import java.util.Date;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
```

### Connect to the IoT Hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Use a [JobClient](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.jobs.jobclient) constructor to create the connection to IoT hub. The `JobClient` object handles the communication with your IoT hub.

This article describes back-end code that can schedule a job to invoke a direct method, schedule a job to update a device twin, and monitors the progress of a job for one or more devices. To perform these operations, your service needs the **registry read** and **registry write permissions**. By default, every IoT hub is created with a shared access policy named **registryReadWrite** that grants these permissions.

For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

For example:

```java
public static final String iotHubConnectionString = "{Shared access policy connection string}";
JobClient jobClient = new JobClient(iotHubConnectionString);
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


### Schedule a direct method update job

Use [scheduleDeviceMethod](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.jobs.jobclient?#com-microsoft-azure-sdk-iot-service-jobs-jobclient-scheduledevicemethod\(java-lang-string-java-lang-string-java-lang-string-java-lang-long-java-lang-long-java-lang-object-java-util-date-long\)) to run a direct method on one or multiple devices.

This example method schedules a job for a direct method named "lockDoor" on a device named "Device-1".

```java
// Schedule a job now to call the lockDoor direct method
// against a single device. Response and connection
// timeouts are set to 5 seconds.
String deviceId = "Device-1";
String jobId = "DMCMD" + UUID.randomUUID();  //Job ID must be unique

// How long the job is permitted to run without
// completing its work on the set of devices
private static final long maxExecutionTimeInSeconds = 30;

System.out.println("Schedule job " + jobId + " for device " + deviceId);
try {
  JobResult jobResult = jobClient.scheduleDeviceMethod(jobId,
    "deviceId='" + deviceId + "'",
    "lockDoor",
    5L, 5L, null,
    new Date(),
    maxExecutionTimeInSeconds);
} catch (Exception e) {
  System.out.println("Exception scheduling direct method job: " + jobId);
  System.out.println(e.getMessage());
}
```

### Schedule a device twin update job

Use [scheduleUpdateTwin](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.jobs.jobclient?#com-microsoft-azure-sdk-iot-service-jobs-jobclient-scheduleupdatetwin\(java-lang-string-java-lang-string-com-microsoft-azure-sdk-iot-service-devicetwin-devicetwindevice-java-util-date-long\)) to schedule a job to run a device twin update on one or multiple devices.

First, prepare a [DeviceTwinDevice](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwindevice) record for the device twin update. For example:

```java
String deviceId = "Device-1";

//Create a device twin desired properties update object
DeviceTwinDevice twin = new DeviceTwinDevice(deviceId);
Set<Pair> desiredProperties = new HashSet<Pair>();
desiredProperties.add(new Pair("Building", 43));
desiredProperties.add(new Pair("Floor", 3));
twin.setDesiredProperties(desiredProperties);
// Optimistic concurrency control
twin.setETag("*");
```

Then call `scheduleUpdateTwin` to schedule the update job. For example:

```java
String jobId = "DPCMD" + UUID.randomUUID();  //Unique job ID

// How long the job is permitted to run without
// completing its work on the set of devices
private static final long maxExecutionTimeInSeconds = 30;

// Schedule the update twin job to run now for a single device
System.out.println("Schedule job " + jobId + " for device " + deviceId);
try {
  JobResult jobResult = jobClient.scheduleUpdateTwin(jobId, 
    "deviceId='" + deviceId + "'",
    twin,
    new Date(),
    maxExecutionTimeInSeconds);
} catch (Exception e) {
  System.out.println("Exception scheduling desired properties job: " + jobId);
  System.out.println(e.getMessage());
}
```

### Monitor a job

Use [getJob](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.jobs.jobclient?#com-microsoft-azure-sdk-iot-service-jobs-jobclient-getjob\(java-lang-string\)) to fetch job information based on a specific job ID. `getJob` returns a [JobResult](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.jobs.jobresult) object that contains methods and properties you can use to check job information including running status.

For example:

```java
try {
  JobResult jobResult = jobClient.getJob(jobId);
  if(jobResult == null)
  {
    System.out.println("No JobResult for: " + jobId);
    return;
  }
  // Check the job result until it's completed
  while(jobResult.getJobStatus() != JobStatus.completed)
  {
    Thread.sleep(100);
    jobResult = jobClient.getJob(jobId);
    System.out.println("Status " + jobResult.getJobStatus() + " for job " + jobId);
  }
  System.out.println("Final status " + jobResult.getJobStatus() + " for job " + jobId);
} catch (Exception e) {
  System.out.println("Exception monitoring job: " + jobId);
  System.out.println(e.getMessage());
  return;
}
```

### Query a job status

Use [queryDeviceJob](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.jobs.jobclient?#com-microsoft-azure-sdk-iot-service-jobs-jobclient-querydevicejob\(java-lang-string\)) to query the job status for one or more jobs.

For example:

```java
private static void queryDeviceJobs(JobClient jobClient, String start) throws Exception {
  System.out.println("\nQuery device jobs since " + start);

  // Create a jobs query using the time the jobs started
  Query deviceJobQuery = jobClient
      .queryDeviceJob(SqlQuery.createSqlQuery("*", SqlQuery.FromType.JOBS, "devices.jobs.startTimeUtc > '" + start + "'", null).getQuery());

  // Iterate over the list of jobs and print the details
  while (jobClient.hasNextJob(deviceJobQuery)) {
    System.out.println(jobClient.getNextJob(deviceJobQuery));
  }
}
```

### SDK schedule job example

The Azure IoT SDK for Java provides a working sample of a service app that handles job scheduling tasks. For more information, see [Job Client Sample](https://github.com/Azure/azure-iot-service-sdk-java/blob/main/service/iot-service-samples/job-client-sample/src/main/java/samples/com/microsoft/azure/sdk/iot/JobClientSample.java).




**Applies to: programming-language-python**



  * Python SDK - [Python version 3.7 or later](https://www.python.org/downloads/) is recommended. Make sure to use the 32-bit or 64-bit installation as required by your setup. When prompted during the installation, make sure to add Python to your platform-specific environment variable.

## Overview

This article describes how to use the [Azure IoT SDK for Python](https://github.com/Azure/azure-iot-sdk-python) to create backend service application code to schedule job to invoke a direct method or perform a device twin desired property update on one or more devices.

## Install package

The **azure-iot-hub** library must be installed to create backend service applications.

```cmd/sh
pip install azure-iot-hub
```

### Import statements

The [IoTHubJobManager](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubjobmanager) class exposes all methods required to create a backend application to schedule jobs from the service.

Add the following `import` statements.

```python
import os
import sys
import datetime
import time
import threading
import uuid
import msrest

from azure.iot.hub import IoTHubJobManager
from azure.iot.hub.models import JobProperties, JobRequest, Twin, TwinProperties, CloudToDeviceMethod
```

### Connect to IoT hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Connect to IoT hub using [from_connection_string](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubjobmanager?#azure-iot-hub-iothubjobmanager-from-connection-string).

This article describes back-end code that can schedule a job to invoke a direct method, schedule a job to update a device twin, and monitors the progress of a job for one or more devices. To perform these operations, your service needs the **registry read** and **registry write permissions**. By default, every IoT hub is created with a shared access policy named **registryReadWrite** that grants these permissions.

For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

For example:

```python
IoTHubConnectionString = "{Shared access policy connection string}"
iothub_job_manager = IoTHubJobManager.from_connection_string(IoTHubConnectionString)
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

Use [create_scheduled_job](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubjobmanager?#azure-iot-hub-iothubjobmanager-create-scheduled-job) to schedule a new direct method to run a direct method on one or multiple devices:

`create_scheduled_job` parameter notes:

* `job_id` must be unique
* Set `type` to `scheduleDeviceMethod`
* Use `cloud_to_device_method` to set the direct method name and payload
* Use `max_execution_time_in_seconds` to specify the execution time in seconds
* Use `query_condition` to specify the devices to be included for the direct method call. For more information about query conditions, see [IoT Hub query language for device and module twins, jobs, and message routing](https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-query-language).

For example:

```python
METHOD_NAME = "lockDoor"
METHOD_PAYLOAD = "{\"lockTime\":\"10m\"}"
job_id = uuid.uuid4()
DEVICE_ID = "Device-1"
TIMEOUT = 60

job_request = JobRequest()
job_request.job_id = job_id
job_request.type = "scheduleDeviceMethod"
job_request.start_time = datetime.datetime.utcnow().isoformat()
job_request.cloud_to_device_method = CloudToDeviceMethod(method_name=METHOD_NAME, payload=METHOD_PAYLOAD)
job_request.max_execution_time_in_seconds = TIMEOUT
job_request.query_condition = "DeviceId in ['{}']".format(device_id)

new_job_response = iothub_job_manager.create_scheduled_job(job_id, job_request)
```

### Schedule a device twin update job

Use [create_scheduled_job](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubjobmanager?#azure-iot-hub-iothubjobmanager-create-scheduled-job) to create a new job to run a device twin desired properties update on one or multiple devices.

`create_scheduled_job` parameter notes:

* `job_id` must be unique
* Set `type` to `scheduleUpdateTwin`
* Use `update_twin` to set the direct method name and payload
* Use `max_execution_time_in_seconds` to specify the execution time in seconds
* Use `query_condition` to specify a condition for one or more devices that have the direct method call. For more information about query conditions, see [IoT Hub query language for device and module twins, jobs, and message routing](https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-query-language).

For example:

```python
UPDATE_PATCH = {"building":43,"floor":3}
job_id = uuid.uuid4()
TIMEOUT = 60

job_request = JobRequest()
job_request.job_id = job_id
job_request.type = "scheduleUpdateTwin"
job_request.start_time = datetime.datetime.utcnow().isoformat()
job_request.update_twin = Twin(etag="*", properties=TwinProperties(desired=UPDATE_PATCH))
job_request.max_execution_time_in_seconds = TIMEOUT
job_request.query_condition = "DeviceId in ['{}']".format(device_id)

new_job_response = iothub_job_manager.create_scheduled_job(job_id, job_request)
```

### Monitor a job

Use [get_scheduled_job](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubjobmanager?#azure-iot-hub-iothubjobmanager-get-scheduled-job) to retrieve the details of a specific job on an IoT Hub.

This example checks the job status for a specific job ID every five seconds until the job is complete.

```python
while True:
    get_job_response = iothub_job_manager.get_scheduled_job(job_request.job_id)
    print_job_response("Get job response: ", get_job_response)
    if get_job_response.status == "completed":
      print ( "Job is completed." )
    time.sleep(5)
```

### SDK schedule job examples

The Azure IoT SDK for Python provides working samples of service apps that handle job scheduling tasks. For more information, see:

* [Schedule a direct method job](https://github.com/Azure/azure-iot-hub-python/blob/8c8f315e8b26c65c5517541a7838a20ef8ae668b/samples/iothub_job_manager_method_sample.py)
* [Schedule a device twin update](https://github.com/Azure/azure-iot-hub-python/blob/8c8f315e8b26c65c5517541a7838a20ef8ae668b/samples/iothub_job_manager_twin_update_sample.py).




**Applies to: programming-language-node**



  *  Requires Node.js version 10.0.x or later

## Overview

This article describes how to use the [Azure IoT SDK for Node.js](https://github.com/Azure/azure-iot-sdk-node) to create backend service application code to schedule job to invoke a direct method or perform a device twin update on one or more devices.

### Install service SDK package

Run this command to install **azure-iothub** on your development machine:

```cmd/sh
npm install azure-iothub --save
```

The [JobClient](https://learn.microsoft.com/javascript/api/azure-iothub/jobclient) class exposes all methods required to interact with job scheduling from a backend application.

### Connect to IoT hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Use [fromConnectionString](https://learn.microsoft.com/javascript/api/azure-iothub/jobclient?#azure-iothub-jobclient-fromconnectionstring) to connect to IoT hub.

This article describes back-end code that can schedule a job to invoke a direct method, schedule a job to update a device twin, and monitors the progress of a job for one or more devices. To perform these operations, your service needs the **registry read** and **registry write permissions**. By default, every IoT hub is created with a shared access policy named **registryReadWrite** that grants these permissions.

For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

For example:

```javascript
'use strict';
var JobClient = require('azure-iothub').JobClient;
var connectionString = '{Shared access policy connection string}';
var jobClient = JobClient.fromConnectionString(connectionString);
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


### Create a direct method job

Use [scheduleDeviceMethod](https://learn.microsoft.com/javascript/api/azure-iothub/jobclient?#azure-iothub-jobclient-scheduledevicemethod) to schedule a job to run a direct method on one or multiple devices.

First, create a direct method update variable with method name, payload, and response time-out information. For example:

```javascript
var methodParams = {
    methodName: 'lockDoor',
    payload: null,
    responseTimeoutInSeconds: 15 // Time-out after 15 seconds if device is unable to process method
};
```

Then call `scheduleDeviceMethod` to schedule the direct method call job:

* Each job must have a unique job ID. You can use this job ID to monitor a job as described in the **Monitor a job** section of this article.
* Specify a `queryCondition` parameter to evaluate which devices to run the job on. For more information about query conditions, see [IoT Hub query language for device and module twins, jobs, and message routing](https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-query-language).
* Check the `jobResult` callback for the job schedule result. If the job was successfully scheduled, you can monitor the job status as shown in the **Monitor a job** section of this article.

For example:

```javascript
var methodJobId = uuid.v4();
var queryCondition = "deviceId IN ['myDeviceId']";
var startTime = new Date();
var maxExecutionTimeInSeconds =  300;

jobClient.scheduleDeviceMethod(methodJobId,
                            queryCondition,
                            methodParams,
                            startTime,
                            maxExecutionTimeInSeconds,
                            function(err) {
    if (err) {
        console.error('Could not schedule direct method job: ' + err.message);
    } else {
        monitorJob(methodJobId, function(err, result) {
            if (err) {
                console.error('Could not monitor direct method job: ' + err.message);
            } else {
                console.log(JSON.stringify(result, null, 2));
            }
        });
    }
});
```

### Schedule a device twin update job

Use [scheduleTwinUpdate](https://learn.microsoft.com/javascript/api/azure-iothub/jobclient?#azure-iothub-jobclient-scheduletwinupdate) to create a new job to run a device twin update on one or multiple devices.

First, create a device twin desired property update variable.

```javascript
var twinPatch = {
   etag: '*',
   properties: {
       desired: {
           building: '43',
           floor: 3
       }
   }
};
```

Then call `scheduleTwinUpdate` to schedule the device twin desired property update job:

* Each job must have a unique job ID. You can use this job ID to monitor a job as described in the **Monitor a job** section of this article.
* Specify a `queryCondition` parameter to evaluate which devices to run the job on. For more information about query conditions, see [IoT Hub query language for device and module twins, jobs, and message routing](https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-query-language).
* Check the `jobResult` callback for the job schedule result. If the job was successfully scheduled, you can monitor the job status as shown in the **Monitor a job** section of this article.

For example:

```javascript
var twinJobId = uuid.v4();
var queryCondition = "deviceId IN ['myDeviceId']";
var startTime = new Date();
var maxExecutionTimeInSeconds =  300;

console.log('scheduling Twin Update job with id: ' + twinJobId);
jobClient.scheduleTwinUpdate(twinJobId,
                            queryCondition,
                            twinPatch,
                            startTime,
                            maxExecutionTimeInSeconds,
                            function(err) {
    if (err) {
        console.error('Could not schedule twin update job: ' + err.message);
    } else {
        monitorJob(twinJobId, function(err, result) {
            if (err) {
                console.error('Could not monitor twin update job: ' + err.message);
            } else {
                console.log(JSON.stringify(result, null, 2));
            }
        });
    }
});
```

### Monitor a job

Use [getJob](https://learn.microsoft.com/javascript/api/azure-iothub/jobclient?#azure-iothub-jobclient-getjob) to monitor the job status for a specific job ID.

This example function checks the job status for a specific job ID periodically until the job is complete or failed.

```javascript
function monitorJob (jobId, callback) {
    var jobMonitorInterval = setInterval(function() {
        jobClient.getJob(jobId, function(err, result) {
        if (err) {
            console.error('Could not get job status: ' + err.message);
        } else {
            console.log('Job: ' + jobId + ' - status: ' + result.status);
            if (result.status === 'completed' || result.status === 'failed' || result.status === 'cancelled') {
            clearInterval(jobMonitorInterval);
            callback(null, result);
            }
        }
        });
    }, 5000);
}
```

### SDK schedule job example

The Azure IoT SDK for Node.js provides a working sample of a service app that handles job scheduling tasks. For more information, see [Job client E2E test](https://github.com/Azure/azure-iot-sdk-node/blob/a85e280350a12954f46672761b0b516d08d374b5/e2etests/test/job_client.js).
