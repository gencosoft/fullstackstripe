﻿using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace PaymentSystem.Data.Entities
{
    public partial class StripeCustomer
    {
        public int Id { get; set; }
        public int LoginId { get; set; }
        public string StripeCustomerId { get; set; }
    }
}
