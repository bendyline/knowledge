---
title: Azure Cosmos DB Provider - EF Core
description: Documentation for the database provider that allows Entity Framework Core to be used with Azure Cosmos DB.
author: AndriySvyryd
ms.date: 02/12/2023
uid: core/providers/cosmos/index
ms.custom: sfi-ropc-nochange
---
# EF Core Azure Cosmos DB Provider

> **Warning:**
> Extensive work has gone into the Azure Cosmos DB provider in 9.0. In order to improve the provider, a number of high-impact breaking changes had to be made; if you are upgrading an existing application, please read the [breaking changes section](https://learn.microsoft.com/search/?terms=core%2Fwhat-is-new%2Fef-core-9.0%2Fbreaking-changes%23cosmos-breaking-changes) carefully.

This database provider allows Entity Framework Core to be used with Azure Cosmos DB. The provider is maintained as part of the [Entity Framework Core Project](https://github.com/dotnet/efcore).

It is strongly recommended to familiarize yourself with the [Azure Cosmos DB documentation](https://learn.microsoft.com/azure/cosmos-db/introduction) before reading this section.

> **Note:**
> This provider only works with Azure Cosmos DB for NoSQL.

## Install

Install the [Microsoft.EntityFrameworkCore.Cosmos NuGet package](https://www.nuget.org/packages/Microsoft.EntityFrameworkCore.Cosmos/).

### [.NET CLI](#tab/dotnet-core-cli)

```dotnetcli
dotnet add package Microsoft.EntityFrameworkCore.Cosmos
```

### [Visual Studio](#tab/vs)

```powershell
Install-Package Microsoft.EntityFrameworkCore.Cosmos
```

***

## Get started

> **Tip:**
> You can view this article's [sample on GitHub](https://github.com/dotnet/EntityFramework.Docs/tree/main/samples/core/Cosmos).

As for other providers the first step is to call [UseCosmos](https://learn.microsoft.com/dotnet/api/Microsoft.EntityFrameworkCore.CosmosDbContextOptionsExtensions.UseCosmos):

[Configuration (complete source file; reference: ../../../../samples/core/Cosmos/ModelBuilding/OrderContext.cs?name=Configuration)](../../../../_code/samples/core/Cosmos/ModelBuilding/OrderContext.cs.md)

> **Warning:**
> The endpoint and key are hardcoded here for simplicity, but in a production app these should be [stored securely](https://learn.microsoft.com/aspnet/core/security/app-secrets#secret-manager). See [Connecting and authenticating](https://learn.microsoft.com/search/?terms=core%2Fproviders%2Fcosmos%2Findex%23connecting-and-authenticating) for different ways to connect to Azure Cosmos DB.

In this example `Order` is a simple entity with a reference to the [owned type](../../modeling/owned-entities.md) `StreetAddress`.

[Order (complete source file; reference: ../../../../samples/core/Cosmos/ModelBuilding/Order.cs?name=Order)](../../../../_code/samples/core/Cosmos/ModelBuilding/Order.cs.md)

[StreetAddress (complete source file; reference: ../../../../samples/core/Cosmos/ModelBuilding/StreetAddress.cs?name=StreetAddress)](../../../../_code/samples/core/Cosmos/ModelBuilding/StreetAddress.cs.md)

Saving and querying data follows the normal EF pattern:

[HelloCosmos (complete source file; reference: ../../../../samples/core/Cosmos/ModelBuilding/Sample.cs?name=HelloCosmos)](../../../../_code/samples/core/Cosmos/ModelBuilding/Sample.cs.md)

> **Important:**
> Calling [EnsureCreatedAsync](https://learn.microsoft.com/dotnet/api/Microsoft.EntityFrameworkCore.Storage.IDatabaseCreator.EnsureCreatedAsync) is necessary to create the required containers and insert the [seed data](../../modeling/data-seeding.md) if present in the model. However `EnsureCreatedAsync` should only be called during deployment, not normal operation, as it may cause performance issues.
>
> Azure Cosmos DB SDK does not support RBAC for management plane operations in Azure Cosmos DB. Use Azure Management API instead of EnsureCreatedAsync with RBAC.

## Connecting and authenticating

The Azure Cosmos DB provider for EF Core has multiple overloads of the [UseCosmos](https://learn.microsoft.com/dotnet/api/Microsoft.EntityFrameworkCore.CosmosDbContextOptionsExtensions.UseCosmos) method. These overloads support the different ways that a connection can be made to the database, and the different ways of ensuring that the connection is secure.

> **Important:**
> Make sure to understand [*Secure access to data in Azure Cosmos DB*](https://learn.microsoft.com/azure/cosmos-db/secure-access-to-data) to understand the security implications and best practices for using each overload of the `UseCosmos` method.
> Generally, RBAC with token credentials is the recommended access-control mechanism.

| Connection Mechanism | UseCosmos Overload | More information |
| --- | --- | --- |
| Account endpoint and key | `UseCosmos<DbContext>(accountEndpoint, accountKey, databaseName)` | [Primary/secondary keys](https://learn.microsoft.com/azure/cosmos-db/secure-access-to-data#primary-keys) |
| Account endpoint and token | `UseCosmos<DbContext>(accountEndpoint, tokenCredential, databaseName)` | [RBAC and Resource tokens](https://learn.microsoft.com/azure/cosmos-db/secure-access-to-data#role-based-access-control) |
| Connection string | `UseCosmos<DbContext>(connectionString, databaseName)` | [Work with account keys and connection strings](https://learn.microsoft.com/azure/cosmos-db/scripts/cli/common/keys) |

## Azure Cosmos DB options

It is also possible to configure the Azure Cosmos DB provider with a single connection string and to specify other options to customize the connection:

[Configuration (complete source file; reference: ../../../../samples/core/Cosmos/ModelBuilding/OptionsContext.cs?name=Configuration)](../../../../_code/samples/core/Cosmos/ModelBuilding/OptionsContext.cs.md)

The code above shows some possible options - these are not intended to be used at the same time. See the [Azure Cosmos DB Options documentation](https://learn.microsoft.com/dotnet/api/microsoft.azure.cosmos.cosmosclientoptions) for a detailed description of the effect of each option mentioned above.
