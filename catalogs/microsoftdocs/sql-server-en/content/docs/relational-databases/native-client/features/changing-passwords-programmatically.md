---
title: "Changing Passwords Programmatically"
description: "Changing SQL Server Native Client Passwords Programmatically"
author: markingmyname
ms.author: maghan
ms.date: "03/16/2017"
ms.service: sql
ms.subservice: native-client
ms.topic: "reference"
helpviewer_keywords:
  - "data access [SQL Server Native Client], password expiration"
  - "SQL Server Native Client ODBC driver, passwords"
  - "SQL Server Native Client OLE DB provider, passwords"
  - "passwords [SQL Server], expiration"
  - "SQLNCLI, password expiration"
  - "expiration [SQL Server Native Client]"
  - "passwords [SQL Server], modifying"
  - "expired passwords [SQL Server Native Client]"
  - "SQL Server Native Client, password expiration"
  - "modifying passwords"
---
# Changing SQL Server Native Client Passwords Programmatically

**Applies to:**
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)
 

](../../../sql-server/sql-docs-navigation-guide.md#applies-to)

 


 





> **Important:** 
> [SQL Server Native Client](../sql-server-native-client.md) (SNAC) isn't shipped with:

-  SQL Server 2022 (16.x) 
 and later versions
-  SQL Server Management Studio 
 19 and later versions

The SQL Server Native Client (SQLNCLI or SQLNCLI11) and the legacy Microsoft OLE DB Provider for SQL Server (SQLOLEDB) aren't recommended for new application development.

For new projects, use one of the following drivers:

- [Microsoft ODBC Driver for SQL Server](../../../connect/odbc/microsoft-odbc-driver-for-sql-server.md)
- [Microsoft OLE DB Driver for SQL Server](../../../connect/oledb/oledb-driver-for-sql-server.md)

For SQLNCLI that ships as a component of  SQL Server Database Engine 
 (versions 2012 through 2019), see this [Support Lifecycle exception](../applications/support-policies-for-sql-server-native-client.md#support-lifecycle-exception).


  Before  SQL Server 2005 (9.x) 
, when a user's password expired, only an administrator could reset it. Beginning with  SQL Server 2005 (9.x) 
,  SQL Server 
 Native Client supports handling password expiration programmatically through both the  SQL Server 
 Native Client OLE DB provider and the  SQL Server 
 Native Client ODBC driver, and through changes to the **SQL Server Login** dialog boxes.  
  
> **Note:**  
>  When possible, prompt users to enter their credentials at run time and avoid storing their credentials in a persisted format. If you must persist their credentials, you should encrypt them using the [Win32 crypto API](https://learn.microsoft.com/windows/win32/seccrypto/cryptography-reference). For more information about the use of passwords, see [Strong Passwords](../../security/strong-passwords.md).  
  
## SQL Server Login Error Codes  
 When a connection cannot be made because of authentication problems, one of the following SQL Server error codes will be available to the application to assist diagnosis and recovery.  
  
| SQL Server Error Code | Error Message |
| --- | --- |
| 15113 | Login failed for user '%.*ls' Reason: Password validation failed. The account is locked out. |
| 18463 | Login failed for user '%.*ls'. Reason: Password change failed. The password cannot be used at this time. |
| 18464 | Login failed for user '%.*ls'. Reason: Password change failed. The password does not meet policy requirements because it is too short. |
| 18465 | Login failed for user '%.*ls'. Reason: Password change failed. The password does not meet policy requirements because it is too long. |
| 18466 | Login failed for user '%.*ls'. Reason: Password change failed. The password does not meet policy requirements because it is not complex enough. |
| 18467 | Login failed for user '%.*ls'. Reason: Password change failed. The password does not meet the requirements of the password filter DLL. |
| 18468 | Login failed for user '%.*ls'. Reason: Password change failed. An unexpected error occurred during password validation. |
| 18487 | Login failed for user '%.*ls'. Reason: The password of the account has expired. |
| 18488 | Login failed for user '%.*ls'. Reason: The password of the account must be changed. |
  
## SQL Server Native Client OLE DB Provider  
 The  SQL Server 
 Native Client OLE DB provider supports password expiration though a user interface and programmatically.  
  
### OLE DB User Interface Password Expiration  
 The  SQL Server 
 Native Client OLE DB provider supports password expiration through changes made to the **SQL Server Login** dialog boxes. If the value of DBPROP_INIT_PROMPT is set to DBPROMPT_NOPROMPT, the initial connection attempt will fail if the password has expired.  
  
 If DBPROP_INIT_PROMPT has been set to any other value, the user sees the **SQL Server Login** dialog, regardless of whether or not the password has expired. The user can click on the **Options** button and check **Change Password** to change the password.  
  
 If the user clicks OK and the password has expired,  SQL Server 
 prompts the user to enter and confirm a new password using the **Change SQL Server Password** dialog.  
  
#### OLE DB Prompt Behavior and Locked Accounts  
 Connection attempts may fail due to the account being locked. If this occurs following the display of the **SQL Server Login** dialog, the server error message is displayed to the user and the connection attempt is aborted. It may also occur following the display of the **Change SQL Server Password** dialog if the user enters a bad value for the old password. In this case the same error message is displayed, and the connection attempt is aborted.  
  
#### OLE DB Connection Pooling, Password Expiration, and Locked Accounts  
 An account may be locked or its password may expire while the connection is still active in a connection pool. The server checks for expired passwords and locked accounts on two occasions. The first is when a connection is first created. The second occasion is upon connection reset, when the connection is taken from the pool.  
  
 When the reset attempt fails, the connection is removed from the pool and an error is returned.  
  
### OLE DB Programmatic Password Expiration  
 The  SQL Server 
 Native Client OLE DB provider supports password expiration through the addition of the SSPROP_AUTH_OLD_PASSWORD (type VT_BSTR) property that has been added to the DBPROPSET_SQLSERVERDBINIT property set.  
  
 The existing "Password" property refers to DBPROP_AUTH_PASSWORD and is used to store the new password.  
  
> **Note:**  
>  In the connection string, the "Old Password" property sets SSPROP_AUTH_OLD_PASSWORD, which is the current (possibly expired) password that is not available via a provider string property.  
  
 The provider does not persist the value of this property. When this property is set, the provider does not use the connection pool for the first connection because a new connection will occur. If the password change is successful, the current connection cannot be reused since it still contains the old password, which will be invalid after the password change. Also, if the login succeeds, the provider clears this property. Subsequent attempts to retrieve the old password return VT_EMPTY.  
  
> **Note:**  
>  SSPROP_AUTH_OLD_PASSWORD should never be persisted since it is only used when a password has expired.  
  
 Note that whenever the "Old Password" property is set, the provider assumes that an attempt to change the password is being made, unless Windows Authentication is also specified, in which case it always takes precedence.  
  
 If Windows Authentication is used, specifying the old password results in either DB_E_ERRORSOCCURRED or DB_S_ERRORSOCCURRED depending on whether the old password was specified as REQUIRED or OPTIONAL respectively, and the status value of DBPROPSTATUS_CONFLICTINGBADVALUE is returned in *dwStatus*. This is detected when **IDBInitialize::Initialize** is called.  
  
 If an attempt to change the password fails unexpectedly, the server returns error code 18468. A standard OLEDB error is returned from the connection attempt.  
  
 For more information about the DBPROPSET_SQLSERVERDBINIT property set, see [Initialization and Authorization Properties](../../native-client-ole-db-data-source-objects/initialization-and-authorization-properties.md).  
  
## SQL Server Native Client ODBC Driver  
 The  SQL Server 
 Native Client OLE DB provider supports password expiration though a user interface and programmatically.  
  
### ODBC User Interface Password Expiration  
 The  SQL Server 
 Native Client ODBC driver supports password expiration through changes made to the **SQL Server Login** dialog boxes.  
  
 If [SQLDriverConnect](../../native-client-odbc-api/sqldriverconnect.md) is called and the value of **DriverCompletion** is set to SQL_DRIVER_NOPROMPT, the initial connection attempt fails if the password has expired. The SQLSTATE value 28000 and the native error code value 18487 are returned by subsequent calls to **SQLError** or **SQLGetDiagRec**.  
  
 If **DriverCompletion** has been set to any other value, the user sees the **SQL Server Login** dialog, regardless of whether or not the password has expired. The user can click on the **Options** button and check **Change Password** to change the password.  
  
 If the user clicks OK and the password has expired,  SQL Server 
 prompts to enter and confirm a new password using the **Change SQL Server Password** dialog.  
  
#### ODBC Prompt Behavior and Locked Accounts  
 Connection attempts may fail due to the account being locked. If this occurs following the display of the **SQL Server Login** dialog, the server error message is displayed to the user and the connection attempt is aborted. It may also occur following the display of the **Change SQL Server Password** dialog if the user enters a bad value for the old password. In this case the same error message is displayed, and the connection attempt is aborted.  
  
#### ODBC Connection Pooling, Password Expiry, and Locked Accounts  
 An account may be locked or its password may expire while the connection is still active in a connection pool. The server checks for expired passwords and locked accounts on two occasions. The first is when a connection is first created. The second occasion is upon connection reset, when the connection is taken from the pool.  
  
 When the reset attempt fails, the connection is removed from the pool and an error is returned.  
  
### ODBC Programmatic Password Expiration  
 The  SQL Server 
 Native Client ODBC driver supports password expiration through the addition of the SQL_COPT_SS_OLDPWD attribute which is set before connecting to the server using the [SQLSetConnectAttr](../../native-client-odbc-api/sqlsetconnectattr.md) function.  
  
 The SQL_COPT_SS_OLDPWD attribute of the connection handle refers to the expired password. There is no connection string attribute for this attribute, as this would interfere with connection pooling. If the login succeeds, the driver clears this attribute.  
  
 The  SQL Server 
 Native Client ODBC driver returns SQL_ERROR in four cases for this feature: password expiration, password policy conflict, account lockout, and when the old password property is set while using Windows Authentication. The driver returns the appropriate error messages to the user when [SQLGetDiagField](../../native-client-odbc-api/sqlgetdiagfield.md) is invoked.  
  
## Related content

- [SQL Server Native Client Features](sql-server-native-client-features.md)
