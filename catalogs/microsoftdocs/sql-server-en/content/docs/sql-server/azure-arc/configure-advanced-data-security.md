---
title: Protect SQL Server with Microsoft Defender for Cloud 
description: Describes how to use Microsoft Defender for Cloud to protect SQL Server enabled by Azure Arc
author: pochiraju
ms.author: rajpo
ms.reviewer: randolphwest
ms.date: 10/12/2022
ms.topic: how-to
ms.custom: sfi-image-nochange
---
# Protect SQL Server with Microsoft Defender for Cloud


**Applies to:**
 

](../sql-docs-navigation-guide.md#applies-to)
 

You can configure your instance of 
 SQL Server 
 enabled by Azure Arc with Microsoft Defender for Cloud by following these steps.

## Prerequisites

- Your Windows-based SQL Server instance is connected to Azure. Follow the instructions to [Connect your SQL Server to Azure Arc](connect.md).

   > **Note:**
   > Microsoft Defender for Cloud is only supported for SQL Server instances on Windows machines. This will not work for SQL Server on Linux machines.

- Your user account is assigned one of the [Security Center Roles (RBAC)](https://learn.microsoft.com/azure/security-center/security-center-permissions)

## Create a Log Analytics workspace

1. Search for **Log Analytics workspaces** resource type and add a new one through the creation pane.

   > **Note:**
   > You can use a Log Analytics workspace in any region so if you already have one, you can use it. But we recommend creating it in the same region where your 
 SQL Server 
 enabled by Azure Arc resource is created.

1. Go to **Agents management > Log Analytics agent instructions**  and copy Workspace ID and Primary key for later use.

## Install Log Analytics Agent

The next step is needed only if you haven't yet configured MMA on the remote machine.

1. Go to **Azure Arc > Servers** and open  the Azure Arc-enabled server resource for the machine where the SQL Server instance is installed. 

1. Open the **Extensions** pane and click **+ Add**. 

1. Select **Log Analytics Agent - Azure Arc** and click **Next**. 

1. Set the Workspace ID and Workspace key using the values you saved in the previous step.

1. After validation succeeds, select **Create** to install the agent. When the deployment completes, the status updates to *Succeeded*.

For more information, see [Extension management with Azure Arc](https://learn.microsoft.com/azure/azure-arc/servers/manage-vm-extensions).

## Enable Microsoft Defender for Cloud

1. Go to **Azure Arc > SQL Servers** and open the Azure Arc-enabled  SQL Server 
 resource for the instance that you want to protect. 

1. Click on the **Microsoft Defender for Cloud** tile. If Enablement Status shows **Disabled at the subscription-level**, follow the steps documented in [Enable Microsoft Defender for SQL servers on machines](https://learn.microsoft.com/azure/defender-for-cloud/defender-for-sql-usage#step-3-enable-the-optional-plan-in-defender-for-clouds-environment-settings-page).

> **Note:**
> The first scan to generate the vulnerability assessment happens within 24 hours after enabling Microsoft Defender for Cloud. Successive scans run automatically every Sunday.

## Explore

Explore security anomalies and threats in Azure Security Center.

1. Open your SQL Server – Azure Arc resource and select **Microsoft Defender for Cloud** in the **Settings** section of the left menu. to see the recommendations and alerts for that SQL Server instance.

   Screenshot showing how to select security heading.

1. Select any of the recommendations to see the vulnerability details.

   Screenshot showing the Vulnerability report.

1. Select any security alert for full details and further explore the attack. The following diagram is an example of the Potential SQL Injection alert.

   Screenshot showing a brute force alert.

1. Select **Take action** to mitigate the alert.

   Screenshot showing alert mitigation.

## Related content

- [Deployment options for SQL Server enabled by Azure Arc](deployment-options.md)
- [Azure Sentinel](https://learn.microsoft.com/azure/sentinel/overview)
- [on-board Azure Sentinel](https://learn.microsoft.com/azure/sentinel/connect-data-sources)
