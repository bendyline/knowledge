---
title: Use Azure Active Directory B2C to grant access to the FHIR service in Azure Health Data Services
description: Learn how to use Azure AD B2C with the FHIR service to enable access to healthcare applications and users.
services: healthcare-apis
author: namalu
ms.service: azure-health-data-services
ms.subservice: fhir
ms.topic: tutorial
ms.date: 05/21/2025
ms.author: namalu
ms.custom:
  - sfi-image-nochange
  - sfi-ga-nochange
---

# Use Azure Active Directory B2C to grant access to the FHIR service


> **Important:**
> Effective May 1, 2025, Azure AD B2C will no longer be available to purchase for new customers. [Learn more in our FAQ](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/faq.yml#azure-ad-b2c-end-of-sale).

> **Note:**
> This article details how to use Azure AD B2C, which is no longer available to purchase for new customers. Please refer to the article [Use Microsoft Entra External ID to grant access to the FHIR service](azure-entra-external-id-setup.md) for information on using Microsoft Entra External ID as an identity provider for the FHIR service.

The FHIR service is secured by Microsoft Entra ID. In addition, healthcare organizations can choose to also use [Azure Active Directory B2C](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/overview.md) (Azure AD B2C) with the FHIR&reg; service in Azure Health Data Services to grant access to their applications and users via third party identity providers. 

## Create an Azure AD B2C tenant for the FHIR service

Creating an Azure AD B2C tenant for the FHIR service sets up a secure infrastructure for managing user identities in your healthcare applications. 

If you already created an Azure AD B2C tenant, you can skip to [Deploy the FHIR service with Azure AD B2C](#deploy-the-fhir-service-with-azure-active-directory-b2c-as-the-identity-provider). 

#### Deploy an Azure AD B2C tenant by using an ARM template

Use PowerShell or Azure CLI to deploy the [ARM template](https://raw.githubusercontent.com/Azure-Samples/azure-health-data-and-ai-samples/main/samples/fhir-aad-b2c/b2c-arm-template.json) programmatically to an Azure subscription. For more information about syntax, properties, and usage of the template, see [Deploy an instance of Azure Active Directory B2C](https://learn.microsoft.com/azure/templates/microsoft.azureactivedirectory/b2cdirectories?pivots=deployment-language-arm-template). 

Run the code in Azure Cloud Shell or in PowerShell locally in Visual Studio Code to deploy the FHIR service to the Azure AD B2C tenant.

#### [PowerShell](#tab/powershell)

1. Use `Connect-AzAccount` to sign in to Azure. After you sign in, use `Get-AzContext` to verify the subscription and tenant you want to use. Change the subscription and tenant if needed.

1. Create a new resource group (or use an existing one) by skipping the "create resource group" step, or commenting out the line starting with `New-AzResourceGroup`.

```PowerShell
### variables
$tenantid="your tenant id"
$subscriptionid="your subscription id"
$resourcegroupname="your resource group name"
$b2cName="your b2c tenant name"

### login to azure
Connect-AzAccount -Tenant $tenantid -SubscriptionId $subscriptionid 

### create resource group
New-AzResourceGroup -Name $resourcegroupname -Location $region

### deploy the resource
New-AzResourceGroupDeployment -ResourceGroupName $resourcegroupname -TemplateUri https://raw.githubusercontent.com/Azure-Samples/azure-health-data-and-ai-samples/main/samples/fhir-aad-b2c/b2c-arm-template.json -b2cName $b2cNa
```

#### [Azure CLI](#tab/command-line)

1. Use `Connect-AzAccount` to sign in to Azure. After you sign in, use `az account show --output table` to verify the subscription and tenant you want to use. Change the subscription and tenant if needed.

1. Create a new resource group (or use an existing one) by skipping the "create resource group" step or commenting out the line starting with `az group create`.

```bash
### variables
tenantid=your tenant id
subscriptionid=your subscription id
resourcegroupname=your resource group name
b2cName=your b2c tenant name

### login to azure
az login
az account show --output table
az account set --subscription $subscriptionid

### create resource group
az group create --name $resourcegroupname --location $region

### deploy the resource
az deployment group create --resource-group $resourcegroupname --template-uri https://raw.githubusercontent.com/Azure-Samples/azure-health-data-and-ai-samples/main/samples/fhir-aad-b2c/b2c-arm-template.json --parameters b2cName=$b2cName
```

---

#### Add a test B2C user to the Azure AD B2C tenant

You need a test B2C user to associate with a specific patient resource in the FHIR service, and to verify that the authentication flow works as expected. 

1. In the Azure portal, go to the B2C resource. Choose **Open B2C Tenant**.

   Screenshot showing a B2C resource.

2. On the left pane, choose **Users**.

   Screenshot showing home user.

3. Choose **+ New user**.

   Screenshot showing adding new user.

#### Link a B2C user with the `fhirUser` custom user attribute

The `fhirUser` custom user attribute is used to link a B2C user with a user resource in the FHIR service. In this example, a user named **Test Patient1** is created in the B2C tenant. In a later step a [patient](https://www.hl7.org/fhir/patient.html) resource is created in the FHIR service. The **Test Patient1** user is linked to the patient resource by setting the `fhirUser` attribute value to the patient resource identifier. For more information about custom user attributes, see [User flow custom attributes in Azure Active Directory B2C](https://learn.microsoft.com/azure/active-directory-b2c/user-flow-custom-attributes?pivots=b2c-user-flow).

1. On the **Azure AD B2C** page in the left pane, choose **User attributes**.

1. Choose **+ Add**.

1. In the **Name** field, enter **fhirUser** (case-sensitive).

1. From the **Data Type** dropdown list, select **String**.

1. Choose **Create**.

   Screenshot showing B2C attribute.

#### Create a new B2C user flow

User flows define the sequence of steps users must follow to sign in. In this example, a user flow is defined so that when a user signs in and the access token provided includes the `fhirUser` claim. For more information, see [Create user flows and custom policies in Azure Active Directory B2C](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/tutorial-create-user-flows.md).

1. On the **Azure AD B2C** page in the left pane, choose **User flows**.

1. Choose **+ New user flow**.

   Screenshot showing B2C user flow.

1. Give the user flow a name unique to the B2C tenant. The name doesn't have to be globally unique. In this example, the name of the user flow is **USER_FLOW_1**. Make note of the name.

1. Make sure **Email signin** is enabled for local accounts so that the test user can sign in and obtain an access token for the FHIR service.

   Screenshot showing B2C user flow configuration.

1. On the **Create a user flow** page, scroll to section **5. Application Claims**, and then select **Show more...** to show a list of all available claims. 

1. Select the **fhirUser** claim. 

1. Choose **Ok**. 

1. Choose **Create**.

   Screenshot showing B2C user flow configuration with FHIR user claim.

#### Create a new B2C resource application

The B2C resource application handles authentication requests from your healthcare application to Azure Active Directory B2C. 

1. On the **Azure AD B2C** page in the left pane, choose **App registrations**.

1. Choose **+ New registration**.

   Screenshot showing B2C new application.

1. Enter a display name. This example uses **FHIR Service**.

1. In the **Supported account types** list, choose **Accounts in any identity provider or organizational directory (for authenticating users with user flows)**.

1. In the **Redirect URI (recommended)** drop-down list, select ***Public client/native (mobile & desktop)**. Populate the value with the callback URI. This callback URI is for testing purposes. 

1. In the **Permissions** section, select **Grant admin consent to openid and offline_access permissions**.

1. Choose **Register**. Wait for the application registration to complete. The browser automatically navigates to the application **Overview** page.

   Screenshot showing B2C application register.

#### Configure API permissions for the app 
1. On the **App registrations page** in the left pane, choose **Manifest**. 

1. Scroll until you find the `oauth2PermissionScopes` array in `Microsoft Graph App Manifest (New)` tab. Replace the array with one or more values in the [oauth2Permissions.json](https://raw.githubusercontent.com/Azure-Samples/azure-health-data-and-ai-samples/main/samples/fhir-aad-b2c/oauth2Permissions.json) file. Copy the entire array or individual permissions. 
 
   If you add a permission to the list, any user in the B2C tenant can obtain an access token with the API permission. If a level of access isn't appropriate for a user within the B2C tenant, don't add it to the array because there isn't a way to limit permissions to a subset of users.

1. After the **oauth2PermissionScopes** array is populated, choose **Save**.

   Screenshot showing B2C application manifest.

#### Expose the web API and assign an application ID URI

1. On the **App registrations page** in the left pane, choose **Expose an API**. 

1. Choose **Add**. 

1. By default, the **Application ID URI** field is populated with the application (client) ID. Change the value if desired. In this example, the value is **fhir**.

1. Choose **Save**.

   Screenshot showing B2C application API.

1. On the **App registrations page** in the left pane, choose **API permissions**.

1. Choose  **+ Add a permission**.

   Screenshot showing B2C API permission.

1. On the **Request API permissions** pane, select **APIs my organization uses**.

1. Select the resource application from the list.

   Screenshot showing B2C API permissions with APIs used.

1. On the **Request API permissions** pane in the **Patient** section, select at least one permission. In this example, the permission `patient.all.read` is selected, which means a user that requests an access token with the scope `patient.all.read` has Read privileges (patient.all.**read**) for all FHIR resources (patient.**all**.read) in the Patient compartment (**patient**.all.read) For more information, see [Patient compartment](https://build.fhir.org/compartmentdefinition-patient.html).

1. Choose **Add permissions**.

   Screenshot showing B2C API permissions with permissions added.

1. On the **API permissions** page in the **Configured permissions** section, choose **Grant admin consent**.

   Screenshot showing B2C API permissions for admin consent.

## Deploy the FHIR service with Azure Active Directory B2C as the identity provider

Deploying the FHIR service with Azure Active Directory B2C as the identity provider allows the FHIR service to authenticate users based on their Azure AD B2C credentials, ensuring that only authorized users can access sensitive patient information

#### Obtain the B2C authority and client ID 

Use the **authority** and **client ID** (or application ID) parameters to configure the FHIR service to use an Azure AD B2C tenant as an identity provider.

1. Create the authority string by using the name of the B2C tenant and the name of the user flow.

   ```http
   https://<YOUR_B2C_TENANT_NAME>.b2clogin.com/<YOUR_B2C_TENANT_NAME>.onmicrosoft.com/<YOUR_USER_FLOW_NAME>/v2.0
   ```

2. Test the authority string by making a request to the `.well-known/openid-configuration` endpoint. Enter the string into a browser to confirm it navigates to the OpenId Configuration JSON file. If the OpenId Configuration JSON fails to load, make sure the B2C tenant name and user flow name are correct.
  
   ```http
   https://<YOUR_B2C_TENANT_NAME>.b2clogin.com/<YOUR_B2C_TENANT_NAME>.onmicrosoft.com/<YOUR_USER_FLOW_NAME>/v2.0/.well-known/openid-configuration
   ```

3. Retrieve the client ID from the resource application overview page.

   Screenshot showing B2C application overview page.

#### Deploy the FHIR service by using an ARM Template

Use an [ARM template](https://raw.githubusercontent.com/Azure-Samples/azure-health-data-and-ai-samples/main/samples/fhir-aad-b2c/fhir-service-arm-template.json) to simplify deploying the FHIR service. Use PowerShell or Azure CLI to deploy the ARM template to an Azure subscription.

Run the code in Azure Cloud Shell or in PowerShell locally in Visual Studio Code to deploy the FHIR service to the Azure AD B2C tenant.

#### [PowerShell](#tab/powershell)

1. Use `Connect-AzAccount` to sign in to Azure. Use `Get-AzContext` to verify the subscription and tenant you want to use. Change the subscription and tenant if needed.

1. Create a new resource group (or use an existing one) by skipping the "create resource group" step, or commenting out the line starting with `New-AzResourceGroup`.

```PowerShell
### variables
$tenantid="your tenant id"
$subscriptionid="your subscription id"
$resourcegroupname="your resource group name"
$region="your desired region"
$workspacename="your workspace name"
$fhirServiceName="your fhir service name"
$smartAuthorityUrl="your authority (from previous step)"
$smartClientId="your client id (from previous step)"

### login to azure
Connect-AzAccount 
#Connect-AzAccount SubscriptionId $subscriptionid
Set-AzContext -Subscription $subscriptionid
Connect-AzAccount -Tenant $tenantid -SubscriptionId $subscriptionid
#Get-AzContext 

### create resource group
New-AzResourceGroup -Name $resourcegroupname -Location $region

### deploy the resource
New-AzResourceGroupDeployment -ResourceGroupName $resourcegroupname -TemplateUri https://raw.githubusercontent.com/Azure-Samples/azure-health-data-and-ai-samples/main/samples/fhir-aad-b2c/fhir-service-arm-template.json -tenantid $tenantid -region $region -workspaceName $workspacename -fhirServiceName $fhirservicename -smartAuthorityUrl $smartAuthorityUrl -smartClientId $smartClientId
```

#### [Azure CLI](#tab/command-line)

1. Use `az login` to sign in to Azure. Use `az account show --output table` to verify the subscription and tenant you want to use. Change the subscription and tenant if needed.

1. Create a new resource group (or use an existing one) by skipping the "create resource group" step, or commenting out the line starting with `az group create`.

```bash
### variables
tenantid=your tenant id
subscriptionid=your subscription id
resourcegroupname=your resource group name
region=your desired region
workspacename=your workspace name
fhirServiceName=your fhir service name
smartAuthorityUrl=your authority (from previous step)
smartClientId=your client id (from previous step)

### login to azure
az login
az account show --output table
az account set --subscription $subscriptionid

### create resource group
az group create --name $resourcegroupname --location $region

### deploy the resource
az deployment group create --resource-group $resourcegroupname --template-uri https://raw.githubusercontent.com/Azure-Samples/azure-health-data-and-ai-samples/main/samples/fhir-aad-b2c/fhir-service-arm-template.json --parameters tenantid=$tenantid region=$region workspaceName=$workspacename fhirServiceName=$fhirservicename smartAuthorityUrl=$smartAuthorityUrl storageAccountConfirm=$smartClientId
```

---

## Validate Azure AD B2C users are able to access FHIR resources

The validation process involves creating a patient resource in the FHIR service, linking the patient resource to the Azure AD B2C user, and configuring REST Client to get an access token for B2C users. After the validation process is complete, you can fetch the patient resource by using the B2C test user.

#### Use REST Client to get an access token

For steps to obtain the proper access to the FHIR service, see [Access the FHIR service using REST Client](using-rest-client.md).

When you follow the steps in the [Get the FHIR patient data](using-rest-client.md#get-fhir-patient-data) section, the request returns an empty response because the FHIR service is new and doesn't have any patient resources.

#### Create a patient resource in the FHIR service

It's important to note that users in the B2C tenant aren't able to read any resources until the user (such as a patient or practitioner) is linked to a FHIR resource. A user with the `FhirDataWriter` or `FhirDataContributor` role in the Microsoft Entra ID where the FHIR service is tenanted must perform this step.

1. Create a patient with a specific identifier by changing the method to `PUT` and executing a request to `{{fhirurl}}/Patient/1` with this body:

  ```json
  {
      "resourceType": "Patient",
      "id": "1",
      "name": [
          {
              "family": "Patient1",
              "given": [
                  "Test"
              ]
          }
      ]
  }
```

2. Verify the patient is created by changing the method back to `GET` and verifying that a request to `{{fhirurl}}/Patient` returns the newly created patient.

#### Link the patient resource to the Azure AD B2C user

Create an explicit link between the test user in the B2C tenant and the resource in the FHIR service. Create the link by using Extension Attributes in Microsoft Graph. For more information, see [Define custom attributes in Azure Active Directory B2C](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/user-flow-custom-attributes.md).

1. Go to the B2C tenant. On the left pane, choose **App registrations**.

1. Select **All applications**.

1. Select the application with the prefix **b2c-extensions-app**.

   Screenshot showing B2C app list.

1. Note the Application (client) ID value.

   Screenshot showing B2C extensions app.

1. Navigate back to the B2C tenant home page, on the left pane select **Users**.

   Screenshot showing B2C home user.

1. Select **Test Patient1**.

   Screenshot showing B2C user list.

1. Note the **Object ID** value.

   Screenshot showing B2C user ID.

1. Open [Microsoft Graph Explorer](https://developer.microsoft.com/graph/graph-explorer). Sign in with a user assigned to the Global Administrator role for the B2C tenant. (It's a good idea to create a new admin user in the B2C tenant to manage users in the tenant.)

   Screenshot showing Graph login.

1. Select the avatar for the user, and then choose **Consent to permissions**.

   Screenshot showing Graph consent for test user.

1. Scroll to **User**. Consent to User.ReadWrite.All. This permission allows you to update the **Test Patient1** user with the `fhirUser` claim value.

   Screenshot showing Graph consent for fhirUser claim.

1. After the consent process completes, update the user. You need the b2c-extensions-app application (client) ID and the user Object ID.

   - Change the method to `PATCH`.
   
   - Change the URL to [https://graph.microsoft.com/v1.0/users/{USER_OBJECT_ID}](#link-the-patient-resource-to-the-azure-ad-b2c-user).
   
   - Create the `PATCH` body. A `PATCH` body is a single key-value-pair, where the key format is `extension_{B2C_EXTENSION_APP_ID_NO_HYPHENS}_fhirUser` and the value is the fully qualified FHIR resource ID for the patient `https://{YOUR_FHIR_SERVICE}.azurehealthcareapis.com/Patient/1"`.

   For more information, see [Manage extension attributes through Microsoft Graph](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory-b2c/user-flow-custom-attributes.md).

1. After the request is formatted, choose **Run query**. Wait for a successful response that confirms the user in the B2C tenant is linked to the patient resource in the FHIR service.

   Screenshot showing Graph patch.

#### Configuration to obtain an access token for B2C users

Obtain an access token to test the authentication flow. 

>**Note:** 
>The `grant_type` of `authorization_code` is used to obtain an access token.
>There are tools available online offering intuitive interfaces for API testing and development.

1. Launch the API testing application.

1. Select the **Authorization** tab in the tool.

1. In the **Type** dropdown list, select **OAuth 2.0**.

1. Enter the following values.

   - **Callback URL**. This value is configured when the B2C resource application is created.

   - **Auth URL**. This value can be created using the name of the B2C tenant and the name of the user flow.

      ```http
      https://{YOUR_B2C_TENANT_NAME}.b2clogin.com/{YOUR_B2C_TENANT_NAME}.onmicrosoft.com/{YOUR_USER_FLOW_NAME}/oauth2/v2.0/authorize
      ```

   - **Access Token URL**. This value can be created using the name of the B2C tenant and the name of the user flow.

      ```http
      https://{YOUR_B2C_TENANT_NAME}.b2clogin.com/{YOUR_B2C_TENANT_NAME}.onmicrosoft.com/{YOUR_USER_FLOW_NAME}/oauth2/v2.0/token
      ```

   - **Client ID**. This value is the application (client) ID of the B2C resource application.

      ```http
      {YOUR_APPLICATION_ID}
      ```

   - **Scope**. This value is defined in the B2C resource application in the **Expose an API** section. The scope granted permission is `patient.all.read`. The scope request must be a fully qualified URL, for example, `https://testb2c.onmicrosoft.com/fhir/patient.all.read`. 

1. Copy the fully qualified scope from the **Expose an API** section of the B2C resource application.

      ```http
      {YOUR_APPLICATION_ID_URI}/patient.all.read
      ```

#### Fetch the patient resource by using the B2C user

Verify that Azure AD B2C users can access FHIR resources.

1. When the authorization configuration is set up to launch the B2C user flow, choose **Get New Access Token** to get an access token.

1. Use the **Test Patient** credentials to sign in.

1. Copy the access token and use it in fetching the Patient data

Follow the steps in the [Get the FHIR patient data](using-rest-client.md#get-fhir-patient-data) to fetch the patient resource.

1. Set the method to `GET`, enter the fully qualified FHIR service URL, and then add the path `/Patient`.

1. Use the fetched token in the authorization parameter.

1. Choose **Send Request**.

1. Verify that the response contains the single patient resource.

## Next steps

[Configure multiple identity providers](configure-identity-providers.md)

[Troubleshoot identity provider configuration](troubleshoot-identity-provider-configuration.md)


> **Note:**
> FHIR&reg; is a registered trademark of [HL7](https://hl7.org/fhir/) and is used with the permission of HL7.
