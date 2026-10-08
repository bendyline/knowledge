---
title: "PREDICT (Transact-SQL)"
titleSuffix: SQL machine learning
description: "PREDICT generates a predicted value or scores based on a stored model."
author: VanMSFT
ms.author: vanto
ms.reviewer: wiassaf, monamaki
ms.date: "02/26/2026"
ms.service: sql
ms.subservice: machine-learning
ms.topic: reference
ms.custom:
  - ignite-2024
f1_keywords:
  - "PREDICT"
  - "PREDICT_TSQL"
helpviewer_keywords:
  - "PREDICT clause"
dev_langs:
  - "TSQL"
monikerRange: ">=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current || >=azure-sqldw-latest"
---
# PREDICT (Transact-SQL)


**Applies to:**
 



 and later versions 


 





Generates a predicted value or scores based on a stored model. For more information, see [Native scoring using the PREDICT T-SQL function](../../machine-learning/predictions/native-scoring-predict-transact-sql.md).

## Select a product

In the following row, select the product name you're interested in, and only that product's information is displayed.


> **Note:**
> `PREDICT` isn't available in Azure SQL Database.

> **Important:**
> The `PREDICT` syntax varies by product. Use the product selector to view the correct syntax for your platform. In particular, Azure Synapse Analytics requires the `RUNTIME = ONNX` argument, which isn't used in SQL Server or Azure SQL Managed Instance.

**Applies to: \>=sql-server-2017 || >=sql-server-linux-2017**


        **_\* SQL Server \*_** &nbsp;


        [SQL Managed Instance](predict-transact-sql.md?view=azuresqldb-mi-current&preserve-view=true)


        [Azure Synapse<br />Analytics](predict-transact-sql.md?view=azure-sqldw-latest&preserve-view=true)




**Applies to: \=azuresqldb-mi-current**


        [SQL Server](predict-transact-sql.md?view=sql-server-ver15&preserve-view=true)


        **_\* SQL Managed Instance \*_** &nbsp;


        [Azure Synapse<br />Analytics](predict-transact-sql.md?view=azure-sqldw-latest&preserve-view=true)




**Applies to: \>=azure-sqldw-latest**


        [SQL Server](predict-transact-sql.md?view=sql-server-ver15&preserve-view=true)


        [SQL Managed Instance](predict-transact-sql.md?view=azuresqldb-mi-current&preserve-view=true)


        **_\* Azure Synapse<br />Analytics \*_** &nbsp;



