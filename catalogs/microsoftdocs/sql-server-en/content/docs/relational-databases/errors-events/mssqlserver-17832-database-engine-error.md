---
title: "MSSQLSERVER_17832"
description: "MSSQLSERVER_17832"
author: MashaMSFT
ms.author: mathoma
ms.date: "04/04/2017"
ms.service: sql
ms.subservice: supportability
ms.topic: "reference"
helpviewer_keywords:
  - "17828 (Database Engine error)"
  - "maxtokensize"
  - "17832 (Database Engine error)"
  - "login packet (bad)"
---
# MSSQLSERVER_17832
 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
  
## Details  
  
| Attribute | Value |
| :--- | :--- |
| Product Name | SQL Server |
|  |
| Event ID | 17832 |
| Event Source | MSSQLSERVER |
| Component | SQLEngine |
| Symbolic Name | SRV_BAD_LOGIN_PKT |
| Message Text | The login packet used to open the connection is structurally invalid; the connection has been closed. Please contact the vendor of the client library.%.*ls |
  
## Explanation  
The  SQL Server 
 computer was unable to process the client login packet. This may be because the packet was created improperly or because the packet was damaged during transmission. It can also be caused by the configuration of the  SQL Server 
 computer. The IP address listed is the address of the client computer. This error can occur for both Windows and SQL logins.
  
### More Information  
When using Windows Authentication in a Kerberos environment, a client receives a Kerberos ticket that contains a Privilege Attribute Certificate (PAC). The PAC contains various types of authorization data including groups that the user is a member of, rights the user has, and what policies apply to the user. When the client receives the Kerberos ticket, the information contained in the PAC is used to generate the user's access token. The client presents the token to the  SQL Server 
 computer as part of the login packet.  
  
If the token was improperly created or damaged during transmission,  SQL Server 
 cannot offer additional information about the problem.  
  
When the user is a member of many groups or has many policies, the token may grow larger than normal to list them all. If the token grows larger than the **MaxTokenSize** value of the server computer, the client fails to connect with a General Network Error (GNE) and error 17832 can occur. This problem may affect only some users: users with many groups or policies. When the problem is the **MaxTokenSize** value of the server computer, error 17832 in the  SQL Server 
 error log will be accompanied by an error with state 9. For additional details about the Kerberos and **MaxTokenSize**, see [KB327825](https://support.microsoft.com/kb/327825).  
  
## User Action  
For Windows logins, you can potentially resolve the error by increasing **MaxTokenSize** value on the server computer to a size large enough to contain the largest token of any user in your organization. 
  
> **Caution:**  
>  Incorrectly editing the registry can severely damage your system. Before making changes to the registry, we recommend that you back up any valued data on the computer. 
  
  
**To change the MaxTokenSize on the server computer**  
  
1.  On the **Start** menu, click **Run**.  
  
2.  Type **regedit**, and then click **OK**. (If the **User Account Control** dialog box appears, click **Continue**.)  
  
3.  Navigate to **HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Lsa\Kerberos\Parameters**.  
  
4.  If the **MaxTokenSize** parameter is not present, right-click **Parameters**, point to **New**, and then click **DWORD (32-bit)** Value. Name the registry entry **MaxTokenSize**.  
  
5.  Right-click **MaxTokenSize**, and then click **Modify**.  
  
6.  In the **Value data** box type the desired **MaxTokenSize** value.  
  
    > **Note:**  
    > Hexadecimal value ffff (decimal value 65535) is the maximum recommended token size. Providing this value would probably solve the problem, but could have negative computer-wide effects with regard to performance. We recommend that you establish the minimum **MaxTokenSize** value that allows for the largest token of any user in your organization and enter that value.  
  
7.  Select **OK**.
  
8.  Close **Registry Editor**.  
  
9. Restart the computer.
