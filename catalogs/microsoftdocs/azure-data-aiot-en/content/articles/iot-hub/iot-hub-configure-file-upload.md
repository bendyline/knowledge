---
title: Configure file upload in IoT Hub
description: How to use the Azure portal to configure your IoT hub to enable file uploads from connected devices. Includes information about configuring the destination Azure storage account.
author: sethmanheim
ms.author: sethm
ms.service: azure-iot-hub
ms.topic: how-to
ms.date: 12/01/2025
zone_pivot_groups: service-portal-azcli-powershell
---

# Configure IoT Hub file uploads using the Azure portal

Configuring file uploads in your IoT hub enables your connected devices to upload files to an Azure storage account. This article shows you how to configure file uploads on your IoT hub using the Azure portal, Azure CLI, and Azure PowerShell.

To use the [file upload functionality in IoT Hub](iot-hub-devguide-file-upload.md), you must first associate an Azure storage account and blob container with your IoT hub. IoT Hub automatically generates SAS URIs with write permissions to this blob container for devices to use when they upload files. In addition to the storage account and blob container, you can set the time-to-live for the SAS URI and the type of authentication that IoT Hub uses with Azure storage. You can also configure settings for the optional file upload notifications that IoT Hub can deliver to backend services.

**Applies to: azure-portal**



## Prerequisites

* An active Azure account. If you don't have an account, you can create a [free account](https://azure.microsoft.com/pricing/free-trial/) in just a couple of minutes.

* An IoT hub in your Azure subscription. If you don't have a hub yet, you can follow the steps in the **Create an IoT hub** section of [Create and manage Azure IoT hubs](create-hub.md).

## Configure your IoT hub in the Azure portal

