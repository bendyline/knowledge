
> **Note:**
> Removing your resource association from the network security perimeter results in access control falling back to the existing resource firewall configuration. This may result in access being allowed/denied as per the resource firewall configuration. If PublicNetworkAccess is set to SecuredByPerimeter and the association has been deleted, the resource will enter a locked down state. For more information, see [Transition to a network security perimeter in Azure](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/private-link/network-security-perimeter-transition.md#transition-to-a-network-security-perimeter-in-azure).


## Original source metadata

```text
---
 title: include file
 description: include file
 services: private-link
 author: mbender
 ms.service: azure-private-link
 ms.topic: include
 ms.date: 11/11/2024
 ms.author: mbender-ms
ms.custom: include file, ignite-2024
---
```
