---
title: "Create a push subscription"
description: Learn how to create a push subscription in SQL Server by using SQL Server Management Studio, Transact-SQL, or Replication Management Objects.
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 02/03/2026
ai-usage: ai-assisted
ms.service: sql
ms.subservice: replication
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "push subscriptions [SQL Server replication], creating"
  - "merge replication subscribing [SQL Server replication], push subscriptions"
  - "subscriptions [SQL Server replication], push"
  - "snapshot replication [SQL Server], subscribing"
  - "transactional replication, subscribing"
monikerRange: "=azuresqldb-mi-current || =azuresqldb-current || >=sql-server-2017"
---
# Create a push subscription

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 




  This topic describes how to create a push subscription in  SQL Server 
 by using  SQL Server Management Studio 
,  Transact-SQL , or Replication Management Objects (RMO). For information about creating a push subscription for a non-  SQL Server 
 Subscriber, see [Create a subscription for a non-SQL Server Subscriber](create-a-subscription-for-a-non-sql-server-subscriber.md).  

  > **Note:** 
  > Azure SQL Managed Instance can be a publisher, distributor, and subscriber for snapshot and transactional replication. Databases in Azure SQL Database can only be push subscribers for snapshot and transactional replication. For more information, see Transactional replication with [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/replication-to-sql-database) and [Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/replication-transactional-overview).

  
 
##  <a name="SSMSProcedure"></a> Using SQL Server Management Studio  
Create a push subscription at the Publisher or the Subscriber by using the New Subscription Wizard. Follow the pages in the wizard to:  
  
- Specify the Publisher and publication.  
  
- Select where replication agents will run. For a push subscription, select **Run all agents at the Distributor (push subscriptions)** on the **Distribution Agent Location** page or **Merge Agent Location** page, depending on the type of publication.  
  
- Specify Subscribers and subscription databases.  
  
- Specify the logins and passwords used for connections made by replication agents:  
  
  - For subscriptions to snapshot and transactional publications, specify credentials on the **Distribution Agent Security** page.  
  
  - For subscriptions to merge publications, specify credentials on the **Merge Agent Security** page.  
  
    For information about the permissions that each agent requires, see [Replication agent security model](security/replication-agent-security-model.md).  
  
- Specify a synchronization schedule and when the Subscriber should be initialized.  
  
- Specify additional options for merge publications: subscription type and values for parameterized filtering.  
  
- Specify additional options for transactional publications that allow updating subscriptions. One option is to decide whether Subscribers should commit changes at the Publisher immediately or write them to a queue. Another option is setting up credentials used to connect from the Subscriber to the Publisher.  
  
- Optionally, script the subscription.  
  
#### To create a push subscription from the Publisher  
  
1. Connect to the Publisher in  Microsoft 
  SQL Server Management Studio 
, and then expand the server node.  
  
2. Expand the **Replication** folder, and then expand the **Local Publications** folder.  
  
3. Right-click the publication for which you want to create one or more subscriptions, and then select **New Subscriptions**.  
  
4. Complete the pages in the New Subscription Wizard.  
  
#### To create a push subscription from the Subscriber  
  
1. Connect to the Subscriber in  SQL Server Management Studio 
, and then expand the server node.  
  
2. Expand the **Replication** folder.  
  
3. Right-click the **Local Subscriptions** folder, and then select **New Subscriptions**.  
  
4. On the **Publication** page of the New Subscription Wizard, select **\<Find SQL Server Publisher>** or **\<Find Oracle Publisher>** from the **Publisher** dropdown list.  
  
5. Connect to the Publisher in the **Connect to Server** dialog box.  
  
6. Select a publication on the **Publication** page.  
  
7. Complete the pages in the New Subscription Wizard.  
  
##  <a name="TsqlProcedure"></a> Using Transact-SQL  
You can create push subscriptions programmatically by using replication stored procedures. The stored procedures used will depend on the type of publication to which the subscription belongs.  
  
