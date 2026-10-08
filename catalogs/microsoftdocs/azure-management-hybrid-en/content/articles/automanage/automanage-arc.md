---
title: Azure Automanage for Azure Arc-enabled servers
description: Learn about Azure Automanage for Azure Arc-enabled servers
ms.service: azure-automanage
ms.collection: linux
ms.topic: concept-article
ms.date: 05/12/2022
# Customer intent: As an IT administrator managing Arc-enabled servers, I want to configure Azure services using Automanage best practices, so that I can streamline monitoring, updates, and compliance for my virtual machines efficiently before the service retirement.
---

# Azure Automanage for Machines Best Practices - Azure Arc-enabled servers

> **Caution:**
> On September 30, 2027, the Azure Automanage Best Practices service will be retired. As a result, attempting to create a new configuration profile or onboarding a new subscription to the service will result in an error. Learn more [here](https://aka.ms/automanagemigration/) about how to migrate to Azure Policy before that date. 

> **Caution:**
> Starting February 1st 2025, Azure Automanage will begin rolling out changes to halt support and enforcement for all services dependent on the deprecated Microsoft Monitoring Agent (MMA). To continue using Change Tracking and Management, VM Insights, Update Management, and Azure Automation, [migrate to the new Azure Monitor Agent (AMA)](https://aka.ms/mma-to-ama/).

> **Caution:**
> This article references CentOS, a Linux distribution that is End Of Life (EOL) status. Please consider your use and planning accordingly. For more information, see the [CentOS End Of Life guidance](https://learn.microsoft.com/azure/virtual-machines/workloads/centos/centos-end-of-life).

These Azure services are automatically onboarded for you when you use Automanage Machine Best Practices on an Azure Arc-enabled server VM. They are essential to our best practices white paper, which you can find in our [Cloud Adoption Framework](https://learn.microsoft.com/azure/cloud-adoption-framework/manage/azure-server-management).

For all of these services, we will auto-onboard, auto-configure, monitor for drift, and remediate if drift is detected. To learn more, go to [Azure Automanage for virtual machines](overview-about.md).

## Supported operating systems

Automanage supports the following operating systems for Azure Arc-enabled servers

- Windows Server 2012 R2, 2016, 2019, 2022
- CentOS 7.3+, 8
- RHEL 7.4+, 8
- Ubuntu 16.04, 18.04, 20.04
- SLES 12 (SP3-SP5 only)

## Participating services

| Service | Description | Configuration Profile<sup>1</sup> |
| --- | --- | --- |
| [Machines Insights Monitoring](https://learn.microsoft.com/azure/azure-monitor/vm/vminsights-overview) | Azure Monitor for machines monitors the performance and health of your virtual machines, including their running processes and dependencies on other resources. | Production |
| [Update Management](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/automation/update-management/overview.md) | You can use Update Management in Azure Automation to manage operating system updates for your machines. You can quickly assess the status of available updates on all agent machines and manage the process of installing required updates for servers. | Production, Dev/Test |
| [Microsoft Antimalware](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/security/fundamentals/antimalware.md) | Microsoft Antimalware for Azure is a free real-time protection that helps identify and remove viruses, spyware, and other malicious software. It generates alerts when known malicious or unwanted software tries to install itself or run on your Azure systems. **Note:** Microsoft Antimalware requires that there be no other anti-malware software installed, or it may fail to work. This is also only supported for Windows Server 2016 and above. | Production, Dev/Test |
| [Change Tracking & Inventory](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/automation/change-tracking/overview.md) | Change Tracking and Inventory combines change tracking and inventory functions to allow you to track virtual machine and server infrastructure changes. The service supports change tracking across services, daemons software, registry, and files in your environment to help you diagnose unwanted changes and raise alerts. Inventory support allows you to query in-guest resources for visibility into installed applications and other configuration items. | Production, Dev/Test |
| [Machine Configuration](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/governance/machine-configuration/overview.md) | Machine Configuration policy is used to monitor the configuration and report on the compliance of the machine. The Automanage service will install the Azure security baseline using the Guest Configuration extension. For Arc machines, the machine configuration service will install the baseline in audit-only mode. You will be able to see where your VM is out of compliance with the baseline, but noncompliance won't be automatically remediated. | Production, Dev/Test |
| [Azure Automation Account](../automation/automation-create-standalone-account.md) | Azure Automation supports management throughout the lifecycle of your infrastructure and applications. | Production, Dev/Test |
| [Log Analytics Workspace](https://learn.microsoft.com/azure/azure-monitor/logs/log-analytics-overview) | Azure Monitor stores log data in a Log Analytics workspace, which is an Azure resource and a container where data is collected, aggregated, and serves as an administrative boundary. | Production, Dev/Test |


<sup>1</sup> The [configuration profile](overview-configuration-profiles.md) selection is available when you are enabling Automanage. You can also create your own custom profile with the set of Azure services and settings that you need.


## Next steps

Try enabling Automanage for machines in the Azure portal.

> 
> [Enable Automanage for machines in the Azure portal](quick-create-virtual-machines-portal.md)
