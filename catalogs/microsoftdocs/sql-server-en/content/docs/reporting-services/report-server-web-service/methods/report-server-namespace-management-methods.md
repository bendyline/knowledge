---
title: "Report Server namespace management methods"
description: The Report Server Management Web service contains methods that you can use to manage reports, folders, and resources in the report server database.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-server-web-service
ms.topic: reference
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "reports [Reporting Services], managing"
  - "management methods [Reporting Services]"
  - "methods [Reporting Services], about methods"
  - "methods [Reporting Services]"
---
# Report Server namespace management methods
  The Report Server Management Web service contains methods that you can use to manage reports, folders, and resources in the report server database.  
  
| Method | Action |
| --- | --- |
| [ReportService2010.ReportingService2010.CancelJob%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.CancelJob%252A) | Cancels execution of a job. |
| [ReportService2010.ReportingService2010.CreateFolder%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.CreateFolder%252A) | Adds a folder to the report server database or SharePoint library. |
| [ReportService2010.ReportingService2010.CreateCatalogItem%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.CreateCatalogItem%252A) | Adds a new item to a report server database or SharePoint library. This method applies to the **Report**, **Model**, **Dataset**, **Component**, **Resource**, and **DataSource** item types. |
| M:ReportService2010.ReportingService2010.CreateReportEditSession(System.String, System.String,System.Byte[],ReportService2010.Warning[]@) | Creates a new report edit session. |
| [ReportService2010.ReportingService2010.DeleteItem%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.DeleteItem%252A) | Removes an item from the report server database or SharePoint library. |
| [ReportService2010.ReportingService2010.FindItems%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.FindItems%252A) | Returns the items in the report server database or SharePoint library that match the specified search criteria. |
| [ReportService2010.ReportingService2010.FireEvent%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.FireEvent%252A) | Triggers an event based on the supplied parameters. |
| [ReportService2010.ReportingService2010.GetExtensionSettings%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.GetExtensionSettings%252A) | Returns a list of settings for a given extension. |
| [ReportService2010.ReportingService2010.GetItemType%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.GetItemType%252A) | Retrieves the type of an item in the report server database or SharePoint library, if the item exists. |
| [ReportService2010.ReportingService2010.GetProperties%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.GetProperties%252A) | Returns the values of one or more properties on an item in the report server database or SharePoint library. |
| [ReportService2010.ReportingService2010.GetItemDefinition%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.GetItemDefinition%252A) | Retrieves the definition or content for an item. This method applies to the **Report**, **Model**, **Dataset**, **Component**, **Resource**, and **DataSource** item types. |
| [ReportService2010.ReportingService2010.GetItemReferences%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.GetItemReferences%252A) | Returns a list of catalog item references associated with an item. |
| [ReportService2010.ReportingService2010.GetReportServerConfigInfo%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.GetReportServerConfigInfo%252A) | Returns information on the connected report server instance or all the report server instances in a scale-out deployment. |
| [ReportService2010.ReportingService2010.GetSystemProperties%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.GetSystemProperties%252A) | Returns one or more system properties. |
| [ReportService2010.ReportingService2010.ListChildren%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.ListChildren%252A) | Gets a list of children of a specified folder. |
| [ReportService2010.ReportingService2010.ListDatabaseCredentialRetrievalOptions%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.ListDatabaseCredentialRetrievalOptions%252A) | Returns a list of supported credential retrieval options. |
| [ReportService2010.ReportingService2010.ListEvents%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.ListEvents%252A) | Returns a list of event extensions as they appear in the report server configuration file. |
| [ReportService2010.ReportingService2010.ListJobs%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.ListJobs%252A) | Returns a list of jobs running on the report server. |
| [ReportService2010.ReportingService2010.ListExtensions%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.ListExtensions%252A) | Returns a list of extensions that are configured for a given extension type. |
| [ReportService2010.ReportingService2010.ListExtensionTypes%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.ListExtensionTypes%252A) | Returns a list of supported extension types. |
| [ReportService2010.ReportingService2010.ListItemTypes%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.ListItemTypes%252A) | Returns a list of supported catalog item types. |
| [ReportService2010.ReportingService2010.ListJobActions%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.ListJobActions%252A) | Returns a list of supported job actions. |
| [ReportService2010.ReportingService2010.ListJobStates%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.ListJobStates%252A) | Returns a list of supported job states. |
| [ReportService2010.ReportingService2010.ListJobTypes%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.ListJobTypes%252A) | Returns a list of supported job types. |
| [ReportService2010.ReportingService2010.ListParents%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.ListParents%252A) | Retrieves parent items for the given item. |
| [ReportService2010.ReportingService2010.ListSecurityScopes%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.ListSecurityScopes%252A) | Returns a list of supported security scopes. |
| [ReportService2010.ReportingService2010.Logoff%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.Logoff%252A) | Logs out the current user making Web service requests. This method only applies to native mode. |
| [ReportService2010.ReportingService2010.LogonUser%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.LogonUser%252A) | Logs on a user and authenticates a user request to the Report Server Web service. This method only applies to native mode. |
| [ReportService2010.ReportingService2010.SetItemReferences%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.SetItemReferences%252A) | Sets the catalog items associated with an item. |
| [ReportService2010.ReportingService2010.MoveItem%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.MoveItem%252A) | Moves and/or renames an item. |
| [ReportService2010.ReportingService2010.SetProperties%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.SetProperties%252A) | Sets one or more properties of an item. |
| [ReportService2010.ReportingService2010.SetItemDefinition%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.SetItemDefinition%252A) | Sets the definition or content for a specified item. This method applies to the **Report**, **Model**, **Dataset**, **Component**, **Resource**, and **DataSource** item types. |
| [ReportService2010.ReportingService2010.SetSystemProperties%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.SetSystemProperties%252A) | Sets one or more system properties in the report server or SharePoint farm. |
| [ReportService2010.ReportingService2010.ValidateExtensionSettings%2A](https://learn.microsoft.com/search/?terms=ReportService2010.ReportingService2010.ValidateExtensionSettings%252A) | Validates  Reporting Services |
 | extension settings. |
  
## Related content

- [Building Applications Using the Web Service and the .NET Framework](../net-framework/building-applications-using-the-web-service-and-the-net-framework.md)
- [Report Server Web service](../report-server-web-service.md)
- [Report Server Web service methods](report-server-web-service-methods.md)
- [Technical reference (SSRS)](../../technical-reference-ssrs.md)
