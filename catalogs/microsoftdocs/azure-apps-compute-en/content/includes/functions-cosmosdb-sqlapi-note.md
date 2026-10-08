---
author: ggailey777
ms.service: azure-functions
ms.topic: include
ms.date: 11/24/2025
ms.author: glenga
ms.custom: include file
---

This table indicates how to connect to the various Azure Cosmos DB APIs from your function code:

| API | Recommendation |
| --- | --- |
| [Azure Cosmos DB for NoSQL](https://learn.microsoft.com/azure/cosmos-db/nosql/) | Use the [Azure Cosmos DB binding extension](../articles/azure-functions/functions-bindings-cosmosdb-v2.md) |
| [Azure DocumentDB](https://learn.microsoft.com/azure/documentdb/) | [Use a native client SDK](https://learn.microsoft.com/azure/cosmos-db/mongodb/how-to-dotnet-get-started). |
| [Azure Cosmos DB for MongoDB](https://learn.microsoft.com/azure/cosmos-db/mongodb/) | [Use a native client SDK](https://learn.microsoft.com/azure/cosmos-db/mongodb/how-to-dotnet-get-started). |
| [Azure Cosmos DB for Table](https://learn.microsoft.com/azure/cosmos-db/table/) | Use version 5.x or later of the [Azure Tables binding extension](../articles/azure-functions/functions-bindings-storage-table.md). |
| [Azure Cosmos DB for Apache Cassandra](https://learn.microsoft.com/azure/cosmos-db/cassandra) | [Use a native client SDK](https://learn.microsoft.com/azure/cosmos-db/postgresql/howto-connect). |
| [Azure Cosmos DB for Apache Gremlin (Graph API)](https://learn.microsoft.com/azure/cosmos-db/gremlin/) | [Use a native client SDK](https://learn.microsoft.com/azure/cosmos-db/gremlin/support#compatible-client-libraries) |
| [Azure Cosmos DB for PostgreSQL](https://learn.microsoft.com/azure/cosmos-db/postgresql/) | [Use a native client SDK](https://learn.microsoft.com/azure/cosmos-db/postgresql/howto-connect). |
