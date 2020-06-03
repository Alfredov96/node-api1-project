const express = require('express');

const server = express();

server.use(express.json())

let dummy =[ {
    id: 1, // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane",  // String, required
  },

 {
    id: 2, // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane",  // String, required
  }, 

   {
    id: 3, // hint: use the shortid npm package to generate it
    name: "Jane Doe", // String, required
    bio: "Not Tarzan's Wife, another Jane",  // String, required
  }
]

server.get('/', (req, res) => {
    res.json('alive');
});
server.get('/api/users', function (req, res) {
    try{
        return res.status(200).json(dummy)
    }
    catch(error){
        return res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    
    };
    
})

server.post('/api/users', (req, res) => {
    const user = req.body
    if(!user.name || !user.bio){
         res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    }
    else{
        try{
            dummy.push(user)
            res.status(201).json(dummy)
        }
        catch{
            res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
        }
    }
})
server.delete("/api/users/:id", function (req, res) {
    const { id } = req.params;
  
    const userIndex = dummy.findIndex((u) => u.id == id);
  
    if (userIndex > -1) {
      const user = { ...dummy[userIndex], ...req.body };
  
      dummy = [...dummy.slice(0, userIndex), user, ...dummy.slice(userIndex + 1)];
      res.send(dummy);
    } else {
      res.status(404).send({ msg: "user not found" });
    }
  });
  
  server.put("/api/users/:id", (req, res) => {
    //   const  id = req.params.id;

    //   const body = req.body;
    //   if(!body.name && !body.bio){
    //     res.status(400).json({ errorMessage: "Please provide name and bio for the user." });

    //   } 
    //   const newArray = dummy.map( (p) => {
    //     if(p.id == id){
    //         return {
    //             ...p, id: p.id
    //         }
    //     } else{
    //         return p
    //     }
    //   })
    //  if(
    //      newArray === dummy
    //  ) {
    //     res.status(404).json({ message: "The user with the specified ID does not exist." });

    //  }else {
    //      try {
    //          dummy = newArray
    //      }
    //      catch(error){
    //         res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    //      }
    //  }
    //  res.status(200).json(dummy)

    const urlId = req.params.id
     let singleUser = dummy.filter(user =>  user.id === Number(urlId))
     const editedUser = req.body
     if(!dummy){
          return res.status(500).json({ errorMessage: "The user information could not be modified." })
     } else if (!singleUser){
          return res.status(404).json({ message: "The user with the specified ID does not exist." })
     } else if (!editedUser.name || !editedUser.bio){
          return res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
     } else {
          return res.status(200).json(editedUser)
     }
  })

const port = 9000

server.listen(port, () => console.log(`\n == API on port ${port} == \n`));