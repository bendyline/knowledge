---
description: "Learn more about: Retrieving Objects from the Identity Cache"
title: "Retrieving Objects from the Identity Cache"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 96c13903-ccb6-4a0e-ab6a-8ca955ca314d
---
# Retrieving Objects from the Identity Cache

This topic describes the types of LINQ to SQL queries that return an object from the identity cache that is managed by the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext).

 In LINQ to SQL, one of the ways in which the [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) manages objects is by logging object identities in an identity cache as queries are executed. In some cases, LINQ to SQL will attempt to retrieve an object from the identity cache before executing a query in the database.

 In general, for a LINQ to SQL query to return an object from the identity cache, the query must be based on the primary key of an object and must return a single object. In particular, the query must be in one of the general forms shown below.

> **Note:**
> Pre-compiled queries will not return objects from the identity cache. For more information about pre-compiled queries, see [System.Data.Linq.CompiledQuery](https://learn.microsoft.com/search/?terms=System.Data.Linq.CompiledQuery) and [How to: Store and Reuse Queries](how-to-store-and-reuse-queries.md).

 A query must be in one of the following general forms to retrieve an object from the identity cache:

- [System.Data.Linq.Table`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601) `.Function1(` `predicate` `)`

- [System.Data.Linq.Table`1](https://learn.microsoft.com/search/?terms=System.Data.Linq.Table%601) `.Function1(` `predicate` `).Function2()`

 In these general forms, `Function1`, `Function2`, and `predicate` are defined as follows.

 `Function1` can be any of the following:

- [System.Linq.Queryable.Where*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Where*)

- [System.Linq.Queryable.First*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.First*)

- [System.Linq.Queryable.FirstOrDefault*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.FirstOrDefault*)

- [System.Linq.Queryable.Single*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Single*)

- [System.Linq.Queryable.SingleOrDefault*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.SingleOrDefault*)

 `Function2` can be any of the following:

- [System.Linq.Queryable.First*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.First*)

- [System.Linq.Queryable.FirstOrDefault*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.FirstOrDefault*)

- [System.Linq.Queryable.Single*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.Single*)

- [System.Linq.Queryable.SingleOrDefault*](https://learn.microsoft.com/search/?terms=System.Linq.Queryable.SingleOrDefault*)

 `predicate` must be an expression in which the object's primary key property is set to a constant value. If an object has a primary key defined by more than one property, each primary key property must be set to a constant value. The following are examples of the form `predicate` must take:

- `c => c.PK == constant_value`

- `c => c.PK1 == constant_value1 && c=> c.PK2 == constant_value2`

## Example

 The following code provides examples of the types of LINQ to SQL queries that retrieve an object from the identity cache.

 [L2S_QueryCache#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/l2s_querycache/cs/program.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/l2s_querycache/cs/program.cs.md)
 [L2S_QueryCache#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/l2s_querycache/vb/module1.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/l2s_querycache/vb/module1.vb.md)

## See also

- [Query Concepts](query-concepts.md)
- [Object Identity](object-identity.md)
- [Background Information](background-information.md)
- [Object Identity](object-identity.md)
