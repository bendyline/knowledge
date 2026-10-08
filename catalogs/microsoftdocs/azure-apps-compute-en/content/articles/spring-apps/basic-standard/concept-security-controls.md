---
title: Security Controls for Azure Spring Apps Service
description: Use security controls built in into Azure Spring Apps Service.
author: KarlErickson
ms.author: karler
ms.service: azure-spring-apps
ms.topic: reference
ms.date: 08/19/2025
ms.update-cycle: 1095-days
ms.custom: devx-track-java
---

# Security controls for Azure Spring Apps Service


> **Note:**
> The **Basic**, **Standard**, and **Enterprise** plans entered a retirement period on March 17, 2025. For more information, see the [Azure Spring Apps retirement announcement](retirement-announcement.md).


**This article applies to:** ✅ Basic/Standard ✅ Enterprise

Security controls are built into Azure Spring Apps Service.

A security control is a quality or feature of an Azure service that contributes to the service's ability to prevent, detect, and respond to security vulnerabilities.  For each control, we use *Yes* or *No* to indicate whether it is currently in place for the service.  We use *N/A* for a control that is not applicable to the service.

**Data protection security controls**

| Security control | Yes/No | Notes | Documentation |
| :--- | :--- | :--- | :--- |
| Server-side encryption at rest: Microsoft-managed keys | Yes | User uploaded source and artifacts, config server settings, app settings, and data in persistent storage are stored in Azure Storage, which automatically encrypts the content at rest.<br><br>Config server cache, runtime binaries built from uploaded source, and application logs during the application lifetime are saved to Azure managed disk, which automatically encrypts the content at rest.<br><br>Container images built from user uploaded source are saved in Azure Container Registry, which automatically encrypts the image content at rest. | [Azure Storage encryption for data at rest](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/storage/common/storage-service-encryption.md)<br><br>[Server-side encryption of Azure managed disks](https://learn.microsoft.com/azure/virtual-machines/disk-encryption)<br><br>[Container image storage in Azure Container Registry](https://learn.microsoft.com/azure/container-registry/container-registry-storage) |
| Encryption in transient | Yes | User app public endpoints use HTTPS for inbound traffic by default. |  |
| API calls encrypted | Yes | Management calls to configure Azure Spring Apps service occur via Azure Resource Manager calls over HTTPS. | [Azure Resource Manager](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/azure-resource-manager/index.yml) |
| Customer Lockbox | Yes | Provide Microsoft with access to relevant customer data during support scenarios. | [Customer Lockbox for Microsoft Azure](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/security/fundamentals/customer-lockbox-overview.md) |

**Network access security controls**

| Security control | Yes/No | Notes | Documentation |
| :--- | :--- | :--- | :--- |
| Service Tag | Yes | Use **AzureSpringCloud** service tag to define outbound network access controls on [network security groups](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/network-security-groups-overview.md#security-rules) or [Azure Firewall](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/firewall/service-tags.md), to allow traffic to applications in Azure Spring Apps. | [Service tags](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/virtual-network/service-tags-overview.md) |

## Next steps

* [Quickstart: Deploy your first Spring Boot app in Azure Spring Apps](quickstart.md)
