---
title: Monitoring data reference for Azure Files
description: This article contains important reference material you need when you monitor Azure Files.
ms.date: 02/03/2026
ms.custom: horz-monitor
ms.topic: reference
author: khdownie
ms.author: kendownie
ms.service: azure-file-storage
# Customer intent: As a cloud administrator, I want to access monitoring data for Azure Files, so that I can efficiently track performance and diagnose issues within my file shares.
---

# Azure Files monitoring data reference

:heavy_check_mark: **Applies to:** Classic SMB and NFS file shares created with the Microsoft.Storage resource provider

:heavy_multiplication_x: **Doesn't apply to:** File shares created with the Microsoft.FileShares resource provider

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-monitoring-reference.md)

See [Monitor Azure Files](storage-files-monitoring.md) for details on the data you can collect for Azure Files and how to use it.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-monitoring-reference.md)

### Supported metrics for Microsoft.Storage/storageAccounts
The following table lists the metrics available for the Microsoft.Storage/storageAccounts resource type.
[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-monitoring-reference.md)
[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-storage-storageaccounts-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-monitoring-reference.md)

### Supported metrics for Microsoft.Storage/storageAccounts/fileServices
The following table lists the metrics available for the Microsoft.Storage/storageAccounts/fileServices resource type.

> **Note:**
> The File Capacity and File Count metrics are emitted hourly, but they aren't refreshed every hour. A background process recomputes these metrics and updates them multiple times a day. The timing and frequency of updates might vary from day to day based on operational factors.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-tableheader.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-monitoring-reference.md)
[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/metrics/microsoft-storage-storageaccounts-fileservices-metrics-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-monitoring-reference.md)

<a name="metrics-dimensions"></a>
[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions-intro.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-monitoring-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-metrics-dimensions.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-monitoring-reference.md)

> **Note:** 
> The File Share dimension is not available for HDD pay-as-you-go file shares (only provisioned file shares). When using HDD pay-as-you-go file shares, the metrics provided are for all file shares in the storage account. To get per-share metrics for HDD pay-as-you-go file shares, create one file share per storage account.


