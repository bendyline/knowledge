# Source code: samples/snippets/fsharp/lang-ref-2/snippet3605.fs

Complete source file; linked examples may select a region or line range.

```
open System.Collections.Generic

type MyClassWithCLIEvent() =

    let event1 = new Event<string>()

    [<CLIEvent>]
    member this.Event1 = event1.Publish

    member this.TestEvent(arg) =
        event1.Trigger(arg)

let classWithEvent = new MyClassWithCLIEvent()
classWithEvent.Event1.Add(fun arg ->
        printfn "Event1 occurred! Object data: %s" arg)

classWithEvent.TestEvent("Hello World!")

System.Console.ReadLine() |> ignore

```
