using Microsoft.AspNetCore.Mvc;

namespace ReactApp2.Server.Controllers;

[Route("View")]
[ApiExplorerSettings(IgnoreApi = true)]
public class ViewController : Controller
{
    

    //[HttpGet("TestView", Name = "TestView")]
    [Route("/View/TestView")]
    public async Task<IActionResult> TestView()
    {
        return View("~/Views/Shared/TestView.cshtml");
    }
}
