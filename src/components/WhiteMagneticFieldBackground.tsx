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

const WhiteMagneticFieldScene = lazy(() => import('./solar/WhiteMagneticFieldScene'));

interface Quality {
  count: number;
  bloom: boolean;
  dpr: [number, number];
}

const FULL_QUALITY: Quality = {
  count: 6500,
  bloom: true,
  dpr: [1, 1.5],
};

const LITE_QUALITY: Quality = {
  count: 2800,
  bloom: false,
  dpr: [1, 1],
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

interface WhiteMagneticFieldBackgroundProps {
  started?: boolean;
}

export function WhiteMagneticFieldBackground({ started = true }: WhiteMagneticFieldBackgroundProps) {
  const reduce = usePrefersReducedMotion();
  const [failed, setFailed] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const hostRef = useRef<HTMLDivElement | null>(null);

  const [quality] = useState<Quality | null>(() =>
    hasWebGL() ? (isLowPowerDevice() ? LITE_QUALITY : FULL_QUALITY) : null,
  );

  // Pause rendering when scrolled outside viewport or when tab is hidden
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
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {showScene ? (
        <div
          className="absolute inset-0"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 1000ms ease-out',
          }}
        >
          <SceneBoundary onError={handleError}>
            <Suspense fallback={null}>
              <WhiteMagneticFieldScene
                active={started}
                paused={paused}
                count={quality.count}
                bloom={quality.bloom}
                dpr={quality.dpr}
                onReady={handleReady}
              />
            </Suspense>
          </SceneBoundary>
        </div>
      ) : (
        /* Static stand-in for reduced-motion users and devices without WebGL */
        <div
          className="absolute inset-0"
          style={{
            background: [
              'radial-gradient(ellipse 60% 50% at 72% 48%, rgba(255, 255, 255, 0.12) 0%, rgba(220, 230, 220, 0.05) 35%, transparent 68%)',
              'radial-gradient(circle at 72% 48%, rgba(255, 255, 255, 0.18) 0%, transparent 40%)',
            ].join(', '),
          }}
        />
      )}
    </div>
  );
}
