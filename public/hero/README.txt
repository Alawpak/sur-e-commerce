Foto del hero v2 (ProductHeroV2).

El código busca: /hero/girl_hero.png

Debe ser un PNG con fondo transparente (recorte de la persona), no una foto
de fondo completo — el fondo del hero ahora es un color sólido (bone,
#E9E9E9) definido en tailwind.config.ts, y la figura se apoya sobre él.

Si el archivo no existe, la sección simplemente no muestra la imagen — no
rompe, se ve el fondo sólido con el texto.
