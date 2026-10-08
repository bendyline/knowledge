---
title: "Synchronize a Pull Subscription"
description: "Synchronize a Pull Subscription"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "pull subscriptions [SQL Server replication], synchronizing"
  - "synchronization [SQL Server replication], pull subscriptions"
  - "subscriptions [SQL Server replication], pull"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# Synchronize a Pull Subscription

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 




  This topic describes how to synchronize a pull subscription in  SQL Server 
 by using  SQL Server Management Studio 
, [replication agents](agents/replication-agents-overview.md), or Replication Management Objects (RMO).  
  
##  <a name="SSMSProcedure"></a> Using SQL Server Management Studio  
 Subscriptions are synchronized by the Distribution Agent (for snapshot and transactional replication) or the Merge Agent (for merge replication). Agents can run continuously, run on demand, or run on a schedule. For more information about specifying synchronization schedules, see [Specify Synchronization Schedules](specify-synchronization-schedules.md).  
  
 Synchronize a subscription on demand from the **Local Subscriptions** folder in  SQL Server Management Studio 
.  
  
#### To synchronize a pull subscription on demand in Management Studio  
  
1.  Connect to the Subscriber in  Management Studio
, and then expand the server node.  
  
2.  Expand the **Replication** folder, and then expand the **Local Subscriptions** folder.  
  
3.  Right-click the subscription you want to synchronize, and then click **View Synchronization Status**.  
  
4.  In the **View Synchronization Status - \<Subscriber>:\<SubscriptionDatabase>** dialog box, click **Start**. When synchronization is complete, the message **Synchronization completed** is displayed.  
  
5.  Click **Close**.  
  
##  <a name="ReplProg"></a> Replication Agents  
 Pull subscriptions can be synchronized programmatically and on-demand by invoking the appropriate replication agent executable file from the command prompt. The replication agent executable file that is invoked will depend on the type of publication to which the pull subscription belongs. For more information, see [Replication Agents](agents/replication-agents-overview.md).  
  
> **Note:**  
>  Replication agents connect to the local server using the Windows Authentication credentials of the user who started the agent from the command prompt. These Windows credentials are also used when connecting to remote servers using Windows Integrated Authentication.  
  
#### To start the distribution agent from the command prompt or from a batch file  
  
1.  From the command prompt or in a batch file, start the [Replication Distribution Agent](agents/replication-distribution-agent.md) by running **distrib.exe**, specifying the following command-line arguments:  
  
    -   **-Publisher**  
  
    -   **-PublisherDB**  
  
    -   **-Distributor**  
  
    -   **-DistributorSecurityMode** = **1**  
  
    -   **-Subscriber**  
  
    -   **-SubscriberDB**  
  
    -   **-SubscriberSecurityMode** = **1**  
  
    -   **-SubscriptionType** = **1**  
  
     If you are using  SQL Server 
 Authentication, you must also specify the following arguments:  
  
    -   **-DistributorLogin**  
  
    -   **-DistributorPassword**  
  
    -   **-DistributorSecurityMode** = **0**  
  
    -   **-PublisherLogin**  
  
    -   **-PublisherPassword**  
  
    -   **-PublisherSecurityMode** = **0**  
  
    -   **-SubscriberLogin**  
  
    -   **-SubscriberPassword**  
  
    -   **-SubscriberSecurityMode** = **0**  
  
#### To start the merge agent from the command prompt or from a batch file  
  
1.  From the command prompt or in a batch file, start the [Replication Merge Agent](agents/replication-merge-agent.md) by running **replmerg.exe**, specifying the following command-line arguments:  
  
    -   **-Publisher**  
  
    -   **-PublisherDB**  
  
    -   **-PublisherSecurityMode** = **1**  
  
    -   **-Publication**  
  
    -   **-Distributor**  
  
    -   **-DistributorSecurityMode** = **1**  
  
    -   **-Subscriber**  
  
    -   **-SubscriberSecurityMode** = **1**  
  
    -   **-SubscriberDB**  
  
    -   **-SubscriptionType** = **1**  
  
     If you are using  SQL Server 
 Authentication, you must also specify the following arguments:  
  
    -   **-DistributorLogin**  
  
    -   **-DistributorPassword**  
  
    -   **-DistributorSecurityMode** = **0**  
  
    -   **-PublisherLogin**  
  
    -   **-PublisherPassword**  
  
    -   **-PublisherSecurityMode** = **0**  
  
    -   **-SubscriberLogin**  
  
    -   **-SubscriberPassword**  
  
    -   **-SubscriberSecurityMode** = **0**  
  
