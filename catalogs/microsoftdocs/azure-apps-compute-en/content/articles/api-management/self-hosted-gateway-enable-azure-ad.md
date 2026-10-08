---
title: Azure API Management Self-Hosted Gateway - Microsoft Entra Authentication
description: Enable the Azure API Management self-hosted gateway to authenticate with its associated cloud-based API Management instance using Microsoft Entra authentication. 
services: api-management

ms.service: azure-api-management
ms.topic: how-to
ms.date: 02/19/2026
---

# Use Microsoft Entra authentication for the self-hosted gateway

**APPLIES TO: Developer | Premium**



The Azure API Management [self-hosted gateway](self-hosted-gateway-overview.md) needs connectivity with its associated cloud-based API Management instance for reporting status, checking for and applying configuration updates, and sending metrics and events. 

This article shows you how to enable the self-hosted gateway to authenticate to its associated cloud instance by using a [Microsoft Entra ID app](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/app-objects-and-service-principals.md), using a client secret or certificate. By using Microsoft Entra authentication, you can configure longer expiry times for secrets and use standard steps to manage and rotate secrets. For other authentication options, see [Self-hosted gateway authentication options](self-hosted-gateway-authentication-options.md). 

## Scenario overview

The self-hosted gateway configuration API can check Azure role-based access control (RBAC) to determine who has permissions to read the gateway configuration. After you create a Microsoft Entra app with those permissions, the self-hosted gateway can authenticate to the API Management instance by using the app. 

To enable Microsoft Entra authentication, complete the following steps:
1. Create two custom roles to:
    - Let the configuration API get access to customer's RBAC information
    - Grant permissions to read the self-hosted gateway configuration
1. Grant RBAC access to the API Management instance's managed identity 
1. Create a Microsoft Entra app and grant it access to read the gateway configuration
1. Deploy the gateway with new configuration options

## Prerequisites

- An API Management instance in the Developer or Premium service tier. If needed, complete the following quickstart: [Create an Azure API Management instance](get-started-create-service-instance.md).
- Provision a [gateway resource](api-management-howto-provision-self-hosted-gateway.md) on the instance.
- Enable a [system-assigned managed identity](api-management-howto-use-managed-service-identity.md) on the instance.
- Self-hosted gateway container image version 2.2 or later

### Limitations

- Only system-assigned managed identity is supported.


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

<a name='step-1-register-azure-ad-app'></a>

#### Step 1: Register Microsoft Entra app 

Create a new Microsoft Entra app. For steps, see [Create a Microsoft Entra application and service principal that can access resources](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/howto-create-service-principal-portal.md). The Microsoft Entra app is used by the self-hosted gateway to authenticate to the API Management instance.

