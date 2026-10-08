# Source code: docs/standard/commandline/snippets/model-binding/csharp/ReturnExitCode.cs

Complete source file; linked examples may select a region or line range.

```
using System.CommandLine;

namespace ReturnExitCode;

class Program
{
    // <returnexitcode>
    static int Main(string[] args)
    {
        Option<int> delayOption = new("--delay");
        Option<string> messageOption = new("--message");

        RootCommand rootCommand = new("Parameter binding example")
        {
            delayOption,
            messageOption
        };

        rootCommand.SetAction(parseResult =>
        {
            Console.WriteLine($"--delay = {parseResult.GetValue(delayOption)}");
            Console.WriteLine($"--message = {parseResult.GetValue(messageOption)}");
            // Value returned from the action delegate is the exit code.
            return 100;
        });

        return rootCommand.Parse(args).Invoke();
    }
// </returnexitcode>
}

```