> **Important:**
> When possible, prompt users to enter security credentials at runtime. If you must store credentials in a script file, you must secure the file to prevent unauthorized access.  
  
#### To create a push subscription to a snapshot or transactional publication  
  
1. At the Publisher on the publication database, verify that the publication supports push subscriptions by running [sp_helppublication](../system-stored-procedures/sp-helppublication-transact-sql.md).  
  
   - If the value of **allow_push** is **1**, push subscriptions are supported.  
  
   - If the value of **allow_push** is **0**, run [sp_changepublication](../system-stored-procedures/sp-changepublication-transact-sql.md). Specify **allow_push** for **\@property** and **true** for **\@value**.  
  
2. At the Publisher on the publication database, run [sp_addsubscription](../system-stored-procedures/sp-addsubscription-transact-sql.md). Specify **\@publication**, **\@subscriber**, and **\@destination_db**. Specify a value of **push** for **\@subscription_type**. For information about how to update subscriptions, see [Create an updatable subscription to a transactional publication](publish/create-an-updatable-subscription-to-a-transactional-publication.md).  
  
3. At the Publisher on the publication database, run [sp_addpushsubscription_agent](../system-stored-procedures/sp-addpushsubscription-agent-transact-sql.md). Specify the following:  
  
   - The **\@subscriber**, **\@subscriber_db**, and **\@publication** parameters.  
  
   - The  Microsoft 
 Windows credentials under which the Distribution Agent at the Distributor runs for **\@job_login** and **\@job_password**.  
  
     > **Note:**
     > Connections made through Windows Integrated Authentication always use the Windows credentials specified by **\@job_login** and **\@job_password**. The Distribution Agent always makes the local connection to the Distributor by using Windows Integrated Authentication. By default, the agent will connect to the Subscriber by using Windows Integrated Authentication.  
  
   - (Optional) A value of **0** for **\@subscriber_security_mode** and the  Microsoft 
  SQL Server 
 login information for **\@subscriber_login** and **\@subscriber_password**. Specify these parameters if you need to use SQL Server Authentication when connecting to the Subscriber.  
  
   - A schedule for the Distribution Agent job for this subscription. For more information, see [Specify synchronization schedules](specify-synchronization-schedules.md).  
  
> **Important:**
> When you're creating a push subscription at a Publisher with a remote Distributor, the values supplied for all parameters, including *job_login* and *job_password*, are sent to the Distributor as plain text. You should encrypt the connection between the Publisher and its remote Distributor before running this stored procedure. For more information, see [Enable encrypted connections to the database engine &#40;SQL Server Configuration Manager&#41;](../../database-engine/configure-windows/configure-sql-server-encryption.md).  
  
#### To create a push subscription to a merge publication  
  
1. At the Publisher on the publication database, verify that the publication supports push subscriptions by running [sp_helpmergepublication](../system-stored-procedures/sp-helpmergepublication-transact-sql.md).  
  
   - If the value of **allow_push** is **1**, the publication supports push subscriptions.  
  
   - If the value of **allow_push** is not **1**, run [sp_changemergepublication](../system-stored-procedures/sp-changemergepublication-transact-sql.md). Specify **allow_push** for **\@property** and **true** for **\@value**.  
  
2. At the Publisher on the publication database, run [sp_addmergesubscription](../system-stored-procedures/sp-addmergesubscription-transact-sql.md). Specify the following parameters:  
  
   - **\@publication**. This is the name of the publication.  
  
   - **\@subscriber_type**. For a client subscription, specify **local**. For a server subscription, specify **global**.  
  
   - **\@subscription_priority**. For a server subscription, specify a priority for the subscription (**0.00** to **99.99**).  
  
   For more information, see [Advanced merge replication conflict detection and resolution](merge/advanced-merge-replication-conflict-detection-and-resolution.md).  
  
