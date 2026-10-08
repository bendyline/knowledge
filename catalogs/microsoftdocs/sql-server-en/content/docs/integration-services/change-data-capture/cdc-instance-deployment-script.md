---
title: "CDC Instance Deployment Script"
description: "CDC Instance Deployment Script"
ms.date: 02/24/2026
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
---
# CDC Instance Deployment Script


> **Important:**
> Change Data Capture for Oracle by Attunity is deprecated now. For details, refer to [the announcement](https://www.microsoft.com/sql-server/blog/2024/02/28/sql-server-integration-services-ssis-change-data-capture-attunity-feature-deprecations/).

The CDC Instance Deployment Script dialog box that displays the CDC instance deployment script. This script can be used to re-create the CDC database with all of its artifacts on a different  SQL Server 
 instance.

At the completion of the deployment script, you should make sure of the following:

- The deployment script assumes that the target  SQL Server 
 instance was prepared for Oracle CDC, by using the Oracle CDC Service Configuration Console or by using **prepare script** that program creates.

- The part of the script that is used to enable the database for CDC needs to be run by a `sysadmin`.

- The script doesn't preserve the Oracle log-mining password. This needs to be set manually after the script is run and the Oracle CDC Service is started.

Select the following options in the **CDC Instance Deployment Script** dialog box.

**Save As**  
Saves the script in a text file that you can save in any location you want. You can copy the file with the script to any other server to run it there.

**Copy**  
Copies the script to the clipboard. You can then paste the script into the  SQL Server Management Studio 
 or any text editor to run the scripts later.

## Related content

- [Prepare SQL Server for CDC](the-oracle-cdc-service.md#prepare-sql-server-for-cdc)
