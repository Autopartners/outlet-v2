import { useRef, useEffect, useMemo, useState } from 'react';

interface DamagePart {
  canvas_position_x: number;
  canvas_position_y: number;
  title?: string;
}

interface Damage {
  left_right: number; // 0 = left, 1 = left?, 2 = right, 3 = both
  damage_part: DamagePart;
}

interface Point {
  x: number;
  y: number;
  index: number;
}

interface SchemaProps {
  selected: number;
  setSelected: (i: number) => void;
  hovered?: number | null;
  setHovered: (i: number | null) => void;
  damages: Damage[];
}

const Schema = ({ selected, setSelected, hovered, setHovered, damages }: SchemaProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const size = { w: 300, h: 260 };
  const pointRadius = 10;
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

  const points: Point[] = useMemo(() => {
    return damages.flatMap((damage, i) => {
      const d = damage.damage_part;
      let x = (d.canvas_position_x || 0) * (size.w / 325);
      const y = (d.canvas_position_y || 0) * (size.h / 281);

      const pts: Point[] = [];

      // Проверка сторон
      if (damage.left_right > 1) {
        if (damage.left_right > 2) {
          pts.push({ x, y, index: i });
        } // обе
        x = size.w - x; // зеркалирование вправо
      }

      pts.push({ x, y, index: i });
      return pts;
    });
  }, [damages, size.w, size.h]);

  const [imgReady, setImgReady] = useState(false);

  // Ожидаем загрузки картинки
  useEffect(() => {
    const img = imgRef.current;
    if (!img) {
      return;
    }

    if (img.complete && img.naturalWidth !== 0) {
      setImgReady(true);
      return;
    }

    const onLoad = () => setImgReady(true);
    img.addEventListener('load', onLoad);
    return () => img.removeEventListener('load', onLoad);
  }, []);

  // Настройка canvas под DPR
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) {
      return;
    }

    c.style.width = `${size.w}px`;
    c.style.height = `${size.h}px`;
    c.width = size.w * dpr;
    c.height = size.h * dpr;

    const ctx = c.getContext('2d');
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }, [dpr]);

  // Отрисовка фона и точек
  const draw = () => {
    const c = canvasRef.current;
    if (!c) {
      return;
    }
    const ctx = c.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, size.w, size.h);

    if (imgReady && imgRef.current) {
      ctx.drawImage(imgRef.current, 5, 5, size.w - 10, size.h - 10);
    }

    points.forEach(p => {
      ctx.beginPath();
      ctx.fillStyle = p.index === selected ? '#007bff' : (p.index === hovered ? '#33b5e5' : '#aaa');
      ctx.arc(p.x, p.y, pointRadius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Roboto';
      const pos = p.index > 9 ? 7 : 4;
      ctx.fillText((p.index + 1).toString(), p.x - pos, p.y + 4);
      ctx.stroke();
    });
  };

  useEffect(() => {
    draw();
  }, [points, hovered, selected, imgReady]);

  // Обработчики мыши
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);

      const point = points.find(p => {
        const dx = x - p.x * dpr;
        const dy = y - p.y * dpr;
        return Math.sqrt(dx * dx + dy * dy) <= pointRadius * dpr;
      });

      setHovered(point ? point.index : null);
    };

    const handleLeave = () => setHovered(null);
    const handleClick = () => {
      if (hovered !== null && hovered !== undefined) {
        setSelected(hovered);
      }
    };

    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseleave', handleLeave);
    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseleave', handleLeave);
      canvas.removeEventListener('click', handleClick);
    };
  }, [points, hovered, setHovered, setSelected, dpr]);

  return (
    <>
      <canvas ref={canvasRef} />
      <div style={{ display: 'none' }}>
        <img ref={imgRef} src="/bmw.jpg" width={size.w} height={size.h} alt="vehicle_template" />
      </div>
    </>
  );
};

export default Schema;
