---
title: "Tutorial: Configure Merge Replication"
description: This tutorial teaches you how to configure Merge Replication between a SQL Server and a mobile client.
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: tutorial
helpviewer_keywords:
  - "replication [SQL Server], tutorials"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current"
ms.custom:
  - updatefrequency5
  - sfi-image-nochange
---
# Tutorial: Configure replication between a server and mobile clients (merge)
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
Merge replication is a good solution to the problem of moving data between a central server and mobile clients that are only occasionally connected. By using the replication wizards, you can easily configure and administer a merge replication topology. 

This tutorial shows you how to configure a replication topology for mobile clients. For more information about merge replication, see the [overview of merge replication](merge/merge-replication.md).
  
## What you will learn  
This tutorial teaches you to use merge replication to publish data from a central database to one or more mobile users so that each user gets a uniquely filtered subset of the data. 

In this tutorial, you will learn how to:
> 
> * Configure a publisher for merge replication.
> * Add a mobile subscriber for merge publication.
> * Synchronize the subscription to the merge publication.
  
## Prerequisites  
This tutorial is for users who are familiar with fundamental database operations, but who have limited experience with replication. Before you start this tutorial, you must complete [Tutorial: Prepare SQL Server for replication](tutorial-preparing-the-server-for-replication.md).  
  
To complete this tutorial, you need SQL Server, SQL Server Management Studio (SSMS), and an AdventureWorks database: 
  
- At the publisher server (source), install:  
  
   - Any edition of SQL Server, except for SQL Server Express or SQL Server Compact. These editions cannot be a replication publisher.   
   - The  `AdventureWorks2025`  sample database. To enhance security, the sample databases are not installed by default.  
  
- At the subscriber server (destination), install any edition of SQL Server, except SQL Server Express or SQL Server Compact. The publication that's created in this tutorial does not support either SQL Server Express or SQL Server Compact. 

