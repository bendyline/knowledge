---
title: Store and use certificates in Azure Cloud Services (extended support)
description: Processes for storing and using certificates in Azure Cloud Services (extended support)
ms.topic: how-to
ms.service: azure-cloud-services-classic
author: gachandw
ms.author: gachandw
ms.reviewer: mimckitt
ms.date: 07/24/2024
ms.update-cycle: 365-days
ms.custom: cloud-services-extended-support
# Customer intent: As a cloud services administrator, I want to securely store and manage certificates using Key Vault so that I can enable secure communication and authentication for Azure Cloud Services (extended support) deployments.
---

# Use certificates with Azure Cloud Services (extended support)

> **Important:**
> As of March 31, 2025, cloud Services (extended support) is deprecated and will be fully retired on March 31, 2027. [Learn more](https://aka.ms/csesretirement) about this deprecation and [how to migrate](https://aka.ms/cses-retirement-march-2025).

Key Vault is used to store certificates that are associated to Cloud Services (extended support). Key Vaults can be created through the [Azure portal](https://learn.microsoft.com/azure/key-vault/general/quick-create-portal) and [PowerShell](https://learn.microsoft.com/azure/key-vault/general/quick-create-powershell). Add the certificates to Key Vault, then reference the certificate thumbprints in Service Configuration file. You also need to enable Key Vault for appropriate permissions so that Cloud Services (extended support) resource can retrieve certificate stored as secrets from Key Vault.

## Upload a certificate to Key Vault 

1. Sign in to the [Azure portal](https://portal.azure.com) and navigate to the Key Vault. If you don't have a Key Vault set up, you can opt to create one in this same window.

2. Select **Access Configuration**

    Image shows selecting access policies from the key vault blade.

3. Ensure the access configuration includes the following property:
    - **Enable access to Azure Virtual Machines for deployment**

    Image shows access policies window in the Azure portal.
 
4.	Select **Certificates** 

    Image shows selecting the certificates option from the key vault blade policies window in the Azure portal.

5. Select **Generate / Import**

    Image shows selecting the generate/ import option

4.	Complete the required information to finish uploading the certificate. The certificate needs to be in **.PFX** format.

    Image shows importing window in the Azure portal.

5.	Add the certificate details to your role in the Service Configuration (.cscfg) file. Ensure the thumbprint of the certificate in the Azure portal matches the thumbprint in the Service Configuration (.cscfg) file. 
    
    ```json
    <Certificate name="<your cert name>" thumbprint="<thumbprint in key vault" thumbprintAlgorithm="sha1" /> 
    ```
6.  For deployment via ARM Template, certificateUrl can be found by navigating to the certificate in the key vault labeled as Secret Identifier

    Image shows the secret identifier field in the key vault.

## Next steps 
- Review the [deployment prerequisites](deploy-prerequisite.md) for Cloud Services (extended support).
- Review [frequently asked questions](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-services-extended-support/faq.yml) for Cloud Services (extended support).
- Deploy a Cloud Service (extended support) using the [Azure portal](deploy-portal.md), [PowerShell](deploy-powershell.md), [Template](deploy-template.md) or [Visual Studio](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/cloud-services-extended-support/deploy-visual-studio.md).
