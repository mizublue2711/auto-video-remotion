import React from 'react';
import { useCurrentFrame, interpolate, Easing } from 'remotion';
import { THEME_TOKENS } from './MasterCompositeScene';

// 1. VISUAL PROPS REGISTRY (Clean Barrel Import)
import {
  GearTextbook3D,
  GearSmartCalculator,
  GearTriangleRuler,
  GearExamPaper100,
} from '../components/registry';

// 2. MOTION LEGO REGISTRY (Clean Barrel Import)
import {
  KineticTrajectoryLaunch,
  SpringBurstWrapper,
  OrbitalSwapWrapper,
  VortexSuckWrapper,
  ZeroGFloatWrapper,
  BottomSheetDrawerReveal,
  MenuSlotSnapBounce,
} from '../components/motion/registry';

export interface StudyGearConvergenceSceneProps {
  [key: string]: any;
}

export const StudyGearConvergenceScene: React.FC<StudyGearConvergenceSceneProps> = () => {
  const frame = useCurrentFrame();

  // Screen Geometry Anchors
  const CX = 960;
  const CY = 540;
  const P_TL = { x: 440, y: 240 };
  const P_TR = { x: 1480, y: 250 };
  const P_BL = { x: 460, y: 760 };
  const P_BR = { x: 1460, y: 750 };

  // Phase Timing Gates
  const isLaunchPhase = frame < 32;
  const isPostBurst = frame >= 30;

  // Detonation Flash (Frames 30 - 36)
  const burstFlash = interpolate(frame, [30, 32, 36], [0, 0.95, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Final Portal Flash (Frames 168 - 180)
  const finalExitFlash = interpolate(frame, [168, 174, 180], [0, 0.95, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: 1920,
        height: 1080,
        background: THEME_TOKENS.background.global,
        overflow: 'hidden',
      }}
    >
      {/* BACKGROUND AMBIENT GLOW */}
      <div style={{ position: 'absolute', inset: 0, background: THEME_TOKENS.background.ambientGlow }} />

      {/* =====================================================================
          PHA 1: KINETIC LAUNCH (Frames 0 - 30) - QUẢ CẦU NĂNG LƯỢNG LAO VÚT
         ===================================================================== */}
      {isLaunchPhase && (
        <KineticTrajectoryLaunch
          from={{ x: 180, y: 1180 }}
          to={{ x: CX, y: CY }}
          startFrame={0}
          durationInFrames={30}
          squashFactor={0.3}
        >
          {/* Energy Orb with mini gear icons encapsulated */}
          <div
            style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #A5F3FC 40%, #0284C7 85%, #082F49 100%)',
              boxShadow: '0 0 50px rgba(0, 229, 255, 0.8), inset 0 0 25px rgba(255, 255, 255, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(255, 255, 255, 0.8)',
            }}
          >
            <span style={{ fontSize: 44, filter: 'drop-shadow(0 0 10px #00E5FF)' }}>💎</span>
          </div>
        </KineticTrajectoryLaunch>
      )}

      {/* DETONATION BURST FLASH */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle, #FFFFFF 30%, #BAE6FD 75%, transparent 100%)',
          opacity: burstFlash,
          pointerEvents: 'none',
          zIndex: 40,
        }}
      />

      {/* =====================================================================
          PHA 2 & 3: BUNG NỔ, DẬP DỀNH & HOÁN ĐỔI QUỸ ĐẠO (Frames 30 - 145)
         ===================================================================== */}
      {isPostBurst && (
        <>
          {/* ITEM 1: TEXTBOOK (Bung ra TL -> Tráo xuống BR -> Hút vào Portal) */}
          <OrbitalSwapWrapper from={P_TL} to={P_BR} arcHeight={70} startFrame={55} durationInFrames={50} tiltAngle={[-12, 14]}>
            <VortexSuckWrapper startFrame={142} durationInFrames={32} spins={1.2}>
              <ZeroGFloatWrapper amplitude={12} phaseOffset={0}>
                <GearTextbook3D size={210} />
              </ZeroGFloatWrapper>
            </VortexSuckWrapper>
          </OrbitalSwapWrapper>

          {/* ITEM 2: CALCULATOR (Bung ra BR -> Tráo lên TL -> Hút vào Portal) */}
          <OrbitalSwapWrapper from={P_BR} to={P_TL} arcHeight={-70} startFrame={55} durationInFrames={50} tiltAngle={[14, -10]}>
            <VortexSuckWrapper startFrame={142} durationInFrames={32} spins={-1.2}>
              <ZeroGFloatWrapper amplitude={14} phaseOffset={1.5}>
                <GearSmartCalculator size={175} />
              </ZeroGFloatWrapper>
            </VortexSuckWrapper>
          </OrbitalSwapWrapper>

          {/* ITEM 3: TRIANGLE RULER (Bung ra TR -> Tráo xuống BL -> Hút vào Portal) */}
          <OrbitalSwapWrapper from={P_TR} to={P_BL} arcHeight={60} startFrame={60} durationInFrames={45} tiltAngle={[18, -12]}>
            <VortexSuckWrapper startFrame={142} durationInFrames={32} spins={1}>
              <ZeroGFloatWrapper amplitude={10} phaseOffset={3}>
                <GearTriangleRuler size={185} />
              </ZeroGFloatWrapper>
            </VortexSuckWrapper>
          </OrbitalSwapWrapper>

          {/* ITEM 4: EXAM PAPER 100 (Bung ra BL -> Tráo lên TR -> Hút vào Portal) */}
          <OrbitalSwapWrapper from={P_BL} to={P_TR} arcHeight={-60} startFrame={60} durationInFrames={45} tiltAngle={[-16, 12]}>
            <VortexSuckWrapper startFrame={142} durationInFrames={32} spins={-1}>
              <ZeroGFloatWrapper amplitude={12} phaseOffset={4.5}>
                <GearExamPaper100 size={200} />
              </ZeroGFloatWrapper>
            </VortexSuckWrapper>
          </OrbitalSwapWrapper>
        </>
      )}

      {/* =====================================================================
          PHA 4: GIAO DIỆN TRỒI LÊN & MENU NẢY POP-IN (Frames 105 - 150)
         ===================================================================== */}
      <BottomSheetDrawerReveal startFrame={105} targetHeight={520}>
        <div
          style={{
            width: 1100,
            height: '100%',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(24px)',
            borderRadius: '40px 40px 0 0',
            border: '2px solid rgba(255, 255, 255, 0.95)',
            boxShadow: '0 -20px 60px rgba(2, 132, 199, 0.22)',
            padding: '24px 44px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}
        >
          {/* Drawer Drag Pill Handle */}
          <div style={{ width: 68, height: 6, borderRadius: 3, background: '#CBD5E1', margin: '0 auto' }} />

          {/* Drawer Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: 28, fontWeight: 900, color: '#0F172A' }}>학원 미션 퀘스트</span>
              <span style={{ fontSize: 16, color: '#0284C7', fontWeight: 700, marginLeft: 12 }}>● LIVE SYNC</span>
            </div>
            <div style={{ background: '#E0F2FE', padding: '6px 18px', borderRadius: 999, color: '#0284C7', fontWeight: 800 }}>
              +50,000 CARAT
            </div>
          </div>

          {/* Menu Slots Elastic Pop-In Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 8 }}>
            {/* Slot 1: Math Challenge */}
            <MenuSlotSnapBounce snapFrame={118} staggerIndex={0}>
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: 22,
                  padding: '20px 18px',
                  border: '1.5px solid #E0F2FE',
                  boxShadow: '0 8px 20px rgba(2, 132, 199, 0.08)',
                }}
              >
                <div style={{ fontSize: 13, color: '#64748B', fontWeight: 700 }}>수학 I 킬러 문항</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', marginTop: 4 }}>+1,500 C 즉시 적립</div>
              </div>
            </MenuSlotSnapBounce>

            {/* Slot 2: Study Hall Attendance */}
            <MenuSlotSnapBounce snapFrame={118} staggerIndex={1}>
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: 22,
                  padding: '20px 18px',
                  border: '1.5px solid #E0F2FE',
                  boxShadow: '0 8px 20px rgba(2, 132, 199, 0.08)',
                }}
              >
                <div style={{ fontSize: 13, color: '#64748B', fontWeight: 700 }}>학원 자습 2시간</div>
                <div style={{ fontSize: 18, fontWeight: 900, color: '#0F172A', marginTop: 4 }}>출석 인증 완료</div>
              </div>
            </MenuSlotSnapBounce>

            {/* Slot 3: Instant Cashout Card */}
            <MenuSlotSnapBounce snapFrame={118} staggerIndex={2}>
              <div
                style={{
                  background: 'linear-gradient(135deg, #0284C7 0%, #00E5FF 100%)',
                  borderRadius: 22,
                  padding: '20px 18px',
                  color: '#FFFFFF',
                  boxShadow: '0 8px 22px rgba(0, 229, 255, 0.35)',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.9 }}>체크카드 전환</div>
                <div style={{ fontSize: 18, fontWeight: 900, marginTop: 4 }}>편의점 즉시 결제</div>
              </div>
            </MenuSlotSnapBounce>
          </div>
        </div>
      </BottomSheetDrawerReveal>

      {/* =====================================================================
          PHA 5: BRAND PORTAL LOGO CORE & EXIT TRANSITION (Frames 145 - 180)
         ===================================================================== */}
      {frame >= 142 && (
        <div
          style={{
            position: 'absolute',
            left: CX,
            top: CY,
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            zIndex: 60,
          }}
        >
          {/* Glowing Brand Emblem */}
          <div
            style={{
              width: 130,
              height: 130,
              borderRadius: 36,
              background: 'linear-gradient(135deg, #0284C7 0%, #00E5FF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 60px rgba(0, 229, 255, 0.8), 0 16px 36px rgba(2, 132, 199, 0.4)',
              transform: `scale(${interpolate(frame, [145, 165], [0.3, 1], { extrapolateRight: 'clamp' })})`,
            }}
          >
            <span style={{ fontSize: 62 }}>💎</span>
          </div>
        </div>
      )}

      {/* EXIT WHITE FLASH */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#FFFFFF',
          opacity: finalExitFlash,
          pointerEvents: 'none',
          zIndex: 100,
        }}
      />
    </div>
  );
};