- Install [SQL Server Management Studio](https://learn.microsoft.com/ssms/install/install).
- Install [SQL Server 2017 Developer edition](https://www.microsoft.com/sql-server/sql-server-downloads).
- Download the [AdventureWorks sample database](https://github.com/Microsoft/sql-server-samples/releases). For instructions on restoring a database in SSMS, see [Restoring a database](../backup-restore/restore-a-database-backup-using-ssms.md).  
 
  
>**Note:**
> Replication is not supported on SQL Server instances that are more than two versions apart.
>
> In  SQL Server Management Studio 
, you must connect to the publisher and subscriber by using a login that is a member of the **sysadmin** fixed server role. For more information on this role, see [Server-level roles](../security/authentication-access/server-level-roles.md).  
  
  
**Estimated time to complete this tutorial: 60 minutes**  
  
## Configure a publisher for merge replication
In this section, you create a merge publication by using  SQL Server Management Studio 
 to publish a subset of the **Employee**, **SalesOrderHeader**, and **SalesOrderDetail** tables in the  `AdventureWorks2025`  sample database. These tables are filtered with parameterized row filters so that each subscription contains a unique partition of the data. You also add the  SQL Server 
 login used by the Merge Agent to the publication access list (PAL).  
  
### Create merge publication and define articles  
  
1. Connect to the publisher in  SQL Server Management Studio 
, and then expand the server node.  
  
2. Start the SQL Server Agent by right-clicking it in Object Explorer and selecting **Start**. If this step doesn't start the agent, you'll need to manually do so from SQL Server Configuration Manager.  
3. Expand the **Replication** folder, right-click **Local Publications**, and select **New Publication**. The New Publication Wizard starts:  

   Selections to start the New Publication Wizard
  
3. On the **Publication Database** page, select  `AdventureWorks2025` , and then select **Next**. 

      
4. On the **Publication Type** page, select **Merge publication**, and then select **Next**.  
   
5. On the **Subscriber Types** page, ensure that only  SQL Server 2008 (10.0.x) 
 or later is selected, and then select **Next**: 

    "Publication Type" and "Subscriber Types" pages
  
   
6. On the **Articles** page, expand the **Tables** node. Select the following three tables: **Employee**, **SalesOrderHeader**, and **SalesOrderDetail**. Select **Next**.  

   Table selections on the "articles" page

   >**Note:**
   > The **Employee** table contains a column (**OrganizationNode**) that has the **hierarchyid** data type. This data type is supported for replication only in SQL Server 2017. 
   >
   > If you're using a build earlier than SQL Server 2017, a message appears at the bottom of the screen to notify you of potential data loss for using this column in bidirectional replication. For the purpose of this tutorial, you can ignore this message. However, this data type should not be replicated in a production environment unless you're using the supported build.
   > 
   > For more information about replicating the **hierarchyid** data type, see [Using hierarchyid columns in replication](../../t-sql/data-types/hierarchyid-data-type-method-reference.md#using-hierarchyid-columns-in-replicated-tables).
    
  
7. On the **Filter Table Rows** page, select **Add** and then select **Add Filter**.  
  
8. In the **Add Filter** dialog box, select **Employee (HumanResources)** in **Select the table to filter**. Select the **LoginID** column, select the right arrow to add the column to the WHERE clause of the filter query, and modify the WHERE clause as follows:  
  
   ```sql 
    WHERE [LoginID] = HOST_NAME()  
   ```  
  
   Select **A row from this table will go to only one subscription**, and select **OK**.  
 
   Selections for adding a filter

    
  
10. On the **Filter Table Rows** page, select **Employee (Human Resources)**, select **Add**, and then select **Add Join to Extend the Selected Filter**.  
  
    a. In the **Add Join** dialog box, select **Sales.SalesOrderHeader** under **Joined table**. Select **Write the join statement manually**, and complete the join statement as follows:  
  
    ```sql  
    ON [Employee].[BusinessEntityID] =  [SalesOrderHeader].[SalesPersonID] 
    ```  
  
    b. In **Specify join options**, select **Unique key**, and then select **OK**.

    Selections for adding a join to the filter

  
13. On the **Filter Table Rows** page, select **SalesOrderHeader**, select **Add**, and then select **Add Join to Extend the Selected Filter**.  
  
    a. In the **Add Join** dialog box, select **Sales.SalesOrderDetail** under **Joined table**.    
    b. Select **Use the Builder to create the statement**.  
    c. In the **Preview** box, confirm that the join statement is as follows:  
  
    ```sql  
    ON [SalesOrderHeader].[SalesOrderID] = [SalesOrderDetail].[SalesOrderID] 
    ```  
  
    d. In **Specify join options**, select **Unique key**, and then select **OK**. Select **Next**. 

    Selections for adding another join, for sales orders
  
21. Select **Create a snapshot immediately**, clear **Schedule the snapshot agent to run at the following times**, and select **Next**:  

    Selection for creating a snapshot immediately
  
22. On the **Agent Security** page, select **Security Settings**. Enter <*Publisher_Machine_Name*>**\repl_snapshot** in the **Process account** box, supply the password for this account, and then select **OK**. Select **Next**.  

    Selections for setting Snapshot Agent security
  
23. On the **Complete the Wizard** page, enter **AdvWorksSalesOrdersMerge** in the **Publication name** box and select **Finish**:  

    "Complete the Wizard" page with publication name
  
24. After the publication is created, select **Close**. Under the **Replication** node in **Object Explorer**, right-click **Local Publications** and select **Refresh** to view your new merge replication.  
  
### View the status of snapshot generation  
  
1. Connect to the publisher in  SQL Server Management Studio 
, expand the server node, and then expand the **Replication** folder.  
  
2. In the **Local Publications** folder, right-click **AdvWorksSalesOrdersMerge**, and then select **View Snapshot Agent Status**:  

   Selections for viewing Snapshot Agent status
  
3. The current status of the Snapshot Agent job for the publication appears. Ensure that the snapshot job has succeeded before you continue to the next lesson.  
  
### Add the Merge Agent login to the PAL  
  
1. Connect to the publisher in  SQL Server Management Studio 
, expand the server node, and then expand the **Replication** folder.  
  
2. In the **Local Publications** folder, right-click **AdvWorksSalesOrdersMerge**, and then select **Properties**.  
  
   a. Select the **Publication Access List** page, and select **Add**. 
  
   b. In the **Add Publication Access** dialog box, select <*Publisher_Machine_Name*>**\repl_merge** and select **OK**. Select **OK** again. 

   Selections for adding the Merge Agent login 

  
For more information, see:  
- [Filter published data](publish/filter-published-data.md) 
- [Parameterized row filters](merge/parameterized-filters-parameterized-row-filters.md)  
- [Define an article](publish/define-an-article.md)  
  
  
## Create a subscription to the merge publication
In this section, you add a subscription to the merge publication that you created previously. This tutorial uses the remote subscriber (NODE2\SQL2016). You then set permissions on the subscription database and manually generate the filtered data snapshot for the new subscription.   
  
### Add a subscriber for merge publication
  
1. Connect to the subscriber in  SQL Server Management Studio 
, and expand the server node. Expand the **Replication** folder, right-click the **Local Subscriptions** folder, and then select **New Subscriptions**. The New Subscription Wizard starts:

   Selections to start the New Subscription Wizard
  
2. On the **Publication** page, select **Find SQL Server Publisher** in the **Publisher** list.  
  
   In the **Connect to Server** dialog box, enter the name of the publisher instance in the **Server name** box, and select **Connect**. 

   Selections for adding a publisher
  
4. Select **AdvWorksSalesOrdersMerge**, and select **Next**.  
  
5. On the **Merge Agent Location** page, select **Run each agent at its Subscriber**, and then select **Next**:  

   "Run each agent at its Subscriber" option
  
6. On the **Subscribers** page, select the instance name of the subscriber server. Under **Subscription Database**, select **New Database** from the list.  
  
   In the **New Database** dialog box, enter **SalesOrdersReplica** in the **Database name** box. Select **OK**, and then select **Next**. 

   Selections for adding a database to the subscriber
  
8. On the **Merge Agent Security** page, select the ellipsis (**...**) button. Enter <*Subscriber_Machine_Name*>**\repl_merge** in the **Process account** box, and supply the password for this account. Select **OK**, select **Next**, and then select **Next** again.  

   Selections for Merge Agent security

9. On the **Synchronization Schedule** page, set **Agent Schedule** to **Run on demand only**. Select **Next**.  

   "Run on demand only" selection for the agent
  
9. On the **Initialize Subscriptions** page, select **At first synchronization** from the **Initialize When** list. Select **Next** to proceed to the **Subscription Type** page, and select the appropriate subscription type. This tutorial uses **Client**. After you select the subscription type, select **Next** again. 

   Selections for initializing subscriptions at first synchronization

10. On the **HOST_NAME Values** page, enter a value of **adventure-works\pamela0** in the **HOST_NAME Value** box. Then select **Finish**.  

    "HOST_NAME Values" page
  
11. Select **Finish** again. After the subscription is created, select **Close**.  

### Set server permissions at the subscriber  
  
1. Connect to the subscriber in  SQL Server Management Studio 
. Expand **Security**, right-click **Logins**, and then select **New Login**.  
  
   On the **General** page, select **Search** and then enter <*Subscriber_ Machine_Name*>**\repl_merge** in the **Enter the Object Name** box. Select **Check Names**, and then select **OK**. 
    
   Selections for setting the login
  
1. On the **User Mapping** page, select the **SalesOrdersReplica** database and select the **db_owner** role. On the **Securables** page, grant the **Explicit** permission to **Alter Trace**. Select **OK**.

   "User Mapping" and "Securables" pages
  
### Create the filtered data snapshot for the subscription  
  
1. Connect to the publisher in  SQL Server Management Studio 
, expand the server node, and then expand the **Replication** folder.  
  
2. In the **Local Publications** folder, right-click the **AdvWorksSalesOrdersMerge** publication, and then select **Properties**.  
   
   a. Select the **Data Partitions** page, and select **Add**.   
   b. In the **Add Data Partition** dialog box, enter **adventure-works\pamela0** in the **HOST_NAME Value** box, and then select **OK**.  
   c. Select the newly added partition, select **Generate the selected snapshots now**, and then select **OK**. 

   Selections for adding a partition
  
  
For more information, see:  
- [Subscribe to publications](subscribe-to-publications.md)  
- [Create a pull subscription](create-a-pull-subscription.md)  
- [Snapshots for merge publications with parameterized filters](create-a-snapshot-for-a-merge-publication-with-parameterized-filters.md)  

## Synchronize the subscription to the merge publication

In this section, you start the Merge Agent to initialize the subscription by using  SQL Server Management Studio 
. You also use this procedure to synchronize with the publisher.   
  
### Start synchronization and initialize the subscription  
  
1. Connect to the subscriber in  SQL Server Management Studio 
.  
2. Make sure that the SQL Server Agent is running. If it's not, right-click the SQL Server Agent in Object Explorer and select **Start**. If this step fails to start your agent, you'll need to do so manually by using SQL Server Configuration Manager. 
  
2. Expand the **Replication** node. In the **Local Subscriptions** folder, right-click the subscription in the **SalesOrdersReplica** database, and then select **View Synchronization Status**.  
  
   Select **Start** to initialize the subscription. 

   Synchronization status with "Start" button
    
  
  
## Related content

- [Initialize a Subscription with a Snapshot for a New Publication](initialize-a-subscription-with-a-snapshot.md)
- [Synchronize Data](synchronize-data.md)
- [Synchronize a Pull Subscription](synchronize-a-pull-subscription.md)
