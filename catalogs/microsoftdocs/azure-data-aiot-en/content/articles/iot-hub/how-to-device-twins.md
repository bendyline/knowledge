---
title: Get started with Azure IoT Hub device twins
titleSuffix: Azure IoT Hub
description: How to use the Azure IoT SDKs to create device and backend service application code for device twins.
author: sethmanheim
ms.author: sethm
manager: lizross
ms.service: azure-iot-hub
ms.devlang: csharp
ms.topic: how-to
ms.date: 09/10/2024
zone_pivot_groups: iot-hub-howto-c2d-1
ms.custom: mqtt, devx-track-csharp, devx-track-dotnet
---

# Get started with device twins

Use the Azure IoT Hub device SDK and service SDK to develop applications that handle common device twin tasks. Device twins are JSON documents that store device state information including metadata, configurations, and conditions. IoT Hub persists a device twin for each device that connects to it.

You can use device twins to:

* Store device metadata from your solution back end
* Report current state information such as available capabilities and conditions, for example, the connectivity method used, from your device app
* Synchronize the state of long-running workflows, such as firmware and configuration updates, between a device app and a back-end app
* Query your device metadata, configuration, or state

For more information about device twins, including when to use device twins, see [Understand and use device twins in IoT Hub](iot-hub-devguide-device-twins.md).

>**Note:**
>The features described in this article are available only in the standard tier of IoT Hub. For more information about the basic and standard/free IoT Hub tiers, see [Choose the right IoT Hub tier and size for your solution](iot-hub-scaling.md).


This article shows you how to develop two types of applications:

* Device apps can handle requests to update desired properties and respond with changes to reported properties.
* Service apps can update device twin tags, set new desired properties, and query devices based on device twin values.

> **Note:**
> This article is meant to complement [Azure IoT SDKs](iot-hub-devguide-sdks.md) samples that are referenced from within this article. You can use SDK tools to build both device and back-end applications.

## Prerequisites

* An IoT hub

* A registered device

