import { model, Schema } from 'mongoose';

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    appointments: [
        {
            doctor: {
                type: Schema.Types.ObjectId,  // Use ObjectId to reference the Doctor model
                ref: 'Doctor',
                required: true,
            },
            dates: {
                type: Date,
                required: true,
            },
        },
    ],
});

const User = model('User', userSchema);

export default User;
