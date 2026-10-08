---
title: "SQLServerDatabaseMetaData Members"
description: "SQLServerDatabaseMetaData Members"
author: dlevy-msft-sql
ms.author: dlevy
ms.reviewer: davidengel, machavan, sunilbs
ms.date: 03/27/2026
ms.service: sql
ms.subservice: connectivity
ms.topic: reference
ms.custom: sfi-ropc-nochange
---
# SQLServerDatabaseMetaData Members


The following tables list the members that are exposed by the [SQLServerDatabaseMetaData](sqlserverdatabasemetadata-class.md) class.

> **Tip:**
> To use these methods, first obtain a `DatabaseMetaData` object from an active connection:
>
> ```java
> Connection conn = DriverManager.getConnection(connectionUrl);
> DatabaseMetaData dbmd = conn.getMetaData();
>
> // Example: list all tables in the database
> ResultSet rs = dbmd.getTables(null, null, "%", new String[]{"TABLE"});
> while (rs.next()) {
>     System.out.println(rs.getString("TABLE_NAME"));
> }
> ```

## Constructors  
 None.  
  
## Fields  
 None.  
  
## Inherited Fields  
  
| Name | Description |
| --- | --- |
| java.sql.DatabaseMetaData | attributeNoNulls, attributeNullable, attributeNullableUnknown, bestRowNotPseudo, bestRowPseudo, bestRowSession, bestRowTemporary, bestRowTransaction, bestRowUnknown, columnNoNulls, columnNullable, columnNullableUnknown, importedKeyCascade, importedKeyInitiallyDeferred, importedKeyInitiallyImmediate, importedKeyNoAction, importedKeyNotDeferrable, importedKeyRestrict, importedKeySetDefault, importedKeySetNull, procedureColumnIn, procedureColumnInOut, procedureColumnOut, procedureColumnResult, procedureColumnReturn, procedureColumnUnknown, procedureNoNulls, procedureNoResult, procedureNullable, procedureNullableUnknown, procedureResultUnknown, procedureReturnsResult, sqlStateSQL, sqlStateSQL99, sqlStateXOpen, tableIndexClustered, tableIndexHashed, tableIndexOther, tableIndexStatistic, typeNoNulls, typeNullable, typeNullableUnknown, typePredBasic, typePredChar, typePredNone, typeSearchable, versionColumnNotPseudo, versionColumnPseudo, versionColumnUnknown |
  
## Methods  
  
