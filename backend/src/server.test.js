require('dotenv').config()
const app = require('./server')
const mongoose = require('mongoose')
const config = require('config')
const supertest = require('supertest')

const User = require('./model/user.model');
const Address = require('./model/address.model');
const Customer = require('./model/customer.model');
const Category = require('./model/category.model');
const Product = require('./model/product.model');

const SECONDS = 15;
jest.setTimeout(1000 * SECONDS)

let token;

beforeEach(done => {
    const { host, user, pass, database } = config.get('database');

    mongoose.connect(`mongodb+srv://${user}:${pass}@${host}/${database}?retryWrites=true&w=majority`, {
        useNewUrlparser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: true
    })
    .then(async () => {
        mongoose.connection.dropCollection('users');
        const user = new User({
            "username": "testelek",
            "first_name": "Elek",
            "last_name": "Test",
            "email": "test@test.ts",
            "password": "test123",
            "role": 4 })
        await user.save().then(async () => {
            const response = await supertest(app)
                .post('/login')
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send({ "username": "testelek", "password": "test123" })
                .expect(200)
            token = await response.body.accessToken
            // console.log('accessToken', token);
            done()
            }).catch(err => console.log(err))
        })
        .catch(err => {
            console.error(err)
            process.exit()
        });
});

afterEach(done => {
    mongoose.connection.db.dropDatabase(() => {
        mongoose.connection.close(() => done());
    });
});


// /address
describe('1. REST API integration tests: "/address"', () => {

    const insertData = [{
            country: 'Hungary',
            zipcode: 7850,
            city: 'K??r??szk??bl??ny',
            state: 'Baranya',
            streetName: 'Kossuth',
            streetNumber: 45,
        },
        {
            country: 'Germany',
            zipcode: 475050,
            city: 'Hurtz',
            state: 'Gultrec',
            streetName: 'Kassherrc',
            streetNumber: 55,
       },    
    ];

    let firstPostId;

    beforeEach(async () => {
        mongoose.connection.dropCollection('addresses');
        const address = await Address.insertMany(insertData);
        return firstPostId = address[0]._id;
    });

    test('GET /address', done => {
        supertest(app).get('/address').set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toBe(insertData.length);
                response.body.forEach((address, index) => {
                    expect(address.city).toBe(insertData[index].city);
                });                
                done();
            })
            .catch(err => console.error(err));
    });

    test('GET /address/:id', done => {
        supertest(app).get(`/address/${firstPostId}`)
            .set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                const address = response.body;
                expect(address.streetName).toBe(insertData[0].streetName);
                done();
            })
            .catch(err => console.error(err));
    });
  
    test('GET /address/search?country=Hun', done => {
        supertest(app).get(`/address/search?country=Hun`)
            .set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                const address = response.body;
                expect(address[0].country).toBe('Hungary');
                done();
            })
            .catch(err => console.error(err));
    });

    test('POST /address', done => {
        const newAddress = {
            country: 'Peru',
            zipcode: 4582,
            city: 'Kanayia',
            state: 'Culotue',
            streetName: 'Rodrigez',
            streetNumber: 11,
        };
        supertest(app).post('/address')
            .set('Authentication', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send(newAddress)
            .expect(201)
            .then(response => {
                expect(response.body.city).toBe(newAddress.city);
            })
            .then(() => supertest(app)
                .get('/address')
                .set('Authentication', 'Bearer ' + token)
                .then(response => {
                    expect(response.body.length).toBe(3);
                    expect(response.body[2].state).toBe(newAddress.state);
                    done();
                })
            )
            .catch(err => console.error(err));
    });

    test('PUT /address/:id', done => {
        const update = { _id: firstPostId, city: 'Sz??kesfeh??rv??r' }
        supertest(app).put(`/address/${firstPostId}`)
            .set('Authentication', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send(update)
            .expect(200)
            .then(response => {
                expect(response.body.city).toBe(update.city);
            })
            .then(() => supertest(app)
                .get('/address')
                .set('Authentication', 'Bearer ' + token)
                .then(response => {
                    expect(response.body[0].city).toBe(update.city);
                    done();
                })
            )
            .catch(err => console.error(err))
    });

    test('DELETE /address/:id', done => {
        supertest(app).delete(`/address/${firstPostId}`)
            .set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                supertest(app).get('/address')
                    .set('Authentication', 'Bearer ' + token).then(response => {
                        expect(response.body.length).toBe(1);
                        expect(response.body[0].zipcode).toBe(insertData[1].zipcode);
                        done();
                    })
            })
            .catch(err => console.error(err))
    });  
  
});


