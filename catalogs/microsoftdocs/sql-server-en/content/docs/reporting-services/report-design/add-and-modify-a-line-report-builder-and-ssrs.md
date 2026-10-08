---
title: "Add and modify a line in a paginated report"
description: Customize the appearance of reports by adding a graphical element to separate sections or by editing line properties that change color or style in Report Builder.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: report-design
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Add and modify a line in a paginated report (Report Builder)

  **Applies to:**
 


  You can add a line to a paginated report when you want a graphical element to separate sections of the report. You can customize the appearance of the line by editing line properties such as color or style. For example, you might want to incorporate company colors into the report.    
    
> **Note:**    
>    You can create and modify paginated report definition (.rdl) files in Microsoft Report Builder, [Power BI Report Builder](https://learn.microsoft.com/power-bi/paginated-reports/report-builder-power-bi), and in Report Designer in SQL Server Data Tools.
    
    
## Add a line    
    
1.  On the **Insert** tab, select **Line**.    
    
1.  On the design surface, choose where you want one end of the line, and then choose where you want the other end.    
    
     As you move the end of the line, "snap lines" appear as the end lines up with other objects on the design surface. These lines help you if you want objects to be aligned.    
    
1.  To change the line properties, select the line on the design surface and then edit its properties in the **Border** section of the **Home** tab.    
    
    > **Note:**    
    >  If you set the line style to **Double** and the line width is 1 1/2 pt or narrower, the line may not appear double when you run the report in Report Builder, Report Designer, or a  Reporting Services 
 web portal. It appears double when you export the report to other formats such as Microsoft Word and Acrobat PDF.    
    
## Related content

- [Rectangles and lines in a paginated report (Report Builder)](rectangles-and-lines-report-builder-and-ssrs.md)
