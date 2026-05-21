import { createClient } from "@supabase/supabase-js";

const DEFAULT_ONLINE_THRESHOLD_SECONDS = 75;
const DEMO_VEST_ID = "demo-vest-01";
const DEFAULT_TRACKER_TABLE = "tracker_data";
const DEMO_CENTER = {
  latitude: 38.736946,
  longitude: -9.138742,
};

export type NaviCareMode = "demo" | "supabase";

export type NaviCareTelemetry = {
  mode: NaviCareMode;
  vestId: string;
  recordId: string | null;
  wearerName: string | null;
  rawStatus: string | null;
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

type TrackerDataRow = {
  id?: unknown;
  person_name?: unknown;
  status?: unknown;
  latitude?: unknown;
  longitude?: unknown;
  location_name?: unknown;
  updated_at?: unknown;
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();
const configuredTrackerTable =
  import.meta.env.VITE_NAVICARE_TRACKER_TABLE?.trim() || DEFAULT_TRACKER_TABLE;
const configuredTrackerId =
  import.meta.env.VITE_NAVICARE_TRACKER_ID?.trim() ||
  import.meta.env.VITE_NAVICARE_VEST_ID?.trim() ||
  null;
const onlineThresholdMs =
  getPositiveNumber(
    import.meta.env.VITE_NAVICARE_ONLINE_THRESHOLD_SECONDS,
    DEFAULT_ONLINE_THRESHOLD_SECONDS
  ) * 1000;

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
  return configuredTrackerId || DEMO_VEST_ID;
}

export async function fetchNaviCareTelemetry(): Promise<NaviCareTelemetryResult> {
  if (!supabase) {
    return {
      telemetry: buildDemoTelemetry(),
      notice: null,
      error: null,
    };
  }

  const fetchedAt = new Date();
  const query = supabase
    .from(configuredTrackerTable)
    .select("id,person_name,status,latitude,longitude,location_name,updated_at");
  const { data, error } = configuredTrackerId
    ? await query.eq("id", configuredTrackerId).maybeSingle<TrackerDataRow>()
    : await query
        .order("updated_at", { ascending: false })
        .limit(1)
        .maybeSingle<TrackerDataRow>();

  if (error) {
    return {
      telemetry: buildUnavailableTelemetry(fetchedAt, error.message),
      notice: null,
      error: error.message,
    };
  }

  if (!data) {
    const message = configuredTrackerId
      ? `No ${configuredTrackerTable} row was found for ${configuredTrackerId}.`
      : `No ${configuredTrackerTable} rows were found.`;
    return {
      telemetry: buildUnavailableTelemetry(fetchedAt, message),
      notice: null,
      error: message,
    };
  }

  return {
    telemetry: mapTrackerDataRow(data, fetchedAt),
    notice: null,
    error: null,
  };
}

function mapTrackerDataRow(row: TrackerDataRow, fetchedAt: Date): NaviCareTelemetry {
  const lastSeenAt = toStringOrNull(row.updated_at);
  const latitude = toNumberOrNull(row.latitude);
  const longitude = toNumberOrNull(row.longitude);
  const status = toStringOrNull(row.status);
  const isStale = !isRecent(lastSeenAt, fetchedAt.getTime());
  const criticalState = isCriticalStatus(status);
  const bluetoothConnected = !isOfflineStatus(status) && !isStale;

  return {
    mode: "supabase",
    vestId: getNaviCareVestId(),
    recordId: toStringOrNull(row.id),
    wearerName: toStringOrNull(row.person_name),
    rawStatus: status,
    displayName: "NaviSense Vest",
    latitude,
    longitude,
    bluetoothConnected,
    criticalState,
    heartRateBpm: null,
    lastSeenAt,
    fetchedAt: fetchedAt.toISOString(),
    isOnline: bluetoothConnected && !isStale,
    isStale,
    hasLocation: isValidCoordinate(latitude, longitude),
    sourceLabel: "Tracker data",
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
    vestId: getNaviCareVestId(),
    recordId: "demo-telemetry",
    wearerName: "Prototype wearer",
    rawStatus: criticalState ? "critical" : bluetoothConnected ? "healthy" : "offline",
    displayName: "NaviSense Vest",
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
    sourceLabel: "Tracker data",
  };
}

function buildUnavailableTelemetry(fetchedAt: Date, message: string): NaviCareTelemetry {
  return {
    mode: "supabase",
    vestId: getNaviCareVestId(),
    recordId: null,
    wearerName: null,
    rawStatus: null,
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
    sourceLabel: "Tracker data",
  };
}

function isCriticalStatus(value: string | null) {
  if (!value) {
    return false;
  }

  const status = normalizeStatus(value);
  return (
    status.includes("critical") ||
    status.includes("emergency") ||
    status.includes("danger") ||
    status.includes("sos") ||
    status.includes("alert")
  );
}

function isOfflineStatus(value: string | null) {
  if (!value) {
    return false;
  }

  const status = normalizeStatus(value);
  return (
    status.includes("offline") ||
    status.includes("disconnected") ||
    status.includes("inactive") ||
    status.includes("lost")
  );
}

function isRecent(value: string | null, nowMs: number) {
  if (!value) {
    return false;
  }

  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) {
    return false;
  }

  return nowMs - timestamp <= onlineThresholdMs;
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

function normalizeStatus(value: string) {
  return value.trim().toLowerCase().replaceAll(/[\s-]+/g, "_");
}

function getPositiveNumber(value: unknown, fallback: number) {
  if (typeof value !== "string" || !value.trim()) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
