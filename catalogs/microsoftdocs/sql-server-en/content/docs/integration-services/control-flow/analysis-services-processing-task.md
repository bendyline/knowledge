---
title: "Analysis Services Processing Task"
description: "Analysis Services Processing Task"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
f1_keywords:
  - "sql13.dts.designer.asprocessingtask.f1"
  - "sql13.dts.designer.asprocessingtask.general.f1"
  - "sql13.dts.designer.asprocessingtask.as.f1"
helpviewer_keywords:
  - "Analysis Services Processing task"
  - "processing objects [Integration Services]"
---
# Analysis Services Processing Task


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The  Analysis Services 
 Processing task processes  Analysis Services 
 objects such as tabular models, cubes, dimensions, and mining models.  
  
 When processing tabular models, keep the following in mind:  
  
-   You cannot perform impact analysis on tabular models.  
  
-   Some processing options for tabular mode are not exposed, such as Process Defrag and Process Recalc. You can perform these functions by using the Execute DDL task.  
  
-   The options Process Index and Process Update are not appropriate for tabular models and should not be used.  
  
-   Batch settings are ignored for tabular models.

-   Set the target server version to SQL Server 2019 for connecting to Azure Analysis Services.

 Integration Services 
 includes a number of tasks that perform business intelligence operations, such as running Data Definition Language (DDL) statements and data mining prediction queries. For more information about related business intelligence tasks, click one of the following topics:  
  
-   [Analysis Services Execute DDL Task](analysis-services-execute-ddl-task.md)  
  
-   [Data Mining Query Task](data-mining-query-task.md)  
  
## Object Processing  
 Multiple objects can be processed at the same time. When processing multiple objects, you define settings that apply to the processing of all the objects in the batch.  
  
 Objects in a batch can be processed in sequence or in parallel. If the batch does not contain objects for which processing sequence is important, parallel processing can speed up processing. If objects in the batch are processed in parallel, you can configure the task to let it determine how many objects to process in parallel, or you can manually specify the number of objects to process at the same time. If objects are processed sequentially, you can set a transaction attribute on the batch either by enlisting all objects in one transaction or by using a separate transaction for each object in the batch.  
  
 When you process analytic objects, you might also want to process the objects that depend on them. The  Analysis Services 
 Processing task includes an option to process any dependent objects in addition to the selected objects.  
  
 Typically, you process dimension tables before processing fact tables. You may encounter errors if you try to process fact tables before processing the dimension tables.  
  
 This task also lets you configure the handling of errors in dimension keys. For example, the task can ignore errors or stop after a specified number of errors occur. The task can use the default error configuration, or you can construct a custom error configuration. In the custom error configuration, you specify how the task handles errors and the error conditions. For example, you can specify that the task should stop running when the fourth error occurs, or specify how the task should handle **Null** key values. The custom error configuration can also include the path of an error log.  
  
> **Note:**  
>  The  Analysis Services 
 Processing task can process only analytic objects created by using the  SQL Server 
 tools.  
  
 This task is frequently used in combination with a Bulk Insert task that loads data into a  SQL Server 
 table, or a Data Flow task that implements a data flow that loads data into a table. For example, the Data Flow task might have a data flow that extracts data from an online transactional database (OLTP) database and loads it into a fact table in a data warehouse, after which the  Analysis Services 
 Processing task is called to process the cube built on the data warehouse.  
  
 The  Analysis Services 
 Processing task uses an  Analysis Services 
 connection manager to connect to an instance of  Microsoft 
  SQL Server 
  Analysis Services 
. For more information, see [Analysis Services Connection Manager](../connection-manager/analysis-services-connection-manager.md).  
  
## Error Handling  
  
## Configuration of the Analysis Services Processing Task  
 You can set properties through  SSIS 
 Designer or programmatically.  
  
 For more information about the properties that you can set in  SSIS 
 Designer, click the following topic:  
  
