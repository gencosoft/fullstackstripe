using Microsoft.AspNetCore.Mvc;

namespace PaymentSystem.Api.Controllers
{
    [Route("")]
    [ApiController]
    public class PingController : ControllerBase
    {

        [HttpGet]
        public ActionResult Ping()
        {
            return Ok("Api is up and running!");
        }
    }
}