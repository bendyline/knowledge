---
title: "SAP BW Source Editor (Error Output Page)"
description: "SAP BW Source Editor (Error Output Page)"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: ui-reference
f1_keywords:
  - "sql13.dts.designer.sapbwsource.erroroutput.f1"
---
# SAP BW Source Editor (Error Output Page)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Use the **Error Output** page of the **SAP BW Source Editor** to select error handling options and to set properties on error output columns.  
  
 To learn more about the SAP BW source component of the  Microsoft 
 Connector 1.1 for SAP BW, see [SAP BW Source](sap-bw-source.md).  
  
> **Important:**  
>  The documentation for the Microsoft Connector 1.1 for SAP BW assumes familiarity with the SAP Netweaver BW environment. For more information about SAP Netweaver BW, or for information about how to configure SAP Netweaver BW objects and processes, see your SAP documentation.  
  
> **Important:**  
>  Extracting data from SAP Netweaver BW requires additional SAP licensing. Check with SAP to verify these requirements.  
  
 **To open the Error Output page**  
  
1.  In  SQL Server Data Tools (SSDT) 
, open the  Integration Services 
 package that contains the SAP BW source.  
  
2.  On the **Data Flow** tab, double-click the SAP BW source.  
  
3.  In the **SAP BW Source Editor**, click **Error Output** to open the **Error Output** page of the editor.  
  
## Options  
  
> **Note:**  
>  If you do not know all the values that are required to configure the source, you might have to ask your SAP administrator.  
  
 **Input or Output**  
 View the name of the data source.  
  
 **Column**  
 View the external (source) columns that you selected on the **Columns** page of the **SAP BW Source Editor** dialog box. For more information about this dialog box, see [SAP BW Source Editor (Columns Page)](sap-bw-source-editor-columns-page.md).  
  
 **Error**  
 Specify what the SAP BW source component should do when there is an error: ignore the failure, redirect the row, or fail the component.  
  
 **Truncation**  
 Specify what the SAP BW source component should do when a truncation occurs: ignore the failure, redirect the row, or fail the component.  
  
 **Description**  
 View the description of the error.  
  
 **Set this value to selected cells**  
 Specify what the SAP BW source component should do to all the selected cells when an error or truncation occurs: ignore the failure, redirect the row, or fail the component.  
  
 **Apply**  
 Apply the error handling option to the selected cells.  
  
## Related content

- [SAP BW Source Editor (Connection Manager Page)](sap-bw-source-editor-connection-manager-page.md)
- [SAP BW Source Editor (Columns Page)](sap-bw-source-editor-columns-page.md)
- [SAP BW Source Editor (Advanced Page)](sap-bw-source-editor-advanced-page.md)
- [Microsoft Connector for SAP BW F1 Help](../microsoft-connector-for-sap-bw-f1-help.md)