- Generate a [client secret](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/howto-create-service-principal-portal.md#option-3-create-a-new-client-secret) for the app.
- Take note of the following application values for use in the next section when deploying the self-hosted gateway: application (client) ID, directory (tenant) ID, and client secret.

> **Note:**
> Instead of using a client secret, you can choose to use a certificate for authentication. For steps to upload a certificate to your Microsoft Entra app, see [Use certificates for Azure AD app authentication](https://learn.microsoft.com/entra/identity-platform/how-to-add-credentials).

#### Step 2: Assign API Management Gateway Configuration Reader Service Role

[Assign](https://github.com/MicrosoftDocs/azure-docs/blob/4260367da6fe93d74e80662f882dd4e9f52b8924/articles/active-directory/develop/howto-create-service-principal-portal.md#assign-a-role-to-the-application) the API Management Gateway Configuration Reader Service role to the app.

- Scope: The API Management instance (or resource group or subscription in which the app is deployed)
- Role: API Management Gateway Configuration Reader role
- Assign access to: Microsoft Entra app

## Deploy the self-hosted gateway

Deploy the self-hosted gateway to a containerized environment, such as Kubernetes, adding Microsoft Entra app registration settings. 

#### [Helm](#tab/helm)

You can deploy the self-hosted gateway with Microsoft Entra authentication by using a [Helm chart](https://github.com/Azure/api-management-self-hosted-gateway). 

Replace the following values in the `helm install` command with your actual values:

- `<gateway-name>`: Your Azure API Management instance name
- `<gateway-url>`: The URL of your gateway, in the format `https://<gateway-name>.configuration.azure-api.net`
- `<entra-id-tenant-id>`: Your Microsoft Entra tenant ID (directory ID)
- `<entra-id-app-id>`: The application (client) ID of the registered Microsoft Entra app
- `<entra-id-secret>`: The client secret generated for the Microsoft Entra app

```Console
helm install --name azure-api-management-gateway azure-apim-gateway/azure-api-management-gateway \
             --set gateway.name=='<gateway-name>' \
             --set gateway.configuration.uri='<gateway-url>' \
             --set gateway.auth.type='AzureAdApp' \
             --set gateway.auth.azureAd.tenant.id='<entra-id-tenant-id>' \
             --set gateway.auth.azureAd.app.id='<entra-id-app-id>'
             --set config.service.auth.azureAd.clientSecret='<entra-id-secret>' 
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

In the following example YAML configuration file, Microsoft Entra app registration settings are added to the `data` element of the gateway's `ConfigMap`. The gateway is named *mygw*.

> **Important:**
> If you're following the existing Kubernetes [deployment guidance](how-to-deploy-self-hosted-gateway-kubernetes.md):
> - Omit the step to store the default authentication key by using the `kubectl create secret generic` command. 
> - Substitute the following basic configuration file for the default YAML file that the Azure portal generates for you. The following file adds Microsoft Entra configuration in place of configuration to use an authentication key.

> **Note:**
> Make sure to replace the placeholder values with your actual configuration:
> - `<entra-id-app-id>`: Your Microsoft Entra application (client) ID
> - `<entra-id-tenant-id>`: Your Microsoft Entra tenant ID (directory ID)
> - `<entra-id-client-secret>`: The client secret generated for your Microsoft Entra app
> - `<gateway-id>`: Your self-hosted gateway name
> - `<service-name>.configuration.azure-api.net`: Your API Management configuration endpoint

  
```yml
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: mygw-env
  labels:
    app: apim-gateway
data:
  config.service.endpoint: "<service-name>.configuration.azure-api.net"
  config.service.auth: azureAdApp 
  config.service.auth.azureAd.authority: "https://login.microsoftonline.com"  
  config.service.auth.azureAd.tenantId: "<entra-id-tenant-id>" 
  config.service.auth.azureAd.clientId: "<entra-id-app-id>" 
  config.service.auth.azureAd.clientSecret: "<entra-id-client-secret>"
  gateway.name: <gateway-id>
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mygw
  labels:
    app: apim-gateway
spec:
  replicas: 1
  selector:
    matchLabels:
      app: apim-gateway
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 0
      maxSurge: 25%
  template:
    metadata:
      labels:
        app: apim-gateway
    spec:
      terminationGracePeriodSeconds: 60
      containers:
      - name: mygw
        image: mcr.microsoft.com/azure-api-management/gateway:v2
        ports:
        - name: http
          containerPort: 8080
        - name: https
          containerPort: 8081
          # Container port used for rate limiting to discover instances
        - name: rate-limit-dc
          protocol: UDP
          containerPort: 4290
          # Container port used for instances to send heartbeats to each other
        - name: dc-heartbeat
          protocol: UDP
          containerPort: 4291
        readinessProbe:
          httpGet:
            path: /status-0123456789abcdef
            port: http
            scheme: HTTP
          initialDelaySeconds: 0
          periodSeconds: 5
          failureThreshold: 3
          successThreshold: 1
        envFrom:
        - configMapRef:
            name: mygw-env
---
apiVersion: v1
kind: Service
metadata:
  name: mygw-live-traffic
  labels:
    app: apim-gateway
spec:
  type: LoadBalancer
  externalTrafficPolicy: Local
  ports:
  - name: http
    port: 80
    targetPort: 8080
  - name: https
    port: 443
    targetPort: 8081
  selector:
    app: apim-gateway
---
apiVersion: v1
kind: Service
metadata:
  name: mygw-instance-discovery
  labels:
    app: apim-gateway
  annotations:
    azure.apim.kubernetes.io/notes: "Headless service being used for instance discovery of self-hosted gateway"
spec:
  clusterIP: None
  type: ClusterIP
  ports:
  - name: rate-limit-discovery
    port: 4290
    targetPort: rate-limit-dc
    protocol: UDP
  - name: discovery-heartbeat
    port: 4291
    targetPort: dc-heartbeat
    protocol: UDP
  selector:
    app: apim-gateway
```



### Deploy to Kubernetes

Save the YAML configuration to a file (for example, `apim-gateway-entra-id.yaml`) and deploy it to your AKS cluster:

```Console
kubectl apply -f apim-gateway-entra-id.yaml
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
- Learn more about guidance for [running the self-hosted gateway on Kubernetes in production](how-to-self-hosted-gateway-on-kubernetes-in-production.md).