| Name | Description |
| --- | --- |
| [allProceduresAreCallable](allproceduresarecallable-method-sqlserverdatabasemetadata.md) | Retrieves whether the current user has permissions to call all the procedures returned by the [getProcedures](getprocedures-method-sqlserverdatabasemetadata.md) method. |
| [allTablesAreSelectable](alltablesareselectable-method-sqlserverdatabasemetadata.md) | Retrieves whether the current user has permissions to use all the tables returned by the [getTables](gettables-method-sqlserverdatabasemetadata.md) method in a SELECT statement. |
| [autoCommitFailureClosesAllResultSets](autocommitfailureclosesallresultsets-method-sqlserverdatabasemetadata.md) | Indicates whether the JDBC driver closes all the open result sets, including the holdable ones, when an auto-commit is enabled and an exception is raised. |
| [dataDefinitionCausesTransactionCommit](datadefinitioncausestransactioncommit-method-sqlserverdatabasemetadata.md) | Retrieves whether a data definition statement within a transaction forces the transaction to commit. |
| [dataDefinitionIgnoredInTransactions](datadefinitionignoredintransactions-method-sqlserverdatabasemetadata.md) | Retrieves whether this database ignores a data definition statement within a transaction. |
| [deletesAreDetected](deletesaredetected-method-sqlserverdatabasemetadata.md) | Retrieves whether or not a visible row delete can be detected by calling the [rowDeleted](rowdeleted-method-sqlserverresultset.md) method of the [SQLServerResultSet](sqlserverresultset-class.md) class. |
| [doesMaxRowSizeIncludeBlobs](doesmaxrowsizeincludeblobs-method-sqlserverdatabasemetadata.md) | Retrieves whether the return value for the [getMaxRowSize](getmaxrowsize-method-sqlserverdatabasemetadata.md) method includes the SQL data types LONGVARCHAR and LONGVARBINARY. |
| [getAttributes](getattributes-method-sqlserverdatabasemetadata.md) | Retrieves a description of the given attribute of the given type for a user-defined type that is available in the given schema and catalog. |
| [getBestRowIdentifier](getbestrowidentifier-method-sqlserverdatabasemetadata.md) | Retrieves a description of the optimal set of columns of a table that uniquely identifies a row. |
| [getCatalogs](getcatalogs-method-sqlserverdatabasemetadata.md) | Retrieves the catalog names that are available in the connected server. |
| [getCatalogSeparator](getcatalogseparator-method-sqlserverdatabasemetadata.md) | Retrieves the **String** that this database uses as the separator between a catalog and table name. |
| [getCatalogTerm](getcatalogterm-method-sqlserverdatabasemetadata.md) | Retrieves the database vendor's preferred term for "catalog". |
| [getClientInfoProperties](getclientinfoproperties-method-sqlserverdatabasemetadata.md) | Retrieves a list of the client information properties that the driver supports. |
| [getColumnPrivileges](getcolumnprivileges-method-sqlserverdatabasemetadata.md) | Retrieves a description of the access rights for the columns in a table. |
| [getColumns](getcolumns-method-sqlserverdatabasemetadata.md) | Retrieves a description of the table columns that are available in the specified catalog. |
| [getConnection](getconnection-method-sqlserverdatabasemetadata.md) | Retrieves the connection that produced this metadata object. |
| [getCrossReference](getcrossreference-method-sqlserverdatabasemetadata.md) | Retrieves a description of the foreign key columns in the given foreign key table that references the primary key columns of the given primary key table. |
| [getDatabaseMajorVersion](getdatabasemajorversion-method-sqlserverdatabasemetadata.md) | Retrieves the major version number of the underlying database. |
| [getDatabaseMinorVersion](getdatabaseminorversion-method-sqlserverdatabasemetadata.md) | Retrieves the minor version number of the underlying database. |
| [getDatabaseProductName](getdatabaseproductname-method-sqlserverdatabasemetadata.md) | Retrieves the name of this database product. |
| [getDatabaseProductVersion](getdatabaseproductversion-method-sqlserverdatabasemetadata.md) | Retrieves the version number of this database product. |
| [getDefaultTransactionIsolation](getdefaulttransactionisolation-method-sqlserverdatabasemetadata.md) | Retrieves the default transaction isolation level for this database. |
| [getDriverMajorVersion](getdrivermajorversion-method-sqlserverdatabasemetadata.md) | Retrieves the major version number of this JDBC driver. |
| [getDriverMinorVersion](getdriverminorversion-method-sqlserverdatabasemetadata.md) | Retrieves the minor version number of this JDBC driver. |
| [getDriverName](getdrivername-method-sqlserverdatabasemetadata.md) | Retrieves the name of this JDBC driver. |
| [getDriverVersion](getdriverversion-method-sqlserverdatabasemetadata.md) | Retrieves the version number of this JDBC driver. |
| [getExportedKeys](getexportedkeys-method-sqlserverdatabasemetadata.md) | Retrieves a description of the foreign key columns that reference the given table's primary key columns. |
| [getExtraNameCharacters](getextranamecharacters-method-sqlserverdatabasemetadata.md) | Retrieves all the extra characters that can be used in unquoted identifier names, for example, those beyond a-z, A-Z, 0-9, and _. |
| [getFunctions](getfunctions-method-sqlserverdatabasemetadata.md) | Retrieves a description of the system and user functions. |
| [getFunctionColumns](getfunctioncolumns-method-sqlserverdatabasemetadata.md) | Retrieves a description of the specified catalog's system- or user-function parameters and return type. |
| [getIdentifierQuoteString](getidentifierquotestring-method-sqlserverdatabasemetadata.md) | Retrieves the **String** that is used to quote SQL identifiers. |
| [getImportedKeys](getimportedkeys-method-sqlserverdatabasemetadata.md) | Retrieves a description of the primary key columns that are referenced by a table's foreign key columns. |
| [getIndexInfo](getindexinfo-method-sqlserverdatabasemetadata.md) | Retrieves a description of the indexes and statistics of the given table. |
| [getJDBCMajorVersion](getjdbcmajorversion-method-sqlserverdatabasemetadata.md) | Retrieves the major JDBC version number for this driver. |
| [getJDBCMinorVersion](getjdbcminorversion-method-sqlserverdatabasemetadata.md) | Retrieves the minor JDBC version number for this driver. |
| [getMaxBinaryLiteralLength](getmaxbinaryliterallength-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of hex characters that this database allows in an inline binary literal. |
| [getMaxCatalogNameLength](getmaxcatalognamelength-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of characters that this database allows in a catalog name. |
| [getMaxCharLiteralLength](getmaxcharliterallength-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of characters that this database allows for a character literal. |
| [getMaxColumnNameLength](getmaxcolumnnamelength-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of characters that this database allows for a column name. |
| [getMaxColumnsInGroupBy](getmaxcolumnsingroupby-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of columns that this database allows in a GROUP BY clause. |
| [getMaxColumnsInIndex](getmaxcolumnsinindex-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of columns that this database allows in an index. |
| [getMaxColumnsInOrderBy](getmaxcolumnsinorderby-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of columns that this database allows in an ORDER BY clause. |
| [getMaxColumnsInSelect](getmaxcolumnsinselect-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of columns that this database allows in a SELECT list. |
| [getMaxColumnsInTable](getmaxcolumnsintable-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of columns that this database allows in a table. |
| [getMaxConnections](getmaxconnections-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of concurrent connections to this database that are possible. |
| [getMaxCursorNameLength](getmaxcursornamelength-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of characters that this database allows in a cursor name. |
| [getMaxIndexLength](getmaxindexlength-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of bytes that this database allows for an index, including all of the parts of the index. |
| [getMaxProcedureNameLength](getmaxprocedurenamelength-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of characters that this database allows in a procedure name. |
| [getMaxRowSize](getmaxrowsize-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of bytes that this database allows in a single row. |
| [getMaxSchemaNameLength](getmaxschemanamelength-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of characters that this database allows in a schema name. |
| [getMaxStatementLength](getmaxstatementlength-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of characters that this database allows in a SQL statement. |
| [getMaxStatements](getmaxstatements-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of active statements to this database that can be open at the same time. |
| [getMaxTableNameLength](getmaxtablenamelength-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of characters that this database allows in a table name. |
| [getMaxTablesInSelect](getmaxtablesinselect-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of tables that this database allows in a SELECT statement. |
| [getMaxUserNameLength](getmaxusernamelength-method-sqlserverdatabasemetadata.md) | Retrieves the maximum number of characters that this database allows in a user name. |
| [getNumericFunctions](getnumericfunctions-method-sqlserverdatabasemetadata.md) | Retrieves a comma-separated list of math functions that are available with this database. |
| [getPrimaryKeys](getprimarykeys-method-sqlserverdatabasemetadata.md) | Retrieves a description of the primary key columns of the given table. |
| [getProcedureColumns](getprocedurecolumns-method-sqlserverdatabasemetadata.md) | Retrieves a description of the stored procedure parameters and result columns. |
| [getProcedures](getprocedures-method-sqlserverdatabasemetadata.md) | Retrieves a description of the stored procedures that are available in the given catalog, schema, or stored procedure name pattern. |
| [getProcedureTerm](getprocedureterm-method-sqlserverdatabasemetadata.md) | Retrieves the preferred term for "procedure" in this database. |
| [getResultSetHoldability](getresultsetholdability-method-sqlserverdatabasemetadata.md) | Retrieves the default holdability of result sets for this database. |
| [getRowIdLifetime](getrowidlifetime-method-sqlserverdatabasemetadata.md) | Returns a status indicating whether or not SQL RowId data type is supported. If supported, it returns the lifetime for which a RowId object remains valid. |
| [getSchemas](getschemas-method.md) | Retrieves the schema names that are available in the current database. |
| [getSchemaTerm](getschematerm-method-sqlserverdatabasemetadata.md) | Retrieves the preferred term for "schema" in this database. |
| [getSearchStringEscape](getsearchstringescape-method-sqlserverdatabasemetadata.md) | Retrieves the **String** that can be used to escape wildcard characters. |
| [getSQLKeywords](getsqlkeywords-method-sqlserverdatabasemetadata.md) | Retrieves a comma-separated list of all of this database's SQL keywords that are not also SQL92 keywords. |
| [getSQLStateType](getsqlstatetype-method-sqlserverdatabasemetadata.md) | Indicates whether the SQLSTATE returned by the SQLException.getSQLState method is X/Open (now known as Open Group), SQL CLI, SQL99 (JDBC 3.0), or SQL:2003 (JDBC 4.0). |
| [getStringFunctions](getstringfunctions-method-sqlserverdatabasemetadata.md) | Retrieves a comma-separated list of **String** functions that are available with this database. |
| [getSuperTables](getsupertables-method-sqlserverdatabasemetadata.md) | Retrieves a description of the table hierarchies that are defined in a particular schema in this database. |
| [getSuperTypes](getsupertypes-method-sqlserverdatabasemetadata.md) | Retrieves a description of the user-defined type hierarchies that are defined in a particular schema in this database. |
| [getSystemFunctions](getsystemfunctions-method-sqlserverdatabasemetadata.md) | Retrieves a comma-separated list of system functions that are available with this database. |
| [getTablePrivileges](gettableprivileges-method-sqlserverdatabasemetadata.md) | Retrieves a description of the access rights for each table that is available in the given catalog, schema, or table name pattern. |
| [getTables](gettables-method-sqlserverdatabasemetadata.md) | Retrieves a description of the tables that are available in the given catalog, schema, or table name pattern. |
| [getTableTypes](gettabletypes-method-sqlserverdatabasemetadata.md) | Retrieves the table types that are available in the current database. |
| [getTimeDateFunctions](gettimedatefunctions-method-sqlserverdatabasemetadata.md) | Retrieves a comma-separated list of the time and date functions that are available with this database. |
| [getTypeInfo](gettypeinfo-method-sqlserverdatabasemetadata.md) | Retrieves a description of all the standard SQL types that are supported by the current database. |
| [getUDTs](getudts-method-sqlserverdatabasemetadata.md) | Retrieves a description of the user-defined types that are defined in a particular schema. |
| [getURL](geturl-method-sqlserverdatabasemetadata.md) | Retrieves the URL for this database. |
| [getUserName](getusername-method-sqlserverdatabasemetadata.md) | Retrieves the user name as known to this database. |
| [getVersionColumns](getversioncolumns-method-sqlserverdatabasemetadata.md) | Retrieves a description of the columns of a table that is automatically updated when any value in a row is updated. |
| [insertsAreDetected](insertsaredetected-method-sqlserverdatabasemetadata.md) | Retrieves whether or not a visible row insert can be detected by calling the method [rowInserted](rowinserted-method-sqlserverresultset.md) method of the [SQLServerResultSet](sqlserverresultset-class.md) class. |
| [isCatalogAtStart](iscatalogatstart-method-sqlserverdatabasemetadata.md) | Retrieves whether a catalog appears at the start of a fully qualified table name. |
| [isReadOnly](isreadonly-method-sqlserverdatabasemetadata.md) | Retrieves whether this database is in read-only mode. |
| [locatorsUpdateCopy](locatorsupdatecopy-method-sqlserverdatabasemetadata.md) | Indicates whether updates made to a LOB are made on a copy or directly to the LOB. |
| [nullPlusNonNullIsNull](nullplusnonnullisnull-method-sqlserverdatabasemetadata.md) | Indicates whether this database supports concatenations between NULL and non-NULL values being NULL. |
| [nullsAreSortedAtEnd](nullsaresortedatend-method-sqlserverdatabasemetadata.md) | Retrieves whether NULL values are sorted at the end regardless of sort order. |
| [nullsAreSortedAtStart](nullsaresortedatstart-method-sqlserverdatabasemetadata.md) | Retrieves whether NULL values are sorted at the start regardless of sort order. |
| [nullsAreSortedHigh](nullsaresortedhigh-method-sqlserverdatabasemetadata.md) | Retrieves whether NULL values are sorted high. |
| [nullsAreSortedLow](nullsaresortedlow-method-sqlserverdatabasemetadata.md) | Retrieves whether NULL values are sorted low. |
| [othersDeletesAreVisible](othersdeletesarevisible-method-sqlserverdatabasemetadata.md) | Retrieves whether deletes that are made by others are visible. |
| [othersInsertsAreVisible](othersinsertsarevisible-method-sqlserverdatabasemetadata.md) | Retrieves whether inserts that are made by others are visible. |
| [othersUpdatesAreVisible](othersupdatesarevisible-method-sqlserverdatabasemetadata.md) | Retrieves whether updates that are made by others are visible. |
| [ownDeletesAreVisible](owndeletesarevisible-method-sqlserverdatabasemetadata.md) | Retrieves whether a result set's own deletes are visible. |
| [ownInsertsAreVisible](owninsertsarevisible-method-sqlserverdatabasemetadata.md) | Retrieves whether a result set's own inserts are visible. |
| [ownUpdatesAreVisible](ownupdatesarevisible-method-sqlserverdatabasemetadata.md) | Retrieves whether the result set's own updates are visible. |
| [storesLowerCaseIdentifiers](storeslowercaseidentifiers-method-sqlserverdatabasemetadata.md) | Retrieves whether this database treats mixed-case SQL identifiers that are not enclosed in quotation marks as case-insensitive and stores them in lowercase. |
| [storesLowerCaseQuotedIdentifiers](storeslowercasequotedidentifiers-method-sqlserverdatabasemetadata.md) | Retrieves whether this database treats mixed-case SQL identifiers that are enclosed in quotation marks as case-insensitive and stores them in lowercase. |
| [storesMixedCaseIdentifiers](storesmixedcaseidentifiers-method-sqlserverdatabasemetadata.md) | Retrieves whether this database treats mixed-case SQL identifiers that are not enclosed in quotation marks as case-insensitive and stores them in mixed case. |
| [storesMixedCaseQuotedIdentifiers](storesmixedcasequotedidentifiers-method-sqlserverdatabasemetadata.md) | Retrieves whether this database treats mixed-case SQL identifiers that are enclosed in quotation marks as case-insensitive and stores them in mixed case. |
| [storesUpperCaseIdentifiers](storesuppercaseidentifiers-method-sqlserverdatabasemetadata.md) | Retrieves whether this database treats mixed-case SQL identifiers that are not enclosed in quotation marks as case-insensitive and stores them in uppercase. |
| [storesUpperCaseQuotedIdentifiers](storesuppercasequotedidentifiers-method-sqlserverdatabasemetadata.md) | Retrieves whether this database treats mixed-case SQL identifiers that are enclosed in quotation marks as case-insensitive and stores them in uppercase. |
| [supportsAlterTableWithAddColumn](supportsaltertablewithaddcolumn-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports ALTER TABLE with add column. |
| [supportsAlterTableWithDropColumn](supportsaltertablewithdropcolumn-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports ALTER TABLE with drop column. |
| [supportsANSI92EntryLevelSQL](supportsansi92entrylevelsql-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports the ANSI92 entry level SQL grammar. |
| [supportsANSI92FullSQL](supportsansi92fullsql-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports the ANSI92 full SQL grammar. |
| [supportsANSI92IntermediateSQL](supportsansi92intermediatesql-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports the ANSI92 intermediate SQL grammar. |
| [supportsBatchUpdates](supportsbatchupdates-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports batch updates. |
| [supportsCatalogsInDataManipulation](supportscatalogsindatamanipulation-method-sqlserverdatabasemetadata.md) | Retrieves whether a catalog name can be used in a data manipulation statement. |
| [supportsCatalogsInIndexDefinitions](supportscatalogsinindexdefinitions-method-sqlserverdatabasemetadata.md) | Retrieves whether a catalog name can be used in an index definition statement. |
| [supportsCatalogsInPrivilegeDefinitions](supportscatalogsinprivilegedefinitions-method-sqlserverdatabasemetadata.md) | Retrieves whether a catalog name can be used in a privilege definition statement. |
| [supportsCatalogsInProcedureCalls](supportscatalogsinprocedurecalls-method-sqlserverdatabasemetadata.md) | Retrieves whether a catalog name can be used in a procedure call statement. |
| [supportsCatalogsInTableDefinitions](supportscatalogsintabledefinitions-method-sqlserverdatabasemetadata.md) | Retrieves whether a catalog name can be used in a table definition statement. |
| [supportsColumnAliasing](supportscolumnaliasing-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports column aliasing. |
| [supportsConvert](supportsconvert-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports the CONVERT function between SQL types. |
| [supportsCoreSQLGrammar](supportscoresqlgrammar-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports the ODBC Core SQL grammar. |
| [supportsCorrelatedSubqueries](supportscorrelatedsubqueries-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports correlated subqueries. |
| [supportsDataDefinitionAndDataManipulationTransactions](supportsdatadefinitionanddatamanipulationtransactions-method.md) | Retrieves whether this database supports both data definition and data manipulation statements within a transaction. |
| [supportsDataManipulationTransactionsOnly](supportsdatamanipulationtransactionsonly-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports only data manipulation statements within a transaction. |
| [supportsDifferentTableCorrelationNames](supportsdifferenttablecorrelationnames-method-sqlserverdatabasemetadata.md) | Retrieves whether, when table correlation names are supported, they are restricted to being different from the names of the tables. |
| [supportsExpressionsInOrderBy](supportsexpressionsinorderby-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports expressions in ORDER BY lists. |
| [supportsExtendedSQLGrammar](supportsextendedsqlgrammar-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports the ODBC Extended SQL grammar. |
| [supportsFullOuterJoins](supportsfullouterjoins-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports full nested outer joins. |
| [supportsGetGeneratedKeys](supportsgetgeneratedkeys-method-sqlserverdatabasemetadata.md) | Retrieves whether auto-generated keys can be retrieved after a statement has been executed. |
| [supportsGroupBy](supportsgroupby-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports some form of the GROUP BY clause. |
| [supportsGroupByBeyondSelect](supportsgroupbybeyondselect-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports using columns not included in the SELECT statement in a GROUP BY clause provided that all of the columns in the SELECT statement are included in the GROUP BY clause. |
| [supportsGroupByUnrelated](supportsgroupbyunrelated-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports using a column that is not in the SELECT statement in a GROUP BY clause. |
| [supportsIntegrityEnhancementFacility](supportsintegrityenhancementfacility-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports the SQL Integrity Enhancement Facility. |
| [supportsLikeEscapeClause](supportslikeescapeclause-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports specifying a LIKE escape clause. |
| [supportsLimitedOuterJoins](supportslimitedouterjoins-method-sqlserverdatabasemetadata.md) | Retrieves whether this database provides limited support for outer joins. |
| [supportsMinimumSQLGrammar](supportsminimumsqlgrammar-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports the ODBC Minimum SQL grammar. |
| [supportsMixedCaseIdentifiers](supportsmixedcaseidentifiers-method-sqlserverdatabasemetadata.md) | Retrieves whether this database treats mixed-case SQL identifiers that are not enclosed in quotation marks as case-insensitive and stores them in mixed case. |
| [supportsMixedCaseQuotedIdentifiers](supportsmixedcasequotedidentifiers-method-sqlserverdatabasemetadata.md) | Retrieves whether this database treats mixed-case SQL identifiers that are enclosed in quotation marks as case-insensitive and stores them in mixed case. |
| [supportsMultipleOpenResults](supportsmultipleopenresults-method-sqlserverdatabasemetadata.md) | Retrieves whether it is possible to have multiple [SQLServerResultSet](sqlserverresultset-class.md) objects returned from a [SQLServerCallableStatement](sqlservercallablestatement-class.md) object simultaneously. |
| [supportsMultipleResultSets](supportsmultipleresultsets-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports getting multiple [SQLServerResultSet](sqlserverresultset-class.md) objects from a single call to the [execute](execute-method.md) method of the [SQLServerCallableStatement](sqlservercallablestatement-class.md) class. |
| [supportsMultipleTransactions](supportsmultipletransactions-method-sqlserverdatabasemetadata.md) | Retrieves whether this database allows having multiple transactions open at once on different connections. |
| [supportsNamedParameters](supportsnamedparameters-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports named parameters in callable statements. |
| [supportsNonNullableColumns](supportsnonnullablecolumns-method-sqlserverdatabasemetadata.md) | Retrieves whether columns in this database can be defined as non-nullable. |
| [supportsOpenCursorsAcrossCommit](supportsopencursorsacrosscommit-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports keeping cursors open across commits. |
| [supportsOpenCursorsAcrossRollback](supportsopencursorsacrossrollback-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports keeping cursors open across rollbacks. |
| [supportsOpenStatementsAcrossCommit](supportsopenstatementsacrosscommit-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports keeping statements open across commits. |
| [supportsOpenStatementsAcrossRollback](supportsopenstatementsacrossrollback-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports keeping statements open across rollbacks. |
| [supportsOrderByUnrelated](supportsorderbyunrelated-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports using a column that is not in the SELECT statement in an ORDER BY clause. |
| [supportsOuterJoins](supportsouterjoins-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports some form of outer join. |
| [supportsPositionedDelete](supportspositioneddelete-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports positioned DELETE statements. |
| [supportsPositionedUpdate](supportspositionedupdate-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports positioned UPDATE statements. |
| [supportsResultSetConcurrency](supportsresultsetconcurrency-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports the given concurrency type in combination with the given result set type. |
| [supportsResultSetHoldability](supportsresultsetholdability-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports the given result set holdability. |
| [supportsResultSetType](supportsresultsettype-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports the given result set type. |
| [supportsSavepoints](supportssavepoints-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports savepoints. |
| [supportsSchemasInDataManipulation](supportsschemasindatamanipulation-method-sqlserverdatabasemetadata.md) | Retrieves whether a schema name can be used in a data manipulation statement. |
| [supportsSchemasInIndexDefinitions](supportsschemasinindexdefinitions-method-sqlserverdatabasemetadata.md) | Retrieves whether a schema name can be used in an index definition statement. |
| [supportsSchemasInPrivilegeDefinitions](supportsschemasinprivilegedefinitions-method-sqlserverdatabasemetadata.md) | Retrieves whether a schema name can be used in a privilege definition statement. |
| [supportsSchemasInProcedureCalls](supportsschemasinprocedurecalls-method-sqlserverdatabasemetadata.md) | Retrieves whether a schema name can be used in a procedure call statement. |
| [supportsSchemasInTableDefinitions](supportsschemasintabledefinitions-method-sqlserverdatabasemetadata.md) | Retrieves whether a schema name can be used in a table definition statement. |
| [supportsSelectForUpdate](supportsselectforupdate-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports SELECT FOR UPDATE statements. |
| [supportsStatementPooling](supportsstatementpooling-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports statement pooling. |
| [supportsStoredFunctionsUsingCallSyntax](supportsstoredfunctionsusingcallsyntax-method-sqlserverdatabasemetadata.md) | Indicates whether the current database supports invoking user- or vendor-defined functions by using the stored procedure escape syntax. |
| [supportsStoredProcedures](supportsstoredprocedures-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports stored procedure calls that use the stored procedure escape syntax. |
| [supportsSubqueriesInComparisons](supportssubqueriesincomparisons-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports subqueries in comparison expressions. |
| [supportsSubqueriesInExists](supportssubqueriesinexists-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports subqueries in EXISTS expressions. |
| [supportsSubqueriesInIns](supportssubqueriesinins-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports subqueries in IN statements. |
| [supportsSubqueriesInQuantifieds](supportssubqueriesinquantifieds-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports subqueries in quantified expressions. |
| [supportsTableCorrelationNames](supportstablecorrelationnames-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports table correlation names. |
| [supportsTransactionIsolationLevel](supportstransactionisolationlevel-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports the given transaction isolation level. |
| [supportsTransactions](supportstransactions-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports transactions. |
| [supportsUnion](supportsunion-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports SQL UNION. |
| [supportsUnionAll](supportsunionall-method-sqlserverdatabasemetadata.md) | Retrieves whether this database supports SQL UNION ALL. |
| [updatesAreDetected](updatesaredetected-method-sqlserverdatabasemetadata.md) | Retrieves whether or not a visible row update can be detected by calling the [rowUpdated](rowupdated-method-sqlserverresultset.md) method of the [SQLServerResultSet](sqlserverresultset-class.md) class. |
| [usesLocalFilePerTable](useslocalfilepertable-method-sqlserverdatabasemetadata.md) | Retrieves whether this database uses a file for each table. |
| [usesLocalFiles](useslocalfiles-method-sqlserverdatabasemetadata.md) | Retrieves whether this database stores tables in a local file. |
  
## Inherited Methods  
  
| Class inherited from: | Methods |
| --- | --- |
| java.lang.Object | clone, equals, finalize, getClass, hashCode, notify, notifyAll, toString, wait |
| java.sql.Wrapper | isWrapperFor, unwrap |
  
## Related content

- [SQLServerDatabaseMetaData Class](sqlserverdatabasemetadata-class.md)
