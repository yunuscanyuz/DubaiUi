using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using IpekisMesUi.Models;

namespace IpekisMesUi.Controllers;
public class LoginController : Controller
{
    public IActionResult Index()
    {

        return View();
    }
    public IActionResult ForgetPasswordMail()
    {
        return View("ForgetPasswordMail");
    }
    public IActionResult ForgetPassword()
    {
        return View();
    }
}