import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Bluetooth,
  CheckCircle2,
  Clock3,
  Database,
  HeartPulse,
  HelpCircle,
  Loader2,
  LockKeyhole,
  LogOut,
  MapPin,
  UserRound,
  RefreshCcw,
  ShieldAlert,
  ShieldCheck,
  Wifi,
  WifiOff,
  type LucideIcon,
} from "lucide-react";
import {
  fetchNaviCareTelemetry,
  type NaviCareTelemetry,
} from "../services/navicareTelemetry";
import "./NaviCareDashboard.css";

type NaviCareDashboardProps = {
  onClose: () => void;
};

type StatusTone = "online" | "offline" | "stale" | "critical" | "demo" | "neutral";

const DEMO_USERNAME = "navicare.monitor";
const DEMO_PASSWORD = "NaviCare2026";
const POLL_INTERVAL_MS = 5_000;
const MIN_REFRESH_INDICATOR_MS = 650;
const DEFAULT_MAP_CENTER: [number, number] = [38.736946, -9.138742];

export function NaviCareDashboard({ onClose }: NaviCareDashboardProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [telemetry, setTelemetry] = useState<NaviCareTelemetry | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const mountedRef = useRef(true);

  const refreshTelemetry = useCallback(async () => {
    const refreshStartedAt = performance.now();
    setRefreshing(true);

    try {
      const result = await fetchNaviCareTelemetry();
      if (!mountedRef.current) {
        return;
      }

      setTelemetry(result.telemetry);
      setNotice(result.notice);
      setError(result.error);
      setLoading(false);
    } catch (caughtError) {
      if (!mountedRef.current) {
        return;
      }

      setError(getErrorMessage(caughtError));
      setLoading(false);
    } finally {
      const remainingIndicatorTime =
        MIN_REFRESH_INDICATOR_MS - (performance.now() - refreshStartedAt);

      if (remainingIndicatorTime > 0) {
        await new Promise((resolve) => window.setTimeout(resolve, remainingIndicatorTime));
      }

      if (mountedRef.current) {
        setRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!authenticated) {
      return undefined;
    }

    setLoading(true);
    void refreshTelemetry();
    const intervalId = window.setInterval(() => {
      void refreshTelemetry();
    }, POLL_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [authenticated, refreshTelemetry]);

  const statusTone = getStatusTone(telemetry);
  const statusText = getStatusText(telemetry, loading);
  const lastUpdate = telemetry ? formatDateTime(telemetry.fetchedAt) : "Waiting for telemetry";

  const handleAuthenticated = useCallback(() => {
    setAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    setAuthenticated(false);
    setTelemetry(null);
    setNotice(null);
    setError(null);
    setLoading(true);
  }, []);

  return (
    <section className="navicare-shell" aria-label="NaviCare monitoring dashboard">
      {authenticated ? (
        <DashboardView
          error={error}
          lastUpdate={lastUpdate}
          loading={loading}
          notice={notice}
          onClose={onClose}
          onLogout={handleLogout}
          onRefresh={refreshTelemetry}
          refreshing={refreshing}
          statusText={statusText}
          statusTone={statusTone}
          telemetry={telemetry}
        />
      ) : (
        <LoginView onAuthenticated={handleAuthenticated} onClose={onClose} />
      )}
    </section>
  );
}

function LoginView({
  onAuthenticated,
  onClose,
}: {
  onAuthenticated: () => void;
  onClose: () => void;
}) {
  const [monitorId, setMonitorId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (monitorId.trim() === DEMO_USERNAME && accessCode === DEMO_PASSWORD) {
      setError(null);
      onAuthenticated();
      return;
    }

    setError("Invalid access details.");
  };

  return (
    <div className="navicare-login-screen">
      <button className="navicare-icon-button navicare-login-back" type="button" onClick={onClose}>
        <ArrowLeft size={19} aria-hidden="true" />
        <span>Back</span>
      </button>

      <form className="navicare-login-card" autoComplete="off" onSubmit={handleSubmit}>
        <div className="navicare-credential-help">
          <button
            aria-label="Show prototype access details"
            className="navicare-credential-help-button"
            type="button"
          >
            <HelpCircle size={17} aria-hidden="true" />
          </button>
          <div className="navicare-credential-popover" role="tooltip">
            <span>Prototype access</span>
            <strong>Monitor ID</strong>
            <code>{DEMO_USERNAME}</code>
            <strong>Access code</strong>
            <code>{DEMO_PASSWORD}</code>
          </div>
        </div>

        <div className="navicare-login-mark" aria-hidden="true">
          <LockKeyhole size={26} />
        </div>
        <div>
          <p className="navicare-kicker">NaviCare</p>
          <h1>Monitoring access</h1>
          <p className="navicare-login-copy">
            Access the shared vest monitoring node.
          </p>
        </div>

        <label className="navicare-field">
          <span>Monitor ID</span>
          <input
            autoComplete="off"
            name="navicare-monitor-id"
            onChange={(event) => setMonitorId(event.target.value)}
            type="text"
            value={monitorId}
          />
        </label>

        <label className="navicare-field">
          <span>Access code</span>
          <input
            autoComplete="off"
            className="navicare-access-code-input"
            name="navicare-access-code"
            onChange={(event) => setAccessCode(event.target.value)}
            spellCheck={false}
            type="text"
            value={accessCode}
          />
        </label>

        {error ? (
          <div className="navicare-form-error" role="alert">
            {error}
          </div>
        ) : null}

        <button className="navicare-primary-button" type="submit">
          Open NaviCare
        </button>
      </form>
    </div>
  );
}

function DashboardView({
  error,
  lastUpdate,
  loading,
  notice,
  onClose,
  onLogout,
  onRefresh,
  refreshing,
  statusText,
  statusTone,
  telemetry,
}: {
  error: string | null;
  lastUpdate: string;
  loading: boolean;
  notice: string | null;
  onClose: () => void;
  onLogout: () => void;
  onRefresh: () => void;
  refreshing: boolean;
  statusText: string;
  statusTone: StatusTone;
  telemetry: NaviCareTelemetry | null;
}) {
  return (
    <div className="navicare-dashboard">
      <header className="navicare-topbar">
        <div className="navicare-title-group">
          <button className="navicare-icon-button" type="button" onClick={onClose}>
            <ArrowLeft size={19} aria-hidden="true" />
            <span>Website</span>
          </button>
          <div>
            <p className="navicare-kicker">NaviCare</p>
            <h1>Vest monitor</h1>
          </div>
        </div>

        <div className="navicare-topbar-actions">
          <StatusBadge text={statusText} tone={statusTone} />
          <button
            className="navicare-icon-button"
            disabled={refreshing}
            onClick={onRefresh}
            type="button"
          >
            <RefreshCcw
              className={refreshing ? "navicare-spin" : undefined}
              size={18}
              aria-hidden="true"
            />
            <span>Refresh</span>
          </button>
          <button className="navicare-icon-button" type="button" onClick={onLogout}>
            <LogOut size={18} aria-hidden="true" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="navicare-main">
        <MapPanel telemetry={telemetry} />

        <aside className="navicare-side-panel" aria-label="Vest status">
          <div className="navicare-panel-heading">
            <div>
              <p className="navicare-kicker">Selected vest</p>
              <h2>{telemetry?.displayName || "Loading vest"}</h2>
            </div>
            <span className="navicare-source">
              <Database size={15} aria-hidden="true" />
              {telemetry?.sourceLabel || "Telemetry"}
            </span>
          </div>

          {notice ? (
            <InfoBanner tone="demo" icon={<Activity size={18} aria-hidden="true" />}>
              {notice}
            </InfoBanner>
          ) : null}

          {error ? (
            <InfoBanner tone="critical" icon={<AlertTriangle size={18} aria-hidden="true" />}>
              {error}
            </InfoBanner>
          ) : null}

          {loading && !telemetry ? (
            <div className="navicare-loading">
              <Loader2 className="navicare-spin" size={22} aria-hidden="true" />
              Loading telemetry
            </div>
          ) : null}

          <div className="navicare-stats">
            <StatusRow
              icon={telemetry?.isOnline ? Wifi : WifiOff}
              label="Vest status"
              meta={getOnlineMeta(telemetry)}
              tone={statusTone}
              value={statusText}
            />
            <StatusRow
              icon={Bluetooth}
              label="Bluetooth/app link"
              meta={telemetry?.isStale ? "Last signal is stale" : "Timestamp validated"}
              tone={telemetry?.bluetoothConnected ? "online" : "offline"}
              value={telemetry?.bluetoothConnected ? "Connected" : "Disconnected"}
            />
            <StatusRow
              icon={telemetry?.criticalState ? ShieldAlert : ShieldCheck}
              label="Emergency state"
              meta={telemetry?.criticalState ? "Immediate attention required" : "No critical flag"}
              tone={telemetry?.criticalState ? "critical" : "online"}
              value={telemetry?.criticalState ? "Critical" : "Stable"}
            />
            <StatusRow
              icon={Clock3}
              label="Last seen"
              meta={telemetry?.lastSeenAt ? formatRelativeTime(telemetry.lastSeenAt) : "No signal yet"}
              tone={telemetry?.isStale ? "stale" : "neutral"}
              value={telemetry?.lastSeenAt ? formatDateTime(telemetry.lastSeenAt) : "Unavailable"}
            />
            <StatusRow
              icon={MapPin}
              label="Coordinates"
              meta={telemetry?.hasLocation ? "Map marker active" : "Waiting for GPS fix"}
              tone={telemetry?.hasLocation ? "online" : "stale"}
              value={formatCoordinates(telemetry)}
            />
            <StatusRow
              icon={UserRound}
              label="Last wearer"
              meta={telemetry?.rawStatus ? `Tracker status: ${telemetry.rawStatus}` : "Latest tracker record"}
              tone="neutral"
              value={telemetry?.wearerName || "Unavailable"}
            />
            {telemetry?.mode === "demo" && telemetry.heartRateBpm !== null ? (
              <StatusRow
                icon={HeartPulse}
                label="Heart rate"
                meta="Current biometric reading"
                tone={telemetry.criticalState ? "critical" : "demo"}
                value={`${telemetry.heartRateBpm} bpm`}
              />
            ) : null}
          </div>

          <div className="navicare-footnote">
            <span>Vest</span>
            <strong>{telemetry?.displayName || "NaviSense Vest"}</strong>
          </div>
          <div className="navicare-footnote">
            <span>Record ID</span>
            <strong>{telemetry?.recordId || "Unavailable"}</strong>
          </div>
          <div className="navicare-footnote">
            <span>Last update</span>
            <strong>{lastUpdate}</strong>
          </div>
        </aside>
      </main>
    </div>
  );
}

function MapPanel({ telemetry }: { telemetry: NaviCareTelemetry | null }) {
  const mapElementRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const hasLocation = Boolean(telemetry?.hasLocation && telemetry.latitude !== null && telemetry.longitude !== null);

  useEffect(() => {
    if (!mapElementRef.current || mapRef.current) {
      return undefined;
    }

    const mapElement = mapElementRef.current;
    const map = L.map(mapElement, {
      zoomControl: true,
      attributionControl: true,
    }).setView(DEFAULT_MAP_CENTER, 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    mapRef.current = map;
    const resizeTimer = window.setTimeout(() => map.invalidateSize(), 160);
    let resizeFrame = 0;
    const queueMapResize = () => {
      if (resizeFrame) {
        window.cancelAnimationFrame(resizeFrame);
      }

      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = 0;
        map.invalidateSize();
      });
    };
    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(queueMapResize);

    resizeObserver?.observe(mapElement);
    window.addEventListener("resize", queueMapResize);

    return () => {
      window.clearTimeout(resizeTimer);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", queueMapResize);
      if (resizeFrame) {
        window.cancelAnimationFrame(resizeFrame);
      }
      map.remove();
      mapRef.current = null;
      markerRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) {
      return;
    }

    if (!hasLocation || telemetry?.latitude === null || telemetry?.longitude === null) {
      if (markerRef.current) {
        markerRef.current.remove();
        markerRef.current = null;
      }
      map.setView(DEFAULT_MAP_CENTER, 14);
      return;
    }

    const nextPosition: [number, number] = [telemetry.latitude, telemetry.longitude];
    const markerIcon = createVestMarkerIcon(telemetry);

    if (!markerRef.current) {
      markerRef.current = L.marker(nextPosition, {
        icon: markerIcon,
        keyboard: false,
        title: "NaviCare vest location",
      }).addTo(map);
      markerRef.current.bindTooltip("NaviCare vest", {
        direction: "top",
        opacity: 0.9,
      });
    } else {
      markerRef.current.setLatLng(nextPosition);
      markerRef.current.setIcon(markerIcon);
    }

    map.setView(nextPosition, Math.max(map.getZoom(), 15), {
      animate: true,
    });
  }, [hasLocation, telemetry]);

  const overlayText = useMemo(() => {
    if (!telemetry) {
      return "Waiting for telemetry";
    }

    if (!telemetry.hasLocation) {
      return "No GPS coordinates available";
    }

    return telemetry.criticalState ? "Critical location lock" : "Live location lock";
  }, [telemetry]);

  return (
    <section className="navicare-map-panel" aria-label="Live vest map">
      <div className="navicare-map-meta">
        <span className={`navicare-map-dot navicare-map-dot--${getStatusTone(telemetry)}`} />
        {overlayText}
      </div>
      <div ref={mapElementRef} className="navicare-map" />
    </section>
  );
}

function StatusBadge({ text, tone }: { text: string; tone: StatusTone }) {
  return <span className={`navicare-status-badge navicare-status-badge--${tone}`}>{text}</span>;
}

function StatusRow({
  icon: Icon,
  label,
  meta,
  tone,
  value,
}: {
  icon: LucideIcon;
  label: string;
  meta: string;
  tone: StatusTone;
  value: string;
}) {
  return (
    <div className={`navicare-stat navicare-stat--${tone}`}>
      <div className="navicare-stat-icon">
        <Icon size={20} aria-hidden="true" />
      </div>
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{meta}</small>
      </div>
    </div>
  );
}

function InfoBanner({
  children,
  icon,
  tone,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  tone: "critical" | "demo";
}) {
  return (
    <div className={`navicare-info-banner navicare-info-banner--${tone}`}>
      {icon}
      <span>{children}</span>
    </div>
  );
}

function createVestMarkerIcon(telemetry: NaviCareTelemetry) {
  const tone = getStatusTone(telemetry);

  return L.divIcon({
    className: "",
    html: `<span class="navicare-vest-marker navicare-vest-marker--${tone}" aria-hidden="true"><span></span></span>`,
    iconAnchor: [18, 18],
    iconSize: [36, 36],
    popupAnchor: [0, -18],
  });
}

function getStatusTone(telemetry: NaviCareTelemetry | null): StatusTone {
  if (!telemetry) {
    return "neutral";
  }

  if (telemetry.criticalState && telemetry.isOnline) {
    return "critical";
  }

  if (telemetry.isOnline) {
    return telemetry.mode === "demo" ? "demo" : "online";
  }

  if (telemetry.isStale) {
    return "stale";
  }

  return "offline";
}

function getStatusText(telemetry: NaviCareTelemetry | null, loading = false) {
  if (loading && !telemetry) {
    return "Loading";
  }

  if (!telemetry) {
    return "Unavailable";
  }

  if (telemetry.criticalState && telemetry.isOnline) {
    return "Critical";
  }

  if (telemetry.isOnline) {
    return "Online";
  }

  if (telemetry.bluetoothConnected && telemetry.isStale) {
    return "Stale";
  }

  return "Offline";
}

function getOnlineMeta(telemetry: NaviCareTelemetry | null) {
  if (!telemetry) {
    return "Waiting for first read";
  }

  if (telemetry.criticalState && telemetry.isOnline) {
    return "Emergency flag is active";
  }

  if (telemetry.isOnline) {
    return "Bluetooth and timestamp valid";
  }

  if (telemetry.isStale) {
    return "No recent app signal";
  }

  return "Bluetooth flag is off";
}

function formatCoordinates(telemetry: NaviCareTelemetry | null) {
  if (!telemetry?.hasLocation || telemetry.latitude === null || telemetry.longitude === null) {
    return "Unavailable";
  }

  return `${telemetry.latitude.toFixed(5)}, ${telemetry.longitude.toFixed(5)}`;
}

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unavailable";
  }

  return new Intl.DateTimeFormat(undefined, {
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    second: "2-digit",
  }).format(date);
}

function formatRelativeTime(value: string) {
  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) {
    return "Unknown signal age";
  }

  const seconds = Math.max(0, Math.round((Date.now() - timestamp) / 1000));
  if (seconds < 60) {
    return `${seconds}s ago`;
  }

  const minutes = Math.round(seconds / 60);
  return `${minutes}m ago`;
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Unable to load NaviCare telemetry.";
}
