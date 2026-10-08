---
title: Microsoft Azure Stack Edge Blob storage requirements| Microsoft Docs
description: Learn about the supported versions for APIs, SDKs, and client libraries for Azure Stack Edge Blob storage
services: databox
author: sipastak

ms.service: azure-stack-edge
ms.topic: reference
ms.date: 10/21/2020
ms.author: sipastak
ms.custom: sfi-ropc-nochange
---
# Azure Stack Edge Blob storage requirements

This article lists the versions of the Azure APIs, Azure client libraries, and tools supported with the Azure Stack Edge Blob storage. Azure Stack Edge Blob storage provides blob management functionality with Azure-consistent semantics. This article also summarizes the known Azure Stack Edge Blob storage differences from the Azure Storage services.

We recommend that you review the information carefully before you connect to the Azure Stack Edge Blob storage, and then refer back to it as necessary.

## Storage differences

| Feature | Azure Storage | Azure Stack Edge Blob storage |
| --- | --- | --- |
| Azure Files | Cloud-based SMB and NFS file shares supported | Not supported |
| Storage account type | General-purpose and Azure Blob storage accounts | General-purpose v1 only |
| Blob name | 1,024 characters (2,048 bytes) | 880 characters (1,760 bytes) |
| Block blob maximum size | 4.75 TiB (100 MiB X 50,000 blocks) | 4.75 TiB (100 MiB x 50,000 blocks) for Azure Stack Edge |
| Page blob maximum size | 8 TiB | 1 TiB |
| Page blob page size | 512 bytes | 4 KiB |

## Supported API versions

The following versions of Azure Storage service APIs are supported with Azure Stack Edge Blob storage.

### Azure Stack Edge 2.1.1377.2170 onwards


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

For Azure Stack Edge Blob storage, there are specific client libraries and specific endpoint suffix requirements. The Azure Stack Edge Blob storage endpoints do not have full parity with the latest version of the Azure Blob Storage REST API; see the [supported API versions for Azure Stack Edge](#supported-api-versions). For the storage client libraries, you need to be aware of the version that is compatible with the REST API.

### Azure Stack Edge 2.1.1377.2170 onwards

The following Azure client library versions are supported for Azure Stack Edge Blob storage.


| Client library | Supported version | Link | Endpoint specification |
| --- | --- | --- | --- |
| .NET | 11.0.0 | NuGet package:  <br>Common:   https://www.nuget.org/packages/Microsoft.Azure.Storage.Common/11.0.0    <br> Blob:   https://www.nuget.org/packages/Microsoft.Azure.Storage.Blob/11.0.0 <br>Queue:   https://www.nuget.org/packages/Microsoft.Azure.Storage.Queue/11.0.0 <br>GitHub release:   https://github.com/Azure/azure-storage-net/releases/tag/v11.0.0 | app.config file |
| Java | 12.0.0-preview.3 | Maven package:   https://mvnrepository.com/artifact/com.azure/azure-storage-file/12.0.0-preview.3   <br>GitHub release:   https://github.com/Azure/azure-sdk-for-java/tree/master/sdk/storage | Connection string setup |
| Node.js | 2.8.3 | NPM link:   https://www.npmjs.com/package/azure-storage   (Run: `npm install azure-storage@2.7.0`)   <br>GitHub release:   https://github.com/Azure/azure-storage-node/releases/tag/v2.8.3 | Service instance declaration |
| C++ | 5.2.0 | NuGet package:   https://www.nuget.org/packages/wastorage.v140/5.2.0   <br>GitHub release:   https://github.com/Azure/azure-storage-cpp/releases/tag/v5.2.0 | Connection string setup |
| PHP | 1.2.0 | GitHub release:<br>Common: https://github.com/Azure/azure-storage-php/releases/tag/v1.2.0-common   <br>Blob: https://github.com/Azure/azure-storage-php/releases/tag/v1.2.0-blob      <br>Install via Composer (To learn more, See   the details below.) | Connection string setup |
| Python | 1.1.0 | GitHub release:<br>Common:   https://github.com/Azure/azure-storage-python/releases/tag/v1.0.0-common <br>Blob:   https://github.com/Azure/azure-storage-python/releases/tag/v1.1.0-blob | Service instance declaration |
| Ruby | 1.0.1 | RubyGems package:<br>Common:   https://rubygems.org/gems/azure-storage-common/versions/1.0.1   <br>Blob: https://rubygems.org/gems/azure-storage-blob/versions/1.0.1         <br>GitHub release:<br>Common: https://github.com/Azure/azure-storage-ruby/releases/tag/v1.0.1-common   <br>Blob: https://github.com/Azure/azure-storage-ruby/releases/tag/v1.0.1-blob | Connection string setup |




### Install the PHP client via Composer - Current

To install the PHP client via Composer:

1. Create a file named composer.json in the root of the project with following code (example uses Azure Storage Blob service).

    ```
    {
    "require": {
    "Microsoft/azure-storage-blob":"1.2.0"
    }
    ```

2. Download `composer.phar` to the project root.

3. Run: php composer.phar install.


## Endpoint declaration

In the Azure Stack Edge Blob storage SDK, the endpoint suffix - `<device serial number>.microsoftdatabox.com` - identifies the Azure Stack Edge domain. For more information on the blob service endpoint, go to [Transfer data via storage accounts with Azure Stack Edge Pro GPU](azure-stack-edge-gpu-deploy-add-storage-accounts.md).


## Examples

### .NET

For Azure Stack Edge Blob storage, the endpoint suffix is specified in the `app.config` file:

```
<add key="StorageConnectionString"
value="DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=mykey;
EndpointSuffix=<<serial no. of the device>.microsoftdatabox.com  />
```

### Java

For Azure Stack Edge Blob storage, the endpoint suffix is specified in the setup of connection string:

```
public static final String storageConnectionString =
    "DefaultEndpointsProtocol=http;" +
    "AccountName=your_storage_account;" +
    "AccountKey=your_storage_account_key;" +
    "EndpointSuffix=<serial no. of the device>.microsoftdatabox.com ";
```

### Node.js

For Azure Stack Edge Blob storage, the endpoint suffix is specified in the declaration instance:

```
var blobSvc = azure.createBlobService('myaccount', 'mykey',
'myaccount.blob. <serial no. of the device>.microsoftdatabox.com ');
```

### C++

For Azure Stack Edge Blob storage, the endpoint suffix is specified in the setup of the connection string:

```
const utility::string_t storage_connection_string(U("DefaultEndpointsProtocol=https;
AccountName=your_storage_account;
AccountKey=your_storage_account_key;
EndpointSuffix=<serial no. of the device>.microsoftdatabox.com "));
```

### PHP

For Azure Stack Edge Blob storage, the endpoint suffix is specified in the setup of the connection string:

```
$connectionString = 'BlobEndpoint=http://<storage account name>.blob.<serial no. of the device>.microsoftdatabox.com /;
AccountName=<storage account name>;AccountKey=<storage account key>'
```

### Python

For Azure Stack Edge Blob storage, the endpoint suffix is specified in the declaration instance:

```
block_blob_service = BlockBlobService(account_name='myaccount',
account_key='mykey',
endpoint_suffix=’<serial no. of the device>.microsoftdatabox.com’)
```

### Ruby

For Azure Stack Edge Blob storage, the endpoint suffix is specified in the setup of the connection string:

```
set
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;
AccountName=myaccount;
AccountKey=mykey;
EndpointSuffix=<serial no. of the device>.microsoftdatabox.com
```

## Next steps

* [Prepare to deploy Azure Stack Edge Pro with GPU](azure-stack-edge-gpu-deploy-prep.md)
