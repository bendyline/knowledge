---
 title: include file
 description: include file
 author: dominicbetts
 ms.service: azure-iot
 ms.topic: include
 ms.date: 1/10/2025
 ms.author: dobett
 ms.devlang: azurecli
 ms.custom:
   - include file
   - devx-track-azurecli
   - sfi-ropc-nochange
---

[Browse code](https://github.com/Azure/azure-iot-sdk-node/tree/main/device/samples)

In this quickstart, you learn a basic Azure IoT application development workflow. You use the Azure CLI and IoT Explorer to create an Azure IoT hub and a device. Then you use an Azure IoT device SDK sample to run a temperature controller, connect it securely to the hub, and send telemetry. The temperature controller sample application runs on your local machine and generates simulated sensor data to send to IoT Hub.

## Prerequisites
This quickstart runs on Windows, Linux, and Raspberry Pi. It's been tested on the following OS and device versions:

- Windows 10
- Ubuntu 20.04 LTS
- Raspberry Pi OS (Raspbian) version 10, running on a Raspberry Pi 3 Model B+

Install the following prerequisites on your development machine except where noted for Raspberry Pi:

- If you don't have an Azure subscription, [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
- [Git](https://git-scm.com/downloads).
- [Node.js](https://nodejs.org) version 12 or later. To check your node version run `node --version`.
- [Azure IoT Explorer](https://github.com/Azure/azure-iot-explorer/releases): Cross-platform, GUI-based utility to monitor and manage Azure IoT. If you're using Raspberry Pi as your development platform, we recommend that you install IoT Explorer on another computer. If you don't want to install IoT Explorer, you can use Azure CLI to perform the same steps.
- Azure CLI. You have two options for running Azure CLI commands in this quickstart:
    - Use the Azure Cloud Shell, an interactive shell that runs CLI commands in your browser. This option is recommended because you don't need to install anything. If you're using Cloud Shell for the first time, sign in to the [Azure portal](https://portal.azure.com). Follow the steps in [Get started with Azure Cloud Shell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-shell/get-started.md) to **Start Cloud Shell** and **Select the Bash environment**.
    - Optionally, run Azure CLI on your local machine. If Azure CLI is already installed, run `az upgrade` to upgrade the CLI and extensions to the current version. To install Azure CLI, see [Install Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli). If you're using Raspberry Pi as your development platform, we recommend that you use Azure Cloud Shell or install Azure CLI on another computer.


## Create an IoT hub
In this section, you use Azure CLI to create an IoT hub and a resource group. An Azure resource group is a logical container into which Azure resources are deployed and managed. An IoT hub acts as a central message hub for bi-directional communication between your IoT application and devices.

To create an IoT hub and a resource group:

1. Launch Azure CLI: 
    - If you're using Cloud Shell, select the **Try It** button on the CLI commands to launch Cloud Shell in a split browser window. Or you can open the [Cloud Shell](https://shell.azure.com/bash) in a separate browser tab.
    - If you're using Azure CLI locally, open a console such as Windows CMD, PowerShell, or Bash and [sign in to Azure CLI](https://learn.microsoft.com/cli/azure/authenticate-azure-cli).
    
    To run the CLI commands in the rest of this quickstart: copy the command syntax, paste it into your Cloud Shell window or CLI console, edit variable values, and press Enter.

1. Run [az extension add](https://learn.microsoft.com/cli/azure/extension#az-extension-add) to install or upgrade the *azure-iot* extension to the current version.

    ```azurecli-interactive
    az extension add --upgrade --name azure-iot
    ```

1. Run the [az group create](https://learn.microsoft.com/cli/azure/group#az-group-create) command to create a resource group. The following command creates a resource group named *MyResourceGroup* in the *eastus* location. 
    >**Note:**
    > You can optionally set an alternate location. To see available locations, run `az account list-locations`. This tutorial uses *eastus* as shown in the example command. 

    ```azurecli-interactive
    az group create --name MyResourceGroup --location eastus
    ```

1. Run the [az iot hub create](https://learn.microsoft.com/cli/azure/iot/hub#az-iot-hub-create) command to create an IoT hub. It might take a few minutes to create an IoT hub. 

    *YourIotHubName*. Replace this placeholder and the surrounding braces in the following command, using the name you chose for your IoT hub. An IoT hub name must be globally unique in Azure. Use your IoT hub name in the rest of this quickstart wherever you see the placeholder.

    ```azurecli
    az iot hub create --resource-group MyResourceGroup --name {YourIoTHubName}
    ```
    > **Tip:**
    > After creating an IoT hub, you'll use Azure IoT Explorer to interact with your IoT hub in the rest of this quickstart. IoT Explorer is a GUI application that lets you connect to an existing IoT Hub and add, manage, and monitor devices. To learn more, see [Install and use Azure IoT explorer](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot/howto-use-iot-explorer.md). Optionally, you can continue to use CLI commands.

### Configure IoT Explorer

In the rest of this quickstart, you use IoT Explorer to register a device to your IoT hub and to view the device telemetry. In this section, you configure IoT Explorer to connect to the IoT hub you created and to read plug and play models from the public model repository. 

> **Note:**
> You can also use the Azure CLI to register a device. Use the `az iot hub device-identity create --device-id mydevice --hub-name {YourIoTHubName}` command to register a new device and the `az iot hub device-identity connection-string show --device-id mydevice --hub-name {YourIoTHubName}` command to get the primary connection string for the device. Once you note down the device connection string, you can skip ahead to [Run the device sample](#run-the-device-sample).

To add a connection to your IoT hub:

1. Run the [az iot hub connection-string show](https://learn.microsoft.com/cli/azure/iot/hub/connection-string#az-iot-hub-connection-string-show) command to get the connection string for your IoT hub.

    ```azurecli
    az iot hub connection-string  show --hub-name {YourIoTHubName}
    ```

1. Copy the connection string without the surrounding quotation characters.
1. In Azure IoT Explorer, select **IoT hubs** on the left menu, then select **+ Add connection**.
1. Paste the connection string into the **Connection string** box.
1. Select **Save**.

    Screenshot of adding a connection in IoT Explorer

1. If the connection succeeds, IoT Explorer switches to the **Devices** view.

View the public model repository settings:

1. In IoT Explorer, select **Home** to return to the home view.
1. On the left menu, select **IoT Plug and Play Settings**.
1. You can see an entry exists for the public model repository at `https://devicemodels.azure.com`.

    Screenshot of adding the public model repository in IoT Explorer

### Register a device

In this section, you create a new device instance and register it with the IoT hub you created. You use the connection information for the newly registered device to securely connect your device in a later section.

To register a device:

1. From the home view in IoT Explorer, select **IoT hubs**.
1. The connection you previously added should appear. Select **View devices in this hub** below the connection properties.
1. Select **+ New** and enter a device ID for your device; for example, **mydevice**. Leave all other properties unchanged.
1. Select **Create**.

    Screenshot of Azure IoT Explorer device identity

1. Copy and note down the value in the **Primary connection string** field. You need this connection string later.


## Run the device sample
In this section, you'll use the Node.js SDK to send messages from a device to your IoT hub. You'll run a sample that implements a temperature controller with two thermostat sensors.

1. Open a new console such as Windows CMD, PowerShell, or Bash. In the following steps, you'll use this console to install the Node.js SDK and work with Node.js sample code.

    > **Note:**
    > If you're using a local installation of Azure CLI, you might now have two console windows open. Be sure to enter the commands in this section in the console you just opened, not the one that you've been using for the CLI.

1. Clone the [Azure IoT Node.js SDK device samples](https://github.com/Azure/azure-iot-sdk-node/tree/main/device/samples) to your local machine:

    ```console
    git clone https://github.com/Azure/azure-iot-sdk-node
    ```

1. Navigate to the sample directory:

    **Windows**
    ```console
    cd azure-iot-sdk-node\device\samples\javascript
    ```

    **Linux or Raspberry Pi OS**
    ```console
    cd azure-iot-sdk-node/device/samples/javascript
    ```

1. Install the Azure IoT Node.js SDK and necessary dependencies:

    ```console
    npm install
    ```

    This command installs the proper dependencies as specified in the *package.json* file in the device samples directory.

1. Set both of the following environment variables, to enable your device to connect to Azure IoT.
    * Set an environment variable called `IOTHUB_DEVICE_CONNECTION_STRING`. For the variable value, use the device connection string that you saved in the previous section.
    * Set an environment variable called `IOTHUB_DEVICE_SECURITY_TYPE`. For the variable, use the literal string value `connectionString`.

    **CMD (Windows)**

    ```console
    set IOTHUB_DEVICE_CONNECTION_STRING=<your connection string here>
    set IOTHUB_DEVICE_SECURITY_TYPE=connectionString
    ```

    > **Note:**
    > For Windows CMD there are no quotation marks surrounding the string values for each variable.

    **PowerShell**

    ```azurepowershell
    $env:IOTHUB_DEVICE_CONNECTION_STRING='<your connection string here>'
    $env:IOTHUB_DEVICE_SECURITY_TYPE='connectionString'
    ```

    **Bash**

    ```bash
    export IOTHUB_DEVICE_CONNECTION_STRING="<your connection string here>"
    export IOTHUB_DEVICE_SECURITY_TYPE="connectionString"
    ```
1. Run the following code sample:

    ```console
    node pnp_temperature_controller.js
    ```
    > **Note:**
    > This code sample uses Azure IoT Plug and Play, which lets you integrate smart devices into your solutions without any manual configuration.  By default, most samples in this documentation use IoT Plug and Play. To learn more about the advantages of IoT PnP, and cases for using or not using it, see [What is IoT Plug and Play?](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot/overview-iot-plug-and-play.md)

The sample securely connects to your IoT hub as the device you registered and begins sending telemetry messages. The sample output appears in your console.

## View telemetry

You can view the device telemetry with IoT Explorer. Optionally, you can view telemetry using Azure CLI.

To view telemetry in Azure IoT Explorer:

1. From your Iot hub in IoT Explorer, select **View devices in this hub**, then select your device from the list.
1. On the left menu for your device, select **Telemetry**.
1. Confirm that **Use built-in event hub** is set to *Yes* and then select **Start**.
1. View the telemetry as the device sends messages to the cloud.

    Screenshot of device telemetry in IoT Explorer

1. Select **Stop** to end receiving events.

To read telemetry sent by individual device components, you can use the plug and play features in IoT Explorer. For example, the temperature controller in this quickstart has two thermostats: thermostat1 and thermostat2. To see the temperature reported by thermostat1:

1. On your device in IoT Explorer, select **IoT Plug and Play components** from the left menu. Then select **thermostat1** from the list of components.

1. On the **thermostat1** component pane, select **Telemetry** from the top menu.

1. On the **Telemetry** pane, follow the same steps that you did previously. Make sure that **Use built-in event hub** is set to *Yes* and then select **Start**.

To view device telemetry with Azure CLI:

1. Run the [az iot hub monitor-events](https://learn.microsoft.com/cli/azure/iot/hub#az-iot-hub-monitor-events) command to monitor events sent from the device to your IoT hub. Use the names that you created previously in Azure IoT for your device and IoT hub.

    ```azurecli
    az iot hub monitor-events --output table --device-id mydevice --hub-name {YourIoTHubName}
    ```

1. View the connection details and telemetry output in the console.

    ```output
    Starting event monitor, filtering on device: mydevice, use ctrl-c to stop...
    event:
      component: thermostat1
      interface: dtmi:com:example:TemperatureController;2
      module: ''
      origin: mydevice
      payload:
        temperature: 70.5897683228018

    event:
      component: thermostat2
      interface: dtmi:com:example:TemperatureController;2
      module: ''
      origin: mydevice
      payload:
        temperature: 52.87582619316418
    ```
