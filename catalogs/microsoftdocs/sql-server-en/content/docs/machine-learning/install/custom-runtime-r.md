---
title: Install R custom runtime
description: Learn how to install an R custom runtime for SQL Server using Language Extensions. The Python custom runtime can run machine learning scripts.
author: VanMSFT
ms.author: vanto
ms.date: 11/09/2022
ms.service: sql
ms.subservice: machine-learning-services
ms.topic: how-to
ms.custom: intro-installation, linux-related-content
zone_pivot_groups: sqlml-platforms
monikerRange: "=sql-server-ver15||=sql-server-linux-ver15"
---
# Install an R custom runtime for SQL Server


**Applies to:**
 






Learn how to install an R custom runtime for running external R scripts with SQL Server on:

+ Windows
+ Ubuntu Linux
+ Red Hat Enterprise Linux (RHEL)
+ SUSE Linux Enterprise Server (SLES) version 12

The custom runtime can run machine learning scripts and uses the [SQL Server Language Extensions](../../language-extensions/language-extensions-overview.md).

Use your own version of the R runtime with SQL Server, instead of the default runtime version installed with [SQL Server Machine Learning Services](../sql-server-machine-learning-services.md).

Beginning with  SQL Server 2022 (16.x) 
, runtimes for R, Python, and Java, are no longer installed with SQL Setup. Instead, install your desired R custom runtime(s) and packages. For more information, see [Install SQL Server 2022 Machine Learning Services (Python and R) on Windows](sql-machine-learning-services-windows-install-sql-2022.md) or [Install SQL Server Machine Learning Services (Python and R) on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup-machine-learning.md).

**Applies to: platform-windows**


## Prerequisites

Before installing an R custom runtime, install the following:

