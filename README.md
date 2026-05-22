
readme = """# DispatchHive

Simple dispatch management for small carriers and freight brokers.

## What It Does

- **Load Board**: Create, assign, and track loads from pickup to delivery
- **Driver Management**: Manage your fleet, assign drivers to loads
- **Real-time Status**: Know where every load stands (Pending → Assigned → Picked Up → In Transit → Delivered)
- **Dashboard**: See today's loads, overdue deliveries, and revenue at a glance
- **Multi-tenant**: Each company gets isolated data and users
- **Stripe Billing**: Subscribe to Starter ($99/mo), Pro ($199/mo), or Enterprise ($399/mo)

## Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Auth**: NextAuth.js (email/password)
- **Payments**: Stripe (subscriptions + webhooks)
- **Hosting**: DigitalOcean (Ubuntu + Nginx + PM2)

## Quick Start (Local Development)

```bash
# 1. Clone repo
git clone https://github.com/thehive2026/dispatchhive.git
cd dispatchhive

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your values

# 4. Set up database
npx prisma generate
npx prisma migrate dev

# 5. Run dev server
npm run dev
# Open http://localhost:3000
```

## Environment Variables

Create `.env` file:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/dispatchhive?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-key-here"

# Stripe (Test mode for development)
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRICE_STARTER="price_..."
STRIPE_PRICE_PRO="price_..."
STRIPE_PRICE_ENTERPRISE="price_..."

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Deployment (DigitalOcean)

### 1. Create Droplet
- Ubuntu 22.04 LTS
- 1GB RAM / 1 CPU / 25GB SSD ($6/mo)

### 2. Server Setup
```bash
ssh root@YOUR_DROPLET_IP

# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install PostgreSQL
apt install -y postgresql postgresql-contrib

# Install Nginx
apt install -y nginx

# Install PM2
npm install -g pm2

# Install Certbot (SSL)
apt install -y certbot python3-certbot-nginx
```

### 3. Database Setup
```bash
sudo -u postgres psql

CREATE DATABASE dispatchhive;
CREATE USER dhuser WITH PASSWORD 'your-strong-password';
GRANT ALL PRIVILEGES ON DATABASE dispatchhive TO dhuser;
\\q
```

### 4. Deploy App
```bash
mkdir /var/www/dispatchhive
cd /var/www/dispatchhive
git clone https://github.com/thehive2026/dispatchhive.git .

npm install
npm run build

npx prisma migrate deploy

pm2 start npm --name "dispatchhive" -- start
pm2 startup
pm2 save
```

### 5. Nginx + SSL
```bash
# Create Nginx config
cat > /etc/nginx/sites-available/dispatchhive << 'EOF'
server {
    listen 80;
    server_name dispatchhive.org www.dispatchhive.org;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# Enable site
ln -s /etc/nginx/sites-available/dispatchhive /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

# Get SSL certificate
certbot --nginx -d dispatchhive.org -d www.dispatchhive.org
```

### 6. Update DNS
Point `dispatchhive.org` A record to your droplet IP.

## Stripe Setup

1. Create account at [stripe.com](https://stripe.com)
2. Go to Developers → API keys → Copy test keys
3. Go to Products → Create 3 products:
   - Starter ($99/mo)
   - Pro ($199/mo)
   - Enterprise ($399/mo)
4. Copy price IDs to `.env`
5. For webhooks: Developers → Webhooks → Add endpoint:
   - URL: `https://dispatchhive.org/api/stripe/webhook`
   - Events: `checkout.session.completed`, `invoice.payment_succeeded`, `customer.subscription.deleted`

## Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm start            # Start production server
npm run db:generate  # Generate Prisma client
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio (database GUI)
```

## Pricing Plans

| Plan | Price | Features |
|------|-------|----------|
| **Starter** | $99/mo | 1 dispatcher, 5 drivers, basic reporting |
| **Pro** | $199/mo | 3 dispatchers, 20 drivers, advanced reporting, API access |
| **Enterprise** | $399/mo | Unlimited, white-label, priority support, custom onboarding |

All plans include 14-day free trial.

## Roadmap

- [x] MVP: Load board, driver management, dashboard
- [ ] Month 2: Shipper portal, SMS notifications
- [ ] Month 3: QuickBooks integration, route optimization
- [ ] Month 4: Driver mobile app, GPS tracking
- [ ] Month 5: White-label, API documentation
- [ ] Month 6: Enterprise features, dedicated support

## Support

For issues or questions, contact: support@dispatchhive.org

---

Built with ❤️ for small carriers who deserve better tools.
"""

print("=" * 60)
print("FILE: README.md")
print("=" * 60)
print(readme)

