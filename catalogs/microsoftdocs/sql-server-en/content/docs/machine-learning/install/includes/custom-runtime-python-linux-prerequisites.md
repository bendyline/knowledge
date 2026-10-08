---
author: VanMSFT
ms.author: vanto
ms.reviewer: randolphwest
ms.date: 12/05/2025
ms.service: sql
ms.subservice: machine-learning-services
ms.topic: include
ms.custom:
  - linux-related-content
---

## Prerequisites

Before installing a custom Python runtime, install the following prerequisites:

- Install  SQL Server 2019 (15.x) 
 for Linux. You can install SQL Server on Red Hat Enterprise Linux (RHEL), SUSE Linux Enterprise Server (SLES), and Ubuntu. For more information, see [the Installation guidance for SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md).

- Upgrade to Cumulative Update (CU) 3 or later for  SQL Server 2019 (15.x) 
. Follow these steps:

  1. Configure the repositories for Cumulative Updates. For more information, see [Configure repositories for installing and upgrading SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-change-repo.md).

  1. Update the **mssql-server** package to the latest Cumulative Update. For more information, see [the Update or Upgrade SQL Server section in the installation guidance for SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#upgrade).
