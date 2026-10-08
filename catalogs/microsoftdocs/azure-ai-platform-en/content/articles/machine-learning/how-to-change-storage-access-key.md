---
title: Change storage account access keys
titleSuffix: Azure Machine Learning
description: Learn how to change the access keys for the Azure Storage account used by your workspace. Azure Machine Learning uses an Azure Storage account to store data and models.
services: machine-learning
ms.service: azure-machine-learning
ms.subservice: enterprise-readiness
ms.topic: how-to
ms.author: scottpolly
author: s-polly
ms.reviewer: shshubhe
ms.date: 02/21/2025
monikerRange: 'azureml-api-2 || azureml-api-1'
---

# Regenerate storage account access keys

**Applies to: azureml-api-2**

**APPLIES TO:**



**APPLIES TO**:  [Python SDK azure-ai-ml **v2 (current)**](https://aka.ms/sdk-v2-install)

**Applies to: azureml-api-1**

**APPLIES TO:**




**APPLIES TO:**  [Azure Machine Learning SDK v1 for Python](https://learn.microsoft.com/python/api/overview/azure/ml/?view=azure-ml-py\&preserve-view=true)



> **Important:**
> This article provides information on using the Azure Machine Learning SDK v1. SDK v1 is deprecated as of March 31, 2025. Support for it will end on June 30, 2026. You can install and use SDK v1 until that date. Your existing workflows using SDK v1 will continue to operate after the end-of-support date. However, they could be exposed to security risks or breaking changes in the event of architectural changes in the product.
>
> We recommend that you transition to the SDK v2 before June 30, 2026. For more information on SDK v2, see [What is Azure Machine Learning CLI and Python SDK v2?](https://learn.microsoft.com/azure/machine-learning/concept-v2) and the [SDK v2 reference](https://learn.microsoft.com/python/api/overview/azure/ai-ml-readme).


> **Important:**
> Some of the Azure CLI commands in this article use the `azure-cli-ml`, or v1, extension for Azure Machine Learning. Support for CLI v1 ended on September 30, 2025. Microsoft will no longer provide technical support or updates for this service. Your existing workflows using CLI v1 will continue to operate after the end-of-support date. However, they could be exposed to security risks or breaking changes in the event of architectural changes in the product.
>
> We recommend that you transition to the `ml`, or v2, extension as soon as possible. For more information on the v2 extension, see [Azure Machine Learning CLI extension and Python SDK v2](concept-v2.md).


Learn how to change the access keys for Azure Storage accounts used by Azure Machine Learning. Azure Machine Learning can use storage accounts to store data or trained models.

For security purposes, you might need to change the access keys for an Azure Storage account. When you regenerate the access key, Azure Machine Learning must be updated to use the new key. Azure Machine Learning may be using the storage account for both model storage and as a datastore.

> **Warning:**
> The default secret expiry date set by Azure Machine Learning is __2 years__.

> **Important:**
> Credentials registered with datastores are saved in your Azure Key Vault associated with the workspace. If you have [soft-delete](https://learn.microsoft.com/azure/key-vault/general/soft-delete-overview) enabled for your Key Vault, this article provides instructions for updating credentials. If you unregister the datastore and try to re-register it under the same name, this action will fail. See [Turn on Soft Delete for an existing key vault](https://learn.microsoft.com/azure/key-vault/general/soft-delete-change#turn-on-soft-delete-for-an-existing-key-vault) for how to enable soft delete in this scenario.

## Prerequisites

* An Azure Machine Learning workspace. For more information, see the [Create workspace resources](quickstart-create-resources.md) article.
**Applies to: azureml-api-2**
* The [Azure Machine Learning SDK v2](https://learn.microsoft.com/python/api/overview/azure/ai-ml-readme).

* The [Azure Machine Learning CLI extension v2](how-to-configure-cli.md).

**Applies to: azureml-api-1**
* The [Azure Machine Learning SDK v1](https://learn.microsoft.com/python/api/overview/azure/ml/install).

* The [Azure Machine Learning CLI extension v1](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/machine-learning/v1/reference-azure-machine-learning-cli.md).

> **Note:**
> The code snippets in this document were tested with version 1.0.83 of the Python SDK.


## What needs to be updated

Storage accounts can be used by the Azure Machine Learning workspace (storing logs, models, snapshots, etc.) and as a datastore. The process to update the workspace is a single Azure CLI command, and can be ran after updating the storage key. The process of updating datastores is more involved, and requires discovering what datastores are currently using the storage account and then re-registering them.

> **Important:**
> Update the workspace using the Azure CLI, and the datastores using Python, at the same time. Updating only one or the other is not sufficient, and may cause errors until both are updated.

To discover the storage accounts that are used by your datastores, use the following code:

**Applies to: azureml-api-2**
```python
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential

#Enter details of your Azure Machine Learning workspace
subscription_id = '<SUBSCRIPTION_ID>'
resource_group = '<RESOURCE_GROUP>'
workspace_name = '<AZUREML_WORKSPACE_NAME>'

ml_client = MLClient(credential=DefaultAzureCredential(),
                        subscription_id=subscription_id, 
                        resource_group_name=resource_group,
                        workspace_name=workspace_name)

# list all the datastores
datastores = ml_client.datastores.list()
for ds in datastores:
    if ds.credentials.type == "account_key":
        if ds.type.name == "AZURE_BLOB":
            print("Blob store - datastore name: " + ds.name + ", storage account name: " +
                  ds.account_name + ", container name: " + ds.container_name)
        if ds.type.name == "AZURE_FILE":
            print("Blob store - datastore name: " + ds.name + ", storage account name: " +
                  ds.account_name + ", file share name: " + ds.file_share_name)
```


This code looks for any registered datastores that use Azure Storage with key authentication, and lists the following information:

* Datastore name: The name of the datastore that the storage account is registered under.
* Storage account name: The name of the Azure Storage account.
* Container: The container in the storage account that is used by this registration.
* File share: The file share that is used by this registration.


**Applies to: azureml-api-1**
```python
import azureml.core
from azureml.core import Workspace, Datastore

ws = Workspace.from_config()

default_ds = ws.get_default_datastore()
print("Default datstore: " + default_ds.name + ", storage account name: " +
      default_ds.account_name + ", container name: " + default_ds.container_name)

datastores = ws.datastores
for name, ds in datastores.items():
    if ds.datastore_type == "AzureBlob":
        print("Blob store - datastore name: " + name + ", storage account name: " +
              ds.account_name + ", container name: " + ds.container_name)
    if ds.datastore_type == "AzureFile":
        print("File share - datastore name: " + name + ", storage account name: " +
              ds.account_name + ", container name: " + ds.container_name)
```


This code looks for any registered datastores that use Azure Storage and lists the following information:

* Datastore name: The name of the datastore that the storage account is registered under.
* Storage account name: The name of the Azure Storage account.
* Container: The container in the storage account that is used by this registration.



It also indicates whether the datastore is for an Azure Blob or an Azure File share, as there are different methods to re-register each type of datastore.

If an entry exists for the storage account that you plan on regenerating access keys for, save the datastore name, storage account name, and container name.

## Update the access key

To update Azure Machine Learning to use the new key, use the following steps:

> **Important:**
> Perform all steps, updating both the workspace using the CLI, and datastores using Python. Updating only one or the other may cause errors until both are updated.

1. Regenerate the key. For information on regenerating an access key, see [Manage storage account access keys](https://learn.microsoft.com/azure/storage/common/storage-account-keys-manage). Save the new key.

1. The Azure Machine Learning workspace will automatically synchronize the new key and begin using it after an hour. To force the workspace to synch to the new key immediately, use the following steps:

    1. To sign in to the Azure subscription that contains your workspace by using the following Azure CLI command:

        ```azurecli-interactive
        az login
        ```

        
> **Tip:**
> After you sign in, you see a list of subscriptions associated with your Azure account. The subscription information with `isDefault: true` is the currently activated subscription for Azure CLI commands. This subscription must be the same one that contains your Azure Machine Learning workspace. You can find the subscription information on the overview page for your workspace in the [Azure portal](https://portal.azure.com).
> 
> To select another subscription to use for Azure CLI commands, run the `az account set -s <subscription>` command and specify the subscription name or ID to switch to. For more information about subscription selection, see [Use multiple Azure subscriptions](https://learn.microsoft.com/cli/azure/manage-azure-subscriptions-azure-cli).

    1. To update the workspace to use the new key, use the following command. Replace `myworkspace` with your Azure Machine Learning workspace name, and replace `myresourcegroup` with the name of the Azure resource group that contains the workspace.

        ```azurecli-interactive
        az ml workspace sync-keys -n myworkspace -g myresourcegroup
        ```

        This command automatically syncs the new keys for the Azure storage account used by the workspace.

1. You can re-register datastore(s) that use the storage account via the SDK or [the Azure Machine Learning studio](https://ml.azure.com).
    1. **To re-register datastores via the Python SDK**, use the values from the [What needs to be updated](#what-needs-to-be-updated) section and the key from step 1 with the following code.
    
        **Applies to: azureml-api-2**

        ```python
        from azure.ai.ml.entities import AzureBlobDatastore, AccountKeyConfiguration
        from azure.ai.ml import MLClient
        from azure.identity import DefaultAzureCredential

        subscription_id = '<SUBSCRIPTION_ID>'
        resource_group = '<RESOURCE_GROUP>'
        workspace_name = '<AZUREML_WORKSPACE_NAME>'

        ml_client = MLClient(credential=DefaultAzureCredential(),
                                subscription_id=subscription_id, 
                                resource_group_name=resource_group,
                                workspace_name=workspace_name)

        blob_datastore1 = AzureBlobDatastore(
            name="your datastore name",
            description="Description",
            account_name="your storage account name",
            container_name="your container name",
            protocol="https",
            credentials=AccountKeyConfiguration(
                account_key="new storage account key"
            ),
        )
        ml_client.create_or_update(blob_datastore1)
        ```

        **Applies to: azureml-api-1**
        Since `overwrite=True` is specified, this code overwrites the existing registration and updates it to use the new key.
    
        ```python
        # Re-register the blob container
        ds_blob = Datastore.register_azure_blob_container(workspace=ws,
                                                  datastore_name='your datastore name',
                                                  container_name='your container name',
                                                  account_name='your storage account name',
                                                  account_key='new storage account key',
                                                  overwrite=True)
        # Re-register file shares
        ds_file = Datastore.register_azure_file_share(workspace=ws,
                                              datastore_name='your datastore name',
                                              file_share_name='your container name',
                                              account_name='your storage account name',
                                              account_key='new storage account key',
                                              overwrite=True)
        
        ```

    
    1. **To re-register datastores via the studio**
        1. In the studio, select **Data** on the left pane under **Assets**.
        1. At the top, select **Datastores**.
        1. Select which datastore you want to update.
        1. Select the **Update credentials** button on the top left. 
        1. Use your new access key from step 1 to populate the form and click **Save**.
        
            If you are updating credentials for your **default datastore**, complete this step and repeat step 2b to resync your new key with the default datastore of the workspace. 

## Next steps

**Applies to: azureml-api-2**
for more information on using datastores, see [Use datastores](how-to-datastore.md).

**Applies to: azureml-api-1**
For more information on registering datastores, see the [`Datastore`](https://learn.microsoft.com/python/api/azureml-core/azureml.core.datastore%28class%29) class reference.