| **Dimension Name** | **Description** |
| --- | --- |
| **GeoType** | Transaction from Primary or Secondary cluster. The available values include **Primary** and **Secondary**. It applies to Read Access Geo Redundant Storage (RA-GRS) when reading objects from a secondary tenant. |
| **ResponseType** | Transaction response type. The available values include: <br/><br/> <li>**ServerOtherError**: All other server-side errors except described ones. </li> <li>**ServerBusyError**: Authenticated request that returned an HTTP 503 status code. </li> <li>**ServerTimeoutError**: Timed-out authenticated request that returned an HTTP 500 status code. The timeout occurred due to a server error. </li><li>**AuthenticationError**: The request couldn't be authenticated by the server.</li><li>**AuthorizationError**: Authenticated request that failed due to unauthorized access of data or an authorization failure. </li> <li>**NetworkError**: Authenticated request that failed due to network errors. Most commonly occurs when a client prematurely closes a connection before timeout expiration. </li><li>**ClientAccountBandwidthThrottlingError**: The request is throttled on bandwidth for exceeding [storage account scalability limits](../common/scalability-targets-standard-account.md?toc=%2fazure%2fstorage%2fblobs%2ftoc.json).</li><li>**ClientAccountRequestThrottlingError**: The request is throttled on request rate for exceeding [storage account scalability limits](../common/scalability-targets-standard-account.md?toc=%2fazure%2fstorage%2fblobs%2ftoc.json).<li>**ClientThrottlingError**: Other client-side throttling error. `ClientAccountBandwidthThrottlingError` and `ClientAccountRequestThrottlingError` are excluded.</li><li>**ClientShareEgressThrottlingError**: Applicable to premium file shares only. Other client-side throttling error. The request failed due to egress bandwidth throttling for exceeding share limits. `ClientAccountBandwidthThrottlingError` is excluded.</li><li>**ClientShareIngressThrottlingError**: Applicable to premium file shares only. Other client-side throttling error. The request failed due to ingress bandwidth throttling for exceeding share limits. `ClientAccountBandwidthThrottlingError` is excluded.</li><li>**ClientShareIopsThrottlingError**: Other client-side throttling error. The request failed due to IOPS throttling. `ClientAccountRequestThrottlingError` is excluded.</li><li>**ClientTimeoutError**: Timed-out authenticated request that returned an HTTP 500 status code. If the client's network timeout or the request timeout is set to a lower value than expected by the storage service, it's an expected timeout. Otherwise, it's reported as a `ServerTimeoutError`. </li> <li>**ClientOtherError**: All other client-side errors except described ones. </li> <li>**Success**: Successful request</li> <li> **SuccessWithThrottling**: Successful request when an SMB client gets throttled in the first attempt(s) but succeeds after retries.</li><li> **SuccessWithShareEgressThrottling**: Applicable to premium file shares only. Successful request when an SMB client gets throttled due to egress bandwidth throttling in the first attempt or attempts, but succeeds after retries.</li><li> **SuccessWithShareIngressThrottling**: Applicable to premium file shares only. Successful request when an SMB client gets throttled due to ingress bandwidth throttling in the first attempt or attempts, but succeeds after retries.</li><li> **SuccessWithShareIopsThrottling**: Successful request when an SMB client gets throttled due to IOPS throttling in the first attempt(s) but succeeds after retries.</li><li> **SuccessWithMetadataWarning**: Applicable to file shares only. Successful request when a client runs high metadata IOPS, which may cause throttling later if the IOPS remain high or increase.</li><li> **SuccessWithMetadataThrottling**: Applicable to file shares only. Successful request when a client gets throttled due to high metadata IOPS in the first attempt or attempts, but succeeds after retries.</li> |
| **ApiName** | The name of operation. If a failure occurs before the name of the [operation](https://learn.microsoft.com/rest/api/storageservices/storage-analytics-logged-operations-and-status-messages) is identified,  the name appears as "Unknown." You can use the value of the `ResponseType` dimension to learn more about the failure. |
| **Authentication** | Authentication type used in transactions. The available values include: <br/> <li>**AccountKey**: The transaction is authenticated with storage account key.</li> <li>**SAS**: The transaction is authenticated with service/account shared access signatures.</li><li>**DelegationSas**: The transaction is authenticated with user-delegation SAS.</li> <li>**OAuth**: The transaction is authenticated with OAuth access tokens.</li> <li>**Anonymous**: The transaction is requested anonymously. It doesn’t include preflight requests.</li> <li>**AnonymousPreflight**: The transaction is preflight request.</li> |
| **TransactionType** | Type of transaction. The available values include: <br/> <li>**User**: The transaction was made by customer.</li> <li>**System**: The transaction was made by system process.</li> |


<a name="resource-logs-preview"></a>
[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-resource-logs.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-monitoring-reference.md)

### Supported resource logs for Microsoft.Storage/storageAccounts/fileServices
[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/reference/logs/microsoft-storage-storageaccounts-fileservices-logs-include.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-monitoring-reference.md)

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-logs-tables.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-monitoring-reference.md)

