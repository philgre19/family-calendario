// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qjsdqgythqtditvmrtge.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqc2RxZ3l0aHF0ZGl0dm1ydGdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0MTc2NDUsImV4cCI6MjA1NDk5MzY0NX0.j32SkwtU41pgFMbtiqnEkCy-KLn4ELFhlP5gMF5bmcA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);