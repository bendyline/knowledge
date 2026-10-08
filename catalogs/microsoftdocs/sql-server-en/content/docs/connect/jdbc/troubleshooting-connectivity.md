---
title: "Troubleshooting connectivity"
description: "Learn about JDBC connectivity and how to troubleshoot potential connection issues when using the Microsoft JDBC Driver for SQL Server."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: "08/12/2019"
ms.service: sql
ms.subservice: connectivity
ms.topic: troubleshooting-general
---
# Troubleshooting connectivity


  The  Microsoft JDBC Driver for SQL Server 
 requires that TCP/IP be installed and running to communicate with your  SQL Server 
 database. You can use the  SQL Server 
 Configuration Manager to verify which network library protocols are installed.  
  
 A database connection attempt might fail for many reasons. These can include the following:  
  
-   TCP/IP is not enabled for  SQL Server 
, or the server or port number specified is incorrect. Verify that  SQL Server 
 is listening with TCP/IP on the specified server and port. This might be reported with an exception similar to: "The login has failed. The TCP/IP connection to the host has failed." This indicates one of the following:  
  
    -    SQL Server 
 is installed but TCP/IP has not been installed as a network protocol for  SQL Server 
 by using the  SQL Server 
 Network Utility for  SQL Server 2000 (8.x) 
, or the  SQL Server 
 Configuration Manager for  SQL Server 2005 (9.x) 
 and later.  
  
    -   TCP/IP is installed as a  SQL Server 
 protocol, but it is not listening on the port specified in the JDBC connection URL. The default port is 1433, but  SQL Server 
 can be configured at product installation to listen on any port. Make sure that  SQL Server 
 is listening on port 1433. Or, if the port has been changed, make sure that the port specified in the JDBC connection URL matches the changed port. For more information about JDBC connection URLs, see [Building the connection URL](building-the-connection-url.md).  
  
    -   The address of the computer that is specified in the JDBC connection URL does not refer to a server where  SQL Server 
 is installed and started.  
  
    -   The networking operation of TCP/IP between the client and server running  SQL Server 
 is not operable. You can check TCP/IP connectivity to  SQL Server 
 by using telnet. For example, at the command prompt, type `telnet 192.168.0.0 1433` where 192.168.0.0 is the address of the computer that is running  SQL Server 
 and 1433 is the port it is listening on. If you receive a message that states "Telnet cannot connect," TCP/IP is not listening on that port for  SQL Server 
 connections. Use the  SQL Server 
 Network Utility for  SQL Server 2000 (8.x) 
, or the  SQL Server 
 Configuration Manager for  SQL Server 2005 (9.x) 
 and later to make sure that  SQL Server 
 is configured to use TCP/IP on port 1433.  
  
    -   The port that is used by the server has not been opened in the firewall. This includes the port that is used by the server or optionally, the port associated with a named instance of the server.  
  
-   The specified database name is incorrect. Make sure that you are logging on to an existing  SQL Server 
 database.  
  
-   The user name or password is incorrect. Make sure that you have the correct values.  
  
-   When you use  SQL Server 
 Authentication, the JDBC driver requires that  SQL Server 
 is installed with  SQL Server 
 Authentication, which is not the default. Make sure that this option is included when you install or configure your instance of  SQL Server 
.  
  
## Related content

- [Diagnosing problems with the JDBC driver](diagnosing-problems-with-the-jdbc-driver.md)
- [Connecting to SQL Server with the JDBC driver](connecting-to-sql-server-with-the-jdbc-driver.md)
