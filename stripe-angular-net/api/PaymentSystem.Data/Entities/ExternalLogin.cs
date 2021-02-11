using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace PaymentSystem.Data.Entities
{
    public partial class ExternalLogin
    {
        public int Id { get; set; }
        public string Provider { get; set; }
        public string ProviderId { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
    }
}
