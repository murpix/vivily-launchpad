# Vivily Landing Roadmap

## Hecho
- [x] Añadir página de privacidad (`/privacy`) con política de datos de la waitlist y enlaces en el footer de la landing.
- [x] Crear tabla `waitlist_attempts` para rate limiting.
- [x] Proteger el formulario de waitlist: validación estricta de correos, anti-bot (honeypot), rate limiting por IP y bloqueo de correos temporales.

## Pendiente
- [ ] Configurar un dominio de email propio para poder enviar correos desde Vivily.
- [ ] Enviar correo automático de confirmación a quien se une a la waitlist.
- [ ] Enviar correo automático a cada email de la waitlist cuando Vivily esté lista, con enlace a la landing.