###  <a name="TsqlExample"></a> Examples (Replication Agents)  
 The following example starts the Distribution Agent to synchronize a pull subscription. All connections are made using Windows Authentication.  
  
```  
 -- Declare the variables.  
SET Publisher=%instancename%  
SET Subscriber=%instancename%  
SET PublicationDB=AdventureWorks  
SET SubscriptionDB=AdventureWorksReplica   
SET Publication=AdvWorksProductsTran  
  
-- Start the Distribution Agent.  
-- The following command must be supplied without line breaks.  
"C:\Program Files\Microsoft SQL Server\100\COM\DISTRIB.EXE" -Subscriber %Subscriber%   
-SubscriberDB %SubscriptionDB% -SubscriberSecurityMode 1 -Publication %Publication%   
-Publisher %Publisher% -PublisherDB %PublicationDB% -Distributor %Publisher%   
-DistributorSecurityMode 1 -Continuous -SubscriptionType 1;  
```  
  
 The following example starts the Merge Agent to synchronize a pull subscription. All connections are made using Windows Authentication.  
  
```  
-- Declare the variables.  
SET Publisher=%instancename%  
SET Subscriber=%instancename%  
SET PublicationDB=AdventureWorks  
SET SubscriptionDB=AdventureWorksReplica   
SET Publication=AdvWorksSalesOrdersMerge  
  
--Start the Merge Agent with concurrent upload and download processes.  
-- The following command must be supplied without line breaks.  
"C:\Program Files\Microsoft SQL Server\100\COM\REPLMERG.EXE" -Publication %Publication%    
-Publisher %Publisher%  -Subscriber  %Subscriber%  -Distributor %Publisher%    
-PublisherDB %PublicationDB%  -SubscriberDB %SubscriptionDB% -PublisherSecurityMode 1    
-OutputVerboseLevel 2  -SubscriberSecurityMode 1  -SubscriptionType 1 -DistributorSecurityMode 1    
-Validate 3  -ParallelUploadDownload 1 ;  
```  
  
##  <a name="RMOProcedure"></a> Using Replication Management Objects (RMO)  
 You can synchronize pull subscriptions programmatically by using Replication Management Objects (RMO) and managed code access to replication agent functionalities. The classes you use to synchronize a pull subscription depend on the type of publication to which the subscription belongs.  
  
> **Note:**
>  If you want to start a synchronization that runs autonomously without affecting your application, start the agent asynchronously. However, if you want to monitor the outcome of the synchronization and receive callbacks from the agent during the synchronization process (for example, to display a progress bar), you should start the agent synchronously. For  Microsoft 
  SQL Server 2005 Express edition 
 Subscribers, you must start the agent synchronously.  
  
#### To synchronize a pull subscription to a snapshot or transactional publication  
  
1.  Create a connection to the Subscriber by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.TransPullSubscription](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransPullSubscription) class, and set the following properties:  
  
    -   The subscription database name for [Microsoft.SqlServer.Replication.PullSubscription.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.DatabaseName%252A).  
  
    -   The name of the publication to which the subscription belongs for [Microsoft.SqlServer.Replication.PullSubscription.PublicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.PublicationName%252A).  
  
    -   The name of the publication database for [Microsoft.SqlServer.Replication.PullSubscription.PublicationDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.PublicationDBName%252A).  
  
    -   The name of the Publisher for [Microsoft.SqlServer.Replication.PullSubscription.PublisherName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.PublisherName%252A).  
  
    -   The connection created in step 1 for [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A).  
  
3.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the remaining subscription properties. If this method returns **false**, verify that the subscription exists.  
  
