---
title: Replication backward compatibility
description: Review these resources for backward compatibility in replication before you upgrade or if you have several versions of SQL Server in a replication topology.
author: "MashaMSFT"
ms.author: "mathoma"
ms.reviewer: randolphwest
ms.date: 02/26/2025
ms.service: sql
ms.subservice: replication
ms.topic: concept-article
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "transactional replication, backward compatibility"
  - "backward compatibility [SQL Server replication]"
  - "merge replication backward compatibility [SQL Server replication]"
  - "replication [SQL Server], backward compatibility"
  - "backward compatibility [SQL Server], replication"
  - "snapshot replication [SQL Server], backward compatibility"
  - "compatibility [SQL Server replication]"
monikerRange: "=azuresqldb-mi-current || >=sql-server-2017"
---
# Replication backward compatibility


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





Backward compatibility is important to understand if you are upgrading, or if you have more than one version of SQL Server in a replication topology.

The general rules are:

- A Distributor can be any version as long as it is greater than or equal to the Publisher version (in many cases the Distributor is the same instance as the Publisher).
- A Publisher can be any version as long as it less than or equal to the Distributor version.
- The Publisher and Distributor are always the same product:
   -  If the Publisher is SQL Server, the Distributor is SQL Server.
   -  If the Publisher is [Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/replication-transactional-overview), the Distributor is Azure SQL Managed Instance.
- Subscriber version depends on the type of publication:
  - A Subscriber to a transactional publication can be any version within two versions of the Publisher version. For example: a SQL Server 2012 (11.x) Publisher can have SQL Server 2014 (12.x) and SQL Server 2016 (13.x) Subscribers; and a SQL Server 2016 (13.x) Publisher can have SQL Server 2014 (12.x) and SQL Server 2012 (11.x) Subscribers.
  - A Subscriber to a merge publication can be any version equal to or lower than the Publisher version, which is supported as per the versions life cycle support cycle.
  - The Subscriber can be either SQL Server or Azure SQL Managed Instance, regardless of what product the Distributor is, as long as it's within two versions of the Publisher - except configuring Azure SQL Managed Instance as a pull Subscriber to a SQL Server Distributor isn't supported. 

## Replication matrix

### Transactional and snapshot replication compatibility matrix


| **Publisher** | **Distributor** | **Subscriber** |
| :--- | :--- | :--- |
| Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup> | Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup> | Azure SQL Database |
 | <br /> Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2025](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup><br /> SQL Server 2025 (17.x) |
| <br /> SQL Server 2022 (16.x) |
 |  |
| Azure SQL Managed Instance<sup>[2025](#updatepolicy)</sup> | Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2025](#updatepolicy)</sup> | Azure SQL Database |
 | <br /> Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2025](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup><br /> SQL Server 2025 (17.x) |
| <br /> SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
|  |
| Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup> | Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2025](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup> | Azure SQL Database |
 | <br /> Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup><br /> SQL Server 2025 (17.x) |
| <br /> SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
 |  |
| SQL Server 2025 (17.x) |
 | SQL Server 2025 (17.x) |
 | Azure SQL Database |
 | <br />SQL database in Microsoft Fabric |
| <sup>[1](#updatepolicy)</sup> <br /> Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2025](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup><br /> SQL Server 2025 (17.x) |
| <br /> SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
 |  |
| SQL Server 2022 (16.x) |
 | SQL Server 2025 (17.x) |
| <br /> SQL Server 2022 (16.x) |
 | Azure SQL Database |
 | <br />SQL database in Microsoft Fabric |
| <sup>[1](#updatepolicy)</sup> <br /> Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2025](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup><br /> SQL Server 2025 (17.x) |
| <br /> SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
 |  |
| SQL Server 2019 (15.x) |
 | SQL Server 2025 (17.x) |
| <br /> SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
 | Azure SQL Database |
| <br />  Azure SQL Managed Instance<sup>[AUTD](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2025](#updatepolicy)</sup><br />Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup><br /> SQL Server 2025 (17.x) |
| <br /> SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
 |  |
| SQL Server 2017 (14.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
 | Azure SQL Managed Instance<sup>[2022](#updatepolicy)</sup><br /> SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
 |  |
| SQL Server 2016 (13.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
 | SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
 |  |
| SQL Server 2014 (12.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
 | SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |
| SQL Server 2012 (11.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
 | SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |
| SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 | SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |

<a id="updatepolicy"></a>

<sup>AUTD</sup> Applies to Azure SQL Managed Instance configured with the [Always-up-to-date update policy](https://learn.microsoft.com/azure/azure-sql/managed-instance/update-policy#always-up-to-date-update-policy).  
<sup>2025</sup> Applies to Azure SQL Managed Instance configured with the [SQL Server 2025 update policy](https://learn.microsoft.com/azure/azure-sql/managed-instance/update-policy#sql-server-2025-update-policy).   
<sup>2022</sup> Applies to Azure SQL Managed Instance configured with the [SQL Server 2022 update policy](https://learn.microsoft.com/azure/azure-sql/managed-instance/update-policy#sql-server-2022-update-policy).   
<sup>1</sup> Applies based on the requirements of the supported configurations for [SQL database in Microsoft Fabric](https://learn.microsoft.com/azure/azure-sql/database/replication-to-sql-database).


### Merge replication compatibility matrix   


| **Publisher** | **Distributor** | **Subscriber** |
| :--- | :--- | :--- |
| SQL Server 2022 (16.x) |
 | SQL Server 2022 (16.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |
| SQL Server 2019 (15.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
 | SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |
| SQL Server 2017 (14.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
 | SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |
| SQL Server 2016 (13.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
 | SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |
| SQL Server 2014 (12.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
 | SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |
| SQL Server 2012 (11.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
 | SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |
| SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 | SQL Server 2022 (16.x) |
| <br /> SQL Server 2019 (15.x) |
| <br /> SQL Server 2017 (14.x) |
| <br /> SQL Server 2016 (13.x) |
| <br /> SQL Server 2014 (12.x) |
| <br /> SQL Server 2012 (11.x) |
| <br /> SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 | SQL Server 2008 R2 (10.50.x) |
| <br /> SQL Server 2008 (10.0.x) |
 |  |


## Related content

- [Deprecated Features in SQL Server Replication](deprecated-features-in-sql-server-replication.md)
- [Breaking Changes in SQL Server Replication](breaking-changes-in-sql-server-replication.md)
- [Upgrade or patch replicated databases](../../database-engine/install-windows/upgrade-replicated-databases.md)
