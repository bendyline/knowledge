---
title: "Replication Management Objects Concepts"
description: "Replication Management Objects Concepts"
author: "MashaMSFT"
ms.author: "mathoma"
ms.date: 09/25/2024
ms.service: sql
ms.subservice: replication
ms.topic: "reference"
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "replication [SQL Server], RMO"
  - "programming interfaces [SQL Server replication]"
  - "replication [SQL Server], how-to topics"
  - "RMO [SQL Server]"
  - "Replication Management Objects"
  - "programming [SQL Server replication], RMO"
dev_langs:
  - "VB"
  - "CSharp"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# Replication Management Objects Concepts

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  Replication Management Objects (RMO) is a managed code assembly that encapsulates replication functionalities for  SQL Server 
. RMO is implemented by the [Microsoft.SqlServer.Replication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication) namespace.  
  
 The topics in the following sections describe how you can use RMO to programmatically control replication tasks:  
  
 [Configure Distribution](../configure-distribution.md)  
 Topics in this section show how to use RMO to configure publishing and distribution.  
  
 [Create a Publication](../publish/create-a-publication.md)  
 Topics in this section show how to use RMO to create, delete, and modify publications and articles.  
  
 [Subscribe to Publications](../subscribe-to-publications.md)  
 Topics in this section show how to use RMO to create, delete, and modify subscriptions.  
  
 [Secure a Replication Topology](../security/view-and-modify-replication-security-settings.md)  
 Topics in this section show how to use RMO to view and modify security settings.  
  
 [Synchronize Subscriptions (Replication)](../synchronize-data.md)  
 Topics in this section show how to synchronize subscriptions.  
  
 [Monitoring Replication](../monitor/monitoring-replication.md)  
 Topics in this section show how to programmatically monitor a replication topology.  
  
## Introduction to RMO Programming  
 RMO is designed for programming all aspects of  SQL Server 
 replication. The RMO namespace is [Microsoft.SqlServer.Replication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication), and it is implemented by the Microsoft.SqlServer.Rmo.dll, which is a  Microsoft 
 .NET Framework assembly. The Microsoft.SqlServer.Replication.dll assembly, which also belongs to the [Microsoft.SqlServer.Replication](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication) namespace, implements a managed code interface for programming the various replication agents (Snapshot Agent, Distribution Agent, and Merge Agent). Its classes can be accessed from RMO to synchronize subscriptions. Classes in the [Microsoft.SqlServer.Replication.BusinessLogicSupport](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.BusinessLogicSupport) namespace, implemented by the Microsoft.SqlServer.Replication.BusinessLogicSupport.dll assembly, are used to create custom business logic for merge replication. This assembly is independent from RMO.  
  
## Deploying Applications Based on RMO  
 RMO depends on the replication components and client connectivity components that are included with all versions of  SQL Server 
 except SQL Server Compact. To deploy an application based on RMO, you must install a version of  SQL Server 
 that includes replication components and client connectivity components on the computer on which the application will run.  
  
## Getting Started with RMO  
 This section describes how to start a simple RMO project using  Microsoft 
 Visual Studio.  
  
#### To create a new Microsoft Visual C# project  
  
1.  Start Visual Studio.  
  
2.  On the **File** menu, click **NewProject.** The **New Project** dialog box appears.  
  
3.  In the **Project Types** dialog box, select **Visual C# Projects**. In the **Templates** pane, select **Windows Application**.  
  
4.  (Optional) In **Name**, type the name of the new application.  
  
5.  Click **OK** to load the Visual C# Windows template.  
  
6.  On the **Project** menu, select **Add Reference** item. The **Add Reference** dialog box appears.  
  
7.  Select the following assemblies from the list on the **.NET** tab, and then click **OK**.  
  
    -   Microsoft.SqlServer.Replication .NET Programming Interface  
  
    -   Microsoft.SqlServer.ConnectionInfo  
  
    -   Replication Agent Library  
  
    > **Note:**  
    >  Use the CTRL key to select more than one file.  
  
