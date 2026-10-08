---
title: "Delete an Article"
description: "Delete an Article"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "articles [SQL Server replication], dropping"
  - "sp_droparticle"
  - "sp_dropmergearticle"
  - "deleting articles"
  - "removing articles"
  - "dropping articles"
dev_langs:
  - "TSQL"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# Delete an Article

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




  This topic describes how to delete an article in  SQL Server 
 by using  Transact-SQL  or Replication Management Objects (RMO). For information about the conditions under which articles can be dropped and whether dropping an article requires a new snapshot or the reinitialization of subscriptions, see [Add Articles to and Drop Articles from Existing Publications](add-articles-to-and-drop-articles-from-existing-publications.md).  
  
##  <a name="TsqlProcedure"></a> Using Transact-SQL  
 Articles can be deleted programmatically using replication stored procedures. The stored procedures that you use depend on the type of publication to which the article belongs.  
  
#### To delete an article from a snapshot or transactional publication  
  
1.  Execute [sp_droparticle (Transact-SQL)](../../system-stored-procedures/sp-droparticle-transact-sql.md) to delete an article, specified by **\@article**, from a publication, specified by **\@publication**. Specify a value of **1** for **\@force_invalidate_snapshot**.  
  
2.  (Optional) To remove the published object from the database entirely, execute the `DROP <objectname>` command at the Publisher on the publication database.  

#### To delete an article from a merge publication  
  
1.  Execute [sp_dropmergearticle (Transact-SQL)](../../system-stored-procedures/sp-dropmergearticle-transact-sql.md) to delete an article, specified by **\@article**, from a publication, specified by **\@publication**. If necessary, specify a value of **1** for **\@force_invalidate_snapshot** and a value of **1** for **\@force_reinit_subscription**.  
  
2.  (Optional) To remove the published object from the database entirely, execute the `DROP <objectname>` command at the Publisher on the publication database.  
  
###  <a name="TsqlExample"></a> Examples (Transact-SQL)  
 The following example deletes an article from a transactional publication. Because this change invalidates the existing snapshot, a value of **1** is specified for the **\@force_invalidate_snapshot** parameter.  
  
```  
DECLARE @publication AS sysname;  
DECLARE @article AS sysname;  
SET @publication = N'AdvWorksProductTran';   
SET @article = N'Product';   
  
-- Drop the transactional article.  
USE [AdventureWorks]  
EXEC sp_droparticle   
  @publication = @publication,   
  @article = @article,  
  @force_invalidate_snapshot = 1;  
GO  
```  
  
 The following example deletes two articles from a merge publication. Because these changes invalidate the existing snapshot, a value of **1** is specified for the **\@force_invalidate_snapshot** parameter.  
  
```  
DECLARE @publication AS sysname;  
DECLARE @article1 AS sysname;  
DECLARE @article2 AS sysname;  
SET @publication = N'AdvWorksSalesOrdersMerge';  
SET @article1 = N'SalesOrderDetail';   
SET @article2 = N'SalesOrderHeader';   
  
-- Remove articles from a merge publication.  
USE [AdventureWorks]  
EXEC sp_dropmergearticle   
  @publication = @publication,   
  @article = @article1,  
  @force_invalidate_snapshot = 1;  
EXEC sp_dropmergearticle   
  @publication = @publication,   
  @article = @article2,  
  @force_invalidate_snapshot = 1;  
GO  
```  
  
##  <a name="RMOProcedure"></a> Using Replication Management Objects (RMO)  
 You can delete articles programmatically by using Replication Management Objects (RMO). The RMO classes you use to delete an article depend on the type of publication to which the article belongs.  
  
#### To delete an article that belongs to a snapshot or transactional publication  
  
1.  Create a connection to the Publisher by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.TransArticle](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransArticle) class.  
  
3.  Set the [Microsoft.SqlServer.Replication.Article.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Article.Name%252A), [Microsoft.SqlServer.Replication.Article.PublicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Article.PublicationName%252A), and [Microsoft.SqlServer.Replication.Article.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Article.DatabaseName%252A) properties.  
  
4.  Set the connection from step 1 for the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property.  
  
5.  Check the [Microsoft.SqlServer.Replication.ReplicationObject.IsExistingObject%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.IsExistingObject%252A) property to verify that the article exists. If the value of this property is **false**, either the article properties in step 3 were defined incorrectly or the article does not exist.  
  
6.  Call the [Microsoft.SqlServer.Replication.Article.Remove%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Article.Remove%252A) method.  
  
7.  Close all connections.  
  
#### To delete an article that belongs to a merge publication  
  
1.  Create a connection to the Publisher by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.MergeArticle](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeArticle) class.  
  
3.  Set the [Microsoft.SqlServer.Replication.Article.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Article.Name%252A), [Microsoft.SqlServer.Replication.Article.PublicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Article.PublicationName%252A), and [Microsoft.SqlServer.Replication.Article.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Article.DatabaseName%252A) properties.  
  
4.  Set the connection from step 1 for the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property.  
  
5.  Check the [Microsoft.SqlServer.Replication.ReplicationObject.IsExistingObject%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.IsExistingObject%252A) property to verify that the article exists. If the value of this property is **false**, either the article properties in step 3 were defined incorrectly or the article does not exist.  
  
6.  Call the [Microsoft.SqlServer.Replication.Article.Remove%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Article.Remove%252A) method.  
  
7.  Close all connections.  
  
## Related content

- [Add Articles to and Drop Articles from Existing Publications](add-articles-to-and-drop-articles-from-existing-publications.md)
- [Replication System Stored Procedures Concepts](../concepts/replication-system-stored-procedures-concepts.md)
