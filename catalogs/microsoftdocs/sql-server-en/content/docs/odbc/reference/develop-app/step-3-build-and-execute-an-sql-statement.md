---
title: "Step 3: Build and Execute a SQL Statement"
description: "Step 3: Build and Execute a SQL Statement"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, sunilbs, mcimfl
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: how-to
helpviewer_keywords:
  - "application process [ODBC], building and executing statements"
  - "SQL statements [ODBC], building and executing"
---
# Step 3: Build and Execute a SQL Statement
The third step is to build and execute a SQL statement, as shown in the following illustration. The methods used to perform this step are likely to vary tremendously. The application might prompt the user to enter a SQL statement, build a SQL statement based on user input, or use a hard-coded SQL statement. For more information, see [Constructing SQL Statements](constructing-sql-statements.md).  
  
 Shows building and executing a SQL statement  
  
 If the SQL statement contains parameters, the application binds them to application variables by calling **SQLBindParameter** for each parameter. For more information, see [Statement Parameters](statement-parameters.md).  
  
 After the SQL statement is built and any parameters are bound, the statement is executed with **SQLExecDirect**. If the statement will be executed multiple times, it can be prepared with **SQLPrepare** and executed with **SQLExecute**. For more information, see [Executing a Statement](executing-a-statement.md).  
  
 The application might also forgo executing a SQL statement altogether and instead call a function to return a result set containing catalog information, such as the available columns or tables. For more information, see [Uses of Catalog Data](uses-of-catalog-data.md).  
  
 The application's next action depends on the type of SQL statement executed.  
  
| Type of SQL statement | Proceed to |
| --- | --- |
| **SELECT** or catalog function | [Step 4a: Fetch the Results](step-4a-fetch-the-results.md) |
| **UPDATE**, **DELETE**, or **INSERT** | [Step 4b: Fetch the Row Count](step-4b-fetch-the-row-count.md) |
| All other SQL statements | Step 3: Build and Execute a SQL Statement (this topic) or [Step 5: Commit the Transaction](step-5-commit-the-transaction.md) |
