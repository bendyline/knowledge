---
title: Upgrade Full-Text Search
titleSuffix: SQL Server Full-Text Search
description: Upgrade Full-Text Search in SQL Server.
author: rwestMSFT
ms.author: randolphwest
ms.date: 07/20/2026
ms.service: sql
ms.subservice: search
ms.topic: upgrade-and-migration-article
helpviewer_keywords:
  - "full-text search [SQL Server], installing"
  - "migrating full-text indexes [SQL Server]"
  - "upgrading Full-Text Search"
  - "installing Full-Text Search"
  - "full-text search [SQL Server], upgrading"
monikerRange: ">=sql-server-2017 || >=sql-server-linux-2017"
---
# Upgrade Full-Text Search (SQL Server Search)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SQL Server upgrades full-text search during setup, or when you attach, restore, or copy database files and full-text catalogs from  SQL Server 2005 (9.x) 
 and earlier versions.

<a id="Upgrade_Server"></a>

## Upgrade a server instance

For an in-place upgrade, an instance of  SQL Server 
 is set up side-by-side with the old version of  SQL Server 
, and data is migrated. If the old version of  SQL Server 
 had full-text search installed, a new version of full-text search is automatically installed. Side-by-side install means that each of the following components exists at the instance-level of  SQL Server 
.

### Word breakers, stemmers, and filters

Each instance now uses its own set of word breakers, stemmers, and filters, rather than relying on the operating system version of these components. These components are also easier to register and configure at a per-instance level. For more information, see [Configure and manage word breakers and stemmers](configure-and-manage-word-breakers-and-stemmers-for-search.md) and [Configure and manage filters](configure-and-manage-filters-for-search.md).

### Filter daemon host

The full-text filter daemon hosts are processes that safely load and drive extensible external components used for index and query, such as word breakers, stemmers, and filters, without compromising the integrity of the Full-Text Engine. A server instance uses a multithreaded process for all multithreaded filters and a single-threaded process for all single-threaded filters.

The FDHOST Launcher service (`MSSQLFDLauncher`) propagates the service account information to the filter daemon host processes of a specific instance of the  Database Engine 
. For information about setting the service account, see [Set the service account for the full-text Filter Daemon Launcher](set-the-service-account-for-the-full-text-filter-daemon-launcher.md).

### SQL Server 2005 upgrade compatibility

A full-text catalog is a logical or virtual object that contains a group of full-text indexes. Therefore, a new full-text catalog isn't treated as a database file with a physical path. However, if you upgrade from  SQL Server 2005 (9.x) 
, a new filegroup is created on the same disk for any full-text catalog that contains data files.

This procedure maintains the old disk I/O behavior after upgrade. Any full-text index from that catalog is placed in the new filegroup if the root path exists. If the old full-text catalog path is invalid, the upgrade keeps the full-text index in the same filegroup as the base table or, for a partitioned table, in the primary filegroup.

<a id="FT_Upgrade_Options"></a>

## Full-text upgrade options

When you upgrade a  SQL Server 
 instance, the user interface allows you to choose one of the following full-text upgrade options. These options are available only for  SQL Server 2005 (9.x) 
 databases.

### Import

Full-text catalogs are imported. Typically, import is significantly faster than rebuild. For example, with only one CPU core, import runs about 10 times faster than rebuild. However, an imported full-text catalog doesn't use the new word breakers installed with the latest version of  SQL Server 
. To ensure consistency in query results, full-text catalogs have to be rebuilt.

> **Note:**  
> Rebuild can run in multithreaded mode, and if more than 10 CPU cores are available, rebuild might run faster than import if you allow rebuild to use all cores.

If a full-text catalog isn't available, the associated full-text indexes are rebuilt.

