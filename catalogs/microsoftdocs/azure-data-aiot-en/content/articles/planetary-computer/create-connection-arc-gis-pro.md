---
title: Use ArcGIS Pro with Microsoft Planetary Computer Pro
description: Learn how to configure and authenticate ArcGIS Pro so that it can read STAC Item data from Microsoft Planetary Computer Pro. 
author: aloverro
ms.author: adamloverro
ms.service: planetary-computer-pro
ms.topic: how-to
ms.date: 05/27/2026

# customer intent: As a GeoCatalog user, I want to configure and authenticate ArcGIS pro to operate with Microsoft Planetary Computer Pro so that I can view imagery stored in my GeoCatalog within the ArcGIS Pro tool.
---

# Configure ArcGIS Pro to access a GeoCatalog

Learn how to configure ArcGIS Pro to access geospatial datasets from the Microsoft Planetary Computer Pro GeoCatalog by using OAuth 2.0-delegated authentication with Microsoft Entra ID.

This process requires that you:

* Register two applications in Microsoft Entra ID (a web API and a desktop client).
* Configure delegated permissions with the `user_impersonation` scope.
* Connect ArcGIS Pro to Azure Blob Storage and SpatioTemporal Asset Catalog (STAC)-compliant datasets in the Microsoft Planetary Computer Pro environment.

Learn how to securely browse and access data hosted in Microsoft Planetary Computer Pro directly in ArcGIS Pro by using Microsoft Entra ID user impersonation.

## Prerequisites

- Access to a Microsoft Entra ID tenant
- Azure subscription with permissions to manage app registrations
- ArcGIS Pro installed on your machine

> **Tip:**
> Before you begin, review background information in [Register an application in Microsoft Entra ID](https://learn.microsoft.com/entra/identity-platform/quickstart-register-app).

## Register a web API application for ArcGIS Pro

### [Public](#tab/public)

1. Open the Azure portal and search for **Entra**. Select **Microsoft Entra ID**.

   Screenshot that shows a user selecting Microsoft Entra ID from the Azure portal.

1. Go to **App registrations** > **New registration**.

   Screenshot that shows new app registration.

1. Register the Web API app. Here are some name suggestions:

   - **ArcGISPro-GeoCatalog-WebAPI**
   - **ArcGIS Pro**

1. Under **Supported account types**, select **Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)**.

   Screenshot that shows how to register an app.

   Screenshot that shows how to register a new app.

1. In your new app (named **ArcGIS Pro** in our example), go to **Authentication** > **Add a platform** > **Web**.

   Screenshot that shows how to choose web for authentication.

1. In **Configure Web** > **Redirect URI**, add `<https://localhost>`. Select **Configure**.
  
   Screenshot that shows how to add a redirect URI.

1. Return to **Authentication** > **Add a platform**, and then select **Mobile and desktop applications**.

   Screenshot that shows how to add a mobile desktop app.

1. In **Configure Web** > **Redirect URI**, add `arcgis-pro://auth`. Select **Configure**.

   Screenshot that shows how to configure a desktop device.

1. Under **Implicit grant and hybrid flows**, select the checkbox for **ID tokens (used for implicit and hybrid flows)**. Select **Save**.

   Screenshot that shows how to enable ID tokens for ArcGIS app authentication.

1. Select **API Permissions** on the left menu. Add and grant admin consent for:

   - **Azure Storage** > **user_impersonation**
   - **Microsoft Graph** > **User.Read** (default)

   Screenshot that shows how to add API permissions.

1. After you add permissions, select **Grant admin consent for Default Directory**.

   Screenshot that shows how to grant admin consent.

1. On the left menu, select **Expose an API** > **Add**. Under **Edit application ID URI** add your app's URI in **Application ID URI**.

   Screenshot that shows how to add the application ID URI.

1. Select **Add a scope** and add the following information:

   - **user_authentication** (display name: **ArcGISPro-API-User-Auth**)

     Screenshot that shows how to add a user authentication scope.

   - **user_impersonation** (display name: **ArcGISPro-API-Impersonation**)

     Screenshot that shows how to add a user impersonation scope.

