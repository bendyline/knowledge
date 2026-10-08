---
description: "Learn more about: How to: Display a ChangeSet"
title: "How to: Display a ChangeSet"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 126e7245-c5a0-4ebf-800d-cc1fcf9cd0ab
---
# How to: Display a ChangeSet

You can view changes tracked by a [System.Data.Linq.DataContext](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext) by using [System.Data.Linq.DataContext.GetChangeSet*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.GetChangeSet*).

## Example

 The following example retrieves customers whose city is London, changes the city to Paris, and submits the changes back to the database.

 [DLinqDebuggingSupport#2 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqDebuggingSupport/cs/Program.cs#2)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqDebuggingSupport/cs/Program.cs.md)
 [DLinqDebuggingSupport#2 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqDebuggingSupport/vb/Module1.vb#2)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqDebuggingSupport/vb/Module1.vb.md)

 Output from this code appears similar to the following. Note that the summary at the end shows that eight changes were made.

 ```console
CustomerID: AROUT
   Original value: London
   Updated value: Paris
CustomerID: BSBEV
   Original value: London
   Updated value: Paris
CustomerID: CONSH
   Original value: London
   Updated value: Paris
CustomerID: EASTC
   Original value: London
   Updated value: Paris
CustomerID: NORTS
    Original value: London
    Updated value: Paris
CustomerID: PARIS
    Original value: London
    Updated value: Paris
CustomerID: SEVES
    Original value: London
    Updated value: Paris
CustomerID: SPECD
    Original value: London
    Updated value: Paris
Total changes: {Added: 0, Removed: 0, Modified: 8}
```

## See also

- [Debugging Support](debugging-support.md)
