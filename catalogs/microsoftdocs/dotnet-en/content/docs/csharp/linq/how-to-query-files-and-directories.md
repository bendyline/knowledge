---
title: "Use LINQ to query files and directories"
description: Use Language Integrated Query (LINQ) for file system operations that don't to change the contents of the files or folders.
ms.date: 04/22/2024
---
# How to: Use LINQ to query files and directories

Many file system operations are essentially queries and are therefore well suited to the LINQ approach. These queries are nondestructive. They don't change the contents of the original files or folders. Queries shouldn't cause any side-effects. In general, any code (including queries that perform create / update / delete operations) that modifies source data should be kept separate from the code that just queries the data.

There's some complexity involved in creating a data source that accurately represents the contents of the file system and handles exceptions gracefully. The examples in this section create a snapshot collection of [System.IO.FileInfo](https://learn.microsoft.com/search/?terms=System.IO.FileInfo) objects that represents all the files under a specified root folder and all its subfolders. The actual state of each [System.IO.FileInfo](https://learn.microsoft.com/search/?terms=System.IO.FileInfo) might change in the time between when you begin and end executing a query. For example, you can create a list of [System.IO.FileInfo](https://learn.microsoft.com/search/?terms=System.IO.FileInfo) objects to use as a data source. If you try to access the `Length` property in a query, the [System.IO.FileInfo](https://learn.microsoft.com/search/?terms=System.IO.FileInfo) object tries to access the file system to update the value of `Length`. If the file no longer exists, you get a [System.IO.FileNotFoundException](https://learn.microsoft.com/search/?terms=System.IO.FileNotFoundException) in your query, even though you aren't querying the file system directly.

## How to query for files with a specified attribute or name

This example shows how to find all files that have a specified file name extension (for example ".txt") in a specified directory tree. It also shows how to return either the newest or oldest file in the tree based on the creation time. You might need to modify the first line of many of the samples whether you're running this code on either Windows, Mac, or a Linux system.

