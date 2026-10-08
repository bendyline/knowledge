---
title: "My Settings for Power BI integration (web portal)"
description: Learn about the My Settings page in the Reporting Services web portal and how individual users can manage their sign-in with Power BI.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: reporting-services
ms.topic: concept-article
ms.custom:
  - updatefrequency5
f1_keywords:
  - "pbi"
  - "power bi"
  - "power bi integration"
---

# My Settings for Power BI integration (web portal)

  **Applies to:**
 
 Reporting Services and later versions
 

The **My Settings** page in the  Reporting Services 
  web portal 
 is used by individual users to manage their sign-in with  Power BI 
. When you go through the steps to pin a report item, you automatically see a prompt to sign.  However,  you can use the **My Settings** page if you need to manually sign in or if you need to sign out.  If the **My Settings** menu option isn't visible, the report server isn't integrated with  Power BI 
.  For more information, see [Power BI report server integration (Configuration Manager)](install-windows/power-bi-report-server-integration-configuration-manager.md).  

Screenshot of the web portal highlighting My Settings in the Settings dropdown list.
  
## Why sign in

 When you sign in, you establish a relationship between your  Reporting Services 
 user account and  your  Power BI 
 account. The sign-in creates a security token that is good for 90 days. If the token expires, and you have items pinned to Power BI, you see a notification.  

Screenshot of the notification dropdown list showing the message, 'We couldn't refresh some tiles in Power BI'.
   
Tiles within  Power BI 
 dashboards don't refresh until you sign in again through **MySettings**.  

Screenshot of the Sign In section of My Settings.
  
Once you sign in, you receive a new security token. Your dashboard tiles begin updating on their previously configured schedules.  

## Related content

- [Integrate Power BI Report Server by using the configuration manager](install-windows/power-bi-report-server-integration-configuration-manager.md)
- [Pin Reporting Services paginated report items to dashboards in Power BI](pin-reporting-services-items-to-power-bi-dashboards.md)
- [Introduction to dashboards for Power BI designers](https://powerbi.microsoft.com/documentation/powerbi-service-dashboards/)
- [What is the report server web portal (Native mode)?](web-portal-ssrs-native-mode.md)
- [Try asking the Reporting Services forum](https://learn.microsoft.com/answers/search.html?c=\&f=\&includeChildren=\&q=ssrs+OR+reporting+services\&redirect=search%2fsearch\&sort=relevance\&type=question+OR+idea+OR+kbentry+OR+answer+OR+topic+OR+user)
