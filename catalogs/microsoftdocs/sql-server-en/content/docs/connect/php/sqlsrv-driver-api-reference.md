---
title: "SQLSRV Driver API Reference"
description: "The API reference for the SQLSRV driver for PHP describes available functions, their parameters, and return values."
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, sumitsar, jathakkar
ms.date: "03/26/2018"
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
---
# SQLSRV Driver API Reference



The API name for the SQLSRV driver in the Microsoft Drivers for PHP for SQL Server
 is **sqlsrv**. All **sqlsrv** functions begin with **sqlsrv_** and are followed by a verb or a noun. Those followed by a verb perform some action and those followed by a noun return some form of metadata.  
  
## In This Section  
The SQLSRV driver contains the following functions:  
  
| Function | Description |
| --- | --- |
| [sqlsrv_begin_transaction](sqlsrv-begin-transaction.md) | Begins a transaction. |
| [sqlsrv_cancel](sqlsrv-cancel.md) | Cancels a statement; discards any pending results for the statement. |
| [sqlsrv_client_info](sqlsrv-client-info.md) | Provides information about the client. |
| [sqlsrv_close](sqlsrv-close.md) | Closes a connection. Frees all resources associated with the connection. |
| [sqlsrv_commit](sqlsrv-commit.md) | Commits a transaction. |
| [sqlsrv_configure](sqlsrv-configure.md) | Changes error handling and logging configurations. |
| [sqlsrv_connect](sqlsrv-connect.md) | Creates and opens a connection. |
| [sqlsrv_errors](sqlsrv-errors.md) | Returns error and/or warning information about the last operation. |
| [sqlsrv_execute](sqlsrv-execute.md) | Executes a prepared statement. |
| [sqlsrv_fetch](sqlsrv-fetch.md) | Makes the next row of data available for reading. |
| [sqlsrv_fetch_array](sqlsrv-fetch-array.md) | Retrieves the next row of data as a numerically indexed array, an associative array, or both. |
| [sqlsrv_fetch_object](sqlsrv-fetch-object.md) | Retrieves the next row of data as an object. |
| [sqlsrv_field_metadata](sqlsrv-field-metadata.md) | Returns field metadata. |
| [sqlsrv_free_stmt](sqlsrv-free-stmt.md) | Closes a statement. Frees all resources associated with the statement. |
| [sqlsrv_get_config](sqlsrv-get-config.md) | Returns the value of the specified configuration setting. |
| [sqlsrv_get_field](sqlsrv-get-field.md) | Retrieves a field in the current row by index. The PHP return type can be specified. |
| [sqlsrv_has_rows](sqlsrv-has-rows.md) | Detects if a result set has one or more rows. |
| [sqlsrv_next_result](sqlsrv-next-result.md) | Makes the next result available for processing. |
| [sqlsrv_num_rows](sqlsrv-num-rows.md) | Reports the number of rows in a result set. |
| [sqlsrv_num_fields](sqlsrv-num-fields.md) | Retrieves the number of fields in an active result set. |
| [sqlsrv_prepare](sqlsrv-prepare.md) | Prepares a Transact-SQL query without executing it. Implicitly binds parameters. |
| [sqlsrv_query](sqlsrv-query.md) | Prepares and executes a Transact-SQL query. |
| [sqlsrv_rollback](sqlsrv-rollback.md) | Rolls back a transaction. |
| [sqlsrv_rows_affected](sqlsrv-rows-affected.md) | Returns the number of modified rows. |
| [sqlsrv_send_stream_data](sqlsrv-send-stream-data.md) | Sends up to eight kilobytes (8 KB) of data to the server with each call to the function. |
| [sqlsrv_server_info](sqlsrv-server-info.md) | Provides information about the server. |
  
## Related content

- [PHP Manual](https://php.net/manual)
- [Overview of the Microsoft Drivers for PHP for SQL Server](overview-of-the-php-sql-driver.md)
- [Constants (Microsoft Drivers for PHP for SQL Server)](constants-microsoft-drivers-for-php-for-sql-server.md)
- [Programming Guide for the Microsoft Drivers for PHP for SQL Server](programming-guide-for-php-sql-driver.md)
- [Getting Started with the Microsoft Drivers for PHP for SQL Server](getting-started-with-the-php-sql-driver.md)
