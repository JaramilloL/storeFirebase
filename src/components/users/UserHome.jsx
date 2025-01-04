import { Box, Button } from "@mui/material"
import ShopCard from "../shop/ShopCard"
import { useContext } from "react"
import { CreateContext } from "../../context/CreateContext"
import { Navigate } from "react-router-dom"

const UserHome = () => {
  const { signOutUser, userActived } = useContext(CreateContext)

  if(!userActived) return <Navigate to="/login"/>
  return (
    <Box>
    <Button onClick={signOutUser}>LogOut</Button>
        <ShopCard/>
    </Box>
  )
}

export default UserHome