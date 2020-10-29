import api from './apiServices'

const getPeta = () => {
    return api.get('peta')
}

const getPetaById = (id) => {
    return api.get(`peta/${id}`)
}

const putPetaById = (id, data) => {
    return api.put(`http://localhost:3000/peta/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" }
        })
}

const deletePetaById = (id) => {
    return api.delete(`peta/${id}`)
}

const postPeta = (data) => {
    return api.post('http://localhost:3000/peta', data, {
            headers: { "Content-Type": "multipart/form-data" }
        })
}

const logoutAdmin = () => {
    return api.post(`http://localhost:3000/logout`)
}

export default {
    getPeta,
    postPeta,
    getPetaById,
    putPetaById,
    deletePetaById,
    logoutAdmin
}