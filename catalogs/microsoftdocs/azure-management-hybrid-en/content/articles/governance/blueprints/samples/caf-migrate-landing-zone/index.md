---
title: CAF Migration landing zone blueprint sample overview
description: Overview and architecture of the CAF Migration landing zone blueprint sample, provided by the Microsoft Cloud Adoption Framework for Azure.
ms.date: 09/07/2023
ms.topic: sample
---
# Overview of the CAF Migration landing zone blueprint sample


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


The CAF Migration landing zone blueprint (provided by the Microsoft Cloud Adoption Framework for Azure) is a set of infrastructure to help you set up for migrating your first workload and manage your cloud estate in alignment with the Cloud Adoption Framework.

The [CAF Foundation](../caf-foundation/index.md) blueprint sample extends this sample.

## Architecture

The CAF Migration landing zone blueprint sample deploys foundation infrastructure resources in Azure that can be used by organizations to prepare their subscription for migrating virtual machines in to. It also helps put in place the governance controls necessary to manage their cloud estate. This sample will deploy and enforce resources, policies, and templates that will allow an organization to
confidently get started with Azure.

C A F Migration landing zone, image describes what gets installed as part of C A F guidance for initial landing zone.
   Describes an Azure architecture which is achieved by deploying the C A F migration blueprint. It's applicable to a subscription with resource groups which consists of an Azure virtual network, storage account for storing logs, Log Analytics configured to store in the storage account. It also depicts Azure Key Vault configured and Azure Migrate initial setup created. All these core infrastructures are accessed using Azure Active Directory.


This environment is composed of several Azure services used to provide a secure, fully monitored,
enterprise-ready governance. This environment is composed of:

- An [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/overview) instance used to host secrets   used for the Certificates, Keys, and Secrets deployed in the shared services environment
- Deploy [Log Analytics](https://learn.microsoft.com/azure/azure-monitor/overview) is deployed to ensure all actions   and services log to a central location from the moment you start your migration
- Deploy [Azure Virtual Network](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/virtual-networks-overview.md) providing an isolated network and subnets for your virtual machine.
- Deploy [Azure Migrate Project](../../../../migrate/migrate-services-overview.md) for discovery and
  assessment. We're adding the tools for Server assessment, Server migration, Database assessment, and Database migration.

All these elements abide to the proven practices published in the
[Azure Architecture Center - Reference Architectures](https://learn.microsoft.com/azure/architecture/reference-architectures/).

> **Note:**
> The CAF Migration blueprint lays out a landing zone for your workloads. You still need to perform the assessment and migration of your Virtual Machines / Databases on top of this foundational architecture.

For more information, see the [Microsoft Cloud Adoption Framework for Azure - Migrate](https://learn.microsoft.com/azure/architecture/cloud-adoption/migrate/).

## Next steps

You've reviewed the overview and architecture of the CAF Migrate landing zone blueprint sample.

> 
> [CAF Migration landing zone blueprint - Deploy steps](deploy.md)

Additional articles about blueprints and how to use them:

- Learn about the [blueprint lifecycle](../../concepts/lifecycle.md).
- Understand how to use [static and dynamic parameters](../../concepts/parameters.md).
- Learn to customize the [blueprint sequencing order](../../concepts/sequencing-order.md).
- Find out how to make use of [blueprint resource locking](../../concepts/resource-locking.md).
- Learn how to [update existing assignments](../../how-to/update-existing-assignments.md).
