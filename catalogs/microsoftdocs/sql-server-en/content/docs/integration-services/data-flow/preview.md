---
title: "Preview"
description: "Preview"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: ui-reference
---
# Preview 


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Use the **Preview** dialog box to preview the data that the SAP BW source will extract.  
  
> **Important:**  
>  The **Preview** option, that is available on the **Connection Manager** page of the **SAP BW Source Editor**, actually extracts data. If you have configured SAP Netweaver BW to extract only data that has changed since the previous extraction, selecting **Preview** will exclude the previewed data from the next extraction.  
  
 To learn more about the SAP BW source component of the  Microsoft 
 Connector 1.1 for SAP BW, see [SAP BW Source](sap-bw-source.md).  
  
> **Important:**  
>  The documentation for the Microsoft Connector 1.1 for SAP BW assumes familiarity with the SAP Netweaver BW environment. For more information about SAP Netweaver BW, or for information about how to configure SAP Netweaver BW objects and processes, see your SAP documentation.  
  
> **Important:**  
>  Extracting data from SAP Netweaver BW requires additional SAP licensing. Check with SAP to verify these requirements.  
  
 **To open the Preview dialog box**  
  
1.  In  SQL Server Data Tools (SSDT) 
, open the  Integration Services 
 package that contains the SAP BW source.  
  
2.  On the **Data Flow** tab, double-click the SAP BW source.  
  
3.  In the **SAP BW Source Editor**, click **Connection Manager** to open the **Connection Manager** page of the editor.  
  
4.  Configure the SAP BW source.  
  
5.  After you configure the SAP BW source, on the **Connection Manager** page, click **Preview** to preview the data in the **Preview** dialog box.  
  
    > **Note:**  
    >  Clicking **Preview** also opens the **Request Log** dialog box. For more information about this dialog box, see [Request Log](request-log.md).  
  
## Options  
 The **Preview** dialog box displays the rows that are requested from the SAP Netweaver BW system. The columns that are displayed are the columns that are defined in the source data.  
  
 There are no other options in this dialog box.  
  
## Related content

- [SAP BW Source Editor (Connection Manager Page)](sap-bw-source-editor-connection-manager-page.md)
- [Microsoft Connector for SAP BW F1 Help](../microsoft-connector-for-sap-bw-f1-help.md)
