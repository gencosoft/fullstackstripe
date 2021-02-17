using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PaymentSystem.Api.Models;
using PaymentSystem.Data.Entities;
using PaymentSystem.Services.Authentication;
using PaymentSystem.Services.Payment;

namespace PaymentSystem.Api.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly JwtHandler _jwtHandler;
        private readonly PaymentContext _context; 
        private readonly StripeService _stripeService;


        public AccountController(JwtHandler jwtHandler, StripeService stripeService, PaymentContext context)
        {
            _jwtHandler = jwtHandler;
            _stripeService = stripeService;
            _context = context;
        }

        [HttpPost("external-login")]
        public async Task<IActionResult> ExternalLogin([FromBody] ExternalAuthDto externalAuth)
        {
            var payload = await _jwtHandler.VerifyGoogleToken(externalAuth.IdToken);
            if (payload == null)
                return BadRequest("Invalid External Authentication.");
            var info = new UserLoginInfo(externalAuth.Provider, payload.Subject, externalAuth.Provider);

            var user = _context.ExternalLogin
                .FirstOrDefault(x => x.Provider.Equals(info.LoginProvider) && x.ProviderId.Equals(info.ProviderKey));

            if (user == null)
            {
                user = new ExternalLogin
                {
                    Email = payload.Email,
                    Username = payload.Name,
                    Provider = info.LoginProvider,
                    ProviderId = info.ProviderKey
                };
                await _context.ExternalLogin.AddAsync(user);
                await _context.SaveChangesAsync();
            }

            var stripeCustomer = _context.StripeCustomer.FirstOrDefault(x => x.LoginId == user.Id);
            if (stripeCustomer == null)
            {
                var stripeCustomerId = _stripeService.CreateNewCustomer(user.Email);

                stripeCustomer = new StripeCustomer
                {
                    LoginId = user.Id,
                    StripeCustomerId = stripeCustomerId
                };
                await _context.StripeCustomer.AddAsync(stripeCustomer);
                await _context.SaveChangesAsync();
            }

            var claims = new ClaimsIdentity(new []
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.UserData, stripeCustomer.StripeCustomerId),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, "Viewer")
            });

            var token = await _jwtHandler.GenerateToken(claims);
            return Ok(new AuthResponseDto { Token = token, IsAuthSuccessful = true });
        }
    }
}
