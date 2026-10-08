# Source code: docs/csharp/advanced-topics/interop/snippets/WinSound/Program.cs

Complete source file; linked examples may select a region or line range.

```
namespace WinSound;

internal static class Program
{
    /// <summary>
    ///  The main entry point for the application.
    /// </summary>
    [STAThread]
    static void Main()
    {
        // To customize application configuration such as set high DPI settings or default font,
        // see https://aka.ms/applicationconfiguration.
        ApplicationConfiguration.Initialize();
        Application.Run(new Form1());
    }
}
```
