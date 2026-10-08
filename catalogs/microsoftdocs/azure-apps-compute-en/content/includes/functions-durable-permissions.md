---
author: mattchenderson
ms.service: azure-functions
ms.topic: include
ms.date: 07/11/2026
ms.author: mahender
---

You'll need to create a role assignment that provides access to Azure storage at runtime. Management roles like [Owner](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#owner) aren't sufficient. The following built-in roles are recommended when using the Durable Functions extension in normal operation:

- [Storage Blob Data Contributor]
- [Storage Queue Data Contributor]
- [Storage Table Data Contributor]

Your application may require more permissions based on the code you write. If you're using the default behavior or explicitly setting `connectionName` to "AzureWebJobsStorage", see [Connecting to host storage with an identity](../articles/azure-functions/manage-connections.md?pivots=functions-auth-identity&tabs=host#define-connections) for other permission considerations.

[Storage Blob Data Contributor]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-contributor
[Storage Queue Data Contributor]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-queue-data-contributor
[Storage Table Data Contributor]: https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-table-data-contributor
