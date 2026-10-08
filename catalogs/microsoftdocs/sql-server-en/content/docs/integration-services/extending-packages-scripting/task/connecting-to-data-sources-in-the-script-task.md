---
title: "Connecting to Data Sources in the Script Task"
description: "Connecting to Data Sources in the Script Task"
ms.date: "03/14/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "connections [Integration Services], scripts"
  - "Integration Services packages, connections"
  - "connection managers [Integration Services], scripts"
  - "scripts [Integration Services], connections"
  - "SSIS packages, connections"
  - "packages [Integration Services], connections"
  - "Script task [Integration Services], connections"
  - "Connections property"
  - "SQL Server Integration Services packages, connections"
  - "SSIS Script task, connections"
dev_langs:
  - "VB"
ms.custom: sfi-ropc-nochange
---
# Connecting to Data Sources in the Script Task


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  Connection managers provide access to data sources that have been configured in the package. For more information, see [Integration Services (SSIS) Connections](../../connection-manager/integration-services-ssis-connections.md).  
  
 The Script task can access these connection managers through the [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Connections%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Connections%252A) property of the **Dts** object. Each connection manager in the [Microsoft.SqlServer.Dts.Runtime.Connections](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Connections) collection stores information about how to connect to the underlying data source.  
  
 When you call the [Microsoft.SqlServer.Dts.Runtime.ConnectionManager.AcquireConnection%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ConnectionManager.AcquireConnection%252A) method of a connection manager, the connection manager connects to the data source, if it is not already connected, and returns the appropriate connection or connection information for you to use in your Script task code.  
  
> **Note:**  
>  You must know the type of connection returned by the connection manager before calling **AcquireConnection**. Because the Script task has **Option Strict** enabled, you must cast the connection, which is returned as type **Object**, to the appropriate connection type before you can use it.  
  
 You can use the [Microsoft.SqlServer.Dts.Runtime.Connections.Contains%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Connections.Contains%252A) method of the [Microsoft.SqlServer.Dts.Runtime.Connections](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Connections) collection returned by the [Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Connections%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Tasks.ScriptTask.ScriptObjectModel.Connections%252A) property to look for an existing connection before using the connection in your code.  
  
> **Important:**  
>  You cannot call the AcquireConnection method of connection managers that return unmanaged objects, such as the OLE DB connection manager and the Excel connection manager, in the managed code of a Script task. However, you can read the ConnectionString property of these connection managers, and connect to the data source directly in your code by using the connection string with an **OledbConnection** from the **System.Data.OleDb** namespace.  
>   
>  If you must call the AcquireConnection method of a connection manager that returns an unmanaged object, use an  ADO.NET 
 connection manager. When you configure the  ADO.NET 
 connection manager to use an OLE DB provider, it connects by using the  .NET Framework 
 Data Provider for OLE DB. In this case, the AcquireConnection method returns a **System.Data.OleDb.OleDbConnection** instead of an unmanaged object. To configure an  ADO.NET 
 connection manager for use with an Excel data source, select the  Microsoft 
 OLE DB Provider for Jet, specify an Excel file, and enter `Excel 8.0` (for Excel 97 and later) as the value of **Extended Properties** on the **All** page of the **Connection Manager** dialog box.  
  
## Connections Example  
 The following example demonstrates how to access connection managers from within the Script task. The sample assumes that you have created and configured an  ADO.NET 
 connection manager named **Test ADO.NET Connection** and a Flat File connection manager named **Test Flat File Connection**. Note that the  ADO.NET 
 connection manager returns a **SqlConnection** object that you can use immediately to connect to the data source. The Flat File connection manager, on the other hand, returns only a string that contains the path and file name. You must use methods from the **System.IO** namespace to open and work with the flat file.  
  
```vb  
    Public Sub Main()

        Dim myADONETConnection As SqlClient.SqlConnection =
            DirectCast(Dts.Connections("Test ADO.NET Connection").AcquireConnection(Dts.Transaction),
                SqlClient.SqlConnection)
        MsgBox(myADONETConnection.ConnectionString,
            MsgBoxStyle.Information, "ADO.NET Connection")

        Dim myFlatFileConnection As String =
            DirectCast(Dts.Connections("Test Flat File Connection").AcquireConnection(Dts.Transaction),
                String)
        MsgBox(myFlatFileConnection, MsgBoxStyle.Information, "Flat File Connection")

        Dts.TaskResult = ScriptResults.Success

    End Sub
```  
  
```csharp  
		public void Main()
		{
            SqlConnection myADONETConnection = 
                Dts.Connections["Test ADO.NET Connection"].AcquireConnection(Dts.Transaction)
                as SqlConnection;
            MessageBox.Show(myADONETConnection.ConnectionString, "ADO.NET Connection");

            string myFlatFileConnection = 
                Dts.Connections["Test Flat File Connection"].AcquireConnection(Dts.Transaction) 
                as string;
            MessageBox.Show(myFlatFileConnection, "Flat File Connection");

            Dts.TaskResult = (int)ScriptResults.Success;
		}
```  
  
## Related content

- [Integration Services (SSIS) Connections](../../connection-manager/integration-services-ssis-connections.md)
