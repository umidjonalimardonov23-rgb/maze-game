import { useGameStore } from './useGameStore';

export default function MenuScreen() {
  const { startGame, phase, score, lives, collectedItems, totalItems } = useGameStore();

  const isGameOver = phase === 'dead';
  const isWon = phase === 'won';
  const isMenu = phase === 'menu';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(ellipse at center, #0f3460 0%, #000 70%)',
      color: '#fff',
      fontFamily: 'Courier New, monospace',
      zIndex: 100,
      userSelect: 'none',
    }}>
      {/* Animated background dots */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 4, height: 4,
            borderRadius: '50%',
            background: i % 3 === 0 ? '#00ffff' : i % 3 === 1 ? '#ffd700' : '#ff6b35',
            left: `${(i * 17 + 5) % 100}%`,
            top: `${(i * 23 + 10) % 100}%`,
            opacity: 0.4,
            animation: `pulse ${2 + (i % 3)}s ease-in-out infinite alternate`,
          }} />
        ))}
      </div>

      {/* Title */}
      <div style={{
        fontSize: '56px',
        fontWeight: 'bold',
        letterSpacing: '6px',
        textShadow: '0 0 20px #00ffff, 0 0 40px rgba(0,255,255,0.3)',
        color: '#00ffff',
        marginBottom: 8,
      }}>
        MAZE
      </div>
      <div style={{
        fontSize: '20px',
        letterSpacing: '12px',
        color: '#ffd700',
        marginBottom: 40,
        textShadow: '0 0 10px #ffd700',
      }}>
        RUNNER
      </div>

      {/* Status message */}
      {isGameOver && (
        <div style={{
          marginBottom: 24,
          padding: '12px 32px',
          background: 'rgba(255,34,68,0.2)',
          border: '1px solid #ff2244',
          borderRadius: 8,
          textAlign: 'center',
        }}>
          <div style={{ color: '#ff2244', fontSize: '22px', fontWeight: 'bold', marginBottom: 4 }}>
            GAME OVER
          </div>
          <div style={{ color: '#aaa', fontSize: '14px' }}>
            Score: <span style={{ color: '#ffd700' }}>{score}</span> &nbsp;|&nbsp;
            Items: <span style={{ color: '#00ffff' }}>{collectedItems.size}/{totalItems}</span>
          </div>
        </div>
      )}

      {isWon && (
        <div style={{
          marginBottom: 24,
          padding: '12px 32px',
          background: 'rgba(0,255,100,0.1)',
          border: '1px solid #00ff64',
          borderRadius: 8,
          textAlign: 'center',
        }}>
          <div style={{ color: '#00ff64', fontSize: '22px', fontWeight: 'bold', marginBottom: 4 }}>
            YOU WIN!
          </div>
          <div style={{ color: '#aaa', fontSize: '14px' }}>
            Final Score: <span style={{ color: '#ffd700', fontSize: '18px' }}>{score}</span>
          </div>
        </div>
      )}

      {isMenu && (
        <div style={{
          marginBottom: 32,
          textAlign: 'center',
          color: '#aaa',
          fontSize: '13px',
          lineHeight: '2',
          letterSpacing: '1px',
        }}>
          <div>Collect <span style={{ color: '#00ffff' }}>GEMS</span> · <span style={{ color: '#ffd700' }}>STARS</span> · <span style={{ color: '#ff6b35' }}>COINS</span></div>
          <div>Avoid <span style={{ color: '#ff2244' }}>red obstacles</span> — you have 3 lives</div>
          <div style={{ marginTop: 8 }}>W/S to move · A/D to turn</div>
        </div>
      )}

      {/* Play button */}
      <button
        onClick={startGame}
        style={{
          padding: '14px 48px',
          fontSize: '18px',
          fontFamily: 'Courier New, monospace',
          fontWeight: 'bold',
          letterSpacing: '4px',
          background: 'transparent',
          border: '2px solid #00ffff',
          color: '#00ffff',
          cursor: 'pointer',
          borderRadius: 4,
          textShadow: '0 0 8px #00ffff',
          boxShadow: '0 0 16px rgba(0,255,255,0.2), inset 0 0 16px rgba(0,255,255,0.05)',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => {
          (e.target as HTMLButtonElement).style.background = 'rgba(0,255,255,0.1)';
          (e.target as HTMLButtonElement).style.boxShadow = '0 0 24px rgba(0,255,255,0.4), inset 0 0 16px rgba(0,255,255,0.1)';
        }}
        onMouseLeave={e => {
          (e.target as HTMLButtonElement).style.background = 'transparent';
          (e.target as HTMLButtonElement).style.boxShadow = '0 0 16px rgba(0,255,255,0.2), inset 0 0 16px rgba(0,255,255,0.05)';
        }}
      >
        {isMenu ? 'PLAY' : 'PLAY AGAIN'}
      </button>

      <style>{`
        @keyframes pulse {
          from { transform: scale(1); opacity: 0.3; }
          to   { transform: scale(1.8); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}
