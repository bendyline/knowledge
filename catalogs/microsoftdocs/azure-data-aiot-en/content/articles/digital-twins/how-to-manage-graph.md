---
title: Manage the twin graph and relationships
titleSuffix: Azure Digital Twins
description: Learn how to manage a graph of digital twins by connecting them with relationships.
author: baanders
ms.author: baanders
ms.date: 03/10/2025
ms.topic: how-to
ms.service: azure-digital-twins
ms.custom: engagement-fy23
---

# Manage a graph of digital twins using relationships

The heart of Azure Digital Twins is the [twin graph](concepts-twins-graph.md) representing your whole environment. The twin graph is made of individual digital twins connected via **relationships**. This article focuses on managing relationships and the graph as a whole; to work with individual digital twins, see [Manage digital twins](how-to-manage-twin.md).

Once you have a working [Azure Digital Twins instance](how-to-set-up-instance-portal.md) and set up [authentication](how-to-authenticate-client.md) code in your client app, you can create, modify, and delete digital twins and their relationships in an Azure Digital Twins instance.

## Prerequisites


To work with Azure Digital Twins in this article, you need an Azure Digital Twins instance and the required permissions for using it. If you already have an Azure Digital Twins instance set up, you can use that instance and skip to the next section. Otherwise, follow the instructions in [Set up an instance and authentication](how-to-set-up-instance-portal.md). The instructions contain information to help you verify that you completed each step successfully.

After you set up your instance, make a note of the instance's host name. You can [find the host name in the Azure portal](how-to-set-up-instance-portal.md#verify-success-and-collect-important-values).



## Developer interfaces

