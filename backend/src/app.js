import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productos from "./routes/productos.routes.js";
import entrada_insumo from "./routes/entrada_insumo.routes.js";
import detalle_entrada from "./routes/detalle_entrada.routes.js";
import usuario from "./routes/usuario.routes.js";
import pedidos from "./routes/pedidos.routes.js";
import detalle_pedido from "./routes/detalle_pedido.routes.js";

dotenv.config();
const app = express();

//Middlewares
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

//Rutas
app.use("/api/productos", productos);
app.use("/api/entrada_insumo", entrada_insumo);
app.use("/api/detalle_entrada", detalle_entrada);
app.use("/api/usuarios", usuario);
app.use("/api/pedidos", pedidos);
app.use("/api/detalle_pedido", detalle_pedido);

export default app;