1. Select **Add a client application**. Choose and take note of the client ID. You need the client ID to set up [an authentication connection](#add-an-authentication-connection) in ArcGIS Pro.

   Screenshot that shows how to add a client app.

### [US Gov](#tab/usgov)

1. Open the Azure portal and search for **Entra**. Select **Microsoft Entra ID**.

   Screenshot that shows a user selecting Microsoft Entra ID from the Azure portal.

1. Go to **App registrations** > **New registration**.

   Screenshot that shows how to register a new app.

1. Register the Web API app. Here are some name suggestions:

   - **ArcGISPro-GeoCatalog-WebAPI**
   - **ArcGIS Pro**

1. Under **Supported account types**, select **Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)**.

   Screenshot that shows how to register an app.

   Screenshot that shows registering a new app.

1. In your new app (named **ArcGIS Pro** in our example), go to **Authentication** > **Add a platform** > **Web**.

   Screenshot that shows how to add web authentication.

1. In **Configure Web** > **Redirect URI**, add `<https://localhost>`. Select **Configure**.
  
   Screenshot that shows how to add a redirect URI.

1. Return to **Authentication** > **Add a platform**, and then select **Mobile and desktop applications**.

   Screenshot that shows how to add a mobile desktop app.

1. In **Configure Desktop + devices** add `arcgis-pro://auth` in **Custom redirect URIs**.

   Screenshot that shows how to configure desktop plus device with a redirect URI.

1. In the **Mobile and desktop applications** panel, select **Add URI**. Enter `https://login.microsoftonline.us/common/oauth2/nativeclient` as a second redirect URI.

   Screenshot that shows how to add a second redirect URI.

1. Under **Implicit grant and hybrid flows**, select the checkbox for **ID tokens (used for implicit and hybrid flows)**. Select **Save**.

   Screenshot that shows how to enable ID tokens for ArcGIS app authentication.

1. Select **API Permissions** on the left menu. Add and grant admin consent for:

   - **Azure Storage** > **user_impersonation**
   - **Microsoft Graph** > **User.Read** (default)

   Screenshot that shows how to configure API permissions.

1. After you add permissions, select **Grant admin consent for Default Directory**.

   Screenshot that shows how to grant admin consent.

1. On the left menu, select **Expose an API** > **Add**. Under **Edit application ID URI** add your app's URI in **Application ID URI**.

   Screenshot that shows how to add the application ID URI.

1. Select **Add a scope** and add the following information:

   - **user_authentication** (display name: **ArcGISPro-API-User-Auth**)

     Screenshot that shows how to add a user authentication scope.

   - **user_impersonation** (display name: **ArcGISPro-API-Impersonation**)

     Screenshot that shows how to add a user impersonation scope.

