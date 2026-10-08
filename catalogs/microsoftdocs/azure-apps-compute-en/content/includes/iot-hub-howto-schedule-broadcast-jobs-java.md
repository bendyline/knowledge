---
title: Schedule and broadcast jobs (Java)
titleSuffix: Azure IoT Hub
description: How to use the Azure IoT SDK for Java to create backend service application code for job scheduling.
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
ms.devlang: java
ms.topic: include
ms.date: 1/15/2025
ms.custom: mqtt, devx-track-java, devx-track-extended-java
---

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
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot/iot-overview-security.md#cloud-security).


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
