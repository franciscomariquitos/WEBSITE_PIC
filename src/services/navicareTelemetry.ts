import { createClient } from "@supabase/supabase-js";

const ONLINE_THRESHOLD_MS = 30_000;
const DEMO_VEST_ID = "demo-vest-01";
const DEMO_CENTER = {
  latitude: 38.736946,
  longitude: -9.138742,
};

export type NaviCareMode = "demo" | "supabase";

export type NaviCareTelemetry = {
  mode: NaviCareMode;
  vestId: string;
  displayName: string;
  latitude: number | null;
  longitude: number | null;
  bluetoothConnected: boolean;
  criticalState: boolean;
  heartRateBpm: number | null;
  lastSeenAt: string | null;
  fetchedAt: string;
  isOnline: boolean;
  isStale: boolean;
  hasLocation: boolean;
  sourceLabel: string;
};

export type NaviCareTelemetryResult = {
  telemetry: NaviCareTelemetry;
  notice: string | null;
  error: string | null;
};

type VestStatusRow = {
  vest_id?: unknown;
  display_name?: unknown;
  latitude?: unknown;
  longitude?: unknown;
  bluetooth_connected?: unknown;
  critical_state?: unknown;
  last_seen_at?: unknown;
  heart_rate_bpm?: unknown;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
const configuredVestId =
  import.meta.env.VITE_NAVICARE_VEST_ID?.trim() || DEMO_VEST_ID;

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      })
    : null;

export function getNaviCareVestId() {
  return configuredVestId;
}

export async function fetchNaviCareTelemetry(): Promise<NaviCareTelemetryResult> {
  if (!supabase) {
    return {
      telemetry: buildDemoTelemetry(),
      notice: "Demo telemetry is active because Supabase is not configured.",
      error: null,
    };
  }

  const fetchedAt = new Date();
  const { data, error } = await supabase
    .from("vest_status")
    .select(
      "vest_id,display_name,latitude,longitude,bluetooth_connected,critical_state,last_seen_at,heart_rate_bpm"
    )
    .eq("vest_id", configuredVestId)
    .maybeSingle<VestStatusRow>();

  if (error) {
    return {
      telemetry: buildUnavailableTelemetry(fetchedAt, error.message),
      notice: null,
      error: error.message,
    };
  }

  if (!data) {
    const message = `No vest_status row was found for ${configuredVestId}.`;
    return {
      telemetry: buildUnavailableTelemetry(fetchedAt, message),
      notice: null,
      error: message,
    };
  }

  return {
    telemetry: mapSupabaseRow(data, fetchedAt),
    notice: null,
    error: null,
  };
}

function mapSupabaseRow(row: VestStatusRow, fetchedAt: Date): NaviCareTelemetry {
  const lastSeenAt = toStringOrNull(row.last_seen_at);
  const latitude = toNumberOrNull(row.latitude);
  const longitude = toNumberOrNull(row.longitude);
  const bluetoothConnected = toBoolean(row.bluetooth_connected);
  const isStale = !isRecent(lastSeenAt, fetchedAt.getTime());

  return {
    mode: "supabase",
    vestId: toStringOrNull(row.vest_id) || configuredVestId,
    displayName: toStringOrNull(row.display_name) || "NaviSense Vest",
    latitude,
    longitude,
    bluetoothConnected,
    criticalState: toBoolean(row.critical_state),
    heartRateBpm: toNumberOrNull(row.heart_rate_bpm),
    lastSeenAt,
    fetchedAt: fetchedAt.toISOString(),
    isOnline: bluetoothConnected && !isStale,
    isStale,
    hasLocation: isValidCoordinate(latitude, longitude),
    sourceLabel: "Supabase live",
  };
}

function buildDemoTelemetry(now = new Date()): NaviCareTelemetry {
  const seconds = now.getTime() / 1000;
  const phase = Math.floor(seconds / 30) % 6;
  const bluetoothConnected = phase !== 4;
  const criticalState = phase === 2;
  const lastSeenDate = new Date(now.getTime() - (bluetoothConnected ? 4_000 : 74_000));
  const heartRateBpm = Math.round(
    criticalState ? 126 + Math.sin(seconds / 8) * 4 : 78 + Math.sin(seconds / 12) * 7
  );
  const latitude = DEMO_CENTER.latitude + Math.sin(seconds / 44) * 0.00046;
  const longitude = DEMO_CENTER.longitude + Math.cos(seconds / 39) * 0.00056;
  const isStale = !isRecent(lastSeenDate.toISOString(), now.getTime());

  return {
    mode: "demo",
    vestId: configuredVestId,
    displayName: "NaviSense Demo Vest",
    latitude,
    longitude,
    bluetoothConnected,
    criticalState,
    heartRateBpm,
    lastSeenAt: lastSeenDate.toISOString(),
    fetchedAt: now.toISOString(),
    isOnline: bluetoothConnected && !isStale,
    isStale,
    hasLocation: true,
    sourceLabel: "Demo telemetry",
  };
}

function buildUnavailableTelemetry(fetchedAt: Date, message: string): NaviCareTelemetry {
  return {
    mode: "supabase",
    vestId: configuredVestId,
    displayName: message,
    latitude: null,
    longitude: null,
    bluetoothConnected: false,
    criticalState: false,
    heartRateBpm: null,
    lastSeenAt: null,
    fetchedAt: fetchedAt.toISOString(),
    isOnline: false,
    isStale: true,
    hasLocation: false,
    sourceLabel: "Supabase live",
  };
}

function isRecent(value: string | null, nowMs: number) {
  if (!value) {
    return false;
  }

  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) {
    return false;
  }

  return nowMs - timestamp <= ONLINE_THRESHOLD_MS;
}

function isValidCoordinate(latitude: number | null, longitude: number | null) {
  return (
    typeof latitude === "number" &&
    typeof longitude === "number" &&
    Number.isFinite(latitude) &&
    Number.isFinite(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

function toNumberOrNull(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function toStringOrNull(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function toBoolean(value: unknown) {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value === 1;
  }

  if (typeof value === "string") {
    return ["true", "1", "yes", "online", "critical"].includes(
      value.trim().toLowerCase()
    );
  }

  return false;
}
