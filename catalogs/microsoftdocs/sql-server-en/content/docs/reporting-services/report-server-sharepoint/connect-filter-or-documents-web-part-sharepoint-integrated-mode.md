---
title: "Connect Filter or Documents web part with a Reporting Services Report Viewer web part"
description: For a SharePoint product, learn to create a dashboard or web part Page that includes a Filter web part or Documents web part and a Report Viewer web part.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-server-sharepoint
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Connect Filter or Documents web part with a Reporting Services Report Viewer web part

  **Applies to:**
 
 Reporting Services and later versions
  Not supported


For content related to previous versions of SQL Server Reporting Services (SSRS), see [What is SQL Server Reporting Services?](../create-deploy-and-manage-mobile-and-paginated-reports.md)


If you are using a SharePoint product, you can create a dashboard or web part Page that includes a Filter web part or Documents web part and a Report Viewer web part. Supported versions are  SharePoint Foundation 2010 
 or  SharePoint Server 2010 
. Also supported is  Office SharePoint Server  
 2007. By connecting a Filter web part, users who select filter values in a Filter web part can send the value to a parameterized report on the same page. By connecting a Documents web part, users who click on reports in the Documents library can view the report in an adjacent Report Viewer web part.

> **Note:**
> Reporting Services integration with SharePoint is no longer available after SQL Server 2016.

 The Filter web part is used to send values to one or more parameters on a report. To use a Filter web part, the report must have parameters defined for it that are compatible with the values, data type, and format sent by the web part.  
  
 The Documents web part is associated with the Documents library of the Home site. To view, add, or remove items from the Documents library, select **View All Site Content**. In Libraries, select **Documents**. You can use the **New**, **Upload**, and **Actions** menu to manage the items in the Documents library.  
  
## Connect a Filter web part
  
1.  Open or create the web part page or dashboard.  
  
2.  On the **Site Actions** menu, select **Edit Page**.  
  
3.  Select **Add a web part**.  
  
4.  In **All web parts**, in the **Miscellaneous** category, select **SQL Server Reporting Services Report Viewer**.  
  
5.  Select **Add**. The web part is added at the top of the zone.  
  
6.  On another zone in the same web part page or dashboard, select **Add a web part**.  
  
7.  In **All web parts**, in the **Filters** section, select a web part.  
  
8.  Select **Add**. The web part is added at the top of the zone.  
  
9. In the zone that contains the web part, select the web part **edit** menu, point to **Connections**, point to **Send Filter Values To**, and then choose **Report Viewer** - *report name*.  
  
10. Check in your changes and save the page.  
  
## Connect a Documents web part  
  
1.  Open or create the web part page or dashboard.  
  
2.  On the **Site Actions** menu, select **Edit Page**.  
  
3.  Select **Add a web part**.  
  
4.  In **All web parts**, in the **Lists and Library** section, select **Documents.**  
  
5.  Select **Add**. The web part is added at the top of the zone.  
  
6.  Select **Apply** at the bottom of the tool pane, and then choose **OK** to close the pane.  
  
7.  On another zone in the same web part page or dashboard, select **Add a web part**.  
  
8.  In **All web parts**, in the **Miscellaneous** category, select **SQL Server Reporting Services Report Viewer.**  
  
9. Select **Add**. The web part is added at the top of the zone.  
  
10. In the zone that contains the web part, select the web part **edit** menu, point to **Connections**, point to **Get report definitions from**, and then choose **Documents**.  
  
11. Check in your changes and save the page.  
  
## Related content

- [Add the Report Viewer web part to a web page](add-the-report-viewer-web-part-to-a-web-page.md)
- [Report Viewer web part on a SharePoint site - Reporting Services](report-viewer-web-part-sharepoint-site.md)
- [Customize the Report Viewer web part](customize-the-report-viewer-web-part.md)
- [Try asking the Reporting Services forum](https://go.microsoft.com/fwlink/?LinkId=620231)
