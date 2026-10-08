---
author: PatAltimore
ms.service: azure-api-management
ms.topic: include
ms.date: 03/09/2023
ms.author: patricka
ms.custom:
  - build-2025
---

With a private endpoint and Private Link, you can:

- Create multiple Private Link connections to an API Management instance. 

- Use the private endpoint to send inbound traffic on a secure connection. 

- Use policy to distinguish traffic that comes from the private endpoint. 

- Limit incoming traffic only to private endpoints, preventing data exfiltration.

- Combine inbound private endpoints to Standard v2 instances with outbound [virtual network integration](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/api-management/integrate-vnet-outbound.md) to provide end-to-end network isolation of your API Management clients and backend services.

    Diagram that shows a secure inbound connection to API Management Standard v2 using private endpoint.


> **Important:**
> * You can only configure a private endpoint connection for **inbound** traffic to the API Management instance. 
> * You can only disable public network access to the API Management instance **after** configuring a private endpoint.
