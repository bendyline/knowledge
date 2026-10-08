---
title: "General Prediction Functions (DMX)"
description: "General Prediction Functions (DMX)"
ms.date: 02/17/2022
ms.service: sql
ms.subservice: analysis-services
ms.topic: reference
ms.custom: dmx
---
# General Prediction Functions (DMX)

**Applies to:**
 

  Analysis Services 



  You can use the **SELECT** statement in Data Mining Extensions (DMX) to create different types of queries. A query can be used to return information about the mining model itself, to make new predictions, or alter the model by training it with new data.  Analysis Services 
 provides a variety of specialized functions that control the type of information that is returned in a query. By adding these functions to a DMX query, you can retrieve additional statistics or columns of data. However, each query type and each model type supports certain functions only.  
  
## Common Functions  
 You can use functions to extend the results that a mining model returns. You can use the following functions for any **SELECT** statement that returns a table expression:  



        [BottomCount &#40;DMX&#41;](../dmx/bottomcount-dmx.md)  
        [BottomPercent &#40;DMX&#41;](../dmx/bottompercent-dmx.md)  
        [Predict &#40;DMX&#41;](../dmx/predict-dmx.md)  
        [RangeMax &#40;DMX&#41;](../dmx/rangemax-dmx.md)  
        [RangeMid &#40;DMX&#41;](../dmx/rangemid-dmx.md)  


        [RangeMin &#40;DMX&#41;](../dmx/rangemin-dmx.md)  
        [TopCount &#40;DMX&#41;](../dmx/topcount-dmx.md)  
        [TopPercent &#40;DMX&#41;](../dmx/toppercent-dmx.md)  
        [TopSum &#40;DMX&#41;](../dmx/topsum-dmx.md)  



 In addition, the following functions are supported for almost all model types:  
  
-   [Exists (DMX)](exists-dmx.md)  
  
-   [IsDescendant (DMX)](isdescendant-dmx.md)  
  
-   [IsTestCase (DMX)](istestcase-dmx.md)  
  
-   [IsTrainingCase (DMX)](istrainingcase-dmx.md)  
  
-   [Predict (DMX)](predict-dmx.md)  
  
-   [RangeMax (DMX)](rangemax-dmx.md)  
  
-   [RangeMid (DMX)](rangemid-dmx.md)  
  
-   [RangeMin (DMX)](rangemin-dmx.md)  
  
-   [StructureColumn (DMX)](structurecolumn-dmx.md)  
  
 Individual algorithms may support additional functions. For a list of the functions that are supported by each model type, see [Data Mining Queries](https://learn.microsoft.com/analysis-services/data-mining/data-mining-queries).  
  
## Functions Specific to SELECT Syntax  
 The following table lists the functions that you can use for each type of **SELECT** statement.  
  
 For general information about functions in DMX, see [Data Mining Extensions (DMX) Function Reference](data-mining-extensions-dmx-function-reference.md).  
  
| Query type | Supported functions | Remarks |
| --- | --- | --- |
| [SELECT DISTINCT FROM \<model>](select-distinct-from-model-dmx.md) | [RangeMin (DMX)](rangemin-dmx.md)<br /><br /> [RangeMid (DMX)](rangemid-dmx.md)<br /><br /> [RangeMax (DMX)](rangemax-dmx.md) | These functions can be used to provide maximum values, minimum values, and means for any column that contains numeric data type, regardless of whether the column is continuous or has been discretized. |
| [SELECT FROM \<model>.CONTENT](select-from-model-content-dmx.md)<br /><br /> or<br /><br /> [SELECT FROM \<model>.DIMENSION_CONTENT](select-from-model-dimension-content-dmx.md) | [IsDescendant (DMX)](isdescendant-dmx.md) | This function retrieves child nodes for the specified node in the model, and can be used, for example, to iterate through the nodes in the mining model content. The arrangement of the nodes in the mining model content depends on the model type. For information about the structure for each mining model type, see [Mining Model Content (Analysis Services - Data Mining)](https://learn.microsoft.com/analysis-services/data-mining/mining-model-content-analysis-services-data-mining).<br /><br /> If you have saved the mining model content as a dimension, you can also use other Multidimensional Expressions (MDX) functions that are available for querying an attribute hierarchy. |
| [SELECT FROM \<model>.CASES](select-from-model-cases-dmx.md) | [IsInNode (DMX)](isinnode-dmx.md)<br /><br /> [ClientSettingsGeneralFlag Class](../relational-databases/wmi-provider-configuration-classes/clientsettingsgeneralflag-class/clientsettingsgeneralflag-class.md)<br /><br /> [IsTrainingCase (DMX)](istrainingcase-dmx.md)<br /><br /> [IsTestCase (DMX)](istestcase-dmx.md) | The Lag function is supported only for time series models.<br /><br /> The IsTestCase function is supported in models that are based on a structure that was created using the holdout option, to create a testing data set. If the model is not based on a structure with holdout test set, all cases are considered training cases. |
| [SELECT FROM \<model>.SAMPLE_CASES](select-from-model-sample-cases-dmx.md) | [IsInNode (DMX)](isinnode-dmx.md) | In this context, the IsInNode function returns a case that belongs to a set of idealized sample cases. |
| SELECT FROM \<model>.PMML | Not applicable. Use XML query functions instead. | PMML representations are supported only for the following model types:<br /><br />  Microsoft |
 | Decision Trees<br /><br />  Microsoft |
 | Clustering |
| [SELECT FROM \<model> PREDICTION JOIN](select-from-model-prediction-join-dmx.md) | Prediction functions that are specific to the algorithm that you use to build the model. | For a list of prediction functions for each model type, see [Data Mining Queries](https://learn.microsoft.com/analysis-services/data-mining/data-mining-queries). |
| [SELECT FROM \<model>](select-from-model-dmx.md) | Prediction functions that are specific to the algorithm that you use to build the model. | For a list of prediction functions for each model type, see [Data Mining Queries](https://learn.microsoft.com/analysis-services/data-mining/data-mining-queries). |
  
## Related content

- [Data Mining Extensions (DMX) Reference](data-mining-extensions-dmx-reference.md)
- [Data Mining Extensions (DMX) Function Reference](data-mining-extensions-dmx-function-reference.md)
- [Data Mining Extensions (DMX) Operator Reference](data-mining-extensions-dmx-operator-reference.md)
- [Data Mining Extensions (DMX) Statements](data-mining-extensions-dmx-statements.md)
- [Data Mining Extensions (DMX) Syntax Conventions](data-mining-extensions-dmx-syntax-conventions.md)
- [Data Mining Extensions (DMX) Syntax Elements](data-mining-extensions-dmx-syntax-elements.md)
- [Structure and Usage of DMX Prediction Queries](structure-and-usage-of-dmx-prediction-queries.md)
- [Understanding the DMX Select Statement](understanding-the-dmx-select-statement.md)