4.  Start the Distribution Agent at the Subscriber in one of the following ways:  
  
    -   Call the [Microsoft.SqlServer.Replication.TransPullSubscription.SynchronizeWithJob%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransPullSubscription.SynchronizeWithJob%252A) method on the instance of [Microsoft.SqlServer.Replication.TransPullSubscription](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransPullSubscription) from step 2. This method starts the Distribution Agent asynchronously, and control immediately returns to your application while the agent job is running. You cannot call this method for  SQL Server 2005 Express edition 
 Subscribers or if the subscription was created with a value of **false** for [Microsoft.SqlServer.Replication.PullSubscription.CreateSyncAgentByDefault%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.CreateSyncAgentByDefault%252A) (the default).  
  
    -   Get an instance of the [Microsoft.SqlServer.Replication.TransSynchronizationAgent](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransSynchronizationAgent) class from the [Microsoft.SqlServer.Replication.TransPullSubscription.SynchronizationAgent%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransPullSubscription.SynchronizationAgent%252A) property, and call the [Microsoft.SqlServer.Replication.TransSynchronizationAgent.Synchronize%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransSynchronizationAgent.Synchronize%252A) method. This method starts the agent synchronously, and control remains with the running agent job. During synchronous execution, you can handle the [Microsoft.SqlServer.Replication.TransSynchronizationAgent.Status](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransSynchronizationAgent.Status) event while the agent is running.  
  
        > **Note:**  
        >  If you specified a value of **false** for [Microsoft.SqlServer.Replication.PullSubscription.CreateSyncAgentByDefault%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.CreateSyncAgentByDefault%252A) (the default) when you created the pull subscription, you also need to specify [Microsoft.SqlServer.Replication.TransSynchronizationAgent.Distributor%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransSynchronizationAgent.Distributor%252A), [Microsoft.SqlServer.Replication.TransSynchronizationAgent.DistributorSecurityMode%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransSynchronizationAgent.DistributorSecurityMode%252A), and optionally [Microsoft.SqlServer.Replication.TransSynchronizationAgent.DistributorLogin%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransSynchronizationAgent.DistributorLogin%252A) and [Microsoft.SqlServer.Replication.TransSynchronizationAgent.DistributorPassword%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.TransSynchronizationAgent.DistributorPassword%252A) because the agent job related metadata for the subscription is not available in [MSsubscription_properties](../system-tables/mssubscription-properties-transact-sql.md).  
  
#### To synchronize a pull subscription to a merge publication  
  
1.  Create a connection to the Subscriber by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class.  
  
2.  Create an instance of the [Microsoft.SqlServer.Replication.MergePullSubscription](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePullSubscription) class, and set the following properties:  
  
    -   The subscription database name for [Microsoft.SqlServer.Replication.PullSubscription.DatabaseName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.DatabaseName%252A).  
  
    -   The name of the publication to which the subscription belongs for [Microsoft.SqlServer.Replication.PullSubscription.PublicationName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.PublicationName%252A).  
  
    -   The name of the published database for [Microsoft.SqlServer.Replication.PullSubscription.PublicationDBName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.PublicationDBName%252A).  
  
    -   The name of the Publisher for [Microsoft.SqlServer.Replication.PullSubscription.PublisherName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.PublisherName%252A).  
  
    -   The connection created in step 1 for [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A).  
  
3.  Call the [Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties%252A) method to get the remaining subscription properties. If this method returns **false**, verify that the subscription exists.  
  
4.  Start the Merge Agent at the Subscriber in one of the following ways:  
  
    -   Call the [Microsoft.SqlServer.Replication.MergePullSubscription.SynchronizeWithJob%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePullSubscription.SynchronizeWithJob%252A) method on the instance of [Microsoft.SqlServer.Replication.MergePullSubscription](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePullSubscription) from step 2. This method starts the Merge Agent asynchronously, and control immediately returns to your application while the agent job is running. You cannot call this method for  SQL Server 2005 Express edition 
 Subscribers or if the subscription was created with a value of **false** for [Microsoft.SqlServer.Replication.PullSubscription.CreateSyncAgentByDefault%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.CreateSyncAgentByDefault%252A) (the default).  
  
    -   Obtain an instance of the [Microsoft.SqlServer.Replication.MergeSynchronizationAgent](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSynchronizationAgent) class from the [Microsoft.SqlServer.Replication.MergePullSubscription.SynchronizationAgent%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergePullSubscription.SynchronizationAgent%252A) property, and call the [Microsoft.SqlServer.Replication.MergeSynchronizationAgent.Synchronize%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSynchronizationAgent.Synchronize%252A) method. This method starts the Merge Agent synchronously, and control remains with the running agent job. During synchronous execution, you can handle the [Microsoft.SqlServer.Replication.MergeSynchronizationAgent.Status](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSynchronizationAgent.Status) event while the agent is running.  
  
        > **Note:**  
        >  If you specified a value of **false** for [Microsoft.SqlServer.Replication.PullSubscription.CreateSyncAgentByDefault%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.PullSubscription.CreateSyncAgentByDefault%252A) (the default) when you created the pull subscription, you also need to specify [Microsoft.SqlServer.Replication.MergeSynchronizationAgent.Distributor%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSynchronizationAgent.Distributor%252A), [Microsoft.SqlServer.Replication.MergeSynchronizationAgent.DistributorSecurityMode%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSynchronizationAgent.DistributorSecurityMode%252A), [Microsoft.SqlServer.Replication.MergeSynchronizationAgent.PublisherSecurityMode%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSynchronizationAgent.PublisherSecurityMode%252A), [Microsoft.SqlServer.Replication.MergeSynchronizationAgent.HostName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSynchronizationAgent.HostName%252A), [Microsoft.SqlServer.Replication.MergeSynchronizationAgent.SubscriptionType%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSynchronizationAgent.SubscriptionType%252A), [Microsoft.SqlServer.Replication.MergeSynchronizationAgent.ExchangeType%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSynchronizationAgent.ExchangeType%252A), and optionally [Microsoft.SqlServer.Replication.MergeSynchronizationAgent.DistributorLogin%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSynchronizationAgent.DistributorLogin%252A), [Microsoft.SqlServer.Replication.MergeSynchronizationAgent.DistributorPassword%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSynchronizationAgent.DistributorPassword%252A), [Microsoft.SqlServer.Replication.MergeSynchronizationAgent.PublisherLogin%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSynchronizationAgent.PublisherLogin%252A), and [Microsoft.SqlServer.Replication.MergeSynchronizationAgent.PublisherPassword%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.MergeSynchronizationAgent.PublisherPassword%252A) because the agent job related metadata for the subscription is not available in [MSsubscription_properties](../system-tables/mssubscription-properties-transact-sql.md).  
  