This article highlights how to complete different management operations using the [.NET (C#) SDK](https://learn.microsoft.com/dotnet/api/overview/azure/resourcemanager.digitaltwins-readme). You can also craft these same management calls using the other language SDKs described in [Azure Digital Twins APIs and SDKs](concepts-apis-sdks.md).

Other developer interfaces that can be used to complete these operations include:
* [Azure Digital Twins Explorer](concepts-azure-digital-twins-explorer.md)
* [REST API](https://learn.microsoft.com/rest/api/azure-digitaltwins/) calls
* [Azure CLI](https://learn.microsoft.com/cli/azure/dt) commands



## Visualization

*Azure Digital Twins Explorer* is a visual tool for exploring the data in your Azure Digital Twins graph. You can use the explorer to view, query, and edit your models, twins, and relationships.

To read about the Azure Digital Twins Explorer tool, see [Azure Digital Twins Explorer](concepts-azure-digital-twins-explorer.md). For detailed steps on how to use its features, see [Use Azure Digital Twins Explorer](how-to-use-azure-digital-twins-explorer.md).

Here's what the visualization looks like:

Screenshot of Azure Digital Twins Explorer showing sample models and twins.


## Create relationships

Relationships describe how different digital twins are connected to each other, which forms the basis of the twin graph.

The types of relationships that can be created from one (source) twin to another (target) twin are defined as part of the source twin's [DTDL model](concepts-models.md#relationships). You can create an instance of a relationship by using the `CreateOrReplaceRelationshipAsync()` SDK call with twins and relationship details that follow the DTDL definition. 

To create a relationship, you need to specify:
* The source twin ID (`srcId` in the following code sample): The ID of the twin where the relationship originates.
* The target twin ID (`targetId` in the following code sample): The ID of the twin where the relationship arrives.
* A relationship name (`relName` in the following code sample): The generic type of relationship, something like _contains_.
* A relationship ID (`relId` in the following code sample): The specific name for this relationship, something like _Relationship1_.

The relationship ID must be unique within the given source twin. It doesn't need to be globally unique.
For example, for the twin Foo, each specific relationship ID must be unique. However, another twin Bar can have an outgoing relationship that matches the same ID of a Foo relationship.

The following code sample illustrates how to create a relationship in your Azure Digital Twins instance. It uses the SDK call (highlighted) inside a custom method that might appear in the context of a larger program.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/graph_operations_sample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-manage-graph.md)

This custom function can now be called to create a _contains_ relationship in the following way: 

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/graph_operations_sample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-manage-graph.md)

If you wish to create multiple relationships, you can repeat calls to the same method, passing different relationship types into the argument. 

For more information on the helper class `BasicRelationship`, see [Azure Digital Twins APIs and SDKs](concepts-apis-sdks.md#serialization-helpers-in-the-net-c-sdk).

### Create multiple relationships between twins

Relationships can be classified as either: 

* Outgoing relationships: Relationships belonging to this twin that point outward to connect it to other twins. The `GetRelationshipsAsync()` method is used to get outgoing relationships of a twin.
* Incoming relationships: Relationships belonging to other twins that point towards this twin to create an "incoming" link. The `GetIncomingRelationshipsAsync()` method is used to get incoming relationships of a twin.

There's no restriction on the number of relationships that you can have between two twins—you can have as many relationships between twins as you like. 

This fact means that you can express several different types of relationships between two twins at once. For example, Twin A can have both a *stored* relationship and *manufactured* relationship with Twin B.

You can even create multiple instances of the same type of relationship between the same two twins, if you want. In this example, Twin A could have two different *stored* relationships with Twin B, as long as the relationships have different relationship IDs.

> **Note:**
> The service doesn't currently support or enforce the DTDL attributes of `minMultiplicity` and `maxMultiplicity` for relationships in Azure Digital Twins, even if they're defined as part of a model. For more information, see [Service-specific DTDL notes](concepts-models.md#service-specific-dtdl-notes).

### Create relationships in bulk with the Import Jobs API

You can use the [Import Jobs API](concepts-apis-sdks.md#bulk-import-with-the-import-jobs-api) to create many relationships at once in a single API call. This method requires the use of [Azure Blob Storage](../storage/blobs/storage-blobs-introduction.md), and [write permissions](concepts-apis-sdks.md#check-permissions) in your Azure Digital Twins instance for relationships and bulk jobs.

>**Tip:**
>The Import Jobs API also allows models and twins to be imported in the same call, to create all parts of a graph at once. For more about this process, see [Upload models, twins, and relationships in bulk with the Import Jobs API](#upload-models-twins-and-relationships-in-bulk-with-the-import-jobs-api).

To import relationships in bulk, you need to structure your relationships (and any other resources included in the bulk import job) as an *NDJSON* file. The `Relationships` section comes after the `Twins` section, making it the last graph data section in the file. Relationships defined in the file can reference twins that are either defined in this file or already present in the instance, and they can optionally include initialization of any properties that the relationships have.

You can view an example import file and a sample project for creating these files in the [Import Jobs API introduction](concepts-apis-sdks.md#bulk-import-with-the-import-jobs-api).


Next, the file needs to be uploaded into an append blob in [Azure Blob Storage](../storage/blobs/storage-blobs-introduction.md). For instructions on how to create an Azure storage container, see [Create a container](../storage/blobs/storage-quickstart-blobs-portal.md#create-a-container). Then, upload the file using your preferred upload method (some options are the [AzCopy command](../storage/common/storage-use-azcopy-blobs-upload.md), the [Azure CLI](../storage/blobs/storage-quickstart-blobs-cli.md#upload-a-blob), or the [Azure portal](https://portal.azure.com)).

Once the NDJSON file is uploaded to the container, get its **URL** within the blob container. You use this value later in the body of the bulk import API call.

Here's a screenshot showing the URL value of a blob file in the Azure portal:

Screenshot of the Azure portal showing the URL of a file in a storage container.

Then, the file can be used in an [Import Jobs API](https://learn.microsoft.com/rest/api/digital-twins/dataplane/jobs) call. You provide the blob storage URL of the input file, and a new blob storage URL to indicate where you'd like the output log to be stored after the service creates it.

## List relationships

### List properties of a single relationship

You can always deserialize relationship data to a type of your choice. For basic access to a relationship, use the type `BasicRelationship`. The `BasicRelationship` helper class also gives you access to properties defined on the relationship, through an `IDictionary<string, object>`. To list properties, you can use:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/graph_operations_other.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-manage-graph.md)

### List outgoing relationships from a digital twin

To access the list of **outgoing** relationships for a given twin in the graph, you can use the `GetRelationships()` method like this: 

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/graph_operations_sample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-manage-graph.md)

This method returns an `Azure.Pageable<T>` or `Azure.AsyncPageable<T>`, depending on whether you use the synchronous or asynchronous version of the call.

Here's an example that retrieves a list of relationships. It uses the SDK call (highlighted) inside a custom method that might appear in the context of a larger program.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/graph_operations_sample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-manage-graph.md)

You can now call this custom method to see the outgoing relationships of the twins like this:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/graph_operations_sample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-manage-graph.md)

You can use the retrieved relationships to navigate to other twins in your graph by reading the `target` field from the relationship that is returned, and using it as the ID for your next call to `GetDigitalTwin()`.

### List incoming relationships to a digital twin

Azure Digital Twins also has an SDK call to find all **incoming** relationships to a given twin. This SDK is often useful for reverse navigation, or when deleting a twin.

>**Note:**
> `IncomingRelationship` calls don't return the full body of the relationship. For more information on the `IncomingRelationship` class, see its [reference documentation](https://learn.microsoft.com/dotnet/api/azure.digitaltwins.core.incomingrelationship?view=azure-dotnet\&preserve-view=true).

The code sample in the previous section focused on finding outgoing relationships from a twin. The following example is structured similarly, but finds *incoming* relationships to the twin instead. This example also uses the SDK call (highlighted) inside a custom method that might appear in the context of a larger program.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/graph_operations_sample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-manage-graph.md)

You can now call this custom method to see the incoming relationships of the twins like this:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/graph_operations_sample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-manage-graph.md)

### List all twin properties and relationships

Using the previous methods for listing outgoing and incoming relationships to a twin, you can create a method that prints full twin information, including the twin's properties and both types of its relationships. Here's an example custom method showing how to combine the previous custom methods for this purpose.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/graph_operations_sample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-manage-graph.md)

You can now call this custom function like this: 

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/graph_operations_sample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-manage-graph.md)

## Update relationships

Relationships are updated using the `UpdateRelationship` method. 

>**Note:**
>This method is for updating the **properties** of a relationship. If you need to change the source twin or target twin of the relationship, you need to [delete the relationship](#delete-relationships) and [re-create one](#create-relationships) using the new twins.

The required parameters for the client call are:
- The ID of the source twin (the twin where the relationship originates).
- The ID of the relationship to update.
- A [JSON Patch](http://jsonpatch.com/) document containing the properties and new values you want to update.

Here's a sample code snippet showing how to use this method. This example uses the SDK call (highlighted) inside a custom method that might appear in the context of a larger program.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/graph_operations_sample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-manage-graph.md)

Here's an example of a call to this custom method, passing in a JSON Patch document with the information to update a property.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/graph_operations_sample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-manage-graph.md)

## Delete relationships

The first parameter specifies the source twin (the twin where the relationship originates). The other parameter is the relationship ID. You need both the twin ID and the relationship ID, because relationship IDs are only unique within the scope of a twin.

Here's sample code showing how to use this method. This example uses the SDK call (highlighted) inside a custom method that might appear in the context of a larger program.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/graph_operations_sample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-manage-graph.md)

You can now call this custom method to delete a relationship like this:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/graph_operations_sample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-manage-graph.md)


>**Note:**
>If you want to delete **all** models, twins, and relationships in an instance at once, use the [Delete Jobs API](concepts-apis-sdks.md#bulk-delete-with-the-delete-jobs-api).

## Create multiple graph elements at once

This section describes strategies for creating a graph with multiple elements at the same time, rather than using individual API calls to upload models, twins, and relationships to upload them one by one.

### Upload models, twins, and relationships in bulk with the Import Jobs API

You can use the [Import Jobs API](concepts-apis-sdks.md#bulk-import-with-the-import-jobs-api) to upload multiple models, twins, and relationships to your instance in a single API call, effectively creating the graph all at once. This method requires the use of [Azure Blob Storage](../storage/blobs/storage-blobs-introduction.md), and [write permissions](concepts-apis-sdks.md#check-permissions) in your Azure Digital Twins instance for graph elements (models, twins, and relationships) and bulk jobs.

To import resources in bulk, start by creating an *NDJSON* file containing the details of your resources. The file starts with a `Header` section, followed by the optional sections `Models`, `Twins`, and `Relationships`. You don't have to include all three types of graph data in the file, but any sections that are present must follow that order. Twins defined in the file can reference models that are either defined in this file or already present in the instance, and they can optionally include initialization of the twin's properties. Relationships defined in the file can reference twins that are either defined in this file or already present in the instance, and they can optionally include initialization of relationship properties.

You can view an example import file and a sample project for creating these files in the [Import Jobs API introduction](concepts-apis-sdks.md#bulk-import-with-the-import-jobs-api).


Next, the file needs to be uploaded into an append blob in [Azure Blob Storage](../storage/blobs/storage-blobs-introduction.md). For instructions on how to create an Azure storage container, see [Create a container](../storage/blobs/storage-quickstart-blobs-portal.md#create-a-container). Then, upload the file using your preferred upload method (some options are the [AzCopy command](../storage/common/storage-use-azcopy-blobs-upload.md), the [Azure CLI](../storage/blobs/storage-quickstart-blobs-cli.md#upload-a-blob), or the [Azure portal](https://portal.azure.com)).

Once the NDJSON file is uploaded to the container, get its **URL** within the blob container. You use this value later in the body of the bulk import API call.

Here's a screenshot showing the URL value of a blob file in the Azure portal:

Screenshot of the Azure portal showing the URL of a file in a storage container.

Then, the file can be used in an [Import Jobs API](https://learn.microsoft.com/rest/api/digital-twins/dataplane/jobs) call. You provide the blob storage URL of the input file, and a new blob storage URL to indicate where you'd like the output log to be stored after the service creates it.

### Import graph with Azure Digital Twins Explorer

[Azure Digital Twins Explorer](concepts-azure-digital-twins-explorer.md) is a visual tool for viewing and interacting with your twin graph. It contains a feature for importing a graph file in either JSON or Excel format that can contain multiple models, twins, and relationships.

For detailed information about using this feature, see [Import graph](how-to-use-azure-digital-twins-explorer.md#import-graph) in the Azure Digital Twins Explorer documentation.

### Create twins and relationships from a CSV file

Sometimes, you might need to create twin hierarchies out of data stored in a different database, or in a spreadsheet or a CSV file. This section illustrates how to read data from a CSV file and create a twin graph out of it.

Consider the following data table, describing a set of digital twins and relationships. The models referenced in this file must already exist in the Azure Digital Twins instance.

| Model ID | Twin ID (must be unique) | Relationship name | Target twin ID | Twin init data |
| --- | --- | --- | --- | --- |
| dtmi:example:Floor;1 | Floor1 | contains | Room1 |  |
| dtmi:example:Floor;1 | Floor0 | contains | Room0 |  |
| dtmi:example:Room;1 | Room1 |  |  | {"Temperature": 80} |
| dtmi:example:Room;1 | Room0 |  |  | {"Temperature": 70} |

One way to get this data into Azure Digital Twins is to convert the table to a CSV file. Once the table is converted, code can be written to interpret the file into commands to create twins and relationships. The following code sample illustrates reading the data from the CSV file and creating a twin graph in Azure Digital Twins.

In the following code, the CSV file is called *data.csv*, and there's a placeholder representing the **host name** of your Azure Digital Twins instance. The sample also makes use of several packages that you can add to your project to help with this process.

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/graphFromCSV.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-manage-graph.md)

## Runnable twin graph sample

The following runnable code snippet uses the relationship operations from this article to create a twin graph out of digital twins and relationships.

### Set up sample project files

The snippet uses two sample model definitions, [Room.json](https://raw.githubusercontent.com/Azure-Samples/digital-twins-samples/main/AdtSampleApp/SampleClientApp/Models/Room.json) and [Floor.json](https://raw.githubusercontent.com/Azure-Samples/digital-twins-samples/main/AdtSampleApp/SampleClientApp/Models/Floor.json). To **download the model files** so you can use them in your code, use these links to go directly to the files in GitHub. Then, right-click anywhere on the screen, select **Save as** in your browser's right-click menu, and use the Save As window to save the files as **Room.json** and **Floor.json**.

Next, create a **new console app project** in Visual Studio or your editor of choice.

Then, **copy the following code** of the runnable sample into your project:

[Code reference unavailable in this source snapshot: ~/digital-twins-docs-samples/sdks/csharp/graph_operations_sample.cs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/digital-twins/how-to-manage-graph.md)


>**Note:**
>There's currently a known issue affecting the `DefaultAzureCredential` wrapper class that might result in an error while authenticating. If you encounter this issue, you can try instantiating `DefaultAzureCredential` with the following optional parameter to resolve it: `new DefaultAzureCredential(new DefaultAzureCredentialOptions { ExcludeSharedTokenCacheCredential = true });`
>
>For more information about this issue, see [Azure Digital Twins known issues](troubleshoot-known-issues.md#issue-with-default-azure-credential-authentication-on-azureidentity-130).


### Configure project

Next, complete the following steps to configure your project code:
1. Add the **Room.json** and **Floor.json** files you downloaded earlier to your project, and replace the `<path-to>` placeholders in the code to tell your program where to find them.
1. Replace the placeholder `<your-instance-hostname>` with your Azure Digital Twins instance's host name.
1. Add two dependencies to your project that are needed to work with Azure Digital Twins. The first is the package for the [Azure Digital Twins SDK for .NET](https://learn.microsoft.com/dotnet/api/overview/azure/digitaltwins.core-readme), and the second provides tools to help with authentication against Azure.

      ```cmd/sh
      dotnet add package Azure.DigitalTwins.Core
      dotnet add package Azure.Identity
      ```

You also need to set up local credentials if you want to run the sample directly. The next section walks through this process.

### Set up local Azure credentials

This sample uses [DefaultAzureCredential](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential?view=azure-dotnet\&preserve-view=true) (part of the `Azure.Identity` library) to authenticate with the Azure Digital Twins instance when you run the sample on your local machine. `DefaultAzureCredential` is one of many authentication options. For more information about the different ways a client app can authenticate with Azure Digital Twins, see [Write app authentication code](how-to-authenticate-client.md).


With `DefaultAzureCredential`, the sample searches for credentials in your local environment, like an Azure sign-in in a local [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) or in Visual Studio or Visual Studio Code. For this reason, you should *sign in to Azure locally* through one of these mechanisms to set up credentials for the sample.

If you're using Visual Studio or Visual Studio Code to run code samples, make sure you're [signed in to that editor](https://learn.microsoft.com/visualstudio/ide/signing-in-to-visual-studio) with the same Azure credentials that you want to use to access your Azure Digital Twins instance. If you're using a local CLI window, run the `az login` command to sign in to your Azure account. Once you're signed in, your code sample authenticates you automatically when it runs. 

### Run the sample

Now that you completed setup, you can run the sample code project.

Here's the console output of the program: 

Screenshot of the console output showing the twin details with incoming and outgoing relationships of the twins.

> **Tip:**
> The twin graph is a concept of creating relationships between twins. If you want to view the visual representation of the twin graph, see the [Visualization](how-to-manage-graph.md#visualization) section of this article. 

## Next steps

Learn about querying an Azure Digital Twins twin graph:
* [Query language](concepts-query-language.md)
* [Query the twin graph](how-to-query-graph.md)
