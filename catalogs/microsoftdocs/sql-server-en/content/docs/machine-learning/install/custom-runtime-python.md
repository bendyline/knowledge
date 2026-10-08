---
title: Install Python custom runtime
description: Learn how to install a Python custom runtime for SQL Server using Language Extensions. The Python custom runtime can run machine learning scripts.
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
# Install a Python custom runtime for SQL Server

**Applies to:**
 






Learn how to install a Python custom runtime for running external Python scripts with SQL Server on:

+ Windows
+ Ubuntu Linux
+ Red Hat Enterprise Linux (RHEL)
+ SUSE Linux Enterprise Server (SLES)

The custom runtime can run machine learning scripts and uses the [SQL Server Language Extensions](../../language-extensions/language-extensions-overview.md).

Use your own version of the Python runtime with SQL Server, instead of the default runtime version installed with [SQL Server Machine Learning Services](../sql-server-machine-learning-services.md). 

Beginning with  SQL Server 2022 (16.x) 
, runtimes for R, Python, and Java, are no longer installed with SQL Setup. Instead, install your desired Python custom runtime(s) and packages. For more information, see [Install SQL Server 2022 Machine Learning Services (Python and R) on Windows](sql-machine-learning-services-windows-install-sql-2022.md) or [Install SQL Server Machine Learning Services (Python and R) on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup-machine-learning.md).

**Applies to: platform-windows**

## Prerequisites

Before installing a Python custom runtime, install:

