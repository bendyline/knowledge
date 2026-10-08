# Source code: docs/csharp/fundamentals/exceptions/snippets/exceptions/ProgramLog.cs

Complete source file; linked examples may select a region or line range.

```
using System;
using System.IO;

namespace Exceptions
{
    // <ProgramLog>
    public class ProgramLog
    {
        FileStream logFile = null!;
        public void OpenLog(FileInfo fileName, FileMode mode) { }

        public void WriteLog()
        {
            if (!logFile.CanWrite)
            {
                throw new InvalidOperationException("Logfile cannot be read-only");
            }
            // Else write data to the log and return.
        }
    }
    // </ProgramLog>
}

```