3. At the Publisher on the publication database, run [sp_addmergepushsubscription_agent](../system-stored-procedures/sp-addmergepushsubscription-agent-transact-sql.md). Specify the following:  
  
   - The **\@subscriber**, **\@subscriber_db**, and **\@publication** parameters.  
  
   - The Windows credentials under which the Merge Agent at the Distributor runs for **\@job_login** and **\@job_password**.  
  
     > **Note:**
     > Connections made through Windows Integrated Authentication always use the Windows credentials specified by **\@job_login** and **\@job_password**. The Merge Agent always makes the local connection to the Distributor by using Windows Integrated Authentication. By default, the agent will connect to the Subscriber by using Windows Integrated Authentication.  
  
   - (Optional) A value of **0** for **\@subscriber_security_mode** and the  SQL Server 
 login information for **\@subscriber_login** and **\@subscriber_password**. Specify these parameters if you need to use SQL Server Authentication when connecting to the Subscriber.  
  
   - (Optional) A value of **0** for **\@publisher_security_mode** and the  SQL Server 
 login information for **\@publisher_login** and **\@publisher_password**. Specify these values if you need to use SQL Server Authentication when connecting to the Publisher.  
  
   - A schedule for the Merge Agent job for this subscription. For more information, see [Specify synchronization schedules](specify-synchronization-schedules.md).  
  
> **Important:**
> When you're creating a push subscription at a Publisher with a remote Distributor, the values supplied for all parameters, including *job_login* and *job_password*, are sent to the Distributor as plain text. You should encrypt the connection between the Publisher and its remote Distributor before running this stored procedure. For more information, see [Enable encrypted connections to the database engine &#40;SQL Server Configuration Manager&#41;](../../database-engine/configure-windows/configure-sql-server-encryption.md).  
  
