---
title: "Full-Text Search and Semantic Search Stored Procedures (Transact-SQL)"
description: "Full-Text Search and Semantic Search stored procedures (Transact-SQL)"
author: markingmyname
ms.author: maghan
ms.reviewer: randolphwest
ms.date: 06/23/2025
ms.service: sql
ms.subservice: system-objects
ms.topic: "reference"
helpviewer_keywords:
  - "full-text indexes [SQL Server], stored procedures"
  - "full-text search [SQL Server], stored procedures"
  - "full-text catalogs [SQL Server], stored procedures"
  - "system stored procedures [SQL Server], full-text search"
dev_langs:
  - "TSQL"
---
# Full-Text Search and Semantic Search stored procedures (Transact-SQL)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

 SQL Server 
 supports the following system stored procedures that are used to implement and query full-text indexes and semantic indexes.

## Full-Text Search stored procedures

- [sp_fulltext_catalog](sp-fulltext-catalog-transact-sql.md)

  Creates and drops a full-text catalog, and starts and stops the indexing action for a catalog. Multiple full-text catalogs can be created for each database.

  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use [CREATE FULLTEXT CATALOG](../../t-sql/statements/create-fulltext-catalog-transact-sql.md), [ALTER FULLTEXT CATALOG](../../t-sql/statements/alter-fulltext-catalog-transact-sql.md), and [DROP FULLTEXT CATALOG](../../t-sql/statements/drop-fulltext-catalog-transact-sql.md) instead.

- [sp_fulltext_column](sp-fulltext-column-transact-sql.md)

  Specifies whether or not a particular column of a table participates in full-text indexing.

  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use [ALTER FULLTEXT INDEX](../../t-sql/statements/alter-fulltext-index-transact-sql.md) instead.

- [sp_fulltext_database](sp-fulltext-database-transact-sql.md)

  Has no effect on full-text catalogs in  SQL Server 2008 (10.0.x) 
 and later versions and is supported for backward compatibility only.

  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature. 

- [sp_fulltext_keymappings](sp-fulltext-keymappings-transact-sql.md)

  Returns mappings between document identifiers (`DocId`) and full-text key values.

- [sp_fulltext_load_thesaurus_file](sp-fulltext-load-thesaurus-file-transact-sql.md)

  Parses and loads the data from an updated thesaurus file that corresponds to an LCID and causes recompilation of full-text queries that use the thesaurus.

- [sp_fulltext_pendingchanges](sp-fulltext-pendingchanges-transact-sql.md)

  Returns unprocessed changes, such as pending inserts, updates, and deletes, for a specified table that is using change tracking.

- [sp_fulltext_service](sp-fulltext-service-transact-sql.md)

  Changes the server properties of full-text search for SQL Server.

- [sp_fulltext_table](sp-fulltext-table-transact-sql.md)
  Marks or unmarks a table for full-text indexing.

  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use [CREATE FULLTEXT INDEX](../../t-sql/statements/create-fulltext-index-transact-sql.md), [ALTER FULLTEXT INDEX](../../t-sql/statements/alter-fulltext-index-transact-sql.md), and [DROP FULLTEXT INDEX](../../t-sql/statements/drop-fulltext-index-transact-sql.md) instead.

- [sp_help_fulltext_catalog_components](sp-help-fulltext-catalog-components-transact-sql.md)

  Returns a list of all components (filters, word-breakers, and protocol handlers), used for all full-text catalogs in the current database.

  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature. 

- [sp_help_fulltext_catalogs](sp-help-fulltext-catalogs-transact-sql.md)

  Returns the ID, name, root directory, status, and number of full-text indexed tables for the specified full-text catalog.

  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use the [sys.fulltext_catalogs](../system-catalog-views/sys-fulltext-catalogs-transact-sql.md) catalog view instead.

- [sp_help_fulltext_catalogs_cursor](sp-help-fulltext-catalogs-cursor-transact-sql.md)

  Uses a cursor to return the ID, name, root directory, status, and number of full-text indexed tables for the specified full-text catalog.

  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use the [sys.fulltext_catalogs](../system-catalog-views/sys-fulltext-catalogs-transact-sql.md) catalog view instead.

- [sp_help_fulltext_columns](sp-help-fulltext-columns-transact-sql.md)

  Returns the columns designated for full-text indexing.

  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use the [sys.fulltext_index_columns](../system-catalog-views/sys-fulltext-index-columns-transact-sql.md) catalog view instead.

- [sp_help_fulltext_columns_cursor](sp-help-fulltext-columns-cursor-transact-sql.md)

  Uses a cursor to return the columns designated for full-text indexing.

  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use the [sys.fulltext_index_columns](../system-catalog-views/sys-fulltext-index-columns-transact-sql.md) catalog view instead.

- [sp_help_fulltext_system_components](sp-help-fulltext-system-components-transact-sql.md)

  Returns information for the registered word-breakers, filter, and protocol handlers, as well as a list of identifiers of databases and full-text catalogs that have used a specified component.

- [sp_help_fulltext_tables](sp-help-fulltext-tables-transact-sql.md)

  Returns a list of tables that are registered for full-text indexing.

- [sp_help_fulltext_tables_cursor](sp-help-fulltext-tables-cursor-transact-sql.md)

  Returns a list of tables that are registered for full-text indexing.

  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.  Use the [sys.fulltext_indexes](../system-catalog-views/sys-fulltext-indexes-transact-sql.md) catalog view instead.

## Semantic Search stored procedures

- [sp_fulltext_semantic_register_language_statistics_db](sp-fulltext-semantic-register-language-statistics-db-transact-sql.md)

  Registers a pre-populated Semantic Language Statistics database in the current instance of  SQL Server 
.

- [sp_fulltext_semantic_unregister_language_statistics_db](sp-fulltext-semantic-unregister-language-statistics-db-transact-sql.md)

  Unregisters an existing Semantic Language Statistics database from the current instance of  SQL Server 
 and deletes any associated metadata.

## Related content

- [Full-Text Search and semantic search catalog views (Transact-SQL)](../system-catalog-views/full-text-search-and-semantic-search-catalog-views-transact-sql.md)
- [Full-text and semantic search dynamic management views and functions](../system-dynamic-management-objects/full-text-and-semantic-search-dynamic-management-views-functions.md)
- [System stored procedures (Transact-SQL)](system-stored-procedures-transact-sql.md)
- [Full-Text Search](../search/full-text-search.md)
