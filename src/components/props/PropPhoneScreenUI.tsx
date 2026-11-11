import React, { useMemo } from 'react';
import { useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';

export interface PropPhoneScreenUIProps {
  balance?: number;           // Carat token balance
  userName?: string;          // Default: "Kim Min-jun"
  solveStreak?: number;       // Default: 7 days
}

export const PropPhoneScreenUI: React.FC<PropPhoneScreenUIProps> = ({
  balance = 125000,
  userName = 'Kim Min-jun',
  solveStreak = 7,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- Remotion Springs & Animations ---

  // 1. Balance Counter Animation (Starts from frame 5)
  const counterSpring = spring({
    frame: Math.max(0, frame - 5),
    fps,
    config: { damping: 18, stiffness: 60 },
  });
  const currentBalance = Math.round(
    interpolate(counterSpring, [0, 1], [0, balance], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    })
  );

  // 2. Notification Banner Slide-Down (Starts from frame 18)
  const notifSpring = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 13, stiffness: 110, mass: 0.8 },
  });
  const notifTranslateY = interpolate(notifSpring, [0, 1], [-140, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const notifOpacity = interpolate(notifSpring, [0, 0.2, 1], [0, 1, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const notifScale = interpolate(notifSpring, [0, 1], [0.94, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 3. Quest 22 Green Checkmark Spring (Starts from frame 36)
  const checkmarkSpring = spring({
    frame: Math.max(0, frame - 36),
    fps,
    config: { damping: 10, stiffness: 140, mass: 0.6 },
  });
  const checkmarkScale = interpolate(checkmarkSpring, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const checkmarkRotate = interpolate(checkmarkSpring, [0, 1], [-45, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const questCardGlow = interpolate(checkmarkSpring, [0, 1], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 4. Subtle ambient shimmer / pulse
  const ambientPulse = 0.5 + 0.5 * Math.sin(frame * 0.08);

  return (
    <div
      style={{
        width: 400,
        height: 860,
        borderRadius: 36,
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box',
        backgroundColor: '#080C14',
        backgroundImage:
          'radial-gradient(circle at 50% 0%, #152033 0%, #0A0E1A 50%, #060910 100%)',
        color: '#FFFFFF',
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Pretendard", "SF Pro Display", "Segoe UI", Roboto, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        userSelect: 'none',
        boxShadow:
          '0 24px 64px -12px rgba(0, 0, 0, 0.75), inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* =========================================================================
          TOP STATUS BAR (22:45, SKT 5G, Dynamic Island, Battery Icon)
      ========================================================================= */}
      <div
        style={{
          height: 48,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          boxSizing: 'border-box',
          position: 'relative',
          zIndex: 40,
        }}
      >
        {/* Time */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: '-0.3px',
            color: '#F1F5F9',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          22:45
        </div>

        {/* Dynamic Island / Hardware Pill Notch */}
        <div
          style={{
            width: 106,
            height: 24,
            borderRadius: 14,
            backgroundColor: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 8px',
            boxSizing: 'border-box',
            boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.08)',
          }}
        >
          {/* Camera aperture lens */}
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: '50%',
              backgroundColor: '#111827',
              border: '1px solid #1E293B',
              boxShadow: 'inset 0 0 2px #00E5FF',
            }}
          />
          {/* Micro sensor dot */}
          <div
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              backgroundColor: '#0F172A',
            }}
          />
        </div>

        {/* Right Status Group: Carrier (SKT), Cellular, Wi-Fi, Battery */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {/* Carrier Label */}
          <span
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.2px',
              color: '#94A3B8',
            }}
          >
            SKT
          </span>

          {/* Cellular Signal Bars (4 bars) */}
          <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
            <rect x="0" y="8" width="2" height="3" rx="0.5" fill="#E2E8F0" />
            <rect x="4" y="5.5" width="2" height="5.5" rx="0.5" fill="#E2E8F0" />
            <rect x="8" y="3" width="2" height="8" rx="0.5" fill="#E2E8F0" />
            <rect x="12" y="0" width="2" height="11" rx="0.5" fill="#E2E8F0" />
          </svg>

          {/* Wi-Fi Icon */}
          <svg width="13" height="10" viewBox="0 0 14 10" fill="none">
            <path
              d="M7 9C7.5 9 8 8.5 8 8C8 7.5 7.5 7 7 7C6.5 7 6 7.5 6 8C6 8.5 6.5 9 7 9Z"
              fill="#E2E8F0"
            />
            <path
              d="M3.5 5.5C4.5 4.5 5.7 4 7 4C8.3 4 9.5 4.5 10.5 5.5"
              stroke="#E2E8F0"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path
              d="M1 2.5C2.6 1 4.7 0 7 0C9.3 0 11.4 1 13 2.5"
              stroke="#E2E8F0"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>

          {/* Battery Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <div
              style={{
                width: 21,
                height: 11,
                borderRadius: 3.5,
                border: '1.2px solid #E2E8F0',
                padding: 1.5,
                boxSizing: 'border-box',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Battery level fill */}
              <div
                style={{
                  width: '85%',
                  height: '100%',
                  borderRadius: 1.5,
                  backgroundColor: '#10B981',
                }}
              />
            </div>
            {/* Battery Terminal Nub */}
            <div
              style={{
                width: 1.5,
                height: 4.5,
                borderRadius: '0 1px 1px 0',
                backgroundColor: '#94A3B8',
              }}
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          NOTIFICATION BANNER (Slide-down Pop-up Alert: +50,000 KRW Scholarship)
      ========================================================================= */}
      <div
        style={{
          position: 'absolute',
          top: 52,
          left: 14,
          right: 14,
          zIndex: 50,
          transform: `translateY(${notifTranslateY}px) scale(${notifScale})`,
          opacity: notifOpacity,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.94)',
            backdropFilter: 'blur(18px)',
            borderRadius: 20,
            padding: '12px 14px',
            boxSizing: 'border-box',
            border: '1px solid rgba(16, 185, 129, 0.45)',
            boxShadow:
              '0 18px 40px -10px rgba(16, 185, 129, 0.35), 0 8px 16px rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          {/* Icon Badge */}
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              background:
                'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 14px rgba(16, 185, 129, 0.45)',
            }}
          >
            {/* Bank Transfer / Scholarship Icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Alert Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 2,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#34D399',
                  textTransform: 'uppercase',
                  letterSpacing: '0.4px',
                }}
              >
                CRABIT SCHOLARSHIP
              </span>
              <span style={{ fontSize: 10, color: '#64748B' }}>방금 전</span>
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.2px',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              +50,000 KRW Scholarship Transferred
            </div>
            <div
              style={{
                fontSize: 11,
                color: '#94A3B8',
                marginTop: 2,
              }}
            >
              수능 킬러문항 22번 정복 축하 장학금 지급 완료
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN SCROLL/CONTENT VIEWPORT
      ========================================================================= */}
      <div
        style={{
          flex: 1,
          padding: '8px 20px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        {/* User Greeting & Solve Streak Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 4,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* User Avatar with gradient border */}
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, #00E5FF 0%, #3B82F6 100%)',
                padding: 2,
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: '#0F172A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  fontWeight: 800,
                  color: '#00E5FF',
                }}
              >
                MJ
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: '#64748B',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.4px',
                }}
              >
                CRABIT ELITE STUDENT
              </div>
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: '#F8FAFC',
                  letterSpacing: '-0.3px',
                }}
              >
                {userName}
              </div>
            </div>
          </div>

          {/* Solve Streak Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              backgroundColor: 'rgba(245, 158, 11, 0.12)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              borderRadius: 20,
              padding: '5px 11px',
              boxShadow: `0 0 14px rgba(245, 158, 11, ${0.15 + ambientPulse * 0.1})`,
            }}
          >
            <span style={{ fontSize: 13 }}>🔥</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: '#FBBF24',
                  lineHeight: 1.1,
                }}
              >
                {solveStreak} DAYS
              </span>
              <span
                style={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: '#D97706',
                  lineHeight: 1,
                }}
              >
                STREAK
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            FINTECH WALLET HEADER (Carat Balance with Animated Counter)
        ========================================================================= */}
        <div
          style={{
            borderRadius: 24,
            padding: '20px 20px 18px 20px',
            boxSizing: 'border-box',
            position: 'relative',
            background:
              'linear-gradient(135deg, rgba(26, 38, 59, 0.85) 0%, rgba(13, 20, 36, 0.95) 100%)',
            border: '1px solid rgba(0, 229, 255, 0.28)',
            boxShadow:
              '0 16px 36px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
            overflow: 'hidden',
          }}
        >
          {/* Ambient card background glow */}
          <div
            style={{
              position: 'absolute',
              top: -30,
              right: -30,
              width: 140,
              height: 140,
              borderRadius: '50%',
              backgroundColor: '#00E5FF',
              opacity: 0.12 + ambientPulse * 0.05,
              filter: 'blur(36px)',
              pointerEvents: 'none',
            }}
          />

          {/* Header Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {/* Faceted Carat Gem Icon */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 120 120"
                fill="none"
                style={{
                  filter: 'drop-shadow(0 0 6px #00E5FF)',
                }}
              >
                <polygon points="38,26 82,26 60,52" fill="#00E5FF" />
                <polygon points="38,26 17,52 38,52" fill="#38BDF8" />
                <polygon points="38,26 38,52 60,52" fill="#7DD3FC" />
                <polygon points="82,26 60,52 82,52" fill="#00E5FF" />
                <polygon points="82,26 82,52 103,52" fill="#38BDF8" />
                <polygon points="17,52 38,52 60,96" fill="#38BDF8" />
                <polygon points="38,52 60,52 60,96" fill="#7DD3FC" />
                <polygon points="60,52 82,52 60,96" fill="#0284C7" />
                <polygon points="82,52 103,52 60,96" fill="#0369A1" />
              </svg>

              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.8px',
                  color: '#94A3B8',
                  textTransform: 'uppercase',
                }}
              >
                CARAT WALLET BALANCE
              </span>
            </div>

            <div
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#00E5FF',
                backgroundColor: 'rgba(0, 229, 255, 0.12)',
                border: '1px solid rgba(0, 229, 255, 0.3)',
                padding: '2px 8px',
                borderRadius: 10,
              }}
            >
              LIVE SYNC
            </div>
          </div>

          {/* Big Animated Counter Display */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 8,
              marginTop: 4,
            }}
          >
            <span
              style={{
                fontSize: 34,
                fontWeight: 800,
                letterSpacing: '-1px',
                color: '#FFFFFF',
                fontVariantNumeric: 'tabular-nums',
                textShadow: '0 0 24px rgba(0, 229, 255, 0.3)',
              }}
            >
              {currentBalance.toLocaleString()}
            </span>
            <span
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: '#00E5FF',
                letterSpacing: '0.5px',
              }}
            >
              CARAT
            </span>
          </div>

          {/* KRW Valuation & Growth pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 6,
            }}
          >
            <span
              style={{
                fontSize: 12,
                color: '#94A3B8',
                fontWeight: 500,
              }}
            >
              ≈ ₩{(currentBalance * 10).toLocaleString()} KRW
            </span>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.15)',
                padding: '2px 6px',
                borderRadius: 6,
              }}
            >
              +42.8% 이달의 장학수익
            </span>
          </div>

          {/* Quick FinTech Action Buttons */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 8,
              marginTop: 16,
            }}
          >
            {/* Action 1: Cash Out */}
            <div
              style={{
                backgroundColor: '#00E5FF',
                color: '#04101A',
                borderRadius: 12,
                padding: '8px 0',
                textAlign: 'center',
                fontSize: 11,
                fontWeight: 700,
                boxShadow: '0 4px 14px rgba(0, 229, 255, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
              }}
            >
              <span>출금 신청</span>
            </div>

            {/* Action 2: Swap */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#E2E8F0',
                borderRadius: 12,
                padding: '8px 0',
                textAlign: 'center',
                fontSize: 11,
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
              }}
            >
              <span>캐럿 전환</span>
            </div>

            {/* Action 3: History */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#E2E8F0',
                borderRadius: 12,
                padding: '8px 0',
                textAlign: 'center',
                fontSize: 11,
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
              }}
            >
              <span>장학 내역</span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            QUEST LIST (CSAT Calculus Problem 22 with Springing Green Checkmark)
        ========================================================================= */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            marginTop: 2,
          }}
        >
          {/* Section Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 4px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.2px',
                }}
              >
                수능 실전 퀘스트 (CSAT Quests)
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#00E5FF',
                  backgroundColor: 'rgba(0, 229, 255, 0.12)',
                  padding: '2px 6px',
                  borderRadius: 6,
                }}
              >
                KILLER 22
              </span>
            </div>
            <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>
              전체 보기
            </span>
          </div>

          {/* Primary Quest Card: CSAT Calculus Problem 22 */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              borderRadius: 20,
              padding: '16px',
              boxSizing: 'border-box',
              border: `1px solid rgba(16, 185, 129, ${0.25 + questCardGlow * 0.45})`,
              boxShadow: `0 10px 28px -6px rgba(0, 0, 0, 0.5), 0 0 24px rgba(16, 185, 129, ${questCardGlow * 0.22})`,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            {/* Quest Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 800,
                    color: '#EF4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    padding: '2px 6px',
                    borderRadius: 4,
                    letterSpacing: '0.3px',
                  }}
                >
                  수능 최고난도
                </span>
                <span
                  style={{
                    fontSize: 11,
                    color: '#94A3B8',
                    fontWeight: 500,
                  }}
                >
                  정답률 1.8%
                </span>
              </div>

              {/* Required Exact Title */}
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '-0.3px',
                }}
              >
                CSAT Calculus Problem 22
              </div>

              <div
                style={{
                  fontSize: 11,
                  color: '#64748B',
                  marginTop: 2,
                }}
              >
                도함수의 부호 판별 및 극값 조건 해석
              </div>

              {/* Reward Tag */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  marginTop: 8,
                  backgroundColor: 'rgba(0, 229, 255, 0.1)',
                  borderRadius: 6,
                  padding: '3px 7px',
                }}
              >
                <span style={{ fontSize: 10 }}>💎</span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: '#00E5FF',
                  }}
                >
                  +5,000 CARAT 보상 완료
                </span>
              </div>
            </div>

            {/* Green Checkmark Springing In via spring() */}
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
              }}
            >
              {/* Ripple Ring Effect behind checkmark */}
              <div
                style={{
                  position: 'absolute',
                  inset: -4,
                  borderRadius: '50%',
                  border: '2px solid #10B981',
                  opacity: (1 - checkmarkScale) * 0.8,
                  transform: `scale(${1 + (1 - checkmarkScale) * 0.8})`,
                  pointerEvents: 'none',
                }}
              />

              {/* Springing Green Checkmark Circle */}
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                  boxShadow:
                    '0 0 24px rgba(16, 185, 129, 0.75), 0 4px 10px rgba(0, 0, 0, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `scale(${checkmarkScale}) rotate(${checkmarkRotate}deg)`,
                  transformOrigin: 'center center',
                }}
              >
                {/* Crisp White Checkmark SVG */}
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M5 12.5L9.5 17L19 7.5"
                    stroke="#FFFFFF"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Secondary Quest Card: CSAT Problem 15 (In Progress) */}
          <div
            style={{
              backgroundColor: 'rgba(15, 23, 42, 0.55)',
              borderRadius: 18,
              padding: '14px 16px',
              boxSizing: 'border-box',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  color: '#38BDF8',
                  backgroundColor: 'rgba(56, 189, 248, 0.12)',
                  padding: '2px 6px',
                  borderRadius: 4,
                  display: 'inline-block',
                  marginBottom: 3,
                }}
              >
                수열 점화식
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#CBD5E1',
                }}
              >
                CSAT Math Problem 15
              </div>
              <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                귀납적 정의에 따른 수열 추론
              </div>
            </div>

            {/* In-Progress indicator */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: 4,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#38BDF8',
                }}
              >
                진행률 85%
              </span>
              <div
                style={{
                  width: 54,
                  height: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: '85%',
                    height: '100%',
                    backgroundColor: '#38BDF8',
                    borderRadius: 2,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Space filler / flex push */}
        <div style={{ flex: 1 }} />

        {/* Bottom Home Indicator */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: 4,
          }}
        >
          <div
            style={{
              width: 128,
              height: 4.5,
              borderRadius: 3,
              backgroundColor: 'rgba(255, 255, 255, 0.35)',
            }}
          />
        </div>
      </div>
    </div>
  );
};