For information about the effect of importing a full-text index, see [Considerations for choosing a full-text upgrade option](#considerations-for-choosing-a-full-text-upgrade-option) later in this article.

### Rebuild

Full-text catalogs are rebuilt using the current version's word breakers. Rebuilding indexes can take a while, and a significant amount of CPU and memory might be required after the upgrade.

### Reset

Full-text catalogs are reset. When you upgrade from  SQL Server 2005 (9.x) 
, full-text catalog files are removed, but the metadata for full-text catalogs and full-text indexes is retained. After being upgraded, all full-text indexes are disabled for change tracking and crawls aren't started automatically. The catalog will remain empty until you manually issue a full population, after the upgrade completes.

<a id="Choosing_Upgrade_Option"></a>

## Considerations for choosing a full-text upgrade option

When you choose the upgrade option, consider the following:

- Do you require consistency in query results?

  The  Database Engine 
 installs new word breakers for use by Full-Text and Semantic Search. The word breakers are used both at indexing time and at query time. If you don't rebuild the full-text catalogs, your search results might be inconsistent. If you issue a full-text query that looks for a phrase that is broken differently by the word breaker in a previous version of the  Database Engine 
 and the current word breaker, a document or row containing the phrase might not be retrieved. This is because the indexed phrases were broken using different logic than the query is using. The solution is to repopulate (rebuild) the full-text catalogs with the new word breakers so that index time and query time behavior are identical. You can choose the **Rebuild** option to accomplish this, or you can rebuild manually after choosing the **Import** option.

- Were any full-text indexes built on integer full-text key columns?

  Rebuilding performs internal optimizations that improve the query performance of the upgraded full-text index in some cases. Specifically, if you have full-text catalogs that contain full-text indexes for which the full-text key column of the base table is an integer data type, rebuilding achieves ideal performance of full-text queries after upgrade. In this case, you should use the **Rebuild** option.

  > **Note:**  
  > For full-text indexes, the column serving as the full-text key should be an integer data type. For more information, see [Improve the performance of full-text indexes](improve-the-performance-of-full-text-indexes.md).

- What is the priority for getting your server instance online?

  Importing or rebuilding during upgrade takes a lot of CPU resources, which delays getting the rest of the server instance upgraded and online. If getting the server instance online as soon as possible is important and if you're willing to run a manual population after the upgrade, **Reset** is suitable.

## Ensure consistent query results after importing a full-text index

If a full-text catalog is imported when you upgrade a  SQL Server 2005 (9.x) 
 database, mismatches between the query and the full-text index content might occur because of differences in the behavior of the old and new word breakers. In this case, to guarantee a total match between queries and the full-text index content, choose one of the following options:

- Rebuild the full-text catalog that contains the full-text index with [ALTER FULLTEXT CATALOG](../../t-sql/statements/alter-fulltext-catalog-transact-sql.md):

  ```sql
  ALTER FULLTEXT CATALOG <catalog_name> REBUILD;
  ```

- Issue a `FULL POPULATION` on the full-text index with [ALTER FULLTEXT INDEX](../../t-sql/statements/alter-fulltext-index-transact-sql.md):

  ```sql
  ALTER FULLTEXT INDEX ON <table_name> START FULL POPULATION;
  ```

For more information about word breakers, see [Configure and manage word breakers and stemmers](configure-and-manage-word-breakers-and-stemmers-for-search.md).

## Upgrade noise-word files to stoplists

When a database is upgraded from  SQL Server 2005 (9.x) 
, the noise-word files are no longer used. However, the old noise-word files are stored in the `FTDATA\FTNoiseThesaurusBak` folder, and you can use them later when updating or building the corresponding  SQL Server 
 stoplists.

After upgrading from  SQL Server 2005 (9.x) 
:

- If you never added, modified, or deleted any noise-word files in your installation of  SQL Server 2005 (9.x) 
, the system stoplist should meet your needs.

- If your noise-word files were modified in  SQL Server 2005 (9.x) 
, those modifications are lost during upgrade. To re-create those updates, you must manually recreate those modifications in the corresponding stoplist. For more information, see [ALTER FULLTEXT STOPLIST](../../t-sql/statements/alter-fulltext-stoplist-transact-sql.md).

- If you don't want to apply any stopwords to your full-text indexes (for example, if you deleted or erased your noise-word files in your  SQL Server 2005 (9.x) 
 installation), you must turn off the stoplist for each upgraded full-text index. Run the following  Transact-SQL  statement (replacing *database* with the name of the upgraded database and *table* with the name of the *table*):

  ```sql
  USE [database];
  GO

  ALTER FULLTEXT INDEX ON [table]
  SET STOPLIST OFF;
  GO
  ```

  The `STOPLIST OFF` clause removes stop-word filtering, and it triggers a population of the table, without filtering any words considered to be noise.