// /customer
describe('2. REST API integration tests: "/customer"', () => {

    const insertData = [{
            name: 'Kiss Ferenc',
            email: 'kissferike@ferimail.hu',
            phoneNumber: '+36 45 256-5236',
            url: 'feriurl.kissferi.hu',
            // Az 'address' egy ObjectId kell legyen. Ha itt meg van addva,
            // a mongoose valid??tora nem fogadja el.
            // address: '62b42234e7a3ef250ac7a65a'
        },
        {
            name: 'Nagy Dezs??',
            email: 'nagydezso@oriasi.hu',
            phoneNumber: '+36 78 256-0257',
            url: 'dezsourl.nagydezso.hu',
            // address: '62b42234e7a3ef250ac7a65a'
        },
    ];

    let firstPostId;

    beforeEach(async () => {
        mongoose.connection.dropCollection('customers');
        const customer = await Customer.insertMany(insertData);
        return firstPostId = customer[0]._id;
    });

    test('GET /customer', done => {
        supertest(app).get('/customer').set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toBe(insertData.length);
                response.body.forEach((customer, index) => {
                    expect(customer.name).toBe(insertData[index].name);
                });                
                done();
            })
            .catch(err => console.error(err));
    });

    test('GET /customer/:id', done => {
        supertest(app).get(`/customer/${firstPostId}`)
            .set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                const customer = response.body;
                expect(customer.name).toBe(insertData[0].name);
                done();
            })
            .catch(err => console.error(err));
    });
  
    test('GET /customer/search?name=fer', done => {
        supertest(app).get(`/customer/search?name=fer`)
            .set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                const customer = response.body;
                expect(customer[0].name).toBe('Kiss Ferenc');
                done();
            })
            .catch(err => console.error(err));
    });

    test('PUT /customer/:id', done => {
        const update = {
            _id: firstPostId,
            name: 'Fecske F??lix',
        };
        supertest(app).put(`/customer/${firstPostId}`)
            .set('Authentication', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send(update)
            .expect(200)
            .then(response => {
                expect(response.body.name).toBe(update.name);
            })
            .then(() => supertest(app)
                .get('/customer')
                .set('Authentication', 'Bearer ' + token)
                .then(response => {
                    expect(response.body[0].name).toBe(update.name);
                    done();
                })
            )
            .catch(err => console.error(err))
    });

    test('POST /customer', done => {
        const newCustomer = {
            name: 'Kem??ny Roz??lia',
            email: 'rozalia@kemenybeton.hu',
            phoneNumber: '+36 50 145-2936',
            url: 'rozaly.hard.beton.hu',
        };
        supertest(app).post('/customer')
            .set('Authentication', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send(newCustomer)
            .expect(201)
            .then(response => {
                expect(response.body.name).toBe(newCustomer.name);
            })
            .then(() => supertest(app)
                .get('/customer')
                .set('Authentication', 'Bearer ' + token)
                .then(response => {
                    expect(response.body.length).toBe(3);
                    expect(response.body[2].email).toBe(newCustomer.email);
                    done();
                })
            )
            .catch(err => console.error(err));
    });

    test('DELETE /customer/:id', done => {
        supertest(app).delete(`/customer/${firstPostId}`)
            .set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                supertest(app).get('/customer')
                    .set('Authentication', 'Bearer ' + token).then(response => {
                        expect(response.body.length).toBe(1);
                        expect(response.body[0].name).toBe(insertData[1].name);
                        done();
                    })
            })
            .catch(err => console.error(err))
    });  
  
});


