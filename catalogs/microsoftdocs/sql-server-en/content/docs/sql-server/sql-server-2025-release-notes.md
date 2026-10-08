---
title: SQL Server 2025 Release Notes
description: Find information about SQL Server 2025 (17.x) limitations, known issues, help resources, and other release notes.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 08/19/2026
ms.service: sql
ms.subservice: release-landing
ms.topic: release-notes
ms.custom:
  - ignite-2025
monikerRange: ">=sql-server-2017"
---

# SQL Server 2025 release notes


**Applies to:**
 

 



This article describes requirements, and limitations for  SQL Server 2025 (17.x) 
.

## Upgrade

This release of  SQL Server 2025 (17.x) 
 supports upgrading from previous versions of SQL Server. The operating system environment must meet the requirements in [Hardware and software requirements for SQL Server 2025](install/hardware-and-software-requirements-for-installing-sql-server-2025.md).

## Preview features

Explore preview development features with the new `PREVIEW_FEATURES` database scoped configuration. This configuration lets you try select features in preview even after SQL Server reaches general availability. These features will become generally available in future cumulative updates. When a cumulative update provides general availability for a feature, the database-scoped configuration is no longer necessary for that feature.

To use these features, enable the `PREVIEW_FEATURES` [database scoped configuration](../t-sql/statements/alter-database-scoped-configuration-transact-sql.md#preview-features).


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


The status of all other features described in the [What's new in SQL Server 2025](what-s-new-in-sql-server-2025.md) article is aligned with the release status of  SQL Server 2025 (17.x) 
. They don't require enabling the preview feature database scoped configuration.

For more information, review [Opt in for preview features - FAQ](preview-features-faq.md).

## Breaking changes

 SQL Server 2025 (17.x) 
 introduces breaking changes to a few  Database Engine 
 features. To learn more, review [Breaking changes to Database Engine features in SQL Server 2025](../database-engine/breaking-changes-to-database-engine-features-in-sql-server-2025.md).

## Build number

For information about  SQL Server 2025 (17.x) 
 build numbers, see [SQL Server 2025 build versions](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2025/build-versions).

## Related content

- [What's new in SQL Server 2025](what-s-new-in-sql-server-2025.md)
- [SQL Server 2025 known issues](sql-server-2025-known-issues.md)
- [Hardware and software requirements for SQL Server 2025](install/hardware-and-software-requirements-for-installing-sql-server-2025.md)
