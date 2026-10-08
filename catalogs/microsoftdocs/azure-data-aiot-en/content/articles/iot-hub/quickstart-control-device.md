---
title: Quickstart - Control a device from Azure IoT Hub | Microsoft Docs
description: In this quickstart, you run two sample applications. One application is a service application that can remotely control devices connected to your hub. The other application simulates a device connected to your hub that can be controlled remotely.
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
services: iot-hub
ms.topic: quickstart
ms.custom: [mvc, mqtt, "Role: Cloud Development", devx-track-azurecli, mode-other, devx-track-dotnet, devx-track-extended-java, devx-track-python, devx-track-js]
ms.date: 03/28/2025
zone_pivot_groups: iot-hub-set1
#Customer intent: As a developer new to IoT Hub, I need to see how to use a service application to control a device connected to the hub.
---

# Quickstart: Control a device connected to an IoT hub

In this quickstart, you use a direct method to control a simulated device connected to your IoT hub. IoT Hub is an Azure service that lets you manage your IoT devices from the cloud and ingest high volumes of device telemetry to the cloud for storage or processing. You can use direct methods to remotely change the behavior of devices connected to your IoT hub.

**Applies to: programming-language-csharp**



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

* Make sure that port 8883 is open in your firewall. The device sample in this quickstart uses MQTT protocol, which communicates over port 8883. This port might be blocked in some corporate and educational network environments. For more information and ways to work around this issue, see the [Connect to IoT Hub](iot-mqtt-connect-to-iot-hub.md#connect-to-iot-hub) section of [Communicate with an IoT hub using the MQTT protocol](iot-mqtt-connect-to-iot-hub.md).

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/quickstart-control-device.md)

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
    



**Applies to: programming-language-java**



This quickstart uses two Java applications: 

* A simulated device application that responds to direct methods called from a back-end application.
* A service application that calls the direct method on the simulated device.

## Prerequisites

* An Azure account with an active subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

