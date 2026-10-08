---
title: Overview of Azure Synapse Analytics notebooks
description: This article provides an overview of the capabilities available through Azure Synapse Analytics notebooks.
author: midesa
ms.service: azure-synapse-analytics
ms.topic: overview
ms.date: 11/18/2020
ms.author: midesa
 
ms.subservice: spark
---

# Azure Synapse Analytics notebooks

A Synapse Studio notebook is a web interface for you to create files that contain live code, visualizations, and narrative text. Notebooks are a good place to validate ideas and use quick experiments to get insights from your data. 

With an Synapse Studio notebook, you can:

* Get started with zero setup effort.
* Keep data secure with built-in enterprise security features.
* Analyze data across raw formats (CSV, txt, JSON, etc.), processed file formats (parquet, Delta Lake, ORC, etc.), and SQL tabular data files against Spark and SQL.
* Be productive with enhanced authoring capabilities and built-in data visualization.

This section contains articles on mixing languages, creating data visualizations, parameterizing notebooks, building pipelines, and more. It also contains references and tutorials on how you can get started with your notebook development.

## Create, manage, and use notebooks
You can manage notebooks using the Synapse Studio UI. 

To learn more on how you can create and manage notebooks, see the following articles:
  - Manage Notebooks
    - [Create notebooks](apache-spark-development-using-notebooks.md#create-a-notebook)
    - [Develop notebooks](apache-spark-development-using-notebooks.md#develop-notebooks)
    - [Bring data to a notebook](apache-spark-development-using-notebooks.md#bring-data-to-a-notebook)
    - [Use multiple languages using magic commands and temporary tables](apache-spark-development-using-notebooks.md#integrate-a-notebook)
    - [Use cell magic commands](apache-spark-development-using-notebooks.md#magic-commands)
  - Development
    - [Configure Spark session settings](apache-spark-development-using-notebooks.md#spark-session-configuration)
    - [Use Microsoft Spark utilities](microsoft-spark-utilities.md)
    - [Visualize data using notebooks and libraries](apache-spark-data-visualization.md)
    - [Integrate a notebook into pipelines](apache-spark-development-using-notebooks.md#integrate-a-notebook)


## Next steps
Notebooks are also widely used in data preparation, data visualization, machine learning, and other big data scenarios. To learn more about how you can use notebooks for your data analysis and big data scenarios, please visit the following tutorials:
  - [Create a notebook](../quickstart-apache-spark-notebook.md)
  - [Create visualizations using Synapse Studio notebooks](apache-spark-data-visualization-tutorial.md)
  - [Build machine learning models with Apache Spark MLlib](apache-spark-machine-learning-mllib-notebook.md)
  - [Build machine learning models with Azure automated ML](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/synapse-analytics/spark/apache-spark-azure-machine-learning-tutorial.md)
