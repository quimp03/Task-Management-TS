import expres, {Request, Response} from "express"
import  Task from "../model/task.model"
//[GET] api/v1/tasks
export const tasks = async(req: Request, res: Response): Promise<void> => {
    try {
        //filter
        interface Find{
            deleted: boolean,
            status?: string,
            title?: RegExp
        }
        const find: Find = {
            deleted: false
        }
        if(req.query.status){
            find["status"] = `${req.query.status}`
        }
        //sort
        const sort: any = {}
        if(req.query.sortKey && req.query.sortValue){
            sort[`${req.query.sortKey}`] = req.query.sortValue
        }
        //pagination
        const pagination = {
            limit: 2,
            currentPage: 1
        }
        if(req.query.page){
            pagination.currentPage = parseInt(`${req.query.page}`)
        }
        if(req.query.limit){
            pagination.limit = parseInt(`${req.query.limit}`)
        }
        const skip = (pagination.currentPage - 1) * (pagination.limit)
         //keyword
        if(req.query.keyword){
            const regex = new RegExp(`${req.query.keyword}`, "i")
            find["title"] = regex
        }
        const tasks = await Task.find(find).sort(sort).skip(skip).limit(pagination.limit)
        res.json(tasks)
    } catch (error) {
        console.log(error)
    }
}
//[GET] api/v1/tasks/detail/:id
export const detail = async(req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id 
        const task = await Task.findOne({
            deleted: false,
            _id: id
        })
        res.json(task)
    } catch (error) {
        console.log(error)
    }
}
//[PATCH] api/v1/tasks/change-status/:id
export const changeStatusPatch = async(req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        const status: string = req.body.status;
        await Task.updateOne({
          _id: id
        }, {
          status: status
        });
        res.json({
          code: 200,
          message: "Cập nhật trạng thái thành công!"
        });
      } catch (error) {
        res.json({
          code: 400,
          message: "Không tồn tại bản ghi!"
        });
      }
}
//[PATCH] api/v1/tasks/change-multi/:id
export const changeMultiPatch = async(req: Request, res: Response) => {
    try {
      const listStatus = ["initial", "doing", "notFinish", "pending", "finish"]
      const {ids, status} = req.body
      if(listStatus.includes(status)){
        const tasks = await Task.updateMany({
          _id: {$in: ids}
        }, {
          status: status
        })
        res.json({
          code: 200,
          massgae: "Đổi trạng thái thành công!"
        })
      }
      else{
        res.json({
          code: 400,
          message: "Trạng thái không hợp lệ!"
        })
      }
    } catch (error) {
      res.json({
        code: 400,
        massage: "Đổi trạng thái thất bại!"
      })
    }
  }
//[POST] api/v1/tasks/create
export const create = async(req: Request, res: Response) => {
    try {
    //   req.body.createdBy = res.locals.user.id
      if(req.body.taskParentId){
        const idParent = await Task.findOne({
          _id: req.body.taskParentId
        })
        if(!idParent){
          res.json({
            code: 400,
            message: "Id parent không tồn tại!"
          })
          return
        }
      }
        const task = new Task(req.body)
        await task.save()
        res.json({
          code: 200,
          message: "Thêm công việc thành công"
        })
    } catch (error) {
      res.json(error)
    }
  }
// [PATCH] api/v1/tasks/edit/:id
export const editPatch = async(req: Request, res: Response) => {
    const id: string = req.params.id
    const listStatus = ["initial", "doing", "notFinish", "pending", "finish"];
    if(!listStatus.includes(req.body.status)){
      res.json({
        code: 400,
        message: "Trạng thái công việc không tồn tại!"
      })
      return
    }
    await Task.updateOne({
      _id: id
    }, req.body)
    res.json({
      code: 200,
      message: "Chỉnh sửa công việc thành công!"
    })
}
// [DELETE] api/v1/tasks/delete/:id
export const deletePatch = async(req: Request, res: Response) => {
  const id: string = req.params.id
  await Task.updateOne({
    _id: id
  }, {
    deleted: true,
    deletedAt: new Date()
  })
  res.json({
    code: 200,
    message: "Xóa công việc thành công!"
  })
}
// [DELETE] api/v1/tasks/delete-multi
export const deleteMultiPatch = async(req: Request, res: Response) => {
  const {ids} = req.body
  await Task.updateMany({
    _id: {$in: ids}
  },{
    deleted: true
  })
  res.json({
    code: 200,
    message: "Xóa các công việc thành công!"
  })
}