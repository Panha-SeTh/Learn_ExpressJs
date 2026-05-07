import { db } from "../app.js"
import { usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const getAllUsers = async (req, res) => {
    const users = await db
        .select()
        .from(usersTable)
    return res.json({users: users});
}

export const createUser = async (req, res) => {
    const {name, age, email} = req.body
    const boo = await db
        .select()
        .from(usersTable)
        .where (eq(email, usersTable.email))
        if (boo.length !== 0)
            return res.status(409).json({error: "Email Already Exist."})
    const createdUser = await db.insert(usersTable).values({ name:name, age:age ,email:email }).returning()
  return res.status(201).json({
    message: "User created successfully",
    user: createdUser[0]
  });
};

export const getAllUsersId = async (req, res) => {
    const body = req.body;
    const id = req.params.id;
    console.log(id);
    return res.json({ id: `${id}` });
};

export const updateUser = async (req, res) => {
    const id = Number(req.params.id);
    const user = req.body;
    await db.update(usersTable)
           .set({
               name: user.name,
               age: user.age,
               email: user.email
           })
           .where(eq(usersTable.id, id))
           .returning(); //Optional but useful
   
  return res.status(200).json({
         message: "User updated successfully with id = " + id,
         user: user
       });
};

export const getDelete = async (req, res) => {
  const id = Number(req.params.id);
  const result = await db.delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning(); // optional but useful

  if (result.length === 0) {
      return res.status(404).json({
          message: "User not found"
      });
  }
    return res.status(200).json({
        message: "Delete user successfully with id = " + id,
        user: result[0] // Deleted User
    });
};