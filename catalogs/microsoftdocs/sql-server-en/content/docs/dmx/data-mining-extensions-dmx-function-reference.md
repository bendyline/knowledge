---
title: "Data Mining Extensions (DMX) Function Reference"
description: "Data Mining Extensions (DMX) Function Reference"
ms.date: 02/17/2022
ms.service: sql
ms.subservice: analysis-services
ms.topic: reference
ms.custom: dmx
---
# Data Mining Extensions (DMX) Function Reference

**Applies to:**
 

  Analysis Services 



   Analysis Services 
 supports several functions in the Data Mining Extensions (DMX) language. Functions expand the results of a prediction query to include information that further describes the prediction. Functions also provide more control over how the results of the prediction are returned. The following table provides links to resources to help you understand how to use functions in DMX.  
  
| Function | Description |
| --- | --- |
| [General Prediction Functions (DMX)](general-prediction-functions-dmx.md) | List functions that can be used with all model types, and provides links to more information about how to query specific types of mining models. |
| [Structure and Usage of DMX Prediction Queries](structure-and-usage-of-dmx-prediction-queries.md) | Provides an overview of how to construct a prediction query by using DMX. |
| [BottomCount (DMX)](bottomcount-dmx.md) | Returns a table that contains a specified number of bottom-most rows, in increasing order of rank based on a rank expression. |
  
 The following table lists the functions that DMX supports.  
  
| Function | Description |
| --- | --- |
| [BottomCount (DMX)](bottomcount-dmx.md) | Returns a table that contains the last n-item rows of the table expression, in increasing order based on a rank expression. |
| [BottomPercent (DMX)](bottompercent-dmx.md) | Returns a table that contains the smallest number of bottom-most rows that meet a specified percent expression, in increasing order of rank based on a rank expression. |
| [BottomSum (DMX)](bottomsum-dmx.md) | Returns a table that contains the smallest number of bottom-most rows that meet a specified sum expression, in increasing order of rank based on a rank expression. |
| [Cluster (DMX)](cluster-dmx.md) | Returns the cluster that is most likely to contain the input case. |
| [ClusterProbability (DMX)](clusterprobability-dmx.md) | Returns the probability that the input case belongs to the cluster. |
| [Exists (DMX)](exists-dmx.md) | Returns true if the result set returned by the specified SELECT statement contains at least one row. |
| [IsDescendant (DMX)](isdescendant-dmx.md) | Indicates whether the current node descends from the specified node. |
| [IsInNode (DMX)](isinnode-dmx.md) | Indicates whether the specified node contains the case. |
| [IsTestCase (DMX)](istestcase-dmx.md) | Indicates whether a case belongs to the set of test cases. |
| [IsTrainingCase (DMX)](istrainingcase-dmx.md) | Indicates whether a case belongs to the set of training cases. |
| [Lag (DMX)](lag-dmx.md) | Returns the time slice between the date of the current case and the last date in the data. |
| [Predict (DMX)](predict-dmx.md) | Performs a prediction on a specified column. |
| [PredictAdjustedProbability (DMX)](predictadjustedprobability-dmx.md) | Returns the adjusted probability of the specified predictable column. |
| [PredictAssociation (DMX)](predictassociation-dmx.md) | Predicts associative membership in a column. |
| [PredictCaseLikelihood (DMX)](predictcaselikelihood-dmx.md) | Returns the likelihood that an input case will fit within the existing model. This function can only be used with clustering models. |
| [PredictHistogram (DMX)](predicthistogram-dmx.md) | Returns a table that represents the histogram for a specified column. |
| [PredictNodeId (DMX)](predictnodeid-dmx.md) | Returns the NodeID for a selected case. |
| [PredictProbability (DMX)](predictprobability-dmx.md) | Returns the probability of the specified column. |
| [PredictSequence (DMX)](predictsequence-dmx.md) | Predicts the next values in a sequence. |
| [PredictStdev (DMX)](predictstdev-dmx.md) | Retrieves the standard deviation value for a specified column. |
| [PredictSupport (DMX)](predictsupport-dmx.md) | Returns the support value of the column. |
| [PredictTimeSeries (DMX)](predicttimeseries-dmx.md) | Predicts the future values for a time series. |
| [PredictVariance (DMX)](predictvariance-dmx.md) | Returns the variance value of the specified column. |
| [RangeMax (DMX)](rangemax-dmx.md) | Returns the upper value of the predicted bucket that is discovered for a specified discretized column. |
| [RangeMid (DMX)](rangemid-dmx.md) | Returns the midpoint value of the predicted bucket that is discovered for a specified discretized column. |
| [RangeMin (DMX)](rangemin-dmx.md) | Returns the lower value of the predicted bucket that is discovered for a specified discretized column. |
| [StructureColumn (DMX)](structurecolumn-dmx.md) | Returns the value of the specified table mining structure column. |
| [TopCount (DMX)](topcount-dmx.md) | Returns a table that contains a specified number of topmost rows, in a decreasing order of rank based on a rank expression. |
| [TopPercent (DMX)](toppercent-dmx.md) | Returns a table that contains the smallest number of topmost rows that meet a specified percent expression, in a decreasing order of rank based on a rank expression. |
| [TopSum (DMX)](topsum-dmx.md) | Returns a table that contains the smallest number of topmost rows that meet a specified sum expression, in a decreasing order of rank based on a rank expression. |
  
## Related content

- [Data Mining Extensions (DMX) Operator Reference](data-mining-extensions-dmx-operator-reference.md)
- [Data Mining Extensions (DMX) Statements](data-mining-extensions-dmx-statements.md)
- [Data Mining Extensions (DMX) Syntax Conventions](data-mining-extensions-dmx-syntax-conventions.md)
- [Data Mining Extensions (DMX) Syntax Elements](data-mining-extensions-dmx-syntax-elements.md)
- [General Prediction Functions (DMX)](general-prediction-functions-dmx.md)
- [Structure and Usage of DMX Prediction Queries](structure-and-usage-of-dmx-prediction-queries.md)
- [Understanding the DMX Select Statement](understanding-the-dmx-select-statement.md)
