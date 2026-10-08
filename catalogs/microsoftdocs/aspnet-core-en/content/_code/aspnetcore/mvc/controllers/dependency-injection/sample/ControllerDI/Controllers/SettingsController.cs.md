# Source code: aspnetcore/mvc/controllers/dependency-injection/sample/ControllerDI/Controllers/SettingsController.cs

Complete source file; linked examples may select a region or line range.

```
using ControllerDI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace ControllerDI.Controllers
{
    #region snippet
    public class SettingsController : Controller
    {
        private readonly SampleWebSettings _settings;

        public SettingsController(IOptions<SampleWebSettings> settingsOptions)
        {
            _settings = settingsOptions.Value;
        }

        public IActionResult Index()
        {
            ViewData["Title"] = _settings.Title;
            ViewData["Updates"] = _settings.Updates;
            return View();
        }
    }
    #endregion
}
```
