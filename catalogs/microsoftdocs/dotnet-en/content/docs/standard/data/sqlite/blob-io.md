---
title: Blob I/O
ms.date: 12/08/2020
description: Learn how to use SQLite's BLOB I/O feature.
---
# Blob I/O

> **Note:**
> The SqliteBlob class was added in version 3.0.

You can reduce memory usage while reading and writing large objects by streaming the data into and out of the database. This can be especially useful when parsing or transforming the data.

Start by inserting a row as normal. Use the `zeroblob()` SQL function to allocate space in the database to hold the large object. The `last_insert_rowid()` function provides a convenient way to get its rowid.

[Code example (complete source file; reference: ../../../../samples/snippets/standard/data/sqlite/StreamingSample/Program.cs?name=snippet_Insert)](../../../../_code/samples/snippets/standard/data/sqlite/StreamingSample/Program.cs.md)

After inserting the row, open a stream to write the large object using [Microsoft.Data.Sqlite.SqliteBlob](https://learn.microsoft.com/search/?terms=Microsoft.Data.Sqlite.SqliteBlob).

[Code example (complete source file; reference: ../../../../samples/snippets/standard/data/sqlite/StreamingSample/Program.cs?name=snippet_Write)](../../../../_code/samples/snippets/standard/data/sqlite/StreamingSample/Program.cs.md)

To stream the large object out of the database, you must select the rowid or one of its aliases as shown here in addition to the large object's column. If you don't select the rowid, the entire object will be loaded into memory. The object returned by `GetStream()` will be a `SqliteBlob` when done correctly.

[Code example (complete source file; reference: ../../../../samples/snippets/standard/data/sqlite/StreamingSample/Program.cs?name=snippet_Read)](../../../../_code/samples/snippets/standard/data/sqlite/StreamingSample/Program.cs.md)
