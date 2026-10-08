---
title: Authentication service hero sample
titleSuffix: An Azure Communication Services article
description: This article describes the authentication services hero sample using Azure Communication Services.
author: kperla97
manager: chpalm
services: azure-communication-services

ms.author: kaperla
ms.date: 06/30/2021
ms.topic: overview
ms.service: azure-communication-services
ms.subservice: identity
ms.custom: devx-track-extended-java, devx-track-js
zone_pivot_groups: acs-js-csharp
---

# Authentication service hero sample


> **Warning:**
> **Azure Communication Services is introducing breaking changes, and some services are being retired. Learn more in the [retirement and breaking changes guide](https://aka.ms/acs-retirement-and-breaking-changes-guide).**


> **Important:**
> This sample is available on GitHub Azure Samples for [Node.js](https://github.com/Azure-Samples/communication-services-authentication-hero-nodejs) and [C#](https://github.com/Azure-Samples/communication-services-authentication-hero-csharp).

Azure Communication Services requires developers to generate user and access token credentials inside of a trusted authentication service. Azure Communication Services is identity-agnostic, to learn more check out our [conceptual documentation](../concepts/identity-model.md).

This repository provides a sample of a server implementation of an authentication service for Azure Communication Services. It uses best practices to build a trusted backend service that issues Azure Communication Services credentials and maps them to Microsoft Entra identities. 

Use this sample to help you in the following scenarios:
- As a developer, you need to enable an authentication flow to generate Azure Communication Services user identities mapped to a Microsoft Entra identity. Then use the identity to provision access tokens to be used in calling and chat experiences.
- As a developer, you need to enable an authentication flow for Azure Communication Services support Teams identities, which is done by using a Microsoft 365 Microsoft Entra identity of a Teams' user to fetch an Azure Communication Services token to be able to join Teams calling/chat.

> **Note:**
>If you're looking to get started with Azure Communication Services, but are still in learning / prototyping phases, check out our [quickstarts for getting started with Azure communication services users and access tokens](../quickstarts/identity/access-tokens.md?pivots=programming-language-csharp).

Screenshot of the Azure Communication Services Authentication Server Sample Architecture

Since this sample only focuses on the server APIs, the client application isn't part of it. If you want to add the client application to sign in end-users using Microsoft Entra ID, follow the [MSAL samples](https://github.com/AzureAD/microsoft-authentication-library-for-js).

## Prerequisites

To be able to run this sample, you need:

- Register a Client and Server (Web API) applications in Microsoft Entra ID as part of [On Behalf Of workflow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-on-behalf-of-flow). Follow instructions on [registrations set up guideline](https://github.com/Azure-Samples/communication-services-authentication-hero-csharp/blob/main/docs/deployment-guides/set-up-app-registrations.md)
- A deployed Azure Communication Services resource. [Create an Azure Communication Services resource](../quickstarts/create-communication-resource.md?tabs=linux&pivots=platform-azp). 
- Update the Server (Web API) application with information from the app registrations.
 
**Applies to: programming-language-javascript**


## Getting started

If you're wondering where to get started, here are a few scenarios to help you get going:

* "I want to see what this Azure Communication Services Authentication Server sample can do by running it!"
  * Check out our [local deployment guide](https://github.com/Azure-Samples/communication-services-authentication-hero-nodejs/blob/main/docs/deployment-guides/deploy-locally.md) guide.

* "How does the Azure Communication Services Authentication server sample work?"
  * Take a look at our conceptual design documentation. This documentation outlines the internal design of the service.
    - [Architecture Overview](https://github.com/Azure-Samples/communication-services-authentication-hero-nodejs/blob/main/docs/design-guides/architecture-overview.md)
    - [Secured Web API Architecture Design](https://github.com/Azure-Samples/communication-services-authentication-hero-nodejs/blob/main/docs/design-guides/secured-web-api-design.md).
    - [Identity Mapping Architecture Design](https://github.com/Azure-Samples/communication-services-authentication-hero-nodejs/blob/main/docs/design-guides/identity-mapping-design-graph-open-extensions.md).
    - [Token Exchange Architecture Design](https://github.com/Azure-Samples/communication-services-authentication-hero-nodejs/blob/main/docs/design-guides/token-exchange-design.md)


## Endpoints

This Azure Communication Services Solutions - Authentication server sample provides responses for **user** and **token** endpoints. For more details, please check our [Endpoints and Responses design doc](https://github.com/Azure-Samples/communication-services-authentication-hero-nodejs/blob/main/docs/design-guides/endpoints-and-responses.md).

## Next steps

>
>[Download the sample from GitHub](https://github.com/Azure-Samples/communication-services-authentication-hero-nodejs)


## Additional reading

- [Azure Communication Services Documentation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/index.yml) - Find more about how to add voice, video, chat, and telephony on our official documentation.
- [Azure Communication Services Hero Samples](overview.md) - Find more Azure Communication Services samples and examples on our samples overview page.
- [On-Behalf-Of workflow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-on-behalf-of-flow) - Find more about the OBO workflow.
- [Creating a protected API](https://github.com/Azure-Samples/active-directory-dotnet-native-aspnetcore-v2/tree/master/2.%20Web%20API%20now%20calls%20Microsoft%20Graph) - Detailed example of creating a protected API.
- [Graph Open Extensions](https://learn.microsoft.com/graph/extensibility-open-users) - Find out more about Microsoft Graph open extensions.


**Applies to: programming-language-csharp**


## Getting started

If you're wondering where to get started, here are a few scenarios to help you get going:

* "I want to see what this Azure Communication Services Authentication Server sample can do by running it!"
  * Check out our [local deployment guide](https://github.com/Azure-Samples/communication-services-authentication-hero-csharp/blob/main/docs/deployment-guides/deploy-locally.md) guide.

* "How does the Azure Communication Services Authentication server sample work?"
  * Take a look at our conceptual design documentation. This documentation outlines the internal design of the service.
    - [Azure Communication Services Authentication Server Sample Architecture Design](https://github.com/Azure-Samples/communication-services-authentication-hero-csharp/blob/main/docs/design-guides/architecture-overview.md).
    - [Secured Web API Architecture Design](https://github.com/Azure-Samples/communication-services-authentication-hero-csharp/blob/main/docs/design-guides/secured-web-api-design.md).
    - [Identity Mapping Architecture Design](https://github.com/Azure-Samples/communication-services-authentication-hero-csharp/blob/main/docs/design-guides/identity-mapping-design-graph-open-extensions.md).
    - [Token Exchange Architecture Design](https://github.com/Azure-Samples/communication-services-authentication-hero-csharp/blob/main/docs/design-guides/token-exchange-design.md)

## Endpoints

This Azure Communication Services Solutions - Authentication server sample provides responses for **user** and **token** endpoints. For more details, please check our [Endpoints and Responses design doc](https://github.com/Azure-Samples/communication-services-authentication-hero-csharp/blob/main/docs/design-guides/endpoints-and-responses.md).

## Next steps

>
>[Download the sample from GitHub](https://github.com/Azure-Samples/communication-services-authentication-hero-csharp)

## Additional reading

- [Azure Communication Services Documentation](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/communication-services/index.yml) - Find more about how to add voice, video, chat, and telephony on our official documentation.
- [Azure Communication Services Hero Samples](overview.md) - Find more Azure Communication Services samples and examples on our samples overview page.
- [On-Behalf-Of workflow](https://learn.microsoft.com/entra/identity-platform/v2-oauth2-on-behalf-of-flow) - Find more about the OBO workflow.
- [Creating a protected API](https://github.com/Azure-Samples/active-directory-dotnet-native-aspnetcore-v2/tree/master/2.%20Web%20API%20now%20calls%20Microsoft%20Graph) - Detailed example of creating a protected API.
- [Graph Open Extensions](https://learn.microsoft.com/graph/extensibility-open-users) - Find out more about Microsoft Graph open extensions.
