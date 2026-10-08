# Source code: samples/snippets/fsharp/lang-ref-2/snippet8003.fs

Complete source file; linked examples may select a region or line range.

```
open System.Net
open Microsoft.FSharp.Control.WebExtensions
open System.Net.Http

let urlList = [ "Microsoft.com", "http://www.microsoft.com/"
                "MSDN", "http://msdn.microsoft.com/"
                "Bing", "http://www.bing.com"
              ]

let fetchAsync(name, url:string) =
    async {
        try
            let uri = new System.Uri(url)
            let httpClient = new HttpClient()
            let! html = httpClient.GetStringAsync(uri) |> Async.AwaitTask
            printfn "Read %d characters for %s" html.Length name
        with
            | ex -> printfn "%s" (ex.Message);
    }

let runAll() =
    urlList
    |> Seq.map fetchAsync
    |> Async.Parallel
    |> Async.RunSynchronously
    |> ignore

runAll()

```
