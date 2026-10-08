---
title: List of options classes
description: Explore a listing of options classes in .NET Orleans.
ms.date: 01/21/2026
ms.topic: reference
zone_pivot_groups: orleans-version
---

# List of options classes

All options classes used to configure Orleans are found in the `Orleans.Configuration` namespace. Many also have helper methods in the `Orleans.Hosting` namespace.

**Applies to: orleans-7-0,orleans-8-0,orleans-9-0,orleans-10-0**


## Common core options for client and silo builders

| Option type | Used for |
| --- | --- |
| [Orleans.Configuration.ClusterOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClusterOptions) | Setting the [Orleans.Configuration.ClusterOptions.ClusterId](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClusterOptions.ClusterId) and the [Orleans.Configuration.ClusterOptions.ServiceId](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClusterOptions.ServiceId) |
| [Orleans.Configuration.NetworkingOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.NetworkingOptions) | Setting timeout values for sockets and opened connections |
| [Orleans.Configuration.SerializationProviderOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.SerializationProviderOptions) | Setting the serialization providers |
| [Orleans.Configuration.TypeManagementOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.TypeManagementOptions) | Setting the refresh period of the Type Map (see Heterogeneous silos and Versioning) |

## [Orleans.IClientBuilder](https://learn.microsoft.com/search/?terms=Orleans.IClientBuilder)-specific options

| Option type | Used for |
| --- | --- |
| [Orleans.Configuration.ClientMessagingOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClientMessagingOptions) | Setting the number of connections to keep open, and specify what network interface to use |
| [Orleans.Configuration.StatisticsOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.StatisticsOptions) | Settings related to statistics output |
| [Orleans.Configuration.GatewayOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.GatewayOptions) | Setting the refresh period of the list of available gateways |
| [Orleans.Configuration.StaticGatewayListProviderOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.StaticGatewayListProviderOptions) | Setting URIs a client will use to connect to cluster |

## [Orleans.Hosting.ISiloBuilder](https://learn.microsoft.com/search/?terms=Orleans.Hosting.ISiloBuilder)-specific options

| Option type | Used for |
| --- | --- |
| [Orleans.Configuration.ClusterMembershipOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClusterMembershipOptions) | Settings for cluster membership |
| [Orleans.Configuration.ConsistentRingOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ConsistentRingOptions) | Configuration options for consistent hashing algorithm, used to balance resource allocations across the cluster. |
| [Orleans.Configuration.EndpointOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.EndpointOptions) | Setting the Silo endpoint options |
| [Orleans.Configuration.GrainCollectionOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.GrainCollectionOptions) | Options for grain garbage collection |
| [Orleans.Configuration.GrainVersioningOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.GrainVersioningOptions) | Governs grain implementation selection in heterogeneous deployments |
| [Orleans.Configuration.LoadSheddingOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.LoadSheddingOptions) | Settings for load shedding configuration. |
| [Orleans.Configuration.PerformanceTuningOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.PerformanceTuningOptions) | Performance tuning options (networking, number of threads) |
| [Orleans.Configuration.ProcessExitHandlingOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ProcessExitHandlingOptions) | Configure silo behavior on process exit |
| [Orleans.Configuration.SchedulingOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.SchedulingOptions) | Configuring scheduler behavior |
| [Orleans.Configuration.SiloMessagingOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.SiloMessagingOptions) | Configuring global messaging options that are silo related. |
| [Orleans.Configuration.SiloOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.SiloOptions) | Setting the name of the Silo |
| [Orleans.Configuration.StatisticsOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.StatisticsOptions) | Setting related to statistics output |
| [Orleans.Configuration.TelemetryOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.TelemetryOptions) | Setting telemetry consumer settings |



**Applies to: orleans-3-x**


## Common core options for [Orleans.IClientBuilder](https://learn.microsoft.com/search/?terms=Orleans.IClientBuilder) and [Orleans.Hosting.ISiloHostBuilder](https://learn.microsoft.com/search/?terms=Orleans.Hosting.ISiloHostBuilder)

