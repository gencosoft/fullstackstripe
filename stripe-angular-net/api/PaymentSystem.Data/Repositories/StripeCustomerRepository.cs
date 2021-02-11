using PaymentSystem.Data.Entities;
using PaymentSystem.Data.Repositories.Base;

namespace PaymentSystem.Data.Repositories
{
    public class StripeCustomerRepository : Repository<StripeCustomer>, IStripeCustomerRepository
    {
        private PaymentContext _context => Context as PaymentContext;

        public StripeCustomerRepository(PaymentContext context) : base(context) { }
    }
}
