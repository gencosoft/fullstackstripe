﻿using Microsoft.AspNetCore.Identity;

namespace PaymentSystem.Api.Models
{
    public class User : IdentityUser
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}