import {
  Component,
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ErrorInfo,
  type ReactNode,
} from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const SolarParticleScene = lazy(() => import('./solar/SolarParticleScene'));

interface Quality {
  /** Particle budget — 20k on capable desktops, far fewer on phones. */
  count: number;
  /** Instance radius, in scene units (larger on low tier so motes stay visible). */
  size: number;
  /** Additive glow on top of the particles. */
  bloom: boolean;
  dpr: [number, number];
  /** Overall particle opacity — dialled down on the low tier. */
  opacity: number;
}

const FULL_QUALITY: Quality = {
  count: 20000,
  size: 0.6,
  bloom: true,
  dpr: [1, 1.5],
  // Low per-particle alpha is deliberate: the layers are dense enough that
  // 20k additive motes saturate to white at higher values.
  opacity: 0.42,
};
const LITE_QUALITY: Quality = {
  count: 5000,
  size: 2,
  bloom: false,
  dpr: [1, 1],
  // Larger motes and a higher alpha than the full tier: with bloom off there is
  // nothing to lift the highlights, so the particles carry the presence
  // themselves. Fill cost is negligible at phone resolutions.
  opacity: 0.6,
};

function hasWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = (canvas.getContext('webgl2') || canvas.getContext('webgl')) as WebGLRenderingContext | null;
    if (!gl) return false;
    const ext = gl.getExtension('WEBGL_lose_context');
    if (ext && typeof ext.loseContext === 'function') {
      ext.loseContext();
    }
    return true;
  } catch {
    return false;
  }
}

function isLowPowerDevice(): boolean {
  if (typeof window === 'undefined') return true;
  if (window.innerWidth < 768) return true;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  if (nav.connection?.saveData) return true;
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 4) return true;
  if (typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 4) return true;
  return false;
}

interface BoundaryProps {
  children: ReactNode;
  onError: () => void;
}

interface BoundaryState {
  failed: boolean;
}

/** Isolates the WebGL scene: a failed chunk or a lost context must never break the hero. */
class SceneBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { failed: false };

  static getDerivedStateFromError(): BoundaryState {
    return { failed: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo): void {
    this.props.onError();
  }

  render(): ReactNode {
    return this.state.failed ? null : this.props.children;
  }
}

interface SolarParticleBackgroundProps {
  /** The hero reveal has started — lets the formation assemble with the intro hand-off. */
  started?: boolean;
}

export function SolarParticleBackground({ started = true }: SolarParticleBackgroundProps) {
  const reduce = usePrefersReducedMotion();
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const hostRef = useRef<HTMLDivElement | null>(null);

  // Probed once, during the first render. This only decides how much WebGL work
  // to queue up — the scene module itself is still fetched lazily, so the hero
  // copy never waits on it.
  const [quality] = useState<Quality | null>(() =>
    hasWebGL() ? (isLowPowerDevice() ? LITE_QUALITY : FULL_QUALITY) : null,
  );

  // Stop rendering when the hero scrolls away or the tab is hidden.
  useEffect(() => {
    const host = hostRef.current;
    if (!host || !quality) return;
    let onScreen = true;
    const sync = () => setPaused(!onScreen || document.hidden);
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    observer.observe(host);
    document.addEventListener('visibilitychange', sync);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
    };
  }, [quality]);

  const handleReady = useCallback(() => setVisible(true), []);
  const handleError = useCallback(() => setFailed(true), []);

  const showScene = !reduce && quality !== null && !failed;

  return (
    <div ref={hostRef} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {showScene ? (
        <div
          className="absolute inset-0"
          style={{ mixBlendMode: 'screen', opacity: visible ? 1 : 0, transition: 'opacity 1400ms ease-out' }}
        >
          <SceneBoundary onError={handleError}>
            <Suspense fallback={null}>
              <SolarParticleScene
                active={started}
                paused={paused}
                count={quality.count}
                size={quality.size}
                opacity={quality.opacity}
                bloom={quality.bloom}
                dpr={quality.dpr}
                onReady={handleReady}
              />
            </Suspense>
          </SceneBoundary>
        </div>
      ) : (
        /* Static stand-in for reduced-motion users and devices without WebGL. */
        <div
          className="absolute inset-0"
          style={{
            background: [
              'radial-gradient(circle at 66% 48%, rgba(255,140,40,0.22) 0%, rgba(245,158,11,0.14) 22%, rgba(255,119,0,0.06) 42%, transparent 62%)',
              'radial-gradient(circle at 66% 48%, rgba(255,180,60,0.08) 0%, transparent 68%)',
            ].join(', '),
          }}
        />
      )}
    </div>
  );
}