+ If you use an existing SQL Server instance, install [Cumulative Update (CU) 3 or later](https://learn.microsoft.com/troubleshoot/sql/releases/download-and-install-latest-updates?bc=%2fsql%2fbreadcrumb%2ftoc.json\&toc=%2fsql%2ftoc.json) for SQL Server 2019.

## Install Language Extensions

> **Note:**
> If you have [Machine Learning Services](../sql-server-machine-learning-services.md) installed on SQL Server 2019, Language Extensions is already installed and you can skip this step.

Follow the steps below to install [SQL Server Language Extensions](../../language-extensions/language-extensions-overview.md), which is used for the Python custom runtime.

1. Start the setup wizard for SQL Server 2019.
  
1. On the **Installation** tab, select **New SQL Server stand-alone installation or add features to an existing installation**.

1. On the **Feature Selection** page, select these options:
  
    + **Database Engine Services**
  
        To use Language Extensions with SQL Server, you must install an instance of the database engine. You can use either a new or an existing instance.
  
    + **Machine Learning Services and Language Extensions**

        Select **Machine Learning Services and Language Extensions**. Do not select Python, as you will be installing the custom Python runtime later.

        SQL Server 2019 Language Extensions setup.

1. On the **Ready to Install** page, verify that these selections are included, and select **Install**.
  
    + Database Engine Services
    + Machine Learning Services and Language Extensions

1. After the setup is complete, restart the machine if you're asked to do so.

> **Important:**
> If you install a new instance of SQL Server 2019 with Language Extensions, then install the [Cumulative Update (CU) 3 or later](https://learn.microsoft.com/troubleshoot/sql/releases/download-and-install-latest-updates?bc=%2fsql%2fbreadcrumb%2ftoc.json\&toc=%2fsql%2ftoc.json) before you continue to the next step.

## Install Python

The Python language extension used for the custom Python runtime currently supports Python 3.7 only. If you would like to use a different version of Python, follow the instruction in the [Python Language Extension GitHub repo](https://github.com/microsoft/sql-server-language-extensions/tree/master/language-extensions/python) to modify and rebuild the extension.

1. Download [Python 3.7](https://www.python.org/downloads/windows/) for Windows and run the Setup on the server.

1. Select **Add Python 3.7 to PATH** and then select **Customize installation**.

    Python 3.7 installation - Add Python 3.7 to PATH

1. Under **Optional Features**, leave the defaults and select **Next**.

1. Select **Install for all users** and take note of the installation location.

    Python 3.7 installation - Install for all users

1. Select **Install**.

## Install pandas

Install the [pandas](https://pandas.pydata.org/) package for Python from an *elevated* command prompt (Run as Administrator):

```bash
python.exe -m pip install pandas
```

## Grant access to Python folder

Run the following **icacls** commands from a new *elevated* command prompt to grant **READ & EXECUTE** access to the Python installation location to **SQL Server Launchpad Service** and SID **S-1-15-2-1** (**ALL_APPLICATION_PACKAGES**).

The examples below use the Python installation location as `C:\Program Files\Python37`. If your location is different, change it in the command.

1. Give permissions to **SQL Server Launchpad Service user name**.

    ```cmd
    icacls "C:\Program Files\Python37" /grant "NT Service\MSSQLLAUNCHPAD":(OI)(CI)RX /T
    ```

    For named instance, the command will be `icacls "C:\Program Files\Python37" /grant "NT Service\MSSQLLAUNCHPAD$SQL01":(OI)(CI)RX /T` for an instance called **SQL01**.

2. Give permissions to **SID S-1-15-2-1**.

    ```cmd
    icacls "C:\Program Files\Python37" /grant *S-1-15-2-1:(OI)(CI)RX /T
    ```

    The preceding command grants permissions to the computer **SID S-1-15-2-1**, which is equivalent to **ALL APPLICATION PACKAGES** on an English version of Windows. Alternatively, you can use `icacls "C:\Program Files\Python37" /grant "ALL APPLICATION PACKAGES":(OI)(CI)RX /T` on an English version of Windows.

## Restart SQL Server Launchpad

Follow these steps to restart the SQL Server Launchpad service.

1. Open [SQL Server Configuration Manager](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/relational-databases/sql-server-configuration-manager.md).

1. Under **SQL Server Services**, right-click on **SQL Server Launchpad (MSSQLSERVER)** and select **Restart**. If you are using a named instance, the instance name will be shown instead of **(MSSQLSERVER)**.

## Register language extension

Follow these steps to download and register the Python language extension, which is used for the Python custom runtime.

1. Download the **python-lang-extension-windows-release.zip** file from the [SQL Server Language Extensions GitHub repo](https://github.com/microsoft/sql-server-language-extensions/releases).

    Alternatively, you can use the debug version (**python-lang-extension-windows-debug.zip**) in a development or test environment. The debug version provides verbose logging information to investigate any errors, and is not recommended for production environments.

1. Use the [MSSQL extension for Visual Studio Code](../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md) to connect to your SQL Server instance and run the following T-SQL command to register the Python language extension with [CREATE EXTERNAL LANGUAGE](../../t-sql/statements/create-external-language-transact-sql.md).

    Modify the path in this statement to reflect the location of the downloaded language extension zip file (**python-lang-extension-windows-release.zip**) and the location your Python installation (`C:\\Program Files\\Python37`).

    ```sql
    CREATE EXTERNAL LANGUAGE [myPython]
    FROM (CONTENT = N'C:\path\to\python-lang-extension-windows-release.zip', 
        FILE_NAME = 'pythonextension.dll', 
        ENVIRONMENT_VARIABLES = N'{"PYTHONHOME": "C:\\Program Files\\Python37"}');
    GO
    ```

    Execute the statement for each database you want to use the Python language extension in.

    > **Note:**
    > **Python** is a reserved word and can't be used as the name for a new external language name. Use a different name instead. For example, the statement above uses **myPython**.



**Applies to: platform-linux-ubuntu**


## Prerequisites

Before installing a custom Python runtime, install the following prerequisites:

- Install  SQL Server 2019 (15.x) 
 for Linux. You can install SQL Server on Red Hat Enterprise Linux (RHEL), SUSE Linux Enterprise Server (SLES), and Ubuntu. For more information, see [the Installation guidance for SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md).

- Upgrade to Cumulative Update (CU) 3 or later for  SQL Server 2019 (15.x) 
. Follow these steps:

  1. Configure the repositories for Cumulative Updates. For more information, see [Configure repositories for installing and upgrading SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-change-repo.md).

  1. Update the **mssql-server** package to the latest Cumulative Update. For more information, see [the Update or Upgrade SQL Server section in the installation guidance for SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#upgrade).


## Install Language Extensions

> **Note:**
> If you have [Machine Learning Services](../sql-server-machine-learning-services.md) installed on SQL Server 2019, the **mssql-server-extensibility** package for Language Extensions is already installed and you can skip this step.

Run the commands below to install [SQL Server Language Extensions](../../language-extensions/language-extensions-overview.md) on Ubuntu Linux, which is used for the Python custom runtime.

1. If possible, run this command to refresh the packages on the system prior to the installation.

    ```bash
    # Install as root or sudo
    sudo apt-get update
    ```

1. Ubuntu might not have the https apt transport option. To install it, run this command.

    ```bash
    # Install as root or sudo
    apt-get install apt-transport-https
    ```

1. Install **mssql-server-extensibility** with this command.

    ```bash
    # Install as root or sudo
    sudo apt-get install mssql-server-extensibility
    ```

## Install Python 3.7 and pandas

The Python language extension used for the custom Python runtime currently supports [Python 3.7](https://www.python.org/) only. If you would like to use a different version of Python, follow the instruction in the [Python Language Extension GitHub repo](https://github.com/microsoft/sql-server-language-extensions/tree/master/language-extensions/python) to modify and rebuild the extension.

1. Run the commands below to install Python 3.7.

    ```bash
    # Install python3.7 and the corresponding library:
    sudo add-apt-repository ppa:deadsnakes/ppa
    sudo apt-get update
    sudo apt-get install python3.7 python3-pip libpython3.7
    ```

1. Run the command below to install the pandas package

    ```bash
    # Install pandas to /usr/lib:
    sudo python3.7 -m pip install pandas -t /usr/lib/python3.7/dist-packages
    ```


## Custom installation of Python

> **Note:**
> If you have installed Python 3.7 in the default location of `/usr/lib/python3.7`, you can skip this section and move on to the [Register language extension](#register-language-extension-linux) section.

If you built your own version of Python 3.7, use the following commands to let SQL Server know your custom installation.

### Add environment variable

First, edit the **mssql-launchpadd** service to add the **PYTHONHOME** environment variable to the file `/etc/systemd/system/mssql-launchpadd.service.d/override.conf`

1. Open the file with systemctl

    ```bash
    sudo systemctl edit mssql-launchpadd
    ```

1. Insert the following text in the `/etc/systemd/system/mssql-launchpadd.service.d/override.conf` file that opens. Set value of **PYTHONHOME** to the custom Python installation path.

    ```
    [Service]
    Environment="PYTHONHOME=<path to the python3.7 lib>"
    ```

1. Save the file and close the editor.

Next, make sure `libpython3.7m.so.1.0` can be loaded.

1. Create a custom-python.conf file in `/etc/ld.so.conf.d`.

    ```bash
    sudo vi /etc/ld.so.conf.d/custom-python.conf
    ```

1. In the file that opens, add the path to **libpython3.7m.so.1.0** from the custom Python installation.

    ```
    <path to the python3.7 lib>
    ```

1. Save the new file and close the editor.

1. Run `ldconfig` and verify `libpython3.7m.so.1.0` can be loaded by running the following commands and checking that all the dependent libraries can be found.

    ```bash
    sudo ldconfig
    ldd <path to the python3.7 lib>/libpython3.7m.so.1.0
    ```

### Grant access to Python folder

Set the `datadirectories` option in the extensibility section of `/var/opt/mssql/mssql.conf` file to the custom python installation.

```bash
sudo /opt/mssql/bin/mssql-conf set extensibility.datadirectories <path to python3.7>
```

### Restart mssql-launchpadd

Run the following command to restart **mssql-launchpadd**.

```bash
sudo systemctl restart mssql-launchpadd
```

<a name="register-language-extension-linux"></a>

## Register language extension

Follow these steps to download and register the Python language extension, which is used for the Python custom runtime.

1. Download the **python-lang-extension-linux-release.zip** file from the [SQL Server Language Extensions GitHub repo](https://github.com/microsoft/sql-server-language-extensions/releases).

    Alternatively, you can use the debug version (**python-lang-extension-linux-debug.zip**) in a development or test environment. The debug version provides verbose logging information to investigate any errors, and is not recommended for production environments.

1. Use the [MSSQL extension for Visual Studio Code](../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md) to connect to your SQL Server instance and run the following T-SQL command to register the Python language extension with [CREATE EXTERNAL LANGUAGE](../../t-sql/statements/create-external-language-transact-sql.md). 

    Modify the path in this statement to reflect the location of the downloaded language extension zip file (**python-lang-extension-linux-release.zip**).

    ```sql
    CREATE EXTERNAL LANGUAGE [myPython]
    FROM (CONTENT = N'/path/to/python-lang-extension-linux-release.zip', FILE_NAME = 'libPythonExtension.so.1.1');
    GO
    ```

    Execute the statement for each database you want to use the Python language extension in.

    > **Note:**
    > **Python** is a reserved word and can't be used as the name for a new external language name. Use a different name instead. For example, the statement above uses **myPython**.



**Applies to: platform-linux-rhel**


## Prerequisites

Before installing a custom Python runtime, install the following prerequisites:

- Install  SQL Server 2019 (15.x) 
 for Linux. You can install SQL Server on Red Hat Enterprise Linux (RHEL), SUSE Linux Enterprise Server (SLES), and Ubuntu. For more information, see [the Installation guidance for SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md).

- Upgrade to Cumulative Update (CU) 3 or later for  SQL Server 2019 (15.x) 
. Follow these steps:

  1. Configure the repositories for Cumulative Updates. For more information, see [Configure repositories for installing and upgrading SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-change-repo.md).

  1. Update the **mssql-server** package to the latest Cumulative Update. For more information, see [the Update or Upgrade SQL Server section in the installation guidance for SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#upgrade).


## Install Language Extensions

> **Note:**
> If you have [Machine Learning Services](../sql-server-machine-learning-services.md) installed on SQL Server 2019, the **mssql-server-extensibility** package for Language Extensions is already installed and you can skip this step.

Run the command below to install [SQL Server Language Extensions](../../language-extensions/language-extensions-overview.md) on Red Hat Enterprise Linux (RHEL), which is used for the Python custom runtime.

```bash
# Install as root or sudo
sudo yum install mssql-server-extensibility
```

## Install Python 3.7 and pandas

The Python language extension used for the custom Python runtime currently supports [Python 3.7](https://www.python.org/) only. If you would like to use a different version of Python, follow the instruction in the [Python Language Extension GitHub repo](https://github.com/microsoft/sql-server-language-extensions/tree/master/language-extensions/python) to modify and rebuild the extension.

1. Run the commands below to install Python 3.7.

    ```bash
    # Install python3.7 and the corresponding library:
    yum install gcc openssl-devel bzip2-devel libffi-devel zlib-devel
    
    cd /usr/src
    wget https://www.python.org/ftp/python/3.7.9/Python-3.7.9.tgz
    tar xzf Python-3.7.9.tgz
    
    cd Python-3.7.9
    ./configure --enable-optimizations --prefix=/usr
    make altinstall
    ```

1. Run the command below to install the pandas package

    ```bash
    # Install pandas to /usr/lib:
    sudo python3.7 -m pip install pandas -t /usr/lib/python3.7/dist-packages
    ```


## Custom installation of Python

> **Note:**
> If you have installed Python 3.7 in the default location of `/usr/lib/python3.7`, you can skip this section and move on to the [Register language extension](#register-language-extension-linux) section.

If you built your own version of Python 3.7, use the following commands to let SQL Server know your custom installation.

### Add environment variable

First, edit the **mssql-launchpadd** service to add the **PYTHONHOME** environment variable to the file `/etc/systemd/system/mssql-launchpadd.service.d/override.conf`

1. Open the file with systemctl

    ```bash
    sudo systemctl edit mssql-launchpadd
    ```

1. Insert the following text in the `/etc/systemd/system/mssql-launchpadd.service.d/override.conf` file that opens. Set value of **PYTHONHOME** to the custom Python installation path.

    ```
    [Service]
    Environment="PYTHONHOME=<path to the python3.7 lib>"
    ```

1. Save the file and close the editor.

Next, make sure `libpython3.7m.so.1.0` can be loaded.

1. Create a custom-python.conf file in `/etc/ld.so.conf.d`.

    ```bash
    sudo vi /etc/ld.so.conf.d/custom-python.conf
    ```

1. In the file that opens, add the path to **libpython3.7m.so.1.0** from the custom Python installation.

    ```
    <path to the python3.7 lib>
    ```

1. Save the new file and close the editor.

1. Run `ldconfig` and verify `libpython3.7m.so.1.0` can be loaded by running the following commands and checking that all the dependent libraries can be found.

    ```bash
    sudo ldconfig
    ldd <path to the python3.7 lib>/libpython3.7m.so.1.0
    ```

### Grant access to Python folder

Set the `datadirectories` option in the extensibility section of `/var/opt/mssql/mssql.conf` file to the custom python installation.

```bash
sudo /opt/mssql/bin/mssql-conf set extensibility.datadirectories <path to python3.7>
```

### Restart mssql-launchpadd

Run the following command to restart **mssql-launchpadd**.

```bash
sudo systemctl restart mssql-launchpadd
```

<a name="register-language-extension-linux"></a>

## Register language extension

Follow these steps to download and register the Python language extension, which is used for the Python custom runtime.

1. Download the **python-lang-extension-linux-release.zip** file from the [SQL Server Language Extensions GitHub repo](https://github.com/microsoft/sql-server-language-extensions/releases).

    Alternatively, you can use the debug version (**python-lang-extension-linux-debug.zip**) in a development or test environment. The debug version provides verbose logging information to investigate any errors, and is not recommended for production environments.

1. Use the [MSSQL extension for Visual Studio Code](../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md) to connect to your SQL Server instance and run the following T-SQL command to register the Python language extension with [CREATE EXTERNAL LANGUAGE](../../t-sql/statements/create-external-language-transact-sql.md). 

    Modify the path in this statement to reflect the location of the downloaded language extension zip file (**python-lang-extension-linux-release.zip**).

    ```sql
    CREATE EXTERNAL LANGUAGE [myPython]
    FROM (CONTENT = N'/path/to/python-lang-extension-linux-release.zip', FILE_NAME = 'libPythonExtension.so.1.1');
    GO
    ```

    Execute the statement for each database you want to use the Python language extension in.

    > **Note:**
    > **Python** is a reserved word and can't be used as the name for a new external language name. Use a different name instead. For example, the statement above uses **myPython**.



**Applies to: platform-linux-sles**


## Prerequisites

Before installing a custom Python runtime, install the following prerequisites:

- Install  SQL Server 2019 (15.x) 
 for Linux. You can install SQL Server on Red Hat Enterprise Linux (RHEL), SUSE Linux Enterprise Server (SLES), and Ubuntu. For more information, see [the Installation guidance for SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md).

- Upgrade to Cumulative Update (CU) 3 or later for  SQL Server 2019 (15.x) 
. Follow these steps:

  1. Configure the repositories for Cumulative Updates. For more information, see [Configure repositories for installing and upgrading SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-change-repo.md).

  1. Update the **mssql-server** package to the latest Cumulative Update. For more information, see [the Update or Upgrade SQL Server section in the installation guidance for SQL Server on Linux](https://github.com/MicrosoftDocs/sql-docs/blob/e261e18779bfc7d6123e89ebb40055901b927c2a/docs/linux/sql-server-linux-setup.md#upgrade).


## Install Language Extensions

> **Note:**
> If you have [Machine Learning Services](../sql-server-machine-learning-services.md) installed on SQL Server 2019, the **mssql-server-extensibility** package for Language Extensions is already installed and you can skip this step.

Run the command below to install [SQL Server Language Extensions](../../language-extensions/language-extensions-overview.md) on SUSE Linux Enterprise Server (SLES), which is used for the Python custom runtime.

```bash
# Install as root or sudo
sudo zypper install mssql-server-extensibility
```

## Install Python 3.7 and pandas

The Python language extension used for the custom Python runtime currently supports [Python 3.7](https://www.python.org/) only. If you would like to use a different version of Python, follow the instruction in the [Python Language Extension GitHub repo](https://github.com/microsoft/sql-server-language-extensions/tree/master/language-extensions/python) to modify and rebuild the extension.

1. Install [Python 3.7](https://www.python.org/) on the server.

1. Run the command below to install the pandas package

    ```bash
    # Install pandas to /usr/lib:
    sudo python3.7 -m pip install pandas -t /usr/lib/python3.7/dist-packages
    ```


## Custom installation of Python

> **Note:**
> If you have installed Python 3.7 in the default location of `/usr/lib/python3.7`, you can skip this section and move on to the [Register language extension](#register-language-extension-linux) section.

If you built your own version of Python 3.7, use the following commands to let SQL Server know your custom installation.

### Add environment variable

First, edit the **mssql-launchpadd** service to add the **PYTHONHOME** environment variable to the file `/etc/systemd/system/mssql-launchpadd.service.d/override.conf`

1. Open the file with systemctl

    ```bash
    sudo systemctl edit mssql-launchpadd
    ```

1. Insert the following text in the `/etc/systemd/system/mssql-launchpadd.service.d/override.conf` file that opens. Set value of **PYTHONHOME** to the custom Python installation path.

    ```
    [Service]
    Environment="PYTHONHOME=<path to the python3.7 lib>"
    ```

1. Save the file and close the editor.

Next, make sure `libpython3.7m.so.1.0` can be loaded.

1. Create a custom-python.conf file in `/etc/ld.so.conf.d`.

    ```bash
    sudo vi /etc/ld.so.conf.d/custom-python.conf
    ```

1. In the file that opens, add the path to **libpython3.7m.so.1.0** from the custom Python installation.

    ```
    <path to the python3.7 lib>
    ```

1. Save the new file and close the editor.

1. Run `ldconfig` and verify `libpython3.7m.so.1.0` can be loaded by running the following commands and checking that all the dependent libraries can be found.

    ```bash
    sudo ldconfig
    ldd <path to the python3.7 lib>/libpython3.7m.so.1.0
    ```

### Grant access to Python folder

Set the `datadirectories` option in the extensibility section of `/var/opt/mssql/mssql.conf` file to the custom python installation.

```bash
sudo /opt/mssql/bin/mssql-conf set extensibility.datadirectories <path to python3.7>
```

### Restart mssql-launchpadd

Run the following command to restart **mssql-launchpadd**.

```bash
sudo systemctl restart mssql-launchpadd
```

<a name="register-language-extension-linux"></a>

## Register language extension

Follow these steps to download and register the Python language extension, which is used for the Python custom runtime.

1. Download the **python-lang-extension-linux-release.zip** file from the [SQL Server Language Extensions GitHub repo](https://github.com/microsoft/sql-server-language-extensions/releases).

    Alternatively, you can use the debug version (**python-lang-extension-linux-debug.zip**) in a development or test environment. The debug version provides verbose logging information to investigate any errors, and is not recommended for production environments.

1. Use the [MSSQL extension for Visual Studio Code](../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md) to connect to your SQL Server instance and run the following T-SQL command to register the Python language extension with [CREATE EXTERNAL LANGUAGE](../../t-sql/statements/create-external-language-transact-sql.md). 

    Modify the path in this statement to reflect the location of the downloaded language extension zip file (**python-lang-extension-linux-release.zip**).

    ```sql
    CREATE EXTERNAL LANGUAGE [myPython]
    FROM (CONTENT = N'/path/to/python-lang-extension-linux-release.zip', FILE_NAME = 'libPythonExtension.so.1.1');
    GO
    ```

    Execute the statement for each database you want to use the Python language extension in.

    > **Note:**
    > **Python** is a reserved word and can't be used as the name for a new external language name. Use a different name instead. For example, the statement above uses **myPython**.



## Enable external scripts

You can execute a Python external scripts with the stored procedure [sp_execute_external script](../../relational-databases/system-stored-procedures/sp-execute-external-script-transact-sql.md).

To enable external scripts, use the [MSSQL extension for Visual Studio Code](../../tools/visual-studio-code-extensions/mssql/mssql-extension-visual-studio-code.md) to execute the statement below.

```sql
sp_configure 'external scripts enabled', 1;
RECONFIGURE WITH OVERRIDE;  
```

## Verify installation

Use the following SQL script to verify the installation and functionality of the Python custom runtime. In the below sample script, `myPython` is used as the language name because the default language name `Python` cannot be provided for a custom runtime.

```sql
EXEC sp_execute_external_script
@language =N'myPython',
@script=N'
import sys
print(sys.path)
print(sys.version)
print(sys.executable)'
```

## Related content

- [Install an R custom runtime for SQL Server](custom-runtime-r.md)
- [Extensibility architecture in SQL Server Machine Learning Services](../concepts/extensibility-framework.md)
- [What is SQL Server Language Extensions?](../../language-extensions/language-extensions-overview.md)
