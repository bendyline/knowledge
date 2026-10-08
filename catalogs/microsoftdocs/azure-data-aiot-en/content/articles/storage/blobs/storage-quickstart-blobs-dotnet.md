---
title: "Quickstart: Azure Blob Storage Client Library for .NET"
description: Learn how to use the Azure Blob Storage client library for .NET to create a container, upload and download blobs, and list blobs.
author: stevenmatthew
ms.author: shaas
ms.date: 05/18/2026
ms.service: azure-blob-storage
ms.topic: quickstart
ms.devlang: csharp
ms.custom: devx-track-csharp, mode-api, passwordless-dotnet, devx-track-dotnet, ai-video-demo, devx-track-extended-azdevcli
ai-usage: ai-assisted
zone_pivot_groups: azure-blob-storage-quickstart-options
# Customer intent: As a .NET developer, I want to create and manage blob storage in Azure using the client library, so that I can efficiently store and retrieve large amounts of unstructured data for my applications.
---

# Quickstart: Azure Blob Storage client library for .NET

**Applies to: blob-storage-quickstart-scratch**


> **Note:**
> The **Build from scratch** option walks you step by step through the process of creating a new project, installing packages, writing the code, and running a basic console app. This approach is recommended if you want to understand all the details involved in creating an app that connects to Azure Blob Storage. If you prefer to automate deployment tasks and start with a completed project, choose [Start with a template](storage-quickstart-blobs-dotnet.md?pivots=blob-storage-quickstart-template).



**Applies to: blob-storage-quickstart-template**


> **Note:**
> The **Start with a template** option uses the Azure Developer CLI to automate deployment tasks and starts you off with a completed project. This approach is recommended if you want to explore the code as quickly as possible without going through the setup tasks. If you prefer step by step instructions to build the app, choose [Build from scratch](storage-quickstart-blobs-dotnet.md?pivots=blob-storage-quickstart-scratch).



This quickstart shows you how to use the Azure Blob Storage client library for .NET to create a container, upload and download blobs, and list blobs in a container.

**Applies to: blob-storage-quickstart-scratch**


In this article, you follow steps to install the package and try out example code for basic tasks.



**Applies to: blob-storage-quickstart-template**


In this article, you use the [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/overview) to deploy Azure resources and run a completed console app with just a few commands.



