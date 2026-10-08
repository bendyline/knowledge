---
title: "Connecting to an Instance of SQL Server"
description: "Connecting to an Instance of SQL Server"
author: "markingmyname"
ms.author: "maghan"
ms.date: 08/08/2023
ms.service: sql
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "SQL Server Management Objects, connections"
  - "connections [SMO]"
  - "instances of SQL Server, connections"
  - "SMO [SQL Server], connections"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---

# Connect to an Instance of SQL Server


**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



The first programming step in a  SQL Server 
 Management Objects (SMO) application is to create an instance of the [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object and to establish its connection to an instance of  Microsoft 
  SQL Server 
.

You can create an instance of the [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object and establish a connection to the instance of  SQL Server 
 in three ways. The first is using a [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object variable to provide the connection information. The second is to provide the connection information by explicitly setting the [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object properties. The third is to pass the name of the  SQL Server 
 instance in the [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object constructor.

**Using a ServerConnection object**

The advantage of using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object variable is that the connection information can be reused. Declare a [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object variable. Then, declare a [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object and set properties with connection information such as the name of the instance of  SQL Server 
, and the authentication mode. Then, pass the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object variable as a parameter to the [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object constructor. It isn't recommended to share connections between different server objects at the same time. Use the [Microsoft.SqlServer.Management.Common.ServerConnection.Copy%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection.Copy%252A) method to get a copy of the existing connection settings.

**Setting Server object properties explicitly**

Alternatively, you can declare the [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object variable and call the default constructor. As is, the [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object tries to connect to the default instance of  SQL Server 
 with all the default connection settings.

**Providing the SQL Server instance name in the Server object constructor**

Declare the [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object variable and pass the  SQL Server 
 instance name as a string parameter in the constructor. The [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server) object establishes a connection with the instance of  SQL Server 
 with the default connection settings.

## Connection Pooling

Calling the [Microsoft.SqlServer.Management.Common.ConnectionManager.Connect%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ConnectionManager.Connect%252A) method of the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object is unnecessary. After operations are completed, SMO automatically establishes connections when needed and return them to the connection pool. If you call the [Microsoft.SqlServer.Management.Common.ConnectionManager.Connect%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ConnectionManager.Connect%252A) method, the connection won't be released to the pool. To achieve that, you need to use the [Microsoft.SqlServer.Management.Common.ConnectionManager.Disconnect%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ConnectionManager.Disconnect%252A) method explicitly. Furthermore, you can acquire a nonpooled connection by adjusting the [Microsoft.SqlServer.Management.Common.ConnectionSettings.NonPooledConnection%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ConnectionSettings.NonPooledConnection%252A) property of the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection)  object.

## Multithreaded Applications

For multithreaded applications, a separate [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object should be used in each thread.

## Connect to an Instance of SQL Server for RMO

Replication Management Objects (RMO) uses a slightly different method from SMO to connect to a replication server.

RMO programming objects require that a connection to an instance of  SQL Server 
 is made by using the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object implemented by the **Microsoft.SqlServer.Management.Common** namespace. This connection to the server is made independently of an RMO programming object. It's then it's passed to the RMO object either during instance creation or by assignment to the [Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Replication.ReplicationObject.ConnectionContext%252A) property of the object. In this manner, an RMO programming object and the connection object instances can be created and managed separately, and a single connection object can be reused with multiple RMO programming objects. The following rules apply for connections to a replication server:

- All properties for the connection are defined for a specified [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object.

- Each connection to an instance of  SQL Server 
 must have its own [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object.

- All authentication information to make the connection and successfully sign in the server is supplied in the [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object.

- By default, connections are made by using Microsoft Windows Authentication. To use  SQL Server 
 Authentication, [Microsoft.SqlServer.Management.Common.ConnectionSettings.LoginSecure%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ConnectionSettings.LoginSecure%252A) must be set to False and [Microsoft.SqlServer.Management.Common.ConnectionSettings.Login%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ConnectionSettings.Login%252A) and [Microsoft.SqlServer.Management.Common.ConnectionSettings.Password%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ConnectionSettings.Password%252A) must be set to a valid  SQL Server 
 sign-in and password. Security credentials must always be stored and handled securely, and supplied at run time whenever possible.

- The [Microsoft.SqlServer.Management.Common.ConnectionManager.Connect%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ConnectionManager.Connect%252A) method must be called before passing the connection to any RMO programming object.

## Examples

To use any code example that is provided, you'll have to choose the programming environment, the programming template, and the programming language in which to create your application. For more information, see  [Create a Visual C# SMO Project in Visual Studio .NET](../how-to-create-a-visual-csharp-smo-project-in-visual-studio-net.md).

## Connect to the Local Instance of SQL Server by Using Windows Authentication in Visual Basic

Connecting to the local instance of  SQL Server 
 doesn't require much code. Instead, it relies on default settings for authentication method and server. The first operation that requires data to be retrieved causes a connection to be created.

This example is Visual Basic .NET code that connects to the local instance of SQL Server by using Windows Authentication.

```VBNET
'Connect to the local, default instance of SQL Server.
Dim srv As Server
srv = New Server
'The connection is established when a property is requested.
Console.WriteLine(srv.Information.Version)
'The connection is automatically disconnected when the Server variable goes out of scope.
```

## Connect to the Local Instance of SQL Server by Using Windows Authentication in Visual C#

Connecting to the local instance of  SQL Server 
 doesn't require much code. Instead, it relies on default settings for authentication method and server. The first operation that requires data to be retrieved causes a connection to be created.

This example is Visual C# .NET code that connects to the local instance of  SQL Server 
 by using Windows Authentication.

```csharp
{
//Connect to the local, default instance of SQL Server.
Server srv;
srv = new Server();
//The connection is established when a property is requested.
Console.WriteLine(srv.Information.Version);
}
//The connection is automatically disconnected when the Server variable goes out of scope.
```

## Connect to a Remote Instance of SQL Server by Using Windows Authentication in Visual Basic

When you connect to an instance of  SQL Server 
 by using Windows Authentication, you don't have to specify the authentication type. Windows Authentication is the default.

This example is  Visual Basic  .NET code that connects to the remote instance of  SQL Server 
 by using Windows Authentication. The string variable *strServer* contains the name of the remote instance.

```VBNET
'Connect to a remote instance of SQL Server.
Dim srv As Server
'The strServer string variable contains the name of a remote instance of SQL Server.
srv = New Server(strServer)
'The actual connection is made when a property is retrieved.
Console.WriteLine(srv.Information.Version)
'The connection is automatically disconnected when the Server variable goes out of scope.
```

## Connect to a Remote Instance of SQL Server by Using Windows Authentication in Visual C#

When you connect to an instance of  SQL Server 
 by using Windows Authentication, you don't have to specify the authentication type. Windows Authentication is the default.

This example is Visual C# .NET code that connects to the remote instance of  SQL Server 
 by using Windows Authentication. The string variable *strServer* contains the name of the remote instance.

```csharp
{
//Connect to a remote instance of SQL Server.
Server srv;
//The strServer string variable contains the name of a remote instance of SQL Server.
srv = new Server(strServer);
//The actual connection is made when a property is retrieved.
Console.WriteLine(srv.Information.Version);
}
//The connection is automatically disconnected when the Server variable goes out of scope.
```

## Connect to an Instance of SQL Server by Using SQL Server Authentication in Visual Basic

When you connect to an instance of  SQL Server 
 by using  SQL Server 
 Authentication, you must specify the authentication type. This example demonstrates the alternative method of declaring a [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object variable, which enables the connection information to be reused.

The example is  Visual Basic  .NET code that demonstrates how to connect to the remote and *vPassword* contain the sign-in and password.

```VBNET
' compile with:
' /r:Microsoft.SqlServer.Smo.dll
' /r:Microsoft.SqlServer.ConnectionInfo.dll
' /r:Microsoft.SqlServer.Management.Sdk.Sfc.dll
  
Imports Microsoft.SqlServer.Management.Smo
Imports Microsoft.SqlServer.Management.Common
  
Public Class A
   Public Shared Sub Main()
      Dim sqlServerLogin As [String] = "user_id"
      Dim password As [String] = "pwd"
      Dim instanceName As [String] = "instance_name"
      Dim remoteSvrName As [String] = "remote_server_name"
  
      ' Connecting to an instance of SQL Server using SQL Server Authentication
      Dim srv1 As New Server()   ' connects to default instance
      srv1.ConnectionContext.LoginSecure = False   ' set to true for Windows Authentication
      srv1.ConnectionContext.Login = sqlServerLogin
      srv1.ConnectionContext.Password = password
      Console.WriteLine(srv1.Information.Version)   ' connection is established
  
      ' Connecting to a named instance of SQL Server with SQL Server Authentication using ServerConnection
      Dim srvConn As New ServerConnection()
      srvConn.ServerInstance = ".\" & instanceName   ' connects to named instance
      srvConn.LoginSecure = False   ' set to true for Windows Authentication
      srvConn.Login = sqlServerLogin
      srvConn.Password = password
      Dim srv2 As New Server(srvConn)
      Console.WriteLine(srv2.Information.Version)   ' connection is established
  
      ' For remote connection, remote server name / ServerInstance needs to be specified
      Dim srvConn2 As New ServerConnection(remoteSvrName)
      srvConn2.LoginSecure = False
      srvConn2.Login = sqlServerLogin
      srvConn2.Password = password
      Dim srv3 As New Server(srvConn2)
      Console.WriteLine(srv3.Information.Version)   ' connection is established
   End Sub
End Class
```

## Connect to an Instance of SQL Server by Using SQL Server Authentication in Visual C#

When you connect to an instance of  SQL Server 
 by using  SQL Server 
 Authentication, you must specify the authentication type. This example demonstrates the alternative method of declaring a [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection) object variable, which enables the connection information to be reused.

The example is Visual C# .NET code that demonstrates how to connect to the remote and *vPassword* contain the sign-in and password.

```csharp
// compile with:
// /r:Microsoft.SqlServer.Smo.dll
// /r:Microsoft.SqlServer.ConnectionInfo.dll
// /r:Microsoft.SqlServer.Management.Sdk.Sfc.dll
  
using System;
using Microsoft.SqlServer.Management.Smo;
using Microsoft.SqlServer.Management.Common;
  
public class A {
   public static void Main() {
      String sqlServerLogin = "user_id";
      String password = "pwd";
      String instanceName = "instance_name";
      String remoteSvrName = "remote_server_name";
  
      // Connecting to an instance of SQL Server using SQL Server Authentication
      Server srv1 = new Server();   // connects to default instance
      srv1.ConnectionContext.LoginSecure = false;   // set to true for Windows Authentication
      srv1.ConnectionContext.Login = sqlServerLogin;
      srv1.ConnectionContext.Password = password;
      Console.WriteLine(srv1.Information.Version);   // connection is established
  
      // Connecting to a named instance of SQL Server with SQL Server Authentication using ServerConnection
      ServerConnection srvConn = new ServerConnection();
      srvConn.ServerInstance = @".\" + instanceName;   // connects to named instance
      srvConn.LoginSecure = false;   // set to true for Windows Authentication
      srvConn.Login = sqlServerLogin;
      srvConn.Password = password;
      Server srv2 = new Server(srvConn);
      Console.WriteLine(srv2.Information.Version);   // connection is established
  
      // For remote connection, remote server name / ServerInstance needs to be specified
      ServerConnection srvConn2 = new ServerConnection(remoteSvrName);
      srvConn2.LoginSecure = false;
      srvConn2.Login = sqlServerLogin;
      srvConn2.Password = password;
      Server srv3 = new Server(srvConn2);
      Console.WriteLine(srv3.Information.Version);   // connection is established
   }
}
```

## Related content

- [Microsoft.SqlServer.Management.Smo.Server](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Server)
- [Microsoft.SqlServer.Management.Common.ServerConnection](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Common.ServerConnection)
