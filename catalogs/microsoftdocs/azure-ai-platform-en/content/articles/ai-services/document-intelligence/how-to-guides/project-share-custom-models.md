---
title: "Share custom model projects using Document Intelligence Studio"
titleSuffix: Foundry Tools
description: Learn how to share custom model projects using Document Intelligence Studio.
author: laujan
manager: mcleans
ms.service: azure-document-intelligence-foundry-tools
ms.topic: how-to
ms.date: 04/11/2026
ms.author: lajanuar
monikerRange: '>=doc-intel-3.0.0'
ms.custom: sfi-image-nochange
---


# Project sharing using Document Intelligence Studio

**Applies to: doc-intel-4.0.0**

**This content applies to:** 🟩 **v4.0 (GA)** | **Previous versions:** 🟦 [**v3.1 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-3.1.0\&preserve-view=tru) 🟥 [**v3.0 (retiring)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-3.0.0\&preserve-view=tru) 🟥 [**v2.1 (retiring)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-2.1.0\&preserve-view=tru)



**Applies to: doc-intel-3.1.0**

**This content applies to:** 🟩 **v3.1 (GA)** | **Latest version:** 🟪 [**v4.0 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-4.0.0\&preserve-view=true) | **Previous versions:** 🟦 [**v3.0**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-3.0.0\&preserve-view=true) 🟦 [**v2.1**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-2.1.0\&preserve-view=true)



**Applies to: doc-intel-3.0.0**

**This content applies to:** 🟥 **v3.0 (retiring)** | **Latest versions:** 🟪 [**v4.0 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-4.0.0\&preserve-view=true) 🟪 [**v3.1 (GA)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-3.1.0\&preserve-view=true) | **Previous version:** 🟥 [**v2.1 (retiring)**](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/includes?view=doc-intel-2.1.0\&preserve-view=true)



Document Intelligence Studio is an online tool to visually explore, understand, train, and integrate features from the Document Intelligence service into your applications. Document Intelligence Studio enables project sharing feature within the custom extraction model. Projects can be shared easily via a project token. The same project token can also be used to import a project.

## Prerequisite

In order to share and import your custom projects seamlessly, both users (user who shares and user who imports) need an active [**Azure account**](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). If you don't have one, you can [**create a free account**](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn). Also, both users need to configure permissions to grant access to the Document Intelligence and storage resources.

Generally, in the process of creating a custom model project, most of the requirements should be met for project sharing. However, in cases where the project sharing feature doesn't work, check [permissions](#granted-access-and-permissions).

## Granted access and permissions

 > **Important:**
 > Custom model projects can be imported only if you have the access to the storage account that is associated with the project you are trying to import. Check your storage account permission before starting to share or import projects with others.

### Virtual networks and firewalls

If your storage account virtual network (VNet) is enabled or if there are any firewall constraints, the project can't be shared. If you want to bypass those restrictions, ensure that those settings are turned off.

A workaround is to manually create a project using the same settings as the project being shared.

## Share a custom extraction model with Document Intelligence Studio

> **Note:**
> Custom classification model projects can also be shared following the same step, starting with the following [page](https://documentintelligence.ai.azure.com/studio/document-classifier/projects). In this guide, we use custom extraction project as an example to share projects.

Follow these steps to share your project using Document Intelligence Studio:

1. Start by navigating to the [Document Intelligence Studio](https://formrecognizer.appliedai.azure.com/studio).

1. In the Studio, select the **Custom extraction models** tile, under the custom models section.

   Screenshot showing how to select a custom extraction model in the Studio.

1. On the custom extraction models page, select the desired model to share and then select the **Share** button.

   Screenshot showing how to select the desired model and select the share option.

1. On the share project dialog, copy the project token for the selected project.

Screenshot showing how to copy the project token.

## Import custom extraction model with Document Intelligence Studio

Follow these steps to import a project using Document Intelligence Studio.

1. Start by navigating to the [Document Intelligence Studio](https://formrecognizer.appliedai.azure.com/studio).

1. In the Studio, select the **Custom extraction models** tile, under the custom models section.

   Screenshot of Select custom extraction model in the Studio.

1. On the custom extraction models page, select the **Import** button.

   Screenshot of Select import within custom extraction model page.

1. On the import project dialog, paste the project token shared with you and select import.

Screenshot of Paste the project token in the dialogue.

## Next steps

> 
> [Back up and recover models](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/document-intelligence/disaster-recovery.md)
