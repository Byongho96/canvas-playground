use wasm_bindgen::prelude::*;
use web_sys::CanvasRenderingContext2d;

#[wasm_bindgen]
pub struct Ball {
    x: f32,
    y: f32,
    vx: f32,
    vy: f32,
}

#[wasm_bindgen]
pub struct Balls {
    width: u32,
    height: u32,
    balls: Vec<Ball>,
    ctx: web_sys::CanvasRenderingContext2d,
}

#[wasm_bindgen]
impl Ball {
    #[wasm_bindgen(constructor)]
    pub fn new(x: f32, y: f32, vx: f32, vy: f32) -> Self {
        Ball {
            x,
            y,
            vx,
            vy,
        }
    }

    pub fn update(&mut self, width: f32, height: f32) {
        self.x += self.vx;
        self.y += self.vy;

        if self.x > width || self.x < 0.0 {
            self.vx = -self.vx;
        }

        if self.y > height || self.y < 0.0 {
            self.vy = -self.vy;
        }
    }

    pub fn x(&self) -> f32 {
        self.x
    }

    pub fn y(&self) -> f32 {
        self.y
    }
}

#[wasm_bindgen]
impl Balls {
    #[wasm_bindgen(constructor)]
    pub fn new(cnt: u32, width: u32, height: u32, ctx: CanvasRenderingContext2d) -> Self {
        let mut balls: Vec<Ball> = Vec::new();

        for _ in 0..cnt {
            balls.push(Ball::new(
                (width as f32) * (js_sys::Math::random() as f32),
                (height as f32) * (js_sys::Math::random() as f32),
                2.0 * (js_sys::Math::random() as f32) - 1.0,
                2.0 * (js_sys::Math::random() as f32) - 1.0,
            ));
        }

        Balls {
            width,
            height,
            balls,
            ctx,
        }
    }

    pub fn update(&mut self) {
        self.ctx.set_fill_style(&JsValue::from_str("white"));
        self.ctx.clear_rect(0.0, 0.0, self.width.into(), self.height.into());

        for ball in self.balls.iter_mut() {
            ball.update(self.width as f32, self.height as f32);

            self.ctx.begin_path();
            self.ctx.arc(ball.x.into(), ball.y.into(), 1.0, 0.0, (2.0 * std::f32::consts::PI).into())
                .unwrap();
            self.ctx.fill();
        }
    }


    pub fn length(&self) -> usize {
        self.balls.len()
    }
}