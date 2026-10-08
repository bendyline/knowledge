---
title: Process fixed-width text files with mapping data flows in Azure Data Factory
description: Learn how to process fixed-width (also called fixed-length) text files in Azure Data Factory by using mapping data flows.
author: kromerm
ms.subservice: data-flows
ms.topic: how-to
ms.date: 07/29/2026
ms.author: makromer
ai-usage: ai-assisted
---

# Process fixed-width text files by using Azure Data Factory mapping data flows

**APPLIES TO:** Azure Data Factory Azure Synapse Analytics



> **Tip:**
> [Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory) is the next generation of Azure Data Factory, with a simpler architecture, built-in AI, and new features. If you're new to data integration, start with Fabric Data Factory. Existing ADF workloads can upgrade to Fabric to access new capabilities across data science, real-time analytics, and reporting.
>
> - [Start a Fabric free trial](https://learn.microsoft.com/fabric/get-started/fabric-trial).
> - [Upgrade from Azure Data Factory to Data Factory in Microsoft Fabric](https://learn.microsoft.com/fabric/data-factory/migrate-planning-azure-data-factory).


By using mapping data flows in Azure Data Factory, you can transform data from fixed-width text files (also known as fixed-length files). In the following task, you define a dataset for a text file without a delimiter and then set up substring splits based on ordinal position.

## Create a pipeline

1. Select **+New Pipeline** to create a new pipeline.

2. Add a data flow activity to process fixed-width files:

    Screenshot of a pipeline with a data flow activity to process fixed-width files.

3. In the data flow activity, select **New mapping data flow**.

4. Add a Source, Derived Column, Select, and Sink transformation:

    Screenshot of a mapping data flow with Source, Derived Column, Select, and Sink transformations.

5. Configure the Source transformation to use a new dataset of the Delimited Text type.

6. Don't set any column delimiter or headers.

   Now, set the field starting points and lengths for the contents of this file:

    ```
    1234567813572468
    1234567813572468
    1234567813572468
    1234567813572468
    1234567813572468
    1234567813572468
    1234567813572468
    1234567813572468
    1234567813572468
    1234567813572468
    1234567813572468
    1234567813572468
    1234567813572468
    ```

7. On the **Projection** tab of your Source transformation, you should see a string column that's named *Column_1*.

8. In the Derived column, create a new column.

9. Give the columns simple names like *col1*.

10. In the expression builder, type the following:

    `substring(Column_1,1,4)`

    Screenshot of the derived column expression builder using a substring expression.

11. Repeat step 10 for all the columns you need to parse.

12. Select the **Inspect** tab to see the new columns:

    Screenshot of the Inspect tab showing the new columns.

13. Use the Select transform to remove any of the columns that you don't need for transformation:

    Screenshot of the Select transformation removing unneeded columns.

14. Use Sink to output the data to a folder:

    Screenshot of the Sink transformation writing output to a folder.

    Here's what the output looks like:

    Screenshot of the fixed-width output split into four columns.

  The fixed-width data is now split, with four characters each and assigned to col1, col2, col3, col4, and so on. Based on the preceding example, the data is split into four columns. Run the pipeline to confirm the Sink transformation writes the split columns to your target folder.

## Related content

* Build the rest of your data flow logic by using mapping data flows [transformations](concepts-data-flow-overview.md).
