import { useRef, useEffect } from 'react';

interface DamagePart {
  canvas_position_x: number;
  canvas_position_y: number;
  title?: string;
}

interface Damage {
  left_right: number;
  damage_part: DamagePart;
}

interface Point {
  coordinates: { x: number; y: number };
  hoverArea: [number, number, number, number];
  index: number;
}

interface SchemaProps {
  selected: number;
  setSelected: (i: number) => void;
  hovered?: number;
  setHovered: (i: number | undefined) => void;
  damages: Damage[];
}

const Schema = ({ selected, setSelected, hovered, setHovered, damages }: SchemaProps) => {
  const schema = useRef<HTMLCanvasElement | null>(null);
  const bmw = useRef<HTMLImageElement | null>(null);
  const size = { w: 300, h: 260 };

  const points: Point[][] = preparePoints(damages, size.w, size.h);

  const click = () => {
    if (hovered) { setSelected(hovered); }
  };

  const addPicture = () => {
    const c = schema.current;
    if (!c) { return; }

    c.width = size.w;
    c.height = size.h;

    const ctx = c.getContext('2d');
    if (!ctx) { return; }

    ctx.clearRect(0, 0, c.width, c.height);

    const background = bmw.current;
    if (background && background.complete) {
      ctx.drawImage(background, 5, 5, size.w - 10, size.h - 10);
    }
  };

  const hover = (e: MouseEvent) => {
    if (!schema.current) { return; }
    const r = schema.current.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const damage = points.flat().find((point) => {
      const [x1, x2, y1, y2] = point.hoverArea;
      return x > x1 && x < x2 && y > y1 && y < y2;
    });

    setHovered(damage?.index);
  };

  const drawPoints = () => {
    if (!points || !schema.current) { return; }
    const ctx = schema.current.getContext('2d');
    if (!ctx) { return; }

    points.flat().forEach((point) => {
      const { x, y } = point.coordinates;
      const i = point.index;
      if (x === 0 || y === 0) { return; }

      ctx.fillStyle = '#aaa';
      if (i === hovered) { ctx.fillStyle = '#33b5e5'; }
      if (i === selected) { ctx.fillStyle = '#007bff'; }

      ctx.beginPath();
      ctx.arc(x, y, 10, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Roboto';
      const pos = i > 9 ? 7 : 4;
      ctx.fillText(i.toString(), x - pos, y + 4);
      ctx.stroke();
    });
  };

  useEffect(() => {
    addPicture();
    drawPoints();
  }, [damages, hovered, selected]);

  useEffect(() => {
    const canvas = schema.current;
    if (canvas) { canvas.onmousemove = hover; }
    if (bmw.current) {
      bmw.current.onload = () => {
        addPicture();
        drawPoints();
      };
    }
  }, []);

  return (
    <>
      <canvas ref={schema} onClick={click} />
      <div style={{ display: 'none' }}>
        <img
          ref={bmw}
          alt="vehicle_template"
          src="/bmw.jpg"
          width={size.w}
          height={size.h}
        />
      </div>
    </>
  );
};

const preparePoints = (damages: Damage[], w: number, h: number): Point[][] => {
  return damages.map((damage, i) => {
    const { left_right } = damage;
    const d = damage.damage_part;
    let x = d.canvas_position_x * (w / 325);
    const y = d.canvas_position_y * (h / 281);
    const p: Point[] = [];

    const toPoint = (x: number, y: number, i: number) => {
      const sq: [number, number, number, number] = [x - 9, x + 9, y - 9, y + 9];
      p.push({ coordinates: { x, y }, hoverArea: sq, index: i + 1 });
    };

    if (left_right > 1) {
      if (left_right > 2) { toPoint(x, y, i); } // both
      x = w - x; // right
    }
    toPoint(x, y, i);
    return p;
  });
};

export default Schema;
