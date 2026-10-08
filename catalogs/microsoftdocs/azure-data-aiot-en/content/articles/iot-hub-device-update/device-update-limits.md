---
title: Azure Device Update for IoT Hub limits | Microsoft Docs
description: Understand key limits for Azure Device Update for IoT Hub.
author: sethmanheim
ms.author: sethm
ms.date: 01/21/2025
ms.topic: limits-and-quotas
ms.service: azure-iot-hub
ms.subservice: device-update
---

# Azure Device Update for IoT Hub limits

This article provides an overview of the various limits imposed on the Azure Device Update for IoT Hub resource and its associated operations. The article also indicates whether the Standard SKU limits are adjustable by contacting Microsoft Support.

## General availability limits

The following tables describe the limits for the Device Update service for the Standard and Free tiers. 


Limits can be adjusted only for the Standard SKU. Limit adjustment requests are evaluated on a case-by-case basis, and approvals aren't guaranteed.

Limit adjustment requests aren't accepted for the Free SKU. Also, Free SKU instances can't be upgraded to Standard SKU instances.

The following table shows the limits for the Device Update for IoT Hub resource in Azure Resource Manager.

| Resource | Standard SKU limit | Free SKU limit | Adjustable for Standard SKU? |
| --- | --- | --- | --- |
| Accounts per subscription | 50 | 1 | No |
| Instances per account | 50 | 1 | No |
| Length of account name | 3-24 characters | 3-24 characters | No |
| Length of instance name | 3-36 characters | 3-36 characters | No |

The following table shows the limits associated with various Device Update operations.

| Operation | Standard SKU limit | Free SKU limit | Adjustable for Standard SKU? |
| --- | --- | --- | --- |
| Number of devices per instance | 1 million | 10 | Yes |
| Number of device groups per instance | 100 | 10 | Yes |
| Number of device classes per instance | 80 | 10 | Yes |
| Number of active deployments per instance | 50, including one reserved for cancellations | 5, including one reserved for cancellations | Yes |
| Number of total deployments per instance, including all active, inactive, and canceled deployments that aren't deleted | 100 | 20 | No |
| Number of update providers per instance | 25 | 2 | No |
| Number of update names per provider per instance | 25 | 2 | No |
| Number of update versions per update provider and name per instance | 100 | 5 | No |
| Total number of updates per instance | 100 | 10 | No |
| Maximum single update file size | 2 GB | 2 GB | Yes |
| Maximum combined size of all files in a single import action | 2 GB | 2 GB | Yes |
| Maximum number of files in a single update | 10 | 10 | No |
| Total data storage included per instance | 100 GB | 5 GB | No |

> **Note:**
> Canceled or inactive deployments count toward your total deployment limit. Make sure to clean up these deployments periodically so you aren't prevented from creating new deployments.


## Requirements for large-file downloads

To deploy large-file packages with file sizes larger than 100 MB, it's best to use byte range requests for reliable download performance. Device Update uses Content Delivery Networks (CDNs) that work optimally with range requests of 1 MB in size. Range requests larger than 100 MB aren't supported.

## Throttling limits

The following table shows the enforced throttles for operations in all Device Update tiers. Values apply to each individual Device Update instance.

| Device Update service API | Throttling rate |
| --- | --- |
| GetGroups | 30/min |
| GetGroupDetails | 30/min |
| GetBestUpdates per group | 30/min |
| GetUpdateCompliance per group | 30/min |
| GetAllUpdateCompliance | 30/min |
| GetSubgroupUpdateCompliance | 30/min |
| GetSubgroupBestUpdates | 30/min |
| CreateOrUpdateDeployment | 6/min |
| DeleteDeployment | 6/min |
| ProcessSubgroupDeployment | 6/min |
| Delete Update | 510/min* |
| Get File | 510/min* |
| Get Operation Status | 510/min* |
| Get Update | 510/min* |
| Import Update | 510/min* |
| List Files | 510/min* |
| List Names | 510/min* |
| List Providers | 510/min* |
| List Updates | 510/min* |
| List Versions | 510/min* |
| List Operation Statuses | 50/min |

\*The number of calls per minute is shared across all the listed operations.

Also, the number of concurrent asynchronous import and delete operations is limited to 10 total operation jobs.

## Related content

- [Create a Device Update account](create-device-update-account.md)
- [Troubleshoot common Device Update issues](troubleshoot-device-update.md)
