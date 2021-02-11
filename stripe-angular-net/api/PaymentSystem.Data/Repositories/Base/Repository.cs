using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace PaymentSystem.Data.Repositories.Base
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected DbContext Context;

        public Repository(DbContext context)
        {
            Context = context;
        }

        public IEnumerable<T> Get(System.Linq.Expressions.Expression<Func<T, bool>> where)
        {
            return Context.Set<T>().Where(where);
        }

        public void Dispose()
        {
            Context.Dispose();
        }

        public IEnumerable<T> GetAll()
        {
            return Context.Set<T>();
        }
    }
}
