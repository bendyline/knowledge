---
title: "SELECT FROM &lt;model&gt;.SAMPLE_CASES (DMX)"
description: "SELECT FROM &lt;model&gt;.SAMPLE_CASES (DMX)"
ms.date: 02/17/2022
ms.service: sql
ms.subservice: analysis-services
ms.topic: reference
ms.custom: dmx
---
# SELECT FROM &lt;model&gt;.SAMPLE_CASES (DMX)

**Applies to:**
 

  Analysis Services 



  Returns sample cases that are representative of the cases that are used to train the data mining model.  
  
 To use this statement, you must enable drillthrough when you create the mining model. For more information about enabling drillthrough, see [CREATE MINING MODEL (DMX)](create-mining-model-dmx.md), [SELECT INTO (DMX)](select-into-dmx.md), and [ALTER MINING STRUCTURE (DMX)](alter-mining-structure-dmx.md).  
  
## Syntax  
  
```  
  
SELECT [FLATTENED] [TOP <n>] <expression list> FROM <model>.SAMPLE_CASES  
[WHERE <condition list>] ORDER BY <expression> [DESC|ASC]]  
```  
  
## Arguments  
 *n*  
 Optional. An integer that specifies how many rows to return.  
  
 *expression list*  
 A comma-separated list of related column identifiers.  
  
 *model*  
 A model identifier.  
  
 *condition list*  
 Optional. Conditions to restrict the values that are returned from the column list.  
  
 *expression*  
 Optional. An expression that returns a scalar value.  
  
## Remarks  
 Sample cases may be generated and may not actually exist in the training data. The returned case is representative of the specified content node.  
  
 Although the  Microsoft 
 Sequence Clustering algorithm is the only  Microsoft 
 algorithm that supports using SELECT FROM \<model>.SAMPLE_CASES, third-party algorithms may also support it.  
  
## Examples  
 The following example returns sample cases that are used to train the Target Mail mining model. Using the [IsInNode (DMX)](isinnode-dmx.md) function in the **WHERE** clause returns only cases that are associated with the '000000003' node. The node string can be found in the NODE_UNIQUE_NAME column of the schema rowset.  
  
```  
Select * from [Sequence Clustering].SAMPLE_Cases  
WHERE IsInNode('000000003')  
```  
  
## Related content

- [SELECT (DMX)](select-dmx.md)
- [DMX Statements - Data Definition](dmx-statements-data-definition.md)
- [DMX Statements - Data Manipulation](dmx-statements-data-manipulation.md)
- [Data Mining Extensions (DMX) Statements](data-mining-extensions-dmx-statements.md)
