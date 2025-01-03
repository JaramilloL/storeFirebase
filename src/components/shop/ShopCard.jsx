import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid2,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { red } from "@mui/material/colors";
import { useContext, useEffect, useState } from "react";
import { CreateContext } from "../../context/CreateContext";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";

const ShopCard = () => {
  const [imageUrl, setImageUrl] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const storage = getStorage();
        const storageRef = ref(storage, "shop/");
        const result = await listAll(storageRef); //enumeramos las imagenes para asociarlas
        // const images = await getDownloadURL(storageRef);

        // Obtiene las URLs de todas las imágenes en la carpeta
        const urls = await Promise.all(
          result.items.map((item) => getDownloadURL(item))
        );

        setImageUrl(urls); //images
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const { products } = useContext(CreateContext);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Grid2 container spacing={2}>
      {products.map((product, index) => (
        <Card sx={{ maxWidth: 345, minWidth: 340 }} key={product.id}>
          <CardHeader
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              flexDirection: "column",
            }}
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                J
              </Avatar>
            }
            title={product.nameProduct}
            subheader={`Price: ${product.price}`}
          />
          {imageUrl[index] && (
            <CardMedia
              key={index}
              component="img"
              height="194"
              image={`${imageUrl[index]}`}
              alt={product.nameProduct}
            />
          )}
          <CardContent>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {product.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <Box
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              id={product.id}
            >
              <ExpandMoreIcon />
            </Box>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography sx={{ marginBottom: 2 }}>
                Count: {product.count}
              </Typography>
              <Typography sx={{ marginBottom: 2 }}>
                Sale: {product.sale}
              </Typography>
              <Typography>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </Grid2>
  );
};

export default ShopCard;
