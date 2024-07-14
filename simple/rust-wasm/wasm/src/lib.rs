use wasm_bindgen::prelude::*;

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
impl Ball {
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

    pub fn update(&mut self) {
        self.x += self.vx;
        self.y += self.vy;

        if self.x > self.width || self.x < 0.0 {
            self.vx = -self.vx;
        }

        if self.y > self.height || self.y < 0.0 {
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
