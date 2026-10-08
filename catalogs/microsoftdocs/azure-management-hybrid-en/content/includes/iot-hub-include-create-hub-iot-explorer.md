---
title: Include file
description: Include file
author: dominicbetts
ms.author: dobett
ms.service: azure-iot
ms.topic: include
ms.date: 1/10/2025
ms.custom: sfi-image-nochange
---

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
