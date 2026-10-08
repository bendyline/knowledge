---
title: Migrate Spring Cloud applications to Azure Container Apps
description: Learn what you should be aware of when you want to migrate an existing Spring Cloud application to run on Azure Container Apps.
ms.author: deepganguly
author: deepganguly
ms.service: azure-container-apps
ms.topic: article
ms.date: 03/09/2026
---

# Migrate Spring Cloud applications to Azure Container Apps

This guide describes what you should be aware of when you migrate an existing Spring Cloud application to run on Azure Container Apps.

## Pre-migration

To ensure a successful migration, complete the assessment and inventory steps described in the following sections before you start.

If you can't meet any of these pre-migration requirements, see the following companion migration guides:

- Migrate executable JAR applications to containers on Azure Kubernetes Service (guidance planned)
- Migrate executable JAR applications to Azure Virtual Machines (guidance planned)

### Inspect application components

#### Determine whether and how the file system is used


Identify any instances where your services read from or write to the local file system. Note which files are short-term or temporary and which files are long-lived.

Azure Container Apps offers several types of storage. By using ephemeral storage, you can read and write temporary data within a running container or replica. By using Azure Files, you can provide permanent storage that multiple containers can share. For more information, see [Use storage mounts in Azure Container Apps](storage-mounts.md).

