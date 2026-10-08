---
title: Set up a Business Logic Handler for Merge Article
description: Use replication programming or Replication Management Objects to configure a business logic handler for Merge Replication synchronization.
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "merge replication conflict resolution [SQL Server replication], business logic handlers"
  - "merge replication business logic handlers [SQL Server replication]"
  - "conflict resolution [SQL Server replication], merge replication"
  - "business logic handlers [SQL Server replication]"
  - "BusinessLogicModule class"
dev_langs:
  - "TSQL"
---
# Implement a business logic handler for a merge article
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  This article describes how to implement a business logic handler for a merge article in  SQL Server 
 by using replication programming or Replication Management Objects (RMO).  
  
 The [Microsoft.SqlServer.Replication.BusinessLogicSupport](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport) namespace implements an interface that you can use to write complex business logic to handle events that occur during the Merge Replication synchronization process. The replication process invokes methods in the business logic handler for each changed row that it replicates during synchronization.  
  
 The general process for implementing a business logic handler is:  
  
1.  Create the business logic handler assembly.  
  
2.  Register the assembly at the Distributor.  
  
3.  Deploy the assembly at the server on which the Merge Agent runs. For a pull subscription, the agent runs on the Subscriber. For a push subscription, the agent runs on the Distributor. When you use Web synchronization, the agent runs on the Web server.  
  
4.  Create an article that uses the business logic handler or modify an existing article to use the business logic handler.  
  
 The business logic handler you specify is executed for every row that is synchronized. Complex logic and calls to other applications or network services can affect performance. For more information about business logic handlers, see [Execute Business Logic During Merge Synchronization](merge/execute-business-logic-during-merge-synchronization.md).  
  
##  <a name="ReplProg"></a> Using replication programming  
  
#### To create and deploy a business logic handler  
  
1.  In  Microsoft 
 Visual Studio, create a new project for the .NET assembly that contains the code that implements the business logic handler.  
  
2.  Add references to the project for the following namespaces.  
  
    | Assembly Reference | Location |
    | --- | --- |
    | [Microsoft.SqlServer.Replication.BusinessLogicSupport](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport) | \<*drive*>:\Program Files\Microsoft SQL Server\\*nnn*\\ |
COM (default installation)|  
    |[System.Data](https://learn.microsoft.com/search/?terms=System.Data)|GAC (component of .NET Framework)|  
    |[System.Data.Common](https://learn.microsoft.com/search/?terms=System.Data.Common)|GAC (component of .NET Framework)|  
  
3.  Add a class that overrides the [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule) class.  
  
4.  Implement the [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.HandledChangeStates%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.HandledChangeStates%252A) property to indicate the types of changes that the handler manages.  
  
5.  Override one or more of the following methods of the [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule) class:  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.CommitHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.CommitHandler%252A) - invoked when a data change is committed during synchronization.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.DeleteErrorHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.DeleteErrorHandler%252A) - invoked when an error occurs when a DELETE statement is being uploaded or downloaded.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.DeleteHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.DeleteHandler%252A) - invoked when DELETE statements are being uploaded or downloaded.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.InsertErrorHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.InsertErrorHandler%252A) - invoked when an error occurs when an INSERT statement is being uploaded or downloaded.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.InsertHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.InsertHandler%252A) - invoked when INSERT statements are being uploaded or downloaded.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.UpdateConflictsHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.UpdateConflictsHandler%252A) - invoked when conflicting UPDATE statements occur at the Publisher and Subscriber.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.UpdateDeleteConflictHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.UpdateDeleteConflictHandler%252A) - invoked when UPDATE statements conflict with DELETE statements at the Publisher and Subscriber.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.UpdateErrorHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.UpdateErrorHandler%252A) - invoked when an error occurs when an UPDATE statement is being uploaded or downloaded.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.UpdateHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.UpdateHandler%252A) - invoked when UPDATE statements are being uploaded or downloaded.  
  