###  <a name="PShellExample"></a> Examples (RMO)  
 This example synchronizes a pull subscription to a transactional publication, where the agent is started asynchronously using the agent job.  
  
```csharp  
// Define server, publication, and database names.  
String subscriberName = subscriberInstance;  
String publisherName = publisherInstance;  
String publicationName = "AdvWorksProductTran";  
String publicationDbName = "AdventureWorks";  
String subscriptionDbName = "AdventureWorksReplica";  
  
// Create a connection to the Subscriber.  
ServerConnection conn = new ServerConnection(subscriberName);  
  
TransPullSubscription subscription;  
  
try  
{  
    // Connect to the Subscriber.  
    conn.Connect();  
  
    // Define subscription properties.  
    subscription = new TransPullSubscription();  
    subscription.ConnectionContext = conn;  
    subscription.DatabaseName = subscriptionDbName;  
    subscription.PublisherName = publisherName;  
    subscription.PublicationDBName = publicationDbName;  
    subscription.PublicationName = publicationName;  
  
    // If the pull subscription and the job exists, start the agent job.  
    if (subscription.LoadProperties() && subscription.AgentJobId != null)  
    {  
        subscription.SynchronizeWithJob();  
    }  
    else  
    {  
        // Do something here if the subscription does not exist.  
        throw new ApplicationException(String.Format(  
            "A subscription to '{0}' does not exists on {1}",  
            publicationName, subscriberName));  
    }  
}  
catch (Exception ex)  
{  
    // Do appropriate error handling here.  
    throw new ApplicationException("The subscription could not be synchronized.", ex);  
}  
finally  
{  
    conn.Disconnect();  
}  
```  
  
```vb  
' Define server, publication, and database names.  
Dim subscriberName As String = subscriberInstance  
Dim publisherName As String = publisherInstance  
Dim publicationName As String = "AdvWorksProductTran"  
Dim publicationDbName As String = "AdventureWorks"  
Dim subscriptionDbName As String = "AdventureWorksReplica"  
  
' Create a connection to the Subscriber.  
Dim conn As ServerConnection = New ServerConnection(subscriberName)  
  
Dim subscription As TransPullSubscription  
  
Try  
    ' Connect to the Subscriber.  
    conn.Connect()  
  
    ' Define subscription properties.  
    subscription = New TransPullSubscription()  
    subscription.ConnectionContext = conn  
    subscription.DatabaseName = subscriptionDbName  
    subscription.PublisherName = publisherName  
    subscription.PublicationDBName = publicationDbName  
    subscription.PublicationName = publicationName  
  
    ' If the pull subscription and the job exists, start the agent job.  
    If subscription.LoadProperties() And Not subscription.AgentJobId Is Nothing Then  
        subscription.SynchronizeWithJob()  
    Else  
        ' Do something here if the subscription does not exist.  
        Throw New ApplicationException(String.Format( _  
         "A subscription to '{0}' does not exists on {1}", _  
         publicationName, subscriberName))  
    End If  
Catch ex As Exception  
    ' Do appropriate error handling here.  
    Throw New ApplicationException("The subscription could not be synchronized.", ex)  
Finally  
    conn.Disconnect()  
End Try  
```  
  
 This example synchronizes a pull subscription to a transactional publication, where the agent is started synchronously.  
  
