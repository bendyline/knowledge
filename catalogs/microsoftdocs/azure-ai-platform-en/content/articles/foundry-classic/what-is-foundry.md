---
title: "What is Microsoft Foundry (classic) portal"
description: "Microsoft Foundry is a trusted platform that empowers developers to drive innovation and shape the future with AI in a safe, secure, and responsible way. (classic)"
author: sdgilley
ms.author: sgilley
ms.reviewer: sgilley
ms.date: 04/13/2026
ms.service: microsoft-foundry
ms.subservice: foundry-platform
ms.topic: overview
ai-usage: ai-assisted
ms.custom:
  - classic-and-new
  - ignite-2023
  - build-2024
  - ignite-2024
  - build-aifnd
  - build-2025
keywords:
  - Foundry Tools
  - cognitive
# customer intent: As a developer, I want to understand what Microsoft Foundry is so that I can use it to build AI applications.
ROBOTS: NOINDEX, NOFOLLOW
---

# What is Microsoft Foundry (classic) portal?

This article covers the **Foundry (classic)** portal and APIs. For the current platform experience, see [What is Microsoft Foundry?](../foundry/what-is-foundry.md).


## Microsoft Foundry portals

There are two different portals for you to use to interact with Microsoft Foundry. A toggle in the portal banner allows you to switch between the two versions.

| Portal | Banner&nbsp;display | When to use |
| --- | --- | --- |
| Microsoft Foundry (classic) |  | Choose this portal when working with multiple resource types: Azure OpenAI, Foundry resources, hub-based projects, or Foundry projects. |
| Microsoft Foundry (new) |  | Choose this portal for a seamless experience that combines simplicity with powerful and secure tools to build, manage and grow multi-agent applications. Only Foundry projects are visible here - use (classic) for all other resource types. |

