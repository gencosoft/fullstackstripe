using PaymentSystem.Data.Repositories.Base;
using PaymentSystem.Data.Entities;

namespace PaymentSystem.Data.Repositories
{
    public class ExternalLoginRepository : Repository<ExternalLogin>, IExternalLoginRepository
    {
        private PaymentContext _context => Context as PaymentContext;

        public ExternalLoginRepository(PaymentContext context) : base(context) { }
    }
}