```csharp  
// Define the server, publication, and database names.  
string subscriberName = subscriberInstance;  
string publisherName = publisherInstance;  
string publicationName = "AdvWorksProductTran";  
string subscriptionDbName = "AdventureWorksReplica";  
string publicationDbName = "AdventureWorks";  
  
// Create a connection to the Subscriber.  
ServerConnection conn = new ServerConnection(subscriberName);  
  
TransPullSubscription subscription;  
  
try  
{  
    // Connect to the Subscriber.  
    conn.Connect();  
  
    // Define the pull subscription.  
    subscription = new TransPullSubscription();  
    subscription.ConnectionContext = conn;  
    subscription.DatabaseName = subscriptionDbName;  
    subscription.PublisherName = publisherName;  
    subscription.PublicationDBName = publicationDbName;  
    subscription.PublicationName = publicationName;  
  
    // If the pull subscription exists, then start the synchronization.  
    if (subscription.LoadProperties())  
    {  
        // Check that we have enough metadata to start the agent.  
        if (subscription.PublisherSecurity != null)  
        {  
            // Synchronously start the Distribution Agent for the subscription.  
            subscription.SynchronizationAgent.Synchronize();  
        }  
        else  
        {  
            throw new ApplicationException("There is insufficient metadata to " +  
                "synchronize the subscription. Recreate the subscription with " +  
                "the agent job or supply the required agent properties at run time.");  
        }  
    }  
    else  
    {  
        // Do something here if the pull subscription does not exist.  
        throw new ApplicationException(String.Format(  
            "A subscription to '{0}' does not exist on {1}",  
            publicationName, subscriberName));  
    }  
}  
catch (Exception ex)  
{  
    // Implement appropriate error handling here.  
    throw new ApplicationException("The subscription could not be " +  
        "synchronized. Verify that the subscription has " +  
        "been defined correctly.", ex);  
}  
finally  
{  
    conn.Disconnect();  
}  
```  
  
```vb  
' Define the server, publication, and database names.  
Dim subscriberName As String = subscriberInstance  
Dim publisherName As String = publisherInstance  
Dim publicationName As String = "AdvWorksProductTran"  
Dim subscriptionDbName As String = "AdventureWorksReplica"  
Dim publicationDbName As String = "AdventureWorks"  
  
' Create a connection to the Subscriber.  
Dim conn As ServerConnection = New ServerConnection(subscriberName)  
  
Dim subscription As TransPullSubscription  
  
Try  
    ' Connect to the Subscriber.  
    conn.Connect()  
  
    ' Define the pull subscription.  
    subscription = New TransPullSubscription()  
    subscription.ConnectionContext = conn  
    subscription.DatabaseName = subscriptionDbName  
    subscription.PublisherName = publisherName  
    subscription.PublicationDBName = publicationDbName  
    subscription.PublicationName = publicationName  
  
    ' If the pull subscription exists, then start the synchronization.  
    If subscription.LoadProperties() Then  
        ' Check that we have enough metadata to start the agent.  
        If Not subscription.PublisherSecurity Is Nothing Then  
  
            ' Write agent output to a log file.  
            subscription.SynchronizationAgent.Output = "distagent.log"  
            subscription.SynchronizationAgent.OutputVerboseLevel = 2  
  
            ' Synchronously start the Distribution Agent for the subscription.  
            subscription.SynchronizationAgent.Synchronize()  
        Else  
            Throw New ApplicationException("There is insufficient metadata to " + _  
             "synchronize the subscription. Recreate the subscription with " + _  
             "the agent job or supply the required agent properties at run time.")  
        End If  
    Else  
        ' Do something here if the pull subscription does not exist.  
        Throw New ApplicationException(String.Format( _  
         "A subscription to '{0}' does not exist on {1}", _  
         publicationName, subscriberName))  
    End If  
Catch ex As Exception  
    ' Implement appropriate error handling here.  
    Throw New ApplicationException("The subscription could not be " + _  
     "synchronized. Verify that the subscription has " + _  
     "been defined correctly.", ex)  
Finally  
    conn.Disconnect()  
End Try  
```  
  
 This example synchronizes a pull subscription to a merge publication, where the agent is started asynchronously using the agent job.  
  
