---
title: "Report Viewer Web Part programmability in SharePoint integration"
description: Learn how to create custom Web Parts that supply report path and parameters to Report Viewer Web Part using Web Part connections.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: reporting-services
ms.topic: reference
ms.custom:
  - updatefrequency5
---
# Report Viewer Web Part programmability in SharePoint integration
  The Report Viewer Web Part is a server control, which contains a set of public application programming interfaces (API) that enables developers to create custom SharePoint applications. You can create custom Web Parts that supply report path and parameters to Report Viewer Web Part using Web Part connections. You can also embed the Web Part in a custom SharePoint Web Part page and customize it using the public API.  
  
## Connect to Report Viewer Web Part with custom web parts  
 The Report Viewer Web Part is a connection consumer to SharePoint Web Parts that implement [System.Web.UI.WebControls.WebParts.IWebPartRow](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.WebParts.IWebPartRow) or ``T:Microsoft.SharePoint.WebPartPages.IFilterValues``. An [System.Web.UI.WebControls.WebParts.IWebPartRow](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.WebParts.IWebPartRow) Web Part, such as the **Documents** Web Part can supply a report path to a Report Viewer Web Part when placed on the same Web Part page as the Report Viewer Web Part. Likewise, an T:Microsoft.SharePoint.WebPartPages.IFilterValues Web Part, such as the **Text Filter** or the **Choice Filter**, can supply a report parameter to a Report Viewer Web Part when placed on the same Web Part page as the Report Viewer Web Part.  
  
### Implement a report path provider with IWebPartRow  
 Use the following steps to supply a report path to the Report Viewer Web Part through Web Part connections:  
  
1.  Create a Web Part that implements the [System.Web.UI.WebControls.WebParts.IWebPartRow](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.WebParts.IWebPartRow) interface.  
  
2.  Add the Web Part to the same Web Part page as the Report Viewer Web Part.  
  
3.  Connect your Web Part to the Report Viewer Web Part in the Web-based Web Part design user interface.  
  
    > **Note:**  
    >  You can only connect one [System.Web.UI.WebControls.WebParts.IWebPartRow](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.WebParts.IWebPartRow) Web Part to the Report Viewer Web Part at a time, and you cannot connect both an [System.Web.UI.WebControls.WebParts.IWebPartRow](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.WebParts.IWebPartRow) Web Part and an T:Microsoft.SharePoint.WebPartPages.IFilterValues Web Part to the Report Viewer Web Part at the same time.  
  
 For your [System.Web.UI.WebControls.WebParts.IWebPartRow](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.WebParts.IWebPartRow) Web Part to work properly with the T:Microsoft.ReportingServices.SharePoint.UI.WebParts.ReportViewerWebPart, you need to use the following steps for the [System.Web.UI.WebControls.WebParts.IWebPartRow.GetRowData%2A](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.WebParts.IWebPartRow.GetRowData%252A) method:  
  
-   Invoke the callback method with a [System.Data.DataRowView](https://learn.microsoft.com/search/?terms=System.Data.DataRowView) object as the input parameter.  
  
-   Make sure that the [System.Data.DataRowView](https://learn.microsoft.com/search/?terms=System.Data.DataRowView) object contains a column called "DocUrl" that contains the report path.  
  
    > **Note:**  
    >  The Report Viewer Web Part in the add-in for  Office SharePoint Server  
 2010 also supports receiving the report path using the "FileRef" column.  
  
### Implement a report parameter provider with IFilterValues  
 A Web Part that implements T:Microsoft.SharePoint.WebPartPages.IFilterValues can provide one parameter value to the Report Viewer Web Part. The parameter value sent to the Report Viewer Web Part is subject to the same restrictions placed on the report parameter as specified in the report definition, such as data type, valid values, and so on.
  
 Use the following steps to supply a report parameter to the Report Viewer Web Part:  
  
1.  Create a Web Part that implements the T:Microsoft.SharePoint.WebPartPages.IFilterValues interface.  
  
2.  Add the Web Part to the same page as the T:Microsoft.ReportingServices.SharePoint.UI.WebParts.ReportViewerWebPart.  
  
3.  Connect your T:Microsoft.SharePoint.WebPartPages.IFilterValues Web Part to the Report Viewer Web Part in the Web-based Web Part design user interface.  
  
    > **Note:**  
    >  You can connect multiple T:Microsoft.SharePoint.WebPartPages.IFilterValues Web Parts to the Report Viewer Web Part at a time. However, you cannot connect both an [System.Web.UI.WebControls.WebParts.IWebPartRow](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.WebParts.IWebPartRow) Web Part and an T:Microsoft.SharePoint.WebPartPages.IFilterValues Web Part to the Report Viewer Web Part at the same time.