| Option type | Used for |
| --- | --- |
| [Orleans.Configuration.ClusterOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClusterOptions) | Setting the [Orleans.Configuration.ClusterOptions.ClusterId](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClusterOptions.ClusterId) and the [Orleans.Configuration.ClusterOptions.ServiceId](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClusterOptions.ServiceId) |
| [Orleans.Configuration.NetworkingOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.NetworkingOptions) | Setting timeout values for sockets and opened connections |
| [Orleans.Configuration.SerializationProviderOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.SerializationProviderOptions) | Setting the serialization providers |
| [Orleans.Configuration.TypeManagementOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.TypeManagementOptions) | Setting the refresh period of the Type Map (see Heterogeneous silos and Versioning) |

## [Orleans.IClientBuilder](https://learn.microsoft.com/search/?terms=Orleans.IClientBuilder)-specific options

| Option type | Used for |
| --- | --- |
| [Orleans.Configuration.ClientMessagingOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClientMessagingOptions) | Setting the number of connections to keep open, and specify what network interface to use |
| [Orleans.Configuration.StatisticsOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.StatisticsOptions) | Settings related to statistics output |
| [Orleans.Configuration.GatewayOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.GatewayOptions) | Setting the refresh period of the list of available gateways |
| [Orleans.Configuration.StaticGatewayListProviderOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.StaticGatewayListProviderOptions) | Setting URIs a client will use to connect to cluster |

## [Orleans.Hosting.ISiloHostBuilder](https://learn.microsoft.com/search/?terms=Orleans.Hosting.ISiloHostBuilder)-specific options

| Option type | Used for |
| --- | --- |
| [Orleans.Configuration.ClusterMembershipOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ClusterMembershipOptions) | Settings for cluster membership |
| [Orleans.Configuration.ConsistentRingOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ConsistentRingOptions) | Configuration options for consistent hashing algorithm, used to balance resource allocations across the cluster. |
| [Orleans.Configuration.EndpointOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.EndpointOptions) | Setting the Silo endpoint options |
| [Orleans.Configuration.GrainCollectionOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.GrainCollectionOptions) | Options for grain garbage collection |
| [Orleans.Configuration.GrainVersioningOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.GrainVersioningOptions) | Governs grain implementation selection in heterogeneous deployments |
| [Orleans.Configuration.LoadSheddingOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.LoadSheddingOptions) | Settings for load shedding configuration. Must have a registered implementation of [Orleans.Statistics.IHostEnvironmentStatistics](https://learn.microsoft.com/search/?terms=Orleans.Statistics.IHostEnvironmentStatistics) such as through [Orleans.Statistics.ClientBuilderExtensions.UsePerfCounterEnvironmentStatistics*](https://learn.microsoft.com/search/?terms=Orleans.Statistics.ClientBuilderExtensions.UsePerfCounterEnvironmentStatistics*) or [Orleans.Statistics.SiloHostBuilderExtensions.UsePerfCounterEnvironmentStatistics*](https://learn.microsoft.com/search/?terms=Orleans.Statistics.SiloHostBuilderExtensions.UsePerfCounterEnvironmentStatistics*) (Windows only) for `LoadShedding` to function. |
| [Orleans.Configuration.PerformanceTuningOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.PerformanceTuningOptions) | Performance tuning options (networking, number of threads) |
| [Orleans.Configuration.ProcessExitHandlingOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.ProcessExitHandlingOptions) | Configure silo behavior on process exit |
| [Orleans.Configuration.SchedulingOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.SchedulingOptions) | Configuring scheduler behavior |
| [Orleans.Configuration.SiloMessagingOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.SiloMessagingOptions) | Configuring global messaging options that are silo related. |
| [Orleans.Configuration.SiloOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.SiloOptions) | Setting the name of the Silo |
| [Orleans.Configuration.StatisticsOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.StatisticsOptions) | Setting related to statistics output |
| [Orleans.Configuration.TelemetryOptions](https://learn.microsoft.com/search/?terms=Orleans.Configuration.TelemetryOptions) | Setting telemetry consumer settings |
