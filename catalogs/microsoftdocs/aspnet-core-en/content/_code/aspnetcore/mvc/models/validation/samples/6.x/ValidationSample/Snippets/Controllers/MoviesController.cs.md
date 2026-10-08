# Source code: aspnetcore/mvc/models/validation/samples/6.x/ValidationSample/Snippets/Controllers/MoviesController.cs

Complete source file; linked examples may select a region or line range.

```
using Microsoft.AspNetCore.Mvc;
using ValidationSample.Data;
using ValidationSample.Models;

namespace ValidationSample.Snippets.Controllers;

public class MoviesController : Controller
{
    private readonly MovieContext _context;

    public MoviesController(MovieContext context)
        => _context = context;

    public IActionResult Index()
        => View();

    // <snippet_Create>
    public async Task<IActionResult> Create(Movie movie)
    {
        if (!ModelState.IsValid)
        {
            return View(movie);
        }

        _context.Movies.Add(movie);
        await _context.SaveChangesAsync();

        return RedirectToAction(nameof(Index));
    }
    // </snippet_Create>
}

```
