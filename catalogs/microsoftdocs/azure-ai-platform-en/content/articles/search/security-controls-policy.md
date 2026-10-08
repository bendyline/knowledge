---
title: Azure Policy Regulatory Compliance Controls
description: Lists Azure Policy Regulatory Compliance controls available for Azure AI Search. These built-in policy definitions provide common approaches to managing the compliance of your Azure resources.
ms.date: 02/27/2026
ms.update-cycle: 365-days
ms.topic: concept-article
ms.service: azure-ai-search
ms.custom:
  - subject-policy-compliancecontrols
  - ignite-2023
---
# Azure Policy Regulatory Compliance controls for Azure AI Search


> **Note:**
> Azure AI Search is available through the [Azure portal](https://portal.azure.com), [REST APIs](https://learn.microsoft.com/azure/search/search-api-versions#rest-apis), and [Azure SDKs](https://learn.microsoft.com/azure/search/search-api-versions#all-azure-sdks). It also underpins [Foundry IQ](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq), the managed knowledge layer that transforms enterprise content into reusable, permission-aware knowledge bases for agents in the [Microsoft Foundry portal](https://ai.azure.com/?cid=learnDocs).


If you're using [Azure Policy](https://learn.microsoft.com/azure/governance/policy/overview) to enforce the recommendations in
[Microsoft cloud security benchmark](https://learn.microsoft.com/azure/security/benchmarks/introduction), then you probably already know
that you can create policies for identifying and fixing noncompliant services. These policies might
be custom, or they might be based on built-in definitions that provide compliance criteria and
appropriate solutions for well-understood best practices.

For Azure AI Search, there's currently one built-definition, listed below, that you can use
in a policy assignment. The built-in is for logging and monitoring. By using this built-in
definition in a [policy that you create](https://learn.microsoft.com/azure/governance/policy/assign-policy-portal), the system
scans for search services that don't have [resource logging](monitor-azure-cognitive-search.md), and
then enable it accordingly.

[Regulatory Compliance in Azure Policy](https://learn.microsoft.com/azure/governance/policy/concepts/regulatory-compliance)
provides Microsoft-created and managed initiative definitions, known as _built-ins_, for the
**compliance domains** and **security controls** related to different compliance standards. This
page lists the **compliance domains** and **security controls** for Azure AI Search. You can
assign the built-ins for a **security control** individually to help make your Azure resources
compliant with the specific standard.

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/policy/standards/intro-warning.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/search/security-controls-policy.md)

[Include unavailable in this source snapshot: ~/azure-policy-autogen-docs/includes/policy/standards/byrp/microsoft.search.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/search/security-controls-policy.md)

## Next steps

- Learn more about [Azure Policy Regulatory Compliance](https://learn.microsoft.com/azure/governance/policy/concepts/regulatory-compliance).
- See the built-ins on the [Azure Policy GitHub repo](https://github.com/Azure/azure-policy).
