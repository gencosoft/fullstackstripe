using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace PaymentSystem.Data.Entities
{
    public partial class PaymentContext : DbContext
    {
        public PaymentContext()
        {
        }

        public PaymentContext(DbContextOptions<PaymentContext> options)
            : base(options)
        {
        }

        public virtual DbSet<ExternalLogin> ExternalLogin { get; set; }
        public virtual DbSet<StripeCustomer> StripeCustomer { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var envName = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json", optional: false)
                .AddJsonFile($"appsettings.{envName}.json", optional: false)
                .Build();

            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("PaymentContext"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ExternalLogin>(entity =>
            {
                entity.Property(e => e.Provider)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(e => e.ProviderId).IsRequired();

                entity.Property(e => e.Username).HasMaxLength(200);
            });

            modelBuilder.Entity<StripeCustomer>(entity =>
            {
                entity.Property(e => e.StripeCustomerId)
                    .IsRequired()
                    .HasMaxLength(250);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
