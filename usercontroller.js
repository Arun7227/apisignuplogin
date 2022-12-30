const router=require('express').Router();
const database=require('./dbconfig');
const bcrypt=require('bcryptjs')


router.post('/regiter',async(req,res)=>{
    
    const db=await database.db();
    console.log('hitted')
    db.collection('user').findOne({email:req.body.email},async(err,result)=>{
        if(err){
           return res.status(500).json({
                msg:'internal server error'
            })
        }
        if(result){
          return  res.status(409).json({
                msg:'email already exist'
            })
        }else{
            const hashedpassword=await bcrypt.hash(req.body.password,10)
              db.collection('user').insertOne({fullname:req.body.name,email:req.body.email,mobile:req.body.mobile,password:hashedpassword},
            
            (err,result)=>{
                if(err){
                  return res.status(500).json({
                        msg:'internal server error'
                    })
                }
                return res.status({
                msg:'successfully registered'
                }) 
                
            
            })
        }
    })

})
router.post('/login',async(req,res)=>{
    const db=await database.db()
   db.collection('user').findOne({email:req.body.email},async(err,result)=>{
    if(err){
        return res.status(500).json({
              msg:'internal server error'
          })
      } 
        if(result){
            console.log(result.password)
           const passwordvalidate=await bcrypt.compare(req.body.password,result.password);

           console.log(passwordvalidate);
           if(!passwordvalidate){
            return res.status(409).json({
                msg:'invalid password'
            })
           }
            return   res.status(200).json({
                msg:'welcome'
            });
        
           }else{
            return  res.status(400).json({
                msg:'invalid user please register'
            })
           }
    })

})
module.exports=router;