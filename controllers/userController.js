const { poolPromise } = require('../models/db');

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const [rows] = await poolPromise.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await poolPromise.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener usuario');
    }
}

// Crear un nuevo usuario
const createUser = async (req, res) => {
    const { name, email } = req.body;

    try {
        const [result] = await poolPromise.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.status(201).json({ id: result.insertId, name, email });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear usuario');
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const [result] = await poolPromise.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.json({ id, name, email });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al actualizar usuario');
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await poolPromise.query('DELETE FROM users WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.send('Usuario eliminado');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar usuario');
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
