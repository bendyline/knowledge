---
title: "Administer a Peer-to-Peer topology (Replication SP)"
description: Learn how to use replication stored procedures to administer a peer-to-peer topology, such as to add an article, or make a schema change.
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "transactional replication, peer-to-peer replication"
dev_langs:
  - "TSQL"
---
# Administer a Peer-to-Peer Topology (Replication Transact-SQL Programming)

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  Administering a peer-to-peer topology is similar to administering a typical transactional replication topology, but there are a number of areas with special considerations. The principal difference in administering a peer-to-peer topology is that some changes require the system to be *quiesced*. Quiescing a system involves stopping activity on published tables at all nodes and ensuring that each node has received all changes from all other nodes. For more information, see [Quiesce a Replication Topology (Replication Transact-SQL Programming)](quiesce-a-replication-topology-replication-transact-sql-programming.md).  
  
> **Note:**  
>  In a peer-to-peer topology, the distributor cannot be using an earlier version of  SQL Server 
 than a pull subscriber.  
  
### To add an article to an existing configuration  
  
1.  Quiesce the system.  
  
2.  Stop the Distribution Agent at each node in the topology. For more information, see [Replication Agent Executables Concepts](../concepts/replication-agent-executables-concepts.md) or [Start and Stop a Replication Agent (SQL Server Management Studio)](../agents/start-and-stop-a-replication-agent-sql-server-management-studio.md).  
  
3.  Execute the CREATE TABLE statement to add the new table at each node in the topology.  
  
4.  Bulk copy the data for the new table manually at all nodes by using the [bcp utility](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/tools/bcp-utility.md).  
  
5.  Execute [sp_addarticle](../../system-stored-procedures/sp-addarticle-transact-sql.md) to create the new article at each node in the topology. For more information, see [Define an Article](../publish/define-an-article.md).  
  
    > **Note:**  
    >  After [sp_addarticle](../../system-stored-procedures/sp-addarticle-transact-sql.md) is executed, replication automatically adds the article to the subscriptions in the topology.  
  
6.  Restart the Distribution Agents at each node in the topology.  

### To make schema changes to a publication database  
  
1.  Quiesce the system.  
  
2.  Execute the data definition language (DDL) statements to modify the schema of published tables. For more information about supported schema changes, see [Make Schema Changes on Publication Databases](../publish/make-schema-changes-on-publication-databases.md).  
  
3.  Before you resume activity on published tables, quiesce the system again. This ensures that schema changes have been received by all nodes before any new data changes are replicated.  
  
## Example  
 The following example demonstrates how to add a new table article to an existing peer-to-peer replication topology that has two nodes.  
  
 [language="sql" source="../codesnippet/tsql/administer-a-peer-to-pee_1.sql"::: (complete source file; reference: ../codesnippet/tsql/administer-a-peer-to-pee_1.sql)](../../../../_code/docs/relational-databases/replication/codesnippet/tsql/administer-a-peer-to-pee_1.sql.md)
  
 [language="sql" source="../codesnippet/tsql/administer-a-peer-to-pee_2.sql"::: (complete source file; reference: ../codesnippet/tsql/administer-a-peer-to-pee_2.sql)](../../../../_code/docs/relational-databases/replication/codesnippet/tsql/administer-a-peer-to-pee_2.sql.md)
  
 [language="sql" source="../codesnippet/tsql/administer-a-peer-to-pee_3.sql"::: (complete source file; reference: ../codesnippet/tsql/administer-a-peer-to-pee_3.sql)](../../../../_code/docs/relational-databases/replication/codesnippet/tsql/administer-a-peer-to-pee_3.sql.md)
  
## Related content

- [Replication Administration FAQ](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/replication/administration/frequently-asked-questions-for-replication-administrators.yml)
- [Back up and restore of SQL Server databases](../../backup-restore/back-up-and-restore-of-sql-server-databases.md)
- [Peer-to-Peer - Transactional Replication](../transactional/peer-to-peer-transactional-replication.md)
