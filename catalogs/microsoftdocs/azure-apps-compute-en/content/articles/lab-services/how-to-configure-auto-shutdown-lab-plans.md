---
title: Configure automatic shutdown for a lab plan
titleSuffix: Azure Lab Services
description: Learn how to enable or disable automatic shutdown of lab VMs in Azure Lab Services by configuring the lab plan settings. Automatic shutdown happens when a user disconnects from the remote connection.
services: lab-services
ms.service: azure-lab-services
ms.custom: linux-related-content
author: RoseHJM
ms.author: rosemalcolm
ms.topic: how-to
ms.date: 03/01/2023
---

# Configure automatic shutdown of VMs for a lab plan


> **Important:**
> Azure Lab Services will be retired on June 28, 2027. For more information, see the [retirement guide](https://aka.ms/azlabs-retirementguide). To simplify your migration, Microsoft has published automation scripts to help you clean up Lab Services resources, these are available in the [Azure Lab Services Retirement Scripts
 GitHub repository](https://github.com/microsoft/Azure-Lab-Services-Retirement-Scripts).



> **Note:**
> This article references features available in [lab plans](concept-lab-accounts-versus-lab-plans.md), which replaced lab accounts.


> **Note:**
> If you're using [lab accounts](concept-lab-accounts-versus-lab-plans.md), see how to [configure automatic shutdown of VMs for a lab account](how-to-configure-lab-accounts.md).

You can enable several auto-shutdown cost control features to avoid extra costs when the virtual machines aren't being used.

- Disconnect idle virtual machines.
- Shutdown virtual machines when users disconnect
- Shutdown virtual machines when users don't connect

The **disconnect idle virtual machines** has two settings.  Both settings use a VM extension to detect idle.

- **Detect idle based on user absence**.  Idle detection examines only mouse/keyboard input (user absence).
- **Detect idle based on user absence and resource usage**. Idle detection examines both mouse/keyboard input (user absence) and disk/CPU usage (resource usage). By selecting resource usage, that is, disk/CPU usage, operations such as long-running queries are accounted for.

Review more details about the auto-shutdown features in the [Maximize cost control with auto-shutdown settings](cost-management-guide.md#automatic-shutdown-settings-for-cost-control) section.

Azure Lab Services supports automatic shutdown for both Windows-based and Linux-based virtual machines. For Linux-based VMs, [support depends on the specific Linux distribution and version](#supported-linux-distributions-for-automatic-shutdown).

## Enable automatic shutdown

1. In the [Azure portal](https://portal.azure.com/), navigate to the **Lab Plan** page.
1. Select **Labs settings** on the left menu.
1. Select the auto-shutdown setting(s) that is appropriate for your scenario.  

    Automatic shutdown setting at lab plan

    The setting(s) apply to all the labs associated with the lab plan. A lab creator (educator) can override this setting at the lab level. The change to this setting at the lab plan will only affect labs that are created after the change is made.

    To disable the setting(s), uncheck the checkbox(s) on this page.

## Supported Linux distributions for automatic shutdown

Azure Lab Services supports automatic shutdown for many Linux distributions and versions. 


The following list provides the supported Linux distribution Azure Marketplace images for lab plan-based labs:

| Distribution | Azure Marketplace image |
| --- | --- |
| Debian | - Debian 11 "Bullseye"<br/>- Debian 11 "Bullseye"(Gen2) |
| Ubuntu Minimal | - Ubuntu Minimal 18.04 LTS<br/>- Ubuntu Minimal 20.04 LTS (Gen2)<br/>- Ubuntu Minimal 22.04 LTS<br/>- Ubuntu Minimal 22.04 LTS (Gen2)<br/>- Ubuntu Minimal 22.10<br/>- Ubuntu Minimal 22.10 (Gen2) |
| Ubuntu Server | - Ubuntu Server 18.04 LTS (Gen2)<br/>- Ubuntu Server 20.04 LTS<br/>- Ubuntu Server 20.04 LTS (Gen2)<br/>- Ubuntu Server 22.04<br/>- Ubuntu Server 22.04 (Gen2)<br/>- Ubuntu Server 22.10<br/>- Ubuntu Server 22.10 (Gen2) |
| Ubuntu-HPC | - Ubuntu-HPC 20.04 (Gen2) |


## Next steps

To learn about how a lab owner can configure or override this setting at the lab level, see [Configure automatic shutdown of VMs for a lab](how-to-enable-shutdown-disconnect.md)
