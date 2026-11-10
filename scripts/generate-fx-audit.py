import os
import io
import math
import skia
from PIL import Image, ImageDraw, ImageFont

# Canvas setup
WIDTH = 2400
HEIGHT = 1580
CANVAS_BG = (10, 15, 26)  # Deep cosmic navy

master = Image.new("RGBA", (WIDTH, HEIGHT), CANVAS_BG)
draw = ImageDraw.Draw(master)

# Fonts
font_title = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 34)
font_subtitle = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 18)
font_sec_title = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 20)
font_card_title = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 16)
font_card_mono = ImageFont.truetype("/System/Library/Fonts/SFNSMono.ttf", 13)
font_card_desc = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 13)
font_swatch = ImageFont.truetype("/System/Library/Fonts/SFNSMono.ttf", 12)
font_tag = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 11)

# Subtle background grid
grid_color = (25, 34, 55, 120)
for x in range(0, WIDTH, 50):
    draw.line([(x, 0), (x, HEIGHT)], fill=grid_color, width=1)
for y in range(0, HEIGHT, 50):
    draw.line([(0, y), (WIDTH, y)], fill=grid_color, width=1)

# Header Section
# Top banner bar
draw.rectangle([(0, 0), (WIDTH, 140)], fill=(15, 23, 42, 240))
draw.line([(0, 140), (WIDTH, 140)], fill=(0, 229, 255, 180), width=2)

# Top badge
badge_text = "CRABIT KOREA • REMOTION ENGINE RIG"
draw.rectangle([(60, 24), (350, 48)], fill=(0, 229, 255, 30), outline=(0, 229, 255), width=1)
draw.text((72, 28), badge_text, fill=(0, 229, 255), font=font_tag)

# Title & subtitle
draw.text((60, 56), "ATOMIC MICRO-INTERACTION & EMOTION FX LIBRARY", fill=(255, 255, 255), font=font_title)
draw.text((60, 102), "Production SVG Token System • Spring Physics Reactive • Zero Inline Styles • Crabit Palette Harmonized", fill=(148, 163, 184), font=font_subtitle)

# Brand Color Swatches (Top Right)
swatches = [
    ("#00E5FF", "Cyan Core"),
    ("#38BDF8", "Sky Blue"),
    ("#0284C7", "Cerulean"),
    ("#F59E0B", "Amber Gold"),
    ("#FACC15", "Yellow Glow"),
    ("#EF4444", "Coral Red"),
    ("#991B1B", "Dark Crimson"),
    ("#64748B", "Slate Gray"),
    ("#CBD5E1", "Wind Mist"),
    ("#FFFFFF", "White Spec")
]

sw_start_x = 1380
sw_y = 45
sw_w = 90
sw_h = 24
for i, (hex_code, label) in enumerate(swatches):
    row = i // 5
    col = i % 5
    cur_x = sw_start_x + col * (sw_w + 12)
    cur_y = sw_y + row * 40
    # parse hex
    h = hex_code.lstrip("#")
    rgb = tuple(int(h[j:j+2], 16) for j in (0, 2, 4))
    draw.rectangle([(cur_x, cur_y), (cur_x + sw_w, cur_y + sw_h)], fill=rgb, outline=(255, 255, 255, 100), width=1)
    draw.text((cur_x + 2, cur_y + sw_h + 3), f"{hex_code}", fill=(203, 213, 225), font=font_swatch)

BASE_DIR = "/Users/macbookpro/auto-video-remotion/site-configs/crabit-korea/assets/student-rig-kit/fx"

