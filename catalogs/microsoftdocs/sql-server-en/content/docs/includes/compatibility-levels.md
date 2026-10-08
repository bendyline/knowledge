---
author: rwestMSFT
ms.author: randolphwest
ms.date: 09/15/2025
ms.service: sql
ms.topic: include
---
| Product | Database Engine version | Default compatibility level designation | Supported compatibility level values |
| --- | --- | --- | --- |
| Azure SQL Database |
 | 17 | 170 | 170, 160, 150, 140, 130, 120, 110, 100 |
| Azure SQL Managed Instance <br /> ([**Always-up-to-date** update policy](https://learn.microsoft.com/azure/azure-sql/managed-instance/update-policy#always-up-to-date-update-policy)) | 17 | 170 | 170, 160, 150, 140, 130, 120, 110, 100 |
| Azure SQL Managed Instance <br /> ([**SQL Server 2025** update policy](https://learn.microsoft.com/azure/azure-sql/managed-instance/update-policy#sql-server-2025-update-policy)) | 17 | 170 | 170, 160, 150, 140, 130, 120, 110, 100 |
| Azure SQL Managed Instance <br /> ([**SQL Server 2022** update policy](https://learn.microsoft.com/azure/azure-sql/managed-instance/update-policy#sql-server-2022-update-policy)) | 16 | 150 | 160, 150, 140, 130, 120, 110, 100 |
| SQL Server 2025 (17.x) |
 | 17 | 170 | 170, 160, 150, 140, 130, 120, 110, 100 |
| SQL Server 2022 (16.x) |
 | 16 | 160 | 160, 150, 140, 130, 120, 110, 100 |
| SQL Server 2019 (15.x) |
 | 15 | 150 | 150, 140, 130, 120, 110, 100 |
| SQL Server 2017 (14.x) |
 | 14 | 140 | 140, 130, 120, 110, 100 |
| SQL Server 2016 (13.x) |
 | 13 | 130 | 130, 120, 110, 100 |
| SQL Server 2014 (12.x) |
 | 12 | 120 | 120, 110, 100 |
| SQL Server 2012 (11.x) |
 | 11 | 110 | 110, 100, 90 |
| SQL Server 2008 R2 (10.50.x) |
 | 10.5 | 100 | 100, 90, 80 |
| SQL Server 2008 (10.0.x) |
 | 10 | 100 | 100, 90, 80 |
| SQL Server 2005 (9.x) |
 | 9 | 90 | 90, 80 |
| SQL Server 2000 (8.x) |
 | 8 | 80 | 80 |

> **Important:**  
> The database engine version numbers for  SQL Server 
 and  Azure SQL Database 
 aren't comparable with each other, and rather are internal build numbers for these separate products. The database engine for  Azure SQL Database 
 is based on the same code base as the  SQL Server Database Engine 
. Most importantly, the database engine in  Azure SQL Database 
 always has the newest SQL database engine bits. Version 12 of  Azure SQL Database 
 is newer than version 15 of  SQL Server 
.
