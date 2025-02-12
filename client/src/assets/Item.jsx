import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * ItemCard component displays product information.
 *
 * @param {Object} props - Component props
 * @param {string} props.itemId - The unique ID of the item
 */
export default function ItemCard({ itemId }) {
  const [product, setProduct] = useState({ name: 'John', price: 23.22, url: "www.google.com", image: "https://images.pexels.com/photos/28184434/pexels-photo-28184434/free-photo-of-a-close-up-of-a-blue-ocean-with-waves.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        // TODO: actually use proper endpoint
        const url = `/api/item/${itemId}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        console.log(data)
        setProduct(data.data);
        console.log(product)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [itemId]); // Runs when itemId changes

  // if (loading) return <Typography>Loading...</Typography>;
  // if (error) return <Typography>Error: {error}</Typography>;

 return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt={product.name}
        height="140"
        image={product.image || '/static/images/default.jpg'}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Price: ${product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={product.url} target="_blank">
          View Item
        </Button>
      </CardActions>
    </Card>
  );
}

ItemCard.propTypes = {
  itemId: PropTypes.string.isRequired, // Ensures itemId is a required string
};
