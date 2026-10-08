---
title: Mount Azure Storage as a Local Share
description: Learn how to attach custom network share in Azure App Service. Share files between apps, manage static content remotely and access locally.
author: msangapu-msft

ms.topic: how-to
ms.custom: devx-track-azurecli, linux-related-content
ms.date: 02/09/2026
ms.author: msangapu
zone_pivot_groups: app-service-containers-code
#customer intent: As an app designer, I want to be able to mount Azure Storage to support my web apps in Azure App Service.
ms.service: azure-app-service
---
# Mount Azure Storage as a local share in App Service

**Applies to: code-windows**


Azure Storage is Microsoft's cloud storage solution for modern data storage scenarios. Azure Storage offers highly available, massively scalable, durable, and secure storage for data objects in the cloud. This guide shows how to mount Azure Storage Files as a network share in Windows code (noncontainer) in Azure App Service. 

Azure Storage supports [Azure Files Shares](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-use-files-portal.md) and [Premium Files Shares](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-create-file-share.md) for App Service. Azure Storage isn't the default storage for App Service. It's billed separately. You can also [configure Azure Storage in an ARM template](https://github.com/Azure/app-service-linux-docs/blob/master/BringYourOwnStorage/BYOS_azureFiles.json).

The benefits of custom-mounted storage include:

- Configure persistent storage for your App Service app and manage the storage separately.
- Make static content like video and images readily available for your App Service app.
- Write application log files or archive older application logs to Azure File shares.  
- Share content across multiple apps or with other Azure services.

The following features are supported for Windows code:

- Secured access to storage accounts with key vault, [private endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-private-endpoints.md), and [service endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md#grant-access-from-a-virtual-network) (when you use [virtual network integration](overview-vnet-integration.md)).
- Azure Files (read/write).
- Up to five mount points per app.
- Mount Azure Storage file shares using */mounts/\<path-name>*.

Here are the three options to mount Azure storage to your app:

| Mounting option | Usage |
| :--- | :--- |
| Basic | Choose this option when you mount storage by using the Azure portal. You can use the basic option as long as the storage account doesn't use [service endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md#grant-access-from-a-virtual-network), [private endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-private-endpoints.md), or [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). In this case, the portal gets and stores the access key for you. |
| Access Key | If you plan to mount storage using the Azure CLI, you need to obtain an access key. Choose this option if storage account doesn't use [service endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md#grant-access-from-a-virtual-network), [private endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-private-endpoints.md), or [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). |
| Key Vault | Also use this option when you plan to mount storage using the Azure CLI, which requires the access key. Choose this option when using Azure Key Vault to securely store and retrieve access keys. [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview) has the benefits of storing application secrets centrally and securely with the ability to monitor, administer, and integrate with other Azure services like Azure App Service. |

## Prerequisites

### [Basic](#tab/basic)

- [An existing Windows code app in App Service](quickstart-dotnetcore.md).
- [An Azure file share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-use-files-portal.md).
- [Files uploaded to the Azure File share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-create-file-share.md).

### [Access Key](#tab/access-key)

- [An existing Windows code app in App Service](quickstart-dotnetcore.md).
- [An Azure file share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-use-files-portal.md).
- [Files uploaded to the Azure File share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-create-file-share.md).

### [Key Vault](#tab/key-vault)

- [An existing Windows code app in App Service](quickstart-dotnetcore.md).
- [An Azure file share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-use-files-portal.md).
- [Files uploaded to the Azure File share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-create-file-share.md).
- An [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview) instance that uses [vault access policy](https://learn.microsoft.com/azure/key-vault/general/assign-access-policy?WT.mc_id=Portal-Microsoft_Azure_KeyVault\&tabs=azure-portal) and a [secret](https://learn.microsoft.com/azure/key-vault/secrets/quick-create-portal), which is required to configure the Key Vault with Azure Storage.

---

## Limitations

- [Storage firewall](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md) is supported only through [private endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-private-endpoints.md) and [service endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md#grant-access-from-a-virtual-network) when you use [virtual network integration](overview-vnet-integration.md).
- Azure blobs aren't supported when you configure Azure storage mounts for Windows code apps deployed to App Service.
- FTP/FTPS access to mounted storage isn't supported. Use [Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/).
- Mapping */mounts*, *mounts/name1/name2*, */*, and */mounts/name.ext/* to custom-mounted storage isn't supported. You can only use */mounts/pathname* for mounting custom storage to your web app.
- Storage mounts aren't included in [backups](manage-backup.md). Be sure to follow best practices to back up Azure Storage accounts.
- With virtual network integration on your app, the mounted drive uses an RFC1918 IP address and not an IP address from your virtual network.
- Storage Accounts that have key-based authentication disabled are not supported.

## Prepare for mounting

### [Basic](#tab/basic)

No extra steps are required because the portal gets and stores the access key for you.

### [Access Key](#tab/access-key)

You need to get the access key from your storage account. <!--link or instructions? -->

### [Key Vault](#tab/key-vault)

Before you can mount storage by using Key Vault access, you need to get the Key Vault secret and add it as an application setting in your app.  

1. In the Azure portal, browse to your Key Vault. Select **Objects** > **Secrets**. Copy the **Secret Identifier** to your clipboard.

   Screenshot of Key Vault secret identifier.

1. Go back to your app, and follow the [key vault reference](app-service-key-vault-references.md#source-app-settings-from-key-vault) to create an [application setting](configure-common.md#configure-app-settings) by using the **Secret Identifier**.

    Example app setting value: `@Microsoft.KeyVault(SecretUri=https://mykeyvault.vault.azure.net/secrets/mykeyvaultsecret/aaaaaaaa0b0b1c1c2d2d333333333333)`

Now you're ready to use Key Vault to access your storage account.

---

## Mount storage to Windows code

# [Azure portal](#tab/portal/basic)

To mount storage to Windows code by using the Azure portal:

1. In the [Azure portal](https://portal.azure.com), go to the app.
1. From the left navigation, select **Settings** > **Configuration**. Select **Path mappings**, and then select **New Azure Storage Mount**.
1. Configure the storage mount according to the following table. When finished, select **OK**.

   | Setting | Description |
   | :--- | :--- |
   | **Name** | Name of the mount configuration. Don't use spaces. |
   | **Configuration options** | Select **Basic** if the storage account doesn't use [private endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-private-endpoints.md) or [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). Otherwise, select **Advanced**. |
   | **Storage accounts** | Azure Storage account. It must contain an Azure Files share. |
   | **Share name** | Files share to mount. |
   | **Storage access** | Select **Key vault reference** for Azure Key Vault. Otherwise, select **Manual input**. |
   | **Access key** (Advanced only) | [Access key](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-keys-manage.md) for your storage account. |
   | **Mount path** | Directory inside your app service that you want to mount. Only */mounts/pathname* is supported. |
   | **Application settings** | Select the app setting with the Azure Key Vault secret. |
   | **Deployment slot setting** | When selected, the storage mount settings also apply to deployment slots. |

# [Azure portal](#tab/portal/access-key)

1. In the [Azure portal](https://portal.azure.com), go to the app.
1. From the left navigation, select **Settings** > **Configuration**. Select **Path mappings**, and then select **New Azure Storage Mount**.
1. Configure the storage mount according to the following table. When finished, select **OK**.

   | Setting | Description |
   | :--- | :--- |
   | **Name** | Name of the mount configuration. Don't use spaces. |
   | **Configuration options** | Select  **Advanced**. |
   | **Storage accounts** | Azure Storage account. |
   | **Storage type** | Select the type based on the storage you want to mount. Azure Blobs only supports read-only access. |
   | **Storage container** or **Share name** | Files share or Blobs container to mount. |
   | **Storage access** | Select **Manual input**. |
   | **Access key** | Enter the [access key](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-keys-manage.md) for your storage account. |
   | **Mount path** | Directory inside the Linux container to mount to Azure Storage. Don't use */* or */home*. |
   | **Deployment slot setting** | When selected, the storage mount settings also apply to deployment slots. |

# [Azure portal](#tab/portal/key-vault)

1. In the [Azure portal](https://portal.azure.com), go to the app.
1. From the left navigation, select **Settings** > **Configuration**. Select **Path mappings**, and then select **New Azure Storage Mount**.
1. Configure the storage mount according to the following table. When finished, select **OK**.

   | Setting | Description |
   | :--- | :--- |
   | **Name** | Name of the mount configuration. Don't use spaces. |
   | **Configuration options** | Select **Basic** if the storage account doesn't use [service endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md#grant-access-from-a-virtual-network), [private endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-private-endpoints.md), or [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). Otherwise, select **Advanced**. |
   | **Storage accounts** | Azure Storage account. |
   | **Storage type** | Select the type based on the storage you want to mount. Azure Blobs only supports read-only access. |
   | **Storage container** or **Share name** | Files share or Blobs container to mount. |
   | **Storage access** | Select **Key vault reference**. |
   | **Application settings** | Select the existing app setting with the Azure Key Vault secret. |
   | **Mount path** | Directory inside the Linux container to mount to Azure Storage. Don't use */* or */home*. |
   | **Deployment slot setting** | When checked, the storage mount settings also apply to deployment slots. |

1. To access the storage mount, [grant your app access to the Key Vault](app-service-key-vault-references.md?#grant-your-app-access-to-a-key-vault).

# [Azure CLI](#tab/cli/basic)

Using Azure CLI to mount storage requires you to provide the storage access key.

# [Azure CLI](#tab/cli/access-key)

Use the [az webapp config storage-account add](https://learn.microsoft.com/cli/azure/webapp/config/storage-account#az-webapp-config-storage-account-add) command. For example:

```azurecli-interactive
az webapp config storage-account add --resource-group <group-name> --name <app-name> --custom-id <custom-id> --storage-type AzureFiles --share-name <share-name> --account-name <storage-account-name> --access-key "<access-key>" --mount-path <mount-path-directory>
```

Verify your storage is mounted by running the following command:

```azurecli-interactive
az webapp config storage-account list --resource-group <resource-group> --name <app-name>
```

# [Azure CLI](#tab/cli/key-vault)

The Azure CLI doesn't currently support mounting storage with Key Vault access. Use the Azure portal instead.

---

> **Note:**
> When you add, edit, or delete a storage mount, the app restarts.

## Best practices

- Azure Storage mounts can be configured as a virtual directory to serve static content. To configure the virtual directory, in the left navigation select **Settings** > **Configuration**. Then select **Path mappings**, then **New virtual application or directory**. Set the **Physical path** to the **Mount path** defined on the Azure Storage mount.

- To avoid latency issues, place the app and the Azure Storage account in the same region. If you grant access from App Service IP addresses in the [Azure Storage firewall configuration](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md) when the app and Azure Storage account are in the same region, these IP restrictions aren't honored.

- In the Azure Storage account, avoid [regenerating the access key](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-keys-manage.md) that you use to mount the storage in the app. The storage account contains two keys. Azure App Services stores an Azure storage account key. Use a stepwise approach to ensure that the storage mount remains available to the app during key regeneration. For example, assuming that you used **key1** to configure storage mount in your app:

    1. Regenerate **key2**.
    1. In the storage mount configuration, update the access the key to use the regenerated **key2**.
    1. Regenerate **key1**.

- If you delete an Azure Storage account, container, or share, remove the corresponding storage mount configuration in the app to avoid possible error scenarios.

- The mounted Azure Storage account can be either Standard or Premium performance tier. Based on the app capacity and throughput requirements, choose the appropriate performance tier for the storage account. See the [scalability and performance targets for Files](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-scale-targets.md).

- If your app [scales to multiple instances](https://learn.microsoft.com/azure/azure-monitor/autoscale/autoscale-get-started), all the instances connect to the same mounted Azure Storage account. To avoid performance bottlenecks and throughput issues, choose the appropriate performance tier for the storage account.  

- We don't recommend that you use storage mounts for local databases, such as SQLite, or for any other applications and components that rely on file handles and locks.

- If you [initiate a storage failover](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-initiate-account-failover.md) when the storage account is mounted to the app, the mount doesn't connect until the app is restarted or the storage mount is removed and added again.

- Ensure port 445 is open when using Azure Files with virtual network integration. In addition, ensure app setting, `WEBSITE_CONTENTOVERVNET` is set to `1`.

- The mounted Azure Storage account can be either Standard or Premium performance tier. Based on the app capacity and throughput requirements, choose the appropriate performance tier for the storage account. See [the scalability and performance targets for Files](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-scale-targets.md).

## Next step

> 
> [Migrate .NET apps to Azure App Service](app-service-asp-net-migration.md)



**Applies to: container-windows**


Azure Storage is Microsoft's cloud storage solution for modern data storage scenarios. Azure Storage offers highly available, massively scalable, durable, and secure storage for data objects in the cloud. This guide shows how to mount Azure Storage Files as a network share in a Windows container in App Service.

Azure Storage supports [Azure Files Shares](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-use-files-portal.md) and [Premium Files Shares](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-create-file-share.md). Azure Storage isn't the default storage for App Service. It's billed separately. You can also [configure Azure Storage in an ARM template](https://github.com/Azure/app-service-linux-docs/blob/master/BringYourOwnStorage/BYOS_azureFiles.json).

The benefits of custom-mounted storage include:

- Configure persistent storage for your App Service app and manage the storage separately.
- Make static content like video and images readily available for your App Service app.
- Write application log files or archive older application log to Azure File shares.  
- Share content across multiple apps or with other Azure services.
- Mount Azure Storage in a Windows container, including Isolated. For more information, see [App Service environment v3](environment/overview.md).

The following features are supported for Windows containers:

- Secured access to storage accounts by using key vault, [private endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-private-endpoints.md), and [service endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md#grant-access-from-a-virtual-network) when you use [virtual network integration](overview-vnet-integration.md).
- Azure Files (read/write).
- Up to five mount points per app.
- Drive letter assignments (*C:* to *Z:*).

Here are the three options to mount Azure storage to your app:

| Mounting option | Usage |
| :--- | :--- |
| Basic | Choose this option when mounting storage by using the Azure portal. You can use the basic option as long as the storage account doesn't use [service endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md#grant-access-from-a-virtual-network), [private endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-private-endpoints.md), or [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). In this case, the portal gets and stores the access key for you. |
| Access Key | If you plan to mount storage by using the Azure CLI, you need to obtain an access key. Choose this option if the storage account doesn't use [service endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md#grant-access-from-a-virtual-network), [private endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-private-endpoints.md), or [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). |
| Key Vault | Also use this option when you plan to mount storage by using the Azure CLI, which requires the access key. Choose this option when using Azure Key Vault to securely store and retrieve access keys. [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview) has the benefits of storing application secrets centrally and securely with the ability to monitor, administer, and integrate with other Azure services like Azure App Service. |

## Prerequisites

### [Basic](#tab/basic)

- [An existing Windows container app in App Service](quickstart-custom-container.md).
- [An Azure file share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-use-files-portal.md).
- [Files uploaded to the Azure File share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-create-file-share.md).

### [Access Key](#tab/access-key)

- [An existing Windows container app in App Service](quickstart-custom-container.md).
- [An Azure file share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-use-files-portal.md).
- [Files uploaded to the Azure File share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-create-file-share.md).

### [Key Vault](#tab/key-vault)

- [An existing Windows container app in App Service](quickstart-custom-container.md).
- [An Azure file share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-use-files-portal.md).
- [Files uploaded to the Azure File share](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-create-file-share.md).
- An [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview) instance that uses [vault access policy](https://learn.microsoft.com/azure/key-vault/general/assign-access-policy?WT.mc_id=Portal-Microsoft_Azure_KeyVault\&tabs=azure-portal) and a [secret](https://learn.microsoft.com/azure/key-vault/secrets/quick-create-portal), which is required to configure the Key Vault with Azure Storage.

---

## Limitations

- Azure blobs aren't supported.
- [Storage firewall](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md) is supported only through [private endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-private-endpoints.md) and [service endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md#grant-access-from-a-virtual-network) when you use [virtual network integration](overview-vnet-integration.md).
- FTP/FTPS access to mounted storage isn't supported (use [Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/)).
- Mapping *[C-Z]:\\*, *[C-Z]:\home*, */*, and */home* to custom-mounted storage isn't supported.
- Storage mounts aren't backed up when you [back up your app](manage-backup.md). Be sure to follow best practices to back up the Azure Storage accounts.
- With virtual network integration on your app, the mounted drive uses an RFC1918 IP address and not an IP address from your virtual network.

## Prepare for mounting

### [Basic](#tab/basic)

No extra steps are required because the portal gets and stores the access key for you.

### [Access Key](#tab/access-key)

You need to get the access key from your storage account. <!--link or instructions? -->

### [Key Vault](#tab/key-vault)

Before you can mount storage by using Key Vault access, you need to get the Key Vault secret and add it as an application setting in your app.  

1. In the Azure portal, browse to your Key Vault. Select **Objects** > **Secrets**. Copy the **Secret Identifier** to your clipboard.

   Screenshot of Key Vault secret identifier.

1. Go back to your app and follow the [key vault reference](app-service-key-vault-references.md#source-app-settings-from-key-vault) to create an [application setting](configure-common.md#configure-app-settings) by using the **Secret Identifier**.

   Example app setting value: `@Microsoft.KeyVault(SecretUri=https://mykeyvault.vault.azure.net/secrets/mykeyvaultsecret/aaaaaaaa0b0b1c1c2d2d333333333333)`

Now you're ready to use Key Vault to access your storage account.

---

## Mount storage to Windows container

# [Azure portal](#tab/portal/basic)

To mount storage to a Windows container by using the Azure portal:

1. In the [Azure portal](https://portal.azure.com), go to the app.
1. From the left navigation, select **Settings** > **Configuration**. Select **Path mappings**, and then select **New Azure Storage Mount**.
1. Configure the storage mount according to the following table. When finished, select **OK**.

   | Setting | Description |
   | :--- | :--- |
   | **Name** | Name of the mount configuration. Don't use spaces. |
   | **Configuration options** | Select **Basic**. |
   | **Storage accounts** | Azure Storage account. It must contain an Azure Files share. |
   | **Share name** | Files share to mount. |
   | **Mount path** | Directory inside your Windows container that you want to mount. Don't use a root directory (*[C-Z]:\* or */*) or the *home* directory (*[C-Z]:\home* or */home*). |
   | **Deployment slot setting** | When selected, the storage mount settings also apply to deployment slots. |

# [Azure portal](#tab/portal/access-key)

1. In the [Azure portal](https://portal.azure.com), go to the app.
1. From the left navigation, select **Settings** > **Configuration**. Select **Path mappings**, and then select **New Azure Storage Mount**.
1. Configure the storage mount according to the following table. When finished, select **OK**.

   | Setting | Description |
   | :--- | :--- |
   | **Name** | Name of the mount configuration. Don't use spaces. |
   | **Configuration options** | Select **Advanced**. |
   | **Storage accounts** | Azure Storage account. It must contain an Azure Files share. |
   | **Share name** | Files share to mount. |
   | **Access key** (Advanced only) | [Access key](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-keys-manage.md) for your storage account. |
   | **Mount path** | Directory inside your Windows container that you want to mount. Don't use a root directory (*[C-Z]:\* or */*) or the *home* directory (*[C-Z]:\home* or */home*). |
   | **Application settings** | Select the app setting with the Azure Key Vault secret. |
   | **Deployment slot setting** | When selected, the storage mount settings also apply to deployment slots. |

# [Azure portal](#tab/portal/key-vault)

1. In the [Azure portal](https://portal.azure.com), go to the app.
1. From the left navigation, select **Settings** > **Configuration**. Select **Path mappings**, and then select **New Azure Storage Mount**.
1. Configure the storage mount according to the following table. When finished, select **OK**.

   | Setting | Description |
   | :--- | :--- |
   | **Name** | Name of the mount configuration. Don't use spaces. |
   | **Configuration options** | If the storage account doesn't use [service endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md#grant-access-from-a-virtual-network), [private endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-private-endpoints.md), or [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview), select **Basic**. Otherwise, select **Advanced**. |
   | **Storage accounts** | Azure Storage account. |
   | **Storage type** | Select the type based on the storage you want to mount. Azure Blobs only supports read-only access. |
   | **Storage container** or **Share name** | Files share or Blobs container to mount. |
   | **Storage access** | Select **Key vault reference**. |
   | **Application settings** | Select the existing app setting that's configured with the Azure Key Vault secret. |
   | **Mount path** | Directory inside the Linux container to mount to Azure Storage. Don't use */* or */home*. |
   | **Deployment slot setting** | When selected, the storage mount settings also apply to deployment slots. |

1. To access the storage mount, [grant your app access to the Key Vault](app-service-key-vault-references.md?#grant-your-app-access-to-a-key-vault).

# [Azure CLI](#tab/cli/basic)

To mount storage by using Azure CLI, you need to provide the storage access key.

# [Azure CLI](#tab/cli/access-key)

Use the [az webapp config storage-account add](https://learn.microsoft.com/cli/azure/webapp/config/storage-account#az-webapp-config-storage-account-add) command. For example:

```azurecli-interactive
az webapp config storage-account add --resource-group <group-name> --name <app-name> --custom-id <custom-id> --storage-type AzureFiles --share-name <share-name> --account-name <storage-account-name> --access-key "<access-key>" --mount-path <mount-path-directory>
```

- Set `--storage-type` to `AzureFiles` for Windows containers.
- Format `mount-path-directory` as */path/to/dir* or *[C-Z]:\path\to\dir*.

Run the following command to verify your storage is mounted:

```azurecli-interactive
az webapp config storage-account list --resource-group <resource-group> --name <app-name>
```

# [Azure CLI](#tab/cli/key-vault)

Azure CLI doesn't currently support mounting storage with Key Vault access. Use the portal instead.

---

> **Note:**
> Adding, editing, or deleting a storage mount restarts the app.

## Best practices

- To avoid latency problems, place the app and the Azure Storage account in the same region. If you grant access from App Service IP addresses in the [Azure Storage firewall configuration](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md) when the app and Azure Storage account are in the same region, these IP restrictions aren't honored.

- In the Azure Storage account, avoid [regenerating the access key](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-keys-manage.md) that you use to mount the storage in the app. The storage account contains two keys. Azure App Service stores an Azure storage account key. Use a stepwise approach to ensure that the storage mount remains available to the app during key regeneration. For example, assuming that you used **key1** to configure storage mount in your app:

  1. Regenerate **key2**.
  1. In the storage mount configuration, update the access the key to use the regenerated **key2**.
  1. Regenerate **key1**.

- If you delete an Azure Storage account, container, or share, remove the corresponding storage mount configuration in the app to avoid possible error scenarios.

- The mounted Azure Storage account can be either Standard or Premium performance tier. Based on the app capacity and throughput requirements, choose the appropriate performance tier for the storage account. See the [scalability and performance targets for Files](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-scale-targets.md).

- If your app [scales to multiple instances](https://learn.microsoft.com/azure/azure-monitor/autoscale/autoscale-get-started), all the instances connect to the same mounted Azure Storage account. To avoid performance bottlenecks and throughput problems, choose the appropriate performance tier for the storage account.  

- Don't use storage mounts for local databases, such as SQLite, or for any other applications and components that rely on file handles and locks.

- Ensure port 445 is open when using Azure Files with virtual network integration.

- If you [initiate a storage failover](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-initiate-account-failover.md) when the storage account is mounted to the app, the mount doesn't connect until the app is restarted or the storage mount is removed and added again.

## Next step

> 
> [Migrate custom software to Azure App Service using a custom container](tutorial-custom-container.md?pivots=container-windows)



**Applies to: container-linux**


> **Note:**
> [NFS](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/files-nfs-protocol.md) support is now available for App Service on Linux.
>

This guide shows how to mount Azure Storage as a network share in a built-in Linux container or a custom Linux container in App Service. Azure Storage is Microsoft's cloud storage solution for modern data storage scenarios. Azure Storage offers highly available, massively scalable, durable, and secure storage for data objects in the cloud. Azure Storage isn't the default storage for App Service. It's billed separately. You can also [configure Azure Storage in an ARM template](https://github.com/Azure/app-service-linux-docs/blob/master/BringYourOwnStorage/BYOS_azureFiles.json).

The benefits of custom-mounted storage include:

- Configure persistent storage for your App Service app and manage the storage separately.
- Make static content like video and images readily available for your App Service app.
- Write application log files or archive older application log to Azure File shares.  
- Share content across multiple apps or with other Azure services.
- Supports Azure Files [NFS](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/files-nfs-protocol.md) and Azure Files [SMB](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/files-smb-protocol.md).
- Supports Azure Blobs (read-only).
- Supports up to five mount points per app.

The limitations of custom-mounted storage include:

- [Storage firewall](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md) is supported only through [service endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md#grant-access-from-a-virtual-network) and [private endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-private-endpoints.md) when you use [virtual network integration](overview-vnet-integration.md).
- FTP/FTPS access to custom-mounted storage isn't supported. Use [Azure Storage Explorer](https://azure.microsoft.com/features/storage-explorer/).
- Storage account shared access keys are the only means of authentication that are supported. [Entra ID and RBAC Roles](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/authorize-data-access.md) aren't supported.
- Azure CLI, Azure PowerShell, and Azure SDK support is in preview.
- Mapping */* or */home* to custom-mounted storage isn't supported.
- Don't map the storage mount to */tmp* or its subdirectories. This action can cause a time-out during app startup.
- Azure Storage isn't supported with [Docker Compose](configure-custom-container.md?pivots=container-linux#docker-compose-options) scenarios.
- Storage mounts aren't included in [backups](manage-backup.md). Be sure to follow best practices to back up the Azure Storage accounts.
- NFS support is only available for App Service on Linux. NFS isn't supported for Windows code and Windows containers. The web app and storage account need to be configured on the same virtual network for NFS. The storage account used for file share should have *Premium* performance tier and *File storage* as the Account Kind. Azure Key Vault isn't applicable when using the NFS protocol.
- With virtual network integration on your app, the mounted drive uses an RFC1918 IP address and not an IP address from your virtual network.

### Mounting options

You need to mount the storage to the app. Here are three mounting options for Azure storage:

| Mounting option | Usage |
| :--- | :--- |
| Basic | Choose this option to mount storage using the Azure portal. You can use the basic option as long as the storage account doesn't use [service endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md#grant-access-from-a-virtual-network), [private endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-private-endpoints.md), or [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). In this case, the portal gets and stores the access key for you. |
| Access Key | If you plan to mount storage by using the Azure CLI, you need to get an access key. Choose this option if the storage account doesn't use [service endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md#grant-access-from-a-virtual-network), [private endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-private-endpoints.md), or [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). |
| Key Vault | Also use this option when you plan to mount storage by using the Azure CLI, which requires the access key. Choose this option when you use Azure Key Vault to securely store and retrieve access keys. [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview) has the benefits of storing application secrets centrally and securely with the ability to monitor, administer, and integrate with other Azure services like Azure App Service. |

## Prerequisites

### [Basic](#tab/basic)

- An existing [App Service on Linux app](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/index.yml).
- An [Azure Storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-create.md?tabs=azure-cli).
- An [Azure file share and directory](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-use-files-portal.md).

### [Access Key](#tab/access-key)

- An existing [App Service on Linux app](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/index.yml).
- An [Azure Storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-create.md?tabs=azure-cli).
- An [Azure file share and directory](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-use-files-portal.md).

### [Key Vault](#tab/key-vault)

- An existing [App Service on Linux app](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/index.yml).
- An [Azure Storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-create.md?tabs=azure-cli).
- An [Azure file share and directory](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-how-to-use-files-portal.md).
- An [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview) instance that uses [vault access policy](https://learn.microsoft.com/azure/key-vault/general/assign-access-policy?WT.mc_id=Portal-Microsoft_Azure_KeyVault\&tabs=azure-portal) and a [secret](https://learn.microsoft.com/azure/key-vault/secrets/quick-create-portal), which is required to configure the Key Vault with Azure Storage.

---

## Prepare for mounting

### [Basic](#tab/basic)

No extra steps are required because the portal gets and stores the access key for you.

### [Access Key](#tab/access-key)

You need to get the access key from your storage account.

### [Key Vault](#tab/key-vault)

Before you can mount storage by using Key Vault access, you need to get the Key Vault secret and add it as an application setting in your app.  

1. In the Azure portal, browse to your Key Vault. Select **Objects** > **Secrets**. Copy the **Secret Identifier** to your clipboard.

   Screenshot of Key Vault secret identifier.

1. Back in your app, follow the [key vault reference](app-service-key-vault-references.md#source-app-settings-from-key-vault) to create an [**application setting**](configure-common.md#configure-app-settings) by using the **Secret Identifier**.

   Example app setting value: `@Microsoft.KeyVault(SecretUri=https://mykeyvault.vault.azure.net/secrets/mykeyvaultsecret/aaaaaaaa0b0b1c1c2d2d333333333333)`

Now you're ready to use Key Vault to access your storage account.

---

## Mount storage to Linux container

The way that you mount storage depends on your storage access option and whether you use the portal or the Azure CLI.

# [Azure portal](#tab/portal/basic)

1. In the [Azure portal](https://portal.azure.com), go to the app.
1. From the left navigation, select **Settings** > **Configuration**. Select **Path mappings**, and then select **New Azure Storage Mount**.
1. Configure the storage mount according to the following table. When finished, select **OK**.

   | Setting | Description |
   | :--- | :--- |
   | **Name** | Name of the mount configuration. Don't use spaces. |
   | **Configuration options** | Select **Basic** if the storage account doesn't use [service endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md#grant-access-from-a-virtual-network), [private endpoints](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-private-endpoints.md), or [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview). Otherwise, select **Advanced**. |
   | **Storage accounts** | Azure Storage account. |
   | **Storage type** | Select the type based on the storage you want to mount. Azure Blobs only supports read-only access. |
   | **Storage container** or **Share name** | Files share or Blobs container to mount. |
   | **Mount path** | Directory inside the Linux container to mount to Azure Storage. Don't use */* or */home*. |
   | **Deployment slot setting** | When checked, the storage mount settings also apply to deployment slots. |

# [Azure portal](#tab/portal/access-key)

1. In the [Azure portal](https://portal.azure.com), go to the app.
1. From the left navigation, select **Settings** > **Configuration**. Select **Path mappings**, and then select **New Azure Storage Mount**.
1. Configure the storage mount according to the following table. When finished, select **OK**.

   | Setting | Description |
   | :--- | :--- |
   | **Name** | Name of the mount configuration. Don't use spaces. |
   | **Configuration options** | Select  **Advanced**. |
   | **Storage accounts** | Azure Storage account. |
   | **Storage type** | Select the type based on the storage you want to mount. Azure Blobs only supports read-only access. |
   | **Storage container** or **Share name** | Files share or Blobs container to mount. |
   | **Storage access** | Select **Manual input**. |
   | **Access key** | Enter the [access key](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-keys-manage.md) for your storage account. |
   | **Mount path** | Directory inside the Linux container to mount to Azure Storage. Don't use */* or */home*. |
   | **Deployment slot setting** | When selected, the storage mount settings also apply to deployment slots. |

# [Azure portal](#tab/portal/key-vault)

1. In the [Azure portal](https://portal.azure.com), go to the app.
1. From the left navigation, select **Settings** > **Configuration**. Select **Path mappings**, and then select **New Azure Storage Mount**.
1. Configure the storage mount according to the following table. When finished, select **OK**.

   | Setting | Description |
   | :--- | :--- |
   | **Name** | Name of the mount configuration. Don't use spaces. |
   | **Configuration options** | Select **Advanced**. |
   | **Storage accounts** | Azure Storage account. |
   | **Storage type** | Select the type based on the storage you want to mount. Azure Blobs only supports read-only access. |
   | **Storage container** or **Share name** | Files share or Blobs container to mount. |
   | **Storage access** | Select **Key vault reference**. |
   | **Application settings** | Select the existing app setting that's configured with the Azure Key Vault secret. |
   | **Mount path** | Directory inside the Linux container to mount to Azure Storage. Don't use */* or */home*. |
   | **Deployment slot setting** | When selected, the storage mount settings also apply to deployment slots. |

1. To access the storage mount, [grant your app access to the Key Vault](app-service-key-vault-references.md?#grant-your-app-access-to-a-key-vault).

# [Azure CLI](#tab/cli/basic)

To use Azure CLI to mount storage, you need to provide the storage access key.

# [Azure CLI](#tab/cli/access-key)

Use the [az webapp config storage-account add](https://learn.microsoft.com/cli/azure/webapp/config/storage-account#az-webapp-config-storage-account-add) command. For example:

```azurecli-interactive
az webapp config storage-account add --resource-group <group-name> --name <app-name> --custom-id <custom-id> --storage-type AzureFiles --share-name <share-name> --account-name <storage-account-name> --access-key "<access-key>" --mount-path <mount-path-directory>
```

- `--storage-type` can be `AzureBlob` or `AzureFiles`. `AzureBlob` is read-only.
- `--mount-path` is the directory inside the Linux container to mount to Azure Storage. Don't use */*, the root directory.

Verify your storage is mounted by running the following command:

```azurecli-interactive
az webapp config storage-account list --resource-group <resource-group> --name <app-name>
```

# [Azure CLI](#tab/cli/key-vault)

The Azure CLI doesn't currently support mounting storage with Key Vault access. Use the portal instead.

---

> **Note:**
> Adding, editing, or deleting a storage mount restarts the app.

## Validate the mounted storage

To validate that Azure Storage is mounted successfully for the app:

1. [Open an SSH session](configure-linux-open-ssh-session.md) into the container.
1. In the SSH terminal, execute the following command:

   ```bash
   df –h 
   ```

1. Check if the storage share is mounted. If it's not present, there's an issue with mounting the storage share.
1. Check latency or general reachability of the storage mount by using the following command:

   ```bash
   tcpping Storageaccount.file.core.windows.net 
   ```

### Storage mount health checks and auto‑recovery

Azure App Service includes a built‑in health‑check mechanism to ensure that mounted Azure Storage volumes (Azure Files or Azure Blob) remain accessible and responsive. This system helps prevent application hangs caused by stale or disconnected storage mounts.

#### How the health check works

1. **Periodic I/O test**  
   App Service periodically performs file I/O on a marker file named `__lastCheckTime.txt`.  
   - **Location:** A `LogFiles` subdirectory under the mounted path (for example, `/mount/path/LogFiles/__lastCheckTime.txt`).  
   - **Behavior:**  
     - A read operation is attempted on this file.  
     - The file doesn't need to exist – "file not found" is treated as a successful check.

1. **Frequency**  
   The check runs every **5 seconds** by default.

1. **Failure handling**  
   - Each failed or timed‑out check increments a *failed ping counter*.  
   - When failures exceed the configured threshold:  
     - **Azure Files:** 18 failed pings  
     - **Azure Blob:** 15 failed pings  
   - The mount is marked **Faulted**, and **App Service automatically restarts the app** to restore connectivity to the share.

#### Configuration via App Settings

You can customize health‑check behavior by using the following app settings.

| Storage type | Setting name | Default value | Description |
| --- | --- | --- | --- |
| Azure Files | `WEBSITE_BYOS_FILES_HEALTH_CHECK_FREQUENCY` | `5` | Interval in seconds between health checks. |
| Azure Files | `WEBSITE_BYOS_FILES_MAX_FAILED_PINGS` | `18` | Number of consecutive failures before marking the volume as faulted. |
| Azure Files | `WEBSITE_BYOS_FILES_AUTO_RECOVERY_ENABLED` | `true` | Set to `false` to disable auto‑recovery logic. |
| Azure Blob | `WEBSITE_BYOS_BLOB_HEALTH_CHECK_FREQUENCY` | `5` | Interval in seconds between health checks. |
| Azure Blob | `WEBSITE_BYOS_BLOB_MAX_FAILED_PINGS` | `15` | Number of consecutive failures before marking the volume as faulted. |
| Azure Blob | `WEBSITE_BYOS_BLOB_AUTO_RECOVERY_ENABLED` | `true` | Set to `false` to disable auto‑recovery logic. |
| Azure Blob | `WEBSITE_BYOS_BLOB_DIRECT_IO` | `false` | If enabled, all transactions will query the remote storage directly and caching will be bypassed. This setting is applied at the application level and therefore affects all blob shares mounted by the application. |

#### Notes
- Auto‑recovery helps prevent long‑running application hangs caused by unresponsive storage paths.  
- Don't disable auto‑recovery unless you're troubleshooting specific mount behavior.

## Best practices

### Performance

- To avoid latency problems, place the app and the Azure Storage account in the same region. If you grant access from App Service IP addresses in the [Azure Storage firewall configuration](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-network-security.md) when the app and Azure Storage account are in the same region, these IP restrictions aren't honored.
- The mounted Azure Storage account can be either Standard or Premium performance tier. Based on the app capacity and throughput requirements, choose the appropriate performance tier for the storage account. See the scalability and performance targets that correspond to the storage type: [Files](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-scale-targets.md) and [Blobs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/scalability-targets.md).

- If your app [scales to multiple instances](https://learn.microsoft.com/azure/azure-monitor/autoscale/autoscale-get-started), all the instances connect to the same mounted Azure Storage account. To avoid performance bottlenecks and throughput problems, choose the appropriate performance tier for the storage account.

### Security

- In the Azure Storage account, avoid [regenerating the access key](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-keys-manage.md) that you use to mount the storage in the app. The storage account contains two keys. Azure App Services stores an Azure storage account key. Use a stepwise approach to ensure that the storage mount remains available to the app during key regeneration. For example, assuming that you used **key1** to configure storage mount in your app:

   1. Regenerate **key2**.
   1. In the storage mount configuration, update the access the key to use the regenerated **key2**.
   1. Regenerate **key1**.

### Configuration

- If you need to use a real time file system, where you expect changes to alter, add, or remove files quickly, use Azure Files as the storage type when you mount storage. When files are static and you don't expect them to change, use Azure Blob.

### Troubleshooting

- The mount directory in the custom container should be empty. Any content stored at this path is deleted when the Azure Storage is mounted, if you specify a directory under */home*, for example. If you migrate files for an existing app, make a backup of the app and its content before you begin.
- When mounting an NFS share, you need to ensure that Secure Transfer Required is disabled on the storage account. App Service doesn't support mounting NFS shares when this setting is enabled. It uses port 2049 and virtual network integration and private endpoints as the security measure.
- If you delete an Azure Storage account, container, or share, remove the corresponding storage mount configuration in the app to avoid possible error scenarios.
- Don't use storage mounts for local databases, such as SQLite, or for any other applications and components that rely on file handles and locks.
- Ensure the following ports are open when using virtual network integration: Azure Files: 80 and 445. Azure Blobs: 80 and 443.
- If you [initiate a storage failover](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-initiate-account-failover.md) when the storage account is mounted to the app, the mount doesn't connect until the app is restarted or the storage mount is removed and added again.

## Related content

- [Configure a custom container](configure-custom-container.md?pivots=platform-linux)
- [Video: How to mount Azure Storage as a local share](https://www.youtube.com/watch?v=OJkvpWYr57Y)
