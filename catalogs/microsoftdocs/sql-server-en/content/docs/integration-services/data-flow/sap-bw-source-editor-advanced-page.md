---
title: "SAP BW Source Editor (Advanced Page)"
description: "SAP BW Source Editor (Advanced Page)"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: ui-reference
f1_keywords:
  - "sql13.dts.designer.sapbwsource.advanced.f1"
---
# SAP BW Source Editor (Advanced Page)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Use the **Advanced** page of the **SAP BW Source Editor** to specify the string conversion rule and the time-out period, and also to reset the status of a particular Request ID.  
  
 To learn more about the SAP BW source component of the  Microsoft 
 Connector 1.1 for SAP BW, see [SAP BW Source](sap-bw-source.md).  
  
> **Important:**  
>  The documentation for the Microsoft Connector 1.1 for SAP BW assumes familiarity with the SAP Netweaver BW environment. For more information about SAP Netweaver BW, or for information about how to configure SAP Netweaver BW objects and processes, see your SAP documentation.  
  
> **Important:**  
>  Extracting data from SAP Netweaver BW requires additional SAP licensing. Check with SAP to verify these requirements.  
  
 **To open the Connection Manager page**  
  
1.  In  SQL Server Data Tools (SSDT) 
, open the  Integration Services 
 package that contains the SAP BW source.  
  
2.  On the **Data Flow** tab, double-click the SAP BW source.  
  
3.  In the **SAP BW Source Editor**, click **Advanced** to open the **Advanced** page of the editor.  
  
## Options  
  
> **Note:**  
>  If you do not know all the values that are required to configure the source, you might have to ask your SAP administrator.  
  
 **String Conversion**  
 Specify the rule to apply for string conversion.  
  
| Option | Description |
| --- | --- |
| **Automatic string conversion** | Convert all strings to **nvarchar** when the SAP Netweaver BW system is a Unicode system. Otherwise, convert all strings to **varchar**. |
| **Convert strings to varchar** | Convert all strings to **varchar**. |
| **Convert strings to nvarchar** | Convert all strings to **nvarchar**. |
  
 **Timeout (seconds)**  
 Specify the maximum number of seconds that the source should wait.  
  
> **Note:**  
>  This option is only valid if you have selected **W - Wait for Notify** as the value of **Execution Mode** on the **Connection Manager** page of the editor. For more information, see [SAP BW Source Editor (Connection Manager Page)](sap-bw-source-editor-connection-manager-page.md).  
  
 **Request ID**  
 Specify the Request ID whose status you want to reset to "G - Green" when you click **Reset**.  
  
 **Reset**  
 Lets you reset the status of the specified Request ID to "G - Green", after prompting you for confirmation. This can be useful when a problem has occurred, and the SAP Netweaver BW system has flagged the request with a yellow or red status.  
  
## Related content

- [SAP BW Source Editor (Connection Manager Page)](sap-bw-source-editor-connection-manager-page.md)
- [SAP BW Source Editor (Columns Page)](sap-bw-source-editor-columns-page.md)
- [SAP BW Source Editor (Error Output Page)](sap-bw-source-editor-error-output-page.md)
- [Microsoft Connector for SAP BW F1 Help](../microsoft-connector-for-sap-bw-f1-help.md)
