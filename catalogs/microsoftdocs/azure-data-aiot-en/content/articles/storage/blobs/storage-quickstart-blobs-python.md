---
title: "Quickstart: Azure Blob Storage with Python"
titleSuffix: Azure Storage
description: Learn how to use the Azure Blob Storage client library for Python to create containers, upload and download blobs, and list data.
author: stevenmatthew
ms.author: shaas
ms.date: 05/15/2026
ms.topic: quickstart
ms.service: azure-blob-storage
ms.devlang: python
ai-usage: ai-assisted
zone_pivot_groups: azure-blob-storage-quickstart-options
ms.custom:
  - devx-track-python
  - mode-api
  - passwordless-python
  - ai-video-demo
  - devx-track-extended-azdevcli
  - sfi-ropc-nochange
# Customer intent: As a developer, I want to quickly set up and manage Azure Blob Storage using Python, so that I can efficiently store and manipulate unstructured data in my applications.
---

# Quickstart: Azure Blob Storage client library for Python

**Applies to: blob-storage-quickstart-scratch**


> **Note:**
> The **Build from scratch** option walks you step by step through the process of creating a new project, installing packages, writing the code, and running a basic console app. This approach is recommended if you want to understand all the details involved in creating an app that connects to Azure Blob Storage. If you prefer to automate deployment tasks and start with a completed project, choose [Start with a template](storage-quickstart-blobs-python.md?pivots=blob-storage-quickstart-template).



**Applies to: blob-storage-quickstart-template**


> **Note:**
> The **Start with a template** option uses the Azure Developer CLI to automate deployment tasks and starts you off with a completed project. This approach is recommended if you want to explore the code as quickly as possible without going through the setup tasks. If you prefer step by step instructions to build the app, choose [Build from scratch](storage-quickstart-blobs-python.md?pivots=blob-storage-quickstart-scratch).



Get started with the Azure Blob Storage client library for Python to manage blobs and containers.

**Applies to: blob-storage-quickstart-scratch**


In this article, you follow steps to install the package and try out example code for basic tasks.



**Applies to: blob-storage-quickstart-template**


In this article, you use the [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/overview) to deploy Azure resources and run a completed console app with just a few commands.



