import React from 'react';

export interface HalfAppDrawerSheetProps {
  width?: number;          // Default: 380px (matches smartphone inner canvas)
  height?: number;         // Default: 560px (~50-55% canvas height)
  progress?: number;       // 0 (hidden below canvas) to 1 (fully docked)
  category?: string;       // Default: 'K-STUDY REWARDS'
  title?: string;          // Default: 'Quick Actions & Benefits'
  subtitle?: string;       // Default: '4 Available'
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

const DEFAULT_SKELETON_ITEMS = [
  { id: 1, tag: 'QUEST', w1: '68%', w2: '45%' },
  { id: 2, tag: 'BONUS', w1: '54%', w2: '38%' },
  { id: 3, tag: 'MISSION', w1: '72%', w2: '50%' },
  { id: 4, tag: 'STUDY', w1: '60%', w2: '42%' },
];

export const HalfAppDrawerSheet: React.FC<HalfAppDrawerSheetProps> = ({
  width = 380,
  height = 560,
  progress = 1,
  category = 'K-STUDY REWARDS',
  title = 'Quick Actions & Benefits',
  subtitle = '4 Available',
  children,
  style,
}) => {
  const translateY = (1 - progress) * 100;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        margin: '0 auto',
        width,
        height,
        transform: `translateY(${translateY}%)`,
        borderRadius: '36px 36px 0 0',
        backgroundColor: '#FFFFFF',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1.5px solid rgba(226, 232, 240, 0.8)',
        borderBottom: 'none',
        boxShadow:
          '0 -16px 40px rgba(15, 23, 42, 0.12), 0 -4px 12px rgba(2, 132, 199, 0.08)',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* 1. DRAG HANDLE PILL */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 14,
          paddingBottom: 14,
          width: '100%',
        }}
      >
        <div
          style={{
            width: 48,
            height: 5,
            borderRadius: 9999,
            backgroundColor: '#CBD5E1',
          }}
        />
      </div>

      {/* 2. CATEGORY / SUBTITLE TYPOGRAPHY HEADER */}
      <div
        style={{
          padding: '0 24px 16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #F1F5F9',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: '#0284C7',
              letterSpacing: 1.2,
              textTransform: 'uppercase',
              marginBottom: 3,
              fontFamily: 'Pretendard, -apple-system, sans-serif',
            }}
          >
            {category}
          </span>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: -0.3,
              fontFamily: 'Pretendard, -apple-system, sans-serif',
            }}
          >
            {title}
          </span>
        </div>

        {subtitle && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              padding: '4px 10px',
              borderRadius: 12,
            }}
          >
            <div
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                backgroundColor: '#00E5FF',
              }}
            />
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: '#64748B',
                fontFamily: 'Pretendard, -apple-system, sans-serif',
              }}
            >
              {subtitle}
            </span>
          </div>
        )}
      </div>

      {/* 3. MODULAR CONTENT DROP SOCKETS GRID */}
      <div
        style={{
          flex: 1,
          padding: '16px 20px 20px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          boxSizing: 'border-box',
          overflowY: 'hidden',
        }}
      >
        {children ? (
          children
        ) : (
          <>
            {DEFAULT_SKELETON_ITEMS.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#F8FAFC',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: 18,
                  padding: '14px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  boxSizing: 'border-box',
                  boxShadow: '0 2px 4px rgba(15, 23, 42, 0.02)',
                }}
              >
                {/* Skeleton Icon Socket */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    backgroundColor: '#EDF2F7',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 4,
                      backgroundColor: '#CBD5E1',
                      opacity: 0.7,
                    }}
                  />
                </div>

                {/* Skeleton Text Bars */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      width: item.w1,
                      height: 12,
                      borderRadius: 4,
                      backgroundColor: '#E2E8F0',
                      marginBottom: 8,
                    }}
                  />
                  <div
                    style={{
                      width: item.w2,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: '#F1F5F9',
                    }}
                  />
                </div>

                {/* Skeleton Tag Pill */}
                <div
                  style={{
                    padding: '4px 8px',
                    borderRadius: 9999,
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E2E8F0',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: 0.6,
                    color: '#94A3B8',
                    flexShrink: 0,
                    fontFamily: 'Pretendard, -apple-system, sans-serif',
                  }}
                >
                  {item.tag}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HalfAppDrawerSheet;