8.  (Optional) Repeat step 6. Click the **Browse** tab, navigate to \<*drive*>:\Program Files\Microsoft SQL Server\\*nnn*\\
COM, select Microsoft.SqlServer.Replication.BusinessLogicSupport.dll, and then click **OK**.  
  
9. On the **View** menu, click **Code**.  
  
10. In the code, before the namespace statement, type the following **using** statements to qualify the types in the RMO namespaces:  

    ```  
    // These namespaces are required.  
    using Microsoft.SqlServer.Replication;  
    using Microsoft.SqlServer.Management.Common;  
    // This namespace is only used when creating custom business  
    // logic for merge replication.  
    using Microsoft.SqlServer.Replication.BusinessLogicSupport;   
    ```  
  
#### To create a new Microsoft Visual Basic .NET project  
  
1.  Start Visual Studio.  
  
2.  On the **File** menu, select **New Project**. The **New Project** dialog box appears.  
  
3.  In the Project Types pane, select **Visual Basic**. In the Templates pane, select **Windows Application**.  
  
4.  (Optional) In the **Name** box, type the name of the new application.  
  
5.  Click **OK** to load the Visual Basic Windows template.  
  
6.  On the **Project** menu, select **Add Reference**. The **Add Reference** dialog box appears.  
  
7.  Select the following assemblies from the list on the **.NET** tab, and then click **OK**.  
  
    -   Microsoft.SqlServer.Replication .NET Programming Interface  
  
    -   Microsoft.SqlServer.ConnectionInfo  
  
    -   Replication Agent Library  
  
    > **Note:**  
    >  Use the CTRL key to select more than one file.  
  
8.  (Optional) Repeat step 6. Click the **Browse** tab, navigate to \<*drive*>:\Program Files\Microsoft SQL Server\\*nnn*\\
COM, select Microsoft.SqlServer.Replication.BusinessLogicSupport.dll, and then click **OK**.  
  
9. On the **View** menu, click **Code**.  
  
10. In the code, before any declarations, type the following **Imports** statements to qualify the types in the RMO namespaces.  
  
    ```  
    ' These namespaces are required.  
    Imports Microsoft.SqlServer.Replication  
    Imports Microsoft.SqlServer.Management.Common  
    ' This namespace is only used when creating custom business  
    ' logic for merge replication.  
    Imports Microsoft.SqlServer.Replication.BusinessLogicSupport   
    ```  
  
## Connecting to a Replication Server  
 RMO programming objects require that a connection to an instance of  SQL Server 
 is made by using an instance of the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class. This connection to the server is made independently of any RMO programming objects. It is then passed to the RMO object either during instance creation or by assignment to the `P:Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext` property of the object. In this manner, an RMO programming object and the connection object instances can be created and managed separately, and a single connection object can be reused with multiple RMO programming objects. The following rules apply for connections to a replication server:  
  
