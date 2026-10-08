---
title: "DENY Service Broker Permissions (Transact-SQL)"
description: DENY Service Broker Permissions (Transact-SQL)
author: VanMSFT
ms.author: vanto
ms.date: "06/09/2017"
ms.service: sql
ms.subservice: t-sql
ms.topic: reference
helpviewer_keywords:
  - "denying permissions [Service Broker]"
  - "routes [Service Broker], permissions"
  - "Service Broker, permissions"
  - "DENY statement, Service Broker"
  - "remote service bindings [Service Broker], permissions"
  - "permissions [Service Broker]"
  - "message types [Service Broker], permissions"
  - "denying permissions [SQL Server], Service Broker"
  - "contracts [Service Broker], permissions"
  - "services [Service Broker], permissions"
dev_langs:
  - "TSQL"
---
# DENY Service Broker Permissions (Transact-SQL)

**Applies to:**
 

](../../sql-server/sql-docs-navigation-guide.md#applies-to)
 





  Denies permissions on a  Service Broker 
 contract, message type, remote service binding, route, or service.  
  
 
  
## Syntax  
  
```syntaxsql
DENY permission  [ ,...n ] ON  
    {    
       [ CONTRACT :: contract_name ]   
       | [ MESSAGE TYPE :: message_type_name ]    
       | [ REMOTE SERVICE BINDING :: remote_binding_name ]    
       | [ ROUTE :: route_name ]   
       | [ SERVICE :: service_name ]      
        }  
    TO database_principal [ ,...n ]   
    [ CASCADE ]  
        [ AS denying_principal ]  
```  
  
## Arguments
 *permission*  
 Specifies a permission that can be denied on a  Service Broker 
 securable. For a list of the permissions, see the Remarks section later in this topic.  
  
 CONTRACT **::**_contract_name_  
 Specifies the contract on which the permission is being denied. The scope qualifier **::** is required.  
  
 MESSAGE TYPE **::**_message_type_name_  
 Specifies the message type on which the permission is being denied. The scope qualifier **::** is required.  
  
 REMOTE SERVICE BINDING **::**_remote_binding_name_  
 Specifies the remote service binding on which the permission is being denied. The scope qualifier **::** is required.  
  
 ROUTE **::**_route_name_  
 Specifies the route on which the permission is being denied. The scope qualifier **::** is required.  
  
 SERVICE **::**_message_type_name_  
 Specifies the service on which the permission is being denied. The scope qualifier **::** is required.  
  
 *database_principal*  
 Specifies the principal to which the permission is being denied. One of the following:  
  
-   Database user  
-   Database role  
-   Application role  
-   Database user mapped to a Windows login  
-   Database user mapped to a Windows group  
-   Database user mapped to a certificate  
-   Database user mapped to an asymmetric key  
-   Database user not mapped to a server principal  
  
CASCADE  
 Indicates that the permission being denied is also denied to other principals to which it has been granted by this principal.  
  
*denying_principal*  
 Specifies a principal from which the principal executing this query derives its right to deny the permission. One of the following:  
  
-   Database user  
-   Database role  
-   Application role  
-   Database user mapped to a Windows login  
-   Database user mapped to a Windows group  
-   Database user mapped to a certificate  
-   Database user mapped to an asymmetric key  
-   Database user not mapped to a server principal  
  
## Remarks  
  
## Service Broker Contracts  
 A  Service Broker 
 contract is a database-level securable contained by the database that is its parent in the permissions hierarchy. The most specific and limited permissions that can be denied on a  Service Broker 
 contract are listed in the following table, together with the more general permissions that include them by implication.  
  
| Service Broker contract permission | Implied by Service Broker contract permission | Implied by database permission |
| --- | --- | --- |
| CONTROL | CONTROL | CONTROL |
| TAKE OWNERSHIP | CONTROL | CONTROL |
| ALTER | CONTROL | ALTER ANY CONTRACT |
| REFERENCES | CONTROL | REFERENCES |
| VIEW DEFINITION | CONTROL | VIEW DEFINITION |
  
## Service Broker Message Types  
 A  Service Broker 
 message type is a database-level securable that is contained by the database that is its parent in the permissions hierarchy. The most specific and limited permissions that can be denied on a  Service Broker 
 message type are listed in the following table, together with the more general permissions that include them by implication.  
  
| Service Broker message type permission | Implied by Service Broker message type permission | Implied by database permission |
| --- | --- | --- |
| CONTROL | CONTROL | CONTROL |
| TAKE OWNERSHIP | CONTROL | CONTROL |
| ALTER | CONTROL | ALTER ANY MESSAGE TYPE |
| REFERENCES | CONTROL | REFERENCES |
| VIEW DEFINITION | CONTROL | VIEW DEFINITION |
  
## Service Broker Remote Service Bindings  
 A  Service Broker 
 remote service binding is a database-level securable that is contained by the database that is its parent in the permissions hierarchy. The most specific and limited permissions that can be denied on a  Service Broker 
 remote service binding are listed in the following table, together with the more general permissions that include them by implication.  
  
| Service Broker remote service binding permission | Implied by Service Broker remote service binding permission | Implied by database permission |
| --- | --- | --- |
| CONTROL | CONTROL | CONTROL |
| TAKE OWNERSHIP | CONTROL | CONTROL |
| ALTER | CONTROL | ALTER ANY REMOTE SERVICE BINDING |
| VIEW DEFINITION | CONTROL | VIEW DEFINITION |
  
## Service Broker Routes  
 A  Service Broker 
 route is a database-level securable that is contained by the database that is its parent in the permissions hierarchy. The most specific and limited permissions that can be denied on a  Service Broker 
 route are listed in the following table, together with the more general permissions that include them by implication.  
  
| Service Broker route permission | Implied by Service Broker route permission | Implied by database permission |
| --- | --- | --- |
| CONTROL | CONTROL | CONTROL |
| TAKE OWNERSHIP | CONTROL | CONTROL |
| ALTER | CONTROL | ALTER ANY ROUTE |
| VIEW DEFINITION | CONTROL | VIEW DEFINITION |
  
### Service Broker Services  
 A  Service Broker 
 service is a database-level securable that is contained by the database that is its parent in the permissions hierarchy. The most specific and limited permissions that can be denied on a  Service Broker 
 service are listed in the following table, together with the more general permissions that include them by implication.  
  
| Service Broker service permission | Implied by Service Broker service permission | Implied by database permission |
| --- | --- | --- |
| CONTROL | CONTROL | CONTROL |
| TAKE OWNERSHIP | CONTROL | CONTROL |
| SEND | CONTROL | CONTROL |
| ALTER | CONTROL | ALTER ANY SERVICE |
| VIEW DEFINITION | CONTROL | VIEW DEFINITION |
  
## Permissions  
 Requires CONTROL permission on the  Service Broker 
 contract, message type, remote service binding, route, or service. If the AS clause is used, the specified principal must own the securable on which permissions are being denied.  
  
## Related content

- [Principals (Database Engine)](../../relational-databases/security/authentication-access/principals-database-engine.md)
- [REVOKE Service Broker Permissions (Transact-SQL)](revoke-service-broker-permissions-transact-sql.md)
- [DENY (Transact-SQL)](deny-transact-sql.md)
- [Permissions (Database Engine)](../../relational-databases/security/permissions-database-engine.md)
