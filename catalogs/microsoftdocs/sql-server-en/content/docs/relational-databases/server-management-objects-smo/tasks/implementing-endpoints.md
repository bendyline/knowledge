---
title: "Implementing Endpoints"
description: "Implementing Endpoints"
author: "markingmyname"
ms.author: "maghan"
ms.date: "08/06/2017"
ms.service: sql
ms.topic: "reference"
ms.custom:
  - ignite-2025
helpviewer_keywords:
  - "endpoints [SMO]"
monikerRange: "=azuresqldb-current || =azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric-sqldb"
---
# Implementing Endpoints

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
](../../../sql-server/sql-docs-navigation-guide.md#applies-to)



  An endpoint is a service that can listen natively for requests. SMO supports various types of endpoints by using the [Microsoft.SqlServer.Management.Smo.Endpoint](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Endpoint) object. You can create an endpoint service that handles a specific type of payload, which uses a specific protocol, by creating an instance of an [Microsoft.SqlServer.Management.Smo.Endpoint](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Endpoint) object and setting its properties.  
  
 The [Microsoft.SqlServer.Management.Smo.Endpoint.EndpointType%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Endpoint.EndpointType%252A) property of the [Microsoft.SqlServer.Management.Smo.Endpoint](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Endpoint) object can be used to specify on of the following payload types:  
  
-   Database mirroring  
  
-   SOAP (support for SOAP endpoints is present in  SQL Server 2008 R2 (10.50.x) 
 and earlier  SQL Server 
 versions)  
  
-   Service Broker  
  
-    Transact-SQL   
  
 Also, the [Microsoft.SqlServer.Management.Smo.Endpoint.ProtocolType%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Endpoint.ProtocolType%252A) property can be used to specify the following two supported protocols:  
  
-   HTTP protocol  
  
-   TCP protocol  
  
 Having specified the type of payload, the actual payload can be set by using the [Microsoft.SqlServer.Management.Smo.Endpoint.Payload%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Endpoint.Payload%252A) object property. The [Microsoft.SqlServer.Management.Smo.Payload](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Payload) object property provides a reference to a payload object of the specified type, for which the properties can be modified.  
  
 For the [Microsoft.SqlServer.Management.Smo.DatabaseMirroringPayload](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.DatabaseMirroringPayload) object, you must specify the mirroring role and whether encryption is enabled. The [Microsoft.SqlServer.Management.Smo.ServiceBrokerPayload](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.ServiceBrokerPayload) object requires information about message forwarding, maximum number of connections allowed and the authentication mode. The [Microsoft.SqlServer.Management.Smo.SoapPayloadMethod.%23ctor%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.SoapPayloadMethod.%2523ctor%252A) object requires various properties to be set including the [Microsoft.SqlServer.Management.Smo.SoapPayloadMethodCollection.Add%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.SoapPayloadMethodCollection.Add%252A) object property that specifies the SOAP payload methods available to clients (stored procedures and user-defined functions).  
  
 Similarly, the actual protocol can be set by using the [Microsoft.SqlServer.Management.Smo.Endpoint.Protocol%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Endpoint.Protocol%252A) object property that references a protocol object of the type specified by [Microsoft.SqlServer.Management.Smo.Endpoint.ProtocolType%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Endpoint.ProtocolType%252A) property. The [Microsoft.SqlServer.Management.Smo.HttpProtocol](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.HttpProtocol) object requires a list of restricted IP addresses, and port, website, and authentication information. The [Microsoft.SqlServer.Management.Smo.TcpProtocol](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.TcpProtocol) object also requires a list of restricted IP addresses and port information.  
  
 When the endpoint has been created and fully defined, access can be granted to, revoked from, and denied to database users, groups, roles, and logons.  
  
## Example  
 For the following code example, you will have to select the programming environment, programming template and the programming language to create your application. For more information, see [Create a Visual C# SMO Project in Visual Studio .NET](../how-to-create-a-visual-csharp-smo-project-in-visual-studio-net.md).  
  
## Creating a Database Mirroring Endpoint Service in Visual Basic  
 The code example demonstrates how to create a Database Mirroring endpoint in SMO. This is necessary before you create a database mirror. Use the [Microsoft.SqlServer.Management.Smo.Database.IsMirroringEnabled%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database.IsMirroringEnabled%252A) and other properties on the [Microsoft.SqlServer.Management.Smo.Database](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database) object to create a database mirror.  
  
```VBNET
'Set up a database mirroring endpoint on the server before setting up a database mirror.
'Connect to the local, default instance of SQL Server.
Dim srv As Server
srv = New Server
'Define an Endpoint object variable for database mirroring.
Dim ep As Endpoint
ep = New Endpoint(srv, "Mirroring_Endpoint")
ep.ProtocolType = ProtocolType.Tcp
ep.EndpointType = EndpointType.DatabaseMirroring
'Specify the protocol ports.
ep.Protocol.Http.SslPort = 5024
ep.Protocol.Tcp.ListenerPort = 6666
'Specify the role of the payload.
ep.Payload.DatabaseMirroring.ServerMirroringRole = ServerMirroringRole.All
'Create the endpoint on the instance of SQL Server.
ep.Create()
'Start the endpoint.
ep.Start()
Console.WriteLine(ep.EndpointState)
``` 
  
## Creating a Database Mirroring Endpoint Service in Visual C#  
 The code example demonstrates how to create a Database Mirroring endpoint in SMO. This is necessary before you create a database mirror. Use the [Microsoft.SqlServer.Management.Smo.Database.IsMirroringEnabled%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database.IsMirroringEnabled%252A) and other properties on the [Microsoft.SqlServer.Management.Smo.Database](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database) object to create a database mirror.  
  
```csharp  
{  
            //Set up a database mirroring endpoint on the server before   
        //setting up a database mirror.   
        //Connect to the local, default instance of SQL Server.   
            Server srv = new Server();  
            //Define an Endpoint object variable for database mirroring.   
            Endpoint ep = default(Endpoint);  
            ep = new Endpoint(srv, "Mirroring_Endpoint");  
            ep.ProtocolType = ProtocolType.Tcp;  
            ep.EndpointType = EndpointType.DatabaseMirroring;  
            //Specify the protocol ports.   
            ep.Protocol.Http.SslPort = 5024;  
            ep.Protocol.Tcp.ListenerPort = 6666;  
            //Specify the role of the payload.   
            ep.Payload.DatabaseMirroring.ServerMirroringRole = ServerMirroringRole.All;  
            //Create the endpoint on the instance of SQL Server.   
            ep.Create();  
            //Start the endpoint.   
            ep.Start();  
            Console.WriteLine(ep.EndpointState);  
        }  
```  
  
## Creating a Database Mirroring Endpoint Service in PowerShell  
 The code example demonstrates how to create a Database Mirroring endpoint in SMO. This is necessary before you create a database mirror. Use the [Microsoft.SqlServer.Management.Smo.Database.IsMirroringEnabled%2A](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database.IsMirroringEnabled%252A) and other properties on the [Microsoft.SqlServer.Management.Smo.Database](https://learn.microsoft.com/search/?terms=Microsoft.SqlServer.Management.Smo.Database) object to create a database mirror.  
  
```powershell  
# Set the path context to the local, default instance of SQL Server.  
CD \sql\localhost\  
$srv = get-item default  
  
#Get a new endpoint to configure and add  
$ep = New-Object -TypeName Microsoft.SqlServer.Management.SMO.Endpoint -argumentlist $srv,"Mirroring_Endpoint"  
  
#Set some properties  
$ep.ProtocolType = [Microsoft.SqlServer.Management.SMO.ProtocolType]::Tcp  
$ep.EndpointType = [Microsoft.SqlServer.Management.SMO.EndpointType]::DatabaseMirroring  
$ep.Protocol.Http.SslPort = 5024  
$ep.Protocol.Tcp.ListenerPort = 6666 #inline comment  
$ep.Payload.DatabaseMirroring.ServerMirroringRole = [Microsoft.SqlServer.Management.SMO.ServerMirroringRole]::All  
  
# Create the endpoint on the instance  
$ep.Create()  
  
# Start the endpoint  
$ep.Start()  
  
# Report its state  
$ep.EndpointState;  
```  
  
## Related content

- [The database mirroring endpoint (SQL Server)](../../../database-engine/database-mirroring/the-database-mirroring-endpoint-sql-server.md)
