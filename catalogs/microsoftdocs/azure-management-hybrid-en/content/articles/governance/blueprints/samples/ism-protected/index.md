---
title: Australian Government ISM PROTECTED blueprint sample overview
description: Overview of the Australian Government ISM PROTECTED blueprint sample. This blueprint sample helps customers assess specific ISM PROTECTED controls.
ms.date: 09/07/2023
ms.topic: sample
---
# Overview of the Australian Government ISM PROTECTED blueprint sample


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


ISM Governance blueprint sample provides a set of governance guardrails using
[Azure Policy](../../../policy/overview.md) which help toward ISM PROTECTED attestation (Feb 2020
version). This Blueprint helps customers deploy a core set of policies for any Azure-deployed
architecture requiring accreditation or compliance with the ISM framework.

## Control mapping

The control mapping section provides details on policies included within this blueprint and how
these policies address various controls in ISM PROTECTED. When assigned to an architecture,
resources are evaluated by Azure Policy for non-compliance with assigned policies. For more
information, see [Azure Policy](../../../policy/overview.md).

## Next steps

You've reviewed the overview and of the ISM PROTECTED blueprint sample. Next, visit the following
articles to learn about the control mapping and how to deploy this sample:

> 
> [ISM PROTECTED blueprint - Control mapping](control-mapping.md)
> [ISM PROTECTED blueprint - Deploy steps](deploy.md)

Addition articles about blueprints and how to use them:

- Learn about the [blueprint lifecycle](../../concepts/lifecycle.md).
- Understand how to use [static and dynamic parameters](../../concepts/parameters.md).
- Learn to customize the [blueprint sequencing order](../../concepts/sequencing-order.md).
- Find out how to make use of [blueprint resource locking](../../concepts/resource-locking.md).
- Learn how to [update existing assignments](../../how-to/update-existing-assignments.md).
