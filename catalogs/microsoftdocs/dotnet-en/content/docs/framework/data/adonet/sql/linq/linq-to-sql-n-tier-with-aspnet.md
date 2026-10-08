---
description: "Learn more about: LINQ to SQL N-Tier with ASP.NET"
title: "LINQ to SQL N-Tier with ASP.NET"
ms.date: "03/30/2017"
ms.assetid: f6cc863a-d6a6-4281-ba8b-197c01cf6c6f
---
# LINQ to SQL N-Tier with ASP.NET

In ASP.NET applications that use LINQ to SQL
, you use the [System.Web.UI.WebControls.LinqDataSource](https://learn.microsoft.com/search/?terms=System.Web.UI.WebControls.LinqDataSource) Web server control. The control handles most of the logic that it must have to query against LINQ to SQL
, pass the data to the browser, retrieve it, and submit it to the LINQ to SQL
 [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) which then updates the database. You just configure the control in the markup, and the control handles all the data transfer between LINQ to SQL
 and the browser. Because the control handles the interactions with the presentation tier, and LINQ to SQL
 handles the communication with the data tier, your main focus in ASP.NET multi-tier applications is on writing your custom business logic.  
  
 For more information about `LINQDataSource`, see [LinqDataSource Web Server Control Overview](https://learn.microsoft.com/previous-versions/aspnet/bb547113\(v=vs.100\)).  
  
## See also

- [N-Tier and Remote Applications with LINQ to SQL](n-tier-and-remote-applications-with-linq-to-sql.md)
