---
title: "Transfer SQL Server Objects Task"
description: "Transfer SQL Server Objects Task"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
f1_keywords:
  - "sql13.dts.designer.transfersqlserverobjectstask.f1"
  - "sql13.dts.designer.transfersqlserverobjects.general.f1"
  - "sql13.dts.designer.transfersqlserverobjects.objects.f1"
helpviewer_keywords:
  - "Transfer SQL Server Objects task [Integration Services]"
---
# Transfer SQL Server Objects Task


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The Transfer  SQL Server 
 Objects task transfers one or more types of objects in a  SQL Server 
 database between instances of  SQL Server 
. For example, the task can copy tables and stored procedures. Depending on the version of  SQL Server 
 that is used as a source, different types of objects are available to copy. For example, only a  SQL Server 
 database includes schemas and user-defined aggregates.  
  
## Objects to Transfer  
 Server roles, roles, and users from the specified database can be copied, as well as the permissions for the transferred objects. By copying the associated users, roles, and permissions together with the objects, you can make the transferred objects immediately operable on the destination server.  
  
 The following table lists the type of objects that can be copied.  
  
| Object |
| --- |
| Tables |
| Views |
| Stored Procedures |
| User-Defined Functions |
| Defaults |
| User-Defined Data Types |
| Partition Functions |
| Partition Schemes |
| Schemas |
| Assemblies |
| User-Defined Aggregates |
| User-Defined Types |
| XML Schema Collection |
  
 User-defined types (UDTs) that were created in an instance of  SQL Server 
 have dependencies on common language runtime (CLR) assemblies. If you use the Transfer  SQL Server 
 Objects task to transfer UDTs, you must also configure the task to transfer dependent objects. To transfer dependent objects, set the **IncludeDependentObjects** property to **True**.  
  
### Table Options  
 When copying tables, you can indicate the types of table-related items to include in the copy process. The following types of items can be copied together with the related table:  
  
-   Indexes  
  
-   Triggers  
  
-   Full-text indexes  
  
-   Primary keys  
  
-   Foreign keys  
  
 You can also indicate whether the script that the task generates is in Unicode format.  
  
## Destination Options  
 You can configure the Transfer  SQL Server 
 Objects task to include schema names, data, extended properties of transferred objects, and dependent objects in the transfer. If data is copied, it can replace or append existing data.  
  
 Some options apply only to  SQL Server 
. For example, only  SQL Server 
 supports schemas.  
  
## Security Options  
 The Transfer  SQL Server 
 Objects task can include  SQL Server 
 database-level users and roles from the source,  SQL Server 
 logins, and the permissions for transferred objects. For example, the transfer can include the permissions on the transferred tables.  
  
## Transfer Objects Between Instances of SQL Server  
 The Transfer  SQL Server 
 Objects task supports a  SQL Server 
 source and destination.  
  
## Events  
 The task raises an information event that reports the object transferred and a warning event when an object is overwritten. An information event is also raised for actions such as the truncation of database tables.  
  
 The Transfer  SQL Server 
 Objects task does not report incremental progress of the object transfer; it reports only 0% and 100 % completion.  
  
## Execution Value  
 The execution value, stored in the **ExecutionValue** property of the task, returns the number of objects transferred. By assigning a user-defined variable to the **ExecValueVariable** property of the Transfer SQL Server Objects task, information about the object transfer can be made available to other objects in the package. For more information, see [Integration Services (SSIS) Variables](../integration-services-ssis-variables.md) and [Use Variables in Packages](../integration-services-ssis-variables.md).  
  
## Log Entries  
 The Transfer SQL Server Objects task includes the following custom log entries:  
  
-   TransferSqlServerObjectsTaskStartTransferringObjects   This log entry reports that the transfer has started. The log entry includes the start time.  
  
-   TransferSqlServerObjectsTaskFinishedTransferringObjects    This log entry reports that the transfer has completed. The log entry includes the end time.  
  
 In addition, a log entry for an **OnInformation** event reports the number of objects of the object types that have been selected for transfer, the number of objects that were transferred, and actions such as the truncation of tables when data is transferred with tables. A log entry for the **OnWarning** event is written for each object on the destination that is overwritten.  
  
## Security and Permissions  
 The user must have permission to browse objects on the source server, and must have permission to drop and create objects on the destination server; moreover, the user must have access to the specified database and database objects.  
  
