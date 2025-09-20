using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;

namespace ReactApp2.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class WeatherForecastController : Controller
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")]
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }

    [HttpGet("TestView", Name = "TestView")]
    //[Route("WeatherForecast/TestView")]
    public async Task<string> TestView()
    {
        try
        {
            var viewName = "~/Views/Shared/TestView.cshtml";

            var serviceProvider = HttpContext.RequestServices;
            var actionContext = ControllerContext;

            var viewEngine = serviceProvider.GetRequiredService<IRazorViewEngine>();
            var viewResult = viewEngine.GetView("", viewName, isMainPage: false);            

            if (!viewResult.Success)
            {
                throw new InvalidOperationException($"Could not find view '{viewName}'");
            }

            var viewData = new ViewDataDictionary(new EmptyModelMetadataProvider(), actionContext.ModelState)
            {
                //Model = model
            };

            using (var sw = new StringWriter())
            {
                var viewContext = new ViewContext(
                    actionContext,
                    viewResult.View,
                    viewData,
                    new TempDataDictionary(actionContext.HttpContext, serviceProvider.GetRequiredService<ITempDataProvider>()),
                    sw,
                    new HtmlHelperOptions()
                );

                await viewResult.View.RenderAsync(viewContext);
                return sw.ToString();
            }
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    [ApiExplorerSettings(IgnoreApi = true)]
    [Route("/WeatherForecast/TestPartialView")]
    public async Task<IActionResult> Test()
    {
        return PartialView("~/Views/Shared/TestPartialView.cshtml");
    }
}