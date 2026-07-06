import { useEffect, useState } from "react";

// Returns true only after the component has mounted on the client. Used to
// guard against hydration mismatches when reading persisted (client-only) state.
export function useHasMounted(): boolean {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => setHasMounted(true), []);
  return hasMounted;
}
