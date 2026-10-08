---
description: "Learn more about: How to: Display LINQ to SQL Commands"
title: "How to: Display LINQ to SQL Commands"
ms.date: "03/30/2017"
dev_langs:
  - "csharp"
  - "vb"
ms.assetid: 1decb05e-37ad-4ed6-ab2f-071eb4c4f628
---
# How to: Display LINQ to SQL Commands

Use [System.Data.Linq.DataContext.GetCommand*](https://learn.microsoft.com/search/?terms=System.Data.Linq.DataContext.GetCommand*) to display SQL commands and other information.

## Example

 In the following example, the console window displays the output from the query, followed by the SQL commands that are generated, the type of commands, and the type of connection.

 [DLinqDebuggingSupport#3 (complete source file; reference: ../../../../../../samples/snippets/csharp/VS_Snippets_Data/DLinqDebuggingSupport/cs/Program.cs#3)](../../../../../../_code/samples/snippets/csharp/VS_Snippets_Data/DLinqDebuggingSupport/cs/Program.cs.md)
 [DLinqDebuggingSupport#3 (complete source file; reference: ../../../../../../samples/snippets/visualbasic/VS_Snippets_Data/DLinqDebuggingSupport/vb/Module1.vb#3)](../../../../../../_code/samples/snippets/visualbasic/VS_Snippets_Data/DLinqDebuggingSupport/vb/Module1.vb.md)

 Output appears as follows:

```console
Customers from London:
    Thomas Hardy
    Victoria Ashworth
    Elizabeth Brown
    Ann Devon
    Simon Crowther
    Marie Bertrand
    Hari Kumar
    Dominique Perrier
```

```console
Command Text:
SELECT [t0].[CustomerID], [t0].[CompanyName], [t0].[ContactName], [t0].[ContactT
itle], [t0].[Address], [t0].[City], [t0].[Region], [t0].[PostalCode], [t0].[Coun
try], [t0].[Phone], [t0].[Fax]
FROM [dbo].[Customers] AS [t0]
WHERE [t0].[City] = @p0

Command Type: Text

Connection: System.Data.SqlClient.SqlConnection
```

## See also

- [Debugging Support](debugging-support.md)
