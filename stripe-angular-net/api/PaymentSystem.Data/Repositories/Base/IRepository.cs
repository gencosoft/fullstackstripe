using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace PaymentSystem.Data.Repositories.Base
{
    public interface IRepository<T> : IDisposable
    {
        IEnumerable<T> Get(Expression<Func<T, bool>> where);
        IEnumerable<T> GetAll();
    }
}
