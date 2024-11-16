const express = require('express');
const router = express.Router();
module.exports = router;
const mongoose = require('mongoose');
const CarModel = require('../Model/CarModel');
const COMMON = require('../bin/COMMON');

router.get('/', (req, res) => {
    res.send('vao api mobile');
    n
})
router.get('/list', async(req, res) => {
    await mongoose.connect(COMMON.uri);
    let cars = await CarModel.find();
    console.log(cars);
    res.send(cars);
})
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Tạo mới xe
router.post('/create', async(req, res) => {
    await mongoose.connect(COMMON.uri);
    let car = req.body;
    let kq = await CarModel.create(car);
    console.log(kq);
    let cars = await CarModel.find();
    res.send(cars);
});

// Xóa xe theo ID
router.delete('/delete/:id', async(req, res) => {
    await mongoose.connect(COMMON.uri);
    let id = req.params.id;
    console.log(`ID xe cần xóa: ${id}`);

    try {
        // Thực hiện xóa xe
        const result = await CarModel.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            res.status(404).send({ message: "Không tìm thấy xe với ID này" });
        } else {
            res.send({ message: "Xóa xe thành công", id });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Lỗi khi xóa xe", error });
    }
});

// Cập nhật xe theo ID
router.put('/update/:id', async(req, res) => {
    await mongoose.connect(COMMON.uri);
    let id = req.params.id;
    let updateData = req.body;

    console.log(`ID xe cần cập nhật: ${id}`);
    console.log(`Dữ liệu cập nhật:`, updateData);

    try {
        const result = await CarModel.updateOne({ _id: id }, updateData);
        if (result.matchedCount === 0) {
            res.status(404).send({ message: "Không tìm thấy xe với ID này" });
        } else {
            res.send({ message: "Cập nhật xe thành công", id });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Lỗi khi cập nhật xe", error });
    }
});