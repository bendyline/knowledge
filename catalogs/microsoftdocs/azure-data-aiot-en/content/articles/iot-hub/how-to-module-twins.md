---
title: Get started with module identity and module identity twins
titleSuffix: Azure IoT Hub
description: Learn how to create module identities and update module identity twins using the Azure IoT Hub SDKs.
author: sethmanheim
ms.author: sethm
manager: lizross
ms.service: azure-iot-hub
ms.devlang: csharp
ms.topic: how-to
ms.date: 01/03/2025
zone_pivot_groups: iot-hub-howto-c2d-2
ms.custom: mqtt, devx-track-csharp, devx-track-dotnet
---

# Get started with IoT Hub module identities and module identity twins

Module identities and module identity twins are similar to Azure IoT Hub device identities and device twins, but provide finer granularity. While Azure IoT Hub device identities and device twins enable the back-end application to configure a device and provide visibility on the device's conditions, a module identity and module identity twin provide these capabilities for individual components of a device. On capable devices with multiple components, such as operating system devices or firmware devices, module identities and module identity twins allow for isolated configuration and conditions for each component. For more information, see [Understand Azure IoT Hub module twins](iot-hub-devguide-module-twins.md).

>**Note:**
>The features described in this article are available only in the standard tier of IoT Hub. For more information about the basic and standard/free IoT Hub tiers, see [Choose the right IoT Hub tier and size for your solution](iot-hub-scaling.md).


This article shows you how to develop two types of applications:

* Device apps that view and update module identity twin reported properties and handle requests to update desired properties.
* Service apps that can read and set module identity desired properties.

> **Note:**
> This article is meant to complement [Azure IoT SDKs](iot-hub-devguide-sdks.md) samples that are referenced from within this article. You can use SDK tools to build both device and back-end applications.

## Prerequisites

* An IoT hub
* An IoT hub device
* An IoT hub device module identity