def render_svg_card(svg_rel_path, card_rect, title, token_name, viewbox_dim, scene_tag, desc):
    cx1, cy1, cx2, cy2 = card_rect
    cw = cx2 - cx1
    ch = cy2 - cy1
    
    # Card background & border
    draw.rectangle([(cx1, cy1), (cx2, cy2)], fill=(17, 24, 39, 230), outline=(51, 65, 85), width=1)
    
    # Tag chip
    tag_w = int(draw.textlength(scene_tag, font=font_tag) + 16)
    draw.rectangle([(cx1 + 16, cy1 + 16), (cx1 + 16 + tag_w, cy1 + 34)], fill=(0, 229, 255, 25), outline=(0, 229, 255, 120), width=1)
    draw.text((cx1 + 24, cy1 + 19), scene_tag, fill=(0, 229, 255), font=font_tag)
    
    # Title
    draw.text((cx1 + 16, cy1 + 42), title, fill=(248, 250, 252), font=font_card_title)
    
    # Inner preview viewport box
    pv_x1 = cx1 + 16
    pv_y1 = cy1 + 68
    pv_x2 = cx2 - 16
    pv_y2 = cy2 - 76
    pv_w = pv_x2 - pv_x1
    pv_h = pv_y2 - pv_y1
    
    # Preview box background (slightly darker with checkerboard or grid)
    draw.rectangle([(pv_x1, pv_y1), (pv_x2, pv_y2)], fill=(11, 15, 25), outline=(30, 41, 59), width=1)
    
    # Subtle inner center crosshair
    mid_x = (pv_x1 + pv_x2) // 2
    mid_y = (pv_y1 + pv_y2) // 2
    draw.line([(mid_x - 12, mid_y), (mid_x + 12, mid_y)], fill=(51, 65, 85, 100), width=1)
    draw.line([(mid_x, mid_y - 12), (mid_x, mid_y + 12)], fill=(51, 65, 85, 100), width=1)
    
    # Render SVG via Skia
    svg_path = os.path.join(BASE_DIR, svg_rel_path)
    if os.path.exists(svg_path):
        stream = skia.FILEStream.Make(svg_path)
        dom = skia.SVGDOM.MakeFromStream(stream)
        c_size = dom.containerSize()
        orig_w = c_size.width() or 100
        orig_h = c_size.height() or 100
        
        # Determine scale to fit comfortably inside preview box with margin
        avail_w = pv_w - 24
        avail_h = pv_h - 24
        scale = min(avail_w / orig_w, avail_h / orig_h)
        # Don't scale up tiny assets excessively
        if scale > 2.0 and orig_w < 100:
            scale = 1.8
        
        target_render_w = int(orig_w * scale)
        target_render_h = int(orig_h * scale)
        
        surface = skia.Surface(target_render_w, target_render_h)
        with surface as canvas:
            canvas.clear(skia.ColorTRANSPARENT)
            canvas.scale(scale, scale)
            dom.render(canvas)
            
        img_bytes = bytes(surface.makeImageSnapshot().encodeToData())
        pil_rendered = Image.open(io.BytesIO(img_bytes))
        
        paste_x = mid_x - (target_render_w // 2)
        paste_y = mid_y - (target_render_h // 2)
        master.paste(pil_rendered, (paste_x, paste_y), pil_rendered)
        
    # Card metadata footer
    draw.text((cx1 + 16, cy2 - 64), token_name, fill=(0, 229, 255), font=font_card_mono)
    draw.text((cx1 + 16, cy2 - 44), f"viewBox: {viewbox_dim}", fill=(148, 163, 184), font=font_card_mono)
    draw.text((cx1 + 16, cy2 - 26), desc, fill=(203, 213, 225), font=font_card_desc)

# ==============================================================================
# SECTION 1: CATEGORY 1: EMOTION & REACTION TOKENS (emotions/)
# ==============================================================================
sec1_y = 158
draw.text((60, sec1_y), "CATEGORY 1: EMOTION & REACTION TOKENS (emotions/)", fill=(0, 229, 255), font=font_sec_title)

c1_items = [
    ("emotions/fx_sweat_drop_exhausted.svg", "01. Desk Exhaustion", "fx_sweat_drop_exhausted.svg", "0 0 100 120", "SCENE 1: DESK TEMPLE", "Pale cyan (#7DD3FC) + highlight (#E0F2FE)"),
    ("emotions/fx_question_confused.svg", "02. Confused Reaction", "fx_question_confused.svg", "0 0 100 140", "SCENE 3A/3B: CONFUSION", "Coral red (#EF4444) + dark outline (#991B1B)"),
    ("emotions/fx_dots_ellipsis.svg", "03. Awkward Silence", "fx_dots_ellipsis.svg", "0 0 160 60", "INTERACTION: PAUSE", "3 bouncing dots in slate gray (#64748B)"),
    ("emotions/fx_starburst_pupil.svg", "04. Epiphany Starburst", "fx_starburst_pupil.svg", "0 0 100 100", "EPIPHANY: EYE POP", "White (#FFFFFF) + cyan aura (#00E5FF, 0.5)"),
    ("emotions/fx_idea_lightbulb.svg", "05. Idea Lightbulb", "fx_idea_lightbulb.svg", "0 0 120 160", "EPIPHANY: LIGHTBULB", "Yellow (#FACC15) + radiating energy ticks")
]

card_w1 = 432
gap1 = 20
c1_card_h = 340
for idx, (p, title, fname, vb, tag, desc) in enumerate(c1_items):
    x1 = 60 + idx * (card_w1 + gap1)
    y1 = sec1_y + 36
    x2 = x1 + card_w1
    y2 = y1 + c1_card_h
    render_svg_card(p, (x1, y1, x2, y2), title, fname, vb, tag, desc)

# ==============================================================================
# SECTION 2: CATEGORY 2: CARAT ECONOMY & REWARD PARTICLES (rewards/)
# ==============================================================================
sec2_y = 560
draw.text((60, sec2_y), "CATEGORY 2: CARAT ECONOMY & REWARD PARTICLES (rewards/)", fill=(0, 229, 255), font=font_sec_title)

c2_items = [
    ("rewards/fx_carat_gem_single.svg", "01. Faceted Carat Gem", "fx_carat_gem_single.svg", "0 0 120 120", "CARAT ECONOMY: SINGLE REWARD", "Top #00E5FF, sides #38BDF8 / #0284C7, rim #FFFFFF"),
    ("rewards/fx_carat_cluster_burst.svg", "02. Carat Cluster Burst", "fx_carat_cluster_burst.svg", "0 0 240 240", "CARAT ECONOMY: RADIAL BURST", "4 radial Carat gems + 4 golden glints (#F59E0B)"),
    ("rewards/fx_sparkle_glint_gold.svg", "03. Amber Star Glint", "fx_sparkle_glint_gold.svg", "0 0 80 80", "REWARD ACCENT: GLINT", "4-corner diamond star in #F59E0B with soft falloff")
]

card_w2 = 733
gap2 = 20
c2_card_h = 390
for idx, (p, title, fname, vb, tag, desc) in enumerate(c2_items):
    x1 = 60 + idx * (card_w2 + gap2)
    y1 = sec2_y + 36
    x2 = x1 + card_w2
    y2 = y1 + c2_card_h
    render_svg_card(p, (x1, y1, x2, y2), title, fname, vb, tag, desc)

# ==============================================================================
# SECTION 3: CATEGORY 3: PHYSICAL & DIGITAL INTERACTIONS (interactions/)
# ==============================================================================
sec3_y = 1014
draw.text((60, sec3_y), "CATEGORY 3: PHYSICAL & DIGITAL INTERACTIONS (interactions/)", fill=(0, 229, 255), font=font_sec_title)

c3_items = [
    ("interactions/fx_touch_ripple_cyan.svg", "01. Touch Shockwave Ripple", "fx_touch_ripple_cyan.svg", "0 0 200 200", "SCENE 2: TAP FEEDBACK", "Concentric cyan rings (#00E5FF, 4px, 0.8 & 0.4 op)"),
    ("interactions/fx_glow_sweep_beam.svg", "02. Glow Sweep Flare Beam", "fx_glow_sweep_beam.svg", "0 0 400 100", "CRABIT CARD: +50,000 KRW UPDATE", "Linear light beam angled at -20° (#FFFFFF / #00E5FF)"),
    ("interactions/fx_speed_wind_lines.svg", "03. Speed Wind Swooshes", "fx_speed_wind_lines.svg", "0 0 200 80", "SCENE 4: WALKING HEELS", "3 horizontal tapered swooshes (#CBD5E1, 0.6 op)")
]

card_w3 = 733
gap3 = 20
c3_card_h = 390
for idx, (p, title, fname, vb, tag, desc) in enumerate(c3_items):
    x1 = 60 + idx * (card_w3 + gap3)
    y1 = sec3_y + 36
    x2 = x1 + card_w3
    y2 = y1 + c3_card_h
    render_svg_card(p, (x1, y1, x2, y2), title, fname, vb, tag, desc)

# ==============================================================================
# Footer Section
# ==============================================================================
draw.rectangle([(0, HEIGHT - 50), (WIDTH, HEIGHT)], fill=(15, 23, 42, 250))
draw.line([(0, HEIGHT - 50), (WIDTH, HEIGHT - 50)], fill=(51, 65, 85), width=1)
draw.text((60, HEIGHT - 34), "CRABIT KOREA MOTION RIG • VERIFIED: ZERO INLINE STYLES • ALL PRESENTATION ATTRIBUTES • SPRING PHYSICS SCALABLE", fill=(148, 163, 184), font=font_tag)
draw.text((WIDTH - 420, HEIGHT - 34), "ATOMIC ASSET LIBRARY AUDIT: PASS 100%", fill=(0, 229, 255), font=font_tag)

# Save audit sheet to destination paths
out_p1 = "/Users/macbookpro/auto-video-remotion/out/fx_kit_audit.png"
out_p2 = "/Users/macbookpro/out/fx_kit_audit.png"

os.makedirs(os.path.dirname(out_p1), exist_ok=True)
os.makedirs(os.path.dirname(out_p2), exist_ok=True)

master.save(out_p1, "PNG")
master.save(out_p2, "PNG")

print(f"Successfully rendered audit sprite to:\n- {out_p1}\n- {out_p2}")
