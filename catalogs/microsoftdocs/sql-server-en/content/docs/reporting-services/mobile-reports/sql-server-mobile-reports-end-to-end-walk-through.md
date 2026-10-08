---
title: "SQL Server mobile reports: End-to-end walk-through"
description: Learn to create mobile reports on SQL Server Mobile Report Publisher, save reports on the Reporting Services web portal, & view reports in Power BI mobile apps.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: mobile-reports
ms.topic: how-to
ms.custom:
  - updatefrequency5
---
# SQL Server mobile reports: End-to-end walk-through

> **Note:**
> SQL Server Mobile Report Publisher is deprecated for all releases of SQL Server Reporting Services after SQL Server Reporting Services 2019. It's discontinued starting in SQL Server Reporting Services 2022 and Power BI Report Server.


Walk through creating mobile reports for any screen size with SQL Server Mobile Report Publisher
 on the  Reporting Services 
 web portal, and viewing them in the Power BI mobile apps.

Create mobile reports on a design surface with adjustable grid rows and columns, and flexible mobile report elements. Connect to various on-premises data sources, or upload Excel workbooks to create mobile reports. Then save your reports to a  Reporting Services 
 web portal and view them in a browser, or in the Power BI mobile apps.  
  
This article walks you through:   
  
- Creating a shared data source and dataset on the  Reporting Services 
 web portal, using the AdventureWorks database as a sample data source
- Creating  a Reporting Services mobile report in the Mobile Report Publisher 
  
- Publishing the mobile report to the  Reporting Services 
 web portal
- Viewing the mobile report in the Power BI mobile app
  
## Before we start  
To follow along, you need these products:  
  
