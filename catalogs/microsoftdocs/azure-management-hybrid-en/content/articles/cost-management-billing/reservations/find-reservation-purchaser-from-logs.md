---
title: Find a reservation purchaser from Azure Monitor logs
description: This article helps find a reservation purchaser with information from Azure Monitor logs.
author: pri-mittal
ms.reviewer: primittal
ms.service: cost-management-billing
ms.subservice: reservations
ms.topic: troubleshooting
ms.date: 07/17/2026
ms.author: primittal
ms.custom: sfi-image-nochange
---

# Find a reservation purchaser from Azure logs

This article helps find a reservation purchaser with information from your directory logs. The directory logs from Azure Monitor shows the email IDs of users that made reservation purchases.

## Find the purchaser

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Navigate to **Monitor** > **Activity Log** > **Activity**.  
    Screenshot showing navigation to Activity log - Activity.
1. Select **Directory Activity**. If you see a message stating *You need permission to view directory-level logs*, select the [link](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/role-based-access-control/elevate-access-global-admin.md) to learn how to get permissions.  
    Screenshot showing Directory Activity without permission to view the log.
1. Once you have permission, filter **Tenant Resource Provider** with **Microsoft.Capacity**. You should see all reservation-related events for the selected time span. If needed, change the time span.  
    Screenshot showing the user that purchased the reservation.
    If necessary, you might need to **Edit columns** to select **Event initiated by**.
    The user who made the reservation purchase is shown under **Event initiated by**.

## Next steps

- If needed, billing administrators can [take ownership of a reservation](view-reservations.md#view-and-manage-reservations).
