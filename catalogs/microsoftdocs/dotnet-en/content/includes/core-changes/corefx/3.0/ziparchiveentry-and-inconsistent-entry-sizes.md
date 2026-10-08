### ZipArchiveEntry no longer handles archives with inconsistent entry sizes

Zip archives list both compressed size and uncompressed size in the central directory and local header.  The entry data itself also indicates its size.  In .NET Core 2.2 and earlier versions, these values were never checked for consistency. Starting with .NET Core 3.0, they now are.

#### Change description

In .NET Core 2.2 and earlier versions, [System.IO.Compression.ZipArchiveEntry.Open](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchiveEntry.Open) succeeds even if the local header disagrees with the central header of the zip file. Data is decompressed until the end of the compressed stream is reached, even if its length exceeds the uncompressed file size listed in the central directory/local header.

Starting with .NET Core 3.0, the [System.IO.Compression.ZipArchiveEntry.Open](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchiveEntry.Open) method checks that local header and central header agree on compressed and uncompressed sizes of an entry.  If they do not, the method throws an [System.IO.InvalidDataException](https://learn.microsoft.com/search/?terms=System.IO.InvalidDataException) if the archive's local header and/or data descriptor list sizes that disagree with the central directory of the zip file. When reading an entry, decompressed data is truncated to the uncompressed file size listed in the header.

This change was made to ensure that a [System.IO.Compression.ZipArchiveEntry](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchiveEntry) correctly represents the size of its data and that only that amount of data is read.

#### Version introduced

3.0

#### Recommended action

Repackage any zip archive that exhibits these problems.

#### Category

Core .NET libraries

#### Affected APIs

- [System.IO.Compression.ZipArchiveEntry.Open](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipArchiveEntry.Open)
- [System.IO.Compression.ZipFileExtensions.ExtractToDirectory%2A](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipFileExtensions.ExtractToDirectory%252A)
- [System.IO.Compression.ZipFileExtensions.ExtractToFile%2A](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipFileExtensions.ExtractToFile%252A)
- [System.IO.Compression.ZipFile.ExtractToDirectory%2A](https://learn.microsoft.com/search/?terms=System.IO.Compression.ZipFile.ExtractToDirectory%252A)

<!--

#### Affected APIs

`M:System.IO.Compression.ZipArchiveEntry.Open`
`Overload:System.IO.Compression.ZipFileExtensions.ExtractToDirectory%2A`
`Overload:System.IO.Compression.ZipFileExtensions.ExtractToFile%2A`
`Overload:System.IO.Compression.ZipFile.ExtractToDirectory%2A`

-->