## Configuration of the Transfer SQL Server Objects Task  
 The Transfer  SQL Server 
 Objects task can be configured to transfer all objects, all objects of a type, or only specified objects of a type. For example, you can choose to copy only selected tables in the AdventureWorks database.  
  
 If the Transfer  SQL Server 
 Objects task transfers tables, you can specify the types of table-related objects to copy with the tables. For example, you can specify that primary keys are copied with tables.  
  
 To further enhance functionality of transferred objects, you can configure the Transfer  SQL Server 
 Objects task to include schema names, data, extended properties of transferred objects, and dependent objects in the transfer. When copying data, you can specify whether to replace or append existing data.  
  
 At run time, the Transfer  SQL Server 
 Objects task connects to the source and destination servers by using two SMO connection managers. The SMO connection managers are configured separately from the Transfer  SQL Server 
 Objects task, and then referenced in the Transfer  SQL Server 
 Objects task. The SMO connection managers specify the server and the authentication mode to use when accessing the server. For more information, see [SMO Connection Manager](../connection-manager/smo-connection-manager.md).  
  
 You can set properties through  SSIS 
 Designer or programmatically.  
  
 For more information about the properties that you can set in  SSIS 
 Designer, click the following topic:  
  
-   [Expressions Page](../expressions/expressions-page.md)  
  
 For more information about how to set these properties in  SSIS 
 Designer, click the following topic:  
  
-   [Set the Properties of a Task or Container](add-or-delete-a-task-or-a-container-in-a-control-flow.md)  
  
## Programmatic Configuration of the Transfer SQL Server Objects Task  
 For more information about programmatically setting these properties, click the following topic:  
  
-   [Microsoft.SqlServer.Dts.Tasks.TransferSqlServerObjectsTask.TransferSqlServerObjectsTask](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.TransferSqlServerObjectsTask.TransferSqlServerObjectsTask)  
  
  
## Transfer SQL Server Objects Task Editor (General Page)
  Use the **General** page of the **Transfer SQL Server Objects Task Editor** dialog box to name and describe the Transfer  SQL Server 
 Objects task.  
  
> **Note:**  
>  The user who creates the Transfer  SQL Server 
 Objects task must have adequate permissions on the source server objects to select them for copying, and permission to access the destination server database where the objects will be transferred.  
  
### Options  
 **Name**  
 Type a unique name for the Transfer  SQL Server 
 Objects task. This name is used as the label in the task icon.  
  
> **Note:**  
>  Task names must be unique within a package.  
  
 **Description**  
 Type a description of the Transfer  SQL Server 
 Objects task.  
  
## Transfer SQL Server Objects Task Editor (Objects Page)
  Use the **Objects** page of the **Transfer SQL Server Objects Task Editor** dialog box to specify properties for copying one or more  SQL Server 
 objects from one instance of  SQL Server 
 to another. Tables, views, stored procedures, and user-defined functions are a few examples of  SQL Server 
 objects that you can copy.  
  
> **Note:**  
>  The user who creates the Transfer  SQL Server 
 Objects task must have sufficient permissions on the source server objects to select them for copying, and permission to access the destination server database where the objects will be transferred.  
  
### Static Options  
 **SourceConnection**  
 Select a SMO connection manager in the list, or click **\<New connection...>** to create a new connection to the source server.  
  
 **SourceDatabase**  
 Select a database on the source server from which objects will be copied.  
  
 **DestinationConnection**  
 Select a SMO connection manager in the list, or click **\<New connection...>** to create a new connection to the destination server.  
  
 **DestinationDatabase**  
 Select a database on the destination server to which objects will be copied.  
  
 **DropObjectsFirst**  
 Select whether the selected objects will be dropped first on the destination server before copying.  
  
 **IncludeExtendedProperties**  
 Select whether extended properties will be included when objects are copied from the source to the destination server.  
  
 **CopyData**  
 Select whether data will be included when objects are copied from the source to the destination server.  
  
 **ExistingData**  
 Specify how data will be copied to the destination server. This property has the options listed in the following table:  
  
| Value | Description |
| --- | --- |
| **Replace** | Data on the destination server will be overwritten. |
| **Append** | Data copied from the source server will be appended to existing data on the destination server. |
  
> **Note:**  
>  The **ExistingData** option is only available when **CopyData** is set to **True**.  
  
 **CopySchema**  
 Select whether the schema is copied during the Transfer  SQL Server 
 Objects task.  
  
> **Note:**  
>  **CopySchema** is only available for  SQL Server 
.  
  
 **UseCollation**  
 Select whether the transfer of objects should include the collation specified on the source server.  
  
 **IncludeDependentObjects**  
 Select whether copying the selected objects will cascade to include other objects that depend on the objects selected for copying.  
  
 **CopyAllObjects**  
 Select whether the task will copy all objects in the specified source database or only selected objects.  Setting this option to False gives you the option to select the objects to transfer, and displays the dynamic options in the section, **CopyAllObjects**.  
  
 **ObjectsToCopy**  
 Expand **ObjectsToCopy** to specify which objects should be copied from the source database to the destination database.  
  
> **Note:**  
>  **ObjectsToCopy** is only available when **CopyAllObjects** is set to **False**.  
  
 The options to copy the following types of objects are supported only on  SQL Server 