-   All properties for the connection are defined for a given [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object.  
  
-   A connection to each instance of  SQL Server 
 must have its own [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object.  
  
-   The [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object is assigned to the `P:Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext` property of the RMO programming object being created or accessed on the server.  
  
-   The [Microsoft.SqlServer.Management.Common.ConnectionManager.Connect%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ConnectionManager.Connect%252A) method opens the connection to the server. This method must be called before calling any methods that access the server on any RMO programming objects using the connection.  
  
-   Because RMO and  SQL Server 
 Management Objects (SMO) both use the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class for connections to  SQL Server 
, the same connection can be used by both RMO and SMO objects. For more information, see [Connecting to an Instance of SQL Server](../../server-management-objects-smo/create-program/connecting-to-an-instance-of-sql-server.md).  
  
-   All authentication information to make the connection and successfully log on to the server is supplied in the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object.  
  
-   Windows Authentication is the default. To use  SQL Server 
 Authentication, [Microsoft.SqlServer.Management.Common.ConnectionSettings.LoginSecure%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ConnectionSettings.LoginSecure%252A) must be set to **false** and [Microsoft.SqlServer.Management.Common.ConnectionSettings.Login%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ConnectionSettings.Login%252A) and [Microsoft.SqlServer.Management.Common.ConnectionSettings.Password%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ConnectionSettings.Password%252A) must be set to a valid  SQL Server 
 logon and password. Security credentials must always be stored and handled securely, and supplied at run-time whenever possible.  
  
-   For multithreaded applications, a separate [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object should be used in each thread.  
  
 Call the [Microsoft.SqlServer.Management.Common.ConnectionManager.Disconnect%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ConnectionManager.Disconnect%252A) method on the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object to close active server connections used by RMO objects.  
  
## Setting RMO Properties  
 The properties of RMO programming objects represent the properties of these replication objects at the server. When creating new replication objects at the server, RMO properties are used to define these objects. For existing objects, the RMO properties represent the existing object's properties, which can be modified only for properties that are writable or settable. Properties can be set on new objects or existing objects.  
  
### Setting Properties for New Replication Objects  
 When creating a new replication object at the server, you must specify all required properties before calling the **Create** method of the object. For more information about setting properties for a new replication object, see [Configure Publishing and Distribution](../configure-publishing-and-distribution.md).  
  
### Setting Properties for Existing Replication Objects  
 For replication objects that exist at the server, depending on the object, RMO might support the ability to change some or all of its properties. Only writable or settable properties can be changed. Before properties can be changed, either the **Load** or the `M:Microsoft.SqlServer.Replication.ReplicationObject.LoadProperties` method must be called to get the current properties from the server. Calling these methods indicates that an existing object is being modified.  
  
 By default, when changing object properties, RMO commits these changes to the server based on the execution mode of the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) being used. The `P:Microsoft.SqlServer.Replication.ReplicationObject.IsExistingObject` method can be used to verify that an object exists at the server before attempting to retrieve or change its properties. For more information about changing the properties of a replication object, see [View and Modify Distributor and Publisher Properties](../view-and-modify-distributor-and-publisher-properties.md).  
  
> **Note:**  
>  When multiple RMO clients or multiple instances of an RMO programming object are accessing the same replication object at the server, the **Refresh** method of the RMO object can be called to update the properties based on the current state of the object at the server.  
  
### Caching Property Changes  
 When the [Microsoft.SqlServer.Management.Common.SqlExecutionModes](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.SqlExecutionModes) property is set to [Microsoft.SqlServer.Management.Common.SqlExecutionModes.CaptureSql](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.SqlExecutionModes.CaptureSql) all  Transact-SQL  statements generated by RMO are captured so that they can be executed manually in a single batch by using one of the execution methods. RMO lets you cache property changes and commit them together in a single batch by using the `M:Microsoft.SqlServer.Replication.ReplicationObject.CommitPropertyChanges` method of the object. To cache property changes, the `P:Microsoft.SqlServer.Replication.ReplicationObject.CachePropertyChanges` property of the object must be set to **true**. When caching property changes in RMO, the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object still controls when changes are sent to the server. For more information about caching property changes for a replication object, see [View and Modify Distributor and Publisher Properties](../view-and-modify-distributor-and-publisher-properties.md).  
  
> **Important:**  
>  Although the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) class supports declaring explicit transactions when setting properties, such transactions may interfere with internal replication transactions, can produce unanticipated results, and should not be used with RMO.  

### Enabling TLS 1.2 Support for RMO Components 
 TLS1.2 support for RMO Components on Windows 2012 and lower can be enabled by installing the update [KB 3140245](https://support.microsoft.com/help/3140245), and creating the registry keys as mentioned in the article. On Windows 2012 R2 and later versions, only the registry keys as mentioned in above article, need to be created.
 
## Example  
 This example demonstrates the caching of property changes. Changes made to the attributes of a transactional publication are cached until they are explicitly sent to the server.  
  
 [HowTo#rmo_ChangeTranPub_cached (complete source file; reference: ../../../relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs#rmo_changetranpub_cached)](../../../../_code/docs/relational-databases/replication/codesnippet/csharp/rmohowto/rmotestevelope.cs.md)  
  
## Related content

- [Replication System Stored Procedures Concepts](replication-system-stored-procedures-concepts.md)
- [Replication Programming Concepts](replication-programming-concepts.md)
