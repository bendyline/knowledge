---
title: Preview Features FAQ
description: Frequently asked questions about the PREVIEW_FEATURES opt-in mechanism.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 11/18/2025
ms.service: sql
ms.subservice: release-landing
ms.topic: release-notes
ms.custom:
  - ignite-2025
monikerRange: ">=sql-server-ver17"
---

# Opt in for preview features - FAQ


**Applies to:**
 

 



 SQL Server 2025 (17.x) 
 introduces the `PREVIEW_FEATURES` database scoped configuration option. This option enables features that are available for preview.


The following table identifies features originally released as preview and their current status:

| Feature | Current status | Version of latest update | Description |
| --- | --- | --- | --- |
| [Change event streaming](../relational-databases/track-changes/change-event-streaming/overview.md) | Preview | RTM | Stream changes from SQL Server to Azure Event Hubs. |
| [Fuzzy string matching](../relational-databases/fuzzy-string-match/overview.md) | Preview | RTM | Check if two strings are similar, and calculate the difference between two strings. |
| [EDIT_DISTANCE](../t-sql/functions/edit-distance-transact-sql.md) | Preview | RTM | Calculate the number of insertions, deletions, substitutions, and transpositions needed to transform one string to another. |
| [EDIT_DISTANCE_SIMILARITY](../t-sql/functions/edit-distance-similarity-transact-sql.md) | Preview | RTM | Calculate a similarity value ranging from 0 (indicating no match) to 100 (indicating full match). |
| [Half-precision (2-byte) vectors](../t-sql/data-types/vector-data-type.md) | Preview | RTM | Store vectors using half-precision (2-byte) floating-point values, allowing up to 3996 dimensions in a single vector. |
| [JARO_WINKLER_DISTANCE](../t-sql/functions/jaro-winkler-distance-transact-sql.md) | Preview | RTM | Calculate the edit distance between two strings giving preference to strings that match from the beginning for a set prefix length. |
| [JARO_WINKLER_SIMILARITY](../t-sql/functions/jaro-winkler-similarity-transact-sql.md) | Preview | RTM | Calculate a similarity value ranging from 0 (indicating no match) to 100 (indicating full match). |
| [Vector index](ai/vectors.md#vector-search) | Preview | RTM | Create and manage approximate vector indexes to find similar vectors to a given reference vector. |
| [CREATE VECTOR INDEX](../t-sql/statements/create-vector-index-transact-sql.md) | Preview | RTM | Create an approximate index on a vector column to improve performances of nearest neighbors search. |
| [VECTOR_SEARCH](../t-sql/functions/vector-search-transact-sql.md). | Preview | RTM | Search for vectors similar to a given query vectors using an approximate nearest neighbors vector search algorithm. |

> **Caution:**  
> Preview features aren't recommended for production environments.


Preview features that become generally available in a subsequent cumulative update no longer require the database-scoped configuration option.

## What is PREVIEW_FEATURES?

`PREVIEW_FEATURES` is a database-scoped configuration that lets you try out new SQL Server features before they're generally available. This option is intended for development and testing environments and shouldn't be used in production.

## How do I enable the PREVIEW_FEATURES option?

`PREVIEW_FEATURES` is a `DATABASE SCOPED CONFIGURATION` option, therefore you can enable it by executing the following code:

```sql
ALTER DATABASE SCOPED CONFIGURATION
SET PREVIEW_FEATURES = ON;
GO

SELECT * FROM sys.database_scoped_configurations
WHERE [name] = 'PREVIEW_FEATURES'
GO
```

For more information, see [ALTER DATABASE SCOPED CONFIGURATION](../t-sql/statements/alter-database-scoped-configuration-transact-sql.md#preview_features---on--off-).

## Do I need to enable PREVIEW_FEATURES to use AI functionalities in SQL Server 2025?

No, most AI features in SQL Server 2025 are already generally available (GA), including `AI_GENERATE_EMBEDDINGS`, `CREATE EXTERNAL MODEL`, and the **vector** data type and related functions. Only the features explicitly listed in the release notes document require the `PREVIEW_FEATURES` option to be enabled.

## Does enabling PREVIEW_FEATURES make database a non-GA version?

No, enabling the `PREVIEW_FEATURES` configuration doesn't change the GA status of a database. The database remains GA even when preview features are enabled. This opt-in mechanism is designed to allow customers to test new features before they reach GA, without affecting the overall GA status of the database itself. However, it's important to note that after enabling preview features, if preview features are used and they involve persisted objects (like indexes), disabling `PREVIEW_FEATURES` later might cause errors unless those objects are removed or rebuilt.

Preview features should generally be used in development or testing environments, not in production, due to their experimental nature and potential for change.

## How does a preview feature move to general availability (GA)?

Features are promoted to GA via a cumulative update (CU).

## Can a CU update a preview feature without moving it to GA?

Yes. Preview features can be updated in CUs while remaining under the `PREVIEW_FEATURES` umbrella.

## What happens when a feature under PREVIEW_FEATURES goes GA?

The feature becomes available regardless of the `PREVIEW_FEATURES` setting.

## Can I enable and then disable the PREVIEW_FEATURES option at any time?

If no preview features were used, you can safely turn it off at any time. If preview features were used you can turn it `OFF`, but objects using those features will error out. Once the `PREVIEW_FEATURES` option is turned off, the database engine is unaware of those features so using them might return errors because the new commands aren't recognized at all.

## Does using PREVIEW_FEATURES affect my backup and restore strategy?

No, the preview features setting doesn't affect database backup or restore. Databases remain compatible across cumulative updates and general releases. However, if you apply a cumulative update (CU) that improves a feature in preview and then restore that database to a previous version, the feature might not work as expected or might even error out. This is because the restored version might not recognize the updated syntax or behavior introduced in the newer CU. Therefore, while backup and restore operations themselves are unaffected, feature compatibility depends on the CU level of the target environment.

If at any point a preview feature requires changes that would make it incompatible with previous versions, we will clearly document those changes. In such cases, applying the update will require a manual step to ensure you're aware of the potential impact. Importantly, updates won't automatically make the database incompatible with previous versions. Even in these cases, we'll provide the ability to roll back to the previous CU if needed.

## What if I'm not interested in using any preview features?

You can leave `PREVIEW_FEATURES` set to `OFF`. You retain full rollback and restore capabilities across CUs and GA. Any update to the features using the `PREVIEW_FEATURES` opt-in mechanism doesn't affect your database.

## Can I enable only specific preview features?

The database scoped setting enables the usage of all preview features.

## Is support available for preview features?

Yes, support is provided for preview features, similar to [What's new in Azure SQL Database?](https://learn.microsoft.com/azure/azure-sql/database/doc-changes-updates-release-notes-whats-new)

## How do GDR patches affect PREVIEW_FEATURES?

GDR patches are orthogonal to CUs and don't affect the status of `PREVIEW_FEATURES`. Features moved to GA via CU require that CU to be applied; GDRs don't include feature payloads.

## Related content

- [What's new in SQL Server 2025](what-s-new-in-sql-server-2025.md)
