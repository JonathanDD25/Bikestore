import { pool } from '../config/connection.js'

export class CrudController {
    // Obtiene todos los registros de una tabla
    async obtenerTodos(tabla) {
        const [resultados] = await pool.query(`SELECT * FROM ??`, [tabla]);
        return resultados;
    }


    async obtenerUno(tabla, ids = {}) {
        try {
            const keys = Object.keys(ids).filter(k => ids[k] !== undefined);
            if (keys.length === 0) {
                throw new Error("No se proporcionaron IDs para obtenerUno");
            }

            const whereClauses = keys.map(k => `${k} = ?`).join(" AND ");
            const params = keys.map(k => ids[k]);

            const sql = `SELECT * FROM \`${tabla}\` WHERE ${whereClauses} LIMIT 1`;
            const [rows] = await pool.query(sql, params);

            return rows[0] ?? null;
        } catch (error) {
            console.error("Error en crud.obtenerUno():", error);
            throw error;
        }
    }


    //Crear un nuevo registro
    async crear(tabla, idsCampos = {}, data) {
        try {
            // Limpiar datos (eliminar undefined para evitar SQL inválido)
            const datosLimpios = {};
            for (const k in data) {
                if (data[k] !== undefined) datosLimpios[k] = data[k];
            }

            if (Object.keys(datosLimpios).length === 0) {
                throw new Error("No hay datos para insertar en " + tabla);
            }

            // Ejecutar INSERT
            const [resultado] = await pool.query(`INSERT INTO ?? SET ?`, [tabla, datosLimpios]);

            // Si el INSERT devolvió insertId (tabla con autoincrement)
            if (resultado && resultado.insertId) {
                // Nombre típico: id_<tabla>
                const posibles = Object.keys(idsCampos);
                if (posibles.length === 0) {
                    // si no nos dieron idsCampos, asumir convención id_<tabla>
                    const nombreId = `id_${tabla}`;
                    idsCampos[nombreId] = resultado.insertId;
                } else {
                    // usar el primer campo provisto en idsCampos
                    const campoAuto = posibles[0];
                    idsCampos[campoAuto] = resultado.insertId;
                }
            } else {
                // No hubo insertId: es probable que la PK venga en data (claves compuestas)
                // Copiar valores desde datosLimpios a idsCampos si existe la clave
                for (const k in idsCampos) {
                    if (datosLimpios[k] !== undefined) idsCampos[k] = datosLimpios[k];
                }
            }

            // Verificar que idsCampos tenga valores válidos para construir WHERE
            const whereKeys = Object.keys(idsCampos).filter(k => idsCampos[k] !== undefined);
            if (whereKeys.length === 0) {
                // No tenemos cómo recuperar el registro; devolvemos un resultado básico
                return { insertId: resultado.insertId || null, ...datosLimpios };
            }

            // Construir consulta para obtener el registro insertado
            const whereClauses = whereKeys.map(k => `${k} = ?`).join(" AND ");
            const whereValues = whereKeys.map(k => idsCampos[k]);

            const sql = `SELECT * FROM \`${tabla}\` WHERE ${whereClauses} LIMIT 1`;
            const [rows] = await pool.query(sql, whereValues);

            return rows[0] ?? { insertId: resultado.insertId || null, ...datosLimpios };

        } catch (error) {
            console.error("Error en crud.crear():", error);
            throw error;
        }
    }

    //Actualizar un registro por ID
    async actualizar(tabla, idsCampos, data) {
        try {
            // Validar que haya datos para actualizar
            if (!data || Object.keys(data).length === 0) {
                throw new Error("No hay datos para actualizar");
            }

            // Construimos dinámicamente el WHERE
            let where = [];
            let values = [];

            for (const campo in idsCampos) {
                where.push(`${campo} = ?`);
                values.push(idsCampos[campo]);
            }

            // Construimos el SQL final
            const sql = `UPDATE ${tabla} SET ? WHERE ${where.join(" AND ")}`;

            // Ejecutamos la actualización
            const [resultado] = await pool.query(sql, [data, ...values]);

            if (resultado.affectedRows === 0) {
                throw new Error("Registro no encontrado");
            }

            // Retornamos el registro actualizado
            return await this.obtenerUno(tabla, idsCampos);
        } catch (error) {
            throw error;
        }
    }
    //Eliminar un registro por ID
    async eliminar(tabla, idsCampos) {
        try {
            let where = [];
            let values = [];

            for (const campo in idsCampos) {
                where.push(`${campo} = ?`);
                values.push(idsCampos[campo]);
            }
            const resultado = await pool.query(`DELETE FROM ${tabla} WHERE ${where.join(" AND ")}`, values);

            if (resultado.affectedRows === 0) {
                throw new Error('Registro no encontrado');
            }
            return { message: 'Registro eliminado exitosamente' };
        } catch (error) {
            throw error;
        }
    }
}