> **Tip:**
> [Microsoft Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse) is an enterprise scale relational warehouse on a data lake foundation, with a future-ready architecture, built-in AI, and new features. If you're new to data warehousing, start with Fabric Data Warehouse. Existing [dedicated SQL pool workloads can upgrade to Fabric](https://learn.microsoft.com/fabric/data-warehouse/migration-synapse-dedicated-sql-pool-warehouse) to access new capabilities across data science, real-time analytics, and reporting.
> 
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Migration Assistant for Fabric Data Warehouse](https://learn.microsoft.com/fabric/data-warehouse/migration-assistant).



**Applies to: \>=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current**

## Syntax

```syntaxsql
PREDICT  
(  
  MODEL = @model | model_literal,  
  DATA = object AS <table_alias>
)  
WITH ( <result_set_definition> )  

<result_set_definition> ::=  
  {  
    { column_name  
      data_type  
      [ COLLATE collation_name ]  
      [ NULL | NOT NULL ]  
    }  
      [,...n ]  
  }  

MODEL = @model | model_literal  
```



**Applies to: \>=azure-sqldw-latest**

```syntaxsql
PREDICT  
(  
  MODEL = <model_object>,
  DATA = object AS <table_alias>
  [, RUNTIME = ONNX ]
)  
WITH ( <result_set_definition> )  

<result_set_definition> ::=  
  {  
    { column_name  
      data_type  
      [ COLLATE collation_name ]  
      [ NULL | NOT NULL ]  
    }  
      [,...n ]  
  }  

<model_object> ::=
  {
    model_literal
    | model_variable
    | ( scalar_subquery )
  }
```



### Arguments

**MODEL**

**Applies to: \>=sql-server-2017 || >=sql-server-linux-2017**
Use the `MODEL` parameter to specify the model for scoring or prediction. Specify the model as a variable, a literal, or a scalar expression.

`PREDICT` supports models trained using the [RevoScaleR](../../machine-learning/r/ref-r-revoscaler.md) and [revoscalepy](../../machine-learning/python/ref-py-revoscalepy.md) packages.


**Applies to: \=azuresqldb-mi-current**
Use the `MODEL` parameter to specify the model for scoring or prediction. Specify the model as a variable, a literal, or a scalar expression.

In Azure SQL Managed Instance, `PREDICT` supports models trained using the [RevoScaleR](../../machine-learning/r/ref-r-revoscaler.md) and [revoscalepy](../../machine-learning/python/ref-py-revoscalepy.md) packages.



**Applies to: \>=azure-sqldw-latest**
Use the `MODEL` parameter to specify the model for scoring or prediction. Specify the model as a variable, a literal, a scalar expression, or a scalar subquery.

In Azure Synapse Analytics, `PREDICT` supports models in [Open Neural Network Exchange (ONNX)](https://onnx.ai/get-started.html) format. For more information, see [ONNX](https://learn.microsoft.com/azure/machine-learning/concept-onnx#get-onnx-models).


**DATA**

The DATA parameter specifies the data for scoring or prediction. Specify data in the form of a table source in the query. The table source can be a table, table alias, CTE alias, view, or table-valued function.

**Applies to: \>=azure-sqldw-latest**
**RUNTIME = ONNX**

Indicates the machine learning engine used for model execution. The `RUNTIME` parameter value is always `ONNX`. The `RUNTIME` parameter is required for Azure Synapse Analytics. The `RUNTIME = ONNX` argument is only available in Azure Synapse Analytics.


**WITH ( <result_set_definition> )**

Use the WITH clause to specify the schema of the output returned by the `PREDICT` function.

In addition to the columns returned by the `PREDICT` function itself, all the columns that are part of the data input are available for use in the query.

### Return values

No predefined schema is available; the contents of the model isn't validated and the returned column values aren't validated either.

- The `PREDICT` function passes through columns as input.
- The `PREDICT` function also generates new columns, but the number of columns and their data types depends on the type of model used for prediction.

Any error messages related to the data, the model, or the column format are returned by the underlying prediction function associated with the model.

**Applies to: \>=sql-server-2017 || >=sql-server-linux-2017**
## Remarks

The `PREDICT` function is supported in all editions of SQL Server 2017 or later, on Windows and Linux. [Machine Learning Services](../../machine-learning/sql-server-machine-learning-services.md) doesn't need to be enabled to use `PREDICT`.


### Supported algorithms

**Applies to: \>=sql-server-2017 || >=sql-server-linux-2017**
The model that you use must have been created using one of the supported algorithms from the [RevoScaleR](../../machine-learning/r/ref-r-revoscaler.md) or [revoscalepy](../../machine-learning/python/ref-py-revoscalepy.md) packages. For a list of currently supported models, see [Native scoring using the PREDICT T-SQL function](../../machine-learning/predictions/native-scoring-predict-transact-sql.md).


**Applies to: \=azure-sqldw-latest**
Algorithms that can be converted to [ONNX](https://onnx.ai/) model format are supported.


**Applies to: \=azuresqldb-mi-current**
Algorithms that can be converted to [ONNX](https://onnx.ai/) model format and models that you have created using one of the supported algorithms from the [RevoScaleR](../../machine-learning/r/ref-r-revoscaler.md) or [revoscalepy](../../machine-learning/python/ref-py-revoscalepy.md) packages are supported. For a list of currently supported algorithms in RevoScaleR and revoscalepy, see [Native scoring using the PREDICT T-SQL function](../../machine-learning/predictions/native-scoring-predict-transact-sql.md).


### Permissions

No permissions are required for `PREDICT`; however, the user needs `EXECUTE` permission on the database, and permission to query any data that is used as inputs. The user must also be able to read the model from a table, if the model has been stored in a table.

## Examples

The following examples demonstrate the syntax for calling `PREDICT`.

### Using PREDICT in a FROM clause

This example references the `PREDICT` function in the `FROM` clause of a `SELECT` statement:

**Applies to: \>=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current**

```sql
SELECT d.*, p.Score
FROM PREDICT(MODEL = @model,
    DATA = dbo.mytable AS d) WITH (Score FLOAT) AS p;
```



**Applies to: \>=azure-sqldw-latest**

```sql
DECLARE @model VARBINARY(max) = (SELECT test_model FROM scoring_model WHERE model_id = 1);

SELECT d.*, p.Score
FROM PREDICT(MODEL = @model,
    DATA = dbo.mytable AS d, RUNTIME = ONNX) WITH (Score FLOAT) AS p;
```



The alias **d** specified for table source in the `DATA` parameter references the columns belonging to `dbo.mytable`. The alias **p** specified for the `PREDICT` function references the columns returned by the `PREDICT` function.

- The model is stored as **varbinary(max)** column in table called `Models`. Additional information such as `ID` and `description` is saved in the table to identify the model.
- The alias **d** specified for table source in the `DATA` parameter references the columns belonging to `dbo.mytable`. The input data column names should match the name of inputs for the model.
- The alias **p** specified for the `PREDICT` function references the predicted column returned by the `PREDICT` function. The column name should have the same name as the output name for the model.
- All input data columns and the predicted columns are available to display in the `SELECT` statement.

**Applies to: \>=azure-sqldw-latest**

The preceding example query can be rewritten to create a view by specifying `MODEL` as a scalar subquery:

```sql
CREATE VIEW predictions
AS
SELECT d.*, p.Score
FROM PREDICT(MODEL = (SELECT test_model FROM scoring_model WHERE model_id = 1),
             DATA = dbo.mytable AS d, RUNTIME = ONNX) WITH (Score FLOAT) AS p;
```



### Combining PREDICT with an INSERT statement

A common use case for prediction is to generate a score for input data, and then insert the predicted values into a table. The following example assumes the calling application uses a stored procedure to insert a row containing the predicted value into a table:

**Applies to: \>=sql-server-2017 || >=sql-server-linux-2017 || =azuresqldb-mi-current**

```sql
DECLARE @model VARBINARY(max) = (SELECT model FROM scoring_model WHERE model_name = 'ScoringModelV1');

INSERT INTO loan_applications (c1, c2, c3, c4, score)
SELECT d.c1, d.c2, d.c3, d.c4, p.score
FROM PREDICT(MODEL = @model, DATA = dbo.mytable AS d) WITH(score FLOAT) AS p;
```



**Applies to: \>=azure-sqldw-latest**

```sql
DECLARE @model VARBINARY(max) = (SELECT model FROM scoring_model WHERE model_name = 'ScoringModelV1');

INSERT INTO loan_applications (c1, c2, c3, c4, score)
SELECT d.c1, d.c2, d.c3, d.c4, p.score
FROM PREDICT(MODEL = @model, DATA = dbo.mytable AS d, RUNTIME = ONNX) WITH(score FLOAT) AS p;
```



- The results of `PREDICT` are stored in a table called `PredictionResults`. 
- The model is stored as **varbinary(max)** column in table called `Models`. Additional information such as ID and description can be saved in the table to identify the model.
- The alias `d` specified for table source in the `DATA` parameter references the columns in `dbo.mytable`. The input data column names should match the name of inputs for the model.
- The alias `p` specified for the `PREDICT` function references the predicted column returned by the `PREDICT` function. The column name should have the same name as the output name for the model.
- All input columns and the predicted column are available to display in the `SELECT` statement.

## Related content

- [Native scoring using the PREDICT T-SQL function with SQL machine learning](../../machine-learning/predictions/native-scoring-predict-transact-sql.md)
- [RevoScaleR (R package in SQL Server Machine Learning Services)](../../machine-learning/r/ref-r-revoscaler.md)
- [revoscalepy (Python package in SQL Server Machine Learning Services)](../../machine-learning/python/ref-py-revoscalepy.md)
- [OPENXML (Transact-SQL)](../functions/openxml-transact-sql.md)
- [STRING_SPLIT (Transact-SQL)](../functions/string-split-transact-sql.md)
