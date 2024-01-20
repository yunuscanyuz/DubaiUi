
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RestSharp;
using System.Net;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ErkurtUi.Controllers
{
    public class MethodsController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _apiUrl;

        public MethodsController(IConfiguration configuration)
        {
            _configuration = configuration;
            _apiUrl = _configuration["ApiUrl"];
        }
        public IActionResult Index()
        {
            return View();
        }
        //  string _apiUrl = "http://192.168.10.109:5274"; // canlı postresql
        //  string _apiUrl = "http://localhost:5274";
        //  string _apiUrl = "http://213.238.191.159:5274";


        [HttpPost]
        public async Task<String> GetLogin([FromBody] LoginRequest data)
        {
            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);
            var request = new RestRequest("/api/UserLogin/Authenticate", Method.Post);
            request.AddHeader("Content-Type", "application/json");
            var body = new
            {
                userName = data.username,
                userPassword = data.password
            };
            string jsonBody = JsonConvert.SerializeObject(body);

            request.AddStringBody(jsonBody, DataFormat.Json);
            RestResponse response = await client.ExecuteAsync(request);

            if (response.StatusCode == HttpStatusCode.OK)
            {
                var responseData = JsonConvert.DeserializeObject<DtoLogin>(response.Content);

                var userId = responseData.UserId;
                var token = responseData.token;
                var userNameSurname = responseData.NameSurname;
                var userGroup = responseData.userGroup;


                var cookieValue = (int)CookieVariable.userApiToken;
                var cookieuserId = (int)CookieVariable.userId;
                var cookieuserNameSurname = (int)CookieVariable.userNameSurname;
                var cookieuserGroup = (int)CookieVariable.userGroup;

                CookieOptions cookieOptions = new CookieOptions();
                cookieOptions.Expires = DateTime.Now.AddMinutes(3600000);


                Response.Cookies.Append(cookieuserId.ToString(), userId, cookieOptions);
                Response.Cookies.Append(cookieValue.ToString(), token, cookieOptions);
                Response.Cookies.Append(cookieuserGroup.ToString(), userGroup.ToString(), cookieOptions);

                Response.Cookies.Append(cookieuserNameSurname.ToString(), userNameSurname, cookieOptions);

                return response.Content;

            }
            else
            {
                return "Giriş başarısız";
            }
        }

        [HttpPost]
        public async Task<String> SendMailForForgetPassword(string email)
        {
            try
            {
                if (string.IsNullOrEmpty(email))
                    return "E-posta eksik veya geçersiz.";

                var options = new RestClientOptions(_apiUrl)
                {
                    MaxTimeout = -1,
                };
                var client = new RestClient(options);
                var request = new RestRequest($"/api/UserLogin/SendMailForForgetPassword?email={email}", Method.Post);
                request.AddHeader("Content-Type", "application/json");
                RestResponse response = await client.ExecuteAsync(request);

                if (response.StatusCode == HttpStatusCode.OK)
                    return response.Content;
                else
                    return "API isteği başarısız: " + response.Content;
            }
            catch (Exception ex)
            {
                return "API isteği sırasında bir hata oluştu: " + ex.Message;
            }
        }
        [HttpGet]

        public async Task<String> Get(string ControllerName)
        {
            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);


            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);
            var request = new RestRequest("/api/" + ControllerName + "/Get", Method.Get);
            request.AddHeader("Content-Type", "application/json");

            request.AddHeader("Authorization", $"Bearer {jwtToken}");

            RestResponse response = await client.ExecuteAsync(request);

            return response.Content;
        }


        [HttpGet]
        public async Task<String> GetView(string ControllerName)
        {
            string cookieName = "1";
            var httpContext = HttpContext;
            //httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);


            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);
            var request = new RestRequest("/api/Views/GetViewList?viewName=" + ControllerName, Method.Get);
            request.AddHeader("Content-Type", "application/json");

            //  request.AddHeader("Authorization", $"Bearer {jwtToken}");

            RestResponse response = await client.ExecuteAsync(request);

            return response.Content;
        }
        [HttpGet]
        public async Task<String> GetByAnalizorID(string analizorID)
        {
            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);

            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);
            //GetByAnalizorID(Guid analizorID)
            var request = new RestRequest("/api/AnalizorDetail/GetByAnalizorID?analizorID=" + analizorID, Method.Get);
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("Authorization", $"Bearer {jwtToken}");

            RestResponse response = await client.ExecuteAsync(request);
            return response.Content;
        }


        [HttpGet]
        public async Task<String> GetByInvoiceDetailID(string Id)
        {

            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);

            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);
            var request = new RestRequest("/api/InvoiceDetail/GetById?Id=" + Id, Method.Get);
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("Authorization", $"Bearer {jwtToken}");
            RestResponse response = await client.ExecuteAsync(request);
            return response.Content;
        }

        //GetByAnalizorID

        [HttpGet]
        public async Task<String> GetByID(string ControllerName, string Id)
        {

            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);
            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);

            var requestUri = "/api/" + ControllerName + "/GetById?Id=" + Id;
            var request = new RestRequest(requestUri, Method.Get);
            request.AddHeader("Content-Type", "application/json");
            //   request.AddHeader("Authorization", $"Bearer {jwtToken}");
            RestResponse response = await client.ExecuteAsync(request);
            return response.Content;
        }

        //GetByAnalizorID

        [HttpPost]
        [Route("[controller]/Insert")]
        public async Task<String> Insert([FromBody] MethodsRequest data)
        {
            data.body = data.body.ToString().Replace("ValueKind = Object : \"", "");
            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);



            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);
            var request = new RestRequest("/api/" + data.ControllerName + "/Insert", Method.Post);
            request.AddHeader("Content-Type", "application/json");
            //request.AddHeader("Authorization", $"Bearer {jwtToken}");
            var body = data;
            request.AddBody(data.body);
            RestResponse response = await client.ExecuteAsync(request);
            if (response.StatusCode == HttpStatusCode.Forbidden)
            {
                if (response.StatusCode == HttpStatusCode.Forbidden)
                {
                    return "You are not authorized to perform this action.";
                }
            }
            return response.Content;
        }




        [HttpPost]
        [Route("[controller]/GridLayoutSave")]
        public async Task<String> GridLayoutSave([FromBody] MethodsRequest data)
        {
            data.body = data.body.ToString().Replace("ValueKind = Object : \"", "");
            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);



            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);
            var request = new RestRequest("/api/" + data.ControllerName + "/CreateOrUpdate", Method.Post);
            request.AddHeader("Content-Type", "application/json");
            //request.AddHeader("Authorization", $"Bearer {jwtToken}");
            var body = data;
            request.AddBody(data.body);
            RestResponse response = await client.ExecuteAsync(request);
            if (response.StatusCode == HttpStatusCode.Forbidden)
            {
                if (response.StatusCode == HttpStatusCode.Forbidden)
                {
                    return "You are not authorized to perform this action.";
                }
            }
            return response.Content;
        }


        [HttpPost]
        [Route("[controller]/Update")]
        public async Task<String> Update([FromBody] MethodsRequest data)
        {
            data.body = data.body.ToString().Replace("ValueKind = Object : \"", "");


            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);
            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);
            var request = new RestRequest("/api/" + data.ControllerName + "/Update", Method.Post);
            request.AddHeader("Content-Type", "application/json");
            // request.AddHeader("Authorization", $"Bearer {jwtToken}");
            var body = data;
            request.AddBody(data.body);
            RestResponse response = await client.ExecuteAsync(request);
            if (response.StatusCode == HttpStatusCode.Forbidden)
            {
                if (response.StatusCode == HttpStatusCode.Forbidden)
                {
                    return "You are not authorized to perform this action.";
                }
            }
            return response.Content;
        }


        [HttpPost]
        [Route("[controller]/Copy")]
        public async Task<String> Copy([FromBody] MethodsRequest data)
        {
            data.body = data.body.ToString().Replace("ValueKind = Object : \"", "");


            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);
            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);
            var request = new RestRequest("/api/" + data.ControllerName + "/Copy", Method.Post);
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("Authorization", $"Bearer {jwtToken}");
            var body = data;
            request.AddBody(data.body);
            RestResponse response = await client.ExecuteAsync(request);
            if (response.StatusCode == HttpStatusCode.Forbidden)
            {
                if (response.StatusCode == HttpStatusCode.Forbidden)
                {
                    return "You are not authorized to perform this action.";
                }
            }
            return response.Content;
        }


        [HttpPost]
        [Route("[controller]/Delete")]
        public async Task<String> Delete([FromBody] MethodsRequest data)
        {
            data.body = data.body.ToString().Replace("ValueKind = String : \"", "");
            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);
            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);
            var request = new RestRequest("/api/" + data.ControllerName + "/Delete?Id=" + data.body, Method.Post);
            request.AddHeader("Content-Type", "application/json");
            // request.AddHeader("Authorization", $"Bearer {jwtToken}");

            request.AddStringBody(data.body.ToString(), DataFormat.Json);
            RestResponse response = await client.ExecuteAsync(request);
            if (response.StatusCode == HttpStatusCode.Forbidden)
            {
                if (response.StatusCode == HttpStatusCode.Forbidden)
                {
                    return "You are not authorized to perform this action.";
                }
            }
            return response.Content;
        }


        [HttpGet]
        public async Task<String> GetByForOPCSetting(string ControllerName, string codeType)
        {

            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);
            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);
            var request = new RestRequest("/api/" + ControllerName + "/GetByCodeType?codeType=17", Method.Get);
            request.AddHeader("Content-Type", "application/json");

            request.AddHeader("Authorization", $"Bearer {jwtToken}");
            RestResponse response = await client.ExecuteAsync(request);
            return response.Content;
        }



        [HttpGet]
        public async Task<String> GridLayoutGet(string UserID, string Name)
        {

            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);
            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);
            var request = new RestRequest("/api/GridDesigners/GetByUserIDAndName?UserID=" + UserID + "&Name=" + Name, Method.Get);
            request.AddHeader("Content-Type", "application/json");

            //    request.AddHeader("Authorization", $"Bearer {jwtToken}");
            RestResponse response = await client.ExecuteAsync(request);
            return response.Content;
        }

        [HttpPost]
        public async Task<String> GetByForDropDown([FromBody] MethodsRequest2 data)
        {
            data.body = data.body.ToString().Replace("ValueKind = Object : \"", "");
            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);
            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);

            var request = new RestRequest("/api/Views/GetViewListByWhereParameter", Method.Post);
            request.AddHeader("Content-Type", "application/json");
            //request.AddHeader("Authorization", $"Bearer {jwtToken}");  RestResponse response = await client.ExecuteAsync(request);
            var body = data.body;
            request.AddBody(data.body);
            RestResponse response = await client.ExecuteAsync(request);

            return response.Content;
        }

        [HttpGet]
        public async Task<String> RelationGetByForDropDown(string controllerName, string methodName, string parameterName, string parameterValue)
        {
            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);
            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);

            var request = new RestRequest("/api/" + controllerName + "/" + methodName + "?" + parameterName + "=" + parameterValue, Method.Get);
            request.AddHeader("Content-Type", "application/json");
            //  request.AddHeader("Authorization", $"Bearer {jwtToken}");
            RestResponse response = await client.ExecuteAsync(request);
            return response.Content;
        }


        [HttpPost]
        public async Task<String> GetByViewWhere([FromBody] MethodsRequest2 data)
        {
            data.body = data.body.ToString().Replace("ValueKind = Object : \"", "");
            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);
            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);

            var request = new RestRequest("/api/Views/GetViewListByWhereParameter", Method.Post);
            request.AddHeader("Content-Type", "application/json");
            //request.AddHeader("Authorization", $"Bearer {jwtToken}");  RestResponse response = await client.ExecuteAsync(request);
            var body = data.body;
            request.AddBody(data.body);
            RestResponse response = await client.ExecuteAsync(request);

            return response.Content;
        }


        //GetByIDCommandQuery

        [HttpGet]
        public async Task<String> GetByIDCommandQuery(string viewID)
        {

            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);
            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);

            var request = new RestRequest("/api/View/GetByIDCommandQuery?Id=" + viewID, Method.Get);
            request.AddHeader("Content-Type", "application/json");
            request.AddHeader("Authorization", $"Bearer {jwtToken}");
            RestResponse response = await client.ExecuteAsync(request);
            return response.Content;
        }


        [HttpGet]
        public async Task<String> DashboardGet(string ControllerName, string startDate, string finishDate)
        {
            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);


            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);
            var request = new RestRequest("/api/Dashboard/" + ControllerName + "?startDate=" + startDate + "&finishDate=" + finishDate, Method.Get);
            request.AddHeader("Content-Type", "application/json");

            request.AddHeader("Authorization", $"Bearer {jwtToken}");

            RestResponse response = await client.ExecuteAsync(request);

            return response.Content;
        }

        [HttpGet]
        public async Task<String> GetVT_PROD_RULOByProdIDAndOprNum(string ControllerName, string PRODID, int OPRNUM)
        {

            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);
            var options = new RestClientOptions(_apiUrl)
            {
                MaxTimeout = -1,
            };
            var client = new RestClient(options);

            var requestUri = "/api/" + ControllerName + "/GetByProdIDAndOprNum?PRODID=" + PRODID + "&OPRNUM=" + OPRNUM;
            var request = new RestRequest(requestUri, Method.Get);
            request.AddHeader("Content-Type", "application/json");
            //   request.AddHeader("Authorization", $"Bearer {jwtToken}");
            RestResponse response = await client.ExecuteAsync(request);
            return response.Content;
        }

        [HttpGet]
        public async Task<String> GetMethodDropdownFill(string? urlName, string controllerName, string methodName, string? parameters)
        {
            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);
            RestClientOptions options;

            if (String.IsNullOrEmpty(urlName))
            {
                options = new RestClientOptions(_apiUrl)
                {
                    MaxTimeout = -1
                };
            }
            else
            {
                options = new RestClientOptions(urlName)
                {
                    MaxTimeout = -1
                };
            }

            var client = new RestClient(options);

            var requestUri = "/api/" + controllerName + "/" + methodName + parameters;

            var request = new RestRequest(requestUri, Method.Get);
            request.AddHeader("Content-Type", "application/json");
            //   request.AddHeader("Authorization", $"Bearer {jwtToken}");
            RestResponse response = await client.ExecuteAsync(request);
            return response.Content;


        }

        [HttpGet]
        public async Task<String> DynamicGetMethod(string? urlName, string controllerName, string methodName, string? parameters)
        {
            string cookieName = "1";
            var httpContext = HttpContext;
            httpContext.Request.Cookies.TryGetValue(cookieName, out string jwtToken);
            RestClientOptions options;

            if (String.IsNullOrEmpty(urlName))
            {
                options = new RestClientOptions(_apiUrl)
                {
                    MaxTimeout = -1
                };
            }
            else
            {
                options = new RestClientOptions(urlName)
                {
                    MaxTimeout = -1
                };
            }

            var client = new RestClient(options);

            var requestUri = "/api/" + controllerName + "/" + methodName + parameters;

            var request = new RestRequest(requestUri, Method.Get);
            request.AddHeader("Content-Type", "application/json");
            //   request.AddHeader("Authorization", $"Bearer {jwtToken}");
            RestResponse response = await client.ExecuteAsync(request);
            return response.Content;


        }
    }





}

public class LoginRequest
{
    public string username { get; set; }
    public string password { get; set; }
}

public class DtoLogin
{
    public string UserName { get; set; }
    public string UserPassword { get; set; }
    public string? NameSurname { get; set; }
    public string? token { get; set; }
    public string? UserId { get; set; }
    public int? userGroup { get; set; }

}

public enum CookieVariable
{
    userId = 0,
    userApiToken = 1,
    userNameSurname = 2,
    userGroup = 3

}

public class MethodsRequest
{
    public String ControllerName { get; set; }
    public object body { get; set; }
}


public class MethodsRequest2
{

    public object body { get; set; }
}