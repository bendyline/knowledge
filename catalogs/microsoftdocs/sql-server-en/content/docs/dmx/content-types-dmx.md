---
title: "Content Types (DMX)"
description: "Content Types (DMX)"
ms.date: 02/17/2022
ms.service: sql
ms.subservice: analysis-services
ms.topic: reference
ms.custom: dmx
---
# Content Types (DMX)

**Applies to:**
 

  Analysis Services 



  Data mining algorithms require additional information beyond the data type to function correctly, such as the content type. The content type helps the algorithm determine how to work with the data in the column.  
  
 Each algorithm supports specific content types. For example, the  Microsoft 
 Naive Bayes algorithm cannot use continuous columns. To use a continuous column in a  Microsoft 
 Naive Bayes model, you must discretize the data in the column. Some algorithms require certain content types in order to function correctly. For example, the  Microsoft 
 Time Series algorithm requires a key time column to identify the time over which the data was collected.  
  
 For a complete description of the content types that  Analysis Services 
 supports, see [Content Types (Data Mining)](https://learn.microsoft.com/analysis-services/data-mining/content-types-data-mining).  
  
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
