---
title: "Subscribers"
description: "Subscribers"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: ui-reference
ms.custom:
  - updatefrequency5
f1_keywords:
  - "sql13.rep.newsubwizard.subscribers.f1"
helpviewer_keywords:
  - "Subscribers [SQL Server replication]"
monikerRange: "=azuresqldb-current || >=sql-server-2017"
---
# Subscribers

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)



  Specify the  Microsoft 
  SQL Server 
 or non-  SQL Server 
 Subscribers that will receive a subscription to the selected publication.


  > **Note:** 
  > Azure SQL Managed Instance can be a publisher, distributor, and subscriber for snapshot and transactional replication. Databases in Azure SQL Database can only be push subscribers for snapshot and transactional replication. For more information, see Transactional replication with [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/database/replication-to-sql-database) and [Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/replication-transactional-overview).

  
## Options  
 **Subscribers**  
 Select the check box in the grid to enable the corresponding  SQL Server 
 or non-  SQL Server 
 data source as a Subscriber to the publication chosen on the **Publication** page. If the Subscriber is not listed, click **Add Subscriber** or **Add SQL Server Subscriber**.  
  
 **Subscription database**  
 The information displayed in and actions available from this column depend on the type of Subscriber listed in the **Subscribers** column:  
  
-   For  SQL Server 
 Subscribers, select a subscription database from the **Subscription Database** list or create a new database by selecting the **New database** command from the same list.  
  
    > **Note:**  
    >  If you are enabling the Publisher as a Subscriber, the subscription database must be different from the publication database.  
  
-   For non- SQL Server 
 Subscribers, the subscription database is not displayed. Specify the database, along with other connection information, in the **Data source name** field of the **Add Non-SQL Server** dialog box. This dialog box is available by clicking **Add Subscriber** and then clicking **Add Non-SQL Server Subscriber**.  
  
 **Add Subscriber**  
 Add a server to the list of servers that can be enabled as Subscribers. This button is displayed when all of the following conditions are true:  
  
-   The publication you selected is a snapshot or transactional publication that does not support updating subscriptions.  
  
    > **Note:**  
    >  If the publication you are subscribing to has  SQL Server 
 subscriptions and the publication is not already enabled for non- SQL Server 
 Subscribers, you cannot add a non- SQL Server 
 subscription.  
  
-   The subscription is a push subscription.  
  
-   The Publisher of the selected publication is  Microsoft 
  SQL Server 2005 (9.x) 
 or later.  
  
 Clicking **Add Subscriber** shows a menu with two choices: **Add SQL Server Subscriber** and **Add Non-SQL Server Subscriber**. Click **Add Non-SQL Server Subscriber** to add an Oracle or IBM Db2 Subscriber.  
  
 **Add SQL Server Subscriber**  
 Add a server to the list of servers that can be enabled as Subscribers. This button is displayed when one or more of the following conditions is true:  
  
-   The publication you selected is a merge publication, or a snapshot or transactional publication that supports updating subscriptions.  
  
-   The subscription is a pull subscription.  
  
-   The Publisher of the selected publication is earlier than  SQL Server 2005 (9.x) 
. For earlier versions, the button is displayed only if one or more of the following conditions is true:  
  
    -   You are a member of the **sysadmin** fixed server role at the Publisher.  
  
    -   The Subscriber has been added on the **Subscribers** page of the **Publisher Properties** dialog box.  
  
    -   The publication allows anonymous subscriptions.  
  
## Related content

- [Create a Pull Subscription](create-a-pull-subscription.md)
- [Create a push subscription](create-a-push-subscription.md)
- [Non-SQL Server Subscribers](non-sql/non-sql-server-subscribers.md)
- [Subscribe to Publications](subscribe-to-publications.md)
