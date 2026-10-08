---
title: "Quickstart: Connect Django to SQL Server"
description: Connect a Django application to SQL Server using mssql-django and run database operations with the Django ORM.
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: vanto, randolphwest, sharmag, sumitsar
ms.date: 09/18/2026
ms.service: sql
ms.subservice: connectivity
ms.topic: quickstart
ai-usage: ai-assisted
---

# Quickstart: Connect Django to SQL Server

In this quickstart, you create a Django project, connect it to a SQL Server database using `mssql-django`, run migrations, and perform basic data operations with the Django ORM.

## Prerequisites

- Python 3.10 through 3.14. Django 6.0 and later versions require at least Python 3.12.
- Microsoft ODBC Driver 17 or 18 for SQL Server, for the default `pyodbc` driver. See [Download ODBC Driver for SQL Server](../../odbc/download-odbc-driver-for-sql-server.md). If you opt for the `mssql-python` driver instead, you don't need to install a separate ODBC driver. See [Select the database driver for mssql-django](select-database-driver.md).

Keep the server name and authentication credentials for Step 3.


### Create a SQL database

Create or connect to a SQL database on one of the following platforms:

### [Azure SQL Database](#tab/azure-sql)

[Create a SQL database in minutes using the Azure portal](https://learn.microsoft.com/azure/azure-sql/database/single-database-create-quickstart)

### [SQL database in Fabric](#tab/fabric-sql)

[Load AdventureWorks sample data in your SQL database in Microsoft Fabric](https://learn.microsoft.com/fabric/database/sql/load-AdventureWorks-sample-data)

### [Microsoft SQL Server](#tab/sql-server)

[Install SQL Server from the Installation Wizard](../../../database-engine/install-windows/install-sql-server-from-the-installation-wizard-setup.md)

[AdventureWorks sample databases](../../../samples/adventureworks-install-configure.md)

### [SQL Server container](#tab/container)

[Create a SQL Server container in Docker](../../../linux/install-upgrade/quickstart-install-docker.md)

[Create a SQL Server container with sqlcmd](../../../tools/sqlcmd/quickstart-sqlcmd-create-container.md)

[Create a SQL Server container with the MSSQL extension for VS Code](../../../tools/visual-studio-code-extensions/mssql/mssql-local-container.md)

---


## Step 1: Install mssql-django

Create a virtual environment and install the package:

```bash
python -m venv .venv
```

### [Windows](#tab/windows)

```console
.venv\Scripts\activate
pip install mssql-django
```

### [Linux/macOS](#tab/linux)

```bash
source .venv/bin/activate
pip install mssql-django
```

---

## Step 2: Create a Django project

Create a new Django project and app:

```bash
django-admin startproject myproject
cd myproject
python manage.py startapp myapp
```

## Step 3: Configure the database

Edit `myproject/settings.py` and replace the default `DATABASES` setting.

### Connect to SQL Server

```python
DATABASES = {
    "default": {
        "ENGINE": "mssql",
        "NAME": "<your-database>",
        "USER": "<your-username>",
        "PASSWORD": "<your-password>",
        "HOST": "<your-server>",
        "PORT": "1433",
    },
}
```


> **Caution:**
> Use `TrustServerCertificate=yes` only for local development with self-signed certificates. Don't use it in production. It disables certificate chain validation and increases adversary-in-the-middle risk. Install a trusted certificate on the server and connect with `TrustServerCertificate=no`.


### Connect to Azure SQL Database

```python
DATABASES = {
    "default": {
        "ENGINE": "mssql",
        "NAME": "<your-database>",
        "USER": "<your-username>",
        "PASSWORD": "<your-password>",
        "HOST": "<your-server>.database.windows.net",
        "PORT": "1433",
        "OPTIONS": {
            "driver": "ODBC Driver 18 for SQL Server",
            "extra_params": "Encrypt=yes",
        },
    },
}
```

## Step 4: Define a model

Edit `myapp/models.py`:

```python
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
```

Add `"myapp"` to `INSTALLED_APPS` in `settings.py`:

```python
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "myapp",
]
```

## Step 5: Run migrations

Generate and apply database migrations:

```bash
python manage.py makemigrations myapp
python manage.py migrate
```

Confirm that the `myapp` migration was applied:

```bash
python manage.py showmigrations myapp
```

You should see `[X] 0001_initial`. If you see `[ ] 0001_initial`, rerun `python manage.py migrate myapp` before continuing.

## Step 6: Use the Django ORM

Open the Django shell. The shell is an interactive Python session with your Django project loaded, indicated by the `>>>` prompt.

```bash
python manage.py shell
```

At the `>>>` prompt, import the model:

```python
from myapp.models import Product
```

Create a record:

```python
product = Product.objects.create(name="Widget", price=9.99)
print(f"Created: {product.name} (id={product.pk})")
```

Read records:

```python
for p in Product.objects.all():
    print(f"{p.name}: ${p.price}")
```

Update the record:

```python
product.price = 12.99
product.save()
```

Delete the record:

```python
product.delete()
```

Exit the shell with `exit()`. Alternatively, use <kbd>Ctrl</kbd>+<kbd>Z</kbd> on Windows, or <kbd>Ctrl</kbd>+<kbd>D</kbd> on Linux or macOS.

> **Note:**
> If you get an `Invalid object name 'myapp_product'` error, the `myapp_product` table doesn't exist in the database even though Django's migration history claims `0001_initial` is applied. Exit the shell, then reset the migration history and reapply it:
>
> ```bash
> python manage.py migrate myapp zero --fake
> python manage.py migrate myapp
> ```

## Next step

> 
> [mssql-django configuration reference](configuration-reference.md)

## Related content

- [Install mssql-django](installation.md)
- [Django field to SQL Server type mappings](data-type-mappings.md)
- [Django tutorial](https://docs.djangoproject.com/en/stable/intro/tutorial01)
- [mssql-django on GitHub](https://github.com/microsoft/mssql-django)