## Backup and imported full-text catalogs

For full-text catalogs that are rebuilt or reset during upgrade (and for new full-text catalogs), the full-text catalog is a logical concept and doesn't reside in a filegroup. Therefore, to back up a full-text catalog, you must identify every filegroup that contains a full-text index of the catalog and back each of them up, one by one. For more information, see [Back up and restore full-text catalogs and indexes](back-up-and-restore-full-text-catalogs-and-indexes.md).

For full-text catalogs that have been imported from  SQL Server 2005 (9.x) 
, the full-text catalog is still a database file in its own filegroup. The  SQL Server 2005 (9.x) 
 backup process for full-text catalogs still applies except that the MSFTESQL service doesn't exist in  SQL Server 
. For information about the  SQL Server 2005 (9.x) 
 process, see [Backing Up and Restoring Full-Text Catalogs](https://learn.microsoft.com/previous-versions/sql/sql-server-2005/ms142511\(v=sql.90\)) in SQL Server 2005 Books Online.

<a id="Upgrade_Db"></a>

## Migrate full-text indexes when upgrading a database

Database files and full-text catalogs from a previous version of  SQL Server 
 can be upgraded to an existing instance by using attach, restore, or the Copy Database Wizard.  SQL Server 2005 (9.x) 
 full-text indexes, if any, are either imported, reset, or rebuilt. The `upgrade_option` server property specifies which full-text upgrade option the server instance uses during these database upgrades.

After you attach, restore, or copy any  SQL Server 2005 (9.x) 
 database to a newer instance, the database becomes available immediately and is then automatically upgraded. Depending on the amount of data being indexed, importing can take several hours, and rebuilding can take up to 10 times longer. When the upgrade option is set to import, if a full-text catalog isn't available, the associated full-text indexes are rebuilt.

### Change full-text upgrade behavior on a server instance

-  Transact-SQL : Use the `upgrade_option` action of [sp_fulltext_service](../system-stored-procedures/sp-fulltext-service-transact-sql.md)

-  SQL Server Management Studio 
: Use the **Full-Text Upgrade Option** of the **Server Properties** dialog box. For more information, see [Manage and Monitor Full-Text Search for a Server Instance](manage-and-monitor-full-text-search-for-a-server-instance.md).

<a id="Considerations_for_Restore"></a>

## Considerations for restoring a SQL Server 2005 (9.x) full-text catalog

One method of upgrading full-text data from a  SQL Server 2005 (9.x) 
 database is to restore a full database backup to a newer instance of  SQL Server 
.

While importing a  SQL Server 2005 (9.x) 
 full-text catalog, you can back up and restore the database and the catalog file. The behavior is the same as in  SQL Server 2005 (9.x) 
:

- The full database backup includes the full-text catalog. To refer to the full-text catalog, use its  SQL Server 2005 (9.x) 
 file name, sysft_+*catalog-name*.

- If the full-text catalog is offline, the backup fails.

For more information about backing up and restoring  SQL Server 2005 (9.x) 
 full-text catalogs, see [Back up and restore full-text catalogs and indexes](back-up-and-restore-full-text-catalogs-and-indexes.md) and [File Backup and Restore and Full-Text Catalogs](https://learn.microsoft.com/previous-versions/sql/sql-server-2008-r2/ms190643\(v=sql.105\)) in  SQL Server 2005 (9.x) 
 Books Online.

When the database is restored on a newer instance of  SQL Server 
, a new database file is created for the full-text catalog. The default name of this file is ftrow_*catalog-name*.ndf. For example, if your *catalog-name* is `cat1`, the default name of the  SQL Server 
 database file would be `ftrow_cat1.ndf`. But if the default name is already being used in the target directory, the new database file would be named `ftrow_`*catalog-name*`{`*GUID*`}.ndf`, where *GUID* is the globally unique identifier of the new file.

After the catalogs are imported, the `sys.database_files` and `sys.master_files` are updated to remove the catalog entries and the `path` column in `sys.fulltext_catalogs` is set to `NULL`.

### Back up a database

- [Full database backups](../backup-restore/full-database-backups-sql-server.md)
- [Transaction log backups](../backup-restore/transaction-log-backups-sql-server.md) (full recovery model only)

### Restore a database backup

- [Complete Database Restores (Simple Recovery Model)](../backup-restore/complete-database-restores-simple-recovery-model.md)
- [Complete Database Restores (Full Recovery Model)](../backup-restore/complete-database-restores-full-recovery-model.md)

### Example

The following example uses the `MOVE` clause in the [RESTORE](../../t-sql/statements/restore-statements-transact-sql.md) statement to restore a  SQL Server 2005 (9.x) 
 database named `ftdb1`. The  SQL Server 2005 (9.x) 
 database, log, and catalog files are moved to new locations on the  SQL Server 
 server instance, as follows:

- The database file, `ftdb1.mdf`, is moved to `C:\Program Files\Microsoft SQL Server\MSSQL.1MSSQL13.MSSQLSERVER\MSSQL\DATA\ftdb1.mdf`.

- The log file, `ftdb1_log.ldf`, is moved to a log directory on your log disk drive, *log_drive*`:\`*log_directory*`\ftdb1_log.ldf`.

- The catalog files that correspond to the `sysft_cat90` catalog are moved to `C:\temp`. After the full-text indexes are imported, they're automatically placed in a database file, `C:\ftrow_sysft_cat90.ndf`, and `C:\temp` will be deleted.

```sql
RESTORE DATABASE [ftdb1] FROM DISK = N'C:\temp\ftdb1.bak'
    WITH FILE = 1,
    MOVE N'ftdb1' TO N'C:\Program Files\Microsoft SQL Server\MSSQL12.MSSQLSERVER\MSSQL\DATA\ftdb1.mdf',
    MOVE N'ftdb1_log' TO N'log_drive:\log_directory\ftdb1_log.ldf',
    MOVE N'sysft_cat90' TO N'C:\temp';
```

<a id="Attaching_2005_ft_catalogs"></a>

## Attach a SQL Server 2005 database

In  SQL Server 2008 (10.0.x) 
 and later versions, a full-text catalog is a logical concept that refers to a group of full-text indexes. The full-text catalog is a virtual object that doesn't belong to any filegroup. However, when you attach a  SQL Server 2005 (9.x) 
 database that contains full-text catalog files onto a newer  SQL Server 
 server instance, the catalog files are attached from their previous location along with the other database files, the same as in  SQL Server 2005 (9.x) 
.

The state of each attached full-text catalog on  SQL Server 
 is the same as when the database was detached from  SQL Server 2005 (9.x) 
. If any full-text index population was suspended by the detach operation, the population is resumed on  SQL Server 
, and the full-text index becomes available for full-text search.

If  SQL Server 
 can't find a full-text catalog file, or if the full-text file was moved during the attach operation without specifying a new location, the behavior depends on the selected full-text upgrade option. If the full-text upgrade option is **Import** or **Rebuild**, the attached full-text catalog is rebuilt. If the full-text upgrade option is **Reset**, the attached full-text catalog is reset.

For more information about detaching and attaching a database, see [Database detach and attach](../databases/database-detach-and-attach-sql-server.md), [CREATE DATABASE](../../t-sql/statements/create-database-transact-sql.md), [sp_attach_db](../system-stored-procedures/sp-attach-db-transact-sql.md), and [sp_detach_db](../system-stored-procedures/sp-detach-db-transact-sql.md).

## Related content

- [Get Started with Full-Text Search](get-started-with-full-text-search.md)
- [Configure and manage word breakers and stemmers](configure-and-manage-word-breakers-and-stemmers-for-search.md)
- [Configure and manage filters](configure-and-manage-filters-for-search.md)
