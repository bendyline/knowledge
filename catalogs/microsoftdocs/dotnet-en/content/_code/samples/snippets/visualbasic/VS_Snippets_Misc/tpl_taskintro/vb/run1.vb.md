# Source code: samples/snippets/visualbasic/VS_Snippets_Misc/tpl_taskintro/vb/run1.vb

Complete source file; linked examples may select a region or line range.

```
' Visual Basic .NET Document
Option Strict On

' <Snippet2>
Imports System.Threading

Namespace Run
    Module Example
        Public Sub Main()
            Thread.CurrentThread.Name = "Main"

            Dim taskA As Task = Task.Run(Sub() Console.WriteLine("Hello from taskA."))

            ' Output a message from the calling thread.
            Console.WriteLine("Hello from thread '{0}'.",
                            Thread.CurrentThread.Name)
            taskA.Wait()
        End Sub
    End Module
    ' The example displays output like the following:
    '    Hello from thread 'Main'.
    '    Hello from taskA.
End Namespace
' </Snippet2>

```
