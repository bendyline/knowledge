---
title: Device management using direct methods (Python)
titleSuffix: Azure IoT Hub
description: How to use Azure IoT Hub direct methods with the Azure IoT SDK for Python for device management tasks including invoking a remote device reboot.
author: SoniaLopezBravo
ms.author: sonialopez
ms.service: iot-hub
ms.devlang: csharp
ms.topic: include
ms.date: 1/6/2025
ms.custom:
  - mqtt
  - devx-track-python
  - py-fresh-zinc
  - sfi-ropc-nochange
---

  * Python SDK - [Python version 3.7 or later](https://www.python.org/downloads/) is recommended. Make sure to use the 32-bit or 64-bit installation as required by your setup. When prompted during the installation, make sure to add Python to your platform-specific environment variable.

## Overview

This article describes how to use the [Azure IoT SDK for Python](https://github.com/Azure/azure-iot-sdk-python) to create device and backend service application code for device direct methods.

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

This section describes how to use device application code to create a direct method callback listener.

The [IoTHubDeviceClient](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient) class contains methods that can be used to work with direct methods.

### Device import statement

Add this import statement to access `IoTHubDeviceClient` and `MethodResponse`.

```python
# import the device client library
from azure.iot.device import IoTHubDeviceClient, MethodResponse
```

### Connect to a device

A device app can authenticate with IoT Hub using the following methods:

* Shared access key
* X.509 certificate


>**Important:**
>This article includes steps to connect a device using a shared access signature, also called symmetric key authentication. This authentication method is convenient for testing and evaluation, but authenticating a device using X.509 certificates is a more secure approach. To learn more, see [Security best practices for IoT solutions > Connection security](../articles/iot/iot-overview-security.md#connection-security).


#### Authenticate using a shared access key

Use [create_from_connection_string](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient?#azure-iot-device-iothubdeviceclient-create-from-connection-string) to connect an application to a device using a device connection string.

```python
# substitute the device connection string in conn_str
# and add it to the IoTHubDeviceClient object
conn_str = "{IoT hub device connection string}"
device_client = IoTHubDeviceClient.create_from_connection_string(conn_str)
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


### Create a direct method callback

Use [on_method_request_received](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient?#azure-iot-device-iothubdeviceclient-on-method-request-received) to create a handler function or coroutine that is called when a direct method is received. The listener is associated with a method name keyword, such as "reboot". The method name can be used in an IoT Hub or backend application to trigger the callback method on the device.

The handler function should create a [MethodResponse](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.methodresponse) and pass it to [send_method_response](https://learn.microsoft.com/python/api/azure-iot-device/azure.iot.device.iothubdeviceclient?#azure-iot-device-iothubdeviceclient-send-method-response) to send a direct method response acknowledgment to the calling application.

This example sets up a direct method handler named `method_request_handler`.

```python
try:
    # Attach the handler to the client
    client.on_method_request_received = method_request_handler
except:
    # In the event of failure, clean up
    client.shutdown()
```

In this example, the `method_request_handler` callback method implements the direct method on the device. The code is executed when the "rebootDevice" direct method is called from a service application. The method calls `send_method_response` to send a direct method response acknowledgment to the calling application.

```python
# Define the handler for method requests
def method_request_handler(method_request):
    if method_request.name == "rebootDevice":
        # Act on the method by rebooting the device
        print("Rebooting device")
        time.sleep(20)
        print("Device rebooted")
        # Create a method response indicating the method request was resolved
        resp_status = 200
        resp_payload = {"Response": "This is the response from the device"}
        method_response = MethodResponse(method_request.request_id, resp_status, resp_payload)
    else:
        # Create a method response indicating the method request was for an unknown method
        resp_status = 404
        resp_payload = {"Response": "Unknown method"}
        method_response = MethodResponse(method_request.request_id, resp_status, resp_payload)

    # Send the method response
    client.send_method_response(method_response)
```

### SDK device samples

The Azure IoT SDK for Python provides a working sample of a device app that handles direct method tasks. For more information, see [Receive direct method](https://github.com/Azure/azure-iot-sdk-python/blob/main/samples/async-hub-scenarios/receive_direct_method.py).

## Create a backend application

This section describes how to use a backend service application to call a direct method on a device.

The [IoTHubRegistryManager](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager) class exposes all methods required to create a backend application to send messages to a device.

### Service import statements

Add these import statements to connect to IoT Hub, send cloud-to-device direct methods, and receive device direct method responses.

```python
from azure.iot.hub import IoTHubRegistryManager
from azure.iot.hub.models import CloudToDeviceMethod, CloudToDeviceMethodResult
```

### Connect to IoT hub

You can connect a backend service to IoT Hub using the following methods:

* Shared access policy
* Microsoft Entra


>**Important:**
>This article includes steps to connect to a service using a shared access signature. This authentication method is convenient for testing and evaluation, but authenticating to a service with Microsoft Entra ID or managed identities is a more secure approach. To learn more, see [Security best practices for IoT solutions > Cloud security](../articles/iot/iot-overview-security.md#cloud-security).


#### Connect using a shared access policy

Connect to IoT hub using [from_connection_string](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothubregistrymanager?#azure-iot-hub-iothubregistrymanager-from-connection-string).

To invoke a direct method on a device through IoT Hub, your service needs the **service connect** permission. By default, every IoT Hub is created with a shared access policy named **service** that grants this permission.

As a parameter to `from_connection_string`, supply the **service** shared access policy. For more information about shared access policies, see [Control access to IoT Hub with shared access signatures](https://learn.microsoft.com/azure/iot-hub/authenticate-authorize-sas).

For example:

```python
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


### Invoke a method on a device

You can invoke a direct method by name on a device. The method name identifies the method. In the following and previous device example shown in **Create a direct method callback**, the direct method name is "rebootDevice".

To invoke a direct method on a device:

1. Create a [CloudToDeviceMethod](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.protocol.models.cloudtodevicemethod) object. Supply the method name and payload as parameters.
1. Call [invoke_device_method](https://learn.microsoft.com/python/api/azure-iot-hub/azure.iot.hub.iothub_registry_manager.iothubregistrymanager?#azure-iot-hub-iothub-registry-manager-iothubregistrymanager-invoke-device-method) to invoke a direct method on a device. Supply the device ID and `CloudToDeviceMethod` payload object as parameters.

This example calls `CloudToDeviceMethod` to invoke a direct method named "rebootDevice" on a device. After the direct method is successfully invoked, the direct method response payload is displayed.

```python
CONNECTION_STRING = "{IoTHubConnectionString}"
DEVICE_ID = "{deviceId}"

METHOD_NAME = "rebootDevice"
METHOD_PAYLOAD = "{\"method_number\":\"42\"}"
TIMEOUT = 60
WAIT_COUNT = 10

try:
    print ( "" )
    print ( "Invoking device to reboot..." )

    # Call the direct method.
    deviceMethod = CloudToDeviceMethod(method_name=METHOD_NAME, payload=METHOD_PAYLOAD)
    response = registry_manager.invoke_device_method(DEVICE_ID, deviceMethod)

    print ( "Successfully invoked the device to reboot." )

    print ( "The device has returned this payload:" )
    print ( response.payload )

except Exception as ex:
    print ( "" )
    print ( "Unexpected error {0}".format(ex) )
    return
```

### SDK service samples

The Azure IoT SDK for Python provides working samples of service apps that handle direct method tasks. For more information, see:

* [Service helper sync](https://github.com/Azure/azure-iot-sdk-python/blob/e75d1c2026eab939d5d31097fd0c22924c53abf8/dev_utils/dev_utils/service_helper_sync.py)
* [Service operations](https://github.com/Azure/azure-iot-sdk-python/blob/e75d1c2026eab939d5d31097fd0c22924c53abf8/tests/e2e/provisioning_e2e/iothubservice20180630/operations/service_operations.py)
