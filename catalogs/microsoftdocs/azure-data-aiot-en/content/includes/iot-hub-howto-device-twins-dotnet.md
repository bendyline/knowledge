---
title: Get started with Azure IoT Hub device twins (.NET)
titleSuffix: Azure IoT Hub
description: How to use the Azure IoT SDK for .NET to create device and backend service application code for device twins.
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
ms.devlang: csharp
ms.topic: include
ms.date: 12/31/2024
ms.custom:
  - mqtt
  - devx-track-csharp
  - devx-track-dotnet
  - sfi-ropc-nochange
---

  * Requires Visual Studio

## Overview

This article describes how to use the [Azure IoT SDK for .NET](https://github.com/Azure/azure-iot-sdk-csharp/blob/main/readme.md) to create device and backend service application code for device twins.

## Create a device application

Device applications can read and write twin reported properties, and be notified of desired twin property changes that are set by a backend application or IoT Hub.

This section describes how to use device application code to:

* Retrieve a device twin and examine reported properties
* Update reported device twin properties
* Create a desired property update callback handler

### Required device NuGet package

Device client applications written in C# require the **Microsoft.Azure.Devices.Client** NuGet package.

Add this `using` statement to use the device library.

```csharp
using Microsoft.Azure.Devices.Client;
```

### Connect a device to IoT Hub

A device app can authenticate with IoT Hub using the following methods:

* Shared access key
* X.509 certificate


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../articles/iot/iot-overview-security.md#connection-security).


#### Authenticate using a shared access key

The [DeviceClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient) class exposes all the methods required to interact with device twins from the device.

Connect to the device using the [CreateFromConnectionString](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.createfromconnectionstring?#microsoft-azure-devices-client-deviceclient-createfromconnectionstring\(system-string-microsoft-azure-devices-client-transporttype\)) method along with device connection string and the connection transport protocol.

The `CreateFromConnectionString` [TransportType](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.transporttype) transport protocol parameter supports the following transport protocols:

* `Mqtt`
* `Mqtt_WebSocket_Only`
* `Mqtt_Tcp_Only`
* `Amqp`
* `Amqp_WebSocket_Only`
* `Amqp_Tcp_Only`

The `Http1` protocol is not supported for device twin updates.

This example connects to a device using the `Mqtt` transport protocol.

```csharp
using Microsoft.Azure.Devices.Client;
using Microsoft.Azure.Devices.Shared;
using Newtonsoft.Json;

static string DeviceConnectionString = "{IoT hub device connection string}";
static _deviceClient = null;
_deviceClient = DeviceClient.CreateFromConnectionString(DeviceConnectionString, 
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


### Retrieve a device twin and examine properties

Call [GetTwinAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.gettwinasync?#microsoft-azure-devices-client-deviceclient-gettwinasync) to retrieve the current device twin properties. There are many [Twin](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.shared.twin?) object [properties](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.shared.twin?\&#properties) that you can use to access specific areas of the `Twin` JSON data including `Properties`, `Status`, `Tags`, and `Version`.

 This example retrieves device twin properties and prints the twin values in JSON format.

```csharp
Console.WriteLine("Retrieving twin...");
Twin twin = await _deviceClient.GetTwinAsync();
Console.WriteLine("\tInitial twin value received:");
Console.WriteLine($"\t{twin.ToJson()}");
```

### Update reported device twin properties

To update a twin reported property:

1. Create a [TwinCollection](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.shared.twincollection) object for the reported property update
1. Update one or more reported properties within the `TwinCollection` object
1. Use [UpdateReportedPropertiesAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.updatereportedpropertiesasync) to push reported property changes to the IoT hub service

For example:

```csharp
try
{
Console.WriteLine("Sending sample start time as reported property");
TwinCollection reportedProperties = new TwinCollection();
reportedProperties["DateTimeLastAppLaunch"] = DateTime.UtcNow;
await _deviceClient.UpdateReportedPropertiesAsync(reportedProperties);
}
catch (Exception ex)
{
   Console.WriteLine();
   Console.WriteLine("Error in sample: {0}", ex.Message);
}
```

### Create a desired property update callback handler

Create a desired property update callback handler that executes when a desired property is changed in the device twin by passing the callback handler method name to [SetDesiredPropertyUpdateCallbackAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.deviceclient.setdesiredpropertyupdatecallbackasync?#microsoft-azure-devices-client-deviceclient-setdesiredpropertyupdatecallbackasync\(microsoft-azure-devices-client-desiredpropertyupdatecallback-system-object\)).

For example, this call sets up the system to notify a method named`OnDesiredPropertyChangedAsync` whenever a desired property is changed.

```csharp
await _deviceClient.SetDesiredPropertyUpdateCallbackAsync(OnDesiredPropertyChangedAsync, null);
```

The twin properties are passed to the callback method as a [TwinCollection](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.shared.twincollection) and can be examined as `KeyValuePair` structures.

This example receives the desired property updates as a `TwinCollection`, then loops through and prints the `KeyValuePair` collection updates. After looping through the `KeyValuePair` collection, the code calls `UpdateReportedPropertiesAsync` to update the `DateTimeLastDesiredPropertyChangeReceived` reported property to keep the last updated time up to date.

```csharp
private async Task OnDesiredPropertyChangedAsync(TwinCollection desiredProperties, object userContext)
{
   var reportedProperties = new TwinCollection();

   Console.WriteLine("\tDesired properties requested:");
   Console.WriteLine($"\t{desiredProperties.ToJson()}");

   // For the purpose of this sample, we'll blindly accept all twin property write requests.
   foreach (KeyValuePair<string, object> desiredProperty in desiredProperties)
   {
         Console.WriteLine($"Setting {desiredProperty.Key} to {desiredProperty.Value}.");
         reportedProperties[desiredProperty.Key] = desiredProperty.Value;
   }

   Console.WriteLine("\tAlso setting current time as reported property");
   reportedProperties["DateTimeLastDesiredPropertyChangeReceived"] = DateTime.UtcNow;

   await _deviceClient.UpdateReportedPropertiesAsync(reportedProperties);
}
```

### SDK device sample

The Azure IoT SDK for .NET provides a working sample of a device app that handles device twin tasks. For more information, see [TwinSample](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/device/samples/getting%20started/TwinSample).

## Create a backend application

A backend application connects to a device through IoT Hub and can read device reported and desired properties, write device desired properties, and run device queries.

This section describes how to create backend application code to:

* Read and update device twin fields
* Create a device twin query

The [RegistryManager](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager) class exposes all methods required to create a backend application to interact with device twins from the service.

### Add service NuGet Package

Backend service applications require the **Microsoft.Azure.Devices** NuGet package.

### Connect to IoT hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../articles/iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Connect a backend application to a device using [CreateFromConnectionString](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager.createfromconnectionstring). Your application needs the **service connect** permission to modify desired properties of a device twin, and it needs **registry read** permission to query the identity registry. There is no default shared access policy that contains only these two permissions, so you need to create one if a one does not already exist. Supply this shared access policy connection string as a parameter to `fromConnectionString`. For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

```csharp
using Microsoft.Azure.Devices;
static RegistryManager registryManager;
static string connectionString = "{Shared access policy connection string}";
registryManager = RegistryManager.CreateFromConnectionString(connectionString);
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


### Read and update device twin fields

You can retrieve current device twin fields into a [Twin](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.shared.twin) object by calling [GetTwinAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager.gettwinasync).

The `Twin` class includes [properties](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.shared.twin?\&#properties) that correspond to each section of a device twin. Use the `Twin` class properties to view and update device twin fields. You can use the `Twin` object properties to update multiple twin fields before writing the updates to the device using `UpdateTwinAsync`.

After making twin field updates, call [UpdateTwinAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager.updatetwinasync?#microsoft-azure-devices-registrymanager-updatetwinasync\(system-string-microsoft-azure-devices-shared-twin-system-string\)) to write `Twin` object field updates back to a device. Use `try` and `catch` logic coupled with an error handler to catch incorrectly formatted patch errors from `UpdateTwinAsync`.

#### Read and update device twin tags

Use the device twin [Tags](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.shared.twin.tags?#microsoft-azure-devices-shared-twin-tags) property to read and write device tag information.

##### Update tags using a twin object

This example creates a `location` tag patch, assigns it to the `Twin` object using the `Tags` property, and then applies the patch using `UpdateTwinAsync`.

```csharp
// Retrieve the device twin
var twin = await registryManager.GetTwinAsync("myDeviceId");

// Create the tag patch
var tagspatch =
   @"{
   tags: {
         location: {
            region: 'US',
            plant: 'Redmond43'
         }
   }
}";

// Assign the patch to the Twin object
twin.Tags["location"] = tagspatch;

// Apply the patch to update the device twin tags section
try
{
   await registryManager.UpdateTwinAsync(twin.DeviceId, patch, twin.ETag);
}
catch (Exception e)
{
   console.WriteLine("Twin update failed.", e.Message);
}
```

##### Update tags using a JSON string

You can create and apply a JSON-formatted device twin information update patch. IoT Hub parses and applies the patch if it is correctly formatted.

This example calls `GetTwinAsync` to retrieve the current device twin fields into a `Twin` object, creates a JSON-formatted `tag` patch with region and plant location information, then calls `UpdateTwinAsync` to apply the patch to update the device twin. An error message is displayed if `UpdateTwinAsync` failed.

```csharp
// Retrieve the device twin
var twin = await registryManager.GetTwinAsync("myDeviceId");

// Create the JSON tags patch
var patch =
   @"{
      tags: {
            location: {
               region: 'US',
               plant: 'Redmond43'
            }
      }
   }";
// Apply the patch to update the device twin tags
try
{
   await registryManager.UpdateTwinAsync(twin.DeviceId, patch, twin.ETag);
}
catch (Exception e)
{
   console.WriteLine("Twin update failed.", e.Message);
}
```

#### View and update twin desired properties

Use the device twin [TwinProperties.Desired](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.shared.twinproperties.desired?#microsoft-azure-devices-shared-twinproperties-desired) property to read and write device desired property information. Update twin `Desired` properties using a JSON-formatted patch.

This example calls `GetTwinAsync` to retrieve the current device twin fields into a `Twin` object, updates the twin `speed` desired property, and then calls `UpdateTwinAsync` to apply the `Twin` object to update the device twin.

```csharp
// Retrieve the device twin
var twin = await registryManager.GetTwinAsync("myDeviceId");

twin.Properties.Desired["speed"] = "type: '5G'";
await registryManager.UpdateTwinAsync(twin.DeviceId, twin, twin.ETag);
```

#### Other twin update methods

You can also apply twin updates using these SDK methods:

* Call [ReplaceTwinAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager.replacetwinasync) to replace the entire device twin.
* Call [UpdateTwins2Async](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager.updatetwins2async) to update a list of twins previously created within the system.

### Create a device twin query

This section demonstrates two device twin queries. Device twin queries are SQL-like queries that return a result set of device twins.

To create a device twin query, call [CreateQuery](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager.createquery) to submit a twins SQL query and obtain an [IQuery](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.iquery) Interface. You can optionally call `CreateQuery` with a second parameter to specify a maximum number of items per page.

Next call `GetNextAsTwinAsync` or `GetNextAsJsonAsync` method as many times as needed to retrieve all twin results.

* [GetNextAsTwinAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.iquery.getnextastwinasync?#microsoft-azure-devices-iquery-getnextastwinasync) to retrieve the next paged result as [Twin](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.shared.twin) objects.
* [GetNextAsJsonAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.iquery.getnextasjsonasync?\&#microsoft-azure-devices-iquery-getnextasjsonasync) to retrieve the next paged result as JSON strings.

The `IQuery` interface includes a [HasMoreResults](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.iquery.hasmoreresults?#microsoft-azure-devices-iquery-hasmoreresults) boolean property that you can use to check if there are more twin results to fetch.

This example query selects only the device twins of devices located in the **Redmond43** plant.

```csharp
var query = registryManager.CreateQuery(
"SELECT * FROM devices WHERE tags.location.plant = 'Redmond43'", 100);
var twinsInRedmond43 = await query.GetNextAsTwinAsync();
Console.WriteLine("Devices in Redmond43: {0}", 
string.Join(", ", twinsInRedmond43.Select(t => t.DeviceId)));
```

This example query refines the first query to select only the devices that are also connected through a cellular network.

```csharp
query = registryManager.CreateQuery("SELECT * FROM devices WHERE tags.location.plant = 'Redmond43' AND properties.reported.connectivity.type = 'cellular'", 100);
var twinsInRedmond43UsingCellular = await query.GetNextAsTwinAsync();
Console.WriteLine("Devices in Redmond43 using cellular network: {0}", 
string.Join(", ", twinsInRedmond43UsingCellular.Select(t => t.DeviceId)));
```

### SDK service sample

The Azure IoT SDK for .NET provides a working sample of a service app that handles device twin tasks. For more information, see [Registry Manager Sample](https://github.com/Azure/azure-iot-sdk-csharp/blob/main/iothub/service/samples/how%20to%20guides/RegistryManagerSample/RegistryManagerSample.cs).
