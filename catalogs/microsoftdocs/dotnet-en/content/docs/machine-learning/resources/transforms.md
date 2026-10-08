---
title: Data transformations
description: Explore the feature engineering components supported in ML.NET.
ms.date: 09/14/2022
ms.custom: sfi-ropc-nochange
---

# Data transformations

Data transformations are used to:

- Prepare data for model training.
- Apply an imported model in TensorFlow or ONNX format.
- Post-process data after it has been passed through a model.

The transformations in this guide return classes that implement the [IEstimator](https://learn.microsoft.com/search/?terms=Microsoft.ML.IEstimator%601) interface. Data transformations can be chained together. Each transformation both expects and produces data of specific types and formats, which are specified in the linked reference documentation.

Some data transformations require training data to calculate their parameters. For example: the [Microsoft.ML.NormalizationCatalog.NormalizeMeanVariance*](https://learn.microsoft.com/search/?terms=Microsoft.ML.NormalizationCatalog.NormalizeMeanVariance*) transformer calculates the mean and variance of the training data during the `Fit()` operation, and uses those parameters in the `Transform()` operation.

Other data transformations don't require training data. For example: the [Microsoft.ML.ImageEstimatorsCatalog.ConvertToGrayscale*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ImageEstimatorsCatalog.ConvertToGrayscale*) transformation can perform the `Transform()` operation without having seen any training data during the `Fit()` operation.

## Column mapping and grouping

| Transform | Definition | ONNX Exportable |
| --- | --- | --- |
| [Microsoft.ML.TransformExtensionsCatalog.Concatenate*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TransformExtensionsCatalog.Concatenate*) | Concatenate one or more input columns into a new output column | Yes |
| [Microsoft.ML.TransformExtensionsCatalog.CopyColumns*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TransformExtensionsCatalog.CopyColumns*) | Copy and rename one or more input columns | Yes |
| [Microsoft.ML.TransformExtensionsCatalog.DropColumns*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TransformExtensionsCatalog.DropColumns*) | Drop one or more input columns | Yes |
| [Microsoft.ML.TransformExtensionsCatalog.SelectColumns*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TransformExtensionsCatalog.SelectColumns*) | Select one or more columns to keep from the input data | Yes |

## Normalization and scaling

| Transform | Definition | ONNX Exportable |
| --- | --- | --- |
| [Microsoft.ML.NormalizationCatalog.NormalizeMeanVariance*](https://learn.microsoft.com/search/?terms=Microsoft.ML.NormalizationCatalog.NormalizeMeanVariance*) | Subtract the mean (of the training data) and divide by the variance (of the training data) | Yes |
| [Microsoft.ML.NormalizationCatalog.NormalizeLogMeanVariance*](https://learn.microsoft.com/search/?terms=Microsoft.ML.NormalizationCatalog.NormalizeLogMeanVariance*) | Normalize based on the logarithm of the training data | Yes |
| [Microsoft.ML.NormalizationCatalog.NormalizeLpNorm*](https://learn.microsoft.com/search/?terms=Microsoft.ML.NormalizationCatalog.NormalizeLpNorm*) | Scale input vectors by their [lp-norm](https://en.wikipedia.org/wiki/Lp_space#The_p-norm_in_finite_dimensions), where p is 1, 2 or infinity. Defaults to the l2 (Euclidean distance) norm | Yes |
| [Microsoft.ML.NormalizationCatalog.NormalizeGlobalContrast*](https://learn.microsoft.com/search/?terms=Microsoft.ML.NormalizationCatalog.NormalizeGlobalContrast*) | Scale each value in a row by subtracting the mean of the row data and divide by either the standard deviation or l2-norm (of the row data), and multiply by a configurable scale factor (default 2) | Yes |
| [Microsoft.ML.NormalizationCatalog.NormalizeBinning*](https://learn.microsoft.com/search/?terms=Microsoft.ML.NormalizationCatalog.NormalizeBinning*) | Assign the input value to a bin index and divide by the number of bins to produce a float value between 0 and 1. The bin boundaries are calculated to evenly distribute the training data across bins | Yes |
| [Microsoft.ML.NormalizationCatalog.NormalizeSupervisedBinning*](https://learn.microsoft.com/search/?terms=Microsoft.ML.NormalizationCatalog.NormalizeSupervisedBinning*) | Assign the input value to a bin based on its correlation with label column | Yes |
| [Microsoft.ML.NormalizationCatalog.NormalizeMinMax*](https://learn.microsoft.com/search/?terms=Microsoft.ML.NormalizationCatalog.NormalizeMinMax*) | Scale the input by the difference between the minimum and maximum values in the training data | Yes |
| [Microsoft.ML.NormalizationCatalog.NormalizeRobustScaling*](https://learn.microsoft.com/search/?terms=Microsoft.ML.NormalizationCatalog.NormalizeRobustScaling*) | Scale each value using statistics that are robust to outliers that will center the data around 0 and scales the data according to the quantile range. | Yes |

## Conversions between data types

| Transform | Definition | ONNX Exportable |
| --- | --- | --- |
| [Microsoft.ML.ConversionsExtensionsCatalog.ConvertType*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ConversionsExtensionsCatalog.ConvertType*) | Convert the type of an input column to a new type | Yes |
| [Microsoft.ML.ConversionsExtensionsCatalog.MapValue*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ConversionsExtensionsCatalog.MapValue*) | Map values to keys (categories) based on the supplied dictionary of mappings | No |
| [Microsoft.ML.ConversionsExtensionsCatalog.MapValueToKey*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ConversionsExtensionsCatalog.MapValueToKey*) | Map values to keys (categories) by creating the mapping from the input data | Yes |
| [Microsoft.ML.ConversionsExtensionsCatalog.MapKeyToValue*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ConversionsExtensionsCatalog.MapKeyToValue*) | Convert keys back to their original values | Yes |
| [Microsoft.ML.ConversionsExtensionsCatalog.MapKeyToVector*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ConversionsExtensionsCatalog.MapKeyToVector*) | Convert keys back to vectors of original values | Yes |
| [Microsoft.ML.ConversionsCatalog.MapKeyToBinaryVector*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ConversionsCatalog.MapKeyToBinaryVector*) | Convert keys back to a binary vector of original values | No |
| [Microsoft.ML.ConversionsExtensionsCatalog.Hash*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ConversionsExtensionsCatalog.Hash*) | Hash the value in the input column | Yes |

## Text transformations

| Transform | Definition | ONNX Exportable |
| --- | --- | --- |
| [Microsoft.ML.TextCatalog.FeaturizeText*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TextCatalog.FeaturizeText*) | Transform a text column into a float array of normalized ngrams and char-grams counts | No |
| [Microsoft.ML.TextCatalog.TokenizeIntoWords*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TextCatalog.TokenizeIntoWords*) | Split one or more text columns into individual words | Yes |
| [Microsoft.ML.TextCatalog.TokenizeIntoCharactersAsKeys*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TextCatalog.TokenizeIntoCharactersAsKeys*) | Split one or more text columns into individual characters floats over a set of topics | Yes |
| [Microsoft.ML.TextCatalog.NormalizeText*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TextCatalog.NormalizeText*) | Change case, remove diacritical marks, punctuation marks, and numbers | Yes |
| [Microsoft.ML.TextCatalog.ProduceNgrams*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TextCatalog.ProduceNgrams*) | Transform text column into a bag of counts of ngrams (sequences of consecutive words) | Yes |
| [Microsoft.ML.TextCatalog.ProduceWordBags*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TextCatalog.ProduceWordBags*) | Transform text column into a bag of counts of ngrams vector | Yes |
| [Microsoft.ML.TextCatalog.ProduceHashedNgrams*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TextCatalog.ProduceHashedNgrams*) | Transform text column into a vector of hashed ngram counts | No |
| [Microsoft.ML.TextCatalog.ProduceHashedWordBags*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TextCatalog.ProduceHashedWordBags*) | Transform text column into a bag of hashed ngram counts | Yes |
| [Microsoft.ML.TextCatalog.RemoveDefaultStopWords*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TextCatalog.RemoveDefaultStopWords*) | Remove default stop words for the specified language from input columns | Yes |
| [Microsoft.ML.TextCatalog.RemoveStopWords*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TextCatalog.RemoveStopWords*) | Removes specified stop words from input columns | Yes |
| [Microsoft.ML.TextCatalog.LatentDirichletAllocation*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TextCatalog.LatentDirichletAllocation*) | Transform a document (represented as a vector of floats) into a vector of floats over a set of topics | Yes |
| [Microsoft.ML.TextCatalog.ApplyWordEmbedding*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TextCatalog.ApplyWordEmbedding*) | Convert vectors of text tokens into sentence vectors using a pretrained model | Yes |

## Image transformations

| Transform | Definition | ONNX Exportable |
| --- | --- | --- |
| [Microsoft.ML.ImageEstimatorsCatalog.ConvertToGrayscale*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ImageEstimatorsCatalog.ConvertToGrayscale*) | Convert an image to grayscale | No |
| [Microsoft.ML.ImageEstimatorsCatalog.ConvertToImage*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ImageEstimatorsCatalog.ConvertToImage*) | Convert a vector of pixels to [Microsoft.ML.Transforms.Image.ImageDataViewType](https://learn.microsoft.com/search/?terms=Microsoft.ML.Transforms.Image.ImageDataViewType) | No |
| [Microsoft.ML.ImageEstimatorsCatalog.ExtractPixels*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ImageEstimatorsCatalog.ExtractPixels*) | Convert pixels from input image into a vector of numbers | No |
| [Microsoft.ML.ImageEstimatorsCatalog.LoadImages*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ImageEstimatorsCatalog.LoadImages*) | Load images from a folder into memory | No |
| [Microsoft.ML.ImageEstimatorsCatalog.LoadRawImageBytes*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ImageEstimatorsCatalog.LoadRawImageBytes*) | Loads images of raw bytes into a new column. | No |
| [Microsoft.ML.ImageEstimatorsCatalog.ResizeImages*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ImageEstimatorsCatalog.ResizeImages*) | Resize images | No |
| [Microsoft.ML.OnnxCatalog.DnnFeaturizeImage*](https://learn.microsoft.com/search/?terms=Microsoft.ML.OnnxCatalog.DnnFeaturizeImage*) | Applies a pretrained deep neural network (DNN) model to transform an input image into a feature vector | No |

## Categorical data transformations

| Transform | Definition | ONNX Exportable |
| --- | --- | --- |
| [Microsoft.ML.CategoricalCatalog.OneHotEncoding*](https://learn.microsoft.com/search/?terms=Microsoft.ML.CategoricalCatalog.OneHotEncoding*) | Convert one or more text columns into [one-hot](https://en.wikipedia.org/wiki/One-hot) encoded vectors | Yes |
| [Microsoft.ML.CategoricalCatalog.OneHotHashEncoding*](https://learn.microsoft.com/search/?terms=Microsoft.ML.CategoricalCatalog.OneHotHashEncoding*) | Convert one or more text columns into hash-based one-hot encoded vectors | No |

## Time series data transformations

| Transform | Definition | ONNX Exportable |
| --- | --- | --- |
| [Microsoft.ML.TimeSeriesCatalog.DetectAnomalyBySrCnn*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TimeSeriesCatalog.DetectAnomalyBySrCnn*) | Detect anomalies in the input time series data using the Spectral Residual (SR) algorithm | No |
| [Microsoft.ML.TimeSeriesCatalog.DetectChangePointBySsa*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TimeSeriesCatalog.DetectChangePointBySsa*) | Detect change points in time series data using singular spectrum analysis (SSA) | No |
| [Microsoft.ML.TimeSeriesCatalog.DetectIidChangePoint*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TimeSeriesCatalog.DetectIidChangePoint*) | Detect change points in independent and identically distributed (IID) time series data using adaptive kernel density estimations and martingale scores | No |
| [Microsoft.ML.TimeSeriesCatalog.ForecastBySsa*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TimeSeriesCatalog.ForecastBySsa*) | Forecast time series data using singular spectrum analysis (SSA) | No |
| [Microsoft.ML.TimeSeriesCatalog.DetectSpikeBySsa*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TimeSeriesCatalog.DetectSpikeBySsa*) | Detect spikes in time series data using singular spectrum analysis (SSA) | No |
| [Microsoft.ML.TimeSeriesCatalog.DetectIidSpike*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TimeSeriesCatalog.DetectIidSpike*) | Detect spikes in independent and identically distributed (IID) time series data using adaptive kernel density estimations and martingale scores | No |
| [Microsoft.ML.TimeSeriesCatalog.DetectEntireAnomalyBySrCnn*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TimeSeriesCatalog.DetectEntireAnomalyBySrCnn*) | Detect anomalies for the entire input data using the SRCNN algorithm. | No |
| [Microsoft.ML.TimeSeriesCatalog.DetectSeasonality*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TimeSeriesCatalog.DetectSeasonality*) | Detect seasonality using fourier analysis. | No |
| [Microsoft.ML.TimeSeriesCatalog.LocalizeRootCause*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TimeSeriesCatalog.LocalizeRootCause*) | Localizes root cause from time series input using a decision tree algorithm. | No |
| [Microsoft.ML.TimeSeriesCatalog.LocalizeRootCauses*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TimeSeriesCatalog.LocalizeRootCauses*) | Localizes root causes from tie series input. | No |

## Missing values

| Transform | Definition | ONNX Exportable |
| --- | --- | --- |
| [Microsoft.ML.ExtensionsCatalog.IndicateMissingValues*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ExtensionsCatalog.IndicateMissingValues*) | Create a new boolean output column, the value of which is true when the value in the input column is missing | Yes |
| [Microsoft.ML.ExtensionsCatalog.ReplaceMissingValues*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ExtensionsCatalog.ReplaceMissingValues*) | Create a new output column, the value of which is set to a default value if the value is missing from the input column, and the input value otherwise | Yes |

## Feature selection

| Transform | Definition | ONNX Exportable |
| --- | --- | --- |
| [Microsoft.ML.FeatureSelectionCatalog.SelectFeaturesBasedOnCount*](https://learn.microsoft.com/search/?terms=Microsoft.ML.FeatureSelectionCatalog.SelectFeaturesBasedOnCount*) | Select features whose non-default values are greater than a threshold | Yes |
| [Microsoft.ML.FeatureSelectionCatalog.SelectFeaturesBasedOnMutualInformation*](https://learn.microsoft.com/search/?terms=Microsoft.ML.FeatureSelectionCatalog.SelectFeaturesBasedOnMutualInformation*) | Select the features on which the data in the label column is most dependent | Yes |

## Feature transformations

| Transform | Definition | ONNX Exportable |
| --- | --- | --- |
| [Microsoft.ML.KernelExpansionCatalog.ApproximatedKernelMap*](https://learn.microsoft.com/search/?terms=Microsoft.ML.KernelExpansionCatalog.ApproximatedKernelMap*) | Map each input vector onto a lower dimensional feature space, where inner products approximate a kernel function, so that the features can be used as inputs to the linear algorithms | No |
| [Microsoft.ML.PcaCatalog.ProjectToPrincipalComponents*](https://learn.microsoft.com/search/?terms=Microsoft.ML.PcaCatalog.ProjectToPrincipalComponents*) | Reduce the dimensions of the input feature vector by applying the Principal Component Analysis algorithm |  |

## Explainability transformations

| Transform | Definition | ONNX Exportable |
| --- | --- | --- |
| [Microsoft.ML.ExplainabilityCatalog.CalculateFeatureContribution*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ExplainabilityCatalog.CalculateFeatureContribution*) | Calculate contribution scores for each element of a feature vector | No |

## Calibration transformations

| Transform | Definition | ONNX Exportable |
| --- | --- | --- |
| [Microsoft.ML.BinaryClassificationCatalog.CalibratorsCatalog.Platt%28System.String%2CSystem.String%2CSystem.String%29](https://learn.microsoft.com/search/?terms=Microsoft.ML.BinaryClassificationCatalog.CalibratorsCatalog.Platt%2528System.String%252CSystem.String%252CSystem.String%2529) | Transforms a binary classifier raw score into a class probability using logistic regression with parameters estimated using the training data | Yes |
| [Microsoft.ML.BinaryClassificationCatalog.CalibratorsCatalog.Platt%28System.Double%2CSystem.Double%2CSystem.String%29](https://learn.microsoft.com/search/?terms=Microsoft.ML.BinaryClassificationCatalog.CalibratorsCatalog.Platt%2528System.Double%252CSystem.Double%252CSystem.String%2529) | Transforms a binary classifier raw score into a class probability using logistic regression with fixed parameters | Yes |
| [Microsoft.ML.BinaryClassificationCatalog.CalibratorsCatalog.Naive*](https://learn.microsoft.com/search/?terms=Microsoft.ML.BinaryClassificationCatalog.CalibratorsCatalog.Naive*) | Transforms a binary classifier raw score into a class probability by assigning scores to bins, and calculating the probability based on the distribution among the bins | Yes |
| [Microsoft.ML.BinaryClassificationCatalog.CalibratorsCatalog.Isotonic*](https://learn.microsoft.com/search/?terms=Microsoft.ML.BinaryClassificationCatalog.CalibratorsCatalog.Isotonic*) | Transforms a binary classifier raw score into a class probability by assigning scores to bins, where the position of boundaries and the size of bins are estimated using the training data | No |

## Deep learning transformations

| Transform | Definition | ONNX Exportable |
| --- | --- | --- |
| [Microsoft.ML.OnnxCatalog.ApplyOnnxModel*](https://learn.microsoft.com/search/?terms=Microsoft.ML.OnnxCatalog.ApplyOnnxModel*) | Transform the input data with an imported ONNX model | No |
| [Microsoft.ML.TensorflowCatalog.LoadTensorFlowModel*](https://learn.microsoft.com/search/?terms=Microsoft.ML.TensorflowCatalog.LoadTensorFlowModel*) | Transform the input data with an imported TensorFlow model | No |

## Custom transformations

| Transform | Definition | ONNX Exportable |
| --- | --- | --- |
| [Microsoft.ML.CustomMappingCatalog.FilterByCustomPredicate*](https://learn.microsoft.com/search/?terms=Microsoft.ML.CustomMappingCatalog.FilterByCustomPredicate*) | Drops rows where a specified predicate returns true. | No |
| [Microsoft.ML.CustomMappingCatalog.FilterByStatefulCustomPredicate*](https://learn.microsoft.com/search/?terms=Microsoft.ML.CustomMappingCatalog.FilterByStatefulCustomPredicate*) | Drops rows where a specified predicate returns true, but allows for a specified state. | No |
| [Microsoft.ML.CustomMappingCatalog.CustomMapping*](https://learn.microsoft.com/search/?terms=Microsoft.ML.CustomMappingCatalog.CustomMapping*) | Transform existing columns onto new ones with a user-defined mapping | No |
| [Microsoft.ML.ExpressionCatalog.Expression*](https://learn.microsoft.com/search/?terms=Microsoft.ML.ExpressionCatalog.Expression*) | Apply an expression to transform columns into new ones | No |
