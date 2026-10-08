---
title: "Storage account access"
description: Storage account access
author: ssalgadodev
manager: mcleans
ms.service: azure-ai-content-safety
ms.topic: include
ms.date: 04/12/2024
ms.author: ssalgado
---


Next, you need to give your Content Safety resource access to read from the Azure Storage resource. Enable system-assigned Managed identity for the Azure AI Content Safety instance and assign the role of **Storage Blob Data Contributor/Owner** to the identity:
> **Important:**
> **Only Storage Blob Data Contributor or Storage Blob Data Owner are valid roles to proceed.**

1. Enable managed identity for the Azure AI Content Safety instance. 

    Screenshot of Azure portal enabling managed identity.

1. Assign the role of **Storage Blob Data Contributor/Owner** to the Managed identity. Any roles highlighted below should work.

    Screenshot of the Add role assignment screen in Azure portal.

    Screenshot of assigned roles in the Azure portal.

    Screenshot of the managed identity role.
