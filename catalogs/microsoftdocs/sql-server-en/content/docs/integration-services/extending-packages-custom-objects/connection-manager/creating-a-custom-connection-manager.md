---
title: "Creating a Custom Connection Manager"
description: "Creating a Custom Connection Manager"
ms.date: "03/06/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: "reference"
helpviewer_keywords:
  - "custom connection managers [Integration Services], creating"
ms.custom: sfi-ropc-nochange
---
# Creating a Custom Connection Manager


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The steps that you must follow to create a custom connection manager are similar to the steps for creating any other custom object for  Integration Services 
:  
  
-   Create a new class that inherits from the base class. For a connection manager, the base class is [Microsoft.SqlServer.Dts.Runtime.ConnectionManagerBase](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ConnectionManagerBase).  
  
-   Apply the attribute that identifies the type of object to the class. For a connection manager, the attribute is [Microsoft.SqlServer.Dts.Runtime.DtsConnectionAttribute](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsConnectionAttribute).  
  
-   Override the implementation of the methods and properties of the base class. For a connection manager, these include the [Microsoft.SqlServer.Dts.Runtime.ConnectionManagerBase.ConnectionString%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ConnectionManagerBase.ConnectionString%252A) property and the [Microsoft.SqlServer.Dts.Runtime.ConnectionManagerBase.AcquireConnection%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ConnectionManagerBase.AcquireConnection%252A) and [Microsoft.SqlServer.Dts.Runtime.ConnectionManagerBase.ReleaseConnection%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ConnectionManagerBase.ReleaseConnection%252A) methods.  
  
-   Optionally, develop a custom user interface. For a connection manager, this requires a class that implements the [Microsoft.SqlServer.Dts.Runtime.Design.IDtsConnectionManagerUI](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.Design.IDtsConnectionManagerUI) interface.  
  
> **Note:**  
>  Most of the tasks, sources, and destinations that have been built into  Integration Services 
 work only with specific types of built-in connection managers. Therefore, these samples cannot be tested with the built-in tasks and components.  
  
## Getting Started with a Custom Connection Manager  
  
### Creating Projects and Classes  
 Because all managed connection managers derive from the [Microsoft.SqlServer.Dts.Runtime.ConnectionManagerBase](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.ConnectionManagerBase) base class, the first step when you create a custom connection manager is to create a class library project in your preferred managed programming language and create a class that inherits from the base class. In this derived class, you will override the methods and properties of the base class to implement your custom functionality.  
  
 In the same solution, create a second class library project for the custom user interface. A separate assembly for the user interface is recommended for ease of deployment because it lets you update and redeploy the connection manager or its user interface independently.  
  
 Configure both projects to sign the assemblies that will be generated at build time by using a strong name key file.  
  
### Applying the DtsConnection Attribute  
 Apply the [Microsoft.SqlServer.Dts.Runtime.DtsConnectionAttribute](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsConnectionAttribute) attribute to the class that you have created to identify it as a connection manager. This attribute provides design-time information such as the name, description, and connection type of the connection manager. The [Microsoft.SqlServer.Dts.Runtime.DtsConnectionAttribute.ConnectionType%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsConnectionAttribute.ConnectionType%252A) and **Description** properties correspond to the **Type** and **Description** columns displayed in the **Add SSIS Connection Manager** dialog box, which is displayed when configuring connections for a package in  SQL Server Data Tools (SSDT) 
.  
  
 Use the [Microsoft.SqlServer.Dts.Runtime.DtsConnectionAttribute.UITypeName%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Dts.Runtime.DtsConnectionAttribute.UITypeName%252A) property to link the connection manager to its custom user interface. To obtain the public key token that is required for this property, you an use **sn.exe -t** to display the public key token from the key pair (.snk) file that you intend to use to sign the user interface assembly.  
  
```vb  
<DtsConnection(ConnectionType:="SQLVB", _  
  DisplayName:="SqlConnectionManager (VB)", _  
  Description:="Connection manager for Sql Server", _  
  UITypeName:="SqlConnMgrUIVB.SqlConnMgrUIVB,SqlConnMgrUIVB,Version=1.0.0.0,Culture=neutral,PublicKeyToken=<insert public key token here>")> _  
Public Class SqlConnMgrVB  
  Inherits ConnectionManagerBase  
  . . .  
End Class  
```  
  
```csharp  
[DtsConnection(ConnectionType = "SQLCS",  
  DisplayName = "SqlConnectionManager (CS)",  
  Description = "Connection manager for Sql Server",  
  UITypeName = "SqlConnMgrUICS.SqlConnMgrUICS,SqlConnMgrUICS,Version=1.0.0.0,Culture=neutral,PublicKeyToken=<insert public key token here>")]  
public class SqlConnMgrCS :  
ConnectionManagerBase  
{  
  . . .  
}  
```  
  
## Building, Deploying, and Debugging a Custom Connection Manager  
 The steps for building, deploying, and debugging a custom connection manager in  Integration Services 
 are similar to the steps for other types of custom objects. For more information, see [Building, Deploying, and Debugging Custom Objects](../building-deploying-and-debugging-custom-objects.md).    
  
## Related content

- [Coding a Custom Connection Manager](coding-a-custom-connection-manager.md)
- [Developing a User Interface for a Custom Connection Manager](developing-a-user-interface-for-a-custom-connection-manager.md)