* If your application uses the MQTT protocol, make sure that **port 8883** is open in your firewall. The MQTT protocol communicates over port 8883. This port may be blocked in some corporate and educational network environments. For more information and ways to work around this issue, see [Connecting to IoT Hub (MQTT)](iot-mqtt-connect-to-iot-hub.md#connect-to-iot-hub).

**Applies to: programming-language-csharp**



  * Requires Visual Studio

## Overview

This article describes how to use the [Azure IoT SDK for .NET](https://github.com/Azure/azure-iot-sdk-csharp/blob/main/readme.md) to create device and backend service application code for module identity twins.

## Create a device application

This section describes how to use device application code to:

* Retrieve a module identity twin and examine reported properties
* Update reported module identity twin properties
* Create a module desired property update callback handler


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../iot/iot-overview-security.md#connection-security).


### Required device NuGet package

Device client applications written in C# require the **Microsoft.Azure.Devices.Client** NuGet package.

Add these `using` statements to use the device library.

```csharp
using Microsoft.Azure.Devices.Client;
using Microsoft.Azure.Devices.Shared;
```

### Connect to a device

The [ModuleClient](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.moduleclient) class exposes all methods required to interact with module identity twins from the device.

Connect to the device using the [CreateFromConnectionString](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.moduleclient.createfromconnectionstring) method with the module identity connection string.

Calling `CreateFromConnectionString` without a transport parameter connects using the default AMQP transport.

This example connects to the device using the default AMQP transport.

```csharp
static string ModuleConnectionString = "{Device module identity connection string}";
private static ModuleClient _moduleClient = null;

_moduleClient = ModuleClient.CreateFromConnectionString(ModuleConnectionString, null);
```

> **Note:**
> C#/.NET does not support connection of a device app to an IoT Hub module identity twin using a certificate.

### Retrieve a module identity twin and examine properties

Call [GetTwinAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.moduleclient.gettwinasync?#microsoft-azure-devices-client-moduleclient-gettwinasync) to retrieve the current module identity twin properties into a [Twin](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.shared.twin?) object.

This example retrieves and displays module identity twin properties in JSON format.

```csharp
Console.WriteLine("Retrieving twin...");
Twin twin = await _moduleClient.GetTwinAsync();
Console.WriteLine("\tModule identity twin value received:");
Console.WriteLine(JsonConvert.SerializeObject(twin.Properties));
```

### Update module identity twin reported properties

To update a twin reported property:

1. Create a [TwinCollection](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.shared.twincollection) object for the reported property update
1. Update one or more reported properties within the `TwinCollection` object
1. Use [UpdateReportedPropertiesAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.moduleclient.updatereportedpropertiesasync) to push reported property changes to the IoT hub service

For example:

```csharp
try
{
  Console.WriteLine("Sending sample start time as reported property");
  TwinCollection reportedProperties = new TwinCollection();
  reportedProperties["DateTimeLastAppLaunch"] = DateTime.UtcNow;
  await _moduleClient.UpdateReportedPropertiesAsync(reportedProperties);
}
catch (Exception ex)
{
   Console.WriteLine();
   Console.WriteLine("Error in sample: {0}", ex.Message);
}
```

### Create a desired property update callback handler

 Pass the callback handler method name to [SetDesiredPropertyUpdateCallbackAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.client.moduleclient.setdesiredpropertyupdatecallbackasync) to create a desired property update callback handler that executes when a desired property is changed in the module identity twin.

For example, this call sets up the system to notify a method named `OnDesiredPropertyChangedAsync` whenever a desired module property is changed.

```csharp
await _moduleClient.SetDesiredPropertyUpdateCallbackAsync(OnDesiredPropertyChangedAsync, null);
```

The module identity twin properties are passed to the callback method as a [TwinCollection](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.shared.twincollection) and can be examined as `KeyValuePair` structures.

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

   await _moduleClient.UpdateReportedPropertiesAsync(reportedProperties);
}
```

### SDK module sample

The Azure IoT SDK for .NET provides working samples of device apps that handle module identity twin tasks. For more information, see:

* [TwinSample](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/device/samples/getting%20started/TwinSample)
* [Device Client Tests](https://github.com/Azure/azure-iot-sdk-csharp/blob/main/iothub/device/tests/DeviceClientTests.cs)

## Create a backend application

This section describes how to read and update module identity fields.

The [RegistryManager](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager) class exposes all methods required to create a backend application to interact with module identity twins from the service.

### Required service NuGet package

Backend service applications require the **Microsoft.Azure.Devices** NuGet package.

Add these `using` statements to use the service library.

```csharp
using Microsoft.Azure.Devices;
using Microsoft.Azure.Devices.Shared;
```

### Connect to IoT Hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Connect a backend application to IoT hub using [CreateFromConnectionString](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager.createfromconnectionstring).

The `UpdateModuleAsync` method used in this section requires the **Service Connect** shared access policy permission to add desired properties to a module. As a parameter to `CreateFromConnectionString`, supply a shared access policy connection string that includes **Service Connect** permission. For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

For example:

```csharp
static RegistryManager registryManager;
static string connectionString = "{IoT hub shared access policy connection string}";
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


### Read and update module identity fields

 Call [GetModuleAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager.getmoduleasync) to retrieve current module identity twin fields into a [Module](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.module) object.

The `Module` class includes `properties` that correspond to sections of a module identity twin. Use the Module class properties to view and update module identity twin fields. You can use the `Module` object properties to update multiple fields before writing the updates to the device using `UpdateModuleAsync`.

After making module identity twin field updates, call [UpdateModuleAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager.updatemoduleasync) to write `Module` object field updates back to a device. Use `try` and `catch` logic coupled with an error handler to catch incorrectly formatted patch errors from `UpdateModuleAsync`.

This example retrieves a module into a `Module` object, updates the `module` `LastActivityTime` property, and then updates the module in IoT Hub using `UpdateModuleAsync`.

```csharp
// Retrieve the module
var module = await registryManager.GetModuleAsync("myDeviceId","myModuleId");

// Update the module object
module.LastActivityTime = DateTime.Now;

// Apply the patch to update the device twin tags section
try
{
   await registryManager.UpdateModuleAsync(module);
}
catch (Exception e)
{
   console.WriteLine("Module update failed.", e.Message);
}
```

### Other module API

* [GetModulesOnDeviceAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager.getmodulesondeviceasync) - Retrieves the module identities on a device
* [RemoveModuleAsync](https://learn.microsoft.com/dotnet/api/microsoft.azure.devices.registrymanager.removemoduleasync) - Deletes a previously registered module from a device

### SDK service sample

The Azure IoT SDK for .NET provides a working sample of a service app that handles module identity twin tasks. For more information, see [Registry Manager E2E Tests](https://github.com/Azure/azure-iot-sdk-csharp/tree/main/iothub/service/samples/how%20to%20guides/RegistryManagerSample).




**Applies to: programming-language-python**



  * [Python version 3.7 or later](https://www.python.org/downloads/) is recommended. Make sure to use the 32-bit or 64-bit installation as required by your setup. When prompted during the installation, make sure to add Python to your platform-specific environment variable.

## Overview

This article describes how to use the [Azure IoT SDK for Python](https://github.com/Azure/azure-iot-sdk-python) to create device and backend service application code for module identity twins.

## Install packages

The **azure-iot-device** library must be installed to create device applications.

```cmd/sh
pip install azure-iot-device
```

The **azure-iot-hub** library must be installed to create backend service applications.

```cmd/sh
pip install azure-iot-hub
```

The **msrest** library is used to catch HTTPOperationError exceptions.

```cmd/sh
pip install msrest
```

## Create a device application

This section describes how to use device application code to:

* Retrieve a module identity twin and examine reported properties
* Update module identity twin reported properties
* Create a module identity twin desired property update callback handler


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../iot/iot-overview-security.md#connection-security).


### Import statements

Add this `import` statement to use the device library.

```python
# import the device client library
import asyncio
from azure.iot.device.aio import IoTHubDeviceClient
```

### Connect to a device

The [IoTHubModuleClient](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubmoduleclient) class contains methods that can be used to work with module identity twins.

To connect an application to a device:

1. Call [create_from_connection_string](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubmoduleclient?#azure-iot-device-iothubmoduleclient-create-from-connection-string) to add the module identity connection string
1. Call [connect](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubmoduleclient?#azure-iot-device-iothubmoduleclient-connect) to connect the device client to an Azure IoT hub

```python
# import the device client library
import asyncio
from azure.iot.device.aio import IoTHubDeviceClient

# substitute the device connection string in conn_str
# and add it to the IoTHubDeviceClient object
conn_str = "{Device module identity connection string}"
device_client = IoTHubDeviceClient.create_from_connection_string(conn_str)

# connect the application to the device
await device_client.connect()
```

> **Note:**
> Python does not support connection of a device app to an IoT Hub module identity twin using a certificate.

### Retrieve a module identity twin and examine properties

Call [get_twin](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubmoduleclient?#azure-iot-device-iothubmoduleclient-get-twin) to retrieve the module identity twin from the Azure IoT Hub service. The twin information is placed into a variable that can be examined.

This example retrieves the device twin and uses the `print` command to view the device twin in JSON format.

```python
# get the twin
twin = await device_client.get_twin()
print("Twin document:")
print("{}".format(twin))
```

### Update module identity twin reported properties

You can apply a patch to update module identity twin reported properties in JSON format.

To apply a patch to update reported properties:

1. Assign a reported property JSON patch to a variable.
1. Call [patch_twin_reported_properties](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubmoduleclient?#azure-iot-device-iothubmoduleclient-patch-twin-reported-properties) to apply the JSON patch to reported properties.

For example:

```python
# create the reported properties patch
reported_properties = {"temperature": random.randint(320, 800) / 10}
print("Setting reported temperature to {}".format(reported_properties["temperature"]))
# update the reported properties and wait for the result
await device_client.patch_twin_reported_properties(reported_properties)
```

### Create a module identity twin desired property update callback handler

Call [on_twin_desired_properties_patch_received](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubmoduleclient?#azure-iot-device-iothubmoduleclient-on-twin-desired-properties-patch-received) to create a handler function or coroutine that is called when a module identity twin desired properties patch is received. The handler takes one argument, which is the twin patch in the form of a JSON dictionary object.

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

The Azure IoT SDK for Python provides a working sample of device apps that handle module identity twin tasks:

* [get_twin](https://github.com/Azure/azure-iot-sdk-python/blob/main/samples/async-hub-scenarios/get_twin.py) - Connect to a device and retrieve twin information.
* [update_twin_reported_properties](https://github.com/Azure/azure-iot-sdk-python/blob/main/samples/async-hub-scenarios/update_twin_reported_properties.py) - Update twin reported properties.
* [receive_twin_desired_properties](https://github.com/Azure/azure-iot-sdk-python/blob/main/samples/async-hub-scenarios/receive_twin_desired_properties_patch.py) - Receive and update desired properties.

## Create a backend application

This section describes how to create a backend application to retrieve and update module identity twin desired properties.

The [IoTHubRegistryManager](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager) class exposes all methods required to create a backend application to interact with module identity twins from the service.

### Service import statements

Add this `import` statement to use the service library.

```python
import sys
from azure.iot.hub import IoTHubRegistryManager
from azure.iot.hub.models import Twin, TwinProperties, QuerySpecification, QueryResult
```

### Connect to IoT hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Connect to IoT hub using [from_connection_string](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager?#azure-iot-hub-iothubregistrymanager-from-connection-string).

The `update_module_twin` method used in this section requires the **Service Connect** shared access policy permission to add desired properties to a module. As a parameter to `from_connection_string`, supply a shared access policy connection string that includes **Service Connect** permission. For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

For example:

```python
# Connect to IoT hub
IOTHUB_CONNECTION_STRING = "{IoT hub shared access policy connection string}"
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


### Retrieve and update module identity twin desired properties

You can update desired properties from a backend application using [update_module_twin](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager?#azure-iot-hub-iothubregistrymanager-update-module-twin).

To retrieve and update module identity twin desired properties:

1. Call [get_module_twin](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager?#azure-iot-hub-iothubregistrymanager-get-module-twin) to get the current version of the module identity twin.
1. Use the [Twin](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.protocol.models.twin\(class\)) class to add desired properties in JSON format.
1. Call `update_module_twin` to apply the patch to the device twin. You can also use [replace_module_twin](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager?#azure-iot-hub-iothubregistrymanager-replace-module-twin) to replace desired properties and tags for a module identity twin.

This example updates the `telemetryInterval` desired property to `122`.

```python
try:
    module_twin = iothub_registry_manager.get_module_twin(DEVICE_ID, MODULE_ID)
    print ( "" )
    print ( "Module identity twin properties before update:" )
    print ( "{0}".format(module_twin.properties) )

    # Update twin
    twin_patch = Twin()
    twin_patch.properties = TwinProperties(desired={"telemetryInterval": 122})
    updated_module_twin = iothub_registry_manager.update_module_twin(
        DEVICE_ID, MODULE_ID, twin_patch, module_twin.etag
    )
    print ( "" )
    print ( "Module identity twin properties after update     :" )
    print ( "{0}".format(updated_module_twin.properties) )

except Exception as ex:
    print ( "Unexpected error {0}".format(ex) )
except KeyboardInterrupt:
    print ( "IoTHubRegistryManager sample stopped" )
```

### SDK service sample

The Azure IoT SDK for Python provides a working sample of a service app that handles device identity module twin tasks. For more information, see  [Test IoTHub Registry Manager](https://github.com/Azure/azure-iot-hub-python/blob/8c8f315e8b26c65c5517541a7838a20ef8ae668b/tests/test_iothub_registry_manager.py).




**Applies to: programming-language-node**



  * Requires Node.js version 10.0.x or later

## Overview

This article describes how to use the [Azure IoT SDK for Node.js](https://github.com/Azure/azure-iot-sdk-node) to create device and backend service application code for module identity twins.

## Create a device application

This section describes how to use the [azure-iot-device](https://learn.microsoft.com/javascript/api/azure-iot-device) package in the Azure IoT SDK for Node.js to create a device application to:

* Retrieve a module identity twin and examine reported properties
* Update module identity reported twin properties
* Receive notice of module identity twin desired property changes

The [azure-iot-device](https://learn.microsoft.com/javascript/api/azure-iot-device) package contains objects that interface with IoT devices. The [Twin](https://learn.microsoft.com/javascript/api/azure-iot-device/twin) class includes twin-specific objects. This section describes `Client` class code that is used to read and write device module identity twin data.

### Install SDK package

Run this command to install the **azure-iot-device** device SDK on your development machine:

```cmd/sh
npm install azure-iot-device --save
```

### Connect a device to IoT Hub

A device app can authenticate with IoT Hub using the following methods:

* Shared access key
* X.509 certificate


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../iot/iot-overview-security.md#connection-security).


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

For more information about the differences between MQTT, AMQP, and HTTPS support, see [Cloud-to-device communications guidance](iot-hub-devguide-c2d-guidance.md) and [Choose a device communication protocol](iot-hub-devguide-protocols.md).

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

* **connStr** - The IoT hub identity module connection string.
* **transportCtor** - The transport protocol.

This example uses the `Amqp` transport protocol:

```javascript
const deviceConnectionString = "{IoT hub identity module connection string}"
const Protocol = require('azure-iot-device-mqtt').Amqp;
let client = Client.fromConnectionString(deviceConnectionString, Protocol);
```

##### Open the connection to IoT Hub

Use the [open](https://learn.microsoft.com/javascript/api/azure-iot-device/client?#azure-iot-device-client-open) method to open a connection between an IoT device and IoT Hub.

For example:

```javascript
client.open(function(err) {
  if (err) {
    console.error('error connecting to hub: ' + err);
    process.exit(1);
  }
})
```

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


### Retrieve a module identity twin and examine reported properties

Call [getTwin](https://learn.microsoft.com/javascript/api/azure-iot-device/client?#azure-iot-device-client-gettwin-1) to retrieve current module identity twin information into a [Twin](https://learn.microsoft.com/javascript/api/azure-iot-device/twin) object.

Device code can then access the module identity twin properties.

For example:

```javascript
// Retrieve the current module identity twin
client.getTwin(function(err, twin))
if (err)
    console.error('could not get twin');

// Display the current properties
console.log('twin contents:');
console.log(twin.properties);
```

### Update module identity twin reported properties

Use [update](https://learn.microsoft.com/javascript/api/azure-iothub/twin?#azure-iothub-twin-update) to update device reported properties. Include a JSON-formatted patch as the first parameter and function execution status callback method as the second parameter to the method.

In this example, a JSON-formatted module identity twin patch is stored in the `patch` variable. The patch contains a module identity twin `connectivity` update value of `cellular`. The patch and error handler are passed to the `update` method. If there's an error, a console error message is displayed.

```javascript
// Create a patch to send to IoT Hub
var patch = {
  updateTime: new Date().toString(),
  firmwareVersion:'1.2.1',
  weather:{
    temperature: 72,
    humidity: 17
  }
};

// Apply the patch
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

### Receive notice of module identity twin desired property changes

Create a module identity twin desired property update event listener that executes when a desired property is changed by passing the callback handler method name to [twin.on](https://learn.microsoft.com/javascript/api/azure-iot-device/twin?#azure-iot-device-twin-on).

The desired property event listener can take the following forms:

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

1. This code sets up a desired property change event listener that triggers for any changes within the `properties.desired.climate` property grouping. If there's a desired property change within this group, min and max temperature change messages are displayed to the console:

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

#### Complete example

This example encapsulates the principles of this section, including multi-level callback function nesting.

```javascript
var Client = require('azure-iot-device').Client;
var Protocol = require('azure-iot-device-amqp').Amqp;
// Copy/paste your module connection string here.
var connectionString = 'HostName=xxx.azure-devices.net;DeviceId=myFirstDevice2;ModuleId=myFirstModule2;SharedAccessKey=xxxxxxxxxxxxxxxxxx';
// Create a client using the Amqp protocol.
var client = Client.fromConnectionString(connectionString, Protocol);
client.on('error', function (err) {
  console.error(err.message);
});
// connect to the hub
client.open(function(err) {
  if (err) {
    console.error('error connecting to hub: ' + err);
    process.exit(1);
  }
  console.log('client opened');
// Create device Twin
  client.getTwin(function(err, twin) {
    if (err) {
      console.error('error getting twin: ' + err);
      process.exit(1);
    }
    // Output the current properties
    console.log('twin contents:');
    console.log(twin.properties);
    // Add a handler for desired property changes
    twin.on('properties.desired', function(delta) {
        console.log('new desired properties received:');
        console.log(JSON.stringify(delta));
    });
    // create a patch to send to the hub
    var patch = {
      updateTime: new Date().toString(),
      firmwareVersion:'1.2.1',
      weather:{
        temperature: 75,
        humidity: 20
      }
    };
    // send the patch
    twin.properties.reported.update(patch, function(err) {
      if (err) throw err;
      console.log('twin state reported');
    });

  });
});
```

### Device SDK samples

The Azure IoT SDK for Node.js provides working samples of device apps that handle module identity twin tasks. For more information, see:

* [Module Identity Twin](https://github.com/Azure/azure-iot-sdk-node/blob/main/e2etests/test/module_twin.js)
* [Module Test Helper](https://github.com/Azure/azure-iot-sdk-node/blob/main/e2etests/test/module_test_helper.js)
* [Twin e2e tests](https://github.com/Azure/azure-iot-sdk-node/blob/main/e2etests/test/twin_e2e_tests.js)

## Create a backend application

This section describes how to create a backend application that retrieves a module identity twin and updates desired properties.

### Install service SDK package

Run this command to install **azure-iothub** on your development machine:

```cmd/sh
npm install azure-iothub --save
```

### Create a Registry object

The [Registry](https://learn.microsoft.com/javascript/api/azure-iothub/registry) class exposes all methods required to interact with module identity twins from a backend application.

```javascript
let Registry = require('azure-iothub').Registry;
```

### Connect to IoT hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Use [fromConnectionString](https://learn.microsoft.com/javascript/api/azure-iothub/registry?#azure-iothub-registry-fromconnectionstring) to connect to IoT hub.

The `update` method used in this section requires the **Service Connect** shared access policy permission to add desired properties to a module. As a parameter to `fromConnectionString`, supply a shared access policy connection string that includes **Service Connect** permission. For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

```javascript
let connectionString = '{IoT hub shared access policy connection string}';
let registry = Registry.fromConnectionString(serviceConnectionString);
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


### Retrieve a module identity twin and update desired properties

You can create a patch that contains desired property updates for a module identity twin.

To update a module identity twin:

1. Call [getModuleTwin](https://learn.microsoft.com/javascript/api/azure-iothub/registry?#azure-iothub-registry-getmoduletwin-1) to retrieve the device [Twin](https://learn.microsoft.com/javascript/api/azure-iothub/twin) object.

1. Format a patch that contains the module identity twin update. The patch is formatted in JSON as described in [Twin class](https://learn.microsoft.com/javascript/api/azure-iothub/twin). A backend service patch contains desired property updates. For more patch format information, see [Tags and properties format](https://learn.microsoft.com/azure/iot-hub/iot-hub-devguide-device-twins#tags-and-properties-format).

1. Call [update](https://learn.microsoft.com/javascript/api/azure-iothub/twin?#azure-iothub-twin-update) to update the module identity twin with the patch.

In this example, the module identity twin is retrieved for `myDeviceId` and `myModuleId`. Then a patch is applied to the twins that contains `climate` information.

```javascript
// Insert your device ID and moduleId here.
var deviceId = 'myFirstDevice2';
var moduleId = 'myFirstModule2';

// Retrieve the current module identity twin
registry.getModuleTwin(deviceId, moduleId, function (err, twin) {
  console.log('getModuleTwin returned ' + (err ? err : 'success'));
  if (err) {
    console.log(err);
  } else {
    console.log('success');
    console.log('Current twin:' + JSON.stringify(twin))

    // Format a desired property patch
    const twinPatch1 = {
      properties: {
        desired: {
          climate: { minTemperature: 69, maxTemperature: 77, },
        },
      },
    };

    // Send the desired property patch to IoT Hub
    twin.update(twinPatch1, function(err) {
    if (err) throw err;
    console.log('twin state reported');
    });
  }
});
```

### Service SDK samples

The Azure IoT SDK for Node.js provides working samples of service apps that handle module identity twin tasks. For more information, see:

* [Module Identity Twin](https://github.com/Azure/azure-iot-sdk-node/blob/main/e2etests/test/module_twin.js)
* [Module Test Helper](https://github.com/Azure/azure-iot-sdk-node/blob/main/e2etests/test/module_test_helper.js)
* [Twin e2e tests](https://github.com/Azure/azure-iot-sdk-node/blob/main/e2etests/test/twin_e2e_tests.js)
