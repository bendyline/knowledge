---
title: "Lesson 3: Define a data-driven subscription"
description: Use the Reporting Services web portal's data-driven subscription pages to connect to a subscription data source and build a query that retrieves subscription data.
ms.date: 09/25/2024
ms.service: reporting-services
ms.subservice: reporting-services
ms.topic: tutorial
ms.custom:
  - updatefrequency5
---
# Lesson 3: Define a data-driven subscription
In this  Reporting Services 
 tutorial lesson, you use the  Reporting Services 
 web portal's data-driven subscription pages to connect to a subscription data source. You then build a query that retrieves subscription data, and you map the result set to report and delivery options.  
  
> **Note:**  
> Before you start, verify that ** SQL Server 
 Agent** service is running. If it is not running, you cannot save the subscription.  One method for verification is to open the [SQL Server Configuration Manager](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/sql-server-configuration-manager.md).
This lesson assumes you completed Lesson 1 and Lesson 2 and that the report data source uses stored credentials.  For more information, see [Lesson 2: Modifying the report data Source properties](lesson-2-modifying-the-report-data-source-properties.md)  
  
## <a name="bkmk_startwizard"></a>Start the data-driven Subscription Wizard  
  
1.  In  Reporting Services 
 web portal, select **Home**, and navigate to the folder containing the **Sales Orders** report.  
  
2.  In the context menu  of the report, select **Manage**, and then choose **Subscriptions** in the left pane.  
  
3. Select **+ New Subscription**. If you don't see this button, you don't have Content Manager permissions.
  
## Define a description  
1.  Type **Sales Order delivery** in description.

## Type
1. Select **Data-driven subscription**. 

## Schedule
1. In the schedule section, select **Report-specific schedule**.
2. Select **Edit schedule**.
3. In **Schedule Details**, select **Once**.  
4. Specify a start time that is a few minutes ahead of the current time.  
5. Specify the **Start and end dates**.
6. Select **Apply**.

## Destination  
1.  In the Destination section, select **Windows File Share** for the method of delivery.  

## Dataset
1. Select **Edit Dataset**.
2. Select **A custom data source**.
3. Select **Microsoft SQL Server** as the data source **Connection** type.
4. In Connection string, type the following connection string. *Subscribers* is the database you created in lesson 1. 
  
    ```  
    data source=localhost; initial catalog=Subscribers
    ```
    
## Credentials
1. Select **Using the following credentials**.
2. Select **Windows user name and password**.
3.  In **User Name** and **Password**, type your domain user name and password. Include both the domain and user account when specifying **User Name**.

> **Note:**  
> Credentials used to connect to a subscriber data source are not passed back to  Management Studio
. If you modify the subscription later, you must retype the password used to connect to the data source.

## Query      
1.  In the query box, type the following query:  
  
    ```
    Select * from OrderInfo  
    ```  
  
2.  Specify a time-out of 30 seconds.  
  
3.  Select **Validate query**, and then choose **Apply**.

## Delivery options
Fill in the following values:

| Parameter | Source of value | Value/field |
| --- | --- | --- |
| **File name** | Get value from dataset | Order |
| **Path** | Enter value | In the Value, type the name of a public file share for which you have write permissions (for example, `\\mycomputer\public\myreports`). |
| **Render Format** | Get value from dataset | Format |
| **Write mode** | Enter value | Autoincrement |
| **File Extension** | Enter value | True |
| **User Name** | Enter value | Type your domain user account. Enter it in this format: \<domain>\\\<account>. The user account needs to have permissions to the path you configured. |
| **Password** | Enter value | Type your password |
| **Use file share account** | Enter value | False |

## Report parameters
 1. In the **OrderNumber** field, select **Get value from dataset**. In Value, select **Order**. 
 2. Select **Create Subscription**.
   
## Related content

- [Subscriptions and delivery (Reporting Services)](subscriptions/subscriptions-and-delivery-reporting-services.md)
- [Data-driven subscriptions in Reporting Services](subscriptions/data-driven-subscriptions.md)
- [Create, modify, and delete data-driven subscriptions](subscriptions/create-modify-and-delete-data-driven-subscriptions.md)
- [Use an external data source for subscriber data (data-driven subscription)](subscriptions/use-an-external-data-source-for-subscriber-data-data-driven-subscription.md)
