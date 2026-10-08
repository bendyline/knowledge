---
title: Set Up and Monitor a Direct Peering
titleSuffix: Internet Peering
description: Learn how to provision and manage a direct peering in Azure Peering Service.
ms.author: halkazwini
author: halkazwini
ms.service: internet-peering
ms.topic: how-to
ms.date: 02/25/2026

# Customer intent: As an administrator, I want to understand how to provision and manage direct peering in a cloud service, so that I can establish and maintain reliable connections for optimized network performance.
---

# Set up and monitor a direct peering

In this article, you learn how to set up and manage a direct peering in Azure Peering Service.

## Create a direct peering

Diagram showing the direct peering workflow and connection states.

To provision a direct peering:

1. Review the Microsoft [peering policy](policy.md) to understand requirements for direct peering.
1. Complete the steps in [Create or modify a direct peering](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/internet-peering/howto-direct-powershell.md) to submit a peering request.
1. After you submit a peering request, Microsoft contacts you by using your registered email address to provide a Letter of Authorization (LOA) or to provide other information.
1. When your peering request is approved, the connection state changes to **ProvisioningStarted**.

   Then, you complete these steps:

    1. Complete wiring according to the LOA.
    1. (Optional) Complete a link test by using the IP address range 169.254.0.0/16.
    1. Configure a Border Gateway Protocol (BGP) session.
    1. Notify Microsoft.

1. Microsoft provisions the BGP session with a DENY ALL policy and completes an end-to-end session validation.
1. If the provisioning is successful, you're notified that the peering connection state is **Active**.

Traffic is then allowed through the new peering.

> **Note:**
> Connection states are different from standard BGP session states.

## Convert a legacy direct peering to an Azure resource

To convert a legacy direct peering, complete the steps to [convert a legacy direct peering to an Azure resource](howto-legacy-direct-portal.md).

After you submit the conversion request, Microsoft reviews the request and contacts you if necessary.

If the request is approved, your direct peering appears with a connection state of **Active**.

## Deprovision a direct peering

To deprovision a direct peering, contact the [Microsoft peering](mailto:peering@microsoft.com) team.

When a direct peering is set to deprovision, the connection state changes to **PendingRemove**.

> **Note:**
> If you run a PowerShell cmdlet to delete a direct peering when the connection state is **ProvisioningStarted** or **ProvisioningCompleted**, the operation fails.

## Related content

- Learn about the [prerequisites to set up peering with Microsoft](prerequisites.md).
- Learn about [peering policy](policy.md).
