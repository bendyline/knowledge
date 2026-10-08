---
title: Azure Stack Edge Pro GPU storage account management | Microsoft Docs 
description: Describes how to use the Azure portal to manage storage account on your Azure Stack Edge Pro GPU.
services: databox
author: sipastak

ms.service: azure-stack-edge
ms.custom: devx-track-azurepowershell
ms.topic: how-to
ms.date: 02/05/2025
ms.author: sipastak
---
# Use the Azure portal to manage Edge storage accounts on your Azure Stack Edge Pro GPU


**APPLIES TO:** Yes for Pro GPU SKUAzure Stack Edge Pro - GPUYes for Pro 2 SKUAzure Stack Edge Pro 2Yes for Pro R SKUAzure Stack Edge Pro RYes for Mini R SKUAzure Stack Edge Mini R&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;  &nbsp;


This article describes how to manage Edge storage accounts and local storage accounts on your Azure Stack Edge. You can manage the Azure Stack Edge Pro device via the Azure portal or via the local web UI. Use the Azure portal to add or delete Edge storage accounts on your device. Use Azure PowerShell to add local storage accounts on your device.

## About Edge storage accounts

You can transfer data from your Azure Stack Edge Pro GPU device via the SMB, NFS, or REST protocols. To transfer data to Blob storage using the REST APIs, you need to create Edge storage accounts on your device. 

The Edge storage accounts that you add on the Azure Stack Edge Pro GPU device are mapped to Azure Storage accounts. Any data written to the Edge storage accounts is automatically pushed to the cloud.

A diagram detailing the two types of accounts and how the data flows from each of these accounts to Azure is shown below:

Diagram for Blob storage accounts

In this article, you learn how to:

> 
> * Add an Edge storage account
> * Delete an Edge storage account

## Add an Edge storage account

To create an Edge storage account, do the following procedure:


1. In the [Azure portal](https://portal.azure.com/), select your Azure Stack Edge resource and then go to the **Overview**. Your device should be online. Go to **Cloud storage gateway > Storage accounts**.

2. Select **+ Add storage account** on the device command bar. 

   Add a storage account

3. In the **Add Edge storage account** pane, specify the following settings:

    1. Provide a unique name for the Edge storage account on your device. Storage account names can only contain lowercase numbers and letters. Special characters are not allowed. Storage account name has to be unique within the device (not across the devices).

    2. Provide an optional description for the information on the data the storage account is holding.  
    
    3. By default, the Edge storage account is mapped to an Azure Storage account in the cloud, and the data from the storage account is automatically pushed to the cloud. Specify the Azure storage account that your Edge storage account is mapped to.
   > **Important:**
   > Tiering data from an Azure Stack Edge Pro device to the mapped Azure Storage account uses Managed Service Identity to authorize the data access. Make sure that the Azure Storage account that you use has the following roles being assigned to the Managed identities for Azure Stack Edge resource:
   >
   > * Storage Blob Data Contributor
   > * Storage File Data Privileged Contributor
   > * Contributor
   > 
   > For more information, see [Assign an Azure role for access to blob data](https://learn.microsoft.com/azure/storage/blobs/assign-azure-role-data-access?tabs=portal#assign-an-azure-role).

    4. Create a new container, or select from an existing container in the Azure storage account. Any data from the device that is written to the Edge storage account is automatically uploaded to the selected storage container in the mapped Azure Storage account.

    5. After all the storage account options are specified, select **Add** to create the Edge storage account. You are notified when the Edge storage account is  successfully created. The new Edge storage account is then displayed in the list of storage accounts in the Azure portal.

    <!--[Add a storage account](media/azure-stack-edge-gateway-add-storage-account/add-storage-account-2.png)-->
    
4. If you select this new storage account and go to **Access keys**, you can find the blob service endpoint and the corresponding storage account name. Copy this information as these values together with the access keys will help you connect to the Edge storage account.

    Add a storage account 2

    You get the access keys by [Connecting to the device local APIs using Azure Resource Manager](azure-stack-edge-gpu-connect-resource-manager.md).


## Create a local storage account


Create a new local storage account by using an existing resource group. Use this local storage account to upload the virtual disk image when creating a VM.

Before you create a local storage account, you must configure your client to connect to the device via Azure Resource Manager over Azure PowerShell. For detailed instructions, see [Connect to Azure Resource Manager on your Azure Stack Edge device](azure-stack-edge-gpu-connect-resource-manager.md).

### [Az](#tab/az)

1. Set some parameters.

    ```powershell
    $StorageAccountName = "<Storage account name>"    
    ```

1. Create a new local storage account on your device.

    ```powershell
    New-AzStorageAccount -Name $StorageAccountName -ResourceGroupName $ResourceGroupName -Location DBELocal -SkuName Standard_LRS
    ```
    
    > **Note:**
    > By using Azure Resource Manager, you can create only local storage accounts, such as locally redundant storage (standard or premium). To create tiered storage accounts, see [Tutorial: Transfer data via storage accounts with Azure Stack Edge Pro with GPU](azure-stack-edge-gpu-deploy-add-storage-accounts.md).

    Here's an example output:
    
    ```output
    PS C:\WINDOWS\system32> New-AzStorageAccount -Name myaseazsa -ResourceGroupName myaseazrg -Location DBELocal -SkuName Standard_LRS
    
    StorageAccountName ResourceGroupName PrimaryLocation SkuName      Kind    AccessTier CreationTime
    ------------------ ----------------- --------------- -------      ----    ---------- ------------
    myaseazsa          myaseazrg         DBELocal        Standard_LRS Storage            6/10/2021 11:45...
    
    PS C:\WINDOWS\system32>
    ```

### [AzureRM](#tab/azure-rm)

```powershell
New-AzureRmStorageAccount -Name <Storage account name> -ResourceGroupName <Resource group name> -Location DBELocal -SkuName Standard_LRS
```

> **Note:**
> By using Azure Resource Manager, you can create only local storage accounts, such as locally redundant storage (standard or premium). To create tiered storage accounts, see [Tutorial: Transfer data via storage accounts with Azure Stack Edge Pro with GPU](azure-stack-edge-gpu-deploy-add-storage-accounts.md).

Here's some example output:

```output
New-AzureRmStorageAccount -Name sa191113014333  -ResourceGroupName rg191113014333 -SkuName Standard_LRS -Location DBELocal

ResourceGroupName      : rg191113014333
StorageAccountName     : sa191113014333
Id                     : /subscriptions/.../resourceGroups/rg191113014333/providers/Microsoft.Storage/storageaccounts/sa191113014333
Location               : DBELocal
Sku                    : Microsoft.Azure.Management.Storage.Models.Sku
Kind                   : Storage
Encryption             : Microsoft.Azure.Management.Storage.Models.Encryption
AccessTier             :
CreationTime           : 11/13/2019 9:43:49 PM
CustomDomain           :
Identity               :
LastGeoFailoverTime    :
PrimaryEndpoints       : Microsoft.Azure.Management.Storage.Models.Endpoints
PrimaryLocation        : DBELocal
ProvisioningState      : Succeeded
SecondaryEndpoints     :
SecondaryLocation      :
StatusOfPrimary        : Available
StatusOfSecondary      :
Tags                   :
EnableHttpsTrafficOnly : False
NetworkRuleSet         :
Context                : Microsoft.WindowsAzure.Commands.Common.Storage.LazyAzureStorageContext
ExtendedProperties     : {}
```
---


## Get access keys for a local storage account

Before you get the access keys, you must configure your client to connect to the device via Azure Resource Manager over Azure PowerShell. For detailed instructions, see [Connect to Azure Resource Manager on your Azure Stack Edge device](azure-stack-edge-gpu-connect-resource-manager.md).


To get the access keys for an existing local storage account that you have created, provide the associated resource group name and the local storage account name. 

### [Az](#tab/az)

```powershell
Get-AzStorageAccountKey
``` 

Here's an example output:

```output
PS C:\WINDOWS\system32> Get-AzStorageAccountKey
    
cmdlet Get-AzStorageAccountKey at command pipeline position 1
Supply values for the following parameters:
(Type !? for Help.)
ResourceGroupName: myaseazrg
Name: myaseazsa
    
KeyName    Value                                                                                       Permissions
-------    -----                                                                                       ------
key1       gv3OF57tuPDyzBNc1M7fhil2UAiiwnhTT6zgiwE3TlF/CD217Cvw2YCPcrKF47joNKRvzp44leUe5HtVkGx8RQ==    Full
key2       kmEynIs3xnpmSxWbU41h5a7DZD7v4gGV3yXa2NbPbmhrPt10+QmE5PkOxxypeSqbqzd9si+ArNvbsqIRuLH2Lw==    Full
    
PS C:\WINDOWS\system32>
```

### [AzureRM](#tab/azure-rm)

To get the storage account key, run the `Get-AzureRmStorageAccountKey` command. Here's some example output:

```output
PS C:\windows\system32> Get-AzureRmStorageAccountKey

cmdlet Get-AzureRmStorageAccountKey at command pipeline position 1
Supply values for the following parameters:
(Type !? for Help.)
ResourceGroupName: my-resource-ase
Name:myasestoracct

KeyName Value
------- -----
key1 /IjVJN+sSf7FMKiiPLlDm8mc9P4wtcmhhbnCa7...
key2 gd34TcaDzDgsY9JtDNMUgLDOItUU0Qur3CBo6Q...
```
---

## Delete an Edge storage account

Take the following steps to delete an Edge storage account.

1. Go to **Configuration > Storage accounts** in your resource. From the list of storage accounts, select the storage account you want to delete. From the top command bar, select **Delete storage account**.

    Go to list of storage accounts

2. In the **Delete storage account** blade, confirm the storage account to delete and select **Delete**.

    Confirm and delete storage account

The list of storage accounts is updated to reflect the deletion.

## Add, delete a container

You can also add or delete the containers for these storage accounts.

To add a container, take the following steps:

1. Select the storage account that you want to manage. From the top command bar, select **+ Add container**.

    Select storage account to add container

2. Provide a name for your container. This container is created in your Edge storage account as well as the Azure storage account mapped to this account. 

    Add Edge container

The list of containers is updated to reflect the newly added container.

Updated list of containers

You can now select a container from this list and select **+ Delete container** from the top command bar. 

Delete a container

## Sync storage keys

Each Azure Storage account has two 512-bit storage access keys that are used for authentication when the storage account is accessed. One of these two keys must be supplied when your Azure Stack Edge device accesses your cloud storage service provider (in this case, Azure).

> **Note:**
> Access to your Azure Storage Account using storage access keys from an Azure Stack Edge Pro device has been deprecated in 2501. Tiering data from an Azure Stack Edge Pro device to the mapped Azure Storage account uses Managed Service Identity to authorize the data access from 2501. For more information, see [Assign an Azure role for access to blob data](../storage/blobs/assign-azure-role-data-access.md?tabs=portal#assign-an-azure-role).

An Azure administrator can regenerate or change the access key by directly accessing the storage account (via the Azure Storage service). The Azure Stack Edge service and the device do not see this change automatically.
 
To inform Azure Stack Edge of the change, you will need to access the Azure Stack Edge service, access the storage account, and then synchronize the access key. The service then gets the latest key, encrypts the keys, and sends the encrypted key to the device. When the device gets the new key, it can continue to transfer data to the Azure Storage account. 
 
To provide the new keys to the device, access the Azure portal and synchronize storage access keys. Take the following steps: 

1. In your resource, select the storage account that you want to manage. From the top command bar, select **Sync storage key**.

    Select sync storage key

2. When prompted for confirmation, select **Yes**.

    Select sync storage key 2

## Next steps

- Learn how to [Manage users via Azure portal](azure-stack-edge-gpu-manage-users.md).