> **Tip:**
> All links to [Microsoft Foundry](https://ai.azure.com/?cid=learnDocs) open whichever version you last used.




## Evolution of Foundry

Foundry consolidates several previous Azure AI services and tools into a unified platform. For detailed guidance on transitioning, see [Navigate from classic to the new experience](../foundry/how-to/navigate-from-classic.md).

<details>
<summary>Previous concepts and their current equivalents</summary>

| Dimension | Previous | Current |
| --- | --- | --- |
| Brand | Azure AI Studio / Azure AI Foundry | Microsoft Foundry |
| Brand | Azure AI Services | Foundry Tools |
| Portal | [Foundry (classic)](https://learn.microsoft.com/azure/foundry-classic/) | [Foundry](https://learn.microsoft.com/azure/foundry) |
| Agent API | Assistants API (Agents v0.5/v1) | Responses API (Agents v2) |
| API versioning | Monthly `api-version` params | v1 stable routes (`/openai/v1/`) |
| Resource model | Hub + Azure OpenAI + Azure AI Services | Foundry resource (single, with projects) |
| SDKs & endpoints | Multiple packages (`azure-ai-inference`, `azure-ai-generative`, `azure-ai-ml`, `AzureOpenAI()`) against 5+ endpoints | Unified project client (`azure-ai-projects` 2.x) + `OpenAI()` against one project endpoint. |
| Terminology | Threads, Messages, Runs, Assistants | Conversations, Items, Responses, Agent Versions |

</details>

## Microsoft Foundry API and SDKs

The [Microsoft Foundry API](https://learn.microsoft.com/rest/api/microsoft-foundry/) is designed specifically for building agentic applications and provides a consistent contract for working across different model providers. The API is complemented by SDKs to make it easy to integrate AI capabilities into your applications. [SDK Client libraries](how-to/develop/sdk-overview.md) are available for:

- Python
- C#
- JavaScript/TypeScript (preview)
- Java (preview)

The [Microsoft Foundry for VS Code Extension](how-to/develop/get-started-projects-vs-code.md) helps you explore models and develop agents directly in your development environment.

## Foundry (classic) portal


[Microsoft Foundry](https://ai.azure.com/?cid=learnDocs)
 (classic) portal supports hub-based projects, Foundry projects, and Azure OpenAI resources. Use the classic portal when you need features not yet available in the current portal, such as prompt flow or managed compute model deployments.

The Foundry (classic) portal provides access to all resource types, including hub-based projects, Foundry projects, and Azure OpenAI resources. To use the classic portal, turn off the **New Foundry** toggle in the portal banner.

Screenshot of New Foundry toggle in the banner turned off for Foundry (classic) portal.

### Work in a Foundry project

A Foundry project is where you do most of your development work. You can work with your project in the Foundry portal, or use the SDK in your preferred development environment.

 Foundry projects provide developers with self-serve capabilities to independently create new environments for exploring ideas and building prototypes, while managing data in isolation. Projects act as secure units of isolation and collaboration where agents share file storage, thread storage (conversation history), and search indexes. You can also bring your own Azure resources for compliance and control over sensitive data.

### Disable preview features

Use your organization controls to limit production environments to general availability supported capabilities, and validate current feature status before rollout decisions. For guidance on hiding preview features with tags or blocking them with custom RBAC roles, see [Disable preview features in Microsoft Foundry](../foundry/how-to/disable-preview-features.md).

### Navigate in the Foundry (classic) portal

In the Foundry (classic) portal, you can navigate among all your resources using the breadcrumbs at the top of the page. The breadcrumbs show recent resources, along with a link to all resources. 

The left pane is organized around your goals. Generally, as you develop with Azure AI, you'll likely go through a few distinct stages of project development:

* **Define and explore**. In this stage you define your project goals, and then explore and test models and services against your use case to find the ones that enable you to achieve your goals.
* **Build and customize**. In this stage, you're actively building solutions and applications with the models, tools, and capabilities you selected. You can also customize models to perform better for your use case by fine-tuning, grounding in your data, and more. Building and customizing might be something you choose to do in the Foundry portal, or through code and the Foundry SDKs. Either way, a project provides you with everything you need.
  * Once you're actively developing in your project, the **Overview** page shows the things you want easy access to, like your endpoints and keys.
* **Observe and improve**. In this stage, you're looking for where you can improve your application's performance. You might choose to use tools like tracing to debug your application or compare evaluations to hone in on how you want your application to behave. You can also integrate with safety & security systems so you can be confident when you take your application to production.

If you're an admin, or leading a development team, and need to manage the team's resources, project access, quota, and more, you can do that in the Management Center.
 
### Customize the left pane

The left pane of the Foundry (classic) portal is your main navigation tool. Customize this area to show the parts of the portal you want to use.

Pin or unpin items into the left pane. When you unpin an item, it's hidden from the left pane but can be found again in the **...More** menu.

* Select **... More** at the bottom of the pane to see items to pin and unpin.
* Customize each project separately. The left pane isn't shared across projects.
* The left pane isn't shared across users. Each user customizes their own left pane for each project. 

### Management center

The management center is a part of the Foundry (classic) portal that streamlines governance and management activities. In the management center, you can view and manage:

- Projects and resources
- Quotas and usage metrics
- Govern access and permissions

For more information, see [Management center overview](concepts/management-center.md).


## Types of projects

Microsoft Foundry (classic) supports two types of projects: a **
hub-based project** and a **
Foundry project**. In most cases, you want to use a 
Foundry project.

- 

A **Foundry project** is managed under a Microsoft Foundry resource. It's a container for access management, data upload and integration, and monitoring. This lets you keep your work separated between use cases without needing to create extra Azure resources.


- 

A **hub-based project** is hosted by a [Microsoft Foundry hub](concepts/ai-resources.md). If your company has an administrative team that created a hub for you, you can create a project from that hub. If you're working on your own, you can create a project and a default hub is automatically be created for you.

- To understand how the newer 
Foundry project differs from the 
hub-based project, see [New Foundry projects overview](how-to/migrate-project.md#new-foundry-projects-overview).

### Which type of project do I need?

- In general, you should use a 
Foundry project if you're looking to build agents or work with models.
- Use a 
hub-based project when you need features that aren't available in a 
Foundry project. See the following table for more on feature availability.

> **Note:**
> New agents and model-centric capabilities are only available on 
Foundry projects, including access to the Foundry API and Foundry Agent Service in general availability. To migrate your 
hub-based project to a 
Foundry project, see [Migrate from hub-based to Foundry projects](how-to/migrate-project.md).

This table summarizes features available in the two project types:  

| Capability | 
Foundry project | 
hub-based project |
| --- | --- | --- |
| Agents | ✅ (GA) | ✅ (Preview only) |
| Foundry Models sold by Azure - Azure OpenAI, DeepSeek, xAI, etc. | ✅ | Available via connections |
| Partner & Community Models sold through Marketplace - Stability, Cohere, etc. | ✅ | Available via connections |
| Models deployed on managed compute (e.g. HuggingFace) | | ✅ |
| Foundry SDK and API | ✅ | Limited* |
| OpenAI SDK and API | ✅ | Available via connections |
| Evaluations | ✅ (preview) | ✅ |
| Playgrounds | ✅ | ✅ |
| Content understanding | ✅ | ✅ |
| Azure Language resource | | ✅ |
| Model router | ✅ | ✅ |
| Datasets | ✅ | ✅ |
| Indexes | ✅ | ✅ |
| Project files API (Foundry-managed storage) | ✅ | Limited |
| Project-level isolation of files and outputs | ✅ | Limited |
| Bring-your-own Key Vault to store connection secrets | ✅ | ✅ |
| Bring-your-own Storage for Agent service | ✅ | ✅ |
| Prompt flow | | ✅ |

*New feature enhancements primarily land on the [Microsoft Foundry resource type](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-foundry/concepts/resource-types.md). [Migrate from hub-based to Foundry projects (classic)](how-to/migrate-project.md).

### How do I know which type of project I have?

Here are some of the ways to identify your project type:

* From the **breadcrumb navigation** section

    * A 
Foundry project displays **(Foundry)** on the second line
    * A 
hub-based project displays **(Hub)** on the second line

    Screenshot shows both a Foundry and hub-based project in the breadcrumb navigation.

* From the **All resources** page

    * A 
Foundry project displays **(Foundry)** as the parent resource
    * A 
hub-based project displays **(Hub)** as the parent resource

    Screenshot shows both a Foundry and hub-based project in the All Resources page.

## Pricing and billing

Microsoft Foundry is monetized through individual products customers access and consume in the platform, including API and models, complete AI toolchain, and responsible AI and enterprise grade production at scale products. Each product has its own billing model and price. 

The platform is free to use and explore. Pricing occurs at the deployment level. 

Using Foundry also incurs costs associated with the underlying services. To learn more, read [Plan and manage costs for Foundry Tools](concepts/manage-costs.md).

## Region availability

Foundry is available in most regions where Foundry Tools are available. For more information, see [region support for Microsoft Foundry](reference/region-support.md).

## How to get access

You can [explore Foundry  (classic) portal (including the model catalog)](concepts/foundry-models-overview.md) without signing in. 

But for full functionality, you need an [Azure account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). 

## Related content

- [Quickstart: Get started with Microsoft Foundry](quickstarts/get-started-code.md)
- [Create a project](how-to/create-projects.md)
- [Get started with an AI template](how-to/develop/ai-template-get-started.md)
- [What's new in Microsoft Foundry documentation?](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/foundry-classic/whats-new-foundry.md)
