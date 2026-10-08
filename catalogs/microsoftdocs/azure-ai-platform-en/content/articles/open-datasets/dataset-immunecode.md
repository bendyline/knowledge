---
title: ImmuneCODE database
description: Learn how to use the ImmuneCODE database in Azure Open Datasets.
ms.service: azure-open-datasets
ms.topic: sample
ms.date: 11/09/2023
---

# ImmuneCODE database

> **Note:**
> Important Update May 2025: 
Dear Community,
We’d like to inform you of an upcoming change regarding the Genomics open datasets currently available through Azure.
After careful consideration, we decided to shift our focus to new initiatives that will better serve our community and align with our long-term goals. As such, access to the Genomics open datasets on Azure will be deprecated in the coming months.
We understand these datasets were valuable for research, development, and learning, and we deeply appreciate the contributions and engagement from our community over time.
Thank you for your understanding and support.


The ImmuneCODE™ database, which includes hundreds of millions of T-cell Receptor (TCR) sequences from over 1,400 subjects exposed to or infected with the SARS-CoV-2 virus, and over 160,000 high-confidence SARS-CoV-2-specific TCRs. 
The database is accessible at no cost. Its data can be analyzed to aid global initiatives aimed at comprehending the immune response to the SARS-CoV-2 virus and crafting novel interventions. To learn more about the dataset refer the associated [publication.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7418738/)

The latest ImmuneCODE datasets available contains: Release 002.

- The 1,486 subjects exposed to or infected with the SARSCoV-2 virus: ImmuneCODE-Repertoires-002.2.
- The sample metadata: ImmuneCODE-Repertoire-Tags-002.2.tsv (572 KB) Release 002.2.
- The high-confidence SARS-CoV-2-specific (Over 160,000): ImmuneCODE-MIRA-Release 002.1.
- The sample metadata: ImmuneCODE-Repertoire-Tags-002.2.xlsx (352 KB) Release 002.2.

> **Note:**
> Microsoft provides Azure Open Datasets on an “as is” basis. Microsoft makes no warranties, express or implied, guarantees or conditions with respect to your use of the datasets. To the extent permitted under your local law, Microsoft disclaims all liability for any damages or losses, including direct, consequential, special, indirect, incidental or punitive, resulting from your use of the datasets.
> 
>This dataset is provided under the original terms that Microsoft received source data. The dataset may include data sourced from Microsoft.

## Data source

This dataset is a mirror of https://clients.adaptivebiotech.com/pub/covid-2020

## Data volumes and update frequency

This dataset contains approximately 228 GB of data and is updated daily.

## Storage location

This dataset is stored in the West US 2 Azure regions. Allocating compute resources in West US 2 is recommended for affinity.

## Data access

West US 2: 'https://dataset1000genomes.blob.core.windows.net/dataset'

West Central US: 'https://dataset1000genomes-secondary.blob.core.windows.net/dataset'

## Use terms

To learn more about the data use terms refer the [publication](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7418738/) and [Terms of Use](https://clients.adaptivebiotech.com/terms-of-use).

## Contact

https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7418738/

## Next steps

View the rest of the datasets in the [Open Datasets catalog](dataset-catalog.md).
