# Source code: docs/machine-learning/whats-new/snippets/csharp/CodeGen.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.ML.Tokenizers;
using System.Collections.Generic;
using System.IO;

internal class CodeGen
{
    public static void RunIt()
    {
        // <CodeGen>
        string phi2VocabPath = "https://huggingface.co/microsoft/phi-2/resolve/main/vocab.json?download=true";
        string phi2MergePath = "https://huggingface.co/microsoft/phi-2/resolve/main/merges.txt?download=true";
        using Stream vocabStream = File.OpenRead(phi2VocabPath);
        using Stream mergesStream = File.OpenRead(phi2MergePath);

        Tokenizer phi2Tokenizer = CodeGenTokenizer.Create(vocabStream, mergesStream);
        IReadOnlyList<int> ids = phi2Tokenizer.EncodeToIds("Hello, World");
        // </CodeGen>
    }
}

```