1. Select **Add a client application**. Choose and take note of the client ID. You need the client ID to set up [an authentication connection](#add-an-authentication-connection) in ArcGIS Pro.

   Screenshot that shows how to add a client app.

---

## Register a desktop client application for ArcGIS Pro

### [Public](#tab/public)

After you register your first application, register a second (with a distinct name). The second app represents ArcGIS Pro Desktop and configures its API permissions. Ensure that the new app can access the web API that you exposed with the first application.

1. Create a second app registration for the ArcGIS Pro desktop client with one of these suggested names: **ArcGISPro-GeoCatalog-DesktopClient** or **GeoCatalog-ArcGIS**. Set the account type by selecting **Single tenant**.

   Screenshot that shows how to register a second app called arcgisprodesktopclient.

   Screenshot that shows how to register a new app  called GeoCatalog ArcGIS.

1. Configure the desktop client app. In this example, we use the name **GeoCatalog-ArcGIS**. Repeat the steps from the first app registration:

   - For **Add a platform**, select **Web**.
   - For **Redirect URI**, add `<https://localhost>`.
   - For **Add a platform**, select **Mobile and desktop applications**.
   - For **Redirect URI**, add `arcgis-pro://auth`.
   - Under **Implicit grant and hybrid flows**, select **ID tokens (used for implicit and hybrid flows)**. Select **Save**.

1. Add access to the web API app:

   - On the **API permissions** tab, select **Add a permission**.
   - Go to the **APIs my organization uses** tab and search for the **Web API app** that you created previously (for example, **ArcGIS Pro**).
   - Select the app name to open the **Request API Permissions** screen.

     Screenshot that shows how to request API permissions.

   - Select both **user_authentication** and **user_impersonation**, the delegated permissions that you defined in the first app.
   - Select **Add permissions**.

     Screenshot that shows how to add API permissions for ArcGIS Pro.

1. Add the following delegated permissions:

   - **Azure Storage** > **user_impersonation**
   - **Azure Orbital Spatio** > **user_impersonation**
   - **Microsoft Graph** > **User.Read** (enabled by default)
   - **Add permissions**
   - **Grant admin consent**

   Screenshot that shows app selection on the request API permissions screen.
  
   Screenshot that shows grant admin consent.

### [US Gov](#tab/usgov)

After you register your first application, register a second (with a distinct name). The second app represents ArcGIS Pro Desktop and configures its API permissions. Ensure that the new app can access the web API that you exposed with the first application.

1. Create a second app registration for the ArcGIS Pro desktop client with one of these suggested names: **ArcGISPro-GeoCatalog-DesktopClient** or **GeoCatalog-ArcGIS**. Set the account type by selecting **Single tenant**.

   Screenshot that shows how to register a second app called arcgisprodesktopclient.

   Screenshot that shows how to register a new app called GeoCatalog ArcGIS.

1. Configure the desktop client app. In this example, we use the name **GeoCatalog-ArcGIS**. Repeat the steps from the first app registration:

   - For **Add a platform**, select **Web**.
   - For **Redirect URI**, add `<https://localhost>`.
   - For **Add a platform**, select **Mobile and desktop applications**.
   - For **Redirect URI**, add `arcgis-pro://auth`.  
   - Add another redirect URI for **Mobile and desktop applications**: `https://login.microsoftonline.us/common/oauth2/nativeclient`.
   - Under **Implicit grant and hybrid flows**, select **ID tokens (used for implicit and hybrid flows)**. Select **Save**.

1. Add access to the web API app:

   - On the **API permissions** tab, select **Add a permission**.
   - Go to the **APIs my organization uses** tab and search for the **Web API app** that you created previously (for example, **ArcGIS Pro**).
   - Select the app name to open the **Request API Permissions** screen.

     Screenshot that shows how to request API permissions.

   - Select both **user_authentication** and **user_impersonation**, the delegated permissions that you defined in the first app.
   - Select **Add permissions**.

     Screenshot that shows how to add API permissions for ArcGIS Pro.

1. Add the following delegated permissions:

   - **Azure Storage** > **user_impersonation**.
   - **Azure Orbital Spatio** > **user_impersonation**.
   - **Microsoft Graph** > **User.Read** (Enabled by default).
   - Select **Add permissions**.
   - Select **Grant admin consent**.

   Screenshot that shows app selection on the request API permissions screen.
  
   Screenshot that shows you how to grant admin consent.

---

## Configure ArcGIS Pro (desktop) for Microsoft Planetary Computer Pro GeoCatalog access

This section outlines how to configure authentication and data access in the ArcGIS Pro desktop application. You use OAuth 2.0 integration with Microsoft Entra ID and access the Microsoft Planetary Computer Pro GeoCatalog. This section includes steps to add an authentication connection and create storage and STAC data connections.

## Add an authentication connection

### [Public](#tab/public)

1. Go to the **ArcGIS Pro settings** page in one of the following ways:

   - From an open project, select the **Project** tab on the ribbon.
   - From the start page, select the **Settings** tab.

1. On the left menu, select **Options**.

1. Go to **Options** > **Application** > **Authentication**.

1. Select **Add Connection**.

1. Enter a value in the **Connection Name** field.

1. For **Type**, select **Microsoft Entra ID**.

1. Enter values in the **Entra Domain** and **Client ID** fields.

   - You can [find your Microsoft Entra ID domain](https://learn.microsoft.com/partner-center/account-settings/find-ids-and-domain-names) (also known as your primary domain) from Microsoft Entra ID in the Azure portal.
   - For **Client ID**, enter the client ID you set in the **Add a client application** step.

1. Add the following values in the **Scopes** fields:

   - `https://storage.azure.com/.default`
   - `https://geocatalog.spatio.azure.com/.default`

   Screenshot that shows how to add a connection.

1. Select **OK**.

1. Sign in through the **Authentication** dialog and complete the prompts.

   Screenshot that shows how to sign in with the authentication dialog.

> **Tip:**
> For more information, see the documentation: [Connect to authentication providers from ArcGIS Pro](https://pro.arcgis.com/en/pro-app/latest/get-started/connect-to-authentication-providers-from-arcgis-pro.htm).

### [US Gov](#tab/usgov)

1. Go to the **ArcGIS Pro settings** page in one of the following ways:

   - From an open project, select the **Project** tab on the ribbon.
   - From the start page, select the **Settings** tab.

1. On the left menu, select **Options**.

1. Go to **Options** > **Application** > **Authentication**.

1. Select **Add Connection**.

1. Enter a value in the **Connection Name** field.

1. For **Type**, select **Microsoft Entra ID**.

1. Select **Azure US Government** under **Azure Environment**

1. Enter values in the **Entra Domain** and **Client ID** fields.

   - You can [find your Microsoft Entra ID domain](https://learn.microsoft.com/partner-center/account-settings/find-ids-and-domain-names) (also known as your primary domain) from Microsoft Entra ID in the Azure portal.
   - For **Client ID**, enter the client ID that you set in the **Add a client application** step.

1. Add the following values in the **Scopes** fields:

   - `https://storage.usgovcloudapi.net/.default`
   - `https://geocatalog.spatio.azure.us/.default`

   Screenshot that shows how to add a connection.

1. Select **OK**.

1. Sign in through the **Authentication** dialog and complete the prompts.

   Screenshot that shows how to sign in with the authentication dialog.

> **Tip:**
> For more information, see the documentation: [Connect to authentication providers from ArcGIS Pro](https://pro.arcgis.com/en/pro-app/latest/get-started/connect-to-authentication-providers-from-arcgis-pro.htm).

---

## Prepare and record GeoCatalog information

### GeoCatalog URI, collection ID, and token API endpoint

1. Create a Microsoft Planetary Computer Pro GeoCatalog in your Azure subscription (for example, **arcgisprogeocatalog**), and locate it in the appropriate resource group.

   Screenshot that shows how to find a GeoCatalog.

1. Select the GeoCatalog that you created.

1. Copy the value of its **GeoCatalog URI**. For example, ```https://arcgisprogeocatalog.<unique-identity>.<cloud-region>.geocatalog.spatio.azure.com```.

   Screenshot that shows how to retrieve the GeoCatalog URI.

1. Paste the link for your GeoCatalog URI in the browser and select the **Collections** button.

   Screenshot that shows the web interface for Microsoft Planetary Computer Pro.

1. Record the value in **Collection Name**. This value is the collection ID. For example, `sentinel-2-l2a-tutorial-1000`.

1. Construct the token API endpoint by using this pattern: ```<GeoCatalog URI>/sas/token/{collectionId}?api-version=2026-04-15```. For example: ```https://arcgisprogeocatalog.<unique-identity>.<cloud-region>.geocatalog.spatio.azure.com/sas/token/sentinel-2-l2a-tutorial-1000?api-version=2026-04-15```.

### Find and record the storage location

Each collection within the Microsoft Planetary Computer Pro GeoCatalog stores geospatial data and STAC Item assets in a dedicated storage account and Azure blob container. In the following steps, you find and record the storage account and container names for a specific collection.

> **Note:**
> An Azure Storage account and blob container are discoverable only after STAC Items or other assets are added to a collection.

There are two easy ways to discover the storage account and blob container for a collection: by using a thumbnail or by using a STAC Item with assets.

#### Discover the storage account by using a collection thumbnail

1. From a specific **Collections** page, select the value for **Collection Name**.

   Screenshot that shows how to select the collection name.

1. Select the **Edit collection** button.

   Screenshot that shows how to edit a GeoCatalog collection.

1. In the resulting JSON display, locate the key `title:assets:thumbnail:href` and copy the corresponding value. For example:

    ```bash
    https://<unique-storage>.blob.core.windows.net/sentinel-2-l2a-tutorial-1000-<unique-id>/collection-assets/thumbnail/lulc.png
    ```

1. Record the values under **Account Name** and **Container Name**. For example:

   - **(Storage) Account Name**: ```<unique-storage>```
   - **Container Name**: ```sentinel-2-l2a-tutorial-1000-<unique-id>```

   Screenshot that shows a collection json display.

#### Discover the storage account by using a STAC Item

1. From a specific **Collections** page, select **STAC Items**.

   Screenshot that shows how to select the STAC Item.

1. Select the checkbox next to one of the listed STAC Items.

   Screenshot that shows how to select a STAC Item box.

1. Scroll to the bottom of the **STAC Item** right panel and select the link to retrieve the STAC Item JSON.

   Screenshot that shows how to select the STAC Item JSON link.

1. Find the object called `assets` within the STAC Item JSON specification. Select one of the asset types within this object and find the `href` key.

   ```json
    "assets": {
        "image": {
            "href": "https://<unique-storage>.blob.core.windows.net/naip-sample-datasets-<unique-id>/12f/va_m_3807708_sw_18_060_20231113_20240103/image.tif",
        }
    }
    ```

1. Record the value for **Account Name** and **Container Name**. For example:

   - **(Storage) Account Name**: ```<unique-storage>```
   - **Container Name**: ```naip-sample-datasets-<unique-id>```

## Set up a connection to Azure Blob Storage

1. In ArcGIS Pro, open the **Create Cloud Storage Connection File** geoprocessing tool to create a new ACS connection file. You can access this tool in the main ribbon on the **Analysis** tab. Select **Tools**, and then search for the tool by typing its name.

1. Specify a value for the **Connection File Location** for the ACS file.

1. Provide a name for **Connection File**. For example, **geocatalog_connection.acs**.

1. Select **Service Provider** > **Azure**.

1. For **Authentication**, select the name of the auth profile that you used earlier.

1. For **Access Key ID (Account Name)**, use the **Account Name** value that you recorded earlier: ```<unique-storage>```.

1. For **Bucket (Container) Name** use the **Container Name** value that you recorded earlier: ```sentinel-2-l2a-tutorial-1000-<unique-id>```.

1. Don't specify a value for **Folder**.

1. Add the provider option **ARC_TOKEN_SERVICE_API** and set the value to the token API endpoint that you constructed earlier. For example:

   ```bash
    https://arcgisprogeocatalog.<unique-identity>.<cloud-region>.geocatalog.spatio.azure.com/sas/token/sentinel-2-l2a-tutorial-1000?api-version=2026-04-15
   ```

1. Add the provider option **ARC_TOKEN_OPTION_NAME** and set the value to **AZURE_STORAGE_SAS_TOKEN**.

   Screenshot that shows a create cloud storage connection file sample.

## Create a STAC connection to Microsoft Planetary Computer Pro

> **Tip:**
> Refer to the ArcGIS Pro documentation [Create a STAC connection](https://pro.arcgis.com/en/pro-app/latest/help/data/imagery/create-a-stac-connection.htm).

Screenshot that shows how to create a new STAC connection.

1. Provide a name in **STAC Connection**. For example, **GeoCatalog_Connection**.

1. For **Connection**, use the form ```<GeoCatalog URI>/stac```. For example:

   ```bash
    https://arcgisprogeocatalog.<unique-identity>.<cloud-storage>.geocatalog.spatio.azure.com/stac
   ```

1. Reference the authentication settings that you created in the previous step.

1. Add values for **Custom Parameters**:

   - **Name:** ```api-version```
   - **Value:** ```2026-04-15```

1. Add the ACS connection file that you created in the previous step to the **Cloud Storage Connections** list. Select **OK**.

   Screenshot that shows how to create a STAC connection.

1. Explore the STAC connection.

   > **Tip:**
   > Learn more about the ArcGIS [Explore STAC pane](https://pro.arcgis.com/en/pro-app/latest/help/data/imagery/explore-stac.htm).

   Screenshot that shows the Explore STAC dialog.

1. Search, fetch extensive STAC metadata, and view and browse images.

1. Add selected images to the **Map** or **Scene** functions.

   Screenshot that shows the STAC data window.

## Related content

- [Connect and build applications with your data](build-applications-with-planetary-computer-pro.md)
- [Configure application authentication for Microsoft Planetary Computer Pro](application-authentication.md)
- [Configure QGIS to access a GeoCatalog resource](configure-qgis.md)
- [Use the Microsoft Planetary Computer Pro Explorer](use-explorer.md)
- [Create a cloud storage connection file (ArcGIS Pro)](https://pro.arcgis.com/en/pro-app/latest/tool-reference/data-management/create-cloud-storage-connection-file.htm)
- [Create a new GeoCatalog](deploy-geocatalog-resource.md)
- [Create a STAC collection](create-stac-collection.md)
