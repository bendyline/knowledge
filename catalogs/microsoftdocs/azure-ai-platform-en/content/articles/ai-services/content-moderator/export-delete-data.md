---
title: Export or delete user data - Content Moderator
titleSuffix: Azure AI services
description: You have full control over your data. Learn how to view, export or delete your data in Content Moderator.
author: PatrickFarley
manager: mcleans
ms.service: azure-content-moderator
ms.topic: how-to
ms.date: 06/12/2025
ms.author: pafarley
---

# Export or delete user data in Content Moderator



> **Important:**
> Azure Content Moderator is deprecated as of February 2024 and will be retired on March 15, 2027. It is replaced by [Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/overview), which offers advanced AI features and enhanced performance.
>
> Azure AI Content Safety is a comprehensive solution designed to detect harmful user-generated and AI-generated content in applications and services. Azure AI Content Safety is suitable for many scenarios such as online marketplaces, gaming companies, social messaging platforms, enterprise media companies, and K-12 education solution providers. Here's an overview of its features and capabilities:
> 
> - **Text and Image Detection APIs**: Scan text and images for sexual content, violence, hate, and self-harm with multiple severity levels.
> - **Content Safety Studio**: An online tool designed to handle potentially offensive, risky, or undesirable content using our latest content moderation ML models. It provides templates and customized workflows that enable users to build their own content moderation systems.
> - **Language support**: Azure AI Content Safety supports more than 100 languages and is specifically trained on English, German, Japanese, Spanish, French, Italian, Portuguese, and Chinese.
>
> Azure AI Content Safety provides a robust and flexible solution for your content moderation needs. By switching from Content Moderator to Azure AI Content Safety, you can take advantage of the latest tools and technologies to ensure that your content is always moderated to your exact specifications.
>
> [Learn more about Azure AI Content Safety](https://learn.microsoft.com/azure/ai-services/content-safety/overview) and explore how it can elevate your content moderation strategy.

Content Moderator collects user data to operate the service, but customers have full control to view, export, and delete their data using the [Moderation APIs](api-reference.md).

[Include unavailable in this source snapshot: ~/reusable-content/ce-skilling/azure/includes/gdpr-intro-sentence.md](https://github.com/MicrosoftDocs/azure-ai-docs/blob/766e4b444667054247ad440e9c5a418efa71c050/articles/ai-services/content-moderator/export-delete-data.md)

For more information on how to export and delete user data in Content Moderator, see the following table.

| Data | Export Operation | Delete Operation |
| --- | --- | --- |
| Account Info (Subscription Keys) | N/A | Delete using the Azure portal (Azure Subscriptions). |
| Images for custom matching | Call the [Get image IDs API](https://learn.microsoft.com/rest/api/cognitiveservices/contentmoderator/list-management-image/get-all-image-ids). Images are stored in a one-way proprietary hash format, and there is no way to extract the actual images. | Call the [Delete all Images API](https://learn.microsoft.com/rest/api/cognitiveservices/contentmoderator/list-management-image/delete-all-images). Or delete the Content Moderator resource using the Azure portal. |
| Terms for custom matching | Cal the [Get all terms API](https://learn.microsoft.com/rest/api/cognitiveservices/contentmoderator/list-management-term/get-all-terms) | Call the [Delete all terms API](https://learn.microsoft.com/rest/api/cognitiveservices/contentmoderator/list-management-term/delete-all-terms). Or delete the Content Moderator resource using the Azure portal. |
