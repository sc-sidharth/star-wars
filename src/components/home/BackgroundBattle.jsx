import React from 'react';
import './BackgroundBattle.css';

function BackgroundBattle() {
  return (
    <div className="background-battle">
      {/* Twinkling Stars - More for depth */}
      {[...Array(200)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="bg-star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}

      {/* X-Wing Squadron (Rebel Alliance) - 6 fighters */}
      {[1, 2, 3, 4, 5, 6].map(num => (
        <div key={`xwing-${num}`} className={`bg-spaceship xwing-ship xwing-${num}`}>
          <svg width={60 + num * 5} height={60 + num * 5} viewBox="0 0 100 100">
            <g className="ship-glow">
              {/* Main body */}
              <rect x="47" y="35" width="6" height="30" fill="#c0c0c0"/>
              {/* Cockpit */}
              <circle cx="50" cy="45" r="5" fill="#4a90e2"/>
              {/* Wings */}
              <line x1="20" y1="35" x2="45" y2="45" stroke="#c0c0c0" strokeWidth="4"/>
              <line x1="80" y1="35" x2="55" y2="45" stroke="#c0c0c0" strokeWidth="4"/>
              <line x1="20" y1="55" x2="45" y2="55" stroke="#c0c0c0" strokeWidth="4"/>
              <line x1="80" y1="55" x2="55" y2="55" stroke="#c0c0c0" strokeWidth="4"/>
              {/* Wing tips with engines */}
              <circle cx="20" cy="35" r="4" fill="#4a90e2"/>
              <circle cx="80" cy="35" r="4" fill="#4a90e2"/>
              <circle cx="20" cy="55" r="4" fill="#4a90e2"/>
              <circle cx="80" cy="55" r="4" fill="#4a90e2"/>
              {/* Main Engines */}
              <circle cx="48" cy="65" r="3" fill="#00d4ff" className="engine-glow-blue"/>
              <circle cx="52" cy="65" r="3" fill="#00d4ff" className="engine-glow-blue"/>
            </g>
          </svg>
        </div>
      ))}

      {/* A-Wing Interceptors (Fast Rebels) - 4 fighters */}
      {[1, 2, 3, 4].map(num => (
        <div key={`awing-${num}`} className={`bg-spaceship awing-ship awing-${num}`}>
          <svg width={50 + num * 3} height={50 + num * 3} viewBox="0 0 100 100">
            <g className="ship-glow">
              {/* Sleek body */}
              <polygon points="50,30 45,60 55,60" fill="#e0e0e0"/>
              {/* Cockpit */}
              <circle cx="50" cy="40" r="4" fill="#4a90e2"/>
              {/* Side wings */}
              <polygon points="25,45 45,50 45,55 30,55" fill="#b0b0b0"/>
              <polygon points="75,45 55,50 55,55 70,55" fill="#b0b0b0"/>
              {/* Twin engines */}
              <circle cx="47" cy="60" r="2.5" fill="#00d4ff" className="engine-glow-blue"/>
              <circle cx="53" cy="60" r="2.5" fill="#00d4ff" className="engine-glow-blue"/>
            </g>
          </svg>
        </div>
      ))}

      {/* TIE Fighters (Empire) - 8 fighters */}
      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
        <div key={`tie-${num}`} className={`bg-spaceship tie-ship tie-${num}`}>
          <svg width={60 + num * 3} height={60 + num * 3} viewBox="0 0 100 100">
            <g className="ship-glow">
              {/* Solar panels */}
              <rect x="15" y="30" width="25" height="40" fill="#2a2a2a" stroke="#1a1a1a" strokeWidth="2"/>
              <rect x="60" y="30" width="25" height="40" fill="#2a2a2a" stroke="#1a1a1a" strokeWidth="2"/>
              {/* Cockpit ball */}
              <circle cx="50" cy="50" r="12" fill="#3a3a3a"/>
              <circle cx="50" cy="50" r="8" fill="#1a1a1a"/>
              {/* Window glow */}
              <circle cx="50" cy="50" r="6" fill="#ff0000" className="engine-glow-red"/>
            </g>
          </svg>
        </div>
      ))}

      {/* TIE Interceptors (Advanced Empire) - 4 fighters */}
      {[1, 2, 3, 4].map(num => (
        <div key={`tieint-${num}`} className={`bg-spaceship tie-interceptor tie-int-${num}`}>
          <svg width={65 + num * 3} height={65 + num * 3} viewBox="0 0 100 100">
            <g className="ship-glow">
              {/* Angled solar panels */}
              <polygon points="10,25 30,30 30,70 10,75" fill="#2a2a2a" stroke="#1a1a1a" strokeWidth="2"/>
              <polygon points="90,25 70,30 70,70 90,75" fill="#2a2a2a" stroke="#1a1a1a" strokeWidth="2"/>
              {/* Dagger points */}
              <polygon points="10,20 15,25 10,30" fill="#1a1a1a"/>
              <polygon points="90,20 85,25 90,30" fill="#1a1a1a"/>
              {/* Cockpit */}
              <circle cx="50" cy="50" r="10" fill="#3a3a3a"/>
              <circle cx="50" cy="50" r="6" fill="#ff0000" className="engine-glow-red"/>
            </g>
          </svg>
        </div>
      ))}

      {/* Y-Wing Bombers (Heavy Rebels) - 3 ships */}
      {[1, 2, 3].map(num => (
        <div key={`ywing-${num}`} className={`bg-spaceship ywing-ship ywing-${num}`}>
          <svg width={70 + num * 5} height={70 + num * 5} viewBox="0 0 100 100">
            <g className="ship-glow">
              {/* Main body */}
              <rect x="45" y="35" width="10" height="35" fill="#9a9a9a"/>
              {/* Cockpit */}
              <circle cx="50" cy="40" r="6" fill="#4a90e2"/>
              {/* Engine nacelles */}
              <rect x="25" y="45" width="15" height="25" fill="#7a7a7a"/>
              <rect x="60" y="45" width="15" height="25" fill="#7a7a7a"/>
              {/* Engines */}
              <circle cx="32" cy="72" r="4" fill="#00d4ff" className="engine-glow-blue"/>
              <circle cx="68" cy="72" r="4" fill="#00d4ff" className="engine-glow-blue"/>
            </g>
          </svg>
        </div>
      ))}

      {/* Millennium Falcon */}
      <div className="bg-spaceship falcon-ship">
        <svg width="100" height="100" viewBox="0 0 100 100">
          <g className="ship-glow">
            {/* Main disc */}
            <ellipse cx="50" cy="50" rx="35" ry="25" fill="#8b8b8b"/>
            <ellipse cx="50" cy="50" rx="30" ry="20" fill="#a0a0a0"/>
            {/* Cockpit */}
            <circle cx="40" cy="45" r="8" fill="#4a90e2"/>
            {/* Mandibles */}
            <path d="M 50 25 L 35 15 L 30 25 Z" fill="#7a7a7a"/>
            <path d="M 50 25 L 65 15 L 70 25 Z" fill="#7a7a7a"/>
            {/* Engine glow */}
            <ellipse cx="50" cy="70" rx="15" ry="8" fill="#00d4ff" className="engine-glow-blue" opacity="0.7"/>
          </g>
        </svg>
      </div>

      {/* Star Destroyer */}
      <div className="bg-spaceship destroyer-ship">
        <svg width="140" height="90" viewBox="0 0 150 100">
          <g className="ship-glow">
            {/* Main hull - triangle shape */}
            <polygon points="75,20 30,80 120,80" fill="#4a4a4a"/>
            <polygon points="75,20 40,75 110,75" fill="#5a5a5a"/>
            {/* Bridge tower */}
            <rect x="70" y="35" width="10" height="25" fill="#3a3a3a"/>
            <rect x="67" y="30" width="16" height="8" fill="#2a2a2a"/>
            {/* Engine glow */}
            <circle cx="45" cy="78" r="4" fill="#ff6600" className="engine-glow-red" opacity="0.7"/>
            <circle cx="105" cy="78" r="4" fill="#ff6600" className="engine-glow-red" opacity="0.7"/>
          </g>
        </svg>
      </div>

      {/* Blue Laser Blasts from Rebels - Many more synchronized with ships */}
      {[...Array(24)].map((_, i) => (
        <div key={`blue-laser-${i}`} className={`bg-laser laser-blue laser-blue-${i + 1}`}></div>
      ))}

      {/* Red Laser Blasts from Empire - Many more */}
      {[...Array(24)].map((_, i) => (
        <div key={`red-laser-${i}`} className={`bg-laser laser-red laser-red-${i + 1}`}></div>
      ))}

      {/* Green Laser Blasts (Mixed fire) */}
      {[...Array(12)].map((_, i) => (
        <div key={`green-laser-${i}`} className={`bg-laser laser-green laser-green-${i + 1}`}></div>
      ))}

      {/* Explosion Effects - More dramatic */}
      {[...Array(8)].map((_, i) => (
        <div key={`explosion-${i}`} className={`bg-explosion explosion-${i + 1}`}>
          {i % 3 === 0 ? '💥' : i % 3 === 1 ? '✨' : '🔥'}
        </div>
      ))}

      {/* Engine Trails for added realism */}
      {[...Array(15)].map((_, i) => (
        <div key={`trail-${i}`} className={`engine-trail trail-${i + 1}`}></div>
      ))}
    </div>
  );
}

export default BackgroundBattle;
