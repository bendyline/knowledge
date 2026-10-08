# Source code: samples/snippets/standard/io/file-names/cs/rename.cs

Complete source file; linked examples may select a region or line range.

```
using System.IO;

class Example3
{
    static void Main()
    {
        var fi = new FileInfo(@".\test.txt");
        fi.MoveTo(@".\Test.txt");
    }
}

```
