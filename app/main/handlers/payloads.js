const {ipcMain} = require("electron")

module.exports = (win, getClient) => {
    const asyncQueryPayload = (params) => {
        return new Promise((resolve, reject) => {
            getClient().QueryPayload(params, (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(data)
            })
        })
    }
    // 获取table列表
    ipcMain.handle("QueryPayload", async (e, params) => {
        return await asyncQueryPayload(params)
    })

    const asyncGetAllPayloadFromFile = (params) => {
        return new Promise((resolve, reject) => {
            getClient().GetAllPayloadFromFile(params, (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(data)
            })
        })
    }
    // 用于导出
    ipcMain.handle("GetAllPayloadFromFile", async (e, params) => {
        return await asyncGetAllPayloadFromFile(params)
    })

    const asyncUpdateAllPayloadGroup = (params) => {
        return new Promise((resolve, reject) => {
            getClient().UpdateAllPayloadGroup(params, (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(data)
            })
        })
    }
    // 更新顺序数组
    ipcMain.handle("UpdateAllPayloadGroup", async (e, params) => {
        return await asyncUpdateAllPayloadGroup(params)
    })

    const asyncRenamePayloadGroup = (params) => {
        return new Promise((resolve, reject) => {
            getClient().RenamePayloadGroup(params, (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(data)
            })
        })
    }
    // 重命名Payload
    ipcMain.handle("RenamePayloadGroup", async (e, params) => {
        return await asyncRenamePayloadGroup(params)
    })

    const asyncCreatePayloadFolder = (params) => {
        return new Promise((resolve, reject) => {
            getClient().CreatePayloadFolder(params, (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(data)
            })
        })
    }
    // 新建文件夹
    ipcMain.handle("CreatePayloadFolder", async (e, params) => {
        return await asyncCreatePayloadFolder(params)
    })

    const asyncDeletePayloadByFolder = (params) => {
        return new Promise((resolve, reject) => {
            getClient().DeletePayloadByFolder(params, (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(data)
            })
        })
    }
    // 删除文件夹
    ipcMain.handle("DeletePayloadByFolder", async (e, params) => {
        return await asyncDeletePayloadByFolder(params)
    })

    const asyncDeletePayloadByGroup = (params) => {
        return new Promise((resolve, reject) => {
            getClient().DeletePayloadByGroup(params, (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(data)
            })
        })
    }
    // 删除Payload
    ipcMain.handle("DeletePayloadByGroup", async (e, params) => {
        return await asyncDeletePayloadByGroup(params)
    })

    // message DeletePayloadByIdRequest {
    //     int64 Id = 1; // 用于删除一个
    //     repeated int64 Ids = 2; // 删除多个
    //   }
    // asyncDeletePayload wrapper
    const asyncDeletePayload = (params) => {
        return new Promise((resolve, reject) => {
            getClient().DeletePayload(params, (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(data)
            })
        })
    }
    ipcMain.handle("DeletePayload", async (e, params) => {
        return await asyncDeletePayload(params)
    })

    const handlerHelper = require("./handleStreamWithContext")

    // 数据库存储
    const streamPayloadMap = new Map()
    ipcMain.handle("cancel-SavePayload", handlerHelper.cancelHandler(streamPayloadMap))
    ipcMain.handle("SavePayloadStream", (e, params, token) => {
        let stream = getClient().SavePayloadStream(params)
        handlerHelper.registerHandler(win, stream, streamPayloadMap, token)
    })

    // 文件存储
    const streamPayloadFileMap = new Map()
    ipcMain.handle("cancel-SavePayloadFile", handlerHelper.cancelHandler(streamPayloadFileMap))
    ipcMain.handle("SavePayloadToFileStream", (e, params, token) => {
        let stream = getClient().SavePayloadToFileStream(params)
        handlerHelper.registerHandler(win, stream, streamPayloadFileMap, token)
    })

    const asyncUpdatePayload = (params) => {
        return new Promise((resolve, reject) => {
            getClient().UpdatePayload(params, (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(data)
            })
        })
    }
    // 备份到其他字典/修改table项
    ipcMain.handle("UpdatePayload", async (e, params) => {
        return await asyncUpdatePayload(params)
    })

    const asyncBackUpOrCopyPayloads = (params) => {
        return new Promise((resolve, reject) => {
            getClient().BackUpOrCopyPayloads(params, (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(data)
            })
        })
    }
    // 移动/复制到其他字典
    ipcMain.handle("BackUpOrCopyPayloads", async (e, params) => {
        return await asyncBackUpOrCopyPayloads(params)
    })

    const asyncGetAllPayloadGroup = (params) => {
        return new Promise((resolve, reject) => {
            getClient().GetAllPayloadGroup(params, (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(data)
            })
        })
    }
    // 获取Payload列表
    ipcMain.handle("GetAllPayloadGroup", async (e, params) => {
        return await asyncGetAllPayloadGroup(params)
    })

    const asyncGetAllPayload = (params) => {
        return new Promise((resolve, reject) => {
            getClient().GetAllPayload(params, (err, data) => {
                if (err) {
                    reject(err)
                    return
                }
                resolve(data)
            })
        })
    }
    // 用于导出
    ipcMain.handle("GetAllPayload", async (e, params) => {
        return await asyncGetAllPayload(params)
    })
}
