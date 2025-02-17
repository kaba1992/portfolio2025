varying vec2 vUvs;

void main() {

    vUvs = uv;
    gl_Position = vec4(position, 1.0);
}