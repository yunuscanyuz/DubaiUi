using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using IpekisMesUi.Models;

namespace IpekisMesUi.Controllers;

public class ConsumedController : Controller
{
    public IActionResult Index()
    {
        return View();
    }

}
