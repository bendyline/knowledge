---
title: Get started with module identities and module identity twins (.NET)
titleSuffix: Azure IoT Hub
description: Learn how to create module identities and update module identity twins using the Azure IoT Hub SDK for .NET.
author: SoniaLopezBravo
ms.author: sonialopez
ms.service: iot-hub
ms.devlang: csharp
ms.topic: include
ms.date: 1/3/2025
ms.custom:
  - mqtt
  - devx-track-csharp
  - devx-track-dotnet
  - sfi-ropc-nochange
---

  * Requires Visual Studio

## Overview

This article describes how to use the [Azure IoT SDK for .NET](https://github.com/Azure/azure-iot-sdk-csharp/blob/main/readme.md) to create device and backend service application code for module identity twins.

## Create a device application

This section describes how to use device application code to:

* Retrieve a module identity twin and examine reported properties
* Update reported module identity twin properties
* Create a module desired property update callback handler


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../articles/iot/iot-overview-security.md#connection-security).


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
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../articles/iot/iot-overview-security.md#cloud-security).


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