1. In the [Azure portal](https://portal.azure.com), navigate to your IoT hub and select **File upload** to display the file upload properties. Then select **Azure Storage Container** under **Storage container settings**.

    Screenshot that shows how to configure file upload settings in the portal.

1. Select an Azure Storage account and blob container in your current subscription to associate with your IoT hub. If necessary, you can create an Azure Storage account on the **Storage accounts** pane and create a blob container on the **Containers** pane.

   Screenshot showing how to view storage containers for file upload.

1. After you've selected an Azure Storage account and blob container, configure the rest of the file upload properties.

    * **Receive notifications for uploaded files**: Enable or disable file upload notifications via the toggle.

    * **SAS TTL**: This setting is the time-to-live of the SAS URIs returned to the device by IoT Hub. Set to one hour by default but can be customized to other values using the slider.

    * **Default TTL**: The time-to-live of a file upload notification before it's expired. Set to one day by default but can be customized to other values using the slider.

    * **Maximum delivery count**: The number of times the IoT hub attempts to deliver a file upload notification. Set to 10 by default but can be customized to other values using the slider.

    * **Authentication type**: By default, Azure IoT Hub uses key-based authentication to connect and authorize with Azure Storage. You can also configure user-assigned or system-assigned managed identities to authenticate Azure IoT Hub with Azure Storage. Managed identities provide Azure services with an automatically managed identity in Microsoft Entra ID in a secure manner. To learn how to configure managed identities, see [IoT Hub support for managed identities](iot-hub-managed-identity.md). After you've configured one or more managed identities on your Azure Storage account and IoT hub, you can select one for authentication with Azure storage with the **System-assigned** or **User-assigned** buttons.

        > **Note:**
        > The authentication type setting configures how your IoT hub authenticates with your Azure Storage account. Devices always authenticate with Azure Storage using the SAS URI that they get from the IoT hub. 

1. Select **Save** to save your settings. Be sure to check the confirmation for successful completion. Some selections, like **Authentication type**, are validated only after you save your settings. 



**Applies to: azure-cli**



## Prerequisites

* An active Azure account. If you don't have an account, you can create a [free account](https://azure.microsoft.com/pricing/free-trial/) in just a couple of minutes.

* An IoT hub in your Azure subscription. If you don't have a hub yet, you can follow the steps in the **Create an IoT hub** section of [Create and manage Azure IoT hubs](create-hub.md).

* An Azure Storage account with a blob container. If you don't have an Azure Storage account, you can use the Azure CLI to create one. For more information, see [Create an Azure storage account](../storage/common/storage-account-create.md).

[Include unavailable in this source snapshot: ~/reusable-content/azure-cli/azure-cli-prepare-your-environment-no-header.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/iot-hub/iot-hub-configure-file-upload.md)

## Sign in and set your Azure account

Sign in to your Azure account and select your subscription. If you're using Azure Cloud Shell, you should be signed in already; however, you still might need to select your Azure subscription if you have multiple subscriptions.

1. At the command prompt, run the [az login](https://learn.microsoft.com/cli/azure/get-started-with-azure-cli) command:

    ```azurecli
    az login
    ```

    Follow the instructions to authenticate using the code and sign in to your Azure account through a web browser.

2. If you have multiple Azure subscriptions, signing in to Azure grants you access to all the Azure accounts associated with your credentials. Use the following [az account list](https://learn.microsoft.com/cli/azure/account) command to list the Azure accounts available for you to use:

    ```azurecli
    az account list
    ```

    Use the following command to select the subscription that you want to use to run the commands to create your IoT hub. You can use either the subscription name or ID from the output of the previous command:

    ```azurecli
    az account set --subscription {your subscription name or id}
    ```

## Configure storage account access

The following steps assume that you created your storage account using the **Resource Manager** deployment model, and not the **Classic** deployment model.

To configure file uploads from your devices, you need to give your IoT hub access permissions to the Azure Storage account. The storage account must be in the same subscription as your IoT hub. You also need the name of a blob container in the storage account.

You can use either key-based or identity-based authentication to provide access permissions. Microsoft recommends identity-based authentication as a more secure option.

### Key-based authentication

For key-based authentication, provide the connection string for your storage account. Use the [az storage account show-connection-string](https://learn.microsoft.com/cli/azure/storage/account#az-storage-account-show-connection-string) command to retrieve your storage account keys.

Make a note of the `connectionString` value. The connection string looks similar to the following output:

```json
{
  "connectionString": "DefaultEndpointsProtocol=https;EndpointSuffix=core.windows.net;AccountName={your_storage_account_name};AccountKey={your_storage_account_key}"
}
```

### Identity-based authentication

You can use system-assigned managed identities or user-assigned managed identities for identity-based authentication. For more information, see [IoT Hub support for managed identities](iot-hub-managed-identity.md).

Use the [az role assignment create](https://learn.microsoft.com/cli/azure/role/assignment#az-role-assignment-create) command to assign a role to your managed identity. For more information, see [Assign an Azure role for access to blob data](../storage/blobs/assign-azure-role-data-access.md).

## Configure your IoT hub

You can now configure your IoT hub to enable the ability to [upload files to the IoT hub](iot-hub-devguide-file-upload.md) using your storage account details.

The configuration requires the following values:

* **Storage container**: A blob container in an Azure storage account in your current Azure subscription to associate with your IoT hub. You retrieved the necessary storage account information in the preceding section. IoT Hub automatically generates SAS URIs with write permissions to this blob container for devices to use when they upload files.

* **Receive notifications for uploaded files**: Enable or disable file upload notifications.

* **SAS TTL**: This setting is the time-to-live of the SAS URIs returned to the device by IoT Hub. Set to one hour by default.

* **File notification settings default TTL**: The time-to-live of a file upload notification before it expires. Set to one day by default.

* **File notification maximum delivery count**: The number of times the IoT hub attempts to deliver a file upload notification. Set to 10 by default.

* **File notification lock duration**: The lock duration for the file notification queue. Set to 60 seconds by default.

* **Authentication type**: The type of authentication for IoT Hub to use with Azure Storage. This setting determines how your IoT hub authenticates and authorizes with Azure Storage. The default is key-based authentication; however, the system-assigned or user-assigned managed identity authentication options are recommended. Managed identities provide Azure services with an automatically managed identity in Microsoft Entra ID in a secure manner.

    > **Note:**
    > The authentication type setting configures how your IoT hub authenticates with your Azure Storage account. Devices always authenticate with Azure Storage using the SAS URI that they get from the IoT hub. 

The following commands show how to configure the file upload settings on your IoT hub. These commands are shown separately for clarity, but, typically, you would issue a single command with all the required parameters for your scenario. Include quotes where they appear in the command line. Don't include the braces. More detail about each parameter can be found in the Azure CLI documentation for the [az iot hub update](https://learn.microsoft.com/cli/azure/iot/hub#az-iot-hub-update) command.

The following command configures the storage account and blob container.

```azurecli
az iot hub update --name {your iot hub name} \
    --fileupload-storage-connectionstring "{your storage account connection string}" \
    --fileupload-storage-container-name "{your container name}" 
```

The following command sets the SAS URI time to live to the default (one hour).

```azurecli
az iot hub update --name {your iot hub name} \
    --fileupload-sas-ttl 1 
```

The following command enables file notifications and sets the file notification properties to their default values. (The file upload notification time to live is set to one hour and the  lock duration is set to 60 seconds.)

```azurecli
az iot hub update --name {your iot hub name} \
    --fileupload-notifications true  \
    --fileupload-notification-max-delivery-count 10 \
    --fileupload-notification-ttl 1 \
    --fileupload-notification-lock-duration 60
```

The following command configures key-based authentication:

```azurecli
az iot hub update --name {your iot hub name} \
    --fileupload-storage-auth-type keyBased
```

The following command configures authentication using the IoT hub's system-assigned managed identity. Before you can run this command, you need to enable the system-assigned managed identity for your IoT hub and grant it the correct role-based access control role on your Azure Storage account. To learn how, see [IoT Hub support for managed identities](iot-hub-managed-identity.md).

```azurecli
az iot hub update --name {your iot hub name} \
    --fileupload-storage-auth-type identityBased \
    --fileupload-storage-identity [system] 
```

The following commands retrieve the user-assigned managed identities configured on your IoT hub and configure authentication with one of them. Before you can use a user-assigned managed identity to authenticate, it must be configured on your IoT hub and granted an appropriate role-based access control role on your Azure Storage account. For more detail and steps, see [IoT Hub support for managed identities](iot-hub-managed-identity.md).

To query for user-assigned managed identities on your IoT hub, use the [az iot hub identity show](https://learn.microsoft.com/cli/azure/iot/hub/identity#az-iot-hub-identity-show) command.

```azurecli
az iot hub identity show --name {your iot hub name} --query userAssignedIdentities
```

The command returns a collection of the user-assigned managed identities configured on your IoT hub. The following output shows a collection that contains a single user-assigned managed identity.

```json
{
  "/subscriptions/{your subscription ID}/resourcegroups/{your resource group}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{your user-assigned managed identity name}": 
  {
    "clientId": "<client ID GUID>",
    "principalId": "<principal ID GUID>"
  }
}
```

The following command configures authentication to use the user-assigned identity above.

```azurecli
az iot hub update --name {your iot hub name} \
    --fileupload-storage-auth-type identityBased \
    --fileupload-storage-identity  "/subscriptions/{your subscription ID}/resourcegroups/{your resource group}/providers/Microsoft.ManagedIdentity/userAssignedIdentities/{your user-assigned managed identity name}"
```

You can review the settings on your IoT hub using the following command:

```azurecli
az iot hub show --name {your iot hub name}
```

To review only the file upload settings, use the following command:

```azurecli
az iot hub show --name {your iot hub name}
    --query '[properties.storageEndpoints, properties.enableFileUploadNotifications, properties.messagingEndpoints.fileNotifications]'
```

For most situations, using the named parameters in the Azure CLI commands is easiest; however, you can also configure file upload settings with the `--set` parameter. The following commands can help you understand how. 

```azurecli
az iot hub update --name {your iot hub name} \
  --set properties.storageEndpoints.'$default'.connectionString="{your storage account connection string}"

az iot hub update --name {your iot hub name} \
  --set properties.storageEndpoints.'$default'.containerName="{your storage container name}"

az iot hub update --name {your iot hub name} \
  --set properties.storageEndpoints.'$default'.sasTtlAsIso8601=PT1H0M0S

az iot hub update --name {your iot hub name} \
  --set properties.enableFileUploadNotifications=true

az iot hub update --name {your iot hub name} \
  --set properties.messagingEndpoints.fileNotifications.maxDeliveryCount=10

az iot hub update --name {your iot hub name} \
  --set properties.messagingEndpoints.fileNotifications.ttlAsIso8601=PT1H0M0S
```





**Applies to: powershell**



## Prerequisites

* An active Azure account. If you don't have an account, you can create a [free account](https://azure.microsoft.com/pricing/free-trial/) in just a couple of minutes.

* An Azure IoT hub. If you don't have an IoT hub, you can use the [New-AzIoTHub cmdlet](https://learn.microsoft.com/powershell/module/az.iothub/new-aziothub) to create one or follow the steps in the **Create an IoT hub** section of [Create and manage Azure IoT hubs](create-hub.md).

* An Azure storage account. If you don't have an Azure storage account, you can use the [Azure Storage PowerShell cmdlets](https://learn.microsoft.com/powershell/module/az.storage/) to create one or use the portal to [Create a storage account](../storage/common/storage-account-create.md).

* Use the PowerShell environment in [Azure Cloud Shell](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-shell/quickstart-powershell.md).

   Button to launch the Azure Cloud Shell.

* If you prefer, [install](https://learn.microsoft.com/powershell/scripting/install/installing-powershell) PowerShell locally.

  * [Install the Azure Az PowerShell module](https://learn.microsoft.com/powershell/azure/install-azure-powershell). (The module is installed by default in the Azure Cloud Shell PowerShell environment.) 
  * Sign in to PowerShell by using the [Connect-AzAccount](https://learn.microsoft.com/powershell/module/az.accounts/connect-azaccount) command. To finish the authentication process, follow the steps displayed in your terminal. For more sign-in options, see [Sign in with Azure PowerShell](https://learn.microsoft.com/powershell/azure/authenticate-azureps).


## Sign in and set your Azure account

Sign in to your Azure account and select your subscription. If you're using Azure Cloud Shell, you should be signed in already; however, you still might need to select your Azure subscription if you have multiple subscriptions.

1. At the PowerShell prompt, run the **Connect-AzAccount** cmdlet:

    ```powershell
    Connect-AzAccount
    ```

2. If you have multiple Azure subscriptions, signing in to Azure grants you access to all the Azure subscriptions associated with your credentials. Use the [Get-AzSubscription](https://learn.microsoft.com/powershell/module/az.accounts/get-azsubscription) command to list the Azure subscriptions available for you to use:

    ```powershell
    Get-AzSubscription
    ```

    Use the following command to select the subscription that you want to use to run the commands to manage your IoT hub. You can use either the subscription name or ID from the output of the previous command:

    ```powershell
    Select-AzSubscription `
        -Name "{your subscription name}"
    ```

    > **Note:**
    > The **Select-AzSubscription** command is an alias of the [Select-AzContext](https://learn.microsoft.com/powershell/module/az.accounts/select-azcontext) that allows you to use the subscription name (**Name**) or subscription ID (**Id**) returned by the **Get-AzSubscription** command rather than the more complex context name required for the **Select-AzContext** command.

## Retrieve your storage account details

The following steps assume that you created your storage account using the **Resource Manager** deployment model, and not the **Classic** deployment model.

To configure file uploads from your devices, you need the connection string for an Azure storage account. The storage account must be in the same subscription as your IoT hub. You also need the name of a blob container in the storage account. Use the [Get-AzStorageAccountKey](https://learn.microsoft.com/powershell/module/az.storage/get-azstorageaccountkey) command to retrieve your storage account keys:

```powershell
Get-AzStorageAccountKey `
  -Name {your storage account name} `
  -ResourceGroupName {your storage account resource group}
```

Make a note of the **key1** storage account key value. You need it in the following steps.

You can either use an existing blob container for your file uploads or create new one:

* To list the existing blob containers in your storage account, use the [New-AzStorageContext](https://learn.microsoft.com/powershell/module/az.storage/new-azstoragecontext) and [Get-AzStorageContainer](https://learn.microsoft.com/powershell/module/az.storage/get-azstoragecontainer) commands:

    ```powershell
    $ctx = New-AzStorageContext `
        -StorageAccountName {your storage account name} `
        -StorageAccountKey {your storage account key}
    Get-AzStorageContainer -Context $ctx
    ```

* To create a blob container in your storage account, use the [New-AzStorageContext](https://learn.microsoft.com/powershell/module/az.storage/new-azstoragecontext) and [New-AzStorageContainer](https://learn.microsoft.com/powershell/module/az.storage/new-azstoragecontainer) commands:

    ```powershell
    $ctx = New-AzStorageContext `
        -StorageAccountName {your storage account name} `
        -StorageAccountKey {your storage account key}
    New-AzStorageContainer `
        -Name {your new container name} `
        -Permission Off `
        -Context $ctx
    ```

## Configure your IoT hub

You can now configure your IoT hub to [upload files to the IoT hub](iot-hub-devguide-file-upload.md) using your storage account details.

The configuration requires the following values:

* **Storage container**: A blob container in an Azure storage account in your current Azure subscription to associate with your IoT hub. You retrieved the necessary storage account information in the preceding section. IoT Hub automatically generates SAS URIs with write permissions to this blob container for devices to use when they upload files.

* **Receive notifications for uploaded files**: Enable or disable file upload notifications.

* **SAS TTL**: This setting is the time-to-live of the SAS URIs returned to the device by IoT Hub. Set to one hour by default.

* **File notification settings default TTL**: The time-to-live of a file upload notification before it expires. Set to one day by default.

* **File notification maximum delivery count**: The number of times the IoT hub attempts to deliver a file upload notification. Set to 10 by default.

Use the [Set-AzIotHub](https://learn.microsoft.com/powershell/module/az.iothub/set-aziothub) command to configure the file upload settings on your IoT hub:

```powershell
Set-AzIotHub `
    -ResourceGroupName "{your iot hub resource group}" `
    -Name "{your iot hub name}" `
    -FileUploadNotificationTtl "01:00:00" `
    -FileUploadSasUriTtl "01:00:00" `
    -EnableFileUploadNotifications $true `
    -FileUploadStorageConnectionString "DefaultEndpointsProtocol=https;AccountName={your storage account name};AccountKey={your storage account key};EndpointSuffix=core.windows.net" `
    -FileUploadContainerName "{your blob container name}" `
    -FileUploadNotificationMaxDeliveryCount 10
```

> **Note:**
> By default, IoT Hub authenticates with Azure Storage using the account key in the connection string. Authentication using either system-assigned or user-assigned managed identities is also available. Managed identities provide Azure services with an automatically managed identity in Microsoft Entra ID in a secure manner. To learn more, see [IoT Hub support for managed identities](iot-hub-managed-identity.md). Currently, there are not parameters on the **Set-AzIotHub** command to set the authentication type.
