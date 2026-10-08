---
title: "TuningOptions Element (DTA)"
description: In the dta utility, the TuningOptions element contains the tuning options for a specific tuning session.
author: rwestMSFT
ms.author: randolphwest
ms.date: 03/01/2017
ms.service: sql
ms.subservice: tools-other
ms.topic: reference
ms.collection:
  - data-tools
helpviewer_keywords:
  - "TuningOptions element"
dev_langs:
  - "XML"
---

# TuningOptions Element (DTA)

 
**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

Contains the tuning options for a specific tuning session.  
  
## Syntax  
  
```  
  
<DTAInput>  
    <Server>  
...code removed...  
    <Workload>...</Workload>  
    <TuningOptions>...</TuningOptions>  
```  
  
## Element Characteristics  
  
| Characteristic | Description |
| --- | --- |
| **Data type and length** | None. |
| **Default value** | None. |
| **Occurrence** | Optional. If used, can only be used once for each **DTAInput** element. |
  
## Element Relationships  
  
| Relationship | Elements |
| --- | --- |
| **Parent element** | [DTAInput Element (DTA)](dtainput-element-dta.md) |
| **Child elements** | **ReportSet** element. For more information, see the [Database Engine Tuning Advisor XML schema](https://go.microsoft.com/fwlink/?linkid=43100).<br /><br /> **TuningLogTable** element. For more information, see the [Database Engine Tuning Advisor XML schema](https://go.microsoft.com/fwlink/?linkid=43100).<br /><br /> **NumberOfEvents** element. For more information, see the [Database Engine Tuning Advisor XML schema](https://go.microsoft.com/fwlink/?linkid=43100).<br /><br /> [TuningTimeInMin Element (DTA)](tuningtimeinmin-element-dta.md)<br /><br /> [StorageBoundInMB Element (DTA)](storageboundinmb-element-dta.md)<br /><br /> **MaxKeyColumnsInIndex** element. For more information, see the [Database Engine Tuning Advisor XML schema](https://go.microsoft.com/fwlink/?linkid=43100).<br /><br /> **MaxColumnsInIndex** element. For more information, see the [Database Engine Tuning Advisor XML schema](https://go.microsoft.com/fwlink/?linkid=43100).<br /><br /> **MinPercentageImprovement** element. For more information, see the [Database Engine Tuning Advisor XML schema](https://go.microsoft.com/fwlink/?linkid=43100)<br /><br /> [TestServer Element (DTA)](testserver-element-dta.md)<br /><br /> [FeatureSet Element (DTA)](featureset-element-dta.md)<br /><br /> [Partitioning Element (DTA)](partitioning-element-dta.md)<br /><br /> [DropOnlyMode Element (DTA)](droponlymode-element-dta.md)<br /><br /> [KeepExisting Element (DTA)](keepexisting-element-dta.md)<br /><br /> [OnlineIndexOperation Element (DTA)](onlineindexoperation-element-dta.md)<br /><br /> [DatabaseToConnect Element (DTA)](databasetoconnect-element-dta.md)<br /><br /> **IgnoreConstantsInWorkload** element. For more information, see the [Database Engine Tuning Advisor XML schema](https://go.microsoft.com/fwlink/?linkid=43100).<br /><br /> **RetainShellDB** element. For more information, see the [Database Engine Tuning Advisor XML schema](https://go.microsoft.com/fwlink/?linkid=43100). |
  
## Example  
 For examples of the **TuningOptions** element, see the [XML Input File Samples (DTA)](xml-input-file-samples-dta.md).  
  
## Related content

- [XML Input File Reference (Database Engine Tuning Advisor)](xml-input-file-reference-database-engine-tuning-advisor.md)
