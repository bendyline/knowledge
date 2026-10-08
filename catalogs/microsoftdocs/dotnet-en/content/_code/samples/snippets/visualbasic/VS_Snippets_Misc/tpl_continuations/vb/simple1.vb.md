# Source code: samples/snippets/visualbasic/VS_Snippets_Misc/tpl_continuations/vb/simple1.vb

Complete source file; linked examples may select a region or line range.

```
' <Snippet1>
Imports System.Threading.Tasks

Module Example
    Public Sub Main()
        ' Execute the antecedent.
        Dim taskA As Task(Of DayOfWeek) = Task.Run(Function() DateTime.Today.DayOfWeek)

        ' Execute the continuation when the antecedent finishes.
        Dim continuation As Task = taskA.ContinueWith(Sub(antecedent)
                                                          Console.WriteLine("Today is {0}.", antecedent.Result)
                                                      End Sub)
        continuation.Wait()
    End Sub
End Module
' The example displays output like the following output:
'       Today is Monday.
' </Snippet1>


```
