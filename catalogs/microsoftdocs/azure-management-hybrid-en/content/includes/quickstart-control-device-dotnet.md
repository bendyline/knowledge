---
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
services: iot-hub
ms.devlang: csharp
ms.topic: include
ms.date: 03/28/2025
ms.custom:
  - mvc
  - mqtt
  - 'Role: Cloud Development'
  - devx-track-azurecli
  - sfi-ropc-nochange
---

The quickstart uses two prewritten .NET applications:

* A simulated device application that responds to direct methods called from a service application. To receive the direct method calls, this application connects to a device-specific endpoint on your IoT hub.

* A service application that calls the direct methods on the simulated device. To call a direct method on a device, this application connects to service-side endpoint on your IoT hub.

## Prerequisites

* An Azure account with an active subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

* The two sample applications you run in this quickstart are written using C#. You need the .NET SDK 6.0 or greater on your development machine.

    You can download the .NET Core SDK for multiple platforms from [.NET](https://dotnet.microsoft.com/download).

    You can verify the current version of C# on your development machine using the following command:

    ```cmd/sh
    dotnet --version
    ```

* Clone or download the [Microsoft Azure IoT SDK for .NET](https://github.com/Azure/azure-iot-sdk-csharp) from GitHub. The sample applications used by this quickstart are included in the SDK.

* Make sure that port 8883 is open in your firewall. The device sample in this quickstart uses MQTT protocol, which communicates over port 8883. This port might be blocked in some corporate and educational network environments. For more information and ways to work around this issue, see the [Connect to IoT Hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-mqtt-connect-to-iot-hub.md#connect-to-iot-hub) section of [Communicate with an IoT hub using the MQTT protocol](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-mqtt-connect-to-iot-hub.md).

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/quickstart-control-device-dotnet.md)

> **Note:**
> This article uses the newest version of the Azure IoT extension, called `azure-iot`. The legacy version is called `azure-cli-iot-ext`. You should have only one version installed at a time. You can use the command `az extension list` to validate the currently installed extensions.
>
> Use `az extension remove --name azure-cli-iot-ext` to remove the legacy version of the extension.
>
> Use `az extension add --name azure-iot` to add the new version of the extension. 
>
> To see what extensions are currently installed, use `az extension list`.
>



In this section, you use Azure CLI to create an IoT hub and a resource group.  An Azure resource group is a logical container into which Azure resources are deployed and managed. An IoT hub acts as a central message hub for bi-directional communication between your IoT application and the devices.

If you already have an IoT hub in your Azure subscription, you can skip this section.

To create an IoT hub and a resource group:

1. Launch your CLI app. To run the CLI commands in the rest of this article, copy the command syntax, paste it into your CLI app, edit variable values, and press `Enter`.

    - If you're using Cloud Shell, select the **Try It** button on the CLI commands to launch Cloud Shell in a split browser window. Or you can open the [Cloud Shell](https://shell.azure.com/bash) in a separate browser tab.
    - If you're using Azure CLI locally, start your CLI console app and sign in to Azure CLI.

1. Run [az extension add](https://learn.microsoft.com/cli/azure/extension#az-extension-add) to install or upgrade the *azure-iot* extension to the current version.

    ```azurecli-interactive
    az extension add --upgrade --name azure-iot
    ```

1. In your CLI app, run the [az group create](https://learn.microsoft.com/cli/azure/group#az-group-create) command to create a resource group. The following command creates a resource group named *MyResourceGroup* in the *eastus* location.

    >**Note:**
    > Optionally, you can set a different location. To see available locations, run `az account list-locations`. This quickstart uses *eastus* as shown in the example command.

    ```azurecli-interactive
    az group create --name MyResourceGroup --location eastus
    ```

1. Run the [az iot hub create](https://learn.microsoft.com/cli/azure/iot/hub#az-iot-hub-create) command to create an IoT hub. It might take a few minutes to create an IoT hub.

    *YourIoTHubName*. Replace this placeholder and the surrounding braces in the following command, using the name you chose for your IoT hub. An IoT hub name must be globally unique in Azure. Use your IoT hub name in the rest of this quickstart wherever you see the placeholder.

    ```azurecli-interactive
    az iot hub create --resource-group MyResourceGroup --name {YourIoTHubName}
    ```


## Retrieve the service connection string

You also need your IoT hub's _service connection string_ to enable the service application to connect to the hub and retrieve the messages. The service connection string is for your IoT hub as a whole, and is different from the device connection string you retrieved in the previous section.

The following command retrieves the service connection string for your IoT hub:

```azurecli-interactive
az iot hub connection-string show --policy-name service --hub-name {YourIoTHubName} --output table
```

Make a note of the service connection string, which looks like:

   `HostName={YourIoTHubName}.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey={YourSharedAccessKey}`

You use this value later in the quickstart.

## Simulate a device

The simulated device application connects to a device-specific endpoint on your IoT hub, sends simulated telemetry, and listens for direct method calls from your hub. In this quickstart, the direct method call from the hub tells the device to change the interval at which it sends telemetry. The simulated device sends an acknowledgment back to your hub after it executes the direct method.

1. In a local terminal window, navigate to the root folder of the SDK. Then, navigate to the **iothub\device\samples\getting started\SimulatedDeviceWithCommand** folder.

2. Run the following command to install the required packages for the simulated device application:

    ```cmd/sh
    dotnet restore
    ```

3. Run the following command to build and run the simulated device application.

    `{DeviceConnectionString}`: Replace this placeholder with the device connection string you noted previously.

    ```cmd/sh
    dotnet run -- -c "{DeviceConnectionString}"
    ```

    The following screenshot shows the output as the simulated device application sends telemetry to your IoT hub:

    Screenshot of a terminal window that shows the output of the simulated device application.

## Call the direct method

The service application connects to a service-side endpoint on your IoT Hub. The application makes direct method calls to a device through your IoT hub and listens for acknowledgments. An IoT Hub service application typically runs in the cloud.

1. In another local terminal window, navigate to the root folder of the SDK. Then, navigate to the **iothub\service\samples\getting started\InvokeDeviceMethod** folder.

2. In the local terminal window, run the following commands to install the required libraries for the service application:

    ```cmd/sh
    dotnet build
    ```

3. In the local terminal window, run the following commands to build and run the service application.

    `{ServiceConnectionString}`: Replace this placeholder with the IoT Hub service connection string you noted previously.

    `{DeviceName}`: Replace this placeholder with the name of the device you registered.

    ```cmd/sh
    dotnet run -- -c "{ServiceConnectionString}" -d {DeviceName}
    ```

    The following screenshot shows the output as the application makes a direct method call to the device and receives an acknowledgment:

    Screenshot of a terminal window that shows the result of the direct method call from the service application.
    
    After you run the service application, you see a message in the local terminal window running the simulated device, and the rate at which it sends messages changes:

    Screenshot of a terminal window that shows the direct message result and updated output from the simulated device application.
