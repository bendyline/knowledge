---
title: Schedule and broadcast jobs (Python)
titleSuffix: Azure IoT Hub
description: How to use the Azure IoT SDK for Python to create backend service application code for job scheduling.
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
ms.devlang: python
ms.topic: include
ms.date: 1/15/2025
ms.custom: mqtt, devx-track-python, py-fresh-zinc
---

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
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot/iot-overview-security.md#cloud-security).


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
