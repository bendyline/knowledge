---
title: Azure Digital Twins APIs and SDKs
titleSuffix: Azure Digital Twins
description: Learn about the Azure Digital Twins API and SDK options, including information about SDK helper classes and general usage notes.
author: baanders
ms.author: baanders
ms.date: 01/27/2025
ms.topic: concept-article
ms.service: azure-digital-twins
ms.custom: engagement-fy23
---

# Azure Digital Twins APIs and SDKs

This article gives an overview of the Azure Digital Twins APIs available, and the methods for interacting with them. You can either use the REST APIs directly with their associated Swaggers, or through an SDK.

Azure Digital Twins comes equipped with control plane APIs, data plane APIs, and SDKs for managing your instance and its elements. 
* The control plane APIs are [Azure Resource Manager (ARM)](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/management/overview.md) APIs, and cover resource management operations like creating and deleting your instance. 
* The data plane APIs are Azure Digital Twins APIs, and are used for data management operations like managing models, twins, and the graph.
* The SDKs take advantage of the existing APIs to allow for ease of development of custom applications making use of Azure Digital Twins.

## Control plane overview


The control plane APIs are [ARM](https://learn.microsoft.com/azure/azure-resource-manager/management/overview) APIs used to manage your Azure Digital Twins instance as a whole, so they cover operations like creating or deleting your entire instance. You'll also use these APIs to create and delete endpoints.

To call the APIs directly, reference the latest Swagger folder in the [control plane Swagger repo](https://github.com/Azure/azure-rest-api-specs/tree/main/specification/digitaltwins/resource-manager/Microsoft.DigitalTwins/DigitalTwins/stable). This folder also includes a folder of examples that show the usage.

Here are the SDKs currently available for the Azure Digital Twins control plane APIs.

| SDK language | Package link | Reference documentation | Source code |
| --- | --- | --- | --- |
| .NET (C#) | [Azure.ResourceManager.DigitalTwins on NuGet](https://www.nuget.org/packages/Azure.ResourceManager.DigitalTwins) | [Reference for Azure DigitalTwins SDK for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/digitaltwins) | [Microsoft Azure Digital Twins management client library for .NET on GitHub](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/digitaltwins/Azure.ResourceManager.DigitalTwins) |
| Java | [azure-resourcemanager-digitaltwins on Maven](https://repo1.maven.org/maven2/com/azure/resourcemanager/azure-resourcemanager-digitaltwins/) | [Reference for Resource Management - Digital Twins](https://learn.microsoft.com/java/api/overview/azure/digital-twins) | [Azure Resource Manager AzureDigitalTwins client library for Java on GitHub](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/digitaltwins) |
| JavaScript | [AzureDigitalTwinsManagement client library for JavaScript on npm](https://www.npmjs.com/package/@azure/arm-digitaltwins) |  | [AzureDigitalTwinsManagement client library for JavaScript on GitHub](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/digitaltwins/arm-digitaltwins) |
| Python | [azure-mgmt-digitaltwins on PyPI](https://pypi.org/project/azure-mgmt-digitaltwins/) |  | [Microsoft Azure SDK for Python on GitHub](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/digitaltwins/azure-mgmt-digitaltwins) |
| Go | [azure-sdk-for-go/services/digitaltwins/mgmt](https://pkg.go.dev/github.com/Azure/azure-sdk-for-go/services/digitaltwins/mgmt) |  | [Azure SDK for Go on GitHub](https://github.com/Azure/azure-sdk-for-go) |


You can also exercise the control plane APIs by interacting with Azure Digital Twins through the [Azure portal](https://portal.azure.com) and [CLI](https://learn.microsoft.com/cli/azure/dt).

## Data plane overview


The data plane APIs are the Azure Digital Twins APIs used to manage the elements within your Azure Digital Twins instance. They include operations like creating routes, uploading models, creating relationships, and managing twins, and can be broadly divided into the following categories:

* `DigitalTwinModels` - The DigitalTwinModels category contains APIs to manage the [models](https://learn.microsoft.com/azure/digital-twins/concepts-models) in an Azure Digital Twins instance. Management activities include upload, validation, retrieval, and deletion of models authored in DTDL.
* `DigitalTwins` - The DigitalTwins category contains the APIs that let developers create, modify, and delete [digital twins](https://learn.microsoft.com/azure/digital-twins/concepts-twins-graph) and their relationships in an Azure Digital Twins instance.
* `Query` - The Query category lets developers [find sets of digital twins in the twin graph](https://learn.microsoft.com/azure/digital-twins/how-to-query-graph) across relationships.
* `Event Routes` - The Event Routes category contains APIs to [route data](https://learn.microsoft.com/azure/digital-twins/concepts-route-events), through the system and to downstream services.
* `Import Jobs` - The Import Jobs API lets you manage a long running, asynchronous action to [import models, twins, and relationships in bulk](https://learn.microsoft.com/azure/digital-twins/concepts-apis-sdks#bulk-import-with-the-import-jobs-api).
* `Delete Jobs` - The Delete Jobs API lets you manage a long running, asynchronous action to [delete all models, twins, and relationships in an instance](https://learn.microsoft.com/azure/digital-twins/concepts-apis-sdks#bulk-delete-with-the-delete-jobs-api).

To call the APIs directly, reference the latest Swagger folder in the [data plane Swagger repo](https://github.com/Azure/azure-rest-api-specs/tree/main/specification/digitaltwins/data-plane/DigitalTwins). This folder also includes a folder of examples that show the usage. You can also view the [data plane API reference documentation](https://learn.microsoft.com/rest/api/azure-digitaltwins/).

Here are the SDKs currently available for the Azure Digital Twins data plane APIs.

| SDK language | Package link | Reference documentation | Source code |
| --- | --- | --- | --- |
| .NET (C#) | [Azure.DigitalTwins.Core on NuGet](https://www.nuget.org/packages/Azure.DigitalTwins.Core) | [Reference for Azure IoT Digital Twins client library for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/digitaltwins.core-readme) | [Azure IoT Digital Twins client library for .NET on GitHub](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/digitaltwins/Azure.DigitalTwins.Core) |
| Java | [com.azure:azure-digitaltwins-core on Maven](https://search.maven.org/artifact/com.azure/azure-digitaltwins-core/1.0.0/jar) | [Reference for Azure Digital Twins SDK for Java](https://learn.microsoft.com/java/api/overview/azure/digital-twins) | [Azure IoT Digital Twins client library for Java on GitHub](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/digitaltwins/azure-digitaltwins-core) |
| JavaScript | [Azure Azure Digital Twins Core client library for JavaScript on npm](https://www.npmjs.com/package/@azure/digital-twins-core) | [Reference for @azure/digital-twins-core](https://learn.microsoft.com/javascript/api/@azure/digital-twins-core) | [Azure Azure Digital Twins Core client library for JavaScript on GitHub](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/digitaltwins/digital-twins-core) |
| Python | [Azure Azure Digital Twins Core client library for Python on PyPI](https://pypi.org/project/azure-digitaltwins-core/) | [Reference for azure-digitaltwins-core](https://learn.microsoft.com/python/api/azure-digitaltwins-core/azure.digitaltwins.core) | [Azure Azure Digital Twins Core client library for Python on GitHub](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/digitaltwins/azure-digitaltwins-core) |


You can also exercise the data plane APIs by interacting with Azure Digital Twins through the [CLI](https://learn.microsoft.com/cli/azure/dt).

## Bulk import with the Import Jobs API

The [Import Jobs API](https://learn.microsoft.com/rest/api/digital-twins/dataplane/jobs) is a data plane API that allows you to import a set of models, twins, and/or relationships in a single API call. Import Jobs API operations are also included with the [CLI commands](https://learn.microsoft.com/cli/azure/dt/job/import) and [data plane SDKs](#data-plane-overview). Using the Import Jobs API requires use of [Azure Blob Storage](../storage/blobs/storage-blobs-introduction.md). 

### Check permissions

To use the Import Jobs API, you need to enable the permission settings described in this section.

First, you need a **system-assigned managed identity** for your Azure Digital Twins instance. For instructions to set up a system-managed identity for the instance, see [Enable/disable managed identity for the instance](how-to-set-up-instance-portal.md#enabledisable-managed-identity-for-the-instance).

You need to have **write permissions** in your Azure Digital Twins instance for the following data action categories: 
* `Microsoft.DigitalTwins/jobs/*`
* Any graph elements that you want to include in the Jobs call. This might include `Microsoft.DigitalTwins/models/*`, `Microsoft.DigitalTwins/digitaltwins/*`, and/or `Microsoft.DigitalTwins/digitaltwins/relationships/*`.

The built-in role that provides all of these permissions is *Azure Digital Twins Data Owner*. You can also use a custom role to grant granular access to only the data types that you need. For more information about roles in Azure Digital Twins, see [Security for Azure Digital Twins solutions](concepts-security.md#authorization-azure-roles-for-azure-digital-twins).

>**Note:**
> If you attempt an Import Jobs API call and you're missing write permissions to one of the graph element types you're trying to import, the job skips that type and import the others. For example, if you have write access to models and twins, but not relationships, an attempt to bulk import all three types of element only succeeds in importing the models and twins. The job status reflects a failure and the message indicates which permissions are missing.

You also need to grant the following **RBAC permissions** to the system-assigned managed identity of your Azure Digital Twins instance so that it can access input and output files in the Azure Blob Storage container:
* [Storage Blob Data Reader](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-reader) for the Azure Storage input blob container
* [Storage Blob Data Contributor](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/built-in-roles.md#storage-blob-data-contributor) for the Azure Storage output blob container

Finally, generate a bearer token that can be used in your requests to the Jobs API. For instructions, see [Add bearer token](how-to-use-apis.md#add-bearer-token).

### Format data 

The API accepts graph information input from an *NDJSON* file, which must be uploaded to an [Azure blob storage](../storage/blobs/storage-blobs-introduction.md) container. The file starts with a `Header` section, followed by the optional sections `Models`, `Twins`, and `Relationships`. You don't have to include all three types of graph data in the file, but any sections that are present must follow that order. Twins and relationships created with this API can optionally include initialization of their properties. 

Here's a sample input data file for the import API:

```json
{"Section": "Header"}
{"fileVersion": "1.0.0", "author": "foobar", "organization": "contoso"}
{"Section": "Models"}
{"@id":"dtmi:com:microsoft:azure:iot:model0;1","@type":"Interface","contents":[{"@type":"Property","name":"property00","schema":"integer"},{"@type":"Property","name":"property01","schema":{"@type":"Map","mapKey":{"name":"subPropertyName","schema":"string"},"mapValue":{"name":"subPropertyValue","schema":"string"}}},{"@type":"Relationship","name":"has","target":"dtmi:com:microsoft:azure:iot:model1;1","properties":[{"@type":"Property","name":"relationshipproperty1","schema":"string"},{"@type":"Property","name":"relationshipproperty2","schema":"integer"}]}],"description":{"en":"This is the description of model"},"displayName":{"en":"This is the display name"},"@context":"dtmi:dtdl:context;2"}
{"@id":"dtmi:com:microsoft:azure:iot:model1;1","@type":"Interface","contents":[{"@type":"Property","name":"property10","schema":"string"},{"@type":"Property","name":"property11","schema":{"@type":"Map","mapKey":{"name":"subPropertyName","schema":"string"},"mapValue":{"name":"subPropertyValue","schema":"string"}}}],"description":{"en":"This is the description of model"},"displayName":{"en":"This is the display name"},"@context":"dtmi:dtdl:context;2"}
{"Section": "Twins"}
{"$dtId":"twin0","$metadata":{"$model":"dtmi:com:microsoft:azure:iot:model0;1"},"property00":10,"property01":{"subProperty1":"subProperty1Value","subProperty2":"subProperty2Value"}}
{"$dtId":"twin1","$metadata":{"$model":"dtmi:com:microsoft:azure:iot:model1;1"},"property10":"propertyValue1","property11":{"subProperty1":"subProperty1Value","subProperty2":"subProperty2Value"}}
{"Section": "Relationships"}
{"$dtId":"twin0","$relationshipId":"relationship","$targetId":"twin1","$relationshipName":"has","relationshipProperty1":"propertyValue1","relationshipProperty2":10}
```

Once the file has been created, upload it to a block blob in Azure Blob Storage using your preferred upload method (some options are the [AzCopy command](../storage/common/storage-use-azcopy-blobs-upload.md), the [Azure CLI](../storage/blobs/storage-quickstart-blobs-cli.md#upload-a-blob), or the [Azure portal](https://portal.azure.com)). You use the blob storage URL of the NDJSON file in the body of the Import Jobs API call.

### Run the import job

Now you can proceed with calling the [Import Jobs API](https://learn.microsoft.com/rest/api/digital-twins/dataplane/jobs). For detailed instructions on importing a full graph in one API call, see  [Upload models, twins, and relationships in bulk with the Import Jobs API](how-to-manage-graph.md#upload-models-twins-and-relationships-in-bulk-with-the-import-jobs-api). You can also use the Import Jobs API to import each resource type independently. For more information on using the Import Jobs API with individual resource types, see Import Jobs API instructions for [models](how-to-manage-model.md#upload-large-model-sets-with-the-import-jobs-api), [twins](how-to-manage-twin.md#create-twins-in-bulk-with-the-import-jobs-api), and [relationships](how-to-manage-graph.md#create-relationships-in-bulk-with-the-import-jobs-api).

In the body of the API call, you provide the blob storage URL of the NDJSON input file. You also provide a new blob storage URL to indicate where you'd like the output log to be stored once the service creates it. 

>**Important:**
> Make sure the system-assigned managed identity of your Azure Digital Twins instance has the storage blob **RBAC permissions** described in the [Check permissions](#check-permissions) section.

As the import job executes, a structured output log is generated by the service and stored as a new append blob in your blob container, at the URL location you specified for the output blob in the request. Here's an example output log for a successful job importing models, twins, and relationships:

```json
{"timestamp":"2022-12-30T19:50:34.5540455Z","jobId":"test1","jobType":"Import","logType":"Info","details":{"status":"Started"}}
{"timestamp":"2022-12-30T19:50:37.2406748Z","jobId":"test1","jobType":"Import","logType":"Info","details":{"section":"Models","status":"Started"}}
{"timestamp":"2022-12-30T19:50:38.1445612Z","jobId":"test1","jobType":"Import","logType":"Info","details":{"section":"Models","status":"Succeeded"}}
{"timestamp":"2022-12-30T19:50:38.5475921Z","jobId":"test1","jobType":"Import","logType":"Info","details":{"section":"Twins","status":"Started"}}
{"timestamp":"2022-12-30T19:50:39.2744802Z","jobId":"test1","jobType":"Import","logType":"Info","details":{"section":"Twins","status":"Succeeded"}}
{"timestamp":"2022-12-30T19:50:39.7494663Z","jobId":"test1","jobType":"Import","logType":"Info","details":{"section":"Relationships","status":"Started"}}
{"timestamp":"2022-12-30T19:50:40.4480645Z","jobId":"test1","jobType":"Import","logType":"Info","details":{"section":"Relationships","status":"Succeeded"}}
{"timestamp":"2022-12-30T19:50:41.3043264Z","jobId":"test1","jobType":"Import","logType":"Info","details":{"status":"Succeeded"}}
```

When the job is complete, you can see the total number of ingested entities using the [BulkOperationEntityCount metric](how-to-monitor.md#bulk-operation-metrics-from-the-jobs-apis).

It's also possible to cancel a running import job with the [Cancel operation](https://learn.microsoft.com/rest/api/digital-twins/dataplane/jobs/import-jobs-cancel?tabs=HTTP) from the Import Jobs API. Once the job has been canceled and is no longer running, you can delete it.

### Limits and considerations

Keep the following considerations in mind while working with the Import Jobs API:
* Import Jobs are not atomic operations. There's no rollback in the case of failure, partial job completion, or usage of the [Cancel operation](https://learn.microsoft.com/rest/api/digital-twins/dataplane/jobs/import-jobs-cancel).
* Only one bulk job is supported at a time within an Azure Digital Twins instance. You can view this information and other numerical limits of the Jobs APIs in [Azure Digital Twins limits](reference-service-limits.md).

## Bulk delete with the Delete Jobs API

The [Delete Jobs API](https://learn.microsoft.com/rest/api/digital-twins/dataplane/jobs) is a data plane API that allows you to delete all models, twins, and relationships in an instance with a single API call. Delete Jobs API operations are also available as [CLI commands](https://learn.microsoft.com/cli/azure/dt/job/deletion). Visit the API documentation to see the request details for creating a delete job and checking its status.

To make sure all elements are deleted, follow these recommendations while using the Delete Jobs API:
* For instructions on how to generate a bearer token to authenticate API requests, see [Add bearer token](how-to-use-apis.md#add-bearer-token).
* If you recently imported a large number of entities to your graph, wait for some time and verify that all elements are synchronized in your graph before beginning the delete job.
* Stop all operations on the instance, especially upload operations, until the delete job is complete.

Depending on the size of the graph being deleted, a delete job can take anywhere from a few minutes to multiple hours.

The default time-out period for a delete job is 12 hours, which can be adjusted to any value between 15 minutes and 24 hours by using a query parameter on the API. This is the amount of time that the delete job runs before it times out, at which point the service attempts to stop the job if it hasn't completed yet.

### Limits and other considerations

Keep the following considerations in mind while working with the Delete Jobs API:
* Delete Jobs are not atomic operations. There is no rollback in the case of failure, partial job completion, or time-out of the job.
* Only one bulk job is supported at a time within an Azure Digital Twins instance. You can view this information and other numerical limits of the Jobs APIs in [Azure Digital Twins limits](reference-service-limits.md).

## Usage and authentication notes

This section contains more detailed information about using the APIs and SDKs.

### API notes

Here's some general information for calling the Azure Digital Twins APIs directly.
* You can use an HTTP REST-testing tool to make direct calls to the Azure Digital Twins APIs. For more information about this process, see [Call the Azure Digital Twins APIs](how-to-use-apis.md).
* Azure Digital Twins doesn't currently support Cross-Origin Resource Sharing (CORS). For more info about the impact and resolution strategies, see [Cross-Origin Resource Sharing (CORS) for Azure Digital Twins](concepts-security.md#cross-origin-resource-sharing-cors).

Here's some more information about authentication for API requests.
* One way to generate a bearer token for Azure Digital Twins API requests is with the [az account get-access-token](https://learn.microsoft.com/cli/azure/account#az-account-get-access-token\(\)) CLI command. For detailed instructions, see [Add bearer token](how-to-use-apis.md#add-bearer-token).
* Requests to the Azure Digital Twins APIs require a user or service principal that is a part of the same [Microsoft Entra ID](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/fundamentals/active-directory-whatis.md)  tenant where the Azure Digital Twins instance exists. To prevent malicious scanning of Azure Digital Twins endpoints, requests with access tokens from outside the originating tenant are returned a "404 Sub-Domain not found" error message. This error is returned even if the user or service principal was given an Azure Digital Twins Data Owner or Azure Digital Twins Data Reader role through [Microsoft Entra B2B](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/external-identities/what-is-b2b.md) collaboration. For information on how to achieve access across multiple tenants, see [Write app authentication code](how-to-authenticate-client.md#authenticate-across-tenants).

### SDK notes

The underlying SDK for Azure Digital Twins is `Azure.Core`. See the [Azure namespace documentation](https://learn.microsoft.com/dotnet/api/azure) for reference on the SDK infrastructure and types.

Here's some more information about authentication with the SDKs.
* Start by instantiating the `DigitalTwinsClient` class. The constructor requires credentials that can be obtained with different kinds of authentication methods in the `Azure.Identity` package. For more on `Azure.Identity`, see its [namespace documentation](https://learn.microsoft.com/dotnet/api/azure.identity). 
* You may find the `InteractiveBrowserCredential` useful while getting started, but there are several other options, including credentials for [managed identity](https://learn.microsoft.com/dotnet/api/azure.identity.interactivebrowsercredential), that may be useful to authenticate [Azure functions set up with MSI](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/overview-managed-identity.md) against Azure Digital Twins. For more about `InteractiveBrowserCredential`, see its [class documentation](https://learn.microsoft.com/dotnet/api/azure.identity.interactivebrowsercredential).

Here's some more information about functions and returned data.
* All service API calls are exposed as member functions on the `DigitalTwinsClient` class.
* All service functions exist in synchronous and asynchronous versions.
* All service functions throw an exception for any return status of 400 or above. Make sure you wrap calls into a `try` section, and catch at least `RequestFailedExceptions`. For more about this type of exception, see its [reference documentation](https://learn.microsoft.com/dotnet/api/azure.requestfailedexception).
* Most service methods return `Response<T>` or (`Task<Response<T>>` for the asynchronous calls), where `T` is the class of return object for the service call. The [Response](https://learn.microsoft.com/dotnet/api/azure.response-1) class encapsulates the service return and presents return values in its `Value` field.  
* Service methods with paged results return `Pageable<T>` or `AsyncPageable<T>` as results. For more about the `Pageable<T>` class, see its [reference documentation](https://learn.microsoft.com/dotnet/api/azure.pageable-1); for more about `AsyncPageable<T>`, see its [reference documentation](https://learn.microsoft.com/dotnet/api/azure.asyncpageable-1).
* You can iterate over paged results using an `await foreach` loop. For more about this process, see [Iterating with Async Enumerables in C# 8](https://learn.microsoft.com/archive/msdn-magazine/2019/november/csharp-iterating-with-async-enumerables-in-csharp-8).
* Service methods return strongly typed objects wherever possible. However, because Azure Digital Twins is based on models custom-configured by the user at runtime (via DTDL models uploaded to the service), many service APIs take and return twin data in JSON format.

### Serialization helpers in the .NET (C#) SDK

Serialization helpers are helper functions available within the [.NET (C#) SDK](https://learn.microsoft.com/dotnet/api/overview/azure/digitaltwins.core-readme) for quickly creating or deserializing twin data for access to basic information. Since the core SDK methods return twin data as JSON by default, it can be helpful to use these helper classes to break down the twin data further.

The available helper classes are:
* `BasicDigitalTwin`: Generically represents the core data of a digital twin
* `BasicDigitalTwinComponent`: Generically represents a component in the `Contents` properties of a `BasicDigitalTwin`
* `BasicRelationship`: Generically represents the core data of a relationship
* `DigitalTwinsJsonPropertyName`: Contains the string constants for use in JSON serialization and deserialization for custom digital twin types


## Monitor API metrics

API metrics such as requests, latency, and failure rate can be viewed in the [Azure portal](https://portal.azure.com/). 

For information about viewing and managing Azure Digital Twins metrics, see [Monitor your instance](how-to-monitor.md). For a full list of API metrics available for Azure Digital Twins, see [Azure Digital Twins API request metrics](how-to-monitor.md#api-request-metrics).

## Next steps

See how to make direct requests to the Azure Digital Twins APIs:
* [Call the Azure Digital Twins APIs](how-to-use-apis.md)

Or, practice using the .NET SDK by creating a client app with this tutorial:
* [Code a client app](tutorial-code.md)
