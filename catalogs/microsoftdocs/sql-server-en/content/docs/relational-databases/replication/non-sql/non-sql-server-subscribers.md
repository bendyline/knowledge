---
title: Non-SQL Server Subscribers
description: Non-SQL Server Subscribers can receive snapshot and transactional publications through push subscriptions. Learn about considerations for Oracle and IBM Db2.
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: concept-article
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "subscriptions [SQL Server replication], non-SQL Server Subscribers"
  - "heterogeneous data sources, non-SQL Server Subscribers"
  - "heterogeneous data sources"
  - "heterogeneous database replication, non-SQL Server Subscribers"
  - "non-SQL Server Subscribers, about non-SQL Server Subscribers"
  - "heterogeneous Subscribers"
  - "heterogeneous Subscribers, about heterogeneous Subscribers"
  - "Subscribers [SQL Server replication], non-SQL Server Subscribers"
  - "non-SQL Server Subscribers"
---
# Non-SQL Server Subscribers  

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

The following non- SQL Server 
 Subscribers can subscribe to snapshot and transactional publications by using push subscriptions. The two most recent versions of each database listed support subscriptions by using the most recent version of the OLE DB provider listed.  
  
 Heterogeneous replication to non-SQL Server Subscribers is deprecated. Oracle publishing is deprecated. To move data, create solutions by using change data capture and  SSIS 
.  
  
> **Caution:**  
>  This feature will be removed in a future version of  SQL Server 
. Avoid using this feature in new development work, and plan to modify applications that currently use this feature.   
  
| Database | Operating System | Provider |
| --- | --- | --- |
| Oracle | All platforms that Oracle supports | Oracle OLE DB provider (supplied by Oracle) |
| IBM Db2 | MVS, AS400, Unix, Linux, Windows excluding 9.x | Microsoft Host Integration Server (HIS) OLE DB provider |

Oracle version information:  
 SQL Server 
 supports the following heterogeneous scenarios for transactional and snapshot replication:  
  
-   Publishing data from  SQL Server 
 to non- SQL Server 
 Subscribers.  

-   Publishing data to and from Oracle has the following restrictions:  

  | Replication | 2016 or earlier | 2017 or later |
  | :--- | :--- | :--- |
  | Replication from Oracle | Only support Oracle 10g or earlier | Only support Oracle 10g or earlier |
  | Replication to Oracle | Up to Oracle 12c | Not supported |


 Heterogeneous replication to non-SQL Server Subscribers is deprecated. Oracle publishing is deprecated. To move data, create solutions by using change data capture and  SSIS 
.  

For information about creating subscriptions to Oracle and IBM Db2, see [Oracle Subscribers](oracle-subscribers.md) and [IBM Db2 Subscribers](ibm-db2-subscribers.md).  
  
## Considerations for non-SQL Server Subscribers  
 Keep the following considerations in mind when replicating to non- SQL Server 
 Subscribers:  
  
### General considerations  
  
-   Replication supports publishing tables and indexed views as tables to non- SQL Server 
 Subscribers (indexed views can't be replicated as indexed views).  
  
-   When you create a publication in the New Publication Wizard and then enable it for non-SQL Server Subscribers by using the Publication Properties dialog box, you don't specify the owner of all objects in the subscription database for non- SQL Server 
 Subscribers. For  Microsoft 
  SQL Server 
 Subscribers, the owner is the owner of the corresponding object in the publication database.  
  
-   If a publication has both  SQL Server 
 Subscribers and non- SQL Server 
 Subscribers, you must enable the publication for non- SQL Server 
 Subscribers before creating any subscriptions to  SQL Server 
 Subscribers.  
  
-   By default, scripts that the Snapshot Agent generates for non- SQL Server 
 Subscribers use non-quoted identifiers in the `CREATE TABLE` syntax. Therefore, a published table named `test` is replicated as `TEST`. To use the same case as the table in the publication database, use the **-QuotedIdentifier** parameter for the Distribution Agent. You must also use the **-QuotedIdentifier** parameter if published object names (such as tables, columns, and constraints) include spaces or reserved words in the version of the database at the non- SQL Server 
 Subscriber. For more information about this parameter, see [Replication Distribution Agent](../agents/replication-distribution-agent.md).  
  
-   The account under which the Distribution Agent runs must have read access to the install directory of the OLE DB provider.  
  
-   By default for non- SQL Server 
 Subscribers, the Distribution Agent uses a value of `[(default destination)]` for the subscription database (the **-SubscriberDB** parameter for the Distribution Agent):  
  
    -   For Oracle, a server has at most one database, so you don't need to specify the database.  
  
    -   For IBM Db2, specify the database in the DB2 connection string. For more information, see [Create a Subscription for a Non-SQL Server Subscriber](../create-a-subscription-for-a-non-sql-server-subscriber.md).  
  
-   If the  SQL Server 
 Distributor is running on a 64-bit platform, you must use the 64-bit version of the appropriate OLE DB provider.  
  
-   Replication moves data in Unicode format regardless of the collation or code pages used on the Publisher and Subscriber. Choose a compatible collation or code page when replicating between Publishers and Subscribers.  
  
-   If you add or delete an article from a publication, you must reinitialize subscriptions to non- SQL Server 
 Subscribers.  
  
-   The only constraints supported for all non- SQL Server 
 Subscribers are: `NULL` and `NOT NULL`. Primary key constraints are replicated as unique indexes.  
  
-   Different databases treat the value `NULL` differently. This difference affects how a blank value, an empty string, and a `NULL` are represented. This difference affects the behavior of values inserted into columns with unique constraints defined. For example, Oracle allows multiple `NULL` values in a column that is considered unique, whereas  SQL Server 
 allows only a single `NULL` value in a unique column.  
  
     Another factor is how `NULL` values, empty strings, and blank values are treated when the column is defined as `NOT NULL`. For information about addressing this issue for Oracle Subscribers, see [Oracle Subscribers](oracle-subscribers.md).  
  
-   Replication doesn't delete replication-related metadata (transaction sequence table) from non- SQL Server 
 Subscribers when you remove the subscription.  
  
### Conforming to the Requirements of the Subscriber Database  
  
-   The published schema and data must conform to the requirements of the database at the Subscriber. For example, if a non- SQL Server 
 database has a smaller maximum row size than  SQL Server 
, ensure that the published schema and data don't exceed this size.  
  
-   Tables replicated to non- SQL Server 
 Subscribers adopt the table naming conventions of the database at the Subscriber.  
  
-   DDL isn't supported for non-SQL Server Subscribers. For more information about schema changes, see [Make Schema Changes on Publication Databases](../publish/make-schema-changes-on-publication-databases.md).  
  
### Replication feature support  
  
-    SQL Server 
 offers two types of subscriptions: push and pull. Non- SQL Server 
 Subscribers must use push subscriptions, in which the Distribution Agent runs at the  SQL Server 
 Distributor.  
  
-    SQL Server 
 offers two snapshot formats: native bcp-mode and character-mode. Non- SQL Server 
 Subscribers require character mode snapshots.  
  
-   Non- SQL Server 
 Subscribers can't use immediate updating or queued updating subscriptions, or be nodes in a peer-to-peer topology.  
  
-   Non- SQL Server 
 Subscribers can't be automatically initialized from a backup.  
  
## Related content

- [Heterogeneous Database Replication](heterogeneous-database-replication.md)
- [Subscribe to Publications](../subscribe-to-publications.md)
