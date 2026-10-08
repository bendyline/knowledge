---
title: Use Java to manage data in Azure Data Lake Storage
titleSuffix: Azure Storage
description: Use Azure Storage libraries for Java to manage directories and files in storage accounts that have a hierarchical namespace enabled.
author: stevenmatthew

ms.author: shaas
ms.service: azure-data-lake-storage
ms.date: 08/08/2023
ms.devlang: java
ms.topic: how-to
ms.reviewer: prishet
ms.custom: devx-track-java, devx-track-extended-java
# Customer intent: As a Java developer, I want to manage directories and files in Azure Data Lake Storage, so that I can efficiently organize and manipulate data within a hierarchical storage environment.
---

# Use Java to manage directories and files in Azure Data Lake Storage

This article shows you how to use Java to create and manage directories and files in storage accounts that have a hierarchical namespace.

To learn about how to get, set, and update the access control lists (ACL) of directories and files, see [Use .Java to manage ACLs in Azure Data Lake Storage](data-lake-storage-acl-java.md).

[Package (Maven)](https://search.maven.org/artifact/com.azure/azure-storage-file-datalake) | [Samples](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-file-datalake) | [API reference](https://learn.microsoft.com/java/api/overview/azure/storage-file-datalake-readme) | [Gen1 to Gen2 mapping](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-file-datalake/GEN1_GEN2_MAPPING.md) | [Give Feedback](https://github.com/Azure/azure-sdk-for-java/issues)

## Prerequisites

- An Azure subscription. For more information, see [Get Azure free trial](https://azure.microsoft.com/pricing/free-trial/).

- A storage account that has hierarchical namespace enabled. Follow [these instructions](create-data-lake-storage-account.md) to create one.

## Set up your project

To get started, open [this page](https://search.maven.org/artifact/com.azure/azure-storage-file-datalake) and find the latest version of the Java library. Then, open the *pom.xml* file in your text editor. Add a dependency element that references that version.

If you plan to authenticate your client application by using Microsoft Entra ID, then add a dependency to the Azure Identity library. For more information, see [Azure Identity client library for Java](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/identity/azure-identity#adding-the-package-to-your-project).

Next, add these imports statements to your code file.

```java
import com.azure.identity.*;
import com.azure.storage.common.StorageSharedKeyCredential;
import com.azure.core.http.rest.PagedIterable;
import com.azure.core.util.BinaryData;
import com.azure.storage.file.datalake.*;
import com.azure.storage.file.datalake.models.*;
import com.azure.storage.file.datalake.options.*;
```


> **Note:**
> [Multi-protocol access on Data Lake Storage](data-lake-storage-multi-protocol-access.md) enables applications to use both Blob APIs and Data Lake Storage Gen2 APIs to work with data in storage accounts with hierarchical namespace (HNS) enabled. When working with capabilities unique to Data Lake Storage Gen2, such as directory operations and ACLs, use the Data Lake Storage Gen2 APIs, as shown in this article.
>
> When choosing which APIs to use in a given scenario, consider the workload and the needs of your application, along with the [known issues](data-lake-storage-known-issues.md#blob-storage-apis) and [impact of HNS on workloads and applications](upgrade-to-data-lake-storage-gen2.md#impact-on-workloads-and-applications).

## Authorize access and connect to data resources

To work with the code examples in this article, you need to create an authorized [DataLakeServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.datalakeserviceclient) instance that represents the storage account. You can authorize a `DataLakeServiceClient` object using Microsoft Entra ID, an account access key, or a shared access signature (SAS).

<a name='azure-ad'></a>

### [Microsoft Entra ID](#tab/azure-ad)

You can use the [Azure identity client library for Java](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/identity/azure-identity) to authenticate your application with Microsoft Entra ID.

Create a [DataLakeServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.datalakeserviceclient) instance and pass in a new instance of the [DefaultAzureCredential](https://learn.microsoft.com/java/api/com.azure.identity.defaultazurecredential) class.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/Authorize_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-java.md)

To learn more about using `DefaultAzureCredential` to authorize access to data, see [Azure Identity client library for Java](https://learn.microsoft.com/java/api/overview/azure/identity-readme).

### [SAS token](#tab/sas-token)

To use a shared access signature (SAS) token, provide the token as a string and initialize a [DataLakeServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.datalakeserviceclient) object. If your account URL includes the SAS token, omit the credential parameter.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/Authorize_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-java.md)

To learn more about generating and managing SAS tokens, see the following article:

- [Grant limited access to Azure Storage resources using shared access signatures (SAS)](../common/storage-sas-overview.md?toc=/azure/storage/blobs/toc.json)

### [Account key](#tab/account-key)

You can authorize access to data using your account access keys (Shared Key). This example creates a [DataLakeServiceClient](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakeserviceclient) instance that is authorized with the account key.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/Authorize_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-java.md)


> **Caution:**
> Authorization with Shared Key is not recommended as it may be less secure. For optimal security, disable authorization via Shared Key for your storage account, as described in [Prevent Shared Key authorization for an Azure Storage account](../common/shared-key-authorization-prevent.md).
>
> Use of access keys and connection strings should be limited to initial proof of concept apps or development prototypes that don't access production or sensitive data. Otherwise, the token-based authentication classes available in the Azure SDK should always be preferred when authenticating to Azure resources.
>
> Microsoft recommends that clients use either Microsoft Entra ID or a shared access signature (SAS) to authorize access to data in Azure Storage. For more information, see [Authorize operations for data access](../common/authorize-data-access.md?toc=/azure/storage/blobs/toc.json\&bc=/azure/storage/blobs/breadcrumb/toc.json).


---

## Create a container

A container acts as a file system for your files. You can create a container by using the following method:

- [DataLakeServiceClient.createFileSystem](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.datalakeserviceclient#method-details)

The following code example creates a container and returns a [DataLakeFileSystemClient](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.datalakefilesystemclient) object for later use:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/CRUD_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-java.md)

## Create a directory

You can create a directory reference in the container by using the following method:

- [DataLakeFileSystemClient.createDirectory](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.datalakefilesystemclient#method-details)

The following code example adds a directory to a container, then adds a subdirectory and returns a [DataLakeDirectoryClient](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.datalakedirectoryclient) object for later use:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/CRUD_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-java.md)

## Rename or move a directory

You can rename or move a directory by using the following method:

- [DataLakeDirectoryClient.rename](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.datalakedirectoryclient#method-details)

Pass the path of the desired directory as a parameter. The following code example shows how to rename a subdirectory:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/CRUD_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-java.md)

The following code example shows how to move a subdirectory from one directory to a different directory:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/CRUD_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-java.md)

## Upload a file to a directory

You can upload content to a new or existing file by using the following method:

- [DataLakeFileClient.upload](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.datalakefileclient#method-summary)
- [DataLakeFileClient.uploadFromFile](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.datalakefileclient#method-summary)

The following code example shows how to upload a local file to a directory using the `uploadFromFile` method:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/CRUD_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-java.md)

You can use this method to create and upload content to a new file, or you can set the `overwrite` parameter to `true` to overwrite an existing file.

## Append data to a file

You can upload data to be appended to a file by using the following method:

- [DataLakeFileClient.append](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.datalakefileclient#method-summary)

The following code example shows how to append data to the end of a file using these steps:

- Create a `DataLakeFileClient` object to represent the file resource you're working with. 
- Upload data to the file using the `DataLakeFileClient.append` method.
- Complete the upload by calling the `DataLakeFileClient.flush` method to write the previously uploaded data to the file.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/CRUD_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-java.md)

## Download from a directory

The following code example shows how to download a file from a directory to a local file using these steps:

- Create a `DataLakeFileClient` object to represent the file that you want to download. 
- Use the `DataLakeFileClient.readToFile` method to read the file. This example sets the `overwrite` parameter to `true`, which overwrites an existing file.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/CRUD_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-java.md)

## List directory contents

You can list directory contents by using the following method and enumerating the result:

- [DataLakeDirectoryClient.listPaths](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.datalakedirectoryclient#method-summary)

Enumerating the paths in the result may make multiple requests to the service while fetching the values.

The following code example prints the names of each file that is located in a directory:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/CRUD_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-java.md)

## Delete a directory

You can delete a directory by using one of the following methods:

- [DataLakeDirectoryClient.delete](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.datalakedirectoryclient#method-summary)
- [DataLakeDirectoryClient.deleteIfExists](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.datalakedirectoryclient#method-summary)
- [DataLakeDirectoryClient.deleteWithResponse](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.datalakedirectoryclient#method-summary)

The following code example uses `deleteWithResponse` to delete a nonempty directory and all paths beneath the directory:

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/CRUD_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-directory-file-acl-java.md)

## See also

- [API reference documentation](https://learn.microsoft.com/java/api/overview/azure/storage-file-datalake-readme)
- [Package (Maven)](https://search.maven.org/artifact/com.azure/azure-storage-file-datalake)
- [Samples](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-file-datalake)
- [Gen1 to Gen2 mapping](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-file-datalake/GEN1_GEN2_MAPPING.md)
- [Known issues](data-lake-storage-known-issues.md#api-scope-data-lake-client-library)
- [Give Feedback](https://github.com/Azure/azure-sdk-for-java/issues)