If your application serves **read-only static content**, consider moving it to Azure Blob Storage and adding Azure CDN for global distribution. For more information, see [Static website hosting in Azure Storage](https://learn.microsoft.com/azure/storage/blobs/storage-blob-static-website) and [Quickstart: Integrate an Azure storage account with Azure CDN](https://learn.microsoft.com/azure/cdn/cdn-create-a-storage-account-with-cdn).

If your application handles **dynamically published static content** (uploaded or generated content that doesn't change after creation), you can integrate Azure Blob Storage and Azure CDN. You can also use an Azure Function to manage uploads and trigger CDN refreshes. For a sample implementation, see [Uploading and CDN-preloading static content with Azure Functions](https://github.com/Azure-Samples/functions-java-push-static-contents-to-cdn).


#### Determine whether any of the services contain OS-specific code


<!-- Used by: migrate-spring-boot.md, migrate-spring-cloud-to-azure-container-apps.md, migrate-tomcat.md -->

If your application contains code with dependencies on the host OS, refactor it to remove those dependencies. For example, replace any use of `/` or `\` in file system paths with [`File.Separator`](https://docs.oracle.com/javase/8/docs/api/java/io/File.html#separator) or [`Paths.get`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Paths.html#get-java.lang.String-java.lang.String...-).


#### Switch to a supported platform


<!-- Used by: migrate-spring-boot.md, migrate-spring-cloud-to-azure-container-apps.md -->

If you create your Dockerfile manually and deploy a containerized application to Azure Container Apps, you have full control over your deployment, including JRE/JDK versions.

For deployment from artifacts, Azure Container Apps offers specific versions of Java (8, 11, 17, and 21) and specific versions of Spring Boot and Spring Cloud components. To ensure compatibility, first migrate your application to a supported version of Java in its current environment, then proceed with the remaining migration steps. Fully test the resulting configuration with the latest stable release of your Linux distribution.

> **Note:**
> This validation is especially important if your current server runs on an unsupported JDK, such as Oracle JDK or IBM OpenJ9.

To check your current Java version, sign in to your production server and run the following command:

```bash
java -version
```

For supported versions of Java, Spring Boot, and Spring Cloud, see [Java on Azure Container Apps overview](java-overview.md).


#### Identify Spring Boot versions


<!-- Used by: migrate-spring-boot.md, migrate-spring-cloud-to-azure-container-apps.md -->

Examine the dependencies of each application you're migrating to determine its Spring Boot version.

In **Maven** projects, find the Spring Boot version in the `<parent>` element of the POM file:

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.3.3</version>
    <relativePath/> <!-- lookup parent from repository -->
</parent>
```

In **Gradle** projects, find the Spring Boot version in the `plugins` section:

```gradle
plugins {
  id 'org.springframework.boot' version '3.3.3'
  id 'io.spring.dependency-management' version '1.1.6'
  id 'java'
}
```

For applications that use Spring Boot versions before 3.x, follow the [Spring Boot 3.0 Migration Guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide) to update to a supported version. For supported versions, see [Spring Boot and Spring Cloud versions](https://spring.io/projects/spring-cloud#overview).


#### Identify Spring Cloud versions

Examine the dependencies of each application you're migrating to determine the version of the Spring Cloud components it uses.

##### Maven

In Maven projects, set the Spring Cloud version in the `spring-cloud.version` property:

```xml
  <properties>
    <spring-cloud.version>2023.0.2</spring-cloud.version>
  </properties>
```

##### Gradle

In Gradle projects, set the Spring Cloud version in the "extra properties" block:

```gradle
ext {
  set('springCloudVersion', "2023.0.2")
}
```

You need to update all applications to use supported versions of Spring Cloud. For supported versions, see the [Spring Cloud](https://spring.io/projects/spring-cloud#overview) documentation.

#### Identify log aggregation solutions

Identify any log aggregation solutions that the applications you're migrating use. You need to configure diagnostic settings in migration to make logged events available for consumption. For more information, see the [Ensure console logging and configure diagnostic settings](#ensure-console-logging-and-configure-diagnostic-settings) section.

#### Identify application performance management (APM) agents

Identify any application performance management agents that your applications use. Azure Container Apps doesn't offer built-in support for APM integration. You need to prepare your container image or integrate APM tool directly into your code. If you want to measure your application's performance but didn't integrate any APM yet, consider using Azure Application Insights. For more information, see the [Migration](#migration) section.

### Inventory external resources

Identify external resources, such as data sources, JMS message brokers, and URLs of other services. In Spring Cloud applications, you typically find the configuration for such resources in one of the following locations:

- In the *src/main/resources* folder, in a file typically called *application.properties* or *application.yml*.
- In the Spring Cloud Config Server repository that you identified in the previous step.

#### Databases


For a Spring Boot application, connection strings typically appear in configuration files when it depends on an external database. Here's an example from an *application.properties* file:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/mysql_db
spring.datasource.username=dbuser
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
```

Here's an example from an *application.yaml* file:

```yaml
spring:
  data:
    mongodb:
      uri: mongodb://mongouser:deepsecret@mongoserver.contoso.com:27017
```

See Spring Data documentation for more possible configuration scenarios:

- [JPA Repositories](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.repositories)
- [JDBC Repositories](https://docs.spring.io/spring-data/jdbc/docs/current/reference/html/#jdbc.repositories)
- [Cassandra Repositories](https://docs.spring.io/spring-data/cassandra/docs/current/reference/html/#cassandra.repositories)
- [MongoDB Repositories](https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#mongodb.repositories)


#### JMS message brokers


Identify the brokers in use by looking in the build manifest (typically, a *pom.xml* or *build.gradle* file) for the relevant dependencies.

For example, a Spring Boot application that uses ActiveMQ typically contains this dependency in its *pom.xml* file:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-activemq</artifactId>
</dependency>
```

Spring Boot applications that use commercial brokers typically contain dependencies directly on the brokers' JMS driver libraries. Here's an example from a *build.gradle* file:

```json
    dependencies {
      ...
      compile("com.ibm.mq:com.ibm.mq.allclient:9.4.0.5")
      ...
    }
```

After you identify the brokers in use, find the corresponding settings. You typically find them in the *application.properties* and *application.yml* files in the application directory.

> **Note:**
> Microsoft recommends using the most secure authentication flow available. The authentication flow described in this procedure, such as for databases, caches, messaging, or AI services, requires a high degree of trust in the application and carries risks not present in other flows. Use this flow only when more secure options, like managed identities for passwordless or keyless connections, aren't viable. For local machine operations, prefer user identities for passwordless or keyless connections.

Here's an ActiveMQ example from an *application.properties* file:

```properties
spring.activemq.brokerurl=broker:(tcp://localhost:61616,network:static:tcp://remotehost:61616)?persistent=false&useJmx=true
spring.activemq.user=admin
spring.activemq.password=<password>
```

For more information on ActiveMQ configuration, see the [Spring Boot messaging documentation](https://docs.spring.io/spring-boot/reference/messaging/index.html).

Here's an IBM MQ example from an *application.yaml* file:

```yaml
ibm:
  mq:
    queueManager: qm1
    channel: dev.ORDERS
    connName: localhost(14)
    user: admin
    password: <password>
```

For more information on IBM MQ configuration, see the [IBM MQ Spring components documentation](https://github.com/ibm-messaging/mq-jms-spring#ibm-mq-jms-spring-components).


#### Identify external caches


Identify any external caches in use. Frequently, you use Redis via Spring Data Redis. For configuration information, see the [Spring Data Redis](https://spring.io/projects/spring-data-redis) documentation.

Determine whether you cache session data via [Spring Session](https://spring.io/projects/spring-session) by searching for the respective configuration (in [Java](https://docs.spring.io/spring-session/reference/3.0/index.html) or [XML](https://docs.spring.io/spring-session/reference/3.0/index.html)).


#### Identity providers

Identify all identity providers and all Spring Cloud applications that require authentication and authorization. For information on how you can configure identity providers, see the following resources:

- For OAuth2 configuration, see the [Spring Cloud Security quickstart](https://spring.io/projects/spring-cloud-security).
- For Auth0 Spring Security configuration, see the [Auth0 Spring Security documentation](https://auth0.com/docs/quickstart/backend/java-spring-security5).
- For PingFederate Spring Security configuration, see the [Auth0 PingFederate instructions](https://auth0.com/authenticate/java-spring-security/ping-federate/).

#### Resources configured through VMware Tanzu Application Service (TAS) (formerly Pivotal Cloud Foundry)

For applications managed with TAS, you often configure external resources, including the resources described earlier, through TAS service bindings. To examine the configuration for such resources, use the [TAS (Cloud Foundry) CLI](https://docs.cloudfoundry.org/cf-cli/) to view the `VCAP_SERVICES` variable for the application.

```bash
# Log into TAS, if needed (enter credentials when prompted)
cf login -a <API endpoint>

# Set the organization and space containing the application, if not already selected during login.
cf target org <organization name>
cf target space <space name>

# Display variables for the application
cf env <Application Name>
```

Examine the `VCAP_SERVICES` variable for configuration settings of external services bound to the application. For more information, see the [TAS (Cloud Foundry) documentation](https://docs.cloudfoundry.org/devguide/deploy-apps/environment-variable.html#VCAP-SERVICES).

#### All other external resources

It's not feasible for this guide to document every possible external dependency. After the migration, you need to verify that you can satisfy every external dependency of your application.

### Inventory configuration sources and secrets

#### Inventory passwords and secure strings

Check all properties, configuration files, and environment variables in the production deployments for any secret strings and passwords. In a Spring Cloud application, you typically find these strings in the *application.properties* or *application.yml* file in individual services or in the Spring Cloud Config Server repository.

#### Inventory certificates


Document all the certificates used for public SSL endpoints or communication with backend databases and other systems. You can view all certificates on the production servers by running the following command:

```bash
keytool -list -v -keystore <path to keystore>
```


#### Determine whether Spring Cloud Vault is used

If you use Spring Cloud Vault to store and access secrets, identify the backing secret store - for example, HashiCorp Vault or CredHub. Then identify all the secrets that the application code uses.

#### Locate the configuration server source

If your application uses a [Spring Cloud Config Server](https://docs.spring.io/spring-cloud-config/docs/current/reference/html/#_spring_cloud_config_server), identify where the configuration is stored. You typically find this setting in the *bootstrap.yml* or *bootstrap.properties* file, or sometimes in the *application.yml* or *application.properties* file. The setting looks like the following example:

```properties
spring.cloud.config.server.git.uri: file://${user.home}/spring-cloud-config-repo
```

While git is most commonly used as Spring Cloud Config Server's backing datastore, as shown earlier, your application might use one of the other possible backends. Consult the [Spring Cloud Config Server documentation](https://docs.spring.io/spring-cloud-config/docs/current/reference/html/#_environment_repository) for information on other backends, such as [Relational Database (JDBC)](https://docs.spring.io/spring-cloud-config/docs/current/reference/html/#_jdbc_backend), [SVN](https://docs.spring.io/spring-cloud-config/docs/current/reference/html/#_version_control_backend_filesystem_use), and [the local file system](https://docs.spring.io/spring-cloud-config/docs/current/reference/html/#_file_system_backend).

### Inspect the deployment architecture

#### Document hardware requirements for each service

For each of your Spring Cloud services (not including the configuration server, registry, or gateway), document the following information:

- The number of instances running.
- The number of CPUs allocated to each instance.
- The amount of RAM allocated to each instance.

#### Document geo-replication and distribution

Determine whether the Spring Cloud applications are currently distributed among several regions or data centers. Document the uptime requirements and SLA for the applications you're migrating.

#### Identify clients that bypass the service registry

Identify any client applications that invoke any of the services to be migrated without using the Spring Cloud Service Registry. After the migration, such invocations are no longer possible. Update these clients to use [Spring Cloud OpenFeign](https://spring.io/projects/spring-cloud-openfeign) before migration.

## Migration

### Remove restricted configurations

The Azure Container Apps environment offers managed Eureka Server, Spring Cloud Config Server, and Admin. When you bind an application to the Java component, Azure Container Apps injects related properties as system environment variables. According to the [Spring Boot Externalized Configuration](https://docs.spring.io/spring-boot/reference/features/external-config.html) design, system environment variables overwrite application properties defined in your code or packaged in artifacts.

If you set one of the following properties through a command-line argument, a Java system property, or the container's environment variable, remove it to avoid conflicts and unexpected behavior:

- `SPRING_CLOUD_CONFIG_COMPONENT_URI`
- `SPRING_CLOUD_CONFIG_URI`
- `SPRING_CONFIG_IMPORT`
- `eureka.client.fetch-registry`
- `eureka.client.service-url.defaultZone`
- `eureka.instance.prefer-ip-address`
- `eureka.client.register-with-eureka`
- `SPRING_BOOT_ADMIN_CLIENT_INSTANCE_PREFER-IP`
- `SPRING_BOOT_ADMIN_CLIENT_URL`

### Create an Azure Container Apps managed environment and apps

Provision an Azure Container Apps app in your Azure subscription on an existing managed environment or create a new one for every service you're migrating. You don't need to create apps that run as Spring Cloud registry and Configuration servers. For more information, see [Quickstart: Deploy your first container app using the Azure portal](quickstart-portal.md).

### Prepare the Spring Cloud Config Server

Configure the Config server in your Azure Container Apps for Spring component. For more information, see [Configure settings for the Config Server for Spring component in Azure Container Apps](java-config-server.md).

> **Note:**
> If your current Spring Cloud Config repository is on the local file system or on-premises, you first need to migrate or replicate your configuration files to a cloud-based repository, such as GitHub, Azure Repos, or BitBucket.

### Ensure console logging and configure diagnostic settings

Configure your logging to ensure that all output goes to the console rather than to files.

After you deploy an application to Azure Container Apps, you can configure the logging options within your Container Apps environment to define one or more destinations for the logs. These destinations can include Azure Monitor Log Analytics, Azure Event Hubs, or even other third-party monitoring solutions. You can also disable log data and view logs only at runtime. For detailed configuration instructions, see [Log storage and monitoring options in Azure Container Apps](log-options.md).

### Configure persistent storage

If any part of your application reads or writes to the local file system, you need to configure persistent storage to replace the local file system. You can specify the path to mount in the container through the app settings and align it with the path your app is using. For more information, see [Use storage mounts in Azure Container Apps](storage-mounts.md).

### Migrate Spring Cloud Vault secrets to Azure Key Vault

You can inject secrets directly into applications through Spring by using the Azure Key Vault Spring Boot Starter. For more information, see [How to use the Spring Boot Starter for Azure Key Vault](https://learn.microsoft.com/azure/developer/java/spring-framework/configure-spring-boot-starter-java-app-with-azure-key-vault).

> **Note:**
> Migration might require you to rename some secrets. Update your application code accordingly.

### Migrate all certificates to Key Vault

Azure Container Apps supports secure communication between apps. Your application doesn't need to manage the process of establishing secure communication. You can upload the private certificate to Azure Container Apps or use a free managed certificate provided by Azure Container Apps. Using Azure Key Vault to manage certificates is a recommended approach. For more information, see [Certificates in Azure Container Apps](certificates-overview.md).

### Configure application performance management (APM) integrations

If you already configured APM-related variables within the container, ensure that you can connect to the target APM platform. If the APM configuration references environment variables from the container, set the runtime environment variables accordingly on Azure Container Apps. Handle sensitive information, such as the connection string, securely. You can either specify it as a secret or reference a secret stored in Azure Key Vault.

### Configure per-service secrets and externalized settings

You can inject configuration settings into each container as environment variables. Any changes in the variables create a new revision for the existing app. Secrets are key-value pairs and remain valid across all revisions.

### Migrate and enable the identity provider

If any of the Spring Cloud applications require authentication or authorization, use the following guidelines to ensure that they're configured to access the identity provider:

- If the identity provider is Microsoft Entra ID, don't make any changes.
- If the identity provider is an on-premises Active Directory forest, consider implementing a hybrid identity solution with Microsoft Entra ID. For guidance, see the [Hybrid identity documentation](https://learn.microsoft.com/azure/active-directory/hybrid/).
- If the identity provider is another on-premises solution, such as PingFederate, consult the [Custom installation of Microsoft Entra Connect](https://learn.microsoft.com/azure/active-directory/hybrid/how-to-connect-install-custom) topic to configure federation with Microsoft Entra ID. Alternatively, consider using Spring Security to use your identity provider through [OAuth2/OpenID Connect](https://docs.spring.io/spring-security/reference/index.html) or [SAML](https://docs.spring.io/spring-security/reference/index.html).

### Update client applications

Update the configuration of all client applications to use the published Azure Container Apps endpoints for migrated applications.

## Post-migration

After you complete the migration, verify that your application works as expected. The following sections describe recommendations for making your application more cloud-native and operationally robust.

### Optimize for cloud-native patterns

The following recommendations help you adopt Spring Cloud components and Azure Container Apps managed Java components to make your application more cloud-native.


#### Service discovery and load balancing

Enable your application to work with the Spring Cloud Registry component so other deployed Spring applications and clients can dynamically discover it. For more information, see [Configure settings for the Eureka Server for Spring component in Azure Container Apps](java-eureka-server.md).

Then, modify any application clients to use the Spring Client Load Balancer. When you use the Spring Client Load Balancer, the client gets addresses for all running instances of the application and finds one that works if another becomes corrupted or unresponsive. For more information, see [Spring Tips: Spring Cloud Load Balancer](https://spring.io/blog/2020/03/25/spring-tips-spring-cloud-loadbalancer) in the Spring Blog.

#### API gateway

Consider adding a [Spring Cloud Gateway](https://cloud.spring.io/spring-cloud-gateway/reference/html/) instance. Spring Cloud Gateway provides a single endpoint for all applications deployed in your Azure Container Apps environment. If you already deployed a Spring Cloud Gateway, ensure that you configured a routing rule to route traffic to your newly deployed application.

#### Centralized configuration

Consider adding a Spring Cloud Config Server to centrally manage and version-control configuration for all your Spring Cloud applications. First, create a Git repository to house the configuration and configure the app instance to use it. For more information, see [Configure settings for the Config Server for Spring component in Azure Container Apps](java-config-server.md).

Migrate your configuration by using the following steps:

1. Inside the application's *src/main/resources* directory, create a *bootstrap.yml* file with the following contents:

    ```yml
    spring:
      application:
        name: <your-application-name>
    ```

1. In the configuration Git repository, create a *\<your-application-name\>.yml* file, where `your-application-name` is the same as in the preceding step. Move the settings from the *application.yml* file in *src/main/resources* to the new file you created. If the settings were previously in a *.properties* file, convert them to YAML first. You can find online tools or IntelliJ plugins to accomplish this conversion.

1. Create an *application.yml* file in the directory you created. Use this file to define settings and resources shared among all applications in the Azure Container Apps environment, such as data sources, logging settings, and Spring Boot Actuator configuration.

1. Commit and push these changes to the Git repository.

1. Remove the *application.properties* or *application.yml* file from the application.

#### Administration

Consider adding the Admin for Spring managed component to enable an administrative interface for Spring Boot web applications that expose actuator endpoints. For more information, see [Configure the Spring Boot Admin component in Azure Container Apps](java-admin.md).


### Improve operational readiness

The following recommendations help you strengthen reliability, observability, and deployment practices for your migrated application.


- **CI/CD pipelines**: Add a deployment pipeline for automatic, consistent deployments. Instructions are available for [Azure Pipelines](azure-pipelines.md) and [GitHub Actions](github-actions.md).
- **Blue-green deployment**: Use container app revisions, revision labels, and ingress traffic weights to test code changes in production before making them available to end users. For more information, see [Blue-Green Deployment in Azure Container Apps](blue-green-deployment.md).
- **Service bindings**: Add service bindings to connect your application to supported Azure databases. Service bindings eliminate the need to provide connection information, including credentials, to your Spring Boot applications.
- **JVM metrics**: Enable the Java development stack to collect JVM core metrics. For more information, see [Java metrics for Java apps in Azure Container Apps](java-metrics.md).
- **Alerts**: Add Azure Monitor alert rules and action groups to quickly detect and address aberrant conditions. For more information, see [Set up alerts in Azure Container Apps](alerts.md).
- **Zone redundancy**: Replicate your app across availability zones by enabling zone redundancy. Traffic is load balanced and automatically routed to replicas if a zone outage occurs. For more information, see [Reliability in Azure Container Apps](https://learn.microsoft.com/azure/reliability/reliability-azure-container-apps).
- **Web Application Firewall**: Protect your container app from common exploits and vulnerabilities by using Web Application Firewall on Application Gateway. For more information, see [Protect Azure Container Apps with Web Application Firewall on Application Gateway](waf-app-gateway.md).


### Replace legacy Spring Cloud Netflix components

If your applications use legacy Spring Cloud Netflix components, consider replacing them with current alternatives, as shown in the following table:

| Legacy component | Current alternative |
| --- | --- |
| Spring Cloud Eureka | Spring Cloud Service Registry |
| Spring Cloud Netflix Zuul | Spring Cloud Gateway |
| Spring Cloud Netflix Archaius | Spring Cloud Config Server |
| Spring Cloud Netflix Ribbon | Spring Cloud Load Balancer (client-side load balancer) |
| Spring Cloud Hystrix | Spring Cloud Circuit Breaker + Resilience4J |
| Spring Cloud Netflix Turbine | Micrometer + Prometheus |
