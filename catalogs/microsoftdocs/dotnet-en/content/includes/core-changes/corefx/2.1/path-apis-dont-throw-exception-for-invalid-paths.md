### Path APIs don't throw an exception for invalid characters

APIs that involve file paths no longer validate path characters or throw an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) if an invalid character is found.

#### Change description

In .NET Framework and .NET Core 1.0 - 2.0, the methods listed in the [Affected APIs](#affected-apis) section throw an [System.ArgumentException](https://learn.microsoft.com/search/?terms=System.ArgumentException) if the path argument contains an invalid path character. Starting in .NET Core 2.1, these methods no longer check for [invalid path characters](https://learn.microsoft.com/search/?terms=System.IO.Path.GetInvalidPathChars%252A) or throw an exception if an invalid character is found.

#### Reason for change

Aggressive validation of path characters blocks some cross-platform scenarios. This change was introduced so that .NET does not try to replicate or predict the outcome of operating system API calls. For more information, see the [System.IO in .NET Core 2.1 sneak peek](https://learn.microsoft.com/archive/blogs/jeremykuhne/system-io-in-net-core-2-1-sneak-peek) blog post.

#### Version introduced

.NET Core 2.1

#### Recommended action

If your code relied on these APIs to check for invalid characters, you can add a call to [System.IO.Path.GetInvalidPathChars%2A](https://learn.microsoft.com/search/?terms=System.IO.Path.GetInvalidPathChars%252A).

#### Affected APIs

- [System.IO.Directory.CreateDirectory%2A](https://learn.microsoft.com/search/?terms=System.IO.Directory.CreateDirectory%252A)
- [System.IO.Directory.Delete%2A](https://learn.microsoft.com/search/?terms=System.IO.Directory.Delete%252A)
- [System.IO.Directory.EnumerateDirectories%2A](https://learn.microsoft.com/search/?terms=System.IO.Directory.EnumerateDirectories%252A)
- [System.IO.Directory.EnumerateFiles%2A](https://learn.microsoft.com/search/?terms=System.IO.Directory.EnumerateFiles%252A)
- [System.IO.Directory.EnumerateFileSystemEntries%2A](https://learn.microsoft.com/search/?terms=System.IO.Directory.EnumerateFileSystemEntries%252A)
- [System.IO.Directory.GetCreationTime(System.String)](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetCreationTime(System.String))
- [System.IO.Directory.GetCreationTimeUtc(System.String)](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetCreationTimeUtc(System.String))
- [System.IO.Directory.GetDirectories%2A](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetDirectories%252A)
- [System.IO.Directory.GetDirectoryRoot(System.String)](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetDirectoryRoot(System.String))
- [System.IO.Directory.GetFiles%2A](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetFiles%252A)
- [System.IO.Directory.GetFileSystemEntries%2A](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetFileSystemEntries%252A)
- [System.IO.Directory.GetLastAccessTime(System.String)](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetLastAccessTime(System.String))
- [System.IO.Directory.GetLastAccessTimeUtc(System.String)](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetLastAccessTimeUtc(System.String))
- [System.IO.Directory.GetLastWriteTime(System.String)](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetLastWriteTime(System.String))
- [System.IO.Directory.GetLastWriteTimeUtc(System.String)](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetLastWriteTimeUtc(System.String))
- [System.IO.Directory.GetParent(System.String)](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetParent(System.String))
- [System.IO.Directory.Move(System.String,System.String)](https://learn.microsoft.com/search/?terms=System.IO.Directory.Move(System.String%2CSystem.String))
- [System.IO.Directory.SetCreationTime(System.String,System.DateTime)](https://learn.microsoft.com/search/?terms=System.IO.Directory.SetCreationTime(System.String%2CSystem.DateTime))
- [System.IO.Directory.SetCreationTimeUtc(System.String,System.DateTime)](https://learn.microsoft.com/search/?terms=System.IO.Directory.SetCreationTimeUtc(System.String%2CSystem.DateTime))
- [System.IO.Directory.SetCurrentDirectory(System.String)](https://learn.microsoft.com/search/?terms=System.IO.Directory.SetCurrentDirectory(System.String))
- [System.IO.Directory.SetLastAccessTime(System.String,System.DateTime)](https://learn.microsoft.com/search/?terms=System.IO.Directory.SetLastAccessTime(System.String%2CSystem.DateTime))
- [System.IO.Directory.SetLastAccessTimeUtc(System.String,System.DateTime)](https://learn.microsoft.com/search/?terms=System.IO.Directory.SetLastAccessTimeUtc(System.String%2CSystem.DateTime))
- [System.IO.Directory.SetLastWriteTime(System.String,System.DateTime)](https://learn.microsoft.com/search/?terms=System.IO.Directory.SetLastWriteTime(System.String%2CSystem.DateTime))
- [System.IO.Directory.SetLastWriteTimeUtc(System.String,System.DateTime)](https://learn.microsoft.com/search/?terms=System.IO.Directory.SetLastWriteTimeUtc(System.String%2CSystem.DateTime))
- [System.IO.DirectoryInfo ctor](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.%2523ctor\(System.String\))
- [System.IO.Directory.GetDirectories%2A](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetDirectories%252A)
- [System.IO.Directory.GetFiles%2A](https://learn.microsoft.com/search/?terms=System.IO.Directory.GetFiles%252A)
- [System.IO.DirectoryInfo.GetFileSystemInfos%2A](https://learn.microsoft.com/search/?terms=System.IO.DirectoryInfo.GetFileSystemInfos%252A)
- [System.IO.File.AppendAllText%2A](https://learn.microsoft.com/search/?terms=System.IO.File.AppendAllText%252A)
- [System.IO.File.AppendAllTextAsync%2A](https://learn.microsoft.com/search/?terms=System.IO.File.AppendAllTextAsync%252A)
- [System.IO.File.Copy%2A](https://learn.microsoft.com/search/?terms=System.IO.File.Copy%252A)
- [System.IO.File.Create%2A](https://learn.microsoft.com/search/?terms=System.IO.File.Create%252A)
- [System.IO.File.CreateText%2A](https://learn.microsoft.com/search/?terms=System.IO.File.CreateText%252A)
- [System.IO.File.Decrypt%2A](https://learn.microsoft.com/search/?terms=System.IO.File.Decrypt%252A)
- [System.IO.File.Delete%2A](https://learn.microsoft.com/search/?terms=System.IO.File.Delete%252A)
- [System.IO.File.Encrypt%2A](https://learn.microsoft.com/search/?terms=System.IO.File.Encrypt%252A)
- [System.IO.File.GetAttributes(System.String)](https://learn.microsoft.com/search/?terms=System.IO.File.GetAttributes(System.String))
- [System.IO.File.GetCreationTime(System.String)](https://learn.microsoft.com/search/?terms=System.IO.File.GetCreationTime(System.String))
- [System.IO.File.GetCreationTimeUtc(System.String)](https://learn.microsoft.com/search/?terms=System.IO.File.GetCreationTimeUtc(System.String))
- [System.IO.File.GetLastAccessTime(System.String)](https://learn.microsoft.com/search/?terms=System.IO.File.GetLastAccessTime(System.String))
- [System.IO.File.GetLastAccessTimeUtc(System.String)](https://learn.microsoft.com/search/?terms=System.IO.File.GetLastAccessTimeUtc(System.String))
- [System.IO.File.GetLastWriteTime(System.String)](https://learn.microsoft.com/search/?terms=System.IO.File.GetLastWriteTime(System.String))
- [System.IO.File.GetLastWriteTimeUtc(System.String)](https://learn.microsoft.com/search/?terms=System.IO.File.GetLastWriteTimeUtc(System.String))
- [System.IO.File.Move%2A](https://learn.microsoft.com/search/?terms=System.IO.File.Move%252A)
- [System.IO.File.Open%2A](https://learn.microsoft.com/search/?terms=System.IO.File.Open%252A)
- [System.IO.File.OpenRead(System.String)](https://learn.microsoft.com/search/?terms=System.IO.File.OpenRead(System.String))
- [System.IO.File.OpenText(System.String)](https://learn.microsoft.com/search/?terms=System.IO.File.OpenText(System.String))
- [System.IO.File.OpenWrite(System.String)](https://learn.microsoft.com/search/?terms=System.IO.File.OpenWrite(System.String))
- [System.IO.File.ReadAllBytes(System.String)](https://learn.microsoft.com/search/?terms=System.IO.File.ReadAllBytes(System.String))
- [System.IO.File.ReadAllBytesAsync(System.String,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.IO.File.ReadAllBytesAsync(System.String%2CSystem.Threading.CancellationToken))
- [System.IO.File.ReadAllLines(System.String)](https://learn.microsoft.com/search/?terms=System.IO.File.ReadAllLines(System.String))
- [System.IO.File.ReadAllLinesAsync(System.String,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.IO.File.ReadAllLinesAsync(System.String%2CSystem.Threading.CancellationToken))
- [System.IO.File.ReadAllText(System.String)](https://learn.microsoft.com/search/?terms=System.IO.File.ReadAllText(System.String))
- [System.IO.File.ReadAllTextAsync(System.String,System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.IO.File.ReadAllTextAsync(System.String%2CSystem.Threading.CancellationToken))
- [System.IO.File.SetAttributes(System.String,System.IO.FileAttributes)](https://learn.microsoft.com/search/?terms=System.IO.File.SetAttributes(System.String%2CSystem.IO.FileAttributes))
- [System.IO.File.SetCreationTime(System.String,System.DateTime)](https://learn.microsoft.com/search/?terms=System.IO.File.SetCreationTime(System.String%2CSystem.DateTime))
- [System.IO.File.SetCreationTimeUtc(System.String,System.DateTime)](https://learn.microsoft.com/search/?terms=System.IO.File.SetCreationTimeUtc(System.String%2CSystem.DateTime))
- [System.IO.File.SetLastAccessTime(System.String,System.DateTime)](https://learn.microsoft.com/search/?terms=System.IO.File.SetLastAccessTime(System.String%2CSystem.DateTime))
- [System.IO.File.SetLastAccessTimeUtc(System.String,System.DateTime)](https://learn.microsoft.com/search/?terms=System.IO.File.SetLastAccessTimeUtc(System.String%2CSystem.DateTime))
- [System.IO.File.SetLastWriteTime(System.String,System.DateTime)](https://learn.microsoft.com/search/?terms=System.IO.File.SetLastWriteTime(System.String%2CSystem.DateTime))
- [System.IO.File.SetLastWriteTimeUtc(System.String,System.DateTime)](https://learn.microsoft.com/search/?terms=System.IO.File.SetLastWriteTimeUtc(System.String%2CSystem.DateTime))
- [System.IO.File.WriteAllBytes(System.String,System.Byte\[\])](https://learn.microsoft.com/search/?terms=System.IO.File.WriteAllBytes(System.String%2CSystem.Byte%5B%5D))
- [System.IO.File.WriteAllBytesAsync(System.String,System.Byte\[\],System.Threading.CancellationToken)](https://learn.microsoft.com/search/?terms=System.IO.File.WriteAllBytesAsync(System.String%2CSystem.Byte%5B%5D%2CSystem.Threading.CancellationToken))
- [System.IO.File.WriteAllLines%2A](https://learn.microsoft.com/search/?terms=System.IO.File.WriteAllLines%252A)
- [System.IO.File.WriteAllLinesAsync%2A](https://learn.microsoft.com/search/?terms=System.IO.File.WriteAllLinesAsync%252A)
- [System.IO.File.WriteAllText%2A](https://learn.microsoft.com/search/?terms=System.IO.File.WriteAllText%252A)
- [System.IO.FileInfo ctor](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.%2523ctor\(System.String\))
- [System.IO.FileInfo.CopyTo%2A](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.CopyTo%252A)
- [System.IO.FileInfo.MoveTo%2A](https://learn.microsoft.com/search/?terms=System.IO.FileInfo.MoveTo%252A)
- [System.IO.FileStream ctor](https://learn.microsoft.com/search/?terms=System.IO.FileStream.%2523ctor%252A)
- [System.IO.Path.GetFullPath(System.String)](https://learn.microsoft.com/search/?terms=System.IO.Path.GetFullPath(System.String))
- [System.IO.Path.IsPathRooted(System.String)](https://learn.microsoft.com/search/?terms=System.IO.Path.IsPathRooted(System.String))
- [System.IO.Path.GetPathRoot(System.String)](https://learn.microsoft.com/search/?terms=System.IO.Path.GetPathRoot(System.String))
- [System.IO.Path.ChangeExtension(System.String,System.String)](https://learn.microsoft.com/search/?terms=System.IO.Path.ChangeExtension(System.String%2CSystem.String))
- [System.IO.Path.GetDirectoryName(System.String)](https://learn.microsoft.com/search/?terms=System.IO.Path.GetDirectoryName(System.String))
- [System.IO.Path.GetExtension(System.String)](https://learn.microsoft.com/search/?terms=System.IO.Path.GetExtension(System.String))
- [System.IO.Path.HasExtension(System.String)](https://learn.microsoft.com/search/?terms=System.IO.Path.HasExtension(System.String))
- [System.IO.Path.Combine%2A](https://learn.microsoft.com/search/?terms=System.IO.Path.Combine%252A)

#### See also

- [System.IO in .NET Core 2.1 sneak peek](https://learn.microsoft.com/archive/blogs/jeremykuhne/system-io-in-net-core-2-1-sneak-peek)

<!--

### Category

Core .NET libraries

### Affected APIs

- `Overload:System.IO.Directory.CreateDirectory`
- `Overload:System.IO.Directory.Delete`
- `Overload:System.IO.Directory.EnumerateDirectories`
- `Overload:System.IO.Directory.EnumerateFiles`
- `Overload:System.IO.Directory.EnumerateFileSystemEntries`
- `M:System.IO.Directory.GetCreationTime(System.String)`
- `M:System.IO.Directory.GetCreationTimeUtc(System.String)`
- `Overload:System.IO.Directory.GetDirectories`
- `M:System.IO.Directory.GetDirectoryRoot(System.String)`
- `Overload:System.IO.Directory.GetFiles`
- `Overload:System.IO.Directory.GetFileSystemEntries`
- `M:System.IO.Directory.GetLastAccessTime(System.String)`
- `M:System.IO.Directory.GetLastAccessTimeUtc(System.String)`
- `M:System.IO.Directory.GetLastWriteTime(System.String)`
- `M:System.IO.Directory.GetLastWriteTimeUtc(System.String)`
- `M:System.IO.Directory.GetParent(System.String)`
- `M:System.IO.Directory.Move(System.String,System.String)`
- `M:System.IO.Directory.SetCreationTime(System.String)`
- `M:System.IO.Directory.SetCreationTimeUtc(System.String)`
- `M:System.IO.Directory.SetCurrentDirectory(System.String)`
- `M:System.IO.Directory.SetLastAccessTime(System.String)`
- `M:System.IO.Directory.SetLastAccessTimeUtc(System.String)`
- `M:System.IO.Directory.SetLastWriteTime(System.String)`
- `M:System.IO.Directory.SetLastWriteTimeUtc(System.String)`
- `M:System.IO.DirectoryInfo.%23ctor(System.String)>
- `Overload:System.IO.Directory.GetDirectories`
- `Overload:System.IO.Directory.GetFiles`
- `Overload:System.IO.DirectoryInfo.GetFileSystemInfos`
- `Overload:System.IO.File.AppendAllText`
- `Overload:System.IO.File.AppendAllTextAsync`
- `Overload:System.IO.File.Copy`
- `Overload:System.IO.File.Create`
- `Overload:System.IO.File.CreateText`
- `Overload:System.IO.File.Decrypt`
- `Overload:System.IO.File.Delete`
- `Overload:System.IO.File.Encrypt`
- `M:System.IO.File.GetAttributes(System.String)`
- `M:System.IO.File.GetCreationTime(System.String)`
- `M:System.IO.File.GetCreationTimeUtc(System.String)`
- `M:System.IO.File.GetLastAccessTime(System.String)`
- `M:System.IO.File.GetLastAccessTimeUtc(System.String)`
- `M:System.IO.File.GetLastWriteTime(System.String)`
- `M:System.IO.File.GetLastWriteTimeUtc(System.String)`
- `Overload:System.IO.File.Move`
- `Overload:System.IO.File.Open`
- `M:System.IO.File.OpenRead(System.String)`
- `M:System.IO.File.OpenText(System.String)`
- `M:System.IO.File.OpenWrite(System.String)`
- `M:System.IO.File.ReadAllBytes(System.String)`
- `M:System.IO.File.ReadAllBytesAsync(System.String,System.Threading.CancellationToken)`
- `M:System.IO.File.ReadAllLines(System.String)`
- `M:System.IO.File.ReadAllLinesAsync(System.String,System.Threading.CancellationToken)`
- `M:System.IO.File.ReadAllText(System.String)`
- `M:System.IO.File.ReadAllTextAsync(System.String,System.Threading.CancellationToken)`
- `M:System.IO.File.SetAttributes(System.String)`
- `M:System.IO.File.SetCreationTime(System.String)`
- `M:System.IO.File.SetCreationTimeUtc(System.String)`
- `M:System.IO.File.SetLastAccessTime(System.String)`
- `M:System.IO.File.SetLastAccessTimeUtc(System.String)`
- `M:System.IO.File.SetLastWriteTime(System.String)`
- `M:System.IO.File.SetLastWriteTimeUtc(System.String)`
- `M:System.IO.File.WriteAllBytes(System.String)`
- `M:System.IO.File.WriteAllBytesAsync(System.String,System.Threading.CancellationToken)`
- `Overload:System.IO.File.WriteAllLines`
- `Overload:System.IO.File.WriteAllLinesAsync`
- `Overload:System.IO.File.WriteAllText`
- `M:System.IO.FileInfo.#ctor(System.String)`
- `Overload:System.IO.FileInfo.CopyTo`
- `Overload:System.IO.FileInfo.MoveTo`
- `Overload:System.IO.FileStream.#ctor`
- `M:System.IO.Path.GetFullPath(System.String)`
- `M:System.IO.Path.IsPathRooted(System.String)`
- `M:System.IO.Path.GetPathRoot(System.String)`
- `M:System.IO.Path.ChangeExtension(System.String,System.String)`
- `M:System.IO.Path.GetDirectoryName(System.String)`
- `M:System.IO.Path.GetExtension(System.String)`
- `M:System.IO.Path.HasExtension(System.String)`
- `Overload:System.IO.Path.Combine`

-->
