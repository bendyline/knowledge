---
title: Pin Reporting Services paginated report items to dashboards in Power BI
description: You can pin on-premises Reporting Services paginated report items to a dashboard in the Power BI service, as a new tile.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: reporting-services
ms.topic: how-to
ms.custom:
  - updatefrequency5
helpviewer_keywords:
  - "pbi"
  - "dashboard"
  - "pin"
  - "powerbi"
  - "power bi integration"
---
# Pin Reporting Services paginated report items to dashboards in Power BI

  **Applies to:**
 
 Reporting Services and later versions
 

You can pin an on-premises  Reporting Services 
 paginated report item to a dashboard in the  Power BI 
 service, as a new tile.   To pin, your administrator needs to first integrate your report server with Microsoft Entra ID ([formerly Azure Active Directory](https://learn.microsoft.com/entra/fundamentals/new-name)) and  Power BI 
.
 

> **Note:**  
> The ability to pin paginated reports to Power BI dashboards is deprecated and discontinued for all releases of SQL Server Reporting Services and Power BI Report Server.

 
##  <a name="bkmk_requirements_to_pin"></a> Requirements to pin  
  
-   The report server is configured for  Power BI 
 integration. For more information, see [Power BI report server integration (Configuration Manager)](install-windows/power-bi-report-server-integration-configuration-manager.md). If you don't configure the report server, the **Pin to Power BI Dashboard** button doesn't appear on the report viewer toolbar.  
  
    Screenshot of the report viewer toolbar highlighting the Pin to Power BI Dashboard button.
  
-   You pin from the  Reporting Services 
 report viewer in the  web portal 
, for example, `https://myserver/Reports`.  You can't pin from Report Builder
, from report designer in  SQL Server Data Tools (SSDT) 
, or from a report server URL. For example,  `https://myserver/ReportServer`.  
  
-   You need to configure your browser to allow pop-ups from your report server site.  
  
-   You need to configure reports for stored credentials, if you want the pinned item to refresh.  When you pin an item, a  Reporting Services 
 subscription is automatically created to manage the data refresh of the item to the dashboard. If the report doesn't use stored credentials, when the subscription runs you see a message similar to this one on the **My subscriptions** page.  
  
    "Power BI Delivery error: dashboard: IT Spend Analysis Sample, visual: Chart2, error: The current action cannot be completed. The user data source credentials do not meet the requirements to run this report or shared dataset. Either the user data source credential."
 
    See the section "Configure stored credentials for a report-specific data source (Native mode)" in [Store credentials in a Reporting Services data source](report-data/store-credentials-in-a-reporting-services-data-source.md). 
  
##  <a name="bkmk_supported_items"></a> Items you can pin  
 The following report items can be pinned to a  Power BI 
 dashboard. You can't pin items that are nested inside a data region. For example, you can't pin an item that is nested inside a  Reporting Services 
 table or list.  
  
-   Charts  
-   Gauge panels  
-   Maps  
-   Images  
-   Items need to be in the report body. You can't pin items that are in the page header or page footer.  
-   You can pin individual items that are inside a top-level rectangle but you can't pin them all as a single group.  
  
##  <a name="bkmk_to_pin"></a> Pin a report item  
  
1. Verify you're signed into  Power BI 
. In the  Reporting Services 
  web portal 
, select the menu item **My Settings** and sign in. For more information, see [My Settings for Power BI integration &#40;web portal&#41;](my-settings-for-power-bi-integration-web-portal.md).

    Screenshot of the web portal highlighting My Settings in the Settings dropdown list.
  
2. Navigate to the  web portal 
 folder that contains your report, and then view the report.  
  
3. While viewing the report, select the **Pin to Power BI** button the toolbar. You're prompted to sign in, if you aren't already signed in. If the  Power BI 
 button isn't visible, the report server isn't integrated with  Power BI 
. For more information, see [Power BI Report Server integration (Configuration Manager)](install-windows/power-bi-report-server-integration-configuration-manager.md).  
  
    Screenshot of the report viewer toolbar highlighting the Pin to Power BI button.
  
4. Select the report item you want to pin to  Power BI 
. You can only pin one item at a time. The report viewer presents a shaded view of your report, and the report items you can pin are highlighted. The items that you can't pin are shaded dark.  
  
    **(1)** select the group that contains the dashboard you want to pin to, **(2)** choose the dashboard you want to pin the item too and **(3)** select how frequently you want the tile updated in the dashboard.  Reporting Services 
 subscriptions manage the refresh. After the item is pinned, you can edit the subscription and configure a different refresh schedule.  
  
    Screenshot of the Pin to Power BI Dashboard dialog box.
  
5. Select **Pin**  
  
    In the **Pin Successful** dialog, you can select the link **See it in Power BI** to navigate to the dashboard and see the item you pinned.  
  
6. Select **Close** to return the report to the normal view.  
  
##  <a name="bkmk_in_the_dashboard"></a> In the dashboard

After your report item is pinned in the dashboard, the tile looks like other dashboard tiles and there's no visible indication the tile came from  Reporting Services 
. The following list summarizes how tile properties are populated from the report item.  
  
From the  Power BI 
 dashboard the pinned report item behaves like other tiles:

**(1)** You can pin the tile to other dashboards.

**(2)** In the **Tile Details** the  Reporting Services 
 report title is used for the default title of the tile.

**(3)** The tile subtitle is based on the date and time the tile was pinned or the data was last refreshed from  Reporting Services 
.  The  Reporting Services 
 subscription that was automatically created when you pinned the report item manages the refresh schedule.

**(5)** If you select the tile itself,  Power BI 
 uses the **(4) custom link** to navigate to the  web portal 
 page of the registered report server. The link was set when the item was pinned from  Reporting Services 
. If you don't have internet connectivity to the report server, you see an error in the browser.  

Screenshot of the tiles in the dashboard.
  
##  <a name="bkmk-troubleshoot"></a> Troubleshoot issues  
  
-   **No  Power BI 
 button on the report viewer toolbar:** This message indicates the report server isn't integrated with  Power BI 
. For more information, see [Power BI Report Server Integration (Configuration Manager)](install-windows/power-bi-report-server-integration-configuration-manager.md).  
  
- **Cannot Pin**: When you attempt to pin an item, you see the following error message: See the section [Items you can pin](#bkmk_supported_items).  
  
    "Cannot Pin: There are no report items on this page that you can pin to  Power BI 
."  
  
-   **Pinned items show stale data** in a  Power BI 
 dashboard and it did update for some time. The user credentials token expired, and you need to sign in again. The user credential registration with Azure and  Power BI 
 is good for 90 days. In the  web portal 
, select **My Settings**. For more information, see [My Settings for Power BI Integration &#40;web portal&#41;](my-settings-for-power-bi-integration-web-portal.md).  
  
-   **Pinned items show stale data** in a  Power BI 
 dashboard and it hasn't refreshed even once.  The issue is the report isn't configured to use stored credentials. A report must use stored credentials because the action of pinning a report item creates a  Reporting Services 
 subscription to manage the refresh schedule of the tiles.  Reporting Services 
 subscriptions require stored credentials. If you review the **My Subscriptions** page, you see an error message similar to this one:  
  
    "Power BI Delivery error: dashboard: SSRS items, visual: Image3, error: The current action can't be completed. The user data source credentials do not meet the requirements to run this report or shared dataset. Either the user data source credentials are not stored in the report server database, or the user data source is configured not to require credentials but the unattended execution account is not specified. (rsInvalidDataSourceCredentialSetting)"
  
-   **Expired Power BI credentials:** You attempt to pin an item and see the following error message. In the  web portal 
, select **My Settings** and on the My Settings page, choose **Sign in**. For more information, see [My Settings for Power BI integration &#40;web portal&#41;](my-settings-for-power-bi-integration-web-portal.md).  
  
    "Cannot Pin: Unexpected Server Error: Missing, invalid or expired Power BI credentials."  
  
-   **Cannot Pin**: If you attempt to pin an item to a dashboard that is in a read-only state, you see an error message similar to this one:  
  
    "Server Error: The item 'Dashboard deleted 015cf022-8e2f-462e-88e5-75ab0a04c4d0' can't be found. (rsItemNotFound)"  

-   **Tiles in Power BI apps show stale data:** If you pin a Reporting Services report item to a dashboard, and then distribute that dashboard in an app, the pinned report item in that dashboard doesn't update.

##  <a name="bkmk_subscription_management"></a> Subscription management  
 In addition to the subscription-related issues described in the troubleshooting section, the following information helps you maintain  Power BI 
 related subscriptions.
  
-   **Item name changed:** If a pinned report item is renamed or deleted, the  Power BI 
 tile no longer updates and you see an error message similar to the following.  If you rename the item back the original name, the subscription starts working again and the tile refreshes on the subscriptions schedule.  
  
    "Power BI Delivery error: dashboard: SSRS items, visual: Image1, error: Error: Report item 'Image1' cannot be found."  
  
    You could also edit the subscription properties and change the **Report Visual Name** to the appropriate report item name.  
  
-   **Delete a tile**. If you delete a tile in  Power BI 
, the associated subscription isn't deleted in  Reporting Services 
 and on the **My subscriptions** page, you see an error similar to the following. You can delete the subscription.  
  
    "Power BI Delivery error: dashboard: SSRS items, visual: Image3, error: The item 'Tile deleted af7131d9-5eaf-480f-ba45-943a07d19c9f' cannot be found."  

## Video

> [!VIDEO https://www.youtube-nocookie.com/embed/QhPQObqmMPc]

## Related content

- [Integrate Power BI Report Server by using the configuration manager](install-windows/power-bi-report-server-integration-configuration-manager.md)
- [My Settings for Power BI integration (web portal)](my-settings-for-power-bi-integration-web-portal.md)
- [Introduction to dashboards for Power BI designers](https://powerbi.microsoft.com/documentation/powerbi-service-dashboards/)