// /user
describe('3. REST API integration tests: "/user"', () => {

    const insertData = [{
            username: 'zulurenc',
            last_name: 'Fekete',
            first_name: 'Zolt??n',
            email: 'fekete@zolimai.hu',
            password: 'feketezolikatitkos_jelszava',
            role: 2            
        },
        {
            username: 'kupectomi',
            last_name: 'Tam??s',
            first_name: 'Kuperkovich',
            email: 'tomi.kuper@mail.com',
        },   
    ];
    
    let firstPostId;

    beforeEach(async () => {
        const user = await User.insertMany(insertData);
        return firstPostId = user[0]._id;
    });


    test('GET /user', done => {
        supertest(app).get('/user').set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toBe(insertData.length + 1);
                done();
            })
            .catch(err => console.error(err));
    });

    test('GET /user/:id', done => {
        supertest(app).get(`/user/${firstPostId}`)
            .set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                const user = response.body;
                expect(user.username).toBe(insertData[0].username);
                done();
            })
            .catch(err => console.error(err));
    });

    test('GET /user/search?last_name=fekete', done => {
        supertest(app).get(`/user/search?email=fekete`)
            .set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                const user = response.body;
                expect(user[0].email).toBe('fekete@zolimai.hu');
                done();
            })
            .catch(err => console.error(err));
    });

    test('PATCH /user/:id', done => {
        const update = {
            last_name: '??j-Fekete',
            email: 'uj_fekete@zolimai.hu',
            password: 'feketezolikatitkos_jelszava',
        };
        supertest(app).patch(`/user/${firstPostId}`)
            .set('Authentication', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send(update)
            .expect(200)
            .then(response => {
                expect(response.body.last_name).toBe(update.last_name);
                done()
            })
            .catch(err => console.error(err))
    });

    test('POST /user', done => {
        const newUser = {
            username: 'kemenyrozy',
            last_name: 'Kem??ny',
            first_name: 'Roz??lia',
            email: 'rozalia@kemenybeton.hu',
            role: 1,
            password: 'kem??nyjelsz??'
        };
        supertest(app).post('/user')
            .set('Authentication', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send(newUser)
            .expect(201)            
            .then(response => {
                expect(response.body.username).toBe(newUser.username);
            })
            .then(() => supertest(app)
                .get('/user')
                .set('Authentication', 'Bearer ' + token)
                .then(response => {
                    expect(response.body.length).toBe(4);
                    expect(response.body[3].email).toBe(newUser.email);
                    done();
                })
            )
            .catch(err => console.error(err));
    });

    test('DELETE /user/:id', done => {
        supertest(app).delete(`/user/${firstPostId}`)
            .set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                supertest(app).get('/user')
                    .set('Authentication', 'Bearer ' + token).then(response => {
                        expect(response.body.length).toBe(2);
                        expect(response.body[1].name).toBe(insertData[1].name);
                        done();
                    })
            })
            .catch(err => console.error(err))
    });  

});


// /category
describe('4. REST API integration tests: "/category"', () => {

    const insertData = [{
            name: 'Vet??mag',
            description: 'Pici kem??ny goly??cska, mely f??ldbe t??ve id??vel nagy n??v??nny?? alakul ??t.'           
        },
        {
            name: 'F??r??sz??ru',
            description: 'Szab??lyos geomatr??ra alak??tott faanyag (pl. l??c, deszka, pall??',  
        },
    ];

    let firstPostId;

    beforeEach(async () => {
        mongoose.connection.dropCollection('categories');
        const category = await Category.insertMany(insertData);
        return firstPostId = category[0]._id;
    });

    test('GET /category', done => {
        supertest(app).get('/category').set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toBe(insertData.length);
                response.body.forEach((category, index) => {
                    expect(category.name).toBe(insertData[index].name);
                });                
                done();
            })
            .catch(err => console.error(err));
    });

    test('GET /category/:id', done => {
        supertest(app).get(`/category/${firstPostId}`)
            .set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                const category = response.body;
                expect(category.name).toBe(insertData[0].name);
                done();
            })
            .catch(err => console.error(err));
    });
 
    test('GET /category/search?name=Vet', done => {
        supertest(app).get(`/category/search?name=Vet`)
            .set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                const category = response.body;
                expect(category[0].name).toBe('Vet??mag');
                done();
            })
            .catch(err => console.error(err));
    });

    test('PUT /category/:id', done => {
        const update = {
            _id: firstPostId,
            name: 'B??tor',
        };
        supertest(app).put(`/category/${firstPostId}`)
            .set('Authentication', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send(update)
            .expect(200)
            .then(response => {
                expect(response.body.name).toBe(update.name);
            })
            .then(() => supertest(app)
                .get('/category')
                .set('Authentication', 'Bearer ' + token)
                .then(response => {
                    expect(response.body[0].name).toBe(update.name);
                    done();
                })
            )
            .catch(err => console.error(err))
    });

    test('POST /category', done => {
        const newCategory = {
            name: 'Ed??nyek',
            description: 'Dolgok t??rol??s??ra szolg??l?? eszk??z??k.',
        };
        supertest(app).post('/category')
            .set('Authentication', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send(newCategory)
            .expect(201)
            .then(response => {
                expect(response.body.name).toBe(newCategory.name);
            })
            .then(() => supertest(app)
                .get('/category')
                .set('Authentication', 'Bearer ' + token)
                .then(response => {
                    expect(response.body.length).toBe(3);
                    expect(response.body[2].name).toBe(newCategory.name);
                    done();
                })
            )
            .catch(err => console.error(err));
    });

    test('DELETE /category/:id', done => {
        supertest(app).delete(`/category/${firstPostId}`)
            .set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                supertest(app).get('/category')
                    .set('Authentication', 'Bearer ' + token).then(response => {
                        expect(response.body.length).toBe(1);
                        expect(response.body[0].name).toBe(insertData[1].name);
                        done();
                    })
            })
            .catch(err => console.error(err))
    });  
  
});