[language="csharp" source="./snippets/HowToFilesAndDirectories/Program.cs" id="FindFilesByExtension"::: (complete source file; reference: ./snippets/HowToFilesAndDirectories/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToFilesAndDirectories/Program.cs.md)

## How to group files by extension

This example shows how LINQ can be used to perform advanced grouping and sorting operations on lists of files or folders. It also shows how to page output in the console window by using the [System.Linq.Enumerable.Skip*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Skip*) and [System.Linq.Enumerable.Take*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Take*) methods.

The following query shows how to group the contents of a specified directory tree by the file name extension.

[language="csharp" source="./snippets/HowToFilesAndDirectories/Program.cs" id="GroupFilesByExtension"::: (complete source file; reference: ./snippets/HowToFilesAndDirectories/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToFilesAndDirectories/Program.cs.md)

The output from this program can be long, depending on the details of the local file system and what the `startFolder` is set to. To enable viewing of all results, this example shows how to page through results. A nested `foreach` loop is required because each group is enumerated separately.

## How to query for the total number of bytes in a set of folders

This example shows how to retrieve the total number of bytes used by all the files in a specified folder and all its subfolders. The [System.Linq.Enumerable.Sum*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Sum*) method adds the values of all the items selected in the `select` clause. You can modify this query to retrieve the biggest or smallest file in the specified directory tree by calling the [System.Linq.Enumerable.Min*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Min*) or [System.Linq.Enumerable.Max*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Max*) method instead of [System.Linq.Enumerable.Sum*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Sum*).

[language="csharp" source="./snippets/HowToFilesAndDirectories/Program.cs" id="QueryByFileSize"::: (complete source file; reference: ./snippets/HowToFilesAndDirectories/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToFilesAndDirectories/Program.cs.md)

This example extends the previous example to do the following:

- How to retrieve the size in bytes of the largest file.
- How to retrieve the size in bytes of the smallest file.
- How to retrieve the [System.IO.FileInfo](https://learn.microsoft.com/search/?terms=System.IO.FileInfo) object largest or smallest file from one or more folders under a specified root folder.
- How to retrieve a sequence such as the 10 largest files.
- How to order files into groups based on their file size in bytes, ignoring files that are less than a specified size.

The following example contains five separate queries that show how to query and group files, depending on their file size in bytes. You can modify these examples to base the query on some other property of the [System.IO.FileInfo](https://learn.microsoft.com/search/?terms=System.IO.FileInfo) object.

[language="csharp" source="./snippets/HowToFilesAndDirectories/Program.cs" id="MoreQueriesOnFileSizes"::: (complete source file; reference: ./snippets/HowToFilesAndDirectories/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToFilesAndDirectories/Program.cs.md)

To return one or more complete [System.IO.FileInfo](https://learn.microsoft.com/search/?terms=System.IO.FileInfo) objects, the query first must examine each one in the data source, and then sort them by the value of their Length property. Then it can return the single one or the sequence with the greatest lengths. Use [System.Linq.Enumerable.First*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.First*) to return the first element in a list. Use [System.Linq.Enumerable.Take*](https://learn.microsoft.com/search/?terms=System.Linq.Enumerable.Take*) to return the first n number of elements. Specify a descending sort order to put the smallest elements at the start of the list.

## How to query for duplicate files in a directory tree

Sometimes files that have the same name can be located in more than one folder. This example shows how to query for such duplicate file names under a specified root folder. The second example shows how to query for files whose size and LastWrite times also match.

[language="csharp" source="./snippets/HowToFilesAndDirectories/DuplicateFileQuery.cs" id="QueryDuplicateNames"::: (complete source file; reference: ./snippets/HowToFilesAndDirectories/DuplicateFileQuery.cs)](../../../_code/docs/csharp/linq/snippets/HowToFilesAndDirectories/DuplicateFileQuery.cs.md)

The first query uses a key to determine a match. It finds files that have the same name but whose contents might be different. The second query uses a compound key to match against three properties of the [System.IO.FileInfo](https://learn.microsoft.com/search/?terms=System.IO.FileInfo) object. This query is much more likely to find files that have the same name and similar or identical content.

[language="csharp" source="./snippets/HowToFilesAndDirectories/DuplicateFileQuery.cs" id="QueryDuplicateFileInfo"::: (complete source file; reference: ./snippets/HowToFilesAndDirectories/DuplicateFileQuery.cs)](../../../_code/docs/csharp/linq/snippets/HowToFilesAndDirectories/DuplicateFileQuery.cs.md)

## How to query the contents of text files in a folder

This example shows how to query over all the files in a specified directory tree, open each file, and inspect its contents. This type of technique could be used to create indexes or reverse indexes of the contents of a directory tree. A simple string search is performed in this example. However, more complex types of pattern matching can be performed with a regular expression.

[language="csharp" source="./snippets/HowToFilesAndDirectories/Program.cs" id="QueryTextContent"::: (complete source file; reference: ./snippets/HowToFilesAndDirectories/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToFilesAndDirectories/Program.cs.md)

## How to compare the contents of two folders

This example demonstrates three ways to compare two file listings:

- By querying for a Boolean value that specifies whether the two file lists are identical.
- By querying for the intersection to retrieve the files that are in both folders.
- By querying for the set difference to retrieve the files that are in one folder but not the other.

The techniques shown here can be adapted to compare sequences of objects of any type.

The `FileComparer` class shown here demonstrates how to use a custom comparer class together with the Standard Query Operators. The class isn't intended for use in real-world scenarios. It just uses the name and length in bytes of each file to determine whether the contents of each folder are identical or not. In a real-world scenario, you should modify this comparer to perform a more rigorous equality check.

[language="csharp" source="./snippets/HowToFilesAndDirectories/CompareDirectoryContents.cs" id="CompareDirectoryContents"::: (complete source file; reference: ./snippets/HowToFilesAndDirectories/CompareDirectoryContents.cs)](../../../_code/docs/csharp/linq/snippets/HowToFilesAndDirectories/CompareDirectoryContents.cs.md)

## How to reorder the fields of a delimited file

A comma-separated value (CSV) file is a text file that is often used to store spreadsheet data or other tabular data represented by rows and columns. By using the [System.String.Split*](https://learn.microsoft.com/search/?terms=System.String.Split*) method to separate the fields, it's easy to query and manipulate CSV files using LINQ. In fact, the same technique can be used to reorder the parts of any structured line of text; it isn't limited to CSV files.

In the following example, assume that the three columns represent students' "family name," "first name", and "ID." The fields are in alphabetical order based on the students' family names. The query produces a new sequence in which the ID column appears first, followed by a second column that combines the student's first name and family name. The lines are reordered according to the ID field. The results are saved into a new file and the original data isn't modified. The following text shows the contents of the *spreadsheet1.csv* file used in the following example:

[Code reference unavailable in this source snapshot: ./snippets/HowToFilesAndDirectories/spreadsheet1.csv](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/csharp/linq/how-to-query-files-and-directories.md)

The following code reads the source file and rearranges each column in the CSV file to rearrange the order of the columns:

[language="csharp" source="./snippets/HowToFilesAndDirectories/Program.cs" id="UpdateFileContent"::: (complete source file; reference: ./snippets/HowToFilesAndDirectories/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToFilesAndDirectories/Program.cs.md)

## How to split a file into many files by using groups

This example shows one way to merge the contents of two files and then create a set of new files that organize the data in a new way. The query uses the contents of two files. The following text shows the contents of the first file, *names1.txt*:

[Code reference unavailable in this source snapshot: ./snippets/HowToFilesAndDirectories/names1.txt](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/csharp/linq/how-to-query-files-and-directories.md)

The second file, *names2.txt*, contains a different set of names, some of which are in common with the first set:

[Code reference unavailable in this source snapshot: ./snippets/HowToFilesAndDirectories/names2.txt](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/csharp/linq/how-to-query-files-and-directories.md)

The following code queries both files, takes the union of both files, then writes a new file for each group, defined by the first letter of the family name:

[language="csharp" source="./snippets/HowToFilesAndDirectories/Program.cs" id="SplitFileIntoGroups"::: (complete source file; reference: ./snippets/HowToFilesAndDirectories/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToFilesAndDirectories/Program.cs.md)

## How to join content from dissimilar files

This example shows how to join data from two comma-delimited files that share a common value that is used as a matching key. This technique can be useful if you have to combine data from two spreadsheets, or from a spreadsheet and from a file that has another format, into a new file. You can modify the example to work with any kind of structured text.

The following text shows the contents of *scores.csv*. The file represents spreadsheet data. Column 1 is the student's ID, and columns 2 through 5 are test scores.

[Code reference unavailable in this source snapshot: ./snippets/HowToFilesAndDirectories/scores.csv](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/csharp/linq/how-to-query-files-and-directories.md)

The following text shows the contents of *names.csv*. The file represents a spreadsheet that contains the student's family name, first name, and student ID.

[Code reference unavailable in this source snapshot: ./snippets/HowToFilesAndDirectories/names.csv](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/csharp/linq/how-to-query-files-and-directories.md)

Join content from dissimilar files that contain related information. File *names.csv* contains the student name plus an ID number. File *scores.csv* contains the ID and a set of four test scores. The following query joins the scores to the student names by using ID as a matching key. The code is shown in the following example:

[language="csharp" source="./snippets/HowToFilesAndDirectories/Program.cs" id="JoinDissimilarFiles"::: (complete source file; reference: ./snippets/HowToFilesAndDirectories/Program.cs)](../../../_code/docs/csharp/linq/snippets/HowToFilesAndDirectories/Program.cs.md)

## How to compute column values in a CSV text file

This example shows how to perform aggregate computations such as Sum, Average, Min, and Max on the columns of a .csv file. The example principles that are shown here can be applied to other types of structured text.

The following text shows the contents of *scores.csv*. Assume that the first column represents a student ID, and subsequent columns represent scores from four exams.

[Code reference unavailable in this source snapshot: ./snippets/HowToFilesAndDirectories/scores.csv](https://github.com/dotnet/docs/blob/77bc2511d224447ac13474e7757e3600ad30c3de/docs/csharp/linq/how-to-query-files-and-directories.md)

The following text shows how to use the [System.String.Split*](https://learn.microsoft.com/search/?terms=System.String.Split*) method to convert each line of text into an array. Each array element represents a column. Finally, the text in each column is converted to its numeric representation.

[language="csharp" source="./snippets/HowToFilesAndDirectories/SumColumns.cs" id="SumColumns"::: (complete source file; reference: ./snippets/HowToFilesAndDirectories/SumColumns.cs)](../../../_code/docs/csharp/linq/snippets/HowToFilesAndDirectories/SumColumns.cs.md)

If your file is a tab-separated file, just update the argument in the `SumColumns.ProcessColumns` method to `\t`.
