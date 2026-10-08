---
title: Load test authenticated endpoints
description: Learn how to load test authenticated endpoints with Azure Load Testing. Use shared secrets, credentials, or client certificates for load testing applications that require authentication.
author: nandinimurali
ms.author: nandinim
services: load-testing
ms.service: azure-app-testing
ms.topic: how-to 
ms.date: 09/18/2023
ms.custom: template-how-to
---

# Load test secured endpoints with Azure Load Testing

In this article, you learn how to use Azure Load Testing with application endpoints that require authentication. Depending on your application implementation, you might use an access token, user credentials, managed identity or client certificates for authenticating requests.

Azure Load Testing supports the following options for authenticated endpoints:

- [Authenticate with a shared secret or user credentials](#authenticate-with-a-shared-secret-or-credentials)
- [Authenticate with client certificates](#authenticate-with-client-certificates)
- [Authenticate with a managed identity](#authenticate-with-a-managed-identity)

## Prerequisites

* An Azure account with an active subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn) before you begin.
* An Azure load testing resource. To create a load testing resource, see [Create and run a load test](quickstart-create-and-run-load-test.md#create-an-azure-load-testing-resource).

## Authenticate with a shared secret or credentials

In this scenario, the application endpoint requires that you use a shared secret, such as an access token, an API key, or user credentials to authenticate. 

The following diagram shows how to use shared secrets or credentials to authenticate with an application endpoint in your load test. 

Diagram that shows how to use shared-secret authentication with Azure Load Testing.

The flow for authenticating with a shared secret or user credentials is:

1. Securely store the secret or credentials, for example in Azure Key Vault, or the CI/CD secrets store.
1. Reference the secret in the load test configuration.
1. For JMeter-based tests, retrieve the secret value with the `GetSecret` function. For Locust-based tests, retrieve the secret with `getenv` function. Pass the secret value to the application request.

### Securely store the secret 

To avoid storing, and disclosing, security information in the test script, you can securely store secrets in Azure Key Vault or in the CI/CD secrets store.

You can add the security information in a secrets store in either of two ways:

* Add the secret information in Azure Key Vault. Follow the steps in [Parameterize load tests with secrets](how-to-parameterize-load-tests.md) to store a secret and authorize your load testing resource to read its value.

* Add the secret information as a secret in CI/CD ([GitHub Actions secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) or [Azure Pipelines secret variables](https://learn.microsoft.com/azure/devops/pipelines/process/set-secret-variables)).


### Reference the secret in the load test configuration

Before you can retrieve the secret value in the JMeter test script, you have to reference the secret in the load test configuration.

# [Azure portal](#tab/portal)

In the Azure portal, you can reference secrets that are stored in Azure Key Vault. To add and configure a load test secret in the Azure portal:

1. Navigate to your load testing resource in the Azure portal, and then select **Tests** to view the list of load tests.

1. Select your test from the list, and then select **Edit** to edit the load test configuration.

    Screenshot that shows how to edit a load test in the Azure portal.

1. On the **Parameters** tab, enter the details of the secret.

    | Field | Value |
    | --- | --- |
    | **Name** | Name of the secret. You provide this name to the `GetSecret` function to retrieve the secret value in the test script. |
    | **Value** | Matches the Azure Key Vault **Secret identifier**. |

    Screenshot that shows how to add secrets to a load test in the Azure portal.

1. Select **Apply**, to save the load test configuration changes.
    
# [GitHub Actions](#tab/github)

To add a secret to your load test in GitHub Actions, update the GitHub Actions workflow YAML file. In the workflow, add a `secrets` parameter to the `azure/load-testing` action. 

| Field | Value |
| --- | --- |
| **name** | Name of the secret. You provide this name to the `GetSecret` function to retrieve the secret value in the test script. |
| **value** | References the GitHub Actions secret name. |

The following code snippet gives an example of how to configure a load test secret in GitHub Actions.

```yaml
- name: 'Azure Load Testing'
    uses: azure/load-testing@v1
    with:
    loadtestConfigFile: 'SampleApp.yaml'
    loadtestResource: 'MyTest'
    resourceGroup: 'loadtests-rg'
    secrets: |
        [
            {
            "name": "appToken",
            "value": "${{ secrets.APP_TOKEN }}"
            }
        ]
```

# [Azure Pipelines](#tab/pipelines)
    
To add a secret to your load test in Azure Pipelines, update the Azure Pipelines definition file. In the pipeline, add a `secrets` parameter to the `AzureLoadTest` task. 

| Field | Value |
| --- | --- |
| **name** | Name of the secret. You provide this name to the `GetSecret` function to retrieve the secret value in the test script. |
| **value** | References the Azure Pipelines secret variable name. |

The following code snippet gives an example of how to configure a load test secret in Azure Pipelines.

```yaml
- task: AzureLoadTest@1
    inputs:
    azureSubscription: 'MyAzureLoadTestingRG'
    loadTestConfigFile: 'SampleApp.yaml'
    loadTestResource: 'MyTest'
    resourceGroup: 'loadtests-rg'
    secrets: |
        [
            {
            "name": "appToken",
            "value": "$(appToken)"
            }
        ]
```
---

### Retrieve and use the secret value in the JMeter script

You can now retrieve the secret value in the JMeter script by using the `GetSecret` custom function and pass it to the application request. For example, use an `Authorization` HTTP header to pass an OAuth token to a request. 

1. Create a user-defined variable that retrieves the secret value with the `GetSecret` custom function:

    The `GetSecret` function abstracts retrieving the value from either Azure Key Vault or the CI/CD secrets store.

    Screenshot that shows how to add a user-defined variable that uses the GetSecret function in JMeter.

1. Update the JMeter sampler component to pass the secret in the request.

    For example, to provide an OAuth2 access token, you configure the `Authorization` HTTP header by adding an `HTTP Header Manager`:

    Screenshot that shows how to add an authorization header to a request in JMeter.

### Retrieve and use the secret value in the Locust script

You can now retrieve the secret value in the Locust script and pass it to the application request. For example, use an `Authorization` HTTP header to pass an OAuth token to a request. 

The secrets configured in the load test configuration are accessible as environment variables. 

1. Initialize a variable with the secret value using the secret *Name* specified in the load test configuration. 

```Python
my_secret = os.getenv("appToken")
```

1. Reference the variable in your test script to use the secret value stored in Azure KeyVault. 

## Authenticate with client certificates

In this scenario, the application endpoint requires that you use a client certificate to authenticate. Azure Load Testing supports Public Key Certificate Standard #12 (PKCS12) type of certificates. You can also [use multiple client certificates](how-to-use-multiple-certificates.md) in a load test.

The following diagram shows how to use a client certificate to authenticate with an application endpoint in your load test.

Diagram that shows how to use client-certificate authentication with Azure Load Testing.

The flow for authenticating with client certificates is:

1. Securely store the client certificate in Azure Key Vault.
1. Reference the certificate in the load test configuration.
1. For JMeter-based tests, Azure Load Testing transparently passes the certificate to all application. For Locust-based tests, you can retrieve the certificate in your test script and pass it to the requests. 

### Store the client certificate in Azure Key Vault

To avoid storing, and disclosing, the client certificate alongside the JMeter script, you store the certificate in Azure Key Vault.

Follow the steps in [Import a certificate](https://learn.microsoft.com/azure/key-vault/certificates/tutorial-import-certificate) to store your certificate in Azure Key Vault.

> **Important:**
> Azure Load Testing only supports PKCS12 certificates. Upload the client certificate in PFX file format.

### Grant access to your Azure key vault


When you store load test secrets or certificates in Azure Key Vault, your load testing resource uses a [managed identity](how-to-use-a-managed-identity.md) for accessing the key vault. After you configure the manage identity, you need to grant the managed identity of your load testing resource permissions to read these values from the key vault.

To grant your Azure load testing resource permissions to read secrets or certificates from your Azure Key Vault:

1. In the [Azure portal](https://portal.azure.com/), go to your Azure Key Vault resource.

    If you don't have a key vault, follow the instructions in [Azure Key Vault quickstart](https://learn.microsoft.com/azure/key-vault/secrets/quick-create-cli) to create one.

1. On the left pane, select **Access Policies**, and then select **+ Create**.

1. On the **Permissions** tab, under **Secret permissions**, select **Get**, and then select **Next**.

    > **Note:**
    > Azure Load Testing retrieves certificates as a *secret* to ensure that the private key for the certificate is available.

1. On the **Principal** tab, search for and select the managed identity for the load testing resource, and then select **Next**. 

    If you're using a system-assigned managed identity, the managed identity name matches that of your Azure load testing resource.

1. Select **Next** again.

    When your test runs, the managed identity that's associated with your load testing resource can now read the secrets or certificates for your load test from your key vault.


### Reference the certificate in the load test configuration

To pass the client certificate to application requests, you need to reference the certificate in the load test configuration.

# [Azure portal](#tab/portal)

To add a client certificate to your load test in the Azure portal:

1. Navigate to your load testing resource in the Azure portal. If you don't have a load test yet, [create a new load test using a JMeter script](how-to-create-and-run-load-test-with-jmeter-script.md).
1. On the left pane, select **Tests** to view the list of load tests.
1. Select your test from the list, and then select **Edit**, to edit the load test configuration.

    Screenshot that shows how to edit a load test in the Azure portal.

1. On the **Parameters** tab, enter the details of the certificate.

    | Field | Value |
    | --- | --- |
    | **Name** | Name of the certificate. |
    | **Value** | Matches the Azure Key Vault **Secret identifier** of the certificate. |

1. Select **Apply**, to save the load test configuration changes.

# [GitHub Actions](#tab/github)

To add a client certificate for your load test, update the `certificates` property in the [load test YAML configuration file](reference-test-config-yaml.md).

| Field | Value |
| --- | --- |
| **name** | Name of the client certificate. |
| **value** | Matches the Azure Key Vault **Secret identifier** of the certificate. |

```yml
certificates:
    - name: <my-certificate-name>
      value: <my-keyvault-secret-ID>
```

# [Azure Pipelines](#tab/pipelines)

To add a client certificate for your load test, update the `certificates` property in the [load test YAML configuration file](reference-test-config-yaml.md).

| Field | Value |
| --- | --- |
| **name** | Name of the client certificate. |
| **value** | Matches the Azure Key Vault **Secret identifier** of the certificate. |

```yml
certificates:
    - name: <my-certificate-name>
      value: <my-keyvault-secret-ID>
```
---

When you run your load test, Azure Load Testing retrieves the client certificate from Azure Key Vault, and automatically injects it in each JMeter web request. 

For Locust-based tests, you can retrieve the certificate and use it in your tests script. The certificate configured in the load test configuration are available in the `ALT_CERTIFICATES_DIR`. 

```Python
cert_dir = os.getenv("ALT_CERTIFICATES_DIR")

key_path = "client.key.pem"
crt_path = "client.crt.pem"


@events.test_start.add_listener
def on_test_start(environment, **kwargs):
    pfx_path = open(os.path.join(cert_dir, "cert_name_in_keyvault.pfx"))

    # Generate the private key
    subprocess.check_output(
        f'openssl pkcs12 -in "{pfx_path}" -out "{key_path}" -nocerts -nodes -passin pass:',
        shell=True,
        stderr=subprocess.STDOUT,
    )

    # Generate the public certificate
    subprocess.check_output(
        f'openssl pkcs12 -in "{pfx_path}" -out "{crt_path}" -clcerts -nokeys -passin pass:',
        shell=True,
        stderr=subprocess.STDOUT,
    )
```

## Authenticate with a managed identity

In this scenario, the application endpoint requires that you [use a managed identity to authenticate](https://learn.microsoft.com/entra/architecture/service-accounts-managed-identities). You can use both system-assigned and user-assigned managed identities. 

The flow for authenticating using a managed identity is:

1. Assign the managed identity that the target endpoint identifies to the Azure Load Testing resource. 
1. Select the managed identity in the load test configuration.

You need to set up your load tests script to [fetch access token using managed identity](https://learn.microsoft.com/entra/identity/managed-identities-azure-resources/how-to-use-vm-token#get-a-token-using-http) and to use the token to authenticate the requests to the target endpoint. For example, you can get a token through an HTTP REST call to the Azure Instance Metadata Service (IMDS) endpoint and then pass the token to a request using the  `Authorization` HTTP header.  

### Assign the managed identity  

Assign the managed identity that has the required access to the target endpoint to your Azure Load Testing resource. When you run the test, Azure Load Testing assigns this identity to the engine instances. This ensures that your requests to fetch access tokens using the managed identity are successful.  

You can use either a system-assigned managed identity or a user-assigned managed identity, 

* To use a system-assigned managed identity, first [assign a system-assigned managed identity](https://learn.microsoft.com/azure/load-testing/how-to-use-a-managed-identity?tabs=azure-portal#assign-a-system-assigned-identity-to-a-load-testing-resource) to your Azure Load Testing resource. Once it is enabled, provide the required RBAC permissions for this identity on the target endpoint. 

* To use a user-assigned managed identity, first [assign the user-assigned identity](https://learn.microsoft.com/azure/load-testing/how-to-use-a-managed-identity?tabs=azure-portal#assign-a-user-assigned-identity-to-a-load-testing-resource) to your Azure Load Testing resource. If this identity does not have the required RBAC permissions on the target endpoint, provide the required permissions. If your test script uses multiple user-assigned multiple identities, assign the multiple identities to your resource and ensure that they have the required RBAC permissions. 

### Select the managed identity in the load test configuration

Select the required managed identity when you create or edit a test in Azure Load Testing. 

# [Azure portal](#tab/portal)

To select and configure a managed identity for authentication in the Azure portal:

1. Navigate to your load testing resource in the Azure portal, and then select **Tests** to view the list of load tests.

1. Select your test from the list, and then select **Edit** to edit the load test configuration.

    Screenshot that shows how to edit a load test in the Azure portal.

1. On the **Test plan** tab, configure the **Managed identity for authentication scenarios**. Select 'System-assigned identity' or 'User-assigned identity' as required.

    Screenshot that shows how to select managed identity for authentication in a load test in the Azure portal.

1. If you selected 'User-assigned identity', select the required identities from the **User-assigned identity** dropdown. 
   
1. Select **Apply**, to save the load test configuration changes.
    
# [GitHub Actions](#tab/github)

To add a managed identity for authentication in your load test in GitHub Actions, update the GitHub Actions workflow YAML file. 

The following code snippet gives an example of how to configure a managed identity for authentication in GitHub Actions.

```yaml
- name: 'Azure Load Testing'
    uses: azure/load-testing@v1
    with:
    loadtestConfigFile: 'SampleApp.yaml'
    loadtestResource: 'MyTest'
    resourceGroup: 'loadtests-rg'
    referenceIdentities:
        - kind: "Engine"
          type: "user-assigned"
          identity: /subscriptions/abcdef01-2345-6789-0abc-def012345678/resourceGroups/sample-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/sample-identity
```

# [Azure Pipelines](#tab/pipelines)
    
To add a managed identity for authentication in your load test in Azure Pipelines, update the Azure Pipelines definition file. 

The following code snippet gives an example of how to configure a managed identity for authentication in Azure Pipelines.

```yaml
- task: AzureLoadTest@1
    inputs:
    azureSubscription: 'MyAzureLoadTestingRG'
    loadTestConfigFile: 'SampleApp.yaml'
    loadTestResource: 'MyTest'
    resourceGroup: 'loadtests-rg'
    referenceIdentities:
        - kind: "Engine"
          type: "user-assigned"
          identity: /subscriptions/abcdef01-2345-6789-0abc-def012345678/resourceGroups/sample-rg/providers/Microsoft.ManagedIdentity/userAssignedIdentities/sample-identity
```
---
> **Important:**
> [Load distribution across regions](how-to-generate-load-from-multiple-regions.md) is not enabled when you use managed identities for authentication. 
   
## Related content

* Learn more about [how to parameterize a load test](how-to-parameterize-load-tests.md).

* Learn more about [using multiple certificates in a load test](how-to-use-multiple-certificates.md).
