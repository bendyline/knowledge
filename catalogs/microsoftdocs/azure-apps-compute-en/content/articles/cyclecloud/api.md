---
title: API Reference
description: Read the Azure CycleCloud REST API Reference. Review commands for operations and resources, such as getting cluster nodes or getting the status of the cluster.
author: adriankjohnson
ms.topic: reference
ms.date: 06/19/2026
ms.author: adjohnso
monikerRange: '>= cyclecloud-8'
---
# Operations

**Applies to: \>= cyclecloud-8**

Azure CycleCloud provides a REST API for managing clusters, nodes, and related resources programmatically. Use these API operations to query cluster state, create and manage nodes, and track long-running operations. This reference lists the available endpoints, parameters, and response formats to help you automate and integrate CycleCloud cluster management into your workflows.

<a name="clusters_getnodes"></a>
## Get cluster nodes
```
GET /clusters/{cluster}/nodes
```

### Parameters

| Type | Name | Description | Schema |
| --- | --- | --- | --- |
| **Path** | **cluster**  <br>*required* | The cluster to query | string |
| **Query** | **operation**  <br>*optional* | If given, returns only the nodes for this operation ID, and includes the operation attribute on the body | string |
| **Query** | **request_id**  <br>*optional* | If given, returns only the nodes for the operation identified by this request ID, and includes the operation attribute on the body | string |


### Responses

