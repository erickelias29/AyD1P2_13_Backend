const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
chai.use(chaiHttp)

describe('Pruebas del backend', () => {
    it('Obteniendo categorias',(done) => {
        chai.request(app).get("/categoria").end((err, res) => {
            if(err) done(err)
            chai.expect(res.body).to.be.an('array')
            done()
        })
    })

    it('Login correcto',(done) => {
        chai.request(app).post("/login").send({
            usuario: "admin",
            password: "admin"
        }).end((err, res) => {
            if(err) done(err)
            chai.expect(res.body).to.be.an('object')
            done()
        })
    })

    it('Obteniendo usuarios',(done) => {
        chai.request(app).get("/usuario").end((err, res) => {
            if(err) done(err)
            chai.expect(res.body).to.be.an('array')
            done()
        })
    })

    it('Obteniendo productos',(done) => {
        chai.request(app).get("/producto").end((err, res) => {
            if(err) done(err)
            chai.expect(res.body).to.be.an('array')
            done()
        })
    })

    it('carro de compras agregado',(done) => {
        chai.request(app).get("/carroProducto").end((err, res) => {
            if(err) done(err)
            chai.expect(res.body).to.be.an('array')
            done()
        })
    })

    it('Update de producto inexistente',(done) => {
        chai.request(app).post("/updateProducto/100000").end((err, res) => {
            if(err) done(err)
            chai.expect(res.body).to.have.length.above(0);
            done()
        })
    })

    it('Eliminar productos',(done) => {
        chai.request(app).delete("/producto").end((err, res) => {
            if(err) done(err)
            chai.expect(res.body).to.be.an('array')
            done()
        })
    })

    it('Login incorrecto',(done) => {
        chai.request(app).post("/login").send({
            usuario: "no existe",
            password: "admin"
        }).end((err, res) => {
            if(err) done(err)
            chai.expect(res.text).not.to.be.equals('fail')
            done()
        })
    })
})