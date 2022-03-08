const express = require("express");
const router = express.Router();
const {SignUpValid,SignUpRouter,LoginRouter,AllUser,SingleUser,taskDataValid,taskDataPost,taskDataUpdate,taskDataDelete,AllTaskData,SingleTaskData} = require("../validation/validation")

router.post("/register-user",SignUpValid,SignUpRouter)
router.post("/signin-user",LoginRouter)
router.get("/allusers",AllUser)
router.get("/allusers/:id",SingleUser)
router.post("/task",taskDataPost)
router.put("/task/:id",taskDataUpdate)
router.delete("/task/:id",taskDataDelete)
router.get("/task/:id",SingleTaskData)
router.get("/task",AllTaskData)
module.exports = router 