---
title: "Partition Processing Destination"
description: "Partition Processing Destination"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: reference
f1_keywords:
  - "sql13.dts.designer.partitionprocessingdest.f1"
  - "sql13.dts.designer.partprocessingtransformation.connection.f1"
  - "sql13.dts.designer.partprocessingtransformation.mapping.f1"
  - "sql13.dts.designer.partprocessingtransformation.advanced.f1"
helpviewer_keywords:
  - "partitions [Analysis Services], processing"
  - "Partition Processing destination [Integration Services]"
  - "destinations [Integration Services], Partition Processing"
---
# Partition Processing Destination


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The Partition Processing destination loads and processes an  SQL Server 
  Analysis Services 
 partition. For more information about partitions, see [Partitions (Analysis Services - Multidimensional Data)](https://learn.microsoft.com/analysis-services/multidimensional-models-olap-logical-cube-objects/partitions-analysis-services-multidimensional-data).  
  
 The Partition Processing destination includes the following features:  
  
-   Options to perform incremental, full, or update processing.  
  
-   Error configuration, to specify whether processing ignores errors or stops after a specified number of errors.  
  
-   Mapping of input columns to partition columns.  
  
 For more information about processing  Analysis Services 
 objects, see [Processing Options and Settings (Analysis Services)](https://learn.microsoft.com/analysis-services/multidimensional-models/processing-options-and-settings-analysis-services).  
  
> **Note:**  
>  Tasks described here do not apply to Analysis Services tabular models.  You cannot map input columns to partition columns for tabular models. You can instead use the Analysis Services Execute DDL task [Analysis Services Execute DDL Task](../control-flow/analysis-services-execute-ddl-task.md) to process the partition.  
  
## Configuration of the Partition Processing Destination  
 The Partition Processing destination uses an  Analysis Services 
 connection manager to connect to the  Analysis Services 
 project or the instance of  Analysis Services 
 that contains the cubes and partitions the destination processes. For more information, see [Analysis Services Connection Manager](../connection-manager/analysis-services-connection-manager.md).  
  
 This destination has one input. It does not support an error output.  
  
 You can set properties through  SSIS 
 Designer or programmatically.  
  
 The **Advanced Editor** dialog box reflects the properties that can be set programmatically. For more information about the properties that you can set in the **Advanced Editor** dialog box or programmatically, click one of the following topics:  
  
-   [Common Properties](set-the-properties-of-a-data-flow-component.md)  
  
-   [Partition Processing Destination Custom Properties](partition-processing-destination-custom-properties.md)  
  
 For more information about how to set the properties, see [Set the Properties of a Data Flow Component](set-the-properties-of-a-data-flow-component.md).  
  
## Partition Processing Destination Editor (Connection Manager Page)
  Use the **Connection Manager** page of the **Partition Processing Destination Editor** dialog box to specify a connection to a  SQL Server 
  Analysis Services 
 project or to an instance of  Analysis Services 
.  
  
> **Note:**  
>  Tasks described here do not apply to Analysis Services tabular models.  You cannot map input columns to partition columns for tabular models. You can instead use the Analysis Services Execute DDL task [Analysis Services Execute DDL Task](../control-flow/analysis-services-execute-ddl-task.md) to process the partition.  
  
### Options  
 **Connection manager**  
 Select an existing connection manager from the list, or create a new connection by clicking **New**.  
  
 **New**  
 Create a new connection by using the **Add Analysis Services Connection Manager** dialog box.  
  
 **List of available partitions**  
 Select the partition to process.  
  
 **Processing method**  
 Select the processing method. The default value of this option is **Full**.  
  
| Value | Description |
| --- | --- |
| Add (incremental) | Perform an incremental processing of the partition. |
| Full | Perform full processing of the partition. |
| Data only | Perform an update processing of the partition. |
  
## Partition Processing Destination Editor (Mappings Page)
  Use the **Mappings** page of the **Partition Processing Destination Editor** dialog box to map input columns to partition columns.  
  
> **Note:**  
>  Tasks described here do not apply to Analysis Services tabular models.  You cannot map input columns to partition columns for tabular models. You can instead use the Analysis Services Execute DDL task [Analysis Services Execute DDL Task](../control-flow/analysis-services-execute-ddl-task.md) to process the partition.  
  
### Options  
 **Available Input Columns**  
 View the list of available input columns. Use a drag-and-drop operation to map available input columns in the table to destination columns.  
  
 **Available Destination Columns**  
 View the list of available destination columns. Use a drag-and-drop operation to map available destination columns in the table to input columns.  
  
 **Input Column**  
 View input columns selected from the table above. You can change the mappings by using the list of **Available Input Columns**.  
  
 **Destination Column**  
 View each available destination column, whether it is mapped or not.  
  
## Partition Processing Destination Editor (Advanced Page)
  Use the **Advanced** page of the **Partition Processing Destination Editor** dialog box to configure error handling.  
  
> **Note:**  
>  Tasks described here do not apply to Analysis Services tabular models.  You cannot map input columns to partition columns for tabular models. You can instead use the Analysis Services Execute DDL task [Analysis Services Execute DDL Task](../control-flow/analysis-services-execute-ddl-task.md) to process the partition.  
  
### Options  
 **Use default error configuration.**  
 Specify whether to use the default  Analysis Services 
 error handling. By default, this value is **True**.  
  
 **Key error action**  
 Specify how to handle records that have unacceptable key values.  
  
| Value | Description |
| --- | --- |
| **ConvertToUnknown** | Convert the unacceptable key value to the Unknown value. |
| **DiscardRecord** | Discard the record. |
  
 **Ignore errors**  
 Specify that errors should be ignored.  
  
 **Stop on error**  
 Specify that processing should stop when an error occurs.  
  
 **Number of errors**  
 Specify the error threshold at which processing should stop, if you have selected **Stop on error**.  
  
 **On error action**  
 Specify the action to take when the error threshold is reached, if you have selected **Stop on error**.  
  
| Value | Description |
| --- | --- |
| **StopProcessing** | Stop processing. |
| **StopLogging** | Stop logging errors. |
  
 **Key not found**  
 Specify the action to take for a key not found error. By default, this value is **ReportAndContinue**.  
  
| Value | Description |
| --- | --- |
| **IgnoreError** | Ignore the error and continue processing. |
| **ReportAndContinue** | Report the error and continue processing. |
| **ReportAndStop** | Report the error and stop processing. |
  
 **Duplicate key**  
 Specify the action to take for a duplicate key error. By default, this value is **IgnoreError**.  
  
| Value | Description |
| --- | --- |
| **IgnoreError** | Ignore the error and continue processing. |
| **ReportAndContinue** | Report the error and continue processing. |
| **ReportAndStop** | Report the error and stop processing. |
  
 **Null key converted to unknown**  
 Specify the action to take when a null key has been converted to the Unknown value. By default, this value is **IgnoreError**.  
  
| Value | Description |
| --- | --- |
| **IgnoreError** | Ignore the error and continue processing. |
| **ReportAndContinue** | Report the error and continue processing. |
| **ReportAndStop** | Report the error and stop processing. |
  
 **Null key not allowed**  
 Specify the action to take when null keys are not allowed and a null key is encountered. By default, this value is **ReportAndContinue**.  
  
| Value | Description |
| --- | --- |
| **IgnoreError** | Ignore the error and continue processing. |
| **ReportAndContinue** | Report the error and continue processing. |
| **ReportAndStop** | Report the error and stop processing. |
  
 **Error log path**  
 Type the path for the error log, or select a destination by using the browse **(...)** button.  
  
 **Browse (...)**  
 Select a path for the error log.  
  
## Related content

- [Integration Services error and message reference](../integration-services-error-and-message-reference.md)
