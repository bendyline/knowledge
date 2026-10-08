---
title: Custom Workflow Example
description: Create a Custom Workflow - Example
author: meetdeepak
ms.author: dkhare
ms.date: 03/18/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: reference
ms.custom:
  - build-2025
---
# Create a Custom Workflow - Example


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, when you create a custom workflow class library, you create a class that implements the Microsoft.MasterDataServices.WorkflowTypeExtender.IWorkflowTypeExtender interface. This interface includes one method, [Microsoft.MasterDataServices.WorkflowTypeExtender.IWorkflowTypeExtender.StartWorkflow\*](https://learn.microsoft.com/previous-versions/sql/sql-server-2016/hh759009\(v=sql.130\)) , that is called by SQL Server MDS Workflow Integration Service when a workflow starts. The [Microsoft.MasterDataServices.WorkflowTypeExtender.IWorkflowTypeExtender.StartWorkflow\*](https://learn.microsoft.com/previous-versions/sql/sql-server-2016/hh759009\(v=sql.130\))  method contains two parameters: *workflowType* contains the text you entered in the **Workflow type** text box in  Master Data Manager 
, and *dataElement* contains metadata and item data for the item that triggered the workflow business rule.  
  
## Custom workflow example  
 The following code example shows how to implement the [Microsoft.MasterDataServices.WorkflowTypeExtender.IWorkflowTypeExtender.StartWorkflow\*](https://learn.microsoft.com/previous-versions/sql/sql-server-2016/hh759009\(v=sql.130\))  method to extract the Name, Code, and LastChgUserName attributes from the XML data for the element that triggered the workflow business rule, and how to call a stored procedure to insert them into another database. For an example of the item data XML and an explanation of the tags it contains, see [Custom Workflow XML Description (Master Data Services)](create-a-custom-workflow-xml-description.md).  
  
```csharp  
using System;  
using System.Collections.Generic;  
using System.Linq;  
using System.Text;  
using System.IO;  
using Microsoft.Data.SqlClient;  
using System.Xml;  
  
using Microsoft.MasterDataServices.Core.Workflow;  
  
namespace MDSWorkflowTestLib  
{  
    public class WorkflowTester : IWorkflowTypeExtender  
    {  
        #region IWorkflowTypeExtender Members  
  
        public void StartWorkflow(string workflowType, System.Xml.XmlElement dataElement)  
        {  
            // Extract the attributes we want out of the element data.  
            XmlNode NameNode = dataElement.SelectSingleNode("./MemberData/Name");  
            XmlNode CodeNode = dataElement.SelectSingleNode("./MemberData/Code");  
            XmlNode EnteringUserNode = dataElement.SelectSingleNode("./MemberData/LastChgUserName");  
  
            // Open a connection on the workflow database.  
            SqlConnection workflowConn = new SqlConnection(@"Data Source=<Server instance>; Initial Catalog=WorkflowTest; Integrated Security=True");  
  
            // Create a command to call the stored procedure that adds a new user to the workflow database.  
            SqlCommand addCustomerCommand = new SqlCommand("AddNewCustomer", workflowConn);  
            addCustomerCommand.CommandType = System.Data.CommandType.StoredProcedure;  
            addCustomerCommand.Parameters.Add(new SqlParameter("@Name", NameNode.InnerText));  
            addCustomerCommand.Parameters.Add(new SqlParameter("@Code", CodeNode.InnerText));  
            addCustomerCommand.Parameters.Add(new SqlParameter("@EnteringUser", EnteringUserNode.InnerText));  
  
            // Execute the command.  
            workflowConn.Open();  
            addCustomerCommand.ExecuteNonQuery();  
            workflowConn.Close();  
        }  
  
        #endregion  
    }  
}  
```  
  
## Related content

- [Create a Custom Workflow (Master Data Services)](create-a-custom-workflow-master-data-services.md)