6.  Build the project to create the business logic handler assembly.  
  
7.  Deploy the assembly in the directory that contains the Merge Agent executable file (replmerg.exe), which for a default installation is \<*drive*>:\Program Files\Microsoft SQL Server\\*nnn*\\
COM, or install it in the .NET global assembly cache (GAC). Only install the assembly in the GAC if applications other than the Merge Agent require access to the assembly. Use the Global Assembly Cache tool (**Gacutil.exe)** provided in the .NET Framework SDK to install the assembly into the GAC.  
  
    > **Note:**  
    >  You must deploy a business logic handler on every server on which the Merge Agent runs. This requirement includes the IIS server that hosts the replisapi.dll when using Web synchronization.  
  
#### To register a business logic handler  
  
1.  At the Publisher, execute [sp_enumcustomresolvers (Transact-SQL)](../system-stored-procedures/sp-enumcustomresolvers-transact-sql.md) to verify that the assembly isn't already registered as a business logic handler.  
  
2.  At the Distributor, execute [sp_registercustomresolver (Transact-SQL)](../system-stored-procedures/sp-registercustomresolver-transact-sql.md), specifying a friendly name for the business logic handler for **\@article_resolver**, a value of **true** for **\@is_dotnet_assembly**, the name of the assembly for **\@dotnet_assembly_name**, and the fully qualified name of the class that overrides [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule) for **\@dotnet_class_name**.  
  
    > **Note:**  
    >  If you don't deploy the assembly in the same directory as the Merge Agent executable, in the same directory as the application that synchronously starts the Merge Agent, or in the global assembly cache (GAC), you need to specify the full path with the assembly name for **\@dotnet_assembly_name**. When using Web synchronization, you must specify the location of the assembly at the Web server.  
  
#### To use a business logic handler with a new table article  
  
1.  Execute [sp_addmergearticle (Transact-SQL)](../system-stored-procedures/sp-addmergearticle-transact-sql.md) to define an article, specifying the friendly name of the business logic handler for **\@article_resolver**. For more information, see [Define an Article](publish/define-an-article.md).  
  
#### To use a business logic handler with an existing table article  
  
1.  Run [sp_changemergearticle (Transact-SQL)](../system-stored-procedures/sp-changemergearticle-transact-sql.md), and specify **\@publication**, **\@article**, **article_resolver** for **\@property**, and the friendly name of the business logic handler for **\@value**.  
  
