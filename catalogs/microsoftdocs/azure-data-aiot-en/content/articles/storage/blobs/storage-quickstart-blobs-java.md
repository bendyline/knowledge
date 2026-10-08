---
title: "Quickstart: Azure Blob Storage library - Java"
description: In this quickstart, you learn how to use the Azure Blob Storage client library for Java to create a container and a blob in Blob (object) storage. Next, you learn how to download the blob to your local computer, and how to list all of the blobs in a container.
author: stevenmatthew
ms.author: shaas
ms.date: 09/02/2026
ms.service: azure-blob-storage
ms.topic: quickstart
ms.devlang: java
zone_pivot_groups: azure-blob-storage-quickstart-options
ms.custom:
  - devx-track-java
  - mode-api
  - passwordless-java
  - devx-track-extended-java
  - devx-track-extended-azdevcli
  - sfi-image-nochange
  - sfi-ropc-nochange
# Customer intent: As a Java developer, I want to implement a Blob Storage application using the Azure Blob Storage client library, so that I can manage blobs and containers effectively for my projects.
---

# Quickstart: Azure Blob Storage client library for Java SE

**Applies to: blob-storage-quickstart-scratch**


> **Note:**
> The **Build from scratch** option guides you through creating a project, installing packages, writing code, and running a basic console app. Choose this option to understand how to create an app that connects to Azure Blob Storage. To automate deployment tasks and start with a completed project, choose [Start with a template](storage-quickstart-blobs-java.md?pivots=blob-storage-quickstart-template).



**Applies to: blob-storage-quickstart-template**


> **Note:**
> The **Start with a template** option uses the Azure Developer CLI to automate deployment tasks and provides a completed project. Choose this option to explore the code without completing the setup tasks. For step-by-step instructions to build the app, choose [Build from scratch](storage-quickstart-blobs-java.md?pivots=blob-storage-quickstart-scratch).



Get started with the Azure Blob Storage client library for Java to manage blobs and containers.

**Applies to: blob-storage-quickstart-scratch**


In this article, you follow steps to install the package and try out example code for basic tasks.



**Applies to: blob-storage-quickstart-template**


In this article, you use the [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/overview) to deploy Azure resources and run a completed console app with just a few commands.



