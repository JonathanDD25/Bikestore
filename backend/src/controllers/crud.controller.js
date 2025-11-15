import { pool } from '../config/connection.js'

export class CrudController {
    // Obtiene todos los registros de una tabla
    async obtenerTodos(tabla){
        const [resultados] = await pool.query(`SELECT * FROM ??`, [tabla]);
        return resultados;
    }


    async obtenerUno(tabla, idsCampos) {
        try{
            let where = [];
            let values = [];

            for (const campo in idsCampos) {
                where.push(`${campo} = ?`);
                values.push(idsCampos[campo]);
            }

            const resultado = `SELECT * FROM ${tabla} WHERE ${where.join(" AND ")}`;
            const [rows] = await pool.query(resultado, values);

            return rows;

        } catch (error){
            throw error;
        }
    }
        

    //Crear un nuevo registro
    async crear(tabla, idsCampos, data) {
        try {
            // Insertamos los datos
            const [resultado] = await pool.query(`INSERT INTO ?? SET ?`, [tabla, data]);

            // Si la tabla tiene un ID autoincremental, lo agregamos al objeto idsCampos
            // Esto aplica para tablas con una sola llave primaria (por ejemplo, productos)
            if (resultado.insertId) {
                const campoAuto = Object.keys(idsCampos)[0]; // suponemos que el primer campo es el autoincremental
                idsCampos[campoAuto] = resultado.insertId;
            } else {
                // Si no hay autoincremental, asumimos que los IDs están en "data"
                for (const campo in data) {
                    if (campo in idsCampos) {
                        idsCampos[campo] = data[campo];
                    }
                }
            }

            // Devolvemos el registro recién insertado
            return await this.obtenerUno(tabla, idsCampos);
        } catch (error) {
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
    async eliminar(tabla, idsCampos){
        try {
            let where = [];
            let values = [];

            for (const campo in idsCampos) {
                where.push(`${campo} = ?`);
                values.push(idsCampos[campo]);
            }
            const resultado =  await pool.query(`DELETE FROM ${tabla} WHERE ${where.join(" AND ")}`, values);
            
            if (resultado.affectedRows === 0) {
                throw new Error('Registro no encontrado');
            }
            return { message: 'Registro eliminado exitosamente' };
        } catch (error){
            throw error;
        }
    }
}
