---
title: Automatic Code Creation
description: Automatic Code Creation (Master Data Services)
author: meetdeepak
ms.author: dkhare
ms.date: 03/05/2026
ms.service: sql
ms.subservice: master-data-services
ms.topic: concept-article
ms.custom:
  - build-2025
---
# Automatic Code Creation (Master Data Services)


**Applies to:**
 

](../sql-server/sql-docs-navigation-guide.md#applies-to)
 on Windows 





> **Important:**  
> Master Data Services (MDS) is [removed](https://learn.microsoft.com/lifecycle/definitions#removal) in  SQL Server 2025 (17.x) 
. We continue to support MDS in  SQL Server 2022 (16.x) 
 and earlier versions.


  In  Master Data Services 
, numeric values can be automatically generated for the Code attribute, or for any other numeric attribute. When codes are generated automatically, you are not prevented from entering other values for codes; rather an initial value is automatically set.  
  
## Generating Code Values  
 Administrators can configure automatically-generated values for the Code attribute by editing the associated entity's properties. They can specify an initial value, and each subsequent value is increased by one.  
  
 When you enter Code values into MDS, either in one of the tools or by using the staging process, you can leave the Code value blank and a Code value will be automatically generated. Or you can specify a Code value of your choice.  
  
## Generating Other Attribute Values  
 Administrators can automatically generate values for attributes other than Code by creating business rules. They can specify an initial value, and specify the number each subsequent value is incremented by.  
  
 When you enter attribute values into MDS, either in one of the tools or by using the staging process, you can leave the attribute value blank. When business rules are applied, the values will be incremented based on the highest existing value. For example, if your rule is "Default attribute to a generated value that starts at 1 and increments by 4" and the highest current value for the attribute is 700, the value for the next member that's added will be 704.  
  
## Related Tasks  
  
| Task Description | Topic |
| --- | --- |
| Automatically generate values for the Code attribute. | [Automatically Generate Code Attribute Values (Master Data Services)](automatically-generate-code-attribute-values-master-data-services.md) |
| Automatically generate values for other attributes. | [Automatically Generate Attribute Values Other Than Code (Master Data Services)](automatically-generate-attribute-values-other-than-code-master-data-services.md) |
  
## Related content

- [Master Data Services Overview (MDS)](master-data-services-overview-mds.md)
- [Business Rules (Master Data Services)](business-rules-master-data-services.md)
- [Entities (Master Data Services)](entities-master-data-services.md)
