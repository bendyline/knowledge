---
title: Remediate noncompliant Azure Automation State Configuration servers
description: This article tells how to reapply configurations on demand to servers that are no longer compliant.
services: automation
ms.service: azure-automation
ms.subservice: desired-state-config
ms.custom: linux-related-content
ms.topic: how-to
ms.date: 11/17/2025
ms.author: v-rochak2
author: RochakSingh-blr
---

# Remediate noncompliant Azure Automation State Configuration servers


> **Note:**
> Azure Automation State Configuration will be retired on September 30, 2027, please transition to
> [Azure Machine Configuration][azmc] by that date. For more information, see the [blog post][blog]
> announcement. The Azure Machine Configuration service combines features of DSC Extension, Azure
> Automation State Configuration, and the most commonly requested features from customer feedback.
> Azure Machine Configuration also includes hybrid machine support through
> [Arc-enabled servers][arc].

> **Important:**
> The **Add**, **Compose configuration**, and **Gallery** navigation links will be removed from the
> portal on March 31, 2025.

<!-- link references -->
[blog]: https://azure.microsoft.com/updates/v2/Planned-Service-Retirement-Azure-Automation-State-Configuration-16-September-2027
[azmc]: https://learn.microsoft.com/azure/governance/machine-configuration/overview
[arc]: https://learn.microsoft.com/azure/azure-arc/servers/overview



> **Caution:**
> Azure Automation DSC for Linux has retired on 30 September 2023. For more information, see the [announcement](https://azure.microsoft.com/updates/migrate-from-linux-dsc-extension-to-the-guest-configuration-feature-of-azure-policy-by-may-1-2025/#:~:text=The%20DSC%20extension%20for%20Linux%20machines%20in%20Azure%2C,no%20longer%20be%20supported%20after%2030%20September%202023.).

When servers are registered with Azure Automation State Configuration, the configuration mode is set
to `ApplyOnly`, `ApplyAndMonitor`, or `ApplyAndAutoCorrect`. If the mode isn't set to
`ApplyAndAutoCorrect`, servers that drift from a compliant state for any reason remain noncompliant
until they're manually corrected.

Azure compute offers a feature named **Run Command** that allows customers to run scripts inside
virtual machines. This document provides example scripts for this feature when manually correcting
configuration drift.

## Correct drift of Windows virtual machines using PowerShell

You can correct drift of Windows virtual machines using the **Run** command feature. See
[Run PowerShell scripts in your Windows VM with Run command][01].

To force an Azure Automation State Configuration node to download the latest configuration and apply
it, use the [Update-DscConfiguration][03] cmdlet.

```powershell
Update-DscConfiguration -Wait -Verbose
```

## Correct drift of Linux virtual machines

For Linux virtual machines, you don't have the option of using the **Run** command. You can only
correct drift for these machines by repeating the registration process.

For Azure nodes, you can correct drift from the Azure portal or using Az module cmdlets. Details
about this process are documented in [Enable a VM using Azure portal][05].

For hybrid nodes, you can correct drift using the Python scripts. See
[Performing DSC operations from the Linux computer][06].

## Next steps

- For a PowerShell cmdlet reference, see [Az.Automation][02].
- To see an example of using Azure Automation State Configuration in a continuous deployment
  pipeline, see [Setup continuous deployment with Chocolatey][04].

<!-- link references -->
[01]: https://learn.microsoft.com/azure/virtual-machines/windows/run-command
[02]: https://learn.microsoft.com/powershell/module/az.automation/#automation
[03]: https://learn.microsoft.com/powershell/module/psdesiredstateconfiguration/update-dscconfiguration
[04]: automation-dsc-cd-chocolatey.md
[05]: automation-dsc-onboarding.md#enable-a-vm-using-azure-portal
[06]: https://github.com/Microsoft/PowerShell-DSC-for-Linux#performing-dsc-operations-from-the-linux-computer