###  <a name="TsqlExample"></a> Examples (Replication Programming)  
 This example shows a business logic handler that creates an audit log.  
  
 [HowTo#rmo_BusinessLogicCode (complete source file; reference: ../../relational-databases/replication/codesnippet/csharp/rmohowto/businesslogic.cs#rmo_businesslogiccode)](../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/businesslogic.cs.md)  
  
 [HowTo#rmo_vb_BusinessLogicCode (complete source file; reference: ../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/businesslogic.vb#rmo_vb_businesslogiccode)](../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/businesslogic.vb.md)  
  
 The following example registers a business logic handler assembly at the Distributor and changes an existing merge article to use this custom business logic.  
  
 [language="sql" source="codesnippet/tsql/implement-a-business-log_3.sql"::: (complete source file; reference: codesnippet/tsql/implement-a-business-log_3.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/implement-a-business-log_3.sql.md)
  
##  <a name="RMOProcedure"></a> Using Replication Management Objects (RMO)  
  
#### To create a business logic handler  
  
1.  In  Microsoft 
 Visual Studio, create a new project for the .NET assembly that contains the code that implements the business logic handler.  
  
2.  Add references to the project for the following namespaces.  
  
    | Assembly Reference | Location |
    | --- | --- |
    | [Microsoft.SqlServer.Replication.BusinessLogicSupport](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport) | \<*drive*>:\Program Files\Microsoft SQL Server\\*nnn*\\ |
COM (default installation)|  
    |[System.Data](https://learn.microsoft.com/search/?terms=System.Data)|GAC (component of .NET Framework)|  
    |[System.Data.Common](https://learn.microsoft.com/search/?terms=System.Data.Common)|GAC (component of .NET Framework)|  
  
3.  Add a class that overrides the [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule) class.  
  
4.  Implement the [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.HandledChangeStates%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.HandledChangeStates%252A) property to indicate the types of changes that the handler manages.  
  
5.  Override one or more of the following methods of the [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule) class:  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.CommitHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.CommitHandler%252A) - invoked when a data change is committed during synchronization.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.DeleteErrorHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.DeleteErrorHandler%252A) - invoked if an error occurs while a DELETE statement is being uploaded or downloaded.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.DeleteHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.DeleteHandler%252A) - invoked when DELETE statements are being uploaded or downloaded.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.InsertErrorHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.InsertErrorHandler%252A) - invoked if an error occurs when an INSERT statement is being uploaded or downloaded.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.InsertHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.InsertHandler%252A) - invoked when INSERT statements are being uploaded or downloaded.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.UpdateConflictsHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.UpdateConflictsHandler%252A) - invoked when conflicting UPDATE statements occur at the Publisher and Subscriber.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.UpdateDeleteConflictHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.UpdateDeleteConflictHandler%252A) - invoked when UPDATE statements conflict with DELETE statements at the Publisher and Subscriber.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.UpdateErrorHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.UpdateErrorHandler%252A) - invoked if an error occurs when an UPDATE statement is being uploaded or downloaded.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.UpdateHandler%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule.UpdateHandler%252A) - invoked when UPDATE statements are being uploaded or downloaded.  
  
    > **Note:**  
    >  The default resolver for the article handles any article conflicts that your custom business logic doesn't explicitly handle.  
  
6.  Build the project to create the business logic handler assembly.  
  
#### To register a business logic handler  
  
1.  Create a connection to the Distributor by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.ReplicationServer](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationServer) class. Pass the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) from step 1.  
  
3.  Call [Microsoft.SqlServer.Replication.ReplicationServer.EnumBusinessLogicHandlers%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationServer.EnumBusinessLogicHandlers%252A) and check the returned [System.Collections.ArrayList](https://learn.microsoft.com/search/?terms=System.Collections.ArrayList) object to ensure that the assembly isn't already registered as a business logic handler.  
  
4.  Create an instance of the [Microsoft.SqlServer.Replication.BusinessLogicHandler](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicHandler) class. Specify the following properties:  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicHandler.DotNetAssemblyName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicHandler.DotNetAssemblyName%252A) - the name of the .NET assembly. If you don't deploy the assembly in the same directory as the Merge Agent executable, in the same directory as the application that synchronously starts the Merge Agent, or in the GAC, include the full path with the assembly name. You must include the full path with the assembly name when using a business logic handler with Web synchronization.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicHandler.DotNetClassName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicHandler.DotNetClassName%252A) - the fully qualified name of the class that overrides [Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport.BusinessLogicModule) and implements the business logic handler.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicHandler.FriendlyName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicHandler.FriendlyName%252A) - a friendly name you use when you access the business logic handler.  
  
    -   [Microsoft.SqlServer.Replication.BusinessLogicHandler.IsDotNetAssembly%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicHandler.IsDotNetAssembly%252A) - a value of **true**.  
  
#### To deploy a business logic handler  
  
1.  Deploy the assembly on the server where the Merge Agent runs in the file location specified when you registered the business logic handler at the Distributor. For a pull subscription, the agent runs on the Subscriber. For a push subscription, the agent runs on the Distributor. When you use Web synchronization, the agent runs on the Web server. If you don't include the full path with the assembly name when you register the business logic handler, deploy the assembly in the same directory as the Merge Agent executable or in the same directory as the application that synchronously starts the Merge Agent. If multiple applications use the same assembly, install the assembly in the GAC.  
  
