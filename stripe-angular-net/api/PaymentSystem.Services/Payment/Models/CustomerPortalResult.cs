namespace PaymentSystem.Services.Payment.Models
{
    public class CustomerPortalResult
    {
        public bool Success { get; set; }
        public string ErrorMessage { get; set; }
        public string Url { get; set; }
    }
}
