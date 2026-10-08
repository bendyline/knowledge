---
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
services: iot-hub
ms.devlang: java
ms.topic: include
ms.date: 03/28/2025
ms.custom:
  - mvc
  - mqtt
  - devx-track-java
  - devx-track-azurecli
  - sfi-ropc-nochange
---

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

* Make sure that port 8883 is open in your firewall. The device sample in this quickstart uses MQTT protocol, which communicates over port 8883. This port might be blocked in some corporate and educational network environments. For more information and ways to work around this issue, see the [Connect to IoT Hub](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-mqtt-connect-to-iot-hub.md#connect-to-iot-hub) section of [Communicate with an IoT hub using the MQTT protocol](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-mqtt-connect-to-iot-hub.md).

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/quickstart-control-device-java.md)

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
