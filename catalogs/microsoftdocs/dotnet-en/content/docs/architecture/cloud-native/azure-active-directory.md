---
title: Azure Active Directory
description: Architecting Cloud Native .NET Apps for Azure | Azure Active Directory
ms.date: 04/06/2022
---

# Azure Active Directory


> **Tip:**


> This content is an excerpt from the eBook, Architecting Cloud Native .NET Applications for Azure, available on [.NET Docs](https://learn.microsoft.com/dotnet/architecture/cloud-native) or as a free downloadable PDF that can be read offline.
>
> > [!div class="nextstepaction"]
> > [Download PDF](https://dotnet.microsoft.com/download/e-book/cloud-native-azure/pdf)


> Cloud Native .NET apps for Azure eBook cover thumbnail.




Microsoft Azure Active Directory (Azure AD) offers identity and access management as a service. Customers use it to configure and maintain who users are, what information to store about them, who can access that information, who can manage it, and what apps can access it. AAD can authenticate users for applications configured to use it, providing a single sign-on (SSO) experience. It can be used on its own or be integrated with Windows AD running on premises.

Azure AD is built for the cloud. It's truly a cloud-native identity solution that uses a REST-based Graph API and OData syntax for queries, unlike Windows AD, which uses LDAP. On premises Active Directory can sync user attributes to the cloud using Identity Sync Services, allowing all authentication to take place in the cloud using Azure AD. Alternately, authentication can be configured via Connect to pass back to local Active Directory via ADFS to be completed by Windows AD on premises.

Azure AD supports company branded sign-in screens, multi-factory authentication, and cloud-based application proxies that are used to provide SSO for applications hosted on premises. It offers different kinds of security reporting and alert capabilities.

## References

- [Microsoft identity platform](https://learn.microsoft.com/azure/active-directory/develop/)

>
>[Previous](authentication-authorization.md)
>[Next](identity-server.md)
