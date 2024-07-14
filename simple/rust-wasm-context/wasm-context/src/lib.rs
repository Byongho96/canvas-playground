use wasm_bindgen::prelude::*;
use web_sys::CanvasRenderingContext2d;

#[wasm_bindgen]
pub struct Ball {
    x: f32,
    y: f32,
    vx: f32,
    vy: f32,
    width: f32,
    height: f32,
}

#[wasm_bindgen]
impl Ball{
    #[wasm_bindgen(constructor)]
    pub fn new(x: f32, y: f32, vx: f32, vy: f32, width: f32, height: f32) -> Self {
        Ball {
            x,
            y,
            vx,
            vy,
            width, 
            height
        }
    }

    pub fn update(&mut self, ctx: &CanvasRenderingContext2d) {
        self.x += self.vx;
        self.y += self.vy;

        if self.x > self.width || self.x < 0.0 {
            self.vx = -self.vx;
        }

        if self.y > self.height || self.y < 0.0 {
            self.vy = -self.vy;
        }
 
        // Draw the circle
        ctx.begin_path();
        ctx.arc(self.x.into(), self.y.into(), 1.0, 0.0, (2.0 * std::f32::consts::PI).into())
            .unwrap();
        ctx.fill();
    }
}
