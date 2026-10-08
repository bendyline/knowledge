---
title: Microsoft Azure Data Box Blob storage requirements| Microsoft Docs
description: Learn about the supported versions for APIs, SDKs, and client libraries for Azure Data Box Blob storage
services: databox
author: stevenmatthew

ms.service: azure-data-box
ms.topic: concept-article
ms.date: 10/05/2020
ms.author: shaas
ms.custom: sfi-ropc-nochange
# Customer intent: "As a cloud architect, I want to understand the API compatibility and storage capabilities of Data Box Blob storage, so that I can effectively configure data transfer solutions that meet my organization's specific storage requirements."
---
# Azure Data Box Blob storage requirements

This article lists the versions of the Azure APIs, Azure client libraries, and tools supported with the Data Box Blob storage. Data Box Blob storage provides blob management functionality with Azure-consistent semantics. This article also summarizes the known Azure Data Box Blob storage differences from the Azure Storage services.

We recommend that you review the information carefully before you connect to the Data Box Blob storage, and then refer back to it as necessary.


## Storage differences

| Feature | Azure Storage | Data Box Blob storage |
| --- | --- | --- |
| Azure Files | Cloud-based SMB and NFS file shares supported | Not supported |
| Service encryption for data at Rest | 256-bit AES encryption | 256-bit AES encryption |
| Storage account type | General-purpose and Azure Blob storage accounts | General-purpose v1 only |
| Blob name | 1,024 characters (2,048 bytes) | 880 characters (1,760 bytes) |
| Block blob maximum size | 4.75 TiB (100 MB X 50,000 blocks) | 4.75 TiB (100 MB x 50,000 blocks) for Azure Data Box v 3.0 onwards. |
| Page blob maximum size | 8 TiB | 1 TiB |
| Page blob page size | 512 bytes | 4 KiB |

## Supported API versions

The following versions of Azure Storage service APIs are supported with Data Box Blob storage.

### Azure Data Box 3.0 onwards


