using System.Net;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews().AddRazorRuntimeCompilation();

// var hostName = Dns.GetHostName();
// var hostEntry = Dns.GetHostEntry(hostName);
// var ipAddress = hostEntry.AddressList.FirstOrDefault(ip => ip.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork && ip.ToString() != "127.0.0.1");
// Console.WriteLine("Çalısan IP Adresi : " + ipAddress.ToString());
// if (ipAddress != null)
// {
//     var ipString = ipAddress.ToString();
//     builder.WebHost.UseUrls($"http://{ipString}:7016");
// }




//builder.WebHost.UseUrls("http://192.168.1.50:7016");
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
