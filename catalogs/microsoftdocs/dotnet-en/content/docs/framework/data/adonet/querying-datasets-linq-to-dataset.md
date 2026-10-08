---
description: "Learn more about: Querying DataSets (LINQ to DataSet)"
title: "Querying DataSets (LINQ to DataSet)"
ms.date: "03/30/2017"
ms.assetid: bb68d2e4-623d-4d60-85e3-965254f6fee7
---
# Querying DataSets (LINQ to DataSet)

After a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object has been populated with data, you can begin querying it. Formulating queries with LINQ to DataSet is similar to using Language-Integrated Query (LINQ) against other LINQ-enabled data sources. Remember, however, that when you use LINQ queries over a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) object, you're querying an enumeration of [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) objects instead of an enumeration of a custom type. This means that you can use any of the members of the [System.Data.DataRow](https://learn.microsoft.com/search/?terms=System.Data.DataRow) class in your LINQ queries. This lets you create rich, complex queries.  
  
 As with other implementations of LINQ, you can create LINQ to DataSet queries in two different forms: query expression syntax and method-based query syntax. You can use query expression syntax or method-based query syntax to perform queries against single tables in a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet), against multiple tables in a [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet), or against tables in a typed [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet).  
  
## In This Section  

 [Single-Table Queries](single-table-queries-linq-to-dataset.md)  
 Describes how to perform single-table queries.  
  
 [Cross-Table Queries](cross-table-queries-linq-to-dataset.md)  
 Describes how to perform cross-table queries.  
  
 [Querying Typed DataSets](querying-typed-datasets.md)  
 Describes how to query typed [System.Data.DataSet](https://learn.microsoft.com/search/?terms=System.Data.DataSet) objects.  
  
## See also

- [LINQ to DataSet Examples](linq-to-dataset-examples.md)
- [Loading Data Into a DataSet](loading-data-into-a-dataset.md)