:  
  
 Assemblies  
  
 Partition functions  
  
 Partition schemes  
  
 Schemas  
  
 User-defined aggregates  
  
 User-defined types  
  
 XML schema collections  
  
 **CopyDatabaseUsers**  
 Specify whether database users should be included in the transfer.  
  
 **CopyDatabaseRoles**  
 Specify whether database roles should be included in the transfer.  
  
 **CopySqlServerLogins**  
 Specify whether  SQL Server 
 logins should be included in the transfer.  
  
 **CopyObjectLevelPermissions**  
 Specify whether object-level permissions should be included in the transfer.  
  
 **CopyIndexes**  
 Specify whether indexes should be included in the transfer.  
  
 **CopyTriggers**  
 Specify whether triggers should be included in the transfer.  
  
 **CopyFullTextIndexes**  
 Specify whether full-text indexes should be included in the transfer.  
  
 **CopyPrimaryKeys**  
 Specify whether primary keys should be included in the transfer.  
  
 **CopyForeignKeys**  
 Specify whether foreign keys should be included in the transfer.  
  
 **GenerateScriptsInUnicode**  
 Specify whether the generated transfer scripts are in Unicode format.  
  
### Dynamic Options  
  
#### CopyAllObjects = False  
 **CopyAllTables**  
 Select whether the task will copy all tables in the specified source database or only the selected tables.  
  
 **TablesList**  
 Click to open the **Select Tables** dialog box.  
  
 **CopyAllViews**  
 Select whether the task will copy all views in the specified source database or only the selected views.  
  
 **ViewsList**  
 Click to open the **Select Views** dialog box.  
  
 **CopyAllStoredProcedures**  
 Select whether the task will copy all user-defined stored procedures in the specified source database or only the selected procedures.  
  
 **StoredProceduresList**  
 Click to open the **Select Stored Procedures** dialog box.  
  
 **CopyAllUserDefinedFunctions**  
 Select whether the task will copy all user-defined functions in the specified source database or only the selected UDFs.  
  
 **UserDefinedFunctionsList**  
 Click to open the **Select User Defined Functions** dialog box.  
  
 **CopyAllDefaults**  
 Select whether the task will copy all defaults in the specified source database or only the selected defaults.  
  
 **DefaultsList**  
 Click to open the **Select Defaults** dialog box.  
  
 **CopyAllUserDefinedDataTypes**  
 Select whether the task will copy all user-defined data types in the specified source database or only the selected user-defined data types.  
  
 **UserDefinedDataTypesList**  
 Click to open the **Select User-Defined Data Types** dialog box.  
  
 **CopyAllPartitionFunctions**  
 Select whether the task will copy all user-defined partition functions in the specified source database or only the selected partition functions. Supported only on  SQL Server 
.  
  
 **PartitionFunctionsList**  
 Click to open the **Select Partition Functions** dialog box.  
  
 **CopyAllPartitionSchemes**  
 Select whether the task will copy all partition schemes in the specified source database or only the selected partition schemes. Supported only on  SQL Server 
.  
  
 **PartitionSchemesList**  
 Click to open the **Select Partition Schemes** dialog box.  
  
 **CopyAllSchemas**  
 Select whether the task will copy all schemas in the specified source database or only the selected schemas. Supported only on  SQL Server 
.  
  
 **SchemasList**  
 Click to open the **Select Schemas** dialog box.  
  
 **CopyAllSqlAssemblies**  
 Select whether the task will copy all SQL assemblies in the specified source database or only the selected SQL assemblies. Supported only on  SQL Server 
.  
  
 **SqlAssembliesList**  
 Click to open the **Select SQL Assemblies** dialog box.  
  
 **CopyAllUserDefinedAggregates**  
 Select whether the task will copy all user-defined aggregates in the specified source database or only the selected user-defined aggregates. Supported only on  SQL Server 
.  
  
 **UserDefinedAggregatesList**  
 Click to open the **Select User-Defined Aggregates** dialog box.  
  
 **CopyAllUserDefinedTypes**  
 Select whether the task will copy all user-defined types in the specified source database or only the selected UDTs. Supported only on  SQL Server 
.  
  
 **UserDefinedTypes**  
 Click to open the **Select User-Defined Types** dialog box.  
  
 **CopyAllXmlSchemaCollections**  
 Select whether the task will copy all XML Schema collections in the specified source database or only the selected XML schema collections. Supported only on  SQL Server 
.  
  
 **XmlSchemaCollectionsList**  
 Click to open the **Select XML Schema Collections** dialog box.  
  
## Related content

- [Integration Services error and message reference](../integration-services-error-and-message-reference.md)
- [Integration Services Tasks](integration-services-tasks.md)
- [Expressions Page](../expressions/expressions-page.md)
- [Data formats for bulk import or bulk export (SQL Server)](../../relational-databases/import-export/data-formats-for-bulk-import-or-bulk-export-sql-server.md)
- [Security considerations for a SQL Server installation](../../sql-server/install/security-considerations-for-a-sql-server-installation.md)
