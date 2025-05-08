export const testPostController = (req,res)=>{
  const {name} = req.body
  res.status(202).send(`your name is ${name}`)
}