> **Tip:**
> For Spring applications that use Azure Storage resources, consider [Spring Cloud Azure](https://learn.microsoft.com/azure/developer/java/spring-framework/). This open-source project integrates Spring with Azure services. For a Blob Storage example, see [Upload a file to an Azure Storage Blob](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-boot-starter-java-app-with-azure-storage).

[API reference documentation](https://learn.microsoft.com/java/api/overview/azure/storage-blob-readme) | [Library source code](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-blob) | [Package (Maven)](https://mvnrepository.com/artifact/com.azure/azure-storage-blob) | [Samples](../common/storage-samples-java.md?toc=/azure/storage/blobs/toc.json#blob-samples)

## Prerequisites

**Applies to: blob-storage-quickstart-scratch**


- Azure account with an active subscription - [create an account for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- Azure Storage account - [create a storage account](../common/storage-account-create.md).
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/) version 1.8_101 or above
- [Apache Maven](https://maven.apache.org/download.cgi)



**Applies to: blob-storage-quickstart-template**


- Azure subscription - [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn)
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/) version 1.8_101 or above
- [Apache Maven](https://maven.apache.org/download.cgi)
- [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd)



## Setting up

**Applies to: blob-storage-quickstart-scratch**


This section walks you through preparing a project to work with the Azure Blob Storage client library for Java.

### Create the project

Create a Java application named *blob-quickstart*.

1. In a console window (such as PowerShell or Bash), use Maven to create a new console app with the name *blob-quickstart*. Type the following **mvn** command to create a "Hello world!" Java project.

    # [PowerShell](#tab/powershell)

    ```powershell
    mvn archetype:generate `
        --define interactiveMode=n `
        --define groupId=com.blobs.quickstart `
        --define artifactId=blob-quickstart `
        --define archetypeArtifactId=maven-archetype-quickstart `
        --define archetypeVersion=1.4
    ```

    # [Bash](#tab/bash)

    ```bash
    mvn archetype:generate \
        --define interactiveMode=n \
        --define groupId=com.blobs.quickstart \
        --define artifactId=blob-quickstart \
        --define archetypeArtifactId=maven-archetype-quickstart \
        --define archetypeVersion=1.4
    ```

    ---

1. Review the output from generating the project.

    ```console
    [INFO] Scanning for projects...
    [INFO]
    [INFO] ------------------< org.apache.maven:standalone-pom >-------------------
    [INFO] Building Maven Stub Project (No POM) 1
    [INFO] --------------------------------[ pom ]---------------------------------
    [INFO]
    [INFO] >>> maven-archetype-plugin:3.1.2:generate (default-cli) > generate-sources @ standalone-pom >>>
    [INFO]
    [INFO] <<< maven-archetype-plugin:3.1.2:generate (default-cli) < generate-sources @ standalone-pom <<<
    [INFO]
    [INFO]
    [INFO] --- maven-archetype-plugin:3.1.2:generate (default-cli) @ standalone-pom ---
    [INFO] Generating project in Batch mode
    [INFO] ----------------------------------------------------------------------------
    [INFO] Using following parameters for creating project from Archetype: maven-archetype-quickstart:1.4
    [INFO] ----------------------------------------------------------------------------
    [INFO] Parameter: groupId, Value: com.blobs.quickstart
    [INFO] Parameter: artifactId, Value: blob-quickstart
    [INFO] Parameter: version, Value: 1.0-SNAPSHOT
    [INFO] Parameter: package, Value: com.blobs.quickstart
    [INFO] Parameter: packageInPathFormat, Value: com/blobs/quickstart
    [INFO] Parameter: version, Value: 1.0-SNAPSHOT
    [INFO] Parameter: package, Value: com.blobs.quickstart
    [INFO] Parameter: groupId, Value: com.blobs.quickstart
    [INFO] Parameter: artifactId, Value: blob-quickstart
    [INFO] Project created from Archetype in dir: C:\QuickStarts\blob-quickstart
    [INFO] ------------------------------------------------------------------------
    [INFO] BUILD SUCCESS
    [INFO] ------------------------------------------------------------------------
    [INFO] Total time:  7.056 s
    [INFO] Finished at: 2019-10-23T11:09:21-07:00
    [INFO] ------------------------------------------------------------------------
        ```

1. Switch to the newly created *blob-quickstart* folder.

   ```console
   cd blob-quickstart
   ```

1. Inside the *blob-quickstart* directory, create another directory called *data*. This folder is where the blob data files are created and stored.

    ```console
    mkdir data
    ```

### Install the packages

Open the `pom.xml` file in your text editor. 

Add **azure-sdk-bom** to take a dependency on the latest version of the library. In the following snippet, replace the `{bom_version_to_target}` placeholder with the version number. By using **azure-sdk-bom**, you don't need to specify the version of each individual dependency. To learn more about the BOM, see the [Azure SDK BOM README](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/boms/azure-sdk-bom/README.md).

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.azure</groupId>
            <artifactId>azure-sdk-bom</artifactId>
            <version>{bom_version_to_target}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

Then add the following dependency elements to the group of dependencies. You need the **azure-identity** dependency for passwordless connections to Azure services.

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-storage-blob</artifactId>
</dependency>
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
</dependency>
```

### Set up the app framework

From the project directory, follow these steps to create the basic structure of the app:

1. Navigate to the `/src/main/java/com/blobs/quickstart` directory
1. Open the `App.java` file in your editor
1. Delete the line `System.out.println("Hello world!");`
1. Add the necessary `import` directives

The code should resemble this framework:

```java
package com.blobs.quickstart;

/**
 * Azure Blob Storage quickstart
 */
import com.azure.identity.*;
import com.azure.storage.blob.*;
import com.azure.storage.blob.models.*;
import java.io.*;

public class App
{
    public static void main(String[] args) throws IOException
    {
        // Quickstart code goes here
    }
}
```



**Applies to: blob-storage-quickstart-template**


By using the [Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd), you can create a storage account and run the sample code with just a few commands. You can run the project in your local development environment or in a [DevContainer](https://code.visualstudio.com/docs/devcontainers/containers).

### Initialize the Azure Developer CLI template and deploy resources

From an empty directory, follow these steps to initialize the `azd` template, provision Azure resources, and get started with the code:

- Clone the quickstart repository assets from GitHub and initialize the template locally:

    ```console
    azd init --template blob-storage-quickstart-java
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

    - **Subscription**: The Azure subscription for deploying your resources.
    - **Location**: The Azure region for deploying your resources.

    The deployment might take a few minutes to complete. The output from the [`azd up`](https://learn.microsoft.com/azure/developer/azure-developer-cli/reference#azd-up) command includes the name of the newly created storage account, which you need later to run the code.

## Run the sample code

At this point, the resources are deployed to Azure and the code is almost ready to run. Follow these steps to update the name of the storage account in the code, and run the sample console app:

- **Update the storage account name**: 
    1. In the local directory, navigate to the *blob-quickstart/src/main/java/com/blobs/quickstart* directory.
    1. Open the file named **App.java** in your editor. Find the `<storage-account-name>` placeholder and replace it with the actual name of the storage account created by the `azd up` command.
    1. Save the changes.
- **Run the project**:
    1. Navigate to the *blob-quickstart* directory containing the `pom.xml` file. Compile the project by using the following `mvn` command:
        ```console
        mvn compile
        ```
    1. Package the compiled code in its distributable format:
        ```console
        mvn package
        ```
    1. Run the following `mvn` command to execute the app:
        ```console
        mvn exec:java
        ```
- **Observe the output**: This app creates a test file in your local *data* folder and uploads it to a container in the storage account. The example then lists the blobs in the container and downloads the file with a new name so that you can compare the old and new files. 

To learn more about how the sample code works, see [Code examples](#code-examples).

When you're finished testing the code, see the [Clean up resources](#clean-up-resources) section to delete the resources created by the `azd up` command.



## Object model

Azure Blob Storage is optimized for storing massive amounts of unstructured data. Unstructured data doesn't adhere to a particular data model or definition, such as text or binary data. Blob storage offers three types of resources:

- The storage account
- A container in the storage account
- A blob in the container

The following diagram shows the relationship between these resources.

Diagram showing a storage account that contains a blob container and a blob.

Use the following Java classes to interact with these resources:

- [BlobServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient): The `BlobServiceClient` class manages Azure Storage resources and blob containers. The storage account provides the top-level namespace for the Blob service.
- [BlobServiceClientBuilder](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclientbuilder): The `BlobServiceClientBuilder` class provides a fluent API to configure and create `BlobServiceClient` objects.
- [BlobContainerClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobcontainerclient): The `BlobContainerClient` class manages Azure Storage containers and their blobs.
- [BlobClient](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobclient): The `BlobClient` class manages Azure Storage blobs.
- [BlobItem](https://learn.microsoft.com/java/api/com.azure.storage.blob.models.blobitem): The `BlobItem` class represents individual blobs returned from a call to [listBlobs](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobcontainerclient.listblobs).

## Code examples

These example code snippets show you how to perform the following actions with the Azure Blob Storage client library for Java:

- [Authenticate to Azure and authorize access to blob data](#authenticate-to-azure-and-authorize-access-to-blob-data)
- [Create a container](#create-a-container)
- [Upload blobs to a container](#upload-blobs-to-a-container)
- [List the blobs in a container](#list-the-blobs-in-a-container)
- [Download blobs](#download-blobs)
- [Delete a container](#delete-a-container)

**Applies to: blob-storage-quickstart-scratch**


> **Important:**
> Add the dependencies and directives described in [Setting up](#setting-up) before you use the code samples.



**Applies to: blob-storage-quickstart-template**


> **Note:**
> The Azure Developer CLI template includes a file with sample code already in place. The following examples provide detail for each part of the sample code. The template implements the recommended passwordless authentication method, as described in the [Authenticate to Azure](#authenticate-to-azure-and-authorize-access-to-blob-data) section. The connection string method is shown as an alternative, but isn't used in the template and isn't recommended for production code.



### Authenticate to Azure and authorize access to blob data


Application requests to Azure Blob Storage must be authorized. Using the `DefaultAzureCredential` class provided by the Azure Identity client library is the recommended approach for implementing passwordless connections to Azure services in your code, including Blob Storage.

You can also authorize requests to Azure Blob Storage by using the account access key. However, this approach should be used with caution. Developers must be diligent to never expose the access key in an unsecure location. Anyone who has the access key is able to authorize requests against the storage account, and effectively has access to all the data. `DefaultAzureCredential` offers improved management and security benefits over the account key to allow passwordless authentication. Both options are demonstrated in the following example.

### [Passwordless (Recommended)](#tab/managed-identity)

[`DefaultAzureCredential`](https://learn.microsoft.com/java/api/com.azure.identity.defaultazurecredential) is a class provided by the Azure Identity client library for Java. `DefaultAzureCredential` supports multiple authentication methods and determines which method to use at runtime. This approach enables your app to use different authentication methods in different environments (local vs. production) without implementing environment-specific code.

You can find the order and locations where `DefaultAzureCredential` looks for credentials in the [Azure Identity library overview](https://learn.microsoft.com/java/api/overview/azure/identity-readme#defaultazurecredential).

For example, your app can authenticate by using your Visual Studio Code sign-in credentials when developing locally. Your app can then use a [managed identity](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/overview) after deployment to Azure. No code changes are required for this transition.

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

Authorize access to data in your storage account by following these steps:

1. Authenticate by using the same Microsoft Entra account that you assigned the storage account role to. Use the Azure CLI, Visual Studio Code, or Azure PowerShell.

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

    Sign in to Azure by using the following PowerShell command:

    ```azurepowershell
    Connect-AzAccount
    ```

2. To use `DefaultAzureCredential`, add the **azure-identity** dependency to `pom.xml`:

    ```xml
    <dependency>
      <groupId>com.azure</groupId>
      <artifactId>azure-identity</artifactId>
    </dependency>
    ```

3. Add this code to the `main` method. When the code runs on your local workstation, it uses the developer credentials of the prioritized tool you're signed into to authenticate to Azure, such as the Azure CLI or Visual Studio Code.

    [Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/quickstarts/Java/blob-quickstart/src/main/java/com/blobs/quickstart/App.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-java.md)

4. Update the storage account name in the URI of your `BlobServiceClient`. Find the storage account name on the overview page in the Azure portal.

    A screenshot showing how to find the storage account name.

    > **Note:**
    > When deployed to Azure, this same code can be used to authorize requests to Azure Storage from an application running in Azure. However, you need to enable managed identity on your app in Azure. Then configure your storage account to allow that managed identity to connect. For detailed instructions on configuring this connection between Azure services, see the [Auth from Azure-hosted apps](https://learn.microsoft.com/azure/developer/java/sdk/identity-azure-hosted-auth) tutorial.

### [Connection String](#tab/connection-string)

A connection string includes the storage account access key and uses it to authorize requests. Never expose the key in an insecure location.

> **Note:**
> To authorize data access by using the storage account access key, you need permissions for the following Azure RBAC action: [Microsoft.Storage/storageAccounts/listkeys/action](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/permissions/storage.md#microsoftstorage). The least privileged built-in role with permissions for this action is [Reader and Data Access](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#reader-and-data-access), but any role that includes this action works.


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

**Applies to: blob-storage-quickstart-scratch**


Add this code to the end of the `main` method:



```java
// Retrieve the connection string for use with the application. 
String connectStr = System.getenv("AZURE_STORAGE_CONNECTION_STRING");

// Create a BlobServiceClient object using a connection string
BlobServiceClient blobServiceClient = new BlobServiceClientBuilder()
    .connectionString(connectStr)
    .buildClient();

```

> **Important:**
> Use the account access key with caution. If you lose your account access key or accidentally place it in an insecure location, your service becomes vulnerable. Anyone who has the access key can authorize requests against the storage account and effectively has access to all the data. `DefaultAzureCredential` provides enhanced security features and benefits and is the recommended approach for managing authorization to Azure services.

---

### Create a container

Create a new container in your storage account by calling the [createBlobContainer](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobserviceclient#method-details) method on the `blobServiceClient` object. In this example, the code appends a GUID value to the container name to ensure that it's unique.

**Applies to: blob-storage-quickstart-scratch**


Add this code to the end of the `main` method:



[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/quickstarts/Java/blob-quickstart/src/main/java/com/blobs/quickstart/App.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-java.md)

For more information and examples, see [Create a blob container with Java](storage-blob-container-create-java.md).

> **Important:**
> Container names must be lowercase. For more information about naming containers and blobs, see [Naming and Referencing Containers, Blobs, and Metadata](https://learn.microsoft.com/rest/api/storageservices/naming-and-referencing-containers--blobs--and-metadata).

### Upload blobs to a container

Upload a blob to a container by calling the [uploadFromFile](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobclient.uploadfromfile) method. The example code creates a text file in the local *data* directory to upload to the container.

**Applies to: blob-storage-quickstart-scratch**


Add this code to the end of the `main` method:



[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/quickstarts/Java/blob-quickstart/src/main/java/com/blobs/quickstart/App.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-java.md)

For more information and examples, see [Upload a blob with Java](storage-blob-upload-java.md).

### List the blobs in a container

List the blobs in the container by calling the [listBlobs](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobcontainerclient.listblobs) method. In this case, you added only one blob to the container, so the listing operation returns just that one blob.

**Applies to: blob-storage-quickstart-scratch**


Add this code to the end of the `main` method:



[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/quickstarts/Java/blob-quickstart/src/main/java/com/blobs/quickstart/App.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-java.md)

For more information and examples, see [List blobs with Java](storage-blobs-list-java.md).

### Download blobs

Download the previously created blob by calling the [downloadToFile](https://learn.microsoft.com/java/api/com.azure.storage.blob.specialized.blobclientbase.downloadtofile) method. The example code adds a suffix of `DOWNLOAD` to the file name so that you can see both files in local file system.

**Applies to: blob-storage-quickstart-scratch**


Add this code to the end of the `main` method:



[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/quickstarts/Java/blob-quickstart/src/main/java/com/blobs/quickstart/App.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-java.md)

For more information and examples, see [Download a blob with Java](storage-blob-download-java.md).

### Delete a container

The following code cleans up the resources the app created by removing the entire container by using the [delete](https://learn.microsoft.com/java/api/com.azure.storage.blob.blobcontainerclient.delete) method. It also deletes the local files created by the app.

The app pauses for user input by calling [`System.console().readLine()`](https://docs.oracle.com/en/java/javase/21/docs/api/java.base/java/io/Console.html#readLine()) before it deletes the blob, container, and local files. This pause gives you a chance to verify that the app created the resources correctly before it deletes them.

**Applies to: blob-storage-quickstart-scratch**


Add this code to the end of the `main` method:



[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/quickstarts/Java/blob-quickstart/src/main/java/com/blobs/quickstart/App.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/storage-quickstart-blobs-java.md)

For more information and examples, see [Delete and restore a blob container with Java](storage-blob-container-delete-java.md).

**Applies to: blob-storage-quickstart-scratch**


## Run the code

This app creates a test file in your local folder and uploads it to Blob storage. The example then lists the blobs in the container and downloads the file with a new name so that you can compare the old and new files.

Follow these steps to compile, package, and run the code:

1. Navigate to the directory containing the `pom.xml` file and compile the project by using the following `mvn` command:
    ```console
    mvn compile
    ```
1. Package the compiled code in its distributable format:
    ```console
    mvn package
    ```
1. Run the following `mvn` command to execute the app:
    ```console
    mvn exec:java -D exec.mainClass=com.blobs.quickstart.App -D exec.cleanupDaemonThreads=false
    ```
    To simplify the run step, add `exec-maven-plugin` to `pom.xml` and configure it as shown in the following code:
    ```xml
    <plugin>
      <groupId>org.codehaus.mojo</groupId>
      <artifactId>exec-maven-plugin</artifactId>
      <version>1.4.0</version>
      <configuration>
        <mainClass>com.blobs.quickstart.App</mainClass>
        <cleanupDaemonThreads>false</cleanupDaemonThreads>
      </configuration>
    </plugin>
    ```
    With this configuration, execute the app with the following command:
    ```console
    mvn exec:java
    ```
    

The output of the app is similar to the following example (UUID values omitted for readability):

```output
Azure Blob Storage - Java quickstart sample

Uploading to Blob storage as blob:
        https://mystorageacct.blob.core.windows.net/quickstartblobsUUID/quickstartUUID.txt

Listing blobs...
        quickstartUUID.txt

Downloading blob to
        ./data/quickstartUUIDDOWNLOAD.txt

Press the Enter key to begin clean up

Deleting blob container...
Deleting the local source and downloaded files...
Done
```

Before you begin the cleanup process, check your *data* folder for the two files. You can compare them and observe that they're identical.



## Clean up resources

**Applies to: blob-storage-quickstart-scratch**


After you verify the files and finish testing, press **Enter** to delete the test files along with the container you created in the storage account. You can also use [Azure CLI](storage-quickstart-blobs-cli.md#clean-up-resources) to delete resources.



**Applies to: blob-storage-quickstart-template**


When you're done with the quickstart, clean up the resources you created by running the following command:

```console
azd down
```

You receive a prompt to confirm the deletion of the resources. Enter `y` to confirm.



## Next step

> 
> [Azure Storage samples and developer guides for Java](../common/storage-samples-java.md?toc=/azure/storage/blobs/toc.json)
> [Quickstart: Quarkus extension for Azure Blob Storage](storage-quickstart-blobs-java-quarkus.md)
> [Use Spring Boot to upload a file to Azure Blob Storage](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-boot-starter-java-app-with-azure-storage?toc=/azure/storage/blobs/toc.json)