+ If you use an existing SQL Server instance, install [Cumulative Update (CU) 3 or later](https://learn.microsoft.com/troubleshoot/sql/releases/download-and-install-latest-updates?bc=%2fsql%2fbreadcrumb%2ftoc.json\&toc=%2fsql%2ftoc.json) for SQL Server 2019.

## Install Language Extensions

> **Note:**
> If you have [Machine Learning Services](../sql-server-machine-learning-services.md) installed on SQL Server 2019, Language Extensions is already installed and you can skip this step.

Follow the steps below to install [SQL Server Language Extensions](../../language-extensions/language-extensions-overview.md), which is used for the R custom runtime.

1. Start the setup wizard for SQL Server 2019.
  
1. On the **Installation** tab, select **New SQL Server stand-alone installation or add features to an existing installation**.

1. On the **Feature Selection** page, select these options:
  
    + **Database Engine Services**
  
        To use Language Extensions with SQL Server, you must install an instance of the database engine. You can use either a new or an existing instance.
  
    + **Machine Learning Services and Language Extensions**

        Select **Machine Learning Services and Language Extensions**. Do not select R, as you will be installing the custom R runtime later.

        SQL Server 2019 Language Extensions setup.

1. On the **Ready to Install** page, verify that these selections are included, and select **Install**.
  
    + Database Engine Services
    + Machine Learning Services and Language Extensions

1. After the setup is complete, restart the machine if you're asked to do so.

> **Important:**
> If you install a new instance of SQL Server 2019 with Language Extensions, then install the [Cumulative Update (CU) 3 or later](https://learn.microsoft.com/troubleshoot/sql/releases/download-and-install-latest-updates?bc=%2fsql%2fbreadcrumb%2ftoc.json\&toc=%2fsql%2ftoc.json) before you continue to the next step.

## Install R

Download and install the version of R you will use as the custom runtime. R version 3.3 or later are supported.

1. Download [R version 3.3 or later](https://cran.r-project.org/bin/windows/base/).

1. Run the R setup.

1. Note the path where R is installed. For example, in this article it is `C:\Program Files\R\R-4.0.3`.

    R setup

## Update system environment variable

Follow these steps to modify the **PATH** system environment variables.

1. In the Windows search box, search for **Edit the system environment variables** and open it.

1. Under **Advanced**, select **Environment Variables**.

1. Modify the **PATH** system environment variable.

    Select **PATH** > **Edit**.

    Select **New** and add the path to the `\bin\x64` folder in your R installation path. For example, `C:\Program Files\R\R-4.0.3\bin\x64`.

## Install Rcpp package

Follow these steps to install the **Rcpp** package.

1. Start an *elevated* command prompt (run as Administrator).

1. Start R from the command prompt. Run `\bin\R.exe` in the folder in your R installation path. For example, `C:\Program Files\R\R-4.0.3\bin\R.exe`.

    ```CMD
    "C:\Program Files\R\R-4.0.3\bin\R.exe"
    ```

1. Run the following script to install the Rcpp package in the `\library` folder in your R installation path. For example, `C:\Program Files\R\R-4.0.3\library`.

    ```R
    install.packages("Rcpp", lib="C:\\Program Files\\R\\R-4.0.3\\library");
    ```

## Grant access to R folder

> **Note:**
> If you have installed R in the default location of `C:\Program Files\R\R-version` (for example, `C:\Program Files\R\R-4.0.3`), you can skip this step.

Run the following **icacls** commands from a new *elevated* command prompt to grant **READ & EXECUTE** access to the **SQL Server Launchpad Service user name** and SID **S-1-15-2-1** (**ALL APPLICATION PACKAGES**). The launchpad service user name is of the form `NT Service\MSSQLLAUNCHPAD$INSTANCENAME` where `INSTANCENAME` is the instance name of your SQL Server.

The commands will recursively grant access to all files and folders under the given directory path.

1. Give permissions to **SQL Server Launchpad Service user name** to your R installation path. For example, `C:\Program Files\R\R-4.0.3`.

    ```cmd
    icacls "C:\Program Files\R\R-4.0.3" /grant "NT Service\MSSQLLAUNCHPAD":(OI)(CI)RX /T
    ```

    For named instance, the command will be `icacls "C:\Program Files\R\R-4.0.3" /grant "NT Service\MSSQLLAUNCHPAD$SQL01":(OI)(CI)RX /T` for an instance called **SQL01**.

2. Give permissions to **SID S-1-15-2-1** to your R installation path. For example, `C:\Program Files\R\R-4.0.3`.

    ```cmd
    icacls "C:\Program Files\R\R-4.0.3" /grant *S-1-15-2-1:(OI)(CI)RX /T
    ```

    The preceding command grants permissions to the computer **SID S-1-15-2-1**, which is equivalent to **ALL APPLICATION PACKAGES** on an English version of Windows. Alternatively, you can use `icacls "C:\Program Files\R\R-4.0.3" /grant "ALL APPLICATION PACKAGES":(OI)(CI)RX /T` on an English version of Windows.

## Restart SQL Server Launchpad

Follow these steps to restart the SQL Server Launchpad service.

1. Open [SQL Server Configuration Manager](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/sql-server-configuration-manager.md).

1. Under **SQL Server Services**, right-click on **SQL Server Launchpad (MSSQLSERVER)** and select **Restart**. If you use a named instance, the instance name will be shown instead of **(MSSQLSERVER)**.

## Register language extension

Follow these steps to download and register the R language extension, which is used for the R custom runtime.

1. Download the **R-lang-extension-windows-release.zip** file from the [SQL Server Language Extensions GitHub repo](https://github.com/microsoft/sql-server-language-extensions/releases).

    Alternatively, you can use the debug version (**R-lang-extension-windows-debug.zip**) in a development or test environment. The debug version provides verbose logging information to investigate any errors, and is not recommended for production environments.

1. Use the [MSSQL extension for Visual Studio Code](../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md) to connect to your SQL Server instance and run the following T-SQL command to register the R language extension with [CREATE EXTERNAL LANGUAGE](../../t-sql/statements/create-external-language-transact-sql.md).

    Modify the path in this statement to reflect the location of the downloaded language extension zip file (**R-lang-extension-windows-release.zip**) and the location your R installation (`C:\\Program Files\\R\\R-4.0.3`).

    ```sql
    CREATE EXTERNAL LANGUAGE [myR]
    FROM (CONTENT = N'C:\path\to\R-lang-extension-windows-release.zip', 
        FILE_NAME = 'libRExtension.dll',
        ENVIRONMENT_VARIABLES = N'{"R_HOME": "C:\\Program Files\\R\\R-4.0.3"}');
    GO
    ```

    Execute the statement for each database you want to use the R language extension in.

    > **Note:**
    > **R** is a reserved word and can't be used as the name for a new external language name. Use a different name instead. For example, the statement above uses **myR**.



**Applies to: platform-linux-ubuntu**


## Prerequisites

Before installing a custom R runtime, install the following prerequisites:

- Install  SQL Server 2019 (15.x) 
 for Linux. You can install SQL Server on Red Hat Enterprise Linux (RHEL), SUSE Linux Enterprise Server (SLES), and Ubuntu. For more information, see [the Installation guidance for SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md).

- Upgrade to Cumulative Update (CU) 3 or later for  SQL Server 2019 (15.x) 
. Follow these steps:

  1. Configure the repositories for Cumulative Updates. For more information, see [Configure repositories for installing and upgrading SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-change-repo.md).

  1. Update the **mssql-server** package to the latest Cumulative Update. For more information, see [the Update or Upgrade SQL Server section in the installation guidance for SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#upgrade).


## Install Language Extensions

> **Note:**
> If you have [Machine Learning Services](../sql-server-machine-learning-services.md) installed on SQL Server 2019, the **mssql-server-extensibility** package for Language Extensions is already installed and you can skip this step.

Run the commands below to install [SQL Server Language Extensions](../../language-extensions/language-extensions-overview.md) on Ubuntu Linux, which is used for the R custom runtime.

1. If possible, run this command to refresh the packages on the system prior to the installation.

    ```bash
    # Install as root or sudo
    sudo apt-get update
    ```

1. Install **mssql-server-extensibility** with this command.

    ```bash
    # Install as root or sudo
    sudo apt-get install mssql-server-extensibility
    ```

## Install R

1. If you have [Machine Learning Services](../sql-server-machine-learning-services.md) installed, R is already installed in `/opt/microsoft/ropen/3.5.2/lib64/R`. If you want to keep using this path as your R_HOME, you can skip this step.

    If you want to use a different runtime of R, you first need to remove `microsoft-r-open-mro` before continuing to install a new version.

    ```bash
    sudo apt remove microsoft-r-open-mro-3.5.2
    ```

1. Install [R (3.3 or later)](https://www.r-project.org/) for Ubuntu. By default, R is installed in **/usr/lib/R**. This path is your **R_HOME**. If you install R in a different location, take note of that path as your **R_HOME**.

    Below are example instructions for Ubuntu. Change the repository URL below for your version of R.

    ```bash
    export DEBIAN_FRONTEND=noninteractive
    sudo apt-get update
    sudo apt-get --no-install-recommends -y install curl zip unzip apt-transport-https libstdc++6
    
    # Add R CRAN repository. This repository works for R 4.0.x.
    #
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
    sudo add-apt-repository 'deb https://cloud.r-project.org/bin/linux/ubuntu xenial-cran40/'
    sudo apt-get update
    
    # Install R runtime.
    #
    sudo apt-get -y install r-base-core
    ```


## Custom installation of R

**Applies to: platform-linux-ubuntu**

> **Note:**
> If you have installed R in the default location of **/usr/lib/R**, you can skip this section and move on to the [Install Rcpp package](#install-rcpp-package-linux) section.


### Update the environment variables

First, edit the **mssql-launchpadd** service to add the **R_HOME** environment variable to the file `/etc/systemd/system/mssql-launchpadd.service.d/override.conf`

1. Open the file with systemctl

    ```bash
    sudo systemctl edit mssql-launchpadd
    ```

1. Insert the following text in the `/etc/systemd/system/mssql-launchpadd.service.d/override.conf` file that opens. Set value of **R_HOME** to the custom R installation path.

    ```text
    [Service]
    Environment="R_HOME=<path to R>"
    ```

1. Save and close.

Next, make sure `libR.so` can be loaded.

1. Create a custom-r.conf file in **/etc/ld.so.conf.d**.

    ```bash
    sudo vi /etc/ld.so.conf.d/custom-r.conf
    ```

1. In the file that opens, add path to **libR.so** from the custom R installation.

    ```
    <path to the R lib>
    ```

1. Save the new file and close the editor.

1. Run `ldconfig` and verify **libR.so** can be loaded by running the following command and checking that all dependent libraries can be found.

    ```bash
    sudo ldconfig
    ldd <path to the R lib>/libR.so
    ```

### Grant access to the custom R installation folder

Set the `datadirectories` option in the extensibility section of `/var/opt/mssql/mssql.conf` file to the custom R installation.

```bash
sudo /opt/mssql/bin/mssql-conf set extensibility.datadirectories <path to R>
```

### Restart mssql-launchpadd service

Run the following command to restart **mssql-launchpadd**.

```bash
sudo systemctl restart mssql-launchpadd
```

<a name="install-rcpp-package-linux"></a>

## Install Rcpp package

Follow these steps to install the **Rcpp** package.

1. Start R from a shell:

    ```bash
    sudo ${R_HOME}/bin/R
    ```

1. Run the following script to install the Rcpp package in the ${R_HOME}\library folder.

  ```R
  install.packages("Rcpp", lib = "${R_HOME}/library");
  ```

## Register language extension

Follow these steps to download and register the R language extension, which is used for the R custom runtime.

1. Download the **R-lang-extension-linux-release.zip** file from the [SQL Server Language Extensions GitHub repo](https://github.com/microsoft/sql-server-language-extensions/releases).

    Alternatively, you can use the debug version (**R-lang-extension-linux-debug.zip**) in a development or test environment. The debug version provides verbose logging information to investigate any errors, and is not recommended for production environments.

1. Use the [MSSQL extension for Visual Studio Code](../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md) to connect to your SQL Server instance and run the following T-SQL command to register the R language extension with [CREATE EXTERNAL LANGUAGE](../../t-sql/statements/create-external-language-transact-sql.md). 

    Modify the path in this statement to reflect the location of the downloaded language extension zip file (**R-lang-extension-linux-release.zip**).

    ```sql
    CREATE EXTERNAL LANGUAGE [myR]
    FROM (CONTENT = N'/path/to/R-lang-extension-linux-release.zip', FILE_NAME = 'libRExtension.so.1.1');
    GO
    ```

    Execute the statement for each database you want to use the R language extension in.

    > **Note:**
    > **R** is a reserved word and can't be used as the name for a new external language name. Use a different name instead. For example, the statement above uses **myR**.



**Applies to: platform-linux-rhel**


## Prerequisites

Before installing a custom R runtime, install the following prerequisites:

- Install  SQL Server 2019 (15.x) 
 for Linux. You can install SQL Server on Red Hat Enterprise Linux (RHEL), SUSE Linux Enterprise Server (SLES), and Ubuntu. For more information, see [the Installation guidance for SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md).

- Upgrade to Cumulative Update (CU) 3 or later for  SQL Server 2019 (15.x) 
. Follow these steps:

  1. Configure the repositories for Cumulative Updates. For more information, see [Configure repositories for installing and upgrading SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-change-repo.md).

  1. Update the **mssql-server** package to the latest Cumulative Update. For more information, see [the Update or Upgrade SQL Server section in the installation guidance for SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#upgrade).


+ RExtension requires GLIBCXX_3.4.20. Make sure the version of **libstdc++.so.6** on your Red Hat Enterprise Linux (RHEL) installation provides this.

## Install Language Extensions

> **Note:**
> If you have [Machine Learning Services](../sql-server-machine-learning-services.md) installed on SQL Server 2019, the **mssql-server-extensibility** package for Language Extensions is already installed and you can skip this step.

Run the command below to install [SQL Server Language Extensions](../../language-extensions/language-extensions-overview.md) on Red Hat Enterprise Linux (RHEL), which is used for the R custom runtime.

```bash
# Install as root or sudo
sudo yum install mssql-server-extensibility
```

## Install R

1. If you have [Machine Learning Services](../sql-server-machine-learning-services.md) installed, R is already installed in `/opt/microsoft/ropen/3.5.2/lib64/R`. If you want to keep using this path as your R_HOME, you can skip this step.

    If you want to use a different runtime of R, you first need to remove `microsoft-r-open-mro` before continuing to install a new version.

    ```bash
    sudo yum erase microsoft-r-open-mro-3.5.2
    ```

1. Install [R (3.3 or later)](https://www.r-project.org/) for Red Hat Enterprise Linux (RHEL). By default, R is installed in **/usr/lib64/R**. This path is your **R_HOME**. If you install R in a different location, take note of that path as your **R_HOME**.

    ```bash
    sudo yum install -y R
    ```


## Custom installation of R

**Applies to: platform-linux-ubuntu**

> **Note:**
> If you have installed R in the default location of **/usr/lib/R**, you can skip this section and move on to the [Install Rcpp package](#install-rcpp-package-linux) section.


### Update the environment variables

First, edit the **mssql-launchpadd** service to add the **R_HOME** environment variable to the file `/etc/systemd/system/mssql-launchpadd.service.d/override.conf`

1. Open the file with systemctl

    ```bash
    sudo systemctl edit mssql-launchpadd
    ```

1. Insert the following text in the `/etc/systemd/system/mssql-launchpadd.service.d/override.conf` file that opens. Set value of **R_HOME** to the custom R installation path.

    ```text
    [Service]
    Environment="R_HOME=<path to R>"
    ```

1. Save and close.

Next, make sure `libR.so` can be loaded.

1. Create a custom-r.conf file in **/etc/ld.so.conf.d**.

    ```bash
    sudo vi /etc/ld.so.conf.d/custom-r.conf
    ```

1. In the file that opens, add path to **libR.so** from the custom R installation.

    ```
    <path to the R lib>
    ```

1. Save the new file and close the editor.

1. Run `ldconfig` and verify **libR.so** can be loaded by running the following command and checking that all dependent libraries can be found.

    ```bash
    sudo ldconfig
    ldd <path to the R lib>/libR.so
    ```

### Grant access to the custom R installation folder

Set the `datadirectories` option in the extensibility section of `/var/opt/mssql/mssql.conf` file to the custom R installation.

```bash
sudo /opt/mssql/bin/mssql-conf set extensibility.datadirectories <path to R>
```

### Restart mssql-launchpadd service

Run the following command to restart **mssql-launchpadd**.

```bash
sudo systemctl restart mssql-launchpadd
```

<a name="install-rcpp-package-linux"></a>

## Install Rcpp package

Follow these steps to install the **Rcpp** package.

1. Start R from a shell:

    ```bash
    sudo ${R_HOME}/bin/R
    ```

1. Run the following script to install the Rcpp package in the ${R_HOME}\library folder.

  ```R
  install.packages("Rcpp", lib = "${R_HOME}/library");
  ```

## Register language extension

Follow these steps to download and register the R language extension, which is used for the R custom runtime.

1. Download the **R-lang-extension-linux-release.zip** file from the [SQL Server Language Extensions GitHub repo](https://github.com/microsoft/sql-server-language-extensions/releases).

    Alternatively, you can use the debug version (**R-lang-extension-linux-debug.zip**) in a development or test environment. The debug version provides verbose logging information to investigate any errors, and is not recommended for production environments.

1. Use the [MSSQL extension for Visual Studio Code](../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md) to connect to your SQL Server instance and run the following T-SQL command to register the R language extension with [CREATE EXTERNAL LANGUAGE](../../t-sql/statements/create-external-language-transact-sql.md). 

    Modify the path in this statement to reflect the location of the downloaded language extension zip file (**R-lang-extension-linux-release.zip**).

    ```sql
    CREATE EXTERNAL LANGUAGE [myR]
    FROM (CONTENT = N'/path/to/R-lang-extension-linux-release.zip', FILE_NAME = 'libRExtension.so.1.1');
    GO
    ```

    Execute the statement for each database you want to use the R language extension in.

    > **Note:**
    > **R** is a reserved word and can't be used as the name for a new external language name. Use a different name instead. For example, the statement above uses **myR**.



**Applies to: platform-linux-sles**


## Prerequisites

Before installing a custom R runtime, install the following prerequisites:

- Install  SQL Server 2019 (15.x) 
 for Linux. You can install SQL Server on Red Hat Enterprise Linux (RHEL), SUSE Linux Enterprise Server (SLES), and Ubuntu. For more information, see [the Installation guidance for SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md).

- Upgrade to Cumulative Update (CU) 3 or later for  SQL Server 2019 (15.x) 
. Follow these steps:

  1. Configure the repositories for Cumulative Updates. For more information, see [Configure repositories for installing and upgrading SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-change-repo.md).

  1. Update the **mssql-server** package to the latest Cumulative Update. For more information, see [the Update or Upgrade SQL Server section in the installation guidance for SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#upgrade).


## Install Language Extensions

> **Note:**
> If you have [Machine Learning Services](../sql-server-machine-learning-services.md) installed on SQL Server 2019, the **mssql-server-extensibility** package for Language Extensions is already installed and you can skip this step.

Run the command below to install [SQL Server Language Extensions](../../language-extensions/language-extensions-overview.md) on SUSE Linux Enterprise Server (SLES), which is used for the R custom runtime.

```bash
# Install as root or sudo
sudo zypper install mssql-server-extensibility
```

## Install R

1. If you have [Machine Learning Services](../sql-server-machine-learning-services.md) installed, R is already installed in `/opt/microsoft/ropen/3.5.2/lib64/R`. If you want to keep using this path as your R_HOME, you can skip this step.

    If you want to use a different runtime of R, you first need to remove `microsoft-r-open-mro` before continuing to install a new version.

    ```bash
    sudo zypper remove microsoft-r-open-mro-3.4.4
    ```

1. Install [R (3.3 or later)](https://www.r-project.org/) for SUSE Linux Enterprise Server (SLES). By default, R is installed in **/usr/lib64/R**. This path is your **R_HOME**. If you install R in a different location, take note of that path as your **R_HOME**.

    Follow these steps to install R:

    ```bash
    sudo zypper ar -f http://download.opensuse.org/repositories/devel:/languages:/R:/patched/openSUSE_12.3/ R-patched
    sudo zypper --gpg-auto-import-keys ref
    sudo zypper install R-core-libs R-core R-core-doc R-patched
    ```

    You can ignore the warnings for **R-tcltk-3.6.1**, unless you need this package.

## Install gcc-c++

Install **gcc-c++** on SUSE Linux Enterprise Server (SLES). This is used for **Rcpp**, which is installed later.

```bash
sudo zypper install gcc-c++
```


## Custom installation of R

**Applies to: platform-linux-ubuntu**

> **Note:**
> If you have installed R in the default location of **/usr/lib/R**, you can skip this section and move on to the [Install Rcpp package](#install-rcpp-package-linux) section.


### Update the environment variables

First, edit the **mssql-launchpadd** service to add the **R_HOME** environment variable to the file `/etc/systemd/system/mssql-launchpadd.service.d/override.conf`

1. Open the file with systemctl

    ```bash
    sudo systemctl edit mssql-launchpadd
    ```

1. Insert the following text in the `/etc/systemd/system/mssql-launchpadd.service.d/override.conf` file that opens. Set value of **R_HOME** to the custom R installation path.

    ```text
    [Service]
    Environment="R_HOME=<path to R>"
    ```

1. Save and close.

Next, make sure `libR.so` can be loaded.

1. Create a custom-r.conf file in **/etc/ld.so.conf.d**.

    ```bash
    sudo vi /etc/ld.so.conf.d/custom-r.conf
    ```

1. In the file that opens, add path to **libR.so** from the custom R installation.

    ```
    <path to the R lib>
    ```

1. Save the new file and close the editor.

1. Run `ldconfig` and verify **libR.so** can be loaded by running the following command and checking that all dependent libraries can be found.

    ```bash
    sudo ldconfig
    ldd <path to the R lib>/libR.so
    ```

### Grant access to the custom R installation folder

Set the `datadirectories` option in the extensibility section of `/var/opt/mssql/mssql.conf` file to the custom R installation.

```bash
sudo /opt/mssql/bin/mssql-conf set extensibility.datadirectories <path to R>
```

### Restart mssql-launchpadd service

Run the following command to restart **mssql-launchpadd**.

```bash
sudo systemctl restart mssql-launchpadd
```

<a name="install-rcpp-package-linux"></a>

## Install Rcpp package

Follow these steps to install the **Rcpp** package.

1. Start R from a shell:

    ```bash
    sudo ${R_HOME}/bin/R
    ```

1. Run the following script to install the Rcpp package in the ${R_HOME}\library folder.

  ```R
  install.packages("Rcpp", lib = "${R_HOME}/library");
  ```

## Register language extension

Follow these steps to download and register the R language extension, which is used for the R custom runtime.

1. Download the **R-lang-extension-linux-release.zip** file from the [SQL Server Language Extensions GitHub repo](https://github.com/microsoft/sql-server-language-extensions/releases).

    Alternatively, you can use the debug version (**R-lang-extension-linux-debug.zip**) in a development or test environment. The debug version provides verbose logging information to investigate any errors, and is not recommended for production environments.

1. Use the [MSSQL extension for Visual Studio Code](../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md) to connect to your SQL Server instance and run the following T-SQL command to register the R language extension with [CREATE EXTERNAL LANGUAGE](../../t-sql/statements/create-external-language-transact-sql.md). 

    Modify the path in this statement to reflect the location of the downloaded language extension zip file (**R-lang-extension-linux-release.zip**).

    ```sql
    CREATE EXTERNAL LANGUAGE [myR]
    FROM (CONTENT = N'/path/to/R-lang-extension-linux-release.zip', FILE_NAME = 'libRExtension.so.1.1');
    GO
    ```

    Execute the statement for each database you want to use the R language extension in.

    > **Note:**
    > **R** is a reserved word and can't be used as the name for a new external language name. Use a different name instead. For example, the statement above uses **myR**.



## Enable external script

You can execute an R external script with the stored procedure [sp_execute_external script](../../relational-databases/system-stored-procedures/sp-execute-external-script-transact-sql.md).

To enable external scripts, use the [MSSQL extension for Visual Studio Code](../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md) to execute the following statement.

```sql
sp_configure 'external scripts enabled', 1;
RECONFIGURE WITH OVERRIDE;  
```

## Verify installation

Use the following SQL script to verify the installation and functionality of the R custom runtime. In the below sample script, `myR` is used as the language name because the default language name `R` cannot be provided for a custom runtime.

```sql
EXEC sp_execute_external_script
    @language =N'myR',
    @script=N'
print(R.home());
print(file.path(R.home("bin"), "R"));
print(R.version);
print("Hello RExtension!");'
```

**Applies to: platform-windows**

## Known issues

If you're using the R runtime provided as part of [SQL Server Machine Learning Services](../sql-server-machine-learning-services.md) by setting `R_HOME` to `C:\Program Files\Microsoft SQL Server\MSSQL15.<INSTANCE_NAME>\R_SERVICES` when you register the language extension, you might run into the following error upon executing any external custom R script with [sp_execute_external script](../../relational-databases/system-stored-procedures/sp-execute-external-script-transact-sql.md).

*Error: cons memory exhausted (limit reached?)*

To resolve this issue:
 1. Set the environment variable `R_NSIZE` indicating the number of fixed sized objects (`cons cells`) to a reasonable value, for example, `200000`.
 1. Restart the **Launchpad** service and retry the execution of the script.



**Applies to: platform-linux-rhel**

## Known issues

If **libstdc++.so.6** is not the correct version, you will see this error:

*Exthost: Load extension failed /lib64/libstdc++.so.6: version `GLIBCXX_3.4.20' not found (required by /home/mssql_satellite/externallanguagessandboxpath/libRExtension.so.1.1)*



## Related content

- [Install a Python custom runtime for SQL Server](custom-runtime-python.md)
- [Extensibility architecture in SQL Server Machine Learning Services](../concepts/extensibility-framework.md)
- [What is SQL Server Language Extensions?](../../language-extensions/language-extensions-overview.md)
