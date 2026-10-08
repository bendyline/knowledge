---
description: "Learn more about: How to: Bracket Data Submissions by Using Transactions"
title: "How to: Bracket Data Submissions by Using Transactions"
ms.date: "03/30/2017"
dev_langs: 
  - "csharp"
  - "vb"
ms.assetid: 94044a31-de90-479b-935a-8159b4ae5c5a
---
# How to: Bracket Data Submissions by Using Transactions

You can use [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope) to bracket your submissions to the database. For more information, see [Transaction Support](transaction-support.md).  
  
## Example  

 The following code encloses the database submission in a [System.Transactions.TransactionScope](https://learn.microsoft.com/search/?terms=System.Transactions.TransactionScope).  
  
 [DLinqSubmittingChanges#3 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqSubmittingChanges/cs/Program.cs#3)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqSubmittingChanges/cs/Program.cs.md)
 [DLinqSubmittingChanges#3 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqSubmittingChanges/vb/Module1.vb#3)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqSubmittingChanges/vb/Module1.vb.md)  
  
## See also

- [Downloading Sample Databases](downloading-sample-databases.md)
- [Making and Submitting Data Changes](making-and-submitting-data-changes.md)
- [Transaction Support](transaction-support.md)
