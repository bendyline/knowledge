---
title: "Update Statistics Task (Maintenance Plan)"
description: Learn how to update SQL Server information about the data in the tables and indexes by using the Use the Update Statistics Task.
author: rwestMSFT
ms.author: randolphwest
ms.reviewer: randolphwest
ms.date: 03/27/2023
ms.service: sql
ms.subservice: supportability
ms.topic: how-to
f1_keywords:
  - "sql13.swb.maint.statistics.f1"
helpviewer_keywords:
  - "Updates Statistics Task dialog box"
---
# Update Statistics Task (Maintenance Plan)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Use the **Update Statistics Task** dialog to update  Microsoft 
  SQL Server 
 information about the data in the tables and indexes. This task resamples the distribution statistics of each index created on user tables in the database. The distribution statistics are used by  SQL Server 
 to optimize navigation through tables during the processing of  Transact-SQL  statements. To build the distribution statistics automatically,  SQL Server 
 periodically samples the data in the corresponding table for each index. This size of the sample is based on the number of rows in the table and the frequency of data modification. Use this option to perform an additional sampling using the specified percentage of data in the tables.  SQL Server 
 uses this information to create better query plans.

This task executes the `UPDATE STATISTICS` statement.

## Options

- **Connection**

  Select the server connection to use when performing this task.

- **New**

  Create a new server connection to use when performing this task. The **New Connection** dialog box is described below.

- **Databases**

  Specify the databases affected by this task.

  - **All databases**

    Generate a maintenance plan that runs maintenance tasks against all  SQL Server 
 databases, except `tempdb`.

  - **All system databases**

    Generate a maintenance plan that runs maintenance tasks against each of the  SQL Server 
 system databases except `tempdb`. No maintenance tasks are run against user-created databases.

  - **All user databases**

    Generate a maintenance plan that runs maintenance tasks against all user-created databases. No maintenance tasks are run against the  SQL Server 
 system databases.

  - **These specific databases**

    Generate a maintenance plan that runs maintenance tasks against only those databases that are selected. At least one database in the list must be selected if this option is chosen.

  > **Note:**  
  > Maintenance plans only run against databases set to compatibility level 80 or higher.

- **Object**

  Limit the **Selection** grid to display tables, views, or both.

- **Selection**

  Specify the tables or indexes affected by this task. Not available when **Tables and Views** is selected in the Object box.

- **All existing statistics**

  Update statistics for both columns and indexes.

- **Column statistics only**

  Only update column statistics.

- **Index statistics only**

  Only update index statistics.

- **Scan type**

  Type of scan used to gather updated statistics.

- **Full scan**

  Read all rows in the table or view to gather the statistics.

- **Sample by**

  Specify the percentage of the table or indexed view, or the number of rows to sample when collecting statistics for larger tables or views.

- **View T-SQL**

  View the  Transact-SQL  statements performed against the server for this task, based on the selected options.

  > **Note:**  
  > When the number of objects affected is large, this display can take a considerable amount of time.

## New Connection dialog box

- **Connection name**

  Enter a name for the new connection.

- **Select or enter a server name**

  Select a server to connect to when performing this task.

- **Refresh**

  Refresh the list of available servers.

- **Enter information to log on to the server**

  Specify how to authenticate against the server.

- **Use Windows integrated security**

  Connect to an instance of the  SQL Server 
  Database Engine 
 with  Microsoft 
 Windows Authentication.

- **Use a specific user name and password**

  Connect to an instance of the  SQL Server 
  Database Engine 
 using  SQL Server 
 Authentication. This option isn't available.

- **User name**

  Provide a  SQL Server 
 login to use when authenticating. This option isn't available.

- **Password**

  Provide a password to use when authenticating. This option isn't available.

## Related content

- [UPDATE STATISTICS (Transact-SQL)](../../t-sql/statements/update-statistics-transact-sql.md)
- [sys.sp_updatestats (Transact-SQL)](../system-stored-procedures/sp-updatestats-transact-sql.md)
- [Adaptive Index Defrag](https://github.com/Microsoft/tigertoolbox/tree/master/AdaptiveIndexDefrag)
