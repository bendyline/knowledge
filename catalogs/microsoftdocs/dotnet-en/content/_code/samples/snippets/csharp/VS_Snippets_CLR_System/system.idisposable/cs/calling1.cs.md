# Source code: samples/snippets/csharp/VS_Snippets_CLR_System/system.idisposable/cs/calling1.cs

Complete source file; linked examples may select a region or line range.

```
using System.IO;
using System.Text.RegularExpressions;

public class WordCount
{
    const string Pattern = @"\b\w+\b";

    public WordCount(string filename)
    {
        if (!File.Exists(filename))
        {
            throw new FileNotFoundException("The file does not exist.");
        }

        FullName = filename;

        using var streamReader = new StreamReader(FullName);
        var txt = streamReader.ReadToEnd();

        Count = Regex.Matches(txt, Pattern).Count;
    }

    public string FullName { get; }
    public string Name => Path.GetFileName(FullName);
    public int Count { get; }
}

```
