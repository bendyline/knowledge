---
author: mattchenderson
ms.service: azure-functions
ms.topic: include
ms.date: 07/10/2023
ms.author: mahender
---

The blob trigger can bind to the following types:

| Type | Description |
| --- | --- |
| `string` | The blob content as a string. Use when the blob content is simple text. |
| `byte[]` | The bytes of the blob content. |
| JSON serializable types | When a blob contains JSON data, Functions tries to deserialize the JSON data into a plain-old CLR object (POCO) type. |
| [Stream]<sup>1</sup> | An input stream of the blob content. |
| [BlobClient]<sup>1</sup>,<br/>[BlockBlobClient]<sup>1</sup>,<br/>[PageBlobClient]<sup>1</sup>,<br/>[AppendBlobClient]<sup>1</sup>,<br/>[BlobBaseClient]<sup>1</sup> | A client connected to the blob. This set of types offers the most control for processing the blob and can be used to write back to the blob if the connection has sufficient permission. |

<sup>1</sup> To use these types, you need to reference [Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs 6.0.0 or later](https://www.nuget.org/packages/Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs/) and the [common dependencies for SDK type bindings](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-functions/dotnet-isolated-process-guide.md#sdk-types).

[Stream]: https://learn.microsoft.com/dotnet/api/system.io.stream

[BlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.blobclient
[BlockBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blockblobclient
[PageBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.pageblobclient
[AppendBlobClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.appendblobclient
[BlobBaseClient]: https://learn.microsoft.com/dotnet/api/azure.storage.blobs.specialized.blobbaseclient
