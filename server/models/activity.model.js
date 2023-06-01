const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new Schema(
    {
        title:{type: String, required: true},
        hostid:{type: String, required: true},
        from:{type: Date, required: true},
        to:{type: Date, required: true},
        headcount:{type: Number, required: true},
        introduction:{type: String},
        attendence:{type: Number, required: true}
    }, {
        timestamps: true,
      }
);
const sports = mongoose.model("sports", activitySchema);
const shoppings = mongoose.model("shoppings", activitySchema);
const car_pools = mongoose.model("car_pools", activitySchema);
const travels = mongoose.model("travels", activitySchema);

module.exports = {
    sports : sports,
    shoppings : shoppings,
    car_pools : car_pools,
    travels : travels
};