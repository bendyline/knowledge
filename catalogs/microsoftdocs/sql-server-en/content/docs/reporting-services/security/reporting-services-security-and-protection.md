---
title: "Reporting Services security and protection"
description: "Reporting Services security and protection"
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: security
ms.topic: concept-article
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "security [Reporting Services]"
  - "Reporting Services, security"
---
# Reporting Services security and protection
  You can use information in this section to learn about the security features of  SQL Server 
  Reporting Services 
. This section also explains the authorization models and authentication providers supported in  Reporting Services 
.  
  
## Extended protection for authentication  
 Beginning with  SQL Server 2008 R2 (10.50.x) 
, support for Extended Protection for Authentication is available. The  SQL Server 
 feature supports the use of channel binding and service binding to enhance protection of authentication. The  SQL Server 
 features need to be used with an operating system that supports Extended Protection. For more information, see [Extended protection for authentication with Reporting Services](extended-protection-for-authentication-with-reporting-services.md).  
  
## Authentication and authorization  
  Reporting Services 
 provides different authentication types for users and client applications to authenticate with the report server. Using the right authentication type for your report server enables your organization to achieve the appropriate level of security required by your organization. For more information, see [Authentication with the report server](authentication-with-the-report-server.md).  
  
  Reporting Services 
 also employs roles and permissions to control user access to content in the report server catalog. The roles and permissions define who can access what and how they can access it. For more information, see [Roles and permissions (Reporting Services)](roles-and-permissions-reporting-services.md).  
  
## Related content

- [Configure TLS connections on a native mode report server](configure-ssl-connections-on-a-native-mode-report-server.md)
