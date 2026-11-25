// urbia · sección 10: decodificación de textos en loop + descarga de tokens de movimiento
(() => {
  const CH = '01#%&$<>/\\|=+*ABCDEFXYZ';
  const decode = (el) => {
    const final = el.dataset.txt;
    let t0 = performance.now();
    const paso = (t) => {
      const p = ((t - t0) % 3600) / 3600; // ciclo 3,6 s
      const fija = Math.floor(Math.min(1, Math.max(0, (p - 0.08) / 0.32)) * final.length);
      el.textContent = final.split('').map((c, i) => (i < fija || c === ' ' || c === '.' ? c : CH[(Math.random() * CH.length) | 0])).join('');
      requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  };
  document.querySelectorAll('#video .decode').forEach(decode);

  const TOKENS = {
    marca: 'urbia', version: '1.0 · 2026-11', regla00: 'Cero segundos sin animación: cámara + capa ambiental + protagonista siempre en movimiento. Verificar con ffmpeg freezedetect=n=0.001:d=0.5',
    formatos: { '16:9': [1920, 1080], '9:16': [1080, 1920], '4:5': [1080, 1350], '1:1': [1080, 1080] }, fps: 30, duraciones_s: [15, 30, 60, 90],
    zonas_seguras: { margen_texto: '8% del lado corto', '9:16_muerta_px': { arriba: 250, abajo: 420, derecha: 140 } }, plano_s: { min: 2.5, max: 4, limite: 5 },
    color: { noche: '#08090C', carbon: '#171916', marfil: '#F5F3EB', lima: '#C7FF27', gris: '#898D84', lavanda: '#A99BCB', petroleo: '#294E59', arcilla: '#B58C78', coral: '#E36C4B', regla: 'un solo acento lima por plano' },
    mundo: { fondo: 'radial #171916 → #08090C', arco: { colores: ['#C7FF27', '#A99BCB'], blur_px: 40, respira_s: 6, opacidad: [0.55, 0.9] }, reticula_px: 96, reticula_opacidad: 0.06, particulas: { n: [40, 80], deriva_px_s: 6 }, escaneo_s: 9, grano: 0.03, vineta: 0.25, bloom: { umbral: 0.55, intensidad: 0.85 },
      luces: [{ color: '#F5F3EB', k: 6, pos: 'arriba' }, { color: '#A99BCB', k: 2.4, pos: 'izquierda' }, { color: '#C7FF27', k: 1.8, pos: 'derecha' }, { color: '#F5F3EB', k: 2.6, pos: 'frente' }, { color: '#E36C4B', k: 1.2, pos: 'abajo' }] },
    materiales: {
      A_cromo: { color: '#e2e4ea', metalness: 1, roughness: 0.12, iridescence: 0.55, iridescenceIOR: 1.4, iridescenceThicknessRange: [180, 520], clearcoat: 1, clearcoatRoughness: 0.05, envMapIntensity: 2 },
      B_cromo_lima: { color: '#C7FF27', metalness: 0.75, roughness: 0.12, emissive: '#C7FF27', emissiveIntensity: 0.25, max_por_plano: 1 },
      C_vidrio: { fondo: 'rgba(23,25,22,.55)', blur_px: 24, borde: '1px rgba(245,243,235,.18)', esquina_lima_px: 10, radio: 0 } },
    tipografia_1080p: { titular: { familia: 'Manrope', peso: 800, px: 120, min: 96, tracking: '-5%', max_palabras: 6 }, apoyo: { familia: 'DM Sans', peso: 500, px: 40, min: 32, max_palabras: 12 }, hud: { familia: 'JetBrains Mono', peso: 500, px: 22, tracking: '+18%', mayusculas: true }, cifras: { familia: 'Manrope', peso: 800, px: 160 }, factor_9x16: 1.25, lectura_s_por_palabra: 0.4 },
    curvas: { entrada: 'cubic-bezier(.16,1,.3,1)', salida: 'cubic-bezier(.7,0,.84,0)', continuo: 'cubic-bezier(.37,0,.63,1)', prohibido: ['linear (salvo deriva)', 'bounce', 'elastic'] },
    tiempos_cuadros: { micro: 9, elemento: 18, transicion: [21, 27], escalonado: { palabras: 2, tarjetas: 3, filas: 2 } },
    camara: { deriva: { escala_pct: 3, cada_s: 4, orbita_grados_s: 4 }, parallax: { fondo: 0.2, medio: 0.6, frente: 1 }, dof_fondo_px: 6, fov: 36, interfaces: { rotX: [18, 25], rotY: -12, acercamiento_pct: 15, en_s: 3 } },
    transiciones: {
      T1_empuje: { cuadros: 24, a: 'escala 1→6 expo-in', b: 'escala 0.8→1 expo-out' },
      T2_barrido_luz: { cuadros: 18, haz: 'lima diagonal 20°', destello_cuadros: 2 },
      T3_esquina: { cuadros: 21, desde: 'arriba-derecha', hasta: 'marco completo', revela: 'B' },
      T4_decodificacion: { cuadros: 15, caracteres: 'JetBrains Mono', fijado: 'izquierda→derecha' },
      T5_profundidad: { cuadros: 18, blur_px: [0, 24], escala_a: 1.08 },
      T6_interfaz_3d: { cuadros: 27, rotX: [0, 60], b: 'sube 60px' },
      reglas: ['nunca dos iguales seguidas', 'plano entrante ya en movimiento', 'sin cortes secos', 'fundido a negro máx. 9 cuadros'] },
    animaciones: {
      A1_titular: { sube_px: 40, blur_px: [12, 0], cuadros: 18, escalonado_cuadros: 2 },
      A2_tachado: { linea: 'lima 3px', cuadros: 12, luego: 'A1' },
      A3_tarjeta: { escala: [0.92, 1], flota_px: 8, flota_s: 4 },
      A4_cifra: { cuadros: 15, fijado: 'izquierda→derecha' },
      A5_icono_cromado: { giro_entrada: 360, cuadros: 27, oscila_grados: 24, oscila_s: 4.4 },
      A6_grafica: { cuadros: 36, curva: 'expo-out', remate: 'destello lima' },
      A7_cursor: { trayecto: 'curvo', onda_cuadros: 12, hundimiento_pct: 2 },
      A8_logo: { letras: 'A1 cromo', esquina: 'llega última con destello', giro_rad_s: 0.45 } },
    estructura_30s: [['0-2', 'gancho'], ['2-8', 'problema'], ['8-10', 'logo A8'], ['10-24', 'demostración'], ['24-28', 'prueba'], ['28-30', 'cierre']],
    sonido: { bpm: [100, 120], lufs: -14, pico_dBTP: -1 },
    exportar: { contenedor: 'mp4', video: 'H.264 High yuv420p', fps: 30, crf: 18, audio: 'AAC 320k', faststart: true, nombre: 'urbia_V##_tema_formato.mp4' },
  };
  document.getElementById('dl-motion')?.addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(TOKENS, null, 2)], { type: 'application/json' }));
    a.download = 'urbia-video-tokens.json'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  });
})();
