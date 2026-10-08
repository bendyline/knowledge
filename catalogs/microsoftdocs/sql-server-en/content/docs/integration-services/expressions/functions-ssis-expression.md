---
title: "Functions (SSIS Expression)"
description: "Functions (SSIS Expression)"
ms.date: "03/01/2017"
ms.service: sql
ms.subservice: integration-services
ms.topic: concept-article
helpviewer_keywords:
  - "functions [Integration Services]"
  - "expressions [Integration Services], functions"
  - "string functions"
  - "SQL Server Integration Services, functions"
  - "SSIS, functions"
---
# Functions (SSIS Expression)


**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

SSIS Integration Runtime in Azure Data Factory


  The expression language includes a set of functions for use in expressions. An expression can use a single function, but typically an expression combines functions with operators and uses multiple functions.  
  
 The functions can be categorized into the following groups:  
  
-   Mathematical functions that perform calculations based on numeric input values provided as parameters to the functions and return numeric values.  
  
-   String functions that perform operations on string or hexadecimal input values and return a string or numeric value.  
  
-   Date and time functions that perform operations on date and time values and return string, numeric, or date and time values.  
  
-   System functions that return information about an expression.  
  
 The expression language provides the following mathematical functions.  
  
| Function | Description |
| --- | --- |
| [ABS (SSIS Expression)](abs-ssis-expression.md) | Returns the absolute, positive value of a numeric expression. |
| [EXP (SSIS Expression)](exp-ssis-expression.md) | Returns the exponent to base e of the specified expression. |
| [CEILING (SSIS Expression)](ceiling-ssis-expression.md) | Returns the smallest integer that is greater than or equal to a numeric expression. |
| [FLOOR (SSIS Expression)](floor-ssis-expression.md) | Returns the largest integer that is less than or equal to a numeric expression. |
| [LN (SSIS Expression)](ln-ssis-expression.md) | Returns the natural logarithm of a numeric expression. |
| [LOG (SSIS Expression)](log-ssis-expression.md) | Returns the base-10 logarithm of a numeric expression. |
| [POWER (SSIS Expression)](power-ssis-expression.md) | Returns the result of raising a numeric expression to a power. |
| [ROUND (SSIS Expression)](round-ssis-expression.md) | Returns a numeric expression that is rounded to the specified length or precision. . |
| [SIGN (SSIS Expression)](sign-ssis-expression.md) | Returns the positive (+), negative (-), or zero (0) sign of a numeric expression. |
| [SQUARE (SSIS Expression)](square-ssis-expression.md) | Returns the square of a numeric expression. |
| [SQRT (SSIS Expression)](sqrt-ssis-expression.md) | Returns the square root of a numeric expression. |
  
 The expression evaluator provides the following string functions.  
  
| Function | Description |
| --- | --- |
| [CODEPOINT (SSIS Expression)](codepoint-ssis-expression.md) | Returns the Unicode code value of the leftmost character of a character expression. |
| [FINDSTRING (SSIS Expression)](findstring-ssis-expression.md) | Returns the one-based index of the specified occurrence of a character string within an expression. |
| [HEX (SSIS Expression)](hex-ssis-expression.md) | Returns a string representing the hexadecimal value of an integer. |
| [LEN (SSIS Expression)](len-ssis-expression.md) | Returns the number of characters in a character expression. |
| [LEFT (SSIS Expression)](left-ssis-expression.md) | Returns the specified number of characters from the leftmost portion of the given character expression. |
| [LOWER (SSIS Expression)](lower-ssis-expression.md) | Returns a character expression after converting uppercase characters to lowercase characters. |
| [LTRIM (SSIS Expression)](ltrim-ssis-expression.md) | Returns a character expression after removing leading spaces. |
| [REPLACE (SSIS Expression)](replace-ssis-expression.md) | Returns a character expression after replacing a string within the expression with either a different string or an empty string. |
| [REPLICATE (SSIS Expression)](replicate-ssis-expression.md) | Returns a character expression, replicated a specified number of times. |
| [REVERSE (SSIS Expression)](reverse-ssis-expression.md) | Returns a character expression in reverse order. |
| [RIGHT (SSIS Expression)](right-ssis-expression.md) | Returns the specified number of characters from the rightmost portion of the given character expression. |
| [RTRIM (SSIS Expression)](rtrim-ssis-expression.md) | Returns a character expression after removing trailing spaces. |
| [SUBSTRING (SSIS Expression)](substring-ssis-expression.md) | Returns a part of a character expression. |
| [TRIM (SSIS Expression)](trim-ssis-expression.md) | Returns a character expression after removing leading and trailing spaces. |
| [UPPER (SSIS Expression)](upper-ssis-expression.md) | Returns a character expression after converting lowercase characters to uppercase characters. |
  
 The expression evaluator provides the following date and time functions.  
  
| Function | Description |
| --- | --- |
| [DATEADD (SSIS Expression)](dateadd-ssis-expression.md) | Returns a new DT_DBTIMESTAMP value by adding a date or time interval to a specified date. |
| [DATEDIFF (SSIS Expression)](datediff-ssis-expression.md) | Returns the number of date and time boundaries crossed between two specified dates. |
| [DATEPART (SSIS Expression)](datepart-ssis-expression.md) | Returns an integer representing a datepart of a date. |
| [DAY (SSIS Expression)](day-ssis-expression.md) | Returns an integer that represents the day of the specified date. |
| [GETDATE (SSIS Expression)](getdate-ssis-expression.md) | Returns the current date of the system. |
| [GETUTCDATE (SSIS Expression)](getutcdate-ssis-expression.md) | Returns the current date of the system in UTC time (Universal Time Coordinate or Greenwich Mean Time). |
| [MONTH (SSIS Expression)](month-ssis-expression.md) | Returns an integer that represents the month of the specified date. |
| [YEAR (SSIS Expression)](year-ssis-expression.md) | Returns an integer that represents the year of the specified date. |
  
 The expression evaluator provides the following null functions.  
  
| Function | Description |
| --- | --- |
| [ISNULL (SSIS Expression)](isnull-ssis-expression.md) | Returns a Boolean result based on whether an expression is null. |
| [NULL (SSIS Expression)](null-ssis-expression.md) | Returns a null value of a requested data type. |
  
 Expression names are shown in uppercase characters, but expression names are not case-sensitive. For example, using "null" works as well as using "NULL".  
  
## Related content

- [Operators (SSIS Expression)](operators-ssis-expression.md)
- [Examples of Advanced Integration Services Expressions](examples-of-advanced-integration-services-expressions.md)
- [Integration Services (SSIS) Expressions](integration-services-ssis-expressions.md)