[API reference documentation](https://learn.microsoft.com/python/api/azure-storage-blob) | [Library source code](https://github.com/Azure/azure-sdk-for-python/tree/master/sdk/storage/azure-storage-blob) | [Package (PyPi)](https://pypi.org/project/azure-storage-blob/) | [Samples](../common/storage-samples-python.md?toc=/azure/storage/blobs/toc.json#blob-samples)

**Applies to: blob-storage-quickstart-scratch**


This video shows you how to start using the Azure Blob Storage client library for Python.
> [!VIDEO f663a554-96ca-4bc3-b3b1-48376a7efbdf]

The steps in the video are also described in the following sections.



## Prerequisites

**Applies to: blob-storage-quickstart-scratch**


- Azure account with an active subscription - [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure Storage account - [create a storage account](../common/storage-account-create.md)
- [Python](https://www.python.org/downloads/) 3.8+



**Applies to: blob-storage-quickstart-template**


- Azure subscription - [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- [Python](https://www.python.org/downloads/) 3.8+
- [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd)



## Setting up

**Applies to: blob-storage-quickstart-scratch**


This section walks you through preparing a project to work with the Azure Blob Storage client library for Python.

### Create the project

Create a Python application named *blob-quickstart*.

1. In a console window (such as PowerShell or Bash), create a new directory for the project:

    ```console
    mkdir blob-quickstart
    ```

1. Switch to the newly created *blob-quickstart* directory:

    ```console
    cd blob-quickstart
    ```

### Install the packages

From the project directory, install packages for the Azure Blob Storage and Azure Identity client libraries by using the `pip install` command. You need the **azure-identity** package for passwordless connections to Azure services.

```console
pip install azure-storage-blob azure-identity
```

### Set up the app framework

From the project directory, follow these steps to create the basic structure of the app:

1. Open a new text file in your code editor.
1. Add `import` statements, create the structure for the program, and include basic exception handling, as shown in the following example.
1. Save the new file as *blob_quickstart.py* in the *blob-quickstart* directory.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/quickstarts/python/app-framework-qs.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-python.md)



**Applies to: blob-storage-quickstart-template**


When you install [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd), you can create a storage account and run the sample code with just a few commands. You can run the project in your local development environment, or in a [DevContainer](https://code.visualstudio.com/docs/devcontainers/containers).

### Initialize the Azure Developer CLI template and deploy resources

From an empty directory, follow these steps to initialize the `azd` template, provision Azure resources, and get started with the code:

- Clone the quickstart repository assets from GitHub and initialize the template locally:

    ```console
    azd init --template blob-storage-quickstart-python
    ```

    You're prompted for the following information:

    - **Environment name**: Azure Developer CLI uses this value as a prefix for all Azure resources it creates. The name must be unique across all Azure subscriptions and be between 3 and 24 characters long. The name can contain numbers and lowercase letters only.

- Sign in to Azure:

    ```console
    azd auth login
    ```
- Provision and deploy the resources to Azure:

    ```console
    azd up
    ```

    You're prompted for the following information:

    - **Subscription**: The Azure subscription that your resources are deployed to.
    - **Location**: The Azure region where your resources are deployed.

    The deployment might take a few minutes to complete. The output from the `azd up` command includes the name of the newly created storage account, which you need later to run the code.

## Run the sample code

At this point, you've deployed the resources to Azure and the code is almost ready to run. Follow these steps to install packages, update the name of the storage account in the code, and run the sample console app:

- **Install packages**: In the local directory, install packages for the Azure Blob Storage and Azure Identity client libraries by running the following command: `pip install azure-storage-blob azure-identity`
- **Update the storage account name**: In the local directory, edit the file named **blob_quickstart.py**. Find the `<storage-account-name>` placeholder and replace it with the actual name of the storage account created by the `azd up` command. Save the changes.
- **Run the project**: Run the following command to run the app: `python blob_quickstart.py`.
- **Observe the output**: This app creates a test file in your local *data* folder and uploads it to a container in the storage account. The example then lists the blobs in the container and downloads the file with a new name so that you can compare the old and new files. 

To learn more about how the sample code works, see [Code examples](#code-examples).

When you're finished testing the code, see the [Clean up resources](#clean-up-resources) section to delete the resources created by the `azd up` command.



## Object model

Azure Blob Storage is optimized for storing massive amounts of unstructured data. Unstructured data is data that doesn't adhere to a particular data model or definition, such as text or binary data. Blob storage offers three types of resources:

- The storage account
- A container in the storage account
- A blob in the container

The following diagram shows the relationship between these resources:

Screenshot of Blob storage architecture showing a storage account, a container, and blobs.

Use the following Python classes to interact with these resources:

- [BlobServiceClient](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobserviceclient): Use the `BlobServiceClient` class to work with Azure Storage resources and blob containers.
- [ContainerClient](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containerclient): Use the `ContainerClient` class to work with Azure Storage containers and their blobs.
- [BlobClient](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient): Use the `BlobClient` class to work with Azure Storage blobs.

## Code examples

These example code snippets show you how to do the following tasks with the Azure Blob Storage client library for Python:

- [Authenticate to Azure and authorize access to blob data](#authenticate-to-azure-and-authorize-access-to-blob-data)
- [Create a container](#create-a-container)
- [Upload blobs to a container](#upload-blobs-to-a-container)
- [List the blobs in a container](#list-the-blobs-in-a-container)
- [Download blobs](#download-blobs)
- [Delete a container](#delete-a-container)

**Applies to: blob-storage-quickstart-template**


> **Note:**
> The Azure Developer CLI template includes a file with sample code already in place. The following examples provide detail for each part of the sample code. The template implements the recommended passwordless authentication method, as described in the [Authenticate to Azure](#authenticate-to-azure-and-authorize-access-to-blob-data) section. The connection string method is shown as an alternative, but isn't used in the template and isn't recommended for production code.



### Authenticate to Azure and authorize access to blob data


Application requests to Azure Blob Storage must be authorized. Using the `DefaultAzureCredential` class provided by the Azure Identity client library is the recommended approach for implementing passwordless connections to Azure services in your code, including Blob Storage.

You can also authorize requests to Azure Blob Storage by using the account access key. However, this approach should be used with caution. Developers must be diligent to never expose the access key in an unsecure location. Anyone who has the access key is able to authorize requests against the storage account, and effectively has access to all the data. `DefaultAzureCredential` offers improved management and security benefits over the account key to allow passwordless authentication. Both options are demonstrated in the following example.

### [Passwordless (Recommended)](#tab/managed-identity)

`DefaultAzureCredential` supports multiple authentication methods and determines which method to use at runtime. This approach enables your app to use different authentication methods in different environments (local vs. production) without implementing environment-specific code.

You can find the order and locations where `DefaultAzureCredential` looks for credentials in the [Azure Identity library overview](https://learn.microsoft.com/python/api/overview/azure/identity-readme#defaultazurecredential).

For example, your app can authenticate by using your Azure CLI sign-in credentials when developing locally. Your app can then use a [managed identity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md) once it’s deployed to Azure. No code changes are required for this transition.

<a name='assign-roles-to-your-azure-ad-user-account'></a>

#### Assign roles to your Microsoft Entra user account


When developing locally, make sure that the user account that is accessing blob data has the correct permissions. You'll need **Storage Blob Data Contributor** to read and write blob data. To assign yourself this role, you'll need to be assigned the **User Access Administrator** role, or another role that includes the **Microsoft.Authorization/roleAssignments/write** action. You can assign Azure RBAC roles to a user using the Azure portal, Azure CLI, or Azure PowerShell. For more information about the **Storage Blob Data Contributor** role, see [Storage Blob Data Contributor](https://learn.microsoft.com/azure/role-based-access-control/built-in-roles/storage#storage-blob-data-contributor). For more information about the available scopes for role assignments, see [Understand scope for Azure RBAC](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/scope-overview.md).

In this scenario, you'll assign permissions to your user account, scoped to the storage account, to follow the [Principle of Least Privilege](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/secure-least-privileged-access.md). This practice gives users only the minimum permissions needed and creates more secure production environments.

The following example will assign the **Storage Blob Data Contributor** role to your user account, which provides both read and write access to blob data in your storage account.

> **Important:**
> In most cases it will take a minute or two for the role assignment to propagate in Azure, but in rare cases it may take up to eight minutes. If you receive authentication errors when you first run your code, wait a few moments and try again.

### [Azure portal](#tab/roles-azure-portal)

1. In the Azure portal, locate your storage account using the main search bar or left navigation.

2. On the storage account overview page, select **Access control (IAM)** from the left-hand menu.

3. On the **Access control (IAM)** page, select the **Role assignments** tab.

4. Select **+ Add** from the top menu and then **Add role assignment** from the resulting drop-down menu.

    A screenshot showing how to assign a role.

5. Use the search box to filter the results to the desired role. For this example, search for *Storage Blob Data Contributor* and select the matching result and then choose **Next**.

6. Under **Assign access to**, select **User, group, or service principal**, and then choose **+ Select members**.

7. In the dialog, search for your Microsoft Entra username (usually your *user@domain* email address) and then choose **Select** at the bottom of the dialog.

8. Select **Review + assign** to go to the final page, and then **Review + assign** again to complete the process.

### [Azure CLI](#tab/roles-azure-cli)

To assign a role at the resource level using the Azure CLI, you first must retrieve the resource id using the `az storage account show` command. You can filter the output properties using the `--query` parameter.

```azurecli
az storage account show --resource-group '<your-resource-group-name>' --name '<your-storage-account-name>' --query id
```

Copy the output `Id` from the preceding command. You can then assign roles using the [az role](https://learn.microsoft.com/cli/azure/role) command of the Azure CLI.

```azurecli
az role assignment create --assignee "<user@domain>" \
    --role "Storage Blob Data Contributor" \
    --scope "<your-resource-id>"
```

### [PowerShell](#tab/roles-powershell)

To assign a role at the resource level using Azure PowerShell, you first must retrieve the resource ID using the `Get-AzResource` command.

```azurepowershell
Get-AzResource -ResourceGroupName "<yourResourceGroupname>" -Name "<yourStorageAccountName>"
```

Copy the `Id` value from the preceding command output. You can then assign roles using the [New-AzRoleAssignment](https://learn.microsoft.com/powershell/module/az.resources/new-azroleassignment) command in PowerShell.

```azurepowershell
New-AzRoleAssignment -SignInName <user@domain> `
    -RoleDefinitionName "Storage Blob Data Contributor" `
    -Scope <yourStorageAccountId>
```

---


#### Sign in and connect your app code to Azure by using DefaultAzureCredential

To authorize access to data in your storage account, use the following steps:

1. Make sure you're authenticated with the same Microsoft Entra account you assigned the role to on your storage account. You can authenticate via the Azure CLI, Visual Studio Code, or Azure PowerShell.

    #### [Azure CLI](#tab/sign-in-azure-cli)

    Sign in to Azure through the Azure CLI by using the following command:

    ```azurecli
    az login
    ```

    #### [Visual Studio Code](#tab/sign-in-visual-studio-code)

    To work with `DefaultAzureCredential` through Visual Studio Code, [install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli).

    On the main menu of Visual Studio Code, go to **Terminal** > **New Terminal**.

    Sign in to Azure through the Azure CLI by using the following command:

    ```azurecli
    az login
    ```

    #### [PowerShell](#tab/sign-in-powershell)

    Sign in to Azure by using PowerShell via the following command:

    ```azurepowershell
    Connect-AzAccount
    ```

1. To use `DefaultAzureCredential`, make sure that the **azure-identity** package is [installed](#install-the-packages), and the class is imported:

    ```python
    from azure.identity import DefaultAzureCredential
    from azure.storage.blob import BlobServiceClient
    ```

1. Add this code inside the `try` block. When the code runs on your local workstation, `DefaultAzureCredential` uses the developer credentials of the prioritized tool you're signed in to authenticate to Azure. Examples of these tools include Azure CLI or Visual Studio Code.

    [Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/quickstarts/python/blob-quickstart.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-python.md)

1. Update the storage account name in the URI of your `BlobServiceClient` object. You can find the storage account name on the overview page of the Azure portal.

    Screenshot of the Azure portal page highlighting the storage account name.

    > **Note:**
    > When deployed to Azure, this same code can authorize requests to Azure Storage from an application running in Azure. However, you need to enable managed identity on your app in Azure. Then configure your storage account to allow that managed identity to connect. For detailed instructions on configuring this connection between Azure services, see the [Auth from Azure-hosted apps](https://learn.microsoft.com/azure/developer/python/sdk/authentication-azure-hosted-apps) tutorial.

### [Connection String](#tab/connection-string)

A connection string includes the storage account access key and uses it to authorize requests. Always be careful to never expose the keys in an unsecure location.

> **Note:**
> To authorize data access with the storage account access key, you need permissions for the following Azure RBAC action: [Microsoft.Storage/storageAccounts/listkeys/action](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/permissions/storage.md#microsoftstorage). The least privileged built-in role with permissions for this action is [Reader and Data Access](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#reader-and-data-access), but any role that includes this action works.


### [Azure portal](#tab/roles-azure-portal)

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Locate your storage account.
1. In the storage account menu pane, under **Security + networking**, select **Access keys**. Here, you can view the account access keys and the complete connection string for each key. 
1. In the **Access keys** pane, select **Show keys**.
1. In the **key1** section, locate the **Connection string** value. Select the **Copy to clipboard** icon to copy the connection string. You'll add the connection string value to an environment variable in the next section.

    Screenshot showing how to copy a connection string from the Azure portal.

### [Azure CLI](#tab/roles-azure-cli)

You can see the connection string for your storage account using the [az storage account show-connection-string](https://learn.microsoft.com/cli/azure/storage/account) command.

```azurecli
az storage account show-connection-string --name "<your-storage-account-name>"
```

### [PowerShell](#tab/roles-powershell)

You can assemble a connection string with PowerShell using the [Get-AzStorageAccount](https://learn.microsoft.com/powershell/module/az.storage/Get-azStorageAccount) and [Get-AzStorageAccountKey](https://learn.microsoft.com/powershell/module/az.Storage/Get-azStorageAccountKey) commands.

```powershell
$saName = "yourStorageAccountName"
$rgName = "yourResourceGroupName"
$sa = Get-AzStorageAccount -StorageAccountName $saName -ResourceGroupName $rgName

$saKey = (Get-AzStorageAccountKey -ResourceGroupName $rgName -Name $saName)[0].Value

'DefaultEndpointsProtocol=https;AccountName=' + $saName + ';AccountKey=' + $saKey + ';EndpointSuffix=core.windows.net'
```

#### Configure your storage connection string

After you copy the connection string, write it to a new environment variable on the local machine running the application. To set the environment variable, open a console window, and follow the instructions for your operating system. Replace `<yourconnectionstring>` with your actual connection string.

**Windows**:

```cmd
setx AZURE_STORAGE_CONNECTION_STRING "<yourconnectionstring>"
```

After you add the environment variable in Windows, you must start a new instance of the command window.

**Linux**:

```bash
export AZURE_STORAGE_CONNECTION_STRING="<yourconnectionstring>"
```

The following code retrieves the connection string for the storage account from the environment variable you created earlier, and uses the connection string to construct a service client object.

Add this code inside the `try` block:

```python
# Retrieve the connection string for use with the application. The storage
# connection string is stored in an environment variable on the machine
# running the application called AZURE_STORAGE_CONNECTION_STRING. If the environment variable is
# created after the application is launched in a console or with Visual Studio,
# the shell or application needs to be closed and reloaded to take the
# environment variable into account.
connect_str = os.getenv('AZURE_STORAGE_CONNECTION_STRING')

# Create the BlobServiceClient object
blob_service_client = BlobServiceClient.from_connection_string(connect_str)
```

> **Important:**
> Use the account access key with caution. If your account access key is lost or accidentally placed in an insecure location, your service becomes vulnerable. Anyone who has the access key can authorize requests against the storage account, and effectively has access to all the data. `DefaultAzureCredential` provides enhanced security features and benefits and is the recommended approach for managing authorization to Azure services.

---

### Create a container

Create a new container in your storage account by calling the [create_container](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobserviceclient#azure-storage-blob-blobserviceclient-create-container) method on the `blob_service_client` object. In this example, the code appends a GUID value to the container name to ensure that it's unique.

**Applies to: blob-storage-quickstart-scratch**


Add this code to the end of the `try` block:



[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/quickstarts/python/blob-quickstart.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-python.md)

To learn more about creating a container, and to explore more code samples, see [Create a blob container with Python](storage-blob-container-create-python.md).

> **Important:**
> Container names must be lowercase. For more information about naming containers and blobs, see [Naming and Referencing Containers, Blobs, and Metadata](https://learn.microsoft.com/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata).

### Upload blobs to a container

Upload a blob to a container by using [upload_blob](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.blobclient#azure-storage-blob-blobclient-upload-blob). The example code creates a text file in the local *data* directory to upload to the container.

**Applies to: blob-storage-quickstart-scratch**


Add this code to the end of the `try` block:



[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/quickstarts/python/blob-quickstart.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-python.md)

To learn more about uploading blobs and to explore more code samples, see [Upload a blob with Python](storage-blob-upload-python.md).

### List the blobs in a container

List the blobs in the container by calling the [list_blobs](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containerclient#azure-storage-blob-containerclient-list-blobs) method. In this case, only one blob has been added to the container, so the listing operation returns just that one blob.

**Applies to: blob-storage-quickstart-scratch**


Add this code to the end of the `try` block:



[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/quickstarts/python/blob-quickstart.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-python.md)

To learn more about listing blobs and to explore more code samples, see [List blobs with Python](storage-blobs-list-python.md).

### Download blobs

Download the previously created blob by calling the [download_blob](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containerclient#azure-storage-blob-containerclient-download-blob) method. The example code adds a suffix of "DOWNLOAD" to the file name so that you can see both files in local file system.

**Applies to: blob-storage-quickstart-scratch**


Add this code to the end of the `try` block:



[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/quickstarts/python/blob-quickstart.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-python.md)

To learn more about downloading blobs, and to explore more code samples, see [Download a blob with Python](storage-blob-download-python.md).

### Delete a container

The following code cleans up the resources the app created by removing the entire container by using the [​delete_container](https://learn.microsoft.com/python/api/azure-storage-blob/azure.storage.blob.containerclient#azure-storage-blob-containerclient-delete-container) method. You can also delete the local files if you want.

The app pauses for user input by calling `input()` before it deletes the blob, container, and local files. Verify that the resources were created correctly before they're deleted.

**Applies to: blob-storage-quickstart-scratch**


Add this code to the end of the `try` block:



[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/quickstarts/python/blob-quickstart.py](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-python.md)

To learn more about deleting a container and to explore more code samples, see [Delete and restore a blob container with Python](storage-blob-container-delete-python.md).

**Applies to: blob-storage-quickstart-scratch**


## Run the code

This app creates a test file in your local folder and uploads it to Azure Blob Storage. The example then lists the blobs in the container, and downloads the file with a new name. You can compare the old and new files.

Go to the directory containing the *blob_quickstart.py* file, and run the following `python` command to run the app:

```console
python blob_quickstart.py
```

The output of the app is similar to the following example (UUID values omitted for readability):

```output
Azure Blob Storage Python quickstart sample

Uploading to Azure Storage as blob:
        quickstartUUID.txt

Listing blobs...
        quickstartUUID.txt

Downloading blob to
        ./data/quickstartUUIDDOWNLOAD.txt

Press the Enter key to begin clean up

Deleting blob container...
Deleting the local source and downloaded files...
Done
```

Before you begin the cleanup process, check your *data* folder for the two files. You can compare them and see that they're identical.



## Clean up resources

**Applies to: blob-storage-quickstart-scratch**


After you verify the files and finish testing, press **Enter** to delete the test files along with the container you created in the storage account. You can also use [Azure CLI](storage-quickstart-blobs-cli.md#clean-up-resources) to delete resources.



**Applies to: blob-storage-quickstart-template**


When you're done with the quickstart, clean up the resources you created by running the following command:

```console
azd down
```

You'll be prompted to confirm the deletion of the resources. Enter `y` to confirm.



## Next step

> 
> [Azure Storage samples and developer guides for Python](../common/storage-samples-python.md?toc=/azure/storage/blobs/toc.json)