* To create data sources and KPIs, and publish datasets and mobile reports, you need access to a [Reporting Services native mode report server](../install-windows/install-reporting-services-native-mode-report-server.md).  
* To create shared datasets, [install Report Builder](../install-windows/install-report-builder.md).  
* To create mobile reports, [install SQL Server Mobile Report Publisher](../reporting-services-features-and-tasks-ssrs.md).  
* [AdventureWorks sample databases](https://github.com/Microsoft/sql-server-samples/releases).  
*  OR: World Wide Importers sample database, available from the [Microsoft SQL Server Samples](../../samples/sql-samples-where-are.md) page.
* To view the result: 
  *   [Sign up for the Power BI service](https://go.microsoft.com/fwlink/?LinkID=513879) and
  *  [Download the Power BI mobile app](https://learn.microsoft.com/power-bi/consumer/mobile/mobile-apps-for-mobile-devices) to your mobile device: iOS, Android phone, or Windows device.  

  
## Create a shared data source  
  
You can create a shared data source for your mobile reports from any of the data sources Reporting Services supports. For more information, see the [list of supported data sources](../report-data/data-sources-supported-by-reporting-services-ssrs.md).  
  
1. From your  Reporting Services 
 web portal, select **New**, and then choose **Data Source**.  
  
   Screenshot of the New menu showing all of the menu options.
  
3. Enter your data source information, and then select **OK**.  
  
    By default, data sources aren't displayed in the portal.    
   
5. To view data sources, select **Display**, and then choose **Data Source**.  
  
   Screenshot of the New menu with the Data Source option highlighted.
  
   
6. Now you see the data source in the  Reporting Services 
 portal.  
  
   Screenshot of the selected data source in the portal.
 
For more information, see [shared data sources in Reporting Services](../report-data/create-modify-and-delete-shared-data-sources-ssrs.md).  
   
## <a name="shared-dataset">Create a shared dataset</a>  
  
Use an existing  Reporting Services 
 client tool, such as Report Designer in  SQL Server Data Tools (SSDT) 
, to create the shared dataset.  This walkthrough uses Report Builder
. [Install Report Builder](../install-windows/install-report-builder.md), or launch it from your web portal. You create three datasets, one each for: the KPI value, the KPI trend, and one with more fields for the Reporting Services mobile report.     
  
1. From your  Reporting Services 
 web portal, select **New**, then choose **Paginated Report** to start Report Builder
.  
  
   Screenshot of all the New menu options.
   
2. Select **New Dataset**.  
  
   Screenshot of the New Dataset option to select.
  
   
3. Select **Browse other data sources**.  
   
4. In the **Name** field, enter the name of the server where you saved your data source, in this format:   
   
   Name: `https://*localhost*/ReportServer`  
   Items of type: `Data Sources (*.rsds)`  
   
5. Select **Open**, and navigate to the data source you created on that server.  
   
6. Choose your data source and select **Open** again.    
  
7. Design  your dataset in Report Builder
.  
  
   Screenshot of the tables in the Database view.
   
8. When complete, save the dataset to the SSRS
 report server.    
   
Now you can use the dataset as the basis for your KPIs and mobile reports. You can create multiple datasets against the same data source. And you can create multiple KPIs and mobile reports against these shared datasets.   
  
## <a name="create-KPI">Create a KPI</a>  
You create KPIs right in the  Reporting Services 
 web portal.    
  
1. In the web portal, select **New**, and then choose **New KPI**.   
  
   Another screenshot of all the New menu options.
  
      
   In the KPI creation screen, you can manually enter values, or to use a shared dataset.    
1. Change **Value** from **Set manually** to **Dataset field**.  
   
   Screenshot of the Dataset field option.
  
1. Select the ellipsis (**...**) in the **Pick dataset field** box, and select a dataset from the previous step.  
   
   Screenshot of the Choose a Dataset panel.
 
1. Choose the field in the dataset.    
   
   Screenshot of the Choose a field from AWSalesYTD section.
     
1. Choose the aggregation you want to view. KPIs can only display one number, so the field is aggregated to show that number.

   Screenshot of the Choose a field from AWSalesYTD section showing the Average Aggregation section.


1. Select **OK**.

1. In the **Trend set** box, select **Dataset trend**.  
  
1. In the **Pick dataset trend** box, select the ellipsis (**...**). 
   
1. Select a field and choose **OK**.  

   Screenshot of the Choose a trend from AWSalesYTD section.
  
1. Give your KPI a name and pick a visualization type, and select **Create**.   
  
   The KPI appears on the  Reporting Services 
 web portal.  
   
    Screenshot of the new KPI visualization.
    
## <a name="create-mobile-report">Create a Reporting Services mobile report</a>  
   
To create a Reporting Services mobile report, [install SQL Server Mobile Report Publisher](../reporting-services-features-and-tasks-ssrs.md), or launch it from the  Reporting Services 
 web portal. 

When you first open Mobile Report Publisher 
, you see a blank canvas where you can create your mobile report. You can start by creating visuals first, or start with your data. If you create the visuals first, Mobile Report Publisher 
 automatically generates simulated data that is tied to the report and changes dynamically as you change your visual selections. Try this action yourself.   
  
## Start with the visuals  
  
1. From your  Reporting Services 
 web portal, select **New**. Choose **Mobile Report** to start Mobile Report Publisher 
.  
  
   Screenshot of the full list of New menu items.


   Mobile Report Publisher 
 opens to the primary layout grid.  
  
1. On the **Layout** tab, scroll down to the Charts section.  
  
   Screenshot of the Charts section of the Layout tab.
  
1. Drag the **Tree Map** to the grid, and drag the lower-right corner to make it three columns wide and three rows high.  
  
   Screenshot of the Tree Map and its two columns.
 
1. You can see its visual properties at the bottom. You might have to scroll sideways to see them all.   
  
   Screenshot of the Tree Map visual properties.
  
1. With the tree map visual selected, select the **Data** tab in the upper-left corner.   
  
   Now you see the simulated fields and values that Mobile Report Publisher 
 generated, and see what the size and the color represent in the tree map.  
  
   Screenshot of the tree map and the simulated data fields.
  
1. Select the **Layout** tab.  
  
1. Select the Options cog  in the upper-right corner of the tree map to see the menu it contains.   
  
   Screenshot of the Options wheel in the tree map.
  
1. Select the arrow in the middle of the wheel to close it.  
  
## Add your own data  
  
1. Switch to the **Data** tab.    
   
1. To add your own data, select **Add Data** in the upper-right corner, and navigate to your data.    
  
1. You could use data from a local Excel workbook, but in this case, it's from the shared dataset on your  Reporting Services 
 web portal. You see a "Server added" message.  
  
1. Select the server, then select the dataset you created.  
   
1. Back on the **Data** tab, in the **Data Properties** pane change **Size Represents**, **Color Represents**, and other properties to fields in your own data. 
   
   *  **Size Represents**, **Color Represents**, and **Custom Center Value** have to be fields with numeric values. 
   *  **Group By** is a category, so it's a text field.
   
   Screenshot of the Data properties section.
   
1. Select **Preview** to see the tree map updated with your data.  

## Add a gauge to your mobile report

Let's add a gauge to see how year-to-date sales compare to last year's sales, using the same dataset.

1. On the Layout tab, drag a Half-donut to the canvas. place it under the tree map and drag the lower-right corner to make it three squares wide by two squares high. 

2. Again, it starts with simulated data. 

   In **Visual properties**, by default **Higher values are better**, and the **Delta label** is a **Percentage of target**. It has default **Range stops** you can change, but for now they're fine.

   Screenshot of the Set ranges section of the mobile report donut visual properties.

   
3. On the **Data** tab, select the table with your data and select the **Main Value** field and the field you want to compare it to in **Comparison Value**.

4. You can choose different aggregations to come up with one number for **Main Value** and one for **Comparison Value**. By default, it's a sum.

   Screenshot of the Options or the Comparison Value.


5. Select **Preview** to see how it looks. 

   Screenshot of the mobile report donut preview.


## Add a selection list as a filter

Selection lists act like slicers in Power BI and Excel. We can add one to filter the other visuals in the mobile report.

1. On the **Layout** tab, drag a selection list to the right of the tree map, and drag the lower-right corner to make it two squares wide and as tall as the canvas, five squares. 

   Screenshot of the mobile report selection list.

2. On the **Data** tab, **Data properties**, set **Keys** and **Labels** to a field in your data that you want to filter on.

   Screenshot of the data properties section of the mobile report selection list.

   
## Create a mobile report for phones  
  
Now that you created visuals on the primary layout, you can create a mobile report with a layout optimized for your phone users.    
  
1. In the upper-right corner, select the canvas icon, and then choose **Phone**.  
  
2. On the **Layout** tab under **Control Instances**, you see the two charts you created.   
  
3. Drag the tree map to the phone canvas and make it four columns wide and three rows high.  
  

## Save your mobile report  
You can save your report locally or to a  Reporting Services 
 web portal. If you save it locally, Mobile Report Publisher 
 saves it with cached data, so you can open it and continue working on it. But you can't view it on a mobile device.   
  
1. Select the save icon in the upper-left corner.   
   
2. To share it with others and view it on a mobile device, select **Save to Server**.  
  
3. On the server, browse to the folder where you want to save your mobile report.  
  
4. Select **Choose Folder**, and then choose **Save**.  
  
   You get a message confirming the report is saved.  
    
   After you save, you can return to the portal and see your mobile report thumbnail.   
    
5. Tap the thumbnail to see the report in the web portal.  
  
## View your report on a mobile device   
  
To view your  Reporting Services 
 report, you first need to:

*  [Sign up for the Power BI service](https://go.microsoft.com/fwlink/?LinkID=513879), if you don't have an account. yet.
*  [Download the Power BI mobile app](https://powerbi.microsoft.com/documentation/powerbi-power-bi-apps-for-mobile-devices/) to your mobile device.  

### View your mobile report
  
1.  Open and sign into the Power BI app on your mobile device.  
    
1.  To view your Reporting Services mobile reports and KPIs, tap **Reporting Services**.  
Screenshot of the Reporting Services button.
  
  
1. Tap the options icon  in the upper-left corner, and tap **Connect to Server**.  
  
   Screenshot of the highlighted Samples button.
  
  
1. Give the server a name, and fill in the server address and your email address and password, in this format:  
  
   Screenshot of the sign in screen to the Contoso organization.
  
  
1.  Now you see the server in the left navigation bar.  
  
    Screenshot of the Ssrs 2016 demo server in the navigation bar.
  
      
> **Tip:**
> Tap the options icon  anytime to go between your Reporting Services mobile reports in the Reporting Services web portal and your dashboards in the Power BI service.  

  
## View KPIs and mobile reports in the Power BI app  
  
Tap the **KPIs** or **Mobile Reports** tab.   
  
Screenshot of the Ssrs 2016 demo server mobile report.
  
  
- Tap a KPI to see it in focus mode.  
  
    Screenshot of the Ssrs 2016 demo server data in focus mode.
  
  
- Tap a mobile report to open and interact with it in the Power BI app.  
  
The KPIs and mobile reports are displayed in the same folders they're in on the Reporting Services web portal.   
  
## Related content

- [on-premises report server mobile reports and KPIs in the Power BI mobile app](https://learn.microsoft.com/power-bi/consumer/mobile/mobile-app-ssrs-kpis-mobile-on-premises-reports)
- [on-premises report server mobile reports and KPIs in the Power BI mobile app for Windows devices](https://powerbi.microsoft.com/documentation/powerbi-mobile-win10-kpis-mobile-reports/)
