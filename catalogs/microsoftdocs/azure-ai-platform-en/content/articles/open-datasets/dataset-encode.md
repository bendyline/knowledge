---
title: ENCODE
description: Learn how to use the ENCODE dataset in Azure Open Datasets.
ms.service: azure-open-datasets
ms.topic: sample
ms.date: 04/16/2021
---

# ENCODE: Encyclopedia of DNA Elements

> **Note:**
> Important Update May 2025: 
Dear Community,
We’d like to inform you of an upcoming change regarding the Genomics open datasets currently available through Azure.
After careful consideration, we decided to shift our focus to new initiatives that will better serve our community and align with our long-term goals. As such, access to the Genomics open datasets on Azure will be deprecated in the coming months.
We understand these datasets were valuable for research, development, and learning, and we deeply appreciate the contributions and engagement from our community over time.
Thank you for your understanding and support.


The [Encyclopedia of DNA Elements (ENCODE) Consortium](https://www.encodeproject.org/help/project-overview/) is an ongoing international collaboration of research groups funded by the National Human Genome Research Institute (NHGRI). ENCODE's goal is to build a comprehensive parts list of functional elements in the human genome, including elements that act at the protein and RNA levels, and regulatory elements that control cells and circumstances in which a gene is active.

ENCODE investigators employ various assays and methods to identify functional elements. The discovery and annotation of gene elements is accomplished primarily by sequencing a diverse range of RNA sources, comparative genomics, integrative bioinformatic methods, and human curation. Regulatory elements are typically investigated through DNA hypersensitivity assays, assays of DNA methylation, and immunoprecipitation (IP) of proteins that interact with DNA and RNA, that is, modified histones, transcription factors, chromatin regulators, and RNA-binding proteins, followed by sequencing.

> **Note:**
> Microsoft provides Azure Open Datasets on an “as is” basis. Microsoft makes no warranties, express or implied, guarantees or conditions with respect to your use of the datasets. To the extent permitted under your local law, Microsoft disclaims all liability for any damages or losses, including direct, consequential, special, indirect, incidental or punitive, resulting from your use of the datasets.
> 
>This dataset is provided under the original terms that Microsoft received source data. The dataset may include data sourced from Microsoft.

## Data source

This dataset is a mirror of the data store at https://www.encodeproject.org/

## Data volumes and update frequency

This dataset includes approximately 756 TB of data, and is updated daily.

## Storage location

This dataset is stored in the West US 2 and West Central US Azure regions. We recommend locating compute resources in West US 2 or West Central US for affinity.

## Data Access

West US 2: 'https://datasetencode.blob.core.windows.net/dataset'

West Central US: 'https://datasetencode-secondary.blob.core.windows.net/dataset'

## Use Terms

External data users may freely download, analyze, and publish results based on any ENCODE data without restrictions, regardless of type or size, and includes no grace period for ENCODE data producers, either as individual members or as part of the Consortium. Researchers using unpublished ENCODE data are encouraged to contact the data producers to discuss possible publications. The Consortium will continue to publish the results of its own analysis efforts in independent publications.

ENCODE request that researchers who use ENCODE datasets (published or unpublished) in publications and presentations cite the ENCODE Consortium in all of the following ways reported on [https://www.encodeproject.org/help/citing-encode/](https://www.encodeproject.org/help/citing-encode/).

## Contact

If you have any questions, concerns, or comments, email our help desk at encode-help@lists.stanford.edu.

## Next steps

View the rest of the datasets in the [Open Datasets catalog](dataset-catalog.md).