* If your application uses the MQTT protocol, make sure that port 8883 is open in your firewall. The MQTT protocol communicates over port 8883. This port may be blocked in some corporate and educational network environments. For more information and ways to work around this issue, see [Connecting to IoT Hub (MQTT)](iot-mqtt-connect-to-iot-hub.md#connect-to-iot-hub).

**Applies to: programming-language-csharp**



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
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../iot/iot-overview-security.md#connection-security).


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
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


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




**Applies to: programming-language-java**



  * Requires [Java SE Development Kit 8](https://learn.microsoft.com/azure/developer/java/fundamentals/). Make sure you select **Java 8** under **Long-term support** to navigate to downloads for JDK 8.

## Overview

This article describes how to use the [Azure IoT SDK for Java](https://github.com/Azure/azure-iot-sdk-java) to create device and backend service application code for device twins.

## Create a device application

Device applications can read and write twin reported properties, and be notified of desired twin property changes that are set by a backend application or IoT Hub.

This section describes how to create device application code to:

* Retrieve and view a device twin
* Update reported device twin properties
* Subscribe to desired property changes

The [DeviceClient](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.deviceclient) class exposes all the methods you require to interact with device twins from the device.


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../iot/iot-overview-security.md#connection-security).


### Device import statements

Use the following device import statements to access the Azure IoT SDK for Java.

```java
import com.microsoft.azure.sdk.iot.device.*;
import com.microsoft.azure.sdk.iot.device.DeviceTwin.*;
```

### Connect a device to IoT Hub

A device app can authenticate with IoT Hub using the following methods:

* Shared access key
* X.509 certificate


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../iot/iot-overview-security.md#connection-security).


#### Authenticate using a shared access key

To connect a device to IoT Hub:

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


### Retrieve and view a device twin

After opening the client connection, call [getTwin](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwin?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwin-gettwin\(com-microsoft-azure-sdk-iot-service-devicetwin-devicetwindevice\)) to retrieve the current twin properties into a `Twin` object.

For example:

```java
private static Twin twin;
System.out.println("Getting current twin");
twin = client.getTwin();
System.out.println("Received current twin:");
System.out.println(twin);
```

### Update device twin reported properties

After retrieving the current twin, you can begin making reported property updates. You can also make reported property updates without getting the current twin as long as you have the correct reported properties version. If you send reported properties and receive a "precondition failed" error, then your reported properties version is out of date. In that case, get the latest version by calling `getTwin` again.

To update reported properties:

1. Call [getReportedProperties](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwindevice?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwindevice-getreportedproperties\(\)) to fetch the twin reported properties into a [TwinCollection](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.deps.twin.twincollection) object.

1. Use [put](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.deps.twin.twincollection?#com-microsoft-azure-sdk-iot-deps-twin-twincollection-put\(java-lang-string-java-lang-object\)) to update a reported property within the `TwinCollection` object. Call `put` for each reported property update.

1. Use [updateReportedProperties](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.devicetwin.devicetwin?#com-microsoft-azure-sdk-iot-device-devicetwin-devicetwin-updatereportedproperties\(java-util-set\(com-microsoft-azure-sdk-iot-device-devicetwin-property\)\)) to apply the group of reported properties that were updated using the `put` method.

For example:

```java
TwinCollection reportedProperties = twin.getReportedProperties();

int newTemperature = new Random().nextInt(80);
reportedProperties.put("HomeTemp(F)", newTemperature);
System.out.println("Updating reported property \"HomeTemp(F)\" to value " + newTemperature);

ReportedPropertiesUpdateResponse response = client.updateReportedProperties(reportedProperties);
System.out.println("Successfully set property \"HomeTemp(F)\" to value " + newTemperature);
```

### Subscribe to desired property changes

Call [subscribeToDesiredProperties](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.device.internalclient?#com-microsoft-azure-sdk-iot-device-internalclient-subscribetodesiredproperties\(java-util-map\(com-microsoft-azure-sdk-iot-device-devicetwin-property-com-microsoft-azure-sdk-iot-device-devicetwin-pair\(com-microsoft-azure-sdk-iot-device-devicetwin-propertycallback\(java-lang-string-java-lang-object\)-java-lang-object\)\)\)) to subscribe to desired property changes. This client receives a callback with a `Twin` object each time a desired property is updated. That callback either contains the full desired properties set, or only the updated desired property depending on how the desired property was changed.

This example subscribes to desired property changes. Any desired property changes are passed to a handler named `DesiredPropertiesUpdatedHandler`.

```java
client.subscribeToDesiredProperties(new DesiredPropertiesUpdatedHandler(), null);
```

In this example, the `DesiredPropertiesUpdatedHandler` desired property change callback handler calls [getDesiredProperties](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwindevice?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwindevice-getdesiredproperties\(\)) to retrieve the property changes, then prints the updated twin properties.

```java
  private static class DesiredPropertiesUpdatedHandler implements DesiredPropertiesCallback
  {
      @Override
      public void onDesiredPropertiesUpdated(Twin desiredPropertyUpdateTwin, Object context)
      {
          if (twin == null)
          {
              // No need to care about this update because these properties will be present in the twin retrieved by getTwin.
              System.out.println("Received desired properties update before getting current twin. Ignoring this update.");
              return;
          }

          // desiredPropertyUpdateTwin.getDesiredProperties() contains all the newly updated desired properties as well as the new version of the desired properties
          twin.getDesiredProperties().putAll(desiredPropertyUpdateTwin.getDesiredProperties());
          twin.getDesiredProperties().setVersion(desiredPropertyUpdateTwin.getDesiredProperties().getVersion());
          System.out.println("Received desired property update. Current twin:");
          System.out.println(twin);
      }
  }
```

### SDK device sample

The Azure IoT SDK for Java includes a working sample to test the device app concepts described in this article. For more information, see  [Device twin sample](https://github.com/Azure/azure-iot-sdk-java/tree/main/iothub/device/iot-device-samples/device-twin-sample).

## Create a backend application

This section describes how to create a backend application that:

* Updates device twin tags
* Queries devices using filters on the tags and properties

The `ServiceClient` [DeviceTwin](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwin) class contains methods that services can use to access device twins.

### Service import statements

Use the following service import statements to access the Azure IoT SDK for Java.

```java
import com.microsoft.azure.sdk.iot.service.devicetwin.*;
import com.microsoft.azure.sdk.iot.service.exceptions.IotHubException;
```

### Connect to the IoT Hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Use a [DeviceTwin](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwin?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwin-devicetwin\(java-lang-string\)) constructor to create the connection to IoT hub. The `DeviceTwin` object handles the communication with your IoT hub.

Your application needs the **service connect** permission to modify desired properties of a device twin, and it needs **registry read** permission to query the identity registry. There is no default shared access policy that contains only these two permissions, so you need to create one if a one does not already exist. Supply this shared access policy connection string as a parameter to `fromConnectionString`. For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

The [DeviceTwinDevice](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwindevice) object represents the device twin with its properties and tags.

For example:

```java
public static final String iotHubConnectionString = "{Shared access policy connection string}";
public static final String deviceId = "myDeviceId";
public static final String region = "US";
public static final String plant = "Redmond43";

// Get the DeviceTwin and DeviceTwinDevice objects
DeviceTwin twinClient = new DeviceTwin(iotHubConnectionString);
DeviceTwinDevice device = new DeviceTwinDevice(deviceId);
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


### Update device twin fields

To update device twin fields:

1. Use [getTwin](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwin?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwin-gettwin\(com-microsoft-azure-sdk-iot-service-devicetwin-devicetwindevice\)) to retrieve the current device twin fields

   This example retrieves and prints the device twin fields:

    ```java
    // Get the device twin from IoT Hub
    System.out.println("Device twin before update:");
    twinClient.getTwin(device);
    System.out.println(device);
    ```

1. Use a `HashSet` object to `add` a group of twin tag pairs

1. Use [setTags](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwindevice?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwindevice-settags\(java-util-set\(com-microsoft-azure-sdk-iot-service-devicetwin-pair\)\)) to add a group of tag pairs from a `tags` object to a `DeviceTwinDevice` object

1. Use [updateTwin](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwin?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwin-updatetwin\(com-microsoft-azure-sdk-iot-service-devicetwin-devicetwindevice\)) to update the twin in the IoT hub

    This example updates the region and plant device twin tags for a device twin:

    ```java
    // Update device twin tags if they are different
    // from the existing values
    String currentTags = device.tagsToString();
    if ((!currentTags.contains("region=" + region) && !currentTags.contains("plant=" + plant))) {

    // Create the tags and attach them to the DeviceTwinDevice object
    Set<Pair> tags = new HashSet<Pair>();
    tags.add(new Pair("region", region));
    tags.add(new Pair("plant", plant));
    device.setTags(tags);

    // Update the device twin in IoT Hub
    System.out.println("Updating device twin");
    twinClient.updateTwin(device);
    }

    // Retrieve and display the device twin with the tag values from IoT Hub
    System.out.println("Device twin after update:");
    twinClient.getTwin(device);
    System.out.println(device);
    ```

### Create a device twin query

This section demonstrates two device twin queries. Device twin queries are SQL-like queries that return a result set of device twins.

The [Query](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.query) class contains methods that can be used to create SQL-style queries to IoT Hub for twins, jobs, device jobs, or raw data.

To create a device query:

1. Use [createSqlQuery](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.sqlquery?#com-microsoft-azure-sdk-iot-service-devicetwin-sqlquery-createsqlquery\(java-lang-string-com-microsoft-azure-sdk-iot-service-devicetwin-sqlquery-fromtype-java-lang-string-java-lang-string\)) to build the twins SQL query

1. Use [queryTwin](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwin?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwin-querytwin\(java-lang-string-java-lang-integer\)) to execute the query

1. Use [hasNextDeviceTwin](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwin?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwin-hasnextdevicetwin\(com-microsoft-azure-sdk-iot-service-devicetwin-query\)) to check if there's another device twin in the result set

1. Use [getNextDeviceTwin](https://learn.microsoft.com/java/api/com.microsoft.azure.sdk.iot.service.devicetwin.devicetwin?#com-microsoft-azure-sdk-iot-service-devicetwin-devicetwin-getnextdevicetwin\(com-microsoft-azure-sdk-iot-service-devicetwin-query\)) to retrieve the next device twin from the result set

The following example queries return a maximum of 100 devices.

This example query selects only the device twins of devices located in the **Redmond43** plant.

```java
// Query the device twins in IoT Hub
System.out.println("Devices in Redmond:");

// Construct the query
SqlQuery sqlQuery = SqlQuery.createSqlQuery("*", SqlQuery.FromType.DEVICES, "tags.plant='Redmond43'", null);

// Run the query, returning a maximum of 100 devices
Query twinQuery = twinClient.queryTwin(sqlQuery.getQuery(), 100);
while (twinClient.hasNextDeviceTwin(twinQuery)) {
  DeviceTwinDevice d = twinClient.getNextDeviceTwin(twinQuery);
  System.out.println(d.getDeviceId());
}
```

This example query refines the first query to select only the devices that are also connected through a cellular network.

```java
System.out.println("Devices in Redmond using a cellular network:");

// Construct the query
sqlQuery = SqlQuery.createSqlQuery("*", SqlQuery.FromType.DEVICES, "tags.plant='Redmond43' AND properties.reported.connectivityType = 'cellular'", null);

// Run the query, returning a maximum of 100 devices
twinQuery = twinClient.queryTwin(sqlQuery.getQuery(), 3);
while (twinClient.hasNextDeviceTwin(twinQuery)) {
  DeviceTwinDevice d = twinClient.getNextDeviceTwin(twinQuery);
  System.out.println(d.getDeviceId());
}
```

### SDK service sample

The Azure IoT SDK for Java provides a working sample of a service app that handles device twin tasks. For more information, see  [Device twin sample](https://github.com/Azure/azure-iot-service-sdk-java/blob/main/service/iot-service-samples/device-twin-sample/src/main/java/samples/com/microsoft/azure/sdk/iot/DeviceTwinSample.java).




**Applies to: programming-language-python**



  * Python SDK - [Python version 3.7 or later](https://www.python.org/downloads/) is recommended. Make sure to use the 32-bit or 64-bit installation as required by your setup. When prompted during the installation, make sure to add Python to your platform-specific environment variable.

## Overview

This article describes how to use the [Azure IoT SDK for Python](https://github.com/Azure/azure-iot-sdk-python) to create device and backend service application code for device twins.

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

Device applications can read and write twin reported properties, and be notified of desired twin property changes that are set by a backend application or IoT Hub.

The [IoTHubDeviceClient](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient) class contains methods that can be used to work with device twins.

This section describes how to create device application code that:

* Retrieves a device twin and examine reported properties
* Patch reported device twin properties

### Device import statement

Add this code to import the `IoTHubDeviceClient` functions from the azure.iot.device SDK.

```python
from azure.iot.device import IoTHubDeviceClient
```

### Connect a device to IoT Hub

A device app can authenticate with IoT Hub using the following methods:

* Shared access key
* X.509 certificate


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../iot/iot-overview-security.md#connection-security).


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


### Retrieve a device twin and examine reported properties

You can retrieve and examine device twin information including tags and properties. The device twin information retrieved matches device twin JSON-formatted data that you can view for a device in the Azure portal.

Call [get_twin](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient?#azure-iot-device-iothubdeviceclient-get-twin) to get the device  twin from the Azure IoT Hub service. The twin information is placed into a variable that can be printed or examined.

This example retrieves the device twin and uses the `print` command to view the device twin in JSON format.

```python
# get the twin
twin = await device_client.get_twin()
print("Twin document:")
print("{}".format(twin))
```

### Patch reported device twin properties

You can apply a patch to update device reported properties in JSON format.

To apply a patch to update reported properties:

1. Assign a reported property JSON patch to a variable.
1. Call [patch_twin_reported_properties](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient?#azure-iot-device-iothubdeviceclient-patch-twin-reported-properties) to apply the JSON patch to reported properties. This is a synchronous call, meaning that this function does not return until the patch is sent to the service and acknowledged.

If `patch_twin_reported_properties` returns an error, this function raises the corresponding error.

```python
# create the reported properties patch
reported_properties = {"temperature": random.randint(320, 800) / 10}
print("Setting reported temperature to {}".format(reported_properties["temperature"]))
# update the reported properties and wait for the result
await device_client.patch_twin_reported_properties(reported_properties)
```

You can also call these methods to update device twins:

* Call [replace_twin](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager?#azure-iot-hub-iothubregistrymanager-replace-twin) to replace device twin tags and desired properties.
* Call [update_twin](https://learn.microsoft.com/en-us/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager?#azure-iot-hub-iothubregistrymanager-update-twin) to update device twin tags and desired properties.

### Incoming desired properties patch handler

Call [on_twin_desired_properties_patch_received](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient?\&#azure-iot-device-iothubdeviceclient-on-twin-desired-properties-patch-received) to create a handler function or coroutine that is called when a twin desired properties patch is received. The handler takes one argument, which is the twin patch in the form of a JSON dictionary object.

This example sets up a desired properties patch handler named `twin_patch_handler`.

For example:

```python
try:
    # Set handlers on the client
    device_client.on_twin_desired_properties_patch_received = twin_patch_handler
except:
    # Clean up in the event of failure
    client.shutdown()
```

The `twin_patch_handler` receives and prints JSON desired property updates.

```python
    # Define behavior for receiving twin desired property patches
    def twin_patch_handler(twin_patch):
        print("Twin patch received:")
        print(twin_patch)
```

### SDK device samples

The Azure IoT SDK for Python includes the following samples:

* [get_twin](https://github.com/Azure/azure-iot-sdk-python/blob/main/samples/async-hub-scenarios/get_twin.py) - Connect to a device and retrieve twin information.
* [update_twin_reported_properties](https://github.com/Azure/azure-iot-sdk-python/blob/main/samples/async-hub-scenarios/update_twin_reported_properties.py) - Update twin reported properties.
* [receive_twin_desired_properties](https://github.com/Azure/azure-iot-sdk-python/blob/main/samples/async-hub-scenarios/receive_twin_desired_properties_patch.py) - Receive and update desired properties.

## Create a backend application

A backend application connects to a device through IoT Hub and can read device reported and desired properties, write device desired properties, and run device queries.

This section describes how to create a backend application to:

* Update twin tags and desired properties
* Queries devices using filters on the tags and properties

The [IoTHubRegistryManager](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager) class exposes all methods required to create a backend application to interact with device twins from the service.

### Connect to IoT hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Connect to IoT hub using [from_connection_string](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager?#azure-iot-hub-iothubregistrymanager-from-connection-string). Your application needs the **service connect** permission to modify desired properties of a device twin, and it needs **registry read** permission to query the identity registry. There is no default shared access policy that contains only these two permissions, so you need to create one if a one does not already exist. Supply this shared access policy connection string as a parameter to `fromConnectionString`. For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

For example:

```python
import sys
from time import sleep
from azure.iot.hub import IoTHubRegistryManager
from azure.iot.hub.models import Twin, TwinProperties, QuerySpecification, QueryResult

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


### Update twin tags and desired properties

You can update both device twin tags and desired properties from a backend application at the same time using [update_twin](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager?#azure-iot-hub-iothubregistrymanager-update-twin).

1. Call [get_twin](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager?#azure-iot-hub-iothubregistrymanager-get-twin) to get the current version of the device twin
1. Use the [Twin](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.protocol.models.twin\(class\)) class to add tags and properties in JSON format.
1. Call `update_twin` to apply the patch to the device twin. You can also use [replace_twin](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager?#azure-iot-hub-iothubregistrymanager-replace-twin) to replace desired properties and tags for a device twin.

This example updates `region` and `plant` tag information, and sets a `power_level` desired property to `1`.

```python
new_tags = {
        'location' : {
            'region' : 'US',
            'plant' : 'Redmond43'
        }
    }

DEVICE_ID = "[Device Id]"
twin = iothub_registry_manager.get_twin(DEVICE_ID)
twin_patch = Twin(tags=new_tags, properties= TwinProperties(desired={'power_level' : 1}))
twin = iothub_registry_manager.update_twin(DEVICE_ID, twin_patch, twin.etag)
```

### Create a device twin query

You can query device twin information using device twin queries. Device twin queries are SQL-like queries that return a result set of device twins.

To use a device twin query:

1. Use a [QuerySpecification](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.protocol.models.queryspecification) object to define a SQL-like query request.

1. Use [query_iot_hub](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager?#azure-iot-hub-iothubregistrymanager-query-iot-hub) to query an IoTHub and retrieve device twin information using the SQL-like query specification.

This example runs two queries. The first selects only the device twins of devices located in the `Redmond43` plant, and the second refines the query to select only the devices that are also connected through a cellular network. Results are printed after each query.

```python
query_spec = QuerySpecification(query="SELECT * FROM devices WHERE tags.location.plant = 'Redmond43'")
query_result = iothub_registry_manager.query_iot_hub(query_spec, None, 100)
print("Devices in Redmond43 plant: {}".format(', '.join([twin.device_id for twin in query_result.items])))

print()

query_spec = QuerySpecification(query="SELECT * FROM devices WHERE tags.location.plant = 'Redmond43' AND properties.reported.connectivity = 'cellular'")
query_result = iothub_registry_manager.query_iot_hub(query_spec, None, 100)
print("Devices in Redmond43 plant using cellular network: {}".format(', '.join([twin.device_id for twin in query_result.items])))

print()
```

### SDK service sample

The Azure IoT SDK for Python provides a working sample of a service app that handles device twin tasks. For more information, see  [Registry Manager Query Sample](https://github.com/Azure/azure-iot-hub-python/blob/main/samples/iothub_registry_manager_query_sample.py).




**Applies to: programming-language-node**



  *  Requires Node.js version 10.0.x or later

## Overview

This article describes how to use the [Azure IoT SDK for Node.js](https://github.com/Azure/azure-iot-sdk-node) to create device and backend service application code for device twins.

## Create a device application

Device applications can read and write twin reported properties, and be notified of desired twin property changes that are set by a backend application or IoT Hub.

This section describes how to use the [azure-iot-device](https://learn.microsoft.com/javascript/api/azure-iot-device) package in the Azure IoT SDK for Node.js to create a device application to:

* Retrieve a device twin and examine reported properties
* Update reported device twin properties
* Receive notice of desired property changes


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../iot/iot-overview-security.md#connection-security).


### Install device SDK package

Run this command to install the **azure-iot-device** device SDK on your development machine:

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

The [azure-iot-device](https://learn.microsoft.com/javascript/api/azure-iot-device) package contains objects that interface with IoT devices. The [Twin](https://learn.microsoft.com/javascript/api/azure-iot-device/twin) class includes twin-specific objects. This section describes `Client` class code that is used to read and write device twin data.

### Choose a transport protocol

The `Client` object supports these protocols:

* `Amqp`
* `Http` - When using `Http`, the `Client` instance checks for messages from IoT Hub infrequently (a minimum of every 25 minutes).
* `Mqtt`
* `MqttWs`
* `AmqpWs`

Install needed transport protocols on your development machine.

For example, this command installs the `Mqtt` protocol:

```cmd/sh
npm install azure-iot-device-mqtt --save
```

For more information about the differences between MQTT, AMQP, and HTTPS support, see [Cloud-to-device communications guidance](iot-hub-devguide-c2d-guidance.md) and [Choose a communication protocol](iot-hub-devguide-protocols.md).

### Create a client module

Create a `Client` module using the installed package.

For example:

```javascript
const Client = require('azure-iot-device').Client;
```

### Create a protocol module

Create a `Protocol` module using an installed transport package.

This example assigns the MQTT protocol:

```javascript
const Protocol = require('azure-iot-device-mqtt').Mqtt;
```

### Add the device connection string and transport protocol

Call [fromConnectionString](https://learn.microsoft.com/javascript/api/azure-iot-device/client?#azure-iot-device-client-fromconnectionstring) to supply device connection parameters:

* **connStr** - A connection string that encapsulates "device connect" permissions for an IoT hub. The connection string contains hostname, device ID & shared access key in this format:
"HostName=<iothub_host_name>;DeviceId=<device_id>;SharedAccessKey=<device_key>".
* **transportCtor** - The transport protocol.

This example uses the `Mqtt` transport protocol:

```javascript
const deviceConnectionString = "{IoT hub device connection string}"
const Protocol = require('azure-iot-device-mqtt').Mqtt;
let client = Client.fromConnectionString(deviceConnectionString, Protocol);
```

### Open the connection to IoT Hub

Use the [open](https://learn.microsoft.com/javascript/api/azure-iot-device/client?#azure-iot-device-client-open) method to open a connection between an IoT device and IoT Hub.
Use `.catch(err)` to catch an error and execute handler code.

For example:

```javascript
client.open()  //open the connection
.catch((err) => {
  console.error('Could not connect: ' + err.message);
});
```

### Retrieve a device twin and examine reported properties

Call [getTwin](https://learn.microsoft.com/javascript/api/azure-iot-device/client?#azure-iot-device-client-gettwin-1) to retrieve current device twin information into a [Twin](https://learn.microsoft.com/javascript/api/azure-iot-device/twin) object.

For example:

```javascript
client.getTwin(function(err, twin))
if (err)
    console.error('could not get twin');
```

### Update reported device twin properties

Use [update](https://learn.microsoft.com/javascript/api/azure-iothub/twin?#azure-iothub-twin-update) to update device reported properties. Include a JSON-formatted patch as the first parameter and function execution status callback method as the second parameter to the method.

In this example, a JSON-formatted device twin patch is stored in the `patch` variable. The patch contains a device twin `connectivity` update value of `cellular`. The patch and error handler are passed to the `update` method. If there's an error, a console error message is displayed.

```javascript
var patch = {
    connectivity: {
        type: 'cellular'
    }
}
twin.properties.reported.update(patch, function(err)
  {
    if (err)
      {
        console.error('could not update twin');
      } 
    else
      {
        console.log('twin state reported');
        process.exit();
      }
  });
```

### Receive notice of desired property changes

Create a desired property update event listener that executes when a desired property is changed in the device by passing the callback handler method name to [twin.on](https://learn.microsoft.com/javascript/api/azure-iot-device/twin?#azure-iot-device-twin-on).

The desired property event listener can take one of the following forms:

* Receive all patches with a single event handler
* Receive an event if anything changes under a properties grouping
* Receive an event for a single property change

#### Receive all patches with a single event handler

You can create a listener to receive any desired property change.

This example code outputs any properties that are received from the service.

```javascript
twin.on('properties.desired', function (delta) {
    console.log('new desired properties received:');
    console.log(JSON.stringify(delta));
});
```

#### Receive an event if anything changes under a properties grouping

You can create a listener to receive an event if anything under a property grouping changes.

For example:

1. The `minTemperature` and `maxTemperature` properties are located under a property grouping named `properties.desired.climate changes`.

1. A backend service application applies this patch to update `minTemperature` and `maxTemperature` desired properties:

    ```javascript
    const twinPatch1 = {
    properties: {
       desired: {
        climate: { minTemperature: 68, maxTemperature: 76, },
        },
      },
     };
    ```

1. This code sets up a desired properties change event listener that triggers for any changes within the `properties.desired.climate` property grouping. If there's a desired property change within this group, min and max temperature change messages that are displayed to the console:

    ```javascript
    twin.on('properties.desired.climate', function (delta) {
        if (delta.minTemperature || delta.maxTemperature) {
            console.log('updating desired temp:');
            console.log('min temp = ' + twin.properties.desired.climate.minTemperature);
            console.log('max temp = ' + twin.properties.desired.climate.maxTemperature);
        }
    });
    ```

#### Receive an event for a single property change

You can set up a listener for a single property change. In this example, the code for this event is executed only if the `fanOn` boolean value is part of the patch. The code outputs the new desired `fanOn` state whenever the service updates it.

1. A backend application applies this desired property patch:

    ```javascript
     const twinPatch2 = {
      properties: {
        desired: {
          climate: {
            hvac: {
              systemControl: { fanOn: true, },
            },
          },
        },
      },
    };
    ```

1. The listener triggers only when the `fanOn` property changes:

    ```javascript
     twin.on('properties.desired.climate.hvac.systemControl', function (fanOn) {
         console.log('setting fan state to ' + fanOn);
      });
    ```

### Device SDK samples

The Azure IoT SDK for Node.js contains two device twin samples:

* [Simple sample device twin](https://github.com/Azure/azure-iot-sdk-node/blob/main/device/samples/javascript/simple_sample_device_twin.js)

* [Simple sample device twin with SAS](https://github.com/Azure/azure-iot-sdk-node/blob/main/device/samples/javascript/simple_sample_device_with_sas.js)

## Create a backend application

A backend application connects to a device through IoT Hub and can read device reported and desired properties, write device desired properties, and run device queries.

This section describes how to create a backend application that:

* Retrieves and updates a device twin
* Creates a device twin query

### Install service SDK package

Run this command to install **azure-iothub** on your development machine:

```cmd/sh
npm install azure-iothub --save
```

The [Registry](https://learn.microsoft.com/javascript/api/azure-iothub/registry) class exposes all methods required to interact with device twins from a backend application.

### Connect to IoT hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Use [fromConnectionString](https://learn.microsoft.com/javascript/api/azure-iothub/registry?#azure-iothub-registry-fromconnectionstring) to connect to IoT hub. Your application needs the **service connect** permission to modify desired properties of a device twin, and it needs **registry read** permission to query the identity registry. There is no default shared access policy that contains only these two permissions, so you need to create one if a one does not already exist. Supply this shared access policy connection string as a parameter to `fromConnectionString`. For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

```javascript
'use strict';
var iothub = require('azure-iothub');
var connectionString = '{Shared access policy connection string}';
var registry = iothub.Registry.fromConnectionString(connectionString);
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


### Retrieve and update a device twin

You can create a patch that contains tag and desired property updates for a device twin.

To update a device twin:

1. Call [getTwin](https://learn.microsoft.com/javascript/api/azure-iothub/registry?#azure-iothub-registry-gettwin-1) to retrieve the device twin object.
* Format a patch that contains the device twin update. The patch is formatted in JSON as described in [Twin class](https://learn.microsoft.com/javascript/api/azure-iothub/twin?#azure-iothub-twin-update-1). A backend service patch can contain tag and desired property updates. For more patch format information, see [Tags and properties format](https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-device-twins#tags-and-properties-format).

1. Call [update](https://learn.microsoft.com/javascript/api/azure-iothub/twin?#azure-iothub-twin-update-1) to update the device twin with the patch.

In this example, the device twin is retrieved for `myDeviceId`, then a patch is applied to the twins that contains `location` tag update of `region: 'US', plant: 'Redmond43'`.

```javascript
     registry.getTwin('myDeviceId', function(err, twin){
         if (err) {
             console.error(err.constructor.name + ': ' + err.message);
         } else {
             var patch = {
                 tags: {
                     location: {
                         region: 'US',
                         plant: 'Redmond43'
                   }
                 }
             };

             twin.update(patch, function(err) {
               if (err) {
                 console.error('Could not update twin: ' + err.constructor.name + ': ' + err.message);
               } else {
                 console.log(twin.deviceId + ' twin updated successfully');
                 queryTwins();
               }
             });
         }
     });
```

### Create a device twin query

You can create SQL-like device queries to gather information from device twins.

Use [createQuery](https://learn.microsoft.com/javascript/api/azure-iothub/registry?#azure-iothub-registry-createquery) to create a query that can be run on an IoT hub instance to find information about devices or jobs.

`createQuery` includes two parameters:

* **sqlQuery** - The query written as an SQL string.
* **pageSize** - The desired number of results per page (optional. default: 1000, max: 10000).

If the **pageSize** parameter is specified, the query object contains a `hasMoreResults` boolean property that you can check and use the `nextAsTwin` method to get the next twin results page as many times as needed to retrieve all results. A method called `next` is available for results that are not device twins, for example, the results of aggregation queries.

This example query selects only the device twins of devices located in the `Redmond43` plant.

```javascript
var queryTwins = function() {
var query = registry.createQuery("SELECT * FROM devices WHERE tags.location.plant = 'Redmond43'", 100);
query.nextAsTwin(function(err, results) {
    if (err) {
        console.error('Failed to fetch the results: ' + err.message);
    } else {
        console.log("Devices in Redmond43: " + results.map(function(twin) {return twin.deviceId}).join(','));
    }
});
```

This example query refines the first query to select only the devices that are also connected through cellular network.

```javascript
query = registry.createQuery("SELECT * FROM devices WHERE tags.location.plant = 'Redmond43' AND properties.reported.connectivity.type = 'cellular'", 100);
query.nextAsTwin(function(err, results) {
    if (err) {
        console.error('Failed to fetch the results: ' + err.message);
    } else {
        console.log("Devices in Redmond43 using cellular network: " + results.map(function(twin) {return twin.deviceId}).join(','));
    }
});
};
```

### Service SDK sample

The Azure IoT SDK for Node.js provides a working sample of a service app that handles device twin tasks. For more information, see [Device twin backend service](https://github.com/Azure/azure-iot-sdk-node/tree/main/device/samples/helpers/device-twin-service) - This project is used to send device twin patch updates for a specific device.
