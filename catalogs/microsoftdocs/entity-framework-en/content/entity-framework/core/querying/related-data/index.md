---
title: Loading Related Data - EF Core
description: Different strategies for loading related data with Entity Framework Core
author: SamMonoRT
ms.date: 9/11/2020
uid: core/querying/related-data
---
# Loading Related Data

Entity Framework Core allows you to use the navigation properties in your model to load related entities. There are three common O/RM patterns used to load related data.

* **[Eager loading](eager.md)** means that the related data is loaded from the database as part of the initial query.
* **[Explicit loading](explicit.md)** means that the related data is explicitly loaded from the database at a later time.
* **[Lazy loading](lazy.md)** means that the related data is transparently loaded from the database when the navigation property is accessed.

> **Tip:**
> You can view the [samples](https://github.com/dotnet/EntityFramework.Docs/tree/main/samples/core/Querying/RelatedData) under this section on GitHub.
