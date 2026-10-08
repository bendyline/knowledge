---
title: "Interactive sort, document maps, and links in a paginated report"
description: Enable your users to change the sort order of values in a paginated report, show or hide items, or select links to other reports or Web pages in Report Builder.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---
# Interactive sort, document maps, and links in a paginated report (Report Builder)

  **Applies to:**
 


  In Web-based environments, you can add a number of features that let your users interact with paginated reports. Your users can change the sort order of values in your report, show or hide items in the report, or click links that go to other reports or Web pages. You can also add a table of contents or document map. Your report users can click items in the table of contents or document map to jump to areas within a report.  
  
 Report Builder and Report Designer support three types of links with the following actions:  
  
-   **Bookmark links** Jump to other areas within the report.  
  
-   **Hyperlinks** Jump to URLs that specify the address of Web pages or reports on a report server by using URL access.  
  
-   **Drillthrough report links** Jump to other reports on the same report server. For more information, see [Drillthrough Reports (Report Builder and SSRS)](drillthrough-reports-report-builder-and-ssrs.md).  
  
> **Note:**  
>  Links that are bound to dataset fields can be vulnerable to tampering for malicious purposes. For more information, see [Secure Reports and Resources](../security/secure-reports-and-resources.md).  
  
 You can also let your users control report display and content by designing expressions that include parameter references for sort, filter, and visibility. For more information, see [Report Parameters (Report Builder and Report Designer)](report-parameters-report-builder-and-report-designer.md), [Filter, Group, and Sort Data (Report Builder and SSRS)](filter-group-and-sort-data-report-builder-and-ssrs.md), and [Add Dataset Filters, Data Region Filters, and Group Filters (Report Builder and SSRS)](add-dataset-filters-data-region-filters-and-group-filters.md).  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## In This Section  
 [Interactive Sort (Report Builder and SSRS)](interactive-sort-report-builder-and-ssrs.md)  
 Explains how to add interactive sort buttons to column headers.  
  
 [Create a Document Map (Report Builder and SSRS)](create-a-document-map-report-builder-and-ssrs.md)  
 Explains how to add a table of contents to support navigation in a large report.  
  
 [Add a Bookmark to a Report (Report Builder and SSRS)](add-a-bookmark-to-a-report-report-builder-and-ssrs.md)  
 Explains how to add bookmarks to create links within a report.  
  
 [Add a Hyperlink to a URL (Report Builder and SSRS)](add-a-hyperlink-to-a-url-report-builder-and-ssrs.md)  
 Explains how to add a link from your report to a URL  
  
## Related content

- [Drillthrough, drilldown, subreports, and nested data regions in a paginated report (Report Builder)](drillthrough-drilldown-subreports-and-nested-data-regions.md)
