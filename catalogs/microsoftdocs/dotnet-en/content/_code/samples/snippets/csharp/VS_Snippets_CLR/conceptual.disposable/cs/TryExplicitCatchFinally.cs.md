# Source code: samples/snippets/csharp/VS_Snippets_CLR/conceptual.disposable/cs/TryExplicitCatchFinally.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.Globalization;
using System.IO;

class TryExplicitCatchFinally
{
    static void Main()
    {
        StreamReader? streamReader = null;
        try
        {
            streamReader = new StreamReader("file1.txt");
            string contents = streamReader.ReadToEnd();
            var info = new StringInfo(contents);
            Console.WriteLine($"The file has {info.LengthInTextElements} text elements.");
        }
        catch (FileNotFoundException)
        {
            Console.WriteLine("The file cannot be found.");
        }
        catch (IOException)
        {
            Console.WriteLine("An I/O error has occurred.");
        }
        catch (OutOfMemoryException)
        {
            Console.WriteLine("There is insufficient memory to read the file.");
        }
        finally
        {
            streamReader?.Dispose();
        }
    }
}

```
