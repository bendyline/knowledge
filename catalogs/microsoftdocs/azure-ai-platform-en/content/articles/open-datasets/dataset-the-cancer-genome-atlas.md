---
title: TCGA Open Data
titleSuffix: Azure Open Datasets
description: Learn how to use the TCGA open dataset in Azure Open Datasets.
ms.service: azure-open-datasets
ms.topic: sample
author: s-polly
ms.author: scottpolly
ms.custom: references_regions
ms.date: 09/22/2022
---

# TCGA Open Data

> **Note:**
> Important Update May 2025: 
Dear Community,
We’d like to inform you of an upcoming change regarding the Genomics open datasets currently available through Azure.
After careful consideration, we decided to shift our focus to new initiatives that will better serve our community and align with our long-term goals. As such, access to the Genomics open datasets on Azure will be deprecated in the coming months.
We understand these datasets were valuable for research, development, and learning, and we deeply appreciate the contributions and engagement from our community over time.
Thank you for your understanding and support.


The Cancer Genome Atlas (TCGA), a landmark cancer genomics program, molecularly characterized over 20,000 primary cancer and matched normal samples spanning 33 cancer types[[1]](https://www.cancer.gov/about-nci/organization/ccg/research/structural-genomics/tcga). The TCGA cancer data are made publicly available in two tiers: open or controlled access.

- Open access [available on Azure]: This dataset contains deindentified clinical and biospecimen data or summarized data that doesn't contain any individually identifiable information. The data types included are Gene expression, methylation beta values and protein quantification. DNA level datatype includes gene level copy number and masked copy number segment.
- Controlled access: This dataset is the individual level sequence data and requires approval through dbGap for access.

> **Note:**
> Microsoft provides Azure Open Datasets on an “as is” basis. Microsoft makes no warranties, express or implied, guarantees or conditions with respect to your use of the datasets. To the extent permitted under your local law, Microsoft disclaims all liability for any damages or losses, including direct, consequential, special, indirect, incidental or punitive, resulting from your use of the datasets.
> 
>This dataset is provided under the original terms that Microsoft received source data. The dataset may include data sourced from Microsoft.

### Data source

This dataset is a mirror of [TCGA Open Data](https://portal.gdc.cancer.gov/?facetTab=files&filters=%7B%22op%22%3A%22and%22%2C%22content%22%3A%5B%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22cases.project.program.name%22%2C%22value%22%3A%5B%22TCGA%22%5D%7D%7D%2C%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22files.access%22%2C%22value%22%3A%5B%22open%22%5D%7D%7D%2C%7B%22op%22%3A%22in%22%2C%22content%22%3A%7B%22field%22%3A%22files.data_type%22%2C%22value%22%3A%5B%22Allele-specific%20Copy%20Number%20Segment%22%2C%22Biospecimen%20Supplement%22%2C%22Clinical%20Supplement%22%2C%22Copy%20Number%20Segment%22%2C%22Gene%20Expression%20Quantification%22%2C%22Gene%20Level%20Copy%20Number%22%2C%22Isoform%20Expression%20Quantification%22%2C%22Masked%20Copy%20Number%20Segment%22%2C%22Masked%20Intensities%22%2C%22Masked%20Somatic%20Mutation%22%2C%22Methylation%20Beta%20Value%22%2C%22Protein%20Expression%20Quantification%22%2C%22miRNA%20Expression%20Quantification%22%5D%7D%7D%5D%7D)

### Data volumes and update frequency

This dataset contains approximately 387 GB

### Storage location

This dataset is stored in the East US 2 Azure regions. Allocating compute resources in East US 2 is recommended for affinity.

## Data access

East US 2: 'https://datasettcga.blob.core.windows.net/dataset'

## Use terms

Data is available without restrictions. For more information and citation details, see the [TCGA Program page](https://www.cancer.gov/about-nci/organization/ccg/research/structural-genomics/tcga/using-tcga/citing-tcga)

## Contact

For questions regarding TCGA data and program: https://www.cancer.gov/about-nci/organization/ccg/research/structural-genomics/tcga/contact

## Next steps

View the rest of the datasets in the [Open Datasets catalog](dataset-catalog.md).
