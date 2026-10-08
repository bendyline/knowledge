---
author: asudbring
ms.author: allensu
ms.date: 06/02/2023
ms.service: azure-bastion
ms.topic: include

---
* The smallest subnet AzureBastionSubnet size you can create is /26. We recommend that you create a /26 or larger size to accommodate host scaling.
  * For more information about scaling, see [Configuration settings - Host scaling](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/configuration-settings.md#instance).
  * For more information about settings, see [Configuration settings - AzureBastionSubnet](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/configuration-settings.md#instance).
* Create the **AzureBastionSubnet** without any route tables or delegations. 
* If you use Network Security Groups on the **AzureBastionSubnet**, refer to the [Work with NSGs](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/bastion/bastion-nsg.md) article.
