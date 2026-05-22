
# Generate types/next-auth.d.ts - TypeScript declarations for NextAuth

next_auth_types = """import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      tenantId?: string | null;
      role?: string | null;
    };
  }

  interface User {
    tenantId?: string | null;
    role?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    tenantId?: string | null;
    role?: string | null;
  }
}
"""

print("=" * 60)
print("FILE 40: types/next-auth.d.ts")
print("=" * 60)
print(next_auth_types)
