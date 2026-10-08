---
title: "Quickstart: Azure Blob storage library - TypeScript"
description: In this quickstart, you learn how to use the Azure Blob Storage for TypeScript to create a container and a blob in Blob (object) storage. Next, you learn how to download the blob to your local computer, and how to list all of the blobs in a container.
author: pauljewellmsft
ms.author: pauljewell
ms.date: 09/13/2024
ms.service: azure-blob-storage
ms.topic: quickstart
ms.devlang: typescript
ms.custom:
  - devx-track-js
  - mode-api
  - passwordless-js
  - devx-track-extended-azdevcli
  - devx-track-ts
  - sfi-image-nochange
  - sfi-ropc-nochange
# Customer intent: As a developer learning to manage Azure Blob Storage with TypeScript, I want to install and utilize the Blob Storage client library so that I can create containers, upload and download blobs, and effectively manage my data in the cloud.
---

# Quickstart: Azure Blob Storage client library for Node.js with TypeScript

Get started with the Azure Blob Storage client library for Node.js with TypeScript to manage blobs and containers.

In this article, you follow steps to install the package and try out example code for basic tasks.

[API reference](https://learn.microsoft.com/javascript/api/@azure/storage-blob) |
[Library source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/storage/storage-blob) | [Package (npm)](https://www.npmjs.com/package/@azure/storage-blob) | [Samples](../common/storage-samples-javascript.md?toc=/azure/storage/blobs/toc.json#blob-samples)

## Prerequisites

- Azure account with an active subscription - [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure Storage account - [Create a storage account](../common/storage-account-create.md)
- [Node.js LTS](https://nodejs.org/en/download/package-manager/)
- [TypeScript](https://www.typescriptlang.org/download)

## Setting up

This section walks you through preparing a project to work with the Azure Blob Storage client library for Node.js.

### Create the Node.js project

Create a TypeScript application named *blob-quickstart*.

1. In a console window (such as cmd, PowerShell, or Bash), create a new directory for the project:

    ```console
    mkdir blob-quickstart
    ```

1. Switch to the newly created *blob-quickstart* directory:

    ```console
    cd blob-quickstart
    ```

1. Create a *package.json* file: 

    ```console
    npm init -y
    ```

1. Open the project in Visual Studio Code:

    ```console
    code .
    ```

1. Edit the *package.json* file to add the following properties to support ESM with TypeScript:

    ```json
    "type": "module",
    ```

### Install the packages

From the project directory, install the following packages using the `npm install` command. 

1. Install the Azure Storage npm package:

    ```console
    npm install @azure/storage-blob
    ```

1. Install other dependencies used in this quickstart:

    ```console
    npm install uuid dotenv @types/node @types/uuid
    ```


1. Create a `tsconfig.json` file in the project directory with the following contents. 

    [Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/quickstarts/TypeScript/V12/nodejs/tsconfig.json](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-nodejs-typescript.md)


## Object model

Azure Blob storage is optimized for storing massive amounts of unstructured data. Unstructured data is data that doesn't adhere to a particular data model or definition, such as text or binary data. Blob storage offers three types of resources:

- The storage account
- A container in the storage account
- A blob in the container

The following diagram shows the relationship between these resources.

Diagram of Blob storage architecture.

Use the following JavaScript classes to interact with these resources:

- [BlobServiceClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobserviceclient): The `BlobServiceClient` class allows you to manipulate Azure Storage resources and blob containers.
- [ContainerClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/containerclient): The `ContainerClient` class allows you to manipulate Azure Storage containers and their blobs.
- [BlobClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobclient): The `BlobClient` class allows you to manipulate Azure Storage blobs.

## Code examples

These example code snippets show you how to do the following tasks with the Azure Blob Storage client library for JavaScript:

- [Authenticate to Azure and authorize access to blob data](#authenticate-to-azure-and-authorize-access-to-blob-data)
- [Create a container](#create-a-container)
- [Upload blobs to a container](#upload-blobs-to-a-container)
- [List the blobs in a container](#list-the-blobs-in-a-container)
- [Download blobs](#download-blobs)
- [Delete a container](#delete-a-container)

Sample code is also available on [GitHub](https://github.com/Azure-Samples/AzureStorageSnippets/tree/master/blobs/quickstarts/JavaScript/V12/nodejs).

### Authenticate to Azure and authorize access to blob data


Application requests to Azure Blob Storage must be authorized. Using the `DefaultAzureCredential` class provided by the Azure Identity client library is the recommended approach for implementing passwordless connections to Azure services in your code, including Blob Storage.

You can also authorize requests to Azure Blob Storage by using the account access key. However, this approach should be used with caution. Developers must be diligent to never expose the access key in an unsecure location. Anyone who has the access key is able to authorize requests against the storage account, and effectively has access to all the data. `DefaultAzureCredential` offers improved management and security benefits over the account key to allow passwordless authentication. Both options are demonstrated in the following example.

### [Passwordless (Recommended)](#tab/managed-identity)

`DefaultAzureCredential` supports multiple authentication methods and determines which method should be used at runtime. This approach enables your app to use different authentication methods in different environments (local vs. production) without implementing environment-specific code.

The order and locations in which `DefaultAzureCredential` looks for credentials can be found in the [Azure Identity library overview](https://learn.microsoft.com/javascript/api/overview/azure/identity-readme#defaultazurecredential).

For example, your app can authenticate using your Azure CLI sign-in credentials with when developing locally. Your app can then use a [managed identity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md) once it's deployed to Azure. No code changes are required for this transition.

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


#### Sign in and connect your app code to Azure using DefaultAzureCredential

You can authorize access to data in your storage account using the following steps:

1. Make sure you're authenticated with the same Microsoft Entra account you assigned the role to on your storage account. You can authenticate via the Azure CLI, Visual Studio Code, or Azure PowerShell.

    #### [Azure CLI](#tab/sign-in-azure-cli)

    Sign-in to Azure through the Azure CLI using the following command:

    ```azurecli
    az login
    ```

    #### [Visual Studio Code](#tab/sign-in-visual-studio-code)

    [Install the Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) to work with `DefaultAzureCredential` through Visual Studio Code.

    On the main menu of Visual Studio Code, navigate to **Terminal > New Terminal**.

    Sign-in to Azure through the Azure CLI using the following command:

    ```azurecli
    az login
    ```

    #### [PowerShell](#tab/sign-in-powershell)

    Sign-in to Azure using PowerShell via the following command:

    ```azurepowershell
    Connect-AzAccount
    ```

2. To use `DefaultAzureCredential`, make sure that the **@azure\identity** package is [installed](#install-the-packages), and the class is imported:

    [Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/quickstarts/TypeScript/V12/nodejs/src/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-nodejs-typescript.md)

3. Add this code inside the `try` block. When the code runs on your local workstation, `DefaultAzureCredential` uses the developer credentials of the prioritized tool you're logged into to authenticate to Azure. Examples of these tools include Azure CLI or Visual Studio Code.

    [Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/quickstarts/TypeScript/V12/nodejs/src/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-nodejs-typescript.md)

4. Make sure to update the storage account name, `AZURE_STORAGE_ACCOUNT_NAME`, in the `.env` file or your environment's variables. The storage account name can be found on the overview page of the Azure portal.

    A screenshot showing how to find the storage account name.

    > **Note:**
    > When deployed to Azure, this same code can be used to authorize requests to Azure Storage from an application running in Azure. However, you'll need to enable managed identity on your app in Azure. Then configure your storage account to allow that managed identity to connect. For detailed instructions on configuring this connection between Azure services, see the [Auth from Azure-hosted apps](https://learn.microsoft.com/azure/developer/javascript/sdk/authentication/azure-hosted-apps) tutorial.

### [Connection String](#tab/connection-string)

A connection string includes the storage account access key and uses it to authorize requests. Always be careful to never expose the keys in an unsecure location.

> **Note:**
> To authorize data access with the storage account access key, you'll need permissions for the following Azure RBAC action: [Microsoft.Storage/storageAccounts/listkeys/action](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/permissions/storage.md#microsoftstorage). The least privileged built-in role with permissions for this action is [Reader and Data Access](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#reader-and-data-access), but any role which includes this action will work.


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

**.env file**:

```bash
AZURE_STORAGE_CONNECTION_STRING="<yourconnectionstring>"
```

The following code retrieves the connection string for the storage account from the environment variable created earlier, and uses the connection string to construct a service client object.

Add this code inside a `try/catch` block:

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/quickstarts/TypeScript/V12/nodejs/src/index-with-connection-string.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-nodejs-typescript.md)

> **Important:**
> The account access key should be used with caution. If your account access key is lost or accidentally placed in an insecure location, your service may become vulnerable. Anyone who has the access key is able to authorize requests against the storage account, and effectively has access to all the data. `DefaultAzureCredential` provides enhanced security features and benefits and is the recommended approach for managing authorization to Azure services.

---

## Create a container

Create a new container in the storage account. The following code example takes a [BlobServiceClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobserviceclient) object and calls the [getContainerClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blobserviceclient#getcontainerclient-string-) method to get a reference to a container. Then, the code calls the [create](https://learn.microsoft.com/javascript/api/@azure/storage-blob/containerclient#create-containercreateoptions-) method to actually create the container in your storage account.

Add this code to the end of the `try` block:

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/quickstarts/TypeScript/V12/nodejs/src/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-nodejs-typescript.md)

To learn more about creating a container, and to explore more code samples, see [Create a blob container with JavaScript](storage-blob-container-create-javascript.md).

> **Important:**
> Container names must be lowercase. For more information about naming containers and blobs, see [Naming and Referencing Containers, Blobs, and Metadata](https://learn.microsoft.com/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata).

## Upload blobs to a container

Upload a blob to the container. The following code gets a reference to a [BlockBlobClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobclient) object by calling the [getBlockBlobClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/containerclient#getblockblobclient-string-) method on the [ContainerClient](https://learn.microsoft.com/javascript/api/@azure/storage-blob/containerclient) from the [Create a container](#create-a-container) section.

The code uploads the text string data to the blob by calling the [upload](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobclient#upload-httprequestbody--number--blockblobuploadoptions-) method.

Add this code to the end of the `try` block:

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/quickstarts/TypeScript/V12/nodejs/src/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-nodejs-typescript.md)

To learn more about uploading blobs, and to explore more code samples, see [Upload a blob with JavaScript](storage-blob-upload-javascript.md).

## List the blobs in a container

List the blobs in the container. The following code calls the [listBlobsFlat](https://learn.microsoft.com/javascript/api/@azure/storage-blob/containerclient#listblobsflat-containerlistblobsoptions-) method. In this case, only one blob is in the container, so the listing operation returns just that one blob.

Add this code to the end of the `try` block:

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/quickstarts/TypeScript/V12/nodejs/src/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-nodejs-typescript.md)

To learn more about listing blobs, and to explore more code samples, see [List blobs with JavaScript](storage-blobs-list-javascript.md).

## Download blobs

Download the blob and display the contents. The following code calls the [download](https://learn.microsoft.com/javascript/api/@azure/storage-blob/blockblobclient#download-undefined---number--undefined---number--blobdownloadoptions-) method to download the blob.

Add this code to the end of the `try` block:

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/quickstarts/TypeScript/V12/nodejs/src/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-nodejs-typescript.md)

The following code converts a stream back into a string to display the contents.

Add this code *after* the `main` function:

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets/blobs/quickstarts/TypeScript/V12/nodejs/src/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-nodejs-typescript.md)

To learn more about downloading blobs, and to explore more code samples, see [Download a blob with JavaScript](storage-blob-download-javascript.md).

## Delete a container

Delete the container and all blobs within the container. The following code cleans up the resources created by the app by removing the entire container using the [​delete](https://learn.microsoft.com/javascript/api/@azure/storage-blob/containerclient#delete-containerdeletemethodoptions-) method.

Add this code to the end of the `try` block:

[Code reference unavailable in this source snapshot: ~/azure_storage-snippets//blobs/quickstarts/TypeScript/V12/nodejs/src/index.ts](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-nodejs-typescript.md)

To learn more about deleting a container, and to explore more code samples, see [Delete and restore a blob container with JavaScript](storage-blob-container-delete-javascript.md).

## Run the code

1. From a Visual Studio Code terminal, build the app.

    ```console
    tsc
    ```

1. Run the app.

    ```console
    node dist/index.js
    ```

1. The output of the app is similar to the following example:
    
    ```output
    Azure Blob storage - JavaScript quickstart sample
        
    Creating container...
        quickstart4a0780c0-fb72-11e9-b7b9-b387d3c488da
        
    Uploading to Azure Storage as blob:
        quickstart4a3128d0-fb72-11e9-b7b9-b387d3c488da.txt
        
    Listing blobs...
        quickstart4a3128d0-fb72-11e9-b7b9-b387d3c488da.txt
        
    Downloaded blob content...
        Hello, World!
        
    Deleting container...
    Done
    ```

Step through the code in your debugger and check your [Azure portal](https://portal.azure.com) throughout the process. Check to see that the container is being created. You can open the blob inside the container and view the contents.

## Clean up resources

1. When you're done with this quickstart, delete the `blob-quickstart` directory.
1. If you're done using your Azure Storage resource, use the [Azure CLI to remove the Storage resource](storage-quickstart-blobs-cli.md#clean-up-resources). 

## Next step

> 
> [Azure Storage samples and developer guides for JavaScript and TypeScript](../common/storage-samples-javascript.md?toc=/azure/storage/blobs/toc.json)
