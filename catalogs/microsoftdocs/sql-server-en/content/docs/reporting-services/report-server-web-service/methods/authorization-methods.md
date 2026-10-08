---
title: "Authorization methods"
description: In Reporting Services, you can use these authorization methods to manage tasks, roles, and policies on the report server.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-server-web-service
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "security [Reporting Services], reports"
  - "authorization [Reporting Services]"
  - "reports [Reporting Services], security"
  - "tasks [Reporting Services]"
  - "roles [Reporting Services], methods"
---
# Authorization methods
  You can use these methods to manage tasks, roles, and policies on the report server.  
  
| Method | Action |
| --- | --- |
| [ReportService2010.ReportingService2010.CreateRole%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.CreateRole%252A) | Adds a new role to the report server database. This method =applies to native mode only. |
| [ReportService2010.ReportingService2010.DeleteRole%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.DeleteRole%252A) | Deletes a role from the report server database. This method applies to native mode only. |
| [ReportService2010.ReportingService2010.GetPermissions%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.GetPermissions%252A) | Returns the user permissions that are associated with a particular item in the report server database or SharePoint library. |
| [ReportService2010.ReportingService2010.GetPolicies%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.GetPolicies%252A) | Returns the policies that are associated with a particular item in the report server database or SharePoint library. |
| [ReportService2010.ReportingService2010.GetRoleProperties%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.GetRoleProperties%252A) | Returns role metadata properties and a collection of associated tasks. |
| [ReportService2010.ReportingService2010.GetSystemPermissions%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.GetSystemPermissions%252A) | Returns the user's system permissions. This method applies to native mode only. |
| [ReportService2010.ReportingService2010.GetSystemPolicies%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.GetSystemPolicies%252A) | Returns the system policies, including groups and roles with which they're associated. This method applies to native mode only. |
| [ReportService2010.ReportingService2010.InheritParentSecurity%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.InheritParentSecurity%252A) | Deletes the policies that are associated with a particular item in the report server database and sets the security policies for the item to be the same as its parent. |
| [ReportService2010.ReportingService2010.IsSSLRequired%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.IsSSLRequired%252A) | Returns a Boolean value that indicates whether the Transport Layer Security (TLS), previously known as Secure Sockets Layer (SSL), protocol is required to use the [ReportService2010](https://learn.microsoft.com/search/?terms=ReportService2010) endpoint. |
| [ReportService2010.ReportingService2010.ListRoles%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.ListRoles%252A) | Returns the names and descriptions of roles that the report server manages. |
| [ReportExecution2005.ReportExecutionService.ListSecureMethods%2A](https://learn.microsoft.com/search/?terms=ReportExecution2005.ReportExecutionService.ListSecureMethods%252A) | Returns a list of Simple Object Access Protocol (SOAP) methods in the [ReportExecution2005](https://learn.microsoft.com/search/?terms=ReportExecution2005) endpoint that require a secure connection when invoked. The **SecureConnectionLevel** setting of the report server is used to determine which methods are returned. |
| [ReportService2010.ReportingService2010.ListTasks%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.ListTasks%252A) | Returns the tasks that the report server manages. |
| [ReportService2010.ReportingService2010.SetPolicies%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.SetPolicies%252A) | Sets the policies that are associated with a specified item. |
| [ReportService2010.ReportingService2010.SetRoleProperties%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.SetRoleProperties%252A) | Sets role metadata properties and associates a set of tasks with a role. This method applies to native mode only. |
| [ReportService2010.ReportingService2010.SetSystemPolicies%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.SetSystemPolicies%252A) | Sets the system policy that defines groups and their associated roles. This method applies to native mode only. |
  
## Related content

- [Building Applications Using the Web Service and the .NET Framework](../net-framework/building-applications-using-the-web-service-and-the-net-framework.md)
- [Report Server Web service](../report-server-web-service.md)
- [Report Server Web service methods](report-server-web-service-methods.md)
- [Technical reference (SSRS)](../../technical-reference-ssrs.md)
