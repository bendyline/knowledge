---
title: Register a client application in Microsoft Entra ID for the Azure Health Data Services
description: "Learn how to register a client application in Microsoft Entra ID for Azure Health Data Services. Add secrets, certificates, and API permissions to enable secure access."
author: chachachachami
ms.service: azure-health-data-services
ms.topic: tutorial
ms.date: 03/24/2026
ms.author: chrupa
ms.custom: sfi-image-blocked
---

# Register a client application in Microsoft Entra ID for Azure Health Data Services

In this article, you learn how to register a client application in Microsoft Entra ID to access Azure Health Data Services. When you register a client application, you can authenticate and securely connect to FHIR and DICOM services. For more information, see [Register an application with the Microsoft identity platform](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/quickstart-register-app.md).

## Register a new application

1. In the [Azure portal](https://portal.azure.com), select **Microsoft Entra ID**.
1. Select **App registrations**.

    Screenshot of the new app registration window in Microsoft Entra ID.

1. Select **New registration**.
1. For Supported account types, select **Accounts in this organization directory only**. Don't change the other options.

   Screenshot of the new registration account options for supported account types.

1. Select **Register**.

## Application ID (client ID)

After registering a new application, you can find the **Application (client) ID** and **Directory (tenant) ID** in the **Overview** page. Make a note of the values for use later.

Screenshot of the application client ID and tenant ID overview panel in Microsoft Entra ID.


## Authentication setting: confidential vs. public

Select **Authentication** and the **Settings** tab. The default value for **Allow public client flows** is **Disabled**.

If you keep this default value, the application registration is a **confidential client application** and requires a certificate or secret.

Screenshot of the authentication settings for a confidential client application.


If you enable the **Allow public client flows** option, the application registration is a public client application and doesn't require a certificate or secret. Public client applications are useful when you want to use the OAuth 2.0 authorization protocol or features as described in [Public client and confidential client applications](https://learn.microsoft.com/entra/identity-platform/msal-client-applications#when-should-you-enable-a-public-client-flow-in-your-app-registration).

For tools that require a redirect URI, such as [OAuth 2.0](https://learn.microsoft.com/entra/identity-platform/v2-app-types), go to the **Redirect URI configuration** tab and select **Add Redirect URI** to configure the platform.

Screenshot of select a platform.


For example, when you choose **Mobile and desktop applications**, you select the redirect URI for that platform.

Screenshot of configure other platform.

## Certificates and client secrets

To create a new client secret, use the following steps:

1. Go to **Certificates & Secrets** > **Client secrets**.
1. Select **New Client Secret**. 
1. In **Add a client secret**, enter a **Description**.
1. Accept the recommended 180-day value in the **Expires** field, or select a different value from the list.
1. Select **Add**.
    Screenshot of the certificates and client secrets page with new client secret options.

1. Copy the secret value by selecting the copy button next to the **Value**.
    Screenshot of the client secret value with the copy button highlighted.


>**Note:**
>It's important that you save the secret value, not the secret ID.


Optionally, you can upload a certificate (public key) and use the Certificate ID, a GUID value associated with the certificate. For testing purposes, you can create a self-signed certificate by using tools such as the PowerShell command `New-SelfSignedCertificate`, and then export the certificate from the certificate store. For more information, see [Create a self-signed public certificate to authenticate your application](https://learn.microsoft.com/entra/identity-platform/howto-create-self-signed-certificate).  

## API permissions for DICOM and FHIR services

To allow the client application to access the FHIR and DICOM services, you need to add API permissions. The required permissions depend on your application scenario and the service you want to access.

The following steps are required for the DICOM service.

1. Select **API permissions**.

   Screenshot of API permission page with Add a permission button highlighted.

1. Select **Add a permission**.

   If you're using Azure Health Data Services, add a permission to the DICOM service by searching for **Azure API for DICOM** under **APIs my organization** uses. 

   Screenshot of Search API permissions page with the APIs my organization uses tab selected.

   The search result for Azure API for DICOM appears only if you already deployed the DICOM service in the workspace.

   If you're referencing a different resource application, select your DICOM API Resource Application Registration that you created previously under **APIs my organization**.

1. Select scopes (permissions) that the confidential client application asks for on behalf of a user. Select **Dicom.ReadWrite**, and then select **Add permissions**.

   Screenshot of scopes (permissions) that the client application asks for on behalf of a user.


If you're using Azure Health Data Services, adding API permissions to the FHIR service is optional because the FHIR service supports both user delegated permission and application permission. If your application scenario requires application permission, which is used when the application runs without a signed-in user, search for **Azure API for FHIR** under **APIs my organization** uses, and then select the required permissions.

>**Note:**
>Use `grant_type` of `client_credentials` when getting an access token for the FHIR service by using tools such as REST Client. For more information, see [Accessing Azure Health Data Services using the REST Client Extension in Visual Studio Code](fhir/using-rest-client.md).
>>Use `grant_type` of `client_credentials` or `authentication_code` when getting an access token for the DICOM service. For more information, see [Using DICOM with cURL](dicom/dicomweb-standard-apis-curl.md).

## Next step

> 
> [Configure Azure RBAC for Azure Health Data Services](configure-azure-rbac.md)



> **Note:**
> FHIR&reg; is a registered trademark of [HL7](https://hl7.org/fhir/) and is used with the permission of HL7. 
>
> [DICOM&reg;](https://www.dicomstandard.org/) is the registered trademark of the National Electrical Manufacturers Association for its Standards publications relating to digital communications of medical information.
