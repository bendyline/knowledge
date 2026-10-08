---
title: CAB download updates for offline install
description: Download Python and R CAB files for SQL Server Machine Learning Services. These CAB files contain updates to the Machine Learning Services (Python and R) feature and are used when installing SQL Server on a server without internet access.
author: VanMSFT
ms.author: vanto
ms.date: 09/21/2023
ms.service: sql
ms.subservice: machine-learning-services
ms.topic: how-to
monikerRange: ">=sql-server-2017"
---
# CAB downloads for offline installation of cumulative updates for SQL Server Machine Learning Services


**Applies to:**
 

 



 






**Applies to: \=sql-server-2017 || =sql-server-ver15**
Download Python and R CAB files for SQL Server Machine Learning Services. These CAB files contain updates to the Machine Learning Services (Python and R) feature and are used when installing SQL Server on a server without internet access.

This article lists download links to CAB files for each cumulative update. For more information about offline installs, see [Install SQL Server machine learning components without internet access](sql-ml-component-install-without-internet-access.md#apply-cu).



This article applies to  SQL Server 2016 (13.x) 
,  SQL Server 2017 (14.x) 
, and  SQL Server 2019 (15.x) 
.

## Prerequisites

**Applies to: \>=sql-server-ver16**
> **Important:**  
> R and Python runtimes and packages are not shipped or installed by SQL Setup for  SQL Server 2022 (16.x) 
. There are no CAB files to download starting with  SQL Server 2022 (16.x) 
. Instead, refer to [Install SQL Server 2022 Machine Learning Services (Python and R) on Windows](sql-machine-learning-services-windows-install-sql-2022.md) or [Install SQL Server Machine Learning Services (Python and R) on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup-machine-learning.md).


**Applies to: \=sql-server-2017 || =sql-server-ver15**
Start with a baseline installation. On SQL Server Machine Learning Services, the initial release is the baseline installation. You can also apply cumulative updates.


**Applies to: \=sql-server-ver15**

## SQL Server 2019 CABs

CAB files are listed in reverse chronological order. When you download the CAB files and transfer them to the target computer, place them in a convenient folder such as **Downloads** or the setup user's `%temp%` folder.

| Release | Component | Download link | Issues addressed |
| --- | --- | --- | --- |
| **[SQL Server 2019 CU16](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2019/cumulativeupdate16) and later versions** |  |  |  |
|  | Microsoft R Open | [SRO_3.5.2.777_1033.cab](https://go.microsoft.com/fwlink/?linkid=2134897) |  |
|  | R Server | [SRS_9.4.7.2008_1033.cab](https://go.microsoft.com/fwlink/?linkid=2191223) |  |
|  | Microsoft Python Open | [SPO_4.5.12.479_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2118341) |  |
|  | Python Server | [SPS_9.4.7.2008_1033.cab](https://go.microsoft.com/fwlink/?linkid=2191314) |  |
| **[SQL Server 2019 CU8](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2019/cumulativeupdate8)-[CU15](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2019/cumulativeupdate15)** |  |  |  |
|  | Microsoft R Open | [SRO_3.5.2.777_1033.cab](https://go.microsoft.com/fwlink/?linkid=2134897) |  |
|  | R Server | [SRS_9.4.7.958_1033.cab](https://go.microsoft.com/fwlink/?linkid=2136942) |  |
|  | Microsoft Python Open | [SPO_4.5.12.479_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2118341) |  |
|  | Python Server | [SPS_9.4.7.958_1033.cab](https://go.microsoft.com/fwlink/?linkid=2136731) |  |
| **[SQL Server 2019 CU5](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2019/cumulativeupdate5)** |  |  |  |
|  | Microsoft R Open | [SRO_3.5.2.293_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2118178) |  |
|  | R Server | [SRS_9.4.7.804_1033.cab](https://go.microsoft.com/fwlink/?linkid=2122004) |  |
|  | Microsoft Python Open | [SPO_4.5.12.479_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2118341) |  |
|  | Python Server | [SPS_9.4.7.804_1033.cab](https://go.microsoft.com/fwlink/?linkid=2121809) |  |
| **[SQL Server 2019 CU3](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2019/cumulativeupdate3)** |  |  |  |
|  | Microsoft R Open | [SRO_3.5.2.293_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2118178) |  |
|  | R Server | [SRS_9.4.7.717_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2118177) |  |
|  | Microsoft Python Open | [SPO_4.5.12.479_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2118341) |  |
|  | Python Server | [SPS_9.4.7.717_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2118342) |  |
| **[SQL Server 2019 CU2](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2019/cumulativeupdate2)** |  |  |  |
|  | Microsoft R Open | [SRO_3.5.2.125_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2085686) |  |
|  | R Server | [SRS_9.4.7.35_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2113250) |  |
|  | Microsoft Python Open | [SPO_4.5.12.692_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2113303) |  |
|  | Python Server | [SPS_9.4.7.35_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2113067) |  |
| **[SQL Server 2019 CU1](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2019/cumulativeupdate1)** |  |  |  |
|  | Microsoft R Open | [SRO_3.5.2.125_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2085686) |  |
|  | R Server | [SRS_9.4.7.25_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2085792) |  |
|  | Microsoft Python Open | [SPO_4.5.12.120_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2085793) |  |
|  | Python Server | [SPS_9.4.7.25_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2085685) |  |
| **Initial Release** |  |  |  |
|  | Microsoft R Open | [SRO_3.5.2.125_1033.cab](https://go.microsoft.com/fwlink/?linkid=2085686) |  |
|  | R Server | [SRS_9.4.7.25_1033.cab](https://go.microsoft.com/fwlink/?linkid=2085792) |  |
|  | Microsoft Python Open | [SPO_4.5.12.120_1033.cab](https://go.microsoft.com/fwlink/?linkid=2085793) |  |
|  | Python Server | [SPS_9.4.7.25_1033.cab](https://go.microsoft.com/fwlink/?linkid=2085685) |  |

GDR releases of SQL Server will require the same component .cab file versions as the next earlier non-GDR release, such as a CU.

| Release | Component | Download link |
| --- | --- | --- |
| **SQL Server 2019 GDR** |  |  |
|  | Microsoft R Open | [SRO_3.5.2.125_1033.cab](https://go.microsoft.com/fwlink/?linkid=2085686) |
|  | R Server | [SRS_9.4.7.25_1033.cab](https://go.microsoft.com/fwlink/?linkid=2085792) |
|  | Microsoft Python Open | [SPO_4.5.12.120_1033.cab](https://go.microsoft.com/fwlink/?linkid=2085793) |
|  | Python Server | [SPS_9.4.7.25_1033.cab](https://go.microsoft.com/fwlink/?linkid=2085685) |



**Applies to: \=sql-server-2017**

## SQL Server 2017 CABs

CAB files are listed in reverse chronological order. When you download the CAB files and transfer them to the target computer, place them in a convenient folder such as **Downloads** or the setup user's %temp% folder.

| Release | Component | Download link | Issues addressed |
| --- | --- | --- | --- |
| **[SQL Server 2017 CU29](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate29)-[CU31](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate31)** |  |  |  |
|  | Microsoft R Open | [SRO_3.5.2.777_1033.cab](https://go.microsoft.com/fwlink/?linkid=2134897) |  |
|  | R Server | [SRS_9.4.7.1162_1033.cab](https://go.microsoft.com/fwlink/?linkid=2174362) |  |
|  | Microsoft Python Open | [SPO_4.5.12.479_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2118341) |  |
|  | Python Server | [SPS_9.4.7.1226_1033.cab](https://go.microsoft.com/fwlink/?linkid=2189383) | Fixes `sp_execute_external_script` execution failures for Python by removing breaking numpy package version mismatch. |
| **[SQL Server 2017 CU27](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate27)-[CU28](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate28)** |  |  |  |
|  | Microsoft R Open | [SRO_3.5.2.777_1033.cab](https://go.microsoft.com/fwlink/?linkid=2134897) |  |
|  | R Server | [SRS_9.4.7.1162_1033.cab](https://go.microsoft.com/fwlink/?linkid=2174362) |  |
|  | Microsoft Python Open | [SPO_4.5.12.479_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2118341) |  |
|  | Python Server | [SPS_9.4.7.1162_1033.cab](https://go.microsoft.com/fwlink/?linkid=2174361) |  |
| **[SQL Server 2017 CU22](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate22)-[CU26](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate26)** |  |  |  |
|  | Microsoft R Open | [SRO_3.5.2.777_1033.cab](https://go.microsoft.com/fwlink/?linkid=2134897) |  |
|  | R Server | [SRS_9.4.7.958_1033.cab](https://go.microsoft.com/fwlink/?linkid=2136942) |  |
|  | Microsoft Python Open | [SPO_4.5.12.479_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2118341) |  |
|  | Python Server | [SPS_9.4.7.958_1033.cab](https://go.microsoft.com/fwlink/?linkid=2136731) |  |
| **[SQL Server 2017 CU19](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate19)-[CU20](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate20)** |  |  |  |
|  | Microsoft R Open | [SRO_3.3.3.1900_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2106367&clcid=1033) | Fixes the bug where `sp_execute_external_script` executing an R script shows warning message |
|  | R Server | [SRS_9.2.0.1900_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2106460&clcid=1033) | No change from previous versions. |
|  | Microsoft Python Open | [SPO_9.2.0.1400_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2073897&clcid=1033) | No change from previous versions. |
|  | Python Server | [SPS_9.2.0.1900_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2106459&clcid=1033) | Fixes the bug where `sp_execute_external_script` executing a python script sometimes loses data when returning varbinary or binary data type back to SQL Server in the form of an OutputDataSet. |
| **[SQL Server 2017 CU14](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate14)-[CU15](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate15)-[CU16](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate16)-[CU17](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate17)-[CU18](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate18)** |  |  |  |
|  | Microsoft R Open | [SRO_3.3.3.1400_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2073898&clcid=1033) | Binaries within the package are now signed. |
|  | R Server | [SRS_9.2.0.1400_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2069739&clcid=1033) | Binaries within the package are now signed. |
|  | Microsoft Python Open | [SPO_9.2.0.1400_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2073897&clcid=1033) | Binaries within the package are now signed. |
|  | Python Server | [SPS_9.2.0.1400_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2071421&clcid=1033) | Binaries within the package are now signed. |
| **[SQL Server 2017 CU13](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate13)** |  |  |  |
|  | Microsoft R Open | [SRO_3.3.3.1300_1033.cab](https://go.microsoft.com/fwlink/?LinkId=863894) | No change from previous versions. |
|  | R Server | [SRS_9.2.0.1300_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2038263&clcid=1033) | Contains a fix for upgrading an [operationalized standalone R Server](https://learn.microsoft.com/machine-learning-server/what-is-operationalization), as installed through SQL Server Setup. Use the CU13 CABs and follow [these instructions](sql-machine-learning-standalone-windows-install.md#apply-cu) to apply the update. |
|  | Microsoft Python Open | [SPO_9.2.0.24_1033.cab](https://go.microsoft.com/fwlink/?LinkId=851502) | No change from previous versions. |
|  | Python Server | [SPS_9.2.0.1300_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2038197&clcid=1033) | Contains a fix for upgrading an [operationalized standalone Python Server](https://learn.microsoft.com/machine-learning-server/what-is-operationalization), as installed through SQL Server Setup. Use the CU13 CABs and follow [these instructions](sql-machine-learning-standalone-windows-install.md#apply-cu) to apply the update. |
| **[SQL Server 2017 CU10](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate10)-[CU11](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate11)-[CU12](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate12)** |  |  |  |
|  | Microsoft R Open | [SRO_3.3.3.300_1033.cab](https://go.microsoft.com/fwlink/?LinkId=863894) | No change from previous versions. |
|  | R Server | [SRS_9.2.0.1000_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2006287&clcid=1033) | Minor fixes. |
|  | Microsoft Python Open | [SPO_9.2.0.24_1033.cab](https://go.microsoft.com/fwlink/?LinkId=851502) | No change from previous versions. |
|  | Python Server | [SPS_9.2.0.1000_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2006805&clcid=1033) | Python rx_data_step loses row order when duplicates are removed. <br/>SPEE fails data type detection on clustered columnstore index. <br/>Returns an empty table when columns contain all null values. |
| **[SQL Server 2017 CU8](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate8)-[CU9](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate9)** |  |  |  |
|  | Microsoft R Open | [SRO_3.3.3.300_1033.cab](https://go.microsoft.com/fwlink/?LinkId=863894) | No change from previous versions. |
|  | R Server | [SRS_9.2.0.800_1033.cab](https://go.microsoft.com/fwlink/?LinkId=874708&clcid=1033) |
|  | Microsoft Python Open | [SPO_9.2.0.24_1033.cab](https://go.microsoft.com/fwlink/?LinkId=851502) | No change from previous versions. |
|  | Python Server | [SPS_9.2.0.800_1033.cab](https://go.microsoft.com/fwlink/?LinkId=874707&clcid=1033) |
| **[SQL Server 2017 CU6](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate6)-[CU7](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate7)** |  |  |  |
|  | Microsoft R Open | [SRO_3.3.3.300_1033.cab](https://go.microsoft.com/fwlink/?LinkId=863894) | No change from previous versions. |
|  | R Server | [SRS_9.2.0.600_1033.cab](https://go.microsoft.com/fwlink/?LinkId=871074&clcid=1033) |
|  | Microsoft Python Open | [SPO_9.2.0.24_1033.cab](https://go.microsoft.com/fwlink/?LinkId=851502) | No change from previous versions. |
|  | Python Server | [SPS_9.2.0.600_1033.cab](https://go.microsoft.com/fwlink/?LinkId=871073&clcid=1033) | DateTime data types in SPEES query.<br/>improved error messages in microsoftml when pre-trained models are missing.<br/> Fixes to revoscalepy transform functions and variables. |
| **[SQL Server 2017 CU5](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate5)** |  |  |  |
|  | Microsoft R Open | [SRO_3.3.3.300_1033.cab](https://go.microsoft.com/fwlink/?LinkId=863894) | No change from previous versions. |
|  | R Server | [SRS_9.2.0.500_1033.cab](https://go.microsoft.com/fwlink/?LinkId=869052&clcid=1033) | Long path-related errors in rxInstallPackages.<br/>Connections in a loopback for RxExec. |
|  | Microsoft Python Open | No change from previous versions. |
|  | Python Server | [SPS_9.2.0.500_1033.cab](https://go.microsoft.com/fwlink/?LinkId=869053&clcid=1033) | <br/>Connections in a loopback for rx_exec. |
| **[SQL Server 2017 CU4](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate4)** |  |  |  |
|  | Microsoft R Open | [SRO_3.3.3.300_1033.cab](https://go.microsoft.com/fwlink/?LinkId=863894) | No change from previous versions. |
|  | R Server | [SRS_9.2.0.400_1033.cab](https://go.microsoft.com/fwlink/?LinkId=866212&clcid=1033) |
|  | Microsoft Python Open | [SPO_9.2.0.24_1033.cab](https://go.microsoft.com/fwlink/?LinkId=851502) | No change from previous versions. |
|  | Python Server | [SPS_9.2.0.400_1033.cab](https://go.microsoft.com/fwlink/?LinkId=866213&clcid=1033) |
| **[SQL Server 2017 CU3](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate3)** |  |  |  |
|  | Microsoft R Open | [SRO_3.3.3.300_1033.cab](https://go.microsoft.com/fwlink/?LinkId=863894) |
|  | R Server | [SRS_9.2.0.300_1033.cab](https://go.microsoft.com/fwlink/?LinkId=863893) |
|  | Microsoft Python Open | [SPO_9.2.0.24_1033.cab](https://go.microsoft.com/fwlink/?LinkId=851502) | No change from previous versions. |
|  | Python Server | [SPS_9.2.0.300_1033.cab](https://go.microsoft.com/fwlink/?LinkId=863892) | Python model serialization in revoscalepy, using the [rx_serialize_model function](https://learn.microsoft.com/machine-learning-server/python-reference/revoscalepy/rx-serialize-model).<br/>[Native scoring](../predictions/native-scoring-predict-transact-sql.md) support, plus enhancements to [real-time scoring](../predictions/real-time-scoring.md). |
| **[SQL Server 2017 CU1](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate1)-[CU2](https://learn.microsoft.com/troubleshoot/sql/releases/sqlserver-2017/cumulativeupdate2)** |  |  |  |
|  | Microsoft R Open | [SRO_3.3.3.24_1033.cab](https://go.microsoft.com/fwlink/?LinkId=851496) | No change from previous versions. |
|  | R Server | [SRS_9.2.0.100_1033.cab](https://go.microsoft.com/fwlink/?LinkId=851501) |
|  | Microsoft Python Open | [SPO_9.2.0.24_1033.cab](https://go.microsoft.com/fwlink/?LinkId=851502) | No change from previous versions. |
|  | Python Server | [SPS_9.2.0.100_1033.cab](https://go.microsoft.com/fwlink/?LinkId=851500) | Adds rx_create_col_info for returning schema information. <br/>Enhancements to [rx_exec](https://learn.microsoft.com/machine-learning-server/python-reference/revoscalepy/rx-exec) to support parallel scenarios using the `RxLocalParallel` compute context. |
| **Initial release** |  |  |
|  | Microsoft R Open | [SRO_3.3.3.24_1033.cab](https://go.microsoft.com/fwlink/?LinkId=851496) |
|  | R Server | [SRS_9.2.0.24_1033.cab](https://go.microsoft.com/fwlink/?LinkId=851507) |
|  | Microsoft Python Open | [SPO_9.2.0.24_1033.cab](https://go.microsoft.com/fwlink/?LinkId=851502) |
|  | Python Server | [SPS_9.2.0.24_1033.cab](https://go.microsoft.com/fwlink/?LinkId=851508) |


GDR releases of SQL Server will require the same component .cab file versions as the next earlier non-GDR release, such as a CU. 

| Release | Component | Download link |
| --- | --- | --- |
| **SQL Server 2017 GDR** |  |  |
|  | Microsoft R Open | [SRO_3.3.3.1400_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2073898&clcid=1033) |
|  | R Server | [SRS_9.2.0.1400_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2069739&clcid=1033) |
|  | Microsoft Python Open | [SPO_9.2.0.1400_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2073897&clcid=1033) |
|  | Python Server | [SPS_9.2.0.1400_1033.cab](https://go.microsoft.com/fwlink/?LinkId=2071421&clcid=1033) |




## Related content

- [Apply cumulative updates on computers without internet access](sql-ml-component-install-without-internet-access.md#apply-cu)
- [Apply cumulative updates on computers having internet connectivity](sql-ml-component-install-without-internet-access.md#apply-cu)
- [Apply cumulative updates to a standalone server](sql-machine-learning-standalone-windows-install.md#apply-cu)