```csharp  
// Define server, publication, and database names.  
String subscriberName = subscriberInstance;  
String publisherName = publisherInstance;  
String publicationName = "AdvWorksSalesOrdersMerge";  
String publicationDbName = "AdventureWorks";  
String subscriptionDbName = "AdventureWorksReplica";  
  
// Create a connection to the Subscriber.  
ServerConnection conn = new ServerConnection(subscriberName);  
  
MergePullSubscription subscription;  
  
try  
{  
    // Connect to the Subscriber.  
    conn.Connect();  
  
    // Define subscription properties.  
    subscription = new MergePullSubscription();  
    subscription.ConnectionContext = conn;  
    subscription.DatabaseName = subscriptionDbName;  
    subscription.PublisherName = publisherName;  
    subscription.PublicationDBName = publicationDbName;  
    subscription.PublicationName = publicationName;  
  
    // If the pull subscription and the job exists, start the agent job.  
    if (subscription.LoadProperties() && subscription.AgentJobId != null)  
    {  
        subscription.SynchronizeWithJob();  
    }  
    else  
    {  
        // Do something here if the subscription does not exist.  
        throw new ApplicationException(String.Format(  
            "A subscription to '{0}' does not exists on {1}",  
            publicationName, subscriberName));  
    }  
}  
catch (Exception ex)  
{  
    // Do appropriate error handling here.  
    throw new ApplicationException("The subscription could not be synchronized.", ex);  
}  
finally  
{  
    conn.Disconnect();  
}  
```  
  
```vb  
' Define server, publication, and database names.  
Dim subscriberName As String = subscriberInstance  
Dim publisherName As String = publisherInstance  
Dim publicationName As String = "AdvWorksSalesOrdersMerge"  
Dim publicationDbName As String = "AdventureWorks"  
Dim subscriptionDbName As String = "AdventureWorksReplica"  
  
' Create a connection to the Subscriber.  
Dim conn As ServerConnection = New ServerConnection(subscriberName)  
  
Dim subscription As MergePullSubscription  
  
Try  
    ' Connect to the Subscriber.  
    conn.Connect()  
  
    ' Define subscription properties.  
    subscription = New MergePullSubscription()  
    subscription.ConnectionContext = conn  
    subscription.DatabaseName = subscriptionDbName  
    subscription.PublisherName = publisherName  
    subscription.PublicationDBName = publicationDbName  
    subscription.PublicationName = publicationName  
  
    ' If the pull subscription and the job exists, start the agent job.  
    If subscription.LoadProperties() And Not subscription.AgentJobId Is Nothing Then  
        subscription.SynchronizeWithJob()  
    Else  
        ' Do something here if the subscription does not exist.  
        Throw New ApplicationException(String.Format( _  
         "A subscription to '{0}' does not exists on {1}", _  
         publicationName, subscriberName))  
    End If  
Catch ex As Exception  
    ' Do appropriate error handling here.  
    Throw New ApplicationException("The subscription could not be synchronized.", ex)  
Finally  
    conn.Disconnect()  
End Try  
```  
  
 This example synchronizes a pull subscription to a merge publication, where the agent is started synchronously.  
  
```csharp  
// Define the server, publication, and database names.  
string subscriberName = subscriberInstance;  
string publisherName = publisherInstance;  
string publicationName = "AdvWorksSalesOrdersMerge";  
string subscriptionDbName = "AdventureWorksReplica";  
string publicationDbName = "AdventureWorks";  
  
// Create a connection to the Subscriber.  
ServerConnection conn = new ServerConnection(subscriberName);  
  
MergePullSubscription subscription;  
  
try  
{  
    // Connect to the Subscriber.  
    conn.Connect();  
  
    // Define the pull subscription.  
    subscription = new MergePullSubscription();  
    subscription.ConnectionContext = conn;  
    subscription.DatabaseName = subscriptionDbName;  
    subscription.PublisherName = publisherName;  
    subscription.PublicationDBName = publicationDbName;  
    subscription.PublicationName = publicationName;  
  
    // If the pull subscription exists, then start the synchronization.  
    if (subscription.LoadProperties())  
    {  
        // Check that we have enough metadata to start the agent.  
        if (subscription.PublisherSecurity != null || subscription.DistributorSecurity != null)  
        {  
            // Synchronously start the Merge Agent for the subscription.  
            subscription.SynchronizationAgent.Synchronize();  
        }  
        else  
        {  
            throw new ApplicationException("There is insufficient metadata to " +  
                "synchronize the subscription. Recreate the subscription with " +  
                "the agent job or supply the required agent properties at run time.");  
        }  
    }  
    else  
    {  
        // Do something here if the pull subscription does not exist.  
        throw new ApplicationException(String.Format(  
            "A subscription to '{0}' does not exist on {1}",  
            publicationName, subscriberName));  
    }  
}  
catch (Exception ex)  
{  
    // Implement appropriate error handling here.  
    throw new ApplicationException("The subscription could not be " +  
        "synchronized. Verify that the subscription has " +  
        "been defined correctly.", ex);  
}  
finally  
{  
    conn.Disconnect();  
}  
```  
  