// /Product
describe('5. REST API integration tests: "/product"', () => {

    const insertData = [{
            name: 'V??d??r',
            description: 'Folyd??kok t??rol??s??ra szolg??l?? ed??ny.',
            active: true,
            price: 152,
            amount: 52
        },
        {
            name: 'Lap??t',
            description: '??mlesztett ??ru k??zi mozgat??s??ra szolg??l?? eszk??z.',
            active: true,
            price: 512,
            amount: 27 
        },
    ];

    let firstPostId;

    beforeEach(async () => {
        mongoose.connection.dropCollection('products');
        const product = await Product.insertMany(insertData);
        return firstPostId = product[0]._id;
    });

    test('GET /product', done => {
        supertest(app).get('/product').set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                expect(Array.isArray(response.body)).toBeTruthy();
                expect(response.body.length).toBe(insertData.length);
                response.body.forEach((product, index) => {
                    expect(product.name).toBe(insertData[index].name);
                });                
                done();
            })
            .catch(err => console.error(err));
    });

    test('GET /product/:id', done => {
        supertest(app).get(`/product/${firstPostId}`)
            .set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                const product = response.body;
                expect(product.name).toBe(insertData[0].name);
                done();
            })
            .catch(err => console.error(err));
    });
 
    test('GET /product/search?name=ap', done => {
        supertest(app).get(`/product/search?name=ap`)
            .set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                const product = response.body;
                expect(product[0].name).toBe('Lap??t');
                done();
            })
            .catch(err => console.error(err));
    });

    test('PUT /product/:id', done => {
        const update = {
            _id: firstPostId,
            name: 'B??tor',
        };
        supertest(app).put(`/product/${firstPostId}`)
            .set('Authentication', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send(update)
            .expect(200)
            .then(response => {
                expect(response.body.name).toBe(update.name);
            })
            .then(() => supertest(app)
                .get('/product')
                .set('Authentication', 'Bearer ' + token)
                .then(response => {
                    expect(response.body[0].name).toBe(update.name);
                    done();
                })
            )
            .catch(err => console.error(err))
    });

    test('POST /product', done => {
        const newProduct = {
            name: 'T??gla',
            description: '??p??t??anyag',
        };
        supertest(app).post('/product')
            .set('Authentication', 'Bearer ' + token)
            .set('Content-Type', 'application/json')
            .send(newProduct)
            .expect(201)
            .then(response => {
                expect(response.body.name).toBe(newProduct.name);
            })
            .then(() => supertest(app)
                .get('/product')
                .set('Authentication', 'Bearer ' + token)
                .then(response => {
                    expect(response.body.length).toBe(3);
                    expect(response.body[2].name).toBe(newProduct.name);
                    done();
                })
            )
            .catch(err => console.error(err));
    });

    test('DELETE /product/:id', done => {
        supertest(app).delete(`/product/${firstPostId}`)
            .set('Authentication', 'Bearer ' + token).expect(200)
            .then(response => {
                supertest(app).get('/product')
                    .set('Authentication', 'Bearer ' + token).then(response => {
                        expect(response.body.length).toBe(1);
                        expect(response.body[0].name).toBe(insertData[1].name);
                        done();
                    })
            })
            .catch(err => console.error(err))
    });  
  
});
