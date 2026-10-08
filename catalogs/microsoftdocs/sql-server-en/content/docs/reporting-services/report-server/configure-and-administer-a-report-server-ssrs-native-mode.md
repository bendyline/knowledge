---
title: "Configure and administer a report server (native mode)"
description: Learn about the approaches that you can use to configure Reporting Services and find articles about how to configure components, features, or server capabilities.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-server
ms.topic: concept-article
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "Reporting Services, components"
  - "deploying [Reporting Services], component options"
  - "report servers [Reporting Services], component options"
  - "configuration options [Reporting Services]"
  - "administering Reporting Services"
  - "components [Reporting Services], configuring"
  - "configuring servers [Reporting Services]"
#customer-intent: As a Reporting Services user, I want to see what resources are available to me so that I can effectively configure Reporting Services.
---
# Configure and administer a report server (SSRS native mode)

This article summarizes the approaches that you can use to configure  Reporting Services 
. It also includes a list of articles that explain how to configure specific components, features, or server capabilities. To configure  Reporting Services 
, you can:

- Use the Report Server Configuration Manager. Many of the articles in this section contain information about how to configure specific features through this tool.

- Use  Management Studio
 to customize server properties, enable My Reports, enable trace logs, and set site-wide defaults. For more information about site settings, see [Reporting Services report server (native mode)](reporting-services-report-server-native-mode.md) for Management Studio. You can create and run script that sets server properties programmatically. For more information, see [Script deployment and administrative tasks](../tools/script-deployment-and-administrative-tasks.md) and [Reporting Services Properties - Report Server System Properties](../report-server-web-service/net-framework/reporting-services-properties-report-server-system-properties.md).

- Use the web portal to grant permissions to access the report server. Permissions are conveyed through role assignments that you define for each user or group account. For more information, see [Roles and permissions in Reporting Services](../security/roles-and-permissions-reporting-services.md).

- Optionally, modify configuration files to change application settings. For more information about each file and guidelines for modifying them, see [Reporting Services configuration files](reporting-services-configuration-files.md).

## In this section

[Configure report server URLs (Report Server Configuration Manager)](../install-windows/configure-report-server-urls-ssrs-configuration-manager.md)
Describes how to define the URLs used to access the report server and the web portal.

[Configure the report server service account (Report Server Configuration Manager)](../install-windows/configure-the-report-server-service-account-ssrs-configuration-manager.md)
Provides recommendations and steps on how to modify service account and password.

[Create a report server database, Report Server Configuration Manager](../install-windows/ssrs-report-server-create-a-report-server-database.md)
Describes how to create a report server database, required for storing server metadata and objects.

[Configure a report server database connection (Report Server Configuration Manager)](../install-windows/configure-a-report-server-database-connection-ssrs-configuration-manager.md)
Describes how to modify the connection string used by the report server to connect to the report server database.

[Email settings in Reporting Services native mode (Report Server Configuration Manager)](../install-windows/e-mail-settings-reporting-services-native-mode-configuration-manager.md)
Describes how to configure a report server to support e-mail report distribution.

[Configure the unattended execution account (Report Server Configuration Manager)](../install-windows/configure-the-unattended-execution-account-ssrs-configuration-manager.md)
Describes how to configure a user account to process reports in unattended mode.

## Related content

- [Reporting Services configuration files](reporting-services-configuration-files.md)
- [What is the Report Server configuration manager (native mode)?](../install-windows/reporting-services-configuration-manager-native-mode.md)
- [Reporting Services security and protection](../security/reporting-services-security-and-protection.md)
