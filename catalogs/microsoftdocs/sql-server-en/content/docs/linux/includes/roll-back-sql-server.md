---
author: rwestMSFT
ms.author: randolphwest
ms.date: 01/02/2026
ms.service: sql
ms.subservice: linux
ms.topic: include
ms.custom:
  - linux-related-content
---
To roll back or downgrade  SQL Server 
 to a previous release, use the following steps:

1. Find the version number for the  SQL Server 
 package you want to downgrade to. For a list of package numbers, see [KB 5122767](https://support.microsoft.com/help/5122767).

1. Downgrade to a previous version of  SQL Server 
. In the following commands, replace `<version_number>` with the  SQL Server 
 version number you found in step 1.

   | Platform | Package update commands |
   | --- | --- |
   | **RHEL** | `sudo yum downgrade mssql-server-<version_number>.x86_64` |
   | **SLES** | `sudo zypper install --oldpackage mssql-server=<version_number>` |
   | **Ubuntu** | `sudo apt-get install mssql-server=<version_number>`<br />`sudo systemctl start mssql-server` |

> **Note:**  
> The only supported downgrade is if you downgrade to a release within the same major version, such as  SQL Server 2022 (16.x) 
.
