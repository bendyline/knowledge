---
title: Use Java to manage ACLs in Azure Data Lake Storage
titleSuffix: Azure Storage
description: Use Azure Storage libraries for Java to manage access control lists (ACL) in storage accounts that has hierarchical namespace (HNS) enabled.
author: stevenmatthew

ms.author: shaas
ms.service: azure-data-lake-storage
ms.date: 09/06/2024
ms.devlang: java
ms.topic: how-to
ms.reviewer: prishet
ms.custom: devx-track-java, devx-track-extended-java
# Customer intent: As a Java developer working with Azure Data Lake Storage, I want to manage access control lists (ACLs) for files and directories, so that I can effectively control permissions and access rights for users within a hierarchical namespace.
---

# Use Java to manage ACLs in Azure Data Lake Storage

This article shows you how to use Java to get, set, and update the access control lists of directories and files.

ACL inheritance is already available for new child items that are created under a parent directory. But you can also add, update, and remove ACLs recursively on the existing child items of a parent directory without having to make these changes individually for each child item.

[Package (Maven)](https://search.maven.org/artifact/com.azure/azure-storage-file-datalake) | [Samples](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-file-datalake) | [API reference](https://learn.microsoft.com/java/api/overview/azure/storage-file-datalake-readme) | [Gen1 to Gen2 mapping](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-file-datalake/GEN1_GEN2_MAPPING.md) | [Give Feedback](https://github.com/Azure/azure-sdk-for-java/issues)

## Prerequisites

- Azure subscription - [create one for free](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- Azure storage account that has hierarchical namespace (HNS) enabled. Follow [these instructions](create-data-lake-storage-account.md) to create one.
- [Java Development Kit (JDK)](https://learn.microsoft.com/java/azure/jdk/) version 8 or above.
- [Apache Maven](https://maven.apache.org/download.cgi) is used for project management in this example.
- Azure CLI version `2.6.0` or higher.
- One of the following security permissions:
  - A provisioned Microsoft Entra ID [security principal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/overview.md#security-principal) that has been assigned the [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) role, scoped to the target container, storage account, parent resource group, or subscription.
  - Owning user of the target container or directory to which you plan to apply ACL settings. To set ACLs recursively, this includes all child items in the target container or directory.
  - Storage account key.

## Set up your project

> **Note:**
> This article uses the Maven build tool to build and run the sample code. Other build tools, such as Gradle, also work with the Azure SDK for Java.

Use Maven to create a new console app, or open an existing project. Follow these steps to install packages and add the necessary `import` directives.

### Install packages

Open the `pom.xml` file in your text editor. Install the packages by [including the BOM file](#include-the-bom-file), or [including a direct dependency](#include-a-direct-dependency).

#### Include the BOM file
 
Add **azure-sdk-bom** to take a dependency on the latest version of the library. In the following snippet, replace the `{bom_version_to_target}` placeholder with the version number. Using **azure-sdk-bom** keeps you from having to specify the version of each individual dependency. To learn more about the BOM, see the [Azure SDK BOM README](https://github.com/Azure/azure-sdk-for-java/blob/main/sdk/boms/azure-sdk-bom/README.md).

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

Add the following dependency elements to the group of dependencies. The **azure-identity** dependency is needed for passwordless connections to Azure services.

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-storage-file-datalake</artifactId>
</dependency>
<dependency>
      <groupId>com.azure</groupId>
      <artifactId>azure-storage-common</artifactId>
</dependency>
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
</dependency>
```

#### Include a direct dependency

To take dependency on a particular version of the library, add the direct dependency to your project:

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-storage-file-datalake</artifactId>
    <version>{package_version_to_target}</version>
</dependency>
<dependency>
      <groupId>com.azure</groupId>
      <artifactId>azure-storage-common</artifactId>
      <version>{package_version_to_target}</version>
</dependency>
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
    <version>{package_version_to_target}</version>
</dependency>
```

### Include import directives

Add the necessary `import` directives. In this example, we add the following directives in the *App.java* file:

```java
import com.azure.storage.common.StorageSharedKeyCredential;
import com.azure.storage.file.datalake.DataLakeDirectoryClient;
import com.azure.storage.file.datalake.DataLakeFileClient;
import com.azure.storage.file.datalake.DataLakeFileSystemClient;
import com.azure.storage.file.datalake.DataLakeServiceClient;
import com.azure.storage.file.datalake.DataLakeServiceClientBuilder;
import com.azure.storage.file.datalake.models.ListPathsOptions;
import com.azure.storage.file.datalake.models.PathItem;
import com.azure.storage.file.datalake.models.AccessControlChangeCounters;
import com.azure.storage.file.datalake.models.AccessControlChangeResult;
import com.azure.storage.file.datalake.models.AccessControlType;
import com.azure.storage.file.datalake.models.PathAccessControl;
import com.azure.storage.file.datalake.models.PathAccessControlEntry;
import com.azure.storage.file.datalake.models.PathPermissions;
import com.azure.storage.file.datalake.models.PathRemoveAccessControlEntry;
import com.azure.storage.file.datalake.models.RolePermissions;
import com.azure.storage.file.datalake.options.PathSetAccessControlRecursiveOptions;
```

## Connect to the account

To run the code examples in this article, you need to create a [DataLakeServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.datalakeserviceclient) instance that represents the storage account. You can authorize the client object with Microsoft Entra ID credentials or with an account key.

### [Microsoft Entra ID (recommended)](#tab/entra-id)

You can use the [Azure identity client library for Java](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/identity/azure-identity) to authenticate your application with Microsoft Entra ID.

First, you'll have to assign one of the following [Azure role-based access control (Azure RBAC)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/overview.md) roles to your security principal:

| Role | ACL setting capability |
| --- | --- |
| [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) | All directories and files in the account. |
| [Storage Blob Data Contributor](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-contributor) | Only directories and files owned by the security principal. |

Next, create a [DataLakeServiceClient](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.datalakeserviceclient) instance and pass in a new instance of the [DefaultAzureCredential](https://learn.microsoft.com/java/api/com.azure.identity.defaultazurecredential) class.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/Authorize_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-java.md)

To learn more about using `DefaultAzureCredential` to authorize access to data, see [Azure Identity client library for Java](https://learn.microsoft.com/java/api/overview/azure/identity-readme).

### [Account key](#tab/account-key)

You can authorize access to data using your account access keys (Shared Key). This example creates a [DataLakeServiceClient](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakeserviceclient) instance that is authorized with the account key.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/Authorize_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-java.md)


> **Caution:**
> Authorization with Shared Key is not recommended as it may be less secure. For optimal security, disable authorization via Shared Key for your storage account, as described in [Prevent Shared Key authorization for an Azure Storage account](../common/shared-key-authorization-prevent.md).
>
> Use of access keys and connection strings should be limited to initial proof of concept apps or development prototypes that don't access production or sensitive data. Otherwise, the token-based authentication classes available in the Azure SDK should always be preferred when authenticating to Azure resources.
>
> Microsoft recommends that clients use either Microsoft Entra ID or a shared access signature (SAS) to authorize access to data in Azure Storage. For more information, see [Authorize operations for data access](../common/authorize-data-access.md?toc=/azure/storage/blobs/toc.json\&bc=/azure/storage/blobs/breadcrumb/toc.json).


---

## Set ACLs

When you *set* an ACL, you **replace** the entire ACL including all of its entries. If you want to change the permission level of a security principal or add a new security principal to the ACL without affecting other existing entries, you should *update* the ACL instead. To update an ACL instead of replace it, see the [Update ACLs](#update-acls) section of this article.

If you choose to *set* the ACL, you must add an entry for the owning user, an entry for the owning group, and an entry for all other users. To learn more about the owning user, the owning group, and all other users, see [Users and identities](data-lake-storage-access-control.md#users-and-identities).

This section shows you how to:

- Set the ACL of a directory
- Set the ACL of a file
- Set ACLs recursively

### Set the ACL of a directory

This example gets and then sets the ACL of a directory named `my-directory`. This example gives the owning user read, write, and execute permissions, gives the owning group only read and execute permissions, and gives all others read access.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/ACL_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-java.md)

You can also get and set the ACL of the root directory of a container. To get the root directory, pass an empty string (`""`) into the **DataLakeFileSystemClient.getDirectoryClient** method.

### Set the ACL of a file

This example gets and then sets the ACL of a file named `upload-file.txt`. This example gives the owning user read, write, and execute permissions, gives the owning group only read and execute permissions, and gives all others read access.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/ACL_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-java.md)

### Set ACLs recursively

Set ACLs recursively by calling the **DataLakeDirectoryClient.setAccessControlRecursive** method. Pass this method a [List](https://docs.oracle.com/javase/8/docs/api/java/util/List.html) of [PathAccessControlEntry](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.models.pathaccesscontrolentry) objects. Each [PathAccessControlEntry](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.models.pathaccesscontrolentry) defines an ACL entry.

If you want to set a **default** ACL entry, then you can call the **setDefaultScope** method of the [PathAccessControlEntry](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.models.pathaccesscontrolentry) and pass in a value of **true**.

This example sets the ACL of a directory named `my-parent-directory`. This method accepts a boolean parameter named `isDefaultScope` that specifies whether to set the default ACL. That parameter is used in each call to the **setDefaultScope** method of the [PathAccessControlEntry](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.models.pathaccesscontrolentry). The entries of the ACL give the owning user read, write, and execute permissions, gives the owning group only read and execute permissions, and gives all others no access. The last ACL entry in this example gives a specific user with the object ID "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" read and execute permissions.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/ACL_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-java.md)

## Update ACLs

When you *update* an ACL, you modify the ACL instead of replacing the ACL. For example, you can add a new security principal to the ACL without affecting other security principals listed in the ACL.  To replace the ACL instead of update it, see the [Set ACLs](#set-acls) section of this article.

This section shows you how to:

- Update an ACL
- Update ACLs recursively

### Update an ACL

First, get the ACL of a directory by calling the [PathAccessControl.getAccessControlList](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.models.pathaccesscontrol.getaccesscontrollist) method. Copy the list of ACL entries to a new **List** object of type [PathAccessControlListEntry](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.models.pathaccesscontrolentry). Then locate the entry that you want to update and replace it in the list. Set the ACL by calling the [DataLakeDirectoryClient.setAccessControlList](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakedirectoryclient.setaccesscontrollist) method.

This example updates the ACL of a directory named `my-parent-directory` by replacing the entry for all other users.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/ACL_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-java.md)

You can also get and set the ACL of the root directory of a container. To get the root directory, pass an empty string (`""`) into the **DataLakeFileSystemClient.getDirectoryClient** method.

### Update ACLs recursively

To update an ACL recursively, create a new ACL object with the ACL entry that you want to update, and then use that object in update ACL operation. Do not get the existing ACL, just provide ACL entries to be updated.

Update ACLs recursively by calling the **DataLakeDirectoryClient.updateAccessControlRecursive** method.  Pass this method a [List](https://docs.oracle.com/javase/8/docs/api/java/util/List.html) of [PathAccessControlEntry](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.models.pathaccesscontrolentry) objects. Each [PathAccessControlEntry](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.models.pathaccesscontrolentry) defines an ACL entry.

If you want to update a **default** ACL entry, then you can call the **setDefaultScope** method of the [PathAccessControlEntry](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.models.pathaccesscontrolentry) and pass in a value of **true**.

This example updates an ACL entry with write permission. This method accepts a boolean parameter named `isDefaultScope` that specifies whether to update the default ACL. That parameter is used in the call to the **setDefaultScope** method of the [PathAccessControlEntry](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.models.pathaccesscontrolentry).

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/ACL_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-java.md)

## Remove ACL entries

You can remove one or more ACL entries. This section shows you how to:

- Remove an ACL entry
- Remove ACL entries recursively

### Remove an ACL entry

First, get the ACL of a directory by calling the [PathAccessControl.getAccessControlList](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.models.pathaccesscontrol.getaccesscontrollist) method. Copy the list of ACL entries to a new **List** object of type [PathAccessControlListEntry](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.models.pathaccesscontrolentry). Then locate the entry that you want to remove and call the **Remove** method of the **List** object. Set the updated ACL by calling the [DataLakeDirectoryClient.setAccessControlList](https://learn.microsoft.com/dotnet/api/azure.storage.files.datalake.datalakedirectoryclient.setaccesscontrollist) method.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/ACL_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-java.md)

### Remove ACL entries recursively

To remove ACL entries recursively, create a new ACL object for ACL entry to be removed, and then use that object in remove ACL operation. Do not get the existing ACL, just provide the ACL entries to be removed.

Remove ACL entries by calling the **DataLakeDirectoryClient.removeAccessControlRecursive** method. Pass this method a [List](https://docs.oracle.com/javase/8/docs/api/java/util/List.html) of [PathAccessControlEntry](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.models.pathaccesscontrolentry) objects. Each [PathAccessControlEntry](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.models.pathaccesscontrolentry) defines an ACL entry.

If you want to remove a **default** ACL entry, then you can call the **setDefaultScope** method of the [PathAccessControlEntry](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.models.pathaccesscontrolentry) and pass in a value of **true**.

This example removes an ACL entry from the ACL of the directory named `my-parent-directory`. This method accepts a boolean parameter named `isDefaultScope` that specifies whether to remove the entry from the default ACL. That parameter is used in the call to the **setDefaultScope** method of the [PathAccessControlEntry](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.models.pathaccesscontrolentry).

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/ACL_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-java.md)

## Recover from failures

You might encounter runtime or permission errors. For runtime errors, restart the process from the beginning. Permission errors can occur if the security principal doesn't have sufficient permission to modify the ACL of a directory or file that is in the directory hierarchy being modified. Address the permission issue, and then choose to either resume the process from the point of failure by using a continuation token, or restart the process from beginning. You don't have to use the continuation token if you prefer to restart from the beginning. You can reapply ACL entries without any negative impact.

This example returns a continuation token in the event of a failure. The application can call this example method again after the error has been addressed, and pass in the continuation token. If this example method is called for the first time, the application can pass in a value of `null` for the continuation token parameter.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/ACL_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-java.md)

If you want the process to complete uninterrupted by permission errors, you can specify that.

To ensure that the process completes uninterrupted, call the **setContinueOnFailure** method of a [PathSetAccessControlRecursiveOptions](https://learn.microsoft.com/java/api/com.azure.storage.file.datalake.models.pathaccesscontrolentry) object and pass in a value of **true**.

This example sets ACL entries recursively. If this code encounters a permission error, it records that failure and continues execution. This example prints the number of failures to the console.

[Code reference unavailable in this source snapshot: ~/azure-storage-snippets/blobs/howto/Java/Java-v12/src/main/java/com/datalake/manage/ACL_DataLake.java](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/blobs/data-lake-storage-acl-java.md)


## Best practices

This section provides you some best practice guidelines for setting ACLs recursively. 

#### Handling runtime errors

A runtime error can occur for many reasons (For example: an outage or a client connectivity issue). If you encounter a runtime error, restart the recursive ACL process. ACLs can be reapplied to items without causing a negative impact. 

#### Handling permission errors (403)

If you encounter an access control exception while running a recursive ACL process, your AD [security principal](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/overview.md#security-principal) might not have sufficient permission to apply an ACL to one or more of the child items in the directory hierarchy. When a permission error occurs, the process stops and a continuation token is provided. Fix the permission issue, and then use the continuation token to process the remaining dataset. The directories and files that have already been successfully processed won't have to be processed again. You can also choose to restart the recursive ACL process. ACLs can be reapplied to items without causing a negative impact. 

#### Credentials 

We recommend that you provision a Microsoft Entra security principal that has been assigned the [Storage Blob Data Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-owner) role in the scope of the target storage account or container. 

#### Performance 

To reduce latency, we recommend that you run the recursive ACL process in an Azure Virtual Machine (VM) that is located in the same region as your storage account. 

#### ACL limits

The maximum number of ACLs that you can apply to a directory or file is 32 access ACLs and 32 default ACLs. For more information, see [Access control in Azure Data Lake Storage Gen2](data-lake-storage-access-control.md).


## See also

- [API reference documentation](https://learn.microsoft.com/java/api/overview/azure/storage-file-datalake-readme)
- [Package (Maven)](https://search.maven.org/artifact/com.azure/azure-storage-file-datalake)
- [Samples](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-file-datalake)
- [Gen1 to Gen2 mapping](https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage/azure-storage-file-datalake/GEN1_GEN2_MAPPING.md)
- [Known issues](data-lake-storage-known-issues.md#api-scope-data-lake-client-library)
- [Give Feedback](https://github.com/Azure/azure-sdk-for-java/issues)
- [Access control model in Azure Data Lake Storage](data-lake-storage-access-control.md)
- [Access control lists (ACLs) in Azure Data Lake Storage](data-lake-storage-access-control.md)