[API reference documentation](https://learn.microsoft.com/dotnet/api/azure.storage.blobs) | [Library source code](https://github.com/Azure/azure-sdk-for-net/tree/master/sdk/storage/Azure.Storage.Blobs) | [Package (NuGet)](https://www.nuget.org/packages/Azure.Storage.Blobs) | [Samples](../common/storage-samples-dotnet.md?toc=/azure/storage/blobs/toc.json#blob-samples)

**Applies to: blob-storage-quickstart-scratch**


This video shows you how to start using the Azure Blob Storage client library for .NET.
> [!VIDEO cdae65e7-1892-48fe-934a-70edfbe147be]

The steps in the video are also described in the following sections.



## Prerequisites

**Applies to: blob-storage-quickstart-scratch**


- Azure subscription - [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure storage account - [create a storage account](../common/storage-account-create.md)
- Latest [.NET SDK](https://dotnet.microsoft.com/download/dotnet) for your operating system. Be sure to get the SDK and not the runtime.



**Applies to: blob-storage-quickstart-template**


- Azure subscription - [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Latest [.NET SDK](https://dotnet.microsoft.com/download/dotnet) for your operating system. This code sample uses .NET 8.0. Be sure to get the SDK and not the runtime.
- [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd)



## Setting up

**Applies to: blob-storage-quickstart-scratch**


This section walks you through preparing a project to work with the Azure Blob Storage client library for .NET.

### Create the project

Create a .NET console app using either the .NET CLI or Visual Studio 2022.

### [Visual Studio 2022](#tab/visual-studio)

1. At the top of Visual Studio, go to **File** > **New** > **Project**.

1. In the dialog window, enter *console app* into the project template search box and select the first result. Choose **Next** at the bottom of the dialog.

    Screenshot of creating a new console app project in Visual Studio.

1. For the **Project Name**, enter *BlobQuickstart*. Keep the default values for the rest of the fields and select **Next**.

1. For the **Framework**, make sure the latest installed version of .NET is selected. Then choose **Create**. The new project opens inside the Visual Studio environment.

### [.NET CLI](#tab/net-cli)

1. In a console window (such as cmd, PowerShell, or Bash), use the `dotnet new` command to create a new console app with the name *BlobQuickstart*. This command creates a simple "Hello World" C# project with a single source file: *Program.cs*.

   ```dotnetcli
   dotnet new console -n BlobQuickstart
   ```

1. Switch to the newly created *BlobQuickstart* directory.

   ```console
   cd BlobQuickstart
   ```

1. Open the project in your preferred code editor. To open the project in:
    * Visual Studio, locate and double-click the `BlobQuickStart.csproj` file.
    * Visual Studio Code, run the following command:

    ```bash
    code .
    ```
---

### Install the package

To interact with Azure Blob Storage, install the Azure Blob Storage client library for .NET.

### [Visual Studio 2022](#tab/visual-studio)

1. In **Solution Explorer**, right-click the **Dependencies** node of your project. Select **Manage NuGet Packages**.

1. In the resulting window, search for *Azure.Storage.Blobs*. Select the appropriate result, and select **Install**.

    Screenshot of installing a NuGet package in Visual Studio.

### [.NET CLI](#tab/net-cli)

Use the following command to install the `Azure.Storage.Blobs` package:

```dotnetcli
dotnet add package Azure.Storage.Blobs
```

If this command to add the package fails, follow these steps:

- Make sure that `nuget.org` is added as a package source. You can list the package sources using the [`dotnet nuget list source`](https://learn.microsoft.com/dotnet/core/tools/dotnet-nuget-list-source#examples) command:

    ```dotnetcli
    dotnet nuget list source
    ```

- If you don't see `nuget.org` in the list, add it by using the [`dotnet nuget add source`](https://learn.microsoft.com/dotnet/core/tools/dotnet-nuget-add-source#examples) command:

    ```dotnetcli
    dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org
    ```

Now that the package source is updated, run the command to install the package.

---

### Set up the app code

Replace the starting code in the `Program.cs` file so that it matches the following example, which includes the necessary `using` statements for this exercise.

```csharp
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using System;
using System.IO;

// See https://aka.ms/new-console-template for more information
Console.WriteLine("Hello, World!");
```



**Applies to: blob-storage-quickstart-template**


When you install [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd), you can create a storage account and run the sample code with just a few commands. You can run the project in your local development environment, or in a [DevContainer](https://code.visualstudio.com/docs/devcontainers/containers).

### Initialize the Azure Developer CLI template and deploy resources

From an empty directory, follow these steps to initialize the `azd` template, provision Azure resources, and get started with the code:

- Clone the quickstart repository assets from GitHub and initialize the template locally:

    ```console
    azd init --template blob-storage-quickstart-dotnet
    ```

    You're prompted for the following information:

    - **Environment name**: Azure Developer CLI uses this value as a prefix for all Azure resources it creates. The name must be unique across all Azure subscriptions and be between 3 and 24 characters long. The name can contain numbers and lowercase letters only.

- Log in to Azure:

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

At this point, you've deployed the resources to Azure and the project is ready to run. Follow these steps to update the name of the storage account in the code and run the sample console app:

- **Update the storage account name**: Go to the `src` directory and edit `Program.cs`. Find the `<storage-account-name>` placeholder and replace it with the actual name of the storage account created by the `azd up` command. Save your changes.
- **Run the project**: If you're using Visual Studio, press F5 to build and run the code and interact with the console app. If you're using the .NET CLI, go to your application directory, build the project by using `dotnet build`, and run the application by using `dotnet run`.
- **Observe the output**: This app creates a test file in your local *data* folder and uploads it to a container in the storage account. The example then lists the blobs in the container and downloads the file with a new name so that you can compare the old and new files. 

To learn more about how the sample code works, see [Code examples](#code-examples).

When you're finished testing the code, see the [Clean up resources](#clean-up-resources) section to delete the resources created by the `azd up` command.



## Object model

Azure Blob Storage is optimized for storing massive amounts of unstructured data. Unstructured data doesn't adhere to a particular data model or definition, such as text or binary data. Blob storage offers three types of resources:

- The storage account
- A container in the storage account
- A blob in the container

The following diagram shows the relationship between these resources.

Diagram of Blob storage architecture.

Use the following .NET classes to interact with these resources:

- [BlobServiceClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobserviceclient): Use the `BlobServiceClient` class to work with Azure Storage resources and blob containers.
- [BlobContainerClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient): Use the `BlobContainerClient` class to work with Azure Storage containers and their blobs.
- [BlobClient](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient): Use the `BlobClient` class to work with Azure Storage blobs.

## Code examples

The sample code snippets in the following sections demonstrate how to perform the following tasks with the Azure Blob Storage client library for .NET:

- [Authenticate to Azure and authorize access to blob data](#authenticate-to-azure-and-authorize-access-to-blob-data)
- [Create a container](#create-a-container)
- [Upload a blob to a container](#upload-a-blob-to-a-container)
- [List blobs in a container](#list-blobs-in-a-container)
- [Download a blob](#download-a-blob)
- [Delete a container](#delete-a-container)

**Applies to: blob-storage-quickstart-scratch**


> **Important:**
> Make sure you install the correct NuGet packages and add the necessary using statements for the code samples to work, as described in the [setting up](#setting-up) section.



**Applies to: blob-storage-quickstart-template**


> **Note:**
> The Azure Developer CLI template includes a project with sample code already in place. The following examples provide detail for each part of the sample code. The template implements the recommended passwordless authentication method, as described in the [Authenticate to Azure](#authenticate-to-azure-and-authorize-access-to-blob-data) section. The connection string method is shown as an alternative, but isn't used in the template and isn't recommended for production code.




### Authenticate to Azure and authorize access to blob data


Application requests to Azure Blob Storage must be authorized. Using the `DefaultAzureCredential` class provided by the Azure Identity client library is the recommended approach for implementing passwordless connections to Azure services in your code, including Blob Storage.

You can also authorize requests to Azure Blob Storage by using the account access key. However, this approach should be used with caution. Developers must be diligent to never expose the access key in an unsecure location. Anyone who has the access key is able to authorize requests against the storage account, and effectively has access to all the data. `DefaultAzureCredential` offers improved management and security benefits over the account key to allow passwordless authentication. Both options are demonstrated in the following example.

### [Passwordless (Recommended)](#tab/managed-identity)

`DefaultAzureCredential` is a class provided by the Azure Identity client library for .NET, which you can learn more about on the [DefaultAzureCredential overview](https://learn.microsoft.com/dotnet/azure/sdk/authentication#defaultazurecredential). `DefaultAzureCredential` supports multiple authentication methods and determines which method should be used at runtime. This approach enables your app to use different authentication methods in different environments (local vs. production) without implementing environment-specific code.

The order and locations in which `DefaultAzureCredential` looks for credentials can be found in the [Azure Identity library overview](https://learn.microsoft.com/dotnet/api/overview/azure/Identity-readme#defaultazurecredential).

For example, your app can authenticate using your Visual Studio sign-in credentials with when developing locally. Your app can then use a [managed identity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/managed-identities-azure-resources/overview.md) once it has been deployed to Azure. No code changes are required for this transition.

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

1. [Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/passwordless/default-azure-credential-sign-in.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-dotnet.md)

2. 
To use `DefaultAzureCredential`, add the **Azure.Identity** package to your application.

# [Visual Studio](#tab/identity-visual-studio)

1. In **Solution Explorer**, right-click the **Dependencies** node of your project. Select **Manage NuGet Packages**.

1. In the resulting window, search for *Azure.Identity*. Select the appropriate result, and select **Install**.

    A screenshot showing how to add the identity package.

# [.NET CLI](#tab/identity-netcore-cli)

```dotnetcli
dotnet add package Azure.Identity
```

---

3. Update your *Program.cs* code to match the following example. When the code is run on your local workstation during development, it will use the developer credentials of the prioritized tool you're logged into to authenticate to Azure, such as the Azure CLI or Visual Studio.

    ```csharp
    using Azure.Storage.Blobs;
    using Azure.Storage.Blobs.Models;
    using System;
    using System.IO;
    using Azure.Identity;
    
    // TODO: Replace <storage-account-name> with your actual storage account name
    var blobServiceClient = new BlobServiceClient(
            new Uri("https://<storage-account-name>.blob.core.windows.net"),
            new DefaultAzureCredential());
    ```

4. Make sure to update the storage account name in the URI of your `BlobServiceClient`. The storage account name can be found on the overview page of the Azure portal.

    A screenshot showing how to find the storage account name.

    > **Note:**
    > When deployed to Azure, this same code can be used to authorize requests to Azure Storage from an application running in Azure. However, you'll need to enable managed identity on your app in Azure. Then configure your storage account to allow that managed identity to connect. For detailed instructions on configuring this connection between Azure services, see the [Auth from Azure-hosted apps](https://learn.microsoft.com/dotnet/azure/sdk/authentication-azure-hosted-apps) tutorial.

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

After you add the environment variable in Windows, you must start a new instance of the command window. If you're using Visual Studio on Windows, you may need to relaunch Visual Studio after creating the environment variable for the change to be detected.

**Linux**:

```bash
export AZURE_STORAGE_CONNECTION_STRING="<yourconnectionstring>"
```

The code below retrieves the connection string for the storage account from the environment variable created earlier, and uses the connection string to construct a service client object.

Add following code to the end of the `Program.cs` file:

```csharp
// Retrieve the connection string for use with the application. 
string connectionString = Environment.GetEnvironmentVariable("AZURE_STORAGE_CONNECTION_STRING");

// Create a BlobServiceClient object 
var blobServiceClient = new BlobServiceClient(connectionString);
```

> **Important:**
> The account access key should be used with caution. If your account access key is lost or accidentally placed in an insecure location, your service may become vulnerable. Anyone who has the access key is able to authorize requests against the storage account, and effectively has access to all the data. `DefaultAzureCredential` provides enhanced security features and benefits and is the recommended approach for managing authorization to Azure services.

---


### Create a container

Create a new container in your storage account by calling the [CreateBlobContainerAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobserviceclient.createblobcontainerasync) method on the `blobServiceClient` object. In this example, the code appends a GUID value to the container name to ensure that it's unique.

**Applies to: blob-storage-quickstart-scratch**


Add the following code to the end of the `Program.cs` file:



```csharp
// TODO: Replace <storage-account-name> with your actual storage account name
var blobServiceClient = new BlobServiceClient(
        new Uri("https://<storage-account-name>.blob.core.windows.net"),
        new DefaultAzureCredential());

//Create a unique name for the container
string containerName = "quickstartblobs" + Guid.NewGuid().ToString();

// Create the container and return a container client object
BlobContainerClient containerClient = await blobServiceClient.CreateBlobContainerAsync(containerName);
```

To learn more about creating a container, and to explore more code samples, see [Create a blob container with .NET](storage-blob-container-create.md).

> **Important:**
> Container names must be lowercase. For more information about naming containers and blobs, see [Naming and Referencing Containers, Blobs, and Metadata](https://learn.microsoft.com/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata).

### Upload a blob to a container

Upload a blob to a container by using [UploadAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient.uploadasync). The example code creates a text file in the local *data* directory to upload to the container.

**Applies to: blob-storage-quickstart-scratch**


Add the following code to the end of the `Program.cs` file:



```csharp
// Create a local file in the ./data/ directory for uploading and downloading
string localPath = "data";
Directory.CreateDirectory(localPath);
string fileName = "quickstart" + Guid.NewGuid().ToString() + ".txt";
string localFilePath = Path.Combine(localPath, fileName);

// Write text to the file
await File.WriteAllTextAsync(localFilePath, "Hello, World!");

// Get a reference to a blob
BlobClient blobClient = containerClient.GetBlobClient(fileName);

Console.WriteLine("Uploading to Blob storage as blob:\n\t {0}\n", blobClient.Uri);

// Upload data from the local file, overwrite the blob if it already exists
await blobClient.UploadAsync(localFilePath, true);
```

To learn more about uploading blobs, and to explore more code samples, see [Upload a blob with .NET](storage-blob-upload.md).

### List blobs in a container

List the blobs in the container by calling the [GetBlobsAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.getblobsasync) method.

**Applies to: blob-storage-quickstart-scratch**


Add the following code to the end of the `Program.cs` file:



```csharp
Console.WriteLine("Listing blobs...");

// List all blobs in the container
await foreach (BlobItem blobItem in containerClient.GetBlobsAsync())
{
    Console.WriteLine("\t" + blobItem.Name);
}
```

To learn more about listing blobs and to explore more code samples, see [List blobs with .NET](storage-blobs-list.md).

### Download a blob

Download the blob you created earlier by calling the [DownloadToAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient.downloadtoasync) method. The example code appends the string "DOWNLOADED" to the file name so that you can see both files in the local file system.

**Applies to: blob-storage-quickstart-scratch**


Add the following code to the end of the `Program.cs` file:



```csharp
// Download the blob to a local file
// Append the string "DOWNLOADED" before the .txt extension 
// so you can compare the files in the data directory
string downloadFilePath = localFilePath.Replace(".txt", "DOWNLOADED.txt");

Console.WriteLine("\nDownloading blob to\n\t{0}\n", downloadFilePath);

// Download the blob's contents and save it to a file
await blobClient.DownloadToAsync(downloadFilePath);
```

To learn more about downloading blobs and to explore more code samples, see [Download a blob with .NET](storage-blob-download.md).

### Delete a container

The following code cleans up the resources the app created by deleting the container by using [DeleteAsync](https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobcontainerclient.deleteasync). The code example also deletes the local files that the app created.

The app pauses for user input by calling `Console.ReadLine` before it deletes the blob, container, and local files. This pause is a good chance to verify that the resources were created correctly, before the app deletes them.

After you delete a container, you can't create another container with the same name for at least 30 seconds. Additionally, the container might not be available for more than 30 seconds if the service is still processing the request. While the container is being deleted, attempts to create a container of the same name generate a conflict and fail with status code 409. The service indicates that the container is being deleted. All other operations, including operations on any blobs within the container, aren't found and fail with a 404 status code while the container is being deleted.

**Applies to: blob-storage-quickstart-scratch**


Add the following code to the end of the `Program.cs` file:



```csharp
// Clean up
Console.Write("Press any key to begin clean up");
Console.ReadLine();

Console.WriteLine("Deleting blob container...");
await containerClient.DeleteAsync();

Console.WriteLine("Deleting the local source and downloaded files...");
File.Delete(localFilePath);
File.Delete(downloadFilePath);

Console.WriteLine("Done");
```

To learn more about deleting a container and to explore more code samples, see [Delete and restore a blob container with .NET](storage-blob-container-delete.md).

**Applies to: blob-storage-quickstart-scratch**


## The completed code

After completing these steps, the code in your `Program.cs` file should now resemble the following:

## [Passwordless (Recommended)](#tab/managed-identity)

```csharp
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Identity;

// TODO: Replace <storage-account-name> with your actual storage account name
var blobServiceClient = new BlobServiceClient(
        new Uri("https://<storage-account-name>.blob.core.windows.net"),
        new DefaultAzureCredential());

//Create a unique name for the container
string containerName = "quickstartblobs" + Guid.NewGuid().ToString();

// Create the container and return a container client object
BlobContainerClient containerClient = await blobServiceClient.CreateBlobContainerAsync(containerName);

// Create a local file in the ./data/ directory for uploading and downloading
string localPath = "data";
Directory.CreateDirectory(localPath);
string fileName = "quickstart" + Guid.NewGuid().ToString() + ".txt";
string localFilePath = Path.Combine(localPath, fileName);

// Write text to the file
await File.WriteAllTextAsync(localFilePath, "Hello, World!");

// Get a reference to a blob
BlobClient blobClient = containerClient.GetBlobClient(fileName);

Console.WriteLine("Uploading to Blob storage as blob:\n\t {0}\n", blobClient.Uri);

// Upload data from the local file
await blobClient.UploadAsync(localFilePath, true);

Console.WriteLine("Listing blobs...");

// List all blobs in the container
await foreach (BlobItem blobItem in containerClient.GetBlobsAsync())
{
    Console.WriteLine("\t" + blobItem.Name);
}

// Download the blob to a local file
// Append the string "DOWNLOADED" before the .txt extension 
// so you can compare the files in the data directory
string downloadFilePath = localFilePath.Replace(".txt", "DOWNLOADED.txt");

Console.WriteLine("\nDownloading blob to\n\t{0}\n", downloadFilePath);

// Download the blob's contents and save it to a file
await blobClient.DownloadToAsync(downloadFilePath);

// Clean up
Console.Write("Press any key to begin clean up");
Console.ReadLine();

Console.WriteLine("Deleting blob container...");
await containerClient.DeleteAsync();

Console.WriteLine("Deleting the local source and downloaded files...");
File.Delete(localFilePath);
File.Delete(downloadFilePath);

Console.WriteLine("Done");
```

## [Connection String](#tab/connection-string)

```csharp
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;

// TODO: Replace <storage-account-name> with your actual storage account name
var blobServiceClient = new BlobServiceClient("<storage-account-connection-string>");

//Create a unique name for the container
string containerName = "quickstartblobs" + Guid.NewGuid().ToString();

// Create the container and return a container client object
BlobContainerClient containerClient = await blobServiceClient.CreateBlobContainerAsync(containerName);

// Create a local file in the ./data/ directory for uploading and downloading
string localPath = "data";
Directory.CreateDirectory(localPath);
string fileName = "quickstart" + Guid.NewGuid().ToString() + ".txt";
string localFilePath = Path.Combine(localPath, fileName);

// Write text to the file
await File.WriteAllTextAsync(localFilePath, "Hello, World!");

// Get a reference to a blob
BlobClient blobClient = containerClient.GetBlobClient(fileName);

Console.WriteLine("Uploading to Blob storage as blob:\n\t {0}\n", blobClient.Uri);

// Upload data from the local file
await blobClient.UploadAsync(localFilePath, true);

Console.WriteLine("Listing blobs...");

// List all blobs in the container
await foreach (BlobItem blobItem in containerClient.GetBlobsAsync())
{
    Console.WriteLine("\t" + blobItem.Name);
}

// Download the blob to a local file
// Append the string "DOWNLOADED" before the .txt extension 
// so you can compare the files in the data directory
string downloadFilePath = localFilePath.Replace(".txt", "DOWNLOADED.txt");

Console.WriteLine("\nDownloading blob to\n\t{0}\n", downloadFilePath);

// Download the blob's contents and save it to a file
await blobClient.DownloadToAsync(downloadFilePath);

// Clean up
Console.Write("Press any key to begin clean up");
Console.ReadLine();

Console.WriteLine("Deleting blob container...");
await containerClient.DeleteAsync();

Console.WriteLine("Deleting the local source and downloaded files...");
File.Delete(localFilePath);
File.Delete(downloadFilePath);

Console.WriteLine("Done");
```

---

## Run the code

This app creates a test file in your local *data* folder and uploads it to Blob storage. The example then lists the blobs in the container and downloads the file with a new name so that you can compare the old and new files.

If you're using Visual Studio, press F5 to build and run the code and interact with the console app. If you're using the .NET CLI, navigate to your application directory, then build and run the application.

```console
dotnet build
```

```console
dotnet run
```

The output of the app is similar to the following example (GUID values omitted for readability):

```output
Azure Blob Storage - .NET quickstart sample

Uploading to Blob storage as blob:
         https://mystorageacct.blob.core.windows.net/quickstartblobsGUID/quickstartGUID.txt

Listing blobs...
        quickstartGUID.txt

Downloading blob to
        ./data/quickstartGUIDDOWNLOADED.txt

Press any key to begin clean up
Deleting blob container...
Deleting the local source and downloaded files...
Done
```

Before you begin the clean-up process, check your *data* folder for the two files. You can open them and observe that they're identical.



## Clean up resources

**Applies to: blob-storage-quickstart-scratch**


After you verify the files and finish testing, press the **Enter** key to delete the test files along with the container you created in the storage account. You can also use [Azure CLI](storage-quickstart-blobs-cli.md#clean-up-resources) to delete resources.



**Applies to: blob-storage-quickstart-template**


When you're done with the quickstart, clean up the resources you created by running the following command:

```console
azd down
```

You'll be prompted to confirm the deletion of the resources. Enter `y` to confirm.



## Next step

> 
> [Azure Storage samples and developer guides for .NET](../common/storage-samples-dotnet.md?toc=/azure/storage/blobs/toc.json)
