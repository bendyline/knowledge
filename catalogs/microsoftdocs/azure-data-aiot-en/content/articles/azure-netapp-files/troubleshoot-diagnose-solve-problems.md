---
title: Troubleshoot Azure NetApp Files using diagnose and solve problems tool
description: Describes how to use the Azure diagnose and solve problems tool to troubleshoot issues of Azure NetApp Files.
services: azure-netapp-files
author: b-hchen
ms.service: azure-netapp-files
ms.topic: troubleshooting
ms.date: 01/15/2025
ms.author: anfdocs
# Customer intent: "As a cloud administrator, I want to utilize the diagnostics tool to troubleshoot issues with Azure NetApp Files, so that I can identify and resolve problems efficiently to ensure optimal performance and availability of our file storage systems."
---

# Troubleshoot Azure NetApp Files using diagnose and solve problems tool 

You can use Azure **diagnose and solve problems** tool to troubleshoot issues of Azure NetApp Files. 

## Steps

1. From the Azure portal, select **diagnose and solve problems** in the navigation pane. 

2. Choose a problem type for the issue you are experiencing, for example, **Capacity Pools**.   
    You can select the problem type by clicking the corresponding tile on the diagnose and solve problems page or using the search bar above the tiles. 

    The following screenshot shows an example of issue types that you can troubleshoot for Azure NetApp Files: 

    Screenshot that shows an example of issue types in diagnose and solve problems page.

3. After specifying the problem type, select an option (problem subtype) from the pull-down menu to describe the specific problem you are experiencing. Then follow the on-screen directions to troubleshoot the problem. 

    Screenshot that shows the pull-down menu for problem subtype selection.

    This page presents general guidelines and relevant resources for the problem subtype you select. In some situations, you might be prompted to fill out a questionnaire to trigger diagnostics. If issues are identified, the tool presents a diagnosis and possible solutions.  

    Screenshot that shows the capacity pool troubleshoot page.

For more information about using this tool, see [Diagnostics and solve tool - Azure App Service](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/app-service/overview-diagnostics.md).  

## Next steps

* [Troubleshoot capacity pool errors](troubleshoot-capacity-pools.md)
* [Troubleshoot volume errors](troubleshoot-volumes.md)
* [Troubleshoot application volume group errors](troubleshoot-application-volume-groups.md)
* [Troubleshoot snapshot policy errors](troubleshoot-snapshot-policies.md)
* [Troubleshoot cross-region replication errors](troubleshoot-cross-region-replication.md)
* [Troubleshoot Resource Provider errors](azure-netapp-files-troubleshoot-resource-provider-errors.md)
* [Troubleshoot user access on LDAP volumes](troubleshoot-user-access-ldap.md)
* [Troubleshoot file locks](troubleshoot-file-locks.md)
