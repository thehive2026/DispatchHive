
# Generate components/providers.tsx - Session Provider Wrapper

providers_tsx = """"use client";

import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
"""

print("=" * 60)
print("FILE 19: components/providers.tsx")
print("=" * 60)
print(providers_tsx)