#### To use a business logic handler with a new table article  
  
1.  Create a connection to the Publisher by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.MergeArticle](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeArticle) class. Set the following properties:  
  
    -   The name of the article for [Microsoft.SqlServer.Replication.Article.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Article.Name%252A).  
  
    -   The name of the publication for [Microsoft.SqlServer.Replication.Article.PublicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Article.PublicationName%252A).  
  
    -   The name of the publication database for [Microsoft.SqlServer.Replication.Article.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Article.DatabaseName%252A).  
  
    -   The friendly name of the business logic handler ([Microsoft.SqlServer.Replication.BusinessLogicHandler.FriendlyName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicHandler.FriendlyName%252A)) for [Microsoft.SqlServer.Replication.MergeArticle.ArticleResolver%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeArticle.ArticleResolver%252A).  
  
3.  Call the [Microsoft.SqlServer.Replication.Article.Create%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Article.Create%252A) method. For more information, see [Define an Article](publish/define-an-article.md).  
  
#### To use a business logic handler with an existing table article  
  
1.  Create a connection to the Publisher by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.MergeArticle](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeArticle) class.  
  
3.  Set the [Microsoft.SqlServer.Replication.Article.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Article.Name%252A), [Microsoft.SqlServer.Replication.Article.PublicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Article.PublicationName%252A), and [Microsoft.SqlServer.Replication.Article.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Article.DatabaseName%252A) properties.  
  
4.  Set the connection from step 1 for the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property.  
  
5.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the properties of the object. If this method returns **false**, either you defined the article properties in step 3 incorrectly or the article doesn't exist. For more information, see [View and Modify Article Properties](publish/view-and-modify-article-properties.md).  
  
6.  Set the friendly name of the business logic handler for [Microsoft.SqlServer.Replication.MergeArticle.ArticleResolver%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeArticle.ArticleResolver%252A). This value is the [Microsoft.SqlServer.Replication.BusinessLogicHandler.FriendlyName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicHandler.FriendlyName%252A) property you specify when registering the business logic handler.  
  
###  <a name="PShellExample"></a> Examples (RMO)  
 This example is a business logic handler that logs information about inserts, updates, and deletes at the Subscriber.  
  
 [HowTo#rmo_BusinessLogicCode (complete source file; reference: ../../relational-databases/replication/codesnippet/csharp/rmohowto/businesslogic.cs#rmo_businesslogiccode)](../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/businesslogic.cs.md)  
  
 [HowTo#rmo_vb_BusinessLogicCode (complete source file; reference: ../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/businesslogic.vb#rmo_vb_businesslogiccode)](../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/businesslogic.vb.md)  
  
 This example registers a business logic handler at the Distributor.  
  
 [HowTo#rmo_RegisterBLH_10 (complete source file; reference: ../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs#rmo_registerblh_10)](../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)  
  
 [HowTo#rmo_vb_RegisterBLH_10 (complete source file; reference: ../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb#rmo_vb_registerblh_10)](../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)  
  
 This example changes an existing article to use the business logic handler.  
  
 [HowTo#rmo_ChangeMergeArticle_BLH (complete source file; reference: ../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs#rmo_changemergearticle_blh)](../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)  
  
 [HowTo#rmo_vb_ChangeMergeArticle_BLH (complete source file; reference: ../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb#rmo_vb_changemergearticle_blh)](../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)  
  
## Related content

- [Implement a custom conflict resolver for a Merge article](implement-a-custom-conflict-resolver-for-a-merge-article.md)
- [Debug a Business Logic Handler (Replication Programming)](debug-a-business-logic-handler-replication-programming.md)
- [Replication Security Best Practices](security/replication-security-best-practices.md)
- [Replication Management Objects Concepts](concepts/replication-management-objects-concepts.md)