-   [Expressions Page](../expressions/expressions-page.md)  
  
 For more information about setting these properties in  SSIS 
 Designer, click the following topic:  
  
-   [Set the Properties of a Task or Container](add-or-delete-a-task-or-a-container-in-a-control-flow.md)  
  
## Programmatic Configuration of the Analysis Services Processing Task  
 For more information about programmatically setting these properties, click the following topic:  
  
-   [Microsoft.DataTransformationServices.Tasks.DTSProcessingTask.DTSProcessingTask](https://learn.microsoft.com/search/?terms=Microsoft.DataTransformationServices.Tasks.DTSProcessingTask.DTSProcessingTask)  
  
## Analysis Services Processing Task Editor (General Page)
  Use the **General** page of the **Analysis Services Processing Task Editor** dialog box to name and describe the Analysis Services Processing task.  
  
### Options  
 **Name**  
 Provide a unique name for the Analysis Services Processing task. This name is used as the label in the task icon.  
  
> **Note:**  
>  Task names must be unique within a package.  
  
 **Description**  
 Type a description of the Analysis Services Processing task.  
  
## Analysis Services Processing Task Editor (Analysis Services Page)
  Use the **Analysis Services** page of the **Analysis Services Processing Task Editor** dialog box to specify an Analysis Services connection manager, select the analytic objects to process, and set processing and error handling options.  
  
 When processing tabular models, keep the following in mind:  
  
1.  You cannot perform impact analysis on tabular models.  
  
2.  Some processing options for tabular mode are not exposed, such as Process Defrag and Process Recalc. You can perform these functions by using the Execute DDL task.  
  
3.  Some processing options provided, such as process indexes, are not appropriate for tabular models and should not be used.  
  
4.  Batch settings are ignored for tabular models.  
  
### Options  
 **Analysis Services connection manager**  
 Select an existing Analysis Services connection manager in the list or click **New** to create a new connection manager.  
  
 **New**  
 Create a new Analysis Services connection manager.  
  
 **Related Topics:** [Analysis Services Connection Manager](../connection-manager/analysis-services-connection-manager.md), [Add Analysis Services Connection Manager Dialog Box UI Reference](../connection-manager/analysis-services-connection-manager.md)  
  
 **Object list**  
 
| Property | Description |
| --- | --- |
| **Object Name** | Lists the specified object names. |
| **Type** | Lists the types of the specified objects. |
| **Process Options** | Select a processing option in the list.<br /><br /> **Related Topics**: [Processing a multidimensional model (Analysis Services)](https://learn.microsoft.com/analysis-services/multidimensional-models/processing-a-multidimensional-model-analysis-services) |
| **Settings** | Lists processing settings for the specified objects. |
  
 **Add**  
 Add an  Analysis Services 
 object to the list.  
  
 **Remove**  
 Select an object, and then click **Delete**.  
  
 **Impact Analysis**  
 Perform impact analysis on the selected object.  
  
 **Related Topics:** [Impact Analysis Dialog Box (Analysis Services - Multidimensional Data)](https://learn.microsoft.com/analysis-services/analysis-services-overview?viewFallbackFrom=sql-server-ver15)  
  
 **Batch Settings Summary**  
 
| Property | Description |
| --- | --- |
| **Processing order** | Specifies whether objects are processed sequentially or in a batch; if parallel processing is used, specifies the number of objects to process concurrently. |
| **Transaction mode** | Specifies the transaction mode for sequential processing. |
| **Dimension errors** | Specifies the task behavior when errors occur. |
| **Dimension key error log path** | Specifies the path of the file to which errors are logged. |
| **Process affected objects** | Indicates whether dependent or affected objects are also processed. |
  
 **Change Settings**  
 Change the processing options and the handling of errors in dimension keys.  
  
 **Related Topics:** [Change Settings Dialog Box (Analysis Services - Multidimensional Data)](https://learn.microsoft.com/analysis-services/analysis-services-overview?viewFallbackFrom=sql-server-ver15)
