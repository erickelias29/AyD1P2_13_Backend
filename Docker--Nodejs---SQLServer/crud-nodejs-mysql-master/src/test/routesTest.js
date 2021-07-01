const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
chai.use(chaiHttp)

describe('Pruebas del backend', () => {
    it('Obteniendo reportes',(done) => {
        chai.request(app).get("/reporte").end((err, res) => {
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

    it('Obteniendo reporte específico',(done) => {
        chai.request(app).get("/reporte/10000").end((err, res) => {
            if(err) done(err)
            chai.expect(res.body).to.have.length.above(0);
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