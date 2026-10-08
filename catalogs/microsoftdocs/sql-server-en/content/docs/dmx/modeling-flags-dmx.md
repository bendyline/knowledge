---
title: "Modeling Flags (DMX)"
description: "Modeling Flags (DMX)"
ms.date: 02/17/2022
ms.service: sql
ms.subservice: analysis-services
ms.topic: reference
ms.custom: dmx
---
# Modeling Flags (DMX)

**Applies to:**
 

  Analysis Services 



  You can use modeling flags in  Analysis Services 
 to provide additional information to a data mining algorithm about the data that is defined in a case table. The algorithm can use this information to build a more accurate data mining model. You can define modeling flags on both mining structure columns and mining model columns.  
  
  Analysis Services 
 supports the following modeling flags:  
  
 **NOT NULL**  
 The values for the attribute column should never contain a null value. An error will result if  Analysis Services 
 encounters a null value for this attribute column during the model training process. This flag is defined on a mining structure column.  
  
 **REGRESSOR**  
 Indicates that the algorithm can use the specified column in the regression formula of regression algorithms. This flag is supported by the  Microsoft 
 Linear Regression and  Microsoft 
 Decision Trees algorithms, and is defined on a mining model column.  
  
 **MODEL_EXISTENCE_ONLY**  
 The values for the attribute column are less important than the presence of the attribute. This flag is defined on a mining model column.  
  
 Third-party algorithms may support additional modeling flags. To determine which modeling flags an algorithm supports, use the **SUPPORTED_MODELING_FLAGS** schema rowset. You can also query the mining services on the server to determine which modeling flags are supported for a particular algorithm. For example, the following query returns the modeling flags are supported for the Microsoft Linear Regression algorithm on the current server:  
  
```  
SELECT SUPPORTED_MODELING_FLAGS  
FROM $SYSTEM.DMSCHEMA_MINING_SERVICES  
WHERE SERVICE_NAME = 'Microsoft_Linear_Regression'  
```  
  
 Expected results:  
  
 NOT NULL,REGRESSOR  
  
## Specifying Modeling Flags on a Mining Model  
 For examples of the syntax that  Analysis Services 
 supports for specifying a flag on a mining structure column, see [CREATE MINING STRUCTURE (DMX)](create-mining-structure-dmx.md).  
  
 For an example of the syntax for specifying a modeling flag on a mining model column, see [ALTER MINING STRUCTURE (DMX)](alter-mining-structure-dmx.md).  
  
 For more information about working with mining model columns, see [Mining Model Columns](https://learn.microsoft.com/analysis-services/data-mining/mining-model-columns).  
  
## Related content

- [Data Mining Algorithms (Analysis Services - Data Mining)](https://learn.microsoft.com/analysis-services/data-mining/data-mining-algorithms-analysis-services-data-mining)
- [Data Mining Extensions (DMX) Reference](data-mining-extensions-dmx-reference.md)
- [Data Mining Extensions (DMX) Syntax Elements](data-mining-extensions-dmx-syntax-elements.md)
- [Data Mining Extensions (DMX) Function Reference](data-mining-extensions-dmx-function-reference.md)
- [Data Mining Extensions (DMX) Operator Reference](data-mining-extensions-dmx-operator-reference.md)
- [Data Mining Extensions (DMX) Statements](data-mining-extensions-dmx-statements.md)
- [Data Mining Extensions (DMX) Syntax Conventions](data-mining-extensions-dmx-syntax-conventions.md)
- [General Prediction Functions (DMX)](general-prediction-functions-dmx.md)
- [Structure and Usage of DMX Prediction Queries](structure-and-usage-of-dmx-prediction-queries.md)
- [Understanding the DMX Select Statement](understanding-the-dmx-select-statement.md)