* Java SE Development Kit 8. In [Java long-term support for Azure and Azure Stack](https://learn.microsoft.com/java/azure/jdk/), under **Long-term support**, select **Java 8**.

    You can verify the current version of Java on your development machine using the following command:

    ```cmd/sh
    java -version
    ```

* [Apache Maven 3](https://maven.apache.org/download.cgi).

    You can verify the current version of Maven on your development machine using the following command:

    ```cmd/sh
    mvn --version
    ```

* Clone or download the [Azure IoT Samples for Java](https://github.com/Azure-Samples/azure-iot-samples-java/) from GitHub.

* Make sure that port 8883 is open in your firewall. The device sample in this quickstart uses MQTT protocol, which communicates over port 8883. This port might be blocked in some corporate and educational network environments. For more information and ways to work around this issue, see the [Connect to IoT Hub](iot-mqtt-connect-to-iot-hub.md#connect-to-iot-hub) section of [Communicate with an IoT hub using the MQTT protocol](iot-mqtt-connect-to-iot-hub.md).

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/quickstart-control-device.md)

> **Note:**
> This article uses the newest version of the Azure IoT extension, called `azure-iot`. The legacy version is called `azure-cli-iot-ext`. You should have only one version installed at a time. You can use the command `az extension list` to validate the currently installed extensions.
>
> Use `az extension remove --name azure-cli-iot-ext` to remove the legacy version of the extension.
>
> Use `az extension add --name azure-iot` to add the new version of the extension. 
>
> To see what extensions are currently installed, use `az extension list`.
>


## Create an IoT hub


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


## Register a device


A device must be registered with your IoT hub before it can connect. In this section, you use Azure CLI to create a device identity.

If you already have a device registered in your IoT hub, you can skip this section.

To create a device identity:

1. Run the [az iot hub device-identity create](https://learn.microsoft.com/cli/azure/iot/hub/device-identity#az-iot-hub-device-identity-create) command in your CLI shell. This command creates the device identity.

    *YourIoTHubName*. Replace this placeholder and the surrounding braces in the following command, using the name you chose for your IoT hub. An IoT hub name must be globally unique in Azure. 

    *myDevice*. You can use this name for the device ID throughout this article, or provide a different device name.

    ```azurecli-interactive
    az iot hub device-identity create --device-id myDevice --hub-name {YourIoTHubName}
    ```

1. Run the [az iot hub device-identity connection-string show](https://learn.microsoft.com/cli/azure/iot/hub/device-identity/connection-string#az-iot-hub-device-identity-connection-string-show) command.

    ```azurecli-interactive
    az iot hub device-identity connection-string show --device-id myDevice --hub-name {YourIoTHubName}
    ```

    The connection string output is in the following format:

    ```Output
    HostName=<your IoT Hub name>.azure-devices.net;DeviceId=<your device id>;SharedAccessKey=<some value>
    ```

1. Save the connection string in a secure location.

> **Note:**
> Keep your CLI app open. You use it in later steps.


## Retrieve the service connection string

You also need a _service connection string_ to enable the back-end application to connect to your IoT hub and retrieve the messages. The following command retrieves the service connection string for your IoT hub:

**YourIoTHubName**: Replace this placeholder in the following command with the name you chose for your IoT hub.

```azurecli-interactive
az iot hub connection-string show --policy-name service --hub-name {YourIoTHubName} --output table
```

Make a note of the service connection string, which looks like:

`HostName={YourIoTHubName}.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey={YourSharedAccessKey}`

You use this value later in the quickstart. This service connection string is different from the device connection string you noted in the previous step.

## Simulate a device

The simulated device application connects to a device-specific endpoint on your IoT hub, sends simulated telemetry, and listens for direct method calls from your hub. In this quickstart, the direct method call from the hub tells the device to change the interval at which it sends telemetry. The simulated device sends an acknowledgment back to your hub after it executes the direct method.

1. In a local terminal window, navigate to the root folder of the sample Java project. Then navigate to the **iot-hub\Quickstarts\simulated-device-2** folder.

2. Open the **src/main/java/com/microsoft/docs/iothub/samples/SimulatedDevice.java** file in a text editor of your choice.

    Replace the value of the `connString` variable with the device connection string you made a note of earlier. Then save your changes to **SimulatedDevice.java**.

3. In the local terminal window, run the following commands to install the required libraries and build the simulated device application:

    ```cmd/sh
    mvn clean package
    ```

4. In the local terminal window, run the following commands to run the simulated device application:

    ```cmd/sh
    java -jar target/simulated-device-2-1.0.0-with-deps.jar
    ```

    The following screenshot shows the output as the simulated device application sends telemetry to your IoT hub:

    Screenshot of a terminal window that shows the output of the simulated device application.

## Call the direct method

The back-end application connects to a service-side endpoint on your IoT Hub. The application makes direct method calls to a device through your IoT hub and listens for acknowledgments. An IoT Hub back-end application typically runs in the cloud.

1. In another local terminal window, navigate to the root folder of the sample Java project. Then navigate to the **iot-hub\Quickstarts\back-end-application** folder.

2. Open the **src/main/java/com/microsoft/docs/iothub/samples/BackEndApplication.java** file in a text editor of your choice.

    Replace the value of the `iotHubConnectionString` variable with the service connection string you made a note of earlier. Then save your changes to **BackEndApplication.java**.

3. In the local terminal window, run the following commands to install the required libraries and build the back-end application:

    ```cmd/sh
    mvn clean package
    ```

4. In the local terminal window, run the following commands to run the back-end application:

    ```cmd/sh
    java -jar target/back-end-application-1.0.0-with-deps.jar
    ```

    The following screenshot shows the output as the application makes a direct method call to the device and receives an acknowledgment:

    Screenshot of a terminal window that shows the result of the direct method call from the service application.
    
    After you run the back-end application, you see a message in the local terminal window running the simulated device, and the rate at which it sends messages changes:

    Screenshot of a terminal window that shows the direct message result and updated output from the simulated device application.
    



**Applies to: programming-language-nodejs**



This quickstart uses two Node.js applications: 

* A simulated device application that responds to direct methods called from a back-end application. To receive the direct method calls, this application connects to a device-specific endpoint on your IoT hub.
* A back-end application that calls the direct methods on the simulated device. To call a direct method on a device, this application connects to a service-specific endpoint on your IoT hub.

## Prerequisites

* An Azure account with an active subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

* [Node.js 12+](https://nodejs.org).

    You can verify the current version of Node.js on your development machine using the following command:

    ```cmd/sh
    node --version
    ```

* Clone or download the [Azure IoT Node.js samples](https://github.com/Azure-Samples/azure-iot-samples-node/) from GitHub.

* Make sure that port 8883 is open in your firewall. The device sample in this quickstart uses MQTT protocol, which communicates over port 8883. This port might be blocked in some corporate and educational network environments. For more information and ways to work around this issue, see the [Connect to IoT Hub](iot-mqtt-connect-to-iot-hub.md#connect-to-iot-hub) section of [Communicate with an IoT hub using the MQTT protocol](iot-mqtt-connect-to-iot-hub.md).

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/quickstart-control-device.md)

> **Note:**
> This article uses the newest version of the Azure IoT extension, called `azure-iot`. The legacy version is called `azure-cli-iot-ext`. You should have only one version installed at a time. You can use the command `az extension list` to validate the currently installed extensions.
>
> Use `az extension remove --name azure-cli-iot-ext` to remove the legacy version of the extension.
>
> Use `az extension add --name azure-iot` to add the new version of the extension. 
>
> To see what extensions are currently installed, use `az extension list`.
>


## Create an IoT hub


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


## Register a device


A device must be registered with your IoT hub before it can connect. In this section, you use Azure CLI to create a device identity.

If you already have a device registered in your IoT hub, you can skip this section.

To create a device identity:

1. Run the [az iot hub device-identity create](https://learn.microsoft.com/cli/azure/iot/hub/device-identity#az-iot-hub-device-identity-create) command in your CLI shell. This command creates the device identity.

    *YourIoTHubName*. Replace this placeholder and the surrounding braces in the following command, using the name you chose for your IoT hub. An IoT hub name must be globally unique in Azure. 

    *myDevice*. You can use this name for the device ID throughout this article, or provide a different device name.

    ```azurecli-interactive
    az iot hub device-identity create --device-id myDevice --hub-name {YourIoTHubName}
    ```

1. Run the [az iot hub device-identity connection-string show](https://learn.microsoft.com/cli/azure/iot/hub/device-identity/connection-string#az-iot-hub-device-identity-connection-string-show) command.

    ```azurecli-interactive
    az iot hub device-identity connection-string show --device-id myDevice --hub-name {YourIoTHubName}
    ```

    The connection string output is in the following format:

    ```Output
    HostName=<your IoT Hub name>.azure-devices.net;DeviceId=<your device id>;SharedAccessKey=<some value>
    ```

1. Save the connection string in a secure location.

> **Note:**
> Keep your CLI app open. You use it in later steps.


## Retrieve the service connection string

You also need your IoT hub's _service connection string_ to enable the back-end application to connect to your IoT hub and retrieve the messages. The following command retrieves the service connection string for your IoT hub:

**YourIoTHubName**: Replace this placeholder in the following command with the name you chose for your IoT hub.

```azurecli-interactive
az iot hub connection-string show \
  --policy-name service --hub-name {YourIoTHubName} --output table
```

Make a note of the service connection string, which looks like:

`HostName={YourIoTHubName}.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey={YourSharedAccessKey}`

You use this value later in the quickstart. This service connection string is different from the device connection string you noted in the previous step.

## Simulate a device

The simulated device application connects to a device-specific endpoint on your IoT hub, sends simulated telemetry, and listens for direct method calls from your hub. In this quickstart, the direct method call from the hub tells the device to change the interval at which it sends telemetry. The simulated device sends an acknowledgment back to your hub after it executes the direct method.

1. In a local terminal window, navigate to the root folder of the sample Node.js project. Then navigate to the **iot-hub\Quickstarts\simulated-device-2** folder.

2. Open the **SimulatedDevice.js** file in a text editor of your choice.

    Replace the value of the `connectionString` variable with the device connection string you made a note of earlier. Then save your changes to **SimulatedDevice.js**.

3. In the local terminal window, run the following commands to install the required libraries and run the simulated device application:

    ```cmd/sh
    npm install
    node SimulatedDevice.js
    ```

    The following screenshot shows the output as the simulated device application sends telemetry to your IoT hub:

    Screenshot of a terminal window that shows the output of the simulated device application.
    
## Call the direct method

The back-end application connects to a service-side endpoint on your IoT hub. The application makes direct method calls to a device through your IoT hub and listens for acknowledgments. An IoT Hub back-end application typically runs in the cloud.

1. In another local terminal window, navigate to the root folder of the sample Node.js project. Then navigate to the **iot-hub\Quickstarts\back-end-application** folder.

2. Open the **BackEndApplication.js** file in a text editor of your choice.

    Replace the value of the `connectionString` variable with the service connection string you made a note of earlier. Then save your changes to **BackEndApplication.js**.

3. In the local terminal window, run the following commands to install the required libraries and run the back-end application:

    ```cmd/sh
    npm install
    node BackEndApplication.js
    ```

    The following screenshot shows the output as the application makes a direct method call to the device and receives an acknowledgment:

    Screenshot of a terminal window that shows the result of the direct method call from the service application.

    After you run the back-end application, you see a message in the local terminal window running the simulated device, and the rate at which it sends messages changes:

    Screenshot of a terminal window that shows the direct message result and updated output from the simulated device application.




**Applies to: programming-language-python**



This quickstart uses two Python applications: 

* A simulated device application that responds to direct methods called from a back-end application.
* A back-end application that calls the direct methods on the simulated device.

## Prerequisites

* An Azure account with an active subscription. [Create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).

* [Python 3.7+](https://www.python.org/downloads/). For other versions of Python supported, see [Azure IoT Device Features](https://github.com/Azure/azure-iot-sdk-python/tree/main/azure-iot-device#azure-iot-device-features).

* Clone or download the [Azure IoT Python samples](https://github.com/Azure-Samples/azure-iot-samples-python/) from GitHub.

* Make sure that port 8883 is open in your firewall. The device sample in this quickstart uses MQTT protocol, which communicates over port 8883. This port might be blocked in some corporate and educational network environments. For more information and ways to work around this issue, see the [Connect to IoT Hub](iot-mqtt-connect-to-iot-hub.md#connect-to-iot-hub) section of [Communicate with an IoT hub using the MQTT protocol](iot-mqtt-connect-to-iot-hub.md).

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/quickstart-control-device.md)

> **Note:**
> This article uses the newest version of the Azure IoT extension, called `azure-iot`. The legacy version is called `azure-cli-iot-ext`. You should have only one version installed at a time. You can use the command `az extension list` to validate the currently installed extensions.
>
> Use `az extension remove --name azure-cli-iot-ext` to remove the legacy version of the extension.
>
> Use `az extension add --name azure-iot` to add the new version of the extension. 
>
> To see what extensions are currently installed, use `az extension list`.
>


## Create an IoT hub


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


## Register a device


A device must be registered with your IoT hub before it can connect. In this section, you use Azure CLI to create a device identity.

If you already have a device registered in your IoT hub, you can skip this section.

To create a device identity:

1. Run the [az iot hub device-identity create](https://learn.microsoft.com/cli/azure/iot/hub/device-identity#az-iot-hub-device-identity-create) command in your CLI shell. This command creates the device identity.

    *YourIoTHubName*. Replace this placeholder and the surrounding braces in the following command, using the name you chose for your IoT hub. An IoT hub name must be globally unique in Azure. 

    *myDevice*. You can use this name for the device ID throughout this article, or provide a different device name.

    ```azurecli-interactive
    az iot hub device-identity create --device-id myDevice --hub-name {YourIoTHubName}
    ```

1. Run the [az iot hub device-identity connection-string show](https://learn.microsoft.com/cli/azure/iot/hub/device-identity/connection-string#az-iot-hub-device-identity-connection-string-show) command.

    ```azurecli-interactive
    az iot hub device-identity connection-string show --device-id myDevice --hub-name {YourIoTHubName}
    ```

    The connection string output is in the following format:

    ```Output
    HostName=<your IoT Hub name>.azure-devices.net;DeviceId=<your device id>;SharedAccessKey=<some value>
    ```

1. Save the connection string in a secure location.

> **Note:**
> Keep your CLI app open. You use it in later steps.


## Retrieve the service connection string

You also need a _service connection string_ to enable the back-end application to connect to your IoT hub and retrieve the messages. The following command retrieves the service connection string for your IoT hub:

**YourIoTHubName**: Replace this placeholder in the following command with the name you choose for your IoT hub.

```azurecli-interactive
az iot hub connection-string show \
  --policy-name service \
  --hub-name {YourIoTHubName} \
  --output table
```

Make a note of the service connection string, which looks like:

`HostName={YourIoTHubName}.azure-devices.net;SharedAccessKeyName=service;SharedAccessKey={YourSharedAccessKey}`

You use this value later in the quickstart. This service connection string is different from the device connection string you noted in the previous step.

## Simulate a device

The simulated device application connects to a device-specific endpoint on your IoT hub, sends simulated telemetry, and listens for direct method calls from your hub. In this quickstart, the direct method call from the hub tells the device to change the interval at which it sends telemetry. The simulated device sends an acknowledgment back to your hub after it executes the direct method.

1. In a local terminal window, navigate to the root folder of the sample Python project. Then navigate to the **iot-hub\Quickstarts\simulated-device-2** folder.

1. Open the **SimulatedDeviceSync.py** file in a text editor of your choice.

    Replace the value of the `CONNECTION_STRING` variable with the device connection string you made a note of earlier. Then save your changes to **SimulatedDeviceSync.py**.

1. In the local terminal window, run the following commands to install the required libraries for the simulated device application:

    ```cmd/sh
    pip install azure-iot-device
    ```

1. In the local terminal window, run the following commands to run the simulated device application: 

    ```cmd/sh
    python SimulatedDeviceSync.py
    ```

    The following screenshot shows the output as the simulated device application sends telemetry to your IoT hub:

    Screenshot of a terminal window that shows the output of the simulated device application.

## Call the direct method

The back-end application connects to a service-side endpoint on your IoT Hub. The application makes direct method calls to a device through your IoT hub and listens for acknowledgments. An IoT Hub back-end application typically runs in the cloud.

1. In another local terminal window, navigate to the root folder of the sample Python project. Then navigate to the **iot-hub\Quickstarts\back-end-application** folder.

1. Open the **BackEndApplication.py** file in a text editor of your choice.

    Replace the value of the `CONNECTION_STRING` variable with the service connection string you made a note of earlier. Then save your changes to **BackEndApplication.py**.

1. In the local terminal window, run the following commands to install the required libraries for the simulated device application:

    ```cmd/sh
    pip install azure-iot-hub
    ```

1. In the local terminal window, run the following commands to run the back-end application:

    ```cmd/sh
    python BackEndApplication.py
    ```

    The following screenshot shows the output as the application makes a direct method call to the device and receives an acknowledgment:

    Screenshot of a terminal window that shows the result of the direct method call from the service application.

    After you run the back-end application, you see a message in the console window running the simulated device, and the rate at which it sends messages changes:

    Screenshot of a terminal window that shows the direct message result and updated output from the simulated device application.




## Clean up resources



If you're continuing to the next recommended article, you can keep the resources you already created and reuse them.

Otherwise, you can delete the Azure resources created in this article to avoid charges. 

> **Important:**
> Deleting a resource group is irreversible. The resource group and all the resources contained in it are permanently deleted. Make sure that you don't accidentally delete the wrong resource group or resources. If you created the IoT hub inside an existing resource group that contains resources you want to keep, only delete the IoT Hub resource itself instead of deleting the resource group.
>

To delete a resource group by name:

1. Sign in to the [Azure portal](https://portal.azure.com) and select **Resource groups**.

2. In the **Filter for any field** textbox, type the name of the resource group containing your IoT hub.

3. In the result list, select the resource group containing your IoT hub. 

4. In the working pane for the resource group, select **Delete resource group** from the command bar.

    Screenshot that shows the working pane of a resource group in Azure portal, with the Delete resource group command highlighted in the command bar.
    
5. You're asked to confirm the deletion of the resource group. Type the name of your resource group again to confirm, and then select **Delete**. After a few moments, the resource group and all of its contained resources are deleted.

## Next steps

In this quickstart, you called a direct method on a device from a service application, and responded to the direct method call in a simulated device application.

To learn how to route device-to-cloud messages to different destinations in the cloud, continue to the next tutorial.

> 
> [Tutorial: Send device data to Azure Storage using IoT Hub message routing](tutorial-routing.md)
