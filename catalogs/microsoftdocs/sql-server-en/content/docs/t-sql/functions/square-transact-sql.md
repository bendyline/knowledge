---
title: "SQUARE (Transact-SQL)"
description: "SQUARE (Transact-SQL)"
author: rwestMSFT
ms.author: randolphwest
ms.date: "03/03/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
f1_keywords:
  - "SQUARE"
  - "SQUARE_TSQL"
helpviewer_keywords:
  - "SQUARE"
  - "square values"
dev_langs:
  - "TSQL"
monikerRange: "=azure-sqldw-latest || >=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || =fabric"
---
# SQUARE (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 


 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 
 in Microsoft Fabric
](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 


  Returns the square of the specified float value.  
  
 
  
## Syntax  
  
```syntaxsql  
SQUARE ( float_expression )  
```  
  
## Arguments
 *float_expression*  
 Is an [expression](../language-elements/expressions-transact-sql.md) of type **float** or of a type that can be implicitly converted to float.  
  
## Return Types  
 **float**  
  
## Examples  
 The following example returns the volume of a cylinder having a radius of `1` inch and a height of `5` inches.  
  
```sql  
DECLARE @h FLOAT, @r FLOAT;  
SET @h = 5;  
SET @r = 1;  
SELECT PI()* SQUARE(@r)* @h AS 'Cyl Vol';  
```  
  
  Here's the result set. 
  
  
```  
Cyl Vol  
--------------------------  
15.707963267948966  
```  
  
## Examples:  Azure Synapse Analytics 
 The following example returns the square of each value in the `volume` column in the `containers` table.  
  
```sql  
-- Uses AdventureWorks  
  
CREATE TABLE Containers (  
    ID INT NOT NULL,  
    Name VARCHAR(20),  
    Volume FLOAT(24));  
  
INSERT INTO Containers VALUES (1, 'Cylinder', '125.22');  
INSERT INTO Containers VALUES (2, 'Cube', '23.98');  
  
SELECT Name, SQUARE(Volume) AS VolSquared   
FROM Containers;  
```  
  
  Here's the result set. 
  
  
 ```
Name           VolSquared
-------------  ----------
Cylinder       15680.05
Cube             575.04
```  
  
## Related content

- [Mathematical functions (Transact-SQL)](mathematical-functions-transact-sql.md)
