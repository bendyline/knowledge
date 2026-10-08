---
title: "PredictHistogram (DMX)"
description: "PredictHistogram (DMX)"
ms.date: 02/17/2022
ms.service: sql
ms.subservice: analysis-services
ms.topic: reference
ms.custom: dmx
---
# PredictHistogram (DMX)

**Applies to:**
 

  Analysis Services 



  Returns a table that represents a histogram for the prediction of a given column.  
  
## Syntax  
  
```  
  
PredictHistogram(<scalar column reference> | <cluster column reference>)  
```  
  
## Applies To  
 A scalar column reference or a cluster column reference. Can be used with all algorithm types except the  Microsoft 
 Association algorithm.  
  
## Return Type  
 A table.  
  
## Remarks  
 A histogram generates statistics columns. The column structure of the returned histogram depends on the type of column reference that is used with the **PredictHistogram** function.  
  
## Scalar Columns  
 For a \<scalar column reference>, the histogram that the **PredictHistogram** function returns consists of the following columns:  
  
-   The value that is being predicted.  
  
-   **$Support**  
  
-   **$Probability**  
  
-   **$ProbabilityVariance**  
  
      Microsoft 
 data mining algorithms do not support **$ProbabilityVariance**. This column always contains 0 for  Microsoft 
 algorithms.  
  
-   **$ProbabilityStdev**  
  
      Microsoft 
 data mining algorithms do not support **$ProbabilityStdev**. This column always contains 0 for  Microsoft 
 algorithms.  
  
-   **$AdjustedProbability**  
  
     The **$AdjustedProbability** column is an  Analysis Services 
 extension to the  Microsoft 
 OLE DB for Data Mining specification.  
  
## Cluster Columns  
 The histogram that the **PredictHistogram** function returns for a \<cluster column reference> consists of the following columns:  
  
-   **$Cluster** (represents the cluster name)  
  
-   **$Distance**  
  
-   **$Probability**  
  
## Examples  
 The following example returns the predicted state of the Bike Buyer column in a singleton query. The query also returns the top two most likely states of the Bike Buyer attribute, based on the adjusted probability obtained by using the **PredictHistogram** function.  
  
```  
SELECT  
  [TM Decision Tree].[Bike Buyer],  
  TopCount(PredictHistogram([Bike Buyer]),$AdjustedProbability,3)  
From  
  [TM Decision Tree]  
NATURAL PREDICTION JOIN  
(SELECT 28 AS [Age],  
  '2-5 Miles' AS [Commute Distance],  
  'Graduate Degree' AS [Education],  
  0 AS [Number Cars Owned],  
  0 AS [Number Children At Home]) AS t  
```  
  
## Related content

- [Cluster (DMX)](cluster-dmx.md)
- [ClusterProbability (DMX)](clusterprobability-dmx.md)
- [PredictAdjustedProbability (DMX)](predictadjustedprobability-dmx.md)
- [PredictProbability (DMX)](predictprobability-dmx.md)
- [PredictStdev (DMX)](predictstdev-dmx.md)
- [PredictSupport (DMX)](predictsupport-dmx.md)
- [PredictVariance (DMX)](predictvariance-dmx.md)
- [Data Mining Algorithms (Analysis Services - Data Mining)](https://learn.microsoft.com/analysis-services/data-mining/data-mining-algorithms-analysis-services-data-mining)
- [Data Mining Extensions (DMX) Function Reference](data-mining-extensions-dmx-function-reference.md)
- [Functions (DMX)](functions-dmx.md)
- [General Prediction Functions (DMX)](general-prediction-functions-dmx.md)
