---
title: "Open a mobile report with specific query string parameters"
description: For a Reporting Services mobile report with parameters and a data source, you can use query parameters in the report URL to open it with specified values.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: mobile-reports
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# Open a mobile report with specific query string parameters | Reporting Services

> **Note:**
> SQL Server Mobile Report Publisher is deprecated for all releases of SQL Server Reporting Services after SQL Server Reporting Services 2019. It's discontinued starting in SQL Server Reporting Services 2022 and Power BI Report Server.


If you have a  Reporting Services 
 mobile report with parameters and a  SQL Server 
 or  Analysis Services 
 data source, you can include query string parameters in the report URL. This action allows the report to open automatically with the values you specified. 
 
1.	Create a [mobile report with parameters](add-parameters-to-a-mobile-report-reporting-services.md).

1. Open the report in Mobile Report Publisher and select the **Data** tab. 

1. Find the name of the dataset on the tab at the bottom of the table, and the field name you want. 
    
    Screenshot of the mobile report publisher parameter data view.
    
1.	The syntax of the URL depends on your data source. 

     **For a SQL Server Analysis Services data source**: Build a URL with a query string parameter in this format:

    `https://<servername>/reports/<report-folder-name>/<report-name>?<dataset-name>.<field-name>=<parameter-value>`

    For example:
    
    `https://sampleserver/reports/adventureworks-reports/adventureworks-load-on-demand?TimeChartLoD.category=Clothing` 
    
     **For a SQL Server data source**: The query string parameter is almost the same, but has the `@` symbol in front of the field name:

    `https://<servername>/reports/<report-folder-name>/<report-name>?<dataset-name>.@<field-name>=<parameter-value>`

    For example:
    
      `https://sampleserver/reports/adventureworks-reports/adventureworks-load-on-demand?TimeChartLoD.@category=Clothing` 

    
1.	This URL opens the report on the server, automatically filtered to the parameter value you specified.

    Screenshot of the mobile report publisher parameter web portal view with an arrow pointing to the URL and specified parameter.


### Related content

[Add parameters to a mobile report](add-parameters-to-a-mobile-report-reporting-services.md)
