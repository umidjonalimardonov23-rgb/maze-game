import { useGameStore } from './useGameStore';

export default function HUD() {
  const { score, lives, collectedItems, totalItems, flashMessage } = useGameStore();

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: 'none',
      zIndex: 10,
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 20px',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)',
        color: '#fff',
        fontFamily: 'Courier New, monospace',
      }}>
        <div style={{ fontSize: '14px', letterSpacing: '2px' }}>
          <span style={{ color: '#ffd700' }}>SCORE</span>
          <span style={{ marginLeft: 10, fontSize: '20px', fontWeight: 'bold' }}>{score}</span>
        </div>
        <div style={{ fontSize: '14px', letterSpacing: '2px' }}>
          <span style={{ color: '#00ffff' }}>ITEMS</span>
          <span style={{ marginLeft: 10, fontSize: '20px' }}>
            {collectedItems.size}<span style={{ color: '#666', fontSize: '14px' }}>/{totalItems}</span>
          </span>
        </div>
        <div style={{ fontSize: '14px', letterSpacing: '2px' }}>
          <span style={{ color: '#ff6b6b' }}>LIVES</span>
          <span style={{ marginLeft: 10, fontSize: '20px' }}>
            {'❤️'.repeat(lives)}{'🖤'.repeat(Math.max(0, 3 - lives))}
          </span>
        </div>
      </div>

      {/* Crosshair */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'rgba(255,255,255,0.7)',
        fontSize: '20px',
        lineHeight: 1,
        textShadow: '0 0 4px rgba(0,255,255,0.8)',
      }}>+</div>

      {/* Flash message */}
      {flashMessage && (
        <div style={{
          position: 'absolute',
          top: '40%', left: '50%',
          transform: 'translateX(-50%)',
          color: '#ffd700',
          fontSize: '28px',
          fontWeight: 'bold',
          letterSpacing: '3px',
          textShadow: '0 0 12px #ffd700, 0 0 24px rgba(255,215,0,0.5)',
          animation: 'fadeUp 1.2s ease-out forwards',
        }}>
          {flashMessage}
        </div>
      )}

      {/* Controls hint */}
      <div style={{
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255,255,255,0.4)',
        fontSize: '12px',
        letterSpacing: '1px',
        textAlign: 'center',
      }}>
        W/S — Move &nbsp;|&nbsp; A/D — Turn &nbsp;|&nbsp; Collect items, avoid red spheres
      </div>

      <style>{`
        @keyframes fadeUp {
          0%   { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-40px); }
        }
      `}</style>
    </div>
  );
}
