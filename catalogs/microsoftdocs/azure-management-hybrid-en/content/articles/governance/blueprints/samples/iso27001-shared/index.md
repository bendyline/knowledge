---
title: ISO 27001 Shared Services blueprint sample overview
description: Overview and architecture of the ISO 27001 Shared Services blueprint sample. This blueprint sample helps customers assess specific ISO 27001 controls.
ms.date: 09/07/2023
ms.topic: sample
---
# Overview of the ISO 27001 Shared Services blueprint sample


> **Important:**
> Azure Blueprints (Preview) will be **retired on January 31, 2027**, with a phased retirement
> beginning July 31, 2026. Migrate your existing blueprint definitions and assignments to
> [Deployment Stacks](../../../../azure-resource-manager/bicep/deployment-stacks.md) (recommended)
> and [Template Specs](../../../../azure-resource-manager/bicep/template-specs.md). Blueprint
> artifacts are converted to ARM JSON templates or Bicep files used to define deployment stacks.
> For the full phased timeline, impact, and FAQ, see
> [Azure Blueprints retirement](../../blueprint-retirement.md) or
> <https://aka.ms/AzureBlueprintsRetirement>. To learn how to author an artifact as an ARM
> resource, see:
>
> - [Policy](https://learn.microsoft.com/azure/templates/microsoft.authorization/policyassignments?pivots=deployment-language-bicep)
> - [RBAC](https://learn.microsoft.com/azure/templates/microsoft.authorization/roleassignments?pivots=deployment-language-bicep)
> - [Deployments](https://learn.microsoft.com/azure/templates/microsoft.resources/deployments?pivots=deployment-language-bicep)


The ISO 27001 Shared Services blueprint sample provides a set of compliant infrastructure patterns
and policy guardrails that help toward ISO 27001 attestation. This blueprint helps customers deploy
cloud-based architectures that offer solutions to scenarios that have accreditation or compliance
requirements.

The [ISO 27001 App Service Environment/SQL Database workload](../iso27001-ase-sql-workload/index.md) blueprint sample extends this sample.

## Architecture

The ISO 27001 Shared Services blueprint sample deploys a foundation infrastructure in Azure that can
be used by organizations to host multiple workloads based on the Virtual Datacenter (VDC) approach.
VDC is a proven set of reference architectures, automation tooling, and engagement model used by
Microsoft with its largest enterprise customers. The Shared Services blueprint sample is based on a
fully native Azure VDC environment shown below.

ISO 27001 Shared Services blueprint sample design

This environment is composed of several Azure services used to provide a secure, fully monitored,
enterprise-ready shared services infrastructure based on ISO 27001 standards. This environment is
composed of:

- [Azure roles](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/overview.md) used
  for segregation of duties from a control plane perspective. Three roles are defined before
  deployment of any infrastructure:
  - NetOps role has the rights to manage the network environment, including firewall settings, NSG
    settings, routing, and other networking functionality
  - SecOps role has the necessary rights to deploy and manage
    [Azure Security Center](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/security-center/security-center-introduction.md), define
    [Azure Policy](../../../policy/overview.md) definitions, and other security-related rights
  - SysOps role has the necessary rights to define [Azure Policy](../../../policy/overview.md)
    definitions within the subscription, manage
    [Log Analytics](https://learn.microsoft.com/azure/azure-monitor/overview) for the entire environment, among other
    operational rights
- [Log Analytics](https://learn.microsoft.com/azure/azure-monitor/overview) is deployed as the first Azure service to
  ensure all actions and services log to a central location from the moment you start your secure
  deployment
- A virtual network supporting subnets for connectivity back to an on-premises datacenter, an
  ingress and egress stack for Internet connectivity, and a shared service subnet using NSGs and
  ASGs for full micro-segmentation containing:
  - A jumpbox or bastion host used for management purposes, which can only be accessed over an
    [Azure Firewall](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firewall/overview.md) deployed in the ingress stack subnet
  - Two virtual machines running Azure Active Directory Domain Services (Azure AD DS) and DNS only
    accessible through the jumpbox and can be configured only to replicate AD over a VPN or
    [ExpressRoute](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/expressroute/expressroute-introduction.md) connection (not deployed
    by the blueprint)
  - Use of [Azure Net Watcher](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/network-watcher/network-watcher-monitoring-overview.md)
    and standard DDoS protection
- An [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview) instance used to host secrets used
  for the VMs deployed in the shared services environment

All these elements abide to the proven practices published in the
[Azure Architecture Center - Reference Architectures](https://learn.microsoft.com/azure/architecture/reference-architectures/).

> **Note:**
> The ISO 27001 Shared Services infrastructure lays out a foundational architecture for workloads.
> You still need to deploy workloads behind this foundational architecture.

For more information, see the [Virtual Datacenter documentation](https://learn.microsoft.com/azure/architecture/vdc/).

## Next steps

You've reviewed the overview and architecture of the ISO 27001 Shared Services blueprint sample.
Next, visit the following articles to learn about the control mapping and how to deploy this sample:

> 
> [ISO 27001 Shared Services blueprint - Control mapping](control-mapping.md)
> [ISO 27001 Shared Services blueprint - Deploy steps](deploy.md)

Additional articles about blueprints and how to use them:

- Learn about the [blueprint lifecycle](../../concepts/lifecycle.md).
- Understand how to use [static and dynamic parameters](../../concepts/parameters.md).
- Learn to customize the [blueprint sequencing order](../../concepts/sequencing-order.md).
- Find out how to make use of [blueprint resource locking](../../concepts/resource-locking.md).
- Learn how to [update existing assignments](../../how-to/update-existing-assignments.md).