###  <a name="TsqlExample"></a> Examples (Transact-SQL)  
 The following example creates a push subscription to a transactional publication. Login and password values are supplied at runtime through **sqlcmd** scripting variables.  
  
 [language="sql" source="codesnippet/tsql/create-a-push-subscription_1.sql"::: (complete source file; reference: codesnippet/tsql/create-a-push-subscription_1.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/create-a-push-subscription_1.sql.md)
  
 The following example creates a push subscription to a merge publication. Login and password values are supplied at runtime through **sqlcmd** scripting variables.  
  
 [language="sql" source="codesnippet/tsql/create-a-push-subscription_2.sql"::: (complete source file; reference: codesnippet/tsql/create-a-push-subscription_2.sql)](../../../_code/docs/relational-databases/replication/codesnippet/tsql/create-a-push-subscription_2.sql.md)
  
##  <a name="RMOProcedure"></a> Using Replication Management Objects  
 You can create push subscriptions programmatically by using Replication Management Objects (RMO). The RMO classes that you use to create a push subscription depend on the type of publication to which the subscription is created.  
  
> **Important:**
> When possible, prompt users to enter security credentials at runtime. If you must store credentials, use the [cryptographic services](https://learn.microsoft.com/previous-versions/aa719848\(v=vs.71\)) that the  Microsoft 
 Windows .NET Framework provides.  
  
#### To create a push subscription to a snapshot or transactional publication  
  
1. Create a connection to the Publisher by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2. Create an instance of the [Microsoft.SqlServer.Replication.TransPublication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransPublication) class by using the Publisher connection from step 1. Specify [Microsoft.SqlServer.Replication.Publication.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Name%252A), [Microsoft.SqlServer.Replication.Publication.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.DatabaseName%252A), and [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A).  
  
3. Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method. If this method returns **false**, either the properties specified in step 2 are incorrect or the publication does not exist on the server.  
  
4. Perform a bitwise logical AND (**&** in Visual C# and **And** in Visual Basic) between the [Microsoft.SqlServer.Replication.Publication.Attributes%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Attributes%252A) property and [Microsoft.SqlServer.Replication.PublicationAttributes.AllowPush](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationAttributes.AllowPush). If the result is [Microsoft.SqlServer.Replication.PublicationAttributes.None](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationAttributes.None), set [Microsoft.SqlServer.Replication.Publication.Attributes%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Attributes%252A) to the result of a bitwise logical OR (**|** in Visual C# and **Or** in Visual Basic) between [Microsoft.SqlServer.Replication.Publication.Attributes%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Attributes%252A) and [Microsoft.SqlServer.Replication.PublicationAttributes.AllowPush](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationAttributes.AllowPush). Then, call [Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%252A) to enable push subscriptions.  
  
5. If the subscription database does not exist, create it by using the [Microsoft.SqlServer.Management.Smo.Database](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database) class. For more information, see [Creating, altering, and removing databases](../server-management-objects-smo/tasks/creating-altering-and-removing-databases.md).  
  
6. Create an instance of the [Microsoft.SqlServer.Replication.TransSubscription](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransSubscription) class.  
  
7. Set the following subscription properties:  
  
   - The [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) to the Publisher created in step 1 for [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A).  
  
   - Name of the subscription database for [Microsoft.SqlServer.Replication.Subscription.SubscriptionDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SubscriptionDBName%252A).  
  
   - Name of the Subscriber for [Microsoft.SqlServer.Replication.Subscription.SubscriberName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SubscriberName%252A). 
  
   - Name of the publication database for [Microsoft.SqlServer.Replication.Subscription.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.DatabaseName%252A).  
  
   - Name of the publication for [Microsoft.SqlServer.Replication.Subscription.PublicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.PublicationName%252A).
  
   - The [Microsoft.SqlServer.Replication.IProcessSecurityContext.Login%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.IProcessSecurityContext.Login%252A) and [Microsoft.SqlServer.Replication.IProcessSecurityContext.Password%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.IProcessSecurityContext.Password%252A) fields of [Microsoft.SqlServer.Replication.Subscription.SynchronizationAgentProcessSecurity%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SynchronizationAgentProcessSecurity%252A) to provide the credentials for the  Microsoft 
 Windows account under which the Distribution Agent runs at the Distributor. This account is used to make local connections to the Distributor and to make remote connections by using Windows Authentication.  
  
     > **Note:**
     > Setting [Microsoft.SqlServer.Replication.Subscription.SynchronizationAgentProcessSecurity%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SynchronizationAgentProcessSecurity%252A) is not required when the subscription is created by a member of the **sysadmin** fixed server role, but we recommend it. In this case, the agent will impersonate the SQL Server Agent account. For more information, see [Replication Agent security model](security/replication-agent-security-model.md).  
  
   - (Optional) A value of **true** (the default) for [Microsoft.SqlServer.Replication.Subscription.CreateSyncAgentByDefault%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.CreateSyncAgentByDefault%252A) to create an agent job that is used to synchronize the subscription. If you specify **false**, the subscription can only be synchronized programmatically.  
  
   - (Optional) Set the [Microsoft.SqlServer.Replication.ConnectionSecurityContext.WindowsAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ConnectionSecurityContext.WindowsAuthentication%252A) to False, [Microsoft.SqlServer.Replication.ConnectionSecurityContext.SqlStandardLogin%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ConnectionSecurityContext.SqlStandardLogin%252A) and [Microsoft.SqlServer.Replication.ConnectionSecurityContext.SqlStandardPassword%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ConnectionSecurityContext.SqlStandardPassword%252A) or [Microsoft.SqlServer.Replication.ConnectionSecurityContext.SecureSqlStandardPassword%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ConnectionSecurityContext.SecureSqlStandardPassword%252A) fields of [Microsoft.SqlServer.Replication.Subscription.SubscriberSecurity%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SubscriberSecurity%252A) when using SQL Server Authentication to connect to the Subscriber.  
  
8. Call the [Microsoft.SqlServer.Replication.Subscription.Create%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.Create%252A) method.  
  
> **Important:**
> When you're creating a push subscription at a Publisher with a remote Distributor, the values supplied for all properties, including [Microsoft.SqlServer.Replication.Subscription.SynchronizationAgentProcessSecurity%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SynchronizationAgentProcessSecurity%252A), are sent to the Distributor as plain text. You should encrypt the connection between the Publisher and its remote Distributor before calling the [Microsoft.SqlServer.Replication.Subscription.Create%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.Create%252A) method. For more information, see [Enable encrypted connections to the database engine &#40;SQL Server Configuration Manager&#41;](../../database-engine/configure-windows/configure-sql-server-encryption.md).  
  
#### To create a push subscription to a merge publication  
  
1. Create a connection to the Publisher by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2. Create an instance of the [Microsoft.SqlServer.Replication.MergePublication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePublication) class by using the Publisher connection from step 1. Specify [Microsoft.SqlServer.Replication.Publication.Name%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Name%252A), [Microsoft.SqlServer.Replication.Publication.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.DatabaseName%252A), and [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A).  
  
3. Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method. If this method returns **false**, either the properties specified in step 2 are incorrect or the publication does not exist on the server.  
  
4. Perform a bitwise logical AND (**&** in Visual C# and **And** in Visual Basic) between the [Microsoft.SqlServer.Replication.Publication.Attributes%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Attributes%252A) property and [Microsoft.SqlServer.Replication.PublicationAttributes.AllowPush](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationAttributes.AllowPush). If the result is [Microsoft.SqlServer.Replication.PublicationAttributes.None](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationAttributes.None), set [Microsoft.SqlServer.Replication.Publication.Attributes%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Attributes%252A) to the result of a bitwise logical OR (**|** in Visual C# and **Or** in Visual Basic) between [Microsoft.SqlServer.Replication.Publication.Attributes%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Publication.Attributes%252A) and [Microsoft.SqlServer.Replication.PublicationAttributes.AllowPush](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PublicationAttributes.AllowPush). Then, call [Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges%252A) to enable push subscriptions.  
  
5. If the subscription database does not exist, create it by using the [Microsoft.SqlServer.Management.Smo.Database](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database) class. For more information, see [Creating, altering, and removing databases](../server-management-objects-smo/tasks/creating-altering-and-removing-databases.md).  
  
6. Create an instance of the [Microsoft.SqlServer.Replication.MergeSubscription](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSubscription) class.  
  
7. Set the following subscription properties:  
  
   - The [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) to the Publisher created in step 1 for [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A).  
  
   - Name of the subscription database for [Microsoft.SqlServer.Replication.Subscription.SubscriptionDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SubscriptionDBName%252A).  
  
   - Name of the Subscriber for [Microsoft.SqlServer.Replication.Subscription.SubscriberName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SubscriberName%252A).    
   - Name of the publication database for [Microsoft.SqlServer.Replication.Subscription.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.DatabaseName%252A).  
  
   - Name of the publication for [Microsoft.SqlServer.Replication.Subscription.PublicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.PublicationName%252A).    
   - The [Microsoft.SqlServer.Replication.IProcessSecurityContext.Login%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.IProcessSecurityContext.Login%252A) and [Microsoft.SqlServer.Replication.IProcessSecurityContext.Password%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.IProcessSecurityContext.Password%252A) fields of [Microsoft.SqlServer.Replication.Subscription.SynchronizationAgentProcessSecurity%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SynchronizationAgentProcessSecurity%252A) to provide the credentials for the  Microsoft 
 Windows account under which the Merge Agent runs at the Distributor. This account is used to make local connections to the Distributor and to make remote connections through Windows Authentication.  
  
     > **Note:**
     > Setting [Microsoft.SqlServer.Replication.Subscription.SynchronizationAgentProcessSecurity%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SynchronizationAgentProcessSecurity%252A) is not required when the subscription is created by a member of the **sysadmin** fixed server role, but we recommend it. In this case, the agent will impersonate the SQL Server Agent account. For more information, see [Replication Agent security model](security/replication-agent-security-model.md).  
  
   - (Optional) A value of **true** (the default) for [Microsoft.SqlServer.Replication.Subscription.CreateSyncAgentByDefault%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.CreateSyncAgentByDefault%252A) to create an agent job that is used to synchronize the subscription. If you specify **false**, the subscription can only be synchronized programmatically.  
  
   - (Optional) Set the [Microsoft.SqlServer.Replication.ConnectionSecurityContext.SqlStandardLogin%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ConnectionSecurityContext.SqlStandardLogin%252A) and [Microsoft.SqlServer.Replication.ConnectionSecurityContext.SqlStandardPassword%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ConnectionSecurityContext.SqlStandardPassword%252A) or [Microsoft.SqlServer.Replication.ConnectionSecurityContext.SecureSqlStandardPassword%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ConnectionSecurityContext.SecureSqlStandardPassword%252A) fields of [Microsoft.SqlServer.Replication.Subscription.SubscriberSecurity%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SubscriberSecurity%252A) when using SQL Server Authentication to connect to the Subscriber.  
  
   - (Optional) Set the [Microsoft.SqlServer.Replication.ConnectionSecurityContext.WindowsAuthentication%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ConnectionSecurityContext.WindowsAuthentication%252A) to False, [Microsoft.SqlServer.Replication.ConnectionSecurityContext.SqlStandardLogin%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ConnectionSecurityContext.SqlStandardLogin%252A) and [Microsoft.SqlServer.Replication.ConnectionSecurityContext.SqlStandardPassword%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ConnectionSecurityContext.SqlStandardPassword%252A) or [Microsoft.SqlServer.Replication.ConnectionSecurityContext.SecureSqlStandardPassword%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ConnectionSecurityContext.SecureSqlStandardPassword%252A) fields of [Microsoft.SqlServer.Replication.PullSubscription.PublisherSecurity%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.PublisherSecurity%252A) when using SQL Server Authentication to connect to the Publisher.  
  
8. Call the [Microsoft.SqlServer.Replication.Subscription.Create%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.Create%252A) method.  
  
> **Important:**  
> When you're creating a push subscription at a Publisher with a remote Distributor, the values supplied for all properties, including [Microsoft.SqlServer.Replication.Subscription.SynchronizationAgentProcessSecurity%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.SynchronizationAgentProcessSecurity%252A), are sent to the Distributor as plain text. You should encrypt the connection between the Publisher and its remote Distributor before calling the [Microsoft.SqlServer.Replication.Subscription.Create%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.Subscription.Create%252A) method. For more information, see [Enable encrypted connections to the database engine &#40;SQL Server Configuration Manager&#41;](../../database-engine/configure-windows/configure-sql-server-encryption.md).  
  
###  <a name="PShellExample"></a> Examples (RMO)  
 This example creates a new push subscription to a transactional publication. The Windows account credentials that you use to run the Distribution Agent job are passed at runtime.  
  
 [language="csharp" source="../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs" range="rmo_createtranpushsub"::: (complete source file; reference: ../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs)](../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)

 [language="vb" source="../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb" range="rmo_vb_createtranpushsub"::: (complete source file; reference: ../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb)](../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)
  
 [language="csharp" source="../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs" range="rmo_createmergepushsub"::: (complete source file; reference: ../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs)](../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)

 [language="vb" source="../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb" range="rmo_vb_createmergepushsub"::: (complete source file; reference: ../../relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb)](../../../_code/docs/relational-databases/replication/codesnippet/visualbasic/rmohowtovb/rmotestenv.vb.md)

## Related content

- [View and Modify Push Subscription Properties](view-and-modify-push-subscription-properties.md)
- [Delete a Push Subscription](delete-a-push-subscription.md)
- [Replication Security Best Practices](security/replication-security-best-practices.md)
- [Create a publication](publish/create-a-publication.md)
- [Replication Management Objects Concepts](concepts/replication-management-objects-concepts.md)
- [Synchronize a Push Subscription](synchronize-a-push-subscription.md)
- [Subscribe to Publications](subscribe-to-publications.md)
- [Use sqlcmd with scripting variables](../../tools/sqlcmd/sqlcmd-use-scripting-variables.md)
