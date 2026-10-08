---
title: "Hide page header or footer on first or last page of a paginated report"
description: Do you want a header or footer on the first or last page of your report? If not, find out how to turn off display of the header or footer in Report Builder.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Hide page header or footer on first or last page of a paginated report (Report Builder)

  **Applies to:**
 


  A paginated report can contain a page header and page footer that run along the top and bottom of each page, respectively. After you add a header or footer, you can selectively hide it on the first and last pages of a report.  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
### To hide a page header on the first or last page  
  
1.  Open a report in Design view.  
  
2.  Right-click the page header, and then click **Header Properties**. The **Report Header Properties** dialog box opens.  
  
3.  Verify that **Display header for this report** is not selected.  
  
4.  In the **Print options** section, clear the check box for each option to hide the display on the first or last page of the report.  
  
5.  Select **OK**.
  
### To hide a page footer on the first or last page  
  
1.  Open a report in Design view.  
  
2.  Right-click the page footer, and then click **Footer Properties**. The **Report Footer Properties** dialog box opens.  
  
3.  Verify that **Display footer for this report** is not selected.  
  
4.  In the **Print options** section, clear the check box for each option to hide the display on the first or last page of the report.  
  
5.  Select **OK**.
  
## Related content

- [Page headers and footers in a paginated report (Report Builder)](page-headers-and-footers-report-builder-and-ssrs.md)
- [Pagination in paginated reports (Microsoft Report Builder)](pagination-in-reporting-services-report-builder-and-ssrs.md)
- [Add or remove a page header or footer in a paginated report (Report Builder)](add-or-remove-a-page-header-or-footer-report-builder-and-ssrs.md)