```vb  
' Define the server, publication, and database names.  
Dim subscriberName As String = subscriberInstance  
Dim publisherName As String = publisherInstance  
Dim publicationName As String = "AdvWorksSalesOrdersMerge"  
Dim subscriptionDbName As String = "AdventureWorksReplica"  
Dim publicationDbName As String = "AdventureWorks"  
  
' Create a connection to the Subscriber.  
Dim conn As ServerConnection = New ServerConnection(subscriberName)  
  
Dim subscription As MergePullSubscription  
  
Try  
    ' Connect to the Subscriber.  
    conn.Connect()  
  
    ' Define the pull subscription.  
    subscription = New MergePullSubscription()  
    subscription.ConnectionContext = conn  
    subscription.DatabaseName = subscriptionDbName  
    subscription.PublisherName = publisherName  
    subscription.PublicationDBName = publicationDbName  
    subscription.PublicationName = publicationName  
  
    ' If the pull subscription exists, then start the synchronization.  
    If subscription.LoadProperties() Then  
        ' Check that we have enough metadata to start the agent.  
        If Not subscription.PublisherSecurity Is Nothing Or subscription.DistributorSecurity Is Nothing Then  
  
            ' Output agent messages to the console.   
            subscription.SynchronizationAgent.OutputVerboseLevel = 1  
            subscription.SynchronizationAgent.Output = ""  
  
            ' Synchronously start the Merge Agent for the subscription.  
            subscription.SynchronizationAgent.Synchronize()  
        Else  
            Throw New ApplicationException("There is insufficient metadata to " + _  
             "synchronize the subscription. Recreate the subscription with " + _  
             "the agent job or supply the required agent properties at run time.")  
        End If  
    Else  
        ' Do something here if the pull subscription does not exist.  
        Throw New ApplicationException(String.Format( _  
         "A subscription to '{0}' does not exist on {1}", _  
         publicationName, subscriberName))  
    End If  
Catch ex As Exception  
    ' Implement appropriate error handling here.  
    Throw New ApplicationException("The subscription could not be " + _  
     "synchronized. Verify that the subscription has " + _  
     "been defined correctly.", ex)  
Finally  
    conn.Disconnect()  
End Try  
```  
  
 This example synchronizes a pull subscription to a merge publication using Web synchronization. The subscription was created without the agent job and related subscription metadata, so the agent must be started synchronously and additional subscription information is supplied.  
  
