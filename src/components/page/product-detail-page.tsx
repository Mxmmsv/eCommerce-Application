import { useParams } from 'react-router';

export default function ProductDetailPage() {
  const { id } = useParams();
  return <h1>Product Detail Page — ID: {id}</h1>;
}
