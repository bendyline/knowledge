# Source code: samples/snippets/fsharp/contour/snippet36.fs

Complete source file; linked examples may select a region or line range.

```
let makeGame target =
    // Build a lambda expression that is the function that plays the game.
    let game = fun guess ->
                   if guess = target then
                      System.Console.WriteLine("You win!")
                   else
                      System.Console.WriteLine("Wrong. Try again.")
    // Now just return it.
    game
```