| HTTP Code | Description | Schema |
| --- | --- | --- |
| **200** | OK | [NodeList](#nodelist) |
| **400** | Invalid specification | No Content |
| **404** | Not found | No Content |


### Example HTTP request

#### Request path
```
/clusters/CLUSTER_NAME/nodes
```


### Example HTTP response

#### Response 200
```json
{
  "nodes" : [ { } ],
  "operation" : {
    "action" : "string",
    "startTime" : "2020-01-01T12:34:56Z"
  }
}
```


<a name="clusters_createnodes"></a>
## Create cluster nodes
```
POST /clusters/{cluster}/nodes/create
```


### Description
This operation adds new nodes from a nodearray to a cluster. It accepts multiple node definitions in a single call. It returns the URL to the operation that can be used to track the status of the operation.


### Parameters

| Type | Name | Description | Schema |
| --- | --- | --- | --- |
| **Path** | **cluster**  <br>*required* | The cluster to add nodes to | string |
| **Body** | **nodes**  <br>*required* | Sets of nodes to be created | [NodeCreationRequest](#nodecreationrequest) |


### Responses

| HTTP Code | Description | Schema |
| --- | --- | --- |
| **202** | Accepted  <br>**Headers** :   <br>`Location` (string): The URL for the operation. | [NodeCreationResult](#nodecreationresult) |
| **409** | Invalid input | No Content |




### Example HTTP request

#### Request path
```
/clusters/CLUSTER_NAME/nodes/create
```


#### Request body
```json
{
  "requestId" : "00000000-0000-0000-0000-000000000000",
  "sets" : [ "object" ]
}
```


### Example HTTP response

#### Response 202
```json
{
  "operationId" : "00000000-0000-0000-0000-000000000000",
  "sets" : [ "object" ]
}
```


<a name="clusters_deallocatenodes"></a>
## Deallocate cluster nodes
```
POST /clusters/{cluster}/nodes/deallocate
```


### Description
This operation deallocates nodes in a cluster. The nodes can be identified in several ways,  including node name, node ID, or by filter.


### Parameters

| Type | Name | Description | Schema |
| --- | --- | --- | --- |
| **Path** | **cluster**  <br>*required* | The cluster to deallocate nodes in | string |
| **Body** | **action**  <br>*required* | Description of which nodes to deallocate | [NodeManagementRequest](#nodemanagementrequest) |


### Responses

| HTTP Code | Description | Schema |
| --- | --- | --- |
| **202** | Accepted  <br>**Headers** :   <br>`Location` (string): The URL for the operation. | [NodeManagementResult](#nodemanagementresult) |
| **409** | Invalid input | No Content |




### Example HTTP request

#### Request path
```
/clusters/CLUSTER_NAME/nodes/deallocate
```


#### Request body
```json
{
  "filter" : "State === \"Started\"",
  "hostnames" : [ "hostname1", "hostname2" ],
  "ids" : [ "id1", "id2" ],
  "ip_addresses" : [ "10.0.1.1", "10.1.1.2" ],
  "names" : [ "name1", "name2" ],
  "requestId" : "00000000-0000-0000-0000-000000000000"
}
```


### Example HTTP response

#### Response 202
```json
{
  "nodes" : [ "object" ],
  "operationId" : "00000000-0000-0000-0000-000000000000"
}
```


<a name="clusters_reimagenodes"></a>
## Reimage cluster nodes
```
POST /clusters/{cluster}/nodes/reimage
```


### Description
This operation reimages nodes in a cluster. The nodes can be identified in several ways,  including node name, node ID, or by filter.


### Parameters

| Type | Name | Description | Schema |
| --- | --- | --- | --- |
| **Path** | **cluster**  <br>*required* | The cluster to reimage nodes in | string |
| **Body** | **action**  <br>*required* | Description of which nodes to reimage | [NodeManagementRequest](#nodemanagementrequest) |


### Responses

| HTTP Code | Description | Schema |
| --- | --- | --- |
| **202** | Accepted  <br>**Headers** :   <br>`Location` (string): The URL for the operation. | [NodeManagementResult](#nodemanagementresult) |
| **409** | Invalid input | No Content |




### Example HTTP request

#### Request path
```
/clusters/CLUSTER_NAME/nodes/reimage
```


#### Request body
```json
{
  "filter" : "State === \"Started\"",
  "hostnames" : [ "hostname1", "hostname2" ],
  "ids" : [ "id1", "id2" ],
  "ip_addresses" : [ "10.0.1.1", "10.1.1.2" ],
  "names" : [ "name1", "name2" ],
  "requestId" : "00000000-0000-0000-0000-000000000000"
}
```


### Example HTTP response

#### Response 202
```json
{
  "nodes" : [ "object" ],
  "operationId" : "00000000-0000-0000-0000-000000000000"
}
```


<a name="clusters_removenodes"></a>
## Terminate and remove cluster nodes
```
POST /clusters/{cluster}/nodes/remove
```


### Description
This operation removes nodes in a cluster. You can identify the nodes by node name, node ID, or filter. By default, CycleCloud removes nodes on termination, so this call behaves like terminate. Nodes with the Fixed attribute set to true aren't removed on termination.


### Parameters

| Type | Name | Description | Schema |
| --- | --- | --- | --- |
| **Path** | **cluster**  <br>*required* | The cluster to remove nodes in | string |
| **Body** | **action**  <br>*required* | Description of which nodes to remove | [NodeManagementRequest](#nodemanagementrequest) |


### Responses

| HTTP Code | Description | Schema |
| --- | --- | --- |
| **202** | Accepted  <br>**Headers** :   <br>`Location` (string): The URL for the operation. | [NodeManagementResult](#nodemanagementresult) |
| **409** | Invalid input | No Content |




### Example HTTP request

#### Request path
```
/clusters/CLUSTER_NAME/nodes/remove
```


#### Request body
```json
{
  "filter" : "State === \"Started\"",
  "hostnames" : [ "hostname1", "hostname2" ],
  "ids" : [ "id1", "id2" ],
  "ip_addresses" : [ "10.0.1.1", "10.1.1.2" ],
  "names" : [ "name1", "name2" ],
  "requestId" : "00000000-0000-0000-0000-000000000000"
}
```


### Example HTTP response

#### Response 202
```json
{
  "nodes" : [ "object" ],
  "operationId" : "00000000-0000-0000-0000-000000000000"
}
```


<a name="clusters_restartnodes"></a>
## Restart cluster nodes
```
POST /clusters/{cluster}/nodes/restart
```


### Description
This operation restarts nodes in a cluster. The nodes can be identified in several ways,  including node name, node ID, or by filter.


### Parameters

| Type | Name | Description | Schema |
| --- | --- | --- | --- |
| **Path** | **cluster**  <br>*required* | The cluster to restart nodes in | string |
| **Body** | **action**  <br>*required* | Description of which nodes to restart | [NodeManagementRequest](#nodemanagementrequest) |


### Responses

| HTTP Code | Description | Schema |
| --- | --- | --- |
| **202** | Accepted  <br>**Headers** :   <br>`Location` (string): The URL for the operation. | [NodeManagementResult](#nodemanagementresult) |
| **409** | Invalid input | No Content |




### Example HTTP request

#### Request path
```
/clusters/CLUSTER_NAME/nodes/restart
```


#### Request body
```json
{
  "filter" : "State === \"Started\"",
  "hostnames" : [ "hostname1", "hostname2" ],
  "ids" : [ "id1", "id2" ],
  "ip_addresses" : [ "10.0.1.1", "10.1.1.2" ],
  "names" : [ "name1", "name2" ],
  "requestId" : "00000000-0000-0000-0000-000000000000"
}
```


### Example HTTP response

#### Response 202
```json
{
  "nodes" : [ "object" ],
  "operationId" : "00000000-0000-0000-0000-000000000000"
}
```


<a name="clusters_shutdownnodes"></a>
## Terminate or deallocate cluster nodes
```
POST /clusters/{cluster}/nodes/shutdown
```


### Description
This call shuts down nodes in a cluster. Each node's ShutdownPolicy attribute decides the action: Terminate (default) or Deallocate.

### Parameters

| Type | Name | Description | Schema |
| --- | --- | --- | --- |
| **Path** | **cluster**  <br>*required* | The cluster to shut down nodes in | string |
| **Body** | **action**  <br>*required* | Description of which nodes to shut down | [NodeManagementRequest](#nodemanagementrequest) |


### Responses

| HTTP Code | Description | Schema |
| --- | --- | --- |
| **202** | Accepted  <br>**Headers** :   <br>`Location` (string): The URL for the operation. | [NodeManagementResult](#nodemanagementresult) |
| **409** | Invalid input | No Content |




### Example HTTP request

#### Request path
```
/clusters/CLUSTER_NAME/nodes/shutdown
```


#### Request body
```json
{
  "filter" : "State === \"Started\"",
  "hostnames" : [ "hostname1", "hostname2" ],
  "ids" : [ "id1", "id2" ],
  "ip_addresses" : [ "10.0.1.1", "10.1.1.2" ],
  "names" : [ "name1", "name2" ],
  "requestId" : "00000000-0000-0000-0000-000000000000"
}
```


### Example HTTP response

#### Response 202
```json
{
  "nodes" : [ "object" ],
  "operationId" : "00000000-0000-0000-0000-000000000000"
}
```


<a name="clusters_startnodes"></a>
## Start deallocated or terminated cluster nodes
```
POST /clusters/{cluster}/nodes/start
```


### Description
This operation starts nodes in a cluster. The nodes can be identified in several ways,  including node name, node ID, or by filter.


### Parameters

| Type | Name | Description | Schema |
| --- | --- | --- | --- |
| **Path** | **cluster**  <br>*required* | The cluster to start nodes in | string |
| **Body** | **action**  <br>*required* | Description of which nodes to start | [NodeManagementRequest](#nodemanagementrequest) |


### Responses

| HTTP Code | Description | Schema |
| --- | --- | --- |
| **202** | Accepted  <br>**Headers** :   <br>`Location` (string): The URL for the operation. | [NodeManagementResult](#nodemanagementresult) |
| **409** | Invalid input | No Content |




### Example HTTP request

#### Request path
```
/clusters/CLUSTER_NAME/nodes/start
```


#### Request body
```json
{
  "filter" : "State === \"Started\"",
  "hostnames" : [ "hostname1", "hostname2" ],
  "ids" : [ "id1", "id2" ],
  "ip_addresses" : [ "10.0.1.1", "10.1.1.2" ],
  "names" : [ "name1", "name2" ],
  "requestId" : "00000000-0000-0000-0000-000000000000"
}
```


### Example HTTP response

#### Response 202
```json
{
  "nodes" : [ "object" ],
  "operationId" : "00000000-0000-0000-0000-000000000000"
}
```


<a name="clusters_terminatenodes"></a>
## Terminate cluster nodes
```
POST /clusters/{cluster}/nodes/terminate
```


### Description
This operation terminates nodes in a cluster. The nodes can be identified in several ways,  including node name, node ID, or by filter.


### Parameters

| Type | Name | Description | Schema |
| --- | --- | --- | --- |
| **Path** | **cluster**  <br>*required* | The cluster to terminate nodes in | string |
| **Body** | **action**  <br>*required* | Description of which nodes to terminate | [NodeManagementRequest](#nodemanagementrequest) |


### Responses

| HTTP Code | Description | Schema |
| --- | --- | --- |
| **202** | Accepted  <br>**Headers** :   <br>`Location` (string): The URL for the operation. | [NodeManagementResult](#nodemanagementresult) |
| **409** | Invalid input | No Content |




### Example HTTP request

#### Request path
```
/clusters/CLUSTER_NAME/nodes/terminate
```


#### Request body
```json
{
  "filter" : "State === \"Started\"",
  "hostnames" : [ "hostname1", "hostname2" ],
  "ids" : [ "id1", "id2" ],
  "ip_addresses" : [ "10.0.1.1", "10.1.1.2" ],
  "names" : [ "name1", "name2" ],
  "requestId" : "00000000-0000-0000-0000-000000000000"
}
```


### Example HTTP response

#### Response 202
```json
{
  "nodes" : [ "object" ],
  "operationId" : "00000000-0000-0000-0000-000000000000"
}
```


<a name="clusters_ghrnode"></a>
## Submit Guest Health Report for cluster node
```
POST /clusters/{cluster}/nodes/{node}/ghr
```


### Description
Submit a health report for a node with a health issue


### Parameters

| Type | Name | Description | Schema |
| --- | --- | --- | --- |
| **Path** | **cluster**  <br>*required* | The cluster that contains the node to report | string |
| **Path** | **node**  <br>*required* | The node to report | string |
| **Query** | **category**  <br>*optional* | Guest Health Report category for the impact | string |
| **Query** | **description**  <br>*optional* | Custom message describing the failure or context | string |


### Responses

| HTTP Code | Description | Schema |
| --- | --- | --- |
| **202** | Accepted | No Content |
| **400** | Invalid input | No Content |
| **404** | Not Found | No Content |
| **409** | Conflict - Guest Health Report already submitted for this node | No Content |




### Example HTTP request

#### Request path
```
/clusters/CLUSTER_NAME/nodes/string/ghr
```


<a name="clusters_getghr"></a>
## Get Guest Health Report for cluster node
```
GET /clusters/{cluster}/nodes/{node}/ghr
```


### Description
Returns the workload impact of a node with a health issue, so you can submit it to the health reporting endpoint.


### Parameters

| Type | Name | Description | Schema |
| --- | --- | --- | --- |
| **Path** | **cluster**  <br>*required* | The cluster that contains the node to report | string |
| **Path** | **node**  <br>*required* | The node to report | string |
| **Query** | **category**  <br>*optional* | Guest Health Report category for the impact | string |
| **Query** | **description**  <br>*optional* | Custom message describing the failure or context | string |


### Responses

| HTTP Code | Description | Schema |
| --- | --- | --- |
| **200** | Ok | No Content |
| **400** | Invalid input | No Content |
| **404** | Not Found | No Content |




### Example HTTP request

#### Request path
```
/clusters/CLUSTER_NAME/nodes/string/ghr
```


<a name="clusters_scale"></a>
## Scale cluster to size
```
POST /clusters/{cluster}/scale/{nodearray}
```


### Description
This operation adds nodes as needed to a nodearray to hit a total count. The request is processed one time and doesn't re-add nodes later to maintain the given number. Specify the target size using either `totalCoreCount` (total CPU cores) or `totalNodeCount` (total VMs), but not both in the same request. It returns the URL to the operation that you can use to track its status.


### Parameters

| Type | Name | Description | Schema |
| --- | --- | --- | --- |
| **Path** | **cluster**  <br>*required* | The cluster to add nodes to | string |
| **Path** | **nodearray**  <br>*required* | The nodearray to add nodes to | string |
| **Query** | **totalCoreCount**  <br>*optional* | The total number of cores to have in this nodearray, including nodes already created | integer |
| **Query** | **totalNodeCount**  <br>*optional* | The total number of machines to have in this nodearray, including nodes already created | integer |


### Responses

| HTTP Code | Description | Schema |
| --- | --- | --- |
| **202** | Accepted  <br>**Headers** :   <br>`Location` (string): The URL for the operation. | [NodeCreationResult](#nodecreationresult) |
| **409** | Invalid input | No Content |




### Example HTTP request

#### Request path
```
/clusters/CLUSTER_NAME/scale/NODEARRAY_NAME
```


### Example HTTP response

#### Response 202
```json
{
  "operationId" : "00000000-0000-0000-0000-000000000000",
  "sets" : [ "object" ]
}
```


<a name="clusters_getclusterstatus"></a>
## Get cluster status
```
GET /clusters/{cluster}/status
```


### Description
This operation contains information for the nodes and nodearrays in a given cluster. For each nodearray, it returns the status of each available allocation "bucket". The status includes the current node count in the bucket and how many more nodes you can add. Each bucket is a set of possible VMs of a given hardware profile that can be created in a given location under a given customer account, etc. The user's cluster definition determines the valid buckets for a nodearray, but the cloud provider partly determines the limits.


### Parameters

| Type | Name | Description | Schema |
| --- | --- | --- | --- |
| **Path** | **cluster**  <br>*required* | The cluster to query | string |
| **Query** | **nodes**  <br>*optional* | If true, nodes and node references are returned in the response | boolean |


### Responses

| HTTP Code | Description | Schema |
| --- | --- | --- |
| **200** | OK | [ClusterStatus](#clusterstatus) |




### Example HTTP request

#### Request path
```
/clusters/CLUSTER_NAME/status
```


### Example HTTP response

#### Response 200
```json
{
  "maxCoreCount" : 16,
  "maxCount" : 4,
  "nodearrays" : [ "object" ],
  "nodes" : [ { } ],
  "state" : "Starting",
  "targetState" : "Started"
}
```


<a name="clusters_getclusterusage"></a>
## Get usage and optional cost information for a cluster
```
GET /clusters/{cluster}/usage
```


### Description
This operation returns overall usage data (core hours) and cost data, if available, for the cluster, and a per-nodearray breakdown. By default it returns the current month's worth of usage.


### Parameters

| Type | Name | Description | Schema |
| --- | --- | --- | --- |
| **Path** | **cluster**  <br>*required* | The cluster to return usage data for | string |
| **Query** | **timeframe**  <br>*optional* | The time range to use for the query. Valid values: `monthToDate` (current month), `lastMonth` (previous month), `weekToDate` (current week, starting Sunday), or `custom` (requires the `from` and `to` query parameters). The default is `monthToDate`. All times are in UTC. | enum (monthToDate, lastMonth, weekToDate, custom) |
| **Query** | **from**  <br>*optional* | For custom timeframes, this value is the start of the timeframe in ISO-8601 format. It is rounded down to the nearest hour or day. | string |
| **Query** | **to**  <br>*optional* | For custom timeframes, this value is the end of the timeframe in ISO-8601 format. It is rounded up to the nearest hour or day. | string |
| **Query** | **granularity**  <br>*optional* | Specifies how to aggregate data: hourly, daily, or as a single total. The default interval is daily. | enum (total, daily, hourly) |


### Responses

| HTTP Code | Description | Schema |
| --- | --- | --- |
| **200** | OK | [ClusterUsage](#clusterusage) |




### Example HTTP request

#### Request path
```
/clusters/CLUSTER_NAME/usage
```


### Example HTTP response

#### Response 200
```json
{
  "usage" : [ "object" ]
}
```


<a name="operations_list"></a>
## List the status of operations
```
GET /operations/
```


### Parameters

| Type | Name | Description | Schema |
| --- | --- | --- | --- |
| **Query** | **request_id**  <br>*optional* | The request ID for the operation. If this value is given, the list contains 0 or 1 element. | string |


### Responses

| HTTP Code | Description | Schema |
| --- | --- | --- |
| **200** | OK | < [OperationStatus](#operationstatus) > array |
| **400** | Invalid request | No Content |
| **404** | Not found | No Content |




### Example HTTP request

#### Request path
```
/operations/
```


### Example HTTP response

#### Response 200
```json
[ {
  "action" : "string",
  "startTime" : "2020-01-01T12:34:56Z"
} ]
```


<a name="operations_getstatus"></a>
## Gets operation status by ID
```
GET /operations/{id}
```


### Parameters

| Type | Name | Description | Schema |
| --- | --- | --- | --- |
| **Path** | **id**  <br>*required* | The operation ID | string |


### Responses

| HTTP Code | Description | Schema |
| --- | --- | --- |
| **200** | OK | [OperationStatus](#operationstatus) |
| **404** | Not found | No Content |




### Example HTTP request

#### Request path
```
/operations/00000000-0000-0000-0000-000000000000
```


### Example HTTP response

#### Response 200
```json
{
  "action" : "string",
  "startTime" : "2020-01-01T12:34:56Z"
}
```






## Resources

**Applies to: \>= cyclecloud-8**

Azure CycleCloud defines a set of resource models that describe clusters, node arrays, nodes, and allocation state. These resources are returned by the REST API and provide details such as capacity limits, usage, and cluster state. Use this reference to understand the structure and properties of API responses when managing and monitoring CycleCloud clusters programmatically.

<a name="clusterstatus"></a>
## ClusterStatus
Status of the cluster


| Name | Description | Schema |
| --- | --- | --- |
| **maxCoreCount**  <br>*required* | The maximum number of cores that may be added to this cluster  <br>**Example** : `16` | integer |
| **maxCount**  <br>*required* | The maximum number of nodes that may be added to this cluster  <br>**Example** : `4` | integer |
| **nodearrays**  <br>*required* | **Example** : `[ "object" ]` | < [nodearrays](#clusterstatus-nodearrays) > array |
| **nodes**  <br>*optional* | An optional list of nodes in this cluster, only included if nodes=true is in the query  <br>**Example** : `[ "[node](#node)" ]` | < [Node](#node) > array |
| **state**  <br>*optional* | The current state of the cluster, available after at least one start  <br>**Example** : `"Starting"` | string |
| **targetState**  <br>*optional* | The desired state of the cluster (for example, Started or Terminated)  <br>**Example** : `"Started"` | string |

<a name="clusterstatus-nodearrays"></a>
**nodearrays**

| Name | Description | Schema |
| --- | --- | --- |
| **buckets**  <br>*required* | Each bucket of allocation for this nodearray. The "core count" settings are always a multiple of the core count for this bucket.  <br>**Example** : `[ "object" ]` | < [buckets](#clusterstatus-buckets) > array |
| **maxCoreCount**  <br>*required* | The maximum number of cores that may be in this nodearray  <br>**Example** : `16` | integer |
| **maxCount**  <br>*required* | The maximum number of nodes that may be in this nodearray  <br>**Example** : `4` | integer |
| **name**  <br>*required* | The name of the nodearray  <br>**Example** : `"execute"` | string |
| **nodearray**  <br>*required* | The attributes of this nodearray  <br>**Example** : `"[node](#node)"` | [Node](#node) |

<a name="clusterstatus-buckets"></a>
**buckets**

| Name | Description | Schema |
| --- | --- | --- |
| **activeCoreCount**  <br>*required* | The number of cores in use for this bucket, in this nodearray  <br>**Example** : `40` | integer |
| **activeCount**  <br>*required* | The number of nodes in use for this bucket, in this nodearray. This number includes nodes that are still acquiring a VM.  <br>**Example** : `10` | integer |
| **activeNodes**  <br>*optional* | Names of the nodes in use for this bucket within the nodearray, including nodes that are still acquiring a VM. Returned only when the query includes nodes=true.  <br>**Example** : `[ "string" ]` | < string > array |
| **availableCoreCount**  <br>*required* | How many extra cores may be created in this bucket, in this nodearray. Always a multiple of availableCount.  <br>**Example** : `8` | integer |
| **availableCount**  <br>*required* | The number of additional nodes that can be created in this bucket within the nodearray. The value can be lower than `maxCount` minus `usedCount` because `maxCount` may be capped by a global limit.  <br>**Example** : `2` | integer |
| **bucketId**  <br>*required* | The unique identifier for the bucket. The value remains the same for a given bucket in a nodearray for the lifetime of the cluster.  <br>**Example** : `"00000000-0000-0000-0000-000000000000"` | string |
| **consumedCoreCount**  <br>*required* | The number of cores for this family that are already in use across the entire region.  <br>**Example** : `2` | integer |
| **definition**  <br>*optional* | The properties used to create nodes from this bucket. The create-nodes API takes this definition in its `bucket` property.  <br>**Example** : `"object"` | [definition](#clusterstatus-buckets-definition) |
| **familyConsumedCoreCount**  <br>*optional* | The number of cores for this family that are already in use across the entire region.  <br>**Example** : `2` | integer |
| **familyQuotaCoreCount**  <br>*optional* | The total number of cores that can run for this VM family in the region. The value isn't necessarily an integer multiple of `familyQuotaCount`.  <br>**Example** : `16` | integer |
| **familyQuotaCount**  <br>*optional* | The number of total instances that can be started (given familyQuotaCoreCount)  <br>**Example** : `4` | integer |
| **invalidReason**  <br>*required* | The reason the bucket is invalid when `valid` is false. Currently, the only possible values are `NotActivated` and `DisabledMachineType`.  <br>**Example** : `"DisabledMachineType"` | string |
| **lastCapacityFailure**  <br>*required* | The number of seconds since this bucket experienced a capacity failure. Any negative value is treated as never.  <br>**Example** : `180.0` | number |
| **maxCoreCount**  <br>*required* | The maximum number of cores that may be in this bucket, including global and nodearray limits. Always a multiple of maxCount.  <br>**Example** : `16` | integer |
| **maxCount**  <br>*required* | The maximum number of nodes that may be in this bucket, including global and nodearray limits  <br>**Example** : `4` | integer |
| **maxPlacementGroupCoreSize**  <br>*required* | The maximum total number of cores that can be in a placement group in this bucket. Always a multiple of maxPlacementGroupSize.  <br>**Example** : `64` | integer |
| **maxPlacementGroupSize**  <br>*required* | The maximum total number of instances that can be in a placement group in this bucket  <br>**Example** : `16` | integer |
| **placementGroups**  <br>*required* | The placement groups in use for this nodearray, if any.  <br>**Example** : `[ "object" ]` | < [placementGroups](#clusterstatus-buckets-placementgroups) > array |
| **quotaCoreCount**  <br>*required* | The total number of cores that can run for this VM family in the region, accounting for the regional quota core count. The value isn't necessarily an integer multiple of `quotaCount`.  <br>**Example** : `16` | integer |
| **quotaCount**  <br>*required* | The number of total instances that can be started (given quotaCoreCount)  <br>**Example** : `4` | integer |
| **regionalConsumedCoreCount**  <br>*optional* | The number of cores that are already in use across the entire region.  <br>**Example** : `2` | integer |
| **regionalQuotaCoreCount**  <br>*optional* | The total number of cores that can run in the region. The value isn't necessarily an integer multiple of `regionalQuotaCount`.  <br>**Example** : `16` | integer |
| **regionalQuotaCount**  <br>*optional* | The number of total instances that can be started (given regionalQuotaCoreCount)  <br>**Example** : `4` | integer |
| **spotPlacementScore**  <br>*required* | Spot placement score for this bucket indicating likelihood of spot VM availability. Can be High, Medium, Low, or an empty string if not applicable.  <br>**Example** : `"High"` | string |
| **valid**  <br>*required* | If true, this bucket represents a currently valid bucket to use for new nodes. If false, this bucket represents existing nodes only.  <br>**Example** : `true` | boolean |
| **virtualMachine**  <br>*required* | The properties of the virtual machines launched from this bucket  <br>**Example** : `"object"` | [virtualMachine](#clusterstatus-buckets-virtualmachine) |

<a name="clusterstatus-buckets-definition"></a>
**definition**

| Name | Description | Schema |
| --- | --- | --- |
| **machineType**  <br>*required* | The VM size of the virtual machine  <br>**Example** : `"A2"` | string |

<a name="clusterstatus-buckets-placementgroups"></a>
**placementGroups**

| Name | Description | Schema |
| --- | --- | --- |
| **activeCoreCount**  <br>*required* | How many cores are in this scaleset  <br>**Example** : `16` | integer |
| **activeCount**  <br>*required* | How many nodes are in this scaleset  <br>**Example** : `4` | integer |
| **name**  <br>*required* | The unique identifier of this placement group  <br>**Example** : `"my-placement-group"` | string |

<a name="clusterstatus-buckets-virtualmachine"></a>
**virtualMachine**

| Name | Description | Schema |
| --- | --- | --- |
| **gpuCount**  <br>*required* | The number of GPUs this machine type has  <br>**Example** : `2` | integer |
| **infiniband**  <br>*required* | If this virtual machine supports InfiniBand connectivity  <br>**Example** : `true` | boolean |
| **memory**  <br>*required* | The RAM in this virtual machine, in GB  <br>**Example** : `7.5` | number |
| **pcpuCount**  <br>*required* | The number of physical CPUs this machine type has  <br>**Example** : `16` | integer |
| **vcpuCount**  <br>*required* | The number of virtual CPUs this machine type has  <br>**Example** : `32` | integer |
| **vcpuQuotaCount**  <br>*optional* | The number of vCPUs that this machine uses from quota  <br>**Example** : `2` | integer |


<a name="clusterusage"></a>
## ClusterUsage
Usage and optional cost information for the cluster


| Name | Description | Schema |
| --- | --- | --- |
| **usage**  <br>*required* | A list of usages by time interval  <br>**Example** : `[ "object" ]` | < [usage](#clusterusage-usage) > array |

<a name="clusterusage-usage"></a>
**usage**

| Name | Description | Schema |
| --- | --- | --- |
| **breakdown**  <br>*required* | The breakdown of usage in this interval, by category of "node" and "nodearray"  <br>**Example** : `[ "[clusterusageitem](#clusterusageitem)" ]` | < [ClusterUsageItem](#clusterusageitem) > array |
| **end**  <br>*required* | The end of the interval (exclusive)  <br>**Example** : `"string"` | string |
| **start**  <br>*required* | The beginning of the interval (inclusive)  <br>**Example** : `"string"` | string |
| **total**  <br>*required* | The overall usage for this cluster in this interval, with a category of "cluster"  <br>**Example** : `"[clusterusageitem](#clusterusageitem)"` | [ClusterUsageItem](#clusterusageitem) |


<a name="clusterusageitem"></a>
## ClusterUsageItem

| Name | Description | Schema |
| --- | --- | --- |
| **category**  <br>*required* | "cluster" for the overall usage; "node" for a single non-array head node; "nodearray" for a whole nodearray  <br>**Example** : `"string"` | enum (cluster, node, nodearray) |
| **cost**  <br>*optional* | The amount that would be charged for this usage, in US dollars and at retail rates. Note: all cost amounts are estimates and aren't reflective of the actual bill!  <br>**Example** : `0.0` | number |
| **details**  <br>*optional* | Details of VM size used by a nodearray including hours, core_count, region, priority, and operating system.  <br>**Example** : `[ "object" ]` | < [details](#clusterusageitem-details) > array |
| **hours**  <br>*required* | The number of core-hours of usage for this category  <br>**Example** : `0.0` | number |
| **node**  <br>*optional* | The name of the node or nodearray the usage is for (absent for cluster-level data)  <br>**Example** : `"string"` | string |

<a name="clusterusageitem-details"></a>
**details**

| Name | Description | Schema |
| --- | --- | --- |
| **core_count**  <br>*optional* | The number of cores in this VM size  <br>**Example** : `0.0` | number |
| **cost**  <br>*optional* | Cost of this VM size  <br>**Example** : `0.0` | number |
| **hours**  <br>*optional* | The number of core-hours of usage for this VM size  <br>**Example** : `0.0` | number |
| **os**  <br>*optional* | Type of operating system  <br>**Example** : `"string"` | enum (Windows, Linux) |
| **priority**  <br>*optional* | Priority of the VM SKU  <br>**Example** : `"string"` | enum (Regular, Spot) |
| **region**  <br>*optional* | The region the VM size is instantiated in  <br>**Example** : `"string"` | string |
| **vm_size**  <br>*optional* | VM SKU size  <br>**Example** : `"string"` | string |


<a name="node"></a>
## Node
A node record

*Type*: object


<a name="nodecreationrequest"></a>
## NodeCreationRequest
Specifies how to add nodes to a cluster


| Name | Description | Schema |
| --- | --- | --- |
| **requestId**  <br>*optional* | Optional user-supplied unique token to prevent duplicate operations if there are network communication errors. If this value is included and matches an earlier request ID, the server ignores this request and returns a 409 error.  <br>**Example** : `"00000000-0000-0000-0000-000000000000"` | string |
| **sets**  <br>*required* | A list of node definitions to create. The request must contain at least one set. Each set can specify a different set of properties.  <br>**Example** : `[ "object" ]` | < [sets](#nodecreationrequest-sets) > array |

<a name="nodecreationrequest-sets"></a>
**sets**

| Name | Description | Schema |
| --- | --- | --- |
| **count**  <br>*required* | The number of nodes to create  <br>**Example** : `1` | integer |
| **definition**  <br>*optional* | The definition of the bucket to use, provided by the cluster status API call. If some of the items given in the status call are missing, or the entire bucket property is missing, the first bucket that matches the given items is used.  <br>**Example** : `"object"` | [definition](#nodecreationrequest-definition) |
| **nameFormat**  <br>*optional* | If given, nodes use this naming convention instead of the standard "nodearray-%d" format  <br>**Example** : `"custom-name-%d"` | string |
| **nameOffset**  <br>*optional* | If given, along with nameFormat, offsets node index for new nodes.  <br>**Example** : `1` | integer |
| **nodeAttributes**  <br>*optional* | Additional attributes to be set on each node from this set  <br>**Example** : `"[node](#node)"` | [Node](#node) |
| **nodearray**  <br>*required* | The name of the nodearray to start nodes from  <br>**Example** : `"execute"` | string |
| **placementGroupId**  <br>*optional* | If given, nodes with the same value for groupId all start in the same placement group.  <br>**Example** : `"string"` | string |

<a name="nodecreationrequest-definition"></a>
**definition**

| Name | Description | Schema |
| --- | --- | --- |
| **machineType**  <br>*optional* | **Example** : `"A2"` | string |


<a name="nodecreationresult"></a>
## NodeCreationResult

| Name | Description | Schema |
| --- | --- | --- |
| **operationId**  <br>*required* | The ID of this operation  <br>**Example** : `"00000000-0000-0000-0000-000000000000"` | string |
| **sets**  <br>*required* | An array of sets, in the same order as in the request  <br>**Example** : `[ "object" ]` | < [sets](#nodecreationresult-sets) > array |

<a name="nodecreationresult-sets"></a>
**sets**

| Name | Description | Schema |
| --- | --- | --- |
| **added**  <br>*required* | How many nodes were started in this set  <br>**Example** : `1` | integer |
| **message**  <br>*optional* | Indicates why not all requested nodes could be added, if present  <br>**Example** : `"string"` | string |


<a name="nodelist"></a>
## NodeList
Results of a node search


| Name | Description | Schema |
| --- | --- | --- |
| **nodes**  <br>*required* | The nodes returned  <br>**Example** : `[ "[node](#node)" ]` | < [Node](#node) > array |
| **operation**  <br>*optional* | The status of an operation if the query includes an operation ID  <br>**Example** : `"[operationstatus](#operationstatus)"` | [OperationStatus](#operationstatus) |


<a name="nodemanagementrequest"></a>
## NodeManagementRequest
Specifies how to perform actions on nodes in a cluster. There are multiple ways to specify nodes, and if more than one way is included, it's treated as a union.


| Name | Description | Schema |
| --- | --- | --- |
| **filter**  <br>*optional* | A filter expression that matches nodes. Strings in the expression must be quoted properly.  <br>**Example** : `"State === \"Started\""` | string |
| **hostnames**  <br>*optional* | A list of short hostnames (with no domain) to manage  <br>**Example** : `[ "hostname1", "hostname2" ]` | < string > array |
| **ids**  <br>*optional* | A list of node IDs to manage  <br>**Example** : `[ "id1", "id2" ]` | < string > array |
| **ip_addresses**  <br>*optional* | A list of IP addresses to manage  <br>**Example** : `[ "10.0.1.1", "10.1.1.2" ]` | < string > array |
| **names**  <br>*optional* | A list of node names to manage  <br>**Example** : `[ "name1", "name2" ]` | < string > array |
| **requestId**  <br>*optional* | Optional user-supplied unique token to prevent duplicate operations if there are network communication errors. If this value is included and matches an earlier request ID, the server ignores this request and returns a 409 error.  <br>**Example** : `"00000000-0000-0000-0000-000000000000"` | string |


<a name="nodemanagementresult"></a>
## NodeManagementResult

| Name | Description | Schema |
| --- | --- | --- |
| **nodes**  <br>*required* | An array of information about each node that matched the filter in the management request. Each node's status indicates whether the request affected it.  <br>**Example** : `[ "object" ]` | < [nodes](#nodemanagementresult-nodes) > array |
| **operationId**  <br>*required* | The ID of this operation  <br>**Example** : `"00000000-0000-0000-0000-000000000000"` | string |

<a name="nodemanagementresult-nodes"></a>
**nodes**

| Name | Description | Schema |
| --- | --- | --- |
| **error**  <br>*optional* | The error message when `status` is `Error`.  <br>**Example** : `"This node must be terminated before it can be removed"` | string |
| **id**  <br>*required* | The ID of the node  <br>**Example** : `"id1"` | string |
| **name**  <br>*required* | The name of the node  <br>**Example** : `"name1"` | string |
| **status**  <br>*optional* | One of OK or Error  <br>**Example** : `"Error"` | enum (OK, Error) |


<a name="operationstatus"></a>
## OperationStatus
The status of this node operation


| Name | Description | Schema |
| --- | --- | --- |
| **action**  <br>*required* | **Example** : `"string"` | enum (create) |
| **startTime**  <br>*required* | When this operation was submitted  <br>**Example** : `"2020-01-01T12:34:56Z"` | string (date-time) |
