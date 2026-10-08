---
title: "SQL Conformance Levels (ODBC Driver for Oracle)"
description: "SQL Conformance Levels (ODBC Driver for Oracle)"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, sunilbs, mcimfl
ms.date: "01/19/2017"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
helpviewer_keywords:
  - "conformance levels [ODBC], SQL"
  - "SQL conformance levels [ODBC]"
  - "ODBC driver for Oracle [ODBC], conformance levels"
---
# SQL Conformance Levels (ODBC Driver for Oracle)
> **Important:**  
>  This feature will be removed in a future version of Windows. Avoid using this feature in new development work, and plan to modify applications that currently use this feature. Instead, use the ODBC driver provided by Oracle.  
  
 The ODBC Driver for Oracle supports the Minimum SQL grammar and Core SQL grammar and also supports the following ODBC extensions to SQL:  
  
-   Date, time, and timestamp data  
  
-   Left and right outer joins  
  
-   Numeric functions:  



            Abs  
            Ceiling  
            Cos  
            Exp  
            Floor  


            Log  
            Log10  
            Mod  
            Pi  
            Power  


            round  
            second  
            sign  
            sin  
            sqrt  


            tan  
            truncate  


    
-   Date functions:  



            Curdate  
            Curtime  
            Dayname  
            Dayofmonth  


            Dayofweek  
            Dayofyear  
            Hour  
            Month  


            monthname  
            minute  
            now  
            quarter  


            second  
            week  
            year  



-   String functions:  



            Ascii  
            Char  
            Concat  
            Lcase  


            Left  
            Length  
            Ltrim  
            Replace  


            right  
            rtrim  
            soundex  
            substring  


            ucase  



-   Type-conversion function:  

    Convert  

-   System functions:  
  
    Ifnull  
    User
