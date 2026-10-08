---
title: View or delete your data - Custom Vision Service
titleSuffix: Foundry Tools
description: You maintain full control over your data. This article explains how you can view, export or delete your data in the Custom Vision Service.
author: PatrickFarley
manager: mcleans
#customer intent: As a user, I want to view, export, or delete my data in the Custom Vision Service so that I can maintain control over my data.

ms.service: azure-ai-custom-vision
ms.topic: how-to
ms.date: 01/29/2025
ms.author: pafarley
ms.custom: cogserv-non-critical-vision
---

# View or delete user data in Custom Vision

Custom Vision collects user data to operate the service, but customers have full control to viewing and delete their data using the Custom Vision [Training APIs](https://learn.microsoft.com/rest/api/customvision/train-project).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/gdpr-intro-sentence.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/custom-vision-service/export-delete-data.md)

To learn how to view or delete different kinds of user data in Custom Vision, see the following table:

| Data | View operation | Delete operation |
| --- | --- | --- |
| Account info (Keys) | [GetAccountInfo](https://learn.microsoft.com/rest/api/aiservices/accountmanagement/accounts/get) | Delete using Azure portal (for Azure Subscriptions). Or use **Delete Your Account** button in [CustomVision.ai](https://customvision.ai) settings page (for Microsoft Account Subscriptions) |
| Iteration details | [GetIteration](https://learn.microsoft.com/rest/api/customvision/get-iteration) | [DeleteIteration](https://learn.microsoft.com/rest/api/customvision/delete-iteration) |
| Iteration performance details | [GetIterationPerformance](https://learn.microsoft.com/rest/api/customvision/get-iteration-performance) | [DeleteIteration](https://learn.microsoft.com/rest/api/customvision/delete-iteration) |
| List of iterations | [GetIterations](https://learn.microsoft.com/rest/api/customvision/get-iterations) | [DeleteIteration](https://learn.microsoft.com/rest/api/customvision/delete-iteration) |
| Projects and project details | [GetProject](https://learn.microsoft.com/rest/api/customvision/get-project) and [GetProjects](https://learn.microsoft.com/rest/api/customvision/get-projects) | [DeleteProject](https://learn.microsoft.com/rest/api/customvision/delete-project) |
| Image tags | [GetTag](https://learn.microsoft.com/rest/api/customvision/get-tag) and [GetTags](https://learn.microsoft.com/rest/api/customvision/get-tags) | [DeleteTag](https://learn.microsoft.com/rest/api/customvision/delete-tag) |
| Images | [GetTaggedImages](https://learn.microsoft.com/rest/api/customvision/get-tagged-images) (provides uri for image download) and [GetUntaggedImages](https://learn.microsoft.com/rest/api/customvision/get-untagged-images) (provides uri for image download) | [DeleteImages](https://learn.microsoft.com/rest/api/customvision/delete-images) |
| Exported iterations | [GetExports](https://learn.microsoft.com/rest/api/customvision/get-exports) | Deleted upon account deletion |
