use wasm_bindgen::prelude::*;

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
    pub fn new(cnt: u32, width: u32, height: u32) -> Self {
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
        }
    }

    pub fn update(&mut self) {
        for ball in self.balls.iter_mut() {
            ball.update(self.width as f32, self.height as f32);
        }
    }

    pub fn get_particle_x(&self, index: usize) -> f32 {
        self.balls[index].x
    }

    pub fn get_particle_y(&self, index: usize) -> f32 {
        self.balls[index].y
    }

    pub fn length(&self) -> usize {
        self.balls.len()
    }
}