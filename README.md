📄 README.md
markdown
Copiar
Editar
# 🚗 Ricardo Te Ayuda - Asesor Virtual para Compra de Carros en Colombia

Bienvenido a **Ricardo Te Ayuda**, una app impulsada por **IA Generativa + Firestore + Expo** que funciona como un asesor comercial personalizado para ayudarte a comprar el carro adecuado según tus necesidades, presupuesto y ciudad. Además, ofrece recomendaciones financieras y tips post-compra.

---

## 🧩 Tech Stack

- **Frontend:** Expo (React Native)
- **Backend:** Node.js + Express + LangChain
- **IA Generativa:** LangChain + OpenAI API (GPT)
- **Base de datos:** Firestore
- **Deploy backend:** Render

---

## 🚀 Estructura del Proyecto

/asesor-carros-app/ ├── /app/ # Expo App (frontend) ├── /backend-asesor/ # API backend (Express + LangChain) ├── package.json # Opcional para monorepo └── README.md # Este archivo

yaml
Copiar
Editar

---

## ⚙️ Instalación

### 🔵 Frontend (Expo)
```bash
cd app
npm install
npx expo start
🔵 Backend (Express + LangChain)
bash
Copiar
Editar
cd ../backend-asesor
npm install --legacy-peer-deps
npm run dev
⚠️ Asegúrate de tener tus variables .env y credenciales Firebase correctamente configuradas.

🌐 API en Producción (Render)
Tu backend ya está desplegado en Render:

arduino
Copiar
Editar
https://backend-asesor.onrender.com/recomendar-carro
✨ Funcionalidades
Recomendación de carros nuevos o usados según presupuesto, ciudad y estilo de vida.

Simulación financiera y recomendaciones post-compra.

Sugerencias basadas en IA generativa entrenada con contexto de mercado local.

Tips ocasionales de salud financiera.

👥 Público objetivo
Personas de estratos bajos, medios y altos en Colombia.

Público femenino o personas con poca información sobre compra de vehículos.

💡 Próximos pasos
Mejorar la interfaz con loaders y estados UX.

Implementar un sistema de ahorro personalizado.

Incluir seguimiento de gastos post-compra (mantenimiento, seguros, etc).

🧑‍💻 Autor
Proyecto desarrollado por Jimmy Toro.

📄 Licencia
[MIT] u otra según tu preferencia.

yaml
Copiar
Editar

[LoaderScreen] 
    └─ Detecta sesión activa
        ├─ Si hay sesión -> [HomeScreen]
        └─ Si no hay sesión -> [AuthScreen]

[AuthScreen] 
    └─ Login con opción de ir a [RegisterScreen] o [PasswordResetScreen]

[RegisterScreen] 
    └─ Registro exitoso -> [HomeScreen]

[PasswordResetScreen] 
    └─ Reseteo exitoso -> vuelve a [AuthScreen]

[HomeScreen] 
    └─ Botón "Ir al Asistente de Compra" -> [WelcomeScreen]
    └─ Botón "Cerrar sesión" -> vuelve a [AuthScreen]

[WelcomeScreen] 
    └─ Selección de tipo de búsqueda -> [QuestionnaireScreen]

[QuestionnaireScreen] 
    └─ Formulario según opción -> POST API backend
    └─ Respuesta backend -> [ResultsScreen]

[ResultsScreen] 
    └─ Mostrar recomendación + botón "Volver al inicio" -> [WelcomeScreen]