```csharp  
// Define the server, publication, and database names.  
string subscriberName = subscriberInstance;  
string publisherName = publisherInstance;  
string distributorName = distributorInstance;  
string publicationName = "AdvWorksSalesOrdersMerge";  
string subscriptionDbName = "AdventureWorksReplica";  
string publicationDbName = "AdventureWorks";  
string hostname = @"adventure-works\garrett1";  
string webSyncUrl = "https://" + publisherInstance + "/SalesOrders/replisapi.dll";  
  
// Create a connection to the Subscriber.  
ServerConnection conn = new ServerConnection(subscriberName);  
  
MergePullSubscription subscription;  
MergeSynchronizationAgent agent;  
  
try  
{  
    // Connect to the Subscriber.  
    conn.Connect();  
  
    // Define the pull subscription.  
    subscription = new MergePullSubscription();  
    subscription.ConnectionContext = conn;  
    subscription.DatabaseName = subscriptionDbName;  
    subscription.PublisherName = publisherName;  
    subscription.PublicationDBName = publicationDbName;  
    subscription.PublicationName = publicationName;  
  
    // If the pull subscription exists, then start the synchronization.  
    if (subscription.LoadProperties())  
    {  
        // Get the agent for the subscription.  
        agent = subscription.SynchronizationAgent;  
  
        // Check that we have enough metadata to start the agent.  
        if (agent.PublisherSecurityMode == null)  
        {  
            // Set the required properties that could not be returned  
            // from the MSsubscription_properties table.   
            agent.PublisherSecurityMode = SecurityMode.Integrated;  
            agent.DistributorSecurityMode = SecurityMode.Integrated;  
            agent.Distributor = publisherName;  
            agent.HostName = hostname;  
  
            // Set optional Web synchronization properties.  
            agent.UseWebSynchronization = true;  
            agent.InternetUrl = webSyncUrl;  
            agent.InternetSecurityMode = SecurityMode.Standard;  
            agent.InternetLogin = winLogin;  
            agent.InternetPassword = winPassword;  
        }  
        // Enable agent output to the console.  
        agent.OutputVerboseLevel = 1;  
        agent.Output = "";  
  
        // Synchronously start the Merge Agent for the subscription.  
        agent.Synchronize();  
    }  
    else  
    {  
        // Do something here if the pull subscription does not exist.  
        throw new ApplicationException(String.Format(  
            "A subscription to '{0}' does not exist on {1}",  
            publicationName, subscriberName));  
    }  
}  
catch (Exception ex)  
{  
    // Implement appropriate error handling here.  
    throw new ApplicationException("The subscription could not be " +  
        "synchronized. Verify that the subscription has " +  
        "been defined correctly.", ex);  
}  
finally  
{  
    conn.Disconnect();  
}  
```  
  
```vb  
' Define the server, publication, and database names.  
Dim subscriberName As String = subscriberInstance  
Dim publisherName As String = publisherInstance  
Dim publicationName As String = "AdvWorksSalesOrdersMerge"  
Dim subscriptionDbName As String = "AdventureWorksReplica"  
Dim publicationDbName As String = "AdventureWorks"  
Dim hostname As String = "adventure-works\garrett1"  
Dim webSyncUrl As String = "https://" + publisherInstance + "/SalesOrders/replisapi.dll"  
  
' Create a connection to the Subscriber.  
Dim conn As ServerConnection = New ServerConnection(subscriberName)  
  
Dim subscription As MergePullSubscription  
Dim agent As MergeSynchronizationAgent  
  
Try  
    ' Connect to the Subscriber.  
    conn.Connect()  
  
    ' Define the pull subscription.  
    subscription = New MergePullSubscription()  
    subscription.ConnectionContext = conn  
    subscription.DatabaseName = subscriptionDbName  
    subscription.PublisherName = publisherName  
    subscription.PublicationDBName = publicationDbName  
    subscription.PublicationName = publicationName  
  
    ' If the pull subscription exists, then start the synchronization.  
    If subscription.LoadProperties() Then  
        ' Get the agent for the subscription.  
        agent = subscription.SynchronizationAgent  
  
        ' Check that we have enough metadata to start the agent.  
        If agent.PublisherSecurityMode = Nothing Then  
            ' Set the required properties that could not be returned  
            ' from the MSsubscription_properties table.   
            agent.PublisherSecurityMode = SecurityMode.Integrated  
            agent.Distributor = publisherInstance  
            agent.DistributorSecurityMode = SecurityMode.Integrated  
            agent.HostName = hostname  
  
            ' Set optional Web synchronization properties.  
            agent.UseWebSynchronization = True  
            agent.InternetUrl = webSyncUrl  
            agent.InternetSecurityMode = SecurityMode.Standard  
            agent.InternetLogin = winLogin  
            agent.InternetPassword = winPassword  
        End If  
  
        ' Enable agent logging to the console.  
        agent.OutputVerboseLevel = 1  
        agent.Output = ""  
  
        ' Synchronously start the Merge Agent for the subscription.  
        agent.Synchronize()  
    Else  
        ' Do something here if the pull subscription does not exist.  
        Throw New ApplicationException(String.Format( _  
         "A subscription to '{0}' does not exist on {1}", _  
         publicationName, subscriberName))  
    End If  
Catch ex As Exception  
    ' Implement appropriate error handling here.  
    Throw New ApplicationException("The subscription could not be " + _  
     "synchronized. Verify that the subscription has " + _  
     "been defined correctly.", ex)  
Finally  
    conn.Disconnect()  
End Try  
```  
  
## Related content

- [Synchronize Data](synchronize-data.md)
- [Create a Pull Subscription](create-a-pull-subscription.md)
- [Replication Security Best Practices](security/replication-security-best-practices.md)
