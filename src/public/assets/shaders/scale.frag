precision mediump float;

varying vec2 v_uv;
uniform sampler2D texture;

void main()
{
    // read the fragment color from texture
    vec4 color = texture2D(texture, v_uv);
    if (color.a > 0.0) {
      gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);
    }
}