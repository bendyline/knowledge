---
description: "Learn more about: How to: Filter Related Data"
title: "How to: Filter Related Data"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: ec8b8f97-5d01-4f31-9b97-d1556df6a4bc
---
# How to: Filter Related Data

Use the [System.Data.Linq.DataLoadOptions.AssociateWith*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataLoadOptions.AssociateWith*) method to specify sub-queries to limit the amount of retrieved data.

## Example

 In the following example, the [System.Data.Linq.DataLoadOptions.AssociateWith*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataLoadOptions.AssociateWith*) method limits the `Orders` retrieved to those that have not been shipped today. Without this approach, all `Orders` would have been retrieved even though only a subset is desired.

 [System.Data.Linq.DataLoadOptions#1 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/system.data.linq.dataloadoptions/cs/program.cs#1)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/system.data.linq.dataloadoptions/cs/program.cs.md)
 [System.Data.Linq.DataLoadOptions#1 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/system.data.linq.dataloadoptions/vb/module1.vb#1)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/system.data.linq.dataloadoptions/vb/module1.vb.md)

## See also

- [Querying the Database](querying-the-database.md)
