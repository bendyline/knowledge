---
title: Migrate Spring Boot applications to Azure Container Apps
description: Learn how to assess, migrate, and optimize an existing Spring Boot application for Azure Container Apps.
ms.author: deepganguly
author: deepganguly
ms.service: azure-container-apps
ms.topic: article
ms.date: 03/11/2026
---

# Migrate Spring Boot applications to Azure Container Apps

This guide walks you through the process of migrating an existing Spring Boot application to Azure Container Apps. It covers pre-migration assessment, the migration itself, and post-migration optimization.

## Prerequisites

- An Azure subscription. If you don't have one, [create a free account](https://azure.microsoft.com/pricing/purchase-options/azure-account?cid=msft_learn).
- [Azure CLI](https://learn.microsoft.com/cli/azure/install-azure-cli) installed, or access to the [Azure portal](https://portal.azure.com).
- Familiarity with Spring Boot application development and Docker containers.
- A supported JDK version (8, 11, 17, or 21). For more information, see [Java on Azure Container Apps overview](java-overview.md).

## pre-migration assessment

Before you start the migration, complete the assessment and inventory steps described in the following sections.

### Identify local state

In a platform as a service (PaaS) environment, no application guarantees that it runs as exactly one instance at any given time. Even if you configure a single instance, a duplicate instance can be created when:

- The system must relocate the application to a physical host due to failure or system update.
- The system updates the application.

In both cases, the original instance remains running until the new instance finishes starting. This behavior has the following implications for your application:

- You can't guarantee that any [singleton](https://en.wikipedia.org/wiki/Singleton_pattern) is truly single.
- You're likely to lose any data not persisted to external storage.

Before migrating to Azure Container Apps, ensure that your code doesn't contain local state that must not be lost or duplicated. If local state exists, refactor the code to store that state externally. Cloud-ready applications typically store state in one of the following locations:

- [Azure Cache for Redis](https://learn.microsoft.com/azure/azure-cache-for-redis/cache-java-get-started)
- [Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/create-sql-api-java)
- An external database, such as [Azure SQL](https://learn.microsoft.com/azure/azure-sql/azure-sql-iaas-vs-paas-what-is-overview), [Azure Database for MySQL](https://learn.microsoft.com/azure/mysql/overview), or [Azure Database for PostgreSQL](https://learn.microsoft.com/azure/postgresql/overview)
- [Azure Storage](https://learn.microsoft.com/azure/storage/blobs) for unstructured data or serialized objects

### Review file system usage


Identify any instances where your services read from or write to the local file system. Note which files are short-term or temporary and which files are long-lived.

Azure Container Apps offers several types of storage. By using ephemeral storage, you can read and write temporary data within a running container or replica. By using Azure Files, you can provide permanent storage that multiple containers can share. For more information, see [Use storage mounts in Azure Container Apps](storage-mounts.md).

If your application serves **read-only static content**, consider moving it to Azure Blob Storage and adding Azure CDN for global distribution. For more information, see [Static website hosting in Azure Storage](https://learn.microsoft.com/azure/storage/blobs/storage-blob-static-website) and [Quickstart: Integrate an Azure storage account with Azure CDN](https://learn.microsoft.com/azure/cdn/cdn-create-a-storage-account-with-cdn).

If your application handles **dynamically published static content** (uploaded or generated content that doesn't change after creation), you can integrate Azure Blob Storage and Azure CDN. You can also use an Azure Function to manage uploads and trigger CDN refreshes. For a sample implementation, see [Uploading and CDN-preloading static content with Azure Functions](https://github.com/Azure-Samples/functions-java-push-static-contents-to-cdn).


### Check for OS-specific code


<!-- Used by: migrate-spring-boot.md, migrate-spring-cloud-to-azure-container-apps.md, migrate-tomcat.md -->

If your application contains code with dependencies on the host OS, refactor it to remove those dependencies. For example, replace any use of `/` or `\` in file system paths with [`File.Separator`](https://docs.oracle.com/javase/8/docs/api/java/io/File.html#separator) or [`Paths.get`](https://docs.oracle.com/javase/8/docs/api/java/nio/file/Paths.html#get-java.lang.String-java.lang.String...-).


### Verify platform compatibility


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


#### Identify your Spring Boot version


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


### Identify scheduled jobs

Ephemeral applications such as Unix cron jobs or short-lived applications based on the Spring Batch framework should run as a job on Azure Container Apps. For more information, see [Jobs in Azure Container Apps](jobs.md).

If your application is long-running and executes tasks regularly by using a scheduling framework (such as Quartz or Spring Batch), you can host it on Azure Container Apps. However, the application must handle scaling appropriately to avoid race conditions where the same task runs more than once per scheduled period during scale-out or rolling upgrades.

Take inventory of any scheduled tasks running on the production servers, inside or outside your application code.

### Inventory external resources

Identify external resources, such as data sources, JMS message brokers, and URLs of other services. In Spring Boot applications, you typically find the configuration for such resources in the *src/main/resources* folder, in a file typically called *application.properties* or *application.yml*.

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


#### External caches


Identify any external caches in use. Frequently, you use Redis via Spring Data Redis. For configuration information, see the [Spring Data Redis](https://spring.io/projects/spring-data-redis) documentation.

Determine whether you cache session data via [Spring Session](https://spring.io/projects/spring-session) by searching for the respective configuration (in [Java](https://docs.spring.io/spring-session/reference/3.0/index.html) or [XML](https://docs.spring.io/spring-session/reference/3.0/index.html)).


#### Identity providers

Identify any identity providers that your application uses. For information on how to configure identity providers, see the following resources:

- For OAuth2 configuration, see the [Spring Security reference](https://docs.spring.io/spring-security/reference/index.html).
- For Auth0 Spring Security configuration, see the [Auth0 Spring Security documentation](https://auth0.com/docs/quickstart/backend/java-spring-security5).
- For PingFederate Spring Security configuration, see the [Auth0 PingFederate instructions](https://auth0.com/authenticate/java-spring-security/ping-federate/).

#### Nonstandard ports

By using Azure Container Apps, you can expose ports based on your container app resource configuration. A Spring Boot application listens on port 8080 by default, but you can change this port by using `server.port` or the `SERVER_PORT` environment variable.

#### All other external resources

This guide can't document every possible external dependency. After the migration, verify that you can satisfy every external dependency of your application.

### Inventory configuration, secrets, and certificates

#### Passwords and secure strings

Check all properties, configuration files, and environment variables in the production deployments for any secret strings and passwords. In a Spring Boot application, you typically find these strings in the *application.properties* or *application.yml* file.

#### Certificates


Document all the certificates used for public SSL endpoints or communication with backend databases and other systems. You can view all certificates on the production servers by running the following command:

```bash
keytool -list -v -keystore <path to keystore>
```


### Assess logging and APM

Identify any log aggregation solutions that the applications you're migrating use. You need to configure diagnostic settings during migration to make logged events available for consumption. For more information, see the [Configure logging and diagnostics](#configure-logging-and-diagnostics) section.

Identify any application performance management (APM) agents that your applications use. Azure Container Apps doesn't offer built-in APM support. You need to prepare your container image or integrate the APM tool directly into your code. If you want to measure your application's performance but didn't integrate any APM yet, consider using Azure Application Insights. For more information, see the [Integrate application performance monitoring](#integrate-application-performance-monitoring) section.

### Document deployment architecture

Document the following information for your Spring Boot application:

- The number of instances running.
- The number of CPUs allocated to each instance.
- The amount of RAM allocated to each instance.

Also determine whether you're currently distributing your application instances among several regions or data centers. Document the uptime requirements and SLA for the applications you're migrating.

## Migration

### Create a Container Apps environment

Create a Container Apps environment in your Azure subscription. For more information, see [Quickstart: Deploy your first container app using the Azure portal](quickstart-portal.md).

### Configure logging and diagnostics

Configure your logging to route all output to the console instead of to files.

After you deploy the application to Azure Container Apps, you can configure the logging options within your Container Apps environment to define one or more log destinations. These destinations can include Azure Monitor Log Analytics, Azure Event Hubs, or non-Microsoft monitoring solutions. You can also disable log data storage and view logs only at runtime. For configuration instructions, see [Log storage and monitoring options in Azure Container Apps](log-options.md).

### Configure persistent storage

If any part of your application reads or writes to the local file system, configure persistent storage to replace it. Specify the path to mount in the container through the app settings and align it with the path your application uses. For more information, see [Use storage mounts in Azure Container Apps](storage-mounts.md).

### Migrate certificates to Azure Key Vault

Azure Container Apps supports secure communication between apps. Your application doesn't need to manage the process of establishing secure communication. You can upload a private certificate to Azure Container Apps or use a free managed certificate. Using Azure Key Vault to manage certificates is the recommended approach. For more information, see [Certificates in Azure Container Apps](certificates-overview.md).

### Integrate application performance monitoring

Whether you deploy your app from a container image or from code, Azure Container Apps doesn't interfere with your image or code. Integrating your application with an APM tool depends on your preferences and implementation.

If your application isn't using a supported APM, consider Azure Application Insights. For more information, see [Using Azure Monitor Application Insights with Spring Boot](https://learn.microsoft.com/azure/azure-monitor/app/java-spring-boot).

### Deploy the application

Deploy each of your migrated microservices (not including Spring Cloud Config Server and Spring Cloud Service Registry), as described in [Deploy Azure Container Apps with the `az containerapp up` command](containerapp-up.md).

### Configure secrets and environment variables

You can inject configuration settings into each application as environment variables. Set these variables as manual entries or as references to secrets. For more information, see [Manage environment variables on Azure Container Apps](environment-variables.md).

### Set up identity and authentication

If any of your Spring Boot applications require authentication or authorization, ensure they're configured to access the identity provider:

- If the identity provider is Microsoft Entra ID, don't make any changes.
- If the identity provider is an on-premises Active Directory forest, consider implementing a hybrid identity solution with Microsoft Entra ID. For more information, see the [Hybrid identity documentation](https://learn.microsoft.com/azure/active-directory/hybrid/).

- If the identity provider is another on-premises solution, such as PingFederate, see [Custom installation of Microsoft Entra Connect](https://learn.microsoft.com/azure/active-directory/hybrid/how-to-connect-install-custom) to configure federation with Microsoft Entra ID.

Alternatively, consider using Spring Security to use your identity provider through [OAuth2/OpenID Connect](https://docs.spring.io/spring-security/reference/index.html) or [SAML](https://docs.spring.io/spring-security/reference/index.html).

### Expose the application

By default, an application deployed to Azure Container Apps is accessible through an application URL. If you deploy your app in a managed environment with its own virtual network, determine the app's accessibility level to allow public ingress or ingress from your virtual network only. For more information, see [Networking in Azure Container Apps environment](networking.md).

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


## Related content

- [Java on Azure Container Apps overview](java-overview.md)
- [Quickstart: Deploy your first container app using the Azure portal](quickstart-portal.md)
- [Migrate Spring Cloud applications to Azure Container Apps](migrate-spring-cloud.md)
- [Migrate Tomcat applications to Azure Container Apps](migrate-tomcat.md)
