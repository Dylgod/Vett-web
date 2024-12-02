import type { Database } from '$lib/types/supabase';
import type { Session, SupabaseClient, User } from '@supabase/supabase-js'

declare module '*.md' {
	import type { SvelteComponent } from 'svelte'

	export default class Comp extends SvelteComponent{}

	export const metadata: Record<string, unknown>
}

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      supabase: SupabaseClient<Database>
      safeGetSession: () => Promise<{ session: Session | null; user: User | null }>
      session: Session | null
      user: User | null
    }
    interface PageData {
      session: Session | null
    }
    // interface PageState {}
    // interface Platform {}
  }
}

declare global {
  interface Window {
    Cal?: {
      (method: string, options: any): void;
    };
  }
}

export {}