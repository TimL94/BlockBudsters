const { Schema, model } = require('mongoose');

// schema for creating a user model with email validation
const menuItemSchema = new Schema(
    {
        name : {
            type: String, 
            required: true,
            unique: true,
        },
        category: {
            type: String,
            enum: [ 'Flower', 'Pre Rolls', 'Concentrates', 'Edibles', 'Limited', 'Special' ],
            required: true,
        },
        price: {
            type: Array,
            required: true
        },
        strain: {
            type: String,
            enum: {
                values: [ 'Indica', 'Sativa', 'Hybrid' ],
                message: 'invalid category, must be Indica Sativa or Hybrid'
            },
            required: true,

        },
        imageUrl: {
            type: String
        },
        effect: {
            type: String
        }

    }
);


const MenuItem = model('MenuItem', menuItemSchema);

module.exports = MenuItem;