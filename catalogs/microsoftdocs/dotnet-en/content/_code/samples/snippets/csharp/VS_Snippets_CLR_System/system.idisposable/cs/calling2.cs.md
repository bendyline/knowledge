# Source code: samples/snippets/csharp/VS_Snippets_CLR_System/system.idisposable/cs/calling2.cs

Complete source file; linked examples may select a region or line range.

```
using System.IO;
using System.Text.RegularExpressions;

public class WordCountCleanup
{
    const string Pattern = @"\b\w+\b";

    public WordCountCleanup(string filename)
    {
        if (!File.Exists(filename))
        {
            throw new FileNotFoundException("The file does not exist.");
        }

        FullName = filename;

        string txt = string.Empty;
        StreamReader? streamReader = null;
        try
        {
            streamReader = new StreamReader(filename);
            txt = streamReader.ReadToEnd();
        }
        finally
        {
            streamReader?.Dispose();
        }

        Count = Regex.Matches(txt, Pattern).Count;
    }

    public string FullName { get; }
    public string Name => Path.GetFileName(FullName);
    public int Count { get; }
}

```
