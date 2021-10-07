const faker = require('faker');
const Studio = require('../models/Studio');

module.exports = async () => {
    const initialStudios = await Studio.create ([
        {
            studioName: `${faker.company.companyName()}`,
            city: `${faker.address.city()}`,
            state: `${faker.address.state()}`,
            country: `${faker.address.country()}`,
        },
        {
            studioName: `${faker.company.companyName()}`,
            city: `${faker.address.city()}`,
            state: `${faker.address.state()}`,
            country: `${faker.address.country()}`,
        },
        {
            studioName: `${faker.company.companyName()}`,
            city: `${faker.address.city()}`,
            state: `${faker.address.state()}`,
            country: `${faker.address.country()}`,
        },
    ]);
};

