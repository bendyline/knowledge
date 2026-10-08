---
title: "R tutorial: Predict NYC taxi fares with binary classification"
titleSuffix: SQL machine learning
description: In this five-part tutorial series, you'll learn how to embed R code in SQL Server stored procedures and T-SQL functions with SQL machine learning to predict NYC taxi fares using binary classification.
author: VanMSFT
ms.author: vanto
ms.date: 10/15/2020
ms.service: sql
ms.subservice: machine-learning
ms.topic: tutorial
monikerRange: ">=sql-server-2017 || >=sql-server-linux-ver15 || >=azuresqldb-mi-current"
---

# R tutorial: Predict NYC taxi fares with binary classification

**Applies to:**
 

 and later versions 


 

**Applies to: \>=sql-server-ver15 || >=sql-server-linux-ver15**
In this five-part tutorial series for SQL programmers, you'll learn about R integration in [SQL Server Machine Learning Services](../sql-server-machine-learning-services.md) or on [Big Data Clusters](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/big-data-cluster/machine-learning-services.md).


**Applies to: \=sql-server-2017**
In this five-part tutorial series for SQL programmers, you'll learn about R integration in [SQL Server Machine Learning Services](../sql-server-machine-learning-services.md).


**Applies to: \>=azuresqldb-mi-current**
In this five-part tutorial series for SQL programmers, you'll learn about R integration in [Machine Learning Services in Azure SQL Managed Instance](https://learn.microsoft.com/azure/azure-sql/managed-instance/machine-learning-services-overview).


You'll build and deploy an R-based machine learning solution using a sample database on SQL Server. You'll use T-SQL, Visual Studio Code, or SQL Server Management Studio, and a database engine instance with SQL machine learning and R language support

This tutorial series introduces you to R functions used in a data modeling workflow. Parts include data exploration, building and training a binary classification model, and model deployment. You'll use sample data from the New York City Taxi and Limousine Commission. The model you'll build predicts whether a trip is likely to result in a tip based on the time of day, distance traveled, and pick-up location.

In the first part of this series, you'll install the prerequisites and restore the sample database. In parts two and three, you'll develop some R scripts to prepare your data and train a machine learning model. Then, in parts four and five, you'll run those R scripts inside the database using T-SQL stored procedures.

In this article, you'll:

> 
> + Install prerequisites
> + Restore the sample database

In [part two](r-taxi-classification-explore-data.md), you'll explore the sample data and generate some plots.

In [part three](r-taxi-classification-create-features.md), you'll learn how to create features from raw data by using a Transact-SQL function. You'll then call that function from a stored procedure to create a table that contains the feature values.

In [part four](r-taxi-classification-train-model.md), you'll load the modules and call the necessary functions to create and train the model using a SQL Server stored procedure.

In [part five](r-taxi-classification-deploy-model.md), you'll learn how to operationalize the models that you trained and saved in part four.

> **Note:**
> This tutorial is available in both R and Python. For the Python version, see [Python tutorial: Predict NYC taxi fares with binary classification](r-taxi-classification-introduction.md).

## Prerequisites

**Applies to: \>=sql-server-2017 || >=sql-server-linux-ver15**
+ Install [SQL Server Machine Learning Services with R enabled](../install/sql-machine-learning-services-windows-install.md#verify-installation)


+ Install [R libraries](../package-management/r-package-information.md)

+ [Grant permissions to execute Python scripts](../security/user-permission.md)

**Applies to: \>=sql-server-ver15 || >=sql-server-linux-ver15**
+ Starting in SQL Server 2019, the isolation mechanism requires you to give appropriate permissions to the directory where the plot file is stored. For more information on how to set these permissions, see the [File permissions section in SQL Server 2019 on Windows: Isolation changes for Machine Learning Services](../install/sql-server-machine-learning-services-2019.md#file-permissions).


+ Restore the [NYC Taxi demo database](demo-data-nyctaxi-in-sql.md)

All tasks can be done using  Transact-SQL  stored procedures in Visual Studio Code or  Management Studio
.

This tutorial assumes familiarity with basic database operations such as creating databases and tables, importing data, and writing SQL queries. It does not assume you know R and all R code is provided.

## Background for SQL developers

The process of building a machine learning solution is a complex one that can involve multiple tools, and the coordination of subject matter experts across several phases:

+ obtaining and cleaning data
+ exploring the data and building features useful for modeling
+ training and tuning the model
+ deployment to production

Development and testing of the actual code is best performed using a dedicated R development environment. However, after the script is fully tested, you can easily deploy it to  SQL Server 
 using  Transact-SQL  stored procedures in the familiar environment of Visual Studio Code or  Management Studio
. Wrapping external code in stored procedures is the primary mechanism for operationalizing code in SQL Server.

After the model has been saved to the database, you can call the model for predictions from  Transact-SQL  by using stored procedures.

Whether you're a SQL programmer new to R, or an R developer new to SQL, this five-part tutorial series introduces a typical workflow for conducting in-database analytics with R and SQL Server.

## Next step

In this article, you:

> 
> + Installed prerequisites
> + Restored the sample database

> 
> [R tutorial: Explore and visualize data](r-taxi-classification-explore-data.md)
