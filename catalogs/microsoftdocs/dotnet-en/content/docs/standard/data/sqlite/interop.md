---
title: Interoperability
ms.date: 12/13/2019
description: Learn how to interoperate with other SQLite libraries.
---
# Interoperability

`Microsoft.Data.Sqlite` uses `SQLitePCLRaw` to interact with the native SQLite library. `SQLitePCLRaw` provides a thin .NET API over the native SQLite API. `SqliteConnection` and `SqliteDataReader` provide access to the underlying SQLitePCLRaw objects letting you call these APIs directly.

The following example shows how to call `sqlite3_trace` to write executed SQL statements to the console:

[Code example (complete source file; reference: ../../../../samples/snippets/standard/data/sqlite/InteropSample/Program.cs?name=snippet_Trace)](../../../../_code/samples/snippets/standard/data/sqlite/InteropSample/Program.cs.md)

And the following example shows calling `sqlite3_stmt_status` to see how many SQLite virtual machine steps a SQL statement compiled into:

[Code example (complete source file; reference: ../../../../samples/snippets/standard/data/sqlite/InteropSample/Program.cs?name=snippet_StatementStatus)](../../../../_code/samples/snippets/standard/data/sqlite/InteropSample/Program.cs.md)

The SQLitePCLRaw objects even expose a pointer to the native objects letting you P/Invoke additional native SQLite APIs.
