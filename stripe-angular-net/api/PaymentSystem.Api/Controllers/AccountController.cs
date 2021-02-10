using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PaymentSystem.Api.Models;
using PaymentSystem.Services.Authentication;

namespace PaymentSystem.Api.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : Controller
    {
        private readonly JwtHandler _jwtHandler;

        public AccountController(JwtHandler jwtHandler)
        {
            _jwtHandler = jwtHandler;
        }

        [HttpPost("external-login")]
        public async Task<IActionResult> ExternalLogin([FromBody] ExternalAuthDto externalAuth)
        {
            var payload = await _jwtHandler.VerifyGoogleToken(externalAuth.IdToken);
            if (payload == null)
                return BadRequest("Invalid External Authentication.");
            var info = new UserLoginInfo(externalAuth.Provider, payload.Subject, externalAuth.Provider);

            var user = new User { Id = 123, Email = payload.Email, UserName = payload.Name};
            //var user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);
            //if (user == null)
            //{
            //    user = await _userManager.FindByEmailAsync(payload.Email);
            //    if (user == null)
            //    {
            //        user = new User { Email = payload.Email, UserName = payload.Email };
            //        await _userManager.CreateAsync(user);
            //        //prepare and send an email for the email confirmation
            //        await _userManager.AddToRoleAsync(user, "Viewer");
            //        await _userManager.AddLoginAsync(user, info);
            //    }
            //    else
            //    {
            //        await _userManager.AddLoginAsync(user, info);
            //    }
            //}
            var claims = new ClaimsIdentity(new []
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.UserData, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, "Viewer")
            });

            var token = await _jwtHandler.GenerateToken(claims);
            return Ok(new AuthResponseDto { Token = token, IsAuthSuccessful = true });
        }
    }
}