- [AzureActivity](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azureactivity)
- [AzureMetrics](https://learn.microsoft.com/azure/azure-monitor/reference/tables/azuremetrics)
- [StorageFileLogs](https://learn.microsoft.com/azure/azure-monitor/reference/tables/storagefilelogs)

The following tables list the properties for Azure Storage resource logs when they're collected in Azure Monitor Logs or Azure Storage. The properties describe the operation, the service, and the type of authorization that was used to perform the operation.

### Fields that describe the operation


| Property | Description |
| :--- | :--- |
| **time** | The Universal Time Coordinated (UTC) time when the request was received by storage. For example: `2018/11/08 21:09:36.6900118`. |
| **resourceId** | The resource ID of the storage account. For example: `/subscriptions/aaaa0a0a-bb1b-cc2c-dd3d-eeeeee4e4e4e/resourceGroups/`<br>`myresourcegroup/providers/Microsoft.Storage/storageAccounts/mystorageaccount/storageAccounts/blobServices/default` |
| **category** | The category of the requested operation. For example: `StorageRead`, `StorageWrite`, or `StorageDelete`. |
| **operationName** | The type of REST operation that was performed. <br> For a complete list of operations, see [Storage Analytics Logged Operations and Status Messages topic](https://learn.microsoft.com/rest/api/storageservices/storage-analytics-logged-operations-and-status-messages). |
| **operationVersion** | The storage service version that was specified when the request was made. This is equivalent to the value of the **x-ms-version** header. For example: `2017-04-17`. |
| **schemaVersion** | The schema version of the log. For example: `1.0`. |
| **statusCode** | The HTTP or [SMB](https://learn.microsoft.com/openspecs/windows_protocols/ms-cifs/8f11e0f3-d545-46cc-97e6-f00569e3e1bc) status code for the request. If the HTTP request is interrupted, this value might be set to `Unknown`. <br> For example: `206` |
| **statusText** | The status of the requested operation.  For a complete list of status messages, see [Storage Analytics Logged Operations and Status Messages topic](https://learn.microsoft.com/rest/api/storageservices/storage-analytics-logged-operations-and-status-messages). In version 2017-04-17 and later, the status message `ClientOtherError` isn't used. Instead, this field contains an error code. For example: `SASSuccess` |
| **durationMs** | The total time, expressed in milliseconds, to perform the requested operation. This includes the time to read the incoming request, and to send the response to the requester. For example: `12`. |
| **callerIpAddress** | The IP address of the requester, including the port number. For example: `192.100.0.102:4362`. |
| **correlationId** | The ID that is used to correlate logs across resources. For example: `aaaa0000-bb11-2222-33cc-444444dddddd`. |
| **location** | The location of storage account. For example: `North Europe`. |
| **protocol** | The protocol that is used in the operation. For example: `HTTP`, `HTTPS`, `SMB`, or `NFS` |
| **uri** | Uniform resource identifier that is requested. |

### Fields that describe how the operation was authenticated


| Property | Description |
| :--- | :--- |
| **identity / type** | The type of authentication that was used to make the request. <br> For example: `OAuth`, `Kerberos`, `SAS Key`, `Account Key`, or `Anonymous` |
| **identity / tokenHash** | The SHA-256 hash of the authentication token used on the request. <br>When the authentication type is `Account Key`, the format is "key1 \| key2 (SHA256 hash of the key)". <br> For example: `key1(5RTE343A6FEB12342672AFD40072B70D4A91BGH5CDF797EC56BF82B2C3635CE)`. <br>When authentication type is `SAS Key`, the format is "key1 \| key2 (SHA 256 hash of the key),SasSignature(SHA 256 hash of the SAS token)". <br> For example: `key1(0A0XE8AADA354H19722ED12342443F0DC8FAF3E6GF8C8AD805DE6D563E0E5F8A),SasSignature(04D64C2B3A704145C9F1664F201123467A74D72DA72751A9137DDAA732FA03CF)`. When authentication type is `OAuth`, the format is "SHA 256 hash of the OAuth token". <br> For example: `B3CC9D5C64B3351573D806751312317FE4E910877E7CBAFA9D95E0BE923DD25C`<br> For other authentication types, there is no tokenHash field. |
| **authorization / action** | The action that is assigned to the request. |
| **authorization / denyAssignmentId** | The date in GUID format when access was denied by a deny assignment. <br> The deny assignment might be from Azure Blueprints or a managed application. <br> For more information on deny assignments, see [Understand Azure deny assignments](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/deny-assignments.md) |
| **authorization / reason** | The reason for the authorization result of the request. <br> For example: `Policy`, `NoApplicablePolicy`, or `MissingAttributes` |
| **authorization / result** | The authorization result of the request. <br> For example: `Granted` or `Denied` |
| **authorization / roleAssignmentId** | The role assignment ID. <br> For example: `11bb11bb-cc22-dd33-ee44-55ff55ff55ff`. |
| **authorization / roleDefinitionId** | The role definition ID. <br> For example: `00aa00aa-bb11-cc22-dd33-44ee44ee44ee`. |
| **authorization / type** | The source of the authorization result for the request. <br> For example: `RBAC` or `ABAC` |
| **principals / id** | The ID of the security principal. <br> For example: `a4711f3a-254f-4cfb-8a2d-111111111111`. |
| **principals / type** | The type of security principal. <br> For example: `ServicePrincipal`. |
| **properties / metricResponseType** | The response from the metrics transaction. <br> For examples, see the ResponseType metrics dimension for your storage service: <br> [blobs](../blobs/monitor-blob-storage-reference.md#metrics-dimensions) <br> [files](storage-files-monitoring-reference.md#metrics-dimensions) <br> [queues](../queues/monitor-queue-storage-reference.md#metrics-dimensions) <br> [tables](../tables/monitor-table-storage-reference.md#metrics-dimensions) |
| **properties / objectKey** | The path to the object being accessed. <br> For example: `samplestorageaccount/container1/blob.png`. |
| **requester / appID** | The Open Authorization (OAuth) application ID that is used as the requester. <br> For example: `00001111-aaaa-2222-bbbb-3333cccc4444`. |
| **requester / audience** | The OAuth audience of the request. <br> For example: `https://storage.azure.com`. |
| **requester / objectId** | The OAuth object ID of the requester. In case of Kerberos authentication, represents the object identifier of Kerberos authenticated user. <br> For example: `aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb`. |
| **requester / smbPrimarySID** | The security identifier (SID) of the user account associated with the Kerberos authenticated request. Only present when Kerberos authentication is used to access Azure file shares. <br> For example: `S-1-5-21-1111111111-2222222222-33333333-4444`. |
| **requester / tenantId** | The OAuth tenant ID of identity. <br> For example: `aaaabbbb-0000-cccc-1111-dddd2222eeee`. |
| **requester / tokenIssuer** | The OAuth token issuer. <br> For example: `https://sts.windows.net/aaaabbbb-0000-cccc-1111-dddd2222eeee/`. |
| **requester / upn** | The User Principal Name (UPN) of requester. <br> For example: `someone@contoso.com`. |
| **requester / userName** | This field is reserved for internal use only. |
| **requester / uniqueName** | The unique name of the requester. For example: `someone@example.com`. |
| **delegatedResource / tenantId** | The Microsoft Entra tenant ID of the Azure resource ID which accesses storage on-behalf-of the storage resource owner (for example: `aaaabbbb-0000-cccc-1111-dddd2222eeee`). |
| **delegatedResource / resourceId** | The Azure resource ID which accesses storage on behalf of the storage resource owner (for example: `/subscriptions/<sub>/resourcegroups/<rg>/providers/Microsoft.Compute/virtualMachines/<vm-name>`) |
| **delegatedResource / objectId** | The Microsoft Entra object ID of the Azure resource ID which accesses storage on behalf of the storage resource owner (for example: `aaaaaaaa-0000-1111-2222-bbbbbbbbbbbb`). |



### Fields that describe the service


| Property | Description |
| :--- | :--- |
| **accountName** | The name of the storage account. For example: `mystorageaccount`. |
| **requestUrl** | The URL that is requested. |
| **userAgentHeader** | The **User-Agent header** value, in quotes. For example: `WA-Storage/6.2.0 (.NET CLR 4.0.30319.42000; Win32NT 6.2.9200.0)`. |
| **referrerHeader** | The **Referrer** header value. For example: `http://contoso.com/about.html`. |
| **clientRequestId** | The **x-ms-client-request-id** header value of the request. For example: `360b66a6-ad4f-4c4a-84a4-0ad7cb44f7a6`. |
| **etag** | The ETag identifier for the returned object, in quotes. For example: `0x8D101F7E4B662C4`. |
| **serverLatencyMs** | The total time expressed in milliseconds to perform the requested operation. This value doesn't include network latency (the time to read the incoming request and send the response to the requester). For example: `22`. |
| **serviceType** | The service associated with this request. For example: `blob`, `table`, `files`, or `queue`. |
| **operationCount** | The number of each logged operation that is involved in the request. This count starts with an index of `0`. Some requests require more than one operation. Most requests perform only one operation. For example: `1`. |
| **requestHeaderSize** | The size of the request header expressed in bytes. For example: `578`. <br>If a request is unsuccessful, this value might be empty. |
| **requestBodySize** | The size of the request packets, expressed in bytes, that are read by the storage service. <br> For example: `0`. <br>If a request is unsuccessful, this value might be empty. |
| **responseHeaderSize** | The size of the response header expressed in bytes. For example: `216`. <br>If a request is unsuccessful, this value might be empty. |
| **responseBodySize** | The size of the response packets written by the storage service, in bytes. If a request is unsuccessful, this value may be empty. For example: `216`. |
| **requestMd5** | The value of either the **Content-MD5** header or the **x-ms-content-md5** header in the request. The MD5 hash value specified in this field represents the content in the request. For example: `788815fd0198be0d275ad329cafd1830`. <br>This field can be empty. |
| **serverMd5** | The value of the MD5 hash calculated by the storage service. For example: `3228b3cf1069a5489b298446321f8521`. <br>This field can be empty. |
| **lastModifiedTime** | The Last Modified Time (LMT) for the returned object.  For example: `Tuesday, 09-Aug-11 21:13:26 GMT`. <br>This field is empty for operations that can return multiple objects. |
| **conditionsUsed** | A semicolon-separated list of key-value pairs that represent a condition. The conditions can be any of the following: <li> If-Modified-Since <li> If-Unmodified-Since <li> If-Match <li> If-None-Match  <br> For example: `If-Modified-Since=Friday, 05-Aug-11 19:11:54 GMT`. |
| **contentLengthHeader** | The value of the Content-Length header for the request sent to the storage service. If the request was successful, this value is equal to requestBodySize. If a request is unsuccessful, this value may not be equal to requestBodySize, or it might be empty. |
| **tlsVersion** | The TLS version used in the connection of request. For example: `TLS 1.2`. |
| **smbTreeConnectID** | The Server Message Block (SMB) **treeConnectId** established at tree connect time. For example: `0x3` |
| **smbPersistentHandleID** | Persistent handle ID from an SMB2 CREATE request that survives network reconnects.  Referenced in [MS-SMB2](https://learn.microsoft.com/openspecs/windows_protocols/ms-smb2/f1d9b40d-e335-45fc-9d0b-199a31ede4c3) 2.2.14.1 as **SMB2_FILEID.Persistent**. For example: `0x6003f` |
| **smbVolatileHandleID** | Volatile handle ID from an SMB2 CREATE request that is recycled on network reconnects.  Referenced in [MS-SMB2](https://learn.microsoft.com/openspecs/windows_protocols/ms-smb2/f1d9b40d-e335-45fc-9d0b-199a31ede4c3) 2.2.14.1 as **SMB2_FILEID.Volatile**. For example: `0xFFFFFFFF00000065` |
| **smbMessageID** | The connection relative **MessageId**. For example: `0x3b165` |
| **smbCreditsConsumed** | The ingress or egress consumed by the request, in units of 64k. For example: `0x3` |
| **smbCommandDetail** | More information about this specific request rather than the general type of request. For example: `0x2000 bytes at offset 0xf2000` |
| **smbFileId** | The **FileId** associated with the file or directory.  Roughly analogous to an NTFS FileId. For example: `0x9223442405598953` |
| **smbSessionID** | The SMB2 **SessionId** established at session setup time. For example: `0x8530280128000049` |
| **smbCommandMajor	uint32** | Value in the **SMB2_HEADER.Command**. Currently, this is a number between 0 and 18 inclusive. For example: `0x6` |
| **smbCommandMinor** | The subclass of **SmbCommandMajor**, where appropriate. For example: `DirectoryCloseAndDelete` |
| **accessTier** | The access tier of an existing blob when an operation such as `GetBlob` or `GetBlobProperties` is used (for example: `Hot`). Can also be the access tier provided in the `x-ms-access-tier` header for operations such as `SetBlobTier`, `PutBlob`, `PutBlockList`, or `CopyBlob`. |
| **sourceAccessTier** | The access tier of the source blob of a copy operation (for example: `Hot`). |
| **rehydrationPriority** | The priority used to rehydrate an archived blob (for example: `High` or `Standard`). |
| **downloadRange** | Indicates that only a part of the blob (the specified byte range) was requested and transferred. For example, if the value of `downloadRange` field is `bytes=0-1023`, then the request retrieved the first `1024` bytes of the blob (from byte offset 0 to 1023). |

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/azure-monitor/horizontals/horz-monitor-ref-activity-log.md](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/files/storage-files-monitoring-reference.md)
- [Microsoft.Storage resource provider operations](https://learn.microsoft.com/azure/role-based-access-control/resource-provider-operations#microsoftstorage)

## Related content

- See [Monitor Azure Files](storage-files-monitoring.md) for a description of monitoring Azure Files.
- See [Monitor Azure resources with Azure Monitor](https://learn.microsoft.com/azure/azure-monitor/essentials/monitor-azure-resource) for details on monitoring Azure resources.
