---
title: "Images, text boxes, rectangles, and lines in a paginated report"
description: Add visual interest, highlight key information, or provide related information in Report Builder. Add images, text boxes, rectangles, and lines in a paginated report.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: concept-article
ms.custom:
  - updatefrequency5
---
# Images, text boxes, rectangles, and lines in a paginated report (Report Builder)

  **Applies to:**
 


  In addition to data regions like tables, matrices, and charts, paginated reports use other report items like images, text boxes, and rectangles to add visual interest, highlight key information, or provide related information. You can change the formatting of a report item. For example, you can add a border or padding, change the initial visibility or direction, or specify an exact size and location for the item.  
  
> **Note:**  
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
  
  
## In This Section  
 [Text Boxes (Report Builder and SSRS)](text-boxes-report-builder-and-ssrs.md)  
 Text boxes can be placed anywhere on a report and can contain labels, fields, or calculated data. You use expressions to define the value to display in a text box when you view a report.  
  
 Every cell in a table or matrix is also a text box, which you can format in the same way that you format stand-alone text boxes.  
  
 [Rectangles and Lines (Report Builder and SSRS)](rectangles-and-lines-report-builder-and-ssrs.md)  
 **Lines** display horizontally, vertically, or diagonally. A line is defined with a start and endpoint and can have various styles (for example, weight and color) assigned to it. A line has no data associated with it.  
  
 **Rectangles** can be used as a graphical element, or as a container for other report items. As a graphical element, a rectangle has the same properties as a line. As a container, a rectangle acts as a parent container for all report items inside it. Placing report items in a parent container helps control how they appear on each report page.  
  
 [Images (Report Builder and SSRS)](images-report-builder-and-ssrs.md)  
 Images display binary image data in a report. You provide the source for the image. The source can be a URL reference to an image stored on a Web server, a reference to embedded image data, or a reference to binary image data in a database. Report Builder and Report Designer support .bmp, .jpeg, .gif, and .png files.  
  
## Related content

- [Format paginated report items (Report Builder)](formatting-report-items-report-builder-and-ssrs.md)