- [2019-02-02](https://learn.microsoft.com/rest/api/storageservices/version-2019-02-02)
- [2018-11-09](https://learn.microsoft.com/rest/api/storageservices/version-2018-11-09)
- [2018-03-28](https://learn.microsoft.com/rest/api/storageservices/version-2018-03-28)
- [2017-11-09](https://learn.microsoft.com/rest/api/storageservices/version-2017-11-09)
- [2017-07-29](https://learn.microsoft.com/rest/api/storageservices/version-2017-07-29)
- [2017-04-17](https://learn.microsoft.com/rest/api/storageservices/version-2017-04-17)
- [2016-05-31](https://learn.microsoft.com/rest/api/storageservices/version-2016-05-31)
- [2015-12-11](https://learn.microsoft.com/rest/api/storageservices/version-2015-12-11)
- [2015-07-08](https://learn.microsoft.com/rest/api/storageservices/version-2015-07-08)
- [2015-04-05](https://learn.microsoft.com/rest/api/storageservices/version-2015-04-05)


## Supported Azure client libraries

For Data Box Blob storage, there are specific client libraries and specific endpoint suffix requirements. The Data Box Blob storage endpoints do not have full parity with the latest version of the Azure Blob Storage REST API; see the [supported versions for Azure Data Box 3.0 onwards](#supported-api-versions). For the storage client libraries, you need to be aware of the version that is compatible with the REST API.

### Azure Data Box 3.0 onwards

The following Azure client library versions are supported for Data Box Blob storage.


| Client library | Supported version | Link | Endpoint specification |
| --- | --- | --- | --- |
| .NET | 11.0.0 | NuGet package:  <br>Common:   https://www.nuget.org/packages/Microsoft.Azure.Storage.Common/11.0.0    <br> Blob:   https://www.nuget.org/packages/Microsoft.Azure.Storage.Blob/11.0.0 <br>Queue:   https://www.nuget.org/packages/Microsoft.Azure.Storage.Queue/11.0.0 <br>GitHub release:   https://github.com/Azure/azure-storage-net/releases/tag/v11.0.0 | app.config file |
| Java | 12.0.0-preview.3 | Maven package:   https://mvnrepository.com/artifact/com.azure/azure-storage-file/12.0.0-preview.3   <br>GitHub release:   https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage | Connection string setup |
| Node.js | 2.8.3 | NPM link:   https://www.npmjs.com/package/azure-storage   (Run: `npm install azure-storage@2.7.0`)   <br>GitHub release:   https://github.com/Azure/azure-storage-node/releases/tag/v2.8.3 | Service instance declaration |
| C++ | 5.2.0 | NuGet package:   https://www.nuget.org/packages/wastorage.v140/5.2.0   <br>GitHub release:   https://github.com/Azure/azure-storage-cpp/releases/tag/v5.2.0 | Connection string setup |
| PHP | 1.2.0 | GitHub release:<br>Common: https://github.com/Azure/azure-storage-php/releases/tag/v1.2.0-common   <br>Blob: https://github.com/Azure/azure-storage-php/releases/tag/v1.2.0-blob      <br>Install via Composer (To learn more, See   the details below.) | Connection string setup |
| Python | 1.1.0 | GitHub release:<br>Common:   https://github.com/Azure/azure-storage-python/releases/tag/v1.0.0-common <br>Blob:   https://github.com/Azure/azure-storage-python/releases/tag/v1.1.0-blob | Service instance declaration |
| Ruby | 1.0.1 | RubyGems package:<br>Common:   https://rubygems.org/gems/azure-storage-common/versions/1.0.1   <br>Blob: https://rubygems.org/gems/azure-storage-blob/versions/1.0.1         <br>GitHub release:<br>Common: https://github.com/Azure/azure-storage-ruby/releases/tag/v1.0.1-common   <br>Blob: https://github.com/Azure/azure-storage-ruby/releases/tag/v1.0.1-blob | Connection string setup |




### Install PHP client via Composer - current

To install via Composer: (take blob as example).
1. Create a file named composer.json in the root of the project with following code:

    ```
    {
    "require": {
    "Microsoft/azure-storage-blob":"1.2.0"
    }
    ```

2. Download `composer.phar` to the project root.

3. Run: php composer.phar install.

### Endpoint declaration

In the Data Box Blob storage SDK, the endpoint suffix - `<device serial number>.microsoftdatabox.com` - identifies the Data Box domain. For more information on the blob service endpoint, go to [Connect via Data Box Blob storage](data-box-deploy-copy-data-via-rest.md).
 
## Examples

### .NET

For Data Box Blob storage, the endpoint suffix is specified in the `app.config` file:

```
<add key="StorageConnectionString"
value="DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=mykey;
EndpointSuffix=<<serial no. of the device>.microsoftdatabox.com  />
```

### Java

For Data Box Blob storage, the endpoint suffix is specified in the setup of connection string:

```
public static final String storageConnectionString =
    "DefaultEndpointsProtocol=http;" +
    "AccountName=your_storage_account;" +
    "AccountKey=your_storage_account_key;" +
    "EndpointSuffix=<serial no. of the device>.microsoftdatabox.com ";
```

### Node.js

For Data Box Blob storage, the endpoint suffix is specified in the declaration instance:

```
var blobSvc = azure.createBlobService('myaccount', 'mykey',
'myaccount.blob. <serial no. of the device>.microsoftdatabox.com ');
```

### C++

For Data Box Blob storage, the endpoint suffix is specified in the setup of connection string:

```
const utility::string_t storage_connection_string(U("DefaultEndpointsProtocol=https;
AccountName=your_storage_account;
AccountKey=your_storage_account_key;
EndpointSuffix=<serial no. of the device>.microsoftdatabox.com "));
```

### PHP

For Data Box Blob storage, the endpoint suffix is specified in the setup of connection string:

```
$connectionString = 'BlobEndpoint=http://<storage account name>.blob.<serial no. of the device>.microsoftdatabox.com /;
AccountName=<storage account name>;AccountKey=<storage account key>'
```

### Python

For Data Box Blob storage, the endpoint suffix is specified in the declaration instance:

```
block_blob_service = BlockBlobService(account_name='myaccount',
account_key='mykey',
endpoint_suffix=’<serial no. of the device>.microsoftdatabox.com’)
```

### Ruby

For Data Box Blob storage, the endpoint suffix is specified in the setup of connection string:

```
set
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;
AccountName=myaccount;
AccountKey=mykey;
EndpointSuffix=<serial no. of the device>.microsoftdatabox.com
```

## Next steps

* [Deploy your Azure Data Box](data-box-deploy-ordered.md)
