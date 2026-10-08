---
title: Deploy Geospatial Consumption Zone on Azure Kubernetes Service on top of Azure Data Manager for Energy
description: Learn how to deploy Geospatial Consumption Zone on Azure Kubernetes Service on top of your Azure Data Manager for Energy instance.
ms.service: azure-data-manager-energy
ms.custom: devx-track-azurecli
ms.topic: how-to
ms.author: eihaugho
author: EirikHaughom
ms.date: 03/13/2026
---

# Deploy Geospatial Consumption Zone (GCZ) on Azure Kubernetes Service (AKS)

The OSDU Geospatial Consumption Zone (GCZ) is a service that enables enhanced management and utilization of geospatial data. The GCZ streamlines the handling of location-based information. It abstracts away technical complexities, allowing software applications to access geospatial data without needing to deal with intricate details. By providing ready-to-use map services, the GCZ facilitates seamless integration with OSDU-enabled applications.

This guide shows you how to deploy the Geospatial Consumption Zone (GCZ) service integrated with Azure Data Manager for Energy (ADME).

---

## Prerequisites

- Azure Subscription. If you don't have an Azure subscription, create a [free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Azure Key Vault](https://learn.microsoft.com/azure/key-vault/general/quick-create-portal).
- Azure Kubernetes Cluster (AKS) with virtual network integration. See [Create an Azure Kubernetes Service (AKS) cluster](https://learn.microsoft.com/azure/aks/tutorial-kubernetes-deploy-cluster) and [Azure Container Networking Interface (CNI) networking](https://learn.microsoft.com/azure/aks/azure-cni-overview) for further instructions.
- [Azure Cloud Shell](https://learn.microsoft.com/azure/cloud-shell/overview) or [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli), kubectl, and Git CLI.

## Create an App Registration in Microsoft Entra ID

To deploy the GCZ, you would need to create an App Registration in Microsoft Entra ID. The App Registration is used to authenticate the GCZ APIs with Azure Data Manager for Energy to be able to generate the cache of the geospatial data.

1. See [Create an App Registration in Microsoft Entra ID](https://learn.microsoft.com/azure/active-directory/develop/quickstart-register-app) for instructions on how to create an App Registration.

1. Grant the App Registration permission to read the relevant data in Azure Data Manager for Energy. See [How to add members to an OSDU group](how-to-manage-users.md#add-members-to-an-osdu-group-in-a-data-partition) for further instructions.

## Deploy Geospatial Consumption Zone (GCZ) HELM Chart

1. Clone the GCZ repository to your local environment:

   ```bash
   git clone https://community.opengroup.org/osdu/platform/consumption/geospatial.git
   ```

2. Change directory to the `geospatial` folder:

   ```bash
   cd geospatial/devops/azure/charts/geospatial
   ```

3. Define variables for the deployment:

   ### [Unix Shell](#tab/unix-shell)

   ```bash
   # OSDU / Azure Identity Configuration
   export AZURE_DNS_NAME="<YOUR_OSDU_INSTANCE_FQDN>"  # Example: osdu-ship.msft-osdu-test.org
   export AZURE_TENANT_ID="<TENANT_ID_of_target_OSDU_deployment>"   # Entra ID tenant ID. Example: aaaabbbb-0000-cccc-1111-dddd2222eeee
   export AZURE_CLIENT_ID="<CLIENT_ID_of_target_OSDU_deployment>"  # App Registration client ID that was created earlier in `Create an App Registration in Microsoft Entra ID`. Example: 00001111-aaaa-2222-bbbb-3333cccc4444
   export AZURE_CLIENT_SECRET="<CLIENT_SECRET_of_target_OSDU_deployment>"  # App Registration client secret that was created earlier in `Create an App Registration in Microsoft Entra ID`. Example: Aa1Bb~2Cc3.-Dd4Ee5Ff6Gg7Hh8Ii9_Jj0Kk1Ll2
   export CLIENT_SECRET_B64=$(echo -n "$AZURE_CLIENT_SECRET" | base64 -w0)
   export AZURE_APP_ID="<CLIENT_ID_of_the_adme-app-id_for_authentication>" # Client ID of the App Registration that was used to create your ADME instance. Example: 00001111-aaaa-2222-bbbb-3333cccc4444
   export AZURE_KEY_VAULT_URL="<YOUR_AZURE_KEYVAULT_URL>"

   # OAuth Redirect URL
   export CALLBACK_URL="<CALLBACK_URL_configured_in_Entra_ID_App>"  # Example: http://localhost:8080
   export PRIVATE_NETWORK="true"

   # Container Registry + GCZ Images
   export AZURE_ACR="msosdu.azurecr.io"
   export GCZ_PROVIDER_IMAGE_NAME="geospatial-provider"
   export GCZ_PROVIDER_IMAGE_TAG="0.28.2"
   export GCZ_TRANSFORMER_IMAGE_NAME="geospatial-transformer"
   export GCZ_TRANSFORMER_IMAGE_TAG="0.28.2"

   # Istio Configuration (Enable ONLY if Istio exists on AKS)
   export ISTIO_ENABLED="false"
   export ISTIO_GCZ_DNS_HOST="<YOUR_GCZ_ISTIO_HOSTNAME>"   # Example: gcz.contoso.com
   export ISTIO_GATEWAY_NAME="<YOUR_ISTIO_GATEWAY_NAME>"   # Example: istio-system/ingressgateway

   # Data Partition for GCZ
   export DATA_PARTITION_ID="<YOUR_DATA_PARTITION_ID>"  # Example: opendes

   # AKS Deployment Configuration
   export RESOURCE_GROUP="<YOUR_AKS_RESOURCE_GROUP>"
   export AKS_NAME="<YOUR_AKS_CLUSTER_NAME>"
   export NAMESPACE="ignite"  # Recommended default namespace
   export GCZ_IGNITE_SERVICE="osdu-gcz-service-gridgain-headless"  # Default Ignite Service name
   export GCZ_IGNITE_NAMESPACE="$NAMESPACE"

   # Helm Release Settings
   export CHART="osdu-gcz-service"
   export CHART_VERSION="1.28.0"
   export VERSION="0.28.2"

   # GCZ Config Loader JS Absolute Path
   export CONFIG_LOADER_JS_PATH=$(realpath ./../../../../gcz-provider/gcz-provider-core/config/configLoader.js)

   ```

   ### [Windows PowerShell](#tab/windows-powershell)

   ```powershell
   # GCZ Deployment Environment Variables

   # OSDU / Azure Identity Configuration
   $AZURE_DNS_NAME = "<YOUR_OSDU_INSTANCE_FQDN>"  # Example: osdu-ship.msft-osdu-test.org
   $AZURE_TENANT_ID = "<TENANT_ID_of_target_OSDU_deployment>"  # Entra ID tenant ID. Example: aaaabbbb-0000-cccc-1111-dddd2222eeee
   $AZURE_CLIENT_ID = "<CLIENT_ID_of_target_OSDU_deployment>"  # App Registration client ID. Example: 00001111-aaaa-2222-bbbb-3333cccc4444
   $AZURE_CLIENT_SECRET="<CLIENT_SECRET_of_target_OSDU_deployment>"  # App Registration client secret. Example: Aa1Bb~2Cc3.-
   $CLIENT_SECRET_B64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($AZURE_CLIENT_SECRET))
   $AZURE_APP_ID = "<CLIENT_ID_of_the_adme-app-id_for_authentication>" # Client ID of the App Registration that was used to create your ADME instance. Example: 00001111-aaaa-2222-bbbb-3333cccc4444
   $AZURE_KEY_VAULT_URL = "<YOUR_AZURE_KEYVAULT_URL>"

   # OAuth Redirect URL
   $CALLBACK_URL = "<CALLBACK_URL_configured_in_Entra_ID_App>" # Example: http://localhost:8080
   $PRIVATE_NETWORK = "true"

   # Container Registry + GCZ Image Configuration
   $AZURE_ACR = "msosdu.azurecr.io"
   $GCZ_PROVIDER_IMAGE_NAME = "geospatial-provider"
   $GCZ_PROVIDER_IMAGE_TAG = "0.28.2"
   $GCZ_TRANSFORMER_IMAGE_NAME = "geospatial-transformer"
   $GCZ_TRANSFORMER_IMAGE_TAG = "0.28.2"

   # Istio Configuration (Enable ONLY if Istio exists on AKS)
   $ISTIO_ENABLED = "false"
   $ISTIO_GCZ_DNS_HOST = "<YOUR_GCZ_ISTIO_HOSTNAME>"   # Example: gcz.contoso.com
   $ISTIO_GATEWAY_NAME = "<YOUR_ISTIO_GATEWAY_NAME>"   # Example: istio-system/ingressgateway

   # Data Partition
   $DATA_PARTITION_ID = "<YOUR_DATA_PARTITION_ID>"  # Example: opendes

   # AKS Deployment Details
   $RESOURCE_GROUP = "<YOUR_AKS_RESOURCE_GROUP>"
   $AKS_NAME = "<YOUR_AKS_CLUSTER_NAME>"
   $NAMESPACE = "ignite"
   $GCZ_IGNITE_SERVICE = "osdu-gcz-service-gridgain-headless"
   $GCZ_IGNITE_NAMESPACE = $NAMESPACE

   # Helm Release Details
   $CHART = "osdu-gcz-service"
   $CHART_VERSION = "1.28.0"
   $VERSION = "0.28.2"
   ```

   ---

4. Create the HELM chart:

   ### [Unix Shell](#tab/unix-shell)

   ```bash
   cat > osdu_gcz_custom_values.yaml << EOF
   global:
     provider:
       entitlementsGroupsURL: "https://${AZURE_DNS_NAME}/api/entitlements/v2/groups"
       image:
         repository: "$AZURE_ACR"
         name: "$GCZ_PROVIDER_IMAGE_NAME"
         tag: "$GCZ_PROVIDER_IMAGE_TAG"
       gcz_ignite_service: $GCZ_IGNITE_SERVICE
       service:
         port: 8083
         targetPort: 8083
       configuration:
         privateNetwork: "$PRIVATE_NETWORK"
     transformer:
       image:
         repository: "$AZURE_ACR"
         name: "$GCZ_TRANSFORMER_IMAGE_NAME"
         tag: "$GCZ_TRANSFORMER_IMAGE_TAG"
       serviceAccount: "osdu-gcz-service-gridgain"
       service:
         port: 8080
         targetPort: 8080
       configuration:
         dataPartitionId: $DATA_PARTITION_ID
         clientId: $AZURE_CLIENT_ID
         tenantId: $AZURE_TENANT_ID
         callbackURL: $CALLBACK_URL
         keyvaultURL: $AZURE_KEY_VAULT_URL
         searchQueryURL: "https://${AZURE_DNS_NAME}/api/search/v2/query"
         searchCursorURL: "https://${AZURE_DNS_NAME}/api/search/v2/query_with_cursor"
         schemaURL: "https://${AZURE_DNS_NAME}/api/schema-service/v1/schema"
         entitlementsURL: "https://${AZURE_DNS_NAME}/api/entitlements/v2"
         fileRetrievalURL: "https://${AZURE_DNS_NAME}/api/dataset/v1/retrievalInstructions"
         crsconvertorURL: "https://${AZURE_DNS_NAME}/api/crs/converter/v3/convertTrajectory"
         storageURL: "https://${AZURE_DNS_NAME}/api/storage/v2/records"
         partitionURL: "http://partition.osdu-azure/api/partition/v1"
         clientSecret: $CLIENT_SECRET_B64
         gcz_persistence_enabled: true
         azureAppResourceId: $AZURE_APP_ID
         gcz_ignite_service: $GCZ_IGNITE_SERVICE
     istio:
       enabled: $ISTIO_ENABLED
       gateways:
         - istio-system/$ISTIO_GATEWAY_NAME
       cors: {}
       dns_host: ${ISTIO_GCZ_DNS_HOST}
   EOF
   ```

   ### [Windows PowerShell](#tab/windows-powershell)

   ```powershell
   $yamlContent = @"
   global:
     provider:
       entitlementsGroupsURL: "https://$($AZURE_DNS_NAME)/api/entitlements/v2/groups"
       image:
         repository: "$AZURE_ACR"
         name: "$GCZ_PROVIDER_IMAGE_NAME"
         tag: "$GCZ_PROVIDER_IMAGE_TAG"
       gcz_ignite_service: "$GCZ_IGNITE_SERVICE"
       service:
         port: 8083
         targetPort: 8083
       configuration:
         privateNetwork: "$PRIVATE_NETWORK"
     transformer:
       image:
         repository: "$AZURE_ACR"
         name: "$GCZ_TRANSFORMER_IMAGE_NAME"
         tag: "$GCZ_TRANSFORMER_IMAGE_TAG"
       serviceAccount: "osdu-gcz-service-gridgain"
       service:
         port: 8080
         targetPort: 8080
       configuration:
         dataPartitionId: "$DATA_PARTITION_ID"
         clientId: "$AZURE_CLIENT_ID"
         tenantId: "$AZURE_TENANT_ID"
         callbackURL: "$CALLBACK_URL"
         keyvaultURL: "$AZURE_KEY_VAULT_URL"
         searchQueryURL: "https://$($AZURE_DNS_NAME)/api/search/v2/query"
         searchCursorURL: "https://$($AZURE_DNS_NAME)/api/search/v2/query_with_cursor"
         schemaURL: "https://$($AZURE_DNS_NAME)/api/schema-service/v1/schema"
         entitlementsURL: "https://$($AZURE_DNS_NAME)/api/entitlements/v2"
         fileRetrievalURL: "https://$($AZURE_DNS_NAME)/api/dataset/v1/retrievalInstructions"
         crsconvertorURL: "https://$($AZURE_DNS_NAME)/api/crs/converter/v3/convertTrajectory"
         storageURL: "https://$($AZURE_DNS_NAME)/api/storage/v2/records"
         partitionURL: "http://partition.osdu-azure/api/partition/v1"
         clientSecret: "$CLIENT_SECRET_B64"
         gcz_persistence_enabled: true
         azureAppResourceId: "$AZURE_APP_ID"
     istio:
       enabled: $ISTIO_ENABLED
       gateways:
         - "istio-system/$ISTIO_GATEWAY_NAME"
       cors: {}
       dns_host: "$ISTIO_GCZ_DNS_HOST"
   "@
   [System.IO.File]::WriteAllText("$PWD/osdu_gcz_custom_values.yaml", $yamlContent, [System.Text.UTF8Encoding]::new($false))
   ```

   ---

5. Change service type to `LoadBalancer` for the `provider` services configuration files.

   ### [Unix Shell](#tab/unix-shell)

   ```bash
   cat > ../provider/templates/service.yaml << EOF
   apiVersion: v1
   kind: Service
   metadata:
    name: gcz-provider
    namespace: {{ .Release.Namespace }}
    annotations:
      service.beta.kubernetes.io/azure-load-balancer-internal: "{{ $.Values.global.provider.configuration.privateNetwork }}"
   spec:
    selector:
     app: provider
    ports:
    - port: {{ .Values.global.provider.service.port | default 8083 }}
      protocol: TCP
      targetPort: 8083
    type: LoadBalancer
   EOF
   ```

   ### [Windows PowerShell](#tab/windows-powershell)

   ```powershell
   $serviceYaml = @"
   apiVersion: v1
   kind: Service
   metadata:
     name: gcz-provider
     namespace: {{ .Release.Namespace }}
     annotations:
       service.beta.kubernetes.io/azure-load-balancer-internal: "{{ `$.Values.global.provider.configuration.privateNetwork` }}"
   spec:
     selector:
       app: provider
     ports:
     - port: {{ .Values.global.provider.service.port | default 8083 }}
       protocol: TCP
       targetPort: {{ .Values.global.provider.service.targetPort | default 8083 }}
     type: LoadBalancer
   "@
   [System.IO.File]::WriteAllText("$PWD/../provider/templates/service.yaml", $serviceYaml, [System.Text.UTF8Encoding]::new($false))
   ```

   ---

6. Change service type to `LoadBalancer` for the `transformer` services configuration files.

   ### [Unix Shell](#tab/unix-shell)

   ```bash
   cat > ../transformer/templates/service.yaml << EOF
   apiVersion: v1
   kind: Service
   metadata:
    name: gcz-transformer
    namespace: {{ .Release.Namespace }}
    annotations:
      service.beta.kubernetes.io/azure-load-balancer-internal: "{{ $.Values.global.transformer.configuration.privateNetwork }}"
   spec:
    selector:
     app: transformer
    ports:
    - port: {{ .Values.global.transformer.service.port | default 8080 }}
      protocol: TCP
      targetPort: {{ .Values.global.transformer.service.targetPort | default 8080 }}
    type: LoadBalancer
   EOF
   ```

   ### [Windows PowerShell](#tab/windows-powershell)

   ```powershell
   $serviceYaml = @"
   apiVersion: v1
   kind: Service
   metadata:
     name: gcz-transformer
     namespace: {{ .Release.Namespace }}
     annotations:
       service.beta.kubernetes.io/azure-load-balancer-internal: "{{ `$.Values.global.transformer.configuration.privateNetwork` }}"
   spec:
     selector:
       app: transformer
     ports:
     - port: {{ .Values.global.transformer.service.port | default 8080 }}
       protocol: TCP
       targetPort: {{ .Values.global.transformer.service.targetPort | default 8080 }}
     type: LoadBalancer
   "@
   [System.IO.File]::WriteAllText("$PWD/../transformer/templates/service.yaml", $serviceYaml, [System.Text.UTF8Encoding]::new($false))
   ```

   ---

7. Review the transformer configuration file `application.yml` to ensure the correct schemas are included.

   ### [Unix Shell](#tab/unix-shell)

   ```bash
   nano ../transformer/application.yml
   ```

   ### [Windows PowerShell](#tab/windows-powershell)

   ```powershell
   notepad ../transformer/application.yml
   ```

   ---

8. Review the provider configuration file `koop-config.json`.

   ### [Unix Shell](#tab/unix-shell)

   ```bash
   nano ../provider/koop-config.json
   ```

   ### [Windows PowerShell](#tab/windows-powershell)

   ```powershell
   notepad ../provider/koop-config.json
   ```

   ---

9. Authenticate to the Azure Kubernetes Service (AKS) cluster:

   ```bash
   az aks get-credentials --resource-group $RESOURCE_GROUP --name $AKS_NAME --admin
   ```

   ---

10. Create AKS Namespace:

    ```bash
    kubectl create namespace $NAMESPACE
    ```

11. Deploy HELM dependencies:

    ```bash
    helm dependency build
    ```

   ---

12. Deploy the GCZ HELM chart:

    ### [Unix Shell](#tab/unix-shell)

       ```bash
       helm upgrade -i "$CHART" . -n $NAMESPACE \
        -f osdu_gcz_custom_values.yaml \
        --set-file global.provider.configLoaderJs="../../../../gcz-provider/gcz-provider-core/config/configLoader.js" \
       ```
    ### [Windows PowerShell](#tab/windows-powershell)

      ```powershell
      helm upgrade -i "$CHART" . -n $NAMESPACE `
       -f osdu_gcz_custom_values.yaml `
       --set-file global.provider.configLoaderJs="../../../../gcz-provider/gcz-provider-core/config/configLoader.js"
     ```

   ---

13. Verify the deployment:
    ```bash
    kubectl get pods -n $NAMESPACE
    ```

   ---

   Now you should see the pods for the `provider`, `transformer`, and `gridgain` services.

14. Next, take note of the External IPs for the `provider` and `transformer` services. These IPs are used to connect to the GCZ API endpoints.

    ```bash
    kubectl get service -n $NAMESPACE
    ```

   ---

15. Test the gcz-provider endpoint by port forwarding:

    ### [Unix Shell](#tab/unix-shell)

     ```bash
     kubectl port-forward -n $NAMESPACE service/gcz-provider 8083:8083
     curl "http://localhost:8083/ignite-provider/FeatureServer/layers/info"
     ```

    ### [Windows PowerShell](#tab/windows-powershell)

    ```powershell
    kubectl port-forward -n $NAMESPACE service/gcz-provider 8083:8083
    Invoke-RestMethod "http://localhost:8083/ignite-provider/FeatureServer/layers/info"
    ```

   ---

16. If you encounter issues with the gcz-provider endpoint, try restarting the deployment:

    ```bash
    kubectl rollout restart deployment gcz-provider -n $NAMESPACE
    ```

   ---

17. Test the gcz-transformer endpoint by port forwarding:

    ### [Unix Shell](#tab/unix-shell)

    ```bash
    kubectl port-forward -n $NAMESPACE service/gcz-transformer 8080:8080
    curl "http://localhost:8080/gcz/transformer/admin/v3/api-docs"
    ```

    ### [Windows PowerShell](#tab/windows-powershell)

    ```powershell
    kubectl port-forward -n $NAMESPACE service/gcz-transformer 8080:8080
    Invoke-RestMethod "http://localhost:8080/gcz/transformer/admin/v3/api-docs"
    ```

   ---

18. If you encounter issues with the gcz-transformer endpoint, try restarting the deployment:

    ```bash
    kubectl rollout restart deployment gcz-transformer -n $NAMESPACE
    ```

   ---

> **Important:**
> If you wish to update the configuration files (for example, `application.yml` or `koop-config.json`), you must update the AKS configuration (configmap) and then delete the existing pods for the `provider` and `transformer` services. The pods are recreated with the new configuration. If you change the configuration using the GCZ APIs, the changes **will not** persist after a pod restart.

## Publish GCZ APIs publicly (optional)

If you want to expose the GCZ APIs publicly, you can use Azure API Management (APIM).
Azure API Management allows us to securely expose the GCZ service to the internet, as the GCZ service doesn't yet have authentication and authorization built in.
Through APIM we can add policies to secure, monitor, and manage the APIs.

### Prerequisites

- An Azure API Management instance. If you don't have an Azure API Management instance, see [Create an Azure API Management instance](https://learn.microsoft.com/azure/api-management/get-started-create-service-instance).
- The GCZ APIs are deployed and running.

> **Important:**
> The Azure API Management instance will need to be injected into a virtual network that is routable to the AKS cluster to be able to communicate with the GCZ APIs.

### Add the GCZ APIs to Azure API Management

#### Download the GCZ OpenAPI specifications

1. Download the two OpenAPI specification to your local computer.
   - [GCZ Provider](https://github.com/microsoft/adme-samples/blob/main/services/gcz/gcz-openapi-provider.yaml)
   - [GCZ Transformer](https://github.com/microsoft/adme-samples/blob/main/services/gcz/gcz-openapi-transformer.yaml)

1. Open each OpenAPI specification file in a text editor and replace the `servers` section with the corresponding IPs of the AKS GCZ Services' Load Balancer.

   ```yaml
   servers:
     - url: "http://<GCZ-Service-LoadBalancer-IP>/ignite-provider"
   ```

##### [Azure portal](#tab/portal)


### Add the GCZ APIs to Azure API Management

1. Navigate to your Azure API Management service in the [Azure portal](https://portal.azure.com/).
1. In the left-hand navigation pane, select **APIs**.
1. Select **+ Add API**.
1. Select **OpenAPI**.
1. Select **Select a file** and upload the `gcz-openapi-provider.yaml` file.
1. In the **API URL suffix** field, enter `ignite-provider`.
1. Select **Create**.
1. Repeat the steps for the `gcz-openapi-transformer.yaml` file, but use `gcz/transformer/admin` as the **API URL suffix**.

    [Add GCZ API to APIM](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/energy-data-services/media/how-to-deploy-gcz/deploy-gcz-apim.png)

### Configure policies

Next we need to configure the policies to validate the JSON Web Tokens (JWT).

You need the following information:
- Your Microsoft Entra ID tenant ID.
- The Azure Data Manager for Energy client ID (or token-issuing client ID if separate).

> **Note:**
> If you have multiple App Registrations issuing tokens, you can add multiple `<application-id>` elements to the `<client-application-ids>` element.


1. In the newly created `Geospatial Consumption Zone - Provider` API, make sure **All operations** is selected.
1. Under **Inbound processing**, select **...** and then **Code editor**.
1. Paste the following policy definition in the editor:

    ```xml
    <policies>
        <!-- Throttle, authorize, validate, cache, or transform the requests -->
        <inbound>
            <base />
            <validate-azure-ad-token tenant-id="%tenant-id%" failed-validation-httpcode="401">
            <client-application-ids>
                <application-id>%client-id%</application-id>
            </client-application-ids>
        </inbound>
        <!-- Control if and how the requests are forwarded to services  -->
        <backend>
            <base />
        </backend>
        <!-- Customize the responses -->
        <outbound>
            <base />
        </outbound>
        <!-- Handle exceptions and customize error responses  -->
        <on-error>
            <base />
        </on-error>
    </policies>
    ```

1. Replace `%tenant-id%` with your Microsoft Entra ID tenant ID, and `%client-id%` with the Azure Data Manager for Energy client ID.
1. Select **Save**.
1. Repeat the steps for the `Geospatial Consumption Zone - Transformer` API.

##### [Azure CLI](#tab/cli)


1. Run the following command to add the `Geospatial Consumption Zone - Provider` API to Azure API Management:

    ```bash
    az apim api import --resource-group <resource-group-name> --service-name <apim-service-name> --path ignite-provider --specification-format OpenApi --specification-path gcz-openapi-provider.yaml
    ```

1. Run the following command to add the `Geospatial Consumption Zone - Transformer` API to Azure API Management:

    ```bash
    az apim api import --resource-group <resource-group-name> --service-name <apim-service-name> --path gcz/transformer/admin --specification-format OpenApi --specification-path gcz-openapi-transformer.yaml
    ```

1. Create a new file on your local computer named `gcz-provider-policy.xml` and paste the following policy:

    ```xml
    <policies>
        <!-- Throttle, authorize, validate, cache, or transform the requests -->
        <inbound>
            <base />
            <validate-azure-ad-token tenant-id="%tenant-id%" failed-validation-httpcode="401">
            <client-application-ids>
                <application-id>%client-id%</application-id>
            </client-application-ids>
        </inbound>
        <!-- Control if and how the requests are forwarded to services  -->
        <backend>
            <base />
        </backend>
        <!-- Customize the responses -->
        <outbound>
            <base />
        </outbound>
        <!-- Handle exceptions and customize error responses  -->
        <on-error>
            <base />
        </on-error>
    </policies>
    ```

1. Replace `%tenant-id%` with your Microsoft Entra ID tenant ID, and `%client-id%` with the Azure Data Manager for Energy client ID and save the file.

1. Run the following command to add the policy to the `Geospatial Consumption Zone - Provider` API:

    ```bash
    az apim api policy import --resource-group <resource-group-name> --service-name <apim-service-name> --api-id <api-id> --policy-format xml --policy-path gcz-provider-policy.xml
    ```

1. Run the following command to add the policy to the `Geospatial Consumption Zone - Transformer` API:

    ```bash
    az apim api policy import --resource-group <resource-group-name> --service-name <apim-service-name> --api-id <api-id> --policy-format xml --policy-path gcz-provider-policy.xml
    ```


---
