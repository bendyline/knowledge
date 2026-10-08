---
title: Get started with module identities and module identity twins (Node.js)
titleSuffix: Azure IoT Hub
description: Learn how to create module identities and update module identity twins using the Azure IoT Hub SDK for Node.js.
author: SoniaLopezBravo
ms.author: sonialopez
ms.service: iot-hub
ms.devlang: nodejs
ms.topic: include
ms.date: 1/3/2025
ms.custom:
  - mqtt
  - devx-track-js
  - sfi-ropc-nochange
---

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
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../articles/iot/iot-overview-security.md#connection-security).


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

For more information about the differences between MQTT, AMQP, and HTTPS support, see [Cloud-to-device communications guidance](../articles/iot-hub/iot-hub-devguide-c2d-guidance.md) and [Choose a device communication protocol](../articles/iot-hub/iot-hub-devguide-protocols.md).

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
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../articles/iot/iot-overview-security.md#cloud-security).


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
