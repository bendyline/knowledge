---
title: "Lesson 2: Connect to the Database Engine from Another Computer"
description: Learn how to enable the protocols, configure the ports, and configure Windows Firewall for connecting to the Database Engine from another computer.
author: MashaMSFT
ms.author: mathoma
ms.reviewer: maghan, randolphwest
ms.date: 08/11/2025
ms.service: sql
ms.topic: how-to
ms.custom:
  - build-2025
---

# Lesson 2: Connect to the Database Engine from another computer


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 

For enhanced security, the  Database Engine 
 of  SQL Server 
 Developer, Express, and Evaluation editions can't be accessed from another computer when initially installed. This lesson shows how to enable the protocols, configure the ports, and configure Windows Firewall for connecting to the Database Engine from other computers.

This lesson contains the following tasks:

- [Enabling protocols](#protocols)
- [Configuring a fixed port](#port)
- [Opening ports in the firewall](#firewall)
- [Connecting to the Database Engine from another computer](#otherComp)
- [Connecting by using the SQL Server Browser service](#browser)

<a id="protocols"></a>

## Enable protocols

For enhanced security,  SQL Server Express 
, Developer, and Evaluation editions install with only limited network connectivity. Connections to the  Database Engine 
 can be made from tools that are running on the same computer but not from other computers. If you're planning to do your development work on the same computer as the  Database Engine 
, you don't need to enable additional protocols.  Management Studio
 connects to the  Database Engine 
 by using the shared memory protocol. This protocol is already enabled.

If you plan to connect to the  Database Engine 
 from another computer, you must enable a protocol, such as TCP/IP.

### How to enable TCP/IP connections from another computer

1. On the **Start** menu, point to **All Programs**, point to   **Microsoft SQL Server**  
, point to **Configuration Tools**, and then select **SQL Server Configuration Manager**.

   > **Note:**  
   > Check to see whether you have both 32-bit and 64-bit options available.

   | Version | Path |
   | --- | --- |
   | SQL Server 2025 (17.x) |
 | `C:\Windows\SysWOW64\SQLServerManager17.msc` |
   |  SQL Server 2022 (16.x) 
 | `C:\Windows\SysWOW64\SQLServerManager16.msc` |
   |  SQL Server 2019 (15.x) 
 | `C:\Windows\SysWOW64\SQLServerManager15.msc` |
   |  SQL Server 2017 (14.x) 
 | `C:\Windows\SysWOW64\SQLServerManager14.msc` |
   |  SQL Server 2016 (13.x) 
 | `C:\Windows\SysWOW64\SQLServerManager13.msc` |
   |  SQL Server 2014 (12.x)
 | `C:\Windows\SysWOW64\SQLServerManager12.msc` |
   |  SQL Server 2012 (11.x) 
 | `C:\Windows\SysWOW64\SQLServerManager11.msc` |

1. In **SQL Server Configuration Manager**, expand **SQL Server Network Configuration**, and then select **Protocols for** *\<InstanceName\>*.

   The default (unnamed) instance is displayed as `MSSQLSERVER`. If you installed a named instance, the name you provided is displayed.  SQL Server Express 
 installs as `SQLEXPRESS`, unless you changed the name during setup.

1. In the list of protocols, right-click the protocol you want to enable (**TCP/IP**), and then select **Enable**.

   > **Note:**  
   > Restart the  SQL Server 
 service after you make changes to network protocols. SQL Server is restarted in the next task.

<a id="port"></a>

## Configure a fixed port

To enhance security, Windows and Windows Server turn on Windows Firewall. When you want to connect to Database Engine from another computer, you must open a communication port in the firewall. The default instance of the  Database Engine 
 listens on port 1433. Therefore, you don't need to configure a fixed port. However, named instances, including  SQL Server Express 
, listen on dynamic ports. Before you can open a port in the firewall, you must first configure the  Database Engine 
 to listen on a specific port known as a fixed port or a static port. Otherwise, the  Database Engine 
 might listen on a different port each time it starts. For more information about firewalls, the default Windows Firewall settings, and a description of the TCP ports that affect the Database Engine, Analysis Services, Reporting Services, and Integration Services, see [Configure the Windows Firewall to allow SQL Server access](../sql-server/install/configure-the-windows-firewall-to-allow-sql-server-access.md).

> **Note:**  
> Port number assignments are managed by the Internet Assigned Numbers Authority and are listed on the [IANA website](https://go.microsoft.com/fwlink/?LinkId=48844). Port numbers should be assigned from numbers 49152 through 65535.

### Configure SQL Server to listen on a specific port

1. In  SQL Server 
 Configuration Manager, expand **SQL Server Network Configuration**, and then select the server instance you want to configure.

1. In the right pane, double-click **TCP/IP**.

1. In the **TCP/IP Properties** dialog, select the **IP Addresses** tab.

1. In the **TCP Port** box of the **IP All** section, enter an available port number. For this article, we use `49172`.

1. Select **OK** to close the dialog, and then select **OK** to the warning that the service must be restarted.

1. In the left pane, select **SQL Server Services**.

1. In the right pane, right-click the instance of  SQL Server 
, and then select **Restart**. When the  Database Engine 
 restarts, it listens on port `49172`.

<a id="firewall"></a>

## Open ports in the firewall

Firewall systems help prevent unauthorized access to computer resources. To connect to  SQL Server 
 from another computer when a firewall is on, you must open a port in the firewall.

> **Important:**  
> Opening firewall ports can expose your server to attacks. Be sure that you understand firewall systems before opening ports. For more information, see [Security considerations for a SQL Server installation](../sql-server/install/security-considerations-for-a-sql-server-installation.md).

After you configure the  Database Engine 
 to use a fixed port, use the following instructions to open that port in Windows Firewall. (You don't need to configure a fixed port for the default instance because it defaults to TCP port 1433.)

### Open a port in Windows Firewall for TCP access (Windows 7)

1. On the **Start** menu, select **Run**, type **WF.msc**, and then select **OK**.

1. In **Windows Firewall with Advanced Security**, in the left pane, right-click **Inbound Rules**, and then select **New Rule** in the action pane.

1. In the **Rule Type** dialog, select **Port**, and then select **Next**.

1. In the **Protocol and Ports** dialog, select **TCP**. Select **Specific local ports**, and then type the port number of the instance of the  Database Engine 
. Enter 1433 for the default instance. Enter `49172` if you're configuring a named instance and configured a fixed port in the previous task. Select **Next**.

1. In the **Action** dialog, select **Allow the connection**, and then select **Next**.

1. In the **Profile** dialog, select any profiles that describe the computer connection environment when you want to connect to the  Database Engine 
, and then select **Next**.

1. In the **Name** dialog, enter a name and description for the rule, and then select **Finish**.

### Open a port in Windows Firewall for TCP access (Windows 10)

To open a port in Windows Firewall for TCP access on a Windows 10 computer, complete the following steps.

1. To access Windows Firewall settings, select the **Windows key** on your keyboard or the **Windows icon** in the taskbar to open the **Start** menu.

1. In the **Start** menu search box, enter **Windows Security** and then select **Enter**. This action opens the Windows Security app.

1. Select **Firewall & network protection** in the left sidebar of the Windows Security app.

1. Under **Firewall & network protection**, select **Allow an app through firewall**.

1. You might need administrator permission to make changes. Select the **Change settings** button if prompted and provide your admin credentials.

1. In the **Allowed apps and features** section, scroll down to find the program or port you want to open. If you're opening a port for a specific application, look for the application in the list. If you're opening a custom port, you need to create a rule by completing these steps:

   1. Select **Allow another app** or **Allow another program**, depending on your requirements.

   1. Choose the program or port. If you're opening a port, choose **Ports** and specify the port number and whether it's TCP or UDP. If you're allowing an application, browse to the executable file of the application.

   1. Give your rule a name so you can identify it quickly.

   1. Choose **Allow the connection** to open the port for TCP access.

   1. Select **Next** and then **Finish** to create the rule.

   1. To verify the new rule, in the **Allowed apps and features** section, ensure that the newly created rule is listed with the desired port or program and is enabled.

1. Close the Windows Security app.

1. To ensure that the port is open, you can use a network utility or application that relies on the specific port to see whether it can establish a connection.

Remember to exercise caution when modifying firewall settings because doing so can affect the security of your system. Only open ports when necessary and for trusted applications or services.

> **Note:**  
> For more information about configuring the firewall, including instructions for  Windows Vista 
, see [Configure Windows Firewall for Database Engine access](../database-engine/configure-windows/configure-a-windows-firewall-for-database-engine-access.md). For more information about the default Windows firewall settings, and a description of the TCP ports that affect the Database Engine, Analysis Services, Reporting Services, and Integration Services, see [Configure the Windows Firewall to allow SQL Server access](../sql-server/install/configure-the-windows-firewall-to-allow-sql-server-access.md).

<a id="otherComp"></a>

## Connect to the Database Engine from another computer

Now that you've configured the  Database Engine 
 to listen on a fixed port and opened that port in the firewall, you can connect to  SQL Server 
 from another computer.

If  SQL Server 
 Browser service is running on the server computer, when the firewall has opened UDP port 1434, you can connect by using the computer name and instance name. To enhance security, this example doesn't use the  SQL Server 
 Browser service.

### Connect to the Database Engine from another computer

1. On a second computer that contains the  SQL Server 
 client tools, sign in with an account that's authorized to connect to  SQL Server 
 and open  Management Studio
.

1. In the **Connect to Server** dialog, verify that **Database Engine** is in the **Server type** box.

1. In the **Server name** box, enter `tcp:` to specify the protocol, followed by the computer name, a comma, and the port number. To connect to the default instance, port 1433 is implied and can be omitted. Therefore, enter `tcp:<computer_name>`, where `<computer_name>` is the name of the computer. In the example for a named instance, enter `tcp:<computer_name>,49172`.

   If you omit `tcp:` from the **Server name** box, the client attempts all enabled protocols, in the order specified in the client configuration. For more information, see [Connect to the Database Engine](../sql-server/connect-to-database-engine.md).

   If an attempt is made to establish a connection with the instance name while connecting to the remote server, the [SQL Server Browser service (Database Engine and SSAS)](../database-engine/configure-windows/sql-server-browser-service-database-engine-and-ssas.md) must be running on the remote server. Instance name port mapping doesn't work if the  SQL Server 
 Browser service isn't running.

1. In the **Authentication** box, verify that **Windows Authentication** appears, and then select **Connect**.

<a id="browser"></a>

## Connect by using the SQL Server Browser service

The  SQL Server 
 Browser service listens for incoming requests for  SQL Server 
 resources and provides information about  SQL Server 
 instances that are installed on the computer. When the  SQL Server 
 Browser service is running, users can connect to named instances by providing the computer name and instance name instead of the computer name and port number. Because  SQL Server 
 Browser receives unauthenticated UDP requests, it isn't always turned on during setup. For a description of the service and an explanation of when it turns on, see [SQL Server Browser service (Database Engine and SSAS)](../database-engine/configure-windows/sql-server-browser-service-database-engine-and-ssas.md).

To use the  SQL Server 
 Browser, you must complete the steps described previously and open UDP port 1434 in the firewall.

This is the final lesson in this series.

## Return to tutorials portal

[Tutorial: Get started with the Database Engine](tutorial-getting-started-with-the-database-engine.md)
