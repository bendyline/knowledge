---
author: mattchenderson
ms.service: azure-functions
ms.topic: include
ms.date: 10/08/2021
ms.author: mahender
---

## Connections

The `connection` property is a reference to environment configuration that specifies how the app should connect to Azure Blobs. It may specify:

- The name of an application setting containing a [connection string](#connection-string)
- The name of a shared prefix for multiple application settings, together defining an [identity-based connection](#identity-based-connections).

If the configured value is both an exact match for a single setting and a prefix match for other settings, the exact match is used.

### Connection string

To obtain a connection string, follow the steps shown at [Manage storage account access keys](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-keys-manage.md). The connection string must be for a general-purpose storage account, not a [Blob storage account](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-account-overview.md#types-of-storage-accounts).

This connection string should be stored in an application setting with a name matching the value specified by the `connection` property of the binding configuration.

If the app setting name begins with "AzureWebJobs", you can specify only the remainder of the name here. For example, if you set `connection` to "MyStorage", the Functions runtime looks for an app setting that is named "AzureWebJobsMyStorage". If you leave `connection` empty, the Functions runtime uses the default Storage connection string in the app setting that is named `AzureWebJobsStorage`.

### Identity-based connections

If you're using [version 5.x or higher of the extension](../articles/azure-functions/functions-bindings-storage-blob.md#install-extension) ([bundle 3.x or higher](../articles/azure-functions/functions-bindings-storage-blob.md?tabs=extensionv3#install-bundle) for non-.NET language stacks), instead of using a connection string with a secret, you can have the app use a [Microsoft Entra identity](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/active-directory-whatis.md). To use an identity, you define settings under a common prefix that maps to the `connection` property in the trigger and binding configuration.

If you're setting `connection` to "AzureWebJobsStorage", see [Connecting to host storage with an identity](../articles/azure-functions/functions-reference.md#connecting-to-host-storage-with-an-identity). For all other connections, the extension requires the following properties: 

| Property | Environment variable template | Description | Example value |
| --- | --- | --- | --- |
| Blob Service URI | `<CONNECTION_NAME_PREFIX>__serviceUri`<sup>1</sup> | The data plane URI of the blob service to which you're connecting, using the HTTPS scheme. | https://<storage_account_name>.blob.core.windows.net |

<sup>1</sup> `<CONNECTION_NAME_PREFIX>__blobServiceUri` can be used as an alias. If the connection configuration will be used by a blob trigger, `blobServiceUri` must also be accompanied by `queueServiceUri`. See below.

The `serviceUri` form  can't be used when the overall connection configuration is to be used across blobs, queues, and/or tables. The URI can only designate the blob service. As an alternative, you can provide a URI specifically for each service, allowing a single connection to be used. If both versions are provided, the multi-service form is used. To configure the connection for multiple services, instead of `<CONNECTION_NAME_PREFIX>__serviceUri`, set:

| Property | Environment variable template | Description | Example value |
| --- | --- | --- | --- |
| Blob Service URI | `<CONNECTION_NAME_PREFIX>__blobServiceUri` | The data plane URI of the blob service to which you're connecting, using the HTTPS scheme. | https://<storage_account_name>.blob.core.windows.net |
| Queue Service URI (**required for blob triggers**<sup>2</sup>) | `<CONNECTION_NAME_PREFIX>__queueServiceUri` | The data plane URI of a queue service, using the HTTPS scheme. This value is only needed for blob triggers. | https://<storage_account_name>.queue.core.windows.net |

<sup>2</sup> The blob trigger handles failure across multiple retries by writing [poison blobs] to a queue. In the `serviceUri` form, the `AzureWebJobsStorage` connection is used. However, when specifying `blobServiceUri`, a queue service URI must also be provided with `queueServiceUri`. It's recommended that you use the service from the same storage account as the blob service. You also need to make sure the trigger can read and write messages in the configured queue service by assigning a role like [Storage Queue Data Contributor](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-queue-data-contributor). 

Other properties may be set to customize the connection. See [Common properties for identity-based connections](../articles/azure-functions/functions-reference.md#common-properties-for-identity-based-connections).

#### User-assigned managed identity

To use a user-assigned managed identity, add the `credential` and `clientId` properties in addition to the service URI:

| Property | Environment variable template | Description | Example value |
| --- | --- | --- | --- |
| Blob Service URI | `<CONNECTION_NAME_PREFIX>__blobServiceUri` | The data plane URI of the blob service. | `https://mystorageaccount.blob.core.windows.net` |
| Queue Service URI | `<CONNECTION_NAME_PREFIX>__queueServiceUri` | The data plane URI of the queue service (required for blob triggers). | `https://mystorageaccount.queue.core.windows.net` |
| Credential | `<CONNECTION_NAME_PREFIX>__credential` | Must be set to `managedidentity`. | `managedidentity` |
| Client ID | `<CONNECTION_NAME_PREFIX>__clientId` | The client ID of the user-assigned managed identity. | `00000000-0000-0000-0000-000000000000` |

For example, if your binding configuration specifies `connection = "BlobStorageConnection"`, you would configure the following application settings:

```json
{
    "BlobStorageConnection__blobServiceUri": "https://mystorageaccount.blob.core.windows.net",
    "BlobStorageConnection__queueServiceUri": "https://mystorageaccount.queue.core.windows.net",
    "BlobStorageConnection__credential": "managedidentity",
    "BlobStorageConnection__clientId": "00000000-0000-0000-0000-000000000000"
}
```

> **Tip:**
> User-assigned managed identities are recommended for production scenarios where you need fine-grained control over identity permissions across multiple resources.


When hosted in the Azure Functions service, identity-based connections use a [managed identity](../articles/app-service/overview-managed-identity.md?toc=%2fazure%2fazure-functions%2ftoc.json). The system-assigned identity is used by default, although a user-assigned identity can be specified with the `credential` and `clientID` properties. Note that configuring a user-assigned identity with a resource ID is **not** supported. When run in other contexts, such as local development, your developer identity is used instead, although this can be customized. See [Local development with identity-based connections](../articles/azure-functions/functions-reference.md#local-development-with-identity-based-connections).

#### Grant permission to the identity

Whatever identity is being used must have permissions to perform the intended actions. For most Azure services, this means you need to [assign a role in Azure RBAC](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/role-assignments-steps.md), using either built-in or custom roles which provide those permissions.

> **Important:**
> Some permissions might be exposed by the target service that are not necessary for all contexts. Where possible, adhere to the **principle of least privilege**, granting the identity only required privileges. For example, if the app only needs to be able to read from a data source, use a role that only has permission to read. It would be inappropriate to assign a role that also allows writing to that service, as this would be excessive permission for a read operation. Similarly, you would want to ensure the role assignment is scoped only over the resources that need to be read.


[Include unavailable in this source snapshot: ./functions-blob-permissions.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/includes/functions-storage-blob-connections.md)

[poison blobs]: ../articles/azure-functions/functions-bindings-storage-blob-trigger.md#poison-blobs
