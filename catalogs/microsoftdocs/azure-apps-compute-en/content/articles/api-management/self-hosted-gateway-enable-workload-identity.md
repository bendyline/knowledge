---
title: Azure API Management Self-Hosted Gateway - Workload Identity Authentication
description: Enable the Azure API Management self-hosted gateway to authenticate with its associated cloud-based API Management instance using Microsoft Entra workload identity authentication. 
services: api-management

ms.service: azure-api-management
ms.topic: how-to
ms.date: 02/19/2026
ai-usage: ai-assisted
---

# Use Microsoft Entra workload identity authentication for the self-hosted gateway

**APPLIES TO: Developer | Premium**



The Azure API Management [self-hosted gateway](self-hosted-gateway-overview.md) needs connectivity with its associated cloud-based API Management instance for reporting status, checking for and applying configuration updates, and sending metrics and events. 

This article shows you how to enable the self-hosted gateway to authenticate to its associated cloud instance by using [Microsoft Entra workload identity](https://learn.microsoft.com/azure/aks/workload-identity-overview). By using workload identity authentication, you don't need to manage secrets or certificates, since authentication is handled through federated identity credentials between your Kubernetes cluster and Microsoft Entra ID. For other authentication options, see [Self-hosted gateway authentication options](self-hosted-gateway-authentication-options.md).

## Scenario overview

The self-hosted gateway configuration API can check Azure role-based access control (RBAC) to determine who has permissions to read the gateway configuration. By using workload identity, you create a Microsoft Entra app that you associate with a Kubernetes service account through federated identity credentials. The self-hosted gateway can then authenticate to the API Management instance by using this workload identity without requiring secrets.

Workload identity uses [OpenID Connect (OIDC)](https://openid.net/connect/) to enable Kubernetes applications to access Azure resources securely.  

To enable workload identity authentication, complete the following steps:

1. Create two custom roles to:
    - Let the configuration API get access to customer's RBAC information
    - Grant permissions to read the self-hosted gateway configuration
1. Grant RBAC access to the API Management instance's managed identity 
1. Create a Microsoft Entra app and configure federated identity credentials
1. Grant the Microsoft Entra app access to read the gateway configuration
1. Deploy the gateway with workload identity configuration

## Prerequisites

- An API Management instance in the Developer or Premium service tier. If needed, complete the following quickstart: [Create an Azure API Management instance](get-started-create-service-instance.md).
- An Azure Kubernetes Service (AKS) cluster with [workload identity and OIDC issuer enabled](https://learn.microsoft.com/azure/aks/workload-identity-deploy-cluster).
- A [gateway resource](api-management-howto-provision-self-hosted-gateway.md) on the instance.
- An [system-assigned managed identity](api-management-howto-use-managed-service-identity.md) enabled on the instance.
- Self-hosted gateway container image version 2.11.0 or later. 

### Notes

- This article focuses on deployment to Azure Kubernetes Service (AKS).
- The pattern is applicable to other Kubernetes distributions with the required OIDC support. For more information, see the [Azure workload identity repo](https://github.com/azure/azure-workload-identity).


## Create custom roles

Create the following two [custom roles](https://learn.microsoft.com/azure/role-based-access-control/custom-roles) that are assigned in later steps. You can use the permissions listed in the following JSON templates to create the custom roles using the [Azure portal](https://learn.microsoft.com/azure/role-based-access-control/custom-roles-portal), [Azure CLI](https://learn.microsoft.com/azure/role-based-access-control/custom-roles-cli), [Azure PowerShell](https://learn.microsoft.com/azure/role-based-access-control/custom-roles-powershell), or other Azure tools.

When configuring the custom roles, update the [`AssignableScopes`](https://learn.microsoft.com/azure/role-based-access-control/role-definitions#assignablescopes) property with appropriate scope values for your directory, such as a subscription in which your API Management instance is deployed. 

**API Management Configuration API Access Validator Service role**

```json
{
  "Description": "Can access RBAC permissions on the API Management resource to authorize requests in Configuration API.",
  "IsCustom": true,
  "Name": "API Management Configuration API Access Validator Service Role",
  "Permissions": [
    {
      "Actions": [
        "Microsoft.Authorization/*/read"
      ],
      "NotActions": [],
      "DataActions": [],
      "NotDataActions": []
    }
  ],
  "NotDataActions": [],
  "AssignableScopes": [
    "/subscriptions/{subscriptionID}"
  ]
}
```

**API Management Gateway Configuration Reader role**

```json
{
  "Description": "Can read self-hosted gateway configuration from Configuration API",
  "IsCustom": true,
  "Name": "API Management Gateway Configuration Reader Role",
  "Permissions": [
    {
      "Actions": [],
      "NotActions": [],
      "DataActions": [
        "Microsoft.ApiManagement/service/gateways/getConfiguration/action"
      ],
      "NotDataActions": []
    }
  ],
  "NotDataActions": [],
  "AssignableScopes": [
    "/subscriptions/{subscriptionID}"
  ]
}
```

## Add role assignments

### Assign API Management Configuration API Access Validator Service role 

Assign the API Management Configuration API Access Validator Service role to the managed identity of the API Management instance. For detailed steps to assign a role, see [Assign Azure roles using the portal](https://learn.microsoft.com/azure/role-based-access-control/role-assignments-portal). 

- Scope: The resource group or subscription in which the API Management instance is deployed
- Role: API Management Configuration API Access Validator Service Role
- Assign access to: Managed identity of API Management instance

### Assign API Management Gateway Configuration Reader role

<a name='step-1-register-azure-ad-app-and-configure-workload-identity'></a>

#### Step 1: Register the Microsoft Entra app and configure workload identity

Create a new Microsoft Entra app. For steps, see [Create a Microsoft Entra application and service principal that can access resources](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/howto-create-service-principal-portal.md). The Microsoft Entra app is used by the self-hosted gateway to authenticate to the API Management instance.

> **Important:**
> The workload identity doesn't require you to create a client secret. Authentication is handled through federated identity credentials.

Note the application (client) ID for use in the next section when deploying the self-hosted gateway.

Next, configure federated identity credentials to establish trust between your Microsoft Entra app and the Kubernetes service account:

1. In the Azure portal, navigate to your Microsoft Entra app registration.
1. Select **Certificates & secrets** > **Federated credentials** > **+ Add credential**.
1. Select the **Kubernetes accessing Azure resources** scenario.
1. Configure the federated credential:
   - **Cluster issuer URL**: The OIDC issuer URL from your AKS cluster (obtain using `az aks show --resource-group <resource-group> --name <cluster-name> --query "oidcIssuerProfile.issuerUrl"`)
   - **Namespace**: The Kubernetes namespace where you deploy the gateway (for example, `apim-gateway-wi`)
   - **Service account**: The name of the Kubernetes service account (for example, `apim-gateway-workload-identity`)
   - **Name**: A descriptive name for the credential (for example, `apim-gateway-federated-credential`)
1. Select **Add** to create the federated credential.

For more information, see [Configure a federated identity credential on an app](https://learn.microsoft.com/entra/workload-id/workload-identity-federation-create-trust).

#### Step 2: Assign API Management Gateway Configuration Reader Service role

[Assign](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/howto-create-service-principal-portal.md#assign-a-role-to-the-application) the API Management Gateway Configuration Reader Service role to the app.

- Scope: The API Management instance (or resource group or subscription in which the app is deployed)
- Role: API Management Gateway Configuration Reader role
- Assign access to: Microsoft Entra app

## Deploy the self-hosted gateway

Deploy the self-hosted gateway to Kubernetes by using workload identity. 

#### [Helm](#tab/helm)

You can deploy the self-hosted gateway with Microsoft Entra authentication by using a [Helm chart](https://github.com/Azure/api-management-self-hosted-gateway). 

Replace the following values in the `helm install` command with your actual values:

- `<gateway-name>`: Your Azure API Management instance name
- `<gateway-url>`: The URL of your gateway, in the format `https://<gateway-name>.configuration.azure-api.net`
- `<entra-id-app-id>`: The application (client) ID of the registered Microsoft Entra app

```console
helm install --name azure-api-management-gateway azure-apim-gateway/azure-api-management-gateway \
             --set gateway.name=='<gateway-name>' \
             --set gateway.configuration.uri='<gateway-url>' \
             --set gateway.auth.type='WorkloadIdentity' \
             --set gateway.auth.azureAd.app.id='<entra-id-app-id>'
```

For prerequisites and details, see [Deploy API Management self-hosted gateway with Helm](how-to-deploy-self-hosted-gateway-kubernetes-helm.md).


### Confirm that the gateway is running

1. Run the following command to check the gateway pod is running. Your pod name will be different.

   ```console
   kubectl get pods
   NAME                                           READY     STATUS    RESTARTS   AGE
   azure-api-management-gateway-59f5fb94c-s9stz   1/1       Running   0          1m
   ```

1. Run the following command to check the gateway service is running. Your service name and IP addresses will be different.

    ```console
    kubectl get services
    NAME                           TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)               AGE
    azure-api-management-gateway   ClusterIP   10.0.229.55     <none>        8080/TCP,8081/TCP     1m
    ```

1. Return to the Azure portal and confirm that gateway node you deployed is reporting healthy status.

> **Tip:**
> Use `kubectl logs <gateway-pod-name>` command to view a snapshot of self-hosted gateway log.

#### [YAML](#tab/yaml)

The following YAML configuration shows the required components and settings.

> **Important:**
> If you're following the existing Kubernetes [deployment guidance](how-to-deploy-self-hosted-gateway-kubernetes.md):
> - Omit the step to store the default authentication key by using the `kubectl create secret generic` command. 
> - Substitute the following basic configuration file for the default YAML file that the Azure portal generates for you. The following file adds Microsoft Entra workspace identity in place of configuration to use an authentication key.

> **Note:**
> Make sure to replace the placeholder values with your actual configuration:
> - `<namespace-name>`: Your Kubernetes namespace
> - `<client-id>`: Your Microsoft Entra application (client) ID
> - `<gateway-name>`: Your API Management gateway name
> - `<service-name>.configuration.azure-api.net`: Your API Management configuration endpoint
  
```yml
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: apim-gateway-workload-identity
  namespace: <namespace-name>
  labels:
    azure.workload.identity/use: "true"
  annotations:
    azure.workload.identity/client-id: "<client-id>"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: apim-gateway
  namespace: <namespace-name>
spec:
  replicas: 1
  selector:
    matchLabels:
      app: apim-gateway
  template:
    metadata:
      labels:
        app: apim-gateway
        azure.workload.identity/use: "true"
    spec:
      serviceAccountName: apim-gateway-workload-identity
      containers:
      - name: apim-gateway
        image: mcr.microsoft.com/azure-api-management/gateway:v2
        ports:
        - name: http
          containerPort: 8080
          protocol: TCP
        - name: https
          containerPort: 8081
          protocol: TCP
        readinessProbe:
          failureThreshold: 3
          httpGet:
            path: /internal-status-0123456789abcdef
            port: http
            scheme: HTTP
          periodSeconds: 5
          successThreshold: 1
          timeoutSeconds: 1
        resources:
          limits:
            cpu: "2"
            memory: 2Gi
          requests:
            cpu: "2"
            memory: 2Gi
        envFrom:
        - configMapRef:
            name: apim-gateway-env
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: apim-gateway-env
  namespace: <namespace-name>
data:
  gateway.name: <gateway-name>
  config.service.auth: workloadIdentity
  config.service.endpoint: https://<service-name>.configuration.azure-api.net
  telemetry.logs.std.level: info
---
apiVersion: v1
kind: Service
metadata:
  name: apim-gateway-loadbalancer
  namespace: <namespace-name>
spec:
  type: LoadBalancer
  selector:
    app: apim-gateway
  ports:
  - name: http
    port: 80
    protocol: TCP
    targetPort: 8080
  - name: https
    port: 443
    protocol: TCP
    targetPort: 8081
```

### Deploy to Kubernetes

Save the YAML configuration to a file (for example, `apim-gateway-workload-identity.yaml`) and deploy it to your AKS cluster:

```bash
kubectl apply -f apim-gateway-workload-identity.yaml
```

Verify the deployment:

```bash
kubectl get pods -n <namespace-name>
kubectl logs -n <namespace-name> <pod-name>
```

### Confirm that the gateway is running

1. Run the following command to check if the deployment succeeded. It might take a little time for all the objects to be created and for the pods to initialize.

    ```console
    kubectl get deployments
    ```
    It should return
    ```console
    NAME             READY   UP-TO-DATE   AVAILABLE   AGE
    <gateway-name>   1/1     1            1           18s
    ```
1. Run the following command to check if the services were successfully created. Your service IPs and ports will be different.

    ```console
    kubectl get services
    ```
    It should return
    ```console
    NAME                                TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)                      AGE
    <gateway-name>-live-traffic         ClusterIP      None            <none>        4290/UDP,4291/UDP   9m1s
    <gateway-name>-instance-discovery   LoadBalancer   10.99.236.168   <pending>     80:31620/TCP,443:30456/TCP   9m1s
    ```
1. Go back to the Azure portal and select the **Overview** tab of your gateway.
1. Confirm that **Status** shows a green check mark, followed by a node count that matches the number of replicas specified in the YAML file. This status means the deployed self-hosted gateway pods are successfully communicating with the API Management service and have a regular "heartbeat."
    Screenshot showing status of self-hosted gateway in the portal.

> **Tip:**
> * Run the `kubectl logs deployment/<gateway-name>` command to view logs from a randomly selected pod if there's more than one.
> * Run `kubectl logs -h` for a complete set of command options, such as how to view logs for a specific pod or container.

---

## Related content

- Learn more about the API Management [self-hosted gateway](self-hosted-gateway-overview.md).
- Learn more about [Microsoft Entra workload identity for AKS](https://learn.microsoft.com/azure/aks/workload-identity-overview).
- Learn more about guidance for [running the self-hosted gateway on Kubernetes in production](how-to-self-hosted-gateway-on-kubernetes-in-production.md).
- Compare with [Microsoft Entra authentication using client secrets](self-hosted-gateway-enable-azure-ad.md).
