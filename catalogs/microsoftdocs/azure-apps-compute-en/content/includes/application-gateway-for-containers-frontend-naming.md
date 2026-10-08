---
author: mbender-ms
ms.service: azure-application-gateway-containers
ms.topic: include
ms.date: 08/14/2023
ms:author: mbender
---
> **Note:**
> When the ALB Controller creates the Application Gateway for Containers resources in Azure Resource Manager, it uses the following naming convention for a frontend resource: `fe-<eight randomly generated characters>`.
>
> If you want to change the name of the frontend resource created in Azure, consider following the [bring-your-own deployment strategy](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/application-gateway/for-containers/overview.md#deployment-strategies).
